## Erweiterungsplan für die Spiele – Umsetzungsvorbereitung

Ziel: Die vorhandenen Spiele um Suchtfaktor, Fortschritt und Wiederholungswert erweitern, ohne die Kernmechanik zu zerstören. Die Maßnahmen werden in kleinen, testbaren Schritten umgesetzt.

### 1) Priorisierung

Die Erweiterungen werden nach dieser Reihenfolge umgesetzt:
1. Sichtbarer Fortschritt
2. Upgrades / Shop / Ressourcen
3. Highscore / Streaks / Ziele
4. Power-Ups / Bonusmechaniken
5. UI-Verbesserung / Feedback / Animationen
6. Balancing und Wiederholbarkeit

Das bedeutet: Zuerst muss ein Spiel deutlich besser spürbar machen, dass man sich verbessert hat. Danach kommt die Motivation, noch eine Runde zu spielen.

---

### 2) Grundprinzip für alle Spiele

Jedes Spiel erhält im Laufe der Erweiterung diese vier Basisbausteine:
- Punkte / Fortschritt
- Ressourcen oder Coins
- Upgrade-System
- Ziele / Challenges / Highscore

Damit entsteht ein klarer Loop:
- Spiel spielen
- Punkte sammeln
- Upgrade kaufen
- neue Runde starten
- stärker werden
- „noch eine Runde“ spielen

---

### 3) Spielweise pro Spiel

#### 3.1 2048

Erweiterungen:
- Highscore und Bestscore mit Speicherung
- Daily Challenge oder Ziel-Mode
- Undo / Boost-Kraft
- Kombination aus Punktebonus + Combo-Multiplikator
- Visualisierung von „bestem Zug“ und „besten Moves"

Umsetzungsschritte:
1. Score-, Bestscore-, Undo-Funktion sauber absichern
2. Bonus-Mechanik für steigende Kombinationen einbauen
3. Zielsystem hinzufügen (z. B. 128, 256, 512 erreicht)
4. UI mit Fortschrittsanzeige verbessern
5. Balancing und Tastatur-Feedback testen

Checkliste:
- [ ] Spiel bleibt intuitiv
- [ ] Highscore ist sichtbar
- [ ] Undo funktioniert zuverlässig
- [ ] Bonus-Mechanik wirkt spürbar
- [ ] Keine Überkomplexität in den Regeln

#### 3.2 Snake

Erweiterungen:
- Obst-Arten mit unterschiedlichen Werten
- Power-Ups (Schild, Slow-Motion, Magnet, Zweifachpunkt)
- Level / Geschwindigkeitserhöhung
- Shop / Upgrade-Mechanik für Snake
- Daily Challenge oder spezielle Modi

Umsetzungsschritte:
1. Obstsystem erweitern
2. Power-Ups einbauen
3. Level-Progression und Geschwindigkeitsabstufung ergänzen
4. Upgrade-Shop implementieren
5. Visuals und Feedback anpassen

Checkliste:
- [ ] Steuerung bleibt flüssig
- [ ] Power-Ups sind verständlich
- [ ] Schwierigkeit steigt kontrolliert
- [ ] Shop ist klar und motivierend
- [ ] Verlorene Runde fühlt nicht unfair an

#### 3.3 Asteroids

Erweiterungen:
- Wellen mit Bossen oder Hüpfpunkten
- Upgrades für Schiff, Schuss, Beweglichkeit und Schutz
- Spezialattacken wie Laser, Schutzschild, Explosionsschuss
- Missionen / Levelziele
- Coins zum Kaufen von Upgrades nach dem Run

Umsetzungsschritte:
1. Wellenlogik und score bonus ergänzen
2. Upgrade-System für Schiff und Schuss einbauen
3. Spezialfähigkeit ergänzen
4. Level- und Missionen-UI ergänzen
5. Balancing testen

Checkliste:
- [ ] Runden sind kurz und spannend
- [ ] Upgrades sind sichtbar und spürbar
- [ ] Spiel bleibt fair und kontrollierbar
- [ ] Boss-/Wellen-Mechanik erhöht Motivation
- [ ] Rundenerfolge sind klar sichtbar

#### 3.4 Breakout

Erweiterungen:
- Ball-Varianten mit speziellen Effekten
- Power-Ups (vergrößertes Paddel, Mehrfachball, Laser)
- Level-Progression mit neuen Layouts
- Shop mit Upgrades nach Runde
- Spezialmissionen oder Zeitmodi

Umsetzungsschritte:
1. Power-Ups und Ball-Effekte hinzufügen
2. Level-Layouts mit zunehmender Schwierigkeit bauen
3. Upgrade-System ergänzen
4. Score und Progression aufwerten
5. Feedback und Partikeleffekte verbessern

Checkliste:
- [ ] Regeln bleiben einfach
- [ ] Power-Ups sind spürbar
- [ ] Levels werden variantenreicher
- [ ] Paddel- und Ball-Upgrades sind sinnvoll
- [ ] Sprint- und Marathon-Modi sind gut balanciert

#### 3.5 Neon Runner

