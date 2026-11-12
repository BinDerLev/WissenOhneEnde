const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('bestScore');
const goalDisplay = document.getElementById('goal');
const comboDisplay = document.getElementById('combo');
const levelDisplay = document.getElementById('level');
const newGameBtn = document.getElementById('newGameBtn');
const undoBtn = document.getElementById('undoBtn');
const standardModeBtn = document.getElementById('standardModeBtn');
const dailyModeBtn = document.getElementById('dailyModeBtn');
const dailyInfo = document.getElementById('dailyInfo');
const dailyRecordDisplay = document.getElementById('dailyRecord');

let grid = [];
let score = 0;
let bestScore = Number(localStorage.getItem('2048_bestScore') || 0);
let level = Number(localStorage.getItem('2048_level') || 1);
let combo = 1;
let gameOver = false;
let gameWon = false;
let previousState = null;
let previousScore = 0;
let previousRandomState = null;
let moveToken = 0;
let animating = false;
let previousCombo = 1;
let mode = 'standard';
let activeDailyDate = null;
let todayDate = getLocalDateKey();
let dailySeed = 0;
let dailyRandomState = 0;
let dailyConfig = null;
let dailyRecords = readDailyRecords();
let undoAvailable = true;
let roundFinished = false;

const GRID_SIZE = 4;
const WIN_VALUE = 2048;
bestScoreDisplay.textContent = bestScore;
comboDisplay.textContent = `x${combo}`;
levelDisplay.textContent = level;
goalDisplay.textContent = String(Math.max(2048, 2048));
newGameBtn.addEventListener('click', newGame);
standardModeBtn.addEventListener('click', startStandardGame);
dailyModeBtn.addEventListener('click', startDailyChallenge);
undoBtn.addEventListener('click', undo);
document.addEventListener('keydown', handleKeyPress);
let swipeStart = null;
gameBoard.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'touch') return;
  swipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
  event.preventDefault();
});
gameBoard.addEventListener('pointerup', (event) => {
  if (!swipeStart || swipeStart.pointerId !== event.pointerId) return;
  const deltaX = event.clientX - swipeStart.x;
  const deltaY = event.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 24) return;
  const direction = Math.abs(deltaX) > Math.abs(deltaY)
    ? deltaX > 0 ? 'right' : 'left'
    : deltaY > 0 ? 'down' : 'up';
  applyMove(direction);
});
gameBoard.addEventListener('pointercancel', () => {
  swipeStart = null;
});
document.addEventListener('visibilitychange', checkDateBoundary);
window.addEventListener('focus', checkDateBoundary);
window.setInterval(checkDateBoundary, 30000);

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatLocalDate(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function readDailyRecords() {
  try {
    const records = JSON.parse(localStorage.getItem('2048_dailyRecords') || '{}');
    return records && typeof records === 'object' && !Array.isArray(records) ? records : {};
  } catch {
    return {};
  }
}

function saveDailyRecords() {
  localStorage.setItem('2048_dailyRecords', JSON.stringify(dailyRecords));
}

function seedForDate(dateKey) {
  let seed = 2166136261;
  for (const character of dateKey) {
    seed ^= character.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}

function dailyRandom() {
  dailyRandomState = (dailyRandomState + 0x6D2B79F5) >>> 0;
  let value = dailyRandomState;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

function randomValue() {
  return mode === 'daily' ? dailyRandom() : Math.random();
}

function checkDateBoundary() {
  const currentDate = getLocalDateKey();
  if (currentDate === todayDate) return;
  todayDate = currentDate;
  updateDailyPanel();
}

function updateDailyPanel() {
  const record = dailyRecords[todayDate];
  const seed = seedForDate(todayDate);
  const fourChance = 5 + seed % 16;
  dailyInfo.textContent = `Heute: ${formatLocalDate(todayDate)} · Seed ${seed.toString(16).padStart(8, '0').slice(-6)} · ${fourChance}% Chance auf eine 4. Das Layout und alle Zufallszüge sind für dieses Datum gleich.`;
  if (mode === 'daily' && activeDailyDate !== todayDate) {
    dailyRecordDisplay.textContent = `Dein Lauf vom ${formatLocalDate(activeDailyDate)} bleibt erhalten. Die heutige Challenge startet mit „Tages-Challenge spielen“.`;
  } else if (record?.completed) {
    dailyRecordDisplay.textContent = `Heute abgeschlossen${record.won ? ' – 2048 erreicht' : ' – keine Züge mehr'} · Bestwert: ${record.bestScore}`;
  } else if (record?.played) {
    dailyRecordDisplay.textContent = `Heute gespielt · Bestwert: ${record.bestScore}`;
  } else {
    dailyRecordDisplay.textContent = 'Heute noch nicht gespielt.';
  }
  standardModeBtn.setAttribute('aria-pressed', String(mode === 'standard'));
  dailyModeBtn.setAttribute('aria-pressed', String(mode === 'daily'));
  dailyModeBtn.textContent = mode === 'daily' && activeDailyDate === todayDate
    ? 'Challenge neu starten'
    : 'Tages-Challenge spielen';
}

function startStandardGame() {
  if (roundFinished) return;
  mode = 'standard';
  activeDailyDate = null;
  dailyConfig = null;
  updateDailyPanel();
  newGame();
}

function startDailyChallenge() {
  if (roundFinished) return;
  checkDateBoundary();
  mode = 'daily';
  activeDailyDate = todayDate;
  dailySeed = seedForDate(activeDailyDate);
  dailyRandomState = dailySeed;
  dailyConfig = { fourChance: 5 + dailySeed % 16 };
  const record = dailyRecords[activeDailyDate] || { bestScore: 0, played: false, completed: false, won: false };
  record.played = true;
  dailyRecords[activeDailyDate] = record;
  saveDailyRecords();
  updateDailyPanel();
  newGame();
}

function saveProgress() {
  localStorage.setItem('2048_level', String(level));
  localStorage.setItem('2048_bestScore', String(bestScore));
}

function updateHud() {
  scoreDisplay.textContent = score;
  comboDisplay.textContent = `x${combo}`;
  levelDisplay.textContent = level;
  goalDisplay.textContent = String(Math.max(2048, 2048));

  if (score > bestScore) {
    bestScore = score;
    bestScoreDisplay.textContent = bestScore;
    localStorage.setItem('2048_bestScore', bestScore);
  }

  if (mode === 'daily' && activeDailyDate) {
    const record = dailyRecords[activeDailyDate] || { bestScore: 0, played: true, completed: false, won: false };
    record.bestScore = Math.max(record.bestScore || 0, score);
    record.played = true;
    dailyRecords[activeDailyDate] = record;
    saveDailyRecords();
    updateDailyPanel();
  }
}

function newGame() {
  if (roundFinished) return;
  checkDateBoundary();
  moveToken += 1;
  animating = false;
  gameBoard.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
  grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
  score = 0;
  level = 1;
  combo = 1;
  gameOver = false;
  gameWon = false;
  previousState = null;
  previousScore = 0;
  previousRandomState = null;
  undoAvailable = true;
  if (mode === 'daily') {
    activeDailyDate = todayDate;
    dailySeed = seedForDate(activeDailyDate);
    dailyRandomState = dailySeed;
    dailyConfig = { fourChance: 5 + dailySeed % 16 };
  }
  updateHud();
  addRandomTile();
  addRandomTile();
  render();
}

function addRandomTile() {
  const emptyTiles = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) emptyTiles.push({ i, j });
    }
  }

  if (emptyTiles.length > 0) {
    const randomTile = emptyTiles[Math.floor(randomValue() * emptyTiles.length)];
    const fourChance = mode === 'daily' ? dailyConfig.fourChance : 10;
    grid[randomTile.i][randomTile.j] = randomValue() * 100 < fourChance ? 4 : 2;
    return { row: randomTile.i, col: randomTile.j };
  }
}

