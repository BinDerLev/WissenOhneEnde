const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');

test('PE uses its default pronunciation only until a custom spoken text is supplied', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'audio-preview-text-test-'));
  const app = path.join(root, 'Lern-App'); fs.mkdirSync(app);
  const file = 'audio/english/111111111111111111111111.mp3';
  const voice = {id:'bf_emma',name:'Emma',language:'en-GB',speed:0.95};
  fs.writeFileSync(path.join(app, 'english-audio-manifest.js'),
    `const englishAudioManifest = ${JSON.stringify({PE:file})}; const englishAudioVoice = ${JSON.stringify(voice)};`);
  const input = path.join(root, 'reviews.json');
  fs.writeFileSync(input, JSON.stringify({version:1,reviews:[{text:'PE',file,status:'bad'}]}));
  const source = fs.readFileSync(path.resolve(__dirname, '../generate-english-audio-previews.cjs'), 'utf8');
  function run(text) {
    let catalogue;
    const context = vm.createContext({
      require:name=>name==='node:child_process' ? {spawnSync(command, args) {
        catalogue = JSON.parse(fs.readFileSync(args[args.indexOf('--catalogue')+1], 'utf8'));
        for (const relative of Object.values(catalogue.manifest)) {
          const destination = path.join(app, relative);
          fs.mkdirSync(path.dirname(destination), {recursive:true});
          fs.writeFileSync(destination, Buffer.concat([Buffer.from('ID3'), Buffer.alloc(600)]));
        }
        return {status:0};
      }} : require(name),
      __dirname:path.join(root, 'scripts'), Buffer, console:{log(){}},
      process:{argv:['node','script',input,'--file',file,'--retry',...(text===undefined ? [] : ['--spoken-text',text])],env:{}}
    });
    vm.runInContext(source, context);
    const output = vm.createContext({});
    vm.runInContext(fs.readFileSync(path.join(app, 'audio-review-previews.js'), 'utf8'), output);
    const preview = vm.runInContext(`englishAudioPreviews[${JSON.stringify(file)}]`, output);
    assert.equal(preview.spokenText, catalogue.spokenOverrides.PE);
    return preview;
  }
  try {
    assert.equal(run().spokenText, 'P. E.');
    for (const text of ['PE', 'P.E.', 'pee ee', 'physical education']) {
      const preview = run(text);
      assert.equal(preview.spokenText, text);
      const retry = run();
      assert.equal(retry.spokenText, text);
    }
  } finally { fs.rmSync(root, {recursive:true,force:true}); }
});
