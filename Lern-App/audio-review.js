/* Reviews are tied to the exact immutable recording path, never just the text. */
const reviewKey = 'lernlabor-audio-reviews-v1';
const $ = id => document.getElementById(id);
const pageSize = 20;
let reviews = {}, page = 0, backendConnected = false, activeFile = null, forcedVisibleFile = null;
let reviewTrail = [], trailIndex = -1;
let previews = typeof englishAudioPreviews === 'undefined' ? {} : englishAudioPreviews;
let applyingCorrections = false;
try { reviews = JSON.parse(localStorage.getItem(reviewKey) || '{}'); } catch { $('message').textContent = 'Lokale Bewertungen konnten nicht geladen werden. Bitte Sicherung importieren.'; }
let metadata = typeof englishAudioMetadata === 'undefined' ? {} : englishAudioMetadata;
let clips = Object.entries(englishAudioManifest).map(([text, file]) => ({text, file, voice: metadata[text]?.voice || englishAudioVoice}));
for (const id of [...new Set(clips.map(c => c.voice.id))].sort()) { const o = new Option(id, id); $('voice').add(o); }

function recordsToMap(records) { return Object.fromEntries(records.map(review => [review.file, review])); }
function mergeMaps(...maps) {
  const merged = {};
  for (const map of maps) for (const [file, review] of Object.entries(map || {})) {
    if (!merged[file] || (review.updatedAt || '') > (merged[file].updatedAt || '')) merged[file] = review;
  }
  return merged;
}
function saveLocal() {
  try {
    localStorage.setItem(reviewKey, JSON.stringify(reviews));
    if (backendConnected) $('backend-status').textContent = `Mit lokalem Backend verbunden · ${Object.keys(reviews).length} Bewertungen im Projekt gespeichert.`;
    return true;
  } catch { $('message').textContent = 'Lokales Zwischenspeichern fehlgeschlagen.'; return false; }
}
async function syncReview(file) {
  if (!backendConnected) return;
  try {
    const response = await fetch('/api/review', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({file,review:reviews[file] || null})});
    if (!response.ok) throw Error((await response.json()).error || 'Speichern fehlgeschlagen');
  } catch (error) {
    backendConnected = false; $('generate-corrections').disabled = true;
    updateApplyButton();
    $('backend-status').textContent = `Backendverbindung verloren. Änderungen bleiben zunächst im Browser: ${error.message}`;
  }
}
function current(c) { const r = reviews[c.file]; return r?.text === c.text ? r : null; }
function updateCatalogue(state) {
  if (!state.manifest) return;
  metadata = state.metadata || {};
  clips = Object.entries(state.manifest).map(([text,file])=>({text,file,voice:metadata[text]?.voice || state.voice}));
}
function updateApplyButton() {
  const count = clips.filter(c=>previews[c.file] && current(c)?.status === 'good').length;
  $('apply-corrections').textContent = `Übernehmen (${count})`;
  $('apply-corrections').disabled = !backendConnected || applyingCorrections || count === 0;
  $('delete-replaced').disabled = !backendConnected || applyingCorrections;
}
function filtered() {
  return clips.filter(c => {
    const r = current(c), status = r?.status || 'pending', hasCorrection = Boolean(previews[c.file]);
    const inCorrectionQueue = hasCorrection && (status !== 'good' || c.file === forcedVisibleFile);
    const word = !/\s/.test(c.text);
    return c.text.toLowerCase().includes($('search').value.toLowerCase())
      && ($('status').value === 'all' || ($('status').value === 'corrections' ? inCorrectionQueue : status === $('status').value || c.file === forcedVisibleFile))
      && ($('kind').value === 'all' || word === ($('kind').value === 'word'))
      && ($('voice').value === 'all' || c.voice.id === $('voice').value);
  }).sort((a,b) => $('sort').value === 'short' ? a.text.length-b.text.length
    : $('sort').value === 'long' ? b.text.length-a.text.length
    : $('sort').value === 'review' ? (current(b)?.updatedAt || '').localeCompare(current(a)?.updatedAt || '')
    : a.text.localeCompare(b.text, 'en'));
}
function setActiveFile(file, record = true) {
  activeFile = file;
  document.querySelectorAll('article').forEach(article => {
    const selected = article.dataset.file === file;
    article.classList.toggle('active-review', selected);
    article.setAttribute('aria-current', String(selected));
  });
  if (record && file && reviewTrail[trailIndex] !== file) {
    reviewTrail = reviewTrail.slice(0, trailIndex + 1);
    reviewTrail.push(file); trailIndex = reviewTrail.length - 1;
  }
}
function activate(file, record = true) {
  setActiveFile(file, record);
  const rows = filtered(), index = rows.findIndex(row => row.file === file);
  if (index >= 0) page = Math.floor(index / pageSize);
  render();
  scrollActiveIntoView();
}
function rateClip(clip, status) {
  const before = filtered(), oldIndex = before.findIndex(row => row.file === clip.file);
  if (status === 'pending') delete reviews[clip.file];
  else reviews[clip.file] = {text:clip.text,file:clip.file,status,note:current(clip)?.note || '',updatedAt:new Date().toISOString()};
  saveLocal(); void syncReview(clip.file);
  forcedVisibleFile = null;
  const after = filtered(), stillVisible = after.some(row => row.file === clip.file);
  const targetIndex = stillVisible ? oldIndex + 1 : oldIndex;
  let next = after[targetIndex] || after[targetIndex - 1] || null;
  if (!next && status === 'bad' && stillVisible) next = clip;
  activeFile = next?.file || null; if (next) setActiveFile(next.file);
  if (next) page = Math.floor(after.findIndex(row => row.file === next.file) / pageSize);
  render();
  scrollActiveIntoView();
}
function goBack() {
  let previousFile = null;
  if (trailIndex > 0) { trailIndex--; previousFile = reviewTrail[trailIndex]; }
  const candidates = $('status').value === 'corrections' ? clips.filter(clip => previews[clip.file]) : filtered();
  if (!previousFile && activeFile) {
    const index = candidates.findIndex(clip => clip.file === activeFile);
    previousFile = candidates[index - 1]?.file;
  }
  if (!previousFile) return;
  forcedVisibleFile = previousFile;
  activate(previousFile, false);
}
function scrollActiveIntoView() {
  document.querySelector('article.active-review')?.scrollIntoView({block:'nearest'});
}
function playActiveRecording() {
  const clip = clips.find(item => item.file === activeFile) || filtered()[0];
  if (!clip) return;
  const article = [...$('list').querySelectorAll('article')].find(item => item.dataset.file === clip.file);
  const audio = article?.querySelector('.correction-audio') || article?.querySelector('.original-audio');
  if (audio) { audio.play().catch(() => {}); }
}
function render() {
  updateApplyButton();
  document.querySelectorAll('audio').forEach(a => a.pause());
  const rows = filtered(), pages = Math.max(1, Math.ceil(rows.length/pageSize)); page = Math.max(0, Math.min(page, pages-1));
  const pageRows = rows.slice(page*pageSize,(page+1)*pageSize);
  if (!pageRows.some(row => row.file === activeFile)) setActiveFile(pageRows[0]?.file || null);
  $('summary').textContent = `${rows.length} Treffer · ${clips.filter(c => !current(c)).length} ungeprüft · ${clips.filter(c => current(c)?.status === 'bad').length} falsch · ${Object.keys(previews).length} Korrekturen · ${clips.length} insgesamt`;
  $('list').replaceChildren();
  if (!pageRows.length) {
    const empty = document.createElement('p'); empty.className = 'empty-state';
    empty.textContent = $('status').value === 'corrections' ? 'Alle Korrekturen sind als gut markiert.' : 'Keine Aufnahmen für diese Auswahl.';
    $('list').append(empty);
  }
  for (const c of pageRows) {
    const r = current(c), correction = previews[c.file], article = document.createElement('article'), text = document.createElement('p'), meta = document.createElement('p'), audio = document.createElement('audio'), note = document.createElement('textarea');
    article.dataset.file = c.file; article.classList.toggle('active-review', c.file === activeFile);
    article.setAttribute('aria-current', String(c.file === activeFile));
    article.addEventListener('pointerdown', event => {
      if (event.target.closest('textarea,input,select')) return;
      setActiveFile(c.file); forcedVisibleFile = r?.status === 'good' ? c.file : null;
    });
    text.textContent = c.text; text.lang = 'en'; meta.className = 'meta'; meta.textContent = `${c.voice.name} (${c.voice.language}) · ${r?.status === 'good' ? 'Richtig' : r?.status === 'bad' ? 'Falsch' : 'Ungehört / ungeprüft'}`;
    audio.className = 'original-audio'; audio.controls = true; audio.preload = 'none'; audio.src = c.file;
    audio.setAttribute('aria-label', `Original abspielen: ${c.text}`);
    audio.onplay = () => { setActiveFile(c.file); document.querySelectorAll('audio').forEach(a => { if(a !== audio) a.pause(); }); };
    audio.onerror = () => { meta.textContent += ' · Aufnahme nicht verfügbar'; };
    note.placeholder = 'Notiz, z. B. Aussprache oder fehlendes Wort'; note.setAttribute('aria-label', `Notiz zu ${c.text}`); note.value = r?.note || '';
    article.append(text,meta,audio,note);
    if (correction) {
      const correctionLabel = document.createElement('p'), correctionAudio = document.createElement('audio');
      correctionLabel.className = 'preview-label'; correctionLabel.textContent = `Korrektur · ${correction.voice.name} (${correction.voice.language}) · ${correction.method}${correction.clipStartSeconds||correction.clipEndSeconds ? ` · Schnitt: −${correction.clipStartSeconds||0}s / −${correction.clipEndSeconds||0}s` : ''}`;
      correctionAudio.className = 'correction-audio'; correctionAudio.controls = true; correctionAudio.preload = 'none'; correctionAudio.src = correction.previewFile;
      correctionAudio.setAttribute('aria-label', `Korrektur anhören: ${c.text}`);
      correctionAudio.onplay = () => { setActiveFile(c.file); document.querySelectorAll('audio').forEach(a => { if(a !== correctionAudio) a.pause(); }); };
      article.append(correctionLabel, correctionAudio);
      const fullPreviewFile=correction.fullPreviewFile||correction.previewFile, clipWorkBench=document.createElement('div'); clipWorkBench.className='clip-workbench';
      const waveformBox=document.createElement('div'); waveformBox.className='clip-waveform-box';
      const waveform=document.createElement('canvas'); waveform.className='clip-waveform'; waveform.setAttribute('role','img'); waveform.setAttribute('aria-label',`Wellenform und Schnittbereich für ${c.text}`);
      const selection=document.createElement('div'); selection.className='clip-selection';
      const startHandle=document.createElement('input'); startHandle.type='range'; startHandle.min='0'; startHandle.max='1000'; startHandle.step='1'; startHandle.value='0'; startHandle.className='clip-handle clip-start-handle'; startHandle.setAttribute('aria-label','Schnittpunkt am Anfang verschieben');
      const endHandle=document.createElement('input'); endHandle.type='range'; endHandle.min='0'; endHandle.max='1000'; endHandle.step='1'; endHandle.value='1000'; endHandle.className='clip-handle clip-end-handle'; endHandle.setAttribute('aria-label','Schnittpunkt am Ende verschieben');
      const startLabel=document.createElement('label'),endLabel=document.createElement('label');
      startLabel.textContent='Anfang';endLabel.textContent='Ende';startLabel.append(startHandle);endLabel.append(endHandle);
      waveformBox.append(waveform,selection,startLabel,endLabel);
      const clipReadout=document.createElement('span'); clipReadout.className='clip-readout'; clipReadout.textContent='Wellenform wird geladen …';
      const clipButtons=document.createElement('div'); clipButtons.className='clip-buttons';
      const previewButton=document.createElement('button'); previewButton.type='button'; previewButton.className='clip-preview-button'; previewButton.textContent='Vorschau';
      const applyButton=document.createElement('button'); applyButton.type='button'; applyButton.className='clip-apply-button'; applyButton.textContent='Schnitt anwenden';
      clipButtons.append(previewButton,applyButton); clipWorkBench.append(waveformBox,clipReadout,clipButtons); article.append(clipWorkBench);
      if((Number(correction.clipStartSeconds)||0)>0||(Number(correction.clipEndSeconds)||0)>0){
        const restoreButton=document.createElement('button');restoreButton.type='button';restoreButton.className='clip-restore-button';restoreButton.textContent='Original';restoreButton.title='Ungekürzte Aufnahme wiederherstellen';clipButtons.append(restoreButton);
        restoreButton.onclick=async()=>{restoreButton.disabled=true;try{const response=await fetch('/api/clip',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({file:c.file,start:0,end:0})});const result=await response.json();if(!response.ok)throw Error(result.error||'Wiederherstellung fehlgeschlagen');previews=result.previews;render();$('message').textContent='Ungekürzte Aufnahme wiederhergestellt.';}catch(error){restoreButton.disabled=false;$('message').textContent=`Wiederherstellung fehlgeschlagen: ${error.message}`;}};
      }
      const clipPreviewAudio=document.createElement('audio'); clipPreviewAudio.className='clip-preview-source'; clipPreviewAudio.preload='metadata'; clipPreviewAudio.src=correction.previewFile; article.append(clipPreviewAudio);
      const fullPreviewDurationAudio=document.createElement('audio'); fullPreviewDurationAudio.className='clip-preview-source'; fullPreviewDurationAudio.preload=fullPreviewFile===correction.previewFile?'none':'metadata'; fullPreviewDurationAudio.src=fullPreviewFile; article.append(fullPreviewDurationAudio);
      clipPreviewAudio.onplay=()=>document.querySelectorAll('audio').forEach(player=>{if(player!==clipPreviewAudio)player.pause();});
      let duration=0, sourceDuration=0, previewEnd=0, previewFrame=0;
      const resetPreview=()=>{cancelAnimationFrame(previewFrame);previewFrame=0;previewEnd=0;previewButton.textContent='Vorschau';};
      const checkPreviewEnd=()=>{
        if(!clipPreviewAudio.isConnected||clipPreviewAudio.paused){resetPreview();return;}
        if(previewEnd&&clipPreviewAudio.currentTime>=previewEnd){clipPreviewAudio.pause();clipPreviewAudio.currentTime=selectedTimes().start;resetPreview();return;}
        previewFrame=requestAnimationFrame(checkPreviewEnd);
      };
      clipPreviewAudio.onpause=resetPreview;
      const selectedTimes=()=>({start:duration*Number(startHandle.value)/1000,end:duration*Number(endHandle.value)/1000});
      const updateSelection=(changedHandle)=>{
        if(!Number.isFinite(duration)||duration<=0)return;
        const gap=Math.min(1000,Math.max(1,Math.ceil(120/duration))); let start=Number(startHandle.value), end=Number(endHandle.value);
        if(end-start<gap){if(changedHandle===startHandle)start=Math.max(0,end-gap);else end=Math.min(1000,start+gap);}
        if(end-start<gap){start=Math.max(0,end-gap);end=Math.min(1000,start+gap);}
        startHandle.value=String(start);endHandle.value=String(end);
        waveformBox.style.setProperty('--clip-start',`${start/10}%`);waveformBox.style.setProperty('--clip-end',`${end/10}%`);
        const times=selectedTimes(),trimEnd=duration-times.end;
        clipReadout.textContent=`${times.start.toFixed(2)} s – ${times.end.toFixed(2)} s im aktuellen Audioclip (${duration.toFixed(2)} s)`;
        startHandle.setAttribute('aria-valuetext',`${times.start.toFixed(2)} Sekunden ab Anfang`);endHandle.setAttribute('aria-valuetext',`${times.end.toFixed(2)} Sekunden ab Anfang`);
        clipWorkBench.dataset.start=String(times.start);clipWorkBench.dataset.end=String(trimEnd);
      };
      clipPreviewAudio.onloadedmetadata=()=>{
        if(!Number.isFinite(clipPreviewAudio.duration)||clipPreviewAudio.duration<=0)return;
        duration=clipPreviewAudio.duration;
        if(fullPreviewFile===correction.previewFile)sourceDuration=duration;
        startHandle.value='0';endHandle.value='1000';updateSelection();
      };
      fullPreviewDurationAudio.onloadedmetadata=()=>{sourceDuration=fullPreviewDurationAudio.duration;};
      startHandle.oninput=()=>updateSelection(startHandle);endHandle.oninput=()=>updateSelection(endHandle);
      clipPreviewAudio.onended=resetPreview;
      previewButton.onclick=async()=>{
        if(!duration){$('message').textContent='Wellenform und Clipdauer werden noch geladen.';return;}
        if(!clipPreviewAudio.paused){clipPreviewAudio.pause();previewEnd=0;previewButton.textContent='Vorschau';return;}
        const times=selectedTimes();if(times.end-times.start<0.12){$('message').textContent='Der Ausschnitt muss mindestens 0,12 Sekunden lang sein.';return;}
        document.querySelectorAll('audio').forEach(player=>player.pause());clipPreviewAudio.currentTime=times.start;previewEnd=times.end;
        try{await clipPreviewAudio.play();if(!clipPreviewAudio.paused){previewButton.textContent='Vorschau stoppen';previewFrame=requestAnimationFrame(checkPreviewEnd);}}catch(error){resetPreview();$('message').textContent=`Vorschau fehlgeschlagen: ${error.message}`;}
      };
      applyButton.onclick=async()=>{
        if(!Number.isFinite(duration)||duration<=0||!Number.isFinite(sourceDuration)||sourceDuration<=0){$('message').textContent='Wellenform und Clipdauer werden noch geladen.';return;}
        const times=selectedTimes();
        if(times.end-times.start<0.12){$('message').textContent='Der Ausschnitt muss mindestens 0,12 Sekunden lang sein.';return;}
        const priorStart=Number(correction.clipStartSeconds)||0,priorEnd=Number(correction.clipEndSeconds)||0;
        const baseDuration=Math.max(0,sourceDuration-priorStart-priorEnd);
        const absoluteStart=priorStart+(times.start/duration)*baseDuration;
        const absoluteEnd=priorEnd+((duration-times.end)/duration)*baseDuration;
        applyButton.disabled=true;$('message').textContent=`Schnitt für „${c.text}“ wird angewendet …`;
        try{
          const response=await fetch('/api/clip',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({file:c.file,start:absoluteStart,end:absoluteEnd})});
          const result=await response.json();if(!response.ok)throw Error(result.error||'Schnitt fehlgeschlagen');
          previews=result.previews;render();$('message').textContent=`Schnitt angewendet: ${times.start.toFixed(2)}–${times.end.toFixed(2)} s im Audioclip.`;
        }catch(error){applyButton.disabled=false;$('message').textContent=`Schnitt fehlgeschlagen: ${error.message}`;}
      };
      fetch(correction.previewFile).then(response=>{if(!response.ok)throw Error('Audiodatei nicht verfügbar');return response.arrayBuffer();}).then(async buffer=>{
        const AudioContextClass=window.AudioContext||window.webkitAudioContext;if(!AudioContextClass)throw Error('Web Audio nicht verfügbar');
        const context=new AudioContextClass();
        try {
        const decoded=await context.decodeAudioData(buffer.slice(0)),data=decoded.getChannelData(0);
        if(!waveform.isConnected)return;
        const bounds=waveform.getBoundingClientRect(),scale=window.devicePixelRatio||1,width=Math.max(320,Math.round(bounds.width*scale)),height=Math.round(64*scale);
        waveform.width=width;waveform.height=height;const ctx=waveform.getContext('2d');ctx.clearRect(0,0,width,height);ctx.strokeStyle='#397e91';ctx.lineWidth=Math.max(1,scale);
        const count=Math.max(1,Math.floor(width/(3*scale)));for(let i=0;i<count;i++){const from=Math.floor(i*data.length/count),to=Math.max(from+1,Math.floor((i+1)*data.length/count));let peak=0;for(let j=from;j<to;j++)peak=Math.max(peak,Math.abs(data[j]));const bar=Math.max(scale,peak*(height*.84));ctx.beginPath();ctx.moveTo(i*width/count,(height-bar)/2);ctx.lineTo(i*width/count,(height+bar)/2);ctx.stroke();}
        updateSelection();
        } finally { await context.close(); }
      }).catch(error=>{clipReadout.textContent=`Wellenform nicht verfügbar: ${error.message}`;});
      if (correction.spokenText && correction.spokenText !== c.text) {
        const transcript=document.createElement('p'); transcript.className='correction-transcript'; transcript.textContent=`Sprechtext: ${correction.spokenText}`; article.append(transcript);
      }
    }
    const actions = document.createElement('div'); actions.className = 'rating-actions';
    for (const [status,label,kind] of [['bad','← Schlecht','reject'],['good','Gut →','accept']]) {
      const button = document.createElement('button'); button.type='button'; button.className=`rating-${kind}`; button.textContent=label;
      button.setAttribute('aria-pressed',String(r?.status===status)); button.setAttribute('aria-label',`${label} bewerten: ${c.text}`);
      button.onclick = () => { setActiveFile(c.file); rateClip(c,status); }; actions.append(button);
    }
    if (correction) {
      const options=document.createElement('details'); options.className='correction-options';
      const summary=document.createElement('summary'); summary.textContent='Einstellungen: Stimme, Tempo und Text'; options.append(summary);
      const voiceLabel=document.createElement('label'); voiceLabel.textContent='Stimme';
      const voiceSelect=document.createElement('select'); voiceSelect.className='correction-voice'; voiceSelect.setAttribute('aria-label','Stimme für Korrektur');
      for(const [id,name] of [['bf_emma','Emma (Britisch)'],['af_heart','Heart (US)']]) { const option=document.createElement('option'); option.value=id; option.textContent=name; voiceSelect.append(option); }
      voiceSelect.value=correction.voice.id; voiceLabel.append(voiceSelect);
      const speedLabel=document.createElement('label'); speedLabel.textContent='Tempo';
      const speedInput=document.createElement('input'); speedInput.type='number'; speedInput.min='0.7'; speedInput.max='1.2'; speedInput.step='0.01'; speedInput.value=correction.voice.speed; speedInput.className='correction-speed'; speedInput.setAttribute('aria-label','Sprechtempo zwischen 0,7 und 1,2'); speedLabel.append(speedInput);
      const textLabel=document.createElement('label'); textLabel.textContent='Sprechtext';
      const spokenInput=document.createElement('textarea'); spokenInput.className='correction-spoken-text'; spokenInput.maxLength=2000; spokenInput.value=correction.spokenText || c.text; spokenInput.setAttribute('aria-label','Text für neu generierte Aufnahme'); textLabel.append(spokenInput);
      options.append(voiceLabel,speedLabel,textLabel); article.append(options);
      const retry = document.createElement('button'); retry.type='button'; retry.className='rating-retry'; retry.textContent='Korrektur neu generieren';
      retry.setAttribute('aria-label',`Korrektur neu generieren: ${c.text}`);
      retry.onclick = async () => {
        retry.disabled=true; $('message').textContent=`Korrektur für „${c.text}“ wird neu erzeugt …`;
        try {
          const speed=Number(speedInput.value), spokenText=spokenInput.value.trim();
          if(!Number.isFinite(speed)||speed<0.7||speed>1.2||!spokenText||spokenText.length>2000) throw Error('Bitte Tempo 0,7–1,2 und einen Sprechtext mit höchstens 2000 Zeichen eingeben.');
          const response=await fetch('/api/correction',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({file:c.file,voice:voiceSelect.value,speed,spokenText})});
          const result=await response.json(); if(!response.ok) throw Error(result.error || 'Erzeugen fehlgeschlagen');
          previews=result.previews; render(); $('message').textContent=`Korrektur erneuert: ${previews[c.file].method}`;
        } catch(error) { retry.disabled=false; $('message').textContent=`Korrektur fehlgeschlagen: ${error.message}`; }
      };
      actions.append(retry);
    }
    const reset = document.createElement('button'); reset.type='button'; reset.className='rating-reset'; reset.textContent='Zurücksetzen';
    reset.onclick=()=>{setActiveFile(c.file);rateClip(c,'pending');}; actions.append(reset); article.append(actions);
    note.onchange = () => {
      if (reviews[c.file]) { reviews[c.file].note = note.value; reviews[c.file].updatedAt = new Date().toISOString(); saveLocal(); void syncReview(c.file); }
    };
    $('list').append(article);
  }
  $('page').textContent = `${page+1} / ${pages}`; $('previous').disabled = page === 0; $('next').disabled = page === pages-1;
}

