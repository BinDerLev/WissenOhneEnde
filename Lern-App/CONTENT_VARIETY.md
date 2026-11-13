# Aufgabenvielfalt und Qualitätsprüfung – 13. November 2026

Die bisherigen acht Aufgaben pro Einheit waren als kurze Übungsrunde ausreichend. Der Vorrat dahinter war für wiederholtes Spielen zu klein: Bei einer Bestandsaufnahme von 101 Themen hatten 46 weniger als 24 beobachtete unterschiedliche Aufgaben. Davon waren 33 Deutschthemen. Besonders bei Pools mit acht Inhalten wurde praktisch die gesamte Einheit beim nächsten Besuch wiederholt.

Die Einheit bleibt bei acht Aufgaben. Erweitert wurden die Inhaltspools und die Auswahl über mehrere Durchläufe.

## Neuer Umfang

| Inhaltspool | Bisher | Jetzt |
| --- | ---: | ---: |
| Rechtschreibung je Klasse 1–6 | 8–10 | 24 / 24 / 24 / 26 / 24 / 26 |
| Wortarten, Grundschule | 8–9 erreichbar | 30 in Klasse 1/2, sonst 36 |
| Einfache Sätze für Satzbau/Großschreibung | 8 erreichbar | 32, zusätzlich 4 komplexere Sätze |
| Synonyme | 8–9 erreichbar | 29 in Klasse 2, sonst 38 |
| Silben zählen | 12 | 36 |
| Verben im Satz finden / frühes Lesen | 10 | 34 |
| Wortfamilien | 10 | 34 |
| Gebräuchliche Komposita | 12 | 36 |
| Kurze Lesetexte | 9 | 33 |
| Hauptaussagen mehrerer Sätze | 9 | 33 |
| Lesen Klasse 5 | dieselben 9 Kurztexte | eigener Pool mit 24 längeren Texten und Fragen |
| Zeichensetzung | 8–16 erreichbar, Klasse 6: 8 | 48, davon 24 Kommaaufgaben; einfache Aufgaben bleiben separat |
| Regelmäßige Verben für Konjugationen | 12 | 24, kombiniert mit Personen und Zeitformen |
| Klasse 6: Wortarten / Satzglieder / Texte / Medien | 10 / 10 / 9 / 9 | 26 / 26 / 25 / 25 |
| Formen: Ecken/Seiten, getrennte Formen zusammenzählen | 8 | 54 |
| Münzen zusammenzählen | 12 | 32, mit 5-, 10- und 20-Cent-Münzen bis insgesamt 100 Cent |
| Meter/Zentimeter | 8 | 40 in Klasse 2, 200 in Klasse 4/5, beide Umrechnungsrichtungen |
| Zahlenfolgen | Klasse 1: 20 | steigende und fallende Folgen innerhalb des gewählten Zahlenraums |

Die Bestandsaufnahme nach dem Ausbau findet bei allen Deutschthemen mindestens 24 unterschiedliche Inhalte. Automatisierte Tests prüfen für jedes Deutschthema drei unmittelbar aufeinanderfolgende Einheiten mit insgesamt 24 verschiedenen Aufgaben. Bei einer ergänzenden Stichprobe von je 3000 Generierungen für alle 101 Themen bleiben nur zwei Mathethemen unter 24: Zehnerfreunde (11 Grundaufgaben) und Verdoppeln/Halbieren bis 20 (20 Aufgaben). Bei zufällig erzeugter Mathematik sind beobachtete Mengen Stichproben und keine exakten Gesamtzahlen; die oben angegebenen kleinen endlichen Pools lassen sich direkt aus den Daten bzw. Kombinationen bestimmen.

## Wiederholungssteuerung

