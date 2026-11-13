const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const waveDisplay = document.getElementById('wave');
const livesDisplay = document.getElementById('lives');
const bestScoreDisplay = document.getElementById('bestScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const gameShell = document.getElementById('gameShell');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fullscreenLabel = document.getElementById('fullscreenLabel');
const overlay = document.getElementById('gameOverlay');
const notice = document.getElementById('gameNotice');
const ammoBars = document.querySelectorAll('#ammo i');
const touchButtons = document.querySelectorAll('.touch-controls button');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const STEP_MS = 1000 / 60;
const MAX_SHIP_SPEED = 7;
const SHIP_SIZE = 13;
const TURN_SPEED = 0.075;
const ACCELERATION = 0.18;
const FRICTION = 0.992;
const BULLET_SPEED = 9;
const BULLET_LIFETIME = 65;
const SHOT_INTERVAL_MS = 200;
const MAX_PLAYER_BULLETS = 4;
const INVULNERABLE_TIME = 180;
const UFO_TYPES = {
    large: { radius: 26, speed: 2, points: 200, fireInterval: 90, color: '#f5c96a' },
    small: { radius: 13, speed: 3, points: 1000, fireInterval: 65, color: '#ff9187' }
};

let bestScore = 0;
try { bestScore = Number(localStorage.getItem('asteroid_bestScore')) || 0; } catch { /* Spielen bleibt ohne Speicher möglich. */ }
let ship = createShip();
let asteroids = [];
let bullets = [];
let ufos = [];
let enemyBullets = [];
let particles = [];
let keys = new Set();
const touchPointers = new Map();
let score = 0;
let lives = 3;
let wave = 1;
let state = 'ready';
let frameId = null;
let previousFrame = 0;
let accumulator = 0;
let tick = 0;
let lastShotAt = -Infinity;
let invulnerableTimer = 0;
let ufoTimer = 480;
let ufoVisits = 0;
let noticeTimer = null;
let fullscreenPending = false;

function createShip() {
    return { x: canvas.width / 2, y: canvas.height / 2, angle: -Math.PI / 2, vx: 0, vy: 0 };
}

function saveProgress() {
    try { localStorage.setItem('asteroid_bestScore', String(bestScore)); } catch { /* Kein blockierender Dialog bei gesperrtem Speicher. */ }
}

function updateHud() {
    if (score > bestScore) {
        bestScore = score;
        saveProgress();
    }
    scoreDisplay.textContent = score.toLocaleString('de-DE');
    bestScoreDisplay.textContent = bestScore.toLocaleString('de-DE');
    waveDisplay.textContent = String(wave).padStart(2, '0');
    livesDisplay.textContent = lives;
    ammoBars.forEach((bar, index) => bar.classList.toggle('used', index < bullets.length));
}

function showOverlay(kicker, title, text) {
    document.getElementById('overlayKicker').textContent = kicker;
    document.getElementById('overlayTitle').textContent = title;
    document.getElementById('overlayText').textContent = text;
    overlay.hidden = false;
}

function showNotice(message) {
    clearTimeout(noticeTimer);
    notice.textContent = message;
    notice.hidden = false;
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 2600);
}

function clearInput() {
    keys.clear();
    touchPointers.clear();
    touchButtons.forEach(button => button.classList.remove('is-pressed'));
}

function isPressed(key) {
    return keys.has(key) || [...touchPointers.values()].some(button => button.dataset.key === key);
}

function fireHeld() {
    return keys.has(' ') || [...touchPointers.values()].some(button => button.dataset.action === 'shoot');
}

function focusCanvas() { canvas.focus({ preventScroll: true }); }

document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if (key === 'escape' && gameShell.classList.contains('is-expanded')) {
        leaveFullscreen();
        return;
    }
    if (event.target.matches('input, textarea, select, button, a, [contenteditable="true"]')) return;
    if (key === 'p' && !event.repeat) {
        togglePause();
        return;
    }
    if (!['arrowleft', 'arrowright', 'arrowup', 'a', 'd', 'w', ' '].includes(key)) return;
    event.preventDefault();
    if (state !== 'running') return;
    keys.add(key);
    if (key === ' ' && !event.repeat) shoot();
});
document.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));

