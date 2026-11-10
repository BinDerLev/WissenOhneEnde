# Projektfahrplan für LernLabor

Dieser Fahrplan beschreibt die nächsten sinnvollen Entwicklungs- und
Qualitätssicherungsschritte für LernLabor. Er ist so aufgebaut, dass die
Arbeiten nacheinander umgesetzt und anhand konkreter Ergebnisse überprüft
werden können. Die Schritte betreffen die Lern-App, den GameHub, die Spiele,
die Bedienungsanleitung und die Veröffentlichung.

## Projektüberblick und bekannte Ausgangslage

LernLabor ist eine kostenlose Lern- und Spieleplattform, die direkt im Browser
läuft. Die Lern-App bietet Mathe- und Deutschthemen für die Klassen 1 bis 5.
Nach abgeschlossenen Lerneinheiten wird Fortschritt gespeichert und es können
Münzen für Spiele verdient werden. Im GameHub gibt es mehrere Spiele sowie
Suche, Genrefilter, Favoriten, Spielhistorie und Erfolge. Fortschritt und
Spielstände werden lokal auf dem jeweiligen Gerät gespeichert.

Die Anwendung besteht überwiegend aus HTML, CSS und JavaScript ohne erkennbaren
Build-Schritt. Der vorhandene Prüfbefehl lautet:

```bash
node test_curriculum.js
```

Dieser Testbefehl wurde bei der Erstellung des Fahrplans ausgeführt; die
vorhandenen Tests sind dabei erfolgreich durchgelaufen. In
`Lern-App/script.js` befindet sich außerdem ein Kommentar, der auf einen
Fehler hinweist, aber nicht beschreibt, welches Verhalten fehlerhaft ist.
Dieser Hinweis ist zunächst ein Untersuchungsauftrag und noch keine
eingegrenzte Fehlerdiagnose.

## Ziele für die nächsten Entwicklungsphasen

- Fehlerhinweise und reproduzierbare Probleme systematisch untersuchen.
- Den Lern- und Spielfluss mit Regressionstests absichern.
- Lerninhalte, Benutzeroberfläche und lokale Speicherung verlässlich prüfen.
- Die Plattform auf Mobilgeräten, mit Tastatur und mit assistiven Funktionen
  besser überprüfbar machen.
- Veröffentlichung und spätere Pflege mit nachvollziehbaren Prüfschritten
  vereinfachen.

## Umsetzungsplan

### Schritt 1: Ausgangszustand dokumentieren

**Ziel:** Vor Änderungen einen nachvollziehbaren Überblick über den aktuellen
Zustand und die vorhandenen Prüfmöglichkeiten schaffen.

**Arbeiten:**

- `node test_curriculum.js` ausführen und das Ergebnis festhalten.
- Lern-App, Startseite, Bedienungsanleitung und GameHub einmal öffnen.
- Die vorhandenen Hauptabläufe notieren: Thema auswählen, Einheit bearbeiten,
  Einheit abschließen, Münzen erhalten, Spiel starten und zum GameHub
  zurückkehren.
- Auffälligkeiten mit Browser, Gerät, Schritten zur Reproduktion und
  erwarteter gegenüber tatsächlicher Anzeige dokumentieren.

**Abschlusskriterien:**

- Der bekannte Testbefehl ist ausgeführt.
- Sichtbare Probleme sind mit reproduzierbaren Schritten erfasst oder als
  noch nicht reproduziert gekennzeichnet.
- Es ist klar, welche Abläufe vor und nach Änderungen erneut geprüft werden
  müssen.

### Schritt 2: Fehlerhinweis im Lern-App-Skript untersuchen

**Ziel:** Herausfinden, worauf der bestehende Kommentar mit dem Fehlerhinweis
konkret verweist.

**Arbeiten:**

- Den Kommentar und den umgebenden Programmcode in `Lern-App/script.js`
  untersuchen.
- Die vermutete Funktion in der Lern-App ausführen und den Fehler gezielt
  reproduzieren.
- Eingaben, ausgewähltes Fach, Klassenstufe, Thema und gespeicherten
  Fortschritt beim Auftreten des Problems prüfen.
- Falls sich der Hinweis nicht reproduzieren lässt, den Kommentar als
  ungeklärt markieren, statt ohne Beleg eine Änderung vorzunehmen.

**Abschlusskriterien:**

