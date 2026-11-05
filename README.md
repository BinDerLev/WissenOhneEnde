# LernLabor

LernLabor ist eine browserbasierte Lern-App für Mathe und Deutsch (Klassen 1–5) mit einem GameHub.

## Lokal starten

Im Projektverzeichnis einen statischen Webserver starten:

```sh
python3 -m http.server 8000
```

Dann <http://localhost:8000> im Browser öffnen. Beenden mit `Ctrl+C`.

## Tests

Die vorhandenen Tests laufen mit Node.js; im Projektverzeichnis ausführen:

```sh
node test_curriculum.js
```

Sie prüfen unter anderem Lerninhalte, Spielfortschritt und GameHub-Katalog, Suche und Filter.

## Ein Spiel zum GameHub hinzufügen

1. Lege einen Spielordner mit einer `index.html` und einem Bild für die Spielkarte an.
2. Ergänze den `gameCatalog` in `script.js` um einen Eintrag. `href` und `image` sind Pfade relativ zum Projektverzeichnis. Fülle außerdem `imageAlt`, `title`, `type`, `description`, `rating`, `score`, `categories` und `tags` aus.
3. Verwende für `categories` die vorhandenen Filterwerte `action`, `puzzle`, `strategy` und/oder `adventure`. So kann das Spiel über den passenden Genre-Filter gefunden werden.
4. Prüfe, dass Spiel- und Bildpfad stimmen, und führe `node test_curriculum.js` aus. Der GameHub-Test kontrolliert, dass Katalogeinträge auf vorhandene Spiele und Bilder verweisen.