function handleKeyPress(e) {
  if (gameOver || gameWon) return;

  const key = e.key.toLowerCase();
  const direction = {
    ArrowUp: 'up',
    w: 'up',
    ArrowDown: 'down',
    s: 'down',
    ArrowLeft: 'left',
    a: 'left',
    ArrowRight: 'right',
    d: 'right'
  }[e.key] || ({ w: 'up', s: 'down', a: 'left', d: 'right' }[key]);
  if (!direction) return;
  e.preventDefault();
  applyMove(direction);
}

// Resolve each line in movement order. Every source tile has a destination,
// and a newly merged tile cannot merge again during this move.
function calculateMove(board, direction) {
  const next = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
  const tracks = [];
  const merges = [];
  let points = 0;
  const position = (line, offset) => {
    if (direction === 'left') return { row: line, col: offset };
    if (direction === 'right') return { row: line, col: GRID_SIZE - 1 - offset };
    if (direction === 'up') return { row: offset, col: line };
    return { row: GRID_SIZE - 1 - offset, col: line };
  };
  for (let line = 0; line < GRID_SIZE; line++) {
    const sources = [];
    for (let offset = 0; offset < GRID_SIZE; offset++) {
      const from = position(line, offset);
      if (board[from.row][from.col]) sources.push({ from, value: board[from.row][from.col] });
    }
    let target = 0;
    for (let index = 0; index < sources.length; index++) {
      const source = sources[index];
      const to = position(line, target++);
      const pair = sources[index + 1];
      tracks.push({ ...source, to });
      let value = source.value;
      if (pair && pair.value === source.value) {
        tracks.push({ ...pair, to });
        value *= 2;
        points += value;
        merges.push(to);
        index++;
      }
      next[to.row][to.col] = value;
    }
  }
  return { grid: next, tracks, merges, points,
    moved: board.some((row, r) => row.some((value, c) => value !== next[r][c])) };
}

