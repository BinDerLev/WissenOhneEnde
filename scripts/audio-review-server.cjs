#!/usr/bin/env node
// Local-only backend for the English audio review page.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const crypto = require('node:crypto');
const {spawn} = require('node:child_process');

const root = path.resolve(__dirname, '..');
const app = path.join(root, 'Lern-App');
const storePath = path.join(app, '.audio-review-data.json');
const previewPath = path.join(app, 'audio-review-previews.js');
const port = Number(process.env.AUDIO_REVIEW_PORT || 4177);
const host = '127.0.0.1';
let generating = false;

function readStore() {
  try {
    const data = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    return data && data.version === 1 && Array.isArray(data.reviews) ? data.reviews : [];
  } catch (error) {
    if (error.code !== 'ENOENT') console.error(`Could not read local review data: ${error.message}`);
    return [];
  }
}

function validReview(review) {
  return review && typeof review.text === 'string'
    && /^audio\/english\/[a-f0-9]{24}\.mp3$/.test(review.file)
    && ['good', 'bad'].includes(review.status)
    && typeof review.note === 'string'
    && Number.isFinite(Date.parse(review.updatedAt));
}

function mergeReviews(existing, incoming) {
  const merged = new Map(existing.map(review => [review.file, review]));
  for (const review of incoming) {
    if (!validReview(review)) throw new Error('Ungültige Bewertung im Request.');
    const previous = merged.get(review.file);
    if (!previous || review.updatedAt > previous.updatedAt) merged.set(review.file, review);
  }
  return [...merged.values()];
}

function writeStore(reviews) {
  const pending = `${storePath}.pending`;
  fs.writeFileSync(pending, `${JSON.stringify({version: 1, reviews}, null, 2)}\n`);
  fs.renameSync(pending, storePath);
}

function readPreviews() {
  try {
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync(previewPath, 'utf8'), context);
    return vm.runInContext('typeof englishAudioPreviews === "undefined" ? {} : englishAudioPreviews', context);
  } catch { return {}; }
}

function clipPreview(inputFile, outputFile, start, end) {
  return new Promise((resolve, reject) => {
    const python = process.env.ENGLISH_AUDIO_PYTHON || path.join(root, '.cache/english-audio/bin/python');
    const executable = fs.existsSync(python) ? python : 'python3';
    const encoder = process.env.ENGLISH_AUDIO_LAME || (fs.existsSync('/opt/homebrew/bin/lame') ? '/opt/homebrew/bin/lame' : 'lame');
    const child = spawn(executable, [path.join(__dirname, 'clip_english_audio.py'), '--input', path.join(app, inputFile), '--output', path.join(app, outputFile), '--start', String(start), '--end', String(end), '--encoder', encoder], {cwd: root, stdio: ['ignore', 'ignore', 'pipe']});
    let errorOutput = '';
    child.stderr.setEncoding('utf8').on('data', chunk => { errorOutput += chunk; });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error((errorOutput || `Clip process exited ${code}`).trim())));
  });
}

function send(res, status, data, type = 'application/json; charset=utf-8') {
  const body = type.startsWith('application/json') ? JSON.stringify(data) : data;
  res.writeHead(status, {'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'});
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5_000_000) reject(new Error('Request is zu groß.'));
    });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('Ungültiges JSON.')); }
    });
    req.on('error', reject);
  });
}

