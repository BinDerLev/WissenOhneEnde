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
const touchDuckBtn = document.getElementById('touchDuckBtn');

const groundY = canvas.height - 60;
const gravity = 1750;
const spawnDistance = { min: 390, max: 610 };
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
    particles: [],
    shake: 0,
    ducking: false,
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
    duck: false,
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
    state.ducking = false;
    keys.duck = false;
}

function resetState() {
    state.running = false;
    state.paused = false;
    state.over = false;
    state.score = 0;
    state.lives = 3;
    state.shielded = false;
    state.speed = 340;
    state.spawnTimer = 1.9;
    state.pickupTimer = 1.8;
    state.time = 0;
    state.flashTimer = 0;
    state.obstacles = [];
    state.pickups = [];
    state.particles = [];
    state.shake = 0;
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
        try {
            localStorage.setItem('neon-runner-best', String(state.best));
        } catch (error) {
            // The current run remains playable if browser storage is unavailable.
        }
        bestScoreEl.textContent = state.best;
    }
}

function spawnObstacle() {
    const type = Math.random();
    let obstacle;
    if (type < 0.18) {
        obstacle = { kind: 'pit', width: 148 + Math.random() * 54, height: canvas.height - groundY, color: '#090b1c' };
    } else if (type < 0.34) {
        const height = 38 + Math.random() * 20;
        obstacle = {
            kind: 'falling', width: 42 + Math.random() * 20, height,
            y: groundY - height - 145, fallSpeed: 0, warning: 0.48, triggered: false,
            color: '#ff8c42', variant: ['crate', 'drone', 'crystal'][Math.floor(Math.random() * 3)],
        };
    } else if (type < 0.50) {
        obstacle = { kind: 'tunnel', width: 104 + Math.random() * 30, height: 36, y: groundY - 70, color: Math.random() < 0.5 ? '#a783ff' : '#62dff5' };
    } else if (type < 0.67) {
        obstacle = { kind: 'spikes', width: 42 + Math.random() * 18, height: 30 + Math.random() * 14, spikeCount: 2 + Math.floor(Math.random() * 3), color: '#ff59c7' };
    } else if (type < 0.84) {
        obstacle = { kind: 'barrier', width: 28 + Math.random() * 22, height: 28 + Math.random() * 24, color: Math.random() < 0.5 ? '#ff8c42' : '#f34f9c' };
    } else {
        obstacle = { kind: 'pillar', width: 28 + Math.random() * 14, height: 58 + Math.random() * 24, color: Math.random() < 0.5 ? '#ff5d83' : '#b76cff' };
    }
    state.obstacles.push({
        x: canvas.width + 24,
        y: obstacle.y ?? groundY - obstacle.height,
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
    state.ducking = false;
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
    startBtn.textContent = 'Nochmal spielen';
    draw();
    window.GameRoundSession.finish();
}

function burst(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 70 + Math.random() * 210;
        state.particles.push({
            x, y, color,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0.35 + Math.random() * 0.45,
            maxLife: 0.8,
            size: 2 + Math.random() * 4,
        });
    }
    if (state.particles.length > 100) state.particles.splice(0, state.particles.length - 100);
}

function takeHit() {
    if (player.invulnerable > 0) return false;
    if (state.shielded) {
        state.shielded = false;
        state.score += 50;
        burst(player.x + player.width / 2, player.y + player.height / 2, '#62f4ff', 20);
    } else {
        state.lives -= 1;
        burst(player.x + player.width / 2, player.y + player.height / 2, '#ff5d83', 16);
        state.shake = 8;
    }
    player.invulnerable = 1.2;
    updateHud();
    if (state.lives <= 0) {
        saveBest();
        endGame();
    }
    return true;
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
    state.shake = Math.max(0, state.shake - delta * 24);

    for (let i = state.particles.length - 1; i >= 0; i--) {
        const particle = state.particles[i];
        particle.life -= delta;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vy += 420 * delta;
        if (particle.life <= 0) state.particles.splice(i, 1);
    }

    state.spawnTimer -= delta;
    if (state.spawnTimer <= 0) {
        spawnObstacle();
        const minDelay = spawnDistance.min / state.speed;
        const maxDelay = spawnDistance.max / state.speed;
        state.spawnTimer = Math.random() * (maxDelay - minDelay) + minDelay;
    }

    state.pickupTimer -= delta;
    if (state.pickupTimer <= 0) {
        spawnPickup();
        state.pickupTimer = 2.8 + Math.random() * 2.5;
    }

    state.ducking = keys.duck && player.onGround;
    player.height = state.ducking ? 30 : 52;
    if (state.ducking) player.y = groundY - player.height;

    const obstacleSpeed = state.speed * delta;
    const pitUnderPlayer = state.obstacles.some((obstacle) => {
        if (obstacle.kind !== 'pit') return false;
        const nextX = obstacle.x - obstacleSpeed;
        return player.x + player.width / 2 > nextX && player.x + player.width / 2 < nextX + obstacle.width;
    });

    player.vy += gravity * delta;
    player.y += player.vy * delta;

    if (!pitUnderPlayer && player.y + player.height >= groundY) {
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

    for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obstacle = state.obstacles[i];
        obstacle.x -= obstacleSpeed;

        if (obstacle.kind === 'falling') {
            if (!obstacle.triggered && obstacle.x < player.x + 270) obstacle.triggered = true;
            if (obstacle.triggered && obstacle.warning > 0) obstacle.warning = Math.max(0, obstacle.warning - delta);
            else if (obstacle.triggered && obstacle.y + obstacle.height < groundY) {
                obstacle.fallSpeed += 1900 * delta;
                obstacle.y = Math.min(groundY - obstacle.height, obstacle.y + obstacle.fallSpeed * delta);
            }
        }

        if (obstacle.kind === 'pit') {
            if (player.y + player.height > canvas.height && player.invulnerable <= 0) {
                takeHit();
                state.obstacles.splice(i, 1);
                if (state.over) return;
                player.y = groundY - player.height;
                player.vy = 0;
            }
            if (obstacle.x + obstacle.width < -20) state.obstacles.splice(i, 1);
            continue;
        }

        const playerHitbox = {
            x: player.x + 6,
            y: player.y + (state.ducking ? 2 : 5),
            width: player.width - 12,
            height: player.height - (state.ducking ? 3 : 8),
        };
        const obstacleHitbox = obstacle.kind === 'tunnel'
            ? { x: obstacle.x, y: obstacle.y, width: obstacle.width, height: 24 }
            : obstacle.kind === 'spikes'
                ? {
                x: obstacle.x + obstacle.width * 0.18,
                y: obstacle.y + obstacle.height * 0.25,
                width: obstacle.width * 0.64,
                height: obstacle.height * 0.75,
            }
                : obstacle;
        if (rectsIntersect(playerHitbox, obstacleHitbox) && takeHit()) {
            state.obstacles.splice(i, 1);
            if (state.over) return;
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
            burst(pickup.x, pickup.y, pickup.type === 'shield' ? '#62f4ff' : '#ffe27a', 14);
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
        try {
            localStorage.setItem('neon-runner-best', String(state.best));
        } catch (error) {
            // Keep the in-memory record even when storage is blocked.
        }
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
    const blockWidth = 120;
    const offset = (state.time * parallax) % blockWidth;
    for (let i = -1; i < 10; i++) {
        const buildingIndex = i + seed;
        const x = i * blockWidth - offset;
        const width = 78 + ((buildingIndex * 37 % 31) + 31) % 31;
        const height = minHeight + (((buildingIndex * 53 % heightRange) + heightRange) % heightRange);
        const y = baseY - height;
        const depth = parallax < 15;

        // Offset rooftop steps and inset facade give each tower its own silhouette.
        ctx.fillStyle = depth ? 'rgba(18, 21, 55, 0.78)' : color;
        ctx.fillRect(x + 7, y + 7, width - 7, height - 7);
        ctx.fillStyle = color;
        ctx.fillRect(x, y + 15, width - 7, height - 15);
        ctx.fillStyle = depth ? 'rgba(98, 244, 255, 0.16)' : 'rgba(98, 244, 255, 0.24)';
        ctx.fillRect(x + 3, y + 15, 2, height - 15);
        ctx.fillStyle = accent;
        ctx.fillRect(x + 7, y + 12, width - 14, 2);

        // A few towers get a lit antenna or rooftop beacon.
        if ((buildingIndex + seed) % 3 === 0) {
            const antennaX = x + width * 0.68;
            ctx.strokeStyle = depth ? 'rgba(167, 131, 255, 0.34)' : 'rgba(98, 244, 255, 0.55)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(antennaX, y + 7);
            ctx.lineTo(antennaX, y - 8);
            ctx.stroke();
            ctx.fillStyle = '#ff75d2';
            ctx.shadowColor = '#ff59c7';
            ctx.shadowBlur = depth ? 4 : 8;
            ctx.beginPath();
            ctx.arc(antennaX, y - 9, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        const columns = Math.floor((width - 22) / 14);
        for (let row = 0; row < Math.floor((height - 26) / 16); row++) {
            for (let col = 0; col < columns; col++) {
                const pattern = Math.abs(buildingIndex * 7 + row * 3 + col * 5 + seed) % 11;
                const lit = pattern < 4;
                const warm = pattern === 1;
                ctx.fillStyle = lit
                    ? (warm ? 'rgba(255, 190, 112, 0.78)' : accent)
                    : (depth ? 'rgba(143, 165, 255, 0.08)' : 'rgba(147, 168, 255, 0.14)');
                const windowX = x + 13 + col * 14;
                const windowY = y + 22 + row * 16;
                ctx.fillRect(windowX, windowY, 6, 8);
                if (lit && !depth) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.fillRect(windowX + 1, windowY + 1, 1, 6);
                }
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

    drawPlanet(690, 158, 74);
    drawPlanet(414, 112, 37);
    drawMoon(238, 105, 21);

    for (let i = 0; i < 86; i++) {
        const x = (i * 193.37 + (i % 5) * 29) % canvas.width;
        const y = (i * 83.71 + (i % 7) * 13) % 230;
        const twinkle = 0.28 + (Math.sin(state.time * (1.2 + (i % 4) * 0.35) + i * 1.7) + 1) * 0.32;
        const size = i % 13 === 0 ? 3 : i % 4 === 0 ? 2 : 1.3;
        const starColor = i % 7 === 0 ? '#ffb9e8' : i % 5 === 0 ? '#a9b7ff' : '#c7f9ff';
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = starColor;
        ctx.shadowColor = starColor;
        ctx.shadowBlur = size > 2 ? 10 : 4;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        if (i % 13 === 0) {
            ctx.globalAlpha = twinkle * 0.55;
            ctx.fillRect(x - 5, y - 0.5, 10, 1);
            ctx.fillRect(x - 0.5, y - 5, 1, 10);
        }
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Soft atmospheric bands make the skyline feel deeper without obscuring play.
    const horizonGlow = ctx.createLinearGradient(0, groundY - 110, 0, groundY + 12);
    horizonGlow.addColorStop(0, 'rgba(255, 89, 199, 0)');
    horizonGlow.addColorStop(0.72, 'rgba(255, 89, 199, 0.10)');
    horizonGlow.addColorStop(1, 'rgba(98, 244, 255, 0.13)');
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, groundY - 110, canvas.width, 122);

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

    // Moving lane markers add speed and make the running surface easier to read.
    const markerOffset = (state.time * state.speed * 0.72) % 112;
    ctx.save();
    ctx.shadowColor = '#62f4ff';
    ctx.shadowBlur = 10;
    for (let i = -1; i < 10; i++) {
        const x = i * 112 - markerOffset;
        ctx.fillStyle = 'rgba(98, 244, 255, 0.56)';
        roundedRectPath(x, groundY + 14, 42, 3, 1.5);
        ctx.fill();
    }
    ctx.restore();

    // Subtle edge shading frames the action and keeps bright objects prominent.
    const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.18,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.72
    );
    vignette.addColorStop(0, 'rgba(2, 5, 18, 0)');
    vignette.addColorStop(1, 'rgba(2, 5, 18, 0.42)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlanet(x, y, radius) {
    const halo = ctx.createRadialGradient(x, y, radius * 0.55, x, y, radius * 1.8);
    halo.addColorStop(0, 'rgba(128, 116, 255, 0.22)');
    halo.addColorStop(1, 'rgba(128, 116, 255, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(x - radius * 2, y - radius * 2, radius * 4, radius * 4);

    // The back half of the ring sits behind the planet.
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.22);
    ctx.beginPath();
    ctx.ellipse(0, 4, radius * 1.55, radius * 0.36, 0, Math.PI, Math.PI * 2);
    ctx.strokeStyle = 'rgba(100, 244, 255, 0.38)';
    ctx.lineWidth = 10;
    ctx.shadowColor = '#62f4ff';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.restore();

    const surface = ctx.createRadialGradient(x - radius * 0.38, y - radius * 0.42, 3, x, y, radius * 1.1);
    surface.addColorStop(0, '#d0c7ff');
    surface.addColorStop(0.34, '#827be8');
    surface.addColorStop(0.75, '#3c478e');
    surface.addColorStop(1, '#17254c');
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = surface;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.globalAlpha = 0.33;
    for (let band = 0; band < 5; band++) {
        const bandY = y - radius * 0.55 + band * radius * 0.29 + Math.sin(state.time * 0.25 + band) * 2;
        ctx.fillStyle = band % 2 ? '#ff8edb' : '#62f4ff';
        ctx.beginPath();
        ctx.ellipse(x, bandY, radius * 0.95, radius * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Front ring arc and small orbital satellites sell the alien-world scale.
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.22);
    ctx.beginPath();
    ctx.ellipse(0, 4, radius * 1.55, radius * 0.36, 0, 0, Math.PI);
    ctx.strokeStyle = '#8cf8ff';
    ctx.lineWidth = 5;
    ctx.shadowColor = '#62f4ff';
    ctx.shadowBlur = 13;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 4, radius * 1.55, radius * 0.36, 0, 0, Math.PI);
    ctx.strokeStyle = 'rgba(255, 159, 230, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#e4e1ff';
    ctx.shadowColor = '#b6a7ff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(x - 94, y + 18 + Math.sin(state.time * 0.5) * 4, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawMoon(x, y, radius) {
    const glow = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2.2);
    glow.addColorStop(0, 'rgba(255, 226, 122, 0.18)');
    glow.addColorStop(1, 'rgba(255, 226, 122, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(x - radius * 2.2, y - radius * 2.2, radius * 4.4, radius * 4.4);
    const moon = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
    moon.addColorStop(0, '#fff1bc');
    moon.addColorStop(0.5, '#d9c2ff');
    moon.addColorStop(1, '#796cb5');
    ctx.fillStyle = moon;
    ctx.shadowColor = '#dfc7ff';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(68, 70, 130, 0.3)';
    ctx.beginPath();
    ctx.arc(x - 7, y - 4, 4, 0, Math.PI * 2);
    ctx.arc(x + 7, y + 6, 3, 0, Math.PI * 2);
    ctx.fill();
}

function drawPlayer() {
    const x = player.x;
    const y = state.ducking ? groundY - 52 : player.y;
    const running = player.onGround && state.running && !state.paused;
    const stride = running ? Math.sin(state.time * 18) * 4 : 0;

    ctx.save();
    if (state.ducking) {
        ctx.translate(0, groundY);
        ctx.scale(1, 30 / 52);
        ctx.translate(0, -groundY);
    }
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
    if (obstacle.kind === 'pit') {
        const x = obstacle.x;
        const width = obstacle.width;
        const bottomY = canvas.height - 3;
        const hole = ctx.createLinearGradient(0, groundY, 0, bottomY);
        hole.addColorStop(0, '#050713');
        hole.addColorStop(0.42, '#10122d');
        hole.addColorStop(0.78, '#1e1748');
        hole.addColorStop(1, '#54317b');
        ctx.fillStyle = hole;
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + width, groundY);
        ctx.lineTo(x + width * 0.84, bottomY);
        ctx.lineTo(x + width * 0.16, bottomY);
        ctx.closePath();
        ctx.fill();

        // Broken, luminous cliff edges make the gap read as a deep chasm.
        ctx.save();
        ctx.shadowColor = '#ff59c7';
        ctx.shadowBlur = 13;
        ctx.strokeStyle = '#ff76d2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + 8, groundY + 10);
        ctx.lineTo(x + 4, groundY + 23);
        ctx.lineTo(x + 15, groundY + 34);
        ctx.moveTo(x + width, groundY);
        ctx.lineTo(x + width - 8, groundY + 10);
        ctx.lineTo(x + width - 4, groundY + 23);
        ctx.lineTo(x + width - 15, groundY + 34);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = 'rgba(98, 244, 255, 0.28)';
        ctx.beginPath();
        ctx.moveTo(x + 5, groundY + 3);
        ctx.lineTo(x + width - 5, groundY + 3);
        ctx.lineTo(x + width - 18, groundY + 9);
        ctx.lineTo(x + 18, groundY + 9);
        ctx.closePath();
        ctx.fill();

        // Strange luminous liquid glows at the bottom of the pit.
        const poolX = x + width / 2;
        const poolY = canvas.height - 8;
        ctx.save();
        ctx.globalAlpha = 0.55 + Math.sin(state.time * 5 + x * 0.02) * 0.16;
        const poolGlow = ctx.createRadialGradient(poolX, poolY, 2, poolX, poolY, width * 0.42);
        poolGlow.addColorStop(0, '#b8ffff');
        poolGlow.addColorStop(0.22, '#62f4ff');
        poolGlow.addColorStop(0.58, 'rgba(126, 91, 255, 0.68)');
        poolGlow.addColorStop(1, 'rgba(126, 91, 255, 0)');
        ctx.fillStyle = poolGlow;
        ctx.fillRect(x + width * 0.12, groundY + 25, width * 0.76, canvas.height - groundY - 20);
        ctx.strokeStyle = 'rgba(162, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(poolX, poolY - 1, width * (0.18 + Math.sin(state.time * 3) * 0.015), 4, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.shadowColor = '#62f4ff';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(98, 244, 255, 0.95)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + width, groundY);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = '#fff2a6';
        for (let marker = 0; marker < 5; marker++) {
            const markerX = x + width * (0.12 + marker * 0.19);
            ctx.beginPath();
            ctx.moveTo(markerX, groundY - 1);
            ctx.lineTo(markerX + 5, groundY - 8);
            ctx.lineTo(markerX + 10, groundY - 1);
            ctx.closePath();
            ctx.fill();
        }
        return;
    }

    if (obstacle.kind === 'tunnel') {
        ctx.save();
        ctx.shadowColor = '#a783ff';
        ctx.shadowBlur = 14;
        const tunnelGradient = ctx.createLinearGradient(0, obstacle.y, 0, obstacle.y + obstacle.height);
        tunnelGradient.addColorStop(0, '#e2d4ff');
        tunnelGradient.addColorStop(0.18, obstacle.color);
        tunnelGradient.addColorStop(1, '#382c68');
        ctx.fillStyle = tunnelGradient;
        roundedRectPath(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(10, 9, 30, 0.9)';
        ctx.fillRect(obstacle.x + 10, obstacle.y + 10, obstacle.width - 20, obstacle.height - 10);
        ctx.fillStyle = '#62f4ff';
        for (let light = 0; light < 4; light++) {
            ctx.fillRect(obstacle.x + 13 + light * ((obstacle.width - 30) / 4), obstacle.y + 3, 8, 3);
        }
        ctx.restore();
        return;
    }

    if (obstacle.kind === 'falling') {
        if (obstacle.triggered && obstacle.warning > 0) {
            const blink = Math.sin(state.time * 26) > 0 ? 0.95 : 0.35;
            ctx.save();
            ctx.globalAlpha = blink;
            ctx.strokeStyle = '#ffe27a';
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 7]);
            ctx.beginPath();
            ctx.moveTo(obstacle.x + obstacle.width / 2, groundY - 4);
            ctx.lineTo(obstacle.x + obstacle.width / 2, groundY - 44);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }
        ctx.save();
        ctx.shadowColor = obstacle.color;
        ctx.shadowBlur = 18;
        const blockGradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        blockGradient.addColorStop(0, '#fff2cf');
        blockGradient.addColorStop(0.16, obstacle.color);
        blockGradient.addColorStop(1, '#9c4729');
        ctx.fillStyle = blockGradient;
        if (obstacle.variant === 'drone') {
            ctx.beginPath();
            ctx.moveTo(obstacle.x + obstacle.width * 0.18, obstacle.y + obstacle.height * 0.28);
            ctx.lineTo(obstacle.x + obstacle.width * 0.38, obstacle.y + obstacle.height * 0.08);
            ctx.lineTo(obstacle.x + obstacle.width * 0.78, obstacle.y + obstacle.height * 0.08);
            ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height * 0.48);
            ctx.lineTo(obstacle.x + obstacle.width * 0.76, obstacle.y + obstacle.height * 0.86);
            ctx.lineTo(obstacle.x + obstacle.width * 0.24, obstacle.y + obstacle.height * 0.86);
            ctx.lineTo(obstacle.x, obstacle.y + obstacle.height * 0.52);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#62f4ff';
            ctx.fillRect(obstacle.x + obstacle.width * 0.35, obstacle.y + obstacle.height * 0.4, obstacle.width * 0.42, 4);
            ctx.fillStyle = '#fff2a6';
            ctx.beginPath();
            ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height * 0.6, 3, 0, Math.PI * 2);
            ctx.fill();
        } else if (obstacle.variant === 'crystal') {
            ctx.beginPath();
            ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y);
            ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height * 0.3);
            ctx.lineTo(obstacle.x + obstacle.width * 0.78, obstacle.y + obstacle.height);
            ctx.lineTo(obstacle.x + obstacle.width * 0.18, obstacle.y + obstacle.height * 0.82);
            ctx.lineTo(obstacle.x, obstacle.y + obstacle.height * 0.28);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#fff0cb';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,0.65)';
            ctx.beginPath();
            ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y + 4);
            ctx.lineTo(obstacle.x + obstacle.width * 0.46, obstacle.y + obstacle.height - 5);
            ctx.moveTo(obstacle.x + obstacle.width * 0.14, obstacle.y + obstacle.height * 0.3);
            ctx.lineTo(obstacle.x + obstacle.width * 0.78, obstacle.y + obstacle.height * 0.65);
            ctx.stroke();
        } else {
            roundedRectPath(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 6);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillRect(obstacle.x + 7, obstacle.y + 7, obstacle.width - 14, 4);
            ctx.strokeStyle = 'rgba(54, 25, 31, 0.62)';
            ctx.lineWidth = 2;
            for (let stripe = -1; stripe < obstacle.width / 20; stripe++) {
                ctx.beginPath();
                ctx.moveTo(obstacle.x + stripe * 20, obstacle.y + obstacle.height - 10);
                ctx.lineTo(obstacle.x + stripe * 20 + 12, obstacle.y + obstacle.height - 22);
                ctx.stroke();
            }
        }
        ctx.restore();
        return;
    }

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
        const spikeCount = obstacle.spikeCount || 3;
        const spikeWidth = obstacle.width / spikeCount;
        ctx.beginPath();
        for (let i = 0; i < spikeCount; i++) {
            const left = obstacle.x + i * spikeWidth;
            ctx.moveTo(left, obstacle.y + obstacle.height);
            ctx.lineTo(left + spikeWidth / 2, obstacle.y);
            ctx.lineTo(left + spikeWidth, obstacle.y + obstacle.height);
        }
        ctx.closePath();
        const spikeGradient = ctx.createLinearGradient(0, obstacle.y, 0, groundY);
        spikeGradient.addColorStop(0, '#fff0fa');
        spikeGradient.addColorStop(0.18, obstacle.color);
        spikeGradient.addColorStop(1, '#8f286b');
        ctx.fillStyle = spikeGradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 230, 250, 0.72)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    } else if (obstacle.kind === 'barrier') {
        const blockGradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        blockGradient.addColorStop(0, '#fff0fa');
        blockGradient.addColorStop(0.12, obstacle.color);
        blockGradient.addColorStop(1, '#8f285b');
        ctx.fillStyle = blockGradient;
        roundedRectPath(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 5);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 223, 242, 0.72)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#fff0b0';
        for (let stripe = -1; stripe < obstacle.height / 16; stripe++) {
            ctx.save();
            ctx.translate(obstacle.x + obstacle.width / 2, obstacle.y + 8 + stripe * 16);
            ctx.rotate(-0.42);
            ctx.fillRect(-obstacle.width * 0.65, 0, obstacle.width * 1.3, 5);
            ctx.restore();
        }
        ctx.fillStyle = '#fff';
        ctx.fillRect(obstacle.x - 4, obstacle.y + obstacle.height / 2 - 2, 4, 4);
        ctx.fillRect(obstacle.x + obstacle.width, obstacle.y + obstacle.height / 2 - 2, 4, 4);
    } else {
        const pillarGradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y);
        pillarGradient.addColorStop(0, '#291b52');
        pillarGradient.addColorStop(0.3, obstacle.color);
        pillarGradient.addColorStop(0.52, '#fff0fa');
        pillarGradient.addColorStop(0.72, obstacle.color);
        pillarGradient.addColorStop(1, '#21183e');
        ctx.fillStyle = pillarGradient;
        roundedRectPath(obstacle.x + 4, obstacle.y, obstacle.width - 8, obstacle.height, 7);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 231, 255, 0.78)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = 'rgba(10, 12, 36, 0.8)';
        roundedRectPath(obstacle.x + 9, obstacle.y + 12, obstacle.width - 18, obstacle.height - 24, 5);
        ctx.fill();
        ctx.fillStyle = '#62f4ff';
        ctx.shadowColor = '#62f4ff';
        ctx.shadowBlur = 8;
        ctx.fillRect(obstacle.x + obstacle.width / 2 - 2, obstacle.y + 18, 4, obstacle.height - 36);
        ctx.shadowBlur = 0;
    }
}

