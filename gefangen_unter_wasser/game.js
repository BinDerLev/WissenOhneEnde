// ===========================
// SPIEL-STATUS UND WORLD-DATA (game.js)
// ===========================
// Dieses Objekt speichert den gesamten Spielzustand und die Weltdaten

const GameState = {
    // ===== SPIELER-STATUS =====
    currentLocation: 'cave',              // Aktuelle Lokation des Spielers (Startposition: cave)
    inventory: [],                         // Array mit Gegenständen, die der Spieler trägt
    health: 100,                           // Gesundheit des Spielers (in Prozent)
    puzzlesSolved: 0,                      // Anzahl gelöster Rätsel (Maximum: 3)
    treasureFound: false,                  // Boolean: Wurde der Schatz gefunden?
    visitedLocations: new Set(),           // Set mit allen besuchten Lokationen

    // ===== WELTDATEN: LOKATIONEN =====
    // Jede Lokation hat folgende Struktur:
    // - name: Anzeigename der Lokation
    // - description: Detaillierte Beschreibung
    // - exits: Mögliche Ausgänge (Richtung -> Ziel-Lokation)
    // - items: Array mit Gegenständen, die hier verfügbar sind
    // - puzzle: Rätsel-Daten (oder null, wenn kein Rätsel existiert)
    locations: {
        // ===== CAVE (Startlokation) =====
        cave: {
            name: 'Dunkle Höhle',
            description: 'Du stehst in einer mysteriösen, feuchten Höhle unter Wasser. Das Wasser reicht dir bis zur Brust. Seltsame Symbole leuchten schwach an den Wänden.',
            exits: {
                norden: 'corridor',    // Nach Norden führt zum Korridor
                osten: 'pool',         // Nach Osten führt zum Pool
                westen: 'vault'        // Nach Westen führt zur Schatzkammer
            },
            items: ['fackel'],         // Fackel liegt hier am Anfang
            puzzle: null               // Keine Rätsel in der Startlokation
        },

        // ===== CORRIDOR (Erste Rätsel-Lokation) =====
        corridor: {
            name: 'Langer Korridor',
            description: 'Ein enger, feuchter Korridor mit glitschigen Wänden. Das Wasser ist hier tiefer und völlig dunkel.',
            exits: {
                sueden: 'cave',        // Nach Süden zurück zur Höhle
                norden: 'temple'       // Nach Norden zum Tempel
            },
            items: ['rostiger_schluessel'],  // Rostiger Schlüssel ist hier
            puzzle: {
                question: 'Um weiterzukommen, musst du ein Rätsel lösen: Wie heißt der Pirat, der diesen Schatz verbarg?',
                answer: 'blackbeard',  // Richtige Antwort
                hint: 'Ein berühmter Pirat des 18. Jahrhunderts...',
                solved: false          // Rätsel ist initial nicht gelöst
            }
        },

        // ===== TEMPLE =====
        temple: {
            name: 'Alte Tempelanlage',
            description: 'Ein massiver Tempel mit Säulen und mystischen Hieroglyphen. Im Zentrum ein großer, in Stein gemeißelter Schädel.',
            exits: {
                sueden: 'corridor',    // Zurück zum Korridor
                osten: 'chamber'       // Nach Osten zur Geheimen Kammer
            },
            items: ['alte_muenze'],    // Alte Münze liegt hier
            puzzle: null               // Kein Rätsel hier
        },

        // ===== CHAMBER (Zweite Rätsel-Lokation) =====
        chamber: {
            name: 'Geheime Kammer',
            description: 'Ein großer Raum mit Schatztruhen an den Wänden. Eine Truhe in der Mitte glänzt verdächtig.',
            exits: {
                westen: 'temple',      // Zurück zum Tempel
                sueden: 'cave'         // Nach Süden zur Höhle
            },
            items: [],                 // Keine Gegenstände hier (die Truhe ist der Zielort)
            puzzle: {
                question: 'Die Truhe ist verschlossen! Ein Rätsel ist eingraviert: "Ich bin nicht lebendig, aber ich wachse. Ich habe keine Lunge, aber ich brauche Luft. Was bin ich?"',
                answer: 'feuer',       // Richtige Antwort: Feuer
                hint: 'Denk an Dinge, die leuchten und Wärme geben...',
                solved: false
            }
        },

        // ===== POOL (Dritte Rätsel-Lokation) =====
        pool: {
            name: 'Unterirdischer Pool',
            description: 'Ein riesiger, kristallklarer Pool mit leuchtendem Wasser. Die Quelle des Lichts ist unbekannt.',
            exits: {
                westen: 'cave',        // Zurück zur Höhle
                sueden: 'grotto'       // Nach Süden zur Grotte
            },
            items: ['wasserklare_perle'],  // Wasserkfare Perle ist hier
            puzzle: {
                question: 'Am Boden des Pools erkennst du eine eingravierte Inschrift: "Zwei Väter und zwei Söhne gingen fischen und fingen drei Fische. Wie ist das möglich?"',
                answer: 'grossvater',  // Richtige Antwort: Großvater (Großvater + Vater + Sohn = 3 Personen, 2 Väter, 2 Söhne)
                hint: 'Denk an Familienverhältnisse...',
                solved: false
            }
        },

        // ===== GROTTO =====
        grotto: {
            name: 'Felsengrotte',
            description: 'Eine enge Grotte mit tropfenden Stalaktiten. Der Boden ist rutschig und gefährlich.',
            exits: {
                norden: 'pool',        // Nach Norden zum Pool
                osten: 'vault'         // Nach Osten zur Schatzkammer
            },
            items: [],                 // Keine Gegenstände hier
            puzzle: null               // Kein Rätsel hier
        },

        // ===== VAULT (Schatzkammer - Endziel) =====
        vault: {
            name: 'Versteckte Schatzkammer',
            description: 'Eine massive Metallverstärkung deutet auf große Schätze hin. Die Tür ist fest verschlossen, kein Rütteln hilft.',
            exits: {
                osten: 'cave',         // Nach Osten zurück zur Höhle
                sueden: 'grotto'       // Nach Süden zur Grotte
            },
            items: ['tresor_schluessel'],   // Der Tresor-Schlüssel ist hier
            puzzle: {
                question: 'Die Tür hat ein digitales Schloss mit einem Rätsel: "Was bin ich? Ich habe Schlüssel, aber keine Türen. Ich habe Platz, aber keinen Raum. Ich kann dich führen, aber ich bin kein Mensch."', //anwort:"tastatur"
                answer: 'Tastatur',
                hint: 'Das Rätsel musst du ohne Hilfe lösen',
                solved: false
            }
        }
    },

    // ===== WELTDATEN: GEGENSTÄNDE =====
    // Definition aller Gegenstände im Spiel
    // Struktur:
    // - name: Anzeigename
    // - description: Beschreibung des Gegenstands
    // - usable: Kann der Gegenstand benutzt werden? (true/false)
    items: {
        // Fackel: Gibt Licht und kann benutzt werden
        fackel: {
            name: 'Fackel', description: 'Eine alte Holzfackel, noch immer brennend.', usable: true               // Kann benutzt werden
        }, // Rostiger Schlüssel: Ein sammelgegenstand, kann nicht benutzt werden
        rostiger_schluessel: {
            name: 'Rostiger Schlüssel', description: 'Ein verrosteter Schlüssel, sieht uralt aus.', usable: false              // Nur zum Sammeln
        }, // Alte Münze: Ein sammelgegenstand, kann nicht benutzt werden
        alte_muenze: {
            name: 'Alte Münze', description: 'Eine antike Münze mit mystischen Symbolen.', usable: false              // Nur zum Sammeln
        }, // Wasserkfare Perle: Ein sammelgegenstand, kann nicht benutzt werden
        wasserklare_perle: {
            name: 'Wasserkfare Perle', description: 'Eine wunderschöne Perle, die im Dunkeln leuchtet.', usable: false              // Nur zum Sammeln
        }, /**
         * Tresor-Schlüssel: Der Wichtigste Gegenstand! Öffnet die Schatzkammer
         */
        tresor_schluessel: {
            name: 'Tresor-Schlüssel', description: 'Ein goldener Schlüssel mit einer Schatzmarkierung.', usable: true               // SEHR wichtig: Kann benutzt werden um den Schatz zu öffnen!
        }
    }
};