async function applyMove(direction) {
  if (gameOver || gameWon || animating || roundFinished) return;
  if (!['left', 'right', 'up', 'down'].includes(direction)) return;
  const result = calculateMove(grid, direction);
  if (!result.moved) return;
  previousState = grid.map(row => [...row]);
  previousScore = score;
  previousCombo = combo;
  previousRandomState = mode === 'daily' ? dailyRandomState : null;
  animating = true;
  const token = ++moveToken;
  undoBtn.disabled = true;
  await animateMove(result.tracks);
  if (token !== moveToken) return;
  grid = result.grid;
  score += result.points;
  combo = result.merges.length ? Math.min(9, combo + result.merges.length) : 1;
  gameWon = grid.some(row => row.some(value => value >= WIN_VALUE));
  const spawned = addRandomTile();
  updateLevel();
  render(spawned ? [spawned] : [], result.merges);
  animating = false;
  undoBtn.disabled = !undoAvailable;
  checkGameState();
}

async function animateMove(tracks) {
  const cells = [...gameBoard.children];
  const boardRect = gameBoard.getBoundingClientRect();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animations = [];
  const ghosts = tracks.map(({ from, to, value }) => {
    const start = cells[from.row * GRID_SIZE + from.col].getBoundingClientRect();
    const end = cells[to.row * GRID_SIZE + to.col].getBoundingClientRect();
    const tile = document.createElement('div');
    tile.className = `game-tile moving-tile tile-${value}`;
    tile.textContent = value;
    tile.setAttribute('aria-hidden', 'true');
    Object.assign(tile.style, {
      left: `${start.left - boardRect.left - gameBoard.clientLeft}px`,
      top: `${start.top - boardRect.top - gameBoard.clientTop}px`,
      width: `${start.width}px`, height: `${start.height}px`
    });
    gameBoard.appendChild(tile);
    animations.push(tile.animate([
      { transform: 'translate(0, 0)' },
      { transform: `translate(${end.left - start.left}px, ${end.top - start.top}px)` }
    ], { duration: reducedMotion ? 0 : 220, easing: 'ease-in-out', fill: 'forwards' }).finished.catch(() => {}));
    return tile;
  });
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'game-tile';
  });
  await Promise.all(animations);
  ghosts.forEach(tile => tile.remove());
}

