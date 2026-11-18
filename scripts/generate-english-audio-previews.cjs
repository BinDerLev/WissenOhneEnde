#!/usr/bin/env node
// Generate separate corrected audio files for the review UI.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const crypto = require('node:crypto');
const {spawnSync} = require('node:child_process');

const root = path.resolve(__dirname, '..'), app = path.join(root, 'Lern-App');
const args = process.argv.slice(2), input = args[0];
if (!input) throw Error('Usage: node scripts/generate-english-audio-previews.cjs reviews.json [--all | --limit 6 | --file audio/english/<hash>.mp3] [--retry]');
const limitIndex = args.indexOf('--limit');
const fileIndex = args.indexOf('--file');
const requestedFile = fileIndex >= 0 ? args[fileIndex + 1] : null;
const option = name => { const i=args.indexOf(name); return i < 0 ? null : args[i+1]; };
const requestedVoice = option('--voice'), requestedSpeed = option('--speed'), requestedText = option('--spoken-text');
if (requestedVoice && !['bf_emma','af_heart'].includes(requestedVoice)) throw Error('Unsupported voice.');
if (requestedSpeed !== null && (!Number.isFinite(Number(requestedSpeed)) || Number(requestedSpeed)<0.7 || Number(requestedSpeed)>1.2)) throw Error('Speed must be between 0.7 and 1.2.');
if (requestedText !== null && (!requestedText.trim() || requestedText.length>2000)) throw Error('Spoken text must contain 1 to 2000 characters.');
const limit = limitIndex >= 0 ? Number(args[limitIndex + 1]) : 6;
if (requestedFile && !/^audio\/english\/[a-f0-9]{24}\.mp3$/.test(requestedFile)) throw Error('Invalid clip path.');
if (!args.includes('--all') && !requestedFile && (!Number.isInteger(limit) || limit < 1 || limit > 30)) throw Error('--limit must be an integer from 1 to 30.');

const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(app, 'english-audio-manifest.js'), 'utf8'), context);
const {manifest, voice, metadata} = vm.runInContext('({manifest:englishAudioManifest,voice:englishAudioVoice,metadata:typeof englishAudioMetadata === "undefined" ? {} : englishAudioMetadata})', context);
const data = JSON.parse(fs.readFileSync(input, 'utf8'));
if (data.version !== 1 || !Array.isArray(data.reviews)) throw Error('Invalid review export');