- Ursache, tatsächliches Verhalten und erwartetes Verhalten sind beschrieben,
  oder es ist festgehalten, dass der Fehler mit den verfügbaren Informationen
  nicht reproduziert werden konnte.
- Es gibt vor der Fehlerbehebung einen konkreten Testfall oder eine klare
  manuelle Reproduktionsanleitung.

### Schritt 3: Bestätigten Fehler beheben und Regression verhindern

**Ziel:** Einen in Schritt 2 bestätigten Fehler gezielt korrigieren, ohne
unabhängige Bereiche umzubauen.

**Arbeiten:**

- Einen passenden Regressionstest in `test_curriculum.js` ergänzen, der das
  fehlerhafte Verhalten vor der Korrektur zuverlässig sichtbar macht.
- Nur die betroffene Logik ändern und das etablierte Verhalten der übrigen
  Lern-App erhalten.
- Den nicht mehr zutreffenden Fehlerkommentar entfernen oder durch eine
  sachliche Erklärung ersetzen, falls sie weiterhin nötig ist.
- Den Regressionstest sowie die gesamte vorhandene Testsuite erneut ausführen.

**Abschlusskriterien:**

- Der neue Test schlägt fehl, wenn der Fehler wieder eingeführt wird.
- Der Fehler ist durch den Test oder durch dokumentierte manuelle Schritte
  behoben nachgewiesen.
- `node test_curriculum.js` läuft vollständig erfolgreich durch.

### Schritt 4: Lernablauf vom Einstieg bis zum Abschluss absichern

**Ziel:** Sicherstellen, dass eine Lerneinheit in allen üblichen Fällen
verständlich gestartet und abgeschlossen werden kann.

**Arbeiten:**

- Fach, Klassenstufe und Thema nacheinander auswählen und prüfen, ob die
  angezeigten Inhalte zur Auswahl passen.
- Aufgaben beantworten und prüfen, ob Rückmeldungen verständlich und dem
  Ergebnis entsprechend sind.
- Eine Einheit erfolgreich abschließen und kontrollieren, ob Abschluss,
  Punktestand und nächste mögliche Aktion eindeutig angezeigt werden.
- Prüfen, wie sich ein Verlassen oder Neuladen während einer Einheit verhält,
  und dieses Verhalten als erwartete Produktentscheidung festhalten.
- Wo sich Verhalten automatisiert testen lässt, zusätzliche Fälle in
  `test_curriculum.js` abdecken.

**Abschlusskriterien:**

- Der normale Ablauf von der Themenwahl bis zur Abschlussanzeige funktioniert.
- Erfolgs- und Fehlerrückmeldungen sind unterscheidbar und verständlich.
- Unterbrechungen führen zu einem nachvollziehbaren Zustand und nicht zu
  widersprüchlichem Fortschritt.

### Schritt 5: Fortschritt, Münzen und Spielzugang als zusammenhängenden Ablauf prüfen

**Ziel:** Verhindern, dass Abschluss einer Einheit, lokaler Fortschritt und
Spielzugang auseinanderlaufen.

**Arbeiten:**

- Vor dem Abschluss einer Einheit den aktuellen Fortschritt und Münzbestand
  erfassen.
- Nach einem erfolgreichen Abschluss prüfen, ob genau die erwartete Belohnung
  gutgeschrieben und der gespeicherte Fortschritt aktualisiert wird.
- Wiederholtes Abschließen und Neuladen prüfen, insbesondere ob eine Einheit
  unbeabsichtigt doppelte Belohnungen erzeugt.
- Den Spielzugang mit keinem, einem und mehreren verfügbaren Spielzügen
  prüfen.
- Die Anzeige des GameHub mit den gespeicherten Werten vergleichen.

**Abschlusskriterien:**

- Lernfortschritt, Münzbestand, verbleibende Spielzüge und sichtbare
  Zugangssperre stimmen miteinander überein.
- Wiederholungen und Neuladen erzeugen keine unbeabsichtigten zusätzlichen
  Belohnungen.
- Relevante Zustandsübergänge sind durch Tests oder nachvollziehbare manuelle
  Prüfschritte abgesichert.

### Schritt 6: Lokale Speicherstände auf Fehler- und Grenzfälle testen

**Ziel:** Dafür sorgen, dass beschädigte, veraltete oder unvollständige
Browserdaten die Anwendung nicht unbenutzbar machen.

**Arbeiten:**

- Vorhandene Tests für ungültige Lern-App- und GameHub-Daten überprüfen und
  fehlende Grenzfälle ergänzen.
