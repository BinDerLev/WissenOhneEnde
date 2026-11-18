let englishPlayback = null;
let englishAudioAdvance = null;
let englishLastAudio = null;
const englishAudioReportsPending = new Set();
const englishAudioReportedFiles = new Set();
const englishAudioReviewKey = 'lernlabor-audio-reviews-v1';

function renderEnglishAudioReport() {
  return `<div class="english-audio-report" id="audio-report-panel" hidden><button class="hint-button" type="button" id="audio-report-button" disabled>Audio melden</button><span id="audio-report-target">Höre eine Aufnahme an, um sie zu melden.</span><p id="audio-report-status" role="status"></p></div>`;
}

function updateEnglishAudioReport(message = '') {
  const button = document.querySelector('#audio-report-button');
  if (!button) return;
  let reported = englishAudioReportedFiles.has(englishLastAudio?.file);
  try {
    const reviews = JSON.parse(localStorage.getItem(englishAudioReviewKey) || '{}');
    reported ||= reviews?.[englishLastAudio?.file]?.status === 'bad';
  } catch {}
  button.disabled = !englishLastAudio || reported || englishAudioReportsPending.has(englishLastAudio.file);
  button.textContent = reported ? 'Audio gemeldet' : 'Audio melden';
  button.setAttribute('aria-label', englishLastAudio ? `Audio melden: ${englishLastAudio.text}` : 'Zuletzt gehörte Aufnahme melden');
  const target = document.querySelector('#audio-report-target');
  if (target) target.textContent = englishLastAudio ? `Zuletzt angehört: ${englishLastAudio.text}` : 'Höre eine Aufnahme an, um sie zu melden.';
  const status = document.querySelector('#audio-report-status');
  if (status) status.textContent = message;
}

async function reportEnglishAudio() {
  if (!englishLastAudio || englishAudioReportsPending.has(englishLastAudio.file)) return;
  const clip = {...englishLastAudio};
  englishAudioReportsPending.add(clip.file);
  updateEnglishAudioReport('Audio wird gemeldet …');
  let savedLocally = false;
  const review = {...clip,status:'bad',note:'In LernLabor als fehlerhaft gemeldet.',updatedAt:new Date().toISOString()};
  try {
    const stored = JSON.parse(localStorage.getItem(englishAudioReviewKey) || '{}');
    if (!stored || Array.isArray(stored) || typeof stored !== 'object') throw Error('Ungültige lokale Bewertungen.');
    if (typeof stored[clip.file]?.note === 'string' && stored[clip.file].note) review.note = stored[clip.file].note;
    stored[clip.file] = review;
    localStorage.setItem(englishAudioReviewKey, JSON.stringify(stored));
    savedLocally = true;
  } catch {}
  let message;
  try {
    const response = await fetch('/api/review', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({file:clip.file,review})});
    if (!response.ok) throw Error('Backend nicht erreichbar');
    englishAudioReportedFiles.add(clip.file);
    message = 'Audio gemeldet. Nach Neuladen von Audio Review erscheint diese Aufnahme als schlecht.';
  } catch {
    message = savedLocally
      ? 'Audio auf diesem Gerät gemeldet. Öffne Audio Review im selben Browser, um die Meldung zu bearbeiten.'
      : 'Audio konnte nicht gemeldet werden. Bitte versuche es erneut.';
  } finally {
    englishAudioReportsPending.delete(clip.file);
  }
  if (englishLastAudio?.file === clip.file) updateEnglishAudioReport(message);
}

function englishVoiceLabel() {
  return typeof englishAudioVoice !== "undefined" ? `Englische Stimme: ${englishAudioVoice.name}. ` : "";
}

function englishAudioStatus(message) {
  const status = document.querySelector("#audio-status");
  if (status) status.textContent = message;
}

function stopEnglishAudio() {
  const playback = englishPlayback;
  englishPlayback = null;
  englishAudioAdvance = null;
  if (playback?.timer && typeof window !== "undefined") window.clearTimeout(playback.timer);
  if (playback?.audio) {
    playback.audio.onended = null;
    playback.audio.onerror = null;
    playback.audio.pause();
  }
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  document.querySelectorAll(".is-speaking").forEach(element => element.classList.remove("is-speaking"));
}

