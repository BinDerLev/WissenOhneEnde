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
  { title: "Lesen mit Verständnis", skill: "de-reading", icon: "📖", description: "Kurze Texte lesen und Fragen zum Inhalt beantworten.", explanation: "Lies den Text aufmerksam, markiere wichtige Informationen und beantworte die Frage mit dem gesuchten Wort oder wähle eine Antwort." },
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

// Spezifische Lernziele statt mehrerer Titel für denselben Aufgabengenerator.
// Indizes bleiben erhalten; neue Lernziele erhalten einen eigenen Fortschrittsschlüssel.
function configureTopic(topics, index, changes) {
  Object.assign(topics[index], changes);
}
for (const grade of [1, 2]) {
  configureTopic(curriculum[grade], grade === 1 ? 3 : 4, { mode: "double-half" });
}
configureTopic(curriculum[1], 8, { mode: "complement" });
configureTopic(curriculum[1], 9, { mode: "number-compare" });
configureTopic(curriculum[2], 2, { title: "Uhrzeit und Zeitspannen", mode: "time", description: "Volle Stunden und Zeitspannen bestimmen.", explanation: "Eine Stunde hat 60 Minuten. Zähle die Stunden vom Beginn bis zum Ende." });
configureTopic(curriculum[2], 6, { mode: "coins" });
configureTopic(curriculum[1], 7, { title: "Vielecke untersuchen", description: "Ecken und Seiten von Vielecken zählen.", explanation: "Zähle die Ecken und Seiten. Ein Dreieck hat drei, ein Viereck vier." });
configureTopic(curriculum[4], 1, { title: "Geldbeträge addieren", moneyContext: true, description: "Einfache Geldbeträge in Euro addieren.", explanation: "Stelle die Kommas untereinander. Zehn Cent sind 0,10 Euro." });
configureTopic(curriculum[4], 6, { title: "Geldbeträge subtrahieren", moneyContext: true, operation: "subtract", description: "Differenzen zwischen Geldbeträgen berechnen.", explanation: "Stelle die Kommas untereinander und ziehe den kleineren Betrag vom größeren ab." });
configureTopic(curriculum[4], 7, { title: "Meter und Zentimeter umrechnen", description: "Ganze Meter in Zentimeter und zurück umwandeln.", explanation: "Ein Meter sind 100 Zentimeter. Von Metern zu Zentimetern multiplizierst du mit 100; zurück teilst du durch 100." });
configureTopic(curriculum[2], 9, { title: "Längen umrechnen", description: "Zwischen ganzen Metern und Zentimetern umrechnen.", explanation: "Ein Meter sind 100 Zentimeter. Von Metern zu Zentimetern multiplizierst du mit 100; zurück teilst du durch 100." });
configureTopic(curriculum[2], 7, { title: "Fehlende Zahlen", mode: "missing", description: "Die fehlende Zahl einer Plusaufgabe finden.", explanation: "Überlege, wie viel bis zum Ergebnis fehlt. Die Umkehraufgabe hilft." });
configureTopic(curriculum[3], 3, { operation: "subtract" });
configureTopic(curriculum[3], 4, { measure: "perimeter" });
configureTopic(curriculum[3], 8, { maxNumber: 100 });
configureTopic(curriculum[3], 9, { title: "Teilen ohne Rest", mode: "division", description: "Mengen gleichmäßig aufteilen.", explanation: "Nutze die passende Malaufgabe als Probe für deine Geteiltaufgabe." });
configureTopic(curriculum[4], 0, { written: true });
configureTopic(curriculum[4], 3, { operation: "add" });
configureTopic(curriculum[4], 8, { mode: "fraction-compare" });
configureTopic(curriculum[5], 4, { measure: "area" });
configureTopic(curriculum[5], 5, { title: "Daten auswerten", mode: "data", description: "Häufigkeiten aus einer kleinen Erhebung auswerten.", explanation: "Lies die Angaben genau. Addiere Häufigkeiten für die Gesamtzahl oder vergleiche sie durch Subtraktion." });
configureTopic(curriculum[5], 7, { title: "Teilen und prüfen", mode: "division", description: "Größere Zahlen durch einstellige Zahlen teilen.", explanation: "Teile schrittweise und prüfe dein Ergebnis mit der passenden Malaufgabe." });
for (const grade of [1, 2, 3, 4]) {
  curriculum[grade].push({ title: "Daten und Häufigkeiten", skill: "add", mode: "data", icon: "▥", description: "Angaben aus einer kleinen Erhebung lesen und vergleichen.", explanation: "Lies die Anzahlen ab. Für die Gesamtzahl addierst du die Werte; für den Unterschied subtrahierst du.", difficulty: "easy" });
}
configureTopic(germanCurriculum[1], 4, { mode: "syllables", title: "Silben zählen", description: "Wörter in Sprechsilben zerlegen.", explanation: "Sprich ein Wort langsam und klatsche jede Silbe mit." });
configureTopic(germanCurriculum[1], 5, { mode: "verb-find" });
configureTopic(germanCurriculum[2], 1, { title: "Wortarten bestimmen", description: "Einzelne Wörter als Nomen, Verb oder Adjektiv bestimmen.", explanation: "Nomen benennen, Verben sagen, was jemand tut, und Adjektive beschreiben Eigenschaften." });
configureTopic(germanCurriculum[2], 2, { title: "Sätze ordnen", description: "Wörter zu einfachen Aussagesätzen ordnen.", explanation: "Achte auf den Satzanfang, die Stellung des Verbs und den Punkt am Ende." });
configureTopic(germanCurriculum[2], 3, { title: "Wörter mit ähnlicher Bedeutung", description: "Einfache Synonyme erkennen.", explanation: "Wähle ein Wort, das ungefähr dasselbe bedeutet." });
configureTopic(germanCurriculum[2], 4, { mode: "verb-find", title: "Tunwörter im Satz", description: "Das Verb in einem kurzen Satz finden.", explanation: "Frage: Was tut die Person oder das Tier?" });
configureTopic(germanCurriculum[3], 1, { title: "Satzbau: Aussagesätze", description: "Einfache Aussagesätze aus Wörtern bilden.", explanation: "Achte auf den Satzanfang, die Stellung des Verbs und den Punkt am Ende." });
configureTopic(germanCurriculum[3], 4, { mode: "word-family", description: "Wörter mit demselben Wortstamm erkennen.", explanation: "Wörter einer Wortfamilie haben einen gemeinsamen Stamm: spielen, Spiel und Spieler." });
configureTopic(germanCurriculum[5], 2, { title: "Zusammengesetzte Nomen bilden", description: "Zwei Nomen zu einem gebräuchlichen Wort verbinden.", explanation: "Verbinde die Wörter in der angegebenen Reihenfolge. Manchmal brauchst du ein Bindeglied, zum Beispiel Hunde + Hütte." });

// NRW: Grundschule (Lehrpläne 2021), danach Gymnasium G9 (Kernlehrpläne 2019).
// Die Zuordnung innerhalb der Doppeljahrgänge bleibt eine didaktische Auswahl.
curriculum[4].push({ title: "Teilen durch einstellige Zahlen", skill: "multiply", mode: "division", icon: "÷", description: "Mehrstellige Zahlen ohne Rest durch einstellige Zahlen teilen.", explanation: "Teile schrittweise. Prüfe mit der Multiplikation, ob dein Ergebnis stimmt.", difficulty: "hard" });

// Ausgewählte Lernziele der NRW-Erprobungsstufe (5/6), vertieft in Klasse 6.
const gradeSixMathTopics = [
  ["Brüche addieren", "fraction-add", "Addiere Brüche mit gleichem Nenner."],
  ["Brüche subtrahieren", "fraction-subtract", "Subtrahiere Brüche mit gleichem Nenner."],
  ["Brüche multiplizieren", "fraction-multiply", "Multipliziere Zähler mit Zähler und Nenner mit Nenner."],
  ["Brüche dividieren", "fraction-divide", "Multipliziere mit dem Kehrwert des zweiten Bruchs."],
  ["Brüche kürzen", "reduce", "Teile Zähler und Nenner durch denselben gemeinsamen Teiler."],
  ["Dezimalzahlen multiplizieren", "decimal-multiply", "Multipliziere zunächst ohne Komma und beachte danach die Nachkommastellen."],
  ["Dezimalzahlen dividieren", "decimal-divide", "Teile den Dezimalbetrag durch die angegebene ganze Zahl."],
  ["Volumen von Quadern", "volume", "Multipliziere Länge, Breite und Höhe. Das Ergebnis steht in Kubikzentimetern."],
  ["Arithmetisches Mittel", "mean", "Addiere die Werte und teile die Summe durch ihre Anzahl."],
  ["Punkt vor Strich", "term", "Berechne zuerst die Multiplikation, danach die Addition."]
];
curriculum[6] = gradeSixMathTopics.map(([title, mode, explanation]) => ({ title, mode, skill: "add", icon: "∑", description: explanation, explanation, difficulty: "medium" }));
curriculum[6].push({ title: "Dreisatz im Alltag", skill: "ratio", icon: "↗", description: "Gleichbleibende Stückpreise für andere Anzahlen nutzen.", explanation: "Berechne zuerst den Preis für ein Stück und dann den Preis für die gesuchte Anzahl.", difficulty: "medium" });
germanCurriculum[6] = [
  { title: "Rechtschreibstrategien", skill: "de-spelling", icon: "Ä", description: "Wortstämme und typische Stolperstellen prüfen.", explanation: "Verlängere Wörter, suche verwandte Wörter oder zerlege das Wort in seine Bestandteile.", difficulty: "medium" },
  { title: "Sieben Wortarten", skill: "de-wordclass", mode: "wordclass-six", icon: "W", description: "Auch Artikel, Pronomen, Konjunktionen und Adverbien erkennen.", explanation: "Bestimme die Funktion des markierten Wortes im Satz.", difficulty: "medium" },
  { title: "Satzglieder bestimmen", skill: "de-grammar", mode: "sentence-member", icon: "S", description: "Subjekt, Prädikat, Objekte und adverbiale Bestimmungen unterscheiden.", explanation: "Frage: Wer oder was? Was geschieht? Wem? Wen oder was? Wann oder wo?", difficulty: "medium" },
  { title: "Zeiten wiederholen", skill: "de-grammar", icon: "G", description: "Präsens und Präteritum regelmäßiger Verben bilden.", explanation: "Achte auf Person, Wortstamm und die Endung der verlangten Zeitform.", difficulty: "medium" },
  { title: "Kommas in Satzgefügen", skill: "de-punctuation", icon: ",", description: "Haupt- und Nebensätze sowie Aufzählungen richtig abtrennen.", explanation: "Trenne Nebensätze durch Kommas vom Hauptsatz. In Aufzählungen steht ein Komma zwischen gleichrangigen Teilen.", difficulty: "medium" },
  { title: "Texte verstehen und einordnen", skill: "de-reading", mode: "reading-six", icon: "📖", description: "Aussagen, Textabsichten und sprachliche Bilder erkennen.", explanation: "Belege deine Auswahl mit den Informationen im Text. Unterscheide eine Information von einer Meinung oder Aufforderung.", difficulty: "medium" },
  { title: "Medien und Quellen", skill: "de-reading", mode: "media-six", icon: "M", description: "Quellen, Werbung und verantwortlichen Mediengebrauch beurteilen.", explanation: "Prüfe Herkunft und Absicht einer Nachricht. Vergleiche Quellen und schütze persönliche Daten.", difficulty: "medium" }
];

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
  grade: Number.isInteger(saved.grade) && saved.grade >= 1 && saved.grade <= 6 ? saved.grade : 1,
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

const questionHistoryStorageKey = "lernlabor-question-history-v1";
const questionHistoryLimit = 256;
const questionHistory = loadQuestionHistory();

function loadQuestionHistory() {
  const history = Object.create(null);
  try {
    const savedHistory = JSON.parse(localStorage.getItem(questionHistoryStorageKey) || "{}");
    if (savedHistory && typeof savedHistory === "object" && !Array.isArray(savedHistory)) {
      for (const [key, values] of Object.entries(savedHistory)) {
        if (!/^(math|german):[1-6]$/.test(key) || !Array.isArray(values)) continue;
        history[key] = [...new Set(values.filter((value) => typeof value === "string" && value.length <= 1024))].slice(-questionHistoryLimit);
      }
    }
  } catch (error) {
    console.warn("Aufgabenhistorie konnte nicht geladen werden.", error);
  }
  return history;
}

function questionHistoryKey() {
  // Gemeinsame Historie für verwandte Themen derselben Klasse und desselben Fachs.
  return `${progress.subject}:${progress.grade}`;
}

function rememberQuestions(questions) {
  const key = questionHistoryKey();
  const shown = questions.map(questionIdentity);
  const newIdentities = new Set(shown);
  questionHistory[key] = [...(questionHistory[key] || []).filter((identity) => !newIdentities.has(identity)), ...shown].slice(-questionHistoryLimit);
  try {
    localStorage.setItem(questionHistoryStorageKey, JSON.stringify(questionHistory));
  } catch (error) {
    reportStorageFailure("Die Aufgabenhistorie konnte nicht gespeichert werden. Nach einem Neuladen können sich Aufgaben früher wiederholen.");
  }
}

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

