(() => {
    let finished = false;
    let returnTimer = null;
    let returnNotice = null;

    window.GameRoundSession = Object.freeze({
        restart() {
            window.clearTimeout(returnTimer);
            returnTimer = null;
            returnNotice?.remove();
            returnNotice = null;
            delete document.body.dataset.roundFinished;
            finished = false;
        },
        finish(won = false) {
            if (finished) return;
            finished = true;

            const notice = document.createElement("div");
            notice.className = "game-round-return-notice";
            notice.setAttribute("role", "status");
            notice.setAttribute("aria-live", "assertive");
            notice.textContent = "Runde beendet. Du wirst gleich zur Spiele-Plattform zurückgeleitet.";
            if (won) {
                notice.classList.add("game-round-victory");
                const trophy = document.createElement("div");
                trophy.className = "game-round-trophy";
                trophy.textContent = "🏆";
                trophy.setAttribute("aria-hidden", "true");
                const heading = document.createElement("h2");
                heading.textContent = "Gewonnen!";
                const message = document.createElement("p");
                message.textContent = "Toll gespielt! Gleich geht es zurück zur Spiele-Plattform.";
                notice.textContent = "";
                notice.appendChild(trophy);
                notice.appendChild(heading);
                notice.appendChild(message);
                for (let i = 0; i < 48; i++) {
                    const confetti = document.createElement("span");
                    confetti.className = "game-round-confetti";
                    confetti.setAttribute("aria-hidden", "true");
                    confetti.style.setProperty("--x", `${Math.random() * 100}vw`);
                    confetti.style.setProperty("--delay", `${Math.random() * 1.5}s`);
                    confetti.style.setProperty("--color", ["#ffd54a", "#63e6be", "#ff8787", "#91a7ff"][i % 4]);
                    notice.appendChild(confetti);
                }
            }
            document.body.appendChild(notice);
            returnNotice = notice;
            document.body.dataset.roundFinished = "true";

            returnTimer = window.setTimeout(() => {
                window.location.replace("../index.html");
            }, won ? 5000 : 1800);
        }
    });

    const style = document.createElement("style");
    style.textContent = `
        body[data-round-finished="true"]::after {
            position: fixed;
            z-index: 9998;
            inset: 0;
            content: "";
            background: rgb(8 14 24 / 42%);
        }
        .game-round-return-notice {
            position: fixed;
            z-index: 9999;
            inset: auto 16px 24px;
            width: fit-content;
            max-width: min(620px, calc(100vw - 32px));
            margin-inline: auto;
            padding: 14px 20px;
            border: 1px solid rgb(255 255 255 / 28%);
            border-radius: 14px;
            background: #17243b;
            box-shadow: 0 12px 40px rgb(0 0 0 / 30%);
            color: #fff;
            font: 700 16px/1.45 system-ui, sans-serif;
            text-align: center;
        }
        .game-round-victory {
            inset: 50% auto auto 50%;
            transform: translate(-50%, -50%);
            width: min(480px, calc(100vw - 32px));
            padding: 32px 24px;
            border: 2px solid #ffd54a;
            animation: round-victory-in .6s ease-out;
        }
        .game-round-victory h2 { color: #ffd54a; font: 800 36px/1.2 system-ui; margin: 12px 0; }
        .game-round-victory p { margin: 0; color: #fff; }
        .game-round-trophy { font-size: 76px; animation: round-trophy 1.2s ease-in-out infinite alternate; }
        .game-round-confetti {
            position: fixed; left: calc(var(--x) - 50vw + 50%); top: -60vh;
            width: 10px; height: 16px; background: var(--color); pointer-events: none;
            animation: round-confetti 3s var(--delay) ease-in infinite;
        }
        @keyframes round-victory-in { from { opacity: 0; transform: translate(-50%, -50%) scale(.65); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes round-trophy { to { transform: translateY(-8px) rotate(5deg); } }
        @keyframes round-confetti { to { transform: translateY(130vh) rotate(540deg); } }
        @media (prefers-reduced-motion: reduce) {
            .game-round-victory, .game-round-trophy { animation: none; }
            .game-round-confetti { display: none; }
            .game-round-return-notice { scroll-behavior: auto; }
        }
    `;
    document.head.appendChild(style);
})();