const bad = data.reviews.filter(r => r?.status === 'bad' && typeof r.text === 'string' && manifest[r.text] === r.file);
const requested = requestedFile ? bad.filter(r => r.file === requestedFile) : null;
if (requestedFile && requested.length !== 1) throw Error('Clip is not currently marked bad or no longer matches the active catalogue.');
const take = (predicate) => bad.find(r => predicate(r.text));
const selected = [];
const add = r => { if (r && !selected.some(item => item.file === r.file)) selected.push(r); };
// Start with varied examples: parenthesized labels, parentheticals in a sentence,
// an isolated word, a sentence, a blank exercise, and a question.
add(take(text => /^\(.+\)$/.test(text)));
add(take(text => /\(.+\)/.test(text) && !/^\(.+\)$/.test(text)));
add(take(text => /^[A-Za-z]+(?:['’][A-Za-z]+)*(?:-[A-Za-z]+)*$/.test(text)));
add(take(text => /[.!]/.test(text) && /\s/.test(text)));
add(take(text => /_{2,}/.test(text)));
add(take(text => /\?/.test(text)));
if (!args.includes('--all') && !requestedFile) for (const r of bad) { if (selected.length >= limit) break; add(r); }
const samples = requestedFile ? requested : args.includes('--all') ? bad : selected.slice(0, limit);
if (!samples.length) throw Error('No current bad reviews match the active audio catalogue.');

const voices = {bf_emma:['Emma','en-GB'], af_heart:['Heart','en-US']};
const previewPath=path.join(app,'audio-review-previews.js'), existingPreviews={};
if (fs.existsSync(previewPath)) {
  const oldContext=vm.createContext({}); vm.runInContext(fs.readFileSync(previewPath,'utf8'),oldContext);
  Object.assign(existingPreviews,vm.runInContext('typeof englishAudioPreviews === "undefined" ? {} : englishAudioPreviews',oldContext));
}
const prepared = samples.map(r => {
  const retry = args.includes('--retry');
  const previous = retry ? (existingPreviews[r.file]?.voice || metadata[r.text]?.voice || voice) : (metadata[r.text]?.voice || voice);
  const id = retry || args.includes('--same-voice') ? previous.id : previous.id === 'bf_emma' ? 'af_heart' : 'bf_emma';
  if (!voices[id]) throw Error(`Unsupported voice: ${id}`);
  const speeds = [0.88,0.95,1.02,1.08];
  const speedIndex = speeds.findIndex(speed => Math.abs(speed - previous.speed) < 0.01);
  const speed = retry ? speeds[(speedIndex + 1 + speeds.length) % speeds.length] : previous.speed;
  const chosenId=requestedVoice || id, chosenSpeed=requestedSpeed === null ? speed : Number(requestedSpeed);
  const next = {...previous, id:chosenId, speed:chosenSpeed, name:voices[chosenId][0], language:voices[chosenId][1], signature:`kokoro-v1.0-fp32:${chosenId}:${chosenSpeed}:mp3-64k:v1`};
  let spokenText=requestedText ?? existingPreviews[r.file]?.spokenText ?? (r.text==='PE' ? 'P. E.' : r.text);
  spokenText=spokenText.replace(/[()]/g,' ').replace(/_{2,}/g,' blank ').replace(/\//g,', ').replace(/\s+/g,' ').trim();
  const hash = crypto.createHash('sha256').update(`review-preview:${next.signature}:${r.file}:${r.text}:${spokenText}`).digest('hex').slice(0,24);
  const previewFile = `audio/english/review-previews/${hash}.mp3`;
  const method = retry ? `${next.name} · Tempo ${speed.toFixed(2)}` : `${previous.name} → ${next.name}${/[()]/.test(r.text) ? ' · Klammern entfernt' : ''}`;
  return {text:r.text,spokenText,clipStartSeconds:0,clipEndSeconds:0,sourceFile:r.file,previewFile,voice:next,method:`${next.name} · Tempo ${chosenSpeed.toFixed(2)}`};
});

const temporary = fs.mkdtempSync(path.join(os.tmpdir(),'english-audio-previews-'));
try {
  const cataloguePath = path.join(temporary,'catalogue.json');
  const previewVoice = prepared[0].voice;
  if (prepared.some(item => item.voice.id !== previewVoice.id || item.voice.speed !== previewVoice.speed)) throw Error('Preview set unexpectedly contains different voice settings.');
  fs.writeFileSync(cataloguePath,JSON.stringify({voice:previewVoice,spokenOverrides:Object.fromEntries(prepared.map(item=>[item.text,item.spokenText])),manifest:Object.fromEntries(prepared.map(item => [item.text,item.previewFile]))}));
  const cachedPython=path.join(root,'.cache/english-audio/bin/python');
  const python=process.env.ENGLISH_AUDIO_PYTHON || (fs.existsSync(cachedPython) ? cachedPython : 'python3');
  const cachedModelDir=path.join(root,'.cache/kokoro');
  const modelDir=process.env.ENGLISH_AUDIO_MODEL_DIR || (fs.existsSync(path.join(cachedModelDir,'kokoro-v1.0.onnx')) ? cachedModelDir : null);
  const result=spawnSync(python,[path.join(__dirname,'build_english_audio.py'),'--catalogue',cataloguePath,'--app',app,
    '--force',
    ...(modelDir ? ['--model-dir',modelDir] : []),
    ...(process.env.ENGLISH_AUDIO_WORKERS ? ['--workers',process.env.ENGLISH_AUDIO_WORKERS] : [])],{stdio:'inherit'});
  if (result.error || result.status !== 0) throw result.error || Error('Preview generation failed.');
  for (const item of prepared) {
    const file=path.join(app,item.previewFile), buffer=fs.readFileSync(file);
    if (buffer.length<500 || !(buffer.subarray(0,3).toString()==='ID3' || (buffer[0]===255 && (buffer[1]&224)===224))) throw Error(`Invalid preview MP3: ${item.text}`);
  }

  const previews={};
  if (fs.existsSync(previewPath)) {
    const oldContext=vm.createContext({}); vm.runInContext(fs.readFileSync(previewPath,'utf8'),oldContext);
    Object.assign(previews,vm.runInContext('typeof englishAudioPreviews === "undefined" ? {} : englishAudioPreviews',oldContext));
  }
  const superseded=[];
  for (const item of prepared) {
    const previous=previews[item.sourceFile];
    if (previous?.previewFile && previous.previewFile !== item.previewFile) superseded.push(previous.previewFile);
    if (previous?.fullPreviewFile && previous.fullPreviewFile !== item.previewFile) superseded.push(previous.fullPreviewFile);
    previews[item.sourceFile]=item;
  }
  const source=`// Generated by scripts/generate-english-audio-previews.cjs.\nconst englishAudioPreviews = ${JSON.stringify(previews,null,2)};\n`;
  fs.writeFileSync(`${previewPath}.pending`,source); fs.renameSync(`${previewPath}.pending`,previewPath);
  const currentFiles=new Set(Object.values(previews).flatMap(item=>[item.previewFile,item.fullPreviewFile].filter(Boolean)));
  for (const file of new Set(superseded)) if (!currentFiles.has(file) && /^audio\/english\/review-previews\/[a-f0-9]{24}\.mp3$/.test(file)) fs.rmSync(path.join(app,file),{force:true});
  console.log(`Prepared ${prepared.length} flagged corrections. Original manifest and recordings were not changed.`);
  if (!args.includes('--all')) for (const item of prepared) console.log(`${item.method}: ${item.text}`);
} finally { fs.rmSync(temporary,{recursive:true,force:true}); }
