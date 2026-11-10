//Hier gibt es einen Fehler er ist das:
const exercisesPerLesson = 8;

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
    { title: "Das Einmaleins", skill: "multiply", icon: "×", description: "Malaufgaben sicher lösen und nutzen.", explanation: "Beim Malnehmen hilft die Tauschaufgabe: 3 · 7 ist genauso viel wie 7 · 3. Wenn du eine Aufgabe kennst, kannst du oft auch die passende Geteiltaufgabe lösen.", difficulty: "easy" },
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
    { title: "Bruchteile bestimmen", skill: "fractions", icon: "¼", description: "Einfache Bruchteile von Zahlen und Mengen berechnen.", explanation: "Teile die Menge durch den Nenner und multipliziere das Ergebnis mit dem Zähler.", difficulty: "easy" }
  ],
  5: [
    { title: "Natürliche Zahlen", skill: "add", icon: "＋", description: "Mit großen Zahlen sicher rechnen.", explanation: "Beim schriftlichen Rechnen stehen gleiche Stellenwerte untereinander. Überschlage vorher, damit du merkst, ob dein Ergebnis ungefähr passen kann.", difficulty: "easy" },
    { title: "Brüche verstehen", skill: "fractions", icon: "¾", description: "Bruchteile berechnen und Brüche vergleichen.", explanation: "Um einen Bruchteil einer Zahl zu finden, teilst du zuerst durch den Nenner und multiplizierst dann mit dem Zähler. Beispiel: 3/4 von 20 = 20 : 4 · 3.", difficulty: "hard" },
    { title: "Einheiten umrechnen", skill: "units", icon: "↔", description: "Längen- und Maßeinheiten umwandeln.", explanation: "1 Meter sind 100 Zentimeter. Beim Umwandeln in eine kleinere Einheit wird die Zahl größer; in eine größere Einheit wird sie kleiner.", difficulty: "easy" },
    { title: "Dezimalzahlen addieren", skill: "decimal", icon: ",", description: "Kommazahlen mit einer Nachkommastelle addieren.", explanation: "Stelle die Kommas untereinander und addiere die Zahlen wie gewohnt.", difficulty: "easy" },
    { title: "Flächen berechnen", skill: "geometry", icon: "□", description: "Flächeninhalte von Rechtecken bestimmen.", explanation: "Die Fläche eines Rechtecks ist Länge mal Breite. Die Einheit wird dabei quadriert.", difficulty: "hard" },
    { title: "Prozent im Alltag", skill: "percent", icon: "%", description: "Einfache Prozente von Mengen berechnen.", explanation: "10 % ist ein Zehntel und 50 % die Hälfte. Nutze bekannte Anteile, um Prozente zu finden.", difficulty: "easy" }
  ],
};