function generatePreviews(reviews, {all = false, limit = 6, file = null, retry = false, voice = null, speed = null, spokenText = null} = {}) {
  return new Promise((resolve, reject) => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'audio-review-backend-'));
    const input = path.join(temp, 'reviews.json');
    fs.writeFileSync(input, JSON.stringify({version: 1, reviews}));
    const args = [path.join(__dirname, 'generate-english-audio-previews.cjs'), input,
      ...(file ? ['--file', file] : all ? ['--all'] : ['--limit', String(limit)]), ...(retry ? ['--retry'] : []),
      ...(voice ? ['--voice', voice] : []), ...(speed !== null ? ['--speed', String(speed)] : []), ...(spokenText !== null ? ['--spoken-text', spokenText] : [])];
    const child = spawn(process.execPath, args, {cwd: root, stdio: ['ignore', 'pipe', 'pipe']});
    let output = '', errorOutput = '';
    child.stdout.setEncoding('utf8').on('data', chunk => { output += chunk; });
    child.stderr.setEncoding('utf8').on('data', chunk => { errorOutput += chunk; });
    const timeout = setTimeout(() => child.kill('SIGTERM'), 10 * 60 * 1000);
    child.on('error', error => { clearTimeout(timeout); fs.rmSync(temp, {recursive: true, force: true}); reject(error); });
    child.on('close', code => {
      clearTimeout(timeout);
      fs.rmSync(temp, {recursive: true, force: true});
      if (code !== 0) return reject(new Error((errorOutput || output || `Preview process exited ${code}`).trim()));
      resolve({output, previews: readPreviews()});
    });
  });
}

function serveFile(req, res, urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath); } catch { return send(res, 400, {error: 'Invalid path'}); }
  const requested = decoded === '/' ? '/audio-review.html' : decoded;
  const file = path.resolve(app, `.${requested}`);
  if (file !== app && !file.startsWith(`${app}${path.sep}`)) return send(res, 403, {error: 'Forbidden'});
  if (file === storePath || file.endsWith('.pending')) return send(res, 404, {error: 'Not found'});
  let stat;
  try { stat = fs.statSync(file); } catch { return send(res, 404, {error: 'Not found'}); }
  if (!stat.isFile()) return send(res, 404, {error: 'Not found'});
  const ext = path.extname(file).toLowerCase();
  const types = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml'};
  const headers = {'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': ext === '.mp3' ? 'public, max-age=3600' : 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Content-Length': stat.size};
  let start = 0, end = stat.size - 1, status = 200;
  if (ext === '.mp3') {
    headers['Accept-Ranges'] = 'bytes';
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (match && (match[1] || match[2])) {
        start = match[1] ? Number(match[1]) : Math.max(0, stat.size - Number(match[2]));
        end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
      } else start = NaN;
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start > end || start >= stat.size) {
        res.writeHead(416, {...headers, 'Content-Range': `bytes */${stat.size}`, 'Content-Length': 0});
        return res.end();
      }
      status = 206;
      headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
      headers['Content-Length'] = end - start + 1;
    }
  }
  res.writeHead(status, headers);
  if (req.method === 'HEAD' || stat.size === 0) return res.end();
  const stream = fs.createReadStream(file, {start, end});
  stream.on('error', () => res.destroy());
  res.on('close', () => stream.destroy());
  stream.pipe(res);
}

