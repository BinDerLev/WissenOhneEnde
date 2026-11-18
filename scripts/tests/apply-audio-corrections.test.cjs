const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const vm = require('node:vm');
const {test} = require('node:test');
const {applyCorrections,readCatalogue} = require('../apply-audio-corrections.cjs');

function fixture(callback) {
  const app = fs.mkdtempSync(path.join(os.tmpdir(),'apply-audio-test-'));
  fs.mkdirSync(path.join(app,'audio/english/review-previews'),{recursive:true});
  const voice = {id:'bf_emma',name:'Emma',language:'en-GB',speed:0.95,signature:'kokoro:test'};
  const manifest = {}, previews = {}, reviews = [];
  const audio = Buffer.concat([Buffer.from('ID3'),Buffer.alloc(600,7)]);
  for (const [i,text,status] of [[1,'PE','good'],[2,'Hello','good'],[3,'Bad','bad'],[4,'Pending',null]]) {
    const file = `audio/english/${String(i).repeat(24)}.mp3`;
    const previewFile = `audio/english/review-previews/${String(i).repeat(24)}.mp3`;
    manifest[text] = file;
    previews[file] = {text,sourceFile:file,previewFile,voice,spokenText:text==='PE' ? 'pee ee' : text,clipStartSeconds:0.3,clipEndSeconds:0.2};
    fs.writeFileSync(path.join(app,file),audio);
    fs.writeFileSync(path.join(app,previewFile),audio);
    if(status) reviews.push({file,text,status,note:'reviewed',updatedAt:'2026-11-18T10:00:00.000Z'});
  }
  fs.writeFileSync(path.join(app,'english-audio-manifest.js'),`const englishAudioVoice=${JSON.stringify(voice)};const englishAudioManifest=${JSON.stringify(manifest)};const englishAudioMetadata={};`);
  try { callback({app,manifest,previews,reviews,audio}); }
  finally { fs.rmSync(app,{recursive:true,force:true}); }
}

test('publishes approved correction bytes and metadata; retains originals by default', () => fixture(({app,manifest,previews,reviews,audio}) => {
  const result = applyCorrections(app,reviews,previews);
  assert.equal(result.applied,2); assert.equal(result.deleted,0); assert.deepEqual(result.warnings,[]);
  const published = readCatalogue(app);
  for (const text of ['PE','Hello']) {
    assert.notEqual(published.manifest[text],manifest[text]);
    assert.deepEqual(fs.readFileSync(path.join(app,published.manifest[text])),audio);
    assert.ok(fs.existsSync(path.join(app,manifest[text])));
    const meta = published.metadata[text];
    const hash = crypto.createHash('sha256').update(`${meta.voice.signature}:${text}:${meta.revision}`).digest('hex').slice(0,24);
    assert.equal(published.manifest[text],`audio/english/${hash}.mp3`);
    assert.equal(meta.clipStartSeconds,0.3); assert.equal(meta.clipEndSeconds,0.2);
    assert.equal(result.reviews.find(r=>r.file===published.manifest[text]).status,'good');
    assert.equal(result.previews[manifest[text]],undefined);
  }
  assert.equal(published.metadata.PE.spokenText,'pee ee');
  assert.equal(published.manifest.Bad,manifest.Bad);
  assert.equal(published.manifest.Pending,manifest.Pending);
  const context = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(app,'audio-review-previews.js'),'utf8'),context);
  assert.equal(vm.runInContext('Object.keys(englishAudioPreviews).length',context),2);
  assert.equal(JSON.parse(fs.readFileSync(path.join(app,'.audio-review-data.json'),'utf8')).reviews.length,reviews.length+2);
  assert.equal(applyCorrections(app,result.reviews,result.previews).applied,0);
  assert.equal(applyCorrections(app,reviews,previews).applied,0,'stale input cannot republish already applied corrections');
}));

test('optional cleanup deletes replaced originals but protects all remaining references', () => fixture(({app,manifest,previews,reviews}) => {
  const target = path.join(app,'english-audio-manifest.js');
  fs.appendFileSync(target,`englishAudioManifest.Alias=${JSON.stringify(manifest.PE)};`);
  const result = applyCorrections(app,reviews,previews,{deleteReplaced:true});
  assert.equal(result.applied,2); assert.equal(result.deleted,1);
  assert.ok(fs.existsSync(path.join(app,manifest.PE)));
  assert.equal(fs.existsSync(path.join(app,manifest.Hello)),false);
  assert.ok(fs.existsSync(path.join(app,manifest.Bad)));
  assert.ok(fs.existsSync(path.join(app,previews[manifest.Hello].previewFile)));
}));

for (const invalid of ['missing','corrupt','path']) test(`rejects ${invalid} correction before changing the catalogue or deleting files`, () => fixture(({app,manifest,previews,reviews}) => {
  const target = path.join(app,'english-audio-manifest.js'), before = fs.readFileSync(target,'utf8');
  const correction = previews[manifest.Hello];
  if (invalid==='missing') fs.unlinkSync(path.join(app,correction.previewFile));
  if (invalid==='corrupt') fs.writeFileSync(path.join(app,correction.previewFile),'not an MP3');
  if (invalid==='path') correction.previewFile='../escape.mp3';
  assert.throws(()=>applyCorrections(app,reviews,previews,{deleteReplaced:true}));
  assert.equal(fs.readFileSync(target,'utf8'),before);
  for(const file of Object.values(manifest)) assert.ok(fs.existsSync(path.join(app,file)));
  assert.equal(fs.existsSync(path.join(app,'english-audio-review.lock')),false);
}));

test('respects an existing catalogue publication lock', () => fixture(({app,reviews,previews}) => {
  fs.writeFileSync(path.join(app,'english-audio-review.lock'),'busy');
  assert.throws(()=>applyCorrections(app,reviews,previews),{code:'EEXIST'});
  assert.ok(fs.existsSync(path.join(app,'english-audio-review.lock')));
}));
