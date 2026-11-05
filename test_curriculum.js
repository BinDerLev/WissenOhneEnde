const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const root = __dirname;
const learningAppPath = path.join(root, "Lern-App", "script.js");
const learningAppHtmlPath = path.join(root, "Lern-App", "index.html");
const gameHubPath = path.join(root, "script.js");
const learningAppSource = fs.readFileSync(learningAppPath, "utf8");
const learningAppHtml = fs.readFileSync(learningAppHtmlPath, "utf8");
const gameHubSource = fs.readFileSync(gameHubPath, "utf8");

function createLocalStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    }
  };
}

function createElement() {
  const listeners = new Map();
  const classes = new Set();
  const attributes = new Map();
  return {
    listeners,
    style: {},
    classList: {
      add(name) {
        classes.add(name);
      },
      remove(name) {
        classes.delete(name);
      },
      contains(name) {
        return classes.has(name);
      }
    },
    dataset: {},
    hidden: false,
    value: "",
    textContent: "",
    innerHTML: "",
    children: [],
    addEventListener(type, listener) {
      const registered = listeners.get(type) || [];
      registered.push(listener);
      listeners.set(type, registered);
    },
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) || null;
    },
    querySelectorAll() {
      return [];
    },
    querySelector(selector) {
      return selector === "h3" ? { textContent: "Testspiel" } : null;
    },
    getBoundingClientRect() {
      return { left: 0, top: 0 };
    },
    appendChild(child) {
      this.children.push(child);
    },
    remove() {},
    focus() {},
    select() {}
  };
}

function createLearningContext(storageValues = {}) {
  const elements = new Map();
  const getElement = (selector) => {
    if (!elements.has(selector)) elements.set(selector, createElement());
    return elements.get(selector);
  };
  const document = {
    createElement: () => createElement(),
    querySelector: getElement,
    querySelectorAll: () => [],
    getElementById: getElement
  };
  const localStorage = createLocalStorage(storageValues);
  const context = vm.createContext({
    console: { log() {}, warn() {}, error() {} },
    document,
    localStorage,
    Date,
    Intl,
    Math
  });
  new vm.Script(learningAppSource, { filename: learningAppPath }).runInContext(context);
  return { context, localStorage };
}

function createGameHubContext(storageValues = {}) {
  const elements = new Map();
  const getElement = (selector) => {
    if (!elements.has(selector)) elements.set(selector, createElement());
    return elements.get(selector);
  };
  const platformNotice = createElement();
  const gamesGrid = createElement();
  const recentList = createElement();
  const achievementList = createElement();
  const gameCard = createElement();
  gameCard.dataset.gameHref = "gefangen_unter_wasser/index.html";
  const cardContainer = createElement();
  cardContainer.dataset.gameHref = "gefangen_unter_wasser/index.html";
  const favoriteButton = createElement();
  favoriteButton.dataset.gameHref = "gefangen_unter_wasser/index.html";
  const filterButtons = ["all", "action", "puzzle", "strategy", "adventure"].map((filter) => {
    const button = createElement();
    button.setAttribute("data-filter", filter);
    return button;
  });
  const searchInput = createElement();
  const favoritesOnly = createElement();
  favoritesOnly.setAttribute("aria-pressed", "false");
  const emptyState = createElement();
  const document = {
    body: createElement(),
    head: createElement(),
    createElement: () => createElement(),
    getElementById(id) {
      if (id === "platformLockedNotice") return platformNotice;
      if (id === "gamesGrid") return gamesGrid;
      if (id === "recentList") return recentList;
      if (id === "achievementList") return achievementList;
      if (id === "gameSearch") return searchInput;
      if (id === "favoritesOnly") return favoritesOnly;
      if (id === "gamesEmptyState") return emptyState;
      return getElement(`#${id}`);
    },
    querySelector: () => null,
    querySelectorAll(selector) {
      if (selector === ".game-card") return [cardContainer];
      if (selector === ".game-card-link") return [gameCard];
      if (selector === ".favorite-toggle") return [favoriteButton];
      if (selector === ".filter-btn") return filterButtons;
      return [];
    }
  };
  const localStorage = createLocalStorage(storageValues);
  const window = {
    innerWidth: 1024,
    innerHeight: 768,
    location: { href: "" },
    addEventListener() {}
  };
  const context = vm.createContext({
    console: { log() {}, warn() {}, error() {} },
    document,
    localStorage,
    window,
    IntersectionObserver: class {
      observe() {}
      unobserve() {}
    },
    setTimeout() {}
  });
  new vm.Script(gameHubSource, { filename: gameHubPath }).runInContext(context);
  return {
    context,
    gameCard,
    cardContainer,
    favoriteButton,
    filterButtons,
    favoritesOnly,
    searchInput,
    emptyState,
    gamesGrid,
    recentList,
    achievementList,
    localStorage,
    platformNotice,
    window
  };
}

