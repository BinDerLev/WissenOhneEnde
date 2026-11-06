const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('bestScore');
const livesEl = document.getElementById('lives');
const shieldEl = document.getElementById('shield');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const touchJumpBtn = document.getElementById('touchJumpBtn');

const groundY = canvas.height - 60;
const gravity = 1750;
const spawnRange = { min: 0.9, max: 1.7 };
const maxSpeed = 620;

const state = {
    running: false,
    paused: false,
    over: false,
    score: 0,
    best: Number(localStorage.getItem('neon-runner-best') || 0),
    lives: 3,
    shielded: false,
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
    jumpsRemaining: 2,
    invulnerable: 0,
};

const keys = {
    jump: false,
};

function updateHud() {
    scoreEl.textContent = Math.floor(state.score);
    bestScoreEl.textContent = state.best;
    livesEl.textContent = state.lives;
    shieldEl.textContent = state.shielded ? 'An' : 'Aus';
    shieldEl.setAttribute('aria-label', state.shielded ? 'Schild aktiv' : 'Kein Schild');
    shieldEl.parentElement.classList.toggle('is-active', state.shielded);
}

function resetPlayer() {
    player.x = 120;
    player.y = groundY - player.height;
    player.vy = 0;
    player.onGround = true;
    player.invulnerable = 0;
    player.jumpsRemaining = 2;
}

function resetState() {
    state.running = false;
    state.paused = false;
    state.over = false;
    state.score = 0;
    state.lives = 3;
    state.shielded = false;
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
    const type = Math.random();
    const obstacle = type < 0.34
        ? { kind: 'spikes', width: 42 + Math.random() * 18, height: 30 + Math.random() * 14, color: '#ff59c7' }
        : type < 0.72
            ? { kind: 'barrier', width: 28 + Math.random() * 22, height: 28 + Math.random() * 24, color: '#ff8c42' }
            : { kind: 'pillar', width: 28 + Math.random() * 14, height: 58 + Math.random() * 24, color: '#ff5d83' };
    state.obstacles.push({
        x: canvas.width + 24,
        y: groundY - obstacle.height,
        ...obstacle,
    });
}

function spawnPickup() {
    const isShield = Math.random() < 0.18;
    const size = 16 + Math.random() * 10;
    state.pickups.push({
        x: canvas.width + 24,
        y: groundY - (60 + Math.random() * 150),
        size,
        type: isShield ? 'shield' : 'energy',
        pulse: Math.random() * Math.PI * 2,
    });
}