// ===========================
// HILFS-FUNKTIONEN
// ===========================

/**
 * Gibt die aktuelle Lokation des Spielers zurück
 * @returns {object} Das Lokations-Objekt mit allen Eigenschaften
 */
function getCurrentLocation() {
    return GameState.locations[GameState.currentLocation];
}

/**
 * Normalisiert Text für Vergleiche
 * Konvertiert zu Kleinbuchstaben und entfernt Sonderzeichen
 * Dies ist wichtig, damit Spieler-Eingaben flexibel sind (z.B. "Feuer" = "feuer")
 * @param {string} text - Der zu normalisierende Text
 * @returns {string} Der normalisierte Text
 */
function normalizeForCompare(text) {
    if (!text) return '';
    // Kleinbuchstaben, deutsche Umlaute bleiben erhalten; entferne alle Zeichen außer Buchstaben und Zahlen
    return text.toLowerCase().replace(/[^a-z0-9äöüß]/gi, '');
}

// ===========================
// HAUPT-SPIELLOGIK: BEFEHLS-VERARBEITUNG
// ===========================

/**
 * Verarbeitet alle Spieler-Befehle
 * Dies ist die zentrale Funktion, die entscheidet, welche Aktion durchgeführt wird
 * @param {string} input - Der vom Spieler eingegebene Befehl
 * @returns {string} Die Ausgabe für den Spieler
 */
