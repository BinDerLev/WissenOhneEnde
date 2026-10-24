//Hier gibt es einen Fehler er ist das:
const curriculum = {
  1: [
    { title: "Plus und Minus bis 20", skill: "add", icon: "+", description: "Zahlen geschickt zusammenzählen und abziehen.", explanation: "Beim Plusrechnen gehst du vorwärts. Beim Minusrechnen gehst du zurück. Ein Rechenstrich kann dir helfen: Starte bei der ersten Zahl und springe so viele Schritte, wie die zweite Zahl angibt.", difficulty: "easy" },
    { title: "Zahlen und Mengen", skill: "compare", icon: "≷", description: "Zahlen ordnen und fehlende Zahlen finden.", explanation: "Zahlen haben eine feste Reihenfolge. Auf dem Zahlenstrahl liegen größere Zahlen weiter rechts. Zähle in gleichen Schritten weiter, um Lücken zu füllen.", difficulty: "easy" },
    { title: "Formen entdecken", skill: "shapes", icon: "◇", description: "Einfache Formen und ihre Eigenschaften kennenlernen.", explanation: "Ein Dreieck hat 3 Ecken, ein Viereck 4. Ein Rechteck hat 4 Ecken und gegenüberliegende Seiten sind gleich lang.", difficulty: "easy" },
    { title: "Verdoppeln und Halbieren", skill: "add", icon: "½", description: "Zahlen verdoppeln und in gleiche Teile teilen.", explanation: "Verdoppeln heißt, eine Zahl zweimal zu nehmen. Halbieren bedeutet, sie in zwei gleich große Teile zu teilen.", difficulty: "easy" },
    { title: "Zahlenfolgen", skill: "compare", icon: "→", description: "Muster erkennen und Zahlenfolgen fortsetzen.", explanation: "Finde heraus, wie sich die Zahlen verändern. Dann führst du dasselbe Muster weiter.", difficulty: "easy" },
    { title: "Ecken und Seiten", skill: "shapes", icon: "●", description: "Ecken und Seiten einfacher Formen bestimmen.", explanation: "Dreiecke, Vierecke und Fünfecke haben unterschiedlich viele Ecken und Seiten.", difficulty: "easy" }
  ],
  2: [
    { title: "Rechnen bis 100", skill: "add", icon: "+", description: "Plus und Minus mit größeren Zahlen üben.", explanation: "Rechne am besten erst die Zehner und dann die Einer. Bei 34 + 25 rechnest du 30 + 20 und 4 + 5. Danach addierst du die Ergebnisse.", difficulty: "easy" },
    { title: "Malnehmen und Teilen", skill: "multiply", icon: "×", description: "Die ersten Malaufgaben und das Teilen verstehen.", explanation: "Multiplizieren bedeutet, gleich große Gruppen zusammenzuzählen. 4 · 3 heißt zum Beispiel: vier Gruppen mit je drei Dingen. Teilen verteilt eine Menge gleichmäßig.", difficulty: "easy" },
    { title: "Geld und Uhrzeit", skill: "money", icon: "◷", description: "Mit Euro und Cent rechnen.", explanation: "100 Cent sind 1 Euro. Rechne Euro und Cent übersichtlich getrennt und fasse am Ende zusammen. Achte darauf, dass 60 Minuten eine Stunde sind.", difficulty: "easy" },
    { title: "Zahlenfolgen bis 100", skill: "compare", icon: "→", description: "Regelmäßige Zahlenmuster entdecken.", explanation: "Vergleiche benachbarte Zahlen und bestimme den Schritt, der sich wiederholt.", difficulty: "easy" },
    { title: "Verdoppeln und Halbieren", skill: "add", icon: "½", description: "Zahlen bis 100 geschickt verdoppeln und halbieren.", explanation: "Beim Verdoppeln addierst du eine Zahl zu sich selbst. Beim Halbieren teilst du sie durch zwei.", difficulty: "easy" },
    { title: "Einmaleins vorbereiten", skill: "multiply", icon: "×", description: "Gleich große Gruppen zusammenfassen.", explanation: "Wiederholte Plusaufgaben kannst du als Malaufgabe schreiben: drei Gruppen mit vier Dingen sind 3 × 4.", difficulty: "easy" }
  ],
  3: [
    { title: "Das Einmaleins", skill: "multiply", icon: "×", description: "Malaufgaben sicher lösen und nutzen.", explanation: "Beim Malnehmen hilft Tauschaufgabe: 3 · 7 ist genauso viel wie 7 · 3. Wenn du eine Aufgabe kennst, kannst du oft auch die passende Geteiltaufgabe lösen.", difficulty: "easy" },
    { title: "Schriftlich addieren", skill: "add", icon: "＋", description: "Größere Zahlen ordentlich zusammenzählen.", explanation: "Schreibe Einer unter Einer und Zehner unter Zehner. Addiere von rechts nach links. Wenn eine Spalte mehr als 9 ergibt, überträgst du den Zehner in die nächste Spalte.", difficulty: "hard" },
    { title: "Brüche kennenlernen", skill: "fractions", icon: "½", description: "Einfache Bruchteile von Mengen bestimmen.", explanation: "Der Nenner zeigt, in wie viele gleich große Teile das Ganze geteilt wird. Der Zähler sagt, wie viele dieser Teile du nimmst. Ein Viertel von 20 bedeutet also 20 geteilt durch 4.", difficulty: "easy" },
    { title: "Schriftlich subtrahieren", skill: "add", icon: "−", description: "Größere Zahlen sicher voneinander abziehen.", explanation: "Schreibe gleiche Stellenwerte untereinander und rechne von rechts nach links.", difficulty: "hard" },
    { title: "Umfang entdecken", skill: "geometry", icon: "□", description: "Die Seitenlängen einfacher Rechtecke zusammenzählen.", explanation: "Der Umfang ist die Länge des Weges einmal außen um eine Form herum.", difficulty: "hard" },
    { title: "Sachaufgaben mit Geld", skill: "money", icon: "€", description: "Preise und Gesamtbeträge berechnen.", explanation: "Multipliziere den Preis eines Gegenstands mit der Anzahl der Gegenstände.", difficulty: "easy" }
  ],
  4: [
    { title: "Schriftlich multiplizieren", skill: "multiply", icon: "×", description: "Malaufgaben mit größeren Zahlen rechnen.", explanation: "Zerlege eine Zahl in Einer, Zehner und Hunderter oder rechne schriftlich Stelle für Stelle. Prüfe dein Ergebnis, indem du grob überschlägst.", difficulty: "hard" },
    { title: "Dezimalzahlen", skill: "decimal", icon: ",", description: "Kommazahlen addieren und vergleichen.", explanation: "Stelle beim Rechnen die Kommas genau untereinander. Du kannst fehlende Nachkommastellen mit Nullen ergänzen: 2,5 ist dasselbe wie 2,50.", difficulty: "easy" },
    { title: "Umfang und Fläche", skill: "geometry", icon: "□", description: "Umfang und Fläche von Rechtecken berechnen.", explanation: "Der Umfang ist die Strecke einmal außen herum: alle Seiten addieren. Die Fläche eines Rechtecks berechnest du mit Länge mal Breite.", difficulty: "hard" },
    { title: "Schriftlich addieren", skill: "add", icon: "＋", description: "Mehrstellige Zahlen addieren und überschlagen.", explanation: "Addiere von rechts nach links und übertrage Zehner in die nächste Spalte.", difficulty: "hard" },
    { title: "Längen umrechnen", skill: "units", icon: "↔", description: "Meter und Zentimeter sicher ineinander umwandeln.", explanation: "Ein Meter sind 100 Zentimeter. Multipliziere mit 100, um Meter in Zentimeter umzuwandeln.", difficulty: "easy" },
    { title: "Bruchteile bestimmen", skill: "fractions", icon: "¼", description: "Einfache Bruchteile von Zahlen und Mengen berechnen.", explanation: "Teile die Menge durch den Nenner, um einen Teil zu erhalten.", difficulty: "easy" }
  ],
  5: [
    { title: "Natürliche Zahlen", skill: "add", icon: "＋", description: "Mit großen Zahlen sicher rechnen.", explanation: "Beim schriftlichen Rechnen stehen gleiche Stellenwerte untereinander. Überschlage vorher, damit du merkst, ob dein Ergebnis ungefähr passen kann.", difficulty: "easy" },
    { title: "Brüche verstehen", skill: "fractions", icon: "¾", description: "Bruchteile berechnen und Brüche vergleichen.", explanation: "Um einen Bruchteil einer Zahl zu finden, teilst du zuerst durch den Nenner und multiplizierst dann mit dem Zähler. Beispiel: 3/4 von 20 = 20 : 4 · 3.", difficulty: "hard" },
    { title: "Einheiten umrechnen", skill: "units", icon: "↔", description: "Längen- und Maßeinheiten umwandeln.", explanation: "1 Meter sind 100 Zentimeter. Beim Umwandeln in eine kleinere Einheit wird die Zahl größer; in eine größere Einheit wird sie kleiner.", difficulty: "easy" },
    { title: "Dezimalzahlen addieren", skill: "decimal", icon: ",", description: "Kommazahlen mit einer Nachkommastelle addieren.", explanation: "Stelle die Kommas untereinander und addiere die Zahlen wie gewohnt.", difficulty: "easy" },
    { title: "Flächen berechnen", skill: "geometry", icon: "□", description: "Flächeninhalte von Rechtecken bestimmen.", explanation: "Die Fläche eines Rechtecks ist Länge mal Breite. Die Einheit wird dabei quadriert.", difficulty: "hard" },
    { title: "Prozent im Alltag", skill: "percent", icon: "%", description: "Einfache Prozente von Mengen berechnen.", explanation: "10 % ist ein Zehntel und 50 % die Hälfte. Nutze bekannte Anteile, um Prozente zu finden.", difficulty: "easy" }
  ],
  6: [
    { title: "Brüche addieren", skill: "fractions", icon: "½", description: "Brüche mit gleichem Nenner zusammenzählen.", explanation: "Wenn die Nenner gleich sind, addierst oder subtrahierst du nur die Zähler. Der Nenner bleibt gleich. Kürze das Ergebnis, wenn Zähler und Nenner einen gemeinsamen Teiler haben.", difficulty: "hard" },
    { title: "Dezimalzahlen", skill: "decimal", icon: ",", description: "Kommazahlen addieren, subtrahieren und runden.", explanation: "Achte beim schriftlichen Rechnen darauf, dass die Kommas untereinander stehen. Zum Runden schaust du auf die Stelle rechts neben der Stelle, auf die du runden sollst.", difficulty: "easy" },
    { title: "Prozent verstehen", skill: "percent", icon: "%", description: "Einfache Prozente von einer Zahl berechnen.", explanation: "Prozent bedeutet „von hundert“. 10 % findest du, indem du durch 10 teilst; 25 % sind ein Viertel. Nutze diese einfachen Anteile, um weiterzurechnen.", difficulty: "hard" },
    { title: "Brüche subtrahieren", skill: "fractions", icon: "−", description: "Brüche mit gleichen Nennern voneinander abziehen.", explanation: "Bei gleichem Nenner ziehst du die Zähler ab; der Nenner bleibt gleich.", difficulty: "hard" },
    { title: "Dreisatz im Alltag", skill: "ratio", icon: "↗", description: "Proportionale Zusammenhänge berechnen.", explanation: "Berechne erst den Wert für eine Einheit und multipliziere dann mit der gesuchten Anzahl.", difficulty: "easy" },
    { title: "Negative Zahlen", skill: "negative", icon: "−", description: "Erste Rechenaufgaben mit negativen Zahlen lösen.", explanation: "Auf dem Zahlenstrahl gehst du bei einer negativen Zahl nach links und bei einer positiven nach rechts.", difficulty: "hard" }
  ],
  7: [
    { title: "Negative Zahlen", skill: "negative", icon: "−", description: "Mit positiven und negativen Zahlen rechnen.", explanation: "Auf dem Zahlenstrahl liegen negative Zahlen links von null. Beim Addieren einer negativen Zahl gehst du nach links; beim Subtrahieren einer negativen Zahl nach rechts.", difficulty: "hard" },
    { title: "Terme und Gleichungen", skill: "equation", icon: "x", description: "Unbekannte mit Umkehroperationen bestimmen.", explanation: "Eine Gleichung bleibt im Gleichgewicht, wenn du auf beiden Seiten dieselbe Rechenoperation ausführst. Mache die Rechenschritte rückwärts, um x allein zu bekommen.", difficulty: "hard" },
    { title: "Proportionalität", skill: "ratio", icon: "↗", description: "Zusammenhänge mit Dreisatz lösen.", explanation: "Bei einem proportionalen Zusammenhang werden beide Größen mit demselben Faktor vervielfacht. Rechne zuerst auf eine Einheit herunter und dann auf die gesuchte Menge hoch.", difficulty: "easy" },
    { title: "Prozentrechnung", skill: "percent", icon: "%", description: "Grundwerte und Prozentwerte berechnen.", explanation: "Berechne einen Prozentwert, indem du den Grundwert mit dem Prozentsatz multiplizierst und durch 100 teilst.", difficulty: "hard" },
    { title: "Brüche und Dezimalzahlen", skill: "fractions", icon: "¾", description: "Bruchteile von Zahlen sicher bestimmen.", explanation: "Teile zuerst durch den Nenner und multipliziere anschließend mit dem Zähler.", difficulty: "hard" },
    { title: "Wahrscheinlichkeit", skill: "probability", icon: "◌", description: "Einfache Zufallsexperimente auswerten.", explanation: "Die Wahrscheinlichkeit ist der Anteil günstiger Ergebnisse an allen möglichen Ergebnissen.", difficulty: "easy" }
  ],
  8: [
    { title: "Lineare Gleichungen", skill: "equation", icon: "x", description: "Gleichungen Schritt für Schritt lösen.", explanation: "Bringe zuerst alle x-Terme auf eine Seite und die Zahlen auf die andere. Fasse gleichartige Terme zusammen und teile zuletzt durch den Faktor vor x.", difficulty: "hard" },
    { title: "Potenzen und Wurzeln", skill: "powers", icon: "²", description: "Quadratzahlen und ihre Wurzeln erkennen.", explanation: "Eine Potenz wie 5² bedeutet 5 · 5. Die Quadratwurzel ist die Umkehroperation: √25 = 5, denn 5² = 25.", difficulty: "hard" },
    { title: "Satz des Pythagoras", skill: "pythagoras", icon: "△", description: "Fehlende Seiten im rechtwinkligen Dreieck finden.", explanation: "Im rechtwinkligen Dreieck gilt a² + b² = c². Die längste Seite c liegt gegenüber dem rechten Winkel. Ziehe am Ende die Wurzel, um die Seitenlänge zu erhalten.", difficulty: "hard" },
    { title: "Lineare Funktionen", skill: "linear", icon: "y", description: "Funktionswerte linearer Funktionen berechnen.", explanation: "Setze den gegebenen x-Wert in y = mx + b ein und berechne y.", difficulty: "hard" },
    { title: "Prozent und Zinsen", skill: "percent", icon: "%", description: "Prozentwerte und einfache Zinsen bestimmen.", explanation: "Berechne den Prozentwert mit Grundwert mal Prozentsatz geteilt durch 100.", difficulty: "hard" },
    { title: "Dreisatz und Verhältnis", skill: "ratio", icon: "↗", description: "Proportionale Zuordnungen sicher lösen.", explanation: "Bestimme den Wert für eine Einheit und rechne danach auf die gesuchte Menge hoch.", difficulty: "easy" }
  ],
  9: [
    { title: "Quadratische Gleichungen", skill: "quadratic", icon: "x²", description: "Einfache quadratische Gleichungen lösen.", explanation: "Bei x² = a suchst du die Zahl, deren Quadrat a ergibt. Für positive a gibt es zwei Lösungen: die positive und die negative Wurzel.", difficulty: "hard" },
    { title: "Funktionen und Geraden", skill: "linear", icon: "↗", description: "Steigung und Funktionswerte untersuchen.", explanation: "In y = mx + b gibt m die Steigung und b den Startwert an. Um einen Funktionswert zu berechnen, setzt du den gegebenen x-Wert ein.", difficulty: "hard" },
    { title: "Wahrscheinlichkeit", skill: "probability", icon: "◌", description: "Einfache Wahrscheinlichkeiten berechnen.", explanation: "Bei gleich wahrscheinlichen Ergebnissen gilt: Wahrscheinlichkeit = günstige Ergebnisse geteilt durch alle möglichen Ergebnisse. Für Prozent multiplizierst du den Bruch mit 100.", difficulty: "easy" },
    { title: "Potenzen und Wurzeln", skill: "powers", icon: "√", description: "Quadratwurzeln und Quadratzahlen zuordnen.", explanation: "Die Quadratwurzel macht das Quadrieren rückgängig: √a ist die Zahl, die mit sich selbst multipliziert a ergibt.", difficulty: "hard" },
    { title: "Flächen im Koordinatensystem", skill: "geometry", icon: "□", description: "Umfang und Fläche einfacher Figuren berechnen.", explanation: "Für ein Rechteck berechnest du die Fläche mit Länge mal Breite und den Umfang mit der Summe seiner Seiten.", difficulty: "hard" },
    { title: "Terme vereinfachen", skill: "equation", icon: "x", description: "Einfache Gleichungen mit einer Unbekannten lösen.", explanation: "Führe auf beiden Seiten dieselbe Rechenoperation aus, bis die Unbekannte allein steht.", difficulty: "hard" }
  ],
  10: [
    { title: "Quadratische Funktionen", skill: "quadratic", icon: "x²", description: "Quadrate, Nullstellen und Lösungen üben.", explanation: "Quadratische Zusammenhänge enthalten x². Bei x² = a erhältst du durch Wurzelziehen zwei Lösungen: √a und −√a. Setze die Lösungen zur Kontrolle wieder ein.", difficulty: "hard" },
    { title: "Trigonometrie", skill: "trig", icon: "△", description: "Seitenverhältnisse im rechtwinkligen Dreieck nutzen.", explanation: "Sinus eines Winkels = Gegenkathete geteilt durch Hypotenuse. Cosinus = Ankathete geteilt durch Hypotenuse. Achte darauf, den Taschenrechner auf Grad einzustellen.", difficulty: "hard" },
    { title: "Prozent- und Zinsrechnung", skill: "percent", icon: "%", description: "Prozentwerte und einfache Zinsen bestimmen.", explanation: "Der Prozentwert ist Grundwert mal Prozentsatz geteilt durch 100. Bei einfachen Jahreszinsen kannst du die Zinsen für ein Jahr genauso berechnen.", difficulty: "easy" },
    { title: "Lineare Funktionen", skill: "linear", icon: "↗", description: "Steigung und Funktionswerte berechnen.", explanation: "In y = mx + b beschreibt m die Steigung und b den Schnittpunkt mit der y-Achse.", difficulty: "hard" },
    { title: "Wahrscheinlichkeit", skill: "probability", icon: "◌", description: "Wahrscheinlichkeiten als Prozentwerte angeben.", explanation: "Teile günstige durch mögliche Ergebnisse und multipliziere mit 100.", difficulty: "easy" },
    { title: "Bruchterme und Anteile", skill: "fractions", icon: "¾", description: "Bruchteile und proportionale Anteile berechnen.", explanation: "Teile zuerst durch den Nenner und multipliziere dann mit dem Zähler.", difficulty: "hard" }
  ]
};

