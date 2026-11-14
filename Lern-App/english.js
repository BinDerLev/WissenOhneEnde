// NRW: Primarstufe (2021), Erprobungsstufe Gymnasium G9 (2019).
// Die Klassenaufteilung ist eine didaktische Auswahl, keine amtliche Stoffverteilung.
const englishCurriculum = { 3: [], 4: [], 5: [], 6: [] };
const englishPools = { 3: {}, 4: {}, 5: {}, 6: {} };

function addEnglishTopic(grade, mode, title, explanation, cards, skill = "en-words") {
  englishPools[grade][mode] = cards;
  englishCurriculum[grade].push({ title, mode, skill, icon: "EN", description: explanation, explanation, difficulty: grade < 5 ? "easy" : "medium" });
}

function englishVocabulary(grade, mode, title, entries) {
  const words = entries.map(entry => entry.split("|"));
  addEnglishTopic(grade, mode, title, "Lies die Bedeutung und wähle das passende englische Wort. Höre es dir danach an und sprich es laut nach.", words.map(([word, meaning]) => ({
    text: `Welches englische Wort passt zu „${meaning}“?`, answer: word,
    choices: words.map(item => item[0]), hint: `Merke dir zusammen: ${meaning} – ${word}.`, modelText: word
  })));
}

function englishChoices(grade, mode, title, explanation, rows, skill = "en-dialogue") {
  addEnglishTopic(grade, mode, title, explanation, rows.map(([text, answer, wrong, other, hint]) => ({
    text, answer, choices: [answer, wrong, other], hint: hint || explanation,
    ...(skill === "en-dialogue" && !text.startsWith("Der Verkäufer") ? { modelText: answer } : {})
  })), skill);
}

englishVocabulary(3, "colours-numbers", "Farben und Zahlen", [
  "red|rot", "blue|blau", "green|grün", "yellow|gelb", "orange|orange", "purple|lila", "pink|rosa", "brown|braun", "black|schwarz", "white|weiß", "grey|grau",
  "one|eins", "two|zwei", "three|drei", "four|vier", "five|fünf", "six|sechs", "seven|sieben", "eight|acht", "nine|neun", "ten|zehn", "eleven|elf", "twelve|zwölf", "twenty|zwanzig"
]);
englishVocabulary(3, "school", "In der Schule", [
  "pencil|Bleistift", "pen|Füller oder Kugelschreiber", "book|Buch", "ruler|Lineal", "rubber|Radiergummi", "school bag|Schultasche", "pencil case|Federmäppchen", "desk|Schreibtisch", "chair|Stuhl", "door|Tür", "window|Fenster", "board|Tafel", "teacher|Lehrkraft", "pupil|Schulkind", "classroom|Klassenzimmer", "school|Schule", "playground|Schulhof", "scissors|Schere", "glue|Klebstoff", "paper|Papier", "picture|Bild", "computer|Computer", "page|Seite", "lunch box|Brotdose"
]);
englishVocabulary(3, "family-body", "Familie, Gefühle und Körper", [
  "mother|Mutter", "father|Vater", "sister|Schwester", "brother|Bruder", "grandmother|Großmutter", "grandfather|Großvater", "friend|Freund oder Freundin", "family|Familie", "baby|Baby", "head|Kopf", "hand|Hand", "foot|Fuß", "arm|Arm", "leg|Bein", "eye|Auge", "ear|Ohr", "nose|Nase", "mouth|Mund", "hair|Haare", "happy|glücklich", "sad|traurig", "tired|müde", "hungry|hungrig", "thirsty|durstig"
]);
englishVocabulary(3, "animals", "Tiere entdecken", [
  "cat|Katze", "dog|Hund", "rabbit|Kaninchen", "hamster|Hamster", "guinea pig|Meerschweinchen", "bird|Vogel", "fish|Fisch", "horse|Pferd", "cow|Kuh", "pig|Schwein", "sheep|Schaf", "goat|Ziege", "duck|Ente", "hen|Henne", "mouse|Maus", "lion|Löwe", "tiger|Tiger", "elephant|Elefant", "monkey|Affe", "bear|Bär", "giraffe|Giraffe", "frog|Frosch", "butterfly|Schmetterling", "bee|Biene"
]);
englishVocabulary(3, "food", "Essen und Trinken", [
  "apple|Apfel", "banana|Banane", "pear|Birne", "strawberry|Erdbeere", "grapes|Weintrauben", "carrot|Karotte", "potato|Kartoffel", "tomato|Tomate", "bread|Brot", "butter|Butter", "cheese|Käse", "egg|Ei", "rice|Reis", "pasta|Nudeln", "soup|Suppe", "salad|Salat", "sandwich|belegtes Brot", "cake|Kuchen", "biscuit|Keks", "ice cream|Eiscreme", "water|Wasser", "milk|Milch", "juice|Saft", "tea|Tee"
]);
englishVocabulary(3, "clothes-weather", "Kleidung und Wetter", [
  "T-shirt|T-Shirt", "shirt|Hemd", "jumper|Pullover", "trousers|Hose", "shorts|kurze Hose", "skirt|Rock", "dress|Kleid", "coat|Mantel", "jacket|Jacke", "shoes|Schuhe", "socks|Socken", "boots|Stiefel", "hat|Hut", "cap|Kappe", "scarf|Schal", "gloves|Handschuhe", "sunny|sonnig", "rainy|regnerisch", "windy|windig", "cloudy|bewölkt", "snowy|verschneit", "warm|warm", "cold|kalt", "hot|heiß"
]);

englishChoices(3, "first-dialogues", "Hallo! Kleine Gespräche", "Lies die Situation und wähle eine passende Antwort. Übe den kleinen Dialog anschließend laut.", [
  ["Ein Kind sagt: Hello! Was antwortest du?", "Hi!", "Good night!", "A pencil."],
  ["Du möchtest nach dem Namen fragen.", "What's your name?", "How old are you?", "Where is my bag?"],
  ["What's your name? – Antworte als Sam.", "My name is Sam.", "I am nine.", "I like cats."],
  ["How old are you? – Antworte: neun Jahre.", "I'm nine.", "I'm fine.", "I'm Sam."],
  ["How are you? – Dir geht es gut.", "I'm fine, thank you.", "I'm eight.", "It's blue."],
  ["Du gehst nach Hause und verabschiedest dich.", "Goodbye!", "Good morning!", "Welcome!"],
  ["Du begrüßt jemanden am Morgen.", "Good morning!", "Good night!", "See you!"],
  ["Du bedankst dich für Hilfe.", "Thank you!", "I'm sorry!", "I'm hungry!"],
  ["Thank you! – Du antwortest freundlich.", "You're welcome!", "I'm seven.", "It's red."],
  ["Du bittest um einen Stift.", "A pencil, please.", "A pencil is red.", "I'm a pencil."],
  ["Du verstehst etwas nicht.", "I don't understand.", "I like apples.", "I'm happy."],
  ["Du bittest darum, etwas zu wiederholen.", "Can you say that again, please?", "Can you swim?", "Is it green?"],
  ["Do you like apples? – Du magst Äpfel.", "Yes, I do.", "Yes, I am.", "Yes, it is."],
  ["Do you like milk? – Du magst keine Milch.", "No, I don't.", "No, I'm not.", "No, it isn't."],
  ["What's your favourite colour? – Du magst Blau am liebsten.", "My favourite colour is blue.", "I'm blue years old.", "It's a blue cat."],
  ["Have you got a pet? – Du hast einen Hund.", "Yes, I've got a dog.", "Yes, I'm a dog.", "Yes, I like blue."],
  ["Can you swim? – Du kannst schwimmen.", "Yes, I can.", "Yes, I have.", "Yes, I do."],
  ["Can you fly? – Du kannst nicht fliegen.", "No, I can't.", "No, I haven't.", "No, I'm not."],
  ["Du stellst deine Schwester vor.", "This is my sister.", "Where is my sister?", "I like your sister."],
  ["Du möchtest beim Spiel mitmachen.", "Can I play, too?", "I have got a game.", "The game is blue."],
  ["Are you hungry? – Du hast Hunger.", "Yes, I am.", "Yes, I can.", "Yes, I have."],
  ["Du wünschst jemandem zum Geburtstag alles Gute.", "Happy birthday!", "Good evening!", "See you tomorrow!"],
  ["Jemand stellt sich vor. Du freust dich, das Kind kennenzulernen.", "Nice to meet you!", "Close the door!", "I am tired."],
  ["Du verabschiedest dich bis morgen.", "See you tomorrow!", "Open your book!", "Good morning!"]
]);

englishVocabulary(4, "home", "Zu Hause und in der Stadt", [
  "house|Haus", "flat|Wohnung", "room|Zimmer", "kitchen|Küche", "bathroom|Badezimmer", "bedroom|Schlafzimmer", "living room|Wohnzimmer", "garden|Garten", "bed|Bett", "table|Tisch", "sofa|Sofa", "wardrobe|Kleiderschrank", "shelf|Regalbrett", "lamp|Lampe", "stairs|Treppe", "street|Straße", "shop|Geschäft", "supermarket|Supermarkt", "library|Bibliothek", "park|Park", "station|Bahnhof", "hospital|Krankenhaus", "swimming pool|Schwimmbad", "cinema|Kino"
]);
englishVocabulary(4, "hobbies", "Freizeit und Fähigkeiten", [
  "swimming|Schwimmen", "dancing|Tanzen", "singing|Singen", "reading|Lesen", "drawing|Zeichnen", "painting|Malen", "cooking|Kochen", "baking|Backen", "running|Laufen", "cycling|Radfahren", "skating|Skaten", "riding|Reiten", "football|Fußball", "basketball|Basketball", "tennis|Tennis", "chess|Schach", "guitar|Gitarre", "piano|Klavier", "drums|Schlagzeug", "game|Spiel", "team|Mannschaft", "hobby|Hobby", "music|Musik", "sport|Sport"
]);
englishVocabulary(4, "calendar", "Tage, Monate und Jahreszeiten", [
  "Monday|Montag", "Tuesday|Dienstag", "Wednesday|Mittwoch", "Thursday|Donnerstag", "Friday|Freitag", "Saturday|Samstag", "Sunday|Sonntag", "January|Januar", "February|Februar", "March|März", "April|April", "May|Mai", "June|Juni", "July|Juli", "August|August", "September|September", "October|Oktober", "November|November", "December|Dezember", "spring|Frühling", "summer|Sommer", "autumn|Herbst", "winter|Winter", "birthday|Geburtstag"
]);

