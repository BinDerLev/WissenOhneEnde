const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score');
const waveDisplay = document.getElementById('wave');
const livesDisplay = document.getElementById('lives');
const coinsDisplay = document.getElementById('coins');
const bestScoreDisplay = document.getElementById('bestScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const upgradeButtons = [...document.querySelectorAll('.upgrade-btn')];

const upgradeCosts = {
    ship: 35,
    shot: 40,
    shield: 45,
};

let maxShipSpeed = 8;
let bulletSpeed = 7;
let shipLevel = Number(localStorage.getItem('asteroid_shipLevel') || 0);
let shotLevel = Number(localStorage.getItem('asteroid_shotLevel') || 0);
let shieldLevel = Number(localStorage.getItem('asteroid_shieldLevel') || 0);
let coins = Number(localStorage.getItem('asteroid_coins') || 0);
let bestScore = Number(localStorage.getItem('asteroid_bestScore') || 0);

const SHIP_SIZE = 15;
const TURN_SPEED = 6;
const ACCELERATION = 0.5;
const FRICTION = 0.99;
const BULLET_LIFETIME = 60;
const INVULNERABLE_TIME = 180;

let ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    vx: 0,
    vy: 0,
    width: SHIP_SIZE,
    height: SHIP_SIZE,
    shield: 0,
};

let asteroids = [];
let bullets = [];
let keys = {};
let score = 0;
let lives = 3;
let wave = 1;
let gameRunning = false;
let gamePaused = false;
let gameLoop;
let invulnerableTimer = 0;

upgradeButtons.forEach((button) => {
    button.addEventListener('click', () => buyUpgrade(button.dataset.upgrade));
});

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);

function saveProgress() {
    localStorage.setItem('asteroid_shipLevel', String(shipLevel));
    localStorage.setItem('asteroid_shotLevel', String(shotLevel));
    localStorage.setItem('asteroid_shieldLevel', String(shieldLevel));
    localStorage.setItem('asteroid_coins', String(coins));
    localStorage.setItem('asteroid_bestScore', String(bestScore));
}

function updateUpgradeButtons() {
    upgradeButtons.forEach((button) => {
        const type = button.dataset.upgrade;
        const cost = upgradeCosts[type];
        const labelMap = {
            ship: '🚀 Schiff',
            shot: '🔫 Schuss',
            shield: '🛡️ Schild',
        };
        const level = type === 'ship' ? shipLevel : type === 'shot' ? shotLevel : shieldLevel;
        button.textContent = `${labelMap[type]} + ${cost}`;
        button.disabled = coins < cost;
        button.title = `Level ${level}`;
    });
}

function updateHud() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('asteroid_bestScore', String(bestScore));
    }

    scoreDisplay.textContent = score;
    waveDisplay.textContent = wave;
    livesDisplay.textContent = lives;
    coinsDisplay.textContent = coins;
    bestScoreDisplay.textContent = bestScore;
    updateUpgradeButtons();
}

function buyUpgrade(type) {
    const cost = upgradeCosts[type];
    if (coins < cost) return;

    coins -= cost;

    if (type === 'ship') {
        shipLevel += 1;
        maxShipSpeed = 8 + shipLevel * 0.8;
    }
    if (type === 'shot') {
        shotLevel += 1;
        bulletSpeed = 7 + shotLevel * 1.1;
    }
    if (type === 'shield') {
        shieldLevel += 1;
        ship.shield = Math.max(ship.shield, shieldLevel);
    }

    saveProgress();
    updateHud();
}

function handleKeyDown(e) {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') {
        e.preventDefault();
        shoot();
    }
}

function handleKeyUp(e) {
    keys[e.key.toLowerCase()] = false;
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        gameLoop = setInterval(update, 1000 / 60);
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
    ship = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: 0,
        vx: 0,
        vy: 0,
        width: SHIP_SIZE,
        height: SHIP_SIZE,
        shield: shieldLevel > 0 ? 1 : 0,
    };
    asteroids = [];
    bullets = [];
    score = 0;
    lives = 3;
    wave = 1;
    gameRunning = false;
    gamePaused = false;
    invulnerableTimer = 0;

    updateHud();

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    spawnAsteroids(wave);
    draw();
}

function spawnAsteroids(count) {
    for (let i = 0; i < count + 2; i++) {
        let x, y;
        let validSpawn = false;

        while (!validSpawn) {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;

            const dist = Math.hypot(x - ship.x, y - ship.y);
            if (dist > 150) {
                validSpawn = true;
            }
        }

        asteroids.push(createAsteroid(x, y, 3));
    }
}

function createAsteroid(x, y, size, vx = null, vy = null) {
    if (vx === null) {
        vx = (Math.random() - 0.5) * 4;
    }
    if (vy === null) {
        vy = (Math.random() - 0.5) * 4;
    }

    return {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        size: size,
        radius: size * 8,
    };
}

function shoot() {
    if (!gameRunning || gamePaused) return;

    const bulletVx = Math.cos(ship.angle) * bulletSpeed + ship.vx;
    const bulletVy = Math.sin(ship.angle) * bulletSpeed + ship.vy;

    bullets.push({
        x: ship.x + Math.cos(ship.angle) * 20,
        y: ship.y + Math.sin(ship.angle) * 20,
        vx: bulletVx,
        vy: bulletVy,
        lifetime: BULLET_LIFETIME,
    });
}

