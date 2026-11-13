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
const roundEl = document.getElementById("round");
const nextTileEl = document.getElementById("nextTile");
const comboEl = document.getElementById("combo");
const resetBtn = document.getElementById("resetBtn");
const soundBtn = document.getElementById("soundBtn");
const goalStatusEl = document.getElementById("goal-status");
const goalProgressEl = document.getElementById("goal-progress");
const goalProgressFillEl = document.getElementById("goal-progress-fill");
const goalCountEl = document.getElementById("goal-count");
const GARDEN_GOAL = 300;

let board = [];
let score = 0;
let round = 1;
let combo = 1;
let currentTile = null;
let soundEnabled = true;
let goalAchieved = false;
let roundFinished = false;

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
    place: [300]
  };

  const notes = frequencies[type] || frequencies.merge;
  oscillator.type = "triangle";
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
  roundEl.textContent = String(round);
  comboEl.textContent = `x${combo}`;

  if (currentTile) {
    nextTileEl.textContent = currentTile.type.emoji;
    nextTileEl.setAttribute("aria-label", `Nächste Pflanze: ${currentTile.type.id}`);
  }

  const progress = Math.min(score, GARDEN_GOAL);
  goalProgressEl.setAttribute("aria-valuenow", String(progress));
  goalProgressFillEl.style.width = `${(progress / GARDEN_GOAL) * 100}%`;
  goalCountEl.textContent = `${progress} / ${GARDEN_GOAL} Punkte`;
  if (score >= GARDEN_GOAL && !goalAchieved) {
    goalAchieved = true;
    goalStatusEl.textContent = "Goldene Ernte erreicht! Dein Garten bleibt offen – sammle weiter Punkte oder starte neu.";
  } else if (!goalAchieved) {
    goalStatusEl.textContent = `Erreiche ${GARDEN_GOAL} Punkte, um die Goldene Ernte freizuschalten.`;
  }

}

function placeCurrentTile(row, col) {
  if (roundFinished) return;
  if (board[row][col]) return;

  if (!currentTile) {
    currentTile = makeTile(randomType(), 1);
  }

  const placedTile = makeTile(currentTile.type, currentTile.level);
  board[row][col] = placedTile;
  const didMerge = mergeTileFrom(row, col);

  if (!didMerge) {
    score += 2;
  }

  currentTile = makeTile(randomType(), 1);
  playSound("place");
  updateStats();
  renderBoard();
  if (board.every((row) => row.every((cell) => cell !== null))) {
    roundFinished = true;
    resetBtn.disabled = true;
    goalStatusEl.textContent = "Das Spielfeld ist voll. Deine Runde ist beendet.";
    window.GameRoundSession.finish(goalAchieved);
  }
}

function renderBoard() {
  boardEl.innerHTML = "";
  boardEl.setAttribute("aria-label", `Garten-Spielfeld, ${board.length} mal ${board.length} Felder`);

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board.length; col += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = `cell ${board[row][col] ? "filled" : "empty"}`;
      cell.setAttribute(
        "aria-label",
        board[row][col]
          ? `Reihe ${row + 1}, Spalte ${col + 1}: ${board[row][col].type.id}, Stufe ${board[row][col].level}`
          : `Reihe ${row + 1}, Spalte ${col + 1}: leer, aktuelle Pflanze platzieren`
      );

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
  if (roundFinished) return;
  board = createEmptyBoard();
  score = 0;
  round = 1;
  combo = 1;
  currentTile = makeTile(randomType(), 1);
  goalAchieved = false;

  for (let i = 0; i < 3; i += 1) {
    spawnRandomTile();
  }

  updateStats();
  renderBoard();
}

soundBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundBtn.textContent = soundEnabled ? "🔊" : "🔇";
  soundBtn.setAttribute("aria-label", soundEnabled ? "Sound ausschalten" : "Sound einschalten");
  soundBtn.setAttribute("aria-pressed", String(soundEnabled));
});

resetBtn.addEventListener("click", resetGame);
resetGame();
