const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

const fruitConfig = {
    apple: { icon: '🍎', color: '#e15656', points: 10, glow: '#ff8f8f' },
    banana: { icon: '🍌', color: '#f0d75f', points: 20, glow: '#ffe88b' },
    grape: { icon: '🍇', color: '#8f63d9', points: 30, glow: '#b799ff' },
    orange: { icon: '🍊', color: '#f4a14a', points: 40, glow: '#ffc07a' }
};

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15, type: 'apple' };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let level = Number(localStorage.getItem('snakeLevel') || 1);
let highScore = Number(localStorage.getItem('snakeHighScore') || 0);
let gameRunning = false;
let gamePaused = false;
let currentSpeed = 150;
let rafId = null;
let lastFrameTime = 0;
let accumulator = 0;
let moveInterval = currentSpeed;
let prevSnake = snake.map(s => ({ ...s }));
let challengeMode = false;
let challengeDate = null;
let challengeConfig = null;
let dailyFoodsEaten = 0;
let dailyCompleted = false;

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const levelDisplay = document.getElementById('levelDisplay');
const startBtn = document.getElementById('startBtn');
const dailyChallengeBtn = document.getElementById('dailyChallengeBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const recordBanner = document.getElementById('recordBanner');
const dailyStatus = document.getElementById('dailyStatus');
const fruitButtons = [...document.querySelectorAll('.fruit-option')];

highScoreDisplay.textContent = highScore;
levelDisplay.textContent = level;
updateSpeedLabel();
updateDailyStatus();

speedSlider.addEventListener('input', (event) => {
    currentSpeed = Number(event.target.value);
    updateSpeedLabel();

    if (gameRunning && !gamePaused) {
        moveInterval = currentSpeed;
        restartLoop();
    }
});

settingsToggle.addEventListener('click', () => {
    const expanded = settingsToggle.getAttribute('aria-expanded') !== 'true';
    settingsPanel.classList.toggle('hidden', !expanded);
    settingsToggle.setAttribute('aria-expanded', String(expanded));
    settingsToggle.setAttribute('aria-label', expanded ? 'Einstellungen schließen' : 'Einstellungen öffnen');
});

fruitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedType = button.dataset.fruit;
        fruitButtons.forEach((btn) => {
            const active = btn === button;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', String(active));
        });
        food.type = selectedType;
        if (gameRunning) draw();
    });
});

document.addEventListener('keydown', handleKeyPress);
document.querySelectorAll('.touch-controls [data-direction]').forEach((button) => {
    button.addEventListener('click', () => setDirection(button.dataset.direction));
});
startBtn.addEventListener('click', () => startGame(false));
dailyChallengeBtn.addEventListener('click', startDailyChallenge);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);

function handleKeyPress(event) {
    if (!gameRunning) return;
    if (event.target.matches('input, textarea, select, button, [contenteditable="true"]')) return;

    const key = event.key.toLowerCase();
    const directions = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right'
    };
    const selectedDirection = directions[event.key] || directions[key];
    if (!selectedDirection) return;
    event.preventDefault();
    setDirection(selectedDirection);
}

function setDirection(selectedDirection) {
    if (!gameRunning) return;
    const next = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
    }[selectedDirection];
    if (next.x !== 0 && direction.x === 0) nextDirection = next;
    if (next.y !== 0 && direction.y === 0) nextDirection = next;
}

function updateSpeedLabel() {
    speedValue.textContent = `${currentSpeed} ms`;
}

function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function createDailyConfig(dateKey) {
    let seed = 2166136261;
    for (const character of dateKey) {
        seed ^= character.charCodeAt(0);
        seed = Math.imul(seed, 16777619);
    }

    let randomState = seed >>> 0;
    const random = () => {
        randomState += 0x6D2B79F5;
        let value = randomState;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };

    const obstacles = [];
    while (obstacles.length < 12) {
        const candidate = {
            x: Math.floor(random() * TILE_COUNT),
            y: Math.floor(random() * TILE_COUNT)
        };
        const nearStart = Math.abs(candidate.x - 10) <= 2 && Math.abs(candidate.y - 10) <= 2;
        const duplicate = obstacles.some(cell => cell.x === candidate.x && cell.y === candidate.y);
        if (!nearStart && !duplicate) obstacles.push(candidate);
    }

    return { obstacles, random, goal: 10 };
}

function getDailyRecords() {
    try {
        const records = JSON.parse(localStorage.getItem('snakeDailyRecords') || '{}');
        return records && typeof records === 'object' && !Array.isArray(records) ? records : {};
    } catch {
        return {};
    }
}

