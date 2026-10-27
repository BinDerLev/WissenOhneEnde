// Spielfeld und Anzeigeelemente vorbereiten.
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const overlay = document.querySelector("#overlay");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const startButton = document.querySelector("#startButton");
const scoreDisplay = document.querySelector("#score");
const livesDisplay = document.querySelector("#lives");

const W = canvas.width;
const H = canvas.height;

// Maße und Geschwindigkeit von Schläger und Ball.
const paddle = { w: 112, h: 13, x: W / 2 - 56, y: H - 34, speed: 7 };
const ball = { x: W / 2, y: H - 55, r: 8, vx: 4, vy: -4 };

// Einstellungen für das Steinraster.
const brickConfig = { rows: 5, cols: 9, w: 66, h: 20, gap: 9, top: 58 };
const brickColors = ["#ff5dba", "#ff8a5b", "#ffd166", "#67e8a5", "#53baff"];
let bricks = [];
let score = 0;
let lives = 3;
let running = false;
let rightPressed = false;
let leftPressed = false;
let animationId = null;

// Erstellt das Steinraster mittig im Spielfeld.
function createBricks() {
    bricks = [];
    const totalWidth = brickConfig.cols * (brickConfig.w + brickConfig.gap) - brickConfig.gap;
    const startX = (W - totalWidth) / 2;

    for (let row = 0; row < brickConfig.rows; row++) {
        for (let col = 0; col < brickConfig.cols; col++) {
            bricks.push({
                x: startX + col * (brickConfig.w + brickConfig.gap),
                y: brickConfig.top + row * (brickConfig.h + brickConfig.gap),
                alive: true,
                color: brickColors[row]
            });
        }
    }
}

// Setzt den Ball oberhalb des Schlägers zurück.
function resetBall() {
    ball.x = paddle.x + paddle.w / 2;
    ball.y = paddle.y - ball.r - 2;
    ball.vx = Math.random() > 0.5 ? 4 : -4;
    ball.vy = -4;
}

// Zeichnet den Ball mit leichtem Leuchteffekt.
function drawBall() {
    ctx.save();
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#b9f7ff";
    ctx.fillStyle = "#f2fdff";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// Zeichnet den Schläger als abgerundeten Neonbalken.
function drawPaddle() {
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#53e7ff";
    const gradient = ctx.createLinearGradient(paddle.x, 0, paddle.x + paddle.w, 0);
    gradient.addColorStop(0, "#48baff");
    gradient.addColorStop(0.5, "#b8ffff");
    gradient.addColorStop(1, "#48baff");
    ctx.fillStyle = gradient;
    roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 7);
    ctx.fill();
    ctx.restore();
}

// Zeichnet alle noch nicht zerstörten Steine.
function drawBricks() {
    bricks.forEach(brick => {
        if (!brick.alive) return;
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = brick.color + "66";
        ctx.fillStyle = brick.color;
        roundRect(brick.x, brick.y, brickConfig.w, brickConfig.h, 6);
        ctx.fill();
        ctx.restore();
    });
}

// Hilfsfunktion für abgerundete Rechtecke.
function roundRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
}

// Dezentes Raster im Hintergrund des Spielfelds.
function drawBackground() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "#ffffff08";
    ctx.lineWidth = 1;
    for (let x = 30; x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
    }
    for (let y = 20; y < H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }
}

// Prüft, ob Ball und Stein kollidieren, und erhöht dann den Punktestand.
function checkBrickCollisions() {
    for (const brick of bricks) {
        if (!brick.alive) continue;
        if (
            ball.x + ball.r > brick.x &&
            ball.x - ball.r < brick.x + brickConfig.w &&
            ball.y + ball.r > brick.y &&
            ball.y - ball.r < brick.y + brickConfig.h
        ) {
            brick.alive = false;
            ball.vy *= -1;
            score += 10;
            scoreDisplay.textContent = score;
            break;
        }
    }
}

// Zeigt Start-, Gewinn- oder Verloren-Bildschirm.
function showOverlay(heading, text, buttonText) {
    title.textContent = heading;
    description.textContent = text;
    startButton.textContent = buttonText;
    overlay.classList.remove("hidden");
}

// Beendet die Animation und blendet eine Nachricht ein.
function endGame(won) {
    running = false;
    cancelAnimationFrame(animationId);
    showOverlay(
        won ? "GEWONNEN!" : "GAME OVER",
        won ? `Fantastisch! Dein Punktestand: ${score}` : `Dein Punktestand: ${score}. Gib nicht auf!`,
        "Nochmal spielen"
    );
}

// Ein Frame der Spielschleife: bewegen, Kollisionen prüfen und zeichnen.
function update() {
    if (!running) return;

    if (rightPressed) paddle.x += paddle.speed;
    if (leftPressed) paddle.x -= paddle.speed;
    paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));

    ball.x += ball.vx;
    ball.y += ball.vy;

    // Abprallen an den Seitenwänden und an der Decke.
    if (ball.x + ball.r > W || ball.x - ball.r < 0) ball.vx *= -1;
    if (ball.y - ball.r < 0) ball.vy *= -1;

    // Der Schläger gibt dem Ball je nach Trefferstelle eine andere Richtung.
    if (
        ball.vy > 0 &&
        ball.y + ball.r >= paddle.y &&
        ball.y - ball.r <= paddle.y + paddle.h &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.w
    ) {
        const hitPosition = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
        const speed = Math.hypot(ball.vx, ball.vy);
        const angle = hitPosition * (Math.PI / 3);
        ball.vx = speed * Math.sin(angle);
        ball.vy = -Math.abs(speed * Math.cos(angle));
    }

    checkBrickCollisions();

    // Fällt der Ball herunter, wird ein Leben abgezogen.
    if (ball.y - ball.r > H) {
        lives--;
        livesDisplay.textContent = lives;
        if (lives <= 0) {
            endGame(false);
            return;
        }
        resetBall();
    }

    // Sind keine Steine mehr übrig, ist das Spiel gewonnen.
    if (bricks.every(brick => !brick.alive)) {
        endGame(true);
        return;
    }

    drawBackground();
    drawBricks();
    drawPaddle();
    drawBall();
    animationId = requestAnimationFrame(update);
}

// Startet ein neues Spiel und setzt Punkte, Leben und Steine zurück.
function startGame() {
    cancelAnimationFrame(animationId);
    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    paddle.x = W / 2 - paddle.w / 2;
    createBricks();
    resetBall();
    overlay.classList.add("hidden");
    running = true;
    update();
}

// Tastatursteuerung: Pfeiltasten oder A/D.
document.addEventListener("keydown", event => {
    if (["ArrowRight", "ArrowLeft", " "].includes(event.key)) event.preventDefault();
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") rightPressed = true;
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") leftPressed = true;
});

document.addEventListener("keyup", event => {
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") rightPressed = false;
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") leftPressed = false;
});

// Maus- und Touchsteuerung: Schläger folgt der horizontalen Fingerposition.
function movePaddle(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const pointerX = (event.clientX - rect.left) * scaleX;
    paddle.x = Math.max(0, Math.min(W - paddle.w, pointerX - paddle.w / 2));
}

canvas.addEventListener("pointermove", movePaddle);
startButton.addEventListener("click", startGame);

// Das Spielfeld bereits vor Spielbeginn anzeigen.
createBricks();
drawBackground();
drawBricks();
drawPaddle();
drawBall();