const test = require("node:test");
const assert = require("node:assert/strict");
const { romanize, phonetic, levenshtein, similarity } = require("../similarity.js");
const { LANGUAGES, COUNTRIES, REGIONS } = require("../languages.js");

test("romanize handles Cyrillic, Greek, Georgian and Armenian", () => {
  assert.equal(romanize("слово"), "slovo");
  assert.equal(romanize("λόγος"), "logos");
  assert.equal(romanize("სიტყვა"), "sitqva");
  assert.equal(romanize("բառ"), "bar");
});

test("phonetic folds spelling conventions to the same sound", () => {
  assert.equal(phonetic("szkoła"), phonetic("škola"));
  assert.equal(phonetic("школа"), phonetic("škola"));
  assert.equal(phonetic("Wasser"), "vaser");
  assert.equal(phonetic("woda"), phonetic("вода"));
});

test("phonetic drops leading articles and keeps the first alternative", () => {
  assert.equal(phonetic("das Wort"), "vort");
  assert.equal(phonetic("la palabra"), "palabra");
  assert.equal(phonetic("l'eau"), "eau");
  assert.equal(phonetic("slovo, reč"), "slovo");
  // A lone word that happens to be an article is kept.
  assert.equal(phonetic("a"), "a");
});

test("levenshtein", () => {
  assert.equal(levenshtein("kitten", "sitting"), 3);
  assert.equal(levenshtein("", "abc"), 3);
  assert.equal(levenshtein("same", "same"), 0);
});

test("similarity ranks related words above unrelated ones", () => {
  assert.equal(similarity("słowo", "slovo"), 1);
  assert.equal(similarity("słowo", "слово"), 1);
  assert.ok(similarity("Wort", "word") > 0.7);
  assert.ok(similarity("mot", "parola") < 0.3);
  assert.ok(similarity("Haus", "house") > similarity("Haus", "maison"));
});

test("similarity is symmetric, bounded, and 0 for empty input", () => {
  for (const [a, b] of [["gato", "gatto"], ["kissa", "cat"], ["water", "Wasser"]]) {
    const s = similarity(a, b);
    assert.equal(s, similarity(b, a));
    assert.ok(s >= 0 && s <= 1);
  }
  assert.equal(similarity("", "word"), 0);
  assert.equal(similarity("123", "word"), 0);
});

test("every language a country or region uses is defined", () => {
  for (const c of COUNTRIES) for (const l of c.langs) assert.ok(LANGUAGES[l], `${c.name}: ${l}`);
  for (const r of REGIONS) assert.ok(LANGUAGES[r.lang], `${r.name}: ${r.lang}`);
});

test("the generated map has a shape for every country", () => {
  global.window = {};
  require("../map-data.js");
  const map = global.window.EuropeMap;
  for (const c of COUNTRIES) assert.ok(map.countries[c.name]?.d, c.name);
  assert.equal(map.regions.length, REGIONS.length);
});

test("scoreAll without a reference scores each language by its best match", () => {
  const { scoreAll } = require("../similarity.js");
  const words = { pl: { word: "słowo" }, sk: { word: "slovo" }, de: { word: "Wort" }, en: { word: "word" }, fi: { word: "sana" } };
  const s = scoreAll(words);
  assert.equal(s.pl, 1);
  assert.equal(s.sk, 1);
  assert.ok(s.de > 0.7 && s.en > 0.7);
  assert.ok(s.fi < 0.5);
});

test("scoreAll with a reference compares to it, and prefers the romanisation", () => {
  const { scoreAll } = require("../similarity.js");
  const words = { pl: { word: "słowo" }, ru: { word: "слово", latin: "slovo" }, de: { word: "Wort" }, fr: { word: "" } };
  const s = scoreAll(words, "pl");
  assert.equal(s.pl, 1);
  assert.equal(s.ru, 1);
  assert.ok(s.de < 0.5);
  assert.ok(!("fr" in s));
});

test("every preset word has a translation for every language on the map", () => {
  const { PRESETS, GROUPS, findPreset } = require("../presets.js");
  assert.deepEqual(GROUPS.words, ["word", "telephone", "remember", "forget", "fresh", "stale", "Italy", "Germany", "tea", "coffee", "milk", "Slav", "slave"]);
  for (const query of GROUPS.words) {
    const words = PRESETS[query];
    assert.deepEqual(Object.keys(words).sort(), Object.keys(LANGUAGES).sort(), query);
    for (const [lang, w] of Object.entries(words)) assert.ok(w.word && w.word.trim(), `${query}/${lang}`);
  }
  assert.equal(findPreset("  ITALY ").query, "Italy");
  assert.equal(findPreset("bread"), null);
});