function handleCommand(input) {
    const command = input.toLowerCase().trim();
    let output;

    // Prüfe jeden möglichen Befehl
    if (command === 'hilfe') {
        // Zeige das Hilfemenü
        output = getHelpText();
    } else if (command === 'inventar') {
        // Zeige den Inhalt des Inventars
        output = getInventoryText();
    } else if (command === 'schaue' || command === 'look') {
        // Beschreibe die aktuelle Lokation
        output = getLocationDescription();
    } else if (command.startsWith('gehe ')) {
        // Bewegungs-Befehl: gehe [richtung]
        const direction = command.substring(5).trim();
        output = moveDirection(direction);
    } else if (command.startsWith('nimm ')) {
        // Sammel-Befehl: nimm [gegenstand]
        const itemName = command.substring(5).trim();
        output = takeItem(itemName);
    } else if (command.startsWith('benutze ')) {
        // Benutzer-Befehl: benutze [gegenstand]
        const itemName = command.substring(8).trim();
        output = useItem(itemName);
    } else if (command === 'lese' || command.startsWith('lese ') || command.startsWith('frage ')) {
        // Rätsel-Befehl: frage [antwort] oder lese (für Hinweis)
        output = solvePuzzle(command);
    } else if (command === 'status') {
        // Zeige den Spielstatus an
        output = getStatusText();
    } else if (command === 'neustart') {
        // Starte das Spiel neu
        restartGame();
        output = '<span class="success">Spiel neugestartet! Laden Sie die Seite neu.</span>';
    } else {
        // Unbekannter Befehl
        output = '<span class="warning">Unbekannter Befehl: "' + command + '". Gib "hilfe" ein für verfügbare Befehle.</span>';
    }

    return output;
}

// ===========================
// BEWEGUNGS-LOGIK
// ===========================

/**
 * Bewegt den Spieler in eine bestimmte Richtung
 * Prüft, ob die Richtung und der Ausgang gültig sind
 * @param {string} direction - Die Richtung (norden, osten, sueden, westen, n, o, s, w, etc.)
 * @returns {string} Bestätigungs- oder Fehlermeldung
 */
