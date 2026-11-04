const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('bestScore');
const coinsDisplay = document.getElementById('coins');
const goalDisplay = document.getElementById('goal');
const comboDisplay = document.getElementById('combo');
const levelDisplay = document.getElementById('level');
const upgradeStateDisplay = document.getElementById('upgradeState');
const newGameBtn = document.getElementById('newGameBtn');
const undoBtn = document.getElementById('undoBtn');
const boostBtn = document.getElementById('boostBtn');
const standardModeBtn = document.getElementById('standardModeBtn');
const dailyModeBtn = document.getElementById('dailyModeBtn');
const dailyInfo = document.getElementById('dailyInfo');
const dailyRecordDisplay = document.getElementById('dailyRecord');
const upgradeButtons = [...document.querySelectorAll('.upgrade-btn')];

let grid = [];
let score = 0;
let bestScore = Number(localStorage.getItem('2048_bestScore') || 0);
let coins = Number(localStorage.getItem('2048_coins') || 0);
let level = Number(localStorage.getItem('2048_level') || 1);
let combo = 1;
let gameOver = false;
let gameWon = false;
let previousState = null;
let previousScore = 0;
let previousRandomState = null;
let moveToken = 0;
let mode = 'standard';
let activeDailyDate = null;
let todayDate = getLocalDateKey();
let dailySeed = 0;
let dailyRandomState = 0;
let dailyConfig = null;
let dailyRecords = readDailyRecords();
let extraUndoLives = Number(localStorage.getItem('2048_undoLives') || 1);
let multiplierLevel = Number(localStorage.getItem('2048_multiplierLevel') || 0);
let bonusLevel = Number(localStorage.getItem('2048_bonusLevel') || 0);
let boostActive = false;
let boostCharges = Number(localStorage.getItem('2048_boostCharges') || 1);

const GRID_SIZE = 4;
const WIN_VALUE = 2048;
const upgradeCosts = {
  multiplier: 20,
  undo: 25,
  bonus: 30
};

bestScoreDisplay.textContent = bestScore;
coinsDisplay.textContent = coins;
comboDisplay.textContent = `x${combo}`;
levelDisplay.textContent = level;
goalDisplay.textContent = String(Math.max(2048, 2048 + (level - 1) * 1024));
updateUpgradeCosts();
newGameBtn.addEventListener('click', newGame);
standardModeBtn.addEventListener('click', startStandardGame);
dailyModeBtn.addEventListener('click', startDailyChallenge);
undoBtn.addEventListener('click', undo);
boostBtn.addEventListener('click', useBoost);
upgradeButtons.forEach((button) => {
  button.addEventListener('click', () => buyUpgrade(button.dataset.upgrade));
});
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
  mode = 'standard';
  activeDailyDate = null;
  dailyConfig = null;
  updateDailyPanel();
  newGame();
}

function startDailyChallenge() {
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
  localStorage.setItem('2048_coins', String(coins));
  localStorage.setItem('2048_level', String(level));
  localStorage.setItem('2048_bestScore', String(bestScore));
  localStorage.setItem('2048_undoLives', String(extraUndoLives));
  localStorage.setItem('2048_multiplierLevel', String(multiplierLevel));
  localStorage.setItem('2048_bonusLevel', String(bonusLevel));
  localStorage.setItem('2048_boostCharges', String(boostCharges));
}

function updateUpgradeCosts() {
  document.getElementById('multiplierCost').textContent = String(upgradeCosts.multiplier + multiplierLevel * 10);
  document.getElementById('undoCost').textContent = String(upgradeCosts.undo + extraUndoLives * 12);
  document.getElementById('bonusCost').textContent = String(upgradeCosts.bonus + bonusLevel * 15);
}

