// Curated image assignments for the finite NRW English corpus.
// The image illustrates a word or theme; it never asserts the missing grammar,
// a location relationship or a quantity that the learner is meant to supply.
const englishImageLabels = {
  "board-game": "Brettspiel", age: "Alter", pets: "Haustiere", food: "Essen", clothes: "Kleidung", drinks: "Getränke", weather: "Wetter", feelings: "Gefühle", menu: "Speisekarte", "shopping-bag": "Einkaufstüte", box: "Kiste", walking: "Gehen", film: "Film",
  colours: "Farben", conversation: "Gespräch", birthday: "Geburtstag", greeting: "Begrüßung", farewell: "Verabschiedung", question: "Frage", repeat: "Erneut zuhören", help: "Hilfe", shopping: "Einkaufen", payment: "Bezahlen", calendar: "Kalender", gift: "Geschenk", umbrella: "Regenschirm", tree: "Baum", gate: "Gatter", bus: "Bus", train: "Zug", bike: "Fahrrad", zoo: "Zoo", picnic: "Picknick", museum: "Museum", science: "Experiment", theatre: "Theater", ticket: "Eintrittskarte", podcast: "Podcast", microphone: "Mikrofon", mask: "Maske", newspaper: "Zeitung", plant: "Pflanze", watering: "Pflanzen gießen", helmet: "Fahrradhelm", nature: "Natur", path: "Weg", castle: "Burg", waterfall: "Wasserfall", "reusable-bottle": "Mehrwegflasche", money: "Geld", teamwork: "Zusammenarbeit", presentation: "Vortrag", review: "Bewertungen prüfen", privacy: "Privatsphäre schützen", photo: "Foto", email: "Nachricht", dictionary: "Wörterbuch", notebook: "Notizheft", writing: "Schreiben", map: "Karte", clock: "Uhrzeit", recipe: "Rezept", rules: "Regeln", health: "Gesundheit", "traffic-light": "Ampel", "hot-pan": "Heiße Pfanne", cup: "Tasse", camera: "Kamera", ball: "Ball", model: "Modell", bottle: "Flasche", sugar: "Zucker", homework: "Hausaufgaben", music: "Musik", running: "Laufen", jumping: "Springen", person: "Person", flower: "Blume", work: "Arbeit", lunch: "Mittagessen", coffee: "Kaffee", flour: "Mehl", car: "Auto", key: "Schlüssel", wall: "Wand", fridge: "Kühlschrank", bush: "Busch", bowl: "Napf", meeting: "Treffen", document: "Dokument", invitation: "Einladung", celebration: "Feier", sleep: "Schlafen", vegetables: "Gemüse", listening: "Zuhören"
};

function englishImage(key, alt) {
  return { key, src: `illustrations/english/${key}.svg`, alt: alt || `Symbol: ${englishImageLabels[key] || key}` };
}
function englishImageTextKey(text) {
  return String(text).normalize("NFC").replace(/\s+/g, " ").trim();
}
function splitEnglishImageSentences(text) {
  return (String(text).match(/[^.!?]+(?:[.!?]+|$)/g) || []).map(part => part.trim()).filter(Boolean);
}
const englishVocabularyImages = Object.create(null);
const englishImageAudit = [];

// Exact dictionary entries, not first-match keyword detection.
for (const grade of [3, 4, 5, 6]) {
  for (const topic of englishCurriculum[grade]) {
    for (const card of englishPools[grade][topic.mode]) {
      if (!card.text.startsWith("Welches englische Wort passt zu")) continue;
      const word = card.answer;
      let key = word.toLowerCase().replace(/\s+/g, "-");
      let description = card.text.match(/„([^“]+)“/)?.[1] || word;
      if (topic.mode === "colours-numbers") key = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white", "grey"].includes(word) ? `colour-${word}` : `count-${word}`;
      if (topic.mode === "calendar" && !["spring", "summer", "autumn", "winter", "birthday"].includes(word)) {
        key = "calendar";
        description = "Kalender – Thema Tage und Monate";
      }
      englishImageLabels[key] = description;
      englishVocabularyImages[word.toLowerCase()] = englishImage(key, `Symbol: ${description}`);
      card.image = englishVocabularyImages[word.toLowerCase()];
    }
  }
}

