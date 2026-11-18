// Only explicitly marked English passages may enter the audio catalogue.
// German instructions and translations are never sent to speech synthesis.
function englishAudioKey(text) {
  return String(text).normalize("NFC").replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
}

function setEnglishSpeech(grade, mode, index, text = [], choices = []) {
  const card = englishPools[grade][mode][index];
  card.english = {
    text,
    hint: [],
    choices: Object.fromEntries((card.choices || []).map((choice, i) => [choice, choices[i] || []])),
    answer: []
  };
}

// Each grammar pool has a known language boundary, not automatic language detection.
function englishGrammarPassages(mode, text) {
  const prefixes = [
    "Ergänze: ", "Ergänze die Frage: ", "Ergänze die Verneinung: ",
    "Ergänze im present perfect: ", "Der Plan steht fest. Ergänze mit going to: ", "Ergänze mit will: "
  ];
  const prefix = prefixes.find(prefix => text.startsWith(prefix));
  let english = prefix ? text.slice(prefix.length) : text;
  if (["positions", "quantities", "modals"].includes(mode)) english = english.replace(/\s*\([^)]*\)\s*$/, "");
  const extra = mode === "present-perfect" ? ["present perfect"] : mode === "future" ? [text.includes("going to:") ? "going to" : "will"] : [];
  return [...extra, english];
}

for (const grade of [3, 4, 5, 6]) {
  for (const topic of englishCurriculum[grade]) {
    const cards = englishPools[grade][topic.mode];
    for (const [index, card] of cards.entries()) {
      setEnglishSpeech(grade, topic.mode, index);
      if (topic.skill === "en-grammar" || topic.mode === "positions") {
        card.english.text = englishGrammarPassages(topic.mode, card.text);
        card.english.choices = Object.fromEntries(card.choices.map(choice => [choice, [choice]]));
        card.english.answer = [card.answer];
      } else if (card.text.startsWith("Welches englische Wort passt zu")) {
        card.english.hint = [{ text: card.answer, start: card.hint.lastIndexOf(card.answer) }];
        card.english.choices = Object.fromEntries(card.choices.map(choice => [choice, [choice]]));
        card.english.answer = [card.answer];
      }
    }
  }
  for (const [index, [text, question, choices]] of englishStories[grade].entries()) {
    setEnglishSpeech(grade, "reading", index, [text, question], choices.map(choice => [choice]));
    englishPools[grade].reading[index].english.answer = [choices[0]];
    setEnglishSpeech(grade, "listening", index, [question], choices.map(choice => [choice]));
    englishPools[grade].listening[index].english.answer = [choices[0]];
    setEnglishSpeech(grade, "mediation", index, [text]);
  }
}

const firstDialoguePassages = [
  ["Hello!"], [], ["What's your name?"], ["How old are you?"], ["How are you?"], [], [], [], ["Thank you!"], [], [], [],
  ["Do you like apples?"], ["Do you like milk?"], ["What's your favourite colour?"], ["Have you got a pet?"],
  ["Can you swim?"], ["Can you fly?"], [], [], ["Are you hungry?"], [], [], []
];
for (const [index, card] of englishPools[3]["first-dialogues"].entries()) {
  setEnglishSpeech(3, "first-dialogues", index, firstDialoguePassages[index], card.choices.map(choice => [choice]));
  card.english.answer = [card.answer];
}
for (const [index, card] of englishPools[4].shopping.entries()) {
  const passages = { 3: ["Here you are."], 4: ["Anything else?"], 12: ["Would you like some tea?"], 19: ["Sorry, no milk today."] };
  setEnglishSpeech(4, "shopping", index, passages[index] || [], index === 19 ? [] : card.choices.map(choice => [choice]));
  card.english.answer = index === 19 ? [] : [card.answer];
}
for (const [index, [sentence, word]] of englishWritingModels.entries()) {
  for (const [grade, mode] of [[4, "profile-writing"], [5, "guided-writing"]]) {
    const card = englishPools[grade][mode][index];
    card.english.text = [sentence, word];
    card.english.answer = Array.isArray(card.answer) ? card.answer : [card.answer];
  }
}
for (const [index, card] of englishPools[6]["past-writing"].entries()) {
  card.english.text = [`Yesterday I ___ ${englishActions[index][5]}.`, englishActions[index][0], "simple past"];
  card.english.hint = [englishActions[index][0]];
  card.english.answer = Array.isArray(card.answer) ? card.answer : [card.answer];
}

