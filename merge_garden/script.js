const BOARD_SIZE = 5;
const TILE_TYPES = [
  { id: "seed", emoji: "🌱", colorClass: "seed" },
  { id: "flower", emoji: "🌼", colorClass: "flower" },
  { id: "berry", emoji: "🍓", colorClass: "berry" },
  { id: "leaf", emoji: "🍃", colorClass: "leaf" },
  { id: "sun", emoji: "☀️", colorClass: "sun" },
  { id: "mint", emoji: "🌿", colorClass: "mint" }
];

const boardEl = document.getElementById("board");
const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");
const roundEl = document.getElementById("round");
const nextTileEl = document.getElementById("nextTile");
const comboEl = document.getElementById("combo");
const resetBtn = document.getElementById("resetBtn");
const soundBtn = document.getElementById("soundBtn");
const upgradeButtons = document.querySelectorAll(".upgrade-btn");

const upgradeConfig = {
  expand: { cost: 20, label: "expandCost" },
  bonus: { cost: 25, label: "bonusCost" },
  luck: { cost: 30, label: "luckCost" },
  auto: { cost: 35, label: "autoCost" }
};

let board = [];
let score = 0;
let coins = 0;
let round = 1;
let combo = 1;
let currentTile = null;
let soundEnabled = true;
let expandLevel = 0;
let bonusLevel = 0;
let luckLevel = 0;
let autoLevel = 0;
let autoTimer = null;

function createEmptyBoard(size = BOARD_SIZE) {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function randomType() {
  return TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
}

function makeTile(type = randomType(), level = 1) {
  return { type, level };
}

function getRandomCell() {
  const emptyCells = [];
  const size = board.length;

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!board[row][col]) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (!emptyCells.length) return null;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function spawnRandomTile() {
  const cell = getRandomCell();
  if (!cell) return false;

  const tile = makeTile(randomType(), 1);
  board[cell.row][cell.col] = tile;
  return true;
}

function getNeighbors(row, col) {
  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1]
  ].filter(([nextRow, nextCol]) => {
    return nextRow >= 0 && nextRow < board.length && nextCol >= 0 && nextCol < board.length;
  });
}

function playSound(type = "merge") {
  if (!soundEnabled) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  const frequencies = {
    merge: [440, 660],
    buy: [220, 330],
    place: [300]
  };

  const notes = frequencies[type] || frequencies.merge;
  oscillator.type = type === "buy" ? "square" : "triangle";
  oscillator.frequency.setValueAtTime(notes[0], ctx.currentTime);
  if (notes[1]) {
    oscillator.frequency.linearRampToValueAtTime(notes[1], ctx.currentTime + 0.08);
  }

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.2);
}

function getBoardCellCount() {
  return board.length * board.length;
}

function getTileValue(tile) {
  const baseValue = tile.level * 10;
  return baseValue;
}

function canBuyUpgrade(cost) {
  return coins >= cost;
}

function spendCoins(amount) {
  coins -= amount;
  updateStats();
}

