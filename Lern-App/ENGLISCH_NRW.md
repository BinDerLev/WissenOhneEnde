# Englisch nach NRW-Lehrplänen – 14. November 2026

Englisch ist für Klasse 3–6 auswählbar. In Klasse 1/2 ist die Option deaktiviert. Ein Wechsel von Englisch in Klasse 1/2 führt zur Matheübersicht dieser Klasse.

## Amtliche Grundlage

- [NRW: Beginn des Englischunterrichts in Klasse 3](https://bass.schule.nrw/19377.htm).
- [NRW: Lehrplan Englisch Primarstufe (2021)](https://lehrplannavigator.nrw.de/system/files/media/document/file/ps_lp_e_einzeldatei_2021_08_02.pdf), insbesondere Abschnitte 2.1 und 2.2.
- [NRW: Kernlehrplan Englisch Gymnasium G9 (2019)](https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_e_klp_3417_2019_06_23.pdf), insbesondere Abschnitt 2.2 zur Erprobungsstufe.

Der Grundschullehrplan beschreibt gemeinsame Ziele bis Ende Klasse 4, der gymnasiale Lehrplan bis Ende Klasse 6. Die Zuordnung zu einzelnen Klassen ist unsere didaktische Auswahl. Schulinterne Lehrpläne können anders aufteilen.

Die Grundschule verbindet Hörverstehen, Lesen, Sprechen, Schreiben und Sprachmittlung mit Alltagssituationen. Dazu kommen interkulturelles Lernen, Text- und Medienkompetenz sowie Sprachlernstrategien. Grammatische Mittel dienen der Verständigung; formale Regeldrills stehen im neuen Grundschulangebot deshalb nicht im Mittelpunkt.

Für Klasse 5/6 werden die kommunikativen Übungen um gezielte Arbeit an Satzstrukturen, Zeitformen, Mengen, Vergleichen und Modalverben erweitert. Der Bezug bleibt der Alltag von Kindern: Schule, Freunde, Freizeit, Einkaufen und Medien.

## Umfang des implementierten Angebots

| Klasse | Themen | Aufgabeneinträge | Schwerpunkt der Auswahl |
| --- | ---: | ---: | --- |
| 3 | 10 | 240 | Farben/Zahlen, Schule, Familie/Körper/Gefühle, Tiere, Essen, Kleidung/Wetter, erste Dialoge, Lesen, Hören, Sprachmittlung |
| 4 | 11 | 264 | Wohnen/Stadt, Freizeit, Kalender, Ortsangaben, Einkaufen, Steckbrief nach Vorlage, Lernstrategien, Lebenswelten, Lesen, Hören, Sprachmittlung |
| 5 | 11 | 264 | Schulalltag, simple present, Fragen/Verneinungen, present progressive, be/have got, Pronomen, Schreiben nach Satzmuster, Lesen, Hören, Sprachmittlung, Texte/Medien |
| 6 | 12 | 288 | simple past, present perfect, Zukunft, Vergleiche, Mengen, Modalverben, if-Sätze Typ 1, Schreiben im simple past, Lesen, Hören, Sprachmittlung, Quellen/Textüberarbeitung |
| Gesamt | 44 | 1.056 | Je Thema 24 Einträge; je Einheit weiterhin acht Aufgaben |

Die 96 Kurztexte werden jeweils zum Lesen, Hören und zur sinngemäßen Wiedergabe verwendet. Die 1.056 Einträge sind daher keine 1.056 voneinander unabhängigen Texte. Lesen und Hören teilen pro Ausgangstext dieselbe Inhaltskennung; ein Wechsel des Formats zählt für die Wiederholungssteuerung nicht als neuer Text. Die Texte werden mit steigender Klasse länger und verlangen zunehmend das Erkennen von Gründen und Zusammenhängen.

Wortschatzthemen mischen die richtige Lösung mit drei anderen Begriffen aus demselben Themenfeld. Kontextaufgaben verwenden kuratierte Auswahlantworten. Bei Schreibaufgaben ist die erwartete Form durch ein Satzmuster festgelegt. Groß-/Kleinschreibung, typografische Apostrophe und fehlende Schlusszeichen führen bei diesen Englischübungen nicht zur Ablehnung; falsche Wörter und Zeitformen weiterhin schon.

## Hören und Sprechen

Alle englischen Wörter, Textstellen und Antworten verwenden mit dem lokalen neuronalen Sprachmodell **Kokoro 82M** und der weiblichen Stimme **Heart (en-US)** erzeugte MP3-Aufnahmen. Beim Auswählen einer englischen Antwort wird diese automatisch abgespielt, auch bei einem falschen Versuch. Deutsche Antworten und Anweisungen werden nicht vorgelesen. Englische Teile gemischter Texte sind ausdrücklich gekennzeichnet; es gibt keine automatische Spracherkennung und keinen Rückfall auf die Browser- oder Systemstimme.

Unterstrichene englische Wörter und Lautsprecherknöpfe erlauben das erneute Anhören. Bei mehrteiligen Antworten lassen sich unter „Wörter anhören“ auch einzelne Wörter abspielen, ohne die Antwort auszuwählen. Ein aufklappbarer Hörtext bietet die gleichen Wort- und Satzknöpfe. Nach einer richtigen Antwort wartet der automatische Aufgabenwechsel auf das Ende der Wiedergabe. Beim Aufgabenwechsel oder Verlassen der Übung stoppt der Ton.

Die Aufnahmen liegen unter `Lern-App/audio/english/`; `english-audio-manifest.js` ordnet markierte englische Texte den Clips zu. `node scripts/build-english-audio.cjs` erzeugt die Aufnahmen über `scripts/build_english_audio.py` mit Kokoro/ONNX Runtime und komprimiert sie mit LAME. Das Sprachmodell wird einmal geladen und für alle Clips wiederverwendet; der Browser führt kein Sprachmodell aus. Bereits vorhandene Clips werden wiederverwendet. Für den Betrieb der Website sind weder macOS noch Python, eine installierte Stimme oder Whisper erforderlich. Audioclips werden erst bei einer Höraktion geladen, nicht gemeinsam beim Öffnen der App.

„Anhören und nachsprechen“ bietet Modelle für eigenes Sprechtraining. Es gibt keine Mikrofonaufnahme und keine automatische Aussprachebewertung.

## Reichweite und Prüfung

Das Angebot übt ausgewählte Teilkompetenzen. Es ersetzt weder Unterricht noch eine vollständige Lehrplanabdeckung. Freies Sprechen und Schreiben, echte Gespräche, authentische längere Hör-/Hörsehtexte, Präsentationen und eine individuelle Rückmeldung durch eine Lehrkraft bleiben außerhalb der automatischen Bewertung. Die selbst verfassten Kurztexte sind didaktische Materialien, keine authentischen Quellen aus englischsprachigen Medien. Kulturaufgaben verdeutlichen unterschiedliche Lebenswelten und vermeiden pauschale Aussagen über alle Familien eines Landes.

`node test_curriculum.js` prüft zusätzlich zu den bisherigen Mathe-/Deutschprüfungen sämtliche Englischpools auf Umfang, eindeutige Einträge und Antwortoptionen, längere Texte über die Klassen, drei wiederholungsfreie Einheiten je Thema mit drei Zufallsstarts, Klassengrenzen, Speicherung, Münzen, Elternbericht, Schreibvarianten sowie Aufnahme-Wiedergabe, das Ausbleiben einer Systemstimme bei Ladefehlern und Abbruch beim Navigieren. Die Wiedergabeereignisse werden dabei simuliert. Weitere Prüfungen kontrollieren die tatsächlichen MP3-Dateien und die vollständige Zuordnung aller markierten englischen Wörter und Textteile. Eine visuelle Browserprüfung wird dadurch nicht ersetzt.


## Audioclips reproduzieren

Die Nutzerwahl vom 14. November ist **Heart**. Die Systemstimmen Daniel, Samantha und Karen werden nicht mehr verwendet. Quelle für das Sprachmodell und die Stimmen: [Kokoro 82M](https://huggingface.co/hexgrad/Kokoro-82M), [Stimmenübersicht](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md) und [Kokoro ONNX](https://github.com/thewh1teagle/kokoro-onnx).

Die Erzeugung verwendet das vollständige FP32-Modell, 24 kHz, Sprechtempo `0.95` und Mono-MP3 mit 64 kbit/s. `ENGLISH_AUDIO_SPEED` verändert die Sprechgeschwindigkeit, nicht die Natürlichkeit des Stimmenmodells. Eine höhere MP3-Bitrate allein würde eine robotische Stimme nicht natürlicher machen. Whisper ist Spracherkennung und wird zur Erzeugung dieser Clips nicht verwendet.

Einmalige lokale Einrichtung mit Python 3.12, uv und LAME:

```sh
uv venv --python 3.12 .cache/english-audio
uv pip install --python .cache/english-audio/bin/python -r scripts/requirements-english-audio.txt
mkdir -p .cache/kokoro
curl -fL -o .cache/kokoro/kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/kokoro-v1.0.onnx
curl -fL -o .cache/kokoro/voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/voices-v1.0.bin
ENGLISH_AUDIO_PYTHON=.cache/english-audio/bin/python ENGLISH_AUDIO_MODEL_DIR=.cache/kokoro node scripts/build-english-audio.cjs
node scripts/verify-english-audio.cjs
```

Modell und Stimmen werden anhand ihrer SHA-256-Prüfsummen kontrolliert. Der Generator veröffentlicht das neue Manifest erst nach erfolgreicher Erzeugung aller 3.343 Aufnahmen. `node scripts/verify-english-audio.cjs` prüft die vollständige Textzuordnung, die Modell-/Stimmenkennung und MP3-Dateien. Stichproben mit einzelnen Wörtern und längeren Texten werden zusätzlich decodiert und auf vorhandene Audiosamples geprüft. Dies ist eine technische Prüfung, kein unabhängiges Urteil über subjektive Stimmqualität.


## Bilder zu Aufgaben und Sätzen

Alle 1.056 Aufgaben haben eine kuratierte Bildzuordnung. Englische Sätze in Aufgaben, Lesetexten, Antwortmöglichkeiten, Schreibmodellen und aufgeklappten Hörtexten erhalten kleine passende SVG-Bilder. Die Zuordnung steht in `english-images.js`; die Motive liegen unter `illustrations/english/`. Konkrete Vokabeln wie Hund, Banane oder Stiefel verwenden entsprechende Gegenstände statt eines einheitlichen Englischsymbols. Abstrakte Kommunikations- und Grammatikformen verwenden einen passenden Themenkontext.

Bei Hörfragen sind das Aufgabenbild und das Bild zur Frage neutral gegenüber der gesuchten Antwort. Die konkreteren Satzbilder des Hörtextes erscheinen im aufklappbaren Transkript. Jedes Bild besitzt einen Alternativtext; es wird nicht über die englische Vorlesefunktion angesagt.

Die fachliche und visuelle Gegenprüfung durch separate Subagenten sowie dabei gefundene und korrigierte Zuordnungen werden in [Bildprüfung](ENGLISCH_BILDER_PRUEFUNG.md) dokumentiert. `node scripts/verify-english-images.cjs` prüft zusätzlich die vollständige Karten-/Satzzuordnung, existierende SVG-Dateien, Alternativtexte und die Aufnahmen für einzelne Sätze.