// Zusätzliche Mathe‑Übungen: erweitere das bestehende Curriculum um mehr Themen pro Klassenstufe
(function addExtraMathTopics() {
  const extras = {
    1: [
      { title: "Zahlenrätsel", skill: "compare", icon: "→", description: "Kleine Rätsel mit Zahlenfolgen und Lücken lösen.", explanation: "Finde das Muster und setze die Reihe fort. Nutze Zählen oder Rechenregeln.", difficulty: "easy" },
      { title: "Formen legen", skill: "shapes", icon: "◇", description: "Formen zusammensetzen und wiedererkennen.", explanation: "Setze aus einfachen Formen neue Formen zusammen und zähle Ecken und Seiten.", difficulty: "easy" },
      { title: "Zehnerfreunde", skill: "add", icon: "+", description: "Zahlen finden, die zusammen zehn ergeben.", explanation: "Ergänze jede Zahl bis zehn. Zerlege dafür die Zahlen in passende Teile.", difficulty: "easy" },
      { title: "Größer oder kleiner?", skill: "compare", icon: "≷", description: "Zahlen bis 20 vergleichen und ordnen.", explanation: "Vergleiche die Zahlen und achte darauf, welche auf dem Zahlenstrahl weiter rechts liegt.", difficulty: "easy" }
    ],
    2: [
      { title: "Münzen zählen", skill: "money", icon: "€", description: "Kleine Aufgaben mit Euro und Cent rechnen.", explanation: "Rechne Preise zusammen und löse kleine Wechselgeldaufgaben.", difficulty: "easy" },
      { title: "Tauschaufgaben", skill: "add", icon: "+", description: "Aufgaben zum Umkehren (z. B. 5 + ? = 12).", explanation: "Löse Aufgaben durch Überlegen, welche Zahl fehlt, und übe Kopfrechnen.", difficulty: "easy" },
      { title: "Malaufgaben mit Reihen", skill: "multiply", icon: "×", description: "Kleine Malaufgaben mit wiederholtem Zählen lösen.", explanation: "Zähle in gleichen Schritten weiter, um Gruppen mit derselben Anzahl zu berechnen.", difficulty: "easy" },
      { title: "Längen messen", skill: "units", icon: "↔", description: "Einfache Längen vergleichen und umrechnen.", explanation: "Merke dir: 100 Zentimeter sind ein Meter. Vergleiche Längen zuerst in derselben Einheit.", difficulty: "easy" }
    ],
    3: [
      { title: "Einmaleins‑Training", skill: "multiply", icon: "×", description: "Schnelle Übungen zum Einmaleins vertiefen.", explanation: "Trainiere kleine Reihen (2er, 3er, 5er, 10er) mit kurzen Aufgaben und Wiederholungen.", difficulty: "easy" },
      { title: "Sachtextaufgaben", skill: "money", icon: "€", description: "Texte lesen und passende Rechenwege finden.", explanation: "Lies die Aufgabe genau, markiere Zahlen und entscheide, ob du addieren, multiplizieren oder teilen musst.", difficulty: "easy" },
      { title: "Kopfrechnen bis 100", skill: "add", icon: "+", description: "Plus- und Minusaufgaben im Kopf lösen.", explanation: "Zerlege Zahlen in Zehner und Einer und rechne Schritt für Schritt.", difficulty: "easy" },
      { title: "Bruchteile kennenlernen", skill: "fractions", icon: "½", description: "Einfache Anteile von kleinen Mengen bestimmen.", explanation: "Teile eine Menge in gleich große Gruppen und zähle die gesuchten Teile.", difficulty: "easy" }
    ],
    4: [
      { title: "Kommazahlen vertiefen", skill: "decimal", icon: ",", description: "Addition und Subtraktion mit einer Nachkommastelle.", explanation: "Richte die Kommas aus und rechne wie bei ganzen Zahlen, runde bei Bedarf.", difficulty: "easy" },
      { title: "Längen schätzen", skill: "units", icon: "m", description: "Schätze Längen und vergleiche Einheiten.", explanation: "Übe Abschätzungen und kontrolliere mit Messungen; rechne zwischen cm, m und km um.", difficulty: "easy" },
      { title: "Brüche ordnen", skill: "fractions", icon: "¼", description: "Einfache Brüche vergleichen und sortieren.", explanation: "Bei gleich großen Ganzen zeigt ein größerer Zähler mehr Teile an, wenn die Nenner gleich sind.", difficulty: "easy" },
      { title: "Einmaleins im Kopf", skill: "multiply", icon: "×", description: "Malaufgaben sicher aus dem Kopf lösen.", explanation: "Nutze bekannte Reihen und Tauschaufgaben, um neue Ergebnisse zu finden.", difficulty: "easy" }
    ],
    5: [
      { title: "Bruchteile anwenden", skill: "fractions", icon: "½", description: "Brüche in Sachaufgaben verwenden.", explanation: "Berechne Teile einer Menge und setze Brüche in Kontextaufgaben um.", difficulty: "easy" },
      { title: "Prozentaufgaben", skill: "percent", icon: "%", description: "Prozentrechnung bei einfachen Beispielen.", explanation: "Berechne Rabatte und Teile eines Ganzen mit Prozentangaben.", difficulty: "easy" },
      { title: "Rechenmix mit großen Zahlen", skill: "add", icon: "＋", description: "Große Zahlen addieren und voneinander abziehen.", explanation: "Ordne gleiche Stellenwerte untereinander und prüfe dein Ergebnis mit einem Überschlag.", difficulty: "easy" },
      { title: "Umfang und Fläche üben", skill: "geometry", icon: "□", description: "Umfang und Fläche einfacher Rechtecke berechnen.", explanation: "Addiere alle Seiten für den Umfang und multipliziere Länge und Breite für die Fläche.", difficulty: "easy" }
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
  { title: "Zeichensetzung", skill: "de-punctuation", icon: ".,", description: "Satzzeichen sicher setzen.", explanation: "Aussagesätze enden mit einem Punkt, Fragen mit einem Fragezeichen. Kommas trennen zum Beispiel Aufzählungen und Nebensätze." },
  { title: "Lesen mit Verständnis", skill: "de-reading", icon: "📖", description: "Kurze Texte lesen und Fragen zum Inhalt beantworten.", explanation: "Lies den Text aufmerksam, markiere wichtige Informationen und beantworte die Fragen mit vollständigen Sätzen." },
  { title: "Komposita & Wortbildung", skill: "de-words", icon: "🔗", description: "Wörter zusammensetzen und Wortteile erkennen.", explanation: "Untersuche zusammengesetzte Wörter (Komposita) und finde Bedeutungsteile wie Vorsilben oder Endungen." },
  { title: "Groß‑ und Kleinschreibung", skill: "de-capitalization", icon: "A", description: "Regeln zur Großschreibung üben.", explanation: "Nomen werden im Deutschen großgeschrieben. Achte außerdem auf Satzanfänge und Eigennamen." },
  { title: "Synonyme & Antonyme", skill: "de-vocabulary", icon: "↔", description: "Wortbedeutungen vergleichen und Gegenteile finden.", explanation: "Finde Wörter mit ähnlicher Bedeutung (Synonyme) und solche mit entgegengesetzter Bedeutung (Antonyme)." }
];

// Explizites deutsches Curriculum pro Klassenstufe (angepasst an Lernniveau)
const germanCurriculum = {
  1: [
    { title: "Rechtschreibung (Grundlagen)", skill: "de-spelling", icon: "Ä", description: "Einfache Wörter richtig schreiben.", explanation: "Lies das Wort langsam und höre die Silben. Merke dir schwierige Buchstabenverbindungen.", difficulty: "easy" },
    { title: "Wortarten (Einführung)", skill: "de-wordclass", icon: "W", description: "Nomen, Verben und Adjektive kennenlernen.", explanation: "Nomen benennen Dinge, Menschen oder Tiere. Verben sagen, was jemand tut, und Adjektive beschreiben, wie etwas ist.", difficulty: "easy" },
    { title: "Satzbau (einfach)", skill: "de-wordorder", icon: "S", description: "Einfache Sätze bilden und ordnen.", explanation: "Bilde einfache Sätze aus Wörtern und achte darauf, dass sie in der richtigen Reihenfolge stehen.", difficulty: "easy" },
    { title: "Lesen mit Verständnis (Kurztexte)", skill: "de-reading", icon: "📖", description: "Kurze Texte lesen und Fragen beantworten.", explanation: "Lies den Text und beantworte einfache Fragen zum Inhalt.", difficulty: "easy" },
    { title: "Silben und Reime", skill: "de-spelling", icon: "♪", description: "Wörter in Silben zerlegen und Reimwörter erkennen.", explanation: "Sprich Wörter langsam und klatsche ihre Silben. Reimwörter klingen am Ende ähnlich.", difficulty: "easy" },
    { title: "Tunwörter erkennen", skill: "de-wordclass", icon: "W", description: "Verben in einfachen Sätzen finden.", explanation: "Verben sagen, was jemand tut. Frage: Was macht die Person oder das Tier?", difficulty: "easy" }
  ],
  2: [
    { title: "Rechtschreibung: Dehnungs‑ und Verdoppelungsregeln", skill: "de-spelling", icon: "Ä", description: "Wörter mit doppelten Buchstaben und Dehnungszeichen üben.", explanation: "Achte auf Lautfolgen und typische Schreibmuster (z. B. 'ss' vs. 'ß').", difficulty: "easy" },
    { title: "Wortarten (Übungen)", skill: "de-wordclass", icon: "W", description: "Wortarten in kurzen Sätzen erkennen.", explanation: "Finde Nomen, Verben und Adjektive im Satz und benenne sie.", difficulty: "easy" },
    { title: "Satzbau: Fragen & Antworten", skill: "de-wordorder", icon: "S", description: "Fragen bilden und beantworten.", explanation: "Formuliere Fragen zu einer Aussage. Bei W-Fragen steht das Verb meistens an zweiter Stelle, bei Ja-/Nein-Fragen an erster Stelle.", difficulty: "easy" },
    { title: "Wortschatz: Gegenstände & Orte", skill: "de-vocabulary", icon: "↔", description: "Begriffe für Alltagssituationen lernen.", explanation: "Ordne Wörter Themen zu (z. B. Schule, Küche, Natur).", difficulty: "easy" },
    { title: "Nomen und Verben", skill: "de-wordclass", icon: "W", description: "Nomen und Verben in kurzen Sätzen unterscheiden.", explanation: "Nomen benennen Menschen, Tiere oder Dinge. Verben beschreiben, was sie tun.", difficulty: "easy" },
    { title: "Wörter richtig schreiben", skill: "de-spelling", icon: "Ä", description: "Häufige Wörter sicher schreiben.", explanation: "Sprich ein Wort langsam und prüfe, ob alle Laute und Buchstaben enthalten sind.", difficulty: "easy" }
  ],
  3: [
    { title: "Rechtschreibung: Großschreibung", skill: "de-capitalization", icon: "A", description: "Nomen und Satzanfänge richtig großschreiben.", explanation: "Erkenne Nomen und setze Großbuchstaben am Satzanfang ein.", difficulty: "easy" },
    { title: "Satzbau: Nebensätze (einfach)", skill: "de-wordorder", icon: "S", description: "Einfache Nebensätze verstehen und bilden.", explanation: "Füge Nebensätze an Hauptsätze an und achte auf die Verbposition.", difficulty: "easy" },
    { title: "Lesen mit Verständnis: kurze Geschichten", skill: "de-reading", icon: "📖", description: "Kurzgeschichten lesen und Fragen beantworten.", explanation: "Finde die Hauptpersonen, Handlungen und den Schluss im Text.", difficulty: "easy" },
    { title: "Wortschatz & Komposita", skill: "de-words", icon: "🔗", description: "Wörter zusammensetzen (Komposita) üben.", explanation: "Bilde zusammengesetzte Wörter und erkenne Bedeutungsanteile.", difficulty: "easy" },
    { title: "Wortfamilien", skill: "de-words", icon: "🔗", description: "Zusammengesetzte Wörter und ihre Bestandteile entdecken.", explanation: "Verbinde passende Wörter und achte darauf, wie sich ihre Bedeutung zusammensetzt.", difficulty: "easy" },
    { title: "Satzzeichen setzen", skill: "de-punctuation", icon: ".,", description: "Punkte und Fragezeichen am Satzende ergänzen.", explanation: "Aussagesätze enden meist mit einem Punkt, Fragen mit einem Fragezeichen.", difficulty: "easy" }
  ],
  4: [
    { title: "Zeichensetzung: Komma & Fragezeichen", skill: "de-punctuation", icon: ".,", description: "Kommas bei Aufzählungen und einfache Fragen setzen.", explanation: "Setze Kommas in Aufzählungen und Fragezeichen bei Fragesätzen.", difficulty: "easy" },
    { title: "Rechtschreibung: schwierige Laute", skill: "de-spelling", icon: "Ä", description: "Wörter mit schwierigen Lauten und Schreibungen, zum Beispiel äu und ei, üben.", explanation: "Erkenne häufige Stolperstellen in der Schreibweise und übe sie.", difficulty: "easy" },
    { title: "Lesen: Hauptaussage finden", skill: "de-reading", icon: "📖", description: "Die Hauptaussage eines kurzen Textes bestimmen.", explanation: "Fasse in einem Satz zusammen, worum es im Text geht.", difficulty: "easy" },
    { title: "Wortschatz: ähnliche Wörter", skill: "de-vocabulary", icon: "↔", description: "Wörter mit ähnlicher Bedeutung finden.", explanation: "Synonyme bedeuten ungefähr dasselbe. Suche das Wort, das am besten passt.", difficulty: "easy" },
    { title: "Wortarten wiederholen", skill: "de-wordclass", icon: "W", description: "Nomen, Verben und Adjektive unterscheiden.", explanation: "Nomen benennen, Verben handeln und Adjektive beschreiben.", difficulty: "easy" }
  ],
  5: [
    { title: "Grammatik: Zeiten (Präsens, Präteritum)", skill: "de-grammar", icon: "G", description: "Verben in verschiedenen Zeiten verwenden.", explanation: "Setze Verben korrekt in Präsens und Präteritum ein.", difficulty: "medium" },
    { title: "Lesen: Information entnehmen", skill: "de-reading", icon: "📖", description: "Texte lesen und Informationen gezielt entnehmen.", explanation: "Markiere wichtige Fakten und beantworte gezielte Fragen.", difficulty: "medium" },
    { title: "Komposita & Wortbildung (erweitert)", skill: "de-words", icon: "🔗", description: "Längere zusammengesetzte Wörter analysieren.", explanation: "Zerlege Komposita in ihre Bestandteile und erkläre die Bedeutung.", difficulty: "medium" },
    { title: "Groß- und Kleinschreibung", skill: "de-capitalization", icon: "A", description: "Nomen und Satzanfänge richtig schreiben.", explanation: "Nomen und Satzanfänge werden großgeschrieben. Prüfe jeden Satz auf diese Stellen.", difficulty: "easy" },
    { title: "Satzzeichen im Text", skill: "de-punctuation", icon: ".,", description: "Punkte, Fragezeichen und einfache Kommas setzen.", explanation: "Achte darauf, ob ein Satz eine Aussage, eine Frage oder eine Aufzählung enthält.", difficulty: "easy" }
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

const storageStatus = document.querySelector("#storage-status") ||
  (typeof document.createElement === "function" ? document.createElement("div") : null);
let storageFailureMessages = [];
if (storageStatus) {
  storageStatus.id = "storage-status";
  storageStatus.setAttribute?.("role", "alert");
  storageStatus.setAttribute?.("aria-live", "assertive");
  storageStatus.setAttribute?.("aria-atomic", "true");
  storageStatus.hidden = true;
  Object.assign(storageStatus.style, {
    marginBottom: "1rem",
    padding: "0.75rem 1rem",
    border: "1px solid #b42318",
    borderRadius: "0.5rem",
    backgroundColor: "#fef3f2",
    color: "#7a271a"
  });
  if (dashboard.parentElement) {
    dashboard.parentElement.insertBefore(storageStatus, dashboard);
  }
}

function reportStorageFailure(message) {
  if (!storageStatus) return;
  if (!storageFailureMessages.includes(message)) {
    storageFailureMessages.push(message);
  }
  storageStatus.textContent = storageFailureMessages.join(" ");
  storageStatus.hidden = false;
}

function clearStorageFailure() {
  if (!storageStatus) return;
  storageFailureMessages = [];
  storageStatus.textContent = "";
  storageStatus.hidden = true;
}

let saved = {};
let savedRaw = null;
try {
  savedRaw = localStorage.getItem("mathekompass-progress");
} catch (error) {
  reportStorageFailure("Dein gespeicherter Lernfortschritt konnte nicht geladen werden. Änderungen lassen sich möglicherweise nicht dauerhaft speichern.");
}
if (savedRaw) {
  try {
    saved = JSON.parse(savedRaw);
  } catch (error) {
    console.warn("Ungültige Lern-App-Daten in localStorage – Standardwerte werden geladen.", error);
    saved = {};
  }
}

if (!saved || typeof saved !== "object") {
  saved = {};
}

const savedSessions = Array.isArray(saved.sessions) ? saved.sessions : [];
const progress = {
  // Saved progress outside the supported grade range falls back to grade 1.
  grade: Number.isInteger(saved.grade) && saved.grade >= 1 && saved.grade <= 5 ? saved.grade : 1,
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

function persistProgress(coinBalance) {
  let progressSaved = true;
  try {
    localStorage.setItem("mathekompass-progress", JSON.stringify(progress));
  } catch (error) {
    progressSaved = false;
    reportStorageFailure("Dein Lernfortschritt konnte nicht gespeichert werden. Deine Änderungen sind möglicherweise nur vorübergehend.");
  }
  const platformSaved = syncPlatformUnlock(coinBalance);
  if (progressSaved && platformSaved) {
    clearStorageFailure();
  }
  return progressSaved && platformSaved;
}

function syncPlatformUnlock(coinBalance) {
  const balance = coinBalance === undefined ? getCoinBalance() : coinBalance;
  if (balance === null) {
    return false;
  }

  const failedKeys = [];
  [
    ["gamehub-coin-balance", String(balance)],
    ["gamehub-plays-left", String(balance)],
    ["gamehub-lern-app-unlocked", String(balance > 0)]
  ].forEach(([key, value]) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      failedKeys.push(key);
    }
  });

  if (failedKeys.length) {
    reportStorageFailure(`Münzen und Freischaltung konnten nicht vollständig gespeichert werden (${failedKeys.join(", ")}).`);
    return false;
  }
  if (coinCount) {
    coinCount.textContent = String(balance);
  }
  return true;
}

function renderDashboard() {
  dashboard.hidden = false;
  lessonView.hidden = true;
  parentReport.hidden = true;
  gradeSelect.value = String(progress.grade);
  subjectSelect.value = progress.subject;
  completedCount.textContent = String(progress.completed);
  if (coinCount) {
    const balance = getCoinBalance();
    if (balance !== null) {
      coinCount.textContent = String(balance);
    }
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
    const taskCount = exercisesPerLesson;
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
      <article class="report-stat"><span>Trefferquote bei Erstversuchen</span><strong>${accuracy === null ? "–" : `${accuracy} %`}</strong></article>
    </div>
    <p class="report-note">Die Trefferquote zeigt Übungsergebnisse und ist kein vollständiger oder sicherer Nachweis des Wissensstands. Ergebnisse früher abgeschlossener Einheiten bleiben erhalten; ob Antworten beim ersten Versuch richtig waren, lässt sich für diese Einheiten nicht nachträglich feststellen. Ältere Einheiten ohne gespeicherte Einzelergebnisse erscheinen weiterhin nur in der Gesamtzahl.</p>
    <section class="report-section" aria-labelledby="topic-progress-title">
      <h2 id="topic-progress-title">Ergebnisse je Thema</h2>
      ${topicRows
        ? `<div class="report-table-wrap"><table class="report-table"><thead><tr><th>Fach</th><th>Klasse</th><th>Thema</th><th>Einheiten</th><th>Beim ersten Versuch richtig</th></tr></thead><tbody>${topicRows}</tbody></table></div>`
        : '<p class="report-empty">Nach der nächsten abgeschlossenen Einheit erscheinen hier die Ergebnisse je Thema.</p>'}
    </section>
    <section class="report-section" aria-labelledby="session-history-title">
      <h2 id="session-history-title">Letzte Übungsergebnisse</h2>
      ${historyRows
        ? `<div class="report-table-wrap"><table class="report-table"><thead><tr><th>Datum</th><th>Fach</th><th>Klasse</th><th>Thema</th><th>Beim ersten Versuch richtig</th></tr></thead><tbody>${historyRows}</tbody></table></div>`
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
      const sides = randomInt(3, 6);
      const shape = ["", "", "", "Dreieck", "Viereck", "Fünfeck", "Sechseck"][sides];
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
  ["Kaze", "Katze"], ["Schuhle", "Schule"],
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

// Fugenelemente für Komposita: erste Wortbestandteil + Fuge (Hund → Hunde-, Schule → Schul-)
const germanNounFuges = {
  Hund: "Hunde",
  Schule: "Schul",
  Gedanke: "Gedanken",
  Freiheit: "Freiheits"
};

const germanSentences = [
  { words: ["Der", "Hund", "bellt", "laut"], answer: "Der Hund bellt laut." },
  { words: ["Mia", "liest", "ein", "Buch"], answer: "Mia liest ein Buch." },
  { words: ["Am", "Morgen", "scheint", "die", "Sonne"], answer: "Am Morgen scheint die Sonne." },
  { words: ["Wir", "spielen", "nach", "der", "Schule", "im", "Garten"], answer: "Wir spielen nach der Schule im Garten." },
  { words: ["Der", "kleine", "Vogel", "singt"], answer: "Der kleine Vogel singt." },
  { words: ["Papa", "backt", "einen", "Kuchen"], answer: "Papa backt einen Kuchen." },
  { words: ["Lina", "malt", "ein", "Haus"], answer: "Lina malt ein Haus." },
  { words: ["Der", "Fuchs", "rennt", "schnell"], answer: "Der Fuchs rennt schnell." },
  { words: ["Obwohl", "es", "regnet", "gehen", "wir", "spazieren"], answer: "Obwohl es regnet, gehen wir spazieren." },
  { words: ["Die", "Forscherin", "erklärt", "das", "spannende", "Experiment"], answer: "Die Forscherin erklärt das spannende Experiment." },
  { words: ["Morgen", "besuchen", "meine", "Freunde", "das", "neue", "Museum"], answer: "Morgen besuchen meine Freunde das neue Museum." },
  { words: ["Nachdem", "der", "Unterricht", "beendet", "war", "fuhr", "Lena", "nach", "Hause"], answer: "Nachdem der Unterricht beendet war, fuhr Lena nach Hause." }
];

// Zusätzliche Textpools für schwierigere Leseaufgaben
const germanIntermediateTexts = [
  { text: "Anna hat ihren Hund im Park verloren. Sie ruft seinen Namen und sucht unter den Bäumen.", question: "Was sucht Anna?", options: ["ihren Hund", "einen Ball", "den Bus"], answer: "ihren Hund" },
  { text: "Max findet eine Karte mit einem Kreuz. Er beginnt zu graben und entdeckt eine alte Dose.", question: "Was hat Max entdeckt?", options: ["eine Dose", "ein Fahrrad", "ein Buch"], answer: "eine Dose" },
  { text: "Lara zieht ihre Regenstiefel an, bevor sie durch die Pfützen zum Garten geht.", question: "Warum zieht Lara Regenstiefel an?", options: ["Sie möchte durch Pfützen gehen.", "Sie fährt Fahrrad.", "Sie geht schwimmen."], answer: "Sie möchte durch Pfützen gehen." },
  { text: "Noah stellt einen Topf mit Bohnen auf die Fensterbank und gießt die Erde jeden Morgen.", question: "Was tut Noah jeden Morgen?", options: ["Er gießt die Erde.", "Er erntet Äpfel.", "Er fegt den Hof."], answer: "Er gießt die Erde." },
  { text: "Die Schulbücherei ist jeden Dienstag geöffnet. Mia gibt dort ein Buch zurück und leiht ein neues aus.", question: "Wann ist die Schulbücherei geöffnet?", options: ["Jeden Dienstag", "Jeden Sonntag", "Jeden Morgen"], answer: "Jeden Dienstag" },
  { text: "Ben baut aus Papier eine Brücke und prüft, ob ein Spielzeugauto darüberfahren kann.", question: "Was prüft Ben?", options: ["Ob das Auto über die Brücke fahren kann", "Ob das Papier schwimmen kann", "Ob das Auto fliegen kann"], answer: "Ob das Auto über die Brücke fahren kann" },
  { text: "Eine Biene fliegt von Blüte zu Blüte und sammelt Nektar für ihren Bienenstock.", question: "Was sammelt die Biene?", options: ["Nektar", "Blätter", "Wasser aus einem See"], answer: "Nektar" },
  { text: "Am Sonntag sperrt die Stadt eine Straße für den Wochenmarkt. Dort verkaufen Händler Obst und Gemüse.", question: "Was findet am Sonntag statt?", options: ["Ein Wochenmarkt", "Ein Fußballspiel", "Ein Konzert"], answer: "Ein Wochenmarkt" },
  { text: "Emil packt eine Trinkflasche und ein Brot in seinen Rucksack, bevor er zur Wanderung aufbricht.", question: "Wohin bricht Emil auf?", options: ["Zu einer Wanderung", "Zum Schwimmbad", "Zum Bahnhof"], answer: "Zu einer Wanderung" }
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
  { word: "klug", answer: "schlau", options: ["schlau", "müde", "laut"] },
  { word: "fröhlich", answer: "heiter", options: ["heiter", "dunkel", "langsam"] },
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
  { text: "Lena liest ein spannendes Buch", answer: "Lena liest ein spannendes Buch.", hint: "Das ist eine Aussage. Sie endet mit einem Punkt." },
  { text: "Wann fährt der Bus ab", answer: "Wann fährt der Bus ab?", hint: "Der Satz fragt nach einer Zeit." },
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
      const pool = germanSpellingPairs.slice(0, progress.grade <= 2 ? 8 : progress.grade <= 4 ? 12 : germanSpellingPairs.length);
      const [wrong, answer] = pickRandom(pool);
      return { text: `Schreibe das Wort richtig: ${wrong}`, answer, hint: "Achte auf die Buchstaben, die im Wort oft verwechselt oder vergessen werden." };
    }
    case "de-wordclass": {
      const pool = germanWords.slice(0, progress.grade <= 2 ? 8 : progress.grade <= 4 ? 9 : germanWords.length);
      const item = pickRandom(pool);
      return { text: `Zu welcher Wortart gehört „${item.word}“? (Nomen, Verb oder Adjektiv)`, answer: item.type, hint: "Nomen bezeichnen Dinge, Verben Tätigkeiten und Adjektive Eigenschaften." };
    }
    case "de-wordorder": {
      const pool = germanSentences.slice(0, progress.grade <= 4 ? 8 : germanSentences.length);
      const item = pickRandom(pool);
      const words = [...item.words];
      for (let index = words.length - 1; index > 0; index -= 1) {
        const swapIndex = randomInt(0, index);
        [words[index], words[swapIndex]] = [words[swapIndex], words[index]];
      }
      return { text: `Ordne die Wörter zu einem Satz: ${words.join(" / ")}`, answer: item.answer, caseSensitive: true, hint: "Achte auf die Satzstellung, den Satzanfang und das Satzzeichen am Ende." };
    }
    case "de-vocabulary": {
      const pool = germanVocabulary.slice(0, progress.grade <= 2 ? 8 : progress.grade <= 4 ? 9 : germanVocabulary.length);
      const item = pickRandom(pool);
      return { text: `Welches Wort bedeutet ungefähr dasselbe wie „${item.word}“? (${item.options.join(", ")})`, answer: item.answer, hint: "Suche das Wort mit einer ähnlichen Bedeutung." };
    }
    case "de-grammar": {
      const verb = pickRandom(germanRegularVerbs);
      const person = pickRandom(germanPersons);
      const tense = progress.grade < 5 ? "present" : "past";
      const tenseLabel = tense === "present" ? "Präsens" : "Präteritum";
      // Verben auf -eln/-ern behalten die Endsilbe im Stamm: sammeln → sammel-, wandern → wander-
      const elErn = verb.endsWith("eln") || verb.endsWith("ern");
      const stem = elErn ? verb.slice(0, -1) : verb.slice(0, -2);
      let answer;
      if (person.pronoun === "sie") {
        // „sie“ ist vieldeutig: Singular- und Pluralform sind beide korrekt (sie sammelte / sie sammelten)
        answer = tense === "past"
          ? [`${stem}te`, `${stem}ten`]
          : [`${stem}${germanPersons[2].present}`, elErn ? verb : `${stem}en`];
      } else if (elErn && tense === "present") {
        if (person.pronoun === "wir") {
          answer = verb;
        } else if (person.pronoun === "ich") {
          // Stamm-e fällt vor der Endung -e weg: sammle, wandre
          answer = `${verb.replace(/e([lr])n$/, "$1")}e`;
        } else {
          answer = `${stem}${person.present}`;
        }
      } else {
        answer = `${stem}${tense === "past" ? person.past : person.present}`;
      }
      return { text: `Setze „${verb}“ für „${person.pronoun}“ ins ${tenseLabel}: ${person.pronoun} ___`, answer, hint: "Bestimme zuerst den Wortstamm und ergänze die passende Verbendung." };
    }
    case "de-punctuation": {
      const item = pickRandom(germanPunctuationQuestions.slice(0, progress.grade < 5 ? 8 : germanPunctuationQuestions.length));
      return { text: `Setze Großschreibung und Satzzeichen richtig: ${item.text}`, answer: item.answer, caseSensitive: true, hint: item.hint };
    }
    case "de-reading": {
      // Leseverständnis: wähle Schwierigkeitsgrad nach Klassenstufe
      if (progress.grade < 5) {
        // einfache Sätze wie vorher
        const item = pickRandom(germanSentences.slice(0, 8));
        const possible = item.words.filter(w => w[0] === w[0].toUpperCase() && !["Der","Die","Das","Ein","Eine"].includes(w));
        const subject = possible.length ? possible[0] : item.words[0];
        const distractorPool = germanWords.filter(w => w.type === "Nomen").map(w => w.word).filter(w => w !== subject);
        const distractor = distractorPool.length ? pickRandom(distractorPool) : "Die Katze";
        return { text: `Lies: "${item.answer}"\nFrage: Wer handelt im Satz? Wähle die richtige Antwort: A) ${subject}  B) ${distractor}`, answer: subject, hint: "Lies den Satz und finde das handelnde Wort (meist ein Nomen)." };
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
        return { text: `Lies: "${item.text}"\nFrage: ${item.question}`, answer: item.answer, options: opts, hint: "Lies den Text genau und wähle die passende Antwort." };
      }
      // grade >= 7 : anspruchsvollere Kurztexte mit MCQ
      const adv = pickRandom(germanAdvancedTexts);
      const optsAdv = adv.options.slice();
      for (let i = optsAdv.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optsAdv[i], optsAdv[j]] = [optsAdv[j], optsAdv[i]];
      }
      return { text: `Lies: "${adv.text}"\nFrage: ${adv.question}`, answer: adv.answer, options: optsAdv, hint: "Achte auf die Kernaussage des Textes und wähle die beste Antwort." };
    }
    case "de-words": {
      // Komposita bilden: zwei Nomen zusammenfügen
      const nouns = germanWords.filter(w => w.type === "Nomen").map(w => w.word);
      const a = pickRandom(nouns);
      const b = pickRandom(nouns.filter(n => n !== a));
      // Komposita: erster Bestandteil groß, Rest klein, mit korrekter Fuge (Hundeschule, Gedankenschule)
      const fuge = germanNounFuges[a] || a;
      const compound = `${fuge}${b}`.replace(/\s+/g, "").toLowerCase();
      const answer = compound.charAt(0).toUpperCase() + compound.slice(1);
      return { text: `Was entsteht, wenn man die Wörter '${a}' und '${b}' verbindet? Schreibe das zusammengesetzte Wort.`, answer, hint: "Bilde das Kompositum und setze die beiden Wörter ohne Leerzeichen zusammen. Achte auf die Fuge (das Bindeglied zwischen den Wörtern)." };
    }
    case "de-capitalization": {
      // Groß-/Kleinschreibung üben: zeige kleingeschriebenen Satz, Antworte mit korrekter Großschreibung
      const item = pickRandom(germanSentences.slice(0, progress.grade < 5 ? 8 : germanSentences.length));
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

function buildErrorReport() {
  const { topic, questions, position, firstAttempts, submissions } = activeLesson;
  const question = questions[position];
  const subject = progress.subject === "german" ? "Deutsch" : "Mathe";
  const firstAttempt = firstAttempts[position] === null
    ? "noch nicht beantwortet"
    : firstAttempts[position] ? "richtig" : "falsch";
  const submitted = submissions[position] === null || submissions[position] === undefined
    ? "(keine Antwort eingegeben)"
    : `"${submissions[position]}"`;
  const expected = Array.isArray(question.answer) ? question.answer.join("  |  ") : String(question.answer);
  const options = question.options ? `\nAntwortoptionen: ${question.options.join("  |  ")}\n` : "";
  return [
    "Fehlermeldung aus der Lern-App (WissenOhneEnde)",
    "",
    `Zeitpunkt: ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date())}`,
    `Fach: ${subject}, Klasse ${progress.grade}`,
    `Thema: "${topic.title}" (skill: ${topic.skill})`,
    `Aufgabe ${position + 1} von ${questions.length} · Erstversuch: ${firstAttempt}`,
    options,
    "Frage:",
    question.text,
    "",
    `Zuletzt eingegebene Antwort: ${submitted}`,
    `Als Lösung hinterlegt: ${expected}`,
    `Tipp: ${question.hint}`,
    "",
    "Kontext für die Bearbeitung:",
    `Die Aufgabe wurde von makeQuestion()/makeGermanQuestion() in Lern-App/script.js erzeugt (skill "${topic.skill}").`,
    "Bitte prüfe, ob die hinterlegte Lösung stimmt bzw. ob eine gültige Eingabe fälschlich abgelehnt wurde."
  ].join("\n");
}

function copyToClipboard(text) {
  return new Promise((resolve) => {
    const fallbackCopy = () => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(textarea);
        resolve(copied);
      } catch (error) {
        resolve(false);
      }
    };
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => resolve(true), fallbackCopy);
    } else {
      fallbackCopy();
    }
  });
}

function reportExerciseError(button) {
  copyToClipboard(buildErrorReport()).then((copied) => {
    if (button) {
      button.disabled = true;
      button.textContent = copied ? "Bericht kopiert" : "Kopieren nicht möglich";
      setTimeout(() => {
        button.textContent = "Fehler melden";
        button.disabled = false;
      }, 2500);
    }
    if (!copied) {
      const hintText = document.querySelector("#hint-text");
      hintText.textContent = `Kopieren ist hier nicht möglich. Markiere den folgenden Text und kopiere ihn manuell:\n\n${buildErrorReport()}`;
      hintText.hidden = false;
    }
  });
}

function startLesson(topicIndex) {
  const topics = (progress.subject === "german" ? germanCurriculum : curriculum)[progress.grade];
  const topic = topics[topicIndex];
  const count = exercisesPerLesson;
  activeLesson = {
    topic,
    topicIndex,
    questions: makeUniqueQuestions(topic, count),
    position: 0,
    correct: 0,
    firstAttempts: Array(count).fill(null),
    submissions: Array(count).fill(null),
    resolved: false
  };
  renderLesson();
}

function renderLesson() {
  dashboard.hidden = true;
  lessonView.hidden = false;
  const { topic, questions, position } = activeLesson;
  const question = questions[position];
  const answered = activeLesson.firstAttempts.filter((result) => result !== null).length;
  const subjectName = progress.subject === "german" ? "Deutsch" : "Mathe";

  lessonView.innerHTML = `
    <button class="back-button" type="button" id="back-button"><span aria-hidden="true">←</span> Alle Themen</button>
    <header class="lesson-heading">
      <p class="eyebrow">KLASSE ${progress.grade} · ${subjectName.toLocaleUpperCase("de-DE")} ÜBEN</p>
      <h1>${topic.title}</h1>
      <p>Eine kurze Erklärung und dann übst du es Schritt für Schritt.</p>
    </header>
    <div class="lesson-progress" aria-label="Fortschritt">
      <div class="lesson-progress-label"><span>Dein Fortschritt</span><span id="progress-count">${answered} von ${questions.length} Erstversuchen</span></div>
      <div class="progress-track" id="progress-track" role="progressbar" aria-label="Beim ersten Versuch beantwortete Aufgaben" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${answered}">
        ${activeLesson.firstAttempts.map((result, index) => {
          const status = result === null ? "" : result ? " is-correct" : " is-incorrect";
          return `<span class="progress-segment${status}" data-question="${index}" aria-hidden="true"></span>`;
        }).join("")}
      </div>
    </div>
    <article class="explanation-card">
      <p class="card-kicker">Kurz erklärt</p>
      <p>${topic.explanation}</p>
    </article>
    <article class="exercise-card">
      <p class="exercise-count">AUFGABE ${position + 1} VON ${questions.length}</p>
      <h2 class="question">${question.text}</h2>
      ${question.options ? `
        <div class="options-list" id="options-list">
           ${question.options.map((o, i) => `<button class="option-button" data-choice="${escapeHtml(String(o))}">${String.fromCharCode(65+i)}) ${escapeHtml(String(o))}</button>`).join('')}
        </div>
      ` : `
        <form class="answer-form" id="answer-form">
           <label class="sr-only" for="answer-input">Deine Antwort</label>
           <input class="answer-input" id="answer-input" name="answer" type="text" inputmode="${progress.subject === "math" ? "decimal" : "text"}" autocomplete="off" placeholder="Deine Antwort" required>
           <button class="primary-button" type="submit">Prüfen</button>
        </form>
      `}
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <div class="exercise-actions">
        <div class="exercise-actions-left">
          <button class="hint-button" id="hint-button" type="button">Tipp ansehen</button>
          <button class="hint-button" id="report-button" type="button">Fehler melden</button>
        </div>
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
  document.querySelector("#report-button").addEventListener("click", (event) => {
    reportExerciseError(event.currentTarget);
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
  const firstAttempt = activeLesson.firstAttempts[activeLesson.position] === null;

  // determine submitted value
  let rawSubmitted;
  if (submittedAnswer !== undefined) {
    rawSubmitted = String(submittedAnswer);
  } else if (input) {
    rawSubmitted = input.value;
  } else {
    rawSubmitted = "";
  }
  activeLesson.submissions[activeLesson.position] = rawSubmitted;

  const answer = typeof question.answer === "number" ? parseAnswer(rawSubmitted) : rawSubmitted.trim().replace(/\s+/g, " ");
  const expectedAnswers = (Array.isArray(question.answer) ? question.answer : [question.answer]).map((expected) =>
    typeof expected === "string" && !question.caseSensitive ? expected.toLocaleLowerCase("de-DE") : expected
  );
  const submitted = typeof answer === "string" && !question.caseSensitive
    ? answer.toLocaleLowerCase("de-DE")
    : answer;

  const isCorrect = typeof question.answer === "number"
    ? Number.isFinite(answer) && Math.abs(answer - question.answer) < 0.011
    : expectedAnswers.includes(submitted);

  if (firstAttempt) {
    activeLesson.firstAttempts[activeLesson.position] = isCorrect;
    if (isCorrect) activeLesson.correct += 1;
    updateLessonProgress();
  }

  if (isCorrect) {
    activeLesson.resolved = true;
    feedback.className = "feedback correct";
    feedback.textContent = firstAttempt
      ? question.solution ? `Richtig! ${question.solution}` : "Richtig!"
      : "Richtig gelöst! Für die Trefferquote zählt der erste Versuch.";
    // hide/disable input or option buttons
    const submitBtn = document.querySelector("#answer-form button");
    if (submitBtn) submitBtn.hidden = true;
    // Eingabefeld bleibt fokusierbar (nur schreibgeschützt), damit ein erneutes Enter die nächste Aufgabe lädt
    if (input) {
      input.readOnly = true;
      input.focus();
    }
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

function updateLessonProgress() {
  const { firstAttempts, position, questions } = activeLesson;
  const answered = firstAttempts.filter((result) => result !== null).length;
  const result = firstAttempts[position];
  const segment = document.querySelector(`.progress-segment[data-question="${position}"]`);
  segment.classList.toggle("is-correct", result === true);
  segment.classList.toggle("is-incorrect", result === false);

  const progressCount = document.querySelector("#progress-count");
  progressCount.textContent = `${answered} von ${questions.length} Erstversuchen`;

  const progressTrack = document.querySelector("#progress-track");
  progressTrack.setAttribute("aria-valuenow", String(answered));
}

function nextQuestion() {
  const last = activeLesson.position === activeLesson.questions.length - 1;
  if (last) {
    finishLesson();
    return;
  }
  activeLesson.position += 1;
  activeLesson.resolved = false;
  renderLesson();
}

function finishLesson() {
  const { topic, topicIndex, questions, correct } = activeLesson;
  progress.completed += 1;
  const currentCoinBalance = getCoinBalance();
  const coinBalance = currentCoinBalance === null ? null : currentCoinBalance + 1;
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
  persistProgress(coinBalance);

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
      <div class="summary-score">${correct} von ${questions.length} Aufgaben beim ersten Versuch richtig bei „${topic.title}“</div>
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

// Enter im gelösten Zustand springt zur nächsten Aufgabe (wie „Nächste Aufgabe“)
function handleEnterKeyAdvance(event) {
  if (event.key !== "Enter" || event.shiftKey) return;
  if (!activeLesson || !activeLesson.resolved || lessonView.hidden) return;
  if (!document.querySelector("#answer-form") && !document.getElementById("options-list")) return;
  const focusedElement = document.activeElement;
  const inputFocused = focusedElement && focusedElement.id === "answer-input";
  if (focusedElement && focusedElement !== document.body && !inputFocused) return;
  event.preventDefault();
  nextQuestion();
}
document.addEventListener("keydown", handleEnterKeyAdvance);

renderDashboard();

function getCoinBalance() {
  try {
    const value = Number.parseInt(localStorage.getItem("gamehub-coin-balance") || "0", 10);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch (error) {
    if (coinCount) {
      coinCount.textContent = "—";
    }
    reportStorageFailure("Dein Münzestand konnte nicht aus dem Browserspeicher geladen werden. Die Münzen und Freischaltungen sind möglicherweise nicht verfügbar.");
    return null;
  }
}
