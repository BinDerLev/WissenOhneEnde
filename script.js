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
        <a href="${escapeHTML(game.href)}" class="game-card" data-category="${escapeHTML(game.categories.join(' '))}">
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

const allGameLinks = document.querySelectorAll('.game-card');
allGameLinks.forEach(link => {
    if (!unlocked || playsLeft <= 0) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'Lern-App/index.html';
        });
    } else {
        link.addEventListener('click', () => {
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