const englishPositions = [
  ["The cat is ___ the box. (in der Kiste)", "in", "on", "under"],
  ["The book is ___ the desk. (auf dem Tisch)", "on", "under", "behind"],
  ["The ball is ___ the bed. (unter dem Bett)", "under", "in", "on"],
  ["The dog is ___ the door. (hinter der Tür)", "behind", "on", "in"],
  ["The chair is ___ the table. (neben dem Tisch)", "next to", "under", "in"],
  ["The park is ___ the school and the library. (zwischen)", "between", "behind", "under"],
  ["The shoes are ___ the bed. (vor dem Bett)", "in front of", "on", "behind"],
  ["The bird is ___ the tree. (im Baum)", "in", "under", "between"],
  ["The picture is ___ the wall. (an der Wand)", "on", "under", "between"],
  ["The socks are ___ the chair. (unter dem Stuhl)", "under", "on", "in"],
  ["The garden is ___ the house. (hinter dem Haus)", "behind", "in", "on"],
  ["The lamp is ___ the sofa. (neben dem Sofa)", "next to", "in", "under"],
  ["The pen is ___ the book and the ruler. (zwischen)", "between", "in", "under"],
  ["The bus is ___ the school. (vor der Schule)", "in front of", "under", "in"],
  ["The milk is ___ the fridge. (im Kühlschrank)", "in", "on", "under"],
  ["The cup is ___ the shelf. (auf dem Regalbrett)", "on", "in", "under"],
  ["The mouse is ___ the table. (unter dem Tisch)", "under", "between", "on"],
  ["The bike is ___ the tree. (hinter dem Baum)", "behind", "in", "on"],
  ["The library is ___ the cinema. (neben dem Kino)", "next to", "in", "under"],
  ["The shop is ___ the park and the station. (zwischen)", "between", "under", "on"],
  ["The teacher is ___ the board. (vor der Tafel)", "in front of", "under", "on"],
  ["The apples are ___ the bag. (in der Tasche)", "in", "under", "behind"],
  ["The hat is ___ the wardrobe. (auf dem Schrank)", "on", "under", "between"],
  ["The rabbit is ___ the bush. (unter dem Busch)", "under", "on", "between"]
];
englishChoices(4, "positions", "Wo ist denn …?", "Beschreibe den Ort: in = in, on = auf, under = unter, next to = neben. Lies die deutsche Ortsangabe zur Lücke.", englishPositions, "en-words");

const englishShopping = [
  ["Im Laden möchtest du einen Apfel bestellen.", "An apple, please.", "I am an apple.", "An apple is green."],
  ["Du möchtest den Preis wissen.", "How much is it?", "How old is it?", "What colour is it?"],
  ["Du bestellst höflich Wasser.", "Can I have some water, please?", "Can water swim?", "Where is my water bottle?"],
  ["Here you are. – Jemand reicht dir deine Bestellung.", "Thank you.", "I'm sorry.", "Good morning."],
  ["Anything else? – Du möchtest nichts mehr.", "No, thank you.", "My name is Sam.", "I'm ten."],
  ["Du möchtest zwei Bananen.", "Two bananas, please.", "Two apples, please.", "Two carrots, please."],
  ["Du fragst, ob es Brot gibt.", "Have you got any bread?", "Are you bread?", "Is bread your name?"],
  ["Du möchtest einen Saft statt Milch.", "Juice, please.", "Milk, please.", "Tea, please."],
  ["Du bittest im Café um die Speisekarte.", "Can I have the menu, please?", "Can I have my coat, please?", "Can I close the door, please?"],
  ["Du möchtest ein Käsesandwich.", "A cheese sandwich, please.", "A tomato soup, please.", "A chocolate cake, please."],
  ["Du fragst nach dem Preis der Äpfel.", "How much are the apples?", "How many apples can fly?", "How old are the apples?"],
  ["Du möchtest deiner Begleitung höflich einen Keks anbieten.", "Would you like a biscuit?", "Are you a biscuit?", "How old is your biscuit?"],
  ["Would you like some tea? – Du möchtest Tee.", "Yes, please.", "No, thank you.", "I'm sorry, no."],
  ["Du möchtest Eis mit Erdbeergeschmack.", "Strawberry ice cream, please.", "Vanilla ice cream, please.", "Chocolate ice cream, please."],
  ["Du suchst ein blaues T-Shirt.", "Have you got a blue T-shirt?", "Have you got a red skirt?", "Have you got green shoes?"],
  ["Das T-Shirt ist zu klein. Du bittest um eine größere Größe.", "A bigger size, please.", "A smaller size, please.", "A different colour, please."],
  ["Du möchtest einen Gegenstand bezahlen.", "Can I pay, please?", "Can I play, please?", "Can I paint, please?"],
  ["Du bittest um eine Tüte.", "A bag, please.", "A bed, please.", "A ball, please."],
  ["Du möchtest drei Karotten.", "Three carrots, please.", "Three cakes, please.", "Three pears, please."],
  ["Der Verkäufer sagt: Sorry, no milk today. Was bedeutet das?", "Heute gibt es keine Milch.", "Milch kostet heute nichts.", "Heute gibt es nur Milch."],
  ["Du möchtest wissen, wo die Kasse ist.", "Where can I pay?", "Where can I swim?", "Where can I sleep?"],
  ["Du möchtest eine Birne, keinen Apfel.", "A pear, please.", "An apple, please.", "A potato, please."],
  ["Du möchtest eine rote Jacke anprobieren.", "Can I try on the red jacket, please?", "Can I eat the red apple, please?", "Can I read the red book, please?"],
  ["Du verabschiedest dich nach dem Einkauf.", "Thank you. Goodbye!", "Welcome to our shop!", "What would you like?"]
];
englishChoices(4, "shopping", "Einkaufen und höflich bitten", "Nutze ganze Wendungen: Can I have …, please? ist eine höfliche Bitte. Spiele die Situationen anschließend mit jemandem nach.", englishShopping);

// Modellgestütztes Schreiben: eine klar eingegrenzte Lücke statt Bewertung freier Texte.
const englishWritingModels = [
  ["My name is ___.", "Mia", "Name: Mia", "My name is Mia."],
  ["I am ___ years old.", "ten", "Alter: zehn", "I am ten years old."],
  ["I live in ___.", "Bonn", "Wohnort: Bonn", "I live in Bonn."],
  ["My favourite colour is ___.", "green", "Lieblingsfarbe: grün", "My favourite colour is green."],
  ["I have got a ___.", "rabbit", "Haustier: Kaninchen", "I have got a rabbit."],
  ["I like ___.", "swimming", "Hobby: Schwimmen", "I like swimming."],
  ["My birthday is in ___.", "May", "Geburtsmonat: Mai", "My birthday is in May."],
  ["My sister is ___.", "eight", "Alter der Schwester: acht", "My sister is eight."],
  ["My brother likes ___.", "football", "Sport: Fußball", "My brother likes football."],
  ["I can play the ___.", "piano", "Instrument: Klavier", "I can play the piano."],
  ["My room is ___.", "small", "Zimmer: klein", "My room is small."],
  ["My bag is ___.", "blue", "Tasche: blau", "My bag is blue."],
  ["My pet is a ___.", "cat", "Tier: Katze", "My pet is a cat."],
  ["I eat ___ for breakfast.", "bread", "Frühstück: Brot", "I eat bread for breakfast."],
  ["I drink ___ with my lunch.", "water", "Getränk: Wasser", "I drink water with my lunch."],
  ["I go to school on ___.", "Monday", "Wochentag: Montag", "I go to school on Monday."],
  ["I play in the ___.", "garden", "Ort: Garten", "I play in the garden."],
  ["My friend has got a ___.", "dog", "Haustier: Hund", "My friend has got a dog."],
  ["I wear my ___ in winter.", "coat", "Kleidung: Mantel", "I wear my coat in winter."],
  ["My favourite season is ___.", "summer", "Jahreszeit: Sommer", "My favourite season is summer."],
  ["I read a ___ before bed.", "book", "Gegenstand: Buch", "I read a book before bed."],
  ["My grandmother likes ___.", "music", "Interesse: Musik", "My grandmother likes music."],
  ["We go to the ___ on Saturday.", "park", "Ort: Park", "We go to the park on Saturday."],
  ["My favourite fruit is the ___.", "apple", "Obst: Apfel", "My favourite fruit is the apple."]
];
addEnglishTopic(4, "profile-writing", "Mein kleiner Steckbrief", "Schreibe nur das fehlende Wort aus der Vorlage. Lies den fertigen Satz danach laut. Aus solchen Sätzen kannst du deinen eigenen Steckbrief zusammenstellen.", englishWritingModels.map(([sentence, answer, note, modelText]) => ({
  text: `Ergänze nur die Lücke: ${sentence} Vorlage: ${note}.`, answer, modelText,
  hint: "Übersetze den deutschen Hinweis ins Englische und ergänze das Wort."
})), "en-writing");

englishChoices(4, "language-discovery", "Englisch entdecken und weiterlernen", "Vergleiche Wörter und Wendungen. Nutze Satzbeispiele, Bilder, Wiederholen und höfliches Nachfragen als Lernhilfen.", [
  ["Ein Wort ist unbekannt. Was hilft dir zuerst beim Verstehen?", "Bild und restlichen Satz ansehen.", "Den ganzen Text sofort weglegen.", "Immer das längste Wort wählen."],
  ["Du möchtest dir apple merken. Welche Lernkarte hilft?", "apple mit einem Apfelbild", "apple mit einem Autobild", "apple ohne Bedeutung"],
  ["Du hast einen Satz nicht verstanden. Welche Bitte passt?", "Can you say that again, please?", "I know everything.", "Don't speak to me."],
  ["Du übst die Aussprache. Was hilft?", "Zuhören und laut nachsprechen.", "Nur die Buchstaben zählen.", "Das Wort nie aussprechen."],
  ["Welches englische Wort ähnelt dem deutschen Wort Hand?", "hand", "foot", "mouth"],
  ["Welche Wörter sind in beiden Sprachen ähnlich?", "house – Haus", "dog – Haus", "red – Haus"],
  ["Welches Wort passt in die Tier-Wörtersammlung?", "rabbit", "ruler", "rainy"],
  ["Welches Wort passt in die Essen-Wörtersammlung?", "carrot", "coat", "cat"],
  ["Du willst ein neues Wort behalten. Was ist hilfreich?", "Es an mehreren Tagen kurz wiederholen.", "Es nur einmal ansehen.", "Es immer überspringen."],
  ["Welches Paar zeigt eine englische Mehrzahl?", "book – books", "book – red", "book – happy"],
  ["Wie schreibst du das englische Wort für ich?", "I", "i", "ich"],
  ["Welches Wort wird im Englischen auch mitten im Satz großgeschrieben?", "Monday", "dog", "table"],
  ["Im Wörterbuch steht cold = kalt. Was bedeutet It's cold?", "Es ist kalt.", "Es ist warm.", "Es ist windig."],
  ["Du möchtest fragen, wie ein Gegenstand auf Englisch heißt.", "What's this in English?", "How old is English?", "Where is English?"],
  ["Welches Wort gehört zu sun und summer?", "hot", "snowy", "cold"],
  ["Welches Wort gehört zu snow und winter?", "cold", "hot", "thirsty"],
  ["Du liest: I have got a dog. It can run. Worauf bezieht sich it?", "auf den Hund", "auf das Laufen", "auf die sprechende Person"],
  ["Welche Lernhilfe eignet sich für in, on und under?", "Einen Ball an die passenden Orte legen.", "Nur die Wörter rückwärts lesen.", "Nur ihre Buchstaben zählen."],
  ["Du suchst ein Wort in einem Wörterbuch. Was hilft?", "Die alphabetische Reihenfolge.", "Die Farbe des Buchdeckels.", "Die Länge der letzten Seite."],
  ["Ein Kind sagt colour, ein anderes color. Was erfährst du?", "Es gibt verschiedene englische Schreibweisen.", "Englisch hat nur eine Schreibweise für jedes Wort.", "Beide Wörter sind deutsch."],
  ["Welche zwei Wörter gehören zur gleichen Wortfamilie?", "play – playground", "play – milk", "play – red"],
  ["Du möchtest das Wort slowly verstehen. Der Satz lautet: Please speak slowly. Welche Hilfe passt?", "Die Bitte und die Sprechsituation beachten.", "Nur das Satzzeichen ansehen.", "Alle anderen Wörter ignorieren."],
  ["Du kennst die Wörter in einem Satz einzeln. Was hilft beim Verstehen?", "Den ganzen Satz und die Situation beachten.", "Immer nur das erste Wort lesen.", "Die Wortreihenfolge ignorieren."],
  ["Beim Sprechen fehlt dir ein Wort. Was kannst du tun?", "Mit bekannten Wörtern oder einer Geste weiterhelfen.", "Ab jetzt nie mehr Englisch sprechen.", "Sofort das Gespräch verlassen."]
], "en-words");

