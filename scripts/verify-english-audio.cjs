const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");
const os = require("node:os");

const app = path.resolve(__dirname, "../Lern-App");
const context = vm.createContext({});
for (const file of ["english.js", "english-speech.js", "english-audio-manifest.js"]) {
  new vm.Script(fs.readFileSync(path.join(app, file), "utf8")).runInContext(context);
}
const { manifest, voice, texts, metadata } = vm.runInContext("({ manifest: englishAudioManifest, voice: englishAudioVoice, texts: collectEnglishAudioTexts(), metadata: typeof englishAudioMetadata === 'undefined' ? {} : englishAudioMetadata })", context);
assert.match(voice.language, /^en-/);
assert.equal(Object.keys(manifest).length, texts.length, "manifest must match the entire English catalogue");
let bytes = 0;
for (const text of texts) {
  assert.doesNotMatch(text, /[äöüßÄÖÜ]|\b(?:und|nicht|Schreibe|Wähle|Ergänze|wird|sind)\b/, `German text leaked: ${text}`);
  assert.equal(voice.engine, "Kokoro 82M");
  const expected = crypto.createHash("sha256").update(`${(metadata[text]?.voice || voice).signature}:${text}${metadata[text]?.revision ? `:${metadata[text].revision}` : ""}`).digest("hex").slice(0, 24);
  assert.equal(manifest[text], `audio/english/${expected}.mp3`, "recordings must use the chosen voice and exact text");
  const buffer = fs.readFileSync(path.join(app, manifest[text]));
  assert.ok(buffer.length > 500, `empty/truncated clip: ${text}`);
  assert.ok(buffer.subarray(0, 3).toString() === "ID3" || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0), `not MP3: ${text}`);
  bytes += buffer.length;
}

// Decode actual short words and complete stories, not just their file headers.
const decoder = "/opt/homebrew/bin/lame";
if (fs.existsSync(decoder)) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "lernlabor-audio-check-"));
  const samples = vm.runInContext('["apple", "Hello!", "butterfly", "three", ...[3, 4, 5, 6].map(grade => englishStories[grade][0][0])]', context);
  try {
    for (const [index, text] of samples.entries()) {
      const output = path.join(temp, `${index}.wav`);
      const result = spawnSync(decoder, ["--silent", "--decode", path.join(app, manifest[text]), output]);
      assert.equal(result.status, 0, `MP3 could not be decoded: ${text}`);
      const pcm = fs.readFileSync(output);
      const data = pcm.indexOf(Buffer.from("data"));
      assert.ok(data >= 0 && pcm.length > data + 1000);
      let peak = 0;
      for (let offset = data + 8; offset + 1 < pcm.length; offset += 2) peak = Math.max(peak, Math.abs(pcm.readInt16LE(offset)));
      assert.ok(peak > 100, `silent recording: ${text}`);
    }
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
}
console.log(`OK: ${texts.length} English MP3 clips, ${(bytes / 1024 / 1024).toFixed(1)} MiB, ${voice.name} (${voice.language}); sampled words and stories decode to non-silent audio.`);
