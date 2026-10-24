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
undoBtn.addEventListener('click', undo);
boostBtn.addEventListener('click', useBoost);
upgradeButtons.forEach((button) => {
  button.addEventListener('click', () => buyUpgrade(button.dataset.upgrade));
});
document.addEventListener('keydown', handleKeyPress);

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
}

function newGame() {
  grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
  score = 0;
  combo = 1;
  gameOver = false;
  gameWon = false;
  previousState = null;
  previousScore = 0;
  boostActive = false;
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
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[randomTile.i][randomTile.j] = Math.random() < 0.9 ? 2 : 4;
  }
}

function handleKeyPress(e) {
  if (gameOver || gameWon) return;

  const key = e.key.toLowerCase();
  let moved = false;

  if (e.key === 'ArrowUp' || key === 'w') {
    e.preventDefault();
    moved = moveUp();
  } else if (e.key === 'ArrowDown' || key === 's') {
    e.preventDefault();
    moved = moveDown();
  } else if (e.key === 'ArrowLeft' || key === 'a') {
    e.preventDefault();
    moved = moveLeft();
  } else if (e.key === 'ArrowRight' || key === 'd') {
    e.preventDefault();
    moved = moveRight();
  }

  if (moved) {
    setTimeout(() => {
      addRandomTile();
      updateLevel();
      checkGameState();
      render();
    }, 100);
  }
}

function moveLeft() { return move('left'); }
function moveRight() { return move('right'); }
function moveUp() { return move('up'); }
function moveDown() { return move('down'); }

function move(direction) {
  previousState = grid.map(row => [...row]);
  previousScore = score;

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
    showGameOverOverlay(true);
  } else if (isGameOver()) {
    gameOver = true;
    showGameOverOverlay(false);
  }
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
  combo = 1;
  previousState = null;
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

newGame();