const englishActionImageKeys = ["football", "film", "reading", "writing", "apple", "water", "sandwich", "camera", "drawing", "painting", "kitchen", "window", "door", "friend", "help", "car", "bread", "key", "cake", "model", "singing", "dictionary", "cooking", "school-bag"];
const englishWritingImageKeys = ["conversation", "birthday", "house", "colours", "rabbit", "swimming", "calendar", "sister", "football", "piano", "room", "school-bag", "cat", "bread", "water", "calendar", "garden", "dog", "coat", "summer", "book", "music", "park", "apple"];
const englishModeImageKeys = {
  "first-dialogues": ["greeting", "conversation", "conversation", "birthday", "happy", "farewell", "sunny", "help", "conversation", "pencil", "question", "repeat", "apple", "milk", "colours", "dog", "swimming", "bird", "sister", "game", "hungry", "birthday", "greeting", "calendar"],
  positions: ["cat", "book", "ball", "dog", "chair", "park", "shoes", "bird", "picture", "socks", "garden", "lamp", "pen", "bus", "milk", "cup", "mouse", "bike", "library", "shop", "teacher", "apple", "hat", "rabbit"],
  shopping: ["apple", "payment", "water", "shopping", "shopping", "banana", "bread", "juice", "menu", "sandwich", "apple", "biscuit", "tea", "ice-cream", "t-shirt", "t-shirt", "payment", "shopping-bag", "carrot", "milk", "payment", "pear", "jacket", "farewell"],
  "profile-writing": englishWritingImageKeys,
  "guided-writing": englishWritingImageKeys,
  "language-discovery": ["dictionary", "apple", "repeat", "listening", "hand", "house", "rabbit", "carrot", "calendar", "book", "writing", "calendar", "cold", "question", "summer", "winter", "dog", "ball", "dictionary", "colours", "playground", "listening", "reading", "conversation"],
  "be-have": ["happy", "tired", "hungry", "school-bag", "clock", "house", "school", "garden", "kitchen", "park", "classroom", "bus", "dog", "sister", "bike", "book", "school-bag", "piano", "room", "jacket", "hamster", "football", "umbrella", "question"],
  pronouns: ["dog", "bike", "sister", "garden", "cat", "book", "dog", "friend", "brother", "mother", "father", "book", "team", "cat", "guitar", "reading", "dog", "canteen", "swimming", "pencil", "teacher", "hospital", "house", "friend"],
  comparison: ["bike", "tree", "horse", "school-bag", "room", "cold", "box", "notebook", "sofa", "cinema", "notebook", "windy", "path", "street", "sister", "team", "train", "bus", "shoes", "house", "nature", "swimming-pool", "happy", "book"],
  quantities: ["book", "apple", "pupil", "chair", "egg", "car", "dog", "bottle", "water", "milk", "rice", "bread", "money", "clock", "sugar", "cheese", "milk", "apple", "apple", "water", "biscuit", "juice", "homework", "bus"],
  modals: ["traffic-light", "hot-pan", "lunch-box", "swimming", "sleep", "museum", "helmet", "ticket", "piano", "water", "zoo", "school", "cup", "bike", "teacher", "camera", "library", "clock", "conversation", "notebook", "privacy", "team", "pen", "health"],
  conditionals: ["rainy", "notebook", "help", "bus", "sleep", "help", "sunny", "bike", "shop", "conversation", "clock", "invitation", "dog", "teamwork", "map", "coat", "book", "sandwich", "bus", "celebration", "apple", "email", "room", "playground"],
  "children-culture": ["uniform", "school", "lunch-box", "canteen", "family", "celebration", "birthday", "calendar", "family", "singing", "cooking", "family", "money", "sandwich", "conversation", "game", "vegetables", "email", "email", "football", "celebration", "family", "game", "conversation"]
};
const englishMediaImageKeys = {
  5: ["invitation", "recipe", "board-game", "shopping", "review", "calendar", "privacy", "photo", "email", "dictionary", "email", "email", "notebook", "podcast", "map", "school-bag", "book", "bus", "conversation", "notebook", "reading", "picture", "privacy", "writing"],
  6: ["review", "football", "museum", "shoes", "photo", "review", "family", "writing", "rainy", "rainy", "email", "school-bag", "dictionary", "podcast", "calendar", "email", "dictionary", "writing", "email", "review", "family", "writing", "dictionary", "email"]
};