function moveDirection(direction) {
    const location = getCurrentLocation();

    // Alle Varianten einer Richtung werden auf die Standard-Richtung abgebildet
    const validDirections = {
        'norden': 'norden',
        'nord': 'norden',
        'n': 'norden',
        'sueden': 'sueden',
        'sued': 'sueden',
        's': 'sueden',
        'osten': 'osten',
        'ost': 'osten',
        'o': 'osten',
        'westen': 'westen',
        'west': 'westen',
        'w': 'westen'
    };

    // Wandle die Benutzer-Eingabe in Standard-Richtung um
    const dir = validDirections[direction];

    // Prüfe, ob die Richtung gültig und dieser Ausgang existiert
    if (!dir || !location.exits[dir]) {
        return '<span class="warning">Du kannst nicht in diese Richtung gehen.</span>';
    }

    // Wechsle zu der neuen Lokation
    GameState.currentLocation = location.exits[dir];
    // Markiere diese Lokation als besucht
    GameState.visitedLocations.add(GameState.currentLocation);

    // Zeige die Beschreibung der neuen Lokation
    return getLocationDescription();
}

// ===========================
// INVENTAR-LOGIK
// ===========================

/**
 * Der Spieler nimmt einen Gegenstand auf
 * Prüft, ob der Gegenstand existiert und fügt ihn zum Inventar hinzu
 * @param {string} itemName - Der Name des zu nehmenden Gegenstands
 * @returns {string} Bestätigungs- oder Fehlermeldung
 */
function takeItem(itemName) {
    const location = getCurrentLocation();

    // Suche den Gegenstand in dieser Lokation
    const item = location.items.find(i => i.toLowerCase().includes(itemName.toLowerCase()));

    // Wenn der Gegenstand nicht existiert, gib einen Fehler aus
    if (!item) {
        return '<span class="warning">Es gibt hier kein solches Objekt.</span>';
    }

    // Füge den Gegenstand zum Spieler-Inventar hinzu
    GameState.inventory.push(item);
    // Entferne den Gegenstand aus dieser Lokation
    location.items.splice(location.items.indexOf(item), 1);
    // Aktualisiere die UI
    updateInventoryUI();

    // Bestätigung: Was wurde aufgehoben?
    return '<span class="success">Du hast ' + GameState.items[item].name + ' aufgenommen.</span>';
}


// ===========================
// GEGENSTAND-BENUTZUNG
// ===========================

/**
 * Der Spieler benutzt einen Gegenstand aus seinem Inventar
 * Verschiedene Gegenstände haben unterschiedliche Effekte
 * @param {string} itemName - Der Name des zu benutzenden Gegenstands
 * @returns {string} Beschreibung des Effekts
 */
function useItem(itemName) {
    // Suche den Gegenstand im Inventar
    const invItem = GameState.inventory.find(i => i.toLowerCase().includes(itemName.toLowerCase()));

    // Wenn der Gegenstand nicht im Inventar ist, gib einen Fehler aus
    if (!invItem) {
        return '<span class="warning">Du hast diesen Gegenstand nicht.</span>';
    }

    // Hol die Gegenstand-Daten
    const item = GameState.items[invItem];

    // Prüfe, ob der Gegenstand überhaupt benutzt werden kann
    if (!item.usable) {
        return '<span class="warning">Du kannst diesen Gegenstand nicht benutzen.</span>';
    }

    // ===== SPEZIELLE EFFEKTE FÜR JEDEN BENUTZBAR GEGENSTAND =====

    // FACKEL: Erleuchtet die Umgebung
    if (invItem === 'fackel') {
        return '<span class="special">Die Fackel leuchtet hell und erhellt die Umgebung. Du kannst nun besser sehen!</span>';
    }

    // TRESOR-SCHLÜSSEL: Öffnet den Schatz! (aber nur unter bestimmten Bedingungen)
    if (invItem === 'tresor_schluessel') {
        // Prüfe, ob wir in der Schatzkammer sind
        if (GameState.currentLocation === 'vault') {
            // Der Spieler muss mindestens 3 Rätsel gelöst haben
            if (GameState.puzzlesSolved >= 3) {
                // ERFOLG! Der Schatz ist gefunden!
                GameState.treasureFound = true;
                return '<span class="success">🎉 DU HAST DEN SCHATZ GEFUNDEN! Der Tresor öffnet sich und enthält unermessliche Reichtümer! 🎉</span>';
            } else {
                // Noch nicht alle Rätsel gelöst
                return '<span class="warning">Der Tresor braucht den richtigen Schlüssel UND du musst zunächst alle Rätsel lösen (gelöst: ' + GameState.puzzlesSolved + '/3).</span>';
            }
        } else {
            // Der Spieler ist nicht in der Schatzkammer
            return '<span class="warning">Hier gibt es keinen Tresor.</span>';
        }
    }

    // Fallback: Der Gegenstand hat keinen besonderen Effekt
    return '<span class="warning">Davon passiert nichts.</span>';
}