function test(name, callback) {
  callback();
  console.log(`OK: ${name}`);
}

test("both curricula contain expanded, complete topics for grades 1–5 only", () => {
  const { context } = createLearningContext();
  const curricula = vm.runInContext("[curriculum, germanCurriculum]", context);
  const expectedGrades = Array.from({ length: 5 }, (_, index) => index + 1);

  for (const [subjectIndex, curriculum] of curricula.entries()) {
    const subject = subjectIndex === 0 ? "math" : "german";
    assert.deepEqual(Object.keys(curriculum).map(Number).sort((a, b) => a - b), expectedGrades);
    for (const grade of expectedGrades) {
      assert.ok(curriculum[grade].length > 0, `${subject} grade ${grade} has no topics`);
      assert.ok(curriculum[grade].length >= (subject === "math" ? 10 : 5), `${subject} grade ${grade} needs more topics`);
      for (const [index, topic] of curriculum[grade].entries()) {
        for (const field of ["title", "skill", "description", "explanation"]) {
          assert.equal(typeof topic[field], "string", `${subject} grade ${grade} topic ${index} is missing ${field}`);
          assert.ok(topic[field].trim(), `${subject} grade ${grade} topic ${index} has an empty ${field}`);
        }
      }
    }
  }
});

test("the grade selector offers only grades 1–5", () => {
  const grades = [...learningAppHtml.matchAll(/<option value="(\d+)">Klasse \d+<\/option>/g)]
    .map(([, grade]) => Number(grade));
  assert.deepEqual(grades, [1, 2, 3, 4, 5]);
});

test("invalid saved progress falls back safely while valid session history is retained", () => {
  const savedProgress = {
    grade: 99,
    subject: "science",
    completed: -1,
    topics: {},
    sessions: [
      {
        subject: "german",
        grade: 5,
        topicTitle: "Wortschatz",
        correct: 4,
        total: 6,
        completedAt: "2026-01-02T03:04:05.000Z"
      },
      {
        subject: "math",
        grade: 8,
        topicTitle: "Alte Einheit",
        correct: 3,
        total: 6,
        completedAt: "2026-01-03T03:04:05.000Z"
      },
      { subject: "unknown", grade: 5 }
    ]
  };
  const { context } = createLearningContext({
    "mathekompass-progress": JSON.stringify(savedProgress)
  });
  const progress = vm.runInContext("progress", context);

  assert.equal(progress.grade, 1);
  assert.equal(progress.subject, "math");
  assert.equal(progress.completed, 0);
  assert.equal(progress.sessions.length, 2);
  assert.equal(progress.sessions[0].topicTitle, "Wortschatz");
  assert.equal(progress.sessions[1].grade, 8);
});