// Zusätzliche Mathe‑Übungen: erweitere das bestehende Curriculum um mehr Themen pro Klassenstufe
(function addExtraMathTopics() {
  const extras = {
    1: [
      { title: "Zahlenrätsel", skill: "compare", icon: "→", description: "Kleine Rätsel mit Zahlenfolgen und Lücken lösen.", explanation: "Finde das Muster und setze die Reihe fort. Nutze Zählen oder Rechenregeln.", difficulty: "easy" },
      { title: "Formen legen", skill: "shapes", icon: "◇", description: "Formen zusammensetzen und wiedererkennen.", explanation: "Setze aus einfachen Formen neue Formen zusammen und zähle Ecken und Seiten.", difficulty: "easy" }
    ],
    2: [
      { title: "Münzen zählen", skill: "money", icon: "€", description: "Kleine Aufgaben mit Euro und Cent rechnen.", explanation: "Rechne Preise zusammen und löse kleine Wechselgeldaufgaben.", difficulty: "easy" },
      { title: "Tauschaufgaben", skill: "add", icon: "+", description: "Aufgaben zum Umkehren (z. B. 5 + ? = 12).", explanation: "Löse Aufgaben durch Überlegen, welche Zahl fehlt, und übe Kopfrechnen.", difficulty: "easy" }
    ],
    3: [
      { title: "Einmaleins‑Training", skill: "multiply", icon: "×", description: "Schnelle Übungen zum Einmaleins vertiefen.", explanation: "Trainiere kleine Reihen (2er, 3er, 5er, 10er) mit kurzen Aufgaben und Wiederholungen.", difficulty: "easy" },
      { title: "Sachtextaufgaben", skill: "money", icon: "€", description: "Texte lesen und passende Rechenwege finden.", explanation: "Lies die Aufgabe genau, markiere Zahlen und entscheide, ob du addieren, multiplizieren oder teilen musst.", difficulty: "easy" }
    ],
    4: [
      { title: "Kommazahlen vertiefen", skill: "decimal", icon: ",", description: "Addition und Subtraktion mit einer Nachkommastelle.", explanation: "Richte die Kommas aus und rechne wie bei ganzen Zahlen, runde bei Bedarf.", difficulty: "easy" },
      { title: "Längen schätzen", skill: "units", icon: "m", description: "Schätze Längen und vergleiche Einheiten.", explanation: "Übe Abschätzungen und kontrolliere mit Messungen; rechne zwischen cm, m und km um.", difficulty: "easy" }
    ],
    5: [
      { title: "Bruchteile anwenden", skill: "fractions", icon: "½", description: "Brüche in Sachaufgaben verwenden.", explanation: "Berechne Teile einer Menge und setze Brüche in Kontextaufgaben um.", difficulty: "easy" },
      { title: "Prozentaufgaben", skill: "percent", icon: "%", description: "Prozentrechnung bei einfachen Beispielen.", explanation: "Berechne Rabatte und Teile eines Ganzen mit Prozentangaben.", difficulty: "easy" }
    ],
    6: [
      { title: "Brüche kürzen", skill: "fractions", icon: "½", description: "Brüche vereinfachen und kürzen.", explanation: "Teile Zähler und Nenner durch gemeinsame Teiler, um den Bruch zu vereinfachen.", difficulty: "hard" },
      { title: "Proportionale Aufgaben", skill: "ratio", icon: "↗", description: "Anwendungsaufgaben mit Verhältnissen lösen.", explanation: "Nutze den Dreisatz, um proportionale Mengen umzurechnen und anzuwenden.", difficulty: "hard" }
    ],
    7: [
      { title: "Terme üben", skill: "equation", icon: "x", description: "Umformen und Einsetzen in Termen üben.", explanation: "Fasse gleichartige Terme zusammen und löse einfache Gleichungen durch Umformen.", difficulty: "hard" },
      { title: "Negative Aufgaben vertiefen", skill: "negative", icon: "−", description: "Aufgaben mit Vorzeichen sicher rechnen.", explanation: "Nutze den Zahlenstrahl oder Regeln für Plus/Minus, um Vorzeichenaufgaben zu lösen.", difficulty: "hard" }
    ],
    8: [
      { title: "Lineare Funktionen Übung", skill: "linear", icon: "y", description: "Mehr Übungen zu Steigung und Schnittpunkt.", explanation: "Untersuche Funktionswerte und zeichne einfache lineare Funktionen in ein Koordinatensystem.", difficulty: "hard" },
      { title: "Potenzen anwenden", skill: "powers", icon: "²", description: "Mit Quadratzahlen und kleinen Potenzen rechnen.", explanation: "Übe Rechenregeln für Potenzen und einfache Wurzelaufgaben.", difficulty: "hard" }
    ],
    9: [
      { title: "Quadratische Anwendungen", skill: "quadratic", icon: "x²", description: "Anwendungsaufgaben mit Quadraten und Formeln.", explanation: "Setze Werte in einfache quadratische Formeln ein und löse praktische Aufgaben.", difficulty: "hard" },
      { title: "Wahrscheinlichkeiten vertiefen", skill: "probability", icon: "◌", description: "Kombinatorische Fragestellungen und Prozentangaben.", explanation: "Analysiere mehrere Ereignisse und berechne zusammengesetzte Wahrscheinlichkeiten.", difficulty: "hard" }
    ],
    10: [
      { title: "Trigonometrie Aufgaben", skill: "trig", icon: "△", description: "Praktische Anwendungen von sin/cos in Dreiecken.", explanation: "Berechne fehlende Seiten oder Winkel mithilfe bekannter Seitenverhältnisse und trigonometrischer Funktionen.", difficulty: "hard" },
      { title: "Anwendungsaufgaben", skill: "linear", icon: "y", description: "Komplexere Aufgaben mit mehreren Rechenschritten.", explanation: "Zerlege die Aufgabe in einzelne Schritte, löse Teilaufgaben und setze die Ergebnisse zusammen.", difficulty: "hard" }
    ]
  };

  for (const g in extras) {
    if (Object.prototype.hasOwnProperty.call(extras, g)) {
      curriculum[g] = (curriculum[g] || []).concat(extras[g]);
    }
  }
})();