englishVocabulary(5, "school-life", "Schule, Alltag und Freizeit", [
  "timetable|Stundenplan", "subject|Schulfach", "homework|Hausaufgaben", "break|Pause", "assembly|Schulversammlung", "uniform|Schuluniform", "science|Naturwissenschaften", "history|Geschichte als Schulfach", "geography|Erdkunde", "PE|Sport als Schulfach", "art|Kunst als Schulfach", "canteen|Schulkantine", "exercise book|Schulheft", "dictionary|Wörterbuch", "headteacher|Schulleitung", "classmate|Klassenkamerad oder Klassenkameradin", "neighbour|Nachbar oder Nachbarin", "weekend|Wochenende", "pocket money|Taschengeld", "choir|Chor", "club|Verein oder Schul-AG", "practice|Übung oder Training", "competition|Wettbewerb", "journey|Reise oder Fahrt"
]);

const englishActions = [
  ["play", "plays", "playing", "played", "played", "football"], ["watch", "watches", "watching", "watched", "watched", "a film"],
  ["read", "reads", "reading", "read", "read", "a book"], ["write", "writes", "writing", "wrote", "written", "a story"],
  ["eat", "eats", "eating", "ate", "eaten", "an apple"], ["drink", "drinks", "drinking", "drank", "drunk", "some water"],
  ["make", "makes", "making", "made", "made", "a sandwich"], ["take", "takes", "taking", "took", "taken", "a photo"],
  ["draw", "draws", "drawing", "drew", "drawn", "a picture"], ["paint", "paints", "painting", "painted", "painted", "a wall"],
  ["clean", "cleans", "cleaning", "cleaned", "cleaned", "the kitchen"], ["open", "opens", "opening", "opened", "opened", "the window"],
  ["close", "closes", "closing", "closed", "closed", "the door"], ["visit", "visits", "visiting", "visited", "visited", "a friend"],
  ["help", "helps", "helping", "helped", "helped", "a neighbour"], ["wash", "washes", "washing", "washed", "washed", "the car"],
  ["buy", "buys", "buying", "bought", "bought", "some bread"], ["find", "finds", "finding", "found", "found", "a key"],
  ["bring", "brings", "bringing", "brought", "brought", "a cake"], ["build", "builds", "building", "built", "built", "a model"],
  ["sing", "sings", "singing", "sang", "sung", "a song"], ["learn", "learns", "learning", "learned", "learned", "a new word"],
  ["cook", "cooks", "cooking", "cooked", "cooked", "a meal"], ["pack", "packs", "packing", "packed", "packed", "a bag"]
];
const englishSubjects = [["I", "am", "have", "do"], ["you", "are", "have", "do"], ["he", "is", "has", "does"], ["she", "is", "has", "does"], ["we", "are", "have", "do"], ["they", "are", "have", "do"]];
const englishCapitalize = word => word[0].toUpperCase() + word.slice(1);

englishChoices(5, "simple-present", "Gewohnheiten: Simple present", "Bei he, she und it steht in bejahten Sätzen meist -s am Verb. I, you, we und they stehen mit der Grundform. Achte auf every day.", englishActions.map(([base, third, ing, past, participle, object], i) => {
  const subject = i % 2 ? "They" : "She";
  return [`Ergänze: ${subject} ___ ${object} every day. (${base})`, i % 2 ? base : third, i % 2 ? third : base, ing];
}), "en-grammar");
englishChoices(5, "questions", "Fragen und Verneinungen", "Im simple present: Do I/you/we/they …? und Does he/she/it …? Danach steht die Grundform. Bei Verneinungen: don't oder doesn't.", englishActions.map(([base, third, ing, past, participle, object], i) => {
  const singular = i % 2 === 0;
  return i < 12
    ? [`Ergänze die Frage: ___ ${singular ? "he" : "they"} ${base} ${object}?`, singular ? "Does" : "Do", singular ? "Do" : "Does", "Is"]
    : [`Ergänze die Verneinung: ${singular ? "She" : "We"} ___ ${base} ${object}.`, singular ? "doesn't" : "don't", singular ? "don't" : "doesn't", "isn't"];
}), "en-grammar");
englishChoices(5, "present-progressive", "Was gerade passiert", "Am/is/are + Verb mit -ing beschreibt, was gerade passiert. Bei write fällt das stumme e weg: writing.", englishActions.map(([base, third, ing, past, participle, object], i) => {
  const [subject, be] = englishSubjects[i % englishSubjects.length];
  return [`Right now: ${englishCapitalize(subject)} ___ ${object}. (${base})`, `${be} ${ing}`, `${be} ${base}`, `${be} ${third}`];
}), "en-grammar");

englishChoices(5, "be-have", "Personen und Dinge beschreiben", "I am, you/we/they are, he/she/it is. Bei Besitz: I/you/we/they have got und he/she/it has got.", [
  ...["happy", "tired", "hungry", "ready", "late", "at home", "at school", "in the garden", "in the kitchen", "in the park", "in the classroom", "on the bus"].map((ending, i) => {
    const [subject, be] = englishSubjects[i % 6];
    return [`Ergänze: ${englishCapitalize(subject)} ___ ${ending}.`, be, be === "is" ? "are" : "is", be === "am" ? "are" : "am"];
  }),
  ...["a dog", "a sister", "a bike", "a new book", "a red bag", "a piano", "a small room", "a blue jacket", "a pet", "a football", "an umbrella", "a question"].map((ending, i) => {
    const [subject, be, have] = englishSubjects[i % 6];
    return [`Ergänze: ${englishCapitalize(subject)} ___ got ${ending}.`, have, have === "has" ? "have" : "has", "is"];
  })
], "en-grammar");

englishChoices(5, "pronouns", "Pronomen und Besitz", "Personalpronomen ersetzen Personen oder Dinge. Possessivbegleiter zeigen Besitz: my, your, his, her, its, our, their.", [
  ["Mia has a dog. ___ dog is brown.", "Her", "His", "Their"], ["Ben has a bike. ___ bike is red.", "His", "Her", "Our"],
  ["I have a sister. ___ sister is ten.", "My", "Your", "Their"], ["We have a garden. ___ garden is small.", "Our", "His", "Her"],
  ["They have a cat. ___ cat is black.", "Their", "Our", "Your"], ["You have a book. ___ book is new.", "Your", "My", "His"],
  ["The dog is hungry. ___ bowl is empty.", "Its", "Their", "Our"], ["Emma and I are friends. ___ walk to school.", "We", "They", "She"],
  ["Tom and Leo are brothers. ___ share a room.", "They", "He", "It"], ["This is my mother. ___ likes music.", "She", "He", "They"],
  ["This is my father. ___ likes cooking.", "He", "She", "We"], ["The book is on the desk. ___ is open.", "It", "He", "They"],
  ["Sam and I have a team. ___ team plays on Friday.", "Our", "Their", "His"], ["Anna has two cats. ___ cats are small.", "Her", "His", "Its"],
  ["Jack has a guitar. ___ guitar is old.", "His", "Her", "Their"], ["I like reading. Books are ___ hobby.", "my", "your", "our"],
  ["You and your brother have a dog. Is this ___ dog?", "your", "our", "his"], ["The children have lunch. ___ lunch is in the canteen.", "Their", "His", "Her"],
  ["My sister and I like swimming. ___ go on Mondays.", "We", "They", "She"], ["The pencils are green. ___ are in my bag.", "They", "It", "He"],
  ["My aunt is a teacher. ___ works in London.", "She", "He", "It"], ["My uncle is a nurse. ___ works at the hospital.", "He", "She", "They"],
  ["The house has a garden. ___ garden is behind it.", "Its", "Their", "Our"], ["My friends live nearby. I play with ___.", "them", "they", "their"]
], "en-grammar");

addEnglishTopic(5, "guided-writing", "Sätze für eine Nachricht", "Schreibe mit dem vorgegebenen Satzmuster einen vollständigen Satz. Du brauchst keine zusätzlichen Informationen zu erfinden.", englishWritingModels.map(([sentence, answer, note, modelText]) => ({
  text: `Schreibe den vollständigen Satz. Muster: ${sentence} Angabe: ${note}.`, answer: modelText, modelText,
  hint: "Setze die Angabe in die Lücke. Behalte die Reihenfolge der anderen Wörter bei."
})), "en-writing");

englishChoices(6, "simple-past", "Vergangenes erzählen: Simple past", "Yesterday und last weekend weisen hier auf die Vergangenheit hin. Regelmäßige Verben enden auf -ed; häufige unregelmäßige Formen musst du lernen.", englishActions.map(([base, third, ing, past, participle, object]) => [
  `Yesterday: I ___ ${object}. (${base})`, past, third, ing
]), "en-grammar");
englishChoices(6, "present-perfect", "Schon erledigt: Present perfect", "Have/has + dritte Verbform verbindet Vergangenes mit der Gegenwart. Achte auf already und die passende Form von have.", englishActions.map(([base, third, ing, past, participle, object], i) => {
  const [subject, be, have] = englishSubjects[i % 6];
  return [`Ergänze im present perfect: ${englishCapitalize(subject)} ___ ${object}. (${base}; already)`, `${have} already ${participle}`, `${have} already ${third}`, `${be} already ${ing}`];
}), "en-grammar");
englishChoices(6, "future", "Pläne und Vorhersagen", "Für einen Plan: am/is/are going to + Grundform. Nach will steht ebenfalls die Grundform, ohne zusätzliches to.", englishActions.map(([base, third, ing, past, participle, object], i) => {
  const [subject, be] = englishSubjects[i % 6];
  return i < 12
    ? [`Der Plan steht fest. Ergänze mit going to: ${englishCapitalize(subject)} ___ ${object} tomorrow. (${base})`, `${be} going to ${base}`, `${be} going to ${ing}`, `${be} going to ${third}`]
    : [`Ergänze mit will: ${englishCapitalize(subject)} ___ ${object} tomorrow. (${base})`, `will ${base}`, `will to ${base}`, `will ${ing}`];
}), "en-grammar");