test("completing a lesson records progress and awards one playable coin", () => {
  const savedProgress = {
    grade: 3,
    subject: "german",
    completed: 2,
    topics: {},
    sessions: []
  };
  const { context, localStorage } = createLearningContext({
    "mathekompass-progress": JSON.stringify(savedProgress),
    "gamehub-coin-balance": "2"
  });
  vm.runInContext(
    "activeLesson = { topic: germanCurriculum[3][0], topicIndex: 0, questions: Array(6).fill({}), correct: 4 }; finishLesson();",
    context
  );
  const progress = vm.runInContext("progress", context);
  const persisted = JSON.parse(localStorage.getItem("mathekompass-progress"));

  assert.equal(progress.completed, 3);
  assert.equal(progress.topics["german-3-0"], 1);
  assert.equal(progress.sessions.length, 1);
  assert.equal(progress.sessions[0].correct, 4);
  assert.equal(progress.sessions[0].total, 6);
  assert.equal(Number.isNaN(Date.parse(progress.sessions[0].completedAt)), false);
  assert.equal(persisted.completed, 3);
  assert.equal(localStorage.getItem("gamehub-coin-balance"), "3");
  assert.equal(localStorage.getItem("gamehub-plays-left"), "3");
  assert.equal(localStorage.getItem("gamehub-lern-app-unlocked"), "true");
});

test("locked games redirect to the learning app", () => {
  const { gameCard, gamesGrid, localStorage, platformNotice, window } = createGameHubContext({
    "gamehub-lern-app-unlocked": "false",
    "gamehub-plays-left": "0"
  });
  const clickHandlers = gameCard.listeners.get("click");
  let prevented = false;
  clickHandlers[clickHandlers.length - 1]({ preventDefault() { prevented = true; } });

  assert.equal(platformNotice.classList.contains("hidden-platform"), false);
  assert.equal(gamesGrid.style.pointerEvents, "none");
  assert.equal(prevented, true);
  assert.equal(window.location.href, "Lern-App/index.html");
  assert.equal(localStorage.getItem("gamehub-lern-app-unlocked"), "false");
});

test("the public GameHub no longer exposes the guest unlock bypass", () => {
  const indexHTML = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.doesNotMatch(indexHTML, /guestUnlockButton|TEST ONLY/);
  assert.doesNotMatch(gameHubSource, /guestUnlockButton|lokaler Testzugang/);
});

test("playing a game consumes one play and locks the platform at zero", () => {
  const firstPlay = createGameHubContext({
    "gamehub-lern-app-unlocked": "true",
    "gamehub-plays-left": "2"
  });
  const firstHandlers = firstPlay.gameCard.listeners.get("click");
  firstHandlers[firstHandlers.length - 1]({});
  assert.equal(firstPlay.localStorage.getItem("gamehub-plays-left"), "1");
  assert.equal(firstPlay.localStorage.getItem("gamehub-lern-app-unlocked"), "true");

  const finalPlay = createGameHubContext({
    "gamehub-lern-app-unlocked": "true",
    "gamehub-plays-left": "1"
  });
  const finalHandlers = finalPlay.gameCard.listeners.get("click");
  finalHandlers[finalHandlers.length - 1]({});
  assert.equal(finalPlay.localStorage.getItem("gamehub-plays-left"), "0");
  assert.equal(finalPlay.localStorage.getItem("gamehub-lern-app-unlocked"), "false");
  assert.equal(finalPlay.localStorage.getItem("gamehub-coin-balance"), "0");
  assert.equal(finalPlay.window.location.href, "Lern-App/index.html");
});

test("playing a game records progress and updates recent games and achievements", () => {
  const gameHub = createGameHubContext({
    "gamehub-lern-app-unlocked": "true",
    "gamehub-plays-left": "3"
  });
  const launch = gameHub.gameCard.listeners.get("click").at(-1);

  launch({});

  const progress = JSON.parse(gameHub.localStorage.getItem("gamehub-progress-v1"));
  assert.equal(progress.totalPlays, 1);
  assert.deepEqual(progress.games["gefangen_unter_wasser/index.html"].count, 1);
  assert.deepEqual(progress.recent, ["gefangen_unter_wasser/index.html"]);
  assert.match(gameHub.recentList.innerHTML, /Gefangen Unter Wasser/);
  assert.match(gameHub.achievementList.innerHTML, /Erster Start/);
  assert.match(gameHub.achievementList.innerHTML, /1 \/ 1/);
  assert.equal(gameHub.localStorage.getItem("gamehub-plays-left"), "2");

  launch({});
  const repeatedProgress = JSON.parse(gameHub.localStorage.getItem("gamehub-progress-v1"));
  assert.equal(repeatedProgress.totalPlays, 2);
  assert.equal(repeatedProgress.games["gefangen_unter_wasser/index.html"].count, 2);
  assert.deepEqual(repeatedProgress.recent, ["gefangen_unter_wasser/index.html"]);
});