Erweiterungen:
- Coins und Shop
- Highscore mit Reward-Loop
- verschiedene Laufstrecken / Leveltypen
- Upgrades für Geschwindigkeit, Schild, Pluspunkte
- tägliche Challenges

Umsetzungsschritte:
1. Shop und Upgrade-System einbauen
2. Coins aus Runs sammeln und anzeigen
3. Laufstreckentypen oder Varianten ergänzen
4. Ziele / Missionslogik ergänzen
5. Geschwindigkeitsbalance testen

Checkliste:
- [ ] Laufen bleibt spannend
- [ ] Upgrades verbessern das Spiel spürbar
- [ ] Chanceloses Feedback ist klar
- [ ] Game feel bleibt schnell und aufregend
- [ ] Highscore und Reward loop funktionieren stabil

#### 3.6 Lern-App

Erweiterungen:
- Levelsystem
- Coins und Fortschrittsanzeige
- Streaks / Serien
- Themen- und Schwierigkeitsmodi
- Belohnungsbanner / Unlock-System

Umsetzungsschritte:
1. Fortschrittslogik und Levelsystem einbauen
2. Streaks und Zielanzeige ergänzen
3. Coins und Unlock-Banner umsetzen
4. Mehr Auswahl an Aufgaben und Schwierigkeitsstufen
5. Verhalten testen und motivierende Feedbacks hinzufügen

Checkliste:
- [ ] Lerninhalt bleibt verständlich
- [ ] Fortschritt ist sichtbar
- [ ] Einfache Aufgaben bleiben leicht
- [ ] Belohnungssystem motiviert ohne Druck
- [ ] Gameplay bleibt pädagogisch sinnvoll

#### 3.7 Schach

Erweiterungen:
- Schwierigkeitsstufen mit klarer KI-Progression
- Zeitlimit-Modi
- Analyse / Zugverlauf / Undo
- Trainer-Modus für Anfänger
- Taktikübungen oder Zielaufgaben

Umsetzungsschritte:
1. Zughistorie und Undo absichern
2. KI-Stufen auffächern
3. Zeitlimit und Übungsmodus ergänzen
4. Tutorial / Lernhilfe einbauen
5. Spielstatus UX verbessern

Checkliste:
- [ ] Regeln bleiben korrekt
- [ ] Anfänger verstehen das Spiel schnell
- [ ] KI ist ausgewogen
- [ ] Übungsmodus hilft wirklich
- [ ] UI bleibt übersichtlich

---

### 4) Vorgehen während der Umsetzung

Das Projekt wird in mehreren, klar abgegrenzten Phasen gebaut:

Phase 1: Kernspiel stabil halten
- Spiel muss nach Erweiterungen noch vollständig funktionieren
- keine großen Umbauten ohne Zwischenstand

Phase 2: Progression einbauen
- Punkte, Coins, Streaks, Highscore, Ziele
- Nutzer sieht sofort, dass er Fortschritt macht

Phase 3: Upgrade-System ergänzen
- Shop, Verbesserungen, neue Spieloptionen
- keine Überladung der UI

Phase 4: Feedback und Suchtfaktor
- Animationen, Sound, Kombo, Banner, Reward-Loop
- nur wenn das Spiel bereits stabil läuft

Phase 5: Balance und Testing
- jede Funktion einzeln prüfen
- session length, difficulty, fairness, clarity

---

### 5) Checkliste für den gesamten Projektablauf

- [ ] Kernspiel funktioniert stabil
- [ ] Sichtbarer Fortschritt ist eingebaut
- [ ] Punkte und Belohnungen sind klar sichtbar
- [ ] Upgrades oder Shop sind sinnvoll und verständlich
- [ ] Highscore / Ziele / Streaks sind aktiv
- [ ] Power-Ups oder Bonus-Mechaniken sind vorhanden, wenn passend
- [ ] UI ist nicht überladen
- [ ] Jeder neue Effekt wird leicht erklärt
- [ ] Das Spiel bleibt kurz und wiederholbar
- [ ] Das Spiel bleibt fair, auch bei längeren Sessions
- [ ] Das Gesamtgefühl ist „noch eine Runde“ statt „zu viel Chaos“
- [ ] Jeder Teil ist getrennt getestet worden

---

### 6) Entscheidung für die nächste Umsetzung

Die höchste Priorität liegt auf diesen drei Spielen:
1. Snake
2. 2048
3. Neon Runner

Warum?
- Sie haben den größten Suchtfaktor-Potenzial
- Sie sind leicht erweiterbar
- Sie funktionieren gut für kurze, schnelle Sessions
- Sie brauchen weniger komplexe Regeln als Schach oder Lern-App

Diese drei Spiele werden als erste erweitert, danach folgen die restlichen Spiele in zweiter Priorität.

---

### 7) Nächster konkreter Umsetzungsschritt

Als Erstes wird fokussiert an folgenden Schritten gearbeitet:
1. Shop/Upgrade-System für Snake
2. Zielsystem und Highscore für 2048
3. Coins/Progression und Upgrades für Neon Runner

Danach werden die anderen Spiele analog ergänzt, aber nicht gleichzeitig in großem Umfang.

Dies ist der operative Plan, der im nächsten Schritt in die tatsächliche Umsetzung überführt wird.