englishChoices(6, "comparison", "Vergleichen und beschreiben", "Kurze Adjektive bilden oft -er/-est, längere more/most. Unregelmäßig: good – better – best und bad – worse – worst.", [
  ["A bike is ___ than a car. (cheap)", "cheaper", "cheapest", "more cheap"],
  ["This is the ___ tree in our garden. (tall)", "tallest", "taller", "more tall"],
  ["A horse is ___ than a rabbit. (big)", "bigger", "bigest", "biggest"],
  ["This is the ___ bag in the shop. (small)", "smallest", "smaller", "more small"],
  ["My room is ___ than yours. (warm)", "warmer", "warmest", "more warm"],
  ["Today is the ___ day this week. (cold)", "coldest", "colder", "more cold"],
  ["This box is ___ than that one. (heavy)", "heavier", "heavyer", "heaviest"],
  ["This is the ___ task on the page. (easy)", "easiest", "easyest", "easier"],
  ["Our new sofa is ___ than our old one. (comfortable)", "more comfortable", "comfortabler", "most comfortable"],
  ["This is the ___ film I know. (interesting)", "most interesting", "more interesting", "interestingest"],
  ["Your answer is ___ than mine. (good)", "better", "gooder", "best"],
  ["This is the ___ storm this year. (bad)", "worst", "worse", "baddest"],
  ["This path is ___ than the road. (short)", "shorter", "shortest", "more short"],
  ["That is the ___ road in town. (long)", "longest", "longer", "more long"],
  ["My sister is ___ than me. (young)", "younger", "youngest", "more young"],
  ["He is the ___ player on our team. (old)", "oldest", "older", "more old"],
  ["A train is ___ than a bicycle. (fast)", "faster", "fastest", "more fast"],
  ["This is the ___ bus today. (slow)", "slowest", "slower", "more slow"],
  ["The red shoes are ___ than the blue ones. (expensive)", "more expensive", "expensiver", "most expensive"],
  ["This is the ___ building in our village. (beautiful)", "most beautiful", "more beautiful", "beautifulest"],
  ["The river is ___ here than near the bridge. (wide)", "wider", "widest", "wideer"],
  ["This is the ___ pool in the area. (deep)", "deepest", "deeper", "more deep"],
  ["I feel ___ today than yesterday. (happy)", "happier", "happyer", "happiest"],
  ["This is the ___ joke in the book. (funny)", "funniest", "funnier", "funnyest"]
], "en-grammar");

englishChoices(6, "quantities", "Mengen: much, many und some", "Many steht bei zählbaren Dingen, much bei nicht zählbaren Mengen. Im Satzkontext helfen Frage, Verneinung und die Bedeutung von a few oder a little.", [
  ...["books", "apples", "pupils", "chairs", "eggs", "cars", "dogs", "bottles"].map(noun => [`How ___ ${noun} are there?`, "many", "much", "a little"]),
  ...["water", "milk", "rice", "bread", "money", "time", "sugar", "cheese"].map(noun => [`How ___ ${noun} do we need?`, "much", "many", "a few"]),
  ["There isn't ___ milk left. (überhaupt keine Milch)", "any", "some", "many"],
  ["There aren't ___ apples left. (überhaupt keine Äpfel)", "any", "some", "much"],
  ["We have ___ apples: just two or three. (ein paar)", "a few", "a little", "much"],
  ["There is ___ water: just a small glass. (ein wenig)", "a little", "a few", "many"],
  ["There are ___ biscuits on the plate. (einige)", "some", "any", "much"],
  ["Is there ___ juice in the fridge? (überhaupt Saft)", "any", "many", "a few"],
  ["I haven't got ___ homework today. (nicht viel)", "much", "many", "a few"],
  ["There are only ___ people on the bus. (ein paar)", "a few", "a little", "much"]
], "en-grammar");

englishChoices(6, "modals", "Erlaubt, nötig oder verboten?", "Must drückt eine Pflicht aus, mustn't ein Verbot und needn't fehlende Notwendigkeit. Can beschreibt auch Fähigkeiten, should einen Rat.", [
  ["You ___ stop at a red traffic light. (Pflicht)", "must", "mustn't", "needn't"],
  ["You ___ touch this hot pan. (Verbot)", "mustn't", "needn't", "must"],
  ["You ___ bring lunch; we have food for everyone. (nicht nötig)", "needn't", "mustn't", "must"],
  ["I ___ swim very well. (Fähigkeit)", "can", "mustn't", "needn't"],
  ["You ___ get some sleep. (Rat)", "should", "mustn't", "can't"],
  ["You ___ run in this museum. (Verbot)", "mustn't", "needn't", "must"],
  ["We ___ wear a helmet on this ride. (Pflicht)", "must", "mustn't", "needn't"],
  ["You ___ pay; the tickets are free. (nicht nötig)", "needn't", "mustn't", "must"],
  ["She ___ play the piano. (Fähigkeit)", "can", "needn't", "mustn't"],
  ["You ___ drink some water after sport. (Rat)", "should", "mustn't", "can't"],
  ["Visitors ___ feed the animals here. (Verbot)", "mustn't", "needn't", "must"],
  ["We ___ be at school by eight. (Pflicht)", "must", "mustn't", "needn't"],
  ["You ___ wash this cup; it is already clean. (nicht nötig)", "needn't", "mustn't", "must"],
  ["My brother ___ ride a bike. (Fähigkeit)", "can", "mustn't", "needn't"],
  ["You ___ ask a teacher for help. (Rat)", "should", "mustn't", "can't"],
  ["You ___ take photos here. (Verbot)", "mustn't", "needn't", "must"],
  ["You ___ return this library book today. (Pflicht)", "must", "mustn't", "needn't"],
  ["We ___ hurry; there is plenty of time. (nicht nötig)", "needn't", "mustn't", "must"],
  ["They ___ speak English. (Fähigkeit)", "can", "mustn't", "needn't"],
  ["You ___ check your answer again. (Rat)", "should", "mustn't", "can't"],
  ["You ___ share your password. (Verbot)", "mustn't", "needn't", "must"],
  ["All players ___ follow the rules. (Pflicht)", "must", "mustn't", "needn't"],
  ["You ___ buy a pen; you can use mine. (nicht nötig)", "needn't", "mustn't", "must"],
  ["I ___ come today because I am ill. (nicht möglich)", "can't", "must", "should"]
], "en-grammar");

englishChoices(6, "conditionals", "Wenn … dann: If-Sätze Typ 1", "Für eine mögliche Zukunft: if + simple present, Hauptsatz mit will + Grundform. Im if-Teil steht hier kein will.", [
  ["If it ___, we will stay at home. (rain)", "rains", "will rain", "raining"],
  ["If you study, you ___ the test. (pass)", "will pass", "will to pass", "passing"],
  ["If she ___ time, she will help us. (have)", "has", "will have", "having"],
  ["If we leave now, we ___ the bus. (catch)", "will catch", "will catching", "catches"],
  ["If he ___, he will feel better. (rest)", "rests", "will rest", "resting"],
  ["If you ask, they ___ you. (help)", "will help", "will to help", "helping"],
  ["If the sun ___, we will go outside. (shine)", "shines", "will shine", "shining"],
  ["If I save my money, I ___ a bike. (buy)", "will buy", "will to buy", "buying"],
  ["If the shop ___ open, we will buy bread. (be)", "is", "will be", "being"],
  ["If you call me, I ___. (answer)", "will answer", "will answering", "answers"],
  ["If she ___ early, we will have time to talk. (arrive)", "arrives", "will arrive", "arriving"],
  ["If they invite us, we ___. (come)", "will come", "will to come", "coming"],
  ["If my dog ___, I will open the door. (bark)", "barks", "will bark", "barking"],
  ["If we practise, we ___. (improve)", "will improve", "will to improve", "improving"],
  ["If you ___ the map, you will find the park. (follow)", "follow", "will follow", "following"],
  ["If it gets cold, I ___ my coat. (wear)", "will wear", "will to wear", "wearing"],
  ["If he ___ the book, he will understand the story. (read)", "reads", "will read", "reading"],
  ["If you get hungry, we ___ a sandwich. (make)", "will make", "will to make", "making"],
  ["If the bus ___ late, I will walk. (be)", "is", "will be", "being"],
  ["If she wins, we ___. (celebrate)", "will celebrate", "will to celebrate", "celebrating"],
  ["If we ___ enough apples, we will bake a cake. (have)", "have", "will have", "having"],
  ["If you send an email, I ___ it. (read)", "will read", "will to read", "reading"],
  ["If they ___ the room, it will look bigger. (tidy)", "tidy", "will tidy", "tidying"],
  ["If I finish my work, I ___ outside. (play)", "will play", "will to play", "playing"]
], "en-grammar");

const englishPastWriting = englishActions.map(([base, third, ing, past, participle, object]) => ({
  text: `Schreibe einen Satz im simple past. Muster: Yesterday I ___ ${object}. Verb: ${base}.`,
  answer: base === "learn" ? [`Yesterday I learned ${object}.`, `Yesterday I learnt ${object}.`] : `Yesterday I ${past} ${object}.`, modelText: `Yesterday I ${past} ${object}.`,
  hint: `Behalte das Satzmuster bei und verwende die Vergangenheitsform von ${base}.`
}));
addEnglishTopic(6, "past-writing", "Sätze für einen Erlebnisbericht", "Nutze das vorgegebene Satzmuster für einen kurzen Rückblick. Schreibe den vollständigen Satz im simple past.", englishPastWriting, "en-writing");