const discoverySpeech = {
  1: [["apple"], [["apple"], ["apple"], ["apple"]]],
  2: [[], "all"], 4: [[], "all"],
  5: [[], [["house"], ["dog"], ["red"]]], 6: [[], "all"], 7: [[], "all"],
  9: [[], [["book", "books"], ["book", "red"], ["book", "happy"]]],
  10: [[], [["I"], ["i"], []]], 11: [[], "all"],
  12: [["cold", "It's cold?"], []], 13: [[], "all"],
  14: [["sun", "summer"], "all"], 15: [["snow", "winter"], "all"],
  16: [["I have got a dog. It can run.", "it"], []], 17: [["in", "on", "under"], []],
  19: [["colour", "color"], []],
  20: [[], [["play", "playground"], ["play", "milk"], ["play", "red"]]],
  21: [["slowly", "Please speak slowly."], []]
};
for (const [index, [text, choices]] of Object.entries(discoverySpeech)) {
  const card = englishPools[4]["language-discovery"][index];
  setEnglishSpeech(4, "language-discovery", Number(index), text, choices === "all" ? card.choices.map(choice => [choice]) : choices);
  card.english.answer = card.english.choices[card.answer];
}

const culturePassages = [
  ["In my school, we wear a uniform."], ["My friend goes to a school without a uniform."], ["We have a packed lunch today."],
  ["I eat lunch in the school canteen."], ["At Christmas, we visit Grandma."], [], ["Happy birthday!"], ["Happy New Year!"],
  ["I speak English and Polish at home."], ["I like singing."], ["My dad cooks dinner."], ["I live with my mum."], [],
  ["A sandwich, please.", "please"], ["Thank you!"], ["Would you like to play?"], ["I don't eat meat."],
  ["Dear Mia"], ["Best wishes, Alex.", "Best wishes"], ["football", "soccer"], ["My family celebrates Diwali."], [], [], []
];
for (const [index, card] of englishPools[4]["children-culture"].entries()) {
  const optionsEnglish = [13, 14, 20].includes(index);
  setEnglishSpeech(4, "children-culture", index, culturePassages[index], optionsEnglish ? card.choices.map(choice => [choice]) : []);
  if (optionsEnglish) card.english.answer = [card.answer];
}

const mediaFivePassages = {
  0: ["Dear Mia, would you like to come to my party on Saturday? Best wishes, Ben."],
  1: ["Ingredients: two eggs, milk, flour."], 2: ["First, roll the dice. Then move your counter."],
  3: ["Visit our shop! The best shoes in town!"], 5: ["Tuesday", "Thursday"],
  6: ["Private: Do not share your password."], 9: ["bank"],
  14: ["School trip cancelled."], 15: ["Lost: a blue bag."], 16: ["I think this is the best book."],
  17: ["Bus departs at 10:15."], 19: ["Name, age, hobbies"], 22: ["Click now and win!"]
};
for (const [index, card] of englishPools[5]["texts-media"].entries()) {
  const optionsEnglish = [10, 11].includes(index);
  setEnglishSpeech(5, "texts-media", index, mediaFivePassages[index] || [], optionsEnglish ? card.choices.map(choice => [choice]) : []);
  if (optionsEnglish) card.english.answer = [card.answer];
}
const mediaSixPassages = {
  0: ["I received this game for free from the company."], 1: ["All children in Britain love football."],
  2: ["The museum's official website was updated today. An old blog gives different opening times."],
  3: ["These are the best trainers ever!"], 4: ["Before sharing a photo, ask the people in it."],
  7: ["Finally", "First"], 8: ["I wanted to play outside, ___ it was raining."],
  9: ["We stayed indoors ___ it was raining."], 10: ["You can write a letter ___ send an email."],
  11: ["I packed my bag ___ checked the tickets."], 12: ["read"], 14: ["Last weekend", "now"],
  15: ["Dear Headteacher,"], 18: ["Please reply by Friday."], 20: ["Some families eat early."],
  21: ["Your story is clear, but the ending is missing."]
};
for (const [index, card] of englishPools[6]["texts-media"].entries()) {
  const optionsEnglish = [8, 9, 10, 11, 15, 20].includes(index);
  setEnglishSpeech(6, "texts-media", index, mediaSixPassages[index] || [], optionsEnglish ? card.choices.map(choice => [choice]) : []);
  if (optionsEnglish) card.english.answer = [card.answer];
}