// Each row lists the themes of the original story's sentences in their order.
// No question-answer inference: these rows were read and assigned individually.
const englishStorySentenceKeys = {
  3: [
    ["conversation", "birthday"], ["conversation", "cat"], ["colour-red", "colour-blue"], ["apple", "milk"],
    ["garden", "dog"], ["sister", "conversation"], ["cold", "coat"], ["rabbit", "colour-white"],
    ["cat", "dog"], ["thirsty", "water"], ["school", "colour-green"], ["pencil", "colour-yellow"],
    ["swimming", "swimming"], ["sunny", "park"], ["brother", "birthday"], ["bread", "lunch-box"],
    ["bird", "tree"], ["colour-blue", "colour-black"], ["tired", "bed"], ["book", "school-bag"],
    ["running", "sleep"], ["birthday", "cake"], ["grandmother", "reading"], ["hand", "hand"]
  ],
  4: [
    ["flat", "bedroom", "desk"], ["football", "swimming", "reading"], ["cake", "egg", "flour"],
    ["shop", "clock", "calendar"], ["rabbit", "carrot", "rabbit"], ["birthday", "friend", "playground"],
    ["rainy", "umbrella", "colour-yellow"], ["singing", "guitar", "music"], ["library", "swimming-pool", "library"],
    ["tea", "coffee", "juice"], ["school", "lunch-box", "house"], ["winter", "snowy", "summer"],
    ["colour-red", "colour-green", "colour-green"], ["gate", "sheep", "gate"], ["chess", "friend", "chess"],
    ["dog", "cat", "hamster"], ["bread", "school-bag", "colour-blue"], ["family", "grandmother", "family"],
    ["zoo", "giraffe", "monkey", "lion"], ["birthday", "friend", "shelf"], ["bus", "bus", "bus"],
    ["pets", "room", "hamster"], ["salad", "tomato", "carrot"], ["running", "jumping", "sport"]
  ],
  5: [
    ["school", "science", "science", "email"], ["school", "bus", "work"], ["theatre", "ticket", "cake"],
    ["money", "bike", "helmet"], ["podcast", "conversation", "microphone"], ["swimming", "swimming", "swimming"],
    ["vegetables", "canteen", "pasta"], ["exercise-book", "school-bag", "table"], ["newspaper", "mask", "painting"],
    ["museum", "ticket", "museum"], ["garden", "carrot", "watering"], ["birthday", "park", "coat"],
    ["football", "cycling", "grandmother"], ["library", "book", "book"], ["email", "sport", "shoes"],
    ["cooking", "cat", "hospital"], ["uniform", "colour-white", "sport"], ["dog", "bird", "nature"],
    ["bus", "clock", "school"], ["picnic", "sandwich", "water", "nature"], ["dog", "dog", "help"],
    ["conversation", "listening", "dictionary"], ["chess", "room", "chess"], ["email", "lunch-box", "train"]
  ],
  6: [
    ["castle", "document", "waterfall", "nature"], ["school-bag", "gift", "recipe", "farewell"],
    ["music", "document", "teacher", "ticket"], ["bottle", "reusable-bottle", "money"],
    ["football", "teamwork", "team"], ["flower", "camera", "document"], ["train", "email", "station"],
    ["money", "car", "walking"], ["presentation", "notebook", "presentation"], ["review", "document", "review"],
    ["soup", "vegetables", "milk"], ["cycling", "bus", "lunch-box"], ["invitation", "table", "photo"],
    ["family", "conversation", "family"], ["listening", "reading", "email"], ["jacket", "ruler", "jacket"],
    ["playground", "chair", "document"], ["museum", "email", "document"], ["email", "document", "clock"],
    ["writing", "teacher", "writing"], ["photo", "privacy", "conversation"], ["sunny", "map", "rainy"],
    ["cow", "vegetables", "winter"], ["podcast", "microphone", "podcast"]
  ]
};
const englishStoryQuestionKeys = {
  3: ["birthday", "cat", "school-bag", "apple", "garden", "sister", "coat", "rabbit", "cat", "water", "door", "ruler", "swimming", "sunny", "brother", "lunch-box", "bird", "shoes", "tired", "book", "dog", "birthday", "reading", "hand"],
  4: ["desk", "swimming", "recipe", "shop", "rabbit", "birthday", "umbrella", "guitar", "library", "juice", "lunch-box", "winter", "t-shirt", "gate", "chess", "cat", "apple", "family", "zoo", "email", "bus", "hamster", "salad", "sport"],
  5: ["science", "school", "theatre", "money", "podcast", "swimming", "canteen", "exercise-book", "painting", "museum", "watering", "birthday", "sport", "reading", "sport", "family", "uniform", "nature", "bus", "picnic", "dog", "dictionary", "chess", "train"],
  6: ["castle", "gift", "music", "reusable-bottle", "team", "nature", "station", "money", "presentation", "review", "soup", "rainy", "invitation", "family", "dictionary", "jacket", "playground", "museum", "meeting", "writing", "privacy", "nature", "cow", "podcast"]
};