- Leere, unvollständige, falsch formatierte und außerhalb des gültigen
  Wertebereichs liegende Speicherwerte prüfen.
- Verhalten bei fehlendem Speicherwert und bei normalem Erststart testen.
- Prüfen, ob ein sicherer Standardzustand wiederhergestellt wird und ob
  gespeicherte gültige Daten dabei erhalten bleiben.
- Die Folgen einer manuellen Datenlöschung in der Bedienungsanleitung
  nachvollziehbar erklären.

**Abschlusskriterien:**

- Ungültige Daten führen nicht zu einem Absturz oder zu einer Erfolgsmeldung
  für einen nicht erfolgten Vorgang.
- Gültige Fortschrittsdaten bleiben bei der Bereinigung ungültiger Felder
  erhalten, sofern das aktuelle Datenformat dies zulässt.
- Tests beschreiben das erwartete Wiederherstellungsverhalten eindeutig.

### Schritt 7: Alle registrierten Spiele vollständig durchspielen

**Ziel:** Den gemeinsamen Start-, Verbrauchs- und Rückkehrablauf für jedes
Spiel überprüfen.

**Arbeiten:**

- Die im GameHub registrierten Spiele der Reihe nach öffnen.
- Bei jedem Spiel prüfen, ob es korrekt startet und ob Spielsteuerung und
  Darstellung benutzbar sind.
- Eine Runde beenden und kontrollieren, ob der Spielzug korrekt verbraucht
  wird und der Rücksprung zum GameHub funktioniert.
- Verhalten bei null verbleibenden Spielzügen und bei direktem Neuladen der
  Spielseite prüfen.
- Abweichungen zwischen Spielen erfassen und nur dort beheben, wo sie den
  vorgesehenen gemeinsamen Ablauf beeinträchtigen.

**Abschlusskriterien:**

- Jedes registrierte Spiel wurde mindestens einmal gestartet und beendet.
- Rundenzähler und Rückkehrziel verhalten sich bei allen Spielen wie
  vorgesehen.
- Für jedes nicht abgeschlossene oder abweichende Spiel gibt es einen
  dokumentierten Befund.

### Schritt 8: GameHub-Suche, Filter und Favoriten kombinatorisch prüfen

**Ziel:** Sicherstellen, dass Suche, Genrefilter und Favoritenfilter auch in
Kombination korrekte Ergebnisse liefern.

**Arbeiten:**

- Suche nach Titel, Genre und Stichwort testen, einschließlich einer Suche
  ohne Treffer.
- Jeden Genrefilter einzeln anwenden und die angezeigten Spiele überprüfen.
- Favoriten hinzufügen und entfernen; danach die Seite neu laden und den
  gespeicherten Zustand kontrollieren.
- Suche, Genre und Favoritenfilter in verschiedenen Kombinationen aktivieren
  und wieder zurücksetzen.
- Prüfen, ob ein leerer Ergebniszustand verständlich angezeigt und nach
  Änderung der Filter wieder entfernt wird.

**Abschlusskriterien:**

- Filter lassen sich miteinander kombinieren und unabhängig zurücksetzen.
- Angezeigte Ergebnisse entsprechen allen gleichzeitig aktiven Filtern.
- Favoriten bleiben nach einem Neuladen erhalten und beeinflussen weder
  Fortschritt noch Spielzug-Zähler.

### Schritt 9: Spielfortschritt, Rekorde und Erfolge überprüfen

**Ziel:** Verlässliche und verständliche Fortschrittsanzeigen im GameHub
gewährleisten.

**Arbeiten:**

- Nach einzelnen und wiederholten Spielrunden die Gesamtzahl der Runden,
  spielbezogene Rekorde, zuletzt gespielte Titel und Erfolge kontrollieren.
- Prüfen, ob die Reihenfolge und Begrenzung der Historie sinnvoll und
  konsistent sind.
- Gespeicherte Daten mit der sichtbaren Anzeige vergleichen.
- Leere Historie und vollständig zurückgesetzte lokale Daten prüfen.
- Texte und Fortschrittsanzeigen darauf kontrollieren, dass Bedingungen und
  Zwischenstände nachvollziehbar sind.

**Abschlusskriterien:**

- Fortschrittsanzeigen stimmen mit den tatsächlich gespeicherten Spieldaten
  überein.