const germanTopicTemplates = [
  { title: "Rechtschreibung", skill: "de-spelling", icon: "Ä", description: "Wörter richtig schreiben und Schreibmuster erkennen.", explanation: "Lies das Wort aufmerksam und achte auf die Buchstabenfolge. Sprich schwierige Wörter langsam mit." },
  { title: "Wortarten", skill: "de-wordclass", icon: "W", description: "Nomen, Verben und Adjektive unterscheiden.", explanation: "Nomen bezeichnen Dinge oder Lebewesen, Verben Tätigkeiten und Adjektive Eigenschaften." },
  { title: "Satzbau", skill: "de-wordorder", icon: "S", description: "Wörter zu verständlichen Sätzen ordnen.", explanation: "Im Aussagesatz steht das gebeugte Verb meistens an zweiter Stelle. Achte auch auf Großschreibung und Satzzeichen." },
  { title: "Wortschatz", skill: "de-vocabulary", icon: "↔", description: "Bedeutungen, Synonyme und passende Wörter finden.", explanation: "Synonyme haben eine ähnliche Bedeutung. Lies die Antwortmöglichkeiten genau und suche das passende Wort." },
  { title: "Grammatik", skill: "de-grammar", icon: "G", description: "Verben passend zu Person und Zeitform verwenden.", explanation: "Die Verbform passt sich an die Person und die Zeitform an. Achte auf die Endung des Verbs." },
  { title: "Zeichensetzung", skill: "de-punctuation", icon: ".,", description: "Satzzeichen sicher setzen.", explanation: "Aussagesätze enden mit einem Punkt, Fragen mit einem Fragezeichen. In längeren Sätzen trennen Kommas Satzteile." },
  { title: "Lesen mit Verständnis", skill: "de-reading", icon: "📖", description: "Kurze Texte lesen und Fragen zum Inhalt beantworten.", explanation: "Lies den Text aufmerksam, markiere wichtige Informationen und beantworte die Fragen mit vollständigen Sätzen." },
  { title: "Komposita & Wortbildung", skill: "de-words", icon: "🔗", description: "Wörter zusammensetzen und Wortteile erkennen.", explanation: "Untersuche zusammengesetzte Wörter (Komposita) und finde Bedeutungsteile wie Vorsilben oder Endungen." },
  { title: "Groß‑ und Kleinschreibung", skill: "de-capitalization", icon: "A", description: "Regeln zur Großschreibung üben.", explanation: "Nomen werden im Deutschen großgeschrieben. Achte außerdem auf Satzanfänge und Eigennamen." },
  { title: "Synonyme & Antonyme", skill: "de-vocabulary", icon: "↔", description: "Wortbedeutungen vergleichen und Gegenteile finden.", explanation: "Finde Wörter mit ähnlicher Bedeutung (Synonyme) und solche mit entgegengesetzter Bedeutung (Antonyme)." }
];