function updateHud() {
  scoreDisplay.textContent = score;
  comboDisplay.textContent = `x${combo}`;
  coinsDisplay.textContent = coins;
  levelDisplay.textContent = level;
  goalDisplay.textContent = String(Math.max(2048, 2048 + (level - 1) * 1024));
  upgradeStateDisplay.textContent = boostActive ? 'Boost ON' : 'Ready';
  updateUpgradeCosts();

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
  checkDateBoundary();
  moveToken += 1;
  grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
  score = 0;
  combo = 1;
  gameOver = false;
  gameWon = false;
  previousState = null;
  previousScore = 0;
  previousRandomState = null;
  boostActive = false;
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

function applyMove(direction) {
  if (gameOver || gameWon) return;
  const moveFunctions = {
    up: moveUp,
    down: moveDown,
    left: moveLeft,
    right: moveRight
  };
  const moved = moveFunctions[direction]();
  if (!moved) return;
  const token = moveToken;

  setTimeout(() => {
    if (token !== moveToken) return;
    addRandomTile();
    updateLevel();
    checkGameState();
    render();
  }, 100);
}

function moveLeft() { return move('left'); }
function moveRight() { return move('right'); }
function moveUp() { return move('up'); }
function moveDown() { return move('down'); }

function move(direction) {
  previousState = grid.map(row => [...row]);
  previousScore = score;
  previousRandomState = mode === 'daily' ? dailyRandomState : null;

  let moved = false;

  if (direction === 'left' || direction === 'right') {
    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [...grid[i]];
      const result = direction === 'left' ? slideAndMerge(row) : slideAndMerge(row.reverse()).reverse();
      if (!arraysEqual(row, result)) {
        moved = true;
        grid[i] = result;
      }
    }
  } else {
    for (let j = 0; j < GRID_SIZE; j++) {
      const column = [];
      for (let i = 0; i < GRID_SIZE; i++) {
        column.push(grid[i][j]);
      }

      const result = direction === 'up' ? slideAndMerge(column) : slideAndMerge(column.reverse()).reverse();

      if (!arraysEqual(column, result)) {
        moved = true;
        for (let i = 0; i < GRID_SIZE; i++) {
          grid[i][j] = result[i];
        }
      }
    }
  }

  if (!moved) {
    previousState = null;
    previousScore = score;
    previousRandomState = null;
  }

  return moved;
}

function slideAndMerge(line) {
  let filtered = line.filter(val => val !== 0);

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const mergedValue = filtered[i] * 2;
      filtered[i] = mergedValue;
      filtered.splice(i + 1, 1);

      const reward = mergedValue * (multiplierLevel + 1) * (boostActive ? 2 : 1);
      score += reward;
      combo = Math.min(9, combo + 1);
      coins += 1 + bonusLevel;

      if (mergedValue === WIN_VALUE && !gameWon) {
        gameWon = true;
      }
    }
  }

  while (filtered.length < GRID_SIZE) filtered.push(0);
  return filtered;
}

function arraysEqual(arr1, arr2) {
  return arr1.every((val, idx) => val === arr2[idx]);
}

function updateLevel() {
  const newLevel = Math.floor(score / 500) + 1;
  if (newLevel !== level) {
    level = newLevel;
    levelDisplay.textContent = level;
  }
}

function useBoost() {
  if (boostCharges <= 0) return;
  boostCharges -= 1;
  boostActive = true;
  upgradeStateDisplay.textContent = 'Boost ON';

  setTimeout(() => {
    boostActive = false;
    upgradeStateDisplay.textContent = 'Ready';
    saveProgress();
  }, 4000);

  saveProgress();
}

function buyUpgrade(type) {
  const cost = {
    multiplier: upgradeCosts.multiplier + multiplierLevel * 10,
    undo: upgradeCosts.undo + extraUndoLives * 12,
    bonus: upgradeCosts.bonus + bonusLevel * 15
  }[type];

  if (coins < cost) return;

  coins -= cost;

  if (type === 'multiplier') {
    multiplierLevel += 1;
  }
  if (type === 'undo') {
    extraUndoLives += 1;
  }
  if (type === 'bonus') {
    bonusLevel += 1;
  }

  saveProgress();
  updateHud();
}

function checkGameState() {
  updateHud();

  if (gameWon) {
    markDailyComplete(true);
    showGameOverOverlay(true);
  } else if (isGameOver()) {
    gameOver = true;
    markDailyComplete(false);
    showGameOverOverlay(false);
  }
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
  if (!previousState) return;
  if (extraUndoLives <= 0) return;

  extraUndoLives -= 1;
  grid = previousState.map(row => [...row]);
  score = previousScore;
  if (mode === 'daily' && previousRandomState !== null) {
    dailyRandomState = previousRandomState;
  }
  combo = 1;
  previousState = null;
  previousRandomState = null;
  updateHud();
  saveProgress();
  render();
}

function render() {
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
        tile.classList.add('new');
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

  const rewardMsg = document.createElement('p');
  rewardMsg.textContent = `+${Math.max(5, Math.floor(score / 50))} Münzen gewonnen`;
  coins += Math.max(5, Math.floor(score / 50));

  const continueBtn = document.createElement('button');
  continueBtn.className = 'btn btn-new';
  continueBtn.textContent = won ? 'Weiterspielen' : 'Neues Spiel';
  continueBtn.style.marginTop = '20px';
  continueBtn.addEventListener('click', () => {
    overlay.remove();
    if (!won) {
      newGame();
    } else {
      gameWon = false;
      newGame();
    }
  });

  box.appendChild(heading);
  box.appendChild(message);
  box.appendChild(scoreMsg);
  box.appendChild(rewardMsg);
  box.appendChild(continueBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  saveProgress();
  updateHud();
}

updateDailyPanel();
newGame();