// Pro Klassenstufe 24 verschiedene Kurztexte mit je einer gezielten Inhaltsfrage.
// Auswahlantworten in beiden Sprachen halten die Sprachmittlung eindeutig.
const englishStories = {
  3: [
    ["I am Ben. I am eight.", "How old is Ben?", ["Eight", "Nine", "Ten"], "Wie alt ist Ben?", ["Acht", "Neun", "Zehn"]],
    ["This is Mia. She has a cat.", "What pet has Mia got?", ["A cat", "A dog", "A rabbit"], "Welches Haustier hat Mia?", ["Eine Katze", "Einen Hund", "Ein Kaninchen"]],
    ["My bag is red. My book is blue.", "What colour is the bag?", ["Red", "Blue", "Green"], "Welche Farbe hat die Tasche?", ["Rot", "Blau", "Grün"]],
    ["I like apples. I don't like milk.", "What does the child like?", ["Apples", "Milk", "Bread"], "Was mag das Kind?", ["Äpfel", "Milch", "Brot"]],
    ["Tom is in the garden. He plays with his dog.", "Where is Tom?", ["In the garden", "At school", "In the kitchen"], "Wo ist Tom?", ["Im Garten", "In der Schule", "In der Küche"]],
    ["This is my sister. Her name is Ella.", "Who is Ella?", ["My sister", "My mother", "My teacher"], "Wer ist Ella für die sprechende Person?", ["Die Schwester", "Die Mutter", "Die Lehrerin"]],
    ["It is cold. I wear my coat.", "What does the child wear?", ["A coat", "Shorts", "A T-shirt"], "Was trägt das Kind?", ["Einen Mantel", "Eine kurze Hose", "Ein T-Shirt"]],
    ["Leo has two rabbits. They are white.", "How many rabbits has Leo got?", ["Two", "Three", "Four"], "Wie viele Kaninchen hat Leo?", ["Zwei", "Drei", "Vier"]],
    ["The cat is on the bed. The dog is under the table.", "Where is the cat?", ["On the bed", "Under the table", "In the bag"], "Wo ist die Katze?", ["Auf dem Bett", "Unter dem Tisch", "In der Tasche"]],
    ["I am thirsty. I drink water.", "What does the child drink?", ["Water", "Milk", "Juice"], "Was trinkt das Kind?", ["Wasser", "Milch", "Saft"]],
    ["This is our school. The door is green.", "What colour is the door?", ["Green", "Red", "Yellow"], "Welche Farbe hat die Tür?", ["Grün", "Rot", "Gelb"]],
    ["I have a pencil and a ruler. My ruler is yellow.", "What is yellow?", ["The ruler", "The pencil", "The bag"], "Was ist gelb?", ["Das Lineal", "Der Bleistift", "Die Tasche"]],
    ["Nina likes swimming. She can swim very well.", "What does Nina like?", ["Swimming", "Dancing", "Reading"], "Was macht Nina gern?", ["Schwimmen", "Tanzen", "Lesen"]],
    ["It is sunny. We play in the park.", "What is the weather like?", ["Sunny", "Rainy", "Snowy"], "Wie ist das Wetter?", ["Sonnig", "Regnerisch", "Verschneit"]],
    ["My brother is six. I am nine.", "How old is the brother?", ["Six", "Nine", "Ten"], "Wie alt ist der Bruder?", ["Sechs", "Neun", "Zehn"]],
    ["I have bread and cheese. This is my lunch.", "What is in the lunch?", ["Bread and cheese", "Rice and soup", "Cake and milk"], "Was gibt es zum Mittagessen?", ["Brot und Käse", "Reis und Suppe", "Kuchen und Milch"]],
    ["The bird is small. It is in the tree.", "Where is the bird?", ["In the tree", "Under the bed", "On the desk"], "Wo ist der Vogel?", ["Im Baum", "Unter dem Bett", "Auf dem Schreibtisch"]],
    ["Sam has a blue cap. His shoes are black.", "What colour are Sam's shoes?", ["Black", "Blue", "White"], "Welche Farbe haben Sams Schuhe?", ["Schwarz", "Blau", "Weiß"]],
    ["I am tired. I go to bed.", "How does the child feel?", ["Tired", "Hungry", "Happy"], "Wie fühlt sich das Kind?", ["Müde", "Hungrig", "Glücklich"]],
    ["Anna has three books. They are in her bag.", "Where are Anna's books?", ["In her bag", "On her bed", "Under her chair"], "Wo sind Annas Bücher?", ["In ihrer Tasche", "Auf ihrem Bett", "Unter ihrem Stuhl"]],
    ["My dog likes running. My cat likes sleeping.", "Which animal likes running?", ["The dog", "The cat", "The rabbit"], "Welches Tier läuft gern?", ["Der Hund", "Die Katze", "Das Kaninchen"]],
    ["It is my birthday. I have a cake.", "What has the child got?", ["A cake", "A sandwich", "An egg"], "Was hat das Geburtstagskind?", ["Einen Kuchen", "Ein belegtes Brot", "Ein Ei"]],
    ["My grandma is here. We read a book.", "What do they do?", ["Read a book", "Play football", "Drink tea"], "Was machen die beiden?", ["Ein Buch lesen", "Fußball spielen", "Tee trinken"]],
    ["I have ten fingers. I have two hands.", "How many hands has the child got?", ["Two", "Ten", "Four"], "Wie viele Hände hat das Kind?", ["Zwei", "Zehn", "Vier"]]
  ],
  4: [
    ["Lily lives in a flat. Her bedroom is small. Her desk is next to the window.", "Where is Lily's desk?", ["Next to the window", "Under the bed", "Behind the door"], "Wo steht Lilys Schreibtisch?", ["Neben dem Fenster", "Unter dem Bett", "Hinter der Tür"]],
    ["On Monday, Max plays football. On Tuesday, he goes swimming. On Friday, he reads at home.", "When does Max go swimming?", ["On Tuesday", "On Monday", "On Friday"], "An welchem Tag geht Max schwimmen?", ["Am Dienstag", "Am Montag", "Am Freitag"]],
    ["Ava wants to bake a cake. She has eggs and milk. She needs some flour.", "What does Ava need?", ["Flour", "Eggs", "Milk"], "Was fehlt Ava noch zum Backen?", ["Mehl", "Eier", "Milch"]],
    ["The shop opens at nine. It closes at five. It is closed on Sunday.", "When is the shop closed all day?", ["On Sunday", "On Monday", "On Friday"], "An welchem Tag bleibt der Laden ganz geschlossen?", ["Am Sonntag", "Am Montag", "Am Freitag"]],
    ["Noah has a rabbit. It eats carrots and lives in the garden. Its name is Snow.", "What does Snow eat?", ["Carrots", "Cheese", "Bread"], "Was frisst Snow?", ["Karotten", "Käse", "Brot"]],
    ["Ella's birthday is in June. She invites four friends. They play games in the park.", "Where is the birthday party?", ["In the park", "At school", "In a shop"], "Wo findet die Geburtstagsfeier statt?", ["Im Park", "In der Schule", "In einem Laden"]],
    ["It is rainy today. Ben takes his umbrella. His boots are yellow.", "What does Ben take?", ["An umbrella", "A football", "A guitar"], "Was nimmt Ben mit?", ["Einen Regenschirm", "Einen Fußball", "Eine Gitarre"]],
    ["Sophie can sing and dance. Her brother can play the guitar. They make music together.", "What instrument can Sophie's brother play?", ["The guitar", "The piano", "The drums"], "Welches Instrument spielt Sophies Bruder?", ["Gitarre", "Klavier", "Schlagzeug"]],
    ["The library is next to the school. The swimming pool is behind the park. We meet at the library.", "Where do they meet?", ["At the library", "At the pool", "In the park"], "Wo ist der Treffpunkt?", ["An der Bibliothek", "Am Schwimmbad", "Im Park"]],
    ["At the café, Mum wants tea. Dad wants coffee. I would like some apple juice.", "What would the child like?", ["Apple juice", "Tea", "Coffee"], "Was möchte das Kind trinken?", ["Apfelsaft", "Tee", "Kaffee"]],
    ["School starts at eight. We have lunch at twelve. We go home at three.", "When is lunch?", ["At twelve", "At eight", "At three"], "Um wie viel Uhr gibt es Mittagessen?", ["Um zwölf", "Um acht", "Um drei"]],
    ["Freddie likes winter. He loves snow. His sister likes summer because she likes swimming outside.", "Which season does Freddie like?", ["Winter", "Summer", "Spring"], "Welche Jahreszeit mag Freddie?", ["Winter", "Sommer", "Frühling"]],
    ["The red T-shirt is too small. The green one fits. Sara buys the green T-shirt.", "Which T-shirt does Sara buy?", ["The green one", "The red one", "The blue one"], "Welches T-Shirt kauft Sara?", ["Das grüne", "Das rote", "Das blaue"]],
    ["A sign says: Please close the gate. There are sheep in the field. We close the gate after us.", "What should visitors close?", ["The gate", "The window", "The book"], "Was sollen Besucher schließen?", ["Das Gatter", "Das Fenster", "Das Buch"]],
    ["Mia has chess club on Wednesday. Her friend comes on Thursday. They play chess together on Saturday.", "When do the friends play chess together?", ["On Saturday", "On Wednesday", "On Thursday"], "Wann spielen die Freunde zusammen Schach?", ["Am Samstag", "Am Mittwoch", "Am Donnerstag"]],
    ["The dog is under the kitchen table. The cat is on the sofa. The hamster is in its cage.", "Which animal is on the sofa?", ["The cat", "The dog", "The hamster"], "Welches Tier liegt auf dem Sofa?", ["Die Katze", "Der Hund", "Der Hamster"]],
    ["Tom takes bread, an apple and water to school. He puts everything in his bag. His lunch box is blue.", "What fruit does Tom take?", ["An apple", "A banana", "A pear"], "Welches Obst nimmt Tom mit?", ["Einen Apfel", "Eine Banane", "Eine Birne"]],
    ["Leah lives with her dad and her sister. Her grandma lives next door. They visit Grandma after school.", "Who lives next door?", ["Grandma", "The teacher", "A classmate"], "Wer wohnt nebenan?", ["Die Oma", "Die Lehrkraft", "Ein Schulkind aus der Klasse"]],
    ["We are at the zoo. The giraffe is eating. The monkeys are playing. The lion is sleeping.", "Which animal is sleeping?", ["The lion", "The giraffe", "A monkey"], "Welches Tier schläft?", ["Der Löwe", "Die Giraffe", "Ein Affe"]],
    ["A card says: Happy birthday, Alex! From your friend, Kim. Alex puts the card on the shelf.", "Who wrote the card?", ["Kim", "Alex", "Alex's teacher"], "Wer hat die Karte geschrieben?", ["Kim", "Alex", "Alex' Lehrkraft"]],
    ["The bus stop is in front of the station. The bus arrives at ten. We wait at the bus stop.", "Where is the bus stop?", ["In front of the station", "Behind the cinema", "Next to the pool"], "Wo ist die Bushaltestelle?", ["Vor dem Bahnhof", "Hinter dem Kino", "Neben dem Schwimmbad"]],
    ["Lucy wants a pet. Her room is small. She chooses a hamster instead of a big dog.", "What pet does Lucy choose?", ["A hamster", "A big dog", "A horse"], "Welches Haustier wählt Lucy?", ["Einen Hamster", "Einen großen Hund", "Ein Pferd"]],
    ["We need two tomatoes and three carrots for our salad. We have enough tomatoes. We buy carrots.", "What do they buy?", ["Carrots", "Tomatoes", "Potatoes"], "Was kaufen sie?", ["Karotten", "Tomaten", "Kartoffeln"]],
    ["On sports day, Finn runs fast. Maya jumps far. Both children enjoy the games.", "Who jumps far?", ["Maya", "Finn", "The teacher"], "Wer springt weit?", ["Maya", "Finn", "Die Lehrkraft"]]
  ],
  5: [
    ["Dear Alex, my new school has a library and a music room. My favourite subject is science because I enjoy experiments. We have science on Tuesday. Best wishes, Robin", "Why does Robin like science?", ["Because of the experiments", "Because of the library", "Because it is on Friday"], "Warum mag Robin Naturwissenschaften?", ["Wegen der Experimente", "Wegen der Bibliothek", "Weil das Fach freitags stattfindet"]],
    ["Amira usually walks to school with her brother. Today it is raining heavily, so they take the bus. Their father is already at work.", "How does Amira get to school today?", ["By bus", "On foot", "By car"], "Wie kommt Amira heute zur Schule?", ["Mit dem Bus", "Zu Fuß", "Mit dem Auto"]],
    ["The school play starts at six on Friday. Tickets are free, but visitors must book a seat. The money from the cake sale will buy new costumes.", "What must visitors do before the play?", ["Book a seat", "Buy a costume", "Bring a cake"], "Was müssen Besucher vor der Aufführung tun?", ["Einen Platz reservieren", "Ein Kostüm kaufen", "Einen Kuchen mitbringen"]],
    ["Oscar saves half of his pocket money every week. He wants to buy a second-hand bike. His friend lends him a helmet for the first ride.", "What is Oscar saving for?", ["A second-hand bike", "A new helmet", "A computer"], "Wofür spart Oscar?", ["Für ein gebrauchtes Fahrrad", "Für einen neuen Helm", "Für einen Computer"]],
    ["Our class is making a podcast about pets. Ben interviews the animal shelter worker. Ella records the sound, and I write the introduction.", "What does Ella do?", ["Records the sound", "Writes the introduction", "Interviews the worker"], "Welche Aufgabe hat Ella beim Podcast?", ["Den Ton aufnehmen", "Die Einleitung schreiben", "Die Mitarbeiterin interviewen"]],
    ["The swimming club meets on Mondays and Thursdays. Beginners practise on Monday. Thursday is for children who can already swim fifty metres.", "When should a beginner come?", ["On Monday", "On Thursday", "On Saturday"], "Wann soll ein Kind ohne Schwimmerfahrung kommen?", ["Am Montag", "Am Donnerstag", "Am Samstag"]],
    ["Zoe is vegetarian. At the canteen she can choose chicken, vegetable pasta or fish. She chooses the pasta and some fruit.", "Which meal does Zoe choose?", ["Vegetable pasta", "Chicken", "Fish"], "Welches Gericht wählt Zoe?", ["Gemüsenudeln", "Hähnchen", "Fisch"]],
    ["Jamie cannot find his exercise book. He checks his bag and desk. Then his sister finds it on the kitchen table next to his lunch box.", "Where is Jamie's exercise book?", ["On the kitchen table", "In his bag", "On his desk"], "Wo liegt Jamies Schulheft?", ["Auf dem Küchentisch", "In seiner Tasche", "Auf seinem Schreibtisch"]],
    ["Please bring old newspapers to art club tomorrow. We are making animal masks. You do not need paint because the school has enough.", "What should pupils bring?", ["Old newspapers", "Paint", "Animal food"], "Was sollen die Kinder zur Kunst-AG mitbringen?", ["Alte Zeitungen", "Farbe", "Tierfutter"]],
    ["The museum is open from ten until five. On Wednesdays, children get in free. The dinosaur tour begins at eleven near the main entrance.", "Where does the dinosaur tour start?", ["Near the main entrance", "In the café", "At the station"], "Wo beginnt die Dinosaurierführung?", ["Nahe dem Haupteingang", "Im Café", "Am Bahnhof"]],
    ["Nora likes the school garden. She grows carrots with her class. Each group waters the plants on a different day; Nora's group comes on Friday.", "When does Nora's group water the plants?", ["On Friday", "On Monday", "On Sunday"], "Wann gießt Noras Gruppe die Pflanzen?", ["Am Freitag", "Am Montag", "Am Sonntag"]],
    ["I am writing to invite you to my birthday party. We will meet at the park at two. Please bring a raincoat because we will stay outside.", "What should the guest bring?", ["A raincoat", "A swimsuit", "A school uniform"], "Was soll der Gast zur Feier mitbringen?", ["Eine Regenjacke", "Einen Badeanzug", "Eine Schuluniform"]],
    ["Mason enjoys football, but his sister prefers basketball. They both like cycling. On Sundays they ride to their grandparents together.", "Which activity do both children enjoy?", ["Cycling", "Football", "Basketball"], "Welche Freizeitaktivität mögen beide Kinder?", ["Radfahren", "Fußball", "Basketball"]],
    ["The library has a new reading club. Children choose one book each month and discuss it together. They do not have to buy the books.", "How often does the club choose a book?", ["Every month", "Every day", "Every year"], "Wie oft wählt der Leseclub ein Buch?", ["Jeden Monat", "Jeden Tag", "Jedes Jahr"]],
    ["Holly has a message from her coach. Today's training is indoors because the field is wet. Everyone must bring clean sports shoes.", "Why is training indoors?", ["The field is wet", "The coach is ill", "The team has no ball"], "Warum findet das Training drinnen statt?", ["Der Platz ist nass", "Die Trainerin ist krank", "Die Mannschaft hat keinen Ball"]],
    ["Dad is cooking dinner while I set the table. My brother is feeding the cat. Mum is still working at the hospital and will come home later.", "Who is feeding the cat?", ["The brother", "Dad", "Mum"], "Wer füttert die Katze?", ["Der Bruder", "Der Vater", "Die Mutter"]],
    ["At Green School, pupils wear a blue jumper and dark trousers or a skirt. For PE they change into a white T-shirt. Trainers are for PE only.", "Which colour is the PE T-shirt?", ["White", "Blue", "Dark green"], "Welche Farbe hat das Sport-T-Shirt an dieser Schule?", ["Weiß", "Blau", "Dunkelgrün"]],
    ["A sign at the pond says: Keep dogs on a lead. There are young birds near the water. Visitors can watch them from the path.", "Why must dogs stay on a lead here?", ["There are young birds", "The path is closed", "The water is frozen"], "Warum sollen Hunde hier angeleint bleiben?", ["Dort leben Jungvögel", "Der Weg ist gesperrt", "Das Wasser ist gefroren"]],
    ["The bus to the sports centre leaves at quarter past four. It takes twenty minutes. Ravi leaves school early enough to reach the stop at four.", "When does the bus leave?", ["At 4:15", "At 4:00", "At 4:20"], "Wann fährt der Bus zum Sportzentrum ab?", ["Um 16:15 Uhr", "Um 16:00 Uhr", "Um 16:20 Uhr"]],
    ["Luca and his cousin are preparing a picnic. Luca brings sandwiches. His cousin brings fruit and water. They agree to leave no litter in the park.", "What does Luca bring?", ["Sandwiches", "Fruit", "Water"], "Was bringt Luca zum Picknick mit?", ["Belegte Brote", "Obst", "Wasser"]],
    ["The lost dog is small and brown. It has a white paw and a red collar. If you see it, please tell an adult and contact the animal shelter.", "What is special about one paw?", ["It is white", "It is black", "It is red"], "Was ist an einer Pfote des gesuchten Hundes besonders?", ["Sie ist weiß", "Sie ist schwarz", "Sie ist rot"]],
    ["Chloe wants to practise English. She listens to a short story twice, then tells her friend what happens. She looks up only the words she really needs.", "What does Chloe do after listening?", ["Retells the story", "Copies every word", "Draws a new cover"], "Was tut Chloe nach dem Zuhören?", ["Die Geschichte nacherzählen", "Jedes Wort abschreiben", "Ein neues Titelbild zeichnen"]],
    ["Welcome to our chess club. We meet in Room 12 after lunch. New players can borrow a chess set and learn the rules with a partner.", "Where does the club meet?", ["In Room 12", "In the canteen", "In the music room"], "Wo trifft sich die Schach-AG?", ["In Raum 12", "In der Kantine", "Im Musikraum"]],
    ["A school email says the trip is on Thursday, not Tuesday. Pupils should bring a packed lunch. The class will travel by train.", "Which day is the trip?", ["Thursday", "Tuesday", "Friday"], "An welchem Tag findet der Ausflug laut E-Mail statt?", ["Am Donnerstag", "Am Dienstag", "Am Freitag"]]
  ],
  6: [
    ["Last Saturday, we planned to visit the castle. When we arrived, a notice said it was closed for repairs. Instead, we followed a walking trail and discovered a waterfall. It became the best part of our trip.", "Why did the family change its plan?", ["The castle was closed", "The waterfall was closed", "The trail was too long"], "Warum änderte die Familie ihren Plan?", ["Die Burg war geschlossen", "Der Wasserfall war gesperrt", "Der Wanderweg war zu lang"]],
    ["Dear Jo, I have already packed my bag for the exchange visit. I haven't bought a gift for my host family yet. They enjoy cooking, so I am going to bring a recipe book from our town. See you soon, Kim", "What is Kim planning to bring as a gift?", ["A recipe book", "A school bag", "A train ticket"], "Welches Geschenk plant Kim für die Gastfamilie?", ["Ein Kochbuch", "Eine Schultasche", "Eine Zugfahrkarte"]],
    ["The school website says the concert starts at seven. An older poster says half past six. The music teacher has confirmed that the website was updated today. Tickets are still valid.", "Which starting time should visitors use?", ["Seven o'clock", "Half past six", "Half past seven"], "Welche Anfangszeit gilt laut aktueller Bestätigung?", ["19 Uhr", "18:30 Uhr", "19:30 Uhr"]],
    ["Ava used to buy a plastic bottle every day. This month she has started carrying a reusable bottle. She fills it at school and has saved some pocket money as well as reducing waste.", "What has Ava changed?", ["She uses a reusable bottle", "She buys more bottles", "She no longer drinks water"], "Was hat Ava verändert?", ["Sie verwendet eine Mehrwegflasche", "Sie kauft mehr Flaschen", "Sie trinkt kein Wasser mehr"]],
    ["The football team lost its first match. Rather than blaming one player, they discussed how to pass the ball better. After three weeks of practice, they played more confidently, even though the next match was a draw.", "What helped the team improve?", ["Practising together", "Blaming one player", "Cancelling every match"], "Was half der Mannschaft, sich zu verbessern?", ["Gemeinsam zu trainieren", "Einem Spieler die Schuld zu geben", "Alle Spiele abzusagen"]],
    ["Our guide asked us to stay on the path because rare flowers were growing beside it. We could take photographs, but picking flowers was forbidden. At the end, she gave us a leaflet about the plants.", "What were visitors allowed to do?", ["Take photographs", "Pick flowers", "Walk anywhere"], "Was war bei der Führung erlaubt?", ["Fotos machen", "Blumen pflücken", "Überall herumlaufen"]],
    ["The train to York was delayed by thirty minutes. Ellis sent a message to the host family with the new arrival time. They replied that they would meet Ellis at the station café instead of the platform.", "Where will the host family meet Ellis?", ["At the station café", "On the platform", "At the airport"], "Wo wartet die Gastfamilie jetzt auf Ellis?", ["Im Bahnhofscafé", "Auf dem Bahnsteig", "Am Flughafen"]],
    ["Our class wanted to raise money for new sports equipment. We considered washing cars, but too few adults could help. We chose a sponsored walk because everyone could take part safely with our teachers.", "Why did the class choose the walk?", ["Everyone could take part safely", "Nobody wanted new equipment", "The car wash raised enough money"], "Warum entschied sich die Klasse für den Spendenlauf?", ["Alle konnten sicher teilnehmen", "Niemand wollte neue Sportgeräte", "Die Autowäsche brachte genug Geld"]],
    ["Nina has practised her presentation several times, but she still feels nervous. Her friend suggests using small cards with key words instead of reading a full page. Nina tries this and can look at the audience more often.", "What helps Nina look at her audience?", ["Cards with key words", "A longer written script", "Closing her eyes"], "Welche Hilfe erleichtert Nina den Blick ins Publikum?", ["Karten mit Stichwörtern", "Ein längeres ausformuliertes Skript", "Die Augen zu schließen"]],
    ["A review praises a new game but includes a link that pays the writer when readers buy it. The writer explains this at the end. Before deciding, Leo reads independent reviews and checks whether the game suits his age.", "What does Leo do before deciding?", ["Checks other reviews", "Buys immediately", "Shares his password"], "Was tut Leo vor seiner Entscheidung?", ["Weitere Bewertungen prüfen", "Sofort kaufen", "Sein Passwort weitergeben"]],
    ["Yesterday, the cooking club made soup for a community lunch. One group prepared vegetables while another set the tables. Because one guest could not eat dairy products, they served the cream separately.", "Why was the cream served separately?", ["A guest could not eat dairy products", "The soup was too cold", "Nobody liked vegetables"], "Warum wurde die Sahne getrennt angeboten?", ["Ein Gast vertrug keine Milchprodukte", "Die Suppe war zu kalt", "Niemand mochte Gemüse"]],
    ["If the weather is dry on Friday, our class will cycle to the nature centre. If it rains heavily, we will take the bus. Everyone must bring lunch because the centre's café is closed.", "What will the class do if it rains heavily?", ["Take the bus", "Cancel lunch", "Cycle anyway"], "Was macht die Klasse bei starkem Regen?", ["Den Bus nehmen", "Das Mittagessen absagen", "Trotzdem mit dem Rad fahren"]],
    ["The invitation asked guests to arrive at two. Morgan arrived ten minutes early and offered to help set the table. The host thanked Morgan but said everything was ready, so they looked at photographs together.", "What did Morgan offer to do?", ["Help set the table", "Cook the whole meal", "Leave immediately"], "Welche Hilfe bot Morgan an?", ["Beim Tischdecken helfen", "Das ganze Essen kochen", "Sofort wieder gehen"]],
    ["During the exchange, Ben noticed that his host family ate dinner earlier than his own family. He asked about their routine politely. His host explained that different families have different habits, even in the same country.", "What did Ben learn?", ["Family habits can differ within a country", "All families eat at the same time", "Questions are always impolite"], "Was lernte Ben über Familiengewohnheiten?", ["Sie können auch innerhalb eines Landes verschieden sein", "Alle Familien essen zur gleichen Zeit", "Nachfragen ist immer unhöflich"]],
    ["The library's website offers an audio version of the story. Ruby listens first, then reads the chapter and notes unfamiliar phrases. Finally, Ruby uses two new phrases in a short message to a friend.", "How does Ruby use the new phrases?", ["In a message to a friend", "Only in a spelling list", "By deleting them"], "Wie wendet Ruby die neuen Wendungen an?", ["In einer Nachricht an eine Freundin", "Nur in einer Rechtschreibliste", "Indem Ruby sie löscht"]],
    ["Sam bought a second-hand jacket online with a parent's help. The seller's measurements were smaller than the label suggested. Sam checked those measurements against a jacket at home before ordering.", "What helped Sam choose the size?", ["Comparing actual measurements", "Only looking at the label", "Choosing the cheapest colour"], "Was half Sam bei der Größenwahl?", ["Die tatsächlichen Maße zu vergleichen", "Nur auf das Etikett zu schauen", "Die billigste Farbe zu wählen"]],
    ["The school council asked pupils for ideas about the playground. Most wanted more places to sit, but younger pupils also requested quiet games. The council included both ideas in its proposal.", "What did the council include?", ["Seating and quiet games", "Only a football pitch", "Only ideas from older pupils"], "Was nahm die Schülervertretung in den Vorschlag auf?", ["Sitzplätze und ruhige Spiele", "Nur einen Fußballplatz", "Nur Ideen älterer Kinder"]],
    ["At the museum, one sign described what happened a hundred years ago. Another explained how historians used letters to find out. Maya realised that the letters were evidence for the account rather than decorations.", "What were the old letters used as?", ["Historical evidence", "Decorations only", "Tickets"], "Welche Funktion hatten die alten Briefe?", ["Historische Belege", "Nur Dekoration", "Eintrittskarten"]],
    ["The message said the club meeting had moved from Room 8 to Room 14. It also reminded everyone to bring the permission form. The meeting time was unchanged, at half past three.", "What changed about the meeting?", ["The room", "The time", "The day"], "Was wurde am Treffen geändert?", ["Der Raum", "Die Uhrzeit", "Der Tag"]],
    ["We have finished the first draft of our class story. Our teacher asked us to check whether events follow a clear order. We added time phrases before correcting individual spelling mistakes.", "What did the class improve first?", ["The order of events", "The cover colour", "Every spelling mistake"], "Was verbesserte die Klasse zuerst?", ["Die Reihenfolge der Ereignisse", "Die Farbe des Umschlags", "Jeden Rechtschreibfehler"]],
    ["A friend posted a group photo without asking. Isla wanted it removed because one child did not want to be shown online. The friend deleted it and agreed to ask everyone before sharing another photo.", "What did the friend agree to do next time?", ["Ask everyone first", "Post every photo immediately", "Hide the names only"], "Was vereinbarte die Gruppe für das nächste Foto?", ["Vorher alle fragen", "Jedes Foto sofort posten", "Nur die Namen verstecken"]],
    ["The weather forecast predicted sunshine, but dark clouds appeared during our walk. We checked the updated forecast and took the shorter route home. Soon afterwards, it started raining.", "Why did the group take the shorter route?", ["The weather was changing", "They had lost the map", "The sun was too bright"], "Warum nahm die Gruppe den kürzeren Heimweg?", ["Das Wetter änderte sich", "Sie hatte die Karte verloren", "Die Sonne war zu hell"]],
    ["Kai has never visited a farm before. Next week, the class is going to learn where food comes from. Kai wants to ask how the farmer cares for animals during winter.", "What does Kai want to learn about?", ["Animal care in winter", "Train tickets", "Summer sports"], "Worüber möchte Kai mehr erfahren?", ["Die Tierpflege im Winter", "Zugfahrkarten", "Sommersport"]],
    ["For the class podcast, each speaker recorded a short introduction. The first version had loud background music, so listeners could not understand the words. The group lowered the music and recorded the voices again.", "Why did the group change the recording?", ["The words were difficult to hear", "The introduction was missing", "The podcast had no music"], "Warum überarbeitete die Gruppe die Aufnahme?", ["Die Wörter waren schlecht zu verstehen", "Die Einleitung fehlte", "Der Podcast hatte keine Musik"]]
  ]
};