// ===========================
// RÄTSEL-LOGIK
// ===========================

/**
 * Der Spieler löst ein Rätsel an der aktuellen Lokation
 * Akzeptiert die Spieler-Antwort und prüft sie auf Korrektheit
 * @param {string} command - Der eingegebene Befehl (z.B. "frage feuer" oder "lese")
 * @returns {string} Erfolgs- oder Fehlermeldung
 */
function solvePuzzle(command) {
    const location = getCurrentLocation();

    // Prüfe, ob diese Lokation überhaupt ein Rätsel hat
    if (!location.puzzle) {
        return '<span class="warning">Hier gibt es kein Rätsel zu lösen.</span>';
    }

    // Prüfe, ob das Rätsel bereits gelöst wurde
    if (location.puzzle.solved) {
        return '<span class="warning">Du hast dieses Rätsel bereits gelöst!</span>';
    }

    // ===== VERARBEITE DIE VERSCHIEDENEN BEFEHLE =====

    let answer = '';

    // "lese" oder "lese " - Gib einen Hinweis
    if (command === 'lese' || command.startsWith('lese ')) {
        return '<span class="special">Hinweis: ' + location.puzzle.hint + '</span>';
    }

    // "frage [antwort]" - Antworte auf das Rätsel
    if (command.startsWith('frage ')) {
        answer = command.substring(6).trim();
    } else {
        // Ungültiger Befehl für Rätsel
        return '<span class="warning">Bitte verwende "frage [antwort]" um ein Rätsel zu beantworten.</span>';
    }

    // ===== PRÜFE DIE ANTWORT =====

    // Normalisiere beide Antworten für flexiblen Vergleich
    const normAnswer = normalizeForCompare(answer);
    const normExpected = normalizeForCompare(location.puzzle.answer);

    // Vergleiche die Antworten
    if (normAnswer === normExpected) {
        // RICHTIG! Rätsel gelöst!
        location.puzzle.solved = true;
        GameState.puzzlesSolved++;
        updatePuzzleUI();
        return '<span class="success">✓ Richtig! Du hast das Rätsel gelöst!</span>';
    } else {
        // FALSCH! Versuche es später nochmal
        return '<span class="warning">✗ Falsch! Das ist nicht die richtige Antwort. Versuche es mit einer anderen antwort nochmal.</span>';
    }
}

// ===========================
// TEXT-AUSGABE-FUNKTIONEN
// ===========================

/**
 * Gibt eine detaillierte Beschreibung der aktuellen Lokation aus
 * Inkl. Gegenstände, Rätsel und mögliche Ausgänge
 * @returns {string} Formatierte Lokations-Beschreibung
 */
function getLocationDescription() {
    const location = getCurrentLocation();
    let output = '<span class="special">=== ' + location.name + ' ===</span>\n\n';

    // Haupt-Beschreibung der Lokation
    output += location.description + '\n\n';

    // Zeige alle Gegenstände an dieser Lokation
    if (location.items.length > 0) {
        output += '<span class="special">Gegenstände hier:</span> ';
        output += location.items.map(i => GameState.items[i].name).join(', ') + '\n\n';
    }

    // Zeige ungelöste Rätsel
    if (location.puzzle && !location.puzzle.solved) {
        output += '<span class="warning">🔓 Rätsel: ' + location.puzzle.question + '</span>\n';
        output += 'Benutze "frage [antwort]" um zu antworten oder "lese" für einen Hinweis.\n\n';
    }

    // Zeige alle möglichen Ausgänge
    const exitText = Object.keys(location.exits).join(', ');
    output += '<span class="special">Ausgänge:</span> ' + exitText;

    return output;
}