function updateDailyStatus() {
    const dateKey = challengeDate || getLocalDateKey();
    const dailyConfigForDisplay = challengeConfig || createDailyConfig(dateKey);
    const record = getDailyRecords()[dateKey] || {};
    const completion = record.completed ? 'Abgeschlossen ✓' : 'Noch offen';
    const mode = challengeMode ? 'Aktuelle Runde' : 'Heutige Challenge';
    const progress = challengeMode ? ` | Fortschritt: ${dailyFoodsEaten}/${dailyConfigForDisplay.goal}` : '';
    dailyStatus.textContent = `📅 ${mode} · ${dateKey} | Ziel: ${dailyConfigForDisplay.goal} Äpfel | 12 Hindernisse${progress} | Tagesrekord: ${Number(record.bestScore) || 0} Punkte | ${completion}`;
}

function saveDailyResult(completed = false) {
    if (!challengeMode || !challengeDate) return;
    const records = getDailyRecords();
    const existing = records[challengeDate];
    const record = existing && typeof existing === 'object' ? existing : { bestScore: 0, completed: false };
    record.bestScore = Math.max(Number(record.bestScore) || 0, score);
    record.completed = Boolean(record.completed || completed);
    records[challengeDate] = record;
    localStorage.setItem('snakeDailyRecords', JSON.stringify(records));
    updateDailyStatus();
}

function saveProgress() {
    localStorage.setItem('snakeLevel', String(level));
    localStorage.setItem('snakeHighScore', String(highScore));
}

function startGame(isDailyChallenge = false) {
    if (!gameRunning) {
        if (!isDailyChallenge && challengeMode) {
            challengeMode = false;
            challengeDate = null;
            challengeConfig = null;
            dailyFoodsEaten = 0;
            dailyCompleted = false;
            resetGame();
        }
        challengeMode = isDailyChallenge;
        if (!challengeMode) {
            challengeDate = null;
            challengeConfig = null;
            dailyFoodsEaten = 0;
            dailyCompleted = false;
        }
        updateDailyStatus();
        gameRunning = true;
        gamePaused = false;
        startBtn.disabled = true;
        dailyChallengeBtn.disabled = true;
        pauseBtn.disabled = false;
        restartLoop();
    }
}

function startDailyChallenge() {
    if (gameRunning) return;
    challengeMode = true;
    challengeDate = getLocalDateKey();
    challengeConfig = createDailyConfig(challengeDate);
    dailyFoodsEaten = 0;
    dailyCompleted = false;
    score = 0;
    resetGame();
    startGame(true);
}

function restartLoop() {
    if (rafId) cancelAnimationFrame(rafId);
    moveInterval = currentSpeed;
    accumulator = 0;
    lastFrameTime = 0;
    rafId = requestAnimationFrame(gameLoopRAF);
}

function togglePause() {
    if (!gameRunning) return;

    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Fortsetzen' : 'Pause';

    if (gamePaused) {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    } else {
        restartLoop();
    }
}

function resetGame() {
    if (challengeMode && (gameRunning || score > 0)) saveDailyResult(dailyCompleted);
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    gameRunning = false;
    gamePaused = false;
    startBtn.disabled = false;
    dailyChallengeBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    hideRecordBanner();
    if (challengeMode && challengeDate) challengeConfig = createDailyConfig(challengeDate);
    generateFood();
    prevSnake = snake.map(s => ({ ...s }));
    updateDailyStatus();
    draw();
}

function updateLevel() {
    const nextLevel = Math.floor(score / 100) + 1;
    if (nextLevel !== level) {
        level = nextLevel;
        levelDisplay.textContent = level;
        currentSpeed = Math.max(80, 150 - (level - 1) * 8);
        speedSlider.value = String(currentSpeed);
        updateSpeedLabel();
        saveProgress();
    }
}