function drawPickup(pickup) {
    const cx = pickup.x;
    const cy = pickup.y;
    const pulse = 1 + Math.sin(pickup.pulse) * 0.18;
    const size = pickup.size * pulse;

    ctx.beginPath();
    ctx.arc(cx, cy, size * 1.65, 0, Math.PI * 2);
    ctx.strokeStyle = pickup.type === 'shield' ? 'rgba(98, 244, 255, 0.38)' : 'rgba(255, 226, 122, 0.34)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 5]);
    ctx.lineDashOffset = -pickup.pulse * 2;
    ctx.stroke();
    ctx.setLineDash([]);

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
        ctx.fillText('Drücke Start oder R für einen neuen Lauf', canvas.width / 2, canvas.height / 2 + 72);
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
    ctx.save();
    if (state.shake > 0) {
        ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
    }
    drawBackground();

    state.obstacles.forEach(drawObstacle);
    state.pickups.forEach(drawPickup);
    state.particles.forEach((particle) => {
        ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 12;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    drawPlayer();
    drawPauseOverlay();
    drawGameOverOverlay();
    if (!state.running && !state.over) {
        ctx.fillStyle = 'rgba(5, 11, 27, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#edf7ff';
        ctx.font = '800 42px Arial';
        ctx.shadowColor = '#62f4ff';
        ctx.shadowBlur = 18;
        ctx.fillText('BEREIT?', canvas.width / 2, canvas.height / 2 - 8);
        ctx.shadowBlur = 0;
        ctx.font = '600 19px Arial';
        ctx.fillStyle = '#b8c8e8';
        ctx.fillText('Springen oder Start drücken', canvas.width / 2, canvas.height / 2 + 30);
    }
    ctx.restore();
}

document.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'KeyS'].includes(event.code)) {
        event.preventDefault();
        keys.duck = true;
        return;
    }
    if (event.code === 'KeyP' || event.code === 'Escape') {
        if (state.running) {
            event.preventDefault();
            togglePause();
        }
        return;
    }
    if (event.code === 'KeyR' && (state.over || !state.running)) {
        event.preventDefault();
        resetState();
        startGame();
        return;
    }
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
    if (['ArrowDown', 'KeyS'].includes(event.code)) keys.duck = false;
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

touchDuckBtn.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    keys.duck = true;
    touchDuckBtn.setPointerCapture(event.pointerId);
});
['pointerup', 'pointercancel', 'lostpointercapture'].forEach((eventName) => {
    touchDuckBtn.addEventListener(eventName, () => { keys.duck = false; });
});
touchDuckBtn.addEventListener('click', (event) => {
    if (event.detail === 0) keys.duck = !keys.duck;
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

document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.running && !state.paused) togglePause();
});

resetState();
draw();
