"""Generate all marked English clips once; the website needs only the MP3 files.

Use the pinned requirements in requirements-english-audio.txt. Model downloads
are explicit setup steps documented in Lern-App/ENGLISCH_NRW.md.
"""
import argparse
import concurrent.futures
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import time

_engine = None
_voice = None
_app = None
_encoder = None


def initialise(model_dir, voice, app, encoder):
    global _engine, _voice, _app, _encoder
    import onnxruntime as ort
    from kokoro_onnx import Kokoro
    options = ort.SessionOptions()
    options.intra_op_num_threads = 2
    options.inter_op_num_threads = 1
    options.log_severity_level = 3
    options.enable_cpu_mem_arena = False
    session = ort.InferenceSession(str(Path(model_dir) / "kokoro-v1.0.onnx"), sess_options=options, providers=["CPUExecutionProvider"])
    session.disable_fallback()
    _engine = Kokoro.from_session(session, str(Path(model_dir) / "voices-v1.0.bin"))
    _voice, _app, _encoder = voice, Path(app), encoder


def generate(item):
    import numpy as np
    import soundfile as sf
    text, relative_path = item
    destination = _app / relative_path
    if destination.is_file() and destination.stat().st_size > 500:
        return text
    spoken = re.sub(r"_{2,}", " blank ", text).replace("/", ", ")
    if text == "PE":
        spoken = "P. E."
    # Do not use a German phonemizer or a device's default voice.
    language = _voice["language"].lower()
    samples, sample_rate = _engine.create(spoken, voice=_voice["id"], speed=_voice["speed"], lang=language)
    if len(samples) < sample_rate * 0.12 or not np.isfinite(samples).all() or np.max(np.abs(samples)) < 0.005:
        raise ValueError(f"Empty or invalid speech for {text!r}")
    with tempfile.TemporaryDirectory(prefix="lernlabor-heart-") as temporary:
        pcm = Path(temporary) / "speech.wav"
        sf.write(str(pcm), samples, sample_rate, subtype="PCM_16")
        pending = destination.with_suffix(f".{os.getpid()}.pending.mp3")
        subprocess.run([_encoder, "--silent", "-m", "m", "-b", "64", "-q", "0", str(pcm), str(pending)], check=True)
        pending.replace(destination)
    return text


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--catalogue", required=True)
    parser.add_argument("--app", required=True)
    parser.add_argument("--model-dir", default=str(Path(tempfile.gettempdir()) / "lernlabor-kokoro-model"))
    parser.add_argument("--workers", type=int, default=3)
    args = parser.parse_args()
    catalogue = json.loads(Path(args.catalogue).read_text())
    voice = catalogue["voice"]
    for filename, checksum in [("kokoro-v1.0.onnx", voice["modelSha256"]), ("voices-v1.0.bin", voice["voicesSha256"])]:
        source = Path(args.model_dir) / filename
        if not source.exists():
            raise SystemExit(f"Missing {source}; see Lern-App/ENGLISCH_NRW.md for model setup.")
        if hashlib.sha256(source.read_bytes()).hexdigest() != checksum:
            raise SystemExit(f"Model checksum does not match: {source}")
    encoder = shutil.which("lame") or "/opt/homebrew/bin/lame"
    if not Path(encoder).is_file():
        raise SystemExit("Install LAME to encode the static MP3 files.")
    output = Path(args.app) / "audio" / "english"
    output.mkdir(parents=True, exist_ok=True)
    items = list(catalogue["manifest"].items())
    cached = [item for item in items if (Path(args.app) / item[1]).is_file() and (Path(args.app) / item[1]).stat().st_size > 500]
    remaining = [item for item in items if item not in cached]
    completed = len(cached)
    start = time.monotonic()
    print(f"{completed}/{len(items)} clips cached; generating {voice['name']} locally with full-precision Kokoro.", flush=True)
    with concurrent.futures.ProcessPoolExecutor(max_workers=max(1, min(args.workers, 4)), initializer=initialise,
            initargs=(args.model_dir, voice, args.app, encoder)) as executor:
        futures = [executor.submit(generate, item) for item in remaining]
        for future in concurrent.futures.as_completed(futures):
            future.result()
            completed += 1
            if completed % 100 == 0 or completed == len(items):
                print(f"{completed}/{len(items)} English clips ready ({time.monotonic()-start:.0f}s)", flush=True)


if __name__ == "__main__":
    main()