test("saved GameHub progress accepts only valid catalog games and bounded recent entries", () => {
  const gameHub = createGameHubContext({
    "gamehub-progress-v1": JSON.stringify({
      totalPlays: 2.8,
      games: {
        "gefangen_unter_wasser/index.html": { count: 1.9, lastPlayed: "2026-01-02T03:04:05.000Z" },
        "missing/index.html": { count: 7, lastPlayed: "2026-01-02T03:04:05.000Z" },
        "chess/index.html": { count: -1, lastPlayed: "not a date" }
      },
      recent: [
        "gefangen_unter_wasser/index.html",
        "gefangen_unter_wasser/index.html",
        "missing/index.html",
        "chess/index.html"
      ]
    })
  });
  const progress = vm.runInContext("gameProgress", gameHub.context);

  assert.equal(progress.totalPlays, 2);
  assert.deepEqual(JSON.parse(JSON.stringify(progress.games)), {
    "gefangen_unter_wasser/index.html": {
      count: 1,
      lastPlayed: "2026-01-02T03:04:05.000Z"
    }
  });
  assert.deepEqual(JSON.parse(JSON.stringify(progress.recent)), [
    "gefangen_unter_wasser/index.html",
    "chess/index.html"
  ]);
});

test("the GameHub renders every catalog entry with an existing game and image", () => {
  const { context, gamesGrid } = createGameHubContext();
  const catalog = vm.runInContext("gameCatalog", context);
  const categories = new Set(["action", "puzzle", "strategy", "adventure"]);

  assert.equal(catalog.length, 11);
  assert.equal((gamesGrid.innerHTML.match(/class="game-card"/g) || []).length, catalog.length);
  assert.equal(new Set(catalog.map((game) => game.href)).size, catalog.length);
  const towerDefense = catalog.find((game) => game.href === "tower_defense/index.html");
  assert.ok(towerDefense, "Tower Defense should be registered");
  assert.equal(towerDefense.image, "tower_defense/logo.svg");
  assert.equal(towerDefense.title, "Tower Defense");
  for (const game of catalog) {
    assert.ok(fs.existsSync(path.join(root, game.href)), `missing game page: ${game.href}`);
    assert.ok(fs.existsSync(path.join(root, game.image)), `missing game image: ${game.image}`);
    assert.ok(game.categories.length > 0, `${game.title} has no filter category`);
    for (const category of game.categories) {
      assert.ok(categories.has(category), `${game.title} has unsupported category ${category}`);
    }
  }
});

test("search, genre and favorites filters can be combined", () => {
  const { cardContainer, favoritesOnly, filterButtons, searchInput, emptyState } = createGameHubContext();
  searchInput.value = "unter wasser";
  searchInput.listeners.get("input")[0]();
  assert.equal(cardContainer.style.display, "flex");

  const actionFilter = filterButtons.find((button) => button.getAttribute("data-filter") === "action");
  actionFilter.listeners.get("click")[0]();
  assert.equal(cardContainer.style.display, "none");

  const adventureFilter = filterButtons.find((button) => button.getAttribute("data-filter") === "adventure");
  adventureFilter.listeners.get("click")[0]();
  assert.equal(cardContainer.style.display, "flex");

  favoritesOnly.listeners.get("click")[0]();
  assert.equal(cardContainer.style.display, "none");
  assert.equal(emptyState.hidden, false);
});