// Explizites deutsches Curriculum pro Klassenstufe (angepasst an Lernniveau)
const germanCurriculum = {
  1: [
    { title: "Rechtschreibung (Grundlagen)", skill: "de-spelling", icon: "Ä", description: "Einfache Wörter richtig schreiben.", explanation: "Lies das Wort langsam und höre die Silben. Merke dir schwierige Buchstabenverbindungen.", difficulty: "easy" },
    { title: "Wortarten (Einführung)", skill: "de-wordclass", icon: "W", description: "Nomen, Verben und Adjektive kennenlernen.", explanation: "Erkenne, ob ein Wort eine Sache (Nomen), eine Tätigkeit (Verb) oder eine Eigenschaft (Adjektiv) benennt.", difficulty: "easy" },
    { title: "Satzbau (einfach)", skill: "de-wordorder", icon: "S", description: "Einfache Sätze bilden und ordnen.", explanation: "Baue einen Satz aus Subjekt, Prädikat und Objekt. Achte auf die Reihenfolge.", difficulty: "easy" },
    { title: "Lesen mit Verständnis (Kurztexte)", skill: "de-reading", icon: "📖", description: "Kurze Texte lesen und Fragen beantworten.", explanation: "Lies den Text und beantworte einfache Fragen zum Inhalt.", difficulty: "easy" }
  ],
  2: [
    { title: "Rechtschreibung: Dehnungs‑ und Verdoppelungsregeln", skill: "de-spelling", icon: "Ä", description: "Wörter mit doppelten Buchstaben und Dehnungszeichen üben.", explanation: "Achte auf Lautfolgen und typische Schreibmuster (z. B. 'ss' vs. 'ß').", difficulty: "easy" },
    { title: "Wortarten (übungen)", skill: "de-wordclass", icon: "W", description: "Wortarten erkennen in kurzen Sätzen.", explanation: "Finde Nomen, Verben und Adjektive im Satz und benenne sie.", difficulty: "easy" },
    { title: "Satzbau: Fragen & Antworten", skill: "de-wordorder", icon: "S", description: "Fragen bilden und beantworten.", explanation: "Formuliere Fragen zu einer Aussage und achte auf das Verb an zweiter Stelle.", difficulty: "easy" },
    { title: "Wortschatz: Gegenstände & Orte", skill: "de-vocabulary", icon: "↔", description: "Begriffe für Alltagssituationen lernen.", explanation: "Ordne Wörter Themen zu (z. B. Schule, Küche, Natur).", difficulty: "easy" }
  ],
  3: [
    { title: "Rechtschreibung: Großschreibung", skill: "de-capitalization", icon: "A", description: "Nomen und Satzanfänge richtig großschreiben.", explanation: "Erkenne Nomen und setze Großbuchstaben am Satzanfang ein.", difficulty: "easy" },
    { title: "Satzbau: Nebensätze (einfach)", skill: "de-wordorder", icon: "S", description: "Einfache Nebensätze verstehen und bilden.", explanation: "Füge Nebensätze an Hauptsätze an und achte auf die Verbposition.", difficulty: "easy" },
    { title: "Lesen mit Verständnis: kurze Geschichten", skill: "de-reading", icon: "📖", description: "Kurzgeschichten lesen und Fragen beantworten.", explanation: "Finde die Hauptpersonen, Handlungen und den Schluss im Text.", difficulty: "easy" },
    { title: "Wortschatz & Komposita", skill: "de-words", icon: "🔗", description: "Wörter zusammensetzen (Komposita) üben.", explanation: "Bilde zusammengesetzte Wörter und erkenne Bedeutungsanteile.", difficulty: "easy" }
  ],
  4: [
    { title: "Zeichensetzung: Komma & Fragezeichen", skill: "de-punctuation", icon: ".,", description: "Kommas bei Aufzählungen und einfache Fragen setzen.", explanation: "Setze Kommas in Aufzählungen und Fragezeichen bei Fragesätzen.", difficulty: "easy" },
    { title: "Rechtschreibung: schwierige Laute", skill: "de-spelling", icon: "Ä", description: "Wörter mit äu/ei, äu/ei und ähnlichen Lauten üben.", explanation: "Erkenne häufige Stolperstellen in der Schreibweise und übe sie.", difficulty: "easy" },
    { title: "Lesen: Hauptaussage finden", skill: "de-reading", icon: "📖", description: "Die Hauptaussage eines kurzen Textes bestimmen.", explanation: "Fasse in einem Satz zusammen, worum es im Text geht.", difficulty: "easy" }
  ],
  5: [
    { title: "Grammatik: Zeiten (Präsens, Präteritum)", skill: "de-grammar", icon: "G", description: "Verben in verschiedenen Zeiten verwenden.", explanation: "Setze Verben korrekt in Präsens und Präteritum ein.", difficulty: "medium" },
    { title: "Lesen: Information entnehmen", skill: "de-reading", icon: "📖", description: "Texte lesen und Informationen gezielt entnehmen.", explanation: "Markiere wichtige Fakten und beantworte gezielte Fragen.", difficulty: "medium" },
    { title: "Komposita & Wortbildung (erweitert)", skill: "de-words", icon: "🔗", description: "Längere zusammengesetzte Wörter analysieren.", explanation: "Zerlege Komposita in ihre Bestandteile und erkläre die Bedeutung.", difficulty: "medium" }
  ],
  6: [
    { title: "Zeichensetzung: Kommas bei Nebensätzen", skill: "de-punctuation", icon: ".,", description: "Kommas bei Nebensätzen korrekt setzen.", explanation: "Erkenne Nebensätze und setze Kommas zur Abtrennung.", difficulty: "medium" },
    { title: "Synonyme & Antonyme", skill: "de-vocabulary", icon: "↔", description: "Wortfelder und Gegenteile erkennen.", explanation: "Finde passende Synonyme und Antonyme zu vorgegebenen Wörtern.", difficulty: "medium" },
    { title: "Lesen: Textstruktur erkennen", skill: "de-reading", icon: "📖", description: "Einleitung, Hauptteil, Schluss unterscheiden.", explanation: "Analysiere kurze Texte nach Aufbau und Absichten des Autors.", difficulty: "medium" }
  ],
  7: [
    { title: "Grammatik: Satzglieder und Fälle", skill: "de-grammar", icon: "G", description: "Subjekt, Objekt, Fälle (Nominativ, Akkusativ) erkennen.", explanation: "Unterscheide Satzglieder und bestimme den Fall von Nomen.", difficulty: "hard" },
    { title: "Argumentation: Meinung begründen (einfach)", skill: "de-reading", icon: "💬", description: "Kurze Texte lesen und eine eigene Meinung formulieren.", explanation: "Formuliere eine kurze Begründung mit Einleitung, Argument und Schluss.", difficulty: "hard" },
    { title: "Rechtschreibung: Wortstamm & Ableitungen", skill: "de-spelling", icon: "Ä", description: "Stammbildungen erkennen und ableiten.", explanation: "Leite neue Wörter von bekannten Stammwörtern ab.", difficulty: "hard" }
  ],
  8: [
    { title: "Textanalyse: Stilmittel erkennen", skill: "de-reading", icon: "🔎", description: "Metaphern, Vergleiche und Wiederholungen identifizieren.", explanation: "Finde sprachliche Mittel im Text und erkläre ihre Wirkung.", difficulty: "hard" },
    { title: "Grammatik: Konjunktiv & indirekte Rede (Einführung)", skill: "de-grammar", icon: "G", description: "Indirekte Rede und Konjunktiv kennenlernen.", explanation: "Unterscheide direkte und indirekte Rede und übe einfache Umformulierungen.", difficulty: "hard" },
    { title: "Textproduktion: kurzer Erörterungstext", skill: "de-writing", icon: "✍️", description: "Eine kurze, strukturierte Stellungnahme schreiben.", explanation: "Formuliere eine These, zwei Argumente und ein kurzes Fazit.", difficulty: "hard" }
  ],
  9: [
    { title: "Textinterpretation: Kurztexte analysieren", skill: "de-reading", icon: "🔎", description: "Intensivere Analyse von Erzähltexten und Sachtexten.", explanation: "Untersuche Perspektive, Zeitstruktur und Motivik im Text.", difficulty: "hard" },
    { title: "Rhetorik: Argumentationsstrukturen", skill: "de-writing", icon: "💬", description: "Argumente strukturieren und Gegenargumente berücksichtigen.", explanation: "Baue eine differenzierte Argumentation mit Beispielen auf.", difficulty: "hard" },
    { title: "Sprachgebrauch & Stil", skill: "de-words", icon: "✒️", description: "Formeller vs. informeller Sprachgebrauch erkennen.", explanation: "Unterscheide Sprachstile und passe Ton und Wortwahl an die Zielgruppe an.", difficulty: "hard" }
  ],
  10: [
    { title: "Literaturanalyse (eingeführt)", skill: "de-reading", icon: "📚", description: "Analyse von Kurzprosa und Auszügen aus längeren Werken.", explanation: "Arbeite mit Textstellen, interpretiere Symbolik und Form.", difficulty: "hard" },
    { title: "Erörterung & Argumentation (erweitert)", skill: "de-writing", icon: "✍️", description: "Komplexe Erörterungen schreiben und sprachlich gestalten.", explanation: "Führe mehrere Argumentationsschritte aus und formuliere ein begründetes Schlussurteil.", difficulty: "hard" },
    { title: "Stilmittel & Sprachkritik", skill: "de-reading", icon: "🔎", description: "Tiefere Analyse sprachlicher Mittel und deren Wirkung.", explanation: "Bewerte, wie Stilmittel Leser lenken und welche Wirkung sie erzielen.", difficulty: "hard" }
  ]
};

const icons = {
  add: ["＋", "−"], compare: ["?", "→"], shapes: ["△", "□"],
  multiply: ["×", "÷"], money: ["€", "¢"], fractions: ["½", "¼"],
  decimal: [",", "·"], geometry: ["□", "↔"], units: ["m", "cm"],
  percent: ["%", "¼"], negative: ["−", "+"], equation: ["x", "="],
  ratio: ["↗", "×"], powers: ["²", "√"], pythagoras: ["△", "²"],
  quadratic: ["x²", "√"], linear: ["y", "x"], probability: ["%", "⅟"],
  trig: ["sin", "cos"], "de-spelling": ["Ä", "ß"], "de-wordclass": ["W", "A"],
  "de-wordorder": ["S", "→"], "de-vocabulary": ["↔", "W"],
  "de-grammar": ["G", "V"], "de-punctuation": [".", ","]
};

const dashboard = document.querySelector("#dashboard");
const lessonView = document.querySelector("#lesson");
const parentReport = document.querySelector("#parent-report");
const gradeSelect = document.querySelector("#grade-select");
const subjectSelect = document.querySelector("#subject-select");
const topicGrid = document.querySelector("#topic-grid");
const topicsTitle = document.querySelector("#topics-title");
const topicCount = document.querySelector("#topic-count");
const completedCount = document.querySelector("#completed-count");
const coinCount = document.querySelector("#coin-count");
const homeLink = document.querySelector("#home-link");
const parentButton = document.querySelector("#parent-button");
const welcomeEyebrow = document.querySelector("#welcome-eyebrow");
const welcomeTitle = document.querySelector("#welcome-title");

let saved = {};
try {
  const savedRaw = localStorage.getItem("mathekompass-progress");
  saved = savedRaw ? JSON.parse(savedRaw) : {};
} catch (error) {
  console.warn("Ungültige Lern-App-Daten in localStorage – Standardwerte werden geladen.", error);
  saved = {};
}

if (!saved || typeof saved !== "object") {
  saved = {};
}

const savedSessions = Array.isArray(saved.sessions) ? saved.sessions : [];
const progress = {
  // Default to grade 1 for new users (was 5) so the UI shows Klasse 1 by default
  grade: Number.isInteger(saved.grade) && saved.grade >= 1 && saved.grade <= 10 ? saved.grade : 1,
  subject: saved.subject === "german" ? "german" : "math",
  completed: Number.isInteger(saved.completed) && saved.completed >= 0 ? saved.completed : 0,
  topics: saved.topics && typeof saved.topics === "object" ? saved.topics : {},
  sessions: savedSessions.filter((session) =>
    session && ["math", "german"].includes(session.subject) &&
    Number.isInteger(session.grade) && session.grade >= 1 && session.grade <= 10 &&
    typeof session.topicTitle === "string" &&
    Number.isInteger(session.correct) && session.correct >= 0 &&
    Number.isInteger(session.total) && session.total > 0 && session.correct <= session.total &&
    typeof session.completedAt === "string" && Number.isFinite(Date.parse(session.completedAt))
  )
};