function updateLevel() {
  const newLevel = Math.floor(score / 500) + 1;
  if (newLevel !== level) {
    level = newLevel;
    levelDisplay.textContent = level;
  }
}

function checkGameState() {
  updateHud();

  if (gameWon) {
    markDailyComplete(true);
    showGameOverOverlay(true);
    finishRound();
  } else if (isGameOver()) {
    gameOver = true;
    markDailyComplete(false);
    showGameOverOverlay(false);
    finishRound();
  }
}

function finishRound() {
  if (roundFinished) return;
  roundFinished = true;
  newGameBtn.disabled = true;
  undoBtn.disabled = true;
  standardModeBtn.disabled = true;
  dailyModeBtn.disabled = true;
  window.GameRoundSession.finish();
}

function markDailyComplete(won) {
  if (mode !== 'daily' || !activeDailyDate) return;
  const record = dailyRecords[activeDailyDate] || { bestScore: score, played: true };
  record.bestScore = Math.max(record.bestScore || 0, score);
  record.played = true;
  record.completed = true;
  record.won = Boolean(record.won || won);
  dailyRecords[activeDailyDate] = record;
  saveDailyRecords();
  updateDailyPanel();
}

function isGameOver() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) return false;
    }
  }

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const current = grid[i][j];
      if (j < GRID_SIZE - 1 && current === grid[i][j + 1]) return false;
      if (i < GRID_SIZE - 1 && current === grid[i + 1][j]) return false;
    }
  }

  return true;
}

function undo() {
  if (roundFinished || gameOver || gameWon || animating) return;
  if (!previousState) return;
  if (!undoAvailable) return;

  undoAvailable = false;
  grid = previousState.map(row => [...row]);
  score = previousScore;
  if (mode === 'daily' && previousRandomState !== null) {
    dailyRandomState = previousRandomState;
  }
  combo = previousCombo;
  updateLevel();
  previousState = null;
  previousRandomState = null;
  updateHud();
  saveProgress();
  render();
}

function render(spawned = [], merged = []) {
  undoBtn.disabled = animating || !previousState || !undoAvailable || roundFinished;
  gameBoard.innerHTML = '';

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const value = grid[i][j];
      const tile = document.createElement('div');
      tile.className = 'game-tile';
      tile.setAttribute('role', 'gridcell');
      tile.setAttribute('aria-label', value === 0 ? 'Leer' : String(value));

      if (value !== 0) {
        tile.textContent = value;
        tile.className += ` tile-${value}`;
        if (spawned.some(cell => cell.row === i && cell.col === j)) tile.classList.add('new');
        if (merged.some(cell => cell.row === i && cell.col === j)) tile.classList.add('merge');
      }

      gameBoard.appendChild(tile);
    }
  }
}

function showGameOverOverlay(won) {
  const overlay = document.createElement('div');
  overlay.className = 'game-over-overlay';

  const box = document.createElement('div');
  box.className = 'game-over-box';

  const heading = document.createElement('h2');
  heading.textContent = won ? '🎉 Du hast gewonnen!' : '😢 Game Over!';

  const message = document.createElement('p');
  message.textContent = won ? 'Du hast 2048 erreicht!' : 'Keine Züge mehr möglich.';

  const scoreMsg = document.createElement('p');
  scoreMsg.innerHTML = `Dein Score: <span class="score-value">${score}</span>`;

  box.appendChild(heading);
  box.appendChild(message);
  box.appendChild(scoreMsg);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  saveProgress();
  updateHud();
}

updateDailyPanel();
newGame();