test("favoriting is accessible, persists locally, and consumes no play", () => {
  const gameHub = createGameHubContext({
    "gamehub-lern-app-unlocked": "true",
    "gamehub-plays-left": "2"
  });
  const { favoriteButton, gamesGrid, localStorage } = gameHub;
  favoriteButton.listeners.get("click")[0]();

  assert.equal(localStorage.getItem("gamehub-favorites-v1"), JSON.stringify(["gefangen_unter_wasser/index.html"]));
  assert.equal(favoriteButton.getAttribute("aria-pressed"), "true");
  assert.match(favoriteButton.getAttribute("aria-label"), /Aus Favoriten entfernen: Gefangen Unter Wasser/);
  assert.equal(localStorage.getItem("gamehub-plays-left"), "2");
  assert.equal(localStorage.getItem("gamehub-progress-v1"), null);
  assert.match(gamesGrid.innerHTML, /<\/a>\s*<button class="favorite-toggle"/);

  const restored = createGameHubContext({
    "gamehub-favorites-v1": JSON.stringify(["gefangen_unter_wasser/index.html"])
  });
  assert.match(restored.gamesGrid.innerHTML, /aria-pressed="true"/);
});

function useDeterministicRandom(context, seed) {
  let state = seed >>> 0;
  const deterministicMath = Object.create(Math);
  deterministicMath.random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
  context.Math = deterministicMath;
}

function germanNumber(value) {
  return Number(value.replace(",", "."));
}

function assertNumericQuestionMatchesTask(skill, question) {
  const patterns = {
    add: {
      expression: /Wie viel ist (-?\d+) ([+−]) (-?\d+)\?/,
      calculate: ([, left, operator, right]) => operator === "+" ? Number(left) + Number(right) : Number(left) - Number(right)
    },
    compare: {
      expression: /Welche Zahl kommt als Nächstes\? (-?\d+), (-?\d+), (-?\d+), …/,
      calculate: ([, , second, third]) => Number(third) + (Number(third) - Number(second))
    },
    shapes: {
      expression: /Wie viele (?:Ecken|Seiten) hat ein (Dreieck|Viereck|Fünfeck|Sechseck)\?/,
      calculate: (match) => ({ Dreieck: 3, Viereck: 4, Fünfeck: 5, Sechseck: 6 })[match[1]]
    },
    multiply: {
      expression: /Wie viel ist (\d+) × (\d+)\?/,
      calculate: ([, left, right]) => Number(left) * Number(right)
    },
    money: {
      expression: /Ein Heft kostet (\d+) €. Wie viel kosten (\d+) Hefte/,
      calculate: ([, price, count]) => Number(price) * Number(count)
    },
    fractions: {
      expression: /Wie viel ist (\d+)\/(\d+) von (\d+)\?/,
      calculate: ([, numerator, denominator, whole]) => Number(numerator) * Number(whole) / Number(denominator)
    },
    decimal: {
      expression: /Wie viel ist (\d+,\d) \+ (\d+,\d)\?/,
      calculate: ([, left, right]) => Math.round((germanNumber(left) + germanNumber(right)) * 10) / 10
    },
    geometry: {
      expression: /Ein Rechteck ist (\d+) cm lang und (\d+) cm breit\. Wie groß ist (sein Umfang in cm|seine Fläche in cm²)\?/,
      calculate: ([, length, width, measure]) => measure.startsWith("sein Umfang")
        ? 2 * (Number(length) + Number(width))
        : Number(length) * Number(width)
    },
    units: {
      expression: /Wie viele Zentimeter sind (\d+(?:,\d+)?) Meter\?/,
      calculate: ([, meters]) => germanNumber(meters) * 100
    },
    percent: {
      expression: /Wie viel sind (\d+) % von (\d+)\?/,
      calculate: ([, percentage, whole]) => Number(percentage) * Number(whole) / 100
    },
    negative: {
      expression: /Wie viel ist (-?\d+) \+ \((-?\d+)\)\?/,
      calculate: ([, left, right]) => Number(left) + Number(right)
    },
    equation: {
      expression: /Löse die Gleichung: (\d+)x \+ (\d+) = (\d+)\. Was ist x\?/,
      calculate: ([, factor, offset, result]) => (Number(result) - Number(offset)) / Number(factor)
    },
    ratio: {
      expression: /(\d+) gleiche Stifte kosten (\d+) €. Wie viel kosten (\d+) Stifte/,
      calculate: ([, count, total, target]) => Number(total) / Number(count) * Number(target)
    },
    powers: {
      expression: /Was ist √(\d+)\?/,
      calculate: ([, radicand]) => Math.sqrt(Number(radicand))
    },
    pythagoras: {
      expression: /Dreieck hat Katheten (\d+) cm und (\d+) cm\. Wie lang is[t]? die Hypotenuse in cm\?/,
      calculate: ([, sideA, sideB]) => Math.sqrt(Number(sideA) ** 2 + Number(sideB) ** 2)
    },
    quadratic: {
      expression: /Löse x² = (\d+)\. Nenne eine positive Lösung für x\./,
      calculate: ([, square]) => Math.sqrt(Number(square))
    },
    linear: {
      expression: /Für y = (\d+)x \+ (\d+): Wie groß ist y, wenn x = (\d+)\?/,
      calculate: ([, slope, intercept, x]) => Number(slope) * Number(x) + Number(intercept)
    },
    probability: {
      expression: /Von (\d+) gleich wahrscheinlichen Möglichkeiten sind (\d+) günstig/,
      calculate: ([, total, favorable]) => Number(favorable) / Number(total) * 100
    },
    trig: {
      expression: /ist die (Gegenkathete|Ankathete) (\d+) cm und die Hypotenuse (\d+) cm\. Wie groß ist (sin|cos)\(α\)/,
      calculate: ([, , side, hypotenuse]) => Math.round(Number(side) / Number(hypotenuse) * 100) / 100
    }
  };
  const rule = patterns[skill];
  assert.ok(rule, `no numeric validator for math skill ${skill}`);
  const match = question.text.match(rule.expression);
  assert.ok(match, `${skill} question does not match its expected task form: ${question.text}`);
  const expected = rule.calculate(match);
  assert.equal(question.answer, expected, `${skill} answer disagrees with task: ${question.text}`);

  if (question.solution) {
    const displayedAnswer = Number.isInteger(expected)
      ? String(expected)
      : skill === "trig"
        ? expected.toFixed(2).replace(".", ",")
        : expected.toFixed(1).replace(".", ",");
    assert.ok(
      question.solution.includes(displayedAnswer),
      `${skill} solution omits the computed answer ${displayedAnswer}: ${question.solution}`
    );
  }
}