for (const grade of [3, 4, 5, 6]) {
  const stories = englishStories[grade];
  addEnglishTopic(grade, "reading", grade < 5 ? "Kurze Texte verstehen" : "Nachrichten und Geschichten lesen", "Lies den englischen Text und die Frage. Wähle die Antwort, die durch den Text belegt ist.", stories.map(([text, question, choices], index) => ({
    text: `Lies: ${text} Frage: ${question}`, answer: choices[0], choices, modelText: text,
    key: `en:${grade}:story:${index}`, hint: "Suche die Textstelle, die genau zur Frage passt."
  })), "en-reading");
  addEnglishTopic(grade, "listening", "Zuhören und verstehen", "Spiele den Hörtext ab, höre bei Bedarf mehrmals zu und beantworte die Frage. Zum Mitlesen kannst du den Text aufklappen.", stories.map(([text, question, choices], index) => ({
    text: `Höre zu. ${question}`, audioText: text, answer: choices[0], choices,
    key: `en:${grade}:story:${index}`, hint: "Spiele den Text erneut ab. Achte gezielt auf die Information aus der Frage."
  })), "en-listening");
  addEnglishTopic(grade, "mediation", "Für andere auf Deutsch erklären", "Jemand versteht den englischen Text nicht. Gib nur die gesuchte Information sinngemäß auf Deutsch weiter. Du musst nicht jedes Wort übersetzen.", stories.map(([text, question, choices, germanQuestion, germanChoices]) => ({
    text: `Erkläre jemandem auf Deutsch: ${text} ${germanQuestion}`, answer: germanChoices[0], choices: germanChoices,
    hint: "Suche die gesuchte Information und wähle die passende deutsche Bedeutung."
  })), "en-mediation");
}

