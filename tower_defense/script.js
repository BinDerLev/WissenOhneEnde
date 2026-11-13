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
        window.GameRoundSession.finish(won);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#102a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < cols; x += 1) {
                const left = offsetX + x * cell;
                const top = offsetY + y * cell;
                const seed = terrainSeed(x, y);
                const tileGradient = ctx.createLinearGradient(left, top, left + cell, top + cell);
                tileGradient.addColorStop(0, (x + y) % 2 ? "#315b49" : "#2d5746");
                tileGradient.addColorStop(1, (x + y) % 2 ? "#2a5142" : "#284d3f");
                ctx.fillStyle = tileGradient;
                ctx.fillRect(left, top, cell, cell);
                if (!isRoad(x, y)) drawGroundDetail(x, y);
                ctx.strokeStyle = "rgba(179, 218, 180, .045)";
                ctx.lineWidth = 1;
                ctx.strokeRect(left, top, cell, cell);
            }
        }
        ctx.strokeStyle = "rgba(179, 231, 188, .34)";
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX + 1, offsetY + 1, cols * cell - 2, rows * cell - 2);
        ctx.fillStyle = "rgba(8, 24, 25, .26)";
        ctx.fillRect(offsetX, offsetY + rows * cell, cols * cell, 7);
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

    function terrainSeed(x, y) {
        let value = Math.imul(x + 19, 0x45d9f3b) ^ Math.imul(y + 7, 0x119de1f3);
        value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
        return (value ^ (value >>> 16)) >>> 0;
    }

    function drawGroundDetail(x, y) {
        const seed = terrainSeed(x, y);
        const centerX = offsetX + x * cell + 12 + seed % 45;
        const centerY = offsetY + y * cell + 13 + (seed >>> 7) % 43;
        const kind = seed % 23;
        if (kind === 0) {
            drawTree(centerX, centerY, seed);
        } else if (kind < 3) {
            drawBush(centerX, centerY, seed);
        } else if (kind < 7) {
            drawFern(centerX, centerY, seed);
        } else if (kind < 11) {
            drawFlower(centerX, centerY, seed);
        } else {
            drawGrassTuft(centerX, centerY, seed);
        }
    }

    function drawTree(x, y, seed) {
        const size = 1 + (seed % 4) * .08;
        ctx.fillStyle = "rgba(8, 24, 21, .28)";
        ctx.beginPath();
        ctx.ellipse(x + 5, y + 16 * size, 19 * size, 7 * size, -.16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#634a34";
        ctx.beginPath();
        ctx.moveTo(x - 3 * size, y + 13 * size);
        ctx.lineTo(x - 2 * size, y - 8 * size);
        ctx.lineTo(x + 4 * size, y - 8 * size);
        ctx.lineTo(x + 5 * size, y + 14 * size);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(211, 165, 99, .42)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 1 * size, y + 8 * size);
        ctx.lineTo(x + 1 * size, y - 5 * size);
        ctx.stroke();

        const canopy = ctx.createRadialGradient(x - 5 * size, y - 22 * size, 2, x, y - 12 * size, 26 * size);
        canopy.addColorStop(0, "#75aa62");
        canopy.addColorStop(.52, "#438451");
        canopy.addColorStop(1, "#245a40");
        ctx.fillStyle = canopy;
        ctx.beginPath();
        ctx.moveTo(x - 20 * size, y - 13 * size);
        ctx.bezierCurveTo(x - 24 * size, y - 26 * size, x - 13 * size, y - 38 * size, x - 3 * size, y - 36 * size);
        ctx.bezierCurveTo(x + 7 * size, y - 42 * size, x + 23 * size, y - 31 * size, x + 20 * size, y - 18 * size);
        ctx.bezierCurveTo(x + 27 * size, y - 7 * size, x + 14 * size, y + 1 * size, x + 3 * size, y - 3 * size);
        ctx.bezierCurveTo(x - 7 * size, y + 4 * size, x - 23 * size, y - 2 * size, x - 20 * size, y - 13 * size);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(164, 205, 115, .45)";
        ctx.beginPath();
        ctx.ellipse(x - 8 * size, y - 23 * size, 7 * size, 3 * size, -.55, 0, Math.PI * 2);
        ctx.ellipse(x + 3 * size, y - 32 * size, 5 * size, 2 * size, -.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(24, 75, 53, .42)";
        ctx.beginPath();
        ctx.arc(x + 11 * size, y - 13 * size, 5 * size, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawBush(x, y, seed) {
        const size = .82 + (seed % 4) * .08;
        ctx.fillStyle = "rgba(8, 24, 21, .2)";
        ctx.beginPath();
        ctx.ellipse(x + 2, y + 7, 17 * size, 5 * size, 0, 0, Math.PI * 2);
        ctx.fill();
        const leaves = seed % 2
            ? [[-10, 0, 8], [0, -4, 10], [10, 0, 8]]
            : [[-8, 1, 8], [4, -4, 9], [13, 2, 6]];
        leaves.forEach(([dx, dy, radius], index) => {
            const gradient = ctx.createRadialGradient(x + dx - 2, y + dy - 3, 1, x + dx, y + dy, radius);
            gradient.addColorStop(0, index === 1 ? "#70aa61" : "#55945a");
            gradient.addColorStop(1, index === 1 ? "#34744b" : "#286346");
            ctx.beginPath();
            ctx.arc(x + dx * size, y + dy * size, radius * size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        });
        ctx.fillStyle = "rgba(219, 236, 160, .75)";
        ctx.beginPath();
        ctx.arc(x - 3 * size, y - 6 * size, 1.8 * size, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFern(x, y, seed) {
        ctx.fillStyle = "rgba(15, 50, 37, .22)";
        ctx.beginPath();
        ctx.ellipse(x, y + 7, 11, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineCap = "round";
        ctx.lineWidth = 1.7;
        for (let frond = 0; frond < 5; frond += 1) {
            const direction = frond - 2;
            const endX = x + direction * 5 + (seed % 3) - 1;
            const endY = y - 6 - (2 - Math.abs(direction)) * 2;
            ctx.strokeStyle = frond % 2 ? "#69a96a" : "#8ab96d";
            ctx.beginPath();
            ctx.moveTo(x, y + 5);
            ctx.quadraticCurveTo(x + direction * 2, y, endX, endY);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(endX - direction * 1.3, endY + 2, 3, 1.3, direction * .16, 0, Math.PI * 2);
            ctx.fillStyle = frond % 2 ? "#4a8b5a" : "#72a966";
            ctx.fill();
        }
    }

    function drawFlower(x, y, seed) {
        const petalColors = ["#d9c99a", "#cdb5c2", "#dfc18d"];
        ctx.fillStyle = "rgba(15, 50, 37, .2)";
        ctx.beginPath();
        ctx.ellipse(x + 1, y + 3, 7, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(154, 195, 115, .7)";
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(x, y + 3);
        ctx.lineTo(x + (seed % 2 ? 2 : -2), y - 4);
        ctx.stroke();
        ctx.fillStyle = petalColors[(seed >>> 4) % petalColors.length];
        for (let petal = 0; petal < 5; petal += 1) {
            const angle = petal * Math.PI * 2 / 5;
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * 2.4, y - 5 + Math.sin(angle) * 2.4, 1.6, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = "#f4d779";
        ctx.beginPath();
        ctx.arc(x, y - 5, 1.25, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawGrassTuft(x, y, seed) {
        ctx.strokeStyle = seed % 2 ? "rgba(166, 202, 132, .48)" : "rgba(132, 181, 119, .48)";
        ctx.lineWidth = 1.35;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - 5, y + 3);
        ctx.quadraticCurveTo(x - 3, y - 2, x - 5, y - 5);
        ctx.moveTo(x, y + 4);
        ctx.quadraticCurveTo(x + 1, y - 2, x + 4, y - 6);
        ctx.moveTo(x + 4, y + 4);
        ctx.quadraticCurveTo(x + 7, y, x + 8, y - 3);
        ctx.stroke();
    }

    function drawRoad() {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        route.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
        ctx.shadowColor = "rgba(9, 23, 24, .65)";
        ctx.shadowBlur = 13;
        ctx.shadowOffsetY = 5;
        ctx.strokeStyle = "#3e392e";
        ctx.lineWidth = 56;
        ctx.stroke();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = "#92734d";
        ctx.lineWidth = 50;
        ctx.stroke();
        ctx.strokeStyle = "#ddc896";
        ctx.lineWidth = 43;
        ctx.stroke();
        const roadSurface = ctx.createLinearGradient(0, offsetY, 0, offsetY + rows * cell);
        roadSurface.addColorStop(0, "#f1e1b9");
        roadSurface.addColorStop(.5, "#e8d5a5");
        roadSurface.addColorStop(1, "#d8bf8d");
        ctx.strokeStyle = roadSurface;
        ctx.lineWidth = 37;
        ctx.stroke();
        drawRoadJoints();
        drawGate(route[0], "IN", "#8ce3b9");
        drawGate(route[route.length - 1], "✦", "#ffd166");
    }

    function drawRoadJoints() {
        ctx.save();
        ctx.strokeStyle = "rgba(126, 99, 62, .32)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        route.slice(1).forEach((point, index) => {
            const start = route[index];
            const dx = point.x - start.x;
            const dy = point.y - start.y;
            const length = Math.hypot(dx, dy);
            const normalX = -dy / length;
            const normalY = dx / length;
            for (let distance = 14; distance < length - 10; distance += 24) {
                const centerX = start.x + dx / length * distance;
                const centerY = start.y + dy / length * distance;
                ctx.beginPath();
                ctx.moveTo(centerX - normalX * 16, centerY - normalY * 16);
                ctx.lineTo(centerX + normalX * 16, centerY + normalY * 16);
                ctx.stroke();
            }
        });
        ctx.restore();
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
        const center = towerCenter(target);
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
            drawTowerVisual(center.x, center.y, selectedTower, .92);
        }
        if (!hover) {
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.strokeRect(offsetX + x * cell + 2, offsetY + y * cell + 2, cell - 4, cell - 4);
        }
    }

    function drawTower(tower) {
        const center = towerCenter(tower);
        drawTowerVisual(center.x, center.y, tower.type, 1.15);
    }

    function drawTowerVisual(x, y, type, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = "rgba(4, 14, 14, .36)";
        ctx.beginPath();
        ctx.ellipse(3, 14, 24, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        drawTowerFoundation();
        if (type === "arrow") drawArcherTower();
        else if (type === "cannon") drawCannonTower();
        else drawFrostTower();
        ctx.restore();
    }

    function drawTowerFoundation() {
        ctx.beginPath();
        ctx.moveTo(-22, 3);
        ctx.lineTo(-14, -3);
        ctx.lineTo(14, -3);
        ctx.lineTo(22, 3);
        ctx.lineTo(22, 11);
        ctx.lineTo(13, 17);
        ctx.lineTo(-13, 17);
        ctx.lineTo(-22, 11);
        ctx.closePath();
        ctx.fillStyle = "#55534a";
        ctx.fill();
        ctx.strokeStyle = "#292f2b";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-22, 3);
        ctx.lineTo(-14, -3);
        ctx.lineTo(14, -3);
        ctx.lineTo(22, 3);
        ctx.lineTo(13, 9);
        ctx.lineTo(-13, 9);
        ctx.closePath();
        ctx.fillStyle = "#777468";
        ctx.fill();
        ctx.strokeStyle = "rgba(228, 220, 188, .48)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = "#666457";
        ctx.beginPath();
        ctx.moveTo(-22, 3);
        ctx.lineTo(-13, 9);
        ctx.lineTo(-13, 17);
        ctx.lineTo(-22, 11);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#46483f";
        ctx.beginPath();
        ctx.moveTo(13, 9);
        ctx.lineTo(22, 3);
        ctx.lineTo(22, 11);
        ctx.lineTo(13, 17);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "rgba(37, 39, 35, .64)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-8, 1); ctx.lineTo(-10, 4); ctx.lineTo(-5, 7);
        ctx.moveTo(7, 1); ctx.lineTo(4, 5); ctx.lineTo(10, 7);
        ctx.moveTo(-18, 8); ctx.lineTo(-14, 6);
        ctx.moveTo(16, 11); ctx.lineTo(19, 9);
        ctx.moveTo(-20, 12); ctx.lineTo(-15, 15);
        ctx.stroke();
    }

    function drawWoodBeam(x1, y1, x2, y2, width, color) {
        ctx.strokeStyle = "#382d24";
        ctx.lineWidth = width + 1.5;
        ctx.lineCap = "square";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawArcherTower() {
        drawWoodBeam(-13, -14, -15, 3, 4, "#63462d");
        drawWoodBeam(13, -14, 15, 3, 4, "#513c29");
        drawWoodBeam(-13, -14, 13, -14, 3.5, "#9a7040");
        drawWoodBeam(-15, 2, 15, 2, 4, "#795735");
        drawWoodBeam(-13, -12, -6, 1, 2.2, "#765333");
        drawWoodBeam(13, -12, 6, 1, 2.2, "#60452e");

        ctx.fillStyle = "#493727";
        ctx.beginPath();
        ctx.moveTo(-19, -4);
        ctx.lineTo(-14, -9);
        ctx.lineTo(14, -9);
        ctx.lineTo(19, -4);
        ctx.lineTo(15, 1);
        ctx.lineTo(-15, 1);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#a17b49";
        ctx.beginPath();
        ctx.moveTo(-19, -5);
        ctx.lineTo(-14, -10);
        ctx.lineTo(14, -10);
        ctx.lineTo(19, -5);
        ctx.lineTo(14, 0);
        ctx.lineTo(-14, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(231, 198, 142, .55)";
        ctx.lineWidth = 1;
        ctx.stroke();
        for (let plank = -13; plank <= 13; plank += 6) {
            ctx.strokeStyle = "rgba(72, 51, 32, .56)";
            ctx.lineWidth = .8;
            ctx.beginPath();
            ctx.moveTo(plank, -8);
            ctx.lineTo(plank, -1);
            ctx.stroke();
        }

        ctx.fillStyle = "#684a2e";
        ctx.beginPath();
        ctx.moveTo(-15, -12);
        ctx.lineTo(-11, -28);
        ctx.lineTo(11, -28);
        ctx.lineTo(15, -12);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#89633a";
        ctx.beginPath();
        ctx.moveTo(-12, -13);
        ctx.lineTo(-9, -25);
        ctx.lineTo(9, -25);
        ctx.lineTo(12, -13);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(217, 177, 115, .45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-7, -23); ctx.lineTo(-6, -14);
        ctx.moveTo(0, -23); ctx.lineTo(0, -13);
        ctx.moveTo(7, -23); ctx.lineTo(6, -14);
        ctx.stroke();

        ctx.fillStyle = "#493727";
        ctx.beginPath();
        ctx.moveTo(-18, -28);
        ctx.lineTo(-13, -34);
        ctx.lineTo(13, -34);
        ctx.lineTo(18, -28);
        ctx.lineTo(13, -24);
        ctx.lineTo(-13, -24);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#a17a47";
        ctx.beginPath();
        ctx.moveTo(-18, -30);
        ctx.lineTo(-13, -37);
        ctx.lineTo(13, -37);
        ctx.lineTo(18, -30);
        ctx.lineTo(13, -26);
        ctx.lineTo(-13, -26);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#513a27";
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.fillStyle = "#55402b";
        for (const merlonX of [-13, -4, 5, 14]) {
            ctx.fillRect(merlonX - 2, -40, 5, 7);
            ctx.fillStyle = "#bd9862";
            ctx.fillRect(merlonX - 2, -40, 5, 1.5);
            ctx.fillStyle = "#55402b";
        }
        drawWoodBeam(-14, -30, 14, -30, 1.5, "#59412d");
        ctx.fillStyle = "#352b22";
        ctx.fillRect(-8, -22, 5, 7);
        ctx.fillRect(4, -22, 5, 7);
        ctx.fillStyle = "#c3a577";
        ctx.fillRect(-7, -21, 1, 5);
        ctx.fillRect(5, -21, 1, 5);
    }

    function drawCannonTower() {
        ctx.fillStyle = "#45463f";
        ctx.beginPath();
        ctx.moveTo(-20, 4);
        ctx.lineTo(-17, -11);
        ctx.lineTo(-10, -17);
        ctx.lineTo(10, -17);
        ctx.lineTo(17, -11);
        ctx.lineTo(20, 4);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#262d2a";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.fillStyle = "#716f62";
        ctx.beginPath();
        ctx.moveTo(-17, -10);
        ctx.lineTo(-10, -18);
        ctx.lineTo(10, -18);
        ctx.lineTo(17, -10);
        ctx.lineTo(11, -5);
        ctx.lineTo(-11, -5);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(224, 216, 184, .38)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.strokeStyle = "rgba(39, 43, 39, .7)";
        ctx.lineWidth = .9;
        ctx.beginPath();
        ctx.moveTo(-14, -10); ctx.lineTo(-10, -14); ctx.lineTo(-5, -13);
        ctx.moveTo(5, -14); ctx.lineTo(10, -11); ctx.lineTo(14, -9);
        ctx.moveTo(-12, -6); ctx.lineTo(-9, -10);
        ctx.stroke();

        ctx.fillStyle = "#63452e";
        ctx.beginPath();
        ctx.moveTo(-12, -6);
        ctx.lineTo(-9, -11);
        ctx.lineTo(9, -11);
        ctx.lineTo(12, -6);
        ctx.lineTo(9, 3);
        ctx.lineTo(-9, 3);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#8c6740";
        ctx.beginPath();
        ctx.moveTo(-12, -7);
        ctx.lineTo(-9, -12);
        ctx.lineTo(9, -12);
        ctx.lineTo(12, -7);
        ctx.lineTo(8, -4);
        ctx.lineTo(-8, -4);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#352c24";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-9, -5); ctx.lineTo(-9, 2);
        ctx.moveTo(9, -5); ctx.lineTo(9, 2);
        ctx.stroke();

        ctx.save();
        ctx.translate(0, -14);
        ctx.rotate(-.58);
        ctx.fillStyle = "#272a28";
        ctx.fillRect(-5.3, -20, 10.6, 24);
        ctx.fillStyle = "#686b63";
        ctx.fillRect(-3.6, -18, 2.2, 19);
        ctx.fillStyle = "#41443f";
        ctx.fillRect(-6.5, -20, 13, 4);
        ctx.fillStyle = "#252a28";
        ctx.beginPath();
        ctx.ellipse(0, -18.5, 5, 2.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#aaa18a";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.strokeStyle = "#302e2a";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-8, 3); ctx.lineTo(-8, 6);
        ctx.moveTo(8, 3); ctx.lineTo(8, 6);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = "#a88a5a";
        ctx.beginPath();
        ctx.arc(-9, -2, 1.8, 0, Math.PI * 2);
        ctx.arc(9, -2, 1.8, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFrostTower() {
        drawWoodBeam(-12, -9, -13, 3, 3.2, "#604631");
        drawWoodBeam(12, -9, 13, 3, 3.2, "#4e3b2b");
        drawWoodBeam(-12, -9, 12, -9, 3.2, "#82603b");
        drawWoodBeam(-13, 2, 13, 2, 3.5, "#61472f");
        drawWoodBeam(-12, -7, -5, 1, 2, "#705132");
        drawWoodBeam(12, -7, 5, 1, 2, "#604631");
        ctx.fillStyle = "#7a6142";
        ctx.beginPath();
        ctx.moveTo(-17, -8);
        ctx.lineTo(-12, -13);
        ctx.lineTo(12, -13);
        ctx.lineTo(17, -8);
        ctx.lineTo(12, -3);
        ctx.lineTo(-12, -3);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#b08a59";
        ctx.fillRect(-11, -12, 22, 2);
        ctx.strokeStyle = "rgba(53, 39, 26, .6)";
        ctx.lineWidth = 1;
        for (let plank = -8; plank <= 8; plank += 5) {
            ctx.beginPath();
            ctx.moveTo(plank, -10);
            ctx.lineTo(plank, -4);
            ctx.stroke();
        }

        ctx.fillStyle = "#554c3e";
        ctx.beginPath();
        ctx.moveTo(-7, -13);
        ctx.lineTo(-9, -29);
        ctx.lineTo(-4, -36);
        ctx.lineTo(5, -34);
        ctx.lineTo(9, -19);
        ctx.lineTo(6, -13);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#344d56";
        ctx.beginPath();
        ctx.moveTo(-3, -39);
        ctx.lineTo(6, -31);
        ctx.lineTo(10, -20);
        ctx.lineTo(5, -14);
        ctx.lineTo(-6, -17);
        ctx.lineTo(-9, -29);
        ctx.closePath();
        ctx.fill();
        const crystal = ctx.createLinearGradient(-8, -28, 8, -28);
        crystal.addColorStop(0, "#568b8c");
        crystal.addColorStop(.46, "#d0e0cb");
        crystal.addColorStop(1, "#5e8a91");
        ctx.fillStyle = crystal;
        ctx.beginPath();
        ctx.moveTo(-3, -39);
        ctx.lineTo(2, -32);
        ctx.lineTo(7, -22);
        ctx.lineTo(4, -16);
        ctx.lineTo(-5, -19);
        ctx.lineTo(-7, -29);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(226, 241, 220, .8)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, -36);
        ctx.lineTo(1, -30);
        ctx.lineTo(3, -24);
        ctx.moveTo(-5, -28);
        ctx.lineTo(1, -26);
        ctx.stroke();
        ctx.strokeStyle = "rgba(179, 214, 210, .55)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-5, -15); ctx.lineTo(0, -12); ctx.lineTo(6, -15);
        ctx.stroke();
    }

    function drawEnemy(enemy) {
        const nextPoint = route[Math.min(enemy.segment + 1, route.length - 1)];
        const direction = Math.atan2(nextPoint.y - enemy.y, nextPoint.x - enemy.x);
        const step = Math.sin(elapsed * 10 + enemy.segment) * Math.min(1, enemy.speed / 65);
        const slowed = enemy.slowTime > 0;
        const cloak = slowed ? "#667f88" : "#51483d";
        const cloakShade = slowed ? "#435d67" : "#39362f";
        const tunic = slowed ? "#8ba6a8" : "#80664b";
        const skin = slowed ? "#b3c9c7" : "#c49b78";

        ctx.fillStyle = "rgba(9, 22, 21, .32)";
        ctx.beginPath();
        ctx.ellipse(enemy.x, enemy.y + 8, 9, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(enemy.x, enemy.y);
        ctx.rotate(direction + Math.PI / 2);

        if (slowed) {
            ctx.strokeStyle = "rgba(190, 225, 232, .5)";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(0, 0, 14, elapsed * 2, elapsed * 2 + Math.PI * 1.45);
            ctx.stroke();
        }

        ctx.strokeStyle = "#302e2a";
        ctx.lineWidth = 2.2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-3, 4);
        ctx.lineTo(-4 + step * 2, 8);
        ctx.lineTo(-7 + step * 2, 9);
        ctx.moveTo(3, 4);
        ctx.lineTo(4 - step * 2, 8);
        ctx.lineTo(7 - step * 2, 9);
        ctx.stroke();

        ctx.fillStyle = "#403a32";
        ctx.beginPath();
        ctx.moveTo(-4, -4);
        ctx.quadraticCurveTo(-9, -5, -10, 0);
        ctx.lineTo(-7, 3);
        ctx.lineTo(-4, 1);
        ctx.moveTo(4, -4);
        ctx.quadraticCurveTo(9, -5, 10, 0);
        ctx.lineTo(7, 3);
        ctx.lineTo(4, 1);
        ctx.fill();
        ctx.strokeStyle = "#302e2a";
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.fillStyle = tunic;
        ctx.beginPath();
        ctx.moveTo(-4, -5);
        ctx.lineTo(-5, -3);
        ctx.lineTo(-6, 3);
        ctx.lineTo(-3, 5);
        ctx.lineTo(3, 5);
        ctx.lineTo(6, 3);
        ctx.lineTo(5, -3);
        ctx.lineTo(4, -5);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#39332c";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = cloak;
        ctx.beginPath();
        ctx.moveTo(-4, -4);
        ctx.lineTo(-8, -2);
        ctx.lineTo(-9, 4);
        ctx.lineTo(-7, 7);
        ctx.lineTo(7, 7);
        ctx.lineTo(9, 4);
        ctx.lineTo(8, -2);
        ctx.lineTo(4, -4);
        ctx.lineTo(3, 2);
        ctx.lineTo(-3, 2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = cloakShade;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.strokeStyle = "#c0a475";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-5, 2);
        ctx.lineTo(5, 2);
        ctx.stroke();
        ctx.fillStyle = "#d1b782";
        ctx.beginPath();
        ctx.fillRect(-1, 1, 2, 2);

        ctx.fillStyle = skin;
        ctx.beginPath();
        ctx.arc(0, -8, 4.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = cloakShade;
        ctx.beginPath();
        ctx.moveTo(-5, -8);
        ctx.quadraticCurveTo(-5, -14, 0, -14);
        ctx.quadraticCurveTo(5, -14, 5, -8);
        ctx.lineTo(3, -9);
        ctx.lineTo(0, -10);
        ctx.lineTo(-3, -9);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#302e2a";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = skin;
        ctx.beginPath();
        ctx.moveTo(-3, -8);
        ctx.lineTo(3, -8);
        ctx.lineTo(2, -5);
        ctx.lineTo(-2, -5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#453a32";
        ctx.fillRect(1, -7, 1.2, 1);
        ctx.restore();

        const health = Math.max(0, enemy.hp / enemy.maxHp);
        ctx.fillStyle = "rgba(13, 24, 24, .86)";
        ctx.fillRect(enemy.x - 10, enemy.y - 23, 20, 4);
        ctx.fillStyle = health > .45 ? "#8de09a" : "#f2c56f";
        ctx.fillRect(enemy.x - 9, enemy.y - 22, 18 * health, 2);
        ctx.strokeStyle = "rgba(244, 246, 222, .68)";
        ctx.lineWidth = .7;
        ctx.strokeRect(enemy.x - 10, enemy.y - 23, 20, 4);
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