function performTick() {
    if (gamePaused || !gameRunning) return;

    prevSnake = snake.map(s => ({ ...s }));
    direction = nextDirection;

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        endGame();
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    if (challengeMode && challengeConfig.obstacles.some(cell => cell.x === head.x && cell.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        const points = fruitConfig[food.type].points;
        score += points;
        scoreDisplay.textContent = score;
        if (challengeMode) dailyFoodsEaten += 1;
        generateFood();
        updateLevel();

        if (snake.length > prevSnake.length) {
            const lastPrev = prevSnake[prevSnake.length - 1] || { ...snake[snake.length - 1] };
            prevSnake = prevSnake.concat(Array(snake.length - prevSnake.length).fill({ ...lastPrev }));
        }
    } else {
        snake.pop();
    }

    if (challengeMode) updateDailyStatus();
    if (challengeMode && dailyFoodsEaten >= challengeConfig.goal) {
        dailyCompleted = true;
        endGame();
    }
}

function gameLoopRAF(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const delta = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (!gamePaused && gameRunning) {
        accumulator += delta;

        while (accumulator >= moveInterval) {
            performTick();
            accumulator -= moveInterval;
        }

        const interpolation = moveInterval > 0 ? (accumulator / moveInterval) : 0;
        draw(interpolation);
    } else {
        draw(0);
    }

    rafId = requestAnimationFrame(gameLoopRAF);
}

function generateFood() {
    if (challengeMode && !challengeConfig) {
        challengeConfig = createDailyConfig(challengeDate || getLocalDateKey());
    }
    let newFood;
    let validPosition = false;

    while (!validPosition) {
        const random = challengeMode ? challengeConfig.random : Math.random;
        newFood = {
            x: Math.floor(random() * TILE_COUNT),
            y: Math.floor(random() * TILE_COUNT),
            type: challengeMode ? 'apple' : food.type || 'apple'
        };
        const isObstacle = challengeMode && challengeConfig.obstacles.some(cell => cell.x === newFood.x && cell.y === newFood.y);
        validPosition = !isObstacle && !snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }

    food = newFood;
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    background.addColorStop(0, '#d9ebf0');
    background.addColorStop(1, '#eef2ee');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(31, 42, 47, 0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }

    if (challengeMode && challengeConfig) {
        ctx.fillStyle = '#6f6260';
        challengeConfig.obstacles.forEach(cell => {
            const x = cell.x * GRID_SIZE;
            const y = cell.y * GRID_SIZE;
            ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4);
            ctx.fillStyle = '#a89891';
            ctx.fillRect(x + 5, y + 5, GRID_SIZE - 10, GRID_SIZE - 10);
            ctx.fillStyle = '#6f6260';
        });
    }
}

function drawFood() {
    const config = fruitConfig[food.type];
    const centerX = food.x * GRID_SIZE + GRID_SIZE / 2;
    const centerY = food.y * GRID_SIZE + GRID_SIZE / 2;

    ctx.shadowBlur = 18;
    ctx.shadowColor = config.glow;
    ctx.fillStyle = config.color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, GRID_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.beginPath();
    ctx.arc(centerX - 4, centerY - 4, GRID_SIZE / 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '18px "Segoe UI Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(config.icon, centerX, centerY + 1);
}

function drawSnake(interpolation = 0) {
    if (!prevSnake || prevSnake.length === 0) prevSnake = snake.map(s => ({ ...s }));

    if (prevSnake.length < snake.length) {
        const lastPrev = prevSnake[prevSnake.length - 1] || { ...snake[snake.length - 1] };
        prevSnake = prevSnake.concat(Array(snake.length - prevSnake.length).fill({ ...lastPrev }));
    } else if (prevSnake.length > snake.length) {
        prevSnake = prevSnake.slice(0, snake.length);
    }

    const lerp = (a, b, t) => a + (b - a) * t;

    snake.forEach((segment, index) => {
        const prev = prevSnake[index] || prevSnake[prevSnake.length - 1];
        const curr = segment;

        const interpX = lerp(prev.x, curr.x, interpolation);
        const interpY = lerp(prev.y, curr.y, interpolation);

        const x = interpX * GRID_SIZE + 1;
        const y = interpY * GRID_SIZE + 1;

        if (index === 0) {
            ctx.fillStyle = '#1f2a2f';
            ctx.fillRect(x, y, GRID_SIZE - 2, GRID_SIZE - 2);
            ctx.fillStyle = '#fff';
            ctx.fillRect(x + 4, y + 5, 3, 3);
            ctx.fillRect(x + GRID_SIZE - 9, y + 5, 3, 3);
        } else {
            ctx.fillStyle = index % 2 === 0 ? '#5a7d8a' : '#9aaab1';
            ctx.fillRect(x, y, GRID_SIZE - 2, GRID_SIZE - 2);
        }
    });
}

function draw(interpolation = 0) {
    drawBoard();
    drawFood();
    drawSnake(interpolation);
}

function hideRecordBanner() {
    recordBanner.classList.add('hidden');
    recordBanner.textContent = '';
}

function showRecordBanner(oldScore, newScore) {
    recordBanner.textContent = `🏆 Rekord gebrochen! ${oldScore} → ${newScore}`;
    recordBanner.classList.remove('hidden');
}

function endGame() {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    gameRunning = false;
    gamePaused = false;
    startBtn.disabled = false;
    dailyChallengeBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    const previousHighScore = highScore;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', String(highScore));
        highScoreDisplay.textContent = highScore;
        showRecordBanner(previousHighScore, highScore);
    } else {
        hideRecordBanner();
    }

    if (challengeMode) saveDailyResult(dailyCompleted);
    saveProgress();
    draw();
    window.GameRoundSession.finish(dailyCompleted);
}

draw();
