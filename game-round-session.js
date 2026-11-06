(() => {
    let finished = false;

    window.GameRoundSession = Object.freeze({
        finish() {
            if (finished) return;
            finished = true;

            const notice = document.createElement("div");
            notice.className = "game-round-return-notice";
            notice.setAttribute("role", "status");
            notice.setAttribute("aria-live", "assertive");
            notice.textContent = "Runde beendet. Du wirst gleich zur Spiele-Plattform zurückgeleitet.";
            document.body.appendChild(notice);
            document.body.dataset.roundFinished = "true";

            window.setTimeout(() => {
                window.location.replace("../index.html");
            }, 1800);
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
        @media (prefers-reduced-motion: reduce) {
            .game-round-return-notice { scroll-behavior: auto; }
        }
    `;
    document.head.appendChild(style);
})();
