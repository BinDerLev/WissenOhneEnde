# LernLabor

LernLabor ist eine kostenlose Lern- und Spieleplattform für Mathe und Deutsch in den Klassen 1 bis 6 sowie Englisch ab Klasse 3. Das Englischangebot orientiert sich an den NRW-Lehrplänen und umfasst 44 Themen mit jeweils mindestens 24 Aufgaben, darunter Wortschatz, Dialoge, Lesen, Hörverstehen und Sprachmittlung. Du kannst direkt im Browser üben und dir abgeschlossene Lerneinheiten mit Münzen für Spiele im GameHub verdienen.

## LernLabor öffnen

Rufe [binderlev.github.io/WissenOhneEnde](https://binderlev.github.io/WissenOhneEnde/) auf. Eine Installation oder ein Benutzerkonto ist nicht erforderlich.

## Schnellstart

1. Wähle **„Jetzt lernen“**.
2. Suche Fach, Klassenstufe und Thema aus.
3. Bearbeite alle acht Aufgaben einer Einheit, um eine Münze zu erhalten.
4. Öffne **„Zu den Spielen“** und starte mit einer Münze eine Spielrunde.

## Ausführliche Bedienungsanleitung

Die [Bedienungsanleitung auf der Website](bedienungsanleitung.html) erklärt Schritt für Schritt, wie du lernst, Aufgaben beantwortest, Spiele suchst und filterst, Favoriten speicherst und deinen Fortschritt ansiehst. Sie enthält außerdem Hinweise zur Elternansicht und zur lokalen Speicherung deiner Daten.

**[Zur ausführlichen Anleitung](bedienungsanleitung.html)**

## Audioqualität prüfen (Dev)

Öffne `Lern-App/audio-review.html` über denselben Webserver wie die Lern-App
(lokal etwa `python3 -m http.server 8000`, dann
`http://localhost:8000/Lern-App/audio-review.html`). Die Ansicht bietet Suche,
Status-, Textart- und Stimmenfilter sowie Sortierung und Seiten mit 20 Aufnahmen.
Bewerte Aufnahmen als richtig oder falsch und ergänze bei Bedarf eine Notiz.
Bewertungen werden je Aufnahmeversion im lokalen Browser gespeichert. Exportiere
sie als `audio-reviews.json`, um sie zu sichern oder auf einem anderen Gerät zu
importieren.

Für die lokale Erzeugung und Übernahme von Korrekturen starte
`node scripts/audio-review-server.cjs` und öffne
`http://127.0.0.1:4177/audio-review.html`. Bewertungen werden damit auch im Projekt
gespeichert. Prüfe die Korrekturen und markiere gelungene Aufnahmen als „Gut“.
**Übernehmen (Anzahl)** kopiert diese fertigen Aufnahmen in den regulären
Audioordner und aktualisiert den aktiven Katalog ohne erneute Generierung.
Stimme, Tempo, Sprechtext und Schnitt bleiben erhalten. Die übernommenen Aufnahmen
bleiben als gut bewertet; offene oder abgelehnte Korrekturen bleiben im Review-Tool.
Die Option **Ersetzte Originaldateien löschen** ist standardmäßig ausgeschaltet.
Ist sie aktiviert, werden nach erfolgreicher Übernahme ausschließlich die ersetzten,
nicht mehr referenzierten Originaldateien gelöscht. Bereits geöffnete Lern-App-Seiten
müssen danach neu geladen werden.

Abgelehnte aktuelle Aufnahmen gezielt ersetzen:

```sh
node scripts/regenerate-english-audio.cjs audio-reviews.json --dry-run
node scripts/regenerate-english-audio.cjs audio-reviews.json
```

Die lokale Kokoro-Installation und Modelle aus `Lern-App/ENGLISCH_NRW.md` werden
benötigt. Der temporäre Stimmenpool enthält Emma (britisches Englisch) und Heart
(amerikanisches Englisch). Standardmäßig wird jeweils die andere Stimme gewählt;
`--same-voice` erzeugt mit derselben Stimme erneut. Jede Erzeugung erhält eine neue
Datei. Erst wenn alle ausgewählten Dateien erfolgreich erzeugt wurden, wird das
Manifest atomar veröffentlicht. Alte Audios bleiben erhalten. Aufgaben, Texte und
Manifest-Schlüssel werden nicht verändert. Veraltete Bewertungen lösen keine
Ersetzung neuerer Aufnahmen aus. Nach Neuladen stehen neue Versionen wieder unter
„Ungehört / ungeprüft“. Bei gleicher Stimme kann das deterministische Modell dieselbe
Aussprache liefern.

`build-english-audio.cjs` bleibt ein vollständiger Neuaufbau mit einer Stimme und
überschreibt die individuelle Stimmenauswahl. Nicht gleichzeitig mit der gezielten
Neugenerierung ausführen.
