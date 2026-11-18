#!/usr/bin/env node
// Publish a complete manifest only after all replacements have been generated.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const os = require('node:os');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..'), app = path.join(root, 'Lern-App');
const args = process.argv.slice(2), input = args.find(a => !a.startsWith('--'));
if (!input) throw Error('Usage: node scripts/regenerate-english-audio.cjs audio-reviews.json [--same-voice] [--dry-run]');
const sourcePath = path.join(app, 'english-audio-manifest.js');
const source = fs.readFileSync(sourcePath, 'utf8'), ctx = vm.createContext({});
vm.runInContext(source, ctx);
const {manifest, voice, metadata} = vm.runInContext('({manifest:englishAudioManifest,voice:englishAudioVoice,metadata:typeof englishAudioMetadata === "undefined" ? {} : englishAudioMetadata})', ctx);
const data = JSON.parse(fs.readFileSync(input, 'utf8'));
if (data.version !== 1 || !Array.isArray(data.reviews)) throw Error('Invalid review export');
const latest = new Map();
for (const r of data.reviews) {
  if (!r || typeof r.text !== 'string' || !/^audio\/english\/[a-f0-9]{24}\.mp3$/.test(r.file) || !['good','bad'].includes(r.status) || !Number.isFinite(Date.parse(r.updatedAt))) throw Error('Invalid review');
  if (!latest.has(r.file) || r.updatedAt > latest.get(r.file).updatedAt) latest.set(r.file, r);
}
const pool = {bf_emma:['Emma','en-GB'], af_heart:['Heart','en-US']};
const replacements = [...latest.values()].filter(r => r.status === 'bad' && Object.hasOwn(manifest,r.text) && manifest[r.text] === r.file).map(r => {
  const previous = metadata[r.text]?.voice || voice;
  const id = args.includes('--same-voice') ? previous.id : previous.id === 'bf_emma' ? 'af_heart' : 'bf_emma';
  if (!pool[id]) throw Error('Unknown voice');
  const next = {...previous,id,name:pool[id][0],language:pool[id][1],signature:`kokoro-v1.0-fp32:${id}:${previous.speed}:mp3-64k:v1`};
  const revision = crypto.randomUUID();
  const hash = crypto.createHash('sha256').update(`${next.signature}:${r.text}:${revision}`).digest('hex').slice(0,24);
  return {text:r.text,file:`audio/english/${hash}.mp3`,voice:next,revision};
});
console.log(`${replacements.length} current rejected recordings selected.`);
if (args.includes('--dry-run')) { for(const r of replacements) console.log(`${r.voice.id}: ${r.text}`); process.exit(0); }
if (!replacements.length) process.exit(0);
const lock = path.join(app,'english-audio-review.lock');
const handle = fs.openSync(lock,'wx');
const temp = fs.mkdtempSync(path.join(os.tmpdir(),'english-review-'));
try {
  for(const id of Object.keys(pool)) {
    const items = replacements.filter(r => r.voice.id === id); if(!items.length) continue;
    const cataloguePath = path.join(temp,`${id}.json`);
    fs.writeFileSync(cataloguePath,JSON.stringify({voice:items[0].voice,manifest:Object.fromEntries(items.map(r => [r.text,r.file]))}));
    const cachedPython=path.join(root,'.cache/english-audio/bin/python');
    const python=process.env.ENGLISH_AUDIO_PYTHON || (fs.existsSync(cachedPython) ? cachedPython : 'python3');
    const modelDir=process.env.ENGLISH_AUDIO_MODEL_DIR || path.join(root,'.cache/kokoro');
    const result=spawnSync(python,[path.join(__dirname,'build_english_audio.py'),'--catalogue',cataloguePath,'--app',app,'--model-dir',modelDir],{stdio:'inherit'});
    if(result.error || result.status !== 0) throw result.error || Error('Generation failed; active manifest unchanged');
  }
  for(const r of replacements) {
    const buffer=fs.readFileSync(path.join(app,r.file));
    if(buffer.length < 500 || !(buffer.subarray(0,3).toString() === 'ID3' || (buffer[0] === 255 && (buffer[1]&224) === 224))) throw Error('Invalid generated MP3');
    manifest[r.text]=r.file; metadata[r.text]={voice:r.voice,revision:r.revision};
  }
  if(fs.readFileSync(sourcePath,'utf8') !== source) throw Error('Manifest changed during generation; retry with current reviews');
  const pending=path.join(temp,'manifest.js');
  fs.writeFileSync(pending,`// Generated audio catalogue.\nconst englishAudioVoice = ${JSON.stringify(voice)};\nconst englishAudioManifest = ${JSON.stringify(manifest,null,2)};\nconst englishAudioMetadata = ${JSON.stringify(metadata,null,2)};\n`);
  // Copy beside the target so the final rename is atomic on the same filesystem.
  fs.copyFileSync(pending,`${sourcePath}.pending`); fs.renameSync(`${sourcePath}.pending`,sourcePath);
  console.log('Published. Reload audio-review.html to review the new recordings. Previous files retained.');
} finally { fs.closeSync(handle); fs.unlinkSync(lock); fs.rmSync(temp,{recursive:true,force:true}); }