function updateUpgradeButtons() {
  Object.entries(upgradeConfig).forEach(([key, config]) => {
    const button = document.querySelector(`.upgrade-btn[data-upgrade="${key}"]`);
    const cost = getUpgradeCost(key);
    const text = button.querySelector("strong");
    text.textContent = String(cost);

    if (coins >= cost) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}

function getUpgradeCost(key) {
  const base = upgradeConfig[key].cost;
  const level = {
    expand: expandLevel,
    bonus: bonusLevel,
    luck: luckLevel,
    auto: autoLevel
  }[key] || 0;

  return base + level * 10;
}

function buyUpgrade(type) {
  const cost = getUpgradeCost(type);
  if (!canBuyUpgrade(cost)) {
    return;
  }

  spendCoins(cost);
  playSound("buy");

  if (type === "expand") {
    expandLevel += 1;
    if (board.length < 7) {
      const newSize = board.length + 1;
      const currentBoard = board;
      const nextBoard = createEmptyBoard(newSize);

      for (let row = 0; row < currentBoard.length; row += 1) {
        for (let col = 0; col < currentBoard.length; col += 1) {
          nextBoard[row][col] = currentBoard[row][col];
        }
      }
      board = nextBoard;
    }
  }

  if (type === "bonus") bonusLevel += 1;
  if (type === "luck") luckLevel += 1;
  if (type === "auto") autoLevel += 1;

  if (type === "auto") {
    startAutoSpawn();
  }

  updateUpgradeButtons();
  renderBoard();
}

function startAutoSpawn() {
  if (autoTimer) {
    clearInterval(autoTimer);
  }

  autoTimer = setInterval(() => {
    if (autoLevel > 0) {
      const cell = getRandomCell();
      if (cell) {
        board[cell.row][cell.col] = makeTile(randomType(), 1);
        playSound("place");
      }
      renderBoard();
    }
  }, 2000 - autoLevel * 180);
}

function mergeTileFrom(row, col) {
  const sourceTile = board[row][col];
  if (!sourceTile) return false;

  const neighbors = getNeighbors(row, col);
  let merged = false;

  for (const [nextRow, nextCol] of neighbors) {
    const targetTile = board[nextRow][nextCol];
    if (!targetTile) continue;

    if (targetTile.type.id === sourceTile.type.id && targetTile.level === sourceTile.level) {
      const mergedLevel = sourceTile.level + 1;
      const mergedTile = makeTile(sourceTile.type, mergedLevel);

      board[nextRow][nextCol] = mergedTile;
      board[row][col] = null;
      score += getTileValue(mergedTile) * combo;
      coins += Math.max(1, mergedLevel + bonusLevel);
      combo = Math.min(8, combo + 1);
      round += 1;
      playSound("merge");
      merged = true;
      break;
    }
  }

  if (!merged) {
    combo = 1;
  }

  updateStats();
  renderBoard();
  return merged;
}

function updateStats() {
  scoreEl.textContent = String(score);
  coinsEl.textContent = String(coins);
  roundEl.textContent = String(round);
  comboEl.textContent = `x${combo}`;

  if (currentTile) {
    nextTileEl.textContent = currentTile.type.emoji;
  }

  updateUpgradeButtons();
}

function placeCurrentTile(row, col) {
  if (board[row][col]) return;

  if (!currentTile) {
    currentTile = makeTile(randomType(), 1);
  }

  const placedTile = makeTile(currentTile.type, currentTile.level + luckLevel);
  board[row][col] = placedTile;
  const didMerge = mergeTileFrom(row, col);

  if (!didMerge) {
    score += 2 + luckLevel;
    coins += 1;
  }

  currentTile = makeTile(randomType(), 1);
  playSound("place");
  updateStats();
  renderBoard();
}

function renderBoard() {
  boardEl.innerHTML = "";

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board.length; col += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = `cell ${board[row][col] ? "filled" : "empty"}`;

      if (board[row][col]) {
        const tile = board[row][col];
        cell.classList.add(tile.type.colorClass);
        cell.innerHTML = `<span>${tile.type.emoji}</span><span class="cell-label">${tile.level > 1 ? tile.level : ""}</span>`;
        cell.classList.add("merging");
      }

      cell.addEventListener("click", () => {
        if (!board[row][col]) {
          placeCurrentTile(row, col);
        }
      });

      boardEl.appendChild(cell);
    }
  }
}

function resetGame() {
  board = createEmptyBoard();
  score = 0;
  coins = 0;
  round = 1;
  combo = 1;
  currentTile = makeTile(randomType(), 1);
  expandLevel = 0;
  bonusLevel = 0;
  luckLevel = 0;
  autoLevel = 0;

  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  for (let i = 0; i < 3; i += 1) {
    spawnRandomTile();
  }

  updateStats();
  renderBoard();
}

soundBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundBtn.textContent = soundEnabled ? "🔊" : "🔇";
});

upgradeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.upgrade;
    buyUpgrade(type);
  });
});

resetBtn.addEventListener("click", resetGame);
resetGame();
