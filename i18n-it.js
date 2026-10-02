// Italian. Every i18n-xx.js has the same keys (tests/similarity.test.js checks).
// {name} placeholders are filled in by the page. Story captions lead with the
// origin, then say where it went and how the word looks there.
(function (root) {
  "use strict";
  const I18N = root.EuropeI18n || require("./i18n.js");

  I18N.add("it", {
    ui: {
      title: "La mappa delle parole d'Europa",
      sub: "Scrivi una parola italiana. La vedrai in tutte le lingue d'Europa, con i Paesi dove suona simile illuminati insieme.",
      placeholder: "es. parola, acqua, scuola, latte",
      translate: "Traduci",
      howItWorks: "Come funziona",
      demo: "Fammi vedere",
      rowWords: "Parole",
      rowStories: "Storie",
      rowFriends: "Falsi amici PL / SK",
      similarity: "Somiglianza",
      groups: "Gruppi",
      bySound: "Per suono",
      handPicked: "Scelti a mano",
      handPickedTitle: "Gruppi per origine della parola, scelti a mano (solo per Natale, giovedì e sabato)",
      different: "diverse",
      same: "uguali",
      groupLegend: "un colore per gruppo · più chiaro = legame più debole",
      settings: "Impostazioni di traduzione",
      translateWith: "Traduci con",
      provMyMemory: "MyMemory (gratis, senza chiave)",
      provClaude: "Claude (serve una chiave API di Anthropic)",
      apiKey: "Chiave API di Anthropic",
      apiKeyNote: "Traduzioni migliori delle singole parole e traslitterazioni corrette, in un'unica richiesta. La chiave resta in questo browser e viene inviata solo ad api.anthropic.com.",
      mmEmail: "Email per MyMemory (facoltativa)",
      mmEmailNote: "Senza email si possono tradurre circa 20 parole al giorno; con un'email circa dieci volte tante. I risultati restano in memoria, quindi ripetere una parola non costa nulla.",
      readIn: "Altre lingue",
      readInTip: "Per leggere questa pagina in un'altra lingua, usa la traduzione del browser (tasto destro → Traduci).",
      close: "Chiudi",
      mapLabel: "Mappa dell'Europa",
      start: "Scrivi una parola per iniziare. Clicca su un Paese per fare il confronto con la sua lingua.",
      comparedWith: "Confronto con «{word}» in {lang}.",
      showAllGroups: "Mostra tutti i gruppi",
      refSound: "I colori mostrano gruppi di parole dal suono simile, trovati in automatico. Più chiaro vuol dire legame più debole. Clicca su un Paese per fare il confronto.",
      refSoundHasPicked: "I colori mostrano gruppi di parole dal suono simile, trovati in automatico. Per questa parola ci sono anche gruppi per origine, scelti a mano: cambia vista qui sopra.",
      refPicked: "I colori mostrano gruppi per origine della parola, scelti a mano e non trovati dall'algoritmo. Più chiaro vuol dire che suona meno simile al resto del gruppo.",
      refNoPicked: "Per questa parola non ci sono gruppi scelti a mano (li hanno solo Natale, giovedì e sabato), quindi i colori mostrano i gruppi per suono.",
      nLanguages: "{n} lingue",
      notInGroup: "In nessun gruppo",
      likeWord: "come «{word}»",
      inLanguages: "«{word}» in {n} lingue. Passa sopra un Paese per i dettagli; cliccalo per fare il confronto.",
      fromCache: "«{word}», dalla memoria.",
      asking: "Lo chiedo a Claude…",
      translating: "Traduzione in corso…",
      quota: "La quota giornaliera gratuita di MyMemory è esaurita. Aggiungi un'email nelle Impostazioni di traduzione, oppure passa a Claude.",
      unreachable: "Impossibile raggiungere MyMemory.",
      needKey: "Aggiungi la tua chiave API di Anthropic nelle Impostazioni di traduzione, oppure passa a MyMemory.",
      declined: "Claude si è rifiutato di tradurre questa parola.",
      badJson: "La risposta di Claude non era un JSON valido.",
      friendsRef: "Falsi amici: suonano uguali, ma vogliono dire tutt'altro.",
      friendStatus: "Falso amico: in polacco «{pl}» significa {plm}; in slovacco «{sk}» significa {skm}.",
      friendInstead: "Per dire «{m}», in {lang} si usa {w}.",
      compareWith: "Confronta con: {lang}",
      tipHint: "Clicca per confrontare",
      bands: ["chiaro", "arancione", "arancione scuro", "rosso"],
      demoStart: "Ecco come funziona.",
      demoWord: "Scegli una parola, o scrivine una tu.",
      demoGroups: "Ogni colore è un gruppo di parole che suonano simili.",
      demoCountry: "Clicca su un Paese per confrontare tutte le lingue con la sua.",
      demoScale: "Rosso è la stessa parola, grigio una parola che non c'entra.",
      demoPicked: "Per alcune parole puoi passare ai gruppi per origine, scelti a mano.",
      demoHelp: "Curioso di sapere come funziona? Premi ?.",
    },

    regions: { Catalonia: "Catalogna", "Basque Country": "Paesi Baschi", Galicia: "Galizia", Wales: "Galles" },

    stories: {
      Thursday: {
        lead: "Di chi è il giovedì? L'Europa non si mette d'accordo.",
        points: [
          "Thor, il dio del tuono: Inghilterra, Germania, Paesi Bassi, Scandinavia e Finlandia (Thursday, Donnerstag, donderdag, torsdag, torstai).",
          "Giove, il re degli dèi romani: Francia, Italia, Spagna, Romania e Galles (jeudi, giovedì, jueves, joi, dydd Iau).",
          "Nessun dio, solo «il quarto giorno»: i popoli slavi, l'Ungheria, i Baltici e l'Estonia (czwartek, четверг, csütörtök, ketvirtadienis, neljapäev).",
          "«Il quinto giorno», contando dalla domenica: Portogallo, Grecia, Turchia, Islanda e Georgia (quinta-feira, Πέμπτη, perşembe, fimmtudagur).",
        ],
      },
      Saturday: {
        lead: "Riposo, un pianeta o il bucato?",
        points: [
          "Lo Shabbat ebraico, il giorno del riposo: quasi tutta l'Europa (sobota, суббота, sábado, sabato, samedi, Samstag, szombat).",
          "Saturno, il dio romano: Inghilterra, Paesi Bassi, Irlanda e Galles (Saturday, zaterdag, Dé Sathairn, dydd Sadwrn).",
          "Il «giorno del bucato» dei vichinghi: Scandinavia, Islanda e Finlandia (lördag, lørdag, laugardagur, lauantai).",
          "Semplicemente «il sesto giorno»: Lituania e Lettonia (šeštadienis, sestdiena).",
        ],
      },
      Christmas: {
        lead: "Una festa, otto storie.",
        points: [
          "La «nascita», dal latino natalis: Francia, Italia, Spagna, Portogallo, Galles e Irlanda (Noël, Natale, Navidad, Natal, Nadolig, Nollaig).",
          "Ancora la «nascita», ma dalla radice slava rod-: Polonia, Russia e Ucraina (Boże Narodzenie, Рождество, Різдво).",
          "Božić, «il piccolo dio»: Croazia, Serbia, Bosnia, Slovenia e Macedonia del Nord.",
          "Yule, l'antica festa pagana di mezzo inverno: Scandinavia, Islanda, Finlandia ed Estonia (jul, jól, joulu, jõulud).",
          "Le calende romane, il primo giorno del mese: Lituania, Bulgaria e Bielorussia (Kalėdos, Коледа, Каляды).",
          "Il tedesco Weihnachten, «le notti sante»: preso in prestito da Cechia e Slovacchia (Vánoce, Vianoce).",
          "Cristo in persona: Inghilterra, Paesi Bassi, Albania e Grecia (Christmas, Kerstmis, Krishtlindje, Χριστούγεννα).",
          "Kračun, un'antica parola slava per il cuore dell'inverno: Romania e Ungheria (Crăciun, karácsony).",
        ],
      },
      king: {
        lead: "Carlo Magno è diventato una parola.",
        points: [
          "Karl, cioè Carlo Magno in persona: i popoli slavi (król, король, kralj), e da loro Ungheria, Lituania, Lettonia e Turchia (király, karalius, karalis, kral).",
          "L'antico germanico kuningaz, «uomo di nobile stirpe»: Inghilterra, Germania e Scandinavia (king, König, kung), preso in prestito presto da Finlandia ed Estonia (kuningas).",
          "Il latino rex: Francia, Italia, Spagna, Portogallo e Romania (roi, re, rey, rei, rege).",
        ],
      },
      bread: {
        lead: "Gli slavi hanno avuto il pane dai Goti.",
        points: [
          "Il gotico hlaifs, la stessa parola dell'inglese «loaf», la pagnotta: i popoli slavi (chleb, хлеб, chléb), e anche Finlandia ed Estonia (leipä, leib).",
          "Il germanico brauþ: Inghilterra, Germania, Paesi Bassi e Scandinavia (bread, Brot, brood, bröd).",
          "Il latino panis: Francia, Italia, Spagna, Portogallo e Romania (pain, pane, pan, pão, pâine).",
          "Kruh, «un pezzo»: Croazia e Slovenia.",
        ],
      },
      church: {
        lead: "Segui la parola e scoprirai chi ha portato la fede.",
        points: [
          "Il latino castellum, una fortezza: Polonia, Cechia e Slovacchia (kościół, kostel, kostol).",
          "Il greco kyriakon, «la casa del Signore», passato per i tedeschi: Germania, Inghilterra e Scandinavia (Kirche, church, kyrka), e gli slavi orientali e meridionali (церковь, crkva).",
          "Il greco ekklesia, «l'assemblea»: Francia, Spagna, Italia, Grecia, Albania e Galles (église, iglesia, chiesa, εκκλησία, kishë, eglwys).",
          "Lo slavo božnica, «il luogo di Dio»: Lituania e Lettonia (bažnyčia, baznīca).",
          "Il latino basilica: Romania (biserică).",
        ],
      },
      orange: {
        lead: "Prende il nome dal posto da cui sembrava arrivare.",
        points: [
          "Il Portogallo, i cui mercanti portarono l'arancia dolce: Grecia, Turchia, Balcani, Romania e Georgia (πορτοκάλι, portakal, portocală, ფორთოხალი).",
          "«La mela della Cina»: Paesi Bassi, Scandinavia, Russia, Baltici e Finlandia (sinaasappel, apelsin, апельсин, appelsiini).",
          "L'italiano pomo d'arancia: Polonia, Cechia, Slovacchia e Slovenia (pomarańcza, pomeranč, pomaranča).",
          "Il persiano nārang, passato per l'arabo: Spagna, Portogallo, Italia, Francia e Inghilterra (naranja, laranja, arancia, orange).",
        ],
      },
      tomato: {
        lead: "Pomo d'oro o pomo del paradiso?",
        points: [
          "L'italiano pomodoro, il «pomo d'oro»: Polonia, Russia, Ucraina e Georgia (pomidor, помидор, помідор, პომიდორი).",
          "L'austriaco Paradeiser, il «pomo del paradiso»: Ungheria, Serbia, Cechia, Slovacchia, Slovenia e Croazia (paradicsom, парадајз, rajče, paradajka, paradižnik, rajčica).",
          "Il tomatl degli Aztechi: quasi tutti gli altri (tomato, Tomate, tomate, domates).",
          "Semplicemente «il rosso»: Romania (roșie).",
        ],
      },
      potato: {
        lead: "L'Europa non ha mai deciso che cosa fosse.",
        points: [
          "Una mela di terra: Francia e Paesi Bassi (pomme de terre, aardappel).",
          "Un tartufo, l'italiano tartufolo: Germania, Russia, Bulgaria, Romania e Lettonia (Kartoffel, картофель, картоф, cartof, kartupelis).",
          "Una pera di terra, il tedesco dialettale Grundbirne: Croazia, Serbia, Slovenia e Lussemburgo (krumpir, кромпир, krompir, Gromper).",
          "Una cosa della terra: Polonia e Slovacchia (ziemniak, zemiak).",
          "Il Brandeburgo, da dove arrivava: Cechia (brambor).",
          "La batata dei Caraibi: Spagna, Italia, Inghilterra, Svezia e Norvegia (patata, potato, potatis, potet).",
        ],
      },
      turkey: {
        lead: "Ognuno dà la colpa a qualcun altro.",
        points: [
          "La Turchia: Inghilterra (turkey).",
          "L'India: Turchia, Francia, Polonia, Russia e Ucraina (hindi, dinde, indyk, индейка, індик).",
          "Il Perù: Portogallo (peru).",
          "Calicut, un porto dell'India: Paesi Bassi, Scandinavia e Finlandia (kalkoen, kalkun, kalkkuna).",
          "L'Egitto: Macedonia del Nord (мисирка).",
        ],
      },
      night: {
        lead: "Una delle parole più antiche d'Europa.",
        points: [
          "L'indoeuropeo nókʷts: quasi tutti (night, Nacht, nuit, notte, noche, noc, ночь, νύχτα).",
          "Fanno eccezione solo gli outsider: il finlandese yö, l'estone öö, l'ungherese éjszaka, il basco gau, il turco gece.",
        ],
      },
      mother: {
        lead: "La prima parola, quasi uguale ovunque.",
        points: [
          "L'indoeuropeo méh₂tēr: mother, Mutter, madre, matka, мать, mère, máthair.",
          "Fuori da questa famiglia: il finlandese äiti, l'estone ema, l'ungherese anya, il basco ama, il turco anne.",
          "E in georgiano mama vuol dire «papà». La mamma è deda!",
        ],
      },
    },

    groups: {
      thor: "giorno di Thor", jupiter: "giorno di Giove", fourth: "il quarto giorno", fifth: "il quinto giorno",
      sabbath: "Shabbat", saturn: "giorno di Saturno", washing: "giorno del bucato", sixth: "il sesto giorno",
      natalis: "nascita (latino natalis)", rod: "nascita (slavo rod-)", bozic: "Božić, «piccolo dio»",
      yule: "Yule", calendae: "calende romane", weihnachten: "da Weihnachten",
      christ: "Cristo …", kracun: "kračun",
    },

    // What each false friend means, keyed by the Polish word: [Polish, Slovak, Czech].
    friends: {
      czerstwy: ["raffermo", "fresco", "fresco"],
      kompot: ["una bevanda di frutta bollita", "frutta sciroppata, da mangiare col cucchiaio", "frutta sciroppata"],
      sklep: ["negozio", "cantina", "cantina"],
      "obchód": ["un giro, una ronda", "negozio", "negozio"],
      "zachód": ["ovest, tramonto", "gabinetto", "gabinetto"],
      zapach: ["odore, profumo", "puzza", "puzza"],
      laska: ["bastone da passeggio; in gergo: una bella ragazza", "amore", "amore"],
      urok: ["fascino", "interesse su un prestito", "interesse su un prestito"],
      jagody: ["mirtilli", "fragole", "fragole"],
      dywan: ["tappeto", "divano", "divano"],
      "zawód": ["professione; delusione", "fabbrica; gara", "fabbrica; gara"],
      szykowny: ["chic, elegante", "abile, bravo con le mani", "abile, bravo con le mani"],
      frajer: ["un pollo, un ingenuo", "un tipo in gamba; fidanzato", "un tipo in gamba"],
      trup: ["cadavere", "busto", "busto"],
      "pozór": ["apparenza (na pozór: all'apparenza)", "attenzione! occhio!", "attenzione! occhio!"],
    },

    help: `
    <h2 id="howto-title">Come funziona</h2>
    <p class="disclaimer"><b>Solo per divertimento.</b> È un progetto amatoriale, non una
      ricerca linguistica. L'ha costruito Claude, un'intelligenza artificiale, guidato passo
      passo da una persona, per trovare un modo semplice di raggruppare le lingue d'Europa
      che sia bello da vedere e dia spunti per chiacchierare. Le misure e i gruppi qui sotto
      sono regole a occhio, e le traduzioni e le storie delle parole possono contenere
      errori.</p>
    <p>Ogni parola viene tradotta in 43 lingue. La pagina misura poi quanto le parole si
      somigliano <em>nel suono</em> e colora la mappa di conseguenza.</p>

    <h3>Quanto suonano simili due parole</h3>
    <ol>
      <li><b>Traslitterare</b> il cirillico, il greco, il georgiano e l'armeno in lettere
        latine (слово → slovo).</li>
      <li><b>Fare pulizia:</b> togliere gli articoli (<i>das Wort</i> → <i>Wort</i>) e gli
        accenti.</li>
      <li><b>Scrivere come si pronuncia:</b> il polacco <i>sz</i>, il ceco <i>š</i> e il
        tedesco <i>sch</i> diventano tutti <i>sh</i>; <i>w</i> diventa <i>v</i>, <i>ph</i>
        diventa <i>f</i>, e così via.</li>
      <li><b>Confrontare in due modi e tenere il punteggio più alto:</b>
        <ul>
          <li><b>Classi di suoni.</b> I suoni che si scambiano mentre una parola passa da una
            lingua all'altra formano una classe: t/d, k/g, p/b/f, s/z/sh, cz/ch/ts e così
            via. Trasformare una parola nell'altra costa poco dentro una classe, pochissimo
            per le vocali (sono quelle che cambiano di più), e il massimo per aggiungere o
            togliere una consonante. Il punteggio è 1 meno questo costo, diviso per il costo
            dell'intera parola più lunga. È il metodo di Dolgopolsky per riconoscere le
            parole imparentate.</li>
          <li><b>Scheletro di consonanti.</b> Le consonanti, nel loro ordine, sopravvivono
            anche quando una lingua perde una sillaba: <i>czwartek</i> è cz-w-r-t-k e
            <i>четвер</i> è č-t-v-r. Questo conta solo se due parole hanno in comune almeno
            <span data-value="skeletonMinShared"></span> consonanti nello stesso ordine, e
            al massimo per <span data-value="skeletonWeight"></span>.</li>
        </ul>
      </li>
    </ol>
    <p>Per esempio: <span class="ex" data-a="Thursday" data-b="Donnerstag"></span>,
      <span class="ex" data-a="czwartek" data-b="четвер"></span>,
      <span class="ex" data-a="mot" data-b="parola"></span>,
      <span class="ex" data-a="dom" data-b="house"></span>.</p>

    <h3>I colori</h3>
    <ul>
      <li><b>Clicca su un Paese</b> per confrontare tutte le lingue con la sua:
        <span data-value="bands"></span>, e sotto grigio.</li>
      <li><b>Nessun Paese selezionato:</b> la mappa mostra i <b>gruppi</b> di parole simili,
        un colore per gruppo. Una lingua è tanto più chiara quanto meno somiglia al resto del
        suo gruppo (la sua somiglianza media con le altre).</li>
    </ul>

    <h3>Come si trovano i gruppi</h3>
    <p><b>Clustering a legame medio.</b> All'inizio ogni lingua è un gruppo a sé. Si
      uniscono i due gruppi le cui parole si somigliano di più <em>in media</em>: ogni parola
      dell'uno viene confrontata con ogni parola dell'altro. Si ripete finché nessuna coppia
      di gruppi raggiunge in media <span data-value="clusterThreshold"></span>. Una lingua
      rimasta da sola resta grigia.</p>
    <p>Perché la media, e non una coppia vicina qualsiasi? Perché catene di vicini finirebbero
      per unire intere famiglie che non si somigliano: lo slavo <i>czwartek</i> e il
      germanico <i>torsdag</i> sono collegati da forme intermedie.</p>

    <h3>Gruppi scelti a mano</h3>
    <p>Per <b>giovedì</b>, <b>sabato</b> e <b>Natale</b> la storia conta più del suono. Le
      forme latine <i>jeudi</i>, <i>giovedì</i> e <i>jueves</i> (tutte «giorno di Giove») si
      sono allontanate troppo perché una misura del suono le raggruppi senza unire anche i
      gruppi slavo e germanico. Così per queste tre parole ci sono anche gruppi scelti a mano
      in base all'origine delle parole, con i nomi nel pannello laterale: «giorno di Thor»,
      «giorno di Giove», «il quarto giorno» e così via. Sono scritti nel codice, non
      calcolati, quindi la mappa non li mostra mai da sola: parte sempre dai gruppi per
      suono. Li mostra l'interruttore <b>Gruppi: Per suono | Scelti a mano</b> in cima al
      pannello laterale. Una volta cambiato, resta così per tutte le parole finché non lo
      rimetti; le parole senza gruppi scelti a mano mostrano quelli per suono.</p>

    <h3>Un esempio: Natale</h3>
    <p>Passa Natale ai gruppi scelti a mano, e il polacco <i>Boże Narodzenie</i> e il russo
      <i>Рождество</i> hanno lo stesso colore. <b>Non è stato l'algoritmo a metterli
      insieme.</b> Per suono hanno solo <span class="ex" data-a="Boże Narodzenie" data-b="Rozhdestvo"></span>,
      molto meno del <span data-value="clusterThreshold"></span> che serve al clustering.</p>
    <p>I gruppi scelti a mano sono <b>scritti a mano</b> nei dati della pagina
      (<code>stories.js</code>): un elenco delle lingue le cui parole hanno un'origine
      comune, preso dalla loro storia nota. In questa vista l'algoritmo fa solo due cose.
      Misura quanto ogni parola suona simile al resto del suo gruppo fatto a mano, e da qui
      decide quanto è chiara (la Polonia è la più chiara del suo gruppo). E confronta le
      parole quando clicchi su un Paese.</p>
    <p><b>Per suono</b>, cioè la vista che la mappa mostra per prima, il clustering
      raggruppa Natale in un altro modo, e per la storia in modo sbagliato:</p>
    <ul>
      <li>Il polacco <i>Boże Narodzenie</i> finisce con il croato <i>Božić</i>. Tutti e due
        cominciano con «Dio» (<i>Boże</i>, <i>Bog</i>): una parola davvero in comune, ma la
        metà sbagliata del nome polacco.</li>
      <li>Il russo <i>Рождество</i> e l'ucraino <i>Різдво</i>
        (<span class="ex" data-a="Rizdvo" data-b="Rozhdestvo"></span>) finiscono con
        l'inglese <i>Christmas</i> e l'olandese <i>Kerstmis</i>, per una somiglianza casuale
        delle consonanti.</li>
    </ul>
    <p>Così Polonia e Russia finiscono in gruppi diversi. Il suono non può sapere che il
      polacco <i>na-<b>rodz</b>-enie</i> («nascita») e il russo <i><b>рожд</b>-ество</i>
      hanno la stessa radice slava, <i>rod-</i>, «partorire». La radice è nascosta dal
      prefisso <i>na-</i>, dalla parola in più <i>Boże</i> («di Dio») e da un mutamento
      fonetico regolare: dove il polacco ha <i>dz</i>, il russo ha <i>žd</i>
      (<i>rodzić</i> / <i>рождать</i>). Questo lo sa la linguistica storica, non la
      mappa.</p>
    <p>Altrove storia e suono vanno d'accordo: il francese <i>Noël</i>, l'italiano
      <i>Natale</i> e il gallese <i>Nadolig</i> (dal latino <i>natalis</i>), oppure il
      lituano <i>Kalėdos</i> e il bulgaro <i>Коледа</i>
      (<span class="ex" data-a="Kalėdos" data-b="Koleda"></span>, dalle
      <i>calendae</i> romane).</p>
    <p>Confronta tu stesso le due viste:
      <button type="button" class="ghost" data-show="Christmas">Natale, gruppi per suono</button>
      <button type="button" class="ghost" data-show="Christmas" data-mode="origin">Natale, gruppi scelti a mano</button></p>

    <h3>Limiti</h3>
    <p>Suonare simili non vuol dire essere parenti. <span class="ex" data-a="kissa" data-b="cat"></span>
      è un caso, mentre parole imparentate che sono cambiate molto possono avere un
      punteggio basso. Le traduzioni e le origini delle parole preparate sono state scritte
      da Claude, quindi possono contenere errori.</p>
    `,
  });
})(typeof window !== "undefined" ? window : globalThis);
