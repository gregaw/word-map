// Words with a story across Europe's language families: Latin, Germanic,
// Slavic, and the ones that crossed between them. Same format as presets.js
// (word, or [word, romanisation]). `ref` is the language whose view tells the
// story best (the caption offers to compare with it). `groups` (optional) are
// hand-picked groups by origin, [id, languages], shown when the viewer switches
// to them. The captions and group names are in each i18n-xx.js, by word and id.
// Loaded after presets.js, which it extends.
(function (root) {
  "use strict";

  const STORIES = {
    Thursday: {
      // Hand-picked by the origin of the word, which sound alone cannot recover here.
      groups: [
        ["thor", "en de nl lb da no sv fo fi"],
        ["jupiter", "fr it es ca gl ro cy"],
        ["fourth", "pl cs sk ru uk be bg sr hr bs mk sl hu lv lt et"],
        ["fifth", "pt el tr hy ka is mt"],
      ],
      ref: "fr",
      words: {
        sq: ["e enjte", "enjte"], hy: ["հինգշաբթի", "hingshabti"], az: "cümə axşamı",
        eu: "osteguna", be: ["чацвер", "chatsver"], bs: "četvrtak",
        bg: ["четвъртък", "chetvartak"], ca: "dijous", hr: "četvrtak", cs: "čtvrtek",
        da: "torsdag", nl: "donderdag", en: "Thursday", et: "neljapäev", fo: "hósdagur",
        fi: "torstai", fr: "jeudi", gl: ["xoves", "shoves"], ka: ["ხუთშაბათი", "khutshabati"],
        de: "Donnerstag", el: ["Πέμπτη", "pempti"], hu: ["csütörtök", "chütörtök"], is: "fimmtudagur",
        ga: "Déardaoin", it: ["giovedì", "jovedi"], lv: "ceturtdiena", lt: "ketvirtadienis",
        lb: "Donneschdeg", mk: ["четврток", "chetvrtok"], mt: ["il-Ħamis", "Hamis"],
        no: "torsdag", pl: "czwartek", pt: "quinta-feira", ro: "joi",
        ru: ["четверг", "chetverg"], sr: ["четвртак", "četvrtak"], sk: "štvrtok",
        sl: "četrtek", es: "jueves", sv: "torsdag", tr: "perşembe",
        uk: ["четвер", "chetver"], cy: ["dydd Iau", "Iau"],
      },
    },
    Saturday: {
      // Hand-picked by the origin of the word, which sound alone cannot recover here.
      groups: [
        ["sabbath", "pl cs sk ru uk be bg sr hr bs mk sl hu it es pt gl ca fr ro de lb el hy ka mt az"],
        ["saturn", "en nl ga cy sq"],
        ["washing", "sv da no is fo fi et"],
        ["sixth", "lv lt"],
      ],
      ref: "pl",
      words: {
        sq: ["e shtunë", "shtunë"], hy: ["շաբաթ", "shabat"], az: "şənbə", eu: "larunbata",
        be: ["субота", "subota"], bs: "subota", bg: ["събота", "sabota"], ca: "dissabte",
        hr: "subota", cs: "sobota", da: "lørdag", nl: "zaterdag", en: "Saturday",
        et: "laupäev", fo: "leygardagur", fi: "lauantai", fr: "samedi", gl: "sábado",
        ka: ["შაბათი", "shabati"], de: "Samstag", el: ["Σάββατο", "savato"], hu: ["szombat", "sombat"],
        is: "laugardagur", ga: ["Dé Sathairn", "Sathairn"], it: "sabato", lv: "sestdiena",
        lt: "šeštadienis", lb: "Samschdeg", mk: ["сабота", "sabota"], mt: ["is-Sibt", "Sibt"],
        no: "lørdag", pl: "sobota", pt: "sábado", ro: "sâmbătă", ru: ["суббота", "subbota"],
        sr: ["субота", "subota"], sk: "sobota", sl: "sobota", es: "sábado", sv: "lördag",
        tr: "cumartesi", uk: ["субота", "subota"], cy: ["dydd Sadwrn", "Sadwrn"],
      },
    },
    Christmas: {
      // Hand-picked by the origin of the word, which sound alone cannot recover here.
      groups: [
        ["natalis", "fr it es pt ca gl cy ga tr"],
        ["rod", "pl ru uk"],
        ["bozic", "hr bs sr sl mk"],
        ["yule", "sv da no is fo fi et"],
        ["calendae", "lt bg be"],
        ["weihnachten", "de cs sk"],
        ["christ", "en nl lb sq el"],
        ["kracun", "ro hu"],
      ],
      ref: "it",
      words: {
        sq: "Krishtlindje", hy: ["Սուրբ Ծնունդ", "Surb Tsnund"], az: "Milad bayramı",
        eu: "Eguberri", be: ["Каляды", "Kaliady"], bs: "Božić", bg: ["Коледа", "Koleda"],
        ca: "Nadal", hr: "Božić", cs: "Vánoce", da: "jul", nl: "Kerstmis", en: "Christmas",
        et: "jõulud", fo: "jól", fi: "joulu", fr: "Noël", gl: "Nadal",
        ka: ["შობა", "shoba"], de: "Weihnachten", el: ["Χριστούγεννα", "hristugena"],
        hu: ["karácsony", "karachoni"], is: "jól", ga: "Nollaig", it: "Natale", lv: "Ziemassvētki",
        lt: "Kalėdos", lb: "Chrëschtdag", mk: ["Божиќ", "Božikj"], mt: ["il-Milied", "Milied"],
        no: "jul", pl: "Boże Narodzenie", pt: "Natal", ro: "Crăciun",
        ru: ["Рождество", "Rozhdestvo"], sr: ["Божић", "Božić"], sk: "Vianoce",
        sl: "božič", es: "Navidad", sv: "jul", tr: "Noel", uk: ["Різдво", "Rizdvo"],
        cy: "Nadolig",
      },
    },
    king: {
      ref: "pl",
      words: {
        sq: "mbret", hy: ["թագավոր", "tagavor"], az: "kral", eu: "errege",
        be: ["кароль", "karol"], bs: "kralj", bg: ["крал", "kral"], ca: "rei", hr: "kralj",
        cs: "král", da: "konge", nl: "koning", en: "king", et: "kuningas", fo: "kongur",
        fi: "kuningas", fr: "roi", gl: "rei", ka: ["მეფე", "mepe"], de: "König",
        el: ["βασιλιάς", "vasilias"], hu: "király", is: "konungur", ga: "rí", it: "re",
        lv: "karalis", lt: "karalius", lb: "Kinnek", mk: ["крал", "kral"], mt: "re",
        no: "konge", pl: "król", pt: "rei", ro: "rege", ru: ["король", "korol"],
        sr: ["краљ", "kralj"], sk: "kráľ", sl: "kralj", es: "rey", sv: "kung", tr: "kral",
        uk: ["король", "korol"], cy: "brenin",
      },
    },
    bread: {
      ref: "pl",
      words: {
        sq: "bukë", hy: ["հաց", "hats"], az: "çörək", eu: "ogi", be: ["хлеб", "hleb"],
        bs: "hljeb", bg: ["хляб", "hliab"], ca: "pa", hr: "kruh", cs: ["chléb", "hleb"],
        da: "brød", nl: "brood", en: "bread", et: "leib", fo: "breyð", fi: "leipä",
        fr: "pain", gl: "pan", ka: ["პური", "puri"], de: "Brot", el: ["ψωμί", "psomi"],
        hu: "kenyér", is: "brauð", ga: "arán", it: "pane", lv: "maize", lt: "duona",
        lb: "Brout", mk: ["леб", "leb"], mt: "ħobż", no: "brød", pl: ["chleb", "hleb"],
        pt: "pão", ro: "pâine", ru: ["хлеб", "hleb"], sr: ["хлеб", "hleb"],
        sk: ["chlieb", "hlieb"], sl: "kruh", es: "pan", sv: "bröd", tr: "ekmek",
        uk: ["хліб", "hlib"], cy: "bara",
      },
    },
    church: {
      ref: "ru",
      words: {
        sq: "kishë", hy: ["եկեղեցի", "yekeghetsi"], az: "kilsə", eu: "eliza",
        be: ["царква", "tsarkva"], bs: ["crkva", "tsrkva"], bg: ["църква", "tsarkva"], ca: "església",
        hr: ["crkva", "tsrkva"], cs: "kostel", da: "kirke", nl: "kerk", en: "church", et: "kirik",
        fo: "kirkja", fi: "kirkko", fr: "église", gl: "igrexa", ka: ["ეკლესია", "eklesia"],
        de: "Kirche", el: ["εκκλησία", "eklisia"], hu: "templom", is: "kirkja",
        ga: "eaglais", it: ["chiesa", "kiesa"], lv: "baznīca", lt: "bažnyčia",
        lb: "Kierch", mk: ["црква", "tsrkva"], mt: "knisja", no: "kirke", pl: "kościół",
        pt: "igreja", ro: "biserică", ru: ["церковь", "tserkov"], sr: ["црква", "tsrkva"],
        sk: "kostol", sl: ["cerkev", "tserkev"], es: "iglesia", sv: "kyrka", tr: "kilise",
        uk: ["церква", "tserkva"], cy: "eglwys",
      },
    },
    orange: {
      ref: "el",
      words: {
        sq: "portokall", hy: ["նարինջ", "narinj"], az: "portağal", eu: "laranja",
        be: ["апельсін", "apelsin"], bs: "narandža", bg: ["портокал", "portokal"],
        ca: "taronja", hr: "naranča", cs: "pomeranč", da: "appelsin", nl: "sinaasappel",
        en: "orange", et: "apelsin", fo: "appelsin", fi: "appelsiini", fr: "orange",
        gl: "laranxa", ka: ["ფორთოხალი", "portokhali"], de: "Orange",
        el: ["πορτοκάλι", "portokali"], hu: ["narancs", "naranch"], is: "appelsína", ga: "oráiste",
        it: ["arancia", "arancha"], lv: "apelsīns", lt: "apelsinas", lb: "Orange",
        mk: ["портокал", "portokal"], mt: "larinġa", no: "appelsin", pl: "pomarańcza",
        pt: "laranja", ro: "portocală", ru: ["апельсин", "apelsin"],
        sr: ["поморанџа", "pomorandža"], sk: "pomaranč", sl: "pomaranča", es: "naranja",
        sv: "apelsin", tr: "portakal", uk: ["апельсин", "apelsin"], cy: "oren",
      },
    },
    tomato: {
      ref: "hu",
      words: {
        sq: "domate", hy: ["լոլիկ", "lolik"], az: "pomidor", eu: "tomate",
        be: ["памідор", "pamidor"], bs: "paradajz", bg: ["домат", "domat"], ca: "tomàquet",
        hr: "rajčica", cs: "rajče", da: "tomat", nl: "tomaat", en: "tomato", et: "tomat",
        fo: "tomatur", fi: "tomaatti", fr: "tomate", gl: "tomate", ka: ["პომიდორი", "pomidori"],
        de: "Tomate", el: ["ντομάτα", "domata"], hu: ["paradicsom", "paradichom"], is: "tómatur",
        ga: "tráta", it: "pomodoro", lv: "tomāts", lt: "pomidoras", lb: "Tomat",
        mk: ["домат", "domat"], mt: "tadam", no: "tomat", pl: "pomidor", pt: "tomate",
        ro: "roșie", ru: ["помидор", "pomidor"], sr: ["парадајз", "paradajz"],
        sk: "paradajka", sl: "paradižnik", es: "tomate", sv: "tomat", tr: "domates",
        uk: ["помідор", "pomidor"], cy: "tomato",
      },
    },
    potato: {
      ref: "de",
      words: {
        sq: "patate", hy: ["կարտոֆիլ", "kartofil"], az: "kartof", eu: "patata",
        be: ["бульба", "bulba"], bs: "krompir", bg: ["картоф", "kartof"], ca: "patata",
        hr: "krumpir", cs: "brambor", da: "kartoffel", nl: "aardappel", en: "potato",
        et: "kartul", fo: "epli", fi: "peruna", fr: "pomme de terre", gl: "pataca",
        ka: ["კარტოფილი", "kartopili"], de: "Kartoffel", el: ["πατάτα", "patata"],
        hu: "burgonya", is: "kartafla", ga: "práta", it: "patata", lv: "kartupelis",
        lt: "bulvė", lb: "Gromper", mk: ["компир", "kompir"], mt: "patata", no: "potet",
        pl: "ziemniak", pt: "batata", ro: "cartof", ru: ["картофель", "kartofel"],
        sr: ["кромпир", "krompir"], sk: "zemiak", sl: "krompir", es: "patata",
        sv: "potatis", tr: "patates", uk: ["картопля", "kartoplia"], cy: "taten",
      },
    },
    turkey: {
      ref: "nl",
      words: {
        sq: "gjel deti", hy: ["հնդկահավ", "hndkahav"], az: "hind toyuğu", eu: "indioilar",
        be: ["індык", "indyk"], bs: "ćurka", bg: ["пуйка", "puika"], ca: "gall dindi",
        hr: "puran", cs: "krocan", da: "kalkun", nl: "kalkoen", en: "turkey", et: "kalkun",
        fo: "kalkun", fi: "kalkkuna", fr: "dinde", gl: "pavo", ka: ["ინდაური", "indauri"],
        de: "Truthahn", el: ["γαλοπούλα", "galopula"], hu: "pulyka", is: "kalkúnn",
        ga: "turcaí", it: "tacchino", lv: "tītars", lt: "kalakutas", lb: "Kalkoun",
        mk: ["мисирка", "misirka"], mt: "dundjan", no: "kalkun", pl: "indyk", pt: "peru",
        ro: "curcan", ru: ["индейка", "indeika"], sr: ["ћурка", "ćurka"], sk: "moriak",
        sl: "puran", es: "pavo", sv: "kalkon", tr: "hindi", uk: ["індик", "indyk"],
        cy: "twrci",
      },
    },
    night: {
      ref: "de",
      words: {
        sq: "natë", hy: ["գիշեր", "gisher"], az: "gecə", eu: "gau", be: ["ноч", "noch"],
        bs: "noć", bg: ["нощ", "nosht"], ca: "nit", hr: "noć", cs: "noc", da: "nat",
        nl: "nacht", en: "night", et: "öö", fo: "nátt", fi: "yö", fr: "nuit", gl: "noite",
        ka: ["ღამე", "ghame"], de: "Nacht", el: ["νύχτα", "nichta"], hu: "éjszaka",
        is: "nótt", ga: "oíche", it: "notte", lv: "nakts", lt: "naktis", lb: "Nuecht",
        mk: ["ноќ", "nokj"], mt: "lejl", no: "natt", pl: "noc", pt: "noite", ro: "noapte",
        ru: ["ночь", "noch"], sr: ["ноћ", "noć"], sk: "noc", sl: "noč", es: "noche",
        sv: "natt", tr: "gece", uk: ["ніч", "nich"], cy: "nos",
      },
    },
    mother: {
      ref: "en",
      words: {
        sq: "nënë", hy: ["մայր", "mayr"], az: "ana", eu: "ama", be: ["маці", "matsi"],
        bs: "majka", bg: ["майка", "maika"], ca: "mare", hr: "majka", cs: "matka",
        da: "mor", nl: "moeder", en: "mother", et: "ema", fo: "móðir", fi: "äiti",
        fr: "mère", gl: "nai", ka: ["დედა", "deda"], de: "Mutter", el: ["μητέρα", "mitera"],
        hu: "anya", is: "móðir", ga: "máthair", it: "madre", lv: "māte", lt: "motina",
        lb: "Mamm", mk: ["мајка", "majka"], mt: "omm", no: "mor", pl: "matka", pt: "mãe",
        ro: "mamă", ru: ["мать", "mat"], sr: ["мајка", "majka"], sk: "matka", sl: "mati",
        es: "madre", sv: "mor", tr: "anne", uk: ["мати", "mati"], cy: "mam",
      },
    },
  };

  const presets = root.EuropePresets || require("./presets.js");
  presets.addGroup("stories", STORIES);
})(typeof window !== "undefined" ? window : globalThis);