touchButtons.forEach(button => {
    button.addEventListener('pointerdown', event => {
        event.preventDefault();
        if (state !== 'running') return;
        button.setPointerCapture(event.pointerId);
        touchPointers.set(event.pointerId, button);
        button.classList.add('is-pressed');
        if (button.dataset.action === 'shoot') shoot();
    });
    const release = event => {
        touchPointers.delete(event.pointerId);
        if (![...touchPointers.values()].includes(button)) button.classList.remove('is-pressed');
    };
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
    button.addEventListener('contextmenu', event => event.preventDefault());
    button.addEventListener('click', event => {
        // Tastatur und assistive Technik lösen Klicks ohne Pointer aus.
        if (event.detail !== 0 || state !== 'running') return;
        if (button.dataset.action === 'shoot') shoot();
        else {
            const angle = button.dataset.key === 'arrowleft' ? -TURN_SPEED : TURN_SPEED;
            if (button.dataset.key === 'arrowup') {
                ship.vx += Math.cos(ship.angle) * ACCELERATION * 6;
                ship.vy += Math.sin(ship.angle) * ACCELERATION * 6;
            } else ship.angle += angle * 6;
        }
    });
});
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);
fullscreenBtn.addEventListener('click', toggleFullscreen);
window.addEventListener('blur', pauseOnLeave);
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseOnLeave(); });

function pauseOnLeave() {
    clearInput();
    if (state === 'running') togglePause();
}

function syncFullscreen() {
    const expanded = document.fullscreenElement === gameShell || gameShell.classList.contains('is-expanded');
    document.body.classList.toggle('has-expanded-game', expanded);
    fullscreenBtn.setAttribute('aria-pressed', String(expanded));
    fullscreenBtn.setAttribute('aria-label', expanded ? 'Vollbild verlassen' : 'Spielfeld im Vollbild öffnen');
    fullscreenBtn.title = expanded ? 'Vollbild verlassen (Esc)' : 'Vollbild öffnen';
    fullscreenLabel.textContent = expanded ? 'Verkleinern' : 'Vollbild';
}

async function leaveFullscreen() {
    gameShell.classList.remove('is-expanded');
    if (document.fullscreenElement === gameShell) {
        try { await document.exitFullscreen(); } catch { showNotice('Vollbild mit Esc verlassen.'); }
    }
    syncFullscreen();
}

async function toggleFullscreen() {
    if (fullscreenPending) return;
    fullscreenPending = true;
    try {
        if (document.fullscreenElement === gameShell || gameShell.classList.contains('is-expanded')) {
            await leaveFullscreen();
        } else {
            try {
                if (!gameShell.requestFullscreen) throw new Error('Fullscreen API unavailable');
                await gameShell.requestFullscreen();
            } catch {
                // Auch auf Browsern ohne Fullscreen API das Spielfeld fensterfüllend öffnen.
                gameShell.classList.add('is-expanded');
            }
        }
    } finally {
        fullscreenPending = false;
        syncFullscreen();
        focusCanvas();
    }
}
document.addEventListener('fullscreenchange', syncFullscreen);

function startLoop() {
    previousFrame = performance.now();
    accumulator = 0;
    frameId = requestAnimationFrame(frame);
}

function frame(now) {
    if (state !== 'running') return;
    // Feste Simulationsschritte halten Tempo und Feuerrate unabhängig vom Display.
    accumulator += Math.min(now - previousFrame, 100);
    previousFrame = now;
    while (accumulator >= STEP_MS && state === 'running') {
        update();
        accumulator -= STEP_MS;
    }
    draw();
    if (state === 'running') frameId = requestAnimationFrame(frame);
}

function startGame() {
    if (state === 'running' || state === 'paused') return;
    if (state === 'over') resetGame();
    state = 'running';
    clearInput();
    overlay.hidden = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    invulnerableTimer = INVULNERABLE_TIME;
    focusCanvas();
    startLoop();
}