test("presets produce the groups the presentation relies on", () => {
  const { PRESETS } = require("../presets.js");
  const { scoreAll } = require("../similarity.js");
  const tea = scoreAll(PRESETS.tea, "pl");
  assert.ok(tea.be > 0.8 && tea.lt > 0.6, "herbata / гарбата / arbata");
  assert.ok(scoreAll(PRESETS.tea, "ru").tr > 0.75, "чай / çay");
  assert.ok(scoreAll(PRESETS.stale, "tr").el > 0.45, "bayat / μπαγιάτικος");
  assert.ok(scoreAll(PRESETS.Germany, "fr").es > 0.6, "Allemagne / Alemania");
  assert.ok(scoreAll(PRESETS.telephone, "en").fi < 0.45, "puhelin stands out");
});

test("false friends: complete entries, and each pair really sounds alike", () => {
  const { FALSE_FRIENDS } = require("../false-friends.js");
  const { similarity } = require("../similarity.js");
  assert.equal(FALSE_FRIENDS.length, 15);
  for (const f of FALSE_FRIENDS) {
    for (const l of ["pl", "sk"]) {
      assert.ok(f[l].word && f[l].means && f[l].instead, `${f.pl.word}: ${l}`);
    }
    assert.notEqual(f.pl.means, f.sk.means, f.pl.word);
    assert.ok(similarity(f.pl.word, f.sk.word) >= 0.75, `${f.pl.word} / ${f.sk.word}`);
    if (f.cs) assert.ok(f.cs.word && f.cs.means, `${f.pl.word}: cs`);
  }
});

test("stories: every word in every language, with a note", () => {
  const { PRESETS, GROUPS, NOTES, findPreset } = require("../presets.js");
  require("../stories.js");
  assert.deepEqual(GROUPS.stories, ["Thursday", "Saturday", "Christmas", "king", "bread", "church", "orange", "tomato", "potato", "turkey", "night", "mother"]);
  for (const query of GROUPS.stories) {
    assert.deepEqual(Object.keys(PRESETS[query]).sort(), Object.keys(LANGUAGES).sort(), query);
    for (const [lang, w] of Object.entries(PRESETS[query])) assert.ok(w.word && w.word.trim(), `${query}/${lang}`);
    assert.ok(NOTES[query] && NOTES[query].text.length > 40, `${query}: note`);
    assert.ok(LANGUAGES[NOTES[query].ref], `${query}: ref`);
  }
  assert.equal(findPreset("KING").note, NOTES.king);
  assert.equal(findPreset("word").note, undefined);
});

test("stories: the groups each caption describes come out alike on the map", () => {
  const { PRESETS } = require("../presets.js");
  require("../stories.js");
  const { similarity } = require("../similarity.js");
  const text = (q, l) => PRESETS[q][l].latin || PRESETS[q][l].word;
  const alike = (q, a, b, min) => assert.ok(similarity(text(q, a), text(q, b)) >= min, `${q}: ${a}~${b}`);
  const apart = (q, a, b, max) => assert.ok(similarity(text(q, a), text(q, b)) <= max, `${q}: ${a}!~${b}`);
  alike("king", "pl", "ru", 0.75); alike("king", "pl", "tr", 0.75); apart("king", "pl", "de", 0.4);
  alike("bread", "pl", "ru", 0.95); apart("bread", "pl", "fr", 0.2);
  alike("church", "ru", "sl", 0.8); alike("church", "pl", "cs", 0.5); apart("church", "pl", "ru", 0.4);
  alike("orange", "el", "tr", 0.75); alike("orange", "el", "ro", 0.75); alike("orange", "ru", "sv", 0.95);
  alike("orange", "pl", "sk", 0.75);
  alike("tomato", "pl", "it", 0.75); alike("potato", "de", "ru", 0.95); alike("turkey", "nl", "da", 0.75);
  alike("Thursday", "cs", "hu", 0.65); alike("Christmas", "sv", "fi", 0.6);
});

