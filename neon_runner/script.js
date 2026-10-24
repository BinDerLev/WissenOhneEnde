const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('bestScore');
const livesEl = document.getElementById('lives');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const groundY = canvas.height - 60;
const gravity = 1750;
const spawnRange = { min: 0.9, max: 1.7 };

const state = {
    running: false,
    paused: false,
    over: false,
    score: 0,
    best: Number(localStorage.getItem('neon-runner-best') || 0),
    lives: 3,
    speed: 340,
    spawnTimer: 1.1,
    pickupTimer: 1.8,
    time: 0,
    animationFrame: null,
    obstacles: [],
    pickups: [],
    flashTimer: 0,
    lastTimestamp: 0,
};

const player = {
    x: 120,
    y: groundY - 52,
    width: 36,
    height: 52,
    vy: 0,
    onGround: true,
    invulnerable: 0,
};

const keys = {
    jump: false,
};

function updateHud() {
    scoreEl.textContent = Math.floor(state.score);
    bestScoreEl.textContent = state.best;
    livesEl.textContent = state.lives;
}

function resetPlayer() {
    player.x = 120;
    player.y = groundY - player.height;
    player.vy = 0;
    player.onGround = true;
    player.invulnerable = 0;
}

function resetState() {
    state.running = false;
    state.paused = false;
    state.over = false;
    state.score = 0;
    state.lives = 3;
    state.speed = 340;
    state.spawnTimer = 1.1;
    state.pickupTimer = 1.8;
    state.time = 0;
    state.flashTimer = 0;
    state.obstacles = [];
    state.pickups = [];
    state.lastTimestamp = 0;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    startBtn.textContent = 'Start';
    resetPlayer();
    updateHud();
    draw();
}

function saveBest() {
    if (state.score > state.best) {
        state.best = Math.floor(state.score);
        localStorage.setItem('neon-runner-best', String(state.best));
        bestScoreEl.textContent = state.best;
    }
}

function spawnObstacle() {
    const baseHeight = 28 + Math.random() * 60;
    const width = 28 + Math.random() * 38;
    state.obstacles.push({
        x: canvas.width + 24,
        y: groundY - baseHeight,
        width,
        height: baseHeight,
        color: Math.random() > 0.5 ? '#ff5d7a' : '#ff8c42',
    });
}

function spawnPickup() {
    const size = 16 + Math.random() * 10;
    state.pickups.push({
        x: canvas.width + 24,
        y: groundY - (60 + Math.random() * 150),
        size,
        pulse: Math.random() * Math.PI * 2,
    });
}

function jump() {
    if (!player.onGround || !state.running) return;
    player.vy = -720;
    player.onGround = false;
}

function startGame() {
    state.running = true;
    state.paused = false;
    state.over = false;
    pauseBtn.disabled = false;
    pauseBtn.textContent = 'Pause';
    startBtn.textContent = 'Neustart';
    if (!state.animationFrame) {
        state.animationFrame = requestAnimationFrame(gameLoop);
    }
}

function togglePause() {
    if (!state.running) return;
    state.paused = !state.paused;
    pauseBtn.textContent = state.paused ? 'Weiter' : 'Pause';
}

function endGame() {
    state.running = false;
    state.over = true;
    state.flashTimer = 1;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    saveBest();
    startBtn.textContent = 'Play Again';
    draw();
}

function gameLoop(timestamp) {
    if (!state.running) {
        state.animationFrame = null;
        return;
    }

    if (!state.lastTimestamp) {
        state.lastTimestamp = timestamp;
    }

    const delta = Math.min((timestamp - state.lastTimestamp) / 1000, 0.033);
    state.lastTimestamp = timestamp;

    if (!state.paused) {
        update(delta);
    }

    draw();
    state.animationFrame = requestAnimationFrame(gameLoop);
}

function update(delta) {
    state.time += delta;
    state.score += delta * 16 + state.speed * delta * 0.012;
    state.speed += delta * 7;

    state.spawnTimer -= delta;
    if (state.spawnTimer <= 0) {
        spawnObstacle();
        state.spawnTimer = Math.random() * (spawnRange.max - spawnRange.min) + spawnRange.min;
    }

    state.pickupTimer -= delta;
    if (state.pickupTimer <= 0) {
        spawnPickup();
        state.pickupTimer = 2.8 + Math.random() * 2.5;
    }

    player.vy += gravity * delta;
    player.y += player.vy * delta;

    if (player.y + player.height >= groundY) {
        player.y = groundY - player.height;
        player.vy = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }

    if (player.invulnerable > 0) {
        player.invulnerable = Math.max(0, player.invulnerable - delta);
    }

    const obstacleSpeed = state.speed * delta;
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obstacle = state.obstacles[i];
        obstacle.x -= obstacleSpeed;

        if (rectsIntersect(player, obstacle)) {
            if (player.invulnerable <= 0) {
                state.lives -= 1;
                updateHud();
                player.invulnerable = 1.2;
                state.obstacles.splice(i, 1);

                if (state.lives <= 0) {
                    saveBest();
                    endGame();
                    return;
                }
            }
        }

        if (obstacle.x + obstacle.width < -20) {
            state.obstacles.splice(i, 1);
        }
    }

    for (let i = state.pickups.length - 1; i >= 0; i--) {
        const pickup = state.pickups[i];
        pickup.x -= obstacleSpeed * 0.95;
        pickup.pulse += delta * 8;

        const pickupRect = {
            x: pickup.x - pickup.size / 2,
            y: pickup.y - pickup.size / 2,
            width: pickup.size,
            height: pickup.size,
        };

        if (rectsIntersect(player, pickupRect)) {
            state.score += 30;
            state.pickups.splice(i, 1);
            updateHud();
            continue;
        }

        if (pickup.x + pickup.size < -10) {
            state.pickups.splice(i, 1);
        }
    }

    if (state.score > state.best) {
        state.best = Math.floor(state.score);
        bestScoreEl.textContent = state.best;
    }

    updateHud();
}

