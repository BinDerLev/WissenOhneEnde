const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');
const source = fs.readFileSync(path.resolve(__dirname, '../../Lern-App/audio-review.js'), 'utf8');

function editor(duration = 2, correction = {}, manifest = null) {
  const elements = [], ids = {}, frames = new Map(), requests = [], listeners = {};
  let frame = 0;
  class Element {
    constructor(tag) {
      this.tagName = tag; this.children = []; this.dataset = {}; this.attributes = {};
      this.value = ''; this.paused = true; this.isConnected = true; this.currentTime = 0;
      const classes = new Set();
      this.classList = {toggle(name, on) { if (on) classes.add(name); else classes.delete(name); }, contains:name=>classes.has(name), add:name=>classes.add(name), remove:name=>classes.delete(name)};
      this.style = {setProperty() {}};
      elements.push(this);
    }
    append(...children) { this.children.push(...children); }
    add(child) { this.append(child); }
    replaceChildren() { this.children = []; }
    setAttribute(key, value) { this.attributes[key] = value; }
    addEventListener() {}
    querySelectorAll(selector) { return this.children.flatMap(child => [child,...child.querySelectorAll(selector)]).filter(child => selector.startsWith('.') ? child.className === selector.slice(1) : child.tagName === selector); }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    scrollIntoView() { this.scrolled = true; }
    pause() { const playing = !this.paused; this.paused = true; if (playing) this.onpause?.(); }
    async play() { this.paused = false; this.onplay?.(); }
    closest() { return null; }
  }
  const document = {
    getElementById(id) { return ids[id] ||= new Element('div'); },
    createElement(tag) { return new Element(tag); },
    querySelectorAll(selector) { return document.getElementById('list').querySelectorAll(selector); },
    querySelector(selector) { return selector === 'article.active-review' ? this.querySelectorAll('article').find(el=>el.classList.contains('active-review')) : null; },
    addEventListener(name, handler) { listeners[name] = handler; }
  };
  for (const id of ['status', 'kind', 'voice']) document.getElementById(id).value = 'all';
  const file = 'audio/english/111111111111111111111111.mp3';
  const context = vm.createContext({document, localStorage:{getItem:()=>null,setItem(){}},
    Option:Element, englishAudioManifest:manifest || {Hello:file}, englishAudioVoice:{id:'bf_emma'},
    englishAudioPreviews:correction === null ? {} : {[file]:{previewFile:'preview.mp3',voice:{id:'bf_emma'},...correction}},
    fetch:(url, options)=>{if(url!=='/api/clip')return new Promise(()=>{});requests.push(JSON.parse(options.body));return Promise.resolve({ok:true,json:async()=>({previews:{}})});}, requestAnimationFrame:fn=>{frames.set(++frame,fn);return frame;},
    cancelAnimationFrame:id=>frames.delete(id), window:{}, console});
  vm.runInContext(source, context);
  vm.runInContext('render()', context);
  const get = name => elements.find(el => el.className === name);
  const audio = get('clip-preview-source'); if (audio) { audio.duration = duration; audio.onloadedmetadata(); }
  const key = (key, editing = false) => { const event = {key,target:{closest:selector=>typeof editing === 'string' ? selector.split(',').includes(editing) : editing},preventDefault(){this.prevented=true;}}; listeners.keydown(event); return event; };
  return {context, elements, frames, audio, get, requests, document, key};
}

test('moving either trim boundary keeps the minimum length without relying on focus', () => {
  const {get} = editor();
  const start = get('clip-handle clip-start-handle'), end = get('clip-handle clip-end-handle');
  end.value = '500'; end.oninput();
  start.value = '900'; start.oninput();
  assert.equal(Number(start.value), 440);
  end.value = '100'; end.oninput();
  assert.equal(Number(end.value), 500);
});

test('a clip shorter than the minimum cannot produce crossed handles', () => {
  const {get} = editor(0.05);
  const start = get('clip-handle clip-start-handle'), end = get('clip-handle clip-end-handle');
  start.value = '999'; start.oninput(); end.value = '0'; end.oninput();
  assert.equal(Number(start.value), 0);
  assert.equal(Number(end.value), 1000);
});

test('preview stops at the selection boundary without waiting for timeupdate', async () => {
  const {get, audio, frames} = editor();
  const start = get('clip-handle clip-start-handle'), end = get('clip-handle clip-end-handle');
  start.value = '100'; start.oninput(); end.value = '500'; end.oninput();
  const button = get('clip-preview-button'); await button.onclick();
  assert.equal(audio.currentTime, 0.2);
  assert.equal(button.textContent, 'Vorschau stoppen');
  audio.currentTime = 1.01;
  [...frames.values()][0]();
  assert.equal(audio.paused, true);
  assert.equal(audio.currentTime, 0.2);
  assert.equal(button.textContent, 'Vorschau');
  assert.equal(frames.size, 0);
});

test('playing another player clears the preview button and animation', async () => {
  const {get, frames, audio} = editor();
  await get('clip-preview-button').onclick();
  await get('correction-audio').play();
  assert.equal(audio.paused, true);
  assert.equal(get('clip-preview-button').textContent, 'Vorschau');
  assert.equal(frames.size, 0);
});

test('non-finite media duration never enters the trim calculation', () => {
  const {get} = editor(Infinity);
  assert.equal(get('clip-readout').textContent, 'Wellenform wird geladen …');
});

test('render clamps a negative page after navigating an empty result', () => {
  const {context} = editor();
  vm.runInContext('page = -1; render()', context);
  assert.equal(vm.runInContext('page', context), 0);
});


