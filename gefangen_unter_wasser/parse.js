// ===========================
// COMMAND PARSER (parse.js)
// ===========================
// Dieser Parser verarbeitet Spieler-Eingaben und verwaltet die Befehls-Historie
// für die Pfeiltasten-Navigation (oben/unten)

/**
 * CommandParser Klasse
 * Verwaltet die Verarbeitung und Verlauf von Befehlen
 */
class CommandParser {
    /**
     * Konstruktor - Initialisiert den Parser
     */
    constructor() {
        // Array zur Speicherung aller eingegebenen Befehle
        this.commandHistory = [];
        // Index für die Navigation durch die Historia (-1 = keine Position)
        this.historyIndex = -1;
    }

    // ===========================
    // BEFEHLSVERLAUF NAVIGATION
    // ===========================

    /**
     * Gibt den nächsten (älteren) Befehl aus der Geschichte
     * Wird aufgerufen, wenn Spieler Pfeiltaste Oben drückt
     * @returns {string} Der nächste Befehl oder leerer String
     */
    getNextHistoryCommand() {
        // Wenn wir noch nicht am Ende der Geschichte sind
        if (this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            return this.commandHistory[this.historyIndex];
        }
        // Wenn wir am Ende sind, gib einen leeren String zurück
        return '';
    }

    /**
     * Gibt den vorherigen (neueren) Befehl aus der Geschichte
     * Wird aufgerufen, wenn Spieler Pfeiltaste Unten drückt
     * @returns {string} Der vorherige Befehl oder leerer String
     */
    getPreviousHistoryCommand() {
        // Wenn wir noch nicht am Anfang der Geschichte sind
        if (this.historyIndex > 0) {
            this.historyIndex--;
            return this.commandHistory[this.historyIndex];
        }
        // Wenn wir am Anfang sind, gib einen leeren String zurück
        return '';
    }

    /**
     * Fügt einen Befehl zur Historie hinzu
     * Dies wird aufgerufen, wenn ein gültiger Befehl eingegeben wird
     * @param {string} command - Der hinzuzufügende Befehl
     */
    addToHistory(command) {
        // Nur nicht-leere Befehle hinzufügen
        if (command.trim() !== '') {
            this.commandHistory.push(command);
            // Setze den Index auf das neueste Element
            this.historyIndex = this.commandHistory.length - 1;
        }
    }

    // ===========================
    // BEFEHLS-VERARBEITUNG
    // ===========================

    /**
     * Normalisiert die Eingabe (Kleinbuchstaben und Leerzeichen trimmen)
     * @param {string} input - Die eingegebene Befehl
     * @returns {string} Die normalisierte Befehl
     */
    normalize(input) {
        return input.toLowerCase().trim();
    }

    /**
     * Hauptfunktion: Parst einen Befehl
     * Dies wird aufgerufen, wenn der Spieler Enter drückt oder den Button klickt
     * @param {string} input - Der eingegebene Befehl vom Spieler
     * @returns {object} Objekt mit { valid: boolean, message: string }
     */
    parse(input) {
        // Normalisiere die Eingabe
        const normalized = this.normalize(input);

        // Wenn die Eingabe leer ist, gib einen Fehler zurück
        if (normalized === '') {
            return {valid: false, message: 'Bitte gib einen Befehl ein.'};
        }

        // Füge den Befehl zur Historie hinzu
        this.addToHistory(input);

        // Verarbeite den Befehl mit der handleCommand Funktion aus game.js
        const result = handleCommand(input);

        // Gib das Ergebnis als gültig zurück
        return {valid: true, message: result};
    }
}

// ===========================
// GLOBALE PARSER-INSTANZ
// ===========================

// Erstelle eine globale Instanz des Parsers
// Dies wird in main.js und game.js verwendet
const parser = new CommandParser();

