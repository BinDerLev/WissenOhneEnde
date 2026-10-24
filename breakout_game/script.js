const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Constants
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 15;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;
const BRICK_COLS = 7;
const BRICK_ROWS = 4;

// Paddle Constants
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const PADDLE_Y = canvas.height - 30;

// Ball Constants
const BALL_RADIUS = 6;
const INITIAL_BALL_SPEED = 5;

// Game Variables
let paddle = { x: canvas.width / 2 - PADDLE_WIDTH / 2, y: PADDLE_Y, width: PADDLE_WIDTH };
let ball = { x: canvas.width / 2, y: canvas.height - 50, dx: 0, dy: 0, vx: 0, vy: 0 };
let bricks = [];
let score = 0;
let level = 1;
let lives = 3;
let gameRunning = false;
let gamePaused = false;
let gameLoop;
let ballSpeed = INITIAL_BALL_SPEED;

// Input handling
const keys = {
    left: false,
    right: false
};

// DOM Elements
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const livesDisplay = document.getElementById('lives');
const coinsDisplay = document.getElementById('coins');
const bestScoreDisplay = document.getElementById('bestScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const upgradeButtons = [...document.querySelectorAll('.upgrade-btn')];

// Game Data
const upgradeCosts = {
    paddle: 25,
    ball: 30,
    life: 35,
};

const paddleUpgradeLevel = Number(localStorage.getItem('breakout_paddleLevel') || 0);
const ballUpgradeLevel = Number(localStorage.getItem('breakout_ballLevel') || 0);
const lifeUpgradeLevel = Number(localStorage.getItem('breakout_lifeLevel') || 0);
let coins = Number(localStorage.getItem('breakout_coins') || 0);
let bestScore = Number(localStorage.getItem('breakout_bestScore') || 0);

// Event Listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);

function handleKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
}

function handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
}

function initBricks() {
    bricks = [];
    const colors = ['#ff4444', '#ff6644', '#ff9933', '#ffbb33', '#ffdd44', '#99dd44', '#44dd44'];

    for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLS; col++) {
            bricks.push({
                x: BRICK_OFFSET_LEFT + col * (BRICK_WIDTH + BRICK_PADDING),
                y: BRICK_OFFSET_TOP + row * (BRICK_HEIGHT + BRICK_PADDING),
                width: BRICK_WIDTH,
                height: BRICK_HEIGHT,
                color: colors[row % colors.length],
                points: (row + 1) * 10,
            });
        }
    }
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        if (ball.vx === 0 && ball.vy === 0) {
            ball.vx = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
            ball.vy = -ballSpeed;
        }

        gameLoop = setInterval(update, 1000 / 60); // 60 FPS
    }
}

function togglePause() {
    if (gameRunning) {
        gamePaused = !gamePaused;
        pauseBtn.textContent = gamePaused ? 'Fortsetzen' : 'Pause';

        if (!gamePaused) {
            gameLoop = setInterval(update, 1000 / 60);
        } else {
            clearInterval(gameLoop);
        }
    }
}

function resetGame() {
    clearInterval(gameLoop);
    paddle = { x: canvas.width / 2 - PADDLE_WIDTH / 2, y: PADDLE_Y, width: PADDLE_WIDTH };
    ball = { x: canvas.width / 2, y: canvas.height - 50, dx: 0, dy: 0, vx: 0, vy: 0 };
    score = 0;
    level = 1;
    lives = 3;
    gameRunning = false;
    gamePaused = false;
    ballSpeed = INITIAL_BALL_SPEED;

    updateHud();

    initBricks();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    draw();
}

function update() {
    if (gamePaused) return;

    const paddleSpeed = 6;
    if (keys.left && paddle.x > 0) {
        paddle.x -= paddleSpeed;
    }
    if (keys.right && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddleSpeed;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x - BALL_RADIUS < 0 || ball.x + BALL_RADIUS > canvas.width) {
        ball.vx = -ball.vx;
        ball.x = Math.max(BALL_RADIUS, Math.min(canvas.width - BALL_RADIUS, ball.x));
    }

    if (ball.y - BALL_RADIUS < 0) {
        ball.vy = -ball.vy;
        ball.y = BALL_RADIUS;
    }

    if (ball.y + BALL_RADIUS >= paddle.y &&
        ball.y - BALL_RADIUS <= paddle.y + PADDLE_HEIGHT &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width) {

        ball.vy = -Math.abs(ball.vy);
        const hitPos = (ball.x - paddle.x) / paddle.width;
        ball.vx = (hitPos - 0.5) * 8;
    }

    if (ball.y > canvas.height) {
        lives--;
        livesDisplay.textContent = lives;

        if (lives <= 0) {
            endGame();
            return;
        }

        ball = { x: canvas.width / 2, y: canvas.height - 50, vx: 0, vy: 0 };
        gameRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        clearInterval(gameLoop);
        draw();
        return;
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i];

        if (ball.x - BALL_RADIUS < brick.x + brick.width &&
            ball.x + BALL_RADIUS > brick.x &&
            ball.y - BALL_RADIUS < brick.y + brick.height &&
            ball.y + BALL_RADIUS > brick.y) {

            const overlapLeft = (ball.x + BALL_RADIUS) - brick.x;
            const overlapRight = (brick.x + brick.width) - (ball.x - BALL_RADIUS);
            const overlapTop = (ball.y + BALL_RADIUS) - brick.y;
            const overlapBottom = (brick.y + brick.height) - (ball.y - BALL_RADIUS);

            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                ball.vx = -ball.vx;
            } else {
                ball.vy = -ball.vy;
            }

            score += brick.points;
            coins += 3;
            scoreDisplay.textContent = score;
            bricks.splice(i, 1);
            updateHud();
            break;
        }
    }

    if (bricks.length === 0) {
        levelUp();
        return;
    }

    draw();
}