syncPlatformUnlock();

let activeLesson = null;

function persistProgress() {
  localStorage.setItem("mathekompass-progress", JSON.stringify(progress));
  syncPlatformUnlock();
}

function syncPlatformUnlock() {
  const coinBalance = getCoinBalance();
  localStorage.setItem("gamehub-coin-balance", String(coinBalance));
  localStorage.setItem("gamehub-plays-left", String(coinBalance));
  localStorage.setItem("gamehub-lern-app-unlocked", String(coinBalance > 0));
  if (coinCount) {
    coinCount.textContent = String(coinBalance);
  }
}

function renderDashboard() {
  dashboard.hidden = false;
  lessonView.hidden = true;
  parentReport.hidden = true;
  gradeSelect.value = String(progress.grade);
  subjectSelect.value = progress.subject;
  completedCount.textContent = String(progress.completed);
  if (coinCount) {
    coinCount.textContent = String(getCoinBalance());
  }
  const subjectName = progress.subject === "german" ? "Deutsch" : "Mathe";
  welcomeEyebrow.textContent = `DEIN ${subjectName.toLocaleUpperCase("de-DE")}-LERNPLATZ`;
  welcomeTitle.textContent = `${subjectName}, Schritt für Schritt.`;
  topicsTitle.textContent = `Themen für Klasse ${progress.grade}`;

  const topics = (progress.subject === "german" ? germanCurriculum : curriculum)[progress.grade];
  topicCount.textContent = `${topics.length} Themen`;
  topicGrid.innerHTML = topics.map((topic, index) => {
    const key = progress.subject === "math" ? `${progress.grade}-${index}` : `german-${progress.grade}-${index}`;
    const done = progress.topics[key] || 0;
    const icon = icons[topic.skill]?.[0] || topic.icon;
    const taskCount = 6;
    return `
      <button class="topic-card" type="button" data-topic="${index}" aria-label="${topic.title}, ${taskCount} Aufgaben">
        <span class="topic-topline">
          <span class="topic-icon" aria-hidden="true">${icon}</span>
          <span class="topic-time">${taskCount} Aufgaben${done ? ` · ${done}× geübt` : ""}</span>
        </span>
        <strong>${topic.title}</strong>
        <span class="topic-description">${topic.description}</span>
        <span class="topic-start"><span>Einheit starten</span><span aria-hidden="true">→</span></span>
      </button>
    `;
  }).join("");

  topicGrid.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => startLesson(Number(button.dataset.topic)));
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderParentReport() {
  dashboard.hidden = true;
  lessonView.hidden = true;
  parentReport.hidden = false;

  const sessions = [...progress.sessions].reverse();
  const totalCorrect = sessions.reduce((sum, session) => sum + session.correct, 0);
  const totalAnswered = sessions.reduce((sum, session) => sum + session.total, 0);
  const accuracy = totalAnswered ? Math.round(totalCorrect / totalAnswered * 100) : null;
  const topicStats = new Map();

  sessions.forEach((session) => {
    const key = `${session.subject}-${session.grade}-${session.topicTitle}`;
    const stat = topicStats.get(key) || {
      subject: session.subject,
      grade: session.grade,
      title: session.topicTitle,
      sessions: 0,
      correct: 0,
      total: 0
    };
    stat.sessions += 1;
    stat.correct += session.correct;
    stat.total += session.total;
    topicStats.set(key, stat);
  });

  const topicRows = [...topicStats.values()]
    .sort((left, right) => left.grade - right.grade || left.title.localeCompare(right.title, "de"))
    .map((stat) => `
      <tr>
        <td>${stat.subject === "german" ? "Deutsch" : "Mathe"}</td>
        <td>Klasse ${stat.grade}</td>
        <td>${escapeHtml(stat.title)}</td>
        <td>${stat.sessions}</td>
        <td>${Math.round(stat.correct / stat.total * 100)} %</td>
      </tr>
    `).join("");

  const historyRows = sessions.slice(0, 20).map((session) => {
    const date = new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(session.completedAt));
    return `
      <tr>
        <td>${date}</td>
        <td>${session.subject === "german" ? "Deutsch" : "Mathe"}</td>
        <td>Klasse ${session.grade}</td>
        <td>${escapeHtml(session.topicTitle)}</td>
        <td>${session.correct} von ${session.total}</td>
      </tr>
    `;
  }).join("");

  parentReport.innerHTML = `
    <button class="back-button" id="parent-back-button" type="button"><span aria-hidden="true">←</span> Zur Lernübersicht</button>
    <header class="parent-heading">
      <p class="eyebrow">SCHREIBGESCHÜTZTER ÜBERBLICK</p>
      <h1 id="parent-report-title">Lernstand für die Eltern</h1>
      <p class="intro">Hier sehen Sie abgeschlossene Übungseinheiten und die dabei erzielten Ergebnisse.</p>
    </header>
    <div class="report-stats">
      <article class="report-stat"><span>Einheiten insgesamt</span><strong>${progress.completed}</strong></article>
      <article class="report-stat"><span>Dokumentierte Einheiten</span><strong>${sessions.length}</strong></article>
      <article class="report-stat"><span>Trefferquote in dokumentierten Aufgaben</span><strong>${accuracy === null ? "–" : `${accuracy} %`}</strong></article>
    </div>
    <p class="report-note">Die Trefferquote zeigt Übungsergebnisse und ist kein vollständiger oder sicherer Nachweis des Wissensstands. Bisherige Einheiten aus älteren App-Versionen bleiben in der Gesamtzahl enthalten; ihre Einzelergebnisse liegen nicht vor.</p>
    <section class="report-section" aria-labelledby="topic-progress-title">
      <h2 id="topic-progress-title">Ergebnisse je Thema</h2>
      ${topicRows
        ? `<div class="report-table-wrap"><table class="report-table"><thead><tr><th>Fach</th><th>Klasse</th><th>Thema</th><th>Einheiten</th><th>Richtig</th></tr></thead><tbody>${topicRows}</tbody></table></div>`
        : '<p class="report-empty">Nach der nächsten abgeschlossenen Einheit erscheinen hier die Ergebnisse je Thema.</p>'}
    </section>
    <section class="report-section" aria-labelledby="session-history-title">
      <h2 id="session-history-title">Letzte Übungsergebnisse</h2>
      ${historyRows
        ? `<div class="report-table-wrap"><table class="report-table"><thead><tr><th>Datum</th><th>Fach</th><th>Klasse</th><th>Thema</th><th>Richtig</th></tr></thead><tbody>${historyRows}</tbody></table></div>`
        : '<p class="report-empty">Noch keine Ergebnisse dokumentiert. Sie werden nach jeder abgeschlossenen Übung hier angezeigt.</p>'}
    </section>
    <p class="report-privacy">Die Daten werden nur in diesem Browser auf diesem Gerät gespeichert. Sie sind nicht durch ein Elternkonto oder Passwort geschützt; wer Zugriff auf diesen Browser hat, kann die Elternansicht öffnen. Löschen der Browserdaten kann den Lernverlauf entfernen.</p>
  `;

  document.querySelector("#parent-back-button").addEventListener("click", renderDashboard);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeQuestion(topic) {
  let a;
  let b;

  switch (topic.skill) {
    case "add":
      a = randomInt(1, progress.grade === 1 ? 10 : progress.grade < 5 ? 99 : 500);
      b = randomInt(1, progress.grade === 1 ? 10 : progress.grade < 5 ? 99 : 500);
      if (progress.grade <= 2 && Math.random() < 0.5) {
        [a, b] = [Math.max(a, b), Math.min(a, b)];
        return { text: `Wie viel ist ${a} − ${b}?`, answer: a - b, hint: "Starte bei der größeren Zahl und gehe so viele Schritte zurück.", solution: `${a} − ${b} = ${a - b}` };
      }
      if (progress.grade === 2) b = randomInt(1, 100 - a);
      return { text: `Wie viel ist ${a} + ${b}?`, answer: a + b, hint: "Zerlege die Zahlen in Zehner und Einer.", solution: `${a} + ${b} = ${a + b}` };
    case "compare":
      a = randomInt(2, 15);
      b = a + randomInt(1, 5);
      return { text: `Welche Zahl kommt als Nächstes? ${a}, ${a + (b - a)}, ${b + (b - a)}, …`, answer: b + 2 * (b - a), hint: "Finde heraus, wie viel jedes Mal dazukommt.", solution: `Es kommen jeweils ${b - a} dazu. Die nächste Zahl ist ${b + 2 * (b - a)}.` };
    case "shapes": {
      const sides = randomInt(3, 5);
      const shape = ["", "", "", "Dreieck", "Viereck", "Fünfeck"][sides];
      const feature = Math.random() < 0.5 ? "Ecken" : "Seiten";
      return { text: `Wie viele ${feature} hat ein ${shape}?`, answer: sides, hint: "Bei Vielecken ist die Anzahl der Ecken genauso groß wie die Anzahl der Seiten.", solution: `Ein ${shape} hat ${sides} ${feature}.` };
    }
    case "multiply":
      a = randomInt(2, progress.grade < 4 ? 10 : 12);
      b = randomInt(2, progress.grade < 4 ? 10 : 12);
      return { text: `Wie viel ist ${a} × ${b}?`, answer: a * b, hint: `Du kannst ${a} Gruppen mit je ${b} zählen.`, solution: `${a} × ${b} = ${a * b}` };
    case "money":
      a = randomInt(2, 8);
      b = randomInt(2, 9);
      return { text: `Ein Heft kostet ${a} €. Wie viel kosten ${b} Hefte? (in €)`, answer: a * b, hint: `Addiere den Preis ${b} Mal oder multipliziere.`, solution: `${a} × ${b} € = ${a * b} €` };
    case "fractions": {
      const denominator = [2, 3, 4, 5][randomInt(0, 3)];
      const multiplier = randomInt(2, 10);
      const numerator = randomInt(1, denominator);
      const whole = denominator * multiplier;
      const answer = numerator * multiplier;
      return { text: `Wie viel ist ${numerator}/${denominator} von ${whole}?`, answer, hint: `Teile ${whole} zuerst durch ${denominator}.`, solution: `${whole} : ${denominator} × ${numerator} = ${answer}` };
    }
    case "decimal": {
      const left = randomInt(10, 99) / 10;
      const right = randomInt(10, 99) / 10;
      const answer = Math.round((left + right) * 10) / 10;
      return { text: `Wie viel ist ${left.toFixed(1).replace(".", ",")} + ${right.toFixed(1).replace(".", ",")}?`, answer, hint: "Stelle die Kommas untereinander.", solution: `${left.toFixed(1).replace(".", ",")} + ${right.toFixed(1).replace(".", ",")} = ${answer.toFixed(1).replace(".", ",")}` };
    }
    case "geometry":
      a = randomInt(2, 12);
      b = randomInt(2, 12);
      if (Math.random() < 0.5) {
        return { text: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist sein Umfang in cm?`, answer: 2 * (a + b), hint: "Der Umfang ist die Summe aller vier Seiten.", solution: `2 × (${a} + ${b}) = ${2 * (a + b)} cm` };
      }
      return { text: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist seine Fläche in cm²?`, answer: a * b, hint: "Fläche = Länge × Breite.", solution: `${a} × ${b} = ${a * b} cm²` };
    case "units": {
      a = randomInt(2, 9) * 100;
      return { text: `Wie viele Zentimeter sind ${a / 100} Meter?`, answer: a, hint: "Ein Meter besteht aus 100 Zentimetern.", solution: `${a / 100} × 100 = ${a} cm` };
    }
    case "percent": {
      const percent = [10, 20, 25, 50][randomInt(0, 3)];
      const whole = randomInt(2, 20) * 20;
      const answer = whole * percent / 100;
      return { text: `Wie viel sind ${percent} % von ${whole}?`, answer, hint: percent === 25 ? "25 % ist ein Viertel." : percent === 50 ? "50 % ist die Hälfte." : "Prozent bedeutet „von hundert“.", solution: `${whole} × ${percent} : 100 = ${answer}` };
    }
    case "negative":
      a = randomInt(-15, 15);
      b = randomInt(-15, 15);
      return { text: `Wie viel ist ${a} + (${b})?`, answer: a + b, hint: "Nutze einen Zahlenstrahl und achte auf die Vorzeichen.", solution: `${a} + (${b}) = ${a + b}` };
    case "equation": {
      const x = randomInt(2, 12);
      const factor = randomInt(2, 8);
      const offset = randomInt(1, 12);
      return { text: `Löse die Gleichung: ${factor}x + ${offset} = ${factor * x + offset}. Was ist x?`, answer: x, hint: `Ziehe zuerst ${offset} auf beiden Seiten ab und teile dann durch ${factor}.`, solution: `x = (${factor * x + offset} − ${offset}) : ${factor} = ${x}` };
    }
    case "ratio": {
      const price = randomInt(2, 8);
      const count = randomInt(2, 6);
      const target = count * randomInt(2, 4);
      return { text: `${count} gleiche Stifte kosten ${price * count} €. Wie viel kosten ${target} Stifte? (in €)`, answer: price * target, hint: `Finde zuerst den Preis für einen Stift.`, solution: `Ein Stift kostet ${price} €. ${target} Stifte kosten ${price * target} €.` };
    }
    case "powers": {
      const root = randomInt(2, 15);
      return { text: `Was ist √${root * root}?`, answer: root, hint: "Welche Zahl mal sich selbst ergibt die Zahl unter der Wurzel?", solution: `√${root * root} = ${root}, denn ${root}² = ${root * root}.` };
    }
    case "pythagoras": {
      const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15]];
      const [sideA, sideB, hypotenuse] = triples[randomInt(0, triples.length - 1)];
      return { text: `Ein rechtwinkliges Dreieck hat Katheten ${sideA} cm und ${sideB} cm. Wie lang ist die Hypotenuse in cm?`, answer: hypotenuse, hint: "Nutze a² + b² = c² und ziehe dann die Quadratwurzel.", solution: `${sideA}² + ${sideB}² = ${hypotenuse}², also ist c = ${hypotenuse} cm.` };
    }
    case "quadratic": {
      const root = randomInt(2, 12);
      return { text: `Löse x² = ${root * root}. Nenne eine positive Lösung für x.`, answer: root, hint: "Ziehe auf beiden Seiten die Quadratwurzel.", solution: `x = ${root}, denn ${root}² = ${root * root}. (Es gibt auch die Lösung x = −${root}.)` };
    }
    case "linear": {
      const slope = randomInt(2, 7);
      const intercept = randomInt(1, 9);
      const x = randomInt(2, 8);
      return { text: `Für y = ${slope}x + ${intercept}: Wie groß ist y, wenn x = ${x}?`, answer: slope * x + intercept, hint: `Setze ${x} für jedes x ein und rechne zuerst die Multiplikation.`, solution: `y = ${slope} × ${x} + ${intercept} = ${slope * x + intercept}.` };
    }
    case "probability": {
      const total = [2, 4, 5, 10, 20][randomInt(0, 4)];
      const favorable = randomInt(1, total - 1);
      return { text: `Von ${total} gleich wahrscheinlichen Möglichkeiten sind ${favorable} günstig. Wie groß ist die Wahrscheinlichkeit in Prozent?`, answer: favorable / total * 100, hint: `Rechne günstige Möglichkeiten ÷ alle Möglichkeiten × 100.`, solution: `${favorable} : ${total} × 100 = ${favorable / total * 100} %.` };
    }
    case "trig": {
      const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17]];
      const [opposite, adjacent, hypotenuse] = triples[randomInt(0, triples.length - 1)];
      const useSine = Math.random() < 0.5;
      const numerator = useSine ? opposite : adjacent;
      const ratio = useSine ? "sin" : "cos";
      const sideName = useSine ? "Gegenkathete" : "Ankathete";
      const answer = Math.round(numerator / hypotenuse * 100) / 100;
      return { text: `In einem rechtwinkligen Dreieck ist die ${sideName} ${numerator} cm und die Hypotenuse ${hypotenuse} cm. Wie groß ist ${ratio}(α)? (auf zwei Stellen runden)`, answer, hint: `${ratio}(α) = ${sideName} ÷ Hypotenuse.`, solution: `${ratio}(α) = ${numerator} : ${hypotenuse} = ${answer.toFixed(2).replace(".", ",")}.` };
    }
    default:
      return { text: "Wie viel ist 7 + 5?", answer: 12, hint: "Zähle 5 von 7 aus weiter.", solution: "7 + 5 = 12." };
  }
}