- Erfolge werden nur dann angezeigt, wenn ihre Bedingungen erfüllt sind.
- Leere und teilweise gefüllte Zustände sind verständlich dargestellt.

### Schritt 10: Responsives Verhalten auf Mobilgerät und Desktop prüfen

**Ziel:** Die zentralen Lern- und Spielfunktionen auf unterschiedlichen
Bildschirmgrößen nutzbar halten.

**Arbeiten:**

- Startseite, Lern-App, Bedienungsanleitung und repräsentative Spiele auf
  schmalem Mobilbildschirm, Tabletbreite und Desktopbreite öffnen.
- Überlauf, abgeschnittene Texte, überlappende Bedienelemente und schwer
  erreichbare Aktionen erfassen.
- Navigation und Spielsteuerungen auf Touch-Bedienung prüfen.
- Betroffene CSS-Regeln gezielt korrigieren und die betroffenen Seiten erneut
  auf allen drei Größen prüfen.

**Abschlusskriterien:**

- Inhalte und zentrale Aktionen sind ohne horizontales Scrollen erreichbar,
  sofern dieses für ein Spiel nicht ausdrücklich erforderlich ist.
- Texte bleiben lesbar und Bedienelemente überlagern sich nicht.
- Die Kernabläufe können auf einem schmalen Bildschirm abgeschlossen werden.

### Schritt 11: Tastaturbedienung und Barrierefreiheit prüfen

**Ziel:** Zentrale Funktionen auch ohne Maus bedienbar machen und unnötige
Barrieren bei Struktur und Rückmeldungen erkennen.

**Arbeiten:**

- Mit Tab, Umschalt+Tab, Eingabetaste und Leertaste durch Navigation, Auswahl,
  Aufgaben, Filter und Favoriten gehen.
- Sichtbarkeit und sinnvolle Reihenfolge des Tastaturfokus prüfen.
- Kontrollieren, ob interaktive Elemente passende Beschriftungen und
  Zustandsangaben haben.
- Prüfen, ob wichtige Rückmeldungen wie Suchergebnisse, Antworten und
  Fortschritt programmatisch erkennbar sind.
- Kontraste und Überschriftenstruktur der zentralen Seiten stichprobenartig
  kontrollieren.

**Abschlusskriterien:**

- Die Hauptfunktionen können mit der Tastatur erreicht und ausgelöst werden.
- Fokus ist sichtbar und springt in einer nachvollziehbaren Reihenfolge.
- Zustände wie ausgewählte Filter oder Favoriten sind nicht allein durch Farbe
  erkennbar.
- Kritische Probleme werden mit betroffenen Seiten und Reproduktionsschritten
  festgehalten.

### Schritt 12: Lerninhalte und Aufgabenqualität stichprobenartig prüfen

**Ziel:** Fachliche Richtigkeit, altersgerechte Sprache und passende
Aufgabenlösungen für beide Fächer überprüfen.

**Arbeiten:**

- Für Mathe und Deutsch in jeder Klassenstufe mehrere Themen aus den
  vorhandenen Curricula auswählen.
- Beschreibung, Erklärung, Aufgabenstellung, erwartete Antwort und
  Rückmeldung jeweils gemeinsam prüfen.
- Bei Mathematik besonders auf Randwerte, Rechenwege, Einheiten und
  Antwortformate achten.
- Bei Deutsch besonders auf eindeutige Aufgabenstellungen, zulässige
  Schreibweisen und angemessene Rückmeldungen achten.
- Fehler und Themenlücken nach Fach, Klassenstufe und Thema dokumentieren.

**Abschlusskriterien:**

- Für beide Fächer und alle Klassenstufen liegt eine dokumentierte Stichprobe
  vor.
- Erkannte fachliche Fehler sind korrigiert und mit passenden Tests
  abgesichert.
- Noch offene inhaltliche Lücken sind als konkrete Nacharbeiten beschrieben.

### Schritt 13: Bedienungsanleitung mit der tatsächlichen Anwendung abgleichen

**Ziel:** Verhindern, dass die Dokumentation Funktionen oder Abläufe
beschreibt, die sich in der Website anders verhalten.

**Arbeiten:**

- Anleitungsabschnitte zu Lern-App, Aufgaben, Münzen, Spielen, Filtern,
  Favoriten und lokaler Speicherung mit der aktuellen Website vergleichen.
- Veraltete Bezeichnungen, Screenshots oder nicht mehr vorhandene Funktionen
  erkennen und aktualisieren.