function jump() {
    if (player.jumpsRemaining <= 0 || !state.running) return;
    player.vy = player.jumpsRemaining === 2 ? -720 : -660;
    player.onGround = false;
    player.jumpsRemaining -= 1;
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
    window.GameRoundSession.finish();
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
    state.speed = Math.min(maxSpeed, state.speed + delta * 7);

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
        player.jumpsRemaining = 2;
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

        const playerHitbox = {
            x: player.x + 6,
            y: player.y + 5,
            width: player.width - 12,
            height: player.height - 8,
        };
        const obstacleHitbox = obstacle.kind === 'spikes'
            ? {
                x: obstacle.x + obstacle.width * 0.18,
                y: obstacle.y + obstacle.height * 0.25,
                width: obstacle.width * 0.64,
                height: obstacle.height * 0.75,
            }
            : obstacle;
        if (rectsIntersect(playerHitbox, obstacleHitbox)) {
            if (player.invulnerable <= 0) {
                if (state.shielded) {
                    state.shielded = false;
                    state.score += 50;
                } else {
                    state.lives -= 1;
                }
                player.invulnerable = 1.2;
                state.obstacles.splice(i, 1);
                updateHud();

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
            if (pickup.type === 'shield') {
                state.shielded = true;
                state.score += 15;
            } else {
                state.score += 30;
            }
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

function roundedRectPath(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function drawCityLayer(parallax, color, accent, baseY, seed, minHeight, heightRange) {
    const offset = (state.time * parallax) % 120;
    for (let i = -1; i < 10; i++) {
        const buildingIndex = i + seed;
        const x = i * 120 - offset;
        const width = 72 + (buildingIndex * 37 % 35);
        const height = minHeight + (buildingIndex * 53 % heightRange);
        const y = baseY - height;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = accent;
        ctx.fillRect(x + 8, y + 9, 2, height - 14);

        for (let row = 0; row < Math.floor((height - 16) / 18); row++) {
            for (let col = 0; col < 3; col++) {
                const lit = (buildingIndex * 7 + row * 3 + col * 5) % 6 === 0;
                ctx.fillStyle = lit ? accent : 'rgba(147, 168, 255, 0.11)';
                ctx.fillRect(x + 18 + col * 16, y + 12 + row * 18, 5, 7);
            }
        }
    }
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#08091f');
    gradient.addColorStop(0.48, '#17143b');
    gradient.addColorStop(1, '#32204b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const sunGlow = ctx.createRadialGradient(690, 188, 8, 690, 188, 120);
    sunGlow.addColorStop(0, 'rgba(255, 82, 196, 0.28)');
    sunGlow.addColorStop(1, 'rgba(255, 82, 196, 0)');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(560, 58, 260, 260);

    ctx.save();
    ctx.shadowColor = '#ff59c7';
    ctx.shadowBlur = 28;
    const sun = ctx.createLinearGradient(0, 124, 0, 252);
    sun.addColorStop(0, '#ff9bdc');
    sun.addColorStop(1, '#ff5cae');
    ctx.fillStyle = sun;
    ctx.beginPath();
    ctx.arc(690, 188, 58, Math.PI, 0);
    ctx.lineTo(748, 188);
    ctx.lineTo(632, 188);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(690, 188, 58, Math.PI, 0);
    ctx.rect(632, 188, 116, 64);
    ctx.clip();
    for (let stripe = 0; stripe < 5; stripe++) {
        const y = 198 + stripe * 12;
        ctx.fillStyle = 'rgba(27, 16, 51, 0.72)';
        ctx.fillRect(628, y, 124, 4 + stripe * 0.7);
    }
    ctx.restore();

    for (let i = 0; i < 56; i++) {
        const x = (i * 137.5 + (state.time * (5 + i % 4)) % canvas.width) % canvas.width;
        const y = (i * 73) % 240;
        const twinkle = 0.45 + (Math.sin(state.time * 2 + i) + 1) * 0.22;
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = i % 4 === 0 ? '#ffb9e8' : '#c7f9ff';
        ctx.fillRect(x, y, i % 7 === 0 ? 3 : 2, i % 7 === 0 ? 3 : 2);
    }
    ctx.globalAlpha = 1;

    drawCityLayer(9, '#191735', 'rgba(105, 83, 190, 0.5)', groundY, 2, 74, 74);
    drawCityLayer(22, '#11152e', 'rgba(73, 226, 255, 0.4)', groundY, 11, 42, 55);

    const groundGradient = ctx.createLinearGradient(0, groundY, 0, canvas.height);
    groundGradient.addColorStop(0, '#151632');
    groundGradient.addColorStop(1, '#080d20');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    ctx.save();
    ctx.shadowColor = '#62f4ff';
    ctx.shadowBlur = 14;
    ctx.strokeStyle = 'rgba(98, 244, 255, 0.82)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvas.width, groundY);
    ctx.stroke();
    ctx.restore();

    const groundOffset = (state.time * state.speed) % 54;
    ctx.strokeStyle = 'rgba(101, 206, 255, 0.16)';
    ctx.lineWidth = 1;
    for (let i = -1; i < 20; i++) {
        const x = i * 54 - groundOffset;
        ctx.beginPath();
        ctx.moveTo(x, groundY + 1);
        ctx.lineTo(x + 32, canvas.height);
        ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 89, 199, 0.11)';
    for (let y = groundY + 16; y < canvas.height; y += 14) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawPlayer() {
    const x = player.x;
    const y = player.y;
    const running = player.onGround && state.running && !state.paused;
    const stride = running ? Math.sin(state.time * 18) * 4 : 0;

    ctx.save();
    if (player.invulnerable > 0 && Math.floor(player.invulnerable * 12) % 2 === 0) {
        ctx.globalAlpha = 0.45;
    }

    ctx.fillStyle = 'rgba(4, 7, 22, 0.5)';
    ctx.beginPath();
    ctx.ellipse(x + player.width / 2, groundY + 1, 23, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    if (state.shielded) {
        ctx.beginPath();
        ctx.ellipse(x + player.width / 2, y + player.height / 2, player.width * 0.83, player.height * 0.72, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(98, 244, 255, 0.11)';
        ctx.fill();
        ctx.strokeStyle = '#62f4ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#62f4ff';
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    ctx.strokeStyle = '#d7baff';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + 13, y + 39);
    ctx.lineTo(x + 11 - stride, y + 48);
    ctx.lineTo(x + 9 - stride, y + 50);
    ctx.moveTo(x + 24, y + 39);
    ctx.lineTo(x + 25 + stride, y + 47);
    ctx.lineTo(x + 28 + stride, y + 49);
    ctx.stroke();

    ctx.fillStyle = '#ff59c7';
    ctx.beginPath();
    ctx.moveTo(x + 9, y + 15);
    ctx.lineTo(x - 4 - stride, y + 23);
    ctx.lineTo(x + 9, y + 25);
    ctx.closePath();
    ctx.shadowColor = '#ff59c7';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    roundedRectPath(x + 7, y + 12, 25, 30, 8);
    ctx.fillStyle = '#59dff4';
    ctx.shadowColor = '#62f4ff';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
    roundedRectPath(x + 9, y + 14, 21, 26, 7);
    ctx.fillStyle = '#6f4fbc';
    ctx.fill();

    roundedRectPath(x + 10, y + 17, 19, 12, 5);
    ctx.fillStyle = '#10142e';
    ctx.fill();
    ctx.fillStyle = '#8ffaff';
    ctx.shadowColor = '#62f4ff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(x + 16, y + 23, 2, 0, Math.PI * 2);
    ctx.arc(x + 24, y + 23, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    roundedRectPath(x + 13, y + 32, 13, 3, 1.5);
    ctx.fillStyle = '#ffe27a';
    ctx.fill();

    ctx.fillStyle = '#62f4ff';
    ctx.fillRect(x + 15, y + 6, 9, 5);
    ctx.fillStyle = '#b8fbff';
    ctx.fillRect(x + 18, y + 3, 3, 3);

    ctx.fillStyle = '#ff59c7';
    ctx.fillRect(x + 8, y + 39, 8, 3);
    ctx.fillRect(x + 23, y + 39, 8, 3);
    ctx.restore();
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
    if (obstacle.kind === 'spikes') {
        const spikeCount = 3;
        const spikeWidth = obstacle.width / spikeCount;
        ctx.beginPath();
        for (let i = 0; i < spikeCount; i++) {
            const left = obstacle.x + i * spikeWidth;
            ctx.moveTo(left, obstacle.y + obstacle.height);
            ctx.lineTo(left + spikeWidth / 2, obstacle.y);
            ctx.lineTo(left + spikeWidth, obstacle.y + obstacle.height);
        }
        ctx.closePath();
        ctx.fill();
    } else {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(obstacle.x + 6, obstacle.y + 6, obstacle.width - 12, 5);
    }
}

function drawPickup(pickup) {
    const cx = pickup.x;
    const cy = pickup.y;
    const pulse = 1 + Math.sin(pickup.pulse) * 0.18;
    const size = pickup.size * pulse;

    ctx.beginPath();
    if (pickup.type === 'shield') {
        for (let point = 0; point < 6; point++) {
            const angle = -Math.PI / 2 + point * Math.PI / 3;
            const px = cx + Math.cos(angle) * size;
            const py = cy + Math.sin(angle) * size;
            if (point === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
    } else {
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size, cy);
        ctx.lineTo(cx, cy + size);
        ctx.lineTo(cx - size, cy);
    }
    ctx.closePath();
    ctx.fillStyle = pickup.type === 'shield' ? '#62f4ff' : '#63e6ff';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = pickup.type === 'shield' ? '#f4f3ff' : '#ffd166';
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
        if (event.repeat) return;
        keys.jump = true;
        if (!state.running) {
            if (state.over) resetState();
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

function handleTouchJump(event) {
    if (event.type === 'pointerdown' && event.pointerType !== 'touch') return;
    if (event.pointerType === 'touch') event.preventDefault();
    if (state.paused) return;
    if (!state.running) {
        if (state.over) resetState();
        startGame();
    }
    jump();
}

canvas.addEventListener('pointerdown', handleTouchJump);
touchJumpBtn.addEventListener('pointerdown', handleTouchJump);
touchJumpBtn.addEventListener('click', (event) => {
    if (event.detail === 0) handleTouchJump(event);
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