function pickRandom(items) {
  return items[randomInt(0, items.length - 1)];
}

const germanSpellingPairs = [
  ["Fusball", "Fußball"], ["Schwimmbat", "Schwimmbad"], ["Fahrrat", "Fahrrad"],
  ["Feriehn", "Ferien"], ["Bibilothek", "Bibliothek"], ["Abendteuer", "Abenteuer"],
  ["warscheinlich", "wahrscheinlich"], ["nähmlich", "nämlich"], ["Rhytmus", "Rhythmus"],
  ["Portemonai", "Portemonnaie"], ["Maschiene", "Maschine"], ["Gallerie", "Galerie"],
  ["Ketschup", "Ketchup"], ["Terasse", "Terrasse"], ["Packet", "Paket"],
  ["Standart", "Standard"], ["Akuu", "Akku"], ["interesant", "interessant"]
];

const germanWords = [
  { word: "Hund", type: "Nomen" }, { word: "springen", type: "Verb" },
  { word: "freundlich", type: "Adjektiv" }, { word: "Schule", type: "Nomen" },
  { word: "schreiben", type: "Verb" }, { word: "leise", type: "Adjektiv" },
  { word: "Gedanke", type: "Nomen" }, { word: "entdecken", type: "Verb" },
  { word: "vorsichtig", type: "Adjektiv" }, { word: "Freiheit", type: "Nomen" },
  { word: "untersuchen", type: "Verb" }, { word: "ungewöhnlich", type: "Adjektiv" }
];

const germanSentences = [
  { words: ["Der", "Hund", "bellt", "laut"], answer: "Der Hund bellt laut." },
  { words: ["Mia", "liest", "ein", "Buch"], answer: "Mia liest ein Buch." },
  { words: ["Am", "Morgen", "scheint", "die", "Sonne"], answer: "Am Morgen scheint die Sonne." },
  { words: ["Wir", "spielen", "nach", "der", "Schule", "im", "Garten"], answer: "Wir spielen nach der Schule im Garten." },
  { words: ["Der", "kleine", "Vogel", "singt"], answer: "Der kleine Vogel singt." },
  { words: ["Papa", "backt", "einen", "Kuchen"], answer: "Papa backt einen Kuchen." },
  { words: ["Obwohl", "es", "regnet", "gehen", "wir", "spazieren"], answer: "Obwohl es regnet, gehen wir spazieren." },
  { words: ["Die", "Forscherin", "erklärt", "das", "spannende", "Experiment"], answer: "Die Forscherin erklärt das spannende Experiment." },
  { words: ["Morgen", "besuchen", "meine", "Freunde", "das", "neue", "Museum"], answer: "Morgen besuchen meine Freunde das neue Museum." },
  { words: ["Nachdem", "der", "Unterricht", "beendet", "war", "fuhr", "Lena", "nach", "Hause"], answer: "Nachdem der Unterricht beendet war, fuhr Lena nach Hause." }
];

// Zusätzliche Textpools für schwierigere Leseaufgaben
const germanIntermediateTexts = [
  { text: "Anna hat ihren Hund im Park verloren. Sie ruft seinen Namen und sucht unter den Bäumen.", question: "Was sucht Anna?", options: ["ihren Hund", "einen Ball", "den Bus"], answer: "ihren Hund" },
  { text: "Max findet eine Karte mit einem Kreuz. Er beginnt zu graben und entdeckt eine alte Dose.", question: "Was hat Max entdeckt?", options: ["eine Dose", "ein Fahrrad", "ein Buch"], answer: "eine Dose" }
];

