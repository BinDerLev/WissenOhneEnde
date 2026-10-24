const menuScreen = document.getElementById('menuScreen');
const gameScreen = document.getElementById('gameScreen');
const gameBoard = document.getElementById('gameBoard');
const gameTitle = document.getElementById('gameTitle');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const newGameBtn = document.getElementById('newGameBtn');
const menuBtn = document.getElementById('menuBtn');
const gameInstructions = document.getElementById('gameInstructions');

let currentGame = null;
let gameMode = 'pvp'; // 'pvp' or 'pva'
let playerScore = 0;
let aiScore = 0;

// Game state
let board = [];
let currentPlayer = 'X';
let gameOver = false;
let gameWon = false;

// Event listeners
newGameBtn.addEventListener('click', newGame);
menuBtn.addEventListener('click', backToMenu);

function selectGame(game) {
    currentGame = game;
    menuScreen.classList.remove('active');
    gameScreen.classList.add('active');

    if (game === 'tictactoe') {
        gameTitle.textContent = '❌ Tic-Tac-Toe';
        gameInstructions.textContent = 'Wer zuerst 3 in einer Reihe hat, gewinnt!';
        document.getElementById('scoreBox').style.display = 'none';
    } else {
        gameTitle.textContent = '🟡 Vier Gewinnt';
        gameInstructions.textContent = 'Wer zuerst 4 in einer Reihe hat, gewinnt! Klicke auf die Spalte, um einen Stein zu werfen.';
        document.getElementById('scoreBox').style.display = 'block';
    }

    newGame();
}

function changeGameMode(mode) {
    gameMode = mode;
    if (gameOver || gameWon) {
        newGame();
    }
}

function backToMenu() {
    menuScreen.classList.add('active');
    gameScreen.classList.remove('active');
    currentGame = null;
}

function newGame() {
    if (currentGame === 'tictactoe') {
        initTicTacToe();
    } else {
        initConnect4();
    }
}

// ==================== TIC-TAC-TOE ====================

function initTicTacToe() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    gameWon = false;

    gameBoard.className = 'game-board tictactoe';
    gameBoard.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'game-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleTicTacToeClick(i));
        gameBoard.appendChild(cell);
    }

    updateTicTacToeDisplay();
}

function handleTicTacToeClick(index) {
    if (gameOver || gameWon || board[index] !== '') return;

    // Player move
    board[index] = currentPlayer;

    if (checkTicTacToeWin()) {
        const message = gameMode === 'pva' && currentPlayer === 'O'
            ? '😢 AI hat gewonnen!'
            : '🎉 Du hast gewonnen!';
        showMessage(message, '');
        if (currentPlayer === 'X') playerScore++;
        else if (gameMode === 'pva') aiScore++;
        gameWon = true;
        updateDisplay();
        return;
    }

    if (isTicTacToeFull()) {
        showMessage('🤝 Unentschieden!', '');
        gameOver = true;
        updateDisplay();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTicTacToeDisplay();

    if (gameMode === 'pva' && currentPlayer === 'O') {
        setTimeout(() => {
            aiMoveTicTacToe();
        }, 500);
    }
}

function aiMoveTicTacToe() {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove !== -1) {
        board[bestMove] = 'O';

        if (checkTicTacToeWin()) {
            showMessage('😢 AI hat gewonnen!', '');
            aiScore++;
            gameWon = true;
            updateDisplay();
            return;
        }

        if (isTicTacToeFull()) {
            showMessage('🤝 Unentschieden!', '');
            gameOver = true;
            updateDisplay();
            return;
        }
    }

    currentPlayer = 'X';
    updateTicTacToeDisplay();
}

function minimax(board, depth, isMaximizing) {
    let winner = checkTicTacToeWinnerMinimax(board);

    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (isTicTacToeFull()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkTicTacToeWinnerMinimax(board) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        if (board[condition[0]] !== '' &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]]) {
            return board[condition[0]];
        }
    }
    return null;
}

function checkTicTacToeWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        if (board[condition[0]] !== '' &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]]) {
            return true;
        }
    }
    return false;
}

function isTicTacToeFull() {
    return board.every(cell => cell !== '');
}

function updateTicTacToeDisplay() {
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.className = 'game-cell';
        if (board[index]) {
            cell.classList.add(board[index].toLowerCase());
        }
    });

    if (gameMode === 'pva') {
        currentPlayerDisplay.textContent = currentPlayer === 'X' ? 'Dein Zug: X' : 'AI: O';
    } else {
        currentPlayerDisplay.textContent = `Spieler: ${currentPlayer}`;
    }
}

// ==================== CONNECT 4 ====================

function initConnect4() {
    board = Array(42).fill('');
    currentPlayer = 'X';
    gameOver = false;
    gameWon = false;

    gameBoard.className = 'game-board connect4';
    gameBoard.innerHTML = '';

    for (let i = 0; i < 42; i++) {
        const cell = document.createElement('button');
        cell.className = 'game-cell connect4';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleConnect4Click(i));
        gameBoard.appendChild(cell);
    }

    updateConnect4Display();
}

