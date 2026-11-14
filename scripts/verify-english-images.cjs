const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const app = path.resolve(__dirname, "../Lern-App");
const context = vm.createContext({});
for (const file of ["english.js", "english-speech.js", "english-images.js", "english-audio-manifest.js"]) {
  new vm.Script(fs.readFileSync(path.join(app, file), "utf8"), { filename: file }).runInContext(context);
}
const audit = vm.runInContext("collectEnglishImageAudit()", context);
const assets = new Set();
let sentenceCount = 0;
function checkImage(image, label) {
  assert.ok(image, `Missing image: ${label}`);
  assert.match(image.src, /^illustrations\/english\/[a-z0-9-]+\.svg$/, label);
  assert.ok(image.alt && !image.alt.includes("undefined"), `Missing accessible image description: ${label}`);
  const file = path.join(app, image.src);
  assert.ok(fs.existsSync(file), `Missing asset ${image.src}: ${label}`);
  const svg = fs.readFileSync(file, "utf8");
  assert.match(svg, /<svg\b/, file);
  assert.match(svg, /viewBox=/, file);
  assert.doesNotMatch(svg, /<script\b|<foreignObject\b|<image\b|(?:href|src)=["']https?:/i, file);
  assets.add(image.src);
}
assert.equal(audit.length, 1056);
const pools = vm.runInContext("englishPools", context);
const manifest = vm.runInContext("englishAudioManifest", context);
for (const row of audit) {
  const label = `${row.grade}/${row.mode}/${row.index}`;
  checkImage(row.image, label);
  for (const [sentence, image] of Object.entries(row.sentenceImages)) {
    checkImage(image, `${label}: ${sentence}`);
    sentenceCount++;
  }
  const card = pools[row.grade][row.mode][row.index];
  const passages = [...card.english.text.map(part => typeof part === "string" ? part : part.text),
    ...card.english.answer, ...Object.values(card.english.choices).flat(),
    ...(card.audioText ? [card.audioText] : []), ...(card.modelText ? [card.modelText] : [])];
  for (const passage of passages) {
    for (const sentence of context.splitEnglishImageSentences(passage)) {
      assert.ok(row.sentenceImages[context.englishImageTextKey(sentence)], `No explicit sentence assignment: ${label}: ${sentence}`);
      assert.ok(manifest[context.englishAudioKey(sentence)], `No sentence recording: ${sentence}`);
    }
  }
}
for (const [word, image] of Object.entries(vm.runInContext("englishVocabularyImages", context))) checkImage(image, `vocabulary: ${word}`);
console.log(`OK: ${audit.length} exercises, ${sentenceCount} explicit passage/sentence assignments, ${assets.size} SVG assets; sentence listening controls have recordings.`);
