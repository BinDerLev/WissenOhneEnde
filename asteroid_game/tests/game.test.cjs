const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadGame() {
    const elements = new Map();
    function element(id = '') {
        const classes = new Set();
        return {
            id, dataset: {}, hidden: false, disabled: false, textContent: '', attributes: {}, listeners: {},
            classList: {
                add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name),
                toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); }
            },
            addEventListener(type, callback) { this.listeners[type] = callback; },
            setAttribute(name, value) { this.attributes[name] = value; },
            focus() {}, setPointerCapture() {},
            matches() { return false; }
        };
    }
    const get = id => {
        if (!elements.has(id)) elements.set(id, element(id));
        return elements.get(id);
    };
    const canvas = get('gameCanvas');
    Object.assign(canvas, {
        width: 1000, height: 640,
        getBoundingClientRect: () => ({ width: 1000, height: 640 }),
        getContext: () => new Proxy({}, { get: () => () => {} })
    });
    const fire = element('touchFire');
    fire.dataset.action = 'shoot';
    const left = element('touchLeft');
    left.dataset.key = 'arrowleft';
    const document = {
        getElementById: get,
        querySelector: () => get('coordinate'),
        querySelectorAll: selector => selector === '#ammo i' ? Array.from({ length: 4 }, element) : [fire, left],
        addEventListener(type, callback) { this[type] = callback; },
        body: element('body')
    };
    let now = 0;
    const frames = new Map();
    let frameNumber = 0;
    const round = { finishes: 0, restarts: 0, finish() { this.finishes++; }, restart() { this.restarts++; } };
    const sandbox = {
        document,
        window: { matchMedia: () => ({ matches: true }), addEventListener() {}, GameRoundSession: round },
        localStorage: { getItem: () => null, setItem() {} },
        performance: { now: () => now },
        requestAnimationFrame: fn => { frames.set(++frameNumber, fn); return frameNumber; },
        cancelAnimationFrame: id => frames.delete(id),
        setTimeout: () => 1, clearTimeout() {},
        ResizeObserver: class { observe() {} },
        alert() { assert.fail('Blocking alert must never be shown'); }
    };
    const context = vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(`${__dirname}/../script.js`, 'utf8'), context);
    return {
        run: code => vm.runInContext(code, context),
        at: time => { now = time; },
        document, get, round, frames, fire, left
    };
}

test('all input paths share the 5/s cooldown and four-projectile cap', () => {
    const game = loadGame();
    game.run('startGame(); shoot();');
    assert.equal(game.run('bullets.length'), 1);
    game.at(199);
    game.run('shoot()');
    assert.equal(game.run('bullets.length'), 1);
    game.at(200);
    game.fire.listeners.pointerdown({ preventDefault() {}, pointerId: 1 });
    assert.equal(game.run('bullets.length'), 2);
    game.at(400);
    game.run('shoot()');
    game.at(600);
    game.run('shoot()');
    game.at(800);
    game.run('shoot()');
    assert.equal(game.run('bullets.length'), 4);
    game.run('bullets.pop(); shoot()');
    assert.equal(game.run('bullets.length'), 4);
    game.run('bullets.pop()');
    game.at(999);
    game.run('shoot()');
    assert.equal(game.run('bullets.length'), 3);
    game.at(1000);
    game.run('shoot()');
    assert.equal(game.run('bullets.length'), 4);
});

test('held keyboard and touch fire work without relying on key repeat', () => {
    const game = loadGame();
    game.run('startGame(); asteroids = [createAsteroid(20, 20, 3, 0, 0)];');
    const event = { key: ' ', repeat: false, preventDefault() {}, target: { matches: () => false } };
    game.document.keydown(event);
    assert.equal(game.run('bullets.length'), 1);
    game.at(200);
    game.run('update()');
    assert.equal(game.run('bullets.length'), 2);
    game.document.keyup(event);
    game.at(400);
    game.run('update()');
    assert.equal(game.run('bullets.length'), 2);
    game.fire.listeners.pointerdown({ preventDefault() {}, pointerId: 3 });
    game.at(600);
    game.run('update()');
    assert.equal(game.run('bullets.length'), 4);
    game.fire.listeners.pointercancel({ pointerId: 3 });
    assert.equal(game.run('fireHeld()'), false);
});

test('large and small UFOs have different sizes, rewards and targeting', () => {
    const game = loadGame();
    game.run('spawnUfo(); spawnUfo();');
    assert.equal(game.run('ufos[0].type'), 'large');
    assert.equal(game.run('ufos[1].type'), 'small');
    assert.ok(game.run('ufos[0].radius > ufos[1].radius'));
    assert.equal(game.run('ufos[0].points'), 200);
    assert.equal(game.run('ufos[1].points'), 1000);
    game.run('Math.random = () => 0.5; ship.x = 600; ship.y = 300; ufos.forEach(u => { u.x = 100; u.y = 300; }); fireUfo(ufos[0]); fireUfo(ufos[1]);');
    assert.ok(game.run('enemyBullets[0].vx < 0'));
    assert.ok(game.run('enemyBullets[1].vx > 0'));
    assert.ok(Math.abs(game.run('enemyBullets[1].vy')) < 1e-10);
});

test('UFOs enter during a wave, fire and leave the playfield', () => {
    const game = loadGame();
    game.run('startGame(); asteroids = [createAsteroid(500, 20, 3, 0, 0)]; ufoTimer = 1; update();');
    assert.equal(game.run('ufos.length'), 1);
    game.run('ufos[0].x = 100; ufos[0].y = 150; ufos[0].shotTimer = 1; update();');
    assert.equal(game.run('enemyBullets.length'), 1);
    game.run('ufos[0].x = canvas.width + 200; update();');
    assert.equal(game.run('ufos.length'), 0);
    assert.ok(game.run('ufoTimer > 0'));
});

