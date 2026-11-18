"""Trim an existing MP3 preview by decoding, slicing PCM frames, and re-encoding."""
import argparse
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import wave


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--start', required=True, type=float, help='Seconds to remove from the beginning.')
    parser.add_argument('--end', required=True, type=float, help='Seconds to remove from the end.')
    parser.add_argument('--encoder', default=shutil.which('lame') or '/opt/homebrew/bin/lame')
    args = parser.parse_args()
    source, destination = Path(args.input), Path(args.output)
    if not source.is_file() or not 0 <= args.start <= 30 or not 0 <= args.end <= 30:
        raise SystemExit('Invalid input file or trim duration.')
    with tempfile.TemporaryDirectory(prefix='audio-review-clip-') as temporary:
        temporary = Path(temporary)
        decoded = temporary / 'decoded.wav'
        trimmed = temporary / 'trimmed.wav'
        encoded = temporary / 'trimmed.mp3'
        subprocess.run([args.encoder, '--silent', '--decode', str(source), str(decoded)], check=True)
        with wave.open(str(decoded), 'rb') as original:
            params = original.getparams()
            total = original.getnframes()
            start = round(args.start * params.framerate)
            end = total - round(args.end * params.framerate)
            if start < 0 or end > total or end - start < round(params.framerate * 0.12):
                raise SystemExit('Der Schnitt lässt weniger als 0,12 Sekunden übrig.')
            original.setpos(start)
            frames = original.readframes(end - start)
        with wave.open(str(trimmed), 'wb') as output:
            output.setparams(params)
            output.writeframes(frames)
        subprocess.run([args.encoder, '--silent', '-m', 'm', '-b', '64', '-q', '0', str(trimmed), str(encoded)], check=True)
        if encoded.stat().st_size < 500:
            raise SystemExit('The clipped MP3 is invalid.')
        destination.parent.mkdir(parents=True, exist_ok=True)
        pending = destination.with_name(f'{destination.stem}.{os.getpid()}.pending.mp3')
        shutil.copyfile(encoded, pending)
        pending.replace(destination)


if __name__ == '__main__':
    main()
