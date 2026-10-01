// Translations bundled with the page, so these words show instantly and offline
// (no translation service is called for them). They also appear as one-click
// buttons under the search box, in this order.
//
// An entry is either the word, or [word, romanisation]. The romanisation is what
// the similarity score compares; give it for non-Latin scripts, and to drop
// grammatical particles ("se souvenir" -> "souvenir") that are not part of the
// word's sound.
(function (root) {
  "use strict";

  const RAW = {
    word: {
      sq: "fjalë", hy: ["բառ", "bar"], az: "söz", eu: "hitz", be: ["слова", "slova"],
      bs: "riječ", bg: ["дума", "duma"], ca: "paraula", hr: "riječ", cs: "slovo",
      da: "ord", nl: "woord", en: "word", et: "sõna", fo: "orð", fi: "sana", fr: "mot",
      gl: "palabra", ka: ["სიტყვა", "sitqva"], de: "Wort", el: ["λέξη", "lexi"],
      hu: "szó", is: "orð", ga: "focal", it: "parola", lv: "vārds", lt: "žodis",
      lb: "Wuert", mk: ["збор", "zbor"], mt: "kelma", no: "ord", pl: "słowo",
      pt: "palavra", ro: "cuvânt", ru: ["слово", "slovo"], sr: ["реч", "reč"],
      sk: "slovo", sl: "beseda", es: "palabra", sv: "ord", tr: "kelime",
      uk: ["слово", "slovo"], cy: "gair",
    },
    telephone: {
      sq: "telefon", hy: ["հեռախոս", "herakhos"], az: "telefon", eu: "telefono",
      be: ["тэлефон", "telefon"], bs: "telefon", bg: ["телефон", "telefon"],
      ca: "telèfon", hr: "telefon", cs: "telefon", da: "telefon", nl: "telefoon",
      en: "telephone", et: "telefon", fo: "telefon", fi: "puhelin", fr: "téléphone",
      gl: "teléfono", ka: ["ტელეფონი", "telefoni"], de: "Telefon",
      el: ["τηλέφωνο", "tilefono"], hu: "telefon", is: "sími", ga: "teileafón",
      it: "telefono", lv: "telefons", lt: "telefonas", lb: "Telefon",
      mk: ["телефон", "telefon"], mt: "telefon", no: "telefon", pl: "telefon",
      pt: "telefone", ro: "telefon", ru: ["телефон", "telefon"],
      sr: ["телефон", "telefon"], sk: "telefón", sl: "telefon", es: "teléfono",
      sv: "telefon", tr: "telefon", uk: ["телефон", "telefon"], cy: "ffôn",
    },
    remember: {
      sq: "kujtoj", hy: ["հիշել", "hishel"], az: "xatırlamaq", eu: "gogoratu",
      be: ["памятаць", "pamiatac"], bs: "pamtiti", bg: ["помня", "pomnia"],
      ca: "recordar", hr: "pamtiti", cs: ["pamatovat si", "pamatovat"], da: "huske",
      nl: "herinneren", en: "remember", et: "mäletama", fo: "minnast", fi: "muistaa",
      fr: ["se souvenir", "souvenir"], gl: "lembrar", ka: ["გახსენება", "gakhseneba"],
      de: "erinnern", el: ["θυμάμαι", "thimame"], hu: "emlékezni", is: "muna",
      ga: "cuimhnigh", it: "ricordare", lv: "atcerēties", lt: "prisiminti",
      lb: "erënneren", mk: ["памети", "pameti"], mt: "niftakar", no: "huske",
      pl: "pamiętać", pt: "lembrar", ro: ["a-și aminti", "aminti"],
      ru: ["помнить", "pomnit"], sr: ["памтити", "pamtiti"],
      sk: ["pamätať si", "pamatat"], sl: ["zapomniti si", "zapomniti"],
      es: "recordar", sv: "komma ihåg", tr: "hatırlamak",
      uk: ["пам'ятати", "pamiatati"], cy: "cofio",
    },
    forget: {
      sq: "harroj", hy: ["մոռանալ", "moranal"], az: "unutmaq", eu: "ahaztu",
      be: ["забываць", "zabyvac"], bs: "zaboraviti", bg: ["забравя", "zabravia"],
      ca: "oblidar", hr: "zaboraviti", cs: "zapomenout", da: "glemme", nl: "vergeten",
      en: "forget", et: "unustama", fo: "gloyma", fi: "unohtaa", fr: "oublier",
      gl: "esquecer", ka: ["დავიწყება", "davitsqeba"], de: "vergessen",
      el: ["ξεχνώ", "ksehno"], hu: "elfelejteni", is: "gleyma", ga: "dearmad",
      it: "dimenticare", lv: "aizmirst", lt: "pamiršti", lb: "vergiessen",
      mk: ["заборави", "zaboravi"], mt: "tinsa", no: "glemme", pl: "zapomnieć",
      pt: "esquecer", ro: ["a uita", "uita"], ru: ["забыть", "zabyt"],
      sr: ["заборавити", "zaboraviti"], sk: "zabudnúť", sl: "pozabiti", es: "olvidar",
      sv: "glömma", tr: "unutmak", uk: ["забути", "zabuti"], cy: "anghofio",
    },
    fresh: {
      sq: ["i freskët", "freskët"], hy: ["թարմ", "tarm"], az: "təzə", eu: "fresko",
      be: ["свежы", "svezhy"], bs: "svjež", bg: ["пресен", "presen"], ca: "fresc",
      hr: "svjež", cs: "čerstvý", da: "frisk", nl: "vers", en: "fresh", et: "värske",
      fo: "feskur", fi: "tuore", fr: "frais", gl: "fresco", ka: ["ახალი", "akhali"],
      de: "frisch", el: ["φρέσκος", "freskos"], hu: "friss", is: "ferskur", ga: "úr",
      it: "fresco", lv: "svaigs", lt: "šviežias", lb: "frësch", mk: ["свеж", "svezh"],
      mt: "frisk", no: "fersk", pl: "świeży", pt: "fresco", ro: "proaspăt",
      ru: ["свежий", "svezhij"], sr: ["свеж", "svež"], sk: "čerstvý", sl: "svež",
      es: "fresco", sv: "färsk", tr: "taze", uk: ["свіжий", "svizhij"], cy: "ffres",
    },
    stale: {
      sq: "bajat", hy: ["հնացած", "hnatsats"], az: "bayat", eu: "zahar",
      be: ["чэрствы", "cherstvy"], bs: "bajat", bg: ["баят", "bajat"], ca: "sec",
      hr: "bajat", cs: "okoralý", da: "gammel", nl: "oudbakken", en: "stale",
      et: "vana", fo: "gamal", fi: "vanha", fr: "rassis", gl: "duro",
      ka: ["ძველი", "dzveli"], de: "altbacken", el: ["μπαγιάτικος", "bagiatikos"],
      hu: "állott", is: "gamall", ga: "stálaithe", it: "raffermo", lv: "sakaltis",
      lt: "pasenęs", lb: "al", mk: ["бајат", "bajat"], mt: "qadim", no: "gammel",
      pl: "czerstwy", pt: "duro", ro: "învechit", ru: ["чёрствый", "chorstvyj"],
      sr: ["бајат", "bajat"], sk: "starý", sl: "postan", es: "duro", sv: "gammal",
      tr: "bayat", uk: ["черствий", "cherstvij"], cy: "hen",
    },
    Italy: {
      sq: "Italia", hy: ["Իտալիա", "Italia"], az: "İtaliya", eu: "Italia",
      be: ["Італія", "Italija"], bs: "Italija", bg: ["Италия", "Italija"],
      ca: "Itàlia", hr: "Italija", cs: "Itálie", da: "Italien", nl: "Italië",
      en: "Italy", et: "Itaalia", fo: "Italia", fi: "Italia", fr: "Italie",
      gl: "Italia", ka: ["იტალია", "italia"], de: "Italien", el: ["Ιταλία", "Italia"],
      hu: "Olaszország", is: "Ítalía", ga: ["an Iodáil", "Iodáil"], it: "Italia",
      lv: "Itālija", lt: "Italija", lb: "Italien", mk: ["Италија", "Italija"],
      mt: ["l-Italja", "Italja"], no: "Italia", pl: "Włochy", pt: "Itália",
      ro: "Italia", ru: ["Италия", "Italija"], sr: ["Италија", "Italija"],
      sk: "Taliansko", sl: "Italija", es: "Italia", sv: "Italien", tr: "İtalya",
      uk: ["Італія", "Italija"], cy: ["yr Eidal", "Eidal"],
    },
    Germany: {
      sq: "Gjermania", hy: ["Գերմանիա", "Germania"], az: "Almaniya", eu: "Alemania",
      be: ["Германія", "Hiermanija"], bs: "Njemačka", bg: ["Германия", "Germanija"],
      ca: "Alemanya", hr: "Njemačka", cs: "Německo", da: "Tyskland", nl: "Duitsland",
      en: "Germany", et: "Saksamaa", fo: "Týskland", fi: "Saksa", fr: "Allemagne",
      gl: "Alemaña", ka: ["გერმანია", "germania"], de: "Deutschland",
      el: ["Γερμανία", "Germania"], hu: "Németország", is: "Þýskaland",
      ga: ["an Ghearmáin", "Ghearmáin"], it: "Germania", lv: "Vācija", lt: "Vokietija",
      lb: "Däitschland", mk: ["Германија", "Germanija"], mt: ["il-Ġermanja", "Ġermanja"],
      no: "Tyskland", pl: "Niemcy", pt: "Alemanha", ro: "Germania",
      ru: ["Германия", "Germanija"], sr: ["Немачка", "Nemačka"], sk: "Nemecko",
      sl: "Nemčija", es: "Alemania", sv: "Tyskland", tr: "Almanya",
      uk: ["Німеччина", "Nimechchyna"], cy: ["yr Almaen", "Almaen"],
    },
    tea: {
      sq: "çaj", hy: ["թեյ", "tey"], az: "çay", eu: "te", be: ["гарбата", "harbata"],
      bs: "čaj", bg: ["чай", "chaj"], ca: "te", hr: "čaj", cs: "čaj", da: "te",
      nl: "thee", en: "tea", et: "tee", fo: "te", fi: "tee", fr: "thé", gl: "té",
      ka: ["ჩაი", "chai"], de: "Tee", el: ["τσάι", "tsai"], hu: "tea", is: "te",
      ga: "tae", it: "tè", lv: "tēja", lt: "arbata", lb: "Téi", mk: ["чај", "čaj"],
      mt: "te", no: "te", pl: "herbata", pt: "chá", ro: ["ceai", "cheai"],
      ru: ["чай", "chaj"], sr: ["чај", "čaj"], sk: "čaj", sl: "čaj", es: "té",
      sv: "te", tr: "çay", uk: ["чай", "chaj"], cy: "te",
    },
    coffee: {
      sq: "kafe", hy: ["սուրճ", "surch"], az: "qəhvə", eu: "kafe", be: ["кава", "kava"],
      bs: "kafa", bg: ["кафе", "kafe"], ca: "cafè", hr: "kava", cs: "káva",
      da: "kaffe", nl: "koffie", en: "coffee", et: "kohv", fo: "kaffi", fi: "kahvi",
      fr: "café", gl: "café", ka: ["ყავა", "qava"], de: "Kaffee", el: ["καφές", "kafes"],
      hu: "kávé", is: "kaffi", ga: "caife", it: "caffè", lv: "kafija", lt: "kava",
      lb: "Kaffi", mk: ["кафе", "kafe"], mt: "kafè", no: "kaffe", pl: "kawa",
      pt: "café", ro: "cafea", ru: ["кофе", "kofe"], sr: ["кафа", "kafa"], sk: "káva",
      sl: "kava", es: "café", sv: "kaffe", tr: "kahve", uk: ["кава", "kava"], cy: "coffi",
    },
    milk: {
      sq: "qumësht", hy: ["կաթ", "kat"], az: "süd", eu: "esne", be: ["малако", "malako"],
      bs: "mlijeko", bg: ["мляко", "mliako"], ca: "llet", hr: "mlijeko", cs: "mléko",
      da: "mælk", nl: "melk", en: "milk", et: "piim", fo: "mjólk", fi: "maito",
      fr: "lait", gl: "leite", ka: ["რძე", "rdze"], de: "Milch", el: ["γάλα", "gala"],
      hu: "tej", is: "mjólk", ga: "bainne", it: "latte", lv: "piens", lt: "pienas",
      lb: "Mëllech", mk: ["млеко", "mleko"], mt: "ħalib", no: "melk", pl: "mleko",
      pt: "leite", ro: "lapte", ru: ["молоко", "moloko"], sr: ["млеко", "mleko"],
      sk: "mlieko", sl: "mleko", es: "leche", sv: "mjölk", tr: "süt",
      uk: ["молоко", "moloko"], cy: "llaeth",
    },
    Slav: {
      sq: "sllav", hy: ["սլավոն", "slavon"], az: "slavyan", eu: "eslaviar",
      be: ["славянін", "slavianin"], bs: "Slaven", bg: ["славянин", "slavianin"],
      ca: "eslau", hr: "Slaven", cs: "Slovan", da: "slaver", nl: "Slaviër", en: "Slav",
      et: "slaavlane", fo: "slavi", fi: "slaavi", fr: "Slave", gl: "eslavo",
      ka: ["სლავი", "slavi"], de: "Slawe", el: ["Σλάβος", "slavos"], hu: "szláv",
      is: "Slavi", ga: "Slavach", it: "slavo", lv: "slāvs", lt: "slavas", lb: "Slav",
      mk: ["Словен", "sloven"], mt: "Slav", no: "slaver", pl: "Słowianin", pt: "eslavo",
      ro: "slav", ru: ["славянин", "slavianin"], sr: ["Словен", "sloven"], sk: "Slovan",
      sl: "Slovan", es: "eslavo", sv: "slav", tr: "Slav", uk: ["слов'янин", "slovianin"],
      cy: "Slaf",
    },
    slave: {
      sq: "skllav", hy: ["ստրուկ", "struk"], az: "qul", eu: "esklabo", be: ["раб", "rab"],
      bs: "rob", bg: ["роб", "rob"], ca: "esclau", hr: "rob", cs: "otrok", da: "slave",
      nl: "slaaf", en: "slave", et: "ori", fo: "trælur", fi: "orja", fr: "esclave",
      gl: "escravo", ka: ["მონა", "mona"], de: "Sklave", el: ["σκλάβος", "sklavos"],
      hu: "rabszolga", is: "þræll", ga: ["sclábhaí", "sklavi"], it: ["schiavo", "skiavo"],
      lv: "vergs", lt: "vergas", lb: "Sklav", mk: ["роб", "rob"], mt: "skjav",
      no: "slave", pl: "niewolnik", pt: "escravo", ro: "sclav", ru: ["раб", "rab"],
      sr: ["роб", "rob"], sk: "otrok", sl: "suženj", es: "esclavo", sv: "slav",
      tr: "köle", uk: ["раб", "rab"], cy: "caethwas",
    },
  };

  // -> { query: { lang: { word, latin? } } }, keeping insertion order.
  const PRESETS = {};
  const GROUPS = {};  // group name -> [query, ...], one row of buttons each
  const NOTES = {};   // query -> { text, ref }: the story told under the buttons, if any

  function toWords(langs) {
    const out = {};
    for (const [lang, entry] of Object.entries(langs)) {
      out[lang] = Array.isArray(entry) ? { word: entry[0], latin: entry[1] } : { word: entry };
    }
    return out;
  }

  // entries: { query: langs } or { query: { note, words: langs } }.
  function addGroup(name, entries) {
    GROUPS[name] = [];
    for (const [query, entry] of Object.entries(entries)) {
      const langs = entry.words || entry;
      PRESETS[query] = toWords(langs);
      if (entry.note) NOTES[query] = { text: entry.note, ref: entry.ref };
      GROUPS[name].push(query);
    }
  }
  addGroup("words", RAW);

  // Case-insensitive lookup: "italy", "Italy" and " ITALY " all match.
  function findPreset(query) {
    const q = String(query).trim().toLowerCase();
    const key = Object.keys(PRESETS).find((k) => k.toLowerCase() === q);
    return key ? { query: key, words: PRESETS[key], note: NOTES[key] } : null;
  }

  const api = { PRESETS, GROUPS, NOTES, addGroup, findPreset };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.EuropePresets = api;
})(typeof window !== "undefined" ? window : globalThis);
