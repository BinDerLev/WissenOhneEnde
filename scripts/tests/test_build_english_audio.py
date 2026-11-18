"""Check the text passed to speech synthesis without loading the audio model."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import Mock, patch

spec = importlib.util.spec_from_file_location(
    "build_english_audio", Path(__file__).resolve().parents[1] / "build_english_audio.py")
audio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio)


class SynthesisReached(Exception):
    pass


class SpokenTextTests(unittest.TestCase):
    def test_pe_default_and_custom_text_reach_the_engine(self):
        with tempfile.TemporaryDirectory() as temporary:
            audio._app = Path(temporary)
            audio._voice = {"id": "bf_emma", "speed": 0.95, "language": "en-GB"}
            for override in [None, "PE", "P.E.", "pee ee", "physical education"]:
                with self.subTest(override=override):
                    audio._spoken_overrides = {} if override is None else {"PE": override}
                    audio._engine = Mock()
                    audio._engine.create.side_effect = SynthesisReached
                    with patch.dict("sys.modules", {"numpy": Mock(), "soundfile": Mock()}):
                        with self.assertRaises(SynthesisReached):
                            audio.generate(("PE", "preview.mp3"))
                    self.assertEqual(audio._engine.create.call_args.args[0],
                                     "P. E." if override is None else override)


if __name__ == "__main__":
    unittest.main()