englishChoices(4, "children-culture", "Kinder und ihre Lebenswelten", "Lies die Beispiele genau. Kinder und Familien leben unterschiedlich; ein einzelnes Beispiel gilt nicht für alle Menschen eines Landes.", [
  ["Mia schreibt aus London: In my school, we wear a uniform. Was erzählt sie über ihre Schule?", "Dort tragen die Kinder Schulkleidung.", "Dort gibt es keinen Unterricht.", "Dort dürfen keine Kinder lesen."],
  ["Ben schreibt: My friend goes to a school without a uniform. Was lernst du?", "Schulen können unterschiedliche Regeln haben.", "Alle Schulen haben dieselben Regeln.", "Alle Kinder tragen dieselbe Uniform."],
  ["Ella schreibt: We have a packed lunch today. Was hat sie dabei?", "Mitgebrachtes Mittagessen", "Neue Sportschuhe", "Ein Musikinstrument"],
  ["Noah schreibt: I eat lunch in the school canteen. Wo isst er?", "In der Schulkantine", "Im Schwimmbad", "Am Bahnhof"],
  ["Ein Kind sagt: At Christmas, we visit Grandma. Was beschreibt es?", "Eine Weihnachtsgewohnheit seiner Familie", "Eine Pflicht für alle Familien", "Seinen täglichen Schulweg"],
  ["Eine Freundin feiert ein Fest, das du nicht kennst. Wie reagierst du offen?", "Du fragst freundlich, wie sie feiert.", "Du machst dich darüber lustig.", "Du behauptest, alle feiern gleich."],
  ["Auf einer Karte steht Happy birthday! Zu welchem Anlass passt sie?", "Geburtstag", "Schulbeginn", "Gute Nacht"],
  ["Auf einer Karte steht Happy New Year! Was wünscht sie?", "Ein frohes neues Jahr", "Einen guten Morgen", "Eine gute Reise"],
  ["Sam aus York sagt: I speak English and Polish at home. Was erfährst du?", "Zu Hause werden zwei Sprachen gesprochen.", "Sam spricht nur Englisch.", "Sam wohnt in Polen."],
  ["Ein Kind aus Cardiff schreibt: I like singing. Was ist sein Hobby?", "Singen", "Schwimmen", "Zeichnen"],
  ["Ein Kind aus Edinburgh schreibt: My dad cooks dinner. Wer kocht?", "Der Vater", "Die Schwester", "Die Lehrkraft"],
  ["Ein Kind aus Belfast schreibt: I live with my mum. Was erzählt es?", "Mit wem es wohnt", "Welche Sprache alle Menschen sprechen", "Was alle Kinder essen"],
  ["In einem Laden steht der Preis £2. Was zeigt £ hier an?", "Pfund", "Euro", "Cent"],
  ["Ein Kind bittet: A sandwich, please. Welches Wort macht die Bitte höflich?", "please", "sandwich", "a"],
  ["Ein Gast sagt Thank you! Wie antwortest du freundlich?", "You're welcome!", "Go away!", "Be quiet!"],
  ["Ein Kind lädt dich ein: Would you like to play? Was möchte es?", "Zusammen spielen", "Deinen Namen ändern", "Dich wegschicken"],
  ["Ein Kind sagt: I don't eat meat. Was beachtest du beim gemeinsamen Essen?", "Du bietest etwas ohne Fleisch an.", "Du zwingst es, Fleisch zu essen.", "Du bestellst nur Fleisch."],
  ["In einem Brief steht Dear Mia am Anfang. Was ist das?", "Die Anrede", "Der Preis", "Eine Uhrzeit"],
  ["Am Ende eines Briefs steht Best wishes, Alex. Welche Aufgabe hat Best wishes?", "Ein freundlicher Abschlussgruß", "Eine Ortsangabe", "Eine Warnung"],
  ["Ein Kind sagt football, ein anderes soccer zum selben Spiel. Was ist möglich?", "Es gibt verschiedene englische Wörter für dasselbe Spiel.", "Nur eines der Kinder darf mitspielen.", "Die Kinder meinen immer verschiedene Sportarten."],
  ["Eine Freundin sagt: My family celebrates Diwali. Was kannst du respektvoll fragen?", "How do you celebrate?", "Why are you wrong?", "Can you stop celebrating?"],
  ["Ein Kind erzählt von einem Fest. Was solltest du daraus schließen?", "So feiert dieses Kind mit seiner Familie.", "Alle Menschen des Landes feiern genau so.", "Andere Feste sind falsch."],
  ["Ein Gast möchte ein unbekanntes Spiel kennenlernen. Was hilft?", "Die Regeln freundlich erklären und vormachen.", "Den Gast ausschließen.", "Nur über Fehler lachen."],
  ["Ein Kind spricht Englisch mit einem anderen Akzent. Was hilft beim Gespräch?", "Aufmerksam zuhören und bei Bedarf freundlich nachfragen.", "Sich über den Akzent lustig machen.", "Das Gespräch sofort abbrechen."]
], "en-reading");