// A listening question must not be answered by its illustration before the
// recording has been heard. These rows name a neutral topic or known subject.
const englishListeningImageKeys = {
  3: ["birthday", "pets", "colours", "food", "map", "family", "clothes", "pets", "cat", "drinks", "colours", "school", "hobby", "weather", "family", "food", "bird", "colours", "feelings", "book", "pets", "gift", "family", "person"],
  4: ["desk", "swimming", "recipe", "shop", "rabbit", "birthday", "weather", "music", "map", "drinks", "lunch-box", "calendar", "colours", "sheep", "chess", "pets", "food", "family", "zoo", "email", "bus", "pets", "shopping", "sport"],
  5: ["school", "school", "theatre", "money", "podcast", "swimming", "canteen", "exercise-book", "painting", "museum", "watering", "birthday", "sport", "reading", "sport", "family", "colours", "nature", "bus", "picnic", "document", "dictionary", "chess", "train"],
  6: ["castle", "gift", "music", "water", "team", "nature", "station", "money", "presentation", "computer", "soup", "rainy", "invitation", "family", "reading", "jacket", "playground", "museum", "meeting", "writing", "privacy", "nature", "cow", "podcast"]
};

const englishPhraseImageKeys = {
  "hello": "greeting", "hi": "greeting", "goodbye": "farewell", "good night": "sleep",
  "good morning": "sunny", "good evening": "clock", "welcome": "greeting", "see you": "farewell",
  "see you tomorrow": "calendar", "nice to meet you": "greeting", "thank you": "help", "you’re welcome": "conversation", "you're welcome": "conversation",
  "i'm fine, thank you": "happy", "i'm fine": "happy", "i am tired": "tired", "i'm hungry": "hungry", "i'm sorry": "sad",
  "i'm happy": "happy", "it's blue": "colour-blue", "it's red": "colour-red", "it's green": "colour-green",
  "my favourite colour is blue": "colour-blue", "this is my sister": "sister", "happy birthday": "birthday",
  "happy new year": "calendar", "how old are you": "birthday", "what's your name": "conversation",
  "what's this in english": "dictionary", "i don't understand": "question", "can you say that again, please": "repeat",
  "i like cats": "cat", "i like apples": "apple", "a pencil is red": "pencil", "close the door": "door", "open your book": "book",
  "read a book": "reading", "play football": "football", "drink tea": "tea", "bread and cheese": "lunch-box", "rice and soup": "soup", "cake and milk": "cake"
};

