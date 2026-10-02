// English. Every i18n-xx.js has the same keys (tests/similarity.test.js checks).
// {name} placeholders are filled in by the page. Story captions lead with the
// origin, then say where it went and how the word looks there.
(function (root) {
  "use strict";
  const I18N = root.EuropeI18n || require("./i18n.js");

  I18N.add("en", {
    ui: {
      title: "Europe Word Map",
      sub: "Type an English word. See it in every European language, with countries whose words sound alike lit up together.",
      placeholder: "e.g. word, water, school, milk",
      translate: "Translate",
      howItWorks: "How it works",
      demo: "Show me how",
      rowWords: "Words",
      rowStories: "Stories",
      rowFriends: "False friends PL / SK",
      similarity: "Similarity",
      groups: "Groups",
      bySound: "By sound",
      handPicked: "Hand-picked",
      handPickedTitle: "Groups by word origin, picked by hand (only for Christmas, Thursday and Saturday)",
      different: "different",
      same: "same",
      groupLegend: "one colour per group · paler = looser fit",
      settings: "Translation settings",
      translateWith: "Translate with",
      provMyMemory: "MyMemory (free, no key)",
      provClaude: "Claude (needs an Anthropic API key)",
      apiKey: "Anthropic API key",
      apiKeyNote: "Better single-word translations and proper romanisation, in one request. The key stays in this browser and is sent only to api.anthropic.com.",
      mmEmail: "Email for MyMemory (optional)",
      mmEmailNote: "Anonymous use allows roughly 20 words a day; an email raises it about tenfold. Results are cached, so repeating a word is free.",
      readIn: "Other languages",
      readInTip: "To read this in another language, use your browser's Translate (right-click → Translate).",
      close: "Close",
      mapLabel: "Map of Europe",
      start: "Type a word to begin. Click any country to compare against its language.",
      comparedWith: "Compared with {lang} “{word}”.",
      showAllGroups: "Show all groups",
      refSound: "Colours show groups of alike-sounding words, found automatically. Paler means a looser fit. Click a country to compare against it.",
      refSoundHasPicked: "Colours show groups of alike-sounding words, found automatically. This word also has hand-picked groups by origin: switch above.",
      refPicked: "Colours show groups by the origin of the word, picked by hand, not found by the algorithm. Paler means it sounds less like the rest of its group.",
      refNoPicked: "No hand-picked groups for this word (only Christmas, Thursday and Saturday have them), so colours show groups by sound.",
      nLanguages: "{n} languages",
      notInGroup: "Not in a group",
      likeWord: "like “{word}”",
      inLanguages: "“{word}” in {n} languages. Hover a country for details; click one to compare against it.",
      fromCache: "“{word}”, from cache.",
      asking: "Asking Claude…",
      translating: "Translating…",
      quota: "MyMemory's free daily quota is used up. Add an email in Translation settings, or switch to Claude.",
      unreachable: "Could not reach MyMemory.",
      needKey: "Add your Anthropic API key in Translation settings, or switch to MyMemory.",
      declined: "Claude declined to translate this word.",
      badJson: "Claude's answer was not valid JSON.",
      friendsRef: "False friends: these sound alike, but mean different things.",
      friendStatus: "False friend: Polish “{pl}” means {plm}; Slovak “{sk}” means {skm}.",
      friendInstead: "For “{m}”, {lang} says {w}.",
      compareWith: "Compare with {lang}",
      tipHint: "Click to compare",
      bands: ["pale", "orange", "dark orange", "red"],
      demoStart: "Here is how it works.",
      demoWord: "Pick a word, or type your own.",
      demoGroups: "Each colour is a group of words that sound alike.",
      demoCountry: "Click a country to compare every language with it.",
      demoScale: "Red is the same word, grey is unrelated.",
      demoPicked: "For a few words you can switch to groups hand-picked by origin.",
      demoHelp: "Curious how it works? Press ?.",
    },

    regions: { Catalonia: "Catalonia", "Basque Country": "Basque Country", Galicia: "Galicia", Wales: "Wales" },

    stories: {
      Thursday: {
        lead: "Whose day is Thursday? Europe can't agree.",
        points: [
          "The thunder god Thor: England, Germany, the Netherlands, Scandinavia and Finland (Thursday, Donnerstag, donderdag, torsdag, torstai).",
          "Jupiter, king of the Roman gods: France, Italy, Spain, Romania and Wales (jeudi, giovedì, jueves, joi, dydd Iau).",
          "No god at all, just “the fourth day”: the Slavs, Hungary, the Baltics and Estonia (czwartek, четверг, csütörtök, ketvirtadienis, neljapäev).",
          "“The fifth day”, counting from Sunday: Portugal, Greece, Turkey, Iceland and Georgia (quinta-feira, Πέμπτη, perşembe, fimmtudagur).",
        ],
      },
      Saturday: {
        lead: "Rest, a planet, or laundry?",
        points: [
          "The Hebrew Sabbath, the day of rest: most of Europe (sobota, суббота, sábado, sabato, samedi, Samstag, szombat).",
          "The Roman god Saturn: England, the Netherlands, Ireland and Wales (Saturday, zaterdag, Dé Sathairn, dydd Sadwrn).",
          "The Vikings' “washing day”: Scandinavia, Iceland and Finland (lördag, lørdag, laugardagur, lauantai).",
          "Simply “the sixth day”: Lithuania and Latvia (šeštadienis, sestdiena).",
        ],
      },
      Christmas: {
        lead: "One feast, eight stories.",
        points: [
          "“Birth”, from Latin natalis: France, Italy, Spain, Portugal, Wales and Ireland (Noël, Natale, Navidad, Natal, Nadolig, Nollaig).",
          "“Birth” again, from the Slavic root rod-: Poland, Russia and Ukraine (Boże Narodzenie, Рождество, Різдво).",
          "Božić, “the little god”: Croatia, Serbia, Bosnia, Slovenia and North Macedonia.",
          "Yule, the pagan midwinter feast: Scandinavia, Iceland, Finland and Estonia (jul, jól, joulu, jõulud).",
          "The Roman calendae, the first day of the month: Lithuania, Bulgaria and Belarus (Kalėdos, Коледа, Каляды).",
          "German Weihnachten, “the holy nights”: borrowed by Czechia and Slovakia (Vánoce, Vianoce).",
          "Christ by name: England, the Netherlands, Albania and Greece (Christmas, Kerstmis, Krishtlindje, Χριστούγεννα).",
          "Kračun, an old Slavic word for midwinter: Romania and Hungary (Crăciun, karácsony).",
        ],
      },
      king: {
        lead: "Charlemagne became a word.",
        points: [
          "Karl, that is Charlemagne himself: the Slavs (król, король, kralj), and from them Hungary, Lithuania, Latvia and Turkey (király, karalius, karalis, kral).",
          "Old Germanic kuningaz, “man of noble kin”: England, Germany and Scandinavia (king, König, kung), borrowed early by Finland and Estonia (kuningas).",
          "Latin rex: France, Italy, Spain, Portugal and Romania (roi, re, rey, rei, rege).",
        ],
      },
      bread: {
        lead: "The Slavs got their bread from the Goths.",
        points: [
          "Gothic hlaifs, the same word as English “loaf”: the Slavs (chleb, хлеб, chléb), and Finland and Estonia too (leipä, leib).",
          "Germanic brauþ: England, Germany, the Netherlands and Scandinavia (bread, Brot, brood, bröd).",
          "Latin panis: France, Italy, Spain, Portugal and Romania (pain, pane, pan, pão, pâine).",
          "Kruh, “a piece”: Croatia and Slovenia.",
        ],
      },
      church: {
        lead: "Follow the word to see who brought the faith.",
        points: [
          "Latin castellum, a fort: Poland, Czechia and Slovakia (kościół, kostel, kostol).",
          "Greek kyriakon, “the Lord's house”, via the Germans: Germany, England and Scandinavia (Kirche, church, kyrka), and the Eastern and Southern Slavs (церковь, crkva).",
          "Greek ekklesia, “the assembly”: France, Spain, Italy, Greece, Albania and Wales (église, iglesia, chiesa, εκκλησία, kishë, eglwys).",
          "Slavic božnica, “God's place”: Lithuania and Latvia (bažnyčia, baznīca).",
          "Latin basilica: Romania (biserică).",
        ],
      },
      orange: {
        lead: "Named after wherever it seemed to come from.",
        points: [
          "Portugal, whose traders brought the sweet orange: Greece, Turkey, the Balkans, Romania and Georgia (πορτοκάλι, portakal, portocală, ფორთოხალი).",
          "“The apple from China”: the Netherlands, Scandinavia, Russia, the Baltics and Finland (sinaasappel, apelsin, апельсин, appelsiini).",
          "Italian pomo d'arancia, “orange apple”: Poland, Czechia, Slovakia and Slovenia (pomarańcza, pomeranč, pomaranča).",
          "Persian nārang, via Arabic: Spain, Portugal, Italy, France and England (naranja, laranja, arancia, orange).",
        ],
      },
      tomato: {
        lead: "Golden apple or paradise apple?",
        points: [
          "Italian pomodoro, “golden apple”: Poland, Russia, Ukraine and Georgia (pomidor, помидор, помідор, პომიდორი).",
          "Austrian Paradeiser, “paradise apple”: Hungary, Serbia, Czechia, Slovakia, Slovenia and Croatia (paradicsom, парадајз, rajče, paradajka, paradižnik, rajčica).",
          "The Aztec tomatl: most of the rest (tomato, Tomate, tomate, domates).",
          "Just “the red one”: Romania (roșie).",
        ],
      },
      potato: {
        lead: "Europe never agreed what this thing was.",
        points: [
          "An apple of the earth: France and the Netherlands (pomme de terre, aardappel).",
          "A truffle, Italian tartufolo: Germany, Russia, Bulgaria, Romania and Latvia (Kartoffel, картофель, картоф, cartof, kartupelis).",
          "A ground pear, dialect German Grundbirne: Croatia, Serbia, Slovenia and Luxembourg (krumpir, кромпир, krompir, Gromper).",
          "An earth thing: Poland and Slovakia (ziemniak, zemiak).",
          "Brandenburg, where it came from: Czechia (brambor).",
          "The Caribbean batata: Spain, Italy, England, Sweden and Norway (patata, potato, potatis, potet).",
        ],
      },
      turkey: {
        lead: "Everyone blames someone else.",
        points: [
          "Turkey: England (turkey).",
          "India: Turkey, France, Poland, Russia and Ukraine (hindi, dinde, indyk, индейка, індик).",
          "Peru: Portugal (peru).",
          "Calicut, a port in India: the Netherlands, Scandinavia and Finland (kalkoen, kalkun, kalkkuna).",
          "Egypt: North Macedonia (мисирка).",
        ],
      },
      night: {
        lead: "One of the oldest words in Europe.",
        points: [
          "Indo-European nókʷts: almost everyone (night, Nacht, nuit, notte, noche, noc, ночь, νύχτα).",
          "Only the outsiders differ: Finnish yö, Estonian öö, Hungarian éjszaka, Basque gau, Turkish gece.",
        ],
      },
      mother: {
        lead: "The first word, almost the same everywhere.",
        points: [
          "Indo-European méh₂tēr: mother, Mutter, madre, matka, мать, mère, máthair.",
          "Outside that family: Finnish äiti, Estonian ema, Hungarian anya, Basque ama, Turkish anne.",
          "And in Georgian, mama means “father”. Mother is deda!",
        ],
      },
    },

    groups: {
      thor: "Thor's day", jupiter: "Jupiter's day", fourth: "the fourth day", fifth: "the fifth day",
      sabbath: "Sabbath", saturn: "Saturn's day", washing: "washing day", sixth: "the sixth day",
      natalis: "birth (Latin natalis)", rod: "birth (Slavic rod-)", bozic: "Božić, “little god”",
      yule: "Yule", calendae: "Roman calendae", weihnachten: "from Weihnachten",
      christ: "Christ's …", kracun: "kračun",
    },

    // What each false friend means, keyed by the Polish word: [Polish, Slovak, Czech].
    friends: {
      czerstwy: ["stale", "fresh", "fresh"],
      kompot: ["a drink made from boiled fruit", "fruit preserved in syrup, eaten with a spoon", "fruit preserved in syrup"],
      sklep: ["shop", "cellar", "cellar"],
      "obchód": ["a round, a patrol", "shop", "shop"],
      "zachód": ["west, sunset", "toilet", "toilet"],
      zapach: ["smell, scent", "stench", "stench"],
      laska: ["walking stick; slang: an attractive girl", "love", "love"],
      urok: ["charm", "interest on a loan", "interest on a loan"],
      jagody: ["blueberries", "strawberries", "strawberries"],
      dywan: ["carpet", "couch", "couch"],
      "zawód": ["profession; disappointment", "factory; race", "factory; race"],
      szykowny: ["chic, elegant", "skilful, handy", "skilful, handy"],
      frajer: ["a sucker, a mug", "a cool guy; boyfriend", "a cool guy"],
      trup: ["corpse", "torso", "torso"],
      "pozór": ["appearance (na pozór: seemingly)", "attention! watch out!", "attention! watch out!"],
    },

    help: `
    <h2 id="howto-title">How it works</h2>
    <p class="disclaimer"><b>Just for fun.</b> This is a hobby project, not linguistic
      research. It was built by Claude, an AI, guided step by step by a human, to find a
      simple clustering of Europe's languages that is pleasing to look at and good for
      conversation. The measures and groups below are rough rules of thumb, and the
      translations and word histories may contain mistakes.</p>
    <p>Every word is translated into 43 languages. The page then measures how alike the
      words <em>sound</em> and colours the map from that.</p>

    <h3>How alike two words sound</h3>
    <ol>
      <li><b>Romanise</b> Cyrillic, Greek, Georgian and Armenian into Latin letters
        (слово → slovo).</li>
      <li><b>Tidy up:</b> drop articles (<i>das Wort</i> → <i>Wort</i>) and accents.</li>
      <li><b>Spell by sound:</b> Polish <i>sz</i>, Czech <i>š</i> and German <i>sch</i> all
        become <i>sh</i>; <i>w</i> becomes <i>v</i>, <i>ph</i> becomes <i>f</i>, and so on.</li>
      <li><b>Compare in two ways and keep the higher score:</b>
        <ul>
          <li><b>Sound classes.</b> Sounds that swap as a word travels between languages
            form a class: t/d, k/g, p/b/f, s/z/sh, cz/ch/ts, and so on. Turning one word
            into the other costs little within a class, least for vowels (they drift most),
            and most for adding or dropping a consonant. The score is 1 minus that cost,
            divided by the cost of the whole longer word. This follows Dolgopolsky's method
            for spotting related words.</li>
          <li><b>Consonant skeleton.</b> The consonants in order survive when a language drops
            a syllable: <i>czwartek</i> is cz-w-r-t-k and <i>четвер</i> is č-t-v-r. This counts
            only when two words share at least <span data-value="skeletonMinShared"></span>
            consonants in order, and then for at most <span data-value="skeletonWeight"></span>.</li>
        </ul>
      </li>
    </ol>
    <p>For example: <span class="ex" data-a="Thursday" data-b="Donnerstag"></span>,
      <span class="ex" data-a="czwartek" data-b="четвер"></span>,
      <span class="ex" data-a="mot" data-b="parola"></span>,
      <span class="ex" data-a="dom" data-b="house"></span>.</p>

    <h3>Colours</h3>
    <ul>
      <li><b>Click a country</b> to compare every language with that one:
        <span data-value="bands"></span>, and grey below.</li>
      <li><b>No country selected:</b> the map shows <b>groups</b> of alike words, one colour
        each. A language is paler the less it sounds like the rest of its group (its average
        similarity to the others).</li>
    </ul>

    <h3>How the groups are found</h3>
    <p><b>Average-linkage clustering.</b> Every language starts as a group of its own. The
      two groups whose words are most alike <em>on average</em> are merged: every word in one
      is compared with every word in the other. This repeats until no two groups average
      <span data-value="clusterThreshold"></span> or more. A language left on its own stays
      grey.</p>
    <p>Why the average, and not just any close pair? Chains of near neighbours would join
      whole families that are not alike: the Slavic <i>czwartek</i> and the Germanic
      <i>torsdag</i> are linked through forms in between.</p>

    <h3>Hand-picked groups</h3>
    <p>For <b>Thursday</b>, <b>Saturday</b> and <b>Christmas</b>, history matters more than
      sound. The Latin <i>jeudi</i>, <i>giovedì</i> and <i>jueves</i> (all "Jupiter's day")
      have drifted too far apart for any sound measure to group them without also merging the
      Slavic and Germanic groups. So for these three words there are also groups picked by
      hand from the words' origins, named in the side panel: "Thor's day", "Jupiter's day",
      "the fourth day" and so on. They are hard-coded, not computed, so the map never shows
      them by itself: it always starts with groups by sound. The <b>Groups: By sound |
      Hand-picked</b> switch at the top of the side panel shows them. Once switched, it stays
      there for every word until switched back; words without hand-picked groups show
      sound.</p>

    <h3>Worked example: Christmas</h3>
    <p>Switch Christmas to its hand-picked groups, and Polish <i>Boże Narodzenie</i> and
      Russian <i>Рождество</i> share one colour. <b>The algorithm did not put them there.</b>
      By sound they score only <span class="ex" data-a="Boże Narodzenie" data-b="Rozhdestvo"></span>,
      far below the <span data-value="clusterThreshold"></span> the clustering needs.</p>
    <p>The hand-picked groups are <b>written by hand</b> in the page's data
      (<code>stories.js</code>): a list of which languages' words share an origin, taken from
      their known history. In that view the algorithm does only two things. It scores how
      alike each word sounds to the rest of its hand-made group, which sets how pale it is
      (Poland is the palest in its group). And it compares words when you click a
      country.</p>
    <p><b>By sound</b>, which is what the map shows first, the clustering groups Christmas
      differently, and by history wrongly:</p>
    <ul>
      <li>Polish <i>Boże Narodzenie</i> joins Croatian <i>Božić</i>. Both start with "God"
        (<i>Boże</i>, <i>Bog</i>), a real shared word but the wrong half of the Polish
        name.</li>
      <li>Russian <i>Рождество</i> and Ukrainian <i>Різдво</i>
        (<span class="ex" data-a="Rizdvo" data-b="Rozhdestvo"></span>) join English
        <i>Christmas</i> and Dutch <i>Kerstmis</i>, by a chance likeness of consonants.</li>
    </ul>
    <p>So Poland and Russia end up in different groups. Sound cannot know that Polish
      <i>na-<b>rodz</b>-enie</i> ("birth") and Russian <i><b>рожд</b>-ество</i> are the same
      Slavic root, <i>rod-</i>, "to give birth". The root is hidden by the prefix
      <i>na-</i>, the extra word <i>Boże</i> ("God's"), and a regular sound change: Polish
      has <i>dz</i> where Russian has <i>žd</i> (<i>rodzić</i> / <i>рождать</i>). That
      knowledge comes from historical linguistics, not from the map.</p>
    <p>Elsewhere the history and the sound agree: French <i>Noël</i>, Italian
      <i>Natale</i> and Welsh <i>Nadolig</i> (Latin <i>natalis</i>), or Lithuanian
      <i>Kalėdos</i> and Bulgarian <i>Коледа</i>
      (<span class="ex" data-a="Kalėdos" data-b="Koleda"></span>, Roman
      <i>calendae</i>).</p>
    <p>Compare the two for yourself:
      <button type="button" class="ghost" data-show="Christmas">Christmas, grouped by sound</button>
      <button type="button" class="ghost" data-show="Christmas" data-mode="origin">Christmas, hand-picked groups</button></p>

    <h3>Limits</h3>
    <p>Sounding alike is not the same as being related. <span class="ex" data-a="kissa" data-b="cat"></span>
      is chance, while related words that changed a lot can score low. The prepared words'
      translations and origins were written by Claude, so they may contain mistakes.</p>
    `,
  });
})(typeof window !== "undefined" ? window : globalThis);