function levelUp() {
    clearInterval(gameLoop);
    level++;
    levelDisplay.textContent = level;
    ballSpeed = INITIAL_BALL_SPEED + (level - 1);

    ball = { x: canvas.width / 2, y: canvas.height - 50, vx: 0, vy: 0 };
    paddle = { x: canvas.width / 2 - PADDLE_WIDTH / 2, y: PADDLE_Y, width: PADDLE_WIDTH };

    initBricks();
    gameRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    alert(`🎉 Level ${level - 1} abgeschlossen!\nLevel ${level} wird gestartet...`);
    updateHud();
    draw();
}

function draw() {
    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0e27');
    gradient.addColorStop(1, '#1a2a4a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw bricks with glow
    bricks.forEach(brick => {
        ctx.shadowColor = brick.color;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);

        // Brick border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
    });

    ctx.shadowBlur = 0;

    // Draw paddle with glow
    ctx.shadowColor = '#00aaff';
    ctx.shadowBlur = 15;

    const paddleGradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + PADDLE_HEIGHT);
    paddleGradient.addColorStop(0, '#00ddff');
    paddleGradient.addColorStop(1, '#0088cc');
    ctx.fillStyle = paddleGradient;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, PADDLE_HEIGHT);

    ctx.strokeStyle = '#00aaff';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, PADDLE_HEIGHT);

    ctx.shadowBlur = 0;

    // Draw ball with glow
    ctx.shadowColor = '#ffdd44';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Ball outer glow
    ctx.fillStyle = 'rgba(255, 221, 68, 0.3)';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS + 5, 0, Math.PI * 2);
    ctx.fill();

    // Ball gradient
    const ballGradient = ctx.createRadialGradient(ball.x - 2, ball.y - 2, 0, ball.x, ball.y, BALL_RADIUS);
    ballGradient.addColorStop(0, '#ffff99');
    ballGradient.addColorStop(1, '#ffdd44');
    ctx.fillStyle = ballGradient;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    // Ball shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(ball.x - 2, ball.y - 2, BALL_RADIUS * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
}

function endGame() {
    clearInterval(gameLoop);
    gameRunning = false;
    gamePaused = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    if (score > bestScore) {
        bestScore = score;
    }
    saveProgress();
    updateHud();
    alert(`Game Over! 🎮\nDein Final Score: ${score}\nLevel erreicht: ${level}`);
    resetGame();
}

upgradeButtons.forEach((button) => {
    button.addEventListener('click', () => buyUpgrade(button.dataset.upgrade));
});

bestScoreDisplay.textContent = bestScore;
coinsDisplay.textContent = coins;
updateHud();
initBricks();
draw();

function saveProgress() {
    localStorage.setItem('breakout_paddleLevel', String(paddleUpgradeLevel));
    localStorage.setItem('breakout_ballLevel', String(ballUpgradeLevel));
    localStorage.setItem('breakout_lifeLevel', String(lifeUpgradeLevel));
    localStorage.setItem('breakout_coins', String(coins));
    localStorage.setItem('breakout_bestScore', String(bestScore));
}

function updateUpgradeButtons() {
    upgradeButtons.forEach((button) => {
        const type = button.dataset.upgrade;
        const cost = upgradeCosts[type];
        const level = type === 'paddle' ? paddleUpgradeLevel : type === 'ball' ? ballUpgradeLevel : lifeUpgradeLevel;
        button.textContent = `${type === 'paddle' ? '🛠️ Paddle' : type === 'ball' ? '🎯 Ball' : '💚 Life'} + ${cost}`;
        button.disabled = coins < cost;
        button.title = `Level ${level}`;
    });
}

function updateHud() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('breakout_bestScore', String(bestScore));
    }

    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    livesDisplay.textContent = lives;
    coinsDisplay.textContent = coins;
    bestScoreDisplay.textContent = bestScore;
    updateUpgradeButtons();
}

function buyUpgrade(type) {
    const cost = upgradeCosts[type];
    if (coins < cost) return;

    coins -= cost;

    if (type === 'paddle') {
        paddle.width += 12;
        paddle.x = Math.min(paddle.x, canvas.width - paddle.width);
    }
    if (type === 'ball') {
        ballSpeed += 1;
    }
    if (type === 'life') {
        lives += 1;
    }

    saveProgress();
    updateHud();
}