const germanAdvancedTexts = [
  { text: "Der alte Leuchtturm stand an der Küste und leuchtete jede Nacht. Schiffe fanden so sicher den Weg. Doch eines Tages wurde das Licht schwächer und die Leute mussten eine Lösung finden.", question: "Was ist das Hauptproblem im Text?", options: ["Der Leuchtturm wurde modernisiert", "Das Licht ist ausgefallen", "Es gibt keine Schiffe", "Die Küste wird verkauft"], answer: "Das Licht ist ausgefallen" },
  { text: "In der Stadt herrschte Hektik: Menschen eilten zu ihren Terminen, Busse fuhren im Takt, und nur der Park blieb ruhig. Der Erzähler beobachtet das Treiben und fühlt sich fremd.", question: "Welches Gefühl beschreibt der Erzähler?", options: ["Freude", "Fremdheit", "Wut", "Langeweile"], answer: "Fremdheit" }
];

const germanVocabulary = [
  { word: "froh", answer: "glücklich", options: ["glücklich", "traurig", "müde"] },
  { word: "rasch", answer: "schnell", options: ["leise", "schnell", "langsam"] },
  { word: "beginnen", answer: "anfangen", options: ["aufhören", "anfangen", "warten"] },
  { word: "riesig", answer: "gewaltig", options: ["winzig", "gewaltig", "schmal"] },
  { word: "mutig", answer: "tapfer", options: ["tapfer", "ängstlich", "vorsichtig"] },
  { word: "erstaunt", answer: "überrascht", options: ["gelangweilt", "überrascht", "wütend"] },
  { word: "still", answer: "ruhig", options: ["laut", "ruhig", "hektisch"] },
  { word: "kostbar", answer: "wertvoll", options: ["wertvoll", "nutzlos", "gewöhnlich"] },
  { word: "erlauben", answer: "gestatten", options: ["verbieten", "gestatten", "vergessen"] },
  { word: "sorgfältig", answer: "gründlich", options: ["gründlich", "flüchtig", "zufällig"] },
  { word: "behaupten", answer: "äußern", options: ["verbergen", "äußern", "bezweifeln"] },
  { word: "unverzüglich", answer: "sofort", options: ["später", "sofort", "selten"] }
];

const germanPunctuationQuestions = [
  { text: "der Zug fährt gleich ab", answer: "Der Zug fährt gleich ab.", hint: "Das ist eine Aussage. Sie endet mit einem Punkt." },
  { text: "Wann beginnt der Film", answer: "Wann beginnt der Film?", hint: "Der Satz fragt nach einer Zeit." },
  { text: "wie schön der Garten ist", answer: "Wie schön der Garten ist!", hint: "Der Satz drückt starke Begeisterung aus." },
  { text: "Kannst du mir bitte helfen", answer: "Kannst du mir bitte helfen?", hint: "Der Satz ist eine Frage." },
  { text: "Morgen spielen wir im Park", answer: "Morgen spielen wir im Park.", hint: "Das ist eine Aussage. Sie endet mit einem Punkt." },
  { text: "Bringst du deinen Ball mit", answer: "Bringst du deinen Ball mit?", hint: "Der Satz ist eine Frage und endet mit einem Fragezeichen." },
  { text: "Ich nehme einen Apfel eine Birne und Trauben", answer: "Ich nehme einen Apfel, eine Birne und Trauben.", hint: "Bei einer Aufzählung trennt ein Komma die einzelnen Teile." },
  { text: "Wir bleiben drinnen weil es draußen stürmt", answer: "Wir bleiben drinnen, weil es draußen stürmt.", hint: "Vor einem Nebensatz mit „weil“ steht ein Komma." },
  { text: "Obwohl sie müde war las sie das Buch zu Ende", answer: "Obwohl sie müde war, las sie das Buch zu Ende.", hint: "Der Nebensatz am Satzanfang wird mit einem Komma abgetrennt." },
  { text: "Er packte Hefte Stifte und sein Wörterbuch ein", answer: "Er packte Hefte, Stifte und sein Wörterbuch ein.", hint: "Setze Kommas zwischen die Teile der Aufzählung." },
  { text: "Ich glaube dass wir den Weg finden", answer: "Ich glaube, dass wir den Weg finden.", hint: "Vor dem Nebensatz mit „dass“ steht ein Komma." },
  { text: "Nachdem der Regen aufgehört hatte gingen alle nach draußen", answer: "Nachdem der Regen aufgehört hatte, gingen alle nach draußen.", hint: "Trenne den Nebensatz am Satzanfang mit einem Komma ab." }
];

const germanRegularVerbs = ["spielen", "lernen", "malen", "fragen", "lachen", "sagen", "kaufen", "kochen", "zeigen", "sammeln", "wandern", "turnen"];
const germanPersons = [
  { pronoun: "ich", present: "e", past: "te" },
  { pronoun: "du", present: "st", past: "test" },
  { pronoun: "er", present: "t", past: "te" },
  { pronoun: "wir", present: "en", past: "ten" },
  { pronoun: "ihr", present: "t", past: "tet" },
  { pronoun: "sie", present: "en", past: "ten" }
];

function makeGermanQuestion(topic) {
  switch (topic.skill) {
    case "de-spelling": {
      const pool = germanSpellingPairs.slice(0, progress.grade <= 2 ? 6 : progress.grade <= 4 ? 12 : germanSpellingPairs.length);
      const [wrong, answer] = pickRandom(pool);
      return { text: `Schreibe das Wort richtig: ${wrong}`, answer, hint: "Achte auf die Buchstaben, die im Wort oft verwechselt oder vergessen werden." };
    }
    case "de-wordclass": {
      const pool = germanWords.slice(0, progress.grade <= 2 ? 6 : progress.grade <= 4 ? 9 : germanWords.length);
      const item = pickRandom(pool);
      return { text: `Zu welcher Wortart gehört „${item.word}“? (Nomen, Verb oder Adjektiv)`, answer: item.type, hint: "Nomen bezeichnen Dinge, Verben Tätigkeiten und Adjektive Eigenschaften." };
    }
    case "de-wordorder": {
      const pool = germanSentences.slice(0, progress.grade <= 4 ? 6 : germanSentences.length);
      const item = pickRandom(pool);
      const words = [...item.words];
      for (let index = words.length - 1; index > 0; index -= 1) {
        const swapIndex = randomInt(0, index);
        [words[index], words[swapIndex]] = [words[swapIndex], words[index]];
      }
      return { text: `Ordne die Wörter zu einem Satz: ${words.join(" / ")}`, answer: item.answer, caseSensitive: true, hint: "Achte auf die Satzstellung, den Satzanfang und das Satzzeichen am Ende." };
    }
    case "de-vocabulary": {
      const pool = germanVocabulary.slice(0, progress.grade <= 2 ? 6 : progress.grade <= 4 ? 9 : germanVocabulary.length);
      const item = pickRandom(pool);
      return { text: `Welches Wort bedeutet ungefähr dasselbe wie „${item.word}“? (${item.options.join(", ")})`, answer: item.answer, hint: "Suche das Wort mit einer ähnlichen Bedeutung." };
    }
    case "de-grammar": {
      const verb = pickRandom(germanRegularVerbs);
      const person = pickRandom(germanPersons);
      const tense = progress.grade < 5 ? "present" : "past";
      const ending = person[tense];
      const answer = `${verb.slice(0, -2)}${ending}`;
      const tenseLabel = tense === "present" ? "Präsens" : "Präteritum";
      return { text: `Setze „${verb}“ für „${person.pronoun}“ ins ${tenseLabel}: ${person.pronoun} ___`, answer, hint: "Bestimme zuerst den Wortstamm und ergänze die passende Verbendung." };
    }
    case "de-punctuation": {
      const item = pickRandom(germanPunctuationQuestions.slice(0, progress.grade < 5 ? 6 : germanPunctuationQuestions.length));
      return { text: `Setze Großschreibung und Satzzeichen richtig: ${item.text}`, answer: item.answer, caseSensitive: true, hint: item.hint };
    }
    case "de-reading": {
      // Leseverständnis: wähle Schwierigkeitsgrad nach Klassenstufe
      if (progress.grade < 5) {
        // einfache Sätze wie vorher
        const item = pickRandom(germanSentences.slice(0, 6));
        const possible = item.words.filter(w => w[0] === w[0].toUpperCase() && !["Der","Die","Das","Ein","Eine"].includes(w));
        const subject = possible.length ? possible[0] : item.words[0];
        const distractorPool = germanWords.filter(w => w.type === "Nomen").map(w => w.word).filter(w => w !== subject);
        const distractor = distractorPool.length ? pickRandom(distractorPool) : "Die Katze";
        return { text: `Lese: "${item.answer}"\nFrage: Wer handelt im Satz? Wähle die richtige Antwort: A) ${subject}  B) ${distractor}`, answer: subject, hint: "Lies den Satz und finde das handelnde Wort (meist ein Nomen)." };
      }
      if (progress.grade <= 6) {
        // mittleres Niveau: kleine Textpassage + einfache Hauptaussage (MC)
        const item = pickRandom(germanIntermediateTexts);
        const opts = item.options.slice();
        // shuffle options
        for (let i = opts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [opts[i], opts[j]] = [opts[j], opts[i]];
        }
        return { text: `Lese: "${item.text}"\nFrage: ${item.question}`, answer: item.answer, options: opts, hint: "Lies den Text genau und wähle die passende Antwort." };
      }
      // grade >= 7 : anspruchsvollere Kurztexte mit MCQ
      const adv = pickRandom(germanAdvancedTexts);
      const optsAdv = adv.options.slice();
      for (let i = optsAdv.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optsAdv[i], optsAdv[j]] = [optsAdv[j], optsAdv[i]];
      }
      return { text: `Lese: "${adv.text}"\nFrage: ${adv.question}`, answer: adv.answer, options: optsAdv, hint: "Achte auf die Kernaussage des Textes und wähle die beste Antwort." };
    }
    case "de-words": {
      // Komposita bilden: zwei Nomen zusammenfügen
      const nouns = germanWords.filter(w => w.type === "Nomen").map(w => w.word);
      const a = pickRandom(nouns);
      const b = pickRandom(nouns.filter(n => n !== a));
      const compound = `${a}${b}`.replace(/\s+/g, "");
      const answer = compound.charAt(0).toUpperCase() + compound.slice(1);
      return { text: `Was entsteht, wenn man die Wörter together '${a}' und '${b}' verbindet? Schreibe das zusammengesetzte Wort.`, answer, hint: "Setze die beiden Wörter ohne Leerzeichen zusammen (Kompositum)." };
    }
    case "de-capitalization": {
      // Groß-/Kleinschreibung üben: zeige kleingeschriebenen Satz, Antworte mit korrekter Großschreibung
      const item = pickRandom(germanSentences.slice(0, progress.grade < 5 ? 6 : germanSentences.length));
      const lower = item.answer.toLowerCase();
      return { text: `Setze Großschreibung und Satzzeichen: ${lower}`, answer: item.answer, caseSensitive: true, hint: "Achte auf Satzanfang und Nomen (Großschreibung)." };
    }
    default:
      return { text: "Schreibe das Wort „Schule“ richtig.", answer: "Schule", hint: "Achte auf die Großschreibung von Nomen." };
  }
}