const englishMediaCards = [
  ["Dear Mia, would you like to come to my party on Saturday? Best wishes, Ben. Welche Textsorte ist das?", "Eine Einladung", "Ein Wetterbericht", "Eine Spielanleitung"],
  ["Ingredients: two eggs, milk, flour. Welche Textsorte ist das wahrscheinlich?", "Ein Rezept", "Ein Fahrplan", "Eine Geburtstagskarte"],
  ["First, roll the dice. Then move your counter. Welche Absicht hat der Text?", "Ein Spiel erklären", "Ein Produkt bewerben", "Von Ferien erzählen"],
  ["Visit our shop! The best shoes in town! Welche Absicht steht im Vordergrund?", "Zum Kaufen anregen", "Neutral Forschung erklären", "Eine persönliche Einladung schicken"],
  ["Ein englischer Text nennt Autor und Datum. Was kannst du damit besser prüfen?", "Herkunft und Aktualität", "Ob der Text immer wahr ist", "Ob du nie vergleichen musst"],
  ["Ein alter Schulpost nennt Tuesday, die heutige Schulmail Thursday. Was hilft?", "Die aktuelle offizielle Angabe prüfen.", "Immer den ältesten Text wählen.", "Nur nach der Schriftfarbe entscheiden."],
  ["Private: Do not share your password. Was soll privat bleiben?", "Das Passwort", "Das Wetter", "Die Farbe eines Apfels"],
  ["Du möchtest ein Foto von Freunden online stellen. Was tust du vorher?", "Alle abgebildeten Personen fragen.", "Es sofort hochladen.", "Nur den Dateinamen ändern."],
  ["In einer Mail steht ein unbekanntes Wort. Was hilft zuerst?", "Den Zusammenhang und bekannte Wörter nutzen.", "Den Rest der Mail ignorieren.", "Immer die längste Bedeutung raten."],
  ["Ein Wörterbuch zeigt mehrere Bedeutungen von bank. Wie wählst du?", "Mit dem Zusammenhang im Satz.", "Immer den ersten Eintrag nehmen.", "Nur die Anzahl der Buchstaben prüfen."],
  ["Du schreibst eine freundliche Nachricht an Jo. Welche Anrede passt?", "Hi Jo,", "Buy now!", "Ingredients:"],
  ["Welcher Abschluss passt zu einer freundlichen E-Mail?", "Best wishes, Sam", "Keep off the grass!", "Turn left now!"],
  ["Du sollst Notizen zu einem Hörtext machen. Was ist sinnvoll?", "Wichtige Stichwörter festhalten.", "Jedes Wort sofort vollständig abschreiben.", "Nur die Satzzeichen zählen."],
  ["Ein Podcast ist zu leise aufgenommen. Was verbessert das Verstehen?", "Die Stimme klarer und lauter aufnehmen.", "Die Hintergrundmusik lauter machen.", "Alle Pausen löschen."],
  ["Eine Überschrift lautet School trip cancelled. Was erwartest du?", "Informationen zu einem abgesagten Ausflug", "Ein Rezept für Kuchen", "Einen Tiersteckbrief"],
  ["Ein Aushang sagt Lost: a blue bag. Worum geht es?", "Eine verlorene Tasche", "Eine neue Schuluniform", "Eine geplante Busfahrt"],
  ["Ein Text sagt I think this is the best book. Was ist das?", "Eine persönliche Meinung", "Eine für alle gültige Messung", "Eine Uhrzeit"],
  ["Ein Fahrplan sagt Bus departs at 10:15. Welche Information findest du?", "Die Abfahrtszeit", "Die Meinung des Fahrers", "Den Namen aller Fahrgäste"],
  ["Du willst jemandem die Hauptaussage erklären. Was wählst du?", "Die wesentlichen Informationen.", "Immer jedes einzelne Wort.", "Nur die längsten Wörter."],
  ["Für einen englischen Steckbrief sammelst du Name, age, hobbies. Was hast du erstellt?", "Eine hilfreiche Schreibplanung", "Einen Wetterbericht", "Eine Preisliste"],
  ["Ein Text ist schwer. Welche Lesestrategie passt?", "Erst das Thema erfassen, dann Einzelheiten suchen.", "Jedes unbekannte Wort als Fehler zählen.", "Nur den letzten Buchstaben lesen."],
  ["Du möchtest ein fremdes Bild für ein Schulplakat nutzen. Was prüfst du?", "Ob und unter welchen Bedingungen du es verwenden darfst.", "Nur die Bildgröße.", "Nur die Farbe des Rahmens."],
  ["Eine Nachricht drängt: Click now and win! Was ist sinnvoll?", "Mit einer vertrauten erwachsenen Person prüfen.", "Sofort persönliche Daten eingeben.", "Das Passwort schicken."],
  ["Du überarbeitest deine englische Nachricht. Was prüfst du zuerst?", "Ob die wichtigen Informationen verständlich sind.", "Nur ob alle Wörter gleich lang sind.", "Nur die Hintergrundfarbe."]
];
englishChoices(5, "texts-media", "Texte, Medien und Lernstrategien", "Achte auf Textsorte, Absicht, Quelle und wichtige Informationen. Nutze den Zusammenhang und geeignete Hilfsmittel zum Verstehen.", englishMediaCards, "en-reading");

// Klasse 6 bearbeitet komplexere Begründungen und englische Medienhinweise.
englishChoices(6, "texts-media", "Quellen prüfen und Texte überarbeiten", "Prüfe Aussagen anhand der Quelle, ihres Datums und ihrer Absicht. Achte beim Überarbeiten auch auf Aufbau und passende Verknüpfungen.", [
  ["A review says: I received this game for free from the company. Warum ist der Hinweis wichtig?", "Die kostenlose Bereitstellung kann das Urteil beeinflussen.", "Die Bewertung ist automatisch falsch.", "Der Text ist dadurch ein Fahrplan."],
  ["Ein Blog sagt: All children in Britain love football. Wie beurteilst du das?", "Die Aussage verallgemeinert zu stark.", "Das gilt sicher für jedes einzelne Kind.", "Ein Blog kann nie eine Meinung enthalten."],
  ["The museum's official website was updated today. An old blog gives different opening times. Was prüfst du zuerst?", "Die aktuelle Angabe des Museums.", "Nur die ältere Blogangabe.", "Nur die Schriftgröße."],
  ["Ein Text enthält These are the best trainers ever! Welche Frage hilft bei der Einordnung?", "Ist das eine Meinung oder Werbung?", "Wie viele Uhrzeiten sind enthalten?", "Ist jede Behauptung automatisch bewiesen?"],
  ["Before sharing a photo, ask the people in it. Was ist der Kern der Aufforderung?", "Vor dem Teilen die Abgebildeten fragen.", "Nur den Hintergrund ausschneiden.", "Jedes Foto immer sofort teilen."],
  ["Eine Quelle nennt keine Belege für eine überraschende Behauptung. Was hilft?", "Die Behauptung mit verlässlichen Quellen vergleichen.", "Sie wegen der großen Überschrift glauben.", "Sie ungeprüft weitergeben."],
  ["Du fasst eine englische Nachricht für deine Familie zusammen. Was ist wichtig?", "Die für die Familie relevanten Angaben korrekt weitergeben.", "Jedes Wort in derselben Reihenfolge übersetzen.", "Unbekannte Details erfinden."],
  ["In einem Erlebnisbericht steht zuerst Finally und dann First. Was überprüfst du?", "Die zeitliche Reihenfolge.", "Nur die Anzahl der Nomen.", "Die Farbe der Überschrift."],
  ["I wanted to play outside, ___ it was raining. Welche Verbindung passt zum Gegensatz?", "but", "because", "or"],
  ["We stayed indoors ___ it was raining. Welche Verbindung nennt den Grund?", "because", "but", "or"],
  ["You can write a letter ___ send an email. Welche Verbindung nennt eine Wahl?", "or", "because", "but"],
  ["I packed my bag ___ checked the tickets. Welche Verbindung reiht die Handlungen aneinander?", "and", "because", "or"],
  ["Ein Wörterbucheintrag gibt read auch als Vergangenheitsform an. Was solltest du zusätzlich anhören?", "Die Aussprache in der jeweiligen Zeitform.", "Nur die Länge des Eintrags.", "Den Namen der Website rückwärts."],
  ["Ein Podcast hat laute Musik unter der Stimme. Welche Überarbeitung hilft?", "Hintergrundmusik leiser machen.", "Musik noch lauter machen.", "Die Stimme ganz entfernen."],
  ["Ein Text nennt Last weekend, verwendet aber überall now. Was prüfst du?", "Ob Zeitangaben und Zeitformen zusammenpassen.", "Ob alle Wörter großgeschrieben sind.", "Ob die Sätze dieselbe Länge haben."],
  ["Dear Headteacher, … Welche Abschlussformel ist für eine höfliche Nachricht eher passend?", "Kind regards", "Buy now", "Game over"],
  ["Ein Online-Wörterbuch zeigt mehrere Bedeutungen. Wie entscheidest du?", "Satzkontext und Wortart beachten.", "Immer die längste Übersetzung wählen.", "Nur die erste Silbe lesen."],
  ["Du sollst einen Text nicht vollständig kopieren, sondern zusammenfassen. Was tust du?", "Hauptinformationen in eigenen Worten wiedergeben.", "Alle Sätze unverändert übernehmen.", "Nur Eigennamen entfernen."],
  ["Eine Schulmail sagt: Please reply by Friday. Was ist zu tun?", "Bis Freitag antworten.", "Erst am Montag lesen.", "Die Nachricht sofort löschen."],
  ["Ein Bericht nennt Befragung und Teilnehmerzahl. Warum kann das helfen?", "Die Grundlage der Aussage wird prüfbar.", "Die Aussage gilt damit zwingend für alle Menschen.", "Ein Vergleich ist dadurch verboten."],
  ["Ein Text sagt Some families eat early. Welches Wort begrenzt die Aussage?", "Some", "families", "eat"],
  ["Du gibst Feedback: Your story is clear, but the ending is missing. Worauf weist du hin?", "Auf einen fehlenden Schluss.", "Auf eine falsche Einladung.", "Auf eine fehlende Preisliste."],
  ["Eine Übersetzungs-App liefert einen seltsamen Satz. Was hilft?", "Mit Kontext, bekannten Strukturen und Wörterbuch prüfen.", "Jede Ausgabe ungeprüft übernehmen.", "Nur die Schriftart wechseln."],
  ["Du lernst neue Wendungen. Welche Anwendung hilft beim Behalten?", "Sie in einer eigenen passenden Nachricht verwenden.", "Sie nur einmal flüchtig ansehen.", "Ihre Bedeutung grundsätzlich ignorieren."]
], "en-reading");

function makeEnglishQuestion(topic) {
  const pool = englishPools[progress.grade]?.[topic.mode];
  if (!pool) throw new Error(`Unbekanntes Englischthema: ${progress.grade}/${topic.mode}`);
  const card = pickRandom(pool);
  const { choices, ...question } = card;
  const options = choices ? shuffled([...new Set(choices)].filter(choice => choice !== card.answer)).slice(0, 3) : null;
  return {
    ...question,
    key: card.key || `en:${progress.grade}:${topic.mode}:${pool.indexOf(card)}`,
    ...(options ? { options: shuffled([card.answer, ...options]) } : {})
  };
}