function topicProgressKey(subject, grade, index, topic) {
  const base = subject === "math" ? `${grade}-${index}` : `german-${grade}-${index}`;
  return topic.mode ? `${base}:${topic.mode}` : base;
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
    const key = topicProgressKey(progress.subject, progress.grade, index, topic);
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

function makeFocusedMathQuestion(topic) {
  if (!topic.mode) return null;
  const grade = progress.grade;
  const limit = grade === 1 ? 20 : grade === 2 ? 100 : grade === 3 ? 1000 : 1000000;
  const a = randomInt(1, Math.floor(Math.min(limit / 3, 50)));
  const b = randomInt(1, Math.min(limit - 2 * a, 50));
  switch (topic.mode) {
    case "fraction-add":
    case "fraction-subtract":
    case "fraction-multiply":
    case "fraction-divide": {
      const denominator = randomInt(3, 12);
      const left = randomInt(1, denominator - 1);
      const right = randomInt(1, topic.mode === "fraction-subtract" ? left : denominator - 1);
      const other = topic.mode === "fraction-add" || topic.mode === "fraction-subtract" ? denominator : randomInt(2, 12);
      const operator = { "fraction-add": "+", "fraction-subtract": "−", "fraction-multiply": "×", "fraction-divide": "÷" }[topic.mode];
      const answer = operator === "+" ? (left + right) / denominator : operator === "−" ? (left - right) / denominator : operator === "×" ? left * right / (denominator * other) : left * other / (denominator * right);
      return { text: `Berechne ${left}/${denominator} ${operator} ${right}/${other}. Gib das genaue Ergebnis als Bruch oder endliche Dezimalzahl ein.`, answer, allowFraction: true, numericTolerance: 1e-9, hint: topic.explanation };
    }
    case "reduce": {
      const denominator = pickRandom([3, 5, 7, 11]);
      const numerator = randomInt(1, denominator - 1);
      const factor = randomInt(2, 9);
      return { text: `Kürze ${numerator * factor}/${denominator * factor} vollständig. Wie lautet der Zähler?`, answer: numerator, hint: "Teile Zähler und Nenner durch ihren größten gemeinsamen Teiler." };
    }
    case "decimal-multiply": {
      const left = randomInt(11, 99);
      const right = randomInt(11, 99);
      return { text: `Berechne ${(left / 10).toFixed(1).replace(".", ",")} × ${(right / 10).toFixed(1).replace(".", ",")}.`, answer: left * right / 100, numericTolerance: 1e-9, hint: topic.explanation };
    }
    case "decimal-divide": {
      const divisor = randomInt(2, 9);
      const result = randomInt(11, 99);
      return { text: `Berechne ${(result * divisor / 10).toFixed(1).replace(".", ",")} ÷ ${divisor}.`, answer: result / 10, numericTolerance: 1e-9, hint: topic.explanation };
    }
    case "volume": {
      const height = randomInt(2, 12);
      return { key: `volume:${[a, b, height].sort((left, right) => left - right).join(":")}`, text: `Ein Quader ist ${a} cm lang, ${b} cm breit und ${height} cm hoch. Wie groß ist sein Volumen in cm³?`, answer: a * b * height, hint: topic.explanation };
    }
    case "mean": {
      const c = randomInt(1, 30);
      return { key: `mean:${[a, b, c].sort((left, right) => left - right).join(":")}`, text: `Bestimme das arithmetische Mittel von ${a}, ${b} und ${c}. Gib bei Bedarf einen Bruch ein.`, answer: (a + b + c) / 3, allowFraction: true, numericTolerance: 1e-9, hint: topic.explanation };
    }
    case "term": {
      const c = randomInt(2, 12);
      return { text: `Berechne ${a} + ${b} × ${c}.`, answer: a + b * c, hint: topic.explanation };
    }
    case "double-half": {
      const n = randomInt(1, grade === 1 ? 10 : 50);
      const halve = Math.random() < 0.5;
      return { text: halve ? `Halbiere ${n * 2}.` : `Verdopple ${n}.`, answer: halve ? n : n * 2, hint: halve ? "Teile in zwei gleich große Teile." : "Addiere die Zahl zu sich selbst." };
    }
    case "complement": {
      const n = randomInt(0, 10);
      return { text: `Welche Zahl fehlt? ${n} + ___ = 10`, answer: 10 - n, hint: "Ergänze bis zehn." };
    }
    case "number-compare": {
      const pair = shuffled([a, a + b]);
      return { key: `number-compare:${a}:${a + b}`, text: `Welche Zahl ist größer: ${pair[0]} oder ${pair[1]}?`, answer: a + b, hint: "Die größere Zahl liegt auf dem Zahlenstrahl weiter rechts." };
    }
    case "missing":
      return { text: `Welche Zahl fehlt? ${a} + ___ = ${a + b}`, answer: b, hint: "Ziehe die bekannte Zahl vom Ergebnis ab." };
    case "division": {
      const divisor = randomInt(2, 9);
      const result = randomInt(2, grade < 4 ? 10 : 99);
      return { text: `Wie viel ist ${divisor * result} ÷ ${divisor}?`, answer: result, hint: `Welche Zahl ergibt mal ${divisor} den Wert ${divisor * result}?` };
    }
    case "coins": {
      const tens = randomInt(1, 4);
      const twenties = randomInt(1, 2);
      const fives = randomInt(1, 4);
      return { text: `Du hast ${tens} Münzen zu 10 Cent, ${twenties} Münzen zu 20 Cent und ${fives} Münzen zu 5 Cent. Wie viele Cent sind das zusammen?`, answer: tens * 10 + twenties * 20 + fives * 5, hint: "Berechne erst den Wert jeder Münzsorte. Addiere dann die drei Beträge." };
    }
    case "time": {
      const start = randomInt(6, 16);
      const duration = randomInt(1, 5);
      return { text: `Ein Ausflug beginnt um ${start}:00 Uhr und endet um ${start + duration}:00 Uhr. Wie viele Stunden dauert er?`, answer: duration, hint: "Zähle die vollen Stunden zwischen Beginn und Ende." };
    }
    case "fraction-compare": {
      const denominator = randomInt(3, 12);
      const numerator = randomInt(1, denominator - 1);
      const pair = shuffled([numerator, numerator + 1]);
      return { key: `fraction-compare:${numerator}:${denominator}`, text: `Welcher Zähler gehört zum größeren Bruch: ${pair[0]}/${denominator} oder ${pair[1]}/${denominator}? Gib nur den Zähler ein.`, answer: numerator + 1, hint: "Bei gleichem Nenner ist der Bruch mit dem größeren Zähler größer." };
    }
    case "data": {
      const difference = Math.random() < 0.5;
      return { text: `Bei einer Umfrage wählen ${a} Kinder Äpfel und ${a + b} Kinder Birnen. ${difference ? "Wie viele Kinder mehr wählen Birnen als Äpfel?" : "Wie viele Kinder haben insgesamt abgestimmt?"}`, answer: difference ? b : 2 * a + b, hint: difference ? "Berechne den Unterschied der beiden Anzahlen." : "Addiere die beiden Anzahlen." };
    }
    default: return null;
  }
}

function makeQuestion(topic) {
  const focused = makeFocusedMathQuestion(topic);
  if (focused) return focused;
  let a;
  let b;

  switch (topic.skill) {
    case "add": {
      const limit = topic.maxNumber || [0, 20, 100, 1000, 1000000, 1000000, 1000000][progress.grade];
      const subtract = topic.operation === "subtract" || (!topic.operation && Math.random() < 0.5);
      a = randomInt(1, limit - 1);
      b = randomInt(1, subtract ? a : limit - a);
      const answer = subtract ? a - b : a + b;
      const operator = subtract ? "−" : "+";
      return { text: `Wie viel ist ${a} ${operator} ${b}?`, answer, hint: "Rechne stellenweise und prüfe durch Überschlagen.", solution: `${a} ${operator} ${b} = ${answer}` };
    }
    case "compare": {
      const limit = progress.grade === 1 ? 20 : 100;
      const step = randomInt(1, progress.grade === 1 ? 5 : 10);
      const descending = Math.random() < 0.5;
      const start = descending ? randomInt(step * 3, limit) : randomInt(0, limit - step * 3);
      const delta = descending ? -step : step;
      const answer = start + 3 * delta;
      return { text: `Welche Zahl kommt als Nächstes? ${start}, ${start + delta}, ${start + 2 * delta}, …`, answer, hint: "Prüfe, ob die Zahlen größer oder kleiner werden. Finde dann die Schrittweite.", solution: `Es ${descending ? "gehen" : "kommen"} jeweils ${step} ${descending ? "weg" : "dazu"}. Die nächste Zahl ist ${answer}.` };
    }
    case "shapes": {
      const shapes = [{ name: "Dreieck", sides: 3 }, { name: "Viereck", sides: 4 }, { name: "Quadrat", sides: 4 }, { name: "Rechteck", sides: 4 }, { name: "Fünfeck", sides: 5 }, { name: "Sechseck", sides: 6 }];
      const left = pickRandom(shapes);
      const right = pickRandom(shapes);
      const feature = Math.random() < 0.5 ? "Ecken" : "Seiten";
      if (Math.random() < 0.5) {
        const pair = [left, right].sort((x, y) => x.name.localeCompare(y.name, "de"));
        return { key: `shapes:pair:${feature}:${pair.map((shape) => shape.name).join(":")}`, text: `Zwei Formen liegen getrennt nebeneinander: ein ${left.name} und ein ${right.name}. Wie viele ${feature} haben beide zusammen?`, answer: left.sides + right.sides, hint: "Zähle die Ecken oder Seiten jeder Form einzeln und addiere die beiden Anzahlen." };
      }
      return { text: `Wie viele ${feature} hat ein ${left.name}?`, answer: left.sides, hint: "Bei Vielecken ist die Anzahl der Ecken genauso groß wie die Anzahl der Seiten.", solution: `Ein ${left.name} hat ${left.sides} ${feature}.` };
    }
    case "multiply":
      a = randomInt(topic.written ? 12 : 2, topic.written ? 999 : 10);
      b = randomInt(2, topic.written ? 99 : 10);
      return { text: `Wie viel ist ${a} × ${b}?`, answer: a * b, hint: `Du kannst ${a} Gruppen mit je ${b} zählen.`, solution: `${a} × ${b} = ${a * b}` };
    case "money":
      a = randomInt(2, 8);
      b = randomInt(2, 9);
      return { text: `Ein Heft kostet ${a} €. Wie viel kosten ${b} Hefte? (in €)`, answer: a * b, hint: `Addiere den Preis ${b} Mal oder multipliziere.`, solution: `${a} × ${b} € = ${a * b} €` };
    case "fractions": {
      const denominator = progress.grade <= 4 ? pickRandom([2, 4]) : pickRandom([2, 3, 4, 5]);
      const multiplier = randomInt(2, 10);
      const numerator = randomInt(1, denominator - 1);
      const whole = denominator * multiplier;
      const answer = numerator * multiplier;
      return { text: `${progress.grade <= 4 ? "Eine Strecke ist " + whole + " cm lang. " : ""}Wie viel ist ${numerator}/${denominator} von ${whole}?${progress.grade <= 4 ? " Gib die Länge in cm an." : ""}`, answer, hint: `Teile ${whole} zuerst durch ${denominator}.`, solution: `${whole} : ${denominator} × ${numerator} = ${answer}` };
    }
    case "decimal": {
      const x = randomInt(10, 99);
      const y = randomInt(10, 99);
      const subtract = topic.operation === "subtract";
      const left = (subtract ? Math.max(x, y) : x) / 10;
      const right = (subtract ? Math.min(x, y) : y) / 10;
      const answer = Math.round((subtract ? left - right : left + right) * 10) / 10;
      const operator = subtract ? "−" : "+";
      return { text: `${topic.moneyContext ? "Rechne mit Geldbeträgen (in €). " : ""}Wie viel ist ${left.toFixed(1).replace(".", ",")} ${operator} ${right.toFixed(1).replace(".", ",")}?`, answer, hint: "Stelle die Kommas untereinander.", solution: `${left.toFixed(1).replace(".", ",")} ${operator} ${right.toFixed(1).replace(".", ",")} = ${answer.toFixed(1).replace(".", ",")}` };
    }
    case "geometry":
      a = randomInt(2, 12);
      b = randomInt(2, 12);
      if (topic.measure === "perimeter" || (topic.measure !== "area" && Math.random() < 0.5)) {
        return { text: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist sein Umfang in cm?`, answer: 2 * (a + b), hint: "Der Umfang ist die Summe aller vier Seiten.", solution: `2 × (${a} + ${b}) = ${2 * (a + b)} cm` };
      }
      return { text: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist seine Fläche in cm²?`, answer: a * b, hint: "Fläche = Länge × Breite.", solution: `${a} × ${b} = ${a * b} cm²` };
    case "units": {
      const meters = randomInt(1, progress.grade <= 2 ? 20 : 100);
      if (Math.random() < 0.5) {
        return { text: `Wie viele Meter sind ${meters * 100} Zentimeter?`, answer: meters, hint: "100 Zentimeter sind ein Meter. Teile die Zentimeterzahl durch 100.", solution: `${meters * 100} : 100 = ${meters} m` };
      }
      return { text: `Wie viele Zentimeter sind ${meters} Meter?`, answer: meters * 100, hint: "Ein Meter besteht aus 100 Zentimetern.", solution: `${meters} × 100 = ${meters * 100} cm` };
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

// Eigene Wortlisten je Klassenstufe: keine schwer ableitbaren Fremdwörter.
// Pro Stufe mindestens acht Wörter für eine vollständige, abwechslungsreiche Lektion.
const germanSpellingPairsByGrade = {
  1: [
    ["Kaze", "Katze"], ["Schuhle", "Schule"], ["Hunt", "Hund"], ["Buhm", "Baum"],
    ["Bluhme", "Blume"], ["Sone", "Sonne"], ["Bal", "Ball"], ["Mausz", "Maus"]
  ],
  2: [
    ["Fusball", "Fußball"], ["Schwimmbat", "Schwimmbad"], ["Fahrrat", "Fahrrad"],
    ["Feriehn", "Ferien"], ["Muter", "Mutter"], ["Waser", "Wasser"],
    ["Kinnt", "Kind"], ["Broot", "Brot"]
  ],
  3: [
    ["Bletter", "Blätter"], ["Hende", "Hände"], ["Källte", "Kälte"], ["Welder", "Wälder"],
    ["Biehne", "Biene"], ["Wisse", "Wiese"], ["Brif", "Brief"], ["Schtuhl", "Stuhl"]
  ],
  4: [
    ["Heuser", "Häuser"], ["Beume", "Bäume"], ["Treume", "Träume"], ["Meuse", "Mäuse"],
    ["leuft", "läuft"], ["Ferienn", "Ferien"], ["klain", "klein"], ["Zait", "Zeit"],
    ["Schlüsel", "Schlüssel"], ["Frühstük", "Frühstück"]
  ],
  5: [
    ["warscheinlich", "wahrscheinlich"], ["nähmlich", "nämlich"], ["Abendteuer", "Abenteuer"],
    ["interesant", "interessant"], ["plözlich", "plötzlich"], ["gefärlich", "gefährlich"],
    ["Herschaft", "Herrschaft"], ["Verwantschaft", "Verwandtschaft"]
  ]
};

germanSpellingPairsByGrade[6] = [
  ["entäuschen", "enttäuschen"], ["wiedersprechen", "widersprechen"], ["Verwandschaft", "Verwandtschaft"],
  ["unentlich", "unendlich"], ["Erlebniss", "Erlebnis"], ["Geheimniss", "Geheimnis"],
  ["Hoffnug", "Hoffnung"], ["Beschreibungg", "Beschreibung"], ["zuverläsig", "zuverlässig"], ["selbststendig", ["selbstständig", "selbständig"]]
];

const germanSpellingHintsByGrade = {
  1: "Sprich das Wort langsam. Achte auf jeden Laut und auf doppelte Buchstaben.",
  2: "Achte auf doppelte Buchstaben. Verlängere Wörter: Aus Hund wird Hunde.",
  3: "Achte auf ä und ie. Suche ein verwandtes Wort: Hand hilft dir bei Hände.",
  4: "Suche ein verwandtes Wort: Haus hilft dir bei Häuser. Achte auch auf ei, ie und doppelte Buchstaben.",
  6: "Prüfe den Wortstamm und die Wortbausteine. Verlängere Wörter und leite sie von verwandten Wörtern ab.",
  5: "Suche verwandte Wörter und prüfe den Wortstamm. Achte auf Dehnungszeichen und doppelte Buchstaben."
};

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
  { text: "Der alte Leuchtturm stand an der Küste und leuchtete jede Nacht. Schiffe fanden so sicher den Weg. Doch eines Tages wurde das Licht schwächer und die Leute mussten eine Lösung finden.", question: "Was ist das Hauptproblem im Text?", options: ["Der Leuchtturm wurde modernisiert", "Das Licht wird schwächer", "Es gibt keine Schiffe", "Die Küste wird verkauft"], answer: "Das Licht wird schwächer" },
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
  { word: "überlegen", answer: "nachdenken", options: ["nachdenken", "vergessen", "rennen"] },
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

germanPunctuationQuestions.push(
  { text: "Wenn es regnet nehmen wir den Bus", answer: "Wenn es regnet, nehmen wir den Bus.", hint: "Trenne den vorangestellten Nebensatz mit einem Komma ab." },
  { text: "Bevor Mia geht packt sie ihre Tasche", answer: "Bevor Mia geht, packt sie ihre Tasche.", hint: "Nach dem Nebensatz mit „bevor“ steht ein Komma." }
);

const germanRegularVerbs = ["spielen", "lernen", "malen", "fragen", "lachen", "sagen", "kaufen", "kochen", "zeigen", "sammeln", "wandern", "turnen"];
const germanPersons = [
  { pronoun: "ich", present: "e", past: "te" },
  { pronoun: "du", present: "st", past: "test" },
  { pronoun: "er", present: "t", past: "te" },
  { pronoun: "wir", present: "en", past: "ten" },
  { pronoun: "ihr", present: "t", past: "tet" },
  { pronoun: "sie", present: "en", past: "ten" }
];

const germanSyllables = [
  ["Mama", 2], ["Oma", 2], ["Banane", 3], ["Tomate", 3],
  ["Elefant", 3], ["Hut", 1], ["Ball", 1], ["Schokolade", 4],
  ["Nase", 2], ["Telefon", 3], ["Rose", 2], ["Hase", 2]
];
const germanVerbSentences = [
  ["Mia malt ein Bild.", "malt"], ["Ben spielt im Garten.", "spielt"],
  ["Der Hund bellt.", "bellt"], ["Die Katze schläft.", "schläft"],
  ["Lina liest ein Buch.", "liest"], ["Oma kocht eine Suppe.", "kocht"],
  ["Der Vogel singt.", "singt"], ["Das Kind lacht.", "lacht"],
  ["Papa schwimmt im See.", "schwimmt"], ["Wir tanzen im Kreis.", "tanzen"]
];
const germanWordFamilies = [
  ["spielen", "Spieler", "Spiegel"], ["fahren", "Fahrer", "Farbe"],
  ["backen", "Bäcker", "Bagger"], ["laufen", "Läufer", "Lampe"],
  ["wohnen", "Wohnung", "Wolke"], ["lesen", "Leser", "Leiter"],
  ["malen", "Maler", "Mantel"], ["freundlich", "Freund", "Freitag"],
  ["singen", "Sänger", "Sonne"], ["bauen", "Bauwerk", "Bauch"]
];
const germanCompoundPairs = [
  ["Haus", "Tür"], ["Garten", "Tor"], ["Regen", "Jacke"], ["Hand", "Schuh"],
  ["Zahn", "Bürste"], ["Fuß", "Ball"], ["Schule", "Tasche"], ["Hund", "Hütte"],
  ["Regen", "Bogen"], ["Haus", "Dach"], ["Garten", "Zaun"], ["Hand", "Tuch"]
];
const germanMainIdeaTexts = [
  ["Auf dem Schulhof liegt Müll. Die Klasse sammelt Papier und Verpackungen auf. Danach ist der Hof sauber.", "Die Klasse säubert den Schulhof.", "Die Klasse baut einen Spielplatz."],
  ["Lena sät Bohnen. Jeden Tag gießt sie die Erde. Bald wachsen kleine Pflanzen.", "Lena zieht Pflanzen groß.", "Lena kauft Gemüse ein."],
  ["Im Winter finden Vögel wenig Futter. Ben füllt das Futterhaus. Nun kommen Meisen und Spatzen.", "Ben hilft Vögeln im Winter.", "Ben baut einen Schneemann."],
  ["Die Kinder wollen die Straße überqueren. Sie warten auf Grün. Dann gehen sie gemeinsam hinüber.", "Die Kinder überqueren die Straße sicher.", "Die Kinder verpassen ihren Bus."],
  ["Mia kann noch nicht gut schwimmen. Sie übt jede Woche im Kurs. Bald schafft sie eine ganze Bahn.", "Mia lernt durch regelmäßiges Üben schwimmen.", "Mia gewinnt einen Lauf."],
  ["Die Bücherei veranstaltet einen Lesetag. Kinder stellen ihre Lieblingsbücher vor. Viele leihen danach ein Buch aus.", "Ein Lesetag macht Kindern Lust auf Bücher.", "Die Bücherei bleibt geschlossen."],
  ["Es regnet seit Stunden. Der Weg steht unter Wasser. Die Wandergruppe nimmt deshalb einen anderen Weg.", "Die Wandergruppe ändert wegen des Regens ihren Weg.", "Die Wandergruppe sucht einen Badeplatz."],
  ["Ein Fahrradreifen ist platt. Opa findet das Loch und flickt es. Nun kann Ali wieder fahren.", "Opa repariert Alis Fahrradreifen.", "Ali bekommt ein neues Fahrrad."],
  ["In der Klasse ist es oft laut. Die Kinder vereinbaren Gesprächsregeln. Jetzt lassen sie einander ausreden.", "Gesprächsregeln helfen der Klasse beim Zuhören.", "Die Kinder üben ein Lied."]
];

const germanGradeSixCards = {
  "wordclass-six": [
    ["Bestimme die Wortart von „die“: Die Katze schläft.", "Artikel"],
    ["Bestimme die Wortart von „sie“: Heute liest sie.", "Pronomen"],
    ["Bestimme die Wortart von „weil“: Ich bleibe, weil es regnet.", "Konjunktion"],
    ["Bestimme die Wortart von „heute“: Heute spielen wir.", "Adverb"],
    ["Bestimme die Wortart von „liest“: Mia liest ein Buch.", "Verb"],
    ["Bestimme die Wortart von „Buch“: Mia liest ein Buch.", "Nomen"],
    ["Bestimme die Wortart von „spannende“: Das spannende Buch gefällt mir.", "Adjektiv"],
    ["Bestimme die Wortart von „und“: Mia liest und Ben malt.", "Konjunktion"],
    ["Bestimme die Wortart von „wir“: Wir gehen nach Hause.", "Pronomen"],
    ["Bestimme die Wortart von „dort“: Dort steht mein Fahrrad.", "Adverb"]
  ],
  "sentence-member": [
    ["Welches Satzglied ist „Mia“? Mia liest ein Buch.", "Subjekt"],
    ["Welches Satzglied ist „liest“? Mia liest ein Buch.", "Prädikat"],
    ["Welches Satzglied ist „ein Buch“? Mia liest ein Buch.", "Akkusativobjekt"],
    ["Welches Satzglied ist „dem Kind“? Oma hilft dem Kind.", "Dativobjekt"],
    ["Welches Satzglied ist „am Abend“? Wir spielen am Abend.", "Adverbiale Bestimmung der Zeit"],
    ["Welches Satzglied ist „im Garten“? Wir spielen im Garten.", "Adverbiale Bestimmung des Ortes"],
    ["Welches Satzglied ist „Der Hund“? Der Hund bellt laut.", "Subjekt"],
    ["Welches Satzglied ist „einen Ball“? Ben wirft einen Ball.", "Akkusativobjekt"],
    ["Welches Satzglied ist „seiner Freundin“? Ben gibt seiner Freundin ein Heft.", "Dativobjekt"],
    ["Welches Satzglied ist „schläft“? Die Katze schläft auf dem Sofa.", "Prädikat"]
  ],
  "reading-six": [
    ["Lies: Der Fuchs lobt den Gesang des Raben. Als der Rabe singt, fällt sein Käse herunter. Der Fuchs frisst ihn. Welche Lehre passt?", "Vorsicht vor eigennützigem Lob.", "Wer singt, bekommt immer eine Belohnung."],
    ["Lies: Bienen bestäuben Blüten. So können sich bei vielen Pflanzen Früchte entwickeln. Welche Aussage trifft zu?", "Bienen tragen zur Entstehung vieler Früchte bei.", "Bienen stellen Früchte selbst her."],
    ["Lies: Die Sonne lachte über dem Dorf. Welches sprachliche Mittel liegt vor?", "Personifikation", "Sachliche Mengenangabe"],
    ["Lies: Sein Rucksack war schwer wie ein Stein. Welches sprachliche Mittel liegt vor?", "Vergleich", "Wörtliche Rede"],
    ["Lies: Ich finde, unsere Pause sollte länger dauern. Was wird ausgedrückt?", "Eine Meinung", "Ein nachgewiesener Messwert"],
    ["Lies: Am Samstag bleibt die Bücherei wegen Bauarbeiten geschlossen. Was ist die Absicht?", "Über eine Schließung informieren", "Für ein neues Buch werben"],
    ["Lies: Bringe morgen bitte dein Sportzeug mit! Was ist die Absicht?", "Zu einer Handlung auffordern", "Ein vergangenes Erlebnis erzählen"],
    ["Lies: Zuerst spannte Ali die Schnur. Danach befestigte er den Drachen. Schließlich lief er los. Welche Wörter ordnen den Ablauf?", "Zuerst, danach, schließlich", "Ali, Schnur, Drachen"],
    ["Lies: Es war einmal eine Königin. Ein sprechender Vogel erfüllte ihr drei Wünsche. Welche Textsorte liegt nahe?", "Märchen", "Nachrichtenbericht"]
  ],
  "media-six": [
    ["Eine Meldung nennt weder Autor noch Datum oder Quelle. Was ist sinnvoll?", "Die Aussage mit verlässlichen Quellen vergleichen.", "Die Meldung sofort als Tatsache verbreiten."],
    ["Ein Beitrag verspricht ein Geschenk und verlangt deine Privatadresse. Was ist sinnvoll?", "Keine Daten eingeben und eine vertraute erwachsene Person fragen.", "Die Adresse sofort öffentlich posten."],
    ["Ein Artikel ist mit „Anzeige“ gekennzeichnet. Was bedeutet das?", "Es handelt sich um Werbung.", "Alle Aussagen wurden wissenschaftlich bewiesen."],
    ["Du übernimmst eine Information aus einem Sachtext für ein Referat. Was gehört dazu?", "Die Quelle angeben.", "Die Information als eigene Forschung ausgeben."],
    ["Ein Foto einer Mitschülerin soll veröffentlicht werden. Was musst du beachten?", "Vorher die nötige Einwilligung klären.", "Fotos darf man immer ohne Nachfrage veröffentlichen."],
    ["Zwei Webseiten nennen unterschiedliche Zahlen zu einem Ereignis. Was hilft beim Prüfen?", "Datum, Herkunft und Belege beider Angaben prüfen.", "Immer die größere Zahl auswählen."],
    ["Eine Suchmaschine zeigt einen Treffer ganz oben. Was folgt daraus?", "Der Inhalt muss trotzdem geprüft werden.", "Der Inhalt ist deshalb garantiert richtig."],
    ["Eine alte Nachricht wird ohne Datum erneut geteilt. Was solltest du prüfen?", "Ob die Meldung noch aktuell ist.", "Ob die Überschrift möglichst aufregend klingt."],
    ["Du willst einen Text in eigenen Worten zusammenfassen. Was ist wichtig?", "Den Sinn erhalten und die Quelle nennen.", "Nur einzelne Wörter austauschen und die Quelle weglassen."]
  ]
};

// Erweiterte, redaktionell geprüfte Übungspools: mindestens drei Durchläufe pro Inhaltspool.

germanSpellingPairsByGrade[1].push(...[
  ["Naseh", "Nase"],
  ["Hahse", "Hase"],
  ["Fihsch", "Fisch"],
  ["Tish", "Tisch"],
  ["Buchh", "Buch"],
  ["Milh", "Milch"],
  ["Gabell", "Gabel"],
  ["Tascheh", "Tasche"],
  ["Müze", "Mütze"],
  ["Wollke", "Wolke"],
  ["Löhwe", "Löwe"],
  ["Apfell", "Apfel"],
  ["Ehsel", "Esel"],
  ["Innsel", "Insel"],
  ["Entte", "Ente"],
  ["Hohse", "Hose"]
]);
germanSpellingPairsByGrade[2].push(...[
  ["Rater", "Räder"],
  ["Beten", "Betten"],
  ["Teler", "Teller"],
  ["Löfel", "Löffel"],
  ["Somer", "Sommer"],
  ["Winta", "Winter"],
  ["Kisen", "Kissen"],
  ["Trepe", "Treppe"],
  ["Bierne", "Birne"],
  ["Gahrten", "Garten"],
  ["Nuddel", "Nudel"],
  ["Häft", "Heft"],
  ["Rükken", "Rücken"],
  ["Brile", "Brille"],
  ["Schnekke", "Schnecke"],
  ["Tromell", "Trommel"]
]);
germanSpellingPairsByGrade[3].push(...[
  ["Tire", "Tiere"],
  ["Kniee", "Knie"],
  ["viell", "viel"],
  ["Spigel", "Spiegel"],
  ["Liedder", "Lieder"],
  ["Graser", "Gräser"],
  ["Aste", "Äste"],
  ["Zahne", "Zähne"],
  ["Körbbe", "Körbe"],
  ["Mäner", "Männer"],
  ["Stengel", "Stängel"],
  ["Schpielen", "spielen"],
  ["Schtein", "Stein"],
  ["Schturm", "Sturm"],
  ["Schtraße", "Straße"],
  ["Walt", "Wald"]
]);
germanSpellingPairsByGrade[4].push(...[
  ["Reuber", "Räuber"],
  ["Schäune", "Scheune"],
  ["Feur", "Feuer"],
  ["Fräunde", "Freunde"],
  ["Täuer", "teuer"],
  ["neuhn", "neun"],
  ["Bläustift", "Bleistift"],
  ["Aimer", "Eimer"],
  ["Kreutz", "Kreuz"],
  ["Träppe", "Treppe"],
  ["schneler", "schneller"],
  ["Himel", "Himmel"],
  ["Doner", "Donner"],
  ["Schif", "Schiff"],
  ["Höle", "Höhle"],
  ["Stiell", "Stiel"]
]);
germanSpellingPairsByGrade[5].push(...[
  ["grüntlich", "gründlich"],
  ["aufmerksamm", "aufmerksam"],
  ["Kentnis", "Kenntnis"],
  ["äuserlich", "äußerlich"],
  ["Fehrnsehen", "Fernsehen"],
  ["verdächtik", "verdächtig"],
  ["Dunkelhait", "Dunkelheit"],
  ["Wanderunk", "Wanderung"],
  ["überasschen", "überraschen"],
  ["Wirklichkait", "Wirklichkeit"],
  ["merkwürdich", "merkwürdig"],
  ["geheimnissvoll", "geheimnisvoll"],
  ["Hinderniss", "Hindernis"],
  ["vergesen", "vergessen"],
  ["aufpasen", "aufpassen"],
  ["Gedult", "Geduld"]
]);
germanSpellingPairsByGrade[6].push(...[
  ["Ereigniss", "Ereignis"],
  ["Verhältniss", "Verhältnis"],
  ["Gedächtniss", "Gedächtnis"],
  ["Kenntnise", "Kenntnisse"],
  ["Erläuterunk", "Erläuterung"],
  ["Begrüntung", "Begründung"],
  ["Vorausetzung", "Voraussetzung"],
  ["unabhängik", "unabhängig"],
  ["verständnissvoll", "verständnisvoll"],
  ["Zusamenhang", "Zusammenhang"],
  ["Wiederspruch", "Widerspruch"],
  ["verantwordlich", "verantwortlich"],
  ["empfelenswert", "empfehlenswert"],
  ["verschiden", "verschieden"],
  ["unterschidlich", "unterschiedlich"],
  ["entwikeln", "entwickeln"]
]);
germanWords.push(...[
  {"word": "Ball", "type": "Nomen"},
  {"word": "Haus", "type": "Nomen"},
  {"word": "Katze", "type": "Nomen"},
  {"word": "Baum", "type": "Nomen"},
  {"word": "Garten", "type": "Nomen"},
  {"word": "essen", "type": "Verb"},
  {"word": "malen", "type": "Verb"},
  {"word": "tanzen", "type": "Verb"},
  {"word": "lachen", "type": "Verb"},
  {"word": "trinken", "type": "Verb"},
  {"word": "klein", "type": "Adjektiv"},
  {"word": "bunt", "type": "Adjektiv"},
  {"word": "warm", "type": "Adjektiv"},
  {"word": "rund", "type": "Adjektiv"},
  {"word": "kalt", "type": "Adjektiv"},
  {"word": "Stuhl", "type": "Nomen"},
  {"word": "kochen", "type": "Verb"},
  {"word": "weich", "type": "Adjektiv"},
  {"word": "Tasche", "type": "Nomen"},
  {"word": "schwimmen", "type": "Verb"},
  {"word": "sauber", "type": "Adjektiv"},
  {"word": "Vogel", "type": "Nomen"},
  {"word": "schlafen", "type": "Verb"},
  {"word": "hell", "type": "Adjektiv"}
]);
germanVocabulary.push(...[
  {"word": "kalt", "answer": "kühl", "options": ["kühl", "heiß", "laut"]},
  {"word": "klein", "answer": "winzig", "options": ["winzig", "riesig", "schwer"]},
  {"word": "schön", "answer": "hübsch", "options": ["hübsch", "schmutzig", "müde"]},
  {"word": "stark", "answer": "kräftig", "options": ["kräftig", "schwach", "kühl"]},
  {"word": "finster", "answer": "dunkel", "options": ["dunkel", "hell", "weich"]},
  {"word": "erzählen", "answer": "berichten", "options": ["berichten", "schweigen", "laufen"]},
  {"word": "schauen", "answer": "blicken", "options": ["blicken", "schlafen", "essen"]},
  {"word": "rufen", "answer": "laut sprechen", "options": ["laut sprechen", "leise schlafen", "schnell laufen"]},
  {"word": "zornig", "answer": "wütend", "options": ["wütend", "zufrieden", "entspannt"]},
  {"word": "spazieren", "answer": "bummeln", "options": ["bummeln", "rennen", "schwimmen"]},
  {"word": "beenden", "answer": "abschließen", "options": ["abschließen", "beginnen", "verlieren"]},
  {"word": "leuchten", "answer": "strahlen", "options": ["strahlen", "regnen", "schweigen"]},
  {"word": "satt", "answer": "nicht mehr hungrig", "options": ["nicht mehr hungrig", "sehr durstig", "sehr müde"]},
  {"word": "erschöpft", "answer": "sehr müde", "options": ["sehr müde", "sehr fröhlich", "sehr laut"]},
  {"word": "behutsam", "answer": "vorsichtig", "options": ["vorsichtig", "hastig", "grob"]},
  {"word": "antworten", "answer": "erwidern", "options": ["erwidern", "fragen", "suchen"]},
  {"word": "bauen", "answer": "errichten", "options": ["errichten", "zerstören", "verstecken"]},
  {"word": "reden", "answer": "sprechen", "options": ["sprechen", "hören", "schreiben"]},
  {"word": "springen", "answer": "hüpfen", "options": ["hüpfen", "sitzen", "schlafen"]},
  {"word": "sauber", "answer": "rein", "options": ["rein", "schmutzig", "müde"]},
  {"word": "freundlich", "answer": "nett", "options": ["nett", "unhöflich", "kalt"]},
  {"word": "nass", "answer": "feucht", "options": ["feucht", "trocken", "heiß"]},
  {"word": "hilfsbereit", "answer": "unterstützend", "options": ["unterstützend", "abweisend", "schläfrig"]},
  {"word": "suchen", "answer": "nach etwas Ausschau halten", "options": ["nach etwas Ausschau halten", "etwas absichtlich verstecken", "etwas vergessen"]}
]);
germanSyllables.push(...[
  ["Auto", 2],
  ["Ampel", 2],
  ["Apfel", 2],
  ["Fenster", 2],
  ["Giraffe", 3],
  ["Krokodil", 3],
  ["Melone", 3],
  ["Tasse", 2],
  ["Brot", 1],
  ["Fisch", 1],
  ["Hund", 1],
  ["Maus", 1],
  ["Kuchen", 2],
  ["Salat", 2],
  ["Pirat", 2],
  ["Kamera", 3],
  ["Papagei", 3],
  ["Lokomotive", 5],
  ["Musik", 2],
  ["Rucksack", 2],
  ["Eis", 1],
  ["Boot", 1],
  ["Dose", 2],
  ["Limo", 2]
]);
germanVerbSentences.push(...[
  ["Der Frosch hüpft ins Wasser.", "hüpft"],
  ["Mira schneidet Papier.", "schneidet"],
  ["Die Kinder rennen zur Schule.", "rennen"],
  ["Paul trinkt ein Glas Wasser.", "trinkt"],
  ["Das Baby weint.", "weint"],
  ["Der Wind rauscht.", "rauscht"],
  ["Die Biene summt.", "summt"],
  ["Opa repariert sein Fahrrad.", "repariert"],
  ["Die Ärztin untersucht den Arm.", "untersucht"],
  ["Der Bäcker knetet den Teig.", "knetet"],
  ["Das Pferd frisst Gras.", "frisst"],
  ["Die Ente taucht.", "taucht"],
  ["Wir suchen den Schlüssel.", "suchen"],
  ["Nora schreibt einen Brief.", "schreibt"],
  ["Der Igel versteckt sich.", "versteckt"],
  ["Mein Bruder zeichnet ein Schiff.", "zeichnet"],
  ["Die Sonne scheint.", "scheint"],
  ["Das Eis schmilzt.", "schmilzt"],
  ["Im Garten blüht eine Rose.", "blüht"],
  ["Auf dem See schwimmt ein Boot.", "schwimmt"],
  ["Das Mädchen öffnet die Tür.", "öffnet"],
  ["Die Schnecke kriecht über den Weg.", "kriecht"],
  ["Im Ofen backt das Brot.", "backt"],
  ["Der Zug fährt in den Bahnhof.", "fährt"]
]);
germanWordFamilies.push(...[
  ["lernen", "Lernheft", "Laterne"],
  ["kaufen", "Verkäufer", "Koffer"],
  ["lachen", "Gelächter", "Lampe"],
  ["tanzen", "Tänzer", "Tante"],
  ["trinken", "Getränk", "Treppe"],
  ["suchen", "Suchbild", "Suppe"],
  ["schreiben", "Schrift", "Schrank"],
  ["reisen", "Reisende", "Reifen"],
  ["sprechen", "Sprache", "Sprosse"],
  ["fragen", "Frage", "Frosch"],
  ["arbeiten", "Arbeiter", "Abend"],
  ["zeichnen", "Zeichnung", "Ziege"],
  ["kochen", "Koch", "Kohle"],
  ["hören", "Gehör", "Höhle"],
  ["klingen", "Klang", "Kleider"],
  ["zählen", "Zahl", "Zaun"],
  ["schwimmen", "Schwimmer", "Schrank"],
  ["fliegen", "Flug", "Flasche"],
  ["schlafen", "Schlaf", "Schlauch"],
  ["rufen", "Ruf", "Ruder"],
  ["helfen", "Hilfe", "Hemd"],
  ["denken", "Gedanke", "Deckel"],
  ["warm", "Wärme", "Wand"],
  ["kalt", "Kälte", "Kamm"]
]);
germanCompoundPairs.push(...[
  ["Buch", "Seite"],
  ["Tisch", "Bein"],
  ["Tür", "Griff"],
  ["Haus", "Wand"],
  ["Schnee", "Mann"],
  ["Regen", "Wolke"],
  ["Milch", "Glas"],
  ["Wasser", "Flasche"],
  ["Wind", "Mühle"],
  ["Brot", "Dose"],
  ["Stadt", "Park"],
  ["Obst", "Korb"],
  ["Garten", "Haus"],
  ["Spiel", "Platz"],
  ["Winter", "Jacke"],
  ["Sommer", "Kleid"],
  ["Schule", "Hof"],
  ["Hund", "Leine"],
  ["Zahn", "Arzt"],
  ["Fuß", "Boden"],
  ["Hand", "Ball"],
  ["Buch", "Laden"],
  ["Fisch", "Teich"],
  ["Regen", "Schirm"]
]);
germanIntermediateTexts.push(...[
  {"text": "Am Montag ist das Schwimmbad geschlossen. Am Dienstag öffnet es wieder um neun Uhr.", "question": "Wann öffnet das Schwimmbad wieder?", "options": ["Am Dienstag um neun Uhr", "Am Montag um neun Uhr", "Am Sonntag um zehn Uhr"], "answer": "Am Dienstag um neun Uhr"},
  {"text": "Mila findet einen verletzten Igel. Sie holt eine erwachsene Person, statt das Tier allein anzufassen.", "question": "Wen holt Mila?", "options": ["Eine erwachsene Person", "Einen Bäcker", "Eine Reisegruppe"], "answer": "Eine erwachsene Person"},
  {"text": "Vor der Sportstunde stellt Tom seine Trinkflasche neben die Bank. Nach dem Spielen trinkt er daraus.", "question": "Wo steht die Trinkflasche?", "options": ["Neben der Bank", "Auf dem Dach", "Unter dem Bett"], "answer": "Neben der Bank"},
  {"text": "Ein heftiger Wind zerreißt den Drachen. Opa hilft Lia, das Papier mit Klebeband zu flicken.", "question": "Warum muss der Drachen geflickt werden?", "options": ["Der Wind hat ihn zerrissen.", "Er ist nass geworden.", "Er ist zu schwer."], "answer": "Der Wind hat ihn zerrissen."},
  {"text": "Die Klasse sammelt Kastanien für das Basteln. Jedes Kind legt seine Fundstücke in einen großen Korb.", "question": "Wofür sammelt die Klasse Kastanien?", "options": ["Zum Basteln", "Zum Schwimmen", "Zum Backen von Brot"], "answer": "Zum Basteln"},
  {"text": "Samira räumt zuerst die Stifte weg. Danach wischt sie den Tisch ab. Zum Schluss legt sie das Heft hin.", "question": "Was macht Samira zuletzt?", "options": ["Sie legt das Heft hin.", "Sie räumt die Stifte weg.", "Sie wischt den Boden."], "answer": "Sie legt das Heft hin."},
  {"text": "Der Bus fällt heute aus. Deshalb gehen Nils und sein Vater zu Fuß zum Bahnhof.", "question": "Warum gehen Nils und sein Vater zu Fuß?", "options": ["Der Bus fällt aus.", "Ihr Auto ist blau.", "Der Bahnhof ist geschlossen."], "answer": "Der Bus fällt aus."},
  {"text": "Eine Schnecke sitzt auf dem Gartenweg. Lea trägt sie vorsichtig an den Rand, damit niemand auf sie tritt.", "question": "Warum trägt Lea die Schnecke an den Rand?", "options": ["Damit niemand auf sie tritt", "Damit sie schneller läuft", "Damit sie fliegen lernt"], "answer": "Damit niemand auf sie tritt"},
  {"text": "Im Klassenraum ist die Luft stickig. Die Lehrerin öffnet für einige Minuten alle Fenster.", "question": "Was tut die Lehrerin?", "options": ["Sie öffnet die Fenster.", "Sie schaltet den Ofen ein.", "Sie schließt die Tür ab."], "answer": "Sie öffnet die Fenster."},
  {"text": "Farid leiht in der Bücherei ein Buch über den Weltraum aus. Er möchte mehr über Planeten erfahren.", "question": "Worüber möchte Farid mehr erfahren?", "options": ["Über Planeten", "Über Brot", "Über Fußballschuhe"], "answer": "Über Planeten"},
  {"text": "Das junge Eichhörnchen vergräbt eine Nuss unter einem Baum. Im Winter kann es dort Futter suchen.", "question": "Was vergräbt das Eichhörnchen?", "options": ["Eine Nuss", "Einen Stein", "Eine Feder"], "answer": "Eine Nuss"},
  {"text": "Beim Ausflug beginnt es zu regnen. Die Gruppe stellt sich unter das Dach einer Haltestelle.", "question": "Wo sucht die Gruppe Schutz?", "options": ["Unter dem Dach einer Haltestelle", "Mitten auf dem Feld", "Auf einem Baum"], "answer": "Unter dem Dach einer Haltestelle"},
  {"text": "Der Kuchen muss noch zehn Minuten im Ofen bleiben. Erst danach nimmt Papa ihn heraus.", "question": "Wann nimmt Papa den Kuchen heraus?", "options": ["Nach weiteren zehn Minuten", "Sofort", "Erst am nächsten Tag"], "answer": "Nach weiteren zehn Minuten"},
  {"text": "Elias hat sein Sportzeug vergessen. Seine Schwester bringt die Tasche vor der zweiten Stunde zur Schule.", "question": "Was hat Elias vergessen?", "options": ["Sein Sportzeug", "Seinen Haustürschlüssel", "Sein Fahrrad"], "answer": "Sein Sportzeug"},
  {"text": "Die Blätter der Zimmerpflanze hängen herunter. Die Erde ist trocken. Anja gießt die Pflanze.", "question": "Woran erkennt Anja, dass die Pflanze Wasser braucht?", "options": ["An der trockenen Erde und den hängenden Blättern", "An einer zerbrochenen Tasse", "Am roten Blumentopf"], "answer": "An der trockenen Erde und den hängenden Blättern"},
  {"text": "Luca möchte ein Vogelhaus bauen. Bevor er Holz zusägt, zeichnet er einen Plan mit den Maßen.", "question": "Was macht Luca vor dem Sägen?", "options": ["Er zeichnet einen Plan.", "Er streicht das fertige Haus.", "Er füllt Vogelfutter ein."], "answer": "Er zeichnet einen Plan."},
  {"text": "Im Museum dürfen die Kinder die alte Ritterrüstung ansehen. Anfassen ist zum Schutz des Stücks verboten.", "question": "Was dürfen die Kinder tun?", "options": ["Die Rüstung ansehen", "Die Rüstung anziehen", "Die Rüstung mitnehmen"], "answer": "Die Rüstung ansehen"},
  {"text": "Für das Picknick packt Jana Äpfel, Brot und Wasser ein. Den Müll nimmt die Familie später wieder mit.", "question": "Was macht die Familie mit dem Müll?", "options": ["Sie nimmt ihn wieder mit.", "Sie lässt ihn auf der Wiese.", "Sie wirft ihn in den Bach."], "answer": "Sie nimmt ihn wieder mit."},
  {"text": "Am Abend hört Tim ein Rascheln im Garten. Unter dem Laub entdeckt er einen Igel.", "question": "Was entdeckt Tim unter dem Laub?", "options": ["Einen Igel", "Einen Papagei", "Eine Katze"], "answer": "Einen Igel"},
  {"text": "Die Klasse fährt mit dem Zug nach Köln. Jedes Kind hat eine Fahrkarte im Rucksack.", "question": "Womit fährt die Klasse nach Köln?", "options": ["Mit dem Zug", "Mit einem Flugzeug", "Mit einem Schiff"], "answer": "Mit dem Zug"},
  {"text": "Ein Kind hat auf dem Spielplatz eine Mütze verloren. Ada bringt sie zum Fundbüro.", "question": "Wohin bringt Ada die Mütze?", "options": ["Zum Fundbüro", "In die Mülltonne", "Zu einer Bäckerei"], "answer": "Zum Fundbüro"},
  {"text": "Die neuen Schuhe drücken an der Ferse. Deshalb zieht Ole für die Wanderung seine alten Schuhe an.", "question": "Welche Schuhe trägt Ole bei der Wanderung?", "options": ["Seine alten Schuhe", "Die drückenden neuen Schuhe", "Gar keine Schuhe"], "answer": "Seine alten Schuhe"},
  {"text": "Die Schule sammelt Bücher für einen Tauschmarkt. Wer ein Buch abgibt, darf sich ein anderes aussuchen.", "question": "Was darf man nach dem Abgeben eines Buches tun?", "options": ["Ein anderes Buch aussuchen", "Alle Bücher behalten", "Die Schule verlassen"], "answer": "Ein anderes Buch aussuchen"},
  {"text": "Auf der Baustelle steht ein großes Schild. Es warnt davor, das abgesperrte Gelände zu betreten.", "question": "Wovor warnt das Schild?", "options": ["Vor dem Betreten des abgesperrten Geländes", "Vor dem Lesen eines Buches", "Vor dem Warten auf den Bus"], "answer": "Vor dem Betreten des abgesperrten Geländes"}
]);
germanMainIdeaTexts.push(...[
  ["Die Klasse möchte ein Fest feiern. Einige Kinder kümmern sich um Spiele, andere um Essen und Einladungen. Gemeinsam wird alles rechtzeitig fertig.", "Die Klasse bereitet ihr Fest gemeinsam vor.", "Die Klasse sagt ihr Fest wegen fehlender Hilfe ab."],
  ["Im Bach schwimmt Müll. Die Kinder informieren den örtlichen Umweltverein. Zusammen räumen sie das Ufer auf.", "Kinder und Verein helfen, den Bach sauberer zu machen.", "Die Kinder bauen eine Brücke über den Bach."],
  ["Emil verliert beim Spiel. Erst ärgert er sich. Dann gratuliert er der Siegerin und bittet um eine neue Runde.", "Emil lernt, fair mit einer Niederlage umzugehen.", "Emil möchte nie wieder mit anderen spielen."],
  ["Eine Baustelle sperrt den Schulweg. Die Schule zeichnet einen Ersatzweg auf. Am Morgen begleiten Erwachsene die Kinder.", "Die Schule organisiert einen sicheren Ersatzweg.", "Die Schule schließt wegen der Baustelle für immer."],
  ["Nora versteht eine Matheaufgabe nicht. Sie erklärt ihrem Freund, wo sie nicht weiterkommt. Gemeinsam finden sie den Fehler.", "Durch Nachfragen und Erklären löst Nora ihr Problem.", "Nora überspringt alle Matheaufgaben."],
  ["Die Stadt pflanzt neue Bäume. Im Sommer spenden sie Schatten. Viele Menschen ruhen sich dort bei Hitze aus.", "Die neuen Bäume bieten im Sommer Schatten.", "Die Bäume sorgen dafür, dass es nie mehr regnet."],
  ["Ben möchte Geld für ein Fahrrad sparen. Er notiert seine Einnahmen und Ausgaben. So erkennt er, wie viel er zurücklegen kann.", "Ben plant seine Ausgaben, um für ein Fahrrad zu sparen.", "Ben kauft jeden Tag ein neues Fahrrad."],
  ["Mira hat Angst vor dem Referat. Sie übt es zu Hause vor ihrer Familie. Am nächsten Tag spricht sie sicherer vor der Klasse.", "Vorbereitung hilft Mira beim Vortragen.", "Mira hält das Referat ohne Vorbereitung."],
  ["Ein Buch ist in der Bücherei beschädigt. Die Bibliothekarin klebt die losen Seiten fest. Danach kann es wieder ausgeliehen werden.", "Ein beschädigtes Buch wird repariert.", "Die Bücherei verschenkt alle Bücher."],
  ["Die Mannschaft verliert oft den Ball. Im Training übt sie kurze Pässe. Im nächsten Spiel gelingt das Zusammenspiel besser.", "Gezieltes Training verbessert das Zusammenspiel.", "Die Mannschaft trainiert jetzt nur noch Schwimmen."],
  ["Im Dorf gibt es keinen Laden mehr. Einige Menschen organisieren einen mobilen Verkaufsstand. Er kommt zweimal pro Woche auf den Platz.", "Ein mobiler Stand hilft bei der Versorgung im Dorf.", "Die Bewohner müssen ihr Dorf verlassen."],
  ["Lara entdeckt Schimmel auf einer Brotscheibe. Sie isst das Brot nicht und sagt zu Hause Bescheid. Die Familie prüft die übrigen Lebensmittel.", "Die Familie achtet auf verdorbene Lebensmittel.", "Die Familie benutzt das Brot für ein Kunstwerk."],
  ["Die Klasse beobachtet das Wetter. Jeden Mittag misst sie die Temperatur und trägt sie in eine Tabelle ein. Nach einer Woche vergleicht sie die Werte.", "Die Klasse sammelt und vergleicht Wetterdaten.", "Die Klasse entscheidet täglich über das Wetter."],
  ["Ein Sturm knickt einen Ast ab. Die Feuerwehr sperrt den gefährlichen Weg. Erst nach dem Wegräumen wird er wieder geöffnet.", "Ein gefährlicher Weg wird vorübergehend gesichert.", "Die Feuerwehr pflanzt einen Wald."],
  ["Im Zoo wird das Gehege umgebaut. Die Tiere ziehen vorübergehend in einen anderen Bereich. Danach haben sie mehr Platz.", "Der Umbau verbessert den Platz für die Tiere.", "Die Tiere werden für immer aus dem Zoo entfernt."],
  ["Am Bahnhof kann ein Besucher den Gleisplan nicht lesen. Sana erklärt ihm den Weg. So erreicht er seinen Zug rechtzeitig.", "Sana hilft einem Besucher bei der Orientierung.", "Sana kauft einen neuen Zug."],
  ["Die Kinder bauen ein Insektenhotel. Sie verwenden trockenes Holz und geeignete Röhren. Danach beobachten sie, welche Tiere einziehen.", "Die Kinder schaffen und beobachten Nistplätze für Insekten.", "Die Kinder stellen ein Hotel für Menschen auf."],
  ["Jonas findet eine Geldbörse. Er bringt sie mit einem Erwachsenen zur Polizei. Die Besitzerin bekommt sie später zurück.", "Jonas sorgt dafür, dass eine Fundsache zurückgegeben wird.", "Jonas gibt das gefundene Geld für Süßigkeiten aus."],
  ["Ein Familienmitglied hört schlecht. Die anderen sprechen deutlich und schauen es beim Reden an. So gelingt das Gespräch besser.", "Die Familie passt ihr Gespräch an die Bedürfnisse eines Mitglieds an.", "Die Familie redet künftig überhaupt nicht mehr."],
  ["Eine Theatergruppe hat wenig Platz auf der Bühne. Sie verändert ihre Kulissen und probt die Wege neu. Bei der Aufführung klappt alles.", "Die Theatergruppe passt ihre Planung an den vorhandenen Platz an.", "Die Theatergruppe baut ein neues Theater."],
  ["Die Nachbarn teilen sich Gartengeräte. Sie schreiben auf, wer etwas ausleiht. So braucht nicht jeder jedes Gerät zu kaufen.", "Die Nachbarn organisieren das gemeinsame Nutzen von Geräten.", "Die Nachbarn verschenken ihre Häuser."],
  ["Der neue Schüler kennt noch niemanden. Zwei Kinder laden ihn in der Pause zum Spiel ein. Bald findet er Anschluss.", "Eine Einladung hilft einem neuen Schüler, Kontakte zu knüpfen.", "Der neue Schüler zieht sofort wieder weg."],
  ["Eine Gruppe will wandern. Sie prüft vorher den Wetterbericht und packt passende Kleidung ein. Als es kühler wird, sind alle vorbereitet.", "Gute Planung hilft der Gruppe bei der Wanderung.", "Die Gruppe wandert ohne Ausrüstung durch Schnee."],
  ["Die Schule spart Strom. Leere Räume bleiben unbeleuchtet und Geräte werden ganz ausgeschaltet. Nach einem Monat wird der Verbrauch verglichen.", "Die Schule versucht, ihren Stromverbrauch zu senken.", "Die Schule kauft jeden Monat neue Lampen."]
]);
germanSentences.splice(8, 0, ...[
  {"words": ["Die", "Katze", "schläft", "auf", "dem", "Sofa"], "answer": "Die Katze schläft auf dem Sofa."},
  {"words": ["Ben", "trägt", "einen", "Rucksack"], "answer": "Ben trägt einen Rucksack."},
  {"words": ["Oma", "kocht", "eine", "Suppe"], "answer": "Oma kocht eine Suppe."},
  {"words": ["Der", "Bus", "hält", "an", "der", "Schule"], "answer": "Der Bus hält an der Schule."},
  {"words": ["Das", "Kind", "baut", "einen", "Turm"], "answer": "Das Kind baut einen Turm."},
  {"words": ["Die", "Ente", "schwimmt", "im", "Teich"], "answer": "Die Ente schwimmt im Teich."},
  {"words": ["Der", "Wind", "bewegt", "die", "Blätter"], "answer": "Der Wind bewegt die Blätter."},
  {"words": ["Mila", "schneidet", "das", "Papier"], "answer": "Mila schneidet das Papier."},
  {"words": ["Der", "Bäcker", "verkauft", "frisches", "Brot"], "answer": "Der Bäcker verkauft frisches Brot."},
  {"words": ["Unsere", "Klasse", "sammelt", "Kastanien"], "answer": "Unsere Klasse sammelt Kastanien."},
  {"words": ["Der", "Regen", "füllt", "die", "Tonne"], "answer": "Der Regen füllt die Tonne."},
  {"words": ["Der", "Zug", "fährt", "durch", "den", "Tunnel"], "answer": "Der Zug fährt durch den Tunnel."},
  {"words": ["Die", "Maus", "frisst", "ein", "Stück", "Käse"], "answer": "Die Maus frisst ein Stück Käse."},
  {"words": ["Lukas", "sucht", "seinen", "Schlüssel"], "answer": "Lukas sucht seinen Schlüssel."},
  {"words": ["Nora", "schreibt", "eine", "Karte"], "answer": "Nora schreibt eine Karte."},
  {"words": ["Das", "Pferd", "steht", "auf", "der", "Wiese"], "answer": "Das Pferd steht auf der Wiese."},
  {"words": ["Der", "Gärtner", "gießt", "die", "Blumen"], "answer": "Der Gärtner gießt die Blumen."},
  {"words": ["Die", "Lampe", "leuchtet", "hell"], "answer": "Die Lampe leuchtet hell."},
  {"words": ["Sara", "öffnet", "das", "Fenster"], "answer": "Sara öffnet das Fenster."},
  {"words": ["Die", "Schnecke", "kriecht", "langsam"], "answer": "Die Schnecke kriecht langsam."},
  {"words": ["Der", "Junge", "fängt", "den", "Ball"], "answer": "Der Junge fängt den Ball."},
  {"words": ["Die", "Kinder", "singen", "ein", "Lied"], "answer": "Die Kinder singen ein Lied."},
  {"words": ["Meine", "Schwester", "zeichnet", "ein", "Schiff"], "answer": "Meine Schwester zeichnet ein Schiff."},
  {"words": ["Der", "Igel", "versteckt", "sich", "im", "Laub"], "answer": "Der Igel versteckt sich im Laub."}
]);

germanPunctuationQuestions.push(...[
  {
    "text": "die Katze liegt auf dem Sofa",
    "answer": "Die Katze liegt auf dem Sofa.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Wann öffnet die Bücherei",
    "answer": "Wann öffnet die Bücherei?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Kannst du den Ball fangen",
    "answer": "Kannst du den Ball fangen?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "die Kinder sammeln Blätter",
    "answer": "Die Kinder sammeln Blätter.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Wo liegt dein Heft",
    "answer": "Wo liegt dein Heft?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "der Wind weht stark",
    "answer": "Der Wind weht stark.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Wie heißt dein Hund",
    "answer": "Wie heißt dein Hund?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "morgen fährt unsere Klasse nach Köln",
    "answer": "Morgen fährt unsere Klasse nach Köln.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Warum ist die Straße gesperrt",
    "answer": "Warum ist die Straße gesperrt?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "die Biene sammelt Nektar",
    "answer": "Die Biene sammelt Nektar.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Hast du deine Tasche dabei",
    "answer": "Hast du deine Tasche dabei?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "im Garten blühen Rosen",
    "answer": "Im Garten blühen Rosen.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Wem gehört dieser Schlüssel",
    "answer": "Wem gehört dieser Schlüssel?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "der Bus hält vor der Schule",
    "answer": "Der Bus hält vor der Schule.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Was möchtest du trinken",
    "answer": "Was möchtest du trinken?",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "heute backt Oma einen Kuchen",
    "answer": "Heute backt Oma einen Kuchen.",
    "hint": "Achte auf die Satzart und auf den Satzanfang."
  },
  {
    "text": "Mia liest ein Buch während Ben ein Bild malt",
    "answer": "Mia liest ein Buch, während Ben ein Bild malt.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Ich weiß nicht ob der Bus schon gefahren ist",
    "answer": "Ich weiß nicht, ob der Bus schon gefahren ist.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Weil die Straße gesperrt ist gehen wir einen anderen Weg",
    "answer": "Weil die Straße gesperrt ist, gehen wir einen anderen Weg.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Sobald die Sonne aufgeht singen die Vögel",
    "answer": "Sobald die Sonne aufgeht, singen die Vögel.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Wir warten bis der Regen aufhört",
    "answer": "Wir warten, bis der Regen aufhört.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Der Hund bellt obwohl er niemanden sieht",
    "answer": "Der Hund bellt, obwohl er niemanden sieht.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Lina packt Brot Käse und Äpfel ein",
    "answer": "Lina packt Brot, Käse und Äpfel ein.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Im Garten wachsen Möhren Erbsen und Salat",
    "answer": "Im Garten wachsen Möhren, Erbsen und Salat.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Der Rucksack ist leicht praktisch und wasserdicht",
    "answer": "Der Rucksack ist leicht, praktisch und wasserdicht.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Ich hoffe dass wir uns bald wiedersehen",
    "answer": "Ich hoffe, dass wir uns bald wiedersehen.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Falls du Hilfe brauchst kannst du mich fragen",
    "answer": "Falls du Hilfe brauchst, kannst du mich fragen.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Ben übt täglich damit er das Stück sicher spielen kann",
    "answer": "Ben übt täglich, damit er das Stück sicher spielen kann.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Ob der Laden noch offen ist weiß ich nicht",
    "answer": "Ob der Laden noch offen ist, weiß ich nicht.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Wir holen Holz bevor wir das Vogelhaus bauen",
    "answer": "Wir holen Holz, bevor wir das Vogelhaus bauen.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Die Kinder lachen singen und tanzen",
    "answer": "Die Kinder lachen, singen und tanzen.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  },
  {
    "text": "Nachdem alle gegessen hatten räumten sie gemeinsam auf",
    "answer": "Nachdem alle gegessen hatten, räumten sie gemeinsam auf.",
    "hint": "Trenne den Nebensatz oder die Teile der Aufzählung durch Kommas."
  }
]);
germanGradeSixCards["wordclass-six"].push(...[
  [
    "Bestimme die Wortart von „ein“: Ein Vogel sitzt im Baum.",
    "Artikel"
  ],
  [
    "Bestimme die Wortart von „du“: Morgen kommst du zu uns.",
    "Pronomen"
  ],
  [
    "Bestimme die Wortart von „obwohl“: Wir gehen, obwohl es regnet.",
    "Konjunktion"
  ],
  [
    "Bestimme die Wortart von „gestern“: Gestern war schulfrei.",
    "Adverb"
  ],
  [
    "Bestimme die Wortart von „schreibt“: Ben schreibt einen Brief.",
    "Verb"
  ],
  [
    "Bestimme die Wortart von „Schlüssel“: Der Schlüssel liegt hier.",
    "Nomen"
  ],
  [
    "Bestimme die Wortart von „bunte“: Die bunte Tasche gefällt mir.",
    "Adjektiv"
  ],
  [
    "Bestimme die Wortart von „oder“: Wir lesen oder spielen.",
    "Konjunktion"
  ],
  [
    "Bestimme die Wortart von „ihr“: Am Abend kommt ihr.",
    "Pronomen"
  ],
  [
    "Bestimme die Wortart von „oben“: Oben wohnen meine Großeltern.",
    "Adverb"
  ],
  [
    "Bestimme die Wortart von „das“: Das Fenster ist offen.",
    "Artikel"
  ],
  [
    "Bestimme die Wortart von „niemand“: Heute fehlt niemand.",
    "Pronomen"
  ],
  [
    "Bestimme die Wortart von „denn“: Wir warten, denn der Bus kommt gleich.",
    "Konjunktion"
  ],
  [
    "Bestimme die Wortart von „bald“: Bald beginnt die Schule.",
    "Adverb"
  ],
  [
    "Bestimme die Wortart von „wachsen“: Die Pflanzen wachsen schnell.",
    "Verb"
  ],
  [
    "Bestimme die Wortart von „kalte“: Die kalte Suppe schmeckt nicht.",
    "Adjektiv"
  ]
]);
germanGradeSixCards["sentence-member"].push(...[
  [
    "Welches Satzglied ist „Unsere Klasse“? Unsere Klasse besucht ein Museum.",
    "Subjekt"
  ],
  [
    "Welches Satzglied ist „besucht“? Unsere Klasse besucht ein Museum.",
    "Prädikat"
  ],
  [
    "Welches Satzglied ist „ein Museum“? Unsere Klasse besucht ein Museum.",
    "Akkusativobjekt"
  ],
  [
    "Welches Satzglied ist „der Nachbarin“? Ben hilft der Nachbarin.",
    "Dativobjekt"
  ],
  [
    "Welches Satzglied ist „morgen“? Wir fahren morgen nach Köln.",
    "Adverbiale Bestimmung der Zeit"
  ],
  [
    "Welches Satzglied ist „vor der Schule“? Der Bus wartet vor der Schule.",
    "Adverbiale Bestimmung des Ortes"
  ],
  [
    "Welches Satzglied ist „Die Vögel“? Die Vögel singen im Baum.",
    "Subjekt"
  ],
  [
    "Welches Satzglied ist „ein Vogelhaus“? Opa baut ein Vogelhaus.",
    "Akkusativobjekt"
  ],
  [
    "Welches Satzglied ist „meinem Bruder“? Ich schenke meinem Bruder ein Buch.",
    "Dativobjekt"
  ],
  [
    "Welches Satzglied ist „schwimmt“? Die Ente schwimmt auf dem Teich.",
    "Prädikat"
  ],
  [
    "Welches Satzglied ist „am Dienstag“? Das Training beginnt am Dienstag.",
    "Adverbiale Bestimmung der Zeit"
  ],
  [
    "Welches Satzglied ist „unter dem Tisch“? Der Ball liegt unter dem Tisch.",
    "Adverbiale Bestimmung des Ortes"
  ],
  [
    "Welches Satzglied ist „einen Brief“? Samira schreibt einen Brief.",
    "Akkusativobjekt"
  ],
  [
    "Welches Satzglied ist „dem Patienten“? Die Ärztin hilft dem Patienten.",
    "Dativobjekt"
  ],
  [
    "Welches Satzglied ist „Das neue Fahrrad“? Das neue Fahrrad steht im Keller.",
    "Subjekt"
  ],
  [
    "Welches Satzglied ist „liest“? Mein Vater liest die Zeitung.",
    "Prädikat"
  ]
]);
germanGradeSixCards["reading-six"].push(...[
  [
    "Lies: Eine Ameise arbeitet im Sommer fleißig und legt Vorräte an. Eine Grille denkt nur ans Vergnügen. Im Winter fehlt ihr Nahrung. Welcher Gegensatz wird gezeigt?",
    "Vorsorge und Sorglosigkeit",
    "Mut und Körpergröße"
  ],
  [
    "Lies: Das Wasser gefriert bei großer Kälte. Dabei wird aus flüssigem Wasser festes Eis. Welche Textabsicht liegt vor?",
    "Einen Vorgang sachlich erklären",
    "Eine Figur zum Kauf überreden"
  ],
  [
    "Lies: Der Wind flüsterte durch die Zweige. Welches sprachliche Mittel liegt vor?",
    "Personifikation",
    "Vergleich mit „wie“"
  ],
  [
    "Lies: Die Straße zog sich wie ein graues Band durch die Landschaft. Welches sprachliche Mittel liegt vor?",
    "Vergleich",
    "Wörtliche Rede"
  ],
  [
    "Lies: Laut Fahrplan fährt der Bus um 8:15 Uhr ab. Welche Art von Aussage ist das?",
    "Eine überprüfbare Information",
    "Eine persönliche Vorliebe"
  ],
  [
    "Lies: Meiner Meinung nach ist dieser Film zu lang. Was zeigt die Formulierung „meiner Meinung nach“?",
    "Eine persönliche Bewertung",
    "Ein wörtliches Zitat aus dem Fahrplan"
  ],
  [
    "Lies: Erst schaltete sie den Strom ab. Dann wechselte eine Fachkraft die defekte Lampe. Weshalb ist die Reihenfolge wichtig?",
    "Die Arbeit soll sicher erfolgen.",
    "Die Lampe soll absichtlich kaputtgehen."
  ],
  [
    "Lies: Im Text wird die Figur zuerst als mutig beschrieben. Später zögert sie vor einer unbekannten Aufgabe. Was lässt sich daraus schließen?",
    "Eine mutige Person kann trotzdem unsicher sein.",
    "Die Figur ist im gesamten Text immer gleichgültig."
  ],
  [
    "Lies: Lisa wollte zum Fest. Doch dann sah sie den verletzten Vogel. Sie blieb bei ihm, bis Hilfe kam. Welche Entscheidung trifft Lisa?",
    "Sie stellt die Hilfe für das Tier vor ihren Festbesuch.",
    "Sie nimmt den Vogel als Schmuck mit zum Fest."
  ],
  [
    "Lies: Für den Ausflug brauchen alle ein Getränk. Auch ein kleiner Imbiss wird empfohlen. Was ist ausdrücklich erforderlich?",
    "Ein Getränk",
    "Eine große Süßigkeitentüte"
  ],
  [
    "Lies: Max sagte: „Ich habe den Schlüssel gefunden!“ Was steht zwischen den Anführungszeichen?",
    "Die wörtlich wiedergegebene Äußerung von Max",
    "Eine Erklärung des Verlags"
  ],
  [
    "Lies: In einer Tabelle stehen die Öffnungszeiten der Bücherei. Wo findest du die Zeit für Donnerstag am schnellsten?",
    "In der Zeile oder Spalte für Donnerstag",
    "In einer beliebigen Werbeanzeige"
  ],
  [
    "Lies: „Kaufe jetzt das beste Spiel aller Zeiten!“ Welche Absicht ist besonders deutlich?",
    "Zum Kauf bewegen",
    "Eine neutrale Messung beschreiben"
  ],
  [
    "Lies: Nachdem der Hund lange gesucht hatte, legte er sich erschöpft hin. Was bedeutet „erschöpft“ hier?",
    "Sehr müde",
    "Besonders neugierig"
  ],
  [
    "Lies: Eine Geschichte beginnt mitten in einer aufregenden Szene und erklärt die Vorgeschichte erst später. Was geschieht zuerst beim Lesen?",
    "Man erfährt die spannende Szene vor ihrer Vorgeschichte.",
    "Man liest zunächst sämtliche früheren Ereignisse."
  ],
  [
    "Lies: Drei Strophen beschreiben Regen, Wind und Sonne. Die Wörter am Zeilenende reimen sich. Welche Textsorte liegt nahe?",
    "Gedicht",
    "Warenrechnung"
  ]
]);
germanGradeSixCards["media-six"].push(...[
  [
    "Eine Nachricht verwendet eine auffällige Überschrift, aber liefert keinen Beleg. Wie prüfst du sie?",
    "Den vollständigen Text lesen und unabhängige Belege suchen.",
    "Nur nach der auffälligen Überschrift urteilen."
  ],
  [
    "Ein Anbieter bezahlt eine bekannte Person dafür, ein Produkt zu zeigen. Was muss beim Einordnen beachtet werden?",
    "Die Darstellung kann Werbung sein.",
    "Bezahlung macht jede Aussage automatisch objektiv."
  ],
  [
    "Ein Bild zeigt nur einen kleinen Ausschnitt eines Ereignisses. Was ist sinnvoll?",
    "Den Zusammenhang und weitere Informationen prüfen.",
    "Vom Ausschnitt auf den gesamten Ablauf schließen."
  ],
  [
    "Du findest dieselbe Behauptung auf vielen Webseiten, die alle voneinander abschreiben. Was bedeutet das?",
    "Viele Wiederholungen ersetzen keinen unabhängigen Beleg.",
    "Die Anzahl der Kopien beweist die Behauptung."
  ],
  [
    "In einem Referat zitierst du einen Satz wörtlich. Wie kennzeichnest du ihn?",
    "Mit Anführungszeichen und Quellenangabe.",
    "Als selbst erfundenen Satz ohne Kennzeichnung."
  ],
  [
    "Ein Chatbeitrag beleidigt einen Mitschüler. Wie kannst du helfen?",
    "Nicht weiterverbreiten und Unterstützung bei einer vertrauten Person suchen.",
    "Die Beleidigung zur Unterhaltung weiterleiten."
  ],
  [
    "Du möchtest ein sicheres Passwort wählen. Welche Eigenschaft hilft?",
    "Es ist lang und wird nicht für andere Konten wiederverwendet.",
    "Es besteht nur aus deinem öffentlich bekannten Vornamen."
  ],
  [
    "Eine App verlangt Zugriff auf dein Mikrofon, obwohl du nur ein Bild ansehen willst. Was ist sinnvoll?",
    "Prüfen, ob die Berechtigung für die Funktion erforderlich ist.",
    "Immer jede Berechtigung ohne Prüfung erlauben."
  ],
  [
    "Du nutzt eine Suchmaschine für ein Sachthema. Welche Suchanfrage ist meist hilfreicher?",
    "Passende, genaue Schlüsselwörter zum Thema.",
    "Beliebige Wörter ohne Bezug zum Thema."
  ],
  [
    "Eine Information nennt ein Datum und einen Messwert. Was hilft bei der Prüfung?",
    "Die ursprüngliche Veröffentlichung und ihre Methode suchen.",
    "Allein auf die Schriftfarbe achten."
  ],
  [
    "Du willst eine Information aus einem Lexikon in eigenen Worten erklären. Was ist wichtig?",
    "Den Inhalt verstehen und sinngemäß mit Quellenangabe wiedergeben.",
    "Ein paar Wörter tauschen und den Rest heimlich abschreiben."
  ],
  [
    "Ein Kontakt bittet dich im Chat um dein Passwort. Wie reagierst du?",
    "Das Passwort nicht weitergeben.",
    "Das Passwort öffentlich in die Gruppe schreiben."
  ],
  [
    "Eine Nachricht verspricht einen Gewinn, wenn du sie sofort weiterleitest. Was ist sinnvoll?",
    "Die Nachricht kritisch prüfen und nicht unter Zeitdruck verbreiten.",
    "Sie ungeprüft an alle Kontakte senden."
  ],
  [
    "Du findest online einen Fehler in deinem eigenen Beitrag. Was ist fair?",
    "Den Fehler berichtigen und die Korrektur verständlich machen.",
    "Den Fehler trotz besseren Wissens weiter als Tatsache darstellen."
  ],
  [
    "Zwei sachkundige Quellen widersprechen sich. Was ist ein guter nächster Schritt?",
    "Argumente, Daten und Veröffentlichungszeitpunkte vergleichen.",
    "Die Quelle mit dem schönsten Logo auswählen."
  ],
  [
    "Du darfst ein Bild nur unter Nennung des Urhebers nutzen. Was musst du tun?",
    "Die Nutzungsbedingungen beachten und den Urheber nennen.",
    "Den Namen entfernen und das Bild als eigenes ausgeben."
  ]
]);

const gardenSentence = germanSentences.find((item) => item.answer === "Wir spielen nach der Schule im Garten.");
gardenSentence.alternatives = [gardenSentence.answer, "Wir spielen im Garten nach der Schule."];

// Ab Klasse 5: längere Texte mit Schlussfolgerungen, Belegen und Textabsichten.
germanAdvancedTexts.push(...[
  {"text": "Die Schülerzeitung möchte über ein neues Busangebot berichten. Eine Schülerin kennt die Fahrzeiten nur aus einem älteren Aushang. Die Redaktion fragt deshalb beim Verkehrsunternehmen nach, bevor der Artikel erscheint.", "question": "Warum fragt die Redaktion beim Verkehrsunternehmen nach?", "answer": "Sie möchte die Angaben vor der Veröffentlichung überprüfen.", "options": ["Sie möchte die Angaben vor der Veröffentlichung überprüfen.", "Sie möchte den Aushang heimlich entfernen.", "Sie möchte keine Fahrzeiten nennen."]},
  {"text": "Auf dem Schulhof sollen neue Sitzbänke stehen. Einige Kinder wünschen sie sich nahe dem Fußballfeld, andere suchen einen ruhigen Platz zum Lesen. Der Schülerrat schlägt zwei getrennte Bereiche vor.", "question": "Welches Problem löst der Vorschlag des Schülerrats?", "answer": "Er berücksichtigt unterschiedliche Wünsche an den Schulhof.", "options": ["Er berücksichtigt unterschiedliche Wünsche an den Schulhof.", "Er verbietet allen Kindern das Lesen.", "Er verlegt die Schule an einen anderen Ort."]},
  {"text": "Ein Bach ist nach starkem Regen braun gefärbt. Im Bericht der Stadt steht, dass abgeschwemmte Erde die Färbung verursacht. Ob zusätzlich Schadstoffe enthalten sind, wird noch untersucht.", "question": "Welche Aussage ist durch den Bericht abgesichert?", "answer": "Abgeschwemmte Erde ist eine Ursache der Färbung.", "options": ["Abgeschwemmte Erde ist eine Ursache der Färbung.", "Der Bach enthält sicher keine Schadstoffe.", "Die Untersuchung ist bereits vollständig abgeschlossen."]},
  {"text": "Nora bereitet ein Referat vor. In einem Lexikon findet sie eine andere Jahreszahl als auf einer privaten Webseite ohne Quellenangabe. Statt eine Zahl zu raten, sucht sie nach dem Originaldokument.", "question": "Welche Fähigkeit zeigt Nora?", "answer": "Sie prüft widersprüchliche Informationen anhand ihrer Herkunft.", "options": ["Sie prüft widersprüchliche Informationen anhand ihrer Herkunft.", "Sie entscheidet ausschließlich nach der schöneren Gestaltung.", "Sie hält jede Internetseite für gleich zuverlässig."]},
  {"text": "Auf dem Plakat steht: Unsere Aufführung beginnt um 18 Uhr. Einlass ist ab 17:30 Uhr. Die Türen werden während der ersten Szene geschlossen gehalten. Sami kommt um 18:05 Uhr.", "question": "Welche Folge ist nach dem Plakat möglich?", "answer": "Sami muss bis zum Ende der ersten Szene warten.", "options": ["Sami muss bis zum Ende der ersten Szene warten.", "Sami darf das Theater nie wieder besuchen.", "Die Vorstellung beginnt wegen Sami erst später."]},
  {"text": "Eine Stadt testet für vier Wochen eine neue Fahrradstraße. Vor und nach dem Test werden Verkehr und Lärm gemessen. Erst danach soll entschieden werden, ob die Regelung bleibt.", "question": "Warum wird vor und nach dem Test gemessen?", "answer": "Die Stadt möchte die Auswirkungen vergleichen.", "options": ["Die Stadt möchte die Auswirkungen vergleichen.", "Die Stadt hat die dauerhafte Entscheidung schon im Text bekannt gegeben.", "Die Messung soll das Radfahren grundsätzlich verbieten."]},
  {"text": "Mira verspricht ihrer Freundin, beim Umzug zu helfen. Am selben Nachmittag wird sie zu einem Konzert eingeladen. Sie sagt die Einladung ab und hilft beim Tragen der Kisten.", "question": "Welche Eigenschaft zeigt Miras Entscheidung besonders?", "answer": "Zuverlässigkeit", "options": ["Zuverlässigkeit", "Gleichgültigkeit", "Verschwendung"]},
  {"text": "Ein Jugendlicher entdeckt auf einer Wanderung einen umgestürzten Baum auf dem Weg. Er findet einen sicheren Umweg, informiert die Gruppe und meldet das Hindernis später der zuständigen Stelle.", "question": "Welche Überschrift fasst den Text am besten zusammen?", "answer": "Ein Hindernis erkennen und verantwortungsvoll handeln", "options": ["Ein Hindernis erkennen und verantwortungsvoll handeln", "Eine Wanderung ohne jedes Problem", "Ein Baum wird absichtlich gefällt"]},
  {"text": "Im Bericht über das Sportfest steht, welche Wettbewerbe stattfanden und wie viele Klassen teilnahmen. Im Kommentar daneben erklärt eine Schülerin, warum sie das Fest gelungen fand.", "question": "Wodurch unterscheiden sich Bericht und Kommentar hier?", "answer": "Der Kommentar enthält ausdrücklich eine persönliche Bewertung.", "options": ["Der Kommentar enthält ausdrücklich eine persönliche Bewertung.", "Nur der Bericht darf Wörter enthalten.", "Der Kommentar nennt überhaupt kein Thema."]},
  {"text": "Zwei Klassen sammeln Altpapier. Klasse A sammelt insgesamt mehr, hat aber doppelt so viele Kinder wie Klasse B. Die Lehrerin schlägt vor, auch die Menge pro Kind zu betrachten.", "question": "Wozu dient der zusätzliche Vergleich?", "answer": "Er berücksichtigt die unterschiedliche Größe der Klassen.", "options": ["Er berücksichtigt die unterschiedliche Größe der Klassen.", "Er beweist, dass eine Klasse nichts gesammelt hat.", "Er ersetzt die Messung durch eine beliebige Schätzung."]},
  {"text": "Eine Bibliothek führt einen neuen Rückgabeautomaten ein. Bücher können nun auch abgegeben werden, wenn die Ausleihtheke geschlossen ist. Die Ausleihe neuer Bücher bleibt an die Öffnungszeiten gebunden.", "question": "Welche Handlung wird durch die Änderung zusätzlich möglich?", "answer": "Bücher außerhalb der Öffnungszeiten der Theke zurückgeben", "options": ["Bücher außerhalb der Öffnungszeiten der Theke zurückgeben", "Zu jeder Zeit neue Bücher an der Theke ausleihen", "Alle ausgeliehenen Bücher dauerhaft behalten"]},
  {"text": "Eine Klasse untersucht, wie schnell Kresse wächst. Alle Töpfe erhalten dieselbe Erde und gleich viel Wasser. Nur die Lichtmenge unterscheidet sich. Die Kinder vergleichen die Pflanzen täglich.", "question": "Warum bleiben Erde und Wassermenge gleich?", "answer": "So lässt sich der Einfluss des Lichts besser untersuchen.", "options": ["So lässt sich der Einfluss des Lichts besser untersuchen.", "Damit alle Pflanzen sicher gleich schnell wachsen.", "Damit die Lichtmenge keine Rolle spielen kann."]},
  {"text": "In einem Leserbrief fordert ein Vater einen Zebrastreifen vor der Schule. Er beschreibt die schwierige Überquerung am Morgen und nennt beobachtete gefährliche Situationen.", "question": "Welche Funktion haben die beschriebenen Situationen?", "answer": "Sie begründen seine Forderung.", "options": ["Sie begründen seine Forderung.", "Sie erklären den Bau eines Fahrrads.", "Sie sollen die Schule aus dem Ort entfernen."]},
  {"text": "Luca findet einen Schlüssel auf dem Sportplatz. Zuerst möchte er ihn einfach liegen lassen. Dann denkt er an seine eigene Suche nach einem verlorenen Schlüssel und bringt den Fund zur Aufsicht.", "question": "Was verändert Lucas Entscheidung?", "answer": "Er versetzt sich in die Lage einer Person, die etwas verloren hat.", "options": ["Er versetzt sich in die Lage einer Person, die etwas verloren hat.", "Er erhält im Text eine Belohnung.", "Der Schlüssel beginnt zu sprechen."]},
  {"text": "Auf einer Verpackung steht, dass sie vollständig recycelbar ist. Im Informationstext wird erklärt, dass Recycling außerdem eine richtige Trennung und Sammlung voraussetzt.", "question": "Welche Schlussfolgerung passt?", "answer": "Recycelbar bedeutet nicht, dass jede weggeworfene Verpackung tatsächlich recycelt wird.", "options": ["Recycelbar bedeutet nicht, dass jede weggeworfene Verpackung tatsächlich recycelt wird.", "Recycelbare Verpackungen müssen nicht gesammelt werden.", "Die Mülltrennung hat laut Text keine Bedeutung."]},
  {"text": "Eine Schule möchte eine Wiese für den Sportunterricht nutzen. Dort wachsen im Frühjahr seltene Blumen. Die Gruppen einigen sich darauf, einen Teil der Fläche auszusparen.", "question": "Was kennzeichnet die Einigung?", "answer": "Sie verbindet Nutzung mit Rücksicht auf die Pflanzen.", "options": ["Sie verbindet Nutzung mit Rücksicht auf die Pflanzen.", "Sie verlangt, sämtliche Blumen zu entfernen.", "Sie verbietet jede Bewegung auf dem Schulgelände."]},
  {"text": "In der Geschichte zieht Lina in eine neue Stadt. Anfangs antwortet sie im Unterricht kaum. Nachdem sie im Theaterprojekt eine Rolle übernommen hat, spricht sie häufiger mit anderen Kindern.", "question": "Welche Entwicklung beschreibt der Text?", "answer": "Lina gewinnt durch eine gemeinsame Tätigkeit mehr Kontakt zu anderen.", "options": ["Lina gewinnt durch eine gemeinsame Tätigkeit mehr Kontakt zu anderen.", "Lina zieht im Verlauf des Textes erneut um.", "Lina verliert jedes Interesse an Gesprächen."]},
  {"text": "Die Wandergruppe plant eine lange Strecke. Der Wetterbericht kündigt für den Nachmittag Gewitter an. Die Leitung wählt deshalb eine kürzere Route mit einer früh erreichbaren Schutzhütte.", "question": "Wie wirkt sich die neue Information auf die Planung aus?", "answer": "Die Leitung passt Strecke und Schutzmöglichkeiten an das Wetter an.", "options": ["Die Leitung passt Strecke und Schutzmöglichkeiten an das Wetter an.", "Die Leitung verlängert die Strecke ohne Pause.", "Der Wetterbericht verändert im Text die Jahreszeit."]},
  {"text": "Ein Sachbuch beschreibt zuerst, wie ein Wasserrad gebaut ist. Anschließend erklärt es mit Pfeilen, wie fließendes Wasser das Rad bewegt. Der Text und die Zeichnung ergänzen sich.", "question": "Welche Information liefern die Pfeile besonders?", "answer": "Die Bewegungsrichtung im dargestellten Ablauf", "options": ["Die Bewegungsrichtung im dargestellten Ablauf", "Das genaue Alter des Buches", "Die persönliche Meinung des Zeichners"]},
  {"text": "Ein Artikel meldet, dass immer mehr Kinder mit dem Fahrrad zur Schule kommen. Als Beleg nennt er eine Zählung an zwei Tagen. Die Redaktion weist darauf hin, dass Regen das Ergebnis beeinflussen kann.", "question": "Warum wird auf den Regen hingewiesen?", "answer": "Die Bedingungen der Zählung können die Zahl der Fahrräder beeinflussen.", "options": ["Die Bedingungen der Zählung können die Zahl der Fahrräder beeinflussen.", "Bei Regen gibt es grundsätzlich keine Schulen.", "Die genannte Zählung ist laut Text frei erfunden."]},
  {"text": "Vor dem Klassenausflug liest Jona die Hinweise: Festes Schuhwerk ist erforderlich. Eine Regenjacke wird empfohlen. Ein eigenes Fernglas ist freiwillig. Er kann nur einen kleinen Rucksack mitnehmen.", "question": "Welche Ausrüstung ist nach den Hinweisen verbindlich?", "answer": "Festes Schuhwerk", "options": ["Festes Schuhwerk", "Ein eigenes Fernglas", "Ein zusätzlicher großer Koffer"]},
  {"text": "Ein Museum zeigt dieselbe Landschaft auf zwei Bildern aus verschiedenen Zeiten. Auf dem älteren Bild verläuft ein Bach offen. Auf dem neueren stehen dort Häuser. Die Beschriftung erklärt, dass der Bach unterirdisch verlegt wurde.", "question": "Welche Frage beantwortet die Beschriftung?", "answer": "Warum der Bach auf dem neueren Bild nicht mehr offen zu sehen ist", "options": ["Warum der Bach auf dem neueren Bild nicht mehr offen zu sehen ist", "Wer alle Häuser gebaut hat", "Wie viel jedes Bild gekostet hat"]}
]);
germanRegularVerbs.push("wohnen", "leben", "suchen", "holen", "packen", "feiern", "lieben", "üben", "hören", "führen", "fühlen", "zählen");

function makeFocusedGermanQuestion(topic) {
  if (germanGradeSixCards[topic.mode]) {
    const [text, answer, distractor] = pickRandom(germanGradeSixCards[topic.mode]);
    const options = distractor ? [answer, distractor] : [...new Set(germanGradeSixCards[topic.mode].map((card) => card[1]))];
    return { text, answer, options: shuffled(options), hint: topic.explanation };
  }
  if (topic.mode === "syllables") {
    const [word, count] = pickRandom(germanSyllables);
    return { text: `Wie viele Silben hat „${word}“?`, answer: count, hint: "Sprich das Wort langsam und klatsche bei jeder Silbe einmal." };
  }
  if (topic.mode === "verb-find") {
    const [sentence, answer] = pickRandom(germanVerbSentences);
    return { text: `Welches Wort ist das Tunwort (Verb)? ${sentence}`, answer, hint: "Frage: Was tut jemand? Schreibe nur das Verb." };
  }
  if (topic.mode === "word-family") {
    const [word, answer, distractor] = pickRandom(germanWordFamilies);
    return { text: `Welches Wort gehört zur Wortfamilie von „${word}“?`, answer, options: shuffled([answer, distractor]), hint: "Achte auf den gemeinsamen Wortstamm und die verwandte Bedeutung." };
  }
  return null;
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = randomInt(0, index);
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function makeGermanQuestion(topic) {
  const focused = makeFocusedGermanQuestion(topic);
  if (focused) return focused;
  switch (topic.skill) {
    case "de-spelling": {
      const pool = germanSpellingPairsByGrade[progress.grade];
      const [wrong, answer] = pickRandom(pool);
      return { text: `Schreibe das Wort richtig: ${wrong}`, answer, hint: germanSpellingHintsByGrade[progress.grade] };
    }
    case "de-wordclass": {
      const pool = progress.grade <= 2 ? germanWords.filter((item) => !["Gedanke", "Freiheit", "untersuchen", "ungewöhnlich", "entdecken", "vorsichtig"].includes(item.word)) : germanWords;
      const item = pickRandom(pool);
      return { text: `Zu welcher Wortart gehört „${item.word}“? (Nomen, Verb oder Adjektiv)`, answer: item.type, hint: "Nomen bezeichnen Dinge, Verben Tätigkeiten und Adjektive Eigenschaften." };
    }
    case "de-wordorder": {
      const pool = germanSentences.slice(0, progress.grade <= 4 ? 32 : germanSentences.length);
      const item = pickRandom(pool);
      const words = [...item.words];
      for (let index = words.length - 1; index > 0; index -= 1) {
        const swapIndex = randomInt(0, index);
        [words[index], words[swapIndex]] = [words[swapIndex], words[index]];
      }
      return { key: `sentence:${item.answer}`, text: `Ordne die Wörter zu einem Satz: ${words.join(" / ")}. Beginne mit „${item.words.slice(0, item.words[0] === "Am" ? 2 : 1).join(" ")}“.`, answer: item.alternatives || item.answer, caseSensitive: true, hint: "Beachte den vorgegebenen Satzanfang. Schreibe einen Aussagesatz mit Punkt am Ende." };
    }
    case "de-vocabulary": {
      const pool = progress.grade <= 2 ? germanVocabulary.filter((item) => !["kostbar", "erlauben", "sorgfältig", "überlegen", "unverzüglich", "behutsam", "antworten", "bauen", "hilfsbereit"].includes(item.word)) : germanVocabulary;
      const item = pickRandom(pool);
      return { text: `Welches Wort bedeutet ungefähr dasselbe wie „${item.word}“? (${item.options.join(", ")})`, answer: item.answer, hint: "Suche das Wort mit einer ähnlichen Bedeutung." };
    }
    case "de-grammar": {
      const verb = pickRandom(germanRegularVerbs);
      const person = pickRandom(germanPersons);
      const tense = progress.grade < 5 || Math.random() < 0.5 ? "present" : "past";
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
          answer = [`${stem}e`, `${verb.replace(/e([lr])n$/, "$1")}e`];
        } else {
          answer = `${stem}${person.present}`;
        }
      } else {
        answer = `${stem}${tense === "past" ? person.past : person.present}`;
      }
      return { text: `Setze „${verb}“ für „${person.pronoun}“ ins ${tenseLabel}: ${person.pronoun} ___`, answer, hint: "Bestimme zuerst den Wortstamm und ergänze die passende Verbendung." };
    }
    case "de-punctuation": {
      const pool = progress.grade === 6 ? germanPunctuationQuestions.filter((item) => item.answer.includes(",")) : progress.grade < 4 ? germanPunctuationQuestions.filter((item) => !item.answer.includes(",")) : germanPunctuationQuestions;
      const item = pickRandom(pool);
      return { text: `Setze Großschreibung und Satzzeichen richtig: ${item.text} (Ende mit ${item.answer.endsWith("?") ? "einem Fragezeichen" : item.answer.endsWith("!") ? "einem Ausrufezeichen" : "einem Punkt"}.)`, answer: item.answer, caseSensitive: true, hint: item.hint };
    }
    case "de-reading": {
      if (progress.grade === 1) {
        const [sentence, verb] = pickRandom(germanVerbSentences);
        return { key: `reading:${sentence}`, text: `Lies: "${sentence}"\nWelches Wort sagt, was jemand tut?`, answer: verb, hint: "Lies den Satz langsam. Was geschieht?" };
      }
      if (progress.grade === 4) {
        const [text, answer, distractor] = pickRandom(germanMainIdeaTexts);
        return { key: `reading:${text}`, text: `Lies: "${text}"\nWelche Aussage fasst den ganzen Text am besten zusammen?`, answer, options: shuffled([answer, distractor]), hint: "Überlege, worum es im ganzen Text geht. Prüfe, ob die Aussage zum Text passt." };
      }
      const item = pickRandom(progress.grade >= 5 ? germanAdvancedTexts : germanIntermediateTexts);
      return { key: `reading:${item.text}`, text: `Lies: "${item.text}"\nFrage: ${item.question}`, answer: item.answer, options: shuffled(item.options), hint: "Suche im Text die Information, die zur Frage passt." };
    }
    case "de-words": {
      // Komposita bilden: zwei Nomen zusammenfügen
      const [a, b] = pickRandom(germanCompoundPairs);
      // Gebräuchliche Komposita mit passender Fuge (z. B. Hundehütte).
      const fuge = germanNounFuges[a] || a;
      const compound = `${fuge}${b}`.replace(/\s+/g, "").toLowerCase();
      const answer = compound.charAt(0).toUpperCase() + compound.slice(1);
      return { text: `Was entsteht, wenn man die Wörter '${a}' und '${b}' in dieser Reihenfolge verbindet? Schreibe das zusammengesetzte Wort.`, answer, hint: "Bilde das Kompositum und setze die beiden Wörter ohne Leerzeichen zusammen. Achte auf die Fuge (das Bindeglied zwischen den Wörtern)." };
    }
    case "de-capitalization": {
      // Groß-/Kleinschreibung üben: zeige kleingeschriebenen Satz, Antworte mit korrekter Großschreibung
      const item = pickRandom(germanSentences.slice(0, progress.grade < 5 ? 32 : germanSentences.length));
      const lower = item.answer.toLowerCase();
      return { text: `Setze Großschreibung und Satzzeichen: ${lower}`, answer: item.answer, caseSensitive: true, hint: "Achte auf Satzanfang und Nomen (Großschreibung)." };
    }
    default:
      return { text: "Schreibe das Wort „Schule“ richtig.", answer: "Schule", hint: "Achte auf die Großschreibung von Nomen." };
  }
}

function questionIdentity(question) {
  if (question.key) return question.key;
  // Tauschaufgaben auch bei Dezimalzahlen und Brüchen als denselben Inhalt erkennen.
  const arithmetic = question.text.match(/^(?:Wie viel ist|Berechne) (-?\d+(?:[,.]\d+|\/\d+)?) ([+×]) (-?\d+(?:[,.]\d+|\/\d+)?)[?.]/);
  if (arithmetic) return `${arithmetic[2]}:${[parseAnswer(arithmetic[1]), parseAnswer(arithmetic[3])].sort((a, b) => a - b).join(":")}`;
  return question.text.normalize("NFC").trim().replace(/\s+/g, " ");
}

function makeUniqueQuestions(topic, count) {
  const candidates = new Map();
  // Größere Auswahl sammeln, damit bekannte Aufgaben nicht aus Zufall früh zurückkehren.
  // Die Obergrenze verhindert Stillstand bei endlichen Pools oder konstanter Zufallsfolge.
  for (let attempt = 0; attempt < count * 128 && candidates.size < Math.max(count * 16, 128); attempt += 1) {
    const question = progress.subject === "german" ? makeGermanQuestion(topic) : makeQuestion(topic);
    const identity = questionIdentity(question);
    if (!candidates.has(identity)) candidates.set(identity, question);
  }
  const recent = new Map((questionHistory[questionHistoryKey()] || []).map((identity, index) => [identity, index + 1]));
  // Unbekannte Aufgaben zuerst, danach die am längsten nicht gezeigten. Gleichstände mischen.
  return shuffled([...candidates.values()])
    .sort((left, right) => (recent.get(questionIdentity(left)) || 0) - (recent.get(questionIdentity(right)) || 0))
    .slice(0, count);
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
  const questions = makeUniqueQuestions(topic, count);
  rememberQuestions(questions);
  activeLesson = {
    topic,
    topicIndex,
    questions,
    position: 0,
    correct: 0,
    firstAttempts: Array(questions.length).fill(null),
    submissions: Array(questions.length).fill(null),
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
           <input class="answer-input" id="answer-input" name="answer" type="text" inputmode="${progress.subject === "math" && !question.allowFraction ? "decimal" : "text"}" autocomplete="off" placeholder="Deine Antwort" required>
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
    ? Number.isFinite(answer) && Math.abs(answer - question.answer) < (question.numericTolerance ?? 0.011)
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
  const key = topicProgressKey(progress.subject, progress.grade, topicIndex, topic);
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
