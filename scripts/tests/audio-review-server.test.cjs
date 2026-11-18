const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {Readable, Writable} = require('node:stream');
const {test} = require('node:test');

// Exercise the real request handler and file streams without opening a port.
test('audio responses support full, bounded, open-ended and suffix byte ranges', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'audio-review-range-test-'));
  const app = path.join(root, 'Lern-App'); fs.mkdirSync(app);
  const bytes = Buffer.from('0123456789');
  fs.writeFileSync(path.join(app, 'test.mp3'), bytes);
  let handler;
  const server = {listen() {}, on() {}};
  const context = vm.createContext({require:name=>name==='node:http' ? {createServer:fn=>{handler=fn;return server;}} : require(name),
    __dirname:path.join(root,'scripts'), process, console, URL, setTimeout, clearTimeout});
  vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../audio-review-server.cjs'),'utf8'),context);
  async function request(range, method = 'GET') {
    const chunks = [];
    const response = new Writable({write(chunk, encoding, done) { chunks.push(chunk); done(); }});
    response.writeHead = (status, headers) => { response.status = status; response.headers = headers; };
    const finished = new Promise((resolve,reject)=>{response.on('finish',resolve);response.on('error',reject);});
    await handler({method,url:'/test.mp3',headers:{host:'127.0.0.1:4177',...(range?{range}:{})}},response);
    await finished;
    return {status:response.status,headers:response.headers,body:Buffer.concat(chunks).toString()};
  }
  try {
    const full = await request();
    assert.equal(full.status,200); assert.equal(full.body,bytes.toString());
    assert.equal(full.headers['Content-Length'],10); assert.equal(full.headers['Accept-Ranges'],'bytes');
    for (const [range, expected, contentRange] of [
      ['bytes=2-5','2345','bytes 2-5/10'],['bytes=7-','789','bytes 7-9/10'],
      ['bytes=-3','789','bytes 7-9/10'],['bytes=8-99','89','bytes 8-9/10'],
      ['bytes=-20','0123456789','bytes 0-9/10']]) {
      const result = await request(range);
      assert.equal(result.status,206,range); assert.equal(result.body,expected,range);
      assert.equal(result.headers['Content-Range'],contentRange,range);
      assert.equal(result.headers['Content-Length'],expected.length,range);
    }
    for (const range of ['bytes=10-','bytes=6-2','bytes=-0','bytes=-','bytes=0-1,4-5','invalid']) {
      const result = await request(range);
      assert.equal(result.status,416,range); assert.equal(result.body,'',range);
      assert.equal(result.headers['Content-Range'],'bytes */10',range);
    }
    const head = await request(undefined,'HEAD');
    assert.equal(head.status,200); assert.equal(head.body,''); assert.equal(head.headers['Content-Length'],10);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});

test('apply API validates cleanup selection and returns the updated catalogue and reviews', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(),'audio-review-api-test-'));
  const app = path.join(root,'Lern-App');
  fs.mkdirSync(path.join(app,'audio/english/review-previews'),{recursive:true});
  fs.mkdirSync(path.join(root,'scripts'));
  fs.copyFileSync(path.resolve(__dirname,'../apply-audio-corrections.cjs'),path.join(root,'scripts/apply-audio-corrections.cjs'));
  const file = `audio/english/${'1'.repeat(24)}.mp3`, previewFile = `audio/english/review-previews/${'2'.repeat(24)}.mp3`;
  const voice = {id:'bf_emma',signature:'test'};
  fs.writeFileSync(path.join(app,'english-audio-manifest.js'),`const englishAudioManifest={Hello:${JSON.stringify(file)}};const englishAudioVoice=${JSON.stringify(voice)};`);
  fs.writeFileSync(path.join(app,'audio-review-previews.js'),`const englishAudioPreviews={${JSON.stringify(file)}:${JSON.stringify({text:'Hello',previewFile,voice})}};`);
  fs.writeFileSync(path.join(app,'.audio-review-data.json'),JSON.stringify({version:1,reviews:[{text:'Hello',file,status:'good',note:'',updatedAt:'2026-11-18T10:00:00Z'}]}));
  const bytes = Buffer.concat([Buffer.from('ID3'),Buffer.alloc(600)]);
  fs.writeFileSync(path.join(app,file),bytes); fs.writeFileSync(path.join(app,previewFile),bytes);
  let handler;
  const context = vm.createContext({require:name=>name==='node:http' ? {createServer:fn=>{handler=fn;return {listen(){},on(){}};}} : require(name),
    __dirname:path.join(root,'scripts'),process,console,URL,setTimeout,clearTimeout});
  vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../audio-review-server.cjs'),'utf8'),context);
  async function request(url,body) {
    const req = Readable.from(body===undefined ? [] : [JSON.stringify(body)]);
    Object.assign(req,{url,method:body===undefined ? 'GET' : 'POST',headers:{host:'127.0.0.1:4177'}});
    const chunks = [];
    const res = new Writable({write(chunk,encoding,done){chunks.push(chunk);done();}});
    res.writeHead = status=>{res.status=status;};
    const finished = new Promise(resolve=>res.on('finish',resolve));
    await handler(req,res); await finished;
    return {status:res.status,body:JSON.parse(Buffer.concat(chunks).toString())};
  }
  try {
    assert.equal((await request('/api/apply-corrections',{deleteReplaced:'yes'})).status,400);
    assert.ok(fs.existsSync(path.join(app,file)));
    const applied = await request('/api/apply-corrections',{deleteReplaced:true});
    assert.equal(applied.status,200); assert.equal(applied.body.applied,1); assert.equal(applied.body.deleted,1);
    assert.notEqual(applied.body.manifest.Hello,file);
    assert.equal(Object.keys(applied.body.previews).length,0);
    assert.equal(fs.existsSync(path.join(app,file)),false);
    const state = await request('/api/state');
    assert.equal(state.body.manifest.Hello,applied.body.manifest.Hello);
    assert.equal(state.body.reviews.find(r=>r.file===applied.body.manifest.Hello).status,'good');
    assert.equal((await request('/api/apply-corrections',{})).body.applied,0);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