for (const [type, points] of [['large', 200], ['small', 1000]]) {
    test(`shooting a ${type} UFO awards ${points} points once`, () => {
        const game = loadGame();
        game.run(`startGame(); asteroids = [createAsteroid(20, 20, 3, 0, 0)]; spawnUfo('${type}'); Object.assign(ufos[0], { x: 400, y: 100, vx: 0, vy: 0 }); bullets = [{ x: 400, y: 100, vx: 0, vy: 0, lifetime: 20 }]; update();`);
        assert.equal(game.run('score'), points);
        assert.equal(game.run('ufos.length'), 0);
        assert.equal(game.run('bullets.length'), 0);
    });
}

test('enemy shots split asteroids without awarding player points', () => {
    const game = loadGame();
    game.run('startGame(); asteroids = [createAsteroid(20, 20, 3, 0, 0)]; enemyBullets = [{ x: 20, y: 20, vx: 0, vy: 0, lifetime: 20 }]; update();');
    assert.equal(game.run('score'), 0);
    assert.equal(game.run('asteroids.length'), 2);
    assert.equal(game.run('enemyBullets.length'), 0);
});

test('multiple simultaneous collisions cost one life and grant a respawn shield', () => {
    const game = loadGame();
    game.run('startGame(); invulnerableTimer = 0; asteroids = [createAsteroid(ship.x, ship.y, 3, 0, 0), createAsteroid(ship.x, ship.y, 3, 0, 0)]; update();');
    assert.equal(game.run('lives'), 2);
    game.run('update()');
    assert.equal(game.run('lives'), 2);
    game.run('invulnerableTimer = 0; enemyBullets = [{ x: ship.x, y: ship.y, vx: 0, vy: 0, lifetime: 20 }]; update();');
    assert.equal(game.run('lives'), 1);
});

test('wave transitions continue without alerts, waiting until UFOs are gone', () => {
    const game = loadGame();
    game.run('startGame(); asteroids = []; spawnUfo(); ufos[0].x = 100; update();');
    assert.equal(game.run('wave'), 1);
    game.run('ufos = []; update();');
    assert.equal(game.run('wave'), 2);
    assert.equal(game.run('state'), 'running');
    assert.ok(game.run('asteroids.length > 0'));
    assert.equal(game.get('gameOverlay').hidden, true);
    assert.match(game.get('gameNotice').textContent, /Welle 2/);
});

test('pause clears held inputs, freezes simulation and resumes with one loop', () => {
    const game = loadGame();
    game.run('startGame(); keys.add(" "); togglePause();');
    assert.equal(game.run('state'), 'paused');
    assert.equal(game.frames.size, 0);
    assert.equal(game.run('fireHeld()'), false);
    game.at(1000);
    game.run('shoot(); update();');
    assert.equal(game.run('tick'), 0);
    assert.equal(game.run('bullets.length'), 0);
    game.run('togglePause()');
    assert.equal(game.frames.size, 1);
    assert.equal(game.run('state'), 'running');
});

test('reset cancels a finished round and clears UFOs, shots and sector display', () => {
    const game = loadGame();
    game.run('startGame(); endGame();');
    assert.equal(game.round.finishes, 1);
    game.run('resetGame()');
    assert.equal(game.round.restarts, 1);
    assert.equal(game.run('state'), 'ready');
    assert.equal(game.run('lives'), 3);
    assert.equal(game.run('wave'), 1);
    assert.equal(game.run('ufos.length + enemyBullets.length + bullets.length'), 0);
    assert.equal(game.frames.size, 0);
    assert.equal(game.get('coordinate').textContent, 'SECTOR / 001');
    game.run('startGame()');
    assert.equal(game.frames.size, 1);
});

test('fullscreen falls back to window fill and exits with Esc', async () => {
    const game = loadGame();
    await game.run('toggleFullscreen()');
    assert.equal(game.get('gameShell').classList.contains('is-expanded'), true);
    assert.equal(game.get('fullscreenBtn').attributes['aria-pressed'], 'true');
    game.document.keydown({ key: 'Escape' });
    assert.equal(game.get('gameShell').classList.contains('is-expanded'), false);
    assert.equal(game.get('fullscreenBtn').attributes['aria-pressed'], 'false');
});

test('native fullscreen opens and exits through the browser API', async () => {
    const game = loadGame();
    game.get('gameShell').requestFullscreen = async () => { game.document.fullscreenElement = game.get('gameShell'); };
    game.document.exitFullscreen = async () => { game.document.fullscreenElement = null; };
    await game.run('toggleFullscreen()');
    assert.equal(game.document.fullscreenElement, game.get('gameShell'));
    assert.equal(game.get('fullscreenBtn').attributes['aria-pressed'], 'true');
    await game.run('toggleFullscreen()');
    assert.equal(game.document.fullscreenElement, null);
    assert.equal(game.get('fullscreenBtn').attributes['aria-pressed'], 'false');
});

test('resizing the arena fills its space and preserves relative object positions', () => {
    const game = loadGame();
    game.get('gameCanvas').getBoundingClientRect = () => ({ width: 1600, height: 800 });
    game.run('resizeArena()');
    assert.equal(game.run('canvas.width'), 1600);
    assert.equal(game.run('canvas.height'), 800);
    assert.equal(game.run('ship.x'), 800);
    assert.equal(game.run('ship.y'), 400);
});