const englishTopicPassages = {
  shopping: { explanation: ["Can I have", "please?"] },
  positions: { explanation: ["in", "on", "under", "next to"] },
  "simple-present": { title: ["Simple present"], explanation: ["he", "she", "it", "I", "you", "we", "they", "every day"] },
  questions: { explanation: ["simple present", "Do I/you/we/they", "Does he/she/it", "don't", "doesn't"] },
  "present-progressive": { explanation: ["Am/is/are", "write", "writing"] },
  "be-have": { explanation: ["I am", "you/we/they are", "he/she/it is", "I/you/we/they have got", "he/she/it has got"] },
  pronouns: { explanation: ["my", "your", "his", "her", "its", "our", "their"] },
  "simple-past": { title: ["Simple past"], explanation: ["Yesterday", "last weekend"] },
  "present-perfect": { title: ["Present perfect"], explanation: ["Have/has", "already", "have"] },
  future: { explanation: ["am/is/are going to", "will", "to"] },
  comparison: { explanation: ["more/most", "good", "better", "best", "bad", "worse", "worst"] },
  quantities: { title: ["much", "many", "some"], explanation: ["Many", "much", "a few", "a little"] },
  modals: { explanation: ["Must", "mustn't", "needn't", "Can", "should"] },
  conditionals: { title: ["If"], explanation: ["if", "simple present", "will"] },
  "past-writing": { explanation: ["simple past"] }
};
for (const grade of [3, 4, 5, 6]) {
  for (const topic of englishCurriculum[grade]) {
    topic.english = englishTopicPassages[topic.mode] || {};
    for (const card of englishPools[grade][topic.mode]) {
      if (card.hint === topic.explanation) card.english.hint = topic.english.explanation || [];
    }
  }
}

function collectEnglishAudioTexts() {
  const texts = new Set();
  const add = text => {
    const key = englishAudioKey(typeof text === "string" ? text : text.text);
    if (!key) return;
    texts.add(key);
    // Sentence illustrations also expose sentence-level listening controls.
    // Record natural complete sentences rather than joining individual words.
    for (const sentence of key.match(/[^.!?]+(?:[.!?]+|$)/g) || []) {
      const trimmed = englishAudioKey(sentence);
      if (trimmed) texts.add(trimmed);
    }
  };
  for (const grade of [3, 4, 5, 6]) {
    for (const topic of englishCurriculum[grade]) {
      for (const parts of Object.values(topic.english)) parts.forEach(add);
      for (const card of englishPools[grade][topic.mode]) {
        card.english.text.forEach(add);
        card.english.hint.forEach(add);
        card.english.answer.forEach(add);
        Object.values(card.english.choices).forEach(parts => parts.forEach(add));
        if (card.audioText) add(card.audioText);
        if (card.modelText) add(card.modelText);
      }
    }
  }
  return [...texts].sort();
}
const englishAudioTexts = new Set(collectEnglishAudioTexts());

// Match longest passages first, and only at word boundaries. An English "in"
// must not make a German "in" elsewhere in a mixed instruction speakable.
function englishTextSegments(text, passages = []) {
  const ranges = [];
  for (const entry of [...passages].sort((a, b) => (b.text || b).length - (a.text || a).length)) {
    const passage = typeof entry === "string" ? entry : entry.text;
    let from = typeof entry === "string" ? 0 : entry.start;
    while (from < text.length) {
      const start = text.indexOf(passage, from);
      if (start < 0) break;
      const end = start + passage.length;
      const boundary = !/[A-Za-zÀ-ž]/.test(text[start - 1] || "") && !/[A-Za-zÀ-ž]/.test(text[end] || "");
      if (boundary && !ranges.some(range => start < range.end && end > range.start)) {
        ranges.push({ start, end });
        break;
      }
      from = end;
    }
  }
  ranges.sort((a, b) => a.start - b.start);
  const segments = [];
  let from = 0;
  for (const { start, end } of ranges) {
    if (start > from) segments.push({ text: text.slice(from, start), english: false });
    segments.push({ text: text.slice(start, end), english: true });
    from = end;
  }
  if (from < text.length) segments.push({ text: text.slice(from), english: false });
  return segments;
}