function togglePause() {
    if (state !== 'running' && state !== 'paused') return;
    clearInput();
    if (state === 'running') {
        state = 'paused';
        cancelAnimationFrame(frameId);
        pauseBtn.textContent = 'Fortsetzen';
        showOverlay('Kurze Verschnaufpause', 'Flug unterbrochen.', 'Mit P oder „Fortsetzen“ geht es weiter.');
    } else {
        state = 'running';
        pauseBtn.textContent = 'Pause';
        overlay.hidden = true;
        startLoop();
    }
    focusCanvas();
}

function resetGame() {
    cancelAnimationFrame(frameId);
    clearTimeout(noticeTimer);
    window.GameRoundSession?.restart();
    clearInput();
    ship = createShip();
    asteroids = [];
    bullets = [];
    ufos = [];
    enemyBullets = [];
    particles = [];
    score = 0;
    lives = 3;
    wave = 1;
    tick = 0;
    state = 'ready';
    invulnerableTimer = 0;
    lastShotAt = -Infinity;
    ufoTimer = 480;
    ufoVisits = 0;
    notice.hidden = true;
    document.querySelector('.arena-coordinate').textContent = 'SECTOR / 001';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    showOverlay('Bereit zum Abheben?', 'Der Weltraum wartet.', 'Starte deinen Flug und halte das Asteroidenfeld frei.');
    spawnAsteroids(wave);
    updateHud();
    draw();
    focusCanvas();
}

function spawnAsteroids(count) {
    for (let i = 0; i < Math.min(count + 3, 14); i++) {
        let x, y;
        const safeDistance = Math.min(180, Math.min(canvas.width, canvas.height) * 0.4);
        for (let attempt = 0; attempt < 30; attempt++) {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
            if (Math.hypot(x - ship.x, y - ship.y) > safeDistance) break;
        }
        asteroids.push(createAsteroid(x, y, 3));
    }
}

function createAsteroid(x, y, size, vx, vy) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (0.6 + Math.random() * 0.9 + Math.min(wave, 10) * 0.08) * (1 + (3 - size) * 0.3);
    return {
        x, y, size,
        vx: vx ?? Math.cos(angle) * speed,
        vy: vy ?? Math.sin(angle) * speed,
        radius: [0, 11, 21, 34][size],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        vertices: Array.from({ length: 11 }, () => 0.72 + Math.random() * 0.28)
    };
}

function wrap(value, maximum) { return (value % maximum + maximum) % maximum; }
function overlaps(a, b, radius) { return Math.hypot(a.x - b.x, a.y - b.y) < radius; }

function shoot() {
    const now = performance.now();
    if (state !== 'running' || now - lastShotAt < SHOT_INTERVAL_MS || bullets.length >= MAX_PLAYER_BULLETS) return;
    lastShotAt = now;
    bullets.push({
        x: ship.x + Math.cos(ship.angle) * 19,
        y: ship.y + Math.sin(ship.angle) * 19,
        vx: Math.cos(ship.angle) * BULLET_SPEED + ship.vx,
        vy: Math.sin(ship.angle) * BULLET_SPEED + ship.vy,
        lifetime: BULLET_LIFETIME
    });
    updateHud();
}

function spawnUfo(type) {
    ufoVisits++;
    type = type || (ufoVisits % 2 === 0 || (wave >= 4 && Math.random() < 0.5) ? 'small' : 'large');
    const config = UFO_TYPES[type];
    const direction = Math.random() < 0.5 ? 1 : -1;
    ufos.push({
        ...config, type,
        x: direction > 0 ? -config.radius : canvas.width + config.radius,
        y: 65 + Math.random() * (canvas.height - 130),
        vx: config.speed * direction, vy: 0,
        turnTimer: 70, shotTimer: 75
    });
    showNotice(type === 'small' ? 'Kleines UFO — in Bewegung bleiben!' : 'Großes UFO im Anflug');
}

function fireUfo(ufo) {
    if (enemyBullets.length >= 5) return;
    const angle = ufo.type === 'small'
        ? Math.atan2(ship.y - ufo.y, ship.x - ufo.x) + (Math.random() - 0.5) * Math.max(0.06, 0.3 - wave * 0.025)
        : Math.random() * Math.PI * 2;
    const speed = ufo.type === 'small' ? 5 : 4;
    enemyBullets.push({ x: ufo.x, y: ufo.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, lifetime: 100 });
}

