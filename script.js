// ============================================
// GAMEHUB - INTERACTIVE FUNCTIONALITY
// ============================================
// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const gameCatalog = [
    {
        href: 'gefangen_unter_wasser/index.html',
        image: 'gefangen_unter_wasser/logo_creepy.svg',
        imageAlt: 'Gefangen Unter Wasser',
        title: 'Gefangen Unter Wasser',
        type: 'Abenteuer • Puzzle',
        description: 'Tauche in eine mysteriöse Unterwasserwelt ein, löse Rätsel und find den Schatz!',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['adventure'],
        tags: ['Abenteuer', 'Rätsel']
    },
    {
        href: 'chess/index.html',
        image: 'chess/logo.svg',
        imageAlt: 'Schach',
        title: 'Schach',
        type: 'Strategie',
        description: 'Spiele gegen eine intelligente KI in drei verschiedenen Schwierigkeitsstufen!',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['strategy'],
        tags: ['Strategie', 'KI']
    },
    {
        href: 'snake_game/index.html',
        image: 'snake_game/logo.svg',
        imageAlt: 'Snake Game',
        title: 'Snake Game',
        type: 'Action • Klassiker',
        description: 'Das legendäre Snake-Spiel! Lenke die Schlange und sammle so viel Futter wie möglich.',
        rating: '⭐⭐⭐⭐',
        score: '4/5',
        categories: ['action'],
        tags: ['Klassiker', 'Action']
    },
    {
        href: 'Brick-Bracker/index.html',
        image: 'breakout_game/logo.svg',
        imageAlt: 'Breakout',
        title: 'Breakout - Brick Breaker',
        type: 'Action',
        description: 'Zerstöre alle Blöcke mit dem Ball! Mehrere Level mit steigender Schwierigkeit.',
        rating: '⭐⭐⭐⭐',
        score: '4/5',
        categories: ['action'],
        tags: ['Action', 'Arcade']
    },
    {
        href: '2048_game/index.html',
        image: '2048_game/logo.svg',
        imageAlt: '2048',
        title: '2048',
        type: 'Puzzle • Strategie',
        description: 'Kombiniere Zahlen um 2048 zu erreichen! Ein süchtig machendes Zahlenpuzzle.',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['puzzle'],
        tags: ['Puzzle', 'Zahlen']
    },
    {
        href: 'memory/index.html',
        image: 'memory/logo.svg',
        imageAlt: 'Memory',
        title: 'Memory',
        type: 'Puzzle • Konzentration',
        description: 'Finde alle Kartenpaare und knacke deinen persönlichen Punkte-Rekord!',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['puzzle'],
        tags: ['Puzzle', 'Klassiker']
    },
    {
        href: 'asteroid_game/index.html',
        image: 'asteroid_game/logo.svg',
        imageAlt: 'Asteroids',
        title: 'Asteroids',
        type: 'Action • Arcade',
        description: 'Klassisches Weltraum-Abenteuer! Schieße auf Asteroiden und überlebe jede Wave!',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['action'],
        tags: ['Action', 'Weltraum']
    },
    {
        href: 'neon_runner/index.html',
        image: 'neon_runner/logo.svg',
        imageAlt: 'Neon Runner',
        title: 'Neon Runner',
        type: 'Action • Arcade',
        description: 'Springe durch eine neonfarbene Stadt, sammle Kristalle und überlebe so lange wie möglich!',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['action'],
        tags: ['Action', 'Speedrun']
    },
    {
        href: 'sky_stack/index.html',
        image: 'sky_stack/logo.svg',
        imageAlt: 'Sky Stack',
        title: 'Sky Stack',
        type: 'Action • Arcade',
        description: 'Setze bewegliche Blöcke präzise aufeinander und übertriff deinen Highscore!',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['action'],
        tags: ['Arcade', 'Skill']
    },
    {
        href: 'tictactoe_connect4/index.html',
        image: 'tictactoe_connect4/logo.svg',
        imageAlt: 'Tic-Tac-Toe & Vier Gewinnt',
        title: 'Tic-Tac-Toe & Vier Gewinnt',
        type: 'Strategie',
        description: 'Zwei klassische Strategiespiele! Spiele gegen einen anderen Spieler oder gegen die KI.',
        rating: '⭐⭐⭐⭐⭐',
        score: '5/5',
        categories: ['strategy'],
        tags: ['Strategie', 'Klassiker']
    }
];

const progressStorageKey = 'gamehub-progress-v1';
const recordDefinitions = [
    { href: '2048_game/index.html', key: '2048_bestScore', label: '2048', suffix: 'Punkte' },
    { href: 'snake_game/index.html', key: 'snakeHighScore', label: 'Snake Game', suffix: 'Punkte' },
    { href: 'asteroid_game/index.html', key: 'asteroid_bestScore', label: 'Asteroids', suffix: 'Punkte' },
    { href: 'neon_runner/index.html', key: 'neon-runner-best', label: 'Neon Runner', suffix: 'Punkte' },
    { href: 'sky_stack/index.html', key: 'sky-stack-best', label: 'Sky Stack', suffix: 'Punkte' },
    { href: 'memory/index.html', key: 'memory-best-score', label: 'Memory', suffix: 'Punkte' }
];

function readLocalStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function readProgress() {
    const raw = readLocalStorage(progressStorageKey);
    if (!raw) return { totalPlays: 0, games: {}, recent: [] };
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('Ungültiges Fortschrittsformat');
        }
        const validHrefs = new Set(gameCatalog.map(game => game.href));
        const games = {};
        Object.entries(parsed.games && typeof parsed.games === 'object' ? parsed.games : {}).forEach(([href, value]) => {
            if (!validHrefs.has(href) || !value || typeof value !== 'object') return;
            const count = Number(value.count);
            if (!Number.isFinite(count) || count < 0) return;
            games[href] = {
                count: Math.floor(count),
                lastPlayed: typeof value.lastPlayed === 'string' && Number.isFinite(Date.parse(value.lastPlayed))
                    ? value.lastPlayed
                    : ''
            };
        });
        const recent = Array.isArray(parsed.recent)
            ? [...new Set(parsed.recent.filter(href => validHrefs.has(href)))].slice(0, gameCatalog.length)
            : [];
        const totalPlays = Number(parsed.totalPlays);
        return {
            totalPlays: Number.isFinite(totalPlays) && totalPlays >= 0 ? Math.floor(totalPlays) : 0,
            games,
            recent
        };
    } catch (error) {
        console.warn('GameHub-Fortschritt konnte nicht gelesen werden; Standardwerte werden verwendet.', error);
        return { totalPlays: 0, games: {}, recent: [] };
    }
}

let gameProgress = readProgress();

function saveProgress() {
    try {
        localStorage.setItem(progressStorageKey, JSON.stringify(gameProgress));
    } catch (error) {
        console.warn('GameHub-Fortschritt konnte nicht gespeichert werden.', error);
    }
}

function renderProgress() {
    const recordList = document.getElementById('recordList');
    const achievementList = document.getElementById('achievementList');
    const recentList = document.getElementById('recentList');
    if (!recordList || !achievementList || !recentList) return;

    const availableRecords = recordDefinitions.map(record => {
        const value = Number(readLocalStorage(record.key));
        return { ...record, value };
    }).filter(record => Number.isFinite(record.value) && record.value > 0);
    recordList.innerHTML = availableRecords.length
        ? availableRecords.map(record => `
            <li><span>${escapeHTML(record.label)}</span><strong>${escapeHTML(record.value)} ${escapeHTML(record.suffix)}</strong></li>
        `).join('')
        : '<li class="progress-empty">Noch keine Rekorde – starte ein Spiel und leg los!</li>';

    const playedHrefs = Object.keys(gameProgress.games).filter(href => gameProgress.games[href].count > 0);
    const categoriesPlayed = new Set(playedHrefs.flatMap(href =>
        (gameCatalog.find(game => game.href === href) || { categories: [] }).categories
    ));
    const achievements = [
        { title: 'Erster Start', description: 'Spiele dein erstes Game.', progress: Math.min(gameProgress.totalPlays, 1), target: 1 },
        { title: 'Stammspieler', description: 'Starte insgesamt 10 Spiele.', progress: Math.min(gameProgress.totalPlays, 10), target: 10 },
        { title: 'Spiele-Sammler', description: 'Probiere 5 verschiedene Spiele aus.', progress: Math.min(playedHrefs.length, 5), target: 5 },
        { title: 'Genre-Entdecker', description: 'Spiele aus allen 4 Genres.', progress: Math.min(categoriesPlayed.size, 4), target: 4 }
    ];
    achievementList.innerHTML = achievements.map(achievement => {
        const earned = achievement.progress >= achievement.target;
        return `<li class="achievement-item${earned ? ' earned' : ''}">
            <span class="achievement-icon" aria-hidden="true">${earned ? '🏅' : '🔒'}</span>
            <span class="achievement-copy"><strong>${escapeHTML(achievement.title)}</strong>
            <span>${escapeHTML(achievement.description)}</span>
            <span class="achievement-progress">${achievement.progress} / ${achievement.target}</span></span>
            <span class="sr-only">${earned ? 'Erreicht' : 'Noch nicht erreicht'}</span>
        </li>`;
    }).join('');

    const recentGames = gameProgress.recent
        .map(href => gameCatalog.find(game => game.href === href))
        .filter(Boolean);
    recentList.innerHTML = recentGames.length
        ? recentGames.map(game => `
            <li><a class="recent-game-link" href="${escapeHTML(game.href)}" data-game-href="${escapeHTML(game.href)}">
                <span>${escapeHTML(game.title)}</span><span aria-hidden="true">►</span>
            </a></li>
        `).join('')
        : '<li class="progress-empty">Deine zuletzt gespielten Games erscheinen hier.</li>';
}