- Prüfen, ob Links in der Anleitung auf die erwarteten Seiten führen.
- Texte so formulieren, dass Kinder und Eltern die beschriebenen Schritte
  ohne zusätzliche technische Kenntnisse nachvollziehen können.

**Abschlusskriterien:**

- Alle beschriebenen Hauptabläufe entsprechen der aktuellen Website.
- Interne Links in der Anleitung funktionieren.
- Screenshots und Beschriftungen widersprechen der aktuellen Oberfläche nicht.

### Schritt 14: Wiederholbare Prüfungen und Projektdokumentation verbessern

**Ziel:** Das Testen vor weiteren Änderungen und Veröffentlichungen
vereinheitlichen.

**Arbeiten:**

- Den bestehenden Testbefehl und seine Voraussetzungen in der README
  dokumentieren.
- Eine kurze manuelle Prüfliste für Lernabschluss, Münzen, Spielzugang,
  GameHub-Filter und Spielrückkehr bereitstellen.
- Prüfschritte so formulieren, dass sie ohne Kenntnis der Implementierung
  reproduzierbar sind.
- Abhängigkeiten oder Testwerkzeuge nur dann ergänzen, wenn die bestehenden
  Prüfungen eine konkrete Lücke haben.

**Abschlusskriterien:**

- Eine neue Entwicklerin oder ein neuer Entwickler kann den Testbefehl
  auffinden und ausführen.
- Die wichtigsten manuellen Prüfungen sind als eindeutige Schritte
  dokumentiert.
- Zusätzliche Werkzeuge sind mit einem konkreten Nutzen für das Projekt
  begründet.

### Schritt 15: Veröffentlichung und abschließende Qualitätskontrolle

**Ziel:** Änderungen vor und nach der Veröffentlichung nachvollziehbar
überprüfen.

**Arbeiten:**

- Vor der Veröffentlichung `node test_curriculum.js` ausführen.
- Geänderte Seiten und Ressourcen auf fehlende Dateien und fehlerhafte interne
  Verweise prüfen.
- Die Website in einer Vorschau oder nach der Veröffentlichung im Browser
  kontrollieren.
- Lern-App und mindestens einen vollständigen Spielablauf auf der tatsächlich
  bereitgestellten Website durchspielen.
- Nach dem Deployment prüfen, ob Navigation, Styles, Bilder und lokale
  Speicherfunktionen korrekt geladen werden.

**Abschlusskriterien:**

- Tests sind erfolgreich und die geänderten Ressourcen sind erreichbar.
- Die veröffentlichte Website wurde im Browser geprüft.
- Ein vollständiger Lern- und Spielablauf funktioniert auch nach der
  Veröffentlichung.
- Offene bekannte Probleme sind sichtbar dokumentiert und nicht als erledigt
  dargestellt.

## Detaillierte Vorgehensweise und Reihenfolge

Die folgenden Phasen bauen aufeinander auf. Innerhalb jeder Phase gilt:
zuerst den Ist-Zustand feststellen, dann eine klar abgegrenzte Änderung oder
Prüfung durchführen und zum Schluss anhand der Kriterien entscheiden, ob die
Arbeit abgeschlossen ist. So werden unbestätigte Vermutungen nicht vorschnell
zu Änderungen und Auswirkungen auf andere Teile der Plattform früh erkannt.

### Phase A: Vorbereiten und den Ist-Zustand festhalten

**Zugehörige Schritte:** 1 und 2.

1. Mit einem sauberen Überblick beginnen: prüfen, welche Dateien und Abläufe
   zum anstehenden Problem gehören und welche bereits funktionierenden
   Funktionen davon abhängen.
2. `node test_curriculum.js` vor Änderungen ausführen. Fehler, die bereits
   vorher auftreten, getrennt notieren, damit sie nicht fälschlich der späteren
   Arbeit zugeschrieben werden.
3. Die betroffene Seite in einem Browser öffnen und den relevanten Ablauf
   einmal ohne Änderungen ausführen.
4. Für jede Auffälligkeit festhalten: Startzustand, genaue Eingaben,
   Reihenfolge der Aktionen, sichtbares Ergebnis und erwartetes Ergebnis.
5. Den Hinweis in `Lern-App/script.js` als offene Frage behandeln. Erst
   entscheiden, ob ein reales Problem vorliegt, wenn ein konkreter Ablauf den
   Fehler zeigt oder der Code das falsche Verhalten eindeutig belegt.