for (const id of ['search','status','kind','voice','sort']) $(id).addEventListener('input', () => { page=0; activeFile=null; forcedVisibleFile=null; reviewTrail=[]; trailIndex=-1; render(); });
$('previous').onclick = () => { if ($('status').value === 'corrections') goBack(); else { page=Math.max(0,page-1); activeFile=filtered()[page*pageSize]?.file || null; render(); } };
$('next').onclick = () => { page=Math.min(Math.ceil(filtered().length/pageSize)-1,page+1); activeFile=filtered()[page*pageSize]?.file || null; render(); };
document.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.target.closest('input,textarea,select,summary,a,[contenteditable="true"]')) {
    event.preventDefault();
    playActiveRecording();
    return;
  }
  if (event.target.closest('input,textarea,select,button,summary,a,audio,[contenteditable="true"]')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); const clip=clips.find(item=>item.file===activeFile) || filtered()[0];
    if (clip) rateClip(clip,event.key==='ArrowRight'?'good':'bad');
  } else if (event.key === 'ArrowUp') { event.preventDefault(); goBack(); }
});
$('export').onclick = () => { const url = URL.createObjectURL(new Blob([JSON.stringify({version:1,reviews:Object.values(reviews)},null,2)],{type:'application/json'})); const a=document.createElement('a'); a.href=url; a.download='audio-reviews.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); };
$('import').onchange = async e => {
  try {
    const file = e.target.files[0]; if (!file) return;
    const data=JSON.parse(await file.text()); if(data.version !== 1 || !Array.isArray(data.reviews)) throw Error('Ungültiges Format');
    const imported = {};
    for(const r of data.reviews) {
      if(!r || typeof r.text !== 'string' || !/^audio\/english\/[a-f0-9]{24}\.mp3$/.test(r.file) || !['good','bad'].includes(r.status) || typeof r.note !== 'string' || !Number.isFinite(Date.parse(r.updatedAt))) throw Error('Ungültige Bewertung');
      imported[r.file] = r;
    }
    reviews = mergeMaps(reviews, imported); saveLocal();
    if (backendConnected) {
      const response = await fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reviews:Object.values(imported)})});
      const result=await response.json(); if(!response.ok) throw Error(result.error || 'Backend-Import fehlgeschlagen');
      reviews=recordsToMap(result.reviews); saveLocal();
    }
    render(); $('message').textContent=`Bewertungen importiert${backendConnected ? ' und im Projekt gespeichert' : ' (nur in diesem Browser)'}; ältere Aufnahmeversionen bleiben erhalten.`;
  } catch(err) { $('message').textContent=`Import fehlgeschlagen: ${err.message}`; }
  e.target.value = '';
};
$('generate-corrections').onclick = async () => {
  const button=$('generate-corrections'); button.disabled=true; $('message').textContent='Korrekturen für alle geflaggten Aufnahmen werden lokal erzeugt …';
  try {
    const response=await fetch('/api/corrections',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
    const result=await response.json(); if(!response.ok) throw Error(result.error || 'Erzeugen fehlgeschlagen');
    previews=result.previews; $('status').value='corrections'; page=0; activeFile=null; forcedVisibleFile=null; render(); $('message').textContent=result.message || 'Korrekturen erzeugt. Du kannst jede Aufnahme neben dem Original abspielen.';
  } catch(error) { $('message').textContent=`Korrekturen fehlgeschlagen: ${error.message}`; }
  finally { button.disabled=!backendConnected; }
};
$('apply-corrections').onclick = async () => {
  applyingCorrections = true; updateApplyButton();
  $('message').textContent = 'Freigegebene Korrekturen werden übernommen …';
  try {
    const sync = await fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reviews:Object.values(reviews)})});
    const synced = await sync.json(); if (!sync.ok) throw Error(synced.error || 'Bewertungen konnten nicht gespeichert werden.');
    const response = await fetch('/api/apply-corrections',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deleteReplaced:$('delete-replaced').checked})});
    const result = await response.json(); if (!response.ok) throw Error(result.error || 'Übernahme fehlgeschlagen');
    updateCatalogue(result); previews = result.previews; reviews = recordsToMap(result.reviews); saveLocal();
    page = 0; activeFile = null; forcedVisibleFile = null; reviewTrail = []; trailIndex = -1;
    $('status').value = Object.keys(previews).length ? 'corrections' : 'all';
    render(); $('message').textContent = `${result.message} Bereits geöffnete Lern-App-Seiten bitte neu laden.`;
  } catch (error) { $('message').textContent = `Übernahme fehlgeschlagen: ${error.message}`; }
  finally { applyingCorrections = false; updateApplyButton(); }
};

async function boot() {
  try {
    const response=await fetch('/api/state'); if(!response.ok) throw Error('Backend nicht erreichbar');
    const state=await response.json(); backendConnected=true; previews=state.previews || {};
    updateCatalogue(state);
    reviews=mergeMaps(reviews,recordsToMap(state.reviews || [])); saveLocal();
    const sync=await fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reviews:Object.values(reviews)})});
    const result=await sync.json(); if(!sync.ok) throw Error(result.error || 'Datenabgleich fehlgeschlagen');
    reviews=recordsToMap(result.reviews); saveLocal();
    $('backend-status').textContent=`Mit lokalem Backend verbunden · ${Object.keys(reviews).length} Bewertungen im Projekt gespeichert.`;
    $('generate-corrections').disabled=false;
    if (Object.keys(previews).length) $('status').value='corrections';
  } catch {
    backendConnected=false;
    $('backend-status').textContent='Backend nicht verbunden. Starte node scripts/audio-review-server.cjs und öffne danach http://127.0.0.1:4177/audio-review.html.';
  }
  render();
}
boot();
