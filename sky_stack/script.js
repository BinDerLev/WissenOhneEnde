const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");
const scoreDisplay = document.querySelector("#score");
const bestScoreDisplay = document.querySelector("#best-score");
const gameMessage = document.querySelector("#game-message");
const dropButton = document.querySelector("#drop-button");
const startButton = document.querySelector("#start-button");
const modeSelect = document.querySelector("#game-mode");
const targetScoreDisplay = document.querySelector("#target-score");
const dailyDateDisplay = document.querySelector("#daily-challenge-date");
const dailyConfigDisplay = document.querySelector("#daily-challenge-config");
const dailyStatusDisplay = document.querySelector("#daily-challenge-status");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BLOCK_HEIGHT = 26;
const FLOOR = HEIGHT - 34;
const COLORS = ["#62d6ff", "#9d8aff", "#ff8db2", "#ffc36f", "#77e3b0"];

let blocks = [];
let movingBlock = null;
let score = 0;
let bestScore = loadBestScore();
let gameState = "ready";
let animationFrame = 0;
let currentMode = "classic";
const CHALLENGE_TARGET = 12;
const dailyDateKey = getLocalDateKey();
const dailyConfig = createDailyConfig(dailyDateKey);
let dailyRandom = null;
let dailyRecord = loadDailyRecord();

bestScoreDisplay.textContent = String(bestScore);
dailyDateDisplay.textContent = `Tages-Challenge · ${formatDailyDate(dailyDateKey)}`;
dailyConfigDisplay.textContent = `Fester Tagesaufbau: Startbreite ${dailyConfig.startingWidth} · Tempo ${dailyConfig.speed.toFixed(1).replace(".", ",")}`;
updateDailyStatus();

function getLocalDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function formatDailyDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function createSeededRandom(seedText) {
  let seed = 2166136261;
  for (let index = 0; index < seedText.length; index += 1) {
    seed ^= seedText.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }
  return function nextRandom() {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createDailyConfig(dateKey) {
  const random = createSeededRandom(dateKey);
  return {
    startingWidth: 170 + Math.floor(random() * 41),
    speed: Number((2.8 + random() * 0.8).toFixed(1)),
    startingX: random(),
    startingDirection: random() < 0.5 ? -1 : 1
  };
}

function dailyStorageKey() {
  return `sky-stack-daily-${dailyDateKey}`;
}

function loadDailyRecord() {
  try {
    const stored = JSON.parse(localStorage.getItem(dailyStorageKey()) || "{}");
    return {
      bestScore: Number.isInteger(stored.bestScore) && stored.bestScore >= 0 ? stored.bestScore : 0,
      completed: stored.completed === true
    };
  } catch (error) {
    console.warn("Sky-Stack-Tagesrekord konnte nicht geladen werden.", error);
    return { bestScore: 0, completed: false };
  }
}

function saveDailyRecord() {
  try {
    localStorage.setItem(dailyStorageKey(), JSON.stringify(dailyRecord));
  } catch (error) {
    console.warn("Sky-Stack-Tagesrekord konnte nicht gespeichert werden.", error);
  }
}

function updateDailyStatus(active = false) {
  const status = dailyRecord.completed ? "Geschafft" : active ? "Läuft" : "Offen";
  dailyStatusDisplay.textContent = `Status: ${status} · Tagesrekord: ${dailyRecord.bestScore}/${CHALLENGE_TARGET}`;
}

function loadBestScore() {
  try {
    const stored = Number.parseInt(localStorage.getItem("sky-stack-best") || "0", 10);
    return Number.isFinite(stored) && stored >= 0 ? stored : 0;
  } catch (error) {
    console.warn("Sky-Stack-Rekord konnte nicht geladen werden.", error);
    return 0;
  }
}

function saveBestScore() {
  try {
    localStorage.setItem("sky-stack-best", String(bestScore));
  } catch (error) {
    console.warn("Sky-Stack-Rekord konnte nicht gespeichert werden.", error);
  }
}

function startGame() {
  cancelAnimationFrame(animationFrame);
  currentMode = modeSelect.value;
  score = 0;
  const startingWidth = currentMode === "daily" ? dailyConfig.startingWidth : currentMode === "challenge" ? 190 : 240;
  blocks = [{ x: 200, width: startingWidth, color: "#7185ff" }];
  const isDaily = currentMode === "daily";
  dailyRandom = isDaily ? createSeededRandom(dailyDateKey) : null;
  const dailyStartingX = 28 + Math.floor(dailyConfig.startingX * (WIDTH - 56 - startingWidth));
  movingBlock = {
    x: isDaily ? dailyStartingX : 0,
    width: blocks[0].width,
    direction: isDaily ? dailyConfig.startingDirection : 1,
    speed: isDaily ? dailyConfig.speed : currentMode === "challenge" ? 3.1 : 2.3
  };
  gameState = "playing";
  scoreDisplay.textContent = "0";
  targetScoreDisplay.textContent = currentMode === "challenge" || isDaily ? String(CHALLENGE_TARGET) : "–";
  gameMessage.textContent = isDaily
    ? `Die Tages-Challenge für ${formatDailyDate(dailyDateKey)}: Setze 12 Blöcke.`
    : currentMode === "challenge"
      ? `Setze 12 Blöcke möglichst genau aufeinander.`
    : "Setze den Block möglichst genau auf den Turm.";
  if (isDaily) updateDailyStatus(true);
  dropButton.disabled = false;
  modeSelect.disabled = true;
  startButton.textContent = "Neu starten";
  draw();
  animationFrame = requestAnimationFrame(tick);
}

function tick() {
  if (gameState !== "playing") return;
  movingBlock.x += movingBlock.speed * movingBlock.direction;
  if (movingBlock.x + movingBlock.width >= WIDTH - 28) {
    movingBlock.x = WIDTH - 28 - movingBlock.width;
    movingBlock.direction = -1;
  } else if (movingBlock.x <= 28) {
    movingBlock.x = 28;
    movingBlock.direction = 1;
  }
  draw();
  animationFrame = requestAnimationFrame(tick);
}

function dropBlock() {
  if (gameState !== "playing" || !movingBlock) return;

  const previous = blocks[blocks.length - 1];
  const left = Math.max(previous.x, movingBlock.x);
  const right = Math.min(previous.x + previous.width, movingBlock.x + movingBlock.width);
  const overlap = right - left;

  if (overlap < 8) {
    endGame();
    return;
  }

  const accuracy = overlap / previous.width;
  blocks.push({
    x: left,
    width: overlap,
    color: COLORS[score % COLORS.length]
  });
  score += 1;
  scoreDisplay.textContent = String(score);
  gameMessage.textContent = accuracy > 0.94
    ? "Perfekt! Dein Turm wächst weiter."
    : "Gut getroffen! Weiter so.";

  if (score > bestScore) {
    bestScore = score;
    bestScoreDisplay.textContent = String(bestScore);
    saveBestScore();
  }

  if (currentMode === "daily" && score > dailyRecord.bestScore) {
    dailyRecord.bestScore = score;
    saveDailyRecord();
    updateDailyStatus(true);
  }

  if ((currentMode === "challenge" || currentMode === "daily") && score >= CHALLENGE_TARGET) {
    winChallenge();
    return;
  }

  const speed = currentMode === "daily"
    ? Math.min(6.4, dailyConfig.speed + score * 0.18)
    : currentMode === "challenge"
      ? Math.min(6.4, 3.1 + score * 0.18)
    : Math.min(5.2, 2.3 + score * 0.12);
  const random = currentMode === "daily" ? dailyRandom : Math.random;
  movingBlock = {
    x: random() < 0.5 ? 28 : WIDTH - 28 - overlap,
    width: overlap,
    direction: random() < 0.5 ? 1 : -1,
    speed
  };
  if (movingBlock.x <= 28) movingBlock.direction = 1;
  if (movingBlock.x + movingBlock.width >= WIDTH - 28) movingBlock.direction = -1;
  draw();
}

function endGame() {
  gameState = "over";
  movingBlock = null;
  dropButton.disabled = true;
  modeSelect.disabled = false;
  startButton.textContent = "Nochmal spielen";
  gameMessage.textContent = score
    ? `Der Turm ist ${score} Blöcke hoch. Versuch es gleich noch einmal!`
    : "Knapp daneben! Starte neu und versuche es noch einmal.";
  if (currentMode === "daily") updateDailyStatus();
  draw();
  window.GameRoundSession.finish();
}

function winChallenge() {
  gameState = "won";
  movingBlock = null;
  dropButton.disabled = true;
  modeSelect.disabled = false;
  startButton.textContent = "Challenge wiederholen";
  if (currentMode === "daily") {
    dailyRecord.completed = true;
    dailyRecord.bestScore = Math.max(dailyRecord.bestScore, score);
    saveDailyRecord();
    updateDailyStatus();
    gameMessage.textContent = `Geschafft! Du hast die Tages-Challenge für ${formatDailyDate(dailyDateKey)} gewonnen.`;
  } else {
    gameMessage.textContent = `Geschafft! Du hast den 12. Block gesetzt und die Präzisions-Challenge gewonnen.`;
  }
  draw();
  window.GameRoundSession.finish();
}

function drawBackground() {
  const sky = context.createLinearGradient(0, 0, 0, HEIGHT);
  sky.addColorStop(0, "#263e68");
  sky.addColorStop(1, "#17243f");
  context.fillStyle = sky;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = "rgb(255 255 255 / 70%)";
  for (let index = 0; index < 38; index += 1) {
    const x = (index * 173 + 41) % WIDTH;
    const y = (index * 97 + 23) % 260;
    context.globalAlpha = 0.35 + (index % 4) * 0.14;
    context.beginPath();
    context.arc(x, y, index % 5 === 0 ? 2 : 1, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;

  context.fillStyle = "rgb(120 163 226 / 12%)";
  for (let index = 0; index < 5; index += 1) {
    const x = index * 155 - 35;
    const y = 330 + (index % 2) * 18;
    context.beginPath();
    context.ellipse(x, y, 100, 26, 0, 0, Math.PI * 2);
    context.fill();
  }
}

function drawBlock(block, y, isMoving = false) {
  context.fillStyle = block.color;
  context.shadowColor = isMoving ? "rgb(98 214 255 / 40%)" : "transparent";
  context.shadowBlur = isMoving ? 18 : 0;
  context.fillRect(block.x, y, block.width, BLOCK_HEIGHT);
  context.shadowBlur = 0;
  context.fillStyle = "rgb(255 255 255 / 20%)";
  context.fillRect(block.x, y, block.width, 4);
  context.fillStyle = "rgb(15 25 48 / 14%)";
  context.fillRect(block.x, y + BLOCK_HEIGHT - 4, block.width, 4);
}

function draw() {
  drawBackground();
  const cameraOffset = Math.max(0, (blocks.length + 1) * BLOCK_HEIGHT - 290);

  blocks.forEach((block, index) => {
    const y = FLOOR - (index + 1) * BLOCK_HEIGHT + cameraOffset;
    if (y < HEIGHT) drawBlock(block, y);
  });

  if (movingBlock && gameState === "playing") {
    const y = FLOOR - (blocks.length + 1) * BLOCK_HEIGHT + cameraOffset;
    drawBlock(movingBlock, y, true);
  }

  context.fillStyle = "rgb(10 17 34 / 35%)";
  context.fillRect(0, FLOOR, WIDTH, HEIGHT - FLOOR);

  if (gameState !== "playing") {
    context.fillStyle = "rgb(10 17 34 / 55%)";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.textAlign = "center";
    context.fillStyle = "#fff";
    context.font = "800 34px system-ui, sans-serif";
    const title = gameState === "over"
      ? "Turm eingestürzt!"
      : gameState === "won"
        ? "Challenge geschafft!"
        : "Baue deinen Turm";
    context.fillText(title, WIDTH / 2, HEIGHT / 2 - 7);
    context.fillStyle = "#c8d6f1";
    context.font = "16px system-ui, sans-serif";
    context.fillText(gameState === "over" ? `Höhe: ${score}` : gameState === "won" ? "12 Blöcke erreicht" : "Präzision ist alles", WIDTH / 2, HEIGHT / 2 + 25);
  }
}

dropButton.addEventListener("click", dropBlock);
startButton.addEventListener("click", startGame);
modeSelect.addEventListener("change", () => updateDailyStatus());
canvas.addEventListener("pointerdown", dropBlock);
document.addEventListener("keydown", (event) => {
  if (
    event.code === "Space"
    && gameState === "playing"
    && event.target !== modeSelect
    && event.target !== startButton
    && event.target !== dropButton
  ) {
    event.preventDefault();
    dropBlock();
  }
});

draw();
