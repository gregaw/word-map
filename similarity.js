// How alike two words sound, across scripts and spelling conventions.
//
// Both words are romanised, stripped of articles and accents, and folded to a
// rough phonetic spelling (Polish "sz", Czech "š" and German "sch" all become
// "sh", "w" becomes "v", ...). The score is 1 - edit distance / longer length,
// so 1 means "sounds the same" and 0 means "nothing in common".
(function (root) {
  "use strict";

  const CYRILLIC = {
    а: "a", б: "b", в: "v", г: "g", ґ: "g", д: "d", е: "e", ё: "jo", є: "je",
    ж: "zh", з: "z", и: "i", і: "i", ї: "ji", й: "j", ј: "j", к: "k", л: "l",
    љ: "lj", м: "m", н: "n", њ: "nj", о: "o", п: "p", р: "r", с: "s", т: "t",
    ћ: "ch", ђ: "dj", ќ: "kj", ѓ: "gj", у: "u", ў: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", џ: "dzh", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e",
    ю: "ju", я: "ja", ѕ: "dz",
  };
  const GREEK = {
    α: "a", β: "v", γ: "g", δ: "d", ε: "e", ζ: "z", η: "i", θ: "th", ι: "i",
    κ: "k", λ: "l", μ: "m", ν: "n", ξ: "ks", ο: "o", π: "p", ρ: "r", σ: "s",
    ς: "s", τ: "t", υ: "i", φ: "f", χ: "h", ψ: "ps", ω: "o",
  };
  const GEORGIAN = {
    ა: "a", ბ: "b", გ: "g", დ: "d", ე: "e", ვ: "v", ზ: "z", თ: "t", ი: "i",
    კ: "k", ლ: "l", მ: "m", ნ: "n", ო: "o", პ: "p", ჟ: "zh", რ: "r", ს: "s",
    ტ: "t", უ: "u", ფ: "p", ქ: "k", ღ: "gh", ყ: "q", შ: "sh", ჩ: "ch", ც: "ts",
    ძ: "dz", წ: "ts", ჭ: "ch", ხ: "kh", ჯ: "j", ჰ: "h",
  };
  const ARMENIAN = {
    ա: "a", բ: "b", գ: "g", դ: "d", ե: "e", զ: "z", է: "e", ը: "e", թ: "t",
    ժ: "zh", ի: "i", լ: "l", խ: "kh", ծ: "ts", կ: "k", հ: "h", ձ: "dz",
    ղ: "gh", ճ: "ch", մ: "m", յ: "j", ն: "n", շ: "sh", ո: "o", չ: "ch",
    պ: "p", ջ: "j", ռ: "r", ս: "s", վ: "v", տ: "t", ր: "r", ց: "ts", ւ: "v",
    փ: "p", ք: "k", օ: "o", ֆ: "f", և: "ev",
  };
  // Latin letters that Unicode decomposition does not reduce to plain ASCII,
  // plus the diacritic letters whose sound differs from the bare letter.
  const LATIN = {
    š: "sh", ś: "sh", ş: "sh", ș: "sh", č: "ch", ć: "ch", ç: "ch", ž: "zh",
    ź: "zh", ż: "zh", ł: "l", đ: "dj", ð: "d", þ: "th", ø: "o", æ: "ae",
    œ: "oe", ß: "ss", ı: "i", ħ: "h", ġ: "g", ğ: "g", ё: "jo",
  };
  const SCRIPTS = Object.assign({}, CYRILLIC, GREEK, GEORGIAN, ARMENIAN, LATIN);

  // Leading articles, so "das Wort" compares as "Wort" and "la palabra" as "palabra".
  const ARTICLES = new Set([
    "the", "a", "an", "der", "die", "das", "den", "dem", "des", "ein", "eine",
    "le", "la", "les", "l", "un", "une", "el", "los", "las", "il", "lo", "gli",
    "i", "uno", "o", "os", "as", "um", "uma", "de", "het", "een", "en", "et",
    "ett", "to", "ta", "tou", "ena", "mia", "na", "an", "y", "yr",
  ]);

  function romanize(word) {
    let out = "";
    for (const ch of String(word).toLowerCase()) {
      // Accented non-Latin letters (Greek "ό", Cyrillic "ѝ") map via their base letter.
      const base = ch.normalize("NFD")[0];
      out += SCRIPTS[ch] ?? (base in SCRIPTS && !LATIN[base] ? SCRIPTS[base] : ch);
    }
    return out;
  }

  function stripArticle(text) {
    const parts = text.split(/[\s'’-]+/).filter(Boolean);
    while (parts.length > 1 && ARTICLES.has(parts[0])) parts.shift();
    return parts.join(" ");
  }

  // Romanise, drop articles/accents/punctuation, fold spelling to sound.
  function phonetic(word) {
    let s = romanize(word);
    s = s.split(/[,;/(]/)[0]; // "slovo, reč" -> first alternative only
    s = stripArticle(s.replace(/[^\p{L}\s'’-]/gu, " ").trim());
    s = s.normalize("NFD").replace(/\p{M}/gu, "");
    s = s
      .replace(/sch/g, "sh").replace(/sz/g, "sh").replace(/cz/g, "ch")
      .replace(/rz/g, "zh").replace(/tsch/g, "ch").replace(/tch/g, "ch")
      .replace(/ph/g, "f").replace(/th/g, "t").replace(/ck/g, "k")
      .replace(/qu/g, "kv").replace(/x/g, "ks").replace(/w/g, "v")
      .replace(/c(?=[eiy])/g, "s").replace(/c(?!h)/g, "k")
      .replace(/y/g, "i")
      .replace(/[^a-z]/g, "")
      .replace(/(.)\1+/g, "$1");
    return s;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      prev = cur;
    }
    return prev[b.length];
  }

  // Sounds as single tokens: the digraphs phonetic() produces count as one sound.
  const DIGRAPHS = ["shch", "sh", "ch", "zh", "ts", "dz", "kh", "gh", "dj", "gj", "kj"];
  function sounds(p) {
    const out = [];
    for (let i = 0; i < p.length;) {
      const d = DIGRAPHS.find((x) => p.startsWith(x, i));
      out.push(d || p[i]);
      i += d ? d.length : 1;
    }
    return out;
  }

  // Sound classes, after Dolgopolsky: as a word drifts between languages, its
  // sounds mostly swap within a class (t/d, k/g, s/sh, p/f), so a swap inside a
  // class is cheap. Vowels drift most of all and weigh least.
  const CLASS = {};
  for (const [cls, list] of Object.entries({
    V: "a e i o u", P: "p b f", W: "v w", T: "t d", S: "s z sh zh shch", K: "k g q kh gh",
    C: "ch ts dz dj gj kj", M: "m", N: "n", R: "r l", J: "j", H: "h",
  })) for (const t of list.split(" ")) CLASS[t] = cls;
  const cls = (t) => CLASS[t] || t;
  // Class pairs that also trade often: affricates with sibilants and velars
  // (Latin j became French zh, Spanish kh, Galician sh), f with v, m with n.
  const NEAR = new Set(["C|S", "C|K", "P|W", "J|V", "H|K", "M|N", "J|S", "J|C", "J|K"]);
  const near = (a, b) => NEAR.has(a + "|" + b) || NEAR.has(b + "|" + a);

  const indelCost = (t) => (cls(t) === "V" || cls(t) === "H" ? 0.5 : 1);
  function subCost(a, b) {
    if (a === b) return 0;
    const ca = cls(a), cb = cls(b);
    if (ca === cb) return ca === "V" ? 0.2 : 0.3;
    return near(ca, cb) ? 0.5 : 1;
  }

  // Edit distance over sounds with the costs above (and cheap swaps of two
  // neighbours), scaled to 0..1 by what deleting the longer word would cost.
  function alignSimilarity(a, b) {
    const n = a.length, m = b.length;
    const d = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) d[i][0] = d[i - 1][0] + indelCost(a[i - 1]);
    for (let j = 1; j <= m; j++) d[0][j] = d[0][j - 1] + indelCost(b[j - 1]);
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        d[i][j] = Math.min(
          d[i - 1][j] + indelCost(a[i - 1]),
          d[i][j - 1] + indelCost(b[j - 1]),
          d[i - 1][j - 1] + subCost(a[i - 1], b[j - 1]),
        );
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 0.5);
        }
      }
    }
    const whole = (w) => w.reduce((sum, t) => sum + indelCost(t), 0);
    let score = 1 - d[n][m] / Math.max(whole(a), whole(b));
    // A shared start is what makes words feel related ("Wort"/"word").
    let prefix = 0;
    while (prefix < Math.min(3, n, m) && cls(a[prefix]) === cls(b[prefix])) prefix++;
    score += prefix * 0.04 * (1 - score);
    return Math.max(0, Math.min(1, score));
  }

  // The consonant skeleton in order, which survives when a language drops a
  // syllable: czwartek is cz-w-r-t-k, четвер is č-t-v-r. Scored as the share of
  // the skeleton two words have in common (Dice over the longest common
  // subsequence), and only from three shared consonants up. Sibilants and
  // affricates count as one here (cz, č, ч, sz, s).
  const SKELETON_MERGE = { S: "C" };
  function skeleton(sound) {
    return sound.map(cls).filter((c) => c !== "V" && c !== "H").map((c) => SKELETON_MERGE[c] || c);
  }
  function skeletonSimilarity(a, b) {
    const x = skeleton(a), y = skeleton(b);
    if (x.length < 2 || y.length < 2) return 0;
    const d = Array.from({ length: x.length + 1 }, () => new Array(y.length + 1).fill(0));
    for (let i = 1; i <= x.length; i++) {
      for (let j = 1; j <= y.length; j++) {
        d[i][j] = x[i - 1] === y[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);
      }
    }
    const common = d[x.length][y.length];
    // Two shared consonants happen by chance (puhelin / telephone share l, n).
    return common < 3 ? 0 : (2 * common) / (x.length + y.length);
  }

  // 0..1: 1 means "sounds the same", 0 "nothing in common". Words given with a
  // romanisation (e.g. from Claude) should pass it; it is better than ours.
  function similarity(a, b) {
    const sa = sounds(phonetic(a)), sb = sounds(phonetic(b));
    if (!sa.length || !sb.length) return 0;
    if (sa.join("") === sb.join("")) return 1;
    // The skeleton alone is weaker evidence, so it counts for at most 0.8.
    return Math.max(alignSimilarity(sa, sb), 0.8 * skeletonSimilarity(sa, sb));
  }

  // Groups of alike words, for colouring the map when no country is selected.
  // Average-linkage clustering: keep merging the two groups whose words are,
  // on average, most alike, while that average is at least `threshold`.
  // Returns groups of two or more, largest first, each as
  // { langs: [...], strength: { lang: average similarity to the rest of its group } }.
  // Pass `fixed` ([[lang, ...], ...]) to skip the clustering and only score
  // groups decided elsewhere (curated by origin).
  function clusters(words, threshold = 0.5, fixed = null) {
    const text = (l) => words[l].latin || words[l].word;
    const langs = Object.keys(words).filter((l) => words[l] && words[l].word);
    const sim = {};
    for (const a of langs) {
      sim[a] = {};
      for (const b of langs) sim[a][b] = a === b ? 1 : b in sim && a in sim[b] ? sim[b][a] : similarity(text(a), text(b));
    }
    const avg = (A, B) => {
      let total = 0;
      for (const a of A) for (const b of B) total += sim[a][b];
      return total / (A.length * B.length);
    };
    let groups = fixed ? fixed.map((g) => g.filter((l) => langs.includes(l))) : langs.map((l) => [l]);
    while (!fixed) {
      let best = -1, bi = -1, bj = -1;
      for (let i = 0; i < groups.length; i++) {
        for (let j = i + 1; j < groups.length; j++) {
          const v = avg(groups[i], groups[j]);
          if (v > best) [best, bi, bj] = [v, i, j];
        }
      }
      if (best < threshold) break;
      groups[bi] = groups[bi].concat(groups[bj]);
      groups.splice(bj, 1);
    }
    return groups
      .filter((g) => g.length > 1)
      .sort((a, b) => b.length - a.length || a[0].localeCompare(b[0]))
      .map((g) => {
        const strength = {};
        for (const l of g) strength[l] = avg([l], g.filter((o) => o !== l));
        return { langs: g, strength };
      });
  }

  // words: { lang: { word, latin? } }. With a reference language, each
  // language scores its similarity to that one; without, its best match with
  // any other language, so groups of alike words light up together.
  function scoreAll(words, ref) {
    const text = (l) => words[l].latin || words[l].word;
    const langs = Object.keys(words).filter((l) => words[l] && words[l].word);
    const scores = {};
    for (const l of langs) {
      if (ref && words[ref] && words[ref].word) {
        scores[l] = l === ref ? 1 : similarity(text(l), text(ref));
      } else {
        let best = 0;
        for (const o of langs) if (o !== l) best = Math.max(best, similarity(text(l), text(o)));
        scores[l] = best;
      }
    }
    return scores;
  }

  const api = { romanize, phonetic, sounds, levenshtein, similarity, scoreAll, clusters };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.WordSimilarity = api;
})(typeof window !== "undefined" ? window : globalThis);