function update() {
    if (gamePaused) return;

    if (keys['arrowleft'] || keys['a']) {
        ship.angle -= TURN_SPEED * Math.PI / 180;
    }
    if (keys['arrowright'] || keys['d']) {
        ship.angle += TURN_SPEED * Math.PI / 180;
    }

    if (keys['arrowup'] || keys['w']) {
        ship.vx += Math.cos(ship.angle) * ACCELERATION;
        ship.vy += Math.sin(ship.angle) * ACCELERATION;
    }

    const speed = Math.hypot(ship.vx, ship.vy);
    if (speed > maxShipSpeed) {
        ship.vx = (ship.vx / speed) * maxShipSpeed;
        ship.vy = (ship.vy / speed) * maxShipSpeed;
    }

    ship.vx *= FRICTION;
    ship.vy *= FRICTION;

    ship.x += ship.vx;
    ship.y += ship.vy;

    if (ship.x < 0) ship.x = canvas.width;
    if (ship.x > canvas.width) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.height;
    if (ship.y > canvas.height) ship.y = 0;

    if (invulnerableTimer > 0) {
        invulnerableTimer--;
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].x += bullets[i].vx;
        bullets[i].y += bullets[i].vy;
        bullets[i].lifetime--;

        if (bullets[i].lifetime <= 0 ||
            bullets[i].x < 0 || bullets[i].x > canvas.width ||
            bullets[i].y < 0 || bullets[i].y > canvas.height) {
            bullets.splice(i, 1);
        }
    }

    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].x += asteroids[i].vx;
        asteroids[i].y += asteroids[i].vy;

        if (asteroids[i].x < 0) asteroids[i].x = canvas.width;
        if (asteroids[i].x > canvas.width) asteroids[i].x = 0;
        if (asteroids[i].y < 0) asteroids[i].y = canvas.height;
        if (asteroids[i].y > canvas.height) asteroids[i].y = 0;
    }

    for (let b = bullets.length - 1; b >= 0; b--) {
        for (let a = asteroids.length - 1; a >= 0; a--) {
            const dist = Math.hypot(
                bullets[b].x - asteroids[a].x,
                bullets[b].y - asteroids[a].y
            );

            if (dist < asteroids[a].radius) {
                bullets.splice(b, 1);
                score += asteroids[a].size * 100;
                coins += 2 + wave;
                updateHud();

                if (asteroids[a].size > 1) {
                    const newSize = asteroids[a].size - 1;
                    for (let i = 0; i < 2; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 2;
                        asteroids.push(createAsteroid(
                            asteroids[a].x,
                            asteroids[a].y,
                            newSize,
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed
                        ));
                    }
                }

                asteroids.splice(a, 1);
                break;
            }
        }
    }

    if (invulnerableTimer === 0) {
        for (let a = 0; a < asteroids.length; a++) {
            const dist = Math.hypot(
                ship.x - asteroids[a].x,
                ship.y - asteroids[a].y
            );

            if (dist < asteroids[a].radius + SHIP_SIZE) {
                if (ship.shield > 0) {
                    ship.shield -= 1;
                    invulnerableTimer = INVULNERABLE_TIME;
                    asteroids.splice(a, 1);
                    continue;
                }

                lives--;
                invulnerableTimer = INVULNERABLE_TIME;
                if (lives <= 0) {
                    endGame();
                    return;
                }
            }
        }
    }

    if (asteroids.length === 0) {
        nextWave();
        return;
    }

    updateHud();
    draw();
}

function nextWave() {
    clearInterval(gameLoop);
    wave++;
    coins += 8 + wave * 2;

    ship = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: 0,
        vx: 0,
        vy: 0,
        width: SHIP_SIZE,
        height: SHIP_SIZE,
        shield: Math.max(0, shieldLevel > 0 ? 1 : 0),
    };

    invulnerableTimer = INVULNERABLE_TIME;
    spawnAsteroids(wave);
    gameRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    saveProgress();
    updateHud();
    alert(`🎉 Wave ${wave - 1} abgeschlossen!\nWave ${wave} startet...`);
    draw();
}

function draw() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0e27');
    gradient.addColorStop(1, '#1a2a4a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 100; i++) {
        const x = (i * 73 + wave * 50) % canvas.width;
        const y = (i * 97) % canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 0.5, 0, Math.PI * 2);
        ctx.fill();
    }

    asteroids.forEach(asteroid => {
        ctx.strokeStyle = '#ffbb00';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ffbb00';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 187, 0, 0.1)';
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    bullets.forEach(bullet => {
        ctx.fillStyle = '#ffdd44';
        ctx.shadowColor = '#ffdd44';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    const shipX = ship.x;
    const shipY = ship.y;

    ctx.save();
    ctx.translate(shipX, shipY);
    ctx.rotate(ship.angle);

    if (ship.shield > 0) {
        ctx.strokeStyle = 'rgba(90, 220, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, SHIP_SIZE + 8, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.shadowColor = '#00ffaa';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#00ffaa';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-10, -12);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, 12);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#00ff99';
    ctx.lineWidth = 2;
    ctx.stroke();

    const speed = Math.hypot(ship.vx, ship.vy);
    if (speed > 0.1 && (keys['arrowup'] || keys['w'])) {
        ctx.fillStyle = 'rgba(255, 100, 0, 0.6)';
        ctx.beginPath();
        ctx.moveTo(-5, -8);
        ctx.lineTo(-5, 8);
        ctx.lineTo(-15 - speed * 2, 0);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();

    if (invulnerableTimer > 0 && Math.floor(invulnerableTimer / 10) % 2 === 0) {
        ctx.strokeStyle = 'rgba(0, 255, 170, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(shipX, shipY, SHIP_SIZE + 10, 0, Math.PI * 2);
        ctx.stroke();
    }
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
    alert(`Game Over! 🚀\nDein Final Score: ${score}\nWellen erreicht: ${wave}`);
    resetGame();
}

bestScoreDisplay.textContent = bestScore;
coinsDisplay.textContent = coins;
updateHud();
spawnAsteroids(wave);
draw();