test("sound classes: related words that drifted apart still score as related", () => {
  const { similarity } = require("../similarity.js");
  assert.ok(similarity("czwartek", "четвер") >= 0.5, "czwartek / четвер");
  assert.ok(similarity("czwartek", "четверг") >= 0.6, "czwartek / четверг");
  assert.ok(similarity("jeudi", "jovedi") >= 0.6, "jeudi / giovedì");
  assert.ok(similarity("Thursday", "Donnerstag") >= 0.55, "Thursday / Donnerstag");
  assert.ok(similarity("noc", "night") >= 0.55, "noc / night");
  // ...without making unrelated words alike.
  assert.ok(similarity("mot", "parola") < 0.2);
  assert.equal(similarity("dom", "house"), 0);
  assert.ok(similarity("puhelin", "telephone") < 0.45);
  assert.equal(similarity("hleb", "pain"), 0);
});

test("clusters: Thursday splits into Slavic and Germanic groups; groups are scored", () => {
  const { PRESETS } = require("../presets.js");
  require("../stories.js");
  const { clusters } = require("../similarity.js");
  const found = clusters(PRESETS.Thursday);
  const groupOf = (l) => found.findIndex((g) => g.langs.includes(l));
  for (const l of ["uk", "ru", "cs", "sk", "hr", "bg"]) assert.equal(groupOf(l), groupOf("pl"), l);
  for (const l of ["de", "nl", "sv", "da", "fi"]) assert.equal(groupOf(l), groupOf("en"), l);
  assert.notEqual(groupOf("pl"), groupOf("en"));
  assert.ok(found.every((g) => g.langs.length > 1));
  assert.ok(found[0].langs.length >= found[found.length - 1].langs.length, "largest first");
  for (const g of found) for (const l of g.langs) assert.ok(g.strength[l] > 0 && g.strength[l] <= 1);
});

test("clusters: king finds the three families", () => {
  const { PRESETS } = require("../presets.js");
  require("../stories.js");
  const { clusters } = require("../similarity.js");
  const found = clusters(PRESETS.king);
  const groupOf = (l) => found.findIndex((g) => g.langs.includes(l));
  assert.equal(groupOf("ru"), groupOf("pl"));
  assert.equal(groupOf("tr"), groupOf("pl"), "kral comes from the Slavs");
  assert.equal(groupOf("de"), groupOf("en"));
  assert.equal(groupOf("es"), groupOf("fr"));
  assert.equal(new Set([groupOf("pl"), groupOf("en"), groupOf("fr")]).size, 3);
});

test("clusters with fixed groups only scores them", () => {
  const { clusters } = require("../similarity.js");
  const words = { pl: { word: "czwartek" }, uk: { word: "четвер" }, en: { word: "Thursday" }, de: { word: "Donnerstag" } };
  const out = clusters(words, 0.5, [["pl", "uk", "xx"], ["en"]]);
  assert.deepEqual(out.map((g) => g.langs), [["pl", "uk"]], "unknown languages and singletons drop out");
  assert.ok(out[0].strength.pl >= 0.5);
});

test("curated groups by origin: real languages, each in at most one group", () => {
  const { GROUPINGS, findPreset } = require("../presets.js");
  require("../stories.js");
  assert.deepEqual(Object.keys(GROUPINGS), ["Thursday", "Saturday", "Christmas"]);
  for (const [q, groups] of Object.entries(GROUPINGS)) {
    assert.ok(groups.length <= 8, `${q}: one colour per group`);
    const all = groups.flatMap((g) => g.langs);
    assert.equal(new Set(all).size, all.length, `${q}: no language twice`);
    for (const l of all) assert.ok(LANGUAGES[l], `${q}: ${l}`);
    for (const g of groups) assert.ok(g.name && g.langs.length > 1, `${q}: ${g.name}`);
  }
  assert.equal(findPreset("thursday").groups, GROUPINGS.Thursday);
  assert.equal(findPreset("king").groups, undefined);
});

test("the How it works panel only uses values the page fills in", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const keys = [...html.matchAll(/data-value="(\w+)"/g)].map((m) => m[1]);
  assert.ok(keys.length >= 4);
  for (const k of keys) assert.match(app, new RegExp(`\\b${k}:`), `app.js fills ${k}`);
  for (const [, a, b] of html.matchAll(/data-a="([^"]+)" data-b="([^"]+)"/g)) assert.ok(a && b);
});

test("settings drive the measure and the clustering", () => {
  const sim = require("../similarity.js");
  assert.deepEqual(Object.keys(sim.SETTINGS).sort(), ["clusterThreshold", "skeletonMinShared", "skeletonWeight"]);
  const words = { pl: { word: "czwartek" }, uk: { word: "четвер" } };
  assert.equal(sim.clusters(words).length, 1, "53% clears the default threshold");
  assert.equal(sim.clusters(words, 0.6).length, 0, "but not 60%");
});