function burst(x, y, color, count = 14) {
    if (reducedMotion) return;
    for (let i = 0; i < count && particles.length < 180; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 3;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 26, color });
    }
}

function destroyAsteroid(index, awardPoints) {
    const asteroid = asteroids[index];
    asteroids.splice(index, 1);
    if (awardPoints) score += [0, 100, 50, 20][asteroid.size];
    burst(asteroid.x, asteroid.y, '#b8c4d2');
    if (asteroid.size > 1) {
        for (let i = 0; i < 2; i++) asteroids.push(createAsteroid(asteroid.x, asteroid.y, asteroid.size - 1));
    }
}

function loseShip() {
    if (invulnerableTimer > 0 || state !== 'running') return;
    burst(ship.x, ship.y, '#b9f586', 24);
    lives--;
    if (lives <= 0) {
        endGame();
        return;
    }
    ship = createShip();
    bullets = [];
    enemyBullets = [];
    invulnerableTimer = INVULNERABLE_TIME;
    showNotice(`${lives} ${lives === 1 ? 'Schiff übrig' : 'Schiffe übrig'} · Schutzschild aktiv`);
}

function moveBullets(collection) {
    for (let i = collection.length - 1; i >= 0; i--) {
        const bullet = collection[i];
        bullet.x = wrap(bullet.x + bullet.vx, canvas.width);
        bullet.y = wrap(bullet.y + bullet.vy, canvas.height);
        if (--bullet.lifetime <= 0) collection.splice(i, 1);
    }
}