6. Den Prüfbereich so eingrenzen, dass klar ist, welche Funktion korrigiert
   werden müsste und welche anderen Abläufe anschließend als Regressionstest
   dienen.

**Übergang zur nächsten Phase:** Es gibt eine reproduzierbare Beschreibung
oder eine begründete Feststellung, dass der Fehlerhinweis aktuell nicht
verifiziert werden kann. Ohne diese Grundlage wird keine spekulative
Fehlerkorrektur begonnen.

### Phase B: Fehler testbar machen und gezielt korrigieren

**Zugehöriger Schritt:** 3.

1. Den erwarteten Zustand vor der Korrektur als Test formulieren. Ein
   Regressionstest sollte möglichst dieselben Eingaben und Randbedingungen
   verwenden, die den Fehler sichtbar gemacht haben.
2. Den neuen Test vor der Implementierungsänderung ausführen. Wenn er den
   Fehler nicht zuverlässig erkennt, den Testfall verbessern, statt sich auf
   eine nur indirekte Prüfung zu verlassen.
3. Die kleinste Änderung vornehmen, die das falsche Verhalten an seiner
   Ursache korrigiert. Unabhängige Umstrukturierungen gehören nicht in diesen
   Arbeitsschritt.
4. Den Regressionstest erneut ausführen und prüfen, dass nun der erwartete
   Zustand erreicht wird.
5. Die gesamte bestehende Testsuite ausführen, um sicherzustellen, dass die
   Änderung keine bereits abgesicherten Funktionen beschädigt.
6. Den ursprünglichen Ablauf im Browser wiederholen und zusätzlich mindestens
   einen angrenzenden Normalfall prüfen.
7. Den alten Kommentar entfernen oder präzisieren, damit er keine unklare
   Fehlerbehauptung zurücklässt.

**Übergang zur nächsten Phase:** Der konkrete Fehler ist behoben und sowohl
durch den Regressionstest als auch durch die passende Funktionsprüfung
abgesichert. Wenn kein Fehler bestätigt wurde, wird diese Phase als
„unverändert, nicht reproduziert“ dokumentiert und nicht künstlich durch eine
Änderung abgeschlossen.

### Phase C: Kernabläufe und Zustandsübergänge absichern

**Zugehörige Schritte:** 4 bis 9.

Diese Phase prüft die Plattform als zusammenhängenden Ablauf und nicht nur
einzelne Schaltflächen. Besonders wichtig sind die Übergänge zwischen
Lern-App, lokal gespeicherten Daten, Spielzugang und GameHub.

1. Mit dem Lernablauf beginnen: Thema auswählen, Aufgaben beantworten, eine
   Einheit abschließen und die Abschlussanzeige prüfen.
2. Den Ausgangszustand vor einer Belohnung notieren und nach dem Abschluss
   mit Fortschritt, Münzen und freigeschalteten Spielzügen vergleichen.
3. Den Ablauf mit verschiedenen Ausgangswerten wiederholen, darunter
   Erststart, bereits gespeicherter Fortschritt und erneutes Laden der Seite.
4. Ungültige und unvollständige lokale Daten gezielt testen. Dabei prüfen,
   dass gültige Daten nicht unnötig verloren gehen und die Benutzeroberfläche
   einen nachvollziehbaren Zustand zeigt.
5. Danach jedes Spiel aus dem Katalog starten und bis zum vorgesehenen
   Rundenende spielen. Spielverbrauch und Rückkehr zum GameHub direkt nach
   jeder Runde kontrollieren.
6. Die GameHub-Funktionen Suche, Genre und Favoriten zunächst einzeln und
   anschließend kombiniert testen. Nach jeder Filteränderung kontrollieren,
   ob Ergebnisliste und Leerzustand stimmen.
7. Rekorde, Erfolge und zuletzt gespielte Titel nach Einzel- und
   Wiederholungsspielen mit den gespeicherten Werten vergleichen.
8. Für jeden gefundenen Fehler einen eigenen konkreten Fall festhalten.
   Änderungen, Tests und manuelle Prüfungen möglichst auf ein klar
   abgegrenztes Verhalten beziehen.
9. Nach Änderungen an gemeinsam genutzter Spiellogik alle betroffenen Spiele
   erneut prüfen; eine erfolgreiche Prüfung nur eines Spiels reicht dann
   nicht als Nachweis für die übrigen.