function makeUniqueQuestions(topic, count) {
  const questions = [];
  const seen = new Set();
  while (questions.length < count) {
    const question = progress.subject === "german" ? makeGermanQuestion(topic) : makeQuestion(topic);
    if (!seen.has(question.text)) {
      seen.add(question.text);
      questions.push(question);
    }
  }
  return questions;
}

function startLesson(topicIndex) {
  const topics = (progress.subject === "german" ? germanCurriculum : curriculum)[progress.grade];
  const topic = topics[topicIndex];
  const count = 6;
  activeLesson = {
    topic,
    topicIndex,
    questions: makeUniqueQuestions(topic, count),
    position: 0,
    correct: 0,
    attempts: 0,
    resolved: false
  };
  renderLesson();
}

function renderLesson() {
  dashboard.hidden = true;
  lessonView.hidden = false;
  const { topic, questions, position } = activeLesson;
  const question = questions[position];
  const completed = position;
  const percent = Math.round(completed / questions.length * 100);
  const subjectName = progress.subject === "german" ? "Deutsch" : "Mathe";

  lessonView.innerHTML = `
    <button class="back-button" type="button" id="back-button"><span aria-hidden="true">←</span> Alle Themen</button>
    <header class="lesson-heading">
      <p class="eyebrow">KLASSE ${progress.grade} · ${subjectName.toLocaleUpperCase("de-DE")} ÜBEN</p>
      <h1>${topic.title}</h1>
      <p>Eine kurze Erklärung und dann übst du es Schritt für Schritt.</p>
    </header>
    <div class="lesson-progress" aria-label="Fortschritt">
      <div class="lesson-progress-label"><span>Dein Fortschritt</span><span>${completed} von ${questions.length}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width: ${percent}%"></div></div>
    </div>
    <article class="explanation-card">
      <p class="card-kicker">Kurz erklärt</p>
      <p>${topic.explanation}</p>
    </article>
    <article class="exercise-card">
      <p class="exercise-count">AUFGABE ${position + 1} VON ${questions.length}</p>
      <h2 class="question">${question.text}</h2>
      ${question.options ? (
        `<div class="options-list" id="options-list">
           ${question.options.map((o, i) => `<button class="option-button" data-choice="${escapeHtml(String(o))}">${String.fromCharCode(65+i)}) ${escapeHtml(String(o))}</button>`).join('')}
         </div>`
      ) : (`
        `<form class="answer-form" id="answer-form">
           <label class="sr-only" for="answer-input">Deine Antwort</label>
           <input class="answer-input" id="answer-input" name="answer" type="text" inputmode="${progress.subject === "math" ? "decimal" : "text"}" autocomplete="off" placeholder="Deine Antwort" required>
           <button class="primary-button" type="submit">Prüfen</button>
         </form>`
      )}
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <div class="exercise-actions">
        <button class="hint-button" id="hint-button" type="button">Tipp ansehen</button>
        <button class="secondary-button" id="next-button" type="button" hidden>Nächste Aufgabe →</button>
      </div>
      <p class="hint-text" id="hint-text" hidden>${question.hint}</p>
    </article>
  `;

  document.querySelector("#back-button").addEventListener("click", renderDashboard);
  const answerForm = document.querySelector("#answer-form");
  if (answerForm) answerForm.addEventListener("submit", checkAnswer);
  // options buttons
  const optionsList = document.getElementById('options-list');
  if (optionsList) {
    optionsList.querySelectorAll('.option-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const choice = e.currentTarget.getAttribute('data-choice');
        checkAnswer(null, choice);
      });
    });
  }
  document.querySelector("#hint-button").addEventListener("click", () => {
    const hint = document.querySelector("#hint-text");
    hint.hidden = !hint.hidden;
    document.querySelector("#hint-button").textContent = hint.hidden ? "Tipp ansehen" : "Tipp verbergen";
  });
  document.querySelector("#next-button").addEventListener("click", nextQuestion);
  const answerInputEl = document.querySelector("#answer-input");
  if (answerInputEl) answerInputEl.focus();
}
function parseAnswer(value) {
  const normalized = value.trim().replace(",", ".");
  if (/^-?\d+(?:\.\d+)?\s*\/\s*-?\d+(?:\.\d+)?$/.test(normalized)) {
    const [numerator, denominator] = normalized.split("/").map(Number);
    return denominator === 0 ? Number.NaN : numerator / denominator;
  }
  return /^-?\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : Number.NaN;
}

function checkAnswer(event, submittedAnswer) {
  if (event && event.preventDefault) event.preventDefault();
  if (activeLesson.resolved) return;

  const input = document.querySelector("#answer-input");
  const feedback = document.querySelector("#feedback");
  const question = activeLesson.questions[activeLesson.position];
  activeLesson.attempts += 1;

  // determine submitted value
  let rawSubmitted;
  if (submittedAnswer !== undefined) {
    rawSubmitted = String(submittedAnswer);
  } else if (input) {
    rawSubmitted = input.value;
  } else {
    rawSubmitted = "";
  }

  const answer = typeof question.answer === "number" ? parseAnswer(rawSubmitted) : rawSubmitted.trim().replace(/\s+/g, " ");
  const expected = typeof question.answer === "string" && !question.caseSensitive
    ? question.answer.toLocaleLowerCase("de-DE")
    : question.answer;
  const submitted = typeof answer === "string" && !question.caseSensitive
    ? answer.toLocaleLowerCase("de-DE")
    : answer;

  const isCorrect = typeof question.answer === "number"
    ? Number.isFinite(answer) && Math.abs(answer - question.answer) < 0.011
    : submitted === expected;

  if (isCorrect) {
    activeLesson.correct += 1;
    activeLesson.resolved = true;
    feedback.className = "feedback correct";
    feedback.textContent = question.solution ? `Richtig! ${question.solution}` : "Richtig!";
    // hide/disable input or option buttons
    const submitBtn = document.querySelector("#answer-form button");
    if (submitBtn) submitBtn.hidden = true;
    if (input) input.disabled = true;
    const optionsList = document.getElementById('options-list');
    if (optionsList) {
      optionsList.querySelectorAll('.option-button').forEach(b => b.disabled = true);
    }
    const nextBtn = document.querySelector("#next-button");
    if (nextBtn) nextBtn.hidden = false;
    const hintBtn = document.querySelector("#hint-button");
    if (hintBtn) hintBtn.hidden = true;
  } else {
    feedback.className = "feedback incorrect";
    feedback.textContent = typeof answer === "number" && !Number.isFinite(answer)
      ? "Gib bitte eine Zahl oder einen Bruch ein, zum Beispiel 3/4."
      : "Noch nicht ganz. Schau dir den Tipp an und versuche es noch einmal.";
    if (input) input.select();
  }
}

function nextQuestion() {
  const last = activeLesson.position === activeLesson.questions.length - 1;
  if (last) {
    finishLesson();
    return;
  }
  activeLesson.position += 1;
  activeLesson.attempts = 0;
  activeLesson.resolved = false;
  renderLesson();
}

function finishLesson() {
  const { topic, topicIndex, questions, correct } = activeLesson;
  progress.completed += 1;
  const coinBalance = getCoinBalance() + 1;
  setCoinBalance(coinBalance);
  const key = progress.subject === "math"
    ? `${progress.grade}-${topicIndex}`
    : `german-${progress.grade}-${topicIndex}`;
  progress.topics[key] = (progress.topics[key] || 0) + 1;
  progress.sessions.push({
    subject: progress.subject,
    grade: progress.grade,
    topicTitle: topic.title,
    correct,
    total: questions.length,
    completedAt: new Date().toISOString()
  });
  persistProgress();

  dashboard.hidden = true;
  lessonView.hidden = false;
  const message = correct === questions.length
    ? "Fantastisch – du hast jede Aufgabe richtig gelöst!"
    : correct >= Math.ceil(questions.length * 0.7)
      ? "Richtig gut! Du bist auf einem guten Weg."
      : "Gut geübt! Mit jeder Runde wird es leichter.";
  lessonView.innerHTML = `
    <div class="summary-card">
      <span class="summary-icon" aria-hidden="true">✓</span>
      <p class="eyebrow">EINHEIT ABGESCHLOSSEN</p>
      <h2>Das hast du gut gemacht!</h2>
      <p>${message}</p>
      <div class="summary-score">${correct} von ${questions.length} Aufgaben richtig bei „${topic.title}“</div>
      <button class="primary-button" id="finish-button" type="button">Zur Themenübersicht</button>
    </div>
  `;
  document.querySelector("#finish-button").addEventListener("click", renderDashboard);
  completedCount.textContent = String(progress.completed);
}

gradeSelect.addEventListener("change", () => {
  progress.grade = Number(gradeSelect.value);
  persistProgress();
  renderDashboard();
});

subjectSelect.addEventListener("change", () => {
  progress.subject = subjectSelect.value;
  persistProgress();
  renderDashboard();
});

parentButton.addEventListener("click", renderParentReport);

homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  renderDashboard();
});

renderDashboard();

function getCoinBalance() {
  try {
    const value = Number.parseInt(localStorage.getItem("gamehub-coin-balance") || "0", 10);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch (error) {
    return 0;
  }
}

function setCoinBalance(value) {
  const safeValue = Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
  try {
    localStorage.setItem("gamehub-coin-balance", String(safeValue));
    localStorage.setItem("gamehub-plays-left", String(safeValue));
  } catch (error) {
    // ignore storage write issues in restricted environments
  }
  return safeValue;
}
