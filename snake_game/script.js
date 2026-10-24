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

const upgradeCosts = {
    gold: 25,
    shield: 30,
    tempo: 20
};

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15, type: 'apple' };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let coins = Number(localStorage.getItem('snakeCoins') || 0);
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
let activePowerUp = null;
let powerUpTimer = 0;
let goldBonusLevel = Number(localStorage.getItem('snakeGoldBonus') || 0);
let shieldLevel = Number(localStorage.getItem('snakeShieldLevel') || 0);
let tempoLevel = Number(localStorage.getItem('snakeTempoLevel') || 0);

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const coinDisplay = document.getElementById('coinCount');
const levelDisplay = document.getElementById('levelDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const recordBanner = document.getElementById('recordBanner');
const fruitButtons = [...document.querySelectorAll('.fruit-option')];
const upgradeButtons = [...document.querySelectorAll('.upgrade-btn')];
const activePowerUpDisplay = document.getElementById('activePowerUp');

highScoreDisplay.textContent = highScore;
coinDisplay.textContent = coins;
levelDisplay.textContent = level;
updateSpeedLabel();
updateUpgradeCosts();
updatePowerUpDisplay();

speedSlider.addEventListener('input', (event) => {
    currentSpeed = Number(event.target.value);
    updateSpeedLabel();

    if (gameRunning && !gamePaused) {
        moveInterval = currentSpeed;
        restartLoop();
    }
});

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
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

upgradeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.dataset.upgrade;
        buyUpgrade(type);
    });
});

document.addEventListener('keydown', handleKeyPress);
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);

function handleKeyPress(event) {
    if (!gameRunning) return;

    const key = event.key.toLowerCase();

    if (event.key === 'ArrowUp' && direction.y === 0) nextDirection = { x: 0, y: -1 };
    else if (event.key === 'ArrowDown' && direction.y === 0) nextDirection = { x: 0, y: 1 };
    else if (event.key === 'ArrowLeft' && direction.x === 0) nextDirection = { x: -1, y: 0 };
    else if (event.key === 'ArrowRight' && direction.x === 0) nextDirection = { x: 1, y: 0 };
    else if (key === 'w' && direction.y === 0) nextDirection = { x: 0, y: -1 };
    else if (key === 's' && direction.y === 0) nextDirection = { x: 0, y: 1 };
    else if (key === 'a' && direction.x === 0) nextDirection = { x: -1, y: 0 };
    else if (key === 'd' && direction.x === 0) nextDirection = { x: 1, y: 0 };

    event.preventDefault();
}

function updateSpeedLabel() {
    speedValue.textContent = `${currentSpeed} ms`;
}

function updateUpgradeCosts() {
    document.getElementById('goldCost').textContent = String(upgradeCosts.gold + goldBonusLevel * 10);
    document.getElementById('shieldCost').textContent = String(upgradeCosts.shield + shieldLevel * 12);
    document.getElementById('tempoCost').textContent = String(upgradeCosts.tempo + tempoLevel * 10);
}

function updatePowerUpDisplay() {
    activePowerUpDisplay.textContent = activePowerUp || 'keine';
}

function saveProgress() {
    localStorage.setItem('snakeCoins', String(coins));
    localStorage.setItem('snakeLevel', String(level));
    localStorage.setItem('snakeHighScore', String(highScore));
    localStorage.setItem('snakeGoldBonus', String(goldBonusLevel));
    localStorage.setItem('snakeShieldLevel', String(shieldLevel));
    localStorage.setItem('snakeTempoLevel', String(tempoLevel));
}

function buyUpgrade(type) {
    const costs = {
        gold: upgradeCosts.gold + goldBonusLevel * 10,
        shield: upgradeCosts.shield + shieldLevel * 12,
        tempo: upgradeCosts.tempo + tempoLevel * 10
    };

    const cost = costs[type];
    if (coins < cost) return;

    coins -= cost;
    coinDisplay.textContent = coins;

    if (type === 'gold') goldBonusLevel += 1;
    if (type === 'shield') shieldLevel += 1;
    if (type === 'tempo') tempoLevel += 1;

    saveProgress();
    updateUpgradeCosts();
    activatePowerUp(type === 'tempo' ? 'tempo' : type === 'shield' ? 'shield' : 'gold');
}

function activatePowerUp(type) {
    activePowerUp = type;
    updatePowerUpDisplay();

    if (type === 'shield') {
        powerUpTimer = 6000;
    } else if (type === 'tempo') {
        powerUpTimer = 5000;
    } else {
        powerUpTimer = 7000;
    }
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        restartLoop();
    }
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
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    activePowerUp = null;
    powerUpTimer = 0;
    updatePowerUpDisplay();
    hideRecordBanner();
    generateFood();
    prevSnake = snake.map(s => ({ ...s }));
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

function applyPowerUpEffects() {
    if (!activePowerUp) return;

    if (powerUpTimer > 0) {
        powerUpTimer -= moveInterval;
    } else {
        activePowerUp = null;
        updatePowerUpDisplay();
    }
}

function performTick() {
    if (gamePaused || !gameRunning) return;

    prevSnake = snake.map(s => ({ ...s }));
    direction = nextDirection;

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        if (shieldLevel > 0 && activePowerUp === 'shield') {
            activePowerUp = null;
            updatePowerUpDisplay();
            snake = [{ x: 10, y: 10 }];
            direction = { x: 1, y: 0 };
            nextDirection = { x: 1, y: 0 };
            return;
        }
        endGame();
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        if (shieldLevel > 0 && activePowerUp === 'shield') {
            activePowerUp = null;
            updatePowerUpDisplay();
            snake = [{ x: 10, y: 10 }];
            direction = { x: 1, y: 0 };
            nextDirection = { x: 1, y: 0 };
            return;
        }
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        const points = fruitConfig[food.type].points;
        const multiplier = activePowerUp === 'gold' ? 2 : 1;
        const gained = points * multiplier;
        score += gained;
        scoreDisplay.textContent = score;
        coins += 1 + goldBonusLevel;
        coinDisplay.textContent = coins;
        generateFood();
        updateLevel();

        if (snake.length > prevSnake.length) {
            const lastPrev = prevSnake[prevSnake.length - 1] || { ...snake[snake.length - 1] };
            prevSnake = prevSnake.concat(Array(snake.length - prevSnake.length).fill({ ...lastPrev }));
        }
    } else {
        snake.pop();
    }

    applyPowerUpEffects();
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
    let newFood;
    let validPosition = false;

    while (!validPosition) {
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT),
            type: food.type || 'apple'
        };
        validPosition = !snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
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

    saveProgress();
    draw();
}

draw();
