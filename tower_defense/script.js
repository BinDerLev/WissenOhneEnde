"use strict";

(() => {
    const canvas = document.querySelector("#battlefield");
    const ctx = canvas.getContext("2d");
    const cols = 12;
    const rows = 8;
    const cell = 70;
    const offsetX = 30;
    const offsetY = 20;
    const maxWaves = 3;
    const route = [
        [0, 1], [9, 1], [9, 5], [2, 5], [2, 3], [11, 3], [11, 7]
    ].map(([x, y]) => ({ x: offsetX + x * cell + cell / 2, y: offsetY + y * cell + cell / 2 }));
    const towerTypes = {
        arrow: { name: "Bogenturm", cost: 55, range: 150, damage: 15, cooldown: 0.62, color: "#ffd166", projectile: "#fff0b0" },
        cannon: { name: "Kanone", cost: 90, range: 135, damage: 34, cooldown: 1.35, splash: 48, color: "#ff9478", projectile: "#ffc18c" },
        frost: { name: "Frostturm", cost: 75, range: 125, damage: 7, cooldown: 0.82, slow: 0.55, color: "#8edcff", projectile: "#c5f3ff" }
    };
    const elements = {
        gold: document.querySelector("#goldValue"),
        lives: document.querySelector("#livesValue"),
        wave: document.querySelector("#waveValue"),
        enemies: document.querySelector("#enemyValue"),
        message: document.querySelector("#gameMessage"),
        waveButton: document.querySelector("#waveButton"),
        announcement: document.querySelector("#announcement"),
        towerButtons: [...document.querySelectorAll(".tower-card")]
    };

    let towers = [];
    let enemies = [];
    let projectiles = [];
    let particles = [];
    let gold;
    let lives;
    let wave;
    let waveActive;
    let gameOver;
    let selectedTower;
    let spawnRemaining;
    let spawnTimer;
    let lastFrame = 0;
    let elapsed = 0;
    let pointerCell = null;
    let keyboardCell = { x: 4, y: 4 };

    function resetGame() {
        towers = [];
        enemies = [];
        projectiles = [];
        particles = [];
        gold = 140;
        lives = 12;
        wave = 0;
        waveActive = false;
        gameOver = false;
        selectedTower = "arrow";
        spawnRemaining = 0;
        spawnTimer = 0;
        pointerCell = null;
        keyboardCell = { x: 4, y: 4 };
        elements.message.textContent = "Platziere Türme und starte die erste Welle.";
        elements.message.dataset.state = "";
        elements.waveButton.disabled = false;
        elements.waveButton.textContent = "Welle 1 starten";
        selectTower("arrow");
        updateHud();
        draw();
    }

    function selectTower(type) {
        selectedTower = type;
        elements.towerButtons.forEach(button => {
            const selected = button.dataset.tower === type;
            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
        draw();
    }

    function updateHud() {
        elements.gold.textContent = String(gold);
        elements.lives.textContent = String(lives);
        elements.wave.textContent = `${wave} / ${maxWaves}`;
        elements.enemies.textContent = String(enemies.length);
        const type = towerTypes[selectedTower];
        elements.waveButton.disabled = waveActive || gameOver || wave >= maxWaves;
        if (!waveActive && !gameOver) {
            elements.waveButton.textContent = wave >= maxWaves ? "Alle Wellen geschafft" : `Welle ${wave + 1} starten`;
        }
        elements.towerButtons.forEach(button => {
            button.setAttribute("aria-label", `${towerTypes[button.dataset.tower].name}, ${towerTypes[button.dataset.tower].cost} Münzen${button.dataset.tower === selectedTower ? ", ausgewählt" : ""}`);
        });
        if (type) canvas.setAttribute("aria-label", `Spielfeld, ${type.name} ausgewählt. Pfeiltasten bewegen die Auswahl, Eingabe platziert den Turm.`);
    }

    function startWave() {
        if (waveActive || gameOver || wave >= maxWaves) return;
        wave += 1;
        waveActive = true;
        spawnRemaining = 7 + wave * 2;
        spawnTimer = 0.2;
        elements.message.textContent = `Welle ${wave}: ${spawnRemaining} Gegner nähern sich!`;
        elements.message.dataset.state = "";
        elements.announcement.textContent = `Welle ${wave} gestartet.`;
        updateHud();
    }

    function cellForPoint(point) {
        const x = Math.floor((point.x - offsetX) / cell);
        const y = Math.floor((point.y - offsetY) / cell);
        return x >= 0 && x < cols && y >= 0 && y < rows ? { x, y } : null;
    }

    function isRoad(x, y) {
        for (let i = 0; i < route.length - 1; i += 1) {
            const a = route[i];
            const b = route[i + 1];
            const ax = Math.round((a.x - offsetX - cell / 2) / cell);
            const ay = Math.round((a.y - offsetY - cell / 2) / cell);
            const bx = Math.round((b.x - offsetX - cell / 2) / cell);
            const by = Math.round((b.y - offsetY - cell / 2) / cell);
            if (ax === bx && x === ax && y >= Math.min(ay, by) && y <= Math.max(ay, by)) return true;
            if (ay === by && y === ay && x >= Math.min(ax, bx) && x <= Math.max(ax, bx)) return true;
        }
        return false;
    }

    function placeTower(x, y) {
        if (gameOver || waveActive || isRoad(x, y) || towers.some(tower => tower.x === x && tower.y === y)) {
            elements.message.textContent = "Dort kann kein Turm gebaut werden. Wähle ein freies Feld neben dem Weg.";
            return;
        }
        const type = towerTypes[selectedTower];
        if (gold < type.cost) {
            elements.message.textContent = `Für den ${type.name} brauchst du ${type.cost} Münzen.`;
            return;
        }
        gold -= type.cost;
        towers.push({ x, y, type: selectedTower, cooldown: 0 });
        elements.message.textContent = `${type.name} platziert.`;
        elements.announcement.textContent = `${type.name} platziert. Noch ${gold} Münzen.`;
        updateHud();
        draw();
    }

    function pointerPosition(event) {
        const rect = canvas.getBoundingClientRect();
        return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
    }

    function addEnemy() {
        const strength = wave;
        enemies.push({
            x: route[0].x, y: route[0].y, segment: 0, progress: 0,
            hp: 48 + strength * 17, maxHp: 48 + strength * 17,
            speed: 47 + strength * 3, slowTime: 0, slowFactor: 1,
            reward: 9 + Math.floor(strength / 2), radius: 12
        });
    }

    function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

    function update(delta) {
        if (waveActive && spawnRemaining > 0) {
            spawnTimer -= delta;
            if (spawnTimer <= 0) {
                addEnemy();
                spawnRemaining -= 1;
                spawnTimer = Math.max(0.5, 1.15 - wave * 0.08);
            }
        }

        enemies.forEach(enemy => {
            if (enemy.slowTime > 0) {
                enemy.slowTime -= delta;
                if (enemy.slowTime <= 0) enemy.slowFactor = 1;
            }
            let distanceLeft = enemy.speed * enemy.slowFactor * delta;
            while (distanceLeft > 0 && enemy.segment < route.length - 1) {
                const target = route[enemy.segment + 1];
                const remaining = distance(enemy, target);
                if (distanceLeft >= remaining) {
                    enemy.x = target.x;
                    enemy.y = target.y;
                    distanceLeft -= remaining;
                    enemy.segment += 1;
                } else {
                    enemy.x += (target.x - enemy.x) / remaining * distanceLeft;
                    enemy.y += (target.y - enemy.y) / remaining * distanceLeft;
                    distanceLeft = 0;
                }
            }
        });

        for (const tower of towers) {
            const spec = towerTypes[tower.type];
            tower.cooldown -= delta;
            if (tower.cooldown <= 0) {
                const target = enemies
                    .filter(enemy => distance(enemy, towerCenter(tower)) <= spec.range)
                    .sort((a, b) => b.segment - a.segment || b.progress - a.progress)[0];
                if (target) {
                    projectiles.push({ x: towerCenter(tower).x, y: towerCenter(tower).y, target, type: tower.type, speed: tower.type === "cannon" ? 280 : 390 });
                    tower.cooldown = spec.cooldown;
                }
            }
        }

        projectiles = projectiles.filter(projectile => {
            if (!enemies.includes(projectile.target)) return false;
            const dx = projectile.target.x - projectile.x;
            const dy = projectile.target.y - projectile.y;
            const distanceLeft = Math.hypot(dx, dy);
            const step = projectile.speed * delta;
            if (distanceLeft <= step + projectile.target.radius) {
                hitEnemy(projectile.target, projectile.type);
                return false;
            }
            projectile.x += dx / distanceLeft * step;
            projectile.y += dy / distanceLeft * step;
            return true;
        });

        const escaped = enemies.filter(enemy => enemy.segment >= route.length - 1 && distance(enemy, route[route.length - 1]) < 2);
        if (escaped.length) {
            enemies = enemies.filter(enemy => !escaped.includes(enemy));
            lives = Math.max(0, lives - escaped.length);
            elements.message.textContent = `${escaped.length} Gegner sind durchgebrochen!`;
            if (lives <= 0) finishGame(false);
        }
        particles = particles.filter(particle => {
            particle.life -= delta;
            particle.x += particle.vx * delta;
            particle.y += particle.vy * delta;
            return particle.life > 0;
        });
        if (waveActive && spawnRemaining === 0 && enemies.length === 0 && !gameOver) {
            waveActive = false;
            if (wave >= maxWaves) finishGame(true);
            else {
                const bonus = 24 + wave * 4;
                gold += bonus;
                elements.message.textContent = `Welle ${wave} überstanden! +${bonus} Münzen. Baue weiter und starte die nächste Welle.`;
            }
        }
        updateHud();
    }

    function towerCenter(tower) {
        return { x: offsetX + tower.x * cell + cell / 2, y: offsetY + tower.y * cell + cell / 2 };
    }

    function hitEnemy(target, type) {
        const spec = towerTypes[type];
        if (type === "cannon") {
            enemies.forEach(enemy => {
                if (distance(enemy, target) <= spec.splash) damageEnemy(enemy, spec.damage);
            });
        } else {
            damageEnemy(target, spec.damage);
            if (type === "frost") {
                target.slowFactor = spec.slow;
                target.slowTime = 1.8;
            }
        }
        burst(target.x, target.y, spec.color);
    }

    function damageEnemy(enemy, amount) {
        if (!enemies.includes(enemy)) return;
        enemy.hp -= amount;
        if (enemy.hp <= 0) {
            enemies = enemies.filter(candidate => candidate !== enemy);
            gold += enemy.reward;
            burst(enemy.x, enemy.y, "#ffe4a0");
        }
    }

    function burst(x, y, color) {
        for (let i = 0; i < 5; i += 1) {
            const angle = Math.random() * Math.PI * 2;
            particles.push({ x, y, vx: Math.cos(angle) * 55, vy: Math.sin(angle) * 55, life: 0.25, color });
        }
    }

    function finishGame(won) {
        gameOver = true;
        waveActive = false;
        elements.message.textContent = won ? "Sieg! Der Kristallpfad ist sicher. Großartige Verteidigung!" : "Der Kristall ist gefallen. Baue deine Türme anders und versuche es erneut.";
        elements.message.dataset.state = won ? "win" : "loss";
        elements.announcement.textContent = won ? "Du hast gewonnen!" : "Das Spiel ist vorbei.";
        elements.waveButton.disabled = true;
        elements.waveButton.textContent = won ? "Sieg!" : "Verloren";
        window.GameRoundSession.finish();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#102a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < cols; x += 1) {
                ctx.fillStyle = (x + y) % 2 ? "#285044" : "#2b5547";
                ctx.fillRect(offsetX + x * cell, offsetY + y * cell, cell, cell);
                if (!isRoad(x, y) && (x * 7 + y * 11) % 5 === 0) drawGroundDetail(x, y);
                ctx.strokeStyle = "rgba(184, 224, 185, .09)";
                ctx.strokeRect(offsetX + x * cell, offsetY + y * cell, cell, cell);
            }
        }
        ctx.strokeStyle = "rgba(179, 231, 188, .22)";
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX + 1, offsetY + 1, cols * cell - 2, rows * cell - 2);
        drawRoad();
        towers.forEach(drawTower);
        if (pointerCell) drawCellHighlight(pointerCell, true);
        if (document.activeElement === canvas) drawCellHighlight(keyboardCell, false);
        enemies.forEach(drawEnemy);
        projectiles.forEach(drawProjectile);
        particles.forEach(particle => {
            ctx.globalAlpha = Math.min(1, particle.life * 4);
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    function drawGroundDetail(x, y) {
        const seed = x * 37 + y * 61;
        const centerX = offsetX + x * cell + 18 + (seed % 34);
        const centerY = offsetY + y * cell + 18 + (seed % 29);
        ctx.fillStyle = "rgba(170, 207, 142, .16)";
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 8, 3, (seed % 7) * .2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(15, 42, 37, .16)";
        ctx.beginPath();
        ctx.arc(centerX + 15, centerY + 13, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawRoad() {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        route.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
        ctx.shadowColor = "rgba(9, 23, 24, .65)";
        ctx.shadowBlur = 13;
        ctx.shadowOffsetY = 5;
        ctx.strokeStyle = "#493f32";
        ctx.lineWidth = 54;
        ctx.stroke();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = "#b9935a";
        ctx.lineWidth = 48;
        ctx.stroke();
        ctx.strokeStyle = "#d5b876";
        ctx.lineWidth = 37;
        ctx.stroke();
        ctx.setLineDash([3, 18]);
        ctx.strokeStyle = "rgba(113, 77, 43, .46)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.setLineDash([]);
        drawGate(route[0], "IN", "#8ce3b9");
        drawGate(route[route.length - 1], "✦", "#ffd166");
    }

    function drawGate(point, label, color) {
        ctx.shadowColor = "rgba(0, 0, 0, .35)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = "#172b2e";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 19, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(point.x, point.y, 13, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, .16)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, point.x, point.y);
    }

    function drawCellHighlight(target, hover) {
        const { x, y } = target;
        if (isRoad(x, y)) return;
        const occupied = towers.some(tower => tower.x === x && tower.y === y);
        const spec = towerTypes[selectedTower];
        const center = { x: offsetX + x * cell + cell / 2, y: offsetY + y * cell + cell / 2 };
        ctx.fillStyle = occupied ? "rgba(255, 108, 108, .22)" : "rgba(88, 223, 173, .19)";
        ctx.fillRect(offsetX + x * cell, offsetY + y * cell, cell, cell);
        if (hover && !occupied && !waveActive && !gameOver) {
            ctx.beginPath();
            ctx.arc(center.x, center.y, spec.range, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(220, 244, 255, .055)";
            ctx.fill();
            ctx.strokeStyle = "rgba(230, 250, 255, .25)";
            ctx.lineWidth = 1;
            ctx.stroke();
            drawTowerIcon(center.x, center.y, selectedTower, .78);
        }
        if (!hover) {
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.strokeRect(offsetX + x * cell + 2, offsetY + y * cell + 2, cell - 4, cell - 4);
        }
    }

    function drawTower(tower) {
        const center = towerCenter(tower);
        const spec = towerTypes[tower.type];
        ctx.shadowColor = "rgba(4, 17, 20, .5)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        ctx.beginPath();
        ctx.arc(center.x, center.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = "#152d30";
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = spec.color;
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center.x, center.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, .16)";
        ctx.lineWidth = 1;
        ctx.stroke();
        drawTowerIcon(center.x, center.y, tower.type, 1);
    }

    function drawTowerIcon(x, y, type, scale) {
        const color = towerTypes[type].color;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = color;
        if (type === "arrow") {
            ctx.fillRect(-3, -13, 6, 25);
            ctx.beginPath();
            ctx.moveTo(-11, 1); ctx.lineTo(0, 12); ctx.lineTo(11, 1); ctx.lineTo(7, 0); ctx.lineTo(0, 6); ctx.lineTo(-7, 0);
            ctx.fill();
        } else if (type === "cannon") {
            ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "#6b3b37"; ctx.fillRect(-4, -15, 8, 18);
        } else {
            ctx.beginPath();
            for (let i = 0; i < 8; i += 1) {
                const angle = Math.PI * i / 4;
                const radius = i % 2 ? 6 : 14;
                const px = Math.cos(angle) * radius;
                const py = Math.sin(angle) * radius;
                i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
            }
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#e7faff"; ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
    }

    function drawEnemy(enemy) {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fillStyle = enemy.slowTime > 0 ? "#70c9ed" : "#e47767";
        ctx.fill();
        ctx.strokeStyle = enemy.slowTime > 0 ? "#d7f6ff" : "#ffd3a3";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "rgba(12, 24, 28, .8)";
        ctx.fillRect(enemy.x - 9, enemy.y - 21, 18, 5);
        ctx.fillStyle = "#75e0a1";
        ctx.fillRect(enemy.x - 8, enemy.y - 20, 16 * Math.max(0, enemy.hp / enemy.maxHp), 3);
    }

    function drawProjectile(projectile) {
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.type === "cannon" ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = towerTypes[projectile.type].projectile;
        ctx.fill();
    }

    function frame(timestamp) {
        if (!lastFrame) lastFrame = timestamp;
        const delta = Math.min((timestamp - lastFrame) / 1000, 0.05);
        lastFrame = timestamp;
        elapsed += delta;
        if (waveActive || projectiles.length || particles.length) update(delta);
        if (elapsed > 1 / 30) {
            draw();
            elapsed = 0;
        }
        requestAnimationFrame(frame);
    }

    elements.towerButtons.forEach(button => button.addEventListener("click", () => selectTower(button.dataset.tower)));
    elements.waveButton.addEventListener("click", startWave);
    document.querySelector("#restartButton").addEventListener("click", () => {
        resetGame();
        canvas.focus();
        elements.announcement.textContent = "Neues Spiel gestartet.";
    });

    canvas.addEventListener("pointermove", event => {
        pointerCell = cellForPoint(pointerPosition(event));
        draw();
    });
    canvas.addEventListener("pointerleave", () => { pointerCell = null; draw(); });
    canvas.addEventListener("pointerdown", event => {
        const target = cellForPoint(pointerPosition(event));
        if (!target) return;
        keyboardCell = target;
        placeTower(target.x, target.y);
        canvas.focus();
    });
    canvas.addEventListener("keydown", event => {
        const keyMoves = {
            ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
            w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0]
        };
        if (keyMoves[event.key]) {
            event.preventDefault();
            keyboardCell.x = Math.max(0, Math.min(cols - 1, keyboardCell.x + keyMoves[event.key][0]));
            keyboardCell.y = Math.max(0, Math.min(rows - 1, keyboardCell.y + keyMoves[event.key][1]));
            draw();
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            placeTower(keyboardCell.x, keyboardCell.y);
        } else if (["1", "2", "3"].includes(event.key)) {
            selectTower(["arrow", "cannon", "frost"][Number(event.key) - 1]);
        }
    });
    document.addEventListener("keydown", event => {
        if (event.target instanceof HTMLElement && (event.target.matches("button, a, input, textarea, select") || event.target.isContentEditable)) return;
        if (event.key.toLowerCase() === "r") resetGame();
        if (event.key.toLowerCase() === "n") startWave();
    });

    resetGame();
    requestAnimationFrame(frame);
})();