const server = http.createServer(async (req, res) => {
  const hostHeader = req.headers.host || '';
  if (!['127.0.0.1', 'localhost'].includes(hostHeader.split(':')[0])) return send(res, 403, {error: 'Local host only'});
  const origin = req.headers.origin;
  if (origin && ![`http://127.0.0.1:${port}`, `http://localhost:${port}`].includes(origin)) return send(res, 403, {error: 'Cross-origin request denied'});
  const url = new URL(req.url, `http://${hostHeader}`);
  try {
    if (url.pathname === '/api/state' && req.method === 'GET') {
      const {readCatalogue} = require(path.join(__dirname, 'apply-audio-corrections.cjs'));
      return send(res, 200, {...readCatalogue(app), reviews: readStore(), previews: readPreviews()});
    }
    if (url.pathname === '/api/apply-corrections' && req.method === 'POST') {
      const body = await readJson(req);
      if (body.deleteReplaced !== undefined && typeof body.deleteReplaced !== 'boolean') return send(res, 400, {error:'deleteReplaced muss ein Wahrheitswert sein.'});
      if (generating) return send(res, 409, {error:'Eine Audiobearbeitung läuft bereits.'});
      generating = true;
      try {
        const {applyCorrections} = require(path.join(__dirname, 'apply-audio-corrections.cjs'));
        const result = applyCorrections(app, readStore(), readPreviews(), {deleteReplaced:body.deleteReplaced === true});
        return send(res, 200, {...result,message:`${result.applied} Korrekturen übernommen. ${result.deleted} ersetzte Originaldateien gelöscht.${result.warnings.length ? ' '+result.warnings.join(' ') : ''}`});
      } finally { generating = false; }
    }
    if (url.pathname === '/api/reviews' && req.method === 'POST') {
      const body = await readJson(req);
      if (!Array.isArray(body.reviews)) return send(res, 400, {error: 'reviews must be an array'});
      const reviews = mergeReviews(readStore(), body.reviews);
      writeStore(reviews);
      return send(res, 200, {reviews});
    }
    if (url.pathname === '/api/review' && req.method === 'POST') {
      const body = await readJson(req);
      if (!/^audio\/english\/[a-f0-9]{24}\.mp3$/.test(body.file || '')) return send(res, 400, {error: 'Invalid recording path'});
      if (body.voice !== undefined && !['bf_emma','af_heart'].includes(body.voice)) return send(res, 400, {error: 'Ungültige Stimme.'});
      if (body.speed !== undefined && (!Number.isFinite(body.speed) || body.speed < 0.7 || body.speed > 1.2)) return send(res, 400, {error: 'Tempo muss zwischen 0,7 und 1,2 liegen.'});
      if (body.spokenText !== undefined && (typeof body.spokenText !== 'string' || !body.spokenText.trim() || body.spokenText.length > 2000)) return send(res, 400, {error: 'Sprechtext muss 1 bis 2000 Zeichen enthalten.'});
      for (const [key, label] of [['clipStartSeconds','Anfang'],['clipEndSeconds','Ende']]) if (body[key] !== undefined && (!Number.isFinite(body[key]) || body[key] < 0 || body[key] > 30)) return send(res, 400, {error: `${label} abschneiden: Wert muss zwischen 0 und 30 Sekunden liegen.`});
      let reviews = readStore();
      if (body.review === null) reviews = reviews.filter(review => review.file !== body.file);
      else {
        if (!validReview(body.review) || body.review.file !== body.file) return send(res, 400, {error: 'Invalid review'});
        reviews = mergeReviews(reviews, [body.review]);
      }
      writeStore(reviews);
      return send(res, 200, {ok: true});
    }
    if (url.pathname === '/api/previews' && req.method === 'POST') {
      if (generating) return send(res, 409, {error: 'Vorschauen werden bereits erzeugt.'});
      const body = await readJson(req), limit = Number(body.limit || 6);
      if (!Number.isInteger(limit) || limit < 1 || limit > 30) return send(res, 400, {error: 'limit must be between 1 and 30'});
      generating = true;
      try {
        const result = await generatePreviews(readStore(), {limit});
        return send(res, 200, {previews: result.previews, message: result.output.trim()});
      } finally { generating = false; }
    }
    if (url.pathname === '/api/corrections' && req.method === 'POST') {
      if (generating) return send(res, 409, {error: 'Korrekturen werden bereits erzeugt.'});
      generating = true;
      try {
        const result = await generatePreviews(readStore(), {all: true});
        return send(res, 200, {previews: result.previews, message: result.output.trim()});
      } finally { generating = false; }
    }
    if (url.pathname === '/api/correction' && req.method === 'POST') {
      if (generating) return send(res, 409, {error: 'Eine Korrektur wird bereits erzeugt.'});
      const body = await readJson(req);
      if (!/^audio\/english\/[a-f0-9]{24}\.mp3$/.test(body.file || '')) return send(res, 400, {error: 'Invalid recording path'});
      const reviews = readStore();
      if (!reviews.some(review => review.file === body.file && review.status === 'bad')) return send(res, 404, {error: 'Clip ist nicht als schlecht markiert.'});
      generating = true;
      try {
        const result = await generatePreviews(reviews, {file: body.file, retry: true, voice: body.voice || null, speed: body.speed ?? null, spokenText: body.spokenText ?? null});
        return send(res, 200, {previews: result.previews, message: result.output.trim()});
      } finally { generating = false; }
    }
    if (url.pathname === '/api/clip' && req.method === 'POST') {
      if (generating) return send(res, 409, {error: 'Eine Audiobearbeitung läuft bereits.'});
      const body = await readJson(req);
      if (!/^audio\/english\/[a-f0-9]{24}\.mp3$/.test(body.file || '')) return send(res, 400, {error: 'Invalid recording path'});
      if (!Number.isFinite(body.start) || body.start < 0 || body.start > 30 || !Number.isFinite(body.end) || body.end < 0 || body.end > 30) return send(res, 400, {error: 'Schnittwerte müssen zwischen 0 und 30 Sekunden liegen.'});
      const correction = readPreviews()[body.file];
      if (!correction || !/^audio\/english\/review-previews\/[a-f0-9]{24}\.mp3$/.test(correction.previewFile || '')) return send(res, 404, {error: 'Keine Korrekturvorschau für diesen Clip gefunden.'});
      const fullPreviewFile = correction.fullPreviewFile || correction.previewFile;
      if (!/^audio\/english\/review-previews\/[a-f0-9]{24}\.mp3$/.test(fullPreviewFile)) return send(res, 404, {error: 'Ungültige ungekürzte Vorschau.'});
      const inputPath = path.join(app, fullPreviewFile);
      if (!fs.existsSync(inputPath)) return send(res, 404, {error: 'Korrekturvorschau fehlt.'});
      const hash = crypto.createHash('sha256').update(`clip:${body.file}:${fullPreviewFile}:${body.start}:${body.end}`).digest('hex').slice(0, 24);
      const outputFile = body.start === 0 && body.end === 0 ? fullPreviewFile : `audio/english/review-previews/${hash}.mp3`;
      generating = true;
      try {
        if (body.start !== 0 || body.end !== 0) await clipPreview(fullPreviewFile, outputFile, body.start, body.end);
        const previews = readPreviews(), previousFile = previews[body.file]?.previewFile;
        previews[body.file] = {...previews[body.file], previewFile: outputFile, fullPreviewFile, clipStartSeconds: body.start, clipEndSeconds: body.end};
        const source = `// Generated by scripts/generate-english-audio-previews.cjs.\nconst englishAudioPreviews = ${JSON.stringify(previews, null, 2)};\n`;
        fs.writeFileSync(`${previewPath}.pending`, source); fs.renameSync(`${previewPath}.pending`, previewPath);
        const referenced = Object.values(previews).flatMap(item => [item.previewFile,item.fullPreviewFile].filter(Boolean));
        if (previousFile && previousFile !== outputFile && !referenced.includes(previousFile) && /^audio\/english\/review-previews\/[a-f0-9]{24}\.mp3$/.test(previousFile)) fs.rmSync(path.join(app, previousFile), {force: true});
        return send(res, 200, {previews, message: 'Schnitt angewendet.'});
      } finally { generating = false; }
    }
    if (['GET', 'HEAD'].includes(req.method) && !url.pathname.startsWith('/api/')) return serveFile(req, res, url.pathname);
    return send(res, 404, {error: 'Not found'});
  } catch (error) {
    return send(res, 400, {error: error.message || 'Request failed'});
  }
});

server.listen(port, host, () => console.log(`Audio review server: http://${host}:${port}/audio-review.html`));
server.on('error', error => {
  if (error.code === 'EADDRINUSE') console.error(`Port ${port} is already in use. Set AUDIO_REVIEW_PORT to another local port.`);
  else console.error(error);
  process.exitCode = 1;
});