function update() {
    if (state !== 'running') return;
    tick++;
    if (invulnerableTimer > 0) invulnerableTimer--;
    if (isPressed('arrowleft') || isPressed('a')) ship.angle -= TURN_SPEED;
    if (isPressed('arrowright') || isPressed('d')) ship.angle += TURN_SPEED;
    if (isPressed('arrowup') || isPressed('w')) {
        ship.vx += Math.cos(ship.angle) * ACCELERATION;
        ship.vy += Math.sin(ship.angle) * ACCELERATION;
    }
    const speed = Math.hypot(ship.vx, ship.vy);
    if (speed > MAX_SHIP_SPEED) {
        ship.vx *= MAX_SHIP_SPEED / speed;
        ship.vy *= MAX_SHIP_SPEED / speed;
    }
    ship.vx *= FRICTION;
    ship.vy *= FRICTION;
    ship.x = wrap(ship.x + ship.vx, canvas.width);
    ship.y = wrap(ship.y + ship.vy, canvas.height);
    if (fireHeld()) shoot();
    moveBullets(bullets);
    moveBullets(enemyBullets);

    asteroids.forEach(asteroid => {
        asteroid.x = wrap(asteroid.x + asteroid.vx, canvas.width);
        asteroid.y = wrap(asteroid.y + asteroid.vy, canvas.height);
        asteroid.angle += asteroid.spin;
    });
    if (ufos.length === 0 && asteroids.length > 0 && --ufoTimer <= 0) spawnUfo();
    for (let i = ufos.length - 1; i >= 0; i--) {
        const ufo = ufos[i];
        ufo.x += ufo.vx;
        ufo.y = wrap(ufo.y + ufo.vy, canvas.height);
        if (--ufo.turnTimer <= 0) {
            ufo.vy = (Math.random() - 0.5) * 3;
            ufo.turnTimer = 60 + Math.random() * 70;
        }
        if (--ufo.shotTimer <= 0) {
            fireUfo(ufo);
            ufo.shotTimer = ufo.fireInterval;
        }
        if (ufo.x < -ufo.radius * 2 || ufo.x > canvas.width + ufo.radius * 2) {
            ufos.splice(i, 1);
            ufoTimer = 420 + Math.random() * 300;
        }
    }

    // Eigene Treffer: Eine Kugel kann genau ein Ziel zerstören.
    for (let b = bullets.length - 1; b >= 0; b--) {
        const bullet = bullets[b];
        const u = ufos.findIndex(ufo => overlaps(bullet, ufo, ufo.radius));
        if (u !== -1) {
            const ufo = ufos[u];
            score += ufo.points;
            burst(ufo.x, ufo.y, ufo.color, 22);
            ufos.splice(u, 1);
            bullets.splice(b, 1);
            ufoTimer = 420 + Math.random() * 300;
            continue;
        }
        const a = asteroids.findIndex(asteroid => overlaps(bullet, asteroid, asteroid.radius));
        if (a !== -1) {
            bullets.splice(b, 1);
            destroyAsteroid(a, true);
        }
    }
    for (let b = enemyBullets.length - 1; b >= 0; b--) {
        const bullet = enemyBullets[b];
        if (invulnerableTimer === 0 && overlaps(bullet, ship, SHIP_SIZE)) {
            enemyBullets.splice(b, 1);
            loseShip();
            if (state !== 'running') return;
            break;
        }
        const a = asteroids.findIndex(asteroid => overlaps(bullet, asteroid, asteroid.radius));
        if (a !== -1) {
            enemyBullets.splice(b, 1);
            destroyAsteroid(a, false);
        }
    }
    // UFOs können auch mit Gestein zusammenstoßen.
    for (let u = ufos.length - 1; u >= 0; u--) {
        const ufo = ufos[u];
        const a = asteroids.findIndex(asteroid => overlaps(ufo, asteroid, asteroid.radius + ufo.radius * 0.6));
        if (a !== -1) {
            burst(ufo.x, ufo.y, ufo.color);
            ufos.splice(u, 1);
            destroyAsteroid(a, false);
            ufoTimer = 420 + Math.random() * 300;
        }
    }
    if (invulnerableTimer === 0) {
        const asteroidHit = asteroids.some(asteroid => overlaps(ship, asteroid, asteroid.radius + SHIP_SIZE - 4));
        const ufoHit = ufos.findIndex(ufo => overlaps(ship, ufo, ufo.radius + SHIP_SIZE - 4));
        if (asteroidHit || ufoHit !== -1) {
            if (ufoHit !== -1) {
                burst(ufos[ufoHit].x, ufos[ufoHit].y, ufos[ufoHit].color);
                ufos.splice(ufoHit, 1);
                ufoTimer = 420 + Math.random() * 300;
            }
            loseShip();
            if (state !== 'running') return;
        }
    }
    particles = particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        return --particle.life > 0;
    });
    if (asteroids.length === 0 && ufos.length === 0) nextWave();
    updateHud();
}

function nextWave() {
    wave++;
    ship = createShip();
    bullets = [];
    enemyBullets = [];
    invulnerableTimer = INVULNERABLE_TIME;
    ufoTimer = 420;
    spawnAsteroids(wave);
    showNotice(`Sektor frei · Welle ${wave} startet`);
    document.querySelector('.arena-coordinate').textContent = `SECTOR / ${String(wave).padStart(3, '0')}`;
    saveProgress();
    updateHud();
}

function drawUfo(ufo) {
    const r = ufo.radius;
    ctx.save();
    ctx.translate(ufo.x, ufo.y);
    ctx.strokeStyle = ufo.color;
    ctx.shadowColor = ufo.color;
    ctx.shadowBlur = 9;
    ctx.lineWidth = 1.7;
    ctx.beginPath();
    ctx.moveTo(-r, 0);
    ctx.lineTo(-r * 0.52, -r * 0.34);
    ctx.lineTo(-r * 0.28, -r * 0.7);
    ctx.lineTo(r * 0.28, -r * 0.7);
    ctx.lineTo(r * 0.52, -r * 0.34);
    ctx.lineTo(r, 0);
    ctx.lineTo(r * 0.5, r * 0.32);
    ctx.lineTo(-r * 0.5, r * 0.32);
    ctx.closePath();
    ctx.moveTo(-r, 0);
    ctx.lineTo(r, 0);
    ctx.moveTo(-r * 0.52, -r * 0.34);
    ctx.lineTo(r * 0.52, -r * 0.34);
    ctx.stroke();
    ctx.restore();
}

