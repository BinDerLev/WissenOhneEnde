const cardSets = {
    easy: { pairs: 8, columns: 4 },
    normal: { pairs: 10, columns: 4 },
    hard: { pairs: 18, columns: 6 }
};
const symbols = ['🍎', '🚀', '🐱', '🌈', '⚽', '🍀', '🎸', '🦋', '🍉', '⭐', '🐳', '🎈', '🍩', '🌻', '🦊', '🎮', '🍓', '🚲'];
const board = document.getElementById('game-board');
const difficulty = document.getElementById('difficulty');
const restartButton = document.getElementById('restart-button');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const matchesElement = document.getElementById('matches');
const bestElement = document.getElementById('best-score');
const messageElement = document.getElementById('game-message');
const bestScoreKey = 'memory-best-score';

let deck = [];
let flipped = [];
let matchedPairs = 0;
let moves = 0;
let elapsedSeconds = 0;
let timer = null;
let mismatchTimeout = null;
let locked = false;

function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
    }
    return items;
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

function renderStats() {
    movesElement.textContent = String(moves);
    timeElement.textContent = formatTime(elapsedSeconds);
    matchesElement.textContent = `${matchedPairs} / ${cardSets[difficulty.value].pairs}`;
    const best = readBestScore();
    bestElement.textContent = best ? `${best} Pkt.` : '–';
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
    const score = Math.max(0, deck.length / 2 * 100 - moves * 10 - elapsedSeconds);
    const previousBest = readBestScore();
    if (score > previousBest) {
        localStorage.setItem(bestScoreKey, String(score));
        messageElement.textContent = `Geschafft in ${formatTime(elapsedSeconds)} mit ${moves} Zügen – neuer Rekord: ${score} Punkte!`;
    } else {
        messageElement.textContent = `Geschafft in ${formatTime(elapsedSeconds)} mit ${moves} Zügen – du erreichst ${score} Punkte.`;
    }
    renderStats();
}

function chooseCard(card, index) {
    if (locked || card.classList.contains('is-revealed') || card.classList.contains('is-matched')) return;
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
    if (timer !== null) window.clearInterval(timer);
    if (mismatchTimeout !== null) window.clearTimeout(mismatchTimeout);
    timer = null;
    mismatchTimeout = null;
    const settings = cardSets[difficulty.value];
    deck = shuffle([...symbols.slice(0, settings.pairs), ...symbols.slice(0, settings.pairs)]);
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
    renderStats();
}

restartButton.addEventListener('click', newGame);
difficulty.addEventListener('change', newGame);
newGame();
