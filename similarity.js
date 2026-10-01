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
      .replace(/[yj]/g, "i")
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

  // 0..1. Words given with an optional romanisation (e.g. from Claude) should
  // pass the romanisation, it is better than ours.
  function similarity(a, b) {
    const pa = phonetic(a);
    const pb = phonetic(b);
    if (!pa || !pb) return 0;
    const longer = Math.max(pa.length, pb.length);
    let score = 1 - levenshtein(pa, pb) / longer;
    // A shared start is what makes words feel related ("Wort"/"word"); give a
    // small bonus for it, as Jaro-Winkler does.
    let prefix = 0;
    while (prefix < Math.min(4, pa.length, pb.length) && pa[prefix] === pb[prefix]) prefix++;
    score += prefix * 0.05 * (1 - score);
    return Math.max(0, Math.min(1, score));
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

  const api = { romanize, phonetic, levenshtein, similarity, scoreAll };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.WordSimilarity = api;
})(typeof window !== "undefined" ? window : globalThis);
