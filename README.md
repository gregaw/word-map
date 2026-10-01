# Europe Word Map

Type an English word and see it translated into 43 European languages, written on a
map of Europe. Countries whose words sound alike are coloured together: red for
(nearly) the same word, orange for somewhat similar, pale for a faint resemblance,
grey for unrelated.

Type *word* and Poland (*słowo*), Czechia and Slovakia (*slovo*), and Russia and
Ukraine (*слово*) all turn red together. Germany (*Wort*), the Netherlands (*woord*)
and England (*word*) form a second group.

**Live:** https://gregaw.github.io/word-map/

## Run it

You don't need to build or install anything. Open `index.html` in a browser, or serve
the folder so other devices on your home network can open it:

```bash
cd europe-word-map
python3 -m http.server 8000      # then open http://<this-machine>:8000
```

The map is bundled in `map-data.js`, so the page draws without internet access.
Translating a word needs internet access.

- **Click a country** (or a row in the list) to compare every language with that
  country's word. Click it again to go back to "all groups".
- **Hover** a country to see all of its languages (Belgium, Switzerland, Finland, ...).
- `index.html?q=water` opens the page with a word already translated.
- **Prepared words** (buttons under the search box): word, telephone, remember, forget,
  fresh, stale, Italy, Germany, tea, coffee, milk, Slav, slave. Their translations are bundled in
  `presets.js`, so they show instantly with no internet and no translation service. The
  selected country stays selected when you switch words, so you can click Poland once and
  step through the whole list compared with Polish.
- **Stories** (third row of buttons): 12 words that tell a story about Europe's language
  families: Thursday, Saturday, Christmas, king, bread, church, orange, tomato, potato,
  turkey, night, mother. A caption under the buttons explains each one (for example,
  Slavic *król* comes from Charlemagne's name *Karl*). The caption also has a button to
  compare against the country whose view tells the story best, e.g. Greece for *orange*.
  They are in `stories.js`.
- **False friends PL / SK** (second row of buttons): 15 Polish–Slovak pairs that sound
  alike but mean different things, such as *czerstwy* (stale) / *čerstvý* (fresh) and
  *sklep* (shop) / *sklep* (cellar). The map zooms onto Poland, Slovakia and Czechia and
  writes each word with its meaning. The side panel also says what each language actually
  uses for the other meaning. The pairs are in `false-friends.js`.

**Screenshots:** `npm run screenshots` takes a captioned screenshot of every prepared
word, story and false friend into `screenshots/`, which is not committed. They work as
slides, or as an offline fallback on a phone.

## Translation

Choose the translation service under *Translation settings*:

| Service | Setup | Notes |
| --- | --- | --- |
| MyMemory (default) | none | Free. Sends one request per language. Anonymous use covers about 20 words a day, and adding an email raises that about tenfold. Single-word quality varies. |
| Claude | Anthropic API key | Sends one request for all languages. Gives better everyday equivalents and a romanisation of non-Latin scripts. Uses `claude-opus-5-5` (`CLAUDE_MODEL` in `app.js`). The key is stored in this browser's `localStorage` and sent only to `api.anthropic.com`. |

Each result is cached in the browser, so repeating a word costs nothing.

## How "similar" is measured

`similarity.js` does the following to each word:

1. It romanises Cyrillic, Greek, Georgian and Armenian, or uses Claude's romanisation
   when Claude provided one.
2. It drops leading articles (*das Wort* becomes *Wort*) and accents.
3. It folds spelling conventions to one sound: Polish *sz*, Czech *š* and German *sch*
   all become *sh*, *w* becomes *v*, and so on.

The score is 1 − edit distance / length, with a small bonus when the words start the
same way. Colour bands: 0.9 and above is red, 0.75 dark orange, 0.6 orange, 0.45 pale,
and anything lower is grey.

Without a selected country, each language takes its best match with any *other*
language on the map. That is why whole families light up together.

## Files

| File | What |
| --- | --- |
| `index.html` | Page and styles |
| `app.js` | Map drawing, translation, colouring |
| `similarity.js` | Romanisation, phonetic folding, scoring (also runs under Node) |
| `presets.js` | Bundled translations for the prepared words |
| `stories.js` | Story words, with their captions |
| `false-friends.js` | Polish–Slovak (and Czech) false-friend pairs |
| `languages.js` | Which languages each country speaks, and label positions |
| `map-data.js` | Generated: pre-projected SVG outlines (Natural Earth via world-atlas) |
| `scripts/build-map.mjs` | Regenerates `map-data.js` |
| `scripts/screenshots.mjs`, `scripts/shrink_pngs.py` | Regenerate `screenshots/` |

## Develop

```bash
npm install          # only needed for the tests' dev tools and for build-map
npm test             # unit tests for similarity + data consistency
npm run build-map    # after changing countries or label positions in languages.js
npm run screenshots  # retake screenshots/ (needs Playwright's Chromium and Python Pillow;
                     # set CHROMIUM_PATH to use a Chromium you already have)
python3 -m pytest tests/test_shrink_pngs.py
```
