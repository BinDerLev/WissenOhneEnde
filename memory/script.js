const cardSets = {
    easy: { pairs: 8, columns: 4 },
    normal: { pairs: 10, columns: 4 },
    hard: { pairs: 18, columns: 6 }
};
const symbols = ['🍎', '🚀', '🐱', '🌈', '⚽', '🍀', '🎸', '🦋', '🍉', '⭐', '🐳', '🎈', '🍩', '🌻', '🦊', '🎮', '🍓', '🚲'];
const board = document.getElementById('game-board');
const difficulty = document.getElementById('difficulty');
const dailyButton = document.getElementById('daily-button');
const restartButton = document.getElementById('restart-button');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const matchesElement = document.getElementById('matches');
const bestElement = document.getElementById('best-score');
const dailyStatusElement = document.getElementById('daily-status');
const messageElement = document.getElementById('game-message');
const bestScoreKey = 'memory-best-score';
const dailyRecordsKey = 'memory-daily-records';

let deck = [];
let flipped = [];
let matchedPairs = 0;
let moves = 0;
let elapsedSeconds = 0;
let timer = null;
let mismatchTimeout = null;
let locked = false;
let dailyMode = false;
let activeDailyDate = null;
let activeDailyDifficulty = null;
let gameFinished = false;

function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
    }
    return items;
}

