(function () {
  "use strict";

  const { LANGUAGES, COUNTRIES, REGIONS } = window.EuropeLanguages;
  const { scoreAll, clusters } = window.WordSimilarity;
  const MAP = window.EuropeMap;
  const SVG_NS = "http://www.w3.org/2000/svg";
  const CLAUDE_MODEL = "claude-opus-5-5";
  const MYMEMORY_CONCURRENCY = 6;

  const $ = (id) => document.getElementById(id);
  const svg = $("map");
  const tip = $("tip");

  // Every language that appears on the map, in a stable order.
  const ALL_LANGS = [...new Set([
    ...COUNTRIES.flatMap((c) => c.langs),
    ...REGIONS.map((r) => r.lang),
  ])];

  const state = {
    query: "",
    words: {},     // lang -> { word, latin? }
    pending: new Set(),
    ref: null,     // reference language, or null for "best match with any"
    friend: null,  // a false-friend pair being shown, instead of a translation
    groupings: null, // curated groups by origin for the current word, if it has them
    run: 0,        // ignores results from a search that has since been replaced
  };

  // ---------- storage (optional; the page works without it) ----------
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  // ---------- map ----------
  const shapes = {};   // country name -> path element
  const labels = {};   // country name -> text element
  const dots = {};     // region name -> circle element

  function el(name, attrs, parent) {
    const node = document.createElementNS(SVG_NS, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    if (parent) parent.appendChild(node);
    return node;
  }

  function drawMap() {
    svg.setAttribute("viewBox", `0 0 ${MAP.width} ${MAP.height}`);
    const bg = el("g", {}, svg);
    for (const d of MAP.background) el("path", { d, class: "bg" }, bg);
    const land = el("g", {}, svg);
    for (const c of COUNTRIES) {
      const p = el("path", { d: MAP.countries[c.name].d, class: "country" }, land);
      p.addEventListener("click", () => setRef(c.langs[0]));
      hover(p, () => countryTip(c));
      shapes[c.name] = p;
    }
    const regionLayer = el("g", {}, svg);
    for (const [i, r] of REGIONS.entries()) {
      const [x, y] = MAP.regions[i].at;
      const dot = el("circle", { cx: x, cy: y, r: 7, class: "region" }, regionLayer);
      dot.addEventListener("click", () => setRef(r.lang));
      hover(dot, () => regionTip(r));
      dots[r.name] = dot;
    }
    const text = el("g", {}, svg);
    for (const c of COUNTRIES) {
      const [x, y] = MAP.countries[c.name].label;
      labels[c.name] = el("text", { x, y, class: "label" }, text);
    }
    for (const [i, r] of REGIONS.entries()) {
      const [x, y] = MAP.regions[i].at;
      labels["region:" + r.name] = el("text", { x, y: y + 16, class: "label" }, text);
    }
  }

  function hover(node, content) {
    node.addEventListener("mousemove", (e) => {
      tip.replaceChildren(...content());
      tip.style.display = "block";
      const pad = 14;
      const w = tip.offsetWidth;
      tip.style.left = Math.min(e.clientX + pad, window.innerWidth - w - 8) + "px";
      tip.style.top = e.clientY + pad + "px";
    });
    node.addEventListener("mouseleave", () => { tip.style.display = "none"; });
  }

  function tipLines(title, langs) {
    const head = document.createElement("div");
    head.style.fontWeight = "600";
    head.textContent = title;
    const rows = langs.map((l) => {
      const row = document.createElement("div");
      const w = state.words[l];
      const shown = w ? w.word + (w.latin && w.latin !== w.word ? ` (${w.latin})` : "") : "…";
      row.textContent = `${LANGUAGES[l][0]}: ${state.query ? shown : "—"}`;
      return row;
    });
    const hint = document.createElement("div");
    hint.style.color = "var(--muted)";
    hint.textContent = "Click to compare everything with this language";
    return [head, ...rows, hint];
  }
  const countryTip = (c) => tipLines(c.name, c.langs);
  const regionTip = (r) => tipLines(r.name, [r.lang]);

  // ---------- colour ----------
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  // Below 0.45 the words have little in common; above it, pale orange -> red.
  // Comparison colours: the lowest score each band starts at, palest first.
  const BANDS = [[0.45, "--s1"], [0.6, "--s2"], [0.75, "--s3"], [0.9, "--s4"]];
  function colour(score) {
    let band = null;
    for (const [from, token] of BANDS) if (score != null && score >= from) band = token;
    return band && css(band);
  }

  function fontSize(name) {
    const small = ["Andorra", "Liechtenstein", "Luxembourg", "Monaco", "San Marino", "Vatican", "Malta", "Kosovo", "Montenegro", "Cyprus", "Faeroe Is."];
    return small.includes(name) ? 9 : ["Russia", "France", "Spain", "Germany", "Poland", "Ukraine", "Turkey", "Sweden", "Norway", "Italy", "Finland"].includes(name) ? 15 : 12;
  }

  // Mix two #rrggbb colours: t = 0 gives a, t = 1 gives b.
  function mix(a, b, t) {
    const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const [x, y] = [rgb(a), rgb(b)];
    return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
  }

  // With no country selected, the map shows groups of alike words, one colour
  // each: curated groups by origin where the word has them, otherwise clusters
  // found from the sound of the words. Within a group, a language that sounds
  // less like the rest is paler. Returns { groups, byLang: { lang: group } }.
  const GROUP_COLOURS = 8;
  function grouping() {
    const curated = state.groupings;
    const found = clusters(state.words, undefined, curated && curated.map((g) => g.langs));
    const groups = found.map((g, i) => {
      const name = curated
        ? curated.find((c) => c.langs.includes(g.langs[0])).name
        : null;
      // Name a found group after its most typical word.
      const centre = g.langs.reduce((a, b) => (g.strength[b] > g.strength[a] ? b : a));
      const base = i < GROUP_COLOURS ? css(`--g${i + 1}`) : null;
      const shade = (l) => (base ? mix(base, css("--land-lang"), Math.min(0.45, Math.max(0, (0.9 - g.strength[l]) * 0.7))) : null);
      return { ...g, name: name || `like “${state.words[centre].word}”`, base, shade };
    });
    const byLang = {};
    for (const g of groups) for (const l of g.langs) byLang[l] = g;
    return { groups, byLang };
  }
  // A country is coloured by its first language that belongs to a group.
  const groupedLang = (langs, byLang) => langs.find((l) => byLang[l]) || langs[0];

  // The legend's two forms; both are fixed markup, never built from translations.
  const SCALE_LEGEND = $("legend").innerHTML;
  const GROUP_LEGEND = [1, 2, 3, 4].map((i) => `<span class="sw" style="background:var(--g${i})"></span>`).join("") +
    " one colour per group · paler = looser fit";

  const FULL_VIEW = `0 0 ${MAP.width} ${MAP.height}`;

  // Zoom onto the countries of a false-friend pair; labels keep a readable size.
  function zoomTo(names) {
    if (!names) {
      svg.setAttribute("viewBox", FULL_VIEW);
      return 1;
    }
    let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
    for (const n of names) {
      const b = shapes[n].getBBox();
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
    }
    // Pad, then widen to the map's aspect ratio so nothing is squashed.
    let w = (x1 - x0) * 1.5, h = (y1 - y0) * 1.5;
    const aspect = MAP.width / MAP.height;
    if (w / h < aspect) w = h * aspect; else h = w / aspect;
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    svg.setAttribute("viewBox", `${cx - w / 2} ${cy - h / 2} ${w} ${h}`);
    return MAP.width / w;
  }

  function render() {
    if (state.friend) return renderFriend();
    // The story's "Compare with X" button is pointless while X is already selected.
    const compare = $("story").querySelector("button");
    if (compare) compare.hidden = state.ref === compare.dataset.ref;
    zoomTo(null);
    const scores = scoreAll(state.words, state.ref);
    const grouped = state.query && !state.ref ? grouping() : null;
    $("legend").innerHTML = grouped ? GROUP_LEGEND : SCALE_LEGEND;
    for (const c of COUNTRIES) {
      const best = Math.max(...c.langs.map((l) => scores[l] ?? -1));
      const p = shapes[c.name];
      if (grouped) {
        const l = groupedLang(c.langs, grouped.byLang);
        p.style.fill = grouped.byLang[l]?.shade(l) || "";
      } else {
        p.style.fill = colour(best) || "";
      }
      p.classList.toggle("ref", !!state.ref && c.langs[0] === state.ref);
      p.classList.toggle("loading", c.langs.some((l) => state.pending.has(l)));
      const w = state.words[c.langs[0]];
      const t = labels[c.name];
      t.textContent = w ? w.word : "";
      t.setAttribute("font-size", fontSize(c.name));
      t.style.strokeWidth = "";
      // Hide the duplicate label where a microstate overlaps its neighbour.
      t.style.display = ["Vatican", "San Marino", "Monaco", "Liechtenstein", "Andorra"].includes(c.name) ? "none" : "";
    }
    for (const r of REGIONS) {
      dots[r.name].style.display = "";
      dots[r.name].style.fill = (grouped ? grouped.byLang[r.lang]?.shade(r.lang) : colour(scores[r.lang])) || css("--muted");
      dots[r.name].style.stroke = state.ref === r.lang ? css("--accent") : "";
      const w = state.words[r.lang];
      const t = labels["region:" + r.name];
      t.textContent = w ? w.word : "";
      t.setAttribute("font-size", 10);
    }
    renderList(scores, grouped);
  }

  // First part of a meaning, short enough to sit under the word on the map.
  const short = (means) => means.split(/[;(]/)[0].trim();

  function setLabel(t, word, means) {
    t.replaceChildren(word);
    if (!means) return;
    const sub = document.createElementNS(SVG_NS, "tspan");
    sub.setAttribute("x", t.getAttribute("x"));
    sub.setAttribute("dy", "1.25em");
    sub.setAttribute("font-size", "0.72em");
    sub.setAttribute("font-weight", "500");
    sub.textContent = "= " + short(means);
    t.appendChild(sub);
  }

  // A false-friend pair: only Poland, Slovakia and Czechia, each labelled with
  // its word and what it means there. The colour says how alike they sound.
  function renderFriend() {
    const f = state.friend;
    const scores = scoreAll(state.words, "pl");
    const shade = { pl: Math.max(scores.sk ?? 0, scores.cs ?? 0), sk: scores.sk, cs: scores.cs };
    const scale = zoomTo(["Poland", "Slovakia", "Czechia"]);
    for (const c of COUNTRIES) {
      const lang = c.langs[0];
      const p = shapes[c.name];
      const inPair = lang in shade && f[lang];
      p.style.fill = inPair ? colour(shade[lang]) || "" : "";
      p.classList.remove("ref", "loading");
      const t = labels[c.name];
      if (inPair) {
        setLabel(t, f[lang].word, f[lang].means);
        t.setAttribute("font-size", 26 / scale);
        t.style.strokeWidth = 4 / scale;
        t.style.display = "";
      } else {
        t.textContent = "";
      }
    }
    for (const r of REGIONS) {
      dots[r.name].style.display = "none";
      labels["region:" + r.name].textContent = "";
    }

    $("ref").textContent = "False friends: these sound alike, but mean different things.";
    const names = { pl: "Polish", sk: "Slovak", cs: "Czech" };
    const other = { pl: "sk", sk: "pl" };
    const rows = ["pl", "sk", "cs"].filter((l) => f[l]).map((l) => {
      const li = document.createElement("li");
      li.className = "friend";
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.style.background = colour(shade[l]) || css("--land-lang");
      const w = document.createElement("span");
      w.className = "w";
      w.textContent = f[l].word;
      const lang = document.createElement("span");
      lang.className = "lang";
      lang.textContent = names[l];
      const means = document.createElement("span");
      means.className = "means";
      means.textContent = f[l].means;
      w.append(lang, means);
      if (f[l].instead && other[l]) {
        const instead = document.createElement("span");
        instead.className = "lang";
        instead.textContent = `For “${short(f[other[l]].means)}”, ${names[l]} says ${f[l].instead}.`;
        w.appendChild(instead);
      }
      li.append(dot, w, document.createElement("span"));
      return li;
    });
    $("list").replaceChildren(...rows);
  }

  function showFriend(pair) {
    story(null);
    state.run++; // drop any translation still in flight
    state.friend = pair;
    state.groupings = null;
    state.ref = null;
    state.pending.clear();
    state.query = `${pair.pl.word} / ${pair.sk.word}`;
    state.words = {};
    for (const l of ["pl", "sk", "cs"]) if (pair[l]) state.words[l] = { word: pair[l].word };
    $("go").disabled = false;
    status(`False friend: Polish “${pair.pl.word}” means ${pair.pl.means}; Slovak “${pair.sk.word}” means ${pair.sk.means}.`);
    render();
  }

  function renderList(scores, grouped) {
    const ref = $("ref");
    ref.replaceChildren();
    if (!state.query) {
      ref.textContent = "Type a word to begin. Click any country to compare against its language.";
    } else if (state.ref) {
      ref.append("Compared with ");
      const b = document.createElement("b");
      b.textContent = `${LANGUAGES[state.ref][0]} “${state.words[state.ref]?.word ?? "…"}”`;
      ref.append(b, ". ");
      const clear = document.createElement("button");
      clear.className = "ghost";
      clear.style.padding = "2px 8px";
      clear.textContent = "Show all groups";
      clear.addEventListener("click", () => setRef(null));
      ref.append(clear);
    } else if (state.groupings) {
      ref.textContent = "Colours show groups by the origin of the word. Paler means it sounds less like the rest of its group. Click a country to compare against it.";
    } else {
      ref.textContent = "Colours show groups of alike-sounding words, found automatically. Paler means a looser fit. Click a country to compare against it.";
    }

    const list = $("list");
    const langs = ALL_LANGS.filter((l) => state.words[l] || state.pending.has(l));
    if (grouped) {
      const rows = [];
      const header = (swatch, name, count) => {
        const li = document.createElement("li");
        li.className = "group";
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.style.background = swatch;
        const n = document.createElement("span");
        n.className = "gname";
        n.textContent = name;
        const c = document.createElement("span");
        c.className = "gcount";
        c.textContent = count;
        li.append(dot, n, c);
        return li;
      };
      for (const g of grouped.groups) {
        rows.push(header(g.base || css("--land-lang"), g.name, `${g.langs.length} languages`));
        const members = [...g.langs].sort((a, b) => g.strength[b] - g.strength[a]);
        for (const l of members) rows.push(langRow(l, g.shade(l) || css("--land-lang"), Math.round(g.strength[l] * 100) + "%"));
      }
      const rest = langs.filter((l) => !grouped.byLang[l]);
      if (rest.length) {
        rows.push(header(css("--land-lang"), "Not in a group", `${rest.length} languages`));
        for (const l of rest) rows.push(langRow(l, css("--land-lang"), ""));
      }
      list.replaceChildren(...rows);
      return;
    }
    langs.sort((a, b) => (scores[b] ?? -1) - (scores[a] ?? -1) || LANGUAGES[a][0].localeCompare(LANGUAGES[b][0]));
    list.replaceChildren(...langs.map((l) => langRow(l, colour(scores[l]) || css("--land-lang"), scores[l] != null ? Math.round(scores[l] * 100) + "%" : "")));
  }

  // One language in the side list: its word, its name, and a number.
  function langRow(l, dotColour, number) {
    const li = document.createElement("li");
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.background = dotColour;
    const w = document.createElement("span");
    w.className = "w";
    const entry = state.words[l];
    w.textContent = entry ? entry.word : "…";
    if (entry && entry.latin && entry.latin !== entry.word) w.textContent += ` · ${entry.latin}`;
    const lang = document.createElement("span");
    lang.className = "lang";
    lang.textContent = `${LANGUAGES[l][0]} — ${LANGUAGES[l][1]}`;
    w.appendChild(lang);
    const pct = document.createElement("span");
    pct.className = "pct";
    pct.textContent = number;
    li.append(dot, w, pct);
    li.addEventListener("click", () => setRef(l));
    return li;
  }

  function setRef(lang) {
    if (state.friend) return;
    state.ref = state.ref === lang ? null : lang;
    $("list").scrollTop = 0;
    render();
  }

  function status(text, isError) {
    const s = $("status");
    s.textContent = text;
    s.classList.toggle("error", !!isError);
  }

  // ---------- translation ----------
  const cacheKey = (provider, word) => `ewm:v1:${provider}:${word.toLowerCase()}`;

  async function translateMyMemory(word, onWord, isCurrent) {
    const email = $("mmemail").value.trim();
    const queue = ALL_LANGS.filter((l) => l !== "en");
    const total = queue.length;
    onWord("en", { word });
    let quotaHit = false;
    const errors = [];
    async function worker() {
      while (queue.length && !quotaHit && isCurrent()) {
        const lang = queue.shift();
        const url = new URL("https://api.mymemory.translated.net/get");
        url.searchParams.set("q", word);
        url.searchParams.set("langpair", `en|${lang}`);
        if (email) url.searchParams.set("de", email);
        try {
          const res = await fetch(url);
          const data = await res.json();
          const text = data?.responseData?.translatedText ?? "";
          if (data.quotaFinished || /MYMEMORY WARNING/i.test(text)) { quotaHit = true; break; }
          if (Number(data.responseStatus) !== 200 || !text) throw new Error(data.responseDetails || `HTTP ${res.status}`);
          // MyMemory sometimes shouts the answer; match the case of the query.
          const clean = word === word.toLowerCase() && text === text.toUpperCase() ? text.toLowerCase() : text;
          onWord(lang, { word: clean });
        } catch (e) {
          errors.push(`${LANGUAGES[lang][0]}: ${e.message}`);
          onWord(lang, null);
        }
      }
    }
    await Promise.all(Array.from({ length: MYMEMORY_CONCURRENCY }, worker));
    if (quotaHit) throw new Error("MyMemory's free daily quota is used up. Add an email in Translation settings, or switch to Claude.");
    if (errors.length === total) throw new Error("Could not reach MyMemory. " + errors[0]);
  }

  async function translateClaude(word, onWord) {
    const key = $("apikey").value.trim();
    if (!key) throw new Error("Add your Anthropic API key in Translation settings, or switch to MyMemory.");
    const langList = ALL_LANGS.map((l) => `${l} (${LANGUAGES[l][0]})`).join(", ");
    const body = {
      model: CLAUDE_MODEL,
      max_tokens: 16000,
      output_config: {
        effort: "low",
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              translations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    lang: { type: "string" },
                    word: { type: "string" },
                    latin: { type: "string" },
                  },
                  required: ["lang", "word", "latin"],
                  additionalProperties: false,
                },
              },
            },
            required: ["translations"],
            additionalProperties: false,
          },
        },
      },
      fallbacks: "default",
      messages: [{
        role: "user",
        content:
          `Translate the English word "${word}" into each of these languages: ${langList}.\n\n` +
          "For each, give the single most common everyday equivalent a native speaker would use, " +
          "without articles, in its usual written script, lower case unless the language capitalises it (German nouns). " +
          "If the English word has several senses, use the most common sense consistently across all languages. " +
          "In `latin`, give a simple romanisation of how it is pronounced (for Latin-script words, the word itself without diacritics). " +
          "Return one entry per language code, using the codes exactly as given.",
      }],
    };
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "server-side-fallback-2026-07-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`Claude API ${res.status}: ${data?.error?.message || res.statusText}`);
    if (data.stop_reason === "refusal") throw new Error("Claude declined to translate this word.");
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    let parsed;
    try { parsed = JSON.parse(text); } catch { throw new Error("Claude's answer was not valid JSON (stop reason: " + data.stop_reason + ")."); }
    for (const t of parsed.translations || []) {
      if (LANGUAGES[t.lang] && t.word) onWord(t.lang, { word: t.word, latin: t.latin });
    }
  }

  async function search(word) {
    word = word.trim();
    if (!word) return;
    const run = ++state.run;
    state.friend = null;
    state.groupings = null;
    story(null);
    $("list").scrollTop = 0;
    const provider = $("provider").value;
    state.query = word;
    state.words = {};
    state.pending = new Set(ALL_LANGS);
    render();

    const preset = window.EuropePresets.findPreset(word);
    if (preset) {
      state.query = preset.query;
      state.groupings = preset.groups || null;
      state.words = { ...preset.words };
      state.pending.clear();
      render();
      status(`“${preset.query}” in ${Object.keys(state.words).length} languages. Hover a country for details; click one to compare against it.`);
      story(preset.note);
      return;
    }

    const cached = store.get(cacheKey(provider, word));
    if (cached) {
      try {
        state.words = JSON.parse(cached);
        state.pending.clear();
        render();
        status(`“${word}” — from cache.`);
        return;
      } catch { /* fall through and translate again */ }
    }

    status(provider === "claude" ? "Asking Claude…" : "Translating…");
    $("go").disabled = true;
    const isCurrent = () => run === state.run;
    let scheduled = false;
    const onWord = (lang, entry) => {
      if (!isCurrent()) return;
      state.pending.delete(lang);
      if (entry) state.words[lang] = entry;
      if (!scheduled) { scheduled = true; requestAnimationFrame(() => { scheduled = false; render(); }); }
    };
    try {
      await (provider === "claude" ? translateClaude(word, onWord) : translateMyMemory(word, onWord, isCurrent));
      if (!isCurrent()) return;
      const got = Object.keys(state.words).length;
      if (got > 1) store.set(cacheKey(provider, word), JSON.stringify(state.words));
      status(`“${word}” in ${got} languages. Hover a country for details; click one to compare against it.`);
    } catch (e) {
      if (isCurrent()) status(e.message, true);
    } finally {
      if (isCurrent()) {
        state.pending.clear();
        $("go").disabled = false;
        render();
      }
    }
  }

  // ---------- settings ----------
  function initSettings() {
    const provider = $("provider");
    const apikey = $("apikey");
    const email = $("mmemail");
    provider.value = store.get("ewm:provider") || "mymemory";
    apikey.value = store.get("ewm:apikey") || "";
    email.value = store.get("ewm:mmemail") || "";
    const sync = () => {
      $("claude-opts").hidden = provider.value !== "claude";
      $("mm-opts").hidden = provider.value !== "mymemory";
    };
    provider.addEventListener("change", () => { store.set("ewm:provider", provider.value); sync(); });
    apikey.addEventListener("change", () => store.set("ewm:apikey", apikey.value.trim()));
    email.addEventListener("change", () => store.set("ewm:mmemail", email.value.trim()));
    sync();
  }

  // One button per bundled word, for presenting without typing.
  // The story behind a prepared word, shown under the buttons; hidden otherwise.
  function story(note) {
    const s = $("story");
    s.replaceChildren();
    s.hidden = !note;
    if (!note) return;
    s.append(note.text + " ");
    if (note.ref && LANGUAGES[note.ref]) {
      const b = document.createElement("button");
      b.className = "ghost";
      b.style.padding = "2px 8px";
      b.textContent = `Compare with ${LANGUAGES[note.ref][0]}`;
      b.dataset.ref = note.ref;
      b.hidden = state.ref === note.ref;
      b.addEventListener("click", () => { if (state.ref !== note.ref) setRef(note.ref); });
      s.append(b);
    }
  }

  function initPresets(group, barId) {
    const bar = $(barId);
    for (const query of window.EuropePresets.GROUPS[group] || []) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = query;
      b.addEventListener("click", () => { $("word").value = query; search(query); });
      bar.appendChild(b);
    }
  }

  function initFriends() {
    const bar = $("friends");
    for (const pair of window.EuropeFalseFriends.FALSE_FRIENDS) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = `${pair.pl.word} / ${pair.sk.word}`;
      b.title = `Polish: ${pair.pl.means} · Slovak: ${pair.sk.means}`;
      b.addEventListener("click", () => showFriend(pair));
      bar.appendChild(b);
    }
  }

  // "How it works": its example scores and thresholds come from the code, so
  // the explanation cannot drift from what the page actually does.
  function initHelp() {
    const dialog = $("howto");
    const pct = (v) => Math.round(v * 100) + "%";
    const { SETTINGS, similarity } = window.WordSimilarity;
    const values = {
      clusterThreshold: pct(SETTINGS.clusterThreshold),
      skeletonWeight: pct(SETTINGS.skeletonWeight),
      skeletonMinShared: String(SETTINGS.skeletonMinShared),
      bands: BANDS.map(([from, token], i) => `${["pale", "orange", "dark orange", "red"][i]} from ${pct(from)}`).join(", "),
    };
    for (const el of dialog.querySelectorAll("[data-value]")) el.textContent = values[el.dataset.value];
    for (const el of dialog.querySelectorAll("[data-a]")) {
      el.textContent = `${el.dataset.a} / ${el.dataset.b}: ${pct(similarity(el.dataset.a, el.dataset.b))}`;
    }
    // "Show X on the map": close the panel and show that word with all its groups.
    for (const el of dialog.querySelectorAll("[data-show]")) {
      el.addEventListener("click", () => {
        dialog.close();
        state.ref = null;
        $("word").value = el.dataset.show;
        search(el.dataset.show);
      });
    }
    $("help").addEventListener("click", () => dialog.showModal());
    $("howto-close").addEventListener("click", () => dialog.close());
    // A click on the backdrop (outside the panel) closes it too.
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  }

  drawMap();
  initSettings();
  initHelp();
  initPresets("words", "presets");
  initPresets("stories", "stories");
  initFriends();
  render();
  $("search").addEventListener("submit", (e) => { e.preventDefault(); search($("word").value); });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", render);
  const initial = new URLSearchParams(location.search).get("q");
  if (initial) { $("word").value = initial; search(initial); }
})();