function handleConnect4Click(index) {
    if (gameOver || gameWon) return;

    // Calculate column
    const col = index % 7;

    // Find lowest row in this column
    let row = 5;
    while (row >= 0 && board[row * 7 + col] !== '') {
        row--;
    }

    if (row < 0) return; // Column is full

    const cellIndex = row * 7 + col;
    board[cellIndex] = currentPlayer;

    if (checkConnect4Win()) {
        const message = gameMode === 'pva' && currentPlayer === 'O'
            ? '😢 AI hat gewonnen!'
            : '🎉 Du hast gewonnen!';
        showMessage(message, '');
        if (currentPlayer === 'X') playerScore++;
        else if (gameMode === 'pva') aiScore++;
        gameWon = true;
        updateDisplay();
        return;
    }

    if (isConnect4Full()) {
        showMessage('🤝 Unentschieden!', '');
        gameOver = true;
        updateDisplay();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateConnect4Display();

    if (gameMode === 'pva' && currentPlayer === 'O') {
        setTimeout(() => {
            aiMoveConnect4();
        }, 500);
    }
}

function aiMoveConnect4() {
    let bestScore = -Infinity;
    let bestCol = -1;

    for (let col = 0; col < 7; col++) {
        let row = 5;
        while (row >= 0 && board[row * 7 + col] !== '') {
            row--;
        }

        if (row >= 0) {
            board[row * 7 + col] = 'O';
            let score = evaluateConnect4Position();
            board[row * 7 + col] = '';

            if (score > bestScore) {
                bestScore = score;
                bestCol = col;
            }
        }
    }

    if (bestCol !== -1) {
        let row = 5;
        while (row >= 0 && board[row * 7 + bestCol] !== '') {
            row--;
        }

        if (row >= 0) {
            board[row * 7 + bestCol] = 'O';

            if (checkConnect4Win()) {
                showMessage('😢 AI hat gewonnen!', '');
                aiScore++;
                gameWon = true;
                updateDisplay();
                return;
            }

            if (isConnect4Full()) {
                showMessage('🤝 Unentschieden!', '');
                gameOver = true;
                updateDisplay();
                return;
            }
        }
    }

    currentPlayer = 'X';
    updateConnect4Display();
}

function evaluateConnect4Position() {
    let score = 0;

    // Check rows
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            const idx = row * 7 + col;
            score += countConnect4(idx, 1, 0); // Horizontal
        }
    }

    // Check columns
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            const idx = row * 7 + col;
            score += countConnect4(idx, 0, 1); // Vertical
        }
    }

    return score;
}

function countConnect4(startIdx, dx, dy) {
    let aiCount = 0;
    let playerCount = 0;
    let emptyCount = 0;

    for (let i = 0; i < 4; i++) {
        const row = Math.floor(startIdx / 7) + (dy * i);
        const col = (startIdx % 7) + (dx * i);

        if (row < 0 || row > 5 || col < 0 || col > 6) break;

        const idx = row * 7 + col;
        if (board[idx] === 'O') aiCount++;
        else if (board[idx] === 'X') playerCount++;
        else emptyCount++;
    }

    if (playerCount > 0 && aiCount > 0) return 0;

    if (aiCount === 4) return 1000;
    if (aiCount === 3 && emptyCount === 1) return 50;
    if (aiCount === 2 && emptyCount === 2) return 10;
    if (aiCount === 1 && emptyCount === 3) return 1;

    if (playerCount === 4) return -1000;
    if (playerCount === 3 && emptyCount === 1) return -50;
    if (playerCount === 2 && emptyCount === 2) return -10;

    return 0;
}

function checkConnect4Win() {
    // Check horizontal
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            const idx = row * 7 + col;
            if (board[idx] !== '' &&
                board[idx] === board[idx + 1] &&
                board[idx] === board[idx + 2] &&
                board[idx] === board[idx + 3]) {
                return true;
            }
        }
    }

    // Check vertical
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            const idx = row * 7 + col;
            if (board[idx] !== '' &&
                board[idx] === board[idx + 7] &&
                board[idx] === board[idx + 14] &&
                board[idx] === board[idx + 21]) {
                return true;
            }
        }
    }

    // Check diagonal (top-left to bottom-right)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            const idx = row * 7 + col;
            if (board[idx] !== '' &&
                board[idx] === board[idx + 8] &&
                board[idx] === board[idx + 16] &&
                board[idx] === board[idx + 24]) {
                return true;
            }
        }
    }

    // Check diagonal (top-right to bottom-left)
    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < 7; col++) {
            const idx = row * 7 + col;
            if (board[idx] !== '' &&
                board[idx] === board[idx + 6] &&
                board[idx] === board[idx + 12] &&
                board[idx] === board[idx + 18]) {
                return true;
            }
        }
    }

    return false;
}

function isConnect4Full() {
    return board.every(cell => cell !== '');
}

function updateConnect4Display() {
    const cells = document.querySelectorAll('.game-cell.connect4');
    cells.forEach((cell, index) => {
        cell.className = 'game-cell connect4';
        if (board[index]) {
            cell.classList.add(board[index].toLowerCase());
        }
    });

    if (gameMode === 'pva') {
        currentPlayerDisplay.textContent = currentPlayer === 'X' ? 'Dein Zug: 🔴 (Rot)' : 'AI: 🟡 (Gelb)';
    } else {
        currentPlayerDisplay.textContent = `Spieler: ${currentPlayer === 'X' ? '🔴 (Rot)' : '🟡 (Gelb)'}`;
    }
}

function updateDisplay() {
    if (currentGame === 'tictactoe') {
        updateTicTacToeDisplay();
    } else {
        document.getElementById('playerScore').textContent = playerScore;
        document.getElementById('aiScore').textContent = aiScore;
        updateConnect4Display();
    }
}

function showMessage(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'message-overlay';

    const box = document.createElement('div');
    box.className = 'message-box';

    const heading = document.createElement('h2');
    heading.textContent = title;

    const btn = document.createElement('button');
    btn.className = 'btn btn-new';
    btn.textContent = 'Nächstes Spiel';
    btn.addEventListener('click', () => {
        overlay.remove();
        newGame();
    });

    box.appendChild(heading);
    if (message) {
        const msg = document.createElement('p');
        msg.innerHTML = message;
        box.appendChild(msg);
    }
    box.appendChild(btn);
    overlay.appendChild(box);

    document.body.appendChild(overlay);
}

// Start
initTicTacToe();