function shuffleWithSeed(items, seed) {
    let state = seed >>> 0;
    const random = () => {
        state = (state + 0x6D2B79F5) | 0;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };

    for (let index = items.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(random() * (index + 1));
        [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
    }
    return items;
}

function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(dateKey) {
    const [year, month, day] = dateKey.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getDailySeed(dateKey, difficultyName) {
    const seedText = `${dateKey}:${difficultyName}`;
    let seed = 2166136261;
    for (let index = 0; index < seedText.length; index += 1) {
        seed ^= seedText.charCodeAt(index);
        seed = Math.imul(seed, 16777619);
    }
    return seed >>> 0;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainder = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainder}`;
}

function readBestScore() {
    const score = Number(localStorage.getItem(bestScoreKey));
    return Number.isFinite(score) && score > 0 ? score : 0;
}

function readDailyRecords() {
    try {
        const records = JSON.parse(localStorage.getItem(dailyRecordsKey) || '{}');
        return records && typeof records === 'object' && !Array.isArray(records) ? records : {};
    } catch {
        return {};
    }
}

function readDailyRecord(dateKey, difficultyName) {
    const record = readDailyRecords()[dateKey]?.[difficultyName];
    if (!record || typeof record !== 'object') return { bestScore: 0, completed: false };
    const bestScore = Number(record.bestScore);
    return {
        bestScore: Number.isFinite(bestScore) && bestScore > 0 ? bestScore : 0,
        completed: record.completed === true
    };
}

function saveDailyCompletion(dateKey, difficultyName, score) {
    const records = readDailyRecords();
    const dayRecords = records[dateKey] && typeof records[dateKey] === 'object'
        ? records[dateKey]
        : {};
    const previousRecord = readDailyRecord(dateKey, difficultyName);
    dayRecords[difficultyName] = {
        bestScore: Math.max(previousRecord.bestScore, score),
        completed: true
    };
    records[dateKey] = dayRecords;
    try {
        localStorage.setItem(dailyRecordsKey, JSON.stringify(records));
    } catch {
        // The game can still finish if local storage is unavailable or full.
    }
    return dayRecords[difficultyName];
}

function renderDailyStatus() {
    const dateKey = dailyMode && activeDailyDate ? activeDailyDate : getLocalDateKey();
    const difficultyName = dailyMode && activeDailyDifficulty
        ? activeDailyDifficulty
        : difficulty.value;
    const record = readDailyRecord(dateKey, difficultyName);
    let status = record.completed ? 'Abgeschlossen' : 'Noch nicht abgeschlossen';
    if (dailyMode && activeDailyDate === dateKey && !gameFinished && !record.completed) {
        status = 'In Bearbeitung';
    }
    const best = record.bestScore ? `${record.bestScore} Pkt.` : '–';
    const difficultyLabel = { easy: 'Leicht', normal: 'Normal', hard: 'Schwer' }[difficultyName];
    dailyStatusElement.textContent =
        `Tages-Challenge (${difficultyLabel}) · ${formatDate(dateKey)}: ${status} · Tagesbestleistung: ${best}`;
}

function renderStats() {
    movesElement.textContent = String(moves);
    timeElement.textContent = formatTime(elapsedSeconds);
    matchesElement.textContent = `${matchedPairs} / ${cardSets[difficulty.value].pairs}`;
    const best = readBestScore();
    bestElement.textContent = best ? `${best} Pkt.` : '–';
    renderDailyStatus();
}

function startTimer() {
    if (timer !== null) return;
    timer = window.setInterval(() => {
        elapsedSeconds += 1;
        timeElement.textContent = formatTime(elapsedSeconds);
    }, 1000);
}

function revealCard(card, symbol, index) {
    card.classList.add('is-revealed');
    card.textContent = symbol;
    card.setAttribute('aria-label', `Karte ${index + 1}: ${symbol}, aufgedeckt`);
}

function hideCard(card, index) {
    card.classList.remove('is-revealed');
    card.textContent = '?';
    card.setAttribute('aria-label', `Karte ${index + 1}, verdeckt`);
}

function finishGame() {
    window.clearInterval(timer);
    timer = null;
    gameFinished = true;
    difficulty.disabled = true;
    dailyButton.disabled = true;
    restartButton.disabled = true;
    const score = Math.max(0, deck.length / 2 * 100 - moves * 10 - elapsedSeconds);
    const previousBest = readBestScore();
    const newAllTimeBest = score > previousBest;
    if (newAllTimeBest) {
        localStorage.setItem(bestScoreKey, String(score));
    }

    if (dailyMode && activeDailyDate) {
        const dailyRecord = saveDailyCompletion(activeDailyDate, activeDailyDifficulty, score);
        const allTimeMessage = newAllTimeBest ? ' Neuer Allzeitrekord!' : '';
        messageElement.textContent =
            `Tages-Challenge vom ${formatDate(activeDailyDate)} abgeschlossen in ${formatTime(elapsedSeconds)} mit ${moves} Zügen – Tagesbestleistung: ${dailyRecord.bestScore} Punkte.${allTimeMessage}`;
    } else if (newAllTimeBest) {
        messageElement.textContent = `Geschafft in ${formatTime(elapsedSeconds)} mit ${moves} Zügen – neuer Rekord: ${score} Punkte!`;
    } else {
        messageElement.textContent = `Geschafft in ${formatTime(elapsedSeconds)} mit ${moves} Zügen – du erreichst ${score} Punkte.`;
    }
    renderStats();
    window.GameRoundSession.finish(true);
}

function chooseCard(card, index) {
    if (gameFinished || locked || card.classList.contains('is-revealed') || card.classList.contains('is-matched')) return;
    startTimer();
    revealCard(card, deck[index], index);
    flipped.push({ card, index, symbol: deck[index] });

    if (flipped.length < 2) return;
    moves += 1;
    locked = true;
    const [first, second] = flipped;
    if (first.symbol === second.symbol) {
        first.card.classList.add('is-matched');
        second.card.classList.add('is-matched');
        first.card.disabled = true;
        second.card.disabled = true;
        matchedPairs += 1;
        flipped = [];
        locked = false;
        renderStats();
        if (matchedPairs === deck.length / 2) finishGame();
        else messageElement.textContent = 'Ein Paar gefunden! Weiter so.';
        return;
    }

    messageElement.textContent = 'Kein Paar – merk dir die Karten gut.';
    mismatchTimeout = window.setTimeout(() => {
        hideCard(first.card, first.index);
        hideCard(second.card, second.index);
        flipped = [];
        locked = false;
        mismatchTimeout = null;
    }, 850);
    renderStats();
}

function newGame() {
    if (gameFinished) return;
    if (timer !== null) window.clearInterval(timer);
    if (mismatchTimeout !== null) window.clearTimeout(mismatchTimeout);
    timer = null;
    mismatchTimeout = null;
    const settings = cardSets[difficulty.value];
    activeDailyDate = dailyMode ? getLocalDateKey() : null;
    activeDailyDifficulty = dailyMode ? difficulty.value : null;
    gameFinished = false;
    const cards = [...symbols.slice(0, settings.pairs), ...symbols.slice(0, settings.pairs)];
    deck = dailyMode
        ? shuffleWithSeed(cards, getDailySeed(activeDailyDate, difficulty.value))
        : shuffle(cards);
    flipped = [];
    matchedPairs = 0;
    moves = 0;
    elapsedSeconds = 0;
    locked = false;
    board.style.setProperty('--columns', String(settings.columns));
    board.dataset.size = difficulty.value;
    board.replaceChildren();

    deck.forEach((symbol, index) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.type = 'button';
        card.textContent = '?';
        card.setAttribute('aria-label', `Karte ${index + 1}, verdeckt`);
        card.addEventListener('click', () => chooseCard(card, index));
        board.appendChild(card);
    });

    messageElement.textContent = 'Wähle zwei Karten und finde alle Paare.';
    dailyButton.textContent = dailyMode ? 'Zum normalen Spiel' : 'Tages-Challenge';
    dailyButton.setAttribute('aria-pressed', String(dailyMode));
    renderStats();
}

restartButton.addEventListener('click', newGame);
difficulty.addEventListener('change', newGame);
dailyButton.addEventListener('click', () => {
    if (gameFinished) return;
    dailyMode = !dailyMode;
    newGame();
});
newGame();
