const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const { spawnSync } = require("node:child_process");
const { test } = require("node:test");

function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "english-audio-build-test-"));
  const scripts = path.join(root, "scripts");
  const app = path.join(root, "Lern-App");
  fs.mkdirSync(scripts);
  fs.mkdirSync(path.join(app, "audio", "english"), { recursive: true });
  fs.copyFileSync(path.resolve(__dirname, "../build-english-audio.cjs"), path.join(scripts, "build-english-audio.cjs"));
  fs.writeFileSync(path.join(app, "english.js"), "");
  fs.writeFileSync(path.join(app, "english-speech.js"), 'function collectEnglishAudioTexts() { return ["Hello!"]; }');
  const old = "audio/english/111111111111111111111111.mp3";
  const unrelated = "audio/english/222222222222222222222222.mp3";
  const original = `const englishAudioManifest = ${JSON.stringify({ "Hello!": old })};\n`;
  fs.writeFileSync(path.join(app, "english-audio-manifest.js"), original);
  fs.writeFileSync(path.join(app, old), Buffer.alloc(600));
  fs.writeFileSync(path.join(app, unrelated), Buffer.alloc(600));
  const fakePython = path.join(root, "fake-python");
  fs.writeFileSync(fakePython, `#!${process.execPath}
const fs = require("node:fs");
const path = require("node:path");
if (process.env.TEST_AUDIO_FAIL === "1") process.exit(7);
const args = process.argv;
const catalogue = JSON.parse(fs.readFileSync(args[args.indexOf("--catalogue") + 1], "utf8"));
const app = args[args.indexOf("--app") + 1];
for (const file of Object.values(catalogue.manifest)) fs.writeFileSync(path.join(app, file), Buffer.alloc(600));
`);
  fs.chmodSync(fakePython, 0o755);
  const run = (args = [], env = {}) => spawnSync(process.execPath, [path.join(scripts, "build-english-audio.cjs"), ...args], {
    cwd: root,
    env: { ...process.env, ENGLISH_AUDIO_PYTHON: fakePython, ENGLISH_AUDIO_VOICE: "bf_emma", ...env },
    encoding: "utf8"
  });
  try { callback({ root, app, old, unrelated, original, run }); }
  finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test("Emma is the default voice and uses British English", () => fixture(({ run }) => {
  const result = run(["--list"], { ENGLISH_AUDIO_VOICE: "" });
  assert.equal(result.status, 0, result.stderr);
  const catalogue = JSON.parse(result.stdout);
  assert.equal(catalogue.voice.id, "bf_emma");
  assert.equal(catalogue.voice.language, "en-GB");
}));

test("replacement publishes Emma and removes only the previous manifest's recordings", () => fixture(({ app, old, unrelated, run }) => {
  const result = run(["--replace"]);
  assert.equal(result.status, 0, result.stderr);
  const context = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(app, "english-audio-manifest.js"), "utf8"), context);
  assert.equal(vm.runInContext("englishAudioVoice.id", context), "bf_emma");
  assert.ok(fs.existsSync(path.join(app, vm.runInContext('englishAudioManifest["Hello!"]', context))));
  assert.equal(fs.existsSync(path.join(app, old)), false);
  assert.equal(fs.existsSync(path.join(app, unrelated)), true);
  assert.match(result.stdout, /Replaced 1 superseded recordings/);
}));

test("a failed generation keeps the active manifest and old audio intact", () => fixture(({ app, old, original, run }) => {
  const result = run(["--replace"], { TEST_AUDIO_FAIL: "1" });
  assert.equal(result.status, 7);
  assert.equal(fs.readFileSync(path.join(app, "english-audio-manifest.js"), "utf8"), original);
  assert.ok(fs.existsSync(path.join(app, old)));
}));