- Die App sammelt eine größere Kandidatenauswahl und bevorzugt Inhalte, die in der gespeicherten Historie fehlen.
- Sind alle verfügbaren Kandidaten bekannt, kommen die am längsten nicht gezeigten Aufgaben zuerst zurück.
- Eine gemeinsame Historie je Fach und Klasse berücksichtigt auch verwandte Themen. Zwei Rechtschreibthemen derselben Klasse beginnen deshalb nicht unabhängig mit derselben Wortauswahl.
- Als gezeigt zählt eine Aufgabe bereits beim Start einer Einheit. Neustart oder Abbruch setzen den Vorrat nicht zurück.
- Die Historie bleibt im lokalen Browserspeicher erhalten. Pro Fach/Klasse werden höchstens 256 Kennungen gespeichert. Löschen der Browserdaten oder ein anderes Gerät beginnt mit einer neuen Historie. Bei einem Speicherfehler funktioniert die Auswahl innerhalb der geöffneten App weiter.
- Andere Wortmischungen desselben Satzes, anders sortierte Antwortoptionen und vertauschte Operanden bei Addition/Multiplikation erzeugen keine künstlich neuen Inhalte. Dies gilt jetzt auch für Brüche und Dezimalzahlen. Ebenso werden vertauschte Werte bei Mittelwerten und Quadermaßen zusammengefasst.

Die Auswahl bleibt nach oben begrenzt und blockiert auch bei einer ungünstigen Zufallsfolge nicht. Bei erschöpften kleinen Grundlagenpools wird bewusst wiederholt, statt den Zahlenraum zu erhöhen oder dieselbe Rechnung nur anders zu formulieren. Bei den elf Zehnerfreunden sind in zwei Einheiten mit je acht Aufgaben mindestens fünf Wiederholungen unvermeidbar; genau dieses Minimum wird im Test erreicht.

## Zusätzlicher Qualitätsreview durch einen Subagenten

Der beauftragte Subagent hat die Deutschdaten und Generatoren auf Niveau, Dopplungen, Eindeutigkeit und zulässige Antworten geprüft und erweitert. Die mathematischen Erweiterungen wurden zusätzlich von ihm gegengeprüft.

Dabei wurden unter anderem diese Punkte verbessert:

- Satzordnen nennt jetzt einen festen Satzanfang; bei zwei möglichen Positionen der Orts-/Zeitangabe sind beide Lösungen hinterlegt.
- Die Konjugationsaufgaben akzeptieren sowohl `sammele`/`sammle` als auch `wandere`/`wandre`. Die ungekürzten Formen sind im [Duden zu sammeln](https://www.duden.de/rechtschreibung/sammeln) und [Duden zu wandern](https://www.duden.de/rechtschreibung/wandern) belegt.
- Zeichensetzungsaufgaben geben das verlangte Satzendzeichen vor, damit eine ebenfalls vertretbare neutrale Aussage nicht als falscher Ausruf bewertet wird.
- Bereits gültige Wörter/Formen wurden als angebliche Fehlerschreibungen entfernt, darunter „Kelte“ und „Fischs“.
- Unübliche Zusammensetzungen und verwirrende Wortfamilien-Distraktoren wurden ersetzt.
- Eine falsche Schlussfolgerung im Leuchtturmtext wurde berichtigt: schwächeres Licht bedeutet nicht automatisch einen vollständigen Ausfall.
- Klasse 5 erhält eigene längere Lesetexte mit Fragen zu Belegen, Schlussfolgerungen und Textabsichten.

Das ist eine zusätzliche inhaltliche Prüfung durch einen KI-Subagenten, keine Validierung durch Lehrkräfte. Freie Texte werden weiterhin nicht allgemein sprachlich bewertet; die Satzbauaufgaben sind bewusst eingegrenzt. Die Erweiterung der Pools ersetzt auch keine vollständige Abdeckung des NRW-Lehrplans.

## Validierung

`node test_curriculum.js` besteht mit 34 Tests. Die neuen Prüfungen umfassen mehrere Runden aller Deutschthemen, Wiederaufnahme nach Neuladen, gemeinsame Historie verwandter Themen, begrenzte Historiengröße, ungültige Speicherdaten, Speicherfehler, faire Rotation endlicher Zahlenfakten, mathematisch korrekte Lösungen der erweiterten Formate sowie akzeptierte Sprachvarianten. `node --check Lern-App/script.js` und `git diff --check` wurden ebenfalls ausgeführt.