function englishKnownPhraseImage(text) {
  const key = text.toLowerCase().trim().replace(/[.!?]+$/, "");
  if (englishVocabularyImages[key]) return englishVocabularyImages[key];
  if (englishPhraseImageKeys[key]) return englishImage(englishPhraseImageKeys[key]);
  // The complete phrase must be one article or one location phrase + a known
  // noun. No matching a random word anywhere inside a sentence.
  const noun = key.replace(/^(?:(?:in|at|on|under|behind|next to|in front of)\s+)?(?:a|an|the|my|his|her|our|their)\s+/, "");
  if (noun !== key && englishVocabularyImages[noun]) return englishVocabularyImages[noun];
  return null;
}

function setEnglishCardImages(grade, topic, card, index, key) {
  if (!card.image) card.image = englishImage(key);
  if (topic.mode === "listening") card.image = englishImage(englishListeningImageKeys[grade][index]);
  card.sentenceImages = Object.create(null);
  const register = (text, image) => {
    const canonical = englishImageTextKey(text);
    if (!canonical) return;
    card.sentenceImages[canonical] = image;
    for (const sentence of splitEnglishImageSentences(canonical)) {
      if (!card.sentenceImages[englishImageTextKey(sentence)]) card.sentenceImages[englishImageTextKey(sentence)] = image;
    }
  };
  const passages = [
    ...(card.english?.text || []).map(part => typeof part === "string" ? part : part.text),
    ...(card.english?.hint || []).map(part => typeof part === "string" ? part : part.text),
    ...(card.english?.answer || []),
    ...Object.values(card.english?.choices || {}).flat(),
    ...(card.audioText ? [card.audioText] : []), ...(card.modelText ? [card.modelText] : [])
  ];
  for (const passage of passages) register(passage, englishKnownPhraseImage(passage) || card.image);
  if (["reading", "listening", "mediation"].includes(topic.mode)) {
    const story = englishStories[grade][index];
    const sentences = splitEnglishImageSentences(story[0]);
    const keys = englishStorySentenceKeys[grade][index];
    if (sentences.length !== keys.length) throw new Error(`English story image mismatch ${grade}/${index}: ${sentences.length} sentences, ${keys.length} images`);
    sentences.forEach((sentence, sentenceIndex) => { card.sentenceImages[englishImageTextKey(sentence)] = englishImage(keys[sentenceIndex]); });
    card.sentenceImages[englishImageTextKey(story[1])] = englishImage(topic.mode === "listening" ? englishListeningImageKeys[grade][index] : englishStoryQuestionKeys[grade][index]);
    card.sentenceImages[englishImageTextKey(story[0])] = card.image;
  }
  englishImageAudit.push({ grade, mode: topic.mode, index, text: card.text, image: card.image, sentenceImages: card.sentenceImages });
}

for (const grade of [3, 4, 5, 6]) {
  for (const topic of englishCurriculum[grade]) {
    const cards = englishPools[grade][topic.mode];
    let keys;
    if (["reading", "listening", "mediation"].includes(topic.mode)) keys = englishStoryQuestionKeys[grade];
    else if (["simple-present", "questions", "present-progressive", "simple-past", "present-perfect", "future", "past-writing"].includes(topic.mode)) keys = englishActionImageKeys;
    else if (topic.mode === "texts-media") keys = englishMediaImageKeys[grade];
    else keys = englishModeImageKeys[topic.mode];
    cards.forEach((card, index) => {
      if (!card.image && !keys?.[index]) throw new Error(`Missing curated English image: ${grade}/${topic.mode}/${index}`);
      setEnglishCardImages(grade, topic, card, index, keys?.[index] || card.image.key);
    });
  }
}

function getEnglishTaskImage(topic, question) {
  return question?.image || null;
}
function getEnglishSentenceImage(sentence, question) {
  return question?.sentenceImages?.[englishImageTextKey(sentence)] || englishKnownPhraseImage(sentence) || question?.image || null;
}
function collectEnglishImageAudit() {
  return englishImageAudit;
}
