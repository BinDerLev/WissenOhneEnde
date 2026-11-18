const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

function readCatalogue(app) {
  const context = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(app, 'english-audio-manifest.js'), 'utf8'), context);
  return vm.runInContext('({manifest:englishAudioManifest,voice:englishAudioVoice,metadata:typeof englishAudioMetadata === "undefined" ? {} : englishAudioMetadata})', context);
}

function applyCorrections(app, reviews, previews, {deleteReplaced = false} = {}) {
  const lock = path.join(app, 'english-audio-review.lock');
  const handle = fs.openSync(lock, 'wx');
  try {
    const catalogue = readCatalogue(app), {manifest, metadata} = catalogue;
    const latest = new Map();
    for (const review of reviews) {
      if (!latest.has(review.file) || review.updatedAt > latest.get(review.file).updatedAt) latest.set(review.file, review);
    }
    const prepared = [];
    for (const [sourceFile, correction] of Object.entries(previews)) {
      const review = latest.get(sourceFile);
      if (review?.status !== 'good' || review.text !== correction.text || manifest[correction.text] !== sourceFile) continue;
      if (!/^audio\/english\/[a-f0-9]{24}\.mp3$/.test(sourceFile) ||
          !/^audio\/english\/review-previews\/[a-f0-9]{24}\.mp3$/.test(correction.previewFile || '')) throw Error('Ungültiger Audiopfad in einer Korrektur.');
      if (!correction.voice?.signature || !['bf_emma','af_heart'].includes(correction.voice.id)) throw Error('Ungültige Stimme in einer Korrektur.');
      const buffer = fs.readFileSync(path.join(app, correction.previewFile));
      if (buffer.length <= 500 || !(buffer.subarray(0,3).toString() === 'ID3' || (buffer[0] === 255 && (buffer[1]&224) === 224))) throw Error(`Ungültige MP3-Korrektur: ${correction.text}`);
      const revision = crypto.randomUUID();
      const hash = crypto.createHash('sha256').update(`${correction.voice.signature}:${correction.text}:${revision}`).digest('hex').slice(0,24);
      prepared.push({sourceFile, correction, review, buffer, revision, file:`audio/english/${hash}.mp3`});
    }
    if (!prepared.length) return {...catalogue,reviews,previews,applied:0,deleted:0,warnings:[]};
    // Validate the entire selection before copying or publishing anything.
    const created = [];
    const manifestPath = path.join(app, 'english-audio-manifest.js');
    try {
      for (const item of prepared) {
        fs.writeFileSync(path.join(app, item.file), item.buffer, {flag:'wx'});
        created.push(item.file);
        manifest[item.correction.text] = item.file;
        metadata[item.correction.text] = {
          voice:item.correction.voice, revision:item.revision,
          spokenText:item.correction.spokenText || item.correction.text,
          clipStartSeconds:item.correction.clipStartSeconds || 0,
          clipEndSeconds:item.correction.clipEndSeconds || 0
        };
      }
      const source = `// Generated audio catalogue.\nconst englishAudioVoice = ${JSON.stringify(catalogue.voice)};\nconst englishAudioManifest = ${JSON.stringify(manifest,null,2)};\nconst englishAudioMetadata = ${JSON.stringify(metadata,null,2)};\n`;
      fs.writeFileSync(`${manifestPath}.pending`, source);
      fs.renameSync(`${manifestPath}.pending`, manifestPath);
    } catch (error) {
      for (const file of created) fs.rmSync(path.join(app,file), {force:true});
      fs.rmSync(`${manifestPath}.pending`, {force:true});
      throw error;
    }
    const nextPreviews = {...previews}, nextReviews = [...reviews], warnings = [];
    for (const item of prepared) {
      delete nextPreviews[item.sourceFile];
      nextReviews.push({...item.review,file:item.file,updatedAt:new Date().toISOString()});
    }
    // The catalogue is already published; cleanup failures must not undo valid audio.
    for (const [name, source] of [
      ['.audio-review-data.json', JSON.stringify({version:1,reviews:nextReviews},null,2)+'\n'],
      ['audio-review-previews.js', `const englishAudioPreviews = ${JSON.stringify(nextPreviews,null,2)};\n`]
    ]) {
      try {
        const target = path.join(app,name);
        fs.writeFileSync(`${target}.pending`,source); fs.renameSync(`${target}.pending`,target);
      } catch (error) { warnings.push(`${name} konnte nicht aktualisiert werden: ${error.message}`); }
    }
    let deleted = 0;
    if (deleteReplaced) {
      const referenced = new Set([...Object.values(manifest), ...Object.entries(nextPreviews).flatMap(([file,p])=>[file,p.previewFile,p.fullPreviewFile])]);
      for (const file of new Set(prepared.map(item=>item.sourceFile))) {
        if (referenced.has(file) || !fs.existsSync(path.join(app,file))) continue;
        try { fs.unlinkSync(path.join(app,file)); deleted++; }
        catch (error) { warnings.push(`${file} konnte nicht gelöscht werden: ${error.message}`); }
      }
    }
    return {...catalogue,reviews:nextReviews,previews:nextPreviews,applied:prepared.length,deleted,warnings};
  } finally { fs.closeSync(handle); fs.unlinkSync(lock); }
}

module.exports = {readCatalogue, applyCorrections};