function draw() {
    ctx.fillStyle = '#070c14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 85; i++) {
        ctx.fillStyle = i % 4 === 0 ? '#43546b' : '#243044';
        ctx.fillRect((i * 137.3) % canvas.width, (i * 83.7) % canvas.height, i % 5 === 0 ? 2 : 1, 1);
    }
    // Feine Sektormarkierungen statt eines ablenkenden Rasters.
    ctx.strokeStyle = '#162332';
    ctx.lineWidth = 1;
    for (let x = 80; x < canvas.width; x += 140) {
        for (let y = 70; y < canvas.height; y += 140) {
            ctx.beginPath(); ctx.moveTo(x - 3, y); ctx.lineTo(x + 3, y); ctx.moveTo(x, y - 3); ctx.lineTo(x, y + 3); ctx.stroke();
        }
    }
    asteroids.forEach(asteroid => {
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.angle);
        ctx.strokeStyle = '#a7b5c6';
        ctx.fillStyle = '#111c29';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        asteroid.vertices.forEach((length, index) => {
            const angle = index / asteroid.vertices.length * Math.PI * 2;
            const x = Math.cos(angle) * asteroid.radius * length;
            const y = Math.sin(angle) * asteroid.radius * length;
            if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
    });
    ufos.forEach(drawUfo);
    [bullets, enemyBullets].forEach((collection, index) => {
        ctx.fillStyle = index === 0 ? '#dcffb7' : '#ff9187';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        collection.forEach(bullet => {
            ctx.beginPath(); ctx.arc(bullet.x, bullet.y, index === 0 ? 2.3 : 3, 0, Math.PI * 2); ctx.fill();
        });
    });
    ctx.shadowBlur = 0;
    particles.forEach(particle => {
        ctx.globalAlpha = particle.life / 26;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, 2, 2);
    });
    ctx.globalAlpha = 1;
    if (state !== 'over') {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);
        ctx.globalAlpha = invulnerableTimer > 0 && Math.floor(invulnerableTimer / 9) % 2 === 0 ? 0.4 : 1;
        ctx.strokeStyle = '#c8faa3';
        ctx.fillStyle = '#172822';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#b9f586';
        ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.moveTo(17, 0); ctx.lineTo(-12, -11); ctx.lineTo(-7, 0); ctx.lineTo(-12, 11); ctx.closePath(); ctx.fill(); ctx.stroke();
        if (state === 'running' && (isPressed('arrowup') || isPressed('w'))) {
            ctx.strokeStyle = '#f5c96a';
            ctx.beginPath(); ctx.moveTo(-13, -5); ctx.lineTo(-22 - (tick % 3) * 3, 0); ctx.lineTo(-13, 5); ctx.stroke();
        }
        ctx.restore();
        if (invulnerableTimer > 0) {
            ctx.strokeStyle = '#b9f58644';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(ship.x, ship.y, 29, 0, Math.PI * 2); ctx.stroke();
        }
    }
}

function endGame() {
    state = 'over';
    cancelAnimationFrame(frameId);
    clearInput();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    notice.hidden = true;
    saveProgress();
    updateHud();
    showOverlay('Flug beendet', `${score.toLocaleString('de-DE')} Punkte.`, `Du hast Welle ${wave} erreicht. Gleich geht es zurück zum LernLabor.`);
    draw();
    leaveFullscreen();
    window.GameRoundSession.finish();
}

function resizeArena() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const scale = Math.max(1, 600 / bounds.width);
    const width = Math.round(bounds.width * scale);
    const height = Math.round(bounds.height * scale);
    if (canvas.width === width && canvas.height === height) return;
    const scaleX = width / canvas.width;
    const scaleY = height / canvas.height;
    [ship, ...asteroids, ...bullets, ...ufos, ...enemyBullets, ...particles].forEach(object => {
        object.x *= scaleX;
        object.y *= scaleY;
    });
    canvas.width = width;
    canvas.height = height;
    draw();
}

resizeArena();
new ResizeObserver(resizeArena).observe(canvas);
spawnAsteroids(wave);
updateHud();
draw();