function recordGameLaunch(href) {
    const game = gameCatalog.find(item => item.href === href);
    if (!game) return;
    const timestamp = new Date().toISOString();
    const current = gameProgress.games[href] || { count: 0, lastPlayed: '' };
    gameProgress.games[href] = { count: current.count + 1, lastPlayed: timestamp };
    gameProgress.totalPlays += 1;
    gameProgress.recent = [href, ...gameProgress.recent.filter(item => item !== href)].slice(0, gameCatalog.length);
    saveProgress();
    renderProgress();
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

const gamesGridElement = document.getElementById('gamesGrid');
if (gamesGridElement) {
    gamesGridElement.innerHTML = gameCatalog.map(game => `
        <a href="${escapeHTML(game.href)}" class="game-card" data-game-href="${escapeHTML(game.href)}" data-category="${escapeHTML(game.categories.join(' '))}">
            <div class="game-image">
                <img src="${escapeHTML(game.image)}" alt="${escapeHTML(game.imageAlt)}">
            </div>
            <div class="game-info">
                <h3>${escapeHTML(game.title)}</h3>
                <p class="game-type">${escapeHTML(game.type)}</p>
                <p class="game-desc">${escapeHTML(game.description)}</p>
                <div class="game-rating" aria-label="Bewertung: ${escapeHTML(game.score)}">
                    <span aria-hidden="true">${escapeHTML(game.rating)}</span> (${escapeHTML(game.score)})
                </div>
                <div class="game-tags">
                    ${game.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
                </div>
            </div>
            <div class="game-action">► Spielen</div>
        </a>
    `).join('');
}
renderProgress();

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        const filterValue = button.getAttribute('data-filter');
        gameCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
            if (filterValue === 'all' || gameCatalog[index].categories.includes(filterValue)) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
});
// Navigation active state on scroll
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
// Game card click tracking
gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const gameName = card.querySelector('h3').textContent;
        console.log(`🎮 Spieler startet: ${gameName}`);
        createRipple(e, card);
    });
});
// Ripple effect for game cards
function createRipple(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = '20px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.background = 'rgba(0, 212, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'scale(1)';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}
// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
// Hover effect for game cards
gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}
// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
// Observe game cards
gameCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});
// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        hero.style.backgroundPosition = `${x}px ${y}px`;
    });
}
// Load page animation
window.addEventListener('load', () => {
    console.log('🎮 GameHub loaded successfully!');
    document.body.style.opacity = '1';
});
// Performance: Add will-change for animations
gameCards.forEach(card => {
    card.style.willChange = 'transform, opacity';
});
// Random game recommendation on page load
function getRandomGame() {
    if (gameCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * gameCards.length);
        const randomGame = gameCards[randomIndex].querySelector('h3').textContent;
        console.log(`🎲 Spiel-Empfehlung: Versuche ${randomGame}!`);
    }
}
window.addEventListener('load', getRandomGame);
// Mobile menu close on link click
if (navMenu) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}
// Prevent animations on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style.opacity = '1';
    });
} else {
    document.body.style.opacity = '1';
}
console.log('🚀 GameHub JavaScript initialized!');

const platformLockedNotice = document.getElementById('platformLockedNotice');
const gamesGrid = document.getElementById('gamesGrid');
const unlocked = localStorage.getItem('gamehub-lern-app-unlocked') === 'true';
const playsLeft = Number(localStorage.getItem('gamehub-plays-left') || 0);

if (platformLockedNotice) {
    if (unlocked && playsLeft > 0) {
        platformLockedNotice.classList.add('hidden-platform');
        if (gamesGrid) {
            gamesGrid.style.opacity = '1';
            gamesGrid.style.filter = 'none';
            gamesGrid.style.pointerEvents = 'auto';
        }
    } else {
        localStorage.setItem('gamehub-lern-app-unlocked', 'false');
        platformLockedNotice.classList.remove('hidden-platform');
        if (gamesGrid) {
            gamesGrid.style.opacity = '0.4';
            gamesGrid.style.filter = 'grayscale(0.6)';
            gamesGrid.style.pointerEvents = 'none';
        }
    }
}

const allGameLinks = [
    ...document.querySelectorAll('.game-card'),
    ...document.querySelectorAll('.recent-game-link')
];
allGameLinks.forEach(link => {
    if (!unlocked || playsLeft <= 0) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'Lern-App/index.html';
        });
    } else {
        link.addEventListener('click', () => {
            recordGameLaunch(link.dataset.gameHref);
            const remaining = Number(localStorage.getItem('gamehub-plays-left') || 0);
            if (remaining > 0) {
                localStorage.setItem('gamehub-plays-left', String(remaining - 1));
            }
            if (Number(localStorage.getItem('gamehub-plays-left') || 0) <= 0) {
                localStorage.setItem('gamehub-lern-app-unlocked', 'false');
                localStorage.setItem('gamehub-coin-balance', '0');
                localStorage.setItem('gamehub-lern-app-progress', JSON.stringify([]));
                window.location.href = 'Lern-App/index.html';
            }
        });
    }
});