**Übergang zur nächsten Phase:** Lernabschluss, Belohnungen, Datenpersistenz,
Spielstart und Rückkehr sind in den getesteten Fällen konsistent. Die
Filter- und Fortschrittsanzeigen zeigen den jeweils gespeicherten Zustand
korrekt an.

### Phase D: Bedienbarkeit auf Geräten und mit Tastatur prüfen

**Zugehörige Schritte:** 10 und 11.

1. Für jede zentrale Seite mindestens drei Darstellungsbereiche prüfen:
   schmaler Mobilbildschirm, Tabletbreite und Desktop.
2. Pro Darstellungsbereich zuerst Navigation und Hauptinhalt, danach
   Aufgabenfelder und Aktionsschaltflächen kontrollieren.
3. Überlauf, Überlagerungen, abgeschnittene Texte, zu kleine Ziele und
   schwer erreichbare Aktionen mit konkreter Seite und Bildschirmgröße
   festhalten.
4. Dieselben Kernfunktionen ausschließlich mit der Tastatur bedienen. Mit
   Tab und Umschalt+Tab durch die Seite gehen und interaktive Elemente mit
   Eingabetaste oder Leertaste auslösen.
5. Währenddessen Fokusreihenfolge, sichtbaren Fokus, verständliche
   Beschriftungen und erkennbare Zustände prüfen.
6. Einen festgestellten Mangel einzeln beheben und sowohl den betroffenen
   Bildschirmbereich als auch die benachbarten Größen erneut kontrollieren.
7. Nach CSS-Änderungen auch eine Seite ohne die betroffene Komponente
   stichprobenartig prüfen, falls gemeinsame Layoutregeln verändert wurden.

**Übergang zur nächsten Phase:** Die Hauptfunktionen sind in den betrachteten
Größen erreichbar und die Kernabläufe lassen sich mit der Tastatur bedienen.
Noch offene Barrieren werden konkret beschrieben, nicht nur allgemein als
„Barrierefreiheit prüfen“ vermerkt.

### Phase E: Inhalte und Dokumentation fachlich abgleichen

**Zugehörige Schritte:** 12 und 13.

1. Eine Prüfliste mit beiden Fächern und den Klassenstufen 1 bis 5 anlegen,
   damit keine Jahrgangsstufe bei der Stichprobe ausgelassen wird.
2. Für jede Kombination Themen auswählen und jeweils Thema, Erklärung,
   Aufgabenstellung, generierte Aufgabe, erwartete Antwort und Rückmeldung
   gemeinsam prüfen.
3. Bei Mathe Aufgabenwerte selbst nachrechnen und Sonderfälle wie Null,
   Übergänge zwischen Stellenwerten, Brüche oder Einheiten berücksichtigen.
4. Bei Deutsch kontrollieren, ob Aufgaben eindeutig sind und akzeptierte
   Antworten nicht durch unnötig enge Schreibweisen ausgeschlossen werden.
5. Fehler mit genauer Klassenstufe, Thema, Beispielaufgabe und korrektem
   Ergebnis dokumentieren. Inhaltliche Änderungen anschließend ebenfalls
   durch passende Tests absichern.
6. Danach jeden Abschnitt der Bedienungsanleitung mit der aktuellen Website
   vergleichen. Dazu die dort beschriebenen Aktionen wirklich ausführen und
   Links sowie Screenshots auf Aktualität prüfen.
7. Begriffe und Anweisungen vereinheitlichen, damit Anleitung und
   Benutzeroberfläche dieselben Bezeichnungen verwenden.

**Übergang zur nächsten Phase:** Für beide Fächer liegen geprüfte Beispiele
aus allen Klassenstufen vor. Die Anleitung beschreibt die aktuell
vorhandenen Abläufe und verweist nicht auf veraltete Funktionen.

### Phase F: Prüfroutine vervollständigen und Veröffentlichung kontrollieren

**Zugehörige Schritte:** 14 und 15.

1. Die Schritte, die während der vorherigen Phasen wiederholt funktioniert
   haben, zu einer knappen, wiederverwendbaren Prüfliste zusammenfassen.
2. Den Testbefehl und die Voraussetzungen in der Projektdokumentation
   festhalten. Keine neue Abhängigkeit einführen, wenn die vorhandenen
   Prüfungen ausreichen.
3. Vor einer Veröffentlichung zuerst automatisierte Tests ausführen und
   fehlerhafte Ergebnisse beheben oder ausdrücklich als bestehenden,
   unabhängigen Befund dokumentieren.