test("every lesson offers eight distinct exercises for each subject and grade", () => {
  const { context } = createLearningContext();
  useDeterministicRandom(context, 0x8e71c1);
  const curricula = vm.runInContext("[curriculum, germanCurriculum]", context);
  const exerciseCount = vm.runInContext("exercisesPerLesson", context);

  for (const [subjectIndex, curriculum] of curricula.entries()) {
    const subject = subjectIndex === 0 ? "math" : "german";
    for (const [grade, topics] of Object.entries(curriculum)) {
      vm.runInContext(`progress.subject = "${subject}"; progress.grade = ${Number(grade)};`, context);
      for (const [topicIndex, topic] of topics.entries()) {
        const questions = context.makeUniqueQuestions(topic, exerciseCount);
        assert.equal(questions.length, exerciseCount, `${subject} grade ${grade} topic ${topicIndex} has the wrong exercise count`);
        assert.equal(
          new Set(questions.map((question) => question.text)).size,
          questions.length,
          `${subject} grade ${grade} topic ${topicIndex} contains duplicate exercises`
        );
      }
    }
  }
});

test("generated questions have valid shapes and math answers match every curriculum task", () => {
  const { context } = createLearningContext();
  useDeterministicRandom(context, 0x51a7e);
  const curricula = vm.runInContext("[curriculum, germanCurriculum]", context);
  const makeMathQuestion = vm.runInContext("makeQuestion", context);
  const makeGermanQuestion = vm.runInContext("makeGermanQuestion", context);
  const mathSkills = new Set();
  const germanSkills = new Set();
  let generatedCount = 0;

  for (const [subjectIndex, curriculum] of curricula.entries()) {
    const skills = subjectIndex === 0 ? mathSkills : germanSkills;
    const makeQuestion = subjectIndex === 0 ? makeMathQuestion : makeGermanQuestion;
    for (const [grade, topics] of Object.entries(curriculum)) {
      vm.runInContext(`progress.grade = ${Number(grade)}`, context);
      for (const [topicIndex, topic] of topics.entries()) {
        skills.add(topic.skill);
        for (let sample = 0; sample < 4; sample += 1) {
          const question = makeQuestion(topic);
          const label = `${subjectIndex === 0 ? "math" : "German"} grade ${grade} topic ${topicIndex} (${topic.skill}) sample ${sample}`;
          assert.ok(question && typeof question === "object", `${label} did not return a question`);
          assert.equal(typeof question.text, "string", `${label} has no task text`);
          assert.ok(question.text.trim(), `${label} has empty task text`);
          assert.ok(
            typeof question.answer === "string" || typeof question.answer === "number",
            `${label} answer must be text or a numeric result`
          );
          assert.ok(
            typeof question.answer === "string" ? question.answer.trim() : Number.isFinite(question.answer),
            `${label} has an empty or invalid answer`
          );
          assert.equal(typeof question.hint, "string", `${label} has no hint`);
          assert.ok(question.hint.trim(), `${label} has an empty hint`);
          assert.ok(question.solution === undefined || typeof question.solution === "string", `${label} has an invalid solution`);
          if (question.options !== undefined) {
            assert.ok(Array.isArray(question.options) && question.options.length >= 2, `${label} has invalid answer options`);
            assert.equal(new Set(question.options).size, question.options.length, `${label} has duplicate answer options`);
            assert.ok(question.options.includes(question.answer), `${label} options omit the correct answer`);
          }

          if (subjectIndex === 0) {
            assert.equal(typeof question.answer, "number", `${label} answer should be numeric`);
            assert.ok(Number.isFinite(question.answer), `${label} answer is not finite`);
            assertNumericQuestionMatchesTask(topic.skill, question);
          } else if (topic.skill === "de-wordclass") {
            assert.ok(["Nomen", "Verb", "Adjektiv"].includes(question.answer), `${label} has an invalid word class`);
          } else if (topic.skill === "de-grammar") {
            const match = question.text.match(/Setze „(\w+)“ für „(ich|du|er|wir|ihr|sie)“ ins (Präsens|Präteritum):/);
            assert.ok(match, `${label} has an invalid conjugation prompt`);
            const [, verb, pronoun, tense] = match;
            const endings = tense === "Präsens"
              ? { ich: "e", du: "st", er: "t", wir: "en", ihr: "t", sie: "en" }
              : { ich: "te", du: "test", er: "te", wir: "ten", ihr: "tet", sie: "ten" };
            assert.equal(question.answer, `${verb.slice(0, -2)}${endings[pronoun]}`, `${label} answer disagrees with the conjugation prompt`);
          } else if (topic.skill === "de-wordorder") {
            const words = question.text.split(": ")[1].split(" / ").map((word) => word.toLowerCase()).sort();
            const answerWords = question.answer.toLowerCase().replace(/[,.!?]/g, "").split(/\s+/).sort();
            assert.deepEqual(answerWords, words, `${label} answer does not use the words in the task`);
          } else if (topic.skill === "de-reading") {
            if (!question.options) {
              assert.ok(question.text.includes(question.answer), `${label} answer is not supported by its reading task`);
            }
          } else if (topic.skill === "de-words") {
            const operands = question.text.match(/'([^']+)' und '([^']+)'/);
            assert.ok(operands, `${label} does not identify its compound-word inputs`);
            const expected = `${operands[1]}${operands[2]}`;
            assert.equal(question.answer, expected.charAt(0).toUpperCase() + expected.slice(1), `${label} answer disagrees with its inputs`);
          }
          generatedCount += 1;
        }
      }
    }
  }

  assert.ok(mathSkills.size >= 10, `expected broad math skill coverage, got ${mathSkills.size}`);
  assert.ok(germanSkills.size >= 9, `expected broad German skill coverage, got ${germanSkills.size}`);
  const topicCount = curricula.reduce(
    (total, curriculum) => total + Object.values(curriculum).reduce((gradeTotal, topics) => gradeTotal + topics.length, 0),
    0
  );
  assert.equal(generatedCount, topicCount * 4, "every curriculum topic should be sampled four times");
});