// ===========================
// HILFETEXTE
// ===========================

/**
 * Gibt das Hilfemenü mit allen verfügbaren Befehlen aus
 * @returns {string} Formatiertes Hilfemenü
 */
function getHelpText() {
    return `
<span class="special">=== HILFEMENÜ ===</span>

<strong>Bewegung:</strong>
  gehe [norden/sueden/osten/westen] - Sich bewegen (n/s/o/w auch möglich)

<strong>Gegenstände:</strong>
  nimm [gegenstand] - Einen Gegenstand aufnehmen
  inventar - Dein Inventar anzeigen
  benutze [gegenstand] - Einen Gegenstand benutzen

<strong>Umgebung:</strong>
  schaue - Die aktuelle Lokation beschreiben
  lese - Einen Hinweis für ein Rätsel bekommen
  frage [antwort] - Ein Rätsel beantworten

<strong>Sonstiges:</strong>
  status - Spielstatus anzeigen
  hilfe - Diese Hilfe anzeigen

<span class="special">Ziel:</span> Finde alle 3 Rätsel, löse sie und finde den Schatz!
    `;
}

/**
 * Gibt eine Liste aller Gegenstände im Spieler-Inventar aus
 * @returns {string} Formatierte Inventar-Liste
 */
function getInventoryText() {
    if (GameState.inventory.length === 0) {
        return 'Dein Inventar ist leer.';
    }

    let output = '<span class="special">Dein Inventar:</span>\n';
    // Zeige jeden Gegenstand mit Nummer, Name und Beschreibung
    GameState.inventory.forEach((item, index) => {
        output += (index + 1) + '. ' + GameState.items[item].name + ' - ' + GameState.items[item].description + '\n';
    });
    return output;
}

/**
 * Gibt den aktuellen Spielstatus aus
 * @returns {string} Formatierte Status-Information
 */
function getStatusText() {
    return `
<span class="special">=== SPIELSTATUS ===</span>
Gesundheit: ${GameState.health}%
Rätsel gelöst: ${GameState.puzzlesSolved}/3
Orte besucht: ${GameState.visitedLocations.size}
Gegenstände: ${GameState.inventory.length}
Schatz gefunden: ${GameState.treasureFound ? 'JA! 🎉' : 'Nein'}
    `;
}

// ===========================
// UI-AKTUALISIERUNGEN
// ===========================

/**
 * Aktualisiert die Inventar-Anzeige in der Benutzeroberfläche
 * Wird nach jeder Änderung des Inventars aufgerufen
 */
function updateInventoryUI() {
    const inventoryList = document.getElementById('inventory-list');
    if (GameState.inventory.length === 0) {
        inventoryList.textContent = 'Leer';
    } else {
        // Zeige alle Gegenstände mit Bullet-Points
        inventoryList.innerHTML = GameState.inventory.map(item => '• ' + GameState.items[item].name).join('<br>');
    }
}

/**
 * Aktualisiert die Status-Anzeige in der Benutzeroberfläche
 * Wird nach Änderungen von Gesundheit oder Rätsel-Zähler aufgerufen
 */
function updatePuzzleUI() {
    document.getElementById('puzzles').textContent = GameState.puzzlesSolved;
    document.getElementById('health').textContent = GameState.health;
}

// ===========================
// SPIEL-STEUERUNG
// ===========================

/**
 * Setzt das Spiel auf den Anfangszustand zurück
 * Dies wird durch den "neustart" Befehl aufgerufen
 */
function restartGame() {
    GameState.currentLocation = 'cave';        // Zurück zur Startlokation
    GameState.inventory = [];                   // Inventar leeren
    GameState.health = 100;                     // Gesundheit wiederherstellen
    GameState.puzzlesSolved = 0;                // Rätsel-Zähler zurücksetzen
    GameState.treasureFound = false;            // Schatz nicht mehr gefunden
    GameState.visitedLocations.clear();         // Alle besuchten Lokationen vergessen
}

