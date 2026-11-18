const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');

function player({backend = true, storage = true} = {}) {
  const elements = new Map(), stored = new Map(), requests = [], recordings = [];
  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector,{textContent:'',setAttribute(name,value){this[name]=value;}});
      return elements.get(selector);
    },
    querySelectorAll(){return [];}
  };
  const manifest = {Alpha:`audio/english/${'1'.repeat(24)}.mp3`,Beta:`audio/english/${'2'.repeat(24)}.mp3`};
  const context = vm.createContext({document,Date,englishAudioManifest:manifest,englishAudioTexts:new Set(Object.keys(manifest)),englishAudioKey:text=>text,
    localStorage:{getItem:key=>stored.get(key)||null,setItem(key,value){if(!storage)throw Error('quota');stored.set(key,value);}},
    fetch:async(url,options)=>{requests.push({url,body:JSON.parse(options.body)});return {ok:backend};},
    window:{Audio:class {constructor(){recordings.push(this);}play(){return Promise.resolve();}pause(){}}}
  });
  vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../../Lern-App/english-audio.js'),'utf8'),context);
  return {context,elements,stored,requests,recordings,manifest};
}

test('flags the last played immutable recording in the project and shared review storage', async () => {
  const {context,stored,requests,manifest,elements,recordings} = player();
  context.updateEnglishAudioReport();
  assert.equal(elements.get('#audio-report-button').disabled,true);
  context.speakEnglish('Alpha'); recordings[0].onended();
  await context.reportEnglishAudio();
  const review = JSON.parse(stored.get('lernlabor-audio-reviews-v1'))[manifest.Alpha];
  assert.equal(review.status,'bad'); assert.equal(review.text,'Alpha'); assert.equal(review.file,manifest.Alpha);
  assert.ok(Number.isFinite(Date.parse(review.updatedAt)));
  assert.equal(requests[0].url,'/api/review'); assert.deepEqual(requests[0].body.review,review);
  assert.equal(elements.get('#audio-report-button').disabled,true);
  assert.match(elements.get('#audio-report-status').textContent,/gemeldet/);
});

test('sequential playback flags the current part rather than the whole sequence', async () => {
  const {context,recordings,requests,manifest} = player();
  context.speakEnglish(['Alpha','Beta']); recordings[0].onended();
  await context.reportEnglishAudio();
  assert.equal(requests[0].body.file,manifest.Beta);
  assert.equal(requests[0].body.review.text,'Beta');
});

test('offline flags stay available to Audio Review and preserve unrelated reviews and notes', async () => {
  const {context,stored,manifest,elements} = player({backend:false});
  stored.set('lernlabor-audio-reviews-v1',JSON.stringify({
    [manifest.Alpha]:{text:'Alpha',file:manifest.Alpha,status:'good',note:'Wrong pronunciation'},
    [manifest.Beta]:{text:'Beta',file:manifest.Beta,status:'good'}
  }));
  context.speakEnglish('Alpha'); await context.reportEnglishAudio();
  const reviews = JSON.parse(stored.get('lernlabor-audio-reviews-v1'));
  assert.equal(reviews[manifest.Alpha].status,'bad');
  assert.equal(reviews[manifest.Alpha].note,'Wrong pronunciation');
  assert.equal(reviews[manifest.Beta].status,'good');
  assert.match(elements.get('#audio-report-status').textContent,/selben Browser/);
});

test('backend reporting succeeds even if browser storage is unavailable', async () => {
  const {context,elements,requests} = player({storage:false});
  context.speakEnglish('Alpha'); await context.reportEnglishAudio();
  assert.equal(requests.length,1);
  assert.equal(elements.get('#audio-report-button').disabled,true);
  assert.match(elements.get('#audio-report-status').textContent,/gemeldet/);
});

test('failed persistence allows retry and a late response never changes the newly selected recording', async () => {
  const {context,elements} = player({storage:false,backend:false});
  context.speakEnglish('Alpha'); await context.reportEnglishAudio();
  assert.equal(elements.get('#audio-report-button').disabled,false);
  assert.match(elements.get('#audio-report-status').textContent,/nicht gemeldet/);
  let resolve;
  context.fetch = ()=>new Promise(done=>{resolve=done;});
  const pending = context.reportEnglishAudio();
  context.speakEnglish('Beta');
  resolve({ok:true}); await pending;
  assert.equal(elements.get('#audio-report-target').textContent,'Zuletzt angehört: Beta');
  assert.equal(elements.get('#audio-report-status').textContent,'');
  assert.equal(elements.get('#audio-report-button').disabled,false);
});