4. Geänderte HTML-Seiten und Ressourcen auf vorhandene Zieldateien und
   funktionierende interne Verweise prüfen.
5. Die veröffentlichungsnahe Version im Browser öffnen und Navigation,
   Stylesheets, Bilder, Lern-App und GameHub praktisch kontrollieren.
6. Mindestens einen vollständigen Ablauf von der Themenwahl über den
   Lernabschluss bis zum Start und Ende einer Spielrunde durchführen.
7. Nach der Veröffentlichung dieselben kritischen Seiten noch einmal über
   die öffentliche Adresse prüfen. Lokale Dateien oder eine Vorschau allein
   belegen nicht, dass die bereitgestellte Version funktioniert.
8. Ergebnis, bekannte Einschränkungen und verbleibende Fehler für den
   nächsten Arbeitszyklus festhalten.

**Abschluss der Vorgehensweise:** Die Tests sind erfolgreich, die
veröffentlichten Ressourcen laden und ein vollständiger Lern- und Spielablauf
funktioniert auf der bereitgestellten Website.

## Wiederholbarer Arbeitszyklus für jeden einzelnen Punkt

Unabhängig von der Phase sollte jede konkrete Korrektur nach derselben
Arbeitsfolge erfolgen:

1. **Aufgabe abgrenzen:** Ein beobachtbares Problem oder Prüfergebnis benennen
   und nicht mehrere unabhängige Änderungen in einem Punkt vermischen.
2. **Erwartung festlegen:** Beschreiben, was die Anwendung bei den konkreten
   Eingaben anzeigen oder speichern soll.
3. **Ausgangslage prüfen:** Relevante Tests und den betroffenen Browserablauf
   vor der Änderung ausführen.
4. **Reproduktion sichern:** Den Fehlerfall als automatisierten Test
   festhalten, sofern das Verhalten damit angemessen geprüft werden kann.
   Für visuelle oder manuelle Fälle genaue Prüfschritte notieren.
5. **Gezielt umsetzen:** Nur den notwendigen Code, Inhalt oder Text ändern.
6. **Direkt prüfen:** Den neu hinzugefügten Test und den betroffenen Ablauf
   erneut ausführen.
7. **Regression prüfen:** `node test_curriculum.js` und die naheliegenden
   angrenzenden Funktionen testen.
8. **Ergebnis dokumentieren:** Geänderte Dateien, Prüfergebnis und bekannte
   Einschränkungen festhalten.
9. **Abschluss entscheiden:** Den Punkt nur dann als erledigt markieren,
   wenn seine eigenen Abschlusskriterien erfüllt sind.

Wenn eine Prüfung fehlschlägt, wird nicht einfach mit der nächsten Phase
fortgefahren: zuerst ist zu klären, ob der Fehler durch die Änderung
entstanden ist, bereits vorher bestand oder einen fehlenden Test offenlegt.
Anschließend wird die Ursache eingegrenzt und die betroffene Prüfung
wiederholt.

## Prüfroutine nach Änderungen

Nach jeder Änderung an der Lern-App oder am GameHub:

1. `node test_curriculum.js` ausführen.
2. Geänderte Funktion im Browser gezielt prüfen.
3. Einen betroffenen vollständigen Ablauf vom Einstieg bis zum Ergebnis
   durchspielen.
4. Kontrollieren, dass keine nicht betroffenen Filter, Speicherstände,
   Fortschrittsanzeigen oder Spielzugänge unbeabsichtigt verändert wurden.
5. Bei Änderungen an gemeinsam verwendeten Komponenten weitere betroffene
   Seiten und Spiele prüfen.
6. Prüfergebnis und offene Einschränkungen festhalten, bevor der Punkt als
   abgeschlossen markiert wird.

## Fortschritt festhalten

Bei der Umsetzung kann jeder Schritt mit einem der folgenden Zustände versehen
werden:

- **Offen:** noch nicht begonnen.
- **In Arbeit:** Umsetzung oder Prüfung läuft.
- **Wartet:** blockiert; Grund und benötigte Entscheidung festhalten.
- **Erledigt:** Abschlusskriterien wurden überprüft.

Ein Schritt gilt erst dann als erledigt, wenn sein Ergebnis anhand der oben
genannten Kriterien überprüft wurde. Nicht reproduzierte Vermutungen und
noch offene Prüfungen sollen ausdrücklich als solche stehen bleiben.
