// ===========================
// HAUPT-SPIELINTERFACE (main.js)
// ===========================
// Dieses Skript verwaltet die Benutzeroberfläche und Event-Listener
// Es verbindet die HTML-Elemente mit der Spiel-Logik

// Referenzen zu den HTML-Elementen für einfacheren Zugriff
const output = document.getElementById('output');                    // Der Text-Ausgabe-Bereich
const commandInput = document.getElementById('command-input');        // Das Eingabefeld für Befehle
const submitBtn = document.getElementById('submit-btn');              // Der Ausführen-Button

// ===========================
// AUSGABE-FUNKTIONEN
// ===========================

/**
 * Schreibt eine Nachricht in das Ausgabefenster
 * @param {string} message - Die anzuzeigende Nachricht (kann HTML enthalten)
 */
function writeOutput(message) {
    // Erstelle einen neuen Absatz für die Nachricht
    const paragraph = document.createElement('p');
    // Setze den HTML-Inhalt (erlaubt Formatierung mit Spans)
    paragraph.innerHTML = message;
    // Füge den neuen Absatz zum Ausgabefenster hinzu
    output.appendChild(paragraph);
    // Scrolle automatisch zum Ende des Ausgabefensters
    output.scrollTop = output.scrollHeight;
}

// ===========================
// BEFEHLS-VERARBEITUNG
// ===========================

/**
 * Verarbeitet die vom Spieler eingegebene Befehl
 * Dies ist die Hauptfunktion, die bei jedem Befehl aufgerufen wird
 */
function processCommand() {
    // Hol die eingegebene Befehl
    const command = commandInput.value;

    // Wenn das Eingabefeld leer ist, tue nichts
    if (command.trim() === '') {
        return;
    }

    // Zeige den eingegebenen Befehl im Ausgabefenster an
    writeOutput('<span class="special">> ' + command + '</span>');

    // Verarbeite den Befehl mit dem Parser (aus parse.js)
    const result = parser.parse(command);

    // Zeige das Ergebnis des Befehls an
    if (result.valid) {
        writeOutput(result.message);
    } else {
        // Bei ungültigen Befehlen wird eine Warnung angezeigt
        writeOutput('<span class="warning">' + result.message + '</span>');
    }

    // Prüfe, ob der Schatz gefunden wurde
    if (GameState.treasureFound) {
        writeOutput('<span class="success">🎉 GLÜCKWUNSCH! Du hast das Spiel gewonnen! 🎉</span>');
        // Deaktiviere die Eingabe, damit der Spieler keine weiteren Befehle eingeben kann
        commandInput.disabled = true;
        submitBtn.disabled = true;
    }

    // Leere das Eingabefeld für den nächsten Befehl
    commandInput.value = '';
    // Setze den Fokus zurück auf das Eingabefeld
    commandInput.focus();

    // Aktualisiere die UI-Elemente (Inventar und Rätsel-Zähler)
    updateInventoryUI();
    updatePuzzleUI();
}

// ===========================
// EVENT-LISTENER
// ===========================

// Wenn der "Ausführen"-Button geklickt wird, verarbeite den Befehl
submitBtn.addEventListener('click', processCommand);

// Wenn Enter im Eingabefeld gedrückt wird, verarbeite auch den Befehl
commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processCommand();
    }
});

// Pfeiltasten-Navigation für Befehls-Verlauf
// Mit Pfeiltaste Oben: Nächster Befehl aus der Historie
// Mit Pfeiltaste Unten: Vorheriger Befehl aus der Historie
commandInput.addEventListener('keydown', (e) => {
    // Pfeiltaste Oben: Älterer Befehl aus der Historie
    if (e.key === 'ArrowUp') {
        e.preventDefault(); // Verhindere Standard-Verhalten
        commandInput.value = parser.getNextHistoryCommand();
    }
    // Pfeiltaste Unten: Neuerer Befehl aus der Historie
    else if (e.key === 'ArrowDown') {
        e.preventDefault(); // Verhindere Standard-Verhalten
        commandInput.value = parser.getPreviousHistoryCommand();
    }
});

// ===========================
// INITIALISIERUNG
// ===========================

/**
 * Wird ausgeführt, wenn die Seite vollständig geladen ist
 */
window.addEventListener('load', () => {
    // Markiere die aktuelle Lokation als besucht
    GameState.visitedLocations.add(GameState.currentLocation);
    // Zeige die Beschreibung der Startlokation an
    writeOutput(getLocationDescription());
    // Setze den Fokus auf das Eingabefeld, damit der Spieler sofort typen kann
    commandInput.focus();
});