test('trimming an already shortened clip sends cumulative cuts relative to the full source', async () => {
  const {get, elements, requests} = editor(7, {fullPreviewFile:'full.mp3',clipStartSeconds:2,clipEndSeconds:1});
  const fullAudio = elements.filter(el => el.className === 'clip-preview-source')[1];
  fullAudio.duration = 10; fullAudio.onloadedmetadata();
  const start = get('clip-handle clip-start-handle'), end = get('clip-handle clip-end-handle');
  start.value = '100'; start.oninput(); end.value = '800'; end.oninput();
  await get('clip-apply-button').onclick();
  assert.equal(requests.length, 1);
  assert.ok(Math.abs(requests[0].start - 2.7) < 1e-9);
  assert.ok(Math.abs(requests[0].end - 2.4) < 1e-9);
});

for (const status of ['all', 'pending']) test(`originals support playback, ratings and review history in ${status} view`, () => {
  const manifest = Object.fromEntries(['Alpha','Beta','Gamma'].map((text,i)=>[text,`audio/english/${String(i+1).repeat(24)}.mp3`]));
  const {context, document, key} = editor(2, null, manifest);
  vm.runInContext(`$('status').value=${JSON.stringify(status)}; render()`, context);
  const selected = () => document.querySelector('article.active-review');
  assert.equal(selected().dataset.file, manifest.Alpha);
  assert.equal(selected().attributes['aria-current'], 'true');
  assert.equal(key('Enter').prevented, true);
  assert.equal(selected().querySelector('.original-audio').paused, false);
  key('ArrowRight');
  assert.equal(vm.runInContext(`reviews[${JSON.stringify(manifest.Alpha)}].status`, context), 'good');
  assert.equal(selected().dataset.file, manifest.Beta);
  assert.equal(selected().scrolled, true);
  key('ArrowLeft');
  assert.equal(vm.runInContext(`reviews[${JSON.stringify(manifest.Beta)}].status`, context), 'bad');
  assert.equal(selected().dataset.file, manifest.Gamma);
  key('ArrowUp');
  assert.equal(selected().dataset.file, manifest.Beta);
  key('ArrowUp');
  assert.equal(selected().dataset.file, manifest.Alpha);
  assert.equal(document.querySelectorAll('article').filter(el=>el.classList.contains('active-review')).length, 1);
  const event = key('ArrowLeft', true);
  assert.equal(event.prevented, undefined);
  assert.equal(vm.runInContext(`reviews[${JSON.stringify(manifest.Alpha)}].status`, context), 'good');
});

test('keyboard navigation crosses pages and Enter still prefers an available correction', () => {
  const manifest = Object.fromEntries(Array.from({length:22},(_,i)=>[`Word ${String(i).padStart(2,'0')}`,`audio/english/${i.toString(16).padStart(24,'0')}.mp3`]));
  const {context, document, key} = editor(2, null, manifest);
  for (let i=0; i<20; i++) key('ArrowRight');
  assert.equal(vm.runInContext('page', context), 1);
  assert.equal(document.querySelector('article.active-review').dataset.file, manifest['Word 20']);
  key('ArrowUp');
  assert.equal(vm.runInContext('page', context), 0);
  assert.equal(document.querySelector('article.active-review').dataset.file, manifest['Word 19']);
  const corrected = editor();
  corrected.key('Enter');
  assert.equal(corrected.get('correction-audio').paused, false);
  assert.equal(corrected.get('original-audio').paused, true);
});

test('Enter plays the selected original or correction with focus on a button or audio control', () => {
  for (const correction of [null, {}]) {
    const {key, get} = editor(2, correction);
    const player = get(correction ? 'correction-audio' : 'original-audio');
    for (const target of ['button', 'audio']) {
      player.pause();
      assert.equal(key('Enter', target).prevented, true);
      assert.equal(player.paused, false);
    }
    for (const target of ['input', 'textarea', 'select', '[contenteditable="true"]']) {
      player.pause();
      assert.equal(key('Enter', target).prevented, undefined);
      assert.equal(player.paused, true);
    }
  }
});

test('apply button publishes approved corrections with the chosen cleanup option and refreshes the list', async () => {
  const {context,document} = editor();
  const file = 'audio/english/111111111111111111111111.mp3';
  const nextFile = 'audio/english/222222222222222222222222.mp3';
  vm.runInContext(`backendConnected=true; reviews[${JSON.stringify(file)}]={text:'Hello',file:${JSON.stringify(file)},status:'good'}; render()`,context);
  const button = document.getElementById('apply-corrections');
  assert.equal(button.disabled,false); assert.equal(button.textContent,'Übernehmen (1)');
  document.getElementById('delete-replaced').checked = true;
  const calls = [];
  context.fetch = async (url,options) => {
    calls.push({url,body:JSON.parse(options.body)});
    return {ok:true,json:async()=>url==='/api/reviews' ? {reviews:[]} : {
      manifest:{Hello:nextFile},voice:{id:'bf_emma'},metadata:{},previews:{},
      reviews:[{text:'Hello',file:nextFile,status:'good'}],message:'1 Korrektur übernommen.'
    }};
  };
  await button.onclick();
  assert.equal(calls[0].url,'/api/reviews');
  assert.deepEqual(calls[1],{url:'/api/apply-corrections',body:{deleteReplaced:true}});
  assert.equal(document.querySelectorAll('article')[0].dataset.file,nextFile);
  assert.equal(button.disabled,true); assert.equal(button.textContent,'Übernehmen (0)');
  assert.match(document.getElementById('message').textContent,/1 Korrektur übernommen/);
});