function speakEnglish(textOrParts) {
  const parts = (Array.isArray(textOrParts) ? textOrParts : [textOrParts]).map(englishAudioKey).filter(Boolean);
  // Fail closed: neither arbitrary input nor unmarked German text can be spoken.
  if (!parts.length || parts.some(text => !englishAudioTexts.has(text))) return;
  const pendingAdvance = englishAudioAdvance;
  stopEnglishAudio();
  englishAudioAdvance = pendingAdvance;
  const playback = { audio: null, timer: null, index: 0 };
  englishPlayback = playback;

  const finish = () => {
    if (englishPlayback !== playback) return;
    if (playback.timer && typeof window !== "undefined") window.clearTimeout(playback.timer);
    englishPlayback = null;
    document.querySelectorAll(".is-speaking").forEach(element => element.classList.remove("is-speaking"));
    const advance = englishAudioAdvance;
    englishAudioAdvance = null;
    if (advance) advance();
  };
  const next = () => {
    if (englishPlayback !== playback) return;
    if (playback.index >= parts.length) { finish(); return; }
    const partIndex = playback.index++;
    const text = parts[partIndex];
    const isCurrent = () => englishPlayback === playback && playback.index === partIndex + 1;
    const partEnded = () => { if (isCurrent()) next(); };
    let fallbackStarted = false;
    englishAudioStatus(`${englishVoiceLabel()}Du kannst Wörter und Texte erneut anhören.`);
    document.querySelectorAll("[data-english-speech]").forEach(element => {
      element.classList.toggle("is-speaking", englishAudioKey(element.dataset.englishSpeech) === text);
    });

    const fallback = () => {
      if (!isCurrent() || fallbackStarted) return;
      fallbackStarted = true;
      if (playback.audio) {
        playback.audio.onended = null;
        playback.audio.onerror = null;
        playback.audio.pause();
        playback.audio = null;
      }
      // Use recordings exclusively. A browser can expose an English language tag
      // while still falling back to its German system voice on some devices.
      englishAudioStatus("Die englische Aufnahme ist gerade nicht verfügbar. Versuche es noch einmal.");
      finish();
    };
    const file = typeof englishAudioManifest !== "undefined" ? englishAudioManifest[text] : null;
    englishLastAudio = file ? {text,file} : null;
    updateEnglishAudioReport();
    if (file && typeof window !== "undefined" && window.Audio) {
      try {
        const audio = new window.Audio(file);
        playback.audio = audio;
        audio.preload = "none";
        audio.onended = partEnded;
        audio.onerror = fallback;
        const playing = audio.play();
        if (playing?.catch) playing.catch(fallback);
      } catch (error) { fallback(); }
    } else { fallback(); }
  };
  // Also release a solved exercise if a device never fires media completion.
  if (typeof window !== "undefined" && typeof window.setTimeout === "function") {
    playback.timer = window.setTimeout(() => {
      if (englishPlayback !== playback) return;
      if (playback.audio) playback.audio.pause();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      englishAudioStatus("Die Wiedergabe wurde beendet. Du kannst sie erneut starten.");
      finish();
    }, 90000);
  }
  next();
}

function renderEnglishWords(text) {
  return text.replace(/[A-Za-z]+(?:['’][A-Za-z]+)*(?:-[A-Za-z]+)*|\d+(?::\d+)?|[^A-Za-z\d]+/g, token => {
    if (!englishAudioTexts.has(englishAudioKey(token))) return escapeHtml(token);
    return `<button type="button" class="english-word" data-english-speech="${escapeHtml(token)}" aria-label="Englisches Wort anhören: ${escapeHtml(token)}">${escapeHtml(token)}</button>`;
  });
}

function renderEnglishImage(image, className = "english-sentence-image") {
  if (!image || !/^illustrations\/english\/[a-z0-9-]+\.svg$/.test(image.src)) return "";
  return `<img class="${className}" src="${escapeHtml(image.src)}?v=20261114-reviewed" width="48" height="48" alt="${escapeHtml(image.alt)}" loading="lazy">`;
}

function renderEnglishText(text, passages = [], interactive = true, question = null) {
  const passage = value => interactive
    ? `<span class="english-passage" lang="en">${renderEnglishWords(value)}<button type="button" class="english-listen" data-english-speech="${escapeHtml(value)}" aria-label="Englischen Text anhören: ${escapeHtml(value)}">${englishSpeakerIcon()}</button></span>`
    : `<span lang="en">${escapeHtml(value)}</span>`;
  return englishTextSegments(text, passages).map(segment => {
    if (!segment.english) return escapeHtml(segment.text);
    if (!question || typeof getEnglishSentenceImage !== "function") return passage(segment.text);
    return splitEnglishImageSentences(segment.text).map(sentence => {
      const image = getEnglishSentenceImage(sentence, question);
      return `<span class="english-sentence">${renderEnglishImage(image, interactive ? "english-sentence-image" : "english-option-image")}<span class="english-sentence-copy">${passage(sentence)}</span></span>`;
    }).join(" ");
  }).join("");
}

function englishSpeakerIcon() {
  return '<svg class="speaker-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9a5 5 0 0 1 0 6M18.5 6.5a8.5 8.5 0 0 1 0 11"/></svg>';
}

function renderEnglishChoiceAudio(choice, passages = []) {
  if (!passages.length) return "";
  return `<button class="english-listen option-listen" type="button" data-english-choice-audio="${escapeHtml(choice)}" aria-label="Englische Antwort anhören: ${escapeHtml(passages.join(" / "))}">${englishSpeakerIcon()}</button>`;
}

function handleEnglishSpeechClick(event) {
  if (progress.subject !== "english") return;
  const button = event.target.closest("[data-english-speech], [data-english-choice-audio]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  if (button.dataset.englishSpeech) speakEnglish(button.dataset.englishSpeech);
  else {
    const question = activeLesson?.questions[activeLesson.position];
    speakEnglish(question?.english?.choices[button.dataset.englishChoiceAudio] || []);
  }
}
