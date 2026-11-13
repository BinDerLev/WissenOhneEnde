# Curriculumprüfung – 12. November 2026

## Grundlage und Reichweite

Geprüft wurden die Themen und Aufgabengeneratoren für Mathematik und Deutsch in Klasse 1–6. Zielprofil nach Vorgabe: **Nordrhein-Westfalen, Grundschule (Klasse 1–4) und Gymnasium G9 (Klasse 5–6)**.

Maßgeblich sind die NRW-Lehrpläne für die Primarstufe von 2021 sowie die Kernlehrpläne des Gymnasiums von 2019. Die Grundschullehrpläne formulieren Erwartungen am Ende der Schuleingangsphase und der Klasse 4; das Gymnasium formuliert hier Erwartungen für das Ende der Erprobungsstufe (Klasse 5/6). Die Aufteilung auf einzelne Klassen bleibt eine didaktische Auswahl. Der schulinterne Lehrplan der konkreten Schule kann Inhalte anders verteilen.

Amtliche Quellen:

- [NRW: Lehrplan Mathematik Grundschule (2021)](https://lehrplannavigator.nrw.de/system/files/media/document/file/ps_lp_m_einzeldatei_2021_08_02.pdf)
- [NRW: Lehrplan Deutsch Grundschule (2021)](https://lehrplannavigator.nrw.de/system/files/media/document/file/ps_lp_d_einzeldatei_2021_08_02.pdf)
- [NRW: Kernlehrplan Mathematik Gymnasium G9 (2019)](https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_m_klp_3401_2019_06_23_0.pdf)
- [NRW: Kernlehrplan Deutsch Gymnasium G9 (2019)](https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_d_klp_3409_2019_06_23.pdf)
- [QUA-LiS: Beispiel eines schulinternen Lehrplans Mathematik](https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_m_silp_2020_01_31.pdf): Orientierung für mögliche Reihenfolgen, keine verbindliche Festlegung für alle Schulen.

Die KMK-Standards dienen ergänzend als übergreifender Vergleich; die frühere bayerische Vergleichsquelle ist durch NRW-Quellen ersetzt.

### Präzisierungen nach dem NRW-Abgleich

- **Grundschule Mathematik:** Zahlenraum bis 1 Million und schriftliche Verfahren sind relevante Ziele. Die App bietet jetzt in Klasse 4 auch Division durch einstellige Zahlen ohne Rest und mehrstellige Faktoren beim schriftlichen Multiplizieren. Restschreibweise und Erklärung der Verfahren fehlen noch.
- **Brüche in der Grundschule:** Im Vordergrund stehen alltagsübliche Bruchteile bei Größen. Die bisherigen Mengenaufgaben sind für Klasse 3/4 deshalb auf Hälften/Viertel begrenzt und mit Längen verbunden. Der Vergleich gleichnamiger Brüche bleibt eine ergänzende Vertiefung; er ist kein eigenständiger Nachweis einer verbindlichen NRW-Grundschulanforderung.
- **Gymnasium Mathematik:** Natürliche Zahlen, Größen, Geometrie, Daten und Bruchvorstellungen sind sinnvolle Schwerpunkte für den Einstieg. Aus der Aufnahme von Dezimal- und Prozentdarstellungen in die Erprobungsstufe folgt keine allgemeine Pflicht für Klasse 5. Die App behält einfache Dezimaladdition als Vertiefung; Prozentrechnung bleibt außerhalb des regulären Angebots.
- **Gymnasium Deutsch:** Reine Wort- und Satzkorrekturen genügen nicht. Die Bereiche Sprache, Texte, Kommunikation und Medien verlangen deutlich breitere Aufgaben. Die bisherigen fünf Themen sind ausgewählte Übungen; insbesondere längere Texte, Erzählen/Beschreiben, Textüberarbeitung und Medienaufgaben bleiben offen.

## Ergebnis

Die App ist ein Übungsangebot für ausgewählte Teilkompetenzen. Eine vollständige Lehrplanabdeckung ist derzeit nicht gegeben. Die Zahl der Themenkarten war hierfür kein verlässliches Maß: Verschiedene Titel verwendeten denselben Generator, manche angekündigten Lernziele kamen überhaupt nicht vor.

Mathematik umfasst laut KMK Zahl und Operation, Muster und Zusammenhänge, Größen und Messen, Raum und Form sowie Daten und Zufall. Auch Begründen, Modellieren, Problemlösen und das Vergleichen von Rechenwegen gehören dazu. Deutsch umfasst neben Rechtschreibung und Grammatik insbesondere Sprechen und Zuhören, eigenes Schreiben, Lesen und die Auseinandersetzung mit Texten und Medien.

## Behobene Fehler und Verbesserungen

| Bereich | Bisheriges Verhalten | Änderung |
| --- | --- | --- |
| Wiederholungen im Satzbau | Dieselben Satzwörter in anderer Zufallsreihenfolge galten als neue Aufgabe. | Kennung anhand des zugrunde liegenden Satzes. |
| Wiederholungen beim Lesen | Andere falsche Antwortmöglichkeiten konnten dieselbe Leseaufgabe erneut zulassen. | Kennung anhand des Lesetextes; Reihenfolge der Optionen beeinflusst die Auswahl nicht. |
| Tauschaufgaben | 3 + 7 und 7 + 3 bzw. 4 × 8 und 8 × 4 konnten gemeinsam vorkommen. | Werden innerhalb einer Einheit als dieselbe Aufgabe gezählt. |
| Aufgabenpool | Unbegrenzte Zufallsschleife bei zu wenig unterschiedlichen Aufgaben. | Begrenzte Versuche; im Ausnahmefall kürzere Einheit statt Stillstand. Alle regulären Themen liefern im Test acht Aufgaben. |
| Verdoppeln/Halbieren, Zehnerfreunde | Gewöhnliche Plus- und Minusaufgaben. | Eigene Aufgabenformate für das angekündigte Lernziel. |
| Zahlen vergleichen | Ausschließlich Zahlenfolgen. | Eigenes Vergleichsformat im dafür vorgesehenen Thema. |
| Fehlende Zahlen | Gewöhnliche Rechenaufgaben unter dem irreführenden Titel „Tauschaufgaben“. | Lückenaufgaben und passender Titel. |
| Schriftlich subtrahieren | In Klasse 3 wurden Additionen erzeugt. | Ausschließlich Subtraktionen im passenden Zahlenraum. |
| Zahlenräume | Klasse 3/4 meist zweistellige Zahlen, Klasse 5 höchstens 500 pro Operand. | Grundrechnen bis 20, 100, 1000 bzw. 1 Million; Ergebnisse bleiben im Zahlenraum. Kopfrechenthema Klasse 3 bleibt bis 100. |
| Schriftlich multiplizieren | Lediglich Faktoren bis 12. | Mehrstellige Faktoren; Einmaleins-Training bleibt separat bis 10. |
| Umfang/Fläche | Umfangsthema konnte Flächenberechnung verlangen und umgekehrt. | Reine Umfangs- bzw. Flächenthemen beschränken sich auf ihr Lernziel. |
| Division | Trotz Ankündigung praktisch keine Aufgaben. | Eigene Divisionseinheiten in Klasse 3, 4 und 5 statt wiederholter Bruch-/Prozentthemen. |
| Uhrzeit | „Geld und Uhrzeit“ bestand nur aus Preis-Malaufgaben. | Eigenes Thema mit Zeitspannen zwischen vollen Stunden. |
| Münzen | Ausschließlich Preis-Malaufgaben. | Zehn- und Zwanzig-Cent-Münzen zusammenzählen. |
| Daten | Fehlten vollständig. | Einfache Häufigkeiten vergleichen und summieren in Klasse 1–5. |
| Klasse 4: Kommazahlen | Abstrakte Addition, trotz angekündigter Subtraktion im zweiten Thema. | Addition und Subtraktion mit Geldbezug; passende Titel und Beschreibungen. |
| Klasse 4: Brüche ordnen | Nur Bruchteile einer Menge ausrechnen. | Brüche mit gleichem Nenner vergleichen. |
| Klasse 5: Prozente | Zwei reguläre Themen ohne abgesicherte Lehrplanzuordnung. | Durch Daten und Division ersetzt; Prozentgenerator ist nicht mehr im Curriculum verknüpft. |
| Silben | Statt Silben/Reimen nur Wörter korrigieren. | Silben zählen; Titel verspricht keine noch nicht vorhandenen Reimaufgaben. |
| Verben im Satz | Stattdessen isolierte Wörter nach Wortart bestimmen. | Das Tunwort aus einem kurzen Satz heraussuchen. |
| Wortfamilien | Zufällige zusammengesetzte Wörter. | Gemeinsamen Wortstamm und verwandte Bedeutung erkennen. |
| Komposita | Beliebige Nomenkombinationen wie „FreiheitHund“. | Kuratierte gebräuchliche Wortpaare mit passender Fuge. |
| Lesen Klasse 3/4 | Nur einzelne Sätze und Fragen nach dem handelnden Wort; dieses konnte fälschlich ein Zeitwort wie „Morgen“ sein. | Klasse 3: kurze Texte mit Informationsfragen. Klasse 4: Hauptaussage mehrerer zusammenhängender Sätze auswählen. |
| Kommas Klasse 4 | Die Auswahl schloss sämtliche Kommaaufgaben aus. | Kommaaufgaben sind ab Klasse 4 erreichbar. |
| Zeiten Klasse 5 | Nur Präteritum trotz Ankündigung beider Zeiten. | Präsens und Präteritum kommen vor. |
| Themenbeschreibungen | Versprachen u. a. Nebensätze, Formenlegen und Wortzerlegung ohne passende Aufgaben. | Betroffene Titel und Beschreibungen auf die tatsächlich vorhandenen Übungen eingegrenzt. |

Die vorherige Korrektur der Rechtschreibwortlisten bleibt erhalten: getrennte Wortauswahl pro Klasse statt schwerer Fremdwörter bereits in Klasse 3/4.

Bestehende Themenindizes bleiben erhalten. Neue Aufgabenmodi haben eigene Fortschrittsschlüssel: Frühere Prozentübungen zählen beispielsweise nicht als bereits geübte Datenaufgaben. Gesamtzahl, Münzen und gespeicherte Sitzungen bleiben erhalten; deren historische Titel werden nicht umgeschrieben.

## Einordnung nach Klassen

| Klasse | Aktueller Schwerpunkt | Nächste sinnvolle Ergänzungen |
| --- | --- | --- |
| 1 | Zahlen bis 20, Ergänzen bis 10, Verdoppeln/Halbieren, einfache Formen; Silben, einfache Wörter und Sätze | Laut-Buchstaben-Zuordnung, Anlaute und Reime; bildliche Mengen, Zahlzerlegungen, Lagebeziehungen |
| 2 | Zahlen bis 100, Einmaleins, fehlende Zahlen, Münzen und volle Stunden; Wortarten und Satzbau | Teilen auf Handlungsebene, Uhr ablesen mit Halb-/Viertelstunden, Längen messen; kurze Lesetexte auch ohne starke Grammatikorientierung |
| 3 | Rechnen bis 1000, Einmaleins/Division, Umfang, einfache Bruchteile; kurze Lesetexte und Wortfamilien | Stellenwerte, Überschlagen/Runden, Größenvielfalt, längere zusammenhängende Geschichten, erste Schreibüberarbeitung |
| 4 | Zahlenraum bis 1 Million, mehrstellige Multiplikation, Umfang/Fläche, Geldbeträge, einfache Daten; Textaussagen, Rechtschreibstrategien und Kommas | Division mit Rest und Erklärung der Verfahren, Darstellungswechsel, Diagramme und Zufall, Symmetrie/Körper/Netze, eigenes Schreiben und begründetes Textverständnis |
| 5 | Grundrechnen mit größeren Zahlen, Division, Bruchteile, Dezimalzahlen und Einheiten; Zeiten, Informationen aus Texten und Wortbildung | NRW Gymnasium G9: die Zuordnung innerhalb Klasse 5/6 mit dem schulinternen Plan abstimmen; Rechenregeln, Geometrie und differenziertere Texte ausbauen. Aktuelle Deutschaufgaben bieten zu wenig Steigerung gegenüber Klasse 4. |

## Erweiterung um Klasse 6

Klasse 6 ist auswählbar und wird im gespeicherten Lernstand unterstützt. Sie ergänzt Klasse 5 als Vertiefung der NRW-Erprobungsstufe; eine vollständige Abdeckung aller Kompetenzen wird weiterhin nicht behauptet.

- **Mathematik (11 Themen):** gleichnamige Brüche addieren/subtrahieren, Brüche multiplizieren/dividieren, Kürzen mit gesuchtem Zähler, Dezimalmultiplikation und Division durch ganze Zahlen, Quader-Volumen, arithmetisches Mittel, Punkt-vor-Strich und Dreisatz. Ungleichnamige Bruchaddition, Median, komplexere Geometrie und Darstellung von Daten bleiben Ausbaupunkte.
- **Deutsch (7 Themen):** Rechtschreibstrategien mit eigener Wortliste, sieben Wortarten, Satzglieder, Präsens/Präteritum, Kommas, Textverständnis und Einordnung sowie Medien/Quellen. Neue Aufgabenpools enthalten mindestens acht unterschiedliche Aufgaben. Eigene Texte, längere Lektüren, mündliche Kommunikation und vollständige Tempus-/Kasusarbeit bleiben offen.
- **Antwortprüfung:** Bruchaufgaben und Mittelwerte akzeptieren genaue Brüche wie `2/6`; nahe falsche Dezimalwerte werden nicht durch die ältere Rundungstoleranz akzeptiert. Auf Mobilgeräten verwenden diese Aufgaben eine Texteingabe, damit `/` eingegeben werden kann. Auch bei neuer Dezimalrechnung wird genauer verglichen.
- **Schreibvarianten:** Bei „selbstständig“ wird auch „selbständig“ akzeptiert.


## Noch offene Verbesserungen, priorisiert

1. **Antworten fair bewerten.** Satzbau und Zeichensetzung verwenden noch häufig eine einzige Musterlösung. Weitere grammatisch richtige Wortstellungen, zulässige Satzzeichen und Formenvarianten können dadurch abgelehnt werden. Pro Aufgabe ausdrücklich zulässige Varianten hinterlegen oder die Frage so eingrenzen, dass die Lösung eindeutig ist. Freie Texte nicht mit einem einzigen Lösungssatz vergleichen.
2. **Visuelle Darstellungen ergänzen.** Das Formenangebot zählt überwiegend Ecken und Seiten; es übt weder räumliche Vorstellung noch Zeichnen, Spiegeln oder Formenlegen. Datenaufgaben sind bisher Textaufgaben, noch keine Tabellen-/Diagrammaufgaben. Uhrzeitaufgaben ersetzen keine Uhrdarstellung.
3. **Verfahren statt nur Ergebnisse prüfen.** „Schriftlich rechnen“ prüft bislang nur das Endergebnis. Stellenwerte, Überträge, Zwischenschritte und Fehlersuche benötigen eigene Formate. Auch Sachaufgaben sollten mehrere Operationen und begründete Entscheidungen verlangen; aktuelle Geldaufgaben sind überwiegend Preis-mal-Anzahl.
4. **Deutsch verbreitern.** Schreiben, Planen und Überarbeiten eigener Texte, Handschrift, Sprechen/Zuhören, Medien und literarische Auseinandersetzung fehlen. Dafür sind andere Aufgaben- und Rückmeldungsformen erforderlich als automatische Richtig/Falsch-Eingaben.
5. **Echte Lernprogression.** Rechtschreibung und erste Leseformate sind jetzt abgestuft; viele andere Wort-, Satz- und Aufgabenpools bleiben zwischen Klassen ähnlich. Einstiegsdiagnose und Schwierigkeitsanpassung fehlen. Das Feld `difficulty` steuert bisher keine allgemeine Anpassung.
6. **Wiederholungssteuerung seit 13. November ergänzt.** Größere Inhaltspools und eine lokal gespeicherte Aufgabenhistorie bevorzugen neue bzw. länger nicht gezeigte Aufgaben auch beim Neustart. Umfang, Qualitätsreview und verbleibende Grenzen stehen in [Aufgabenvielfalt und Qualitätsprüfung](CONTENT_VARIETY.md). Eine adaptive Wiederholung gezielt nach individuellen Fehlern bleibt ein möglicher nächster Schritt.

## Prüfung

`node test_curriculum.js` prüft unter anderem alle Themen auf acht inhaltlich unterschiedliche Aufgaben, die neuen Rechenformate anhand ihrer Aufgabenangaben und Ergebnisse, Zahlenraumgrenzen, gezielte Operationsauswahl, beide Zeitformen sowie den Abbruch bei einer konstanten Zufallsfolge. Die vollständige Themenauswahl wird zusätzlich mit vier unterschiedlichen Zufallsstarts durchlaufen. Das sind automatisierte Funktionsprüfungen, keine Validierung durch eine Lehrkraft oder ein Nachweis vollständiger Kompetenzabdeckung.
