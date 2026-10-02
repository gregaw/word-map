// Takes a screenshot of every prepared word, story and false friend, and writes
// screenshots/README.md listing them with their captions. screenshots/ is not
// committed; zip it and attach it to the `europe-word-map-screenshots` release.
//
//   npm install && npm run screenshots
//
// Words and stories are compared with Polish; stories also get the view their
// caption suggests, and a few words get the extra views listed in EXTRA.
// Afterwards `python3 scripts/shrink_pngs.py screenshots` cuts the files to a
// 256-colour palette (~60% smaller, no visible difference on these maps).
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const root = new URL("..", import.meta.url);
const outDir = new URL("screenshots/", root);
const page_url = new URL("index.html", root).href;

// Views beyond "compared with Polish": [query, reference language or null for all groups].
const EXTRA = [
  ["Slav", null],
  ["slave", null],
  ["slave", "en"],
];

const slug = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").replace(/ł/g, "l")
  .toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
const num = (i) => String(i).padStart(2, "0");

rmSync(outDir, { recursive: true, force: true });
for (const d of ["words", "stories", "false-friends"]) mkdirSync(new URL(d, outDir), { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
// Everything here is bundled; a translation request would mean a missing preset.
await page.route(/mymemory|anthropic/, (r) => { errors.push("network: " + r.request().url()); r.abort(); });
await page.goto(page_url);

const data = await page.evaluate(() => ({
  langs: window.EuropeLanguages.LANGUAGES,
  groups: window.EuropePresets.GROUPS,
  notes: window.EuropePresets.NOTES,
  friends: window.EuropeFalseFriends.FALSE_FRIENDS,
  strings: window.EuropeI18n.STRINGS.en,
}));
const langName = (l) => data.langs[l][0];

const refText = () => page.textContent("#ref");
async function compareWith(lang) {
  if (lang === null) {
    const clear = await page.$("#ref button");
    if (clear) await clear.click();
  } else if (!(await refText()).includes(`Compared with ${langName(lang)}`)) {
    await page.click(`#list li:has-text('${data.langs[lang][0]} — ${data.langs[lang][1]}')`);
  }
  const ref = await refText();
  const ok = lang === null ? !ref.includes("Compared with") : ref.includes(`Compared with ${langName(lang)}`);
  if (!ok) throw new Error(`could not compare with ${lang}: ${ref}`);
}

async function shoot(file, { withStory = false } = {}) {
  await page.waitForTimeout(450);
  // boundingBox() is relative to the viewport, the clip to the whole page.
  const scrollY = await page.evaluate(() => window.scrollY);
  const main = await (await page.$("main")).boundingBox();
  main.y += scrollY;
  let top = main.y;
  if (withStory) top = (await (await page.$("#story")).boundingBox()).y + scrollY - 2;
  await page.screenshot({
    path: new URL(file, outDir).pathname,
    clip: { x: main.x, y: top, width: main.width, height: main.y + main.height - top },
    fullPage: true,
  });
  return file;
}

const index = { words: [], stories: [], friends: [] };
const button = (row, text) => page.click(`#${row} .chip:text-is("${text}")`);
const viewName = (lang) => (lang === null ? "all groups" : `compared with ${langName(lang)}`);

// Words: compared with Polish, plus the extra views.
let i = 0;
for (const q of data.groups.words) {
  const n = num(++i);
  await button("presets", q);
  await compareWith("pl");
  index.words.push([await shoot(`words/${n}-${slug(q)}.png`), `“${q}”, compared with Polish`]);
  for (const [eq, ref] of EXTRA.filter(([eq]) => eq === q)) {
    await compareWith(ref);
    const suffix = ref === null ? "all-groups" : `vs-${slug(langName(ref))}`;
    index.words.push([await shoot(`words/${n}-${slug(eq)}-${suffix}.png`), `“${eq}”, ${viewName(ref)}`]);
  }
}

// Stories: caption + map, compared with Polish and with the caption's suggestion.
i = 0;
for (const q of data.groups.stories || []) {
  const n = num(++i);
  const note = data.notes[q];
  await button("stories", q);
  await compareWith("pl");
  const shots = [[await shoot(`stories/${n}-${slug(q)}.png`, { withStory: true }), "compared with Polish"]];
  if (note.ref && note.ref !== "pl") {
    await compareWith(note.ref);
    shots.push([await shoot(`stories/${n}-${slug(q)}-vs-${slug(langName(note.ref))}.png`, { withStory: true }), viewName(note.ref)]);
  }
  const story = data.strings.stories[q];
  index.stories.push({ q, text: [story.lead, ...story.points].join(" "), shots });
}

// False friends.
i = 0;
for (const f of data.friends) {
  const label = `${f.pl.word} / ${f.sk.word}`;
  await button("friends", label);
  index.friends.push([
    await shoot(`false-friends/${num(++i)}-${slug(f.pl.word)}-${slug(f.sk.word)}.png`),
    `Polish *${f.pl.word}* = ${data.strings.friends[f.pl.word][0]}; Slovak *${f.sk.word}* = ${data.strings.friends[f.pl.word][1]}`,
  ]);
}
await browser.close();
if (errors.length) throw new Error(errors.join("\n"));

const md = [
  "# Screenshots",
  "",
  "Generated by `npm run screenshots` (see `scripts/screenshots.mjs`). Do not edit by hand.",
  "",
  "## Words",
  "",
  ...index.words.map(([f, c]) => `- ${c}: [${f}](${f})`),
  "",
  "## Stories",
  "",
  ...index.stories.flatMap(({ q, text, shots }) => [
    `### ${q}`, "", text, "", ...shots.map(([f, c]) => `- ${c}: [${f}](${f})`), "",
  ]),
  "## False friends (Polish / Slovak)",
  "",
  ...index.friends.map(([f, c]) => `- ${c}: [${f}](${f})`),
  "",
].join("\n");
writeFileSync(new URL("README.md", outDir), md);
const total = index.words.length + index.stories.reduce((a, s) => a + s.shots.length, 0) + index.friends.length;
console.log(`wrote ${total} screenshots and screenshots/README.md`);