function rectsIntersect(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#050b1b');
    gradient.addColorStop(0.55, '#101d3c');
    gradient.addColorStop(1, '#1c2d4d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 80; i++) {
        const x = (i * 137.5 + (state.time * 18) % 200) % (canvas.width + 80);
        const y = (i * 73) % (canvas.height - 90);
        ctx.fillStyle = i % 3 === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(99,230,255,0.8)';
        ctx.fillRect(x, y, 2, 2);
    }

    ctx.fillStyle = '#12233f';
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    for (let i = 0; i < canvas.width; i += 26) {
        ctx.strokeStyle = 'rgba(99,230,255,0.13)';
        ctx.beginPath();
        ctx.moveTo(i, groundY);
        ctx.lineTo(i + 20, groundY + 15);
        ctx.stroke();
    }
}

function drawPlayer() {
    const x = player.x;
    const y = player.y;

    if (player.invulnerable > 0 && Math.floor(player.invulnerable * 12) % 2 === 0) {
        ctx.globalAlpha = 0.45;
    }

    ctx.fillStyle = '#63e6ff';
    ctx.fillRect(x + 8, y + 4, player.width - 16, player.height - 8);

    ctx.fillStyle = '#b77bff';
    ctx.fillRect(x + 6, y + 10, player.width - 12, player.height - 20);

    ctx.fillStyle = '#0b1220';
    ctx.fillRect(x + 10, y + 14, 6, 6);
    ctx.fillRect(x + player.width - 16, y + 14, 6, 6);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(x + 12, y + 28, player.width - 24, 6);

    ctx.fillStyle = '#63ffb0';
    ctx.fillRect(x + 2, y + player.height - 8, player.width - 4, 6);
}

function drawObstacle(obstacle) {
    const glow = ctx.createRadialGradient(
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        2,
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        obstacle.width * 1.3
    );
    glow.addColorStop(0, obstacle.color);
    glow.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = glow;
    ctx.fillRect(obstacle.x - 5, obstacle.y - 5, obstacle.width + 10, obstacle.height + 10);

    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(obstacle.x + 6, obstacle.y + 6, obstacle.width - 12, 5);
}

function drawPickup(pickup) {
    const cx = pickup.x;
    const cy = pickup.y;
    const pulse = 1 + Math.sin(pickup.pulse) * 0.18;
    const size = pickup.size * pulse;

    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size, cy);
    ctx.closePath();

    ctx.fillStyle = '#63e6ff';
    ctx.shadowColor = '#63e6ff';
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.45);
    ctx.lineTo(cx + size * 0.45, cy);
    ctx.lineTo(cx, cy + size * 0.45);
    ctx.lineTo(cx - size * 0.45, cy);
    ctx.closePath();
    ctx.fillStyle = '#ffd166';
    ctx.fill();
}

function drawGameOverOverlay() {
    const alpha = state.over ? 0.25 : 0;
    ctx.fillStyle = `rgba(5, 11, 27, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (state.over) {
        ctx.fillStyle = '#edf7ff';
        ctx.textAlign = 'center';
        ctx.font = '700 52px Arial';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 12);

        ctx.font = '600 24px Arial';
        ctx.fillStyle = '#63e6ff';
        ctx.fillText(`Punkte: ${Math.floor(state.score)}`, canvas.width / 2, canvas.height / 2 + 32);

        ctx.fillStyle = '#ffd166';
        ctx.fillText('Drücke Start für einen neuen Lauf', canvas.width / 2, canvas.height / 2 + 72);
    }
}

function drawPauseOverlay() {
    if (state.paused && !state.over) {
        ctx.fillStyle = 'rgba(4,10,20,0.35)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#edf7ff';
        ctx.textAlign = 'center';
        ctx.font = '700 50px Arial';
        ctx.fillText('Pause', canvas.width / 2, canvas.height / 2);
    }
}

function draw() {
    drawBackground();

    state.obstacles.forEach(drawObstacle);
    state.pickups.forEach(drawPickup);
    drawPlayer();
    drawPauseOverlay();
    drawGameOverOverlay();
}

document.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'KeyW', 'Space'].includes(event.code)) {
        event.preventDefault();
        keys.jump = true;
        if (!state.running) {
            startGame();
        }
        jump();
    }
});

document.addEventListener('keyup', (event) => {
    if (['ArrowUp', 'KeyW', 'Space'].includes(event.code)) {
        keys.jump = false;
    }
});

startBtn.addEventListener('click', () => {
    resetState();
    startGame();
});

pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', () => {
    resetState();
    startBtn.textContent = 'Start';
});

resetState();
draw();

