// Polish. Every i18n-xx.js has the same keys (tests/similarity.test.js checks).
// {name} placeholders are filled in by the page. Story captions lead with the
// origin, then say where it went and how the word looks there.
(function (root) {
  "use strict";
  const I18N = root.EuropeI18n || require("./i18n.js");

  I18N.add("pl", {
    ui: {
      title: "Mapa słów Europy",
      sub: "Wpisz polskie słowo. Zobacz je we wszystkich językach Europy, a kraje, w których brzmi podobnie, rozświetlą się razem.",
      placeholder: "np. słowo, woda, szkoła, mleko",
      translate: "Przetłumacz",
      howItWorks: "Jak to działa",
      demo: "Pokaż mi",
      rowWords: "Słowa",
      rowStories: "Historie",
      rowFriends: "Fałszywi przyjaciele PL / SK",
      similarity: "Podobieństwo",
      groups: "Grupy",
      bySound: "Wg brzmienia",
      handPicked: "Ręcznie dobrane",
      handPickedTitle: "Grupy według pochodzenia słowa, ułożone ręcznie (tylko dla Bożego Narodzenia, czwartku i soboty)",
      different: "inne",
      same: "takie samo",
      groupLegend: "jeden kolor na grupę · bledszy = luźniej pasuje",
      settings: "Ustawienia tłumaczenia",
      translateWith: "Tłumacz przez",
      provMyMemory: "MyMemory (za darmo, bez klucza)",
      provClaude: "Claude (wymaga klucza API Anthropic)",
      apiKey: "Klucz API Anthropic",
      apiKeyNote: "Lepsze tłumaczenia pojedynczych słów i poprawna transliteracja, w jednym zapytaniu. Klucz zostaje w tej przeglądarce i trafia wyłącznie do api.anthropic.com.",
      mmEmail: "E-mail dla MyMemory (opcjonalnie)",
      mmEmailNote: "Anonimowo można przetłumaczyć około 20 słów dziennie; podanie e-maila zwiększa limit mniej więcej dziesięciokrotnie. Wyniki są zapamiętywane, więc powtórzenie słowa nic nie kosztuje.",
      readIn: "Inne języki",
      readInTip: "Aby przeczytać tę stronę w innym języku, użyj funkcji tłumaczenia w przeglądarce (prawy przycisk myszy → Przetłumacz).",
      close: "Zamknij",
      mapLabel: "Mapa Europy",
      start: "Wpisz słowo, aby zacząć. Kliknij dowolny kraj, by porównać z jego językiem.",
      comparedWith: "Porównanie z: {lang} „{word}”.",
      showAllGroups: "Pokaż wszystkie grupy",
      refSound: "Kolory pokazują grupy podobnie brzmiących słów, znalezione automatycznie. Bledszy kolor to luźniejsze dopasowanie. Kliknij kraj, by porównać z nim.",
      refSoundHasPicked: "Kolory pokazują grupy podobnie brzmiących słów, znalezione automatycznie. To słowo ma też ręcznie ułożone grupy według pochodzenia: przełącz powyżej.",
      refPicked: "Kolory pokazują grupy według pochodzenia słowa, ułożone ręcznie, a nie znalezione przez algorytm. Bledszy kolor znaczy, że słowo brzmi mniej podobnie do reszty grupy.",
      refNoPicked: "To słowo nie ma ręcznie ułożonych grup (mają je tylko Boże Narodzenie, czwartek i sobota), więc kolory pokazują grupy według brzmienia.",
      nLanguages: "Języki: {n}",
      notInGroup: "Poza grupami",
      likeWord: "jak „{word}”",
      inLanguages: "„{word}” w {n} językach. Najedź na kraj, by zobaczyć szczegóły; kliknij, by porównać z nim.",
      fromCache: "„{word}”, z pamięci podręcznej.",
      asking: "Pytam Claude’a…",
      translating: "Tłumaczę…",
      quota: "Darmowy dzienny limit MyMemory się wyczerpał. Podaj e-mail w ustawieniach tłumaczenia albo przełącz się na Claude’a.",
      unreachable: "Nie udało się połączyć z MyMemory.",
      needKey: "Dodaj klucz API Anthropic w ustawieniach tłumaczenia albo przełącz się na MyMemory.",
      declined: "Claude odmówił przetłumaczenia tego słowa.",
      badJson: "Odpowiedź Claude’a nie była poprawnym JSON-em.",
      friendsRef: "Fałszywi przyjaciele: brzmią podobnie, ale znaczą coś zupełnie innego.",
      friendStatus: "Fałszywy przyjaciel: polskie „{pl}” to {plm}, a słowackie „{sk}” to {skm}.",
      friendInstead: "{lang}: „{m}” to {w}.",
      compareWith: "Porównaj z: {lang}",
      tipHint: "Kliknij, by porównać",
      bands: ["blady", "pomarańczowy", "ciemnopomarańczowy", "czerwony"],
      demoStart: "Oto jak to działa.",
      demoWord: "Wybierz słowo albo wpisz własne.",
      demoGroups: "Każdy kolor to grupa słów, które brzmią podobnie.",
      demoCountry: "Kliknij kraj, by porównać z nim wszystkie języki.",
      demoScale: "Czerwony to to samo słowo, szary to brak związku.",
      demoPicked: "Dla kilku słów możesz przełączyć się na grupy ułożone ręcznie według pochodzenia.",
      demoHelp: "Ciekawi cię, jak to działa? Naciśnij ?.",
    },

    regions: { Catalonia: "Katalonia", "Basque Country": "Kraj Basków", Galicia: "Galicja", Wales: "Walia" },

    stories: {
      Thursday: {
        lead: "Czyj jest czwartek? Europa nie może się zgodzić.",
        points: [
          "Thor, bóg gromu: Anglia, Niemcy, Holandia, Skandynawia i Finlandia (Thursday, Donnerstag, donderdag, torsdag, torstai).",
          "Jowisz, król rzymskich bogów: Francja, Włochy, Hiszpania, Rumunia i Walia (jeudi, giovedì, jueves, joi, dydd Iau).",
          "Żaden bóg, po prostu „czwarty dzień”: Słowianie, Węgry, kraje bałtyckie i Estonia (czwartek, четверг, csütörtök, ketvirtadienis, neljapäev).",
          "„Piąty dzień”, licząc od niedzieli: Portugalia, Grecja, Turcja, Islandia i Gruzja (quinta-feira, Πέμπτη, perşembe, fimmtudagur).",
        ],
      },
      Saturday: {
        lead: "Odpoczynek, planeta czy pranie?",
        points: [
          "Hebrajski szabat, dzień odpoczynku: większość Europy (sobota, суббота, sábado, sabato, samedi, Samstag, szombat).",
          "Rzymski bóg Saturn: Anglia, Holandia, Irlandia i Walia (Saturday, zaterdag, Dé Sathairn, dydd Sadwrn).",
          "„Dzień prania” wikingów: Skandynawia, Islandia i Finlandia (lördag, lørdag, laugardagur, lauantai).",
          "Po prostu „szósty dzień”: Litwa i Łotwa (šeštadienis, sestdiena).",
        ],
      },
      Christmas: {
        lead: "Jedno święto, osiem historii.",
        points: [
          "„Narodziny”, z łacińskiego natalis: Francja, Włochy, Hiszpania, Portugalia, Walia i Irlandia (Noël, Natale, Navidad, Natal, Nadolig, Nollaig).",
          "Znów „narodziny”, ze słowiańskiego rdzenia rod-: Polska, Rosja i Ukraina (Boże Narodzenie, Рождество, Різдво).",
          "Božić, „mały bóg”: Chorwacja, Serbia, Bośnia, Słowenia i Macedonia Północna.",
          "Yule, pogańskie święto przesilenia zimowego: Skandynawia, Islandia, Finlandia i Estonia (jul, jól, joulu, jõulud).",
          "Rzymskie kalendy, pierwszy dzień miesiąca: Litwa, Bułgaria i Białoruś (Kalėdos, Коледа, Каляды).",
          "Niemieckie Weihnachten, „święte noce”: zapożyczone przez Czechy i Słowację (Vánoce, Vianoce).",
          "Chrystus z imienia: Anglia, Holandia, Albania i Grecja (Christmas, Kerstmis, Krishtlindje, Χριστούγεννα).",
          "Kračun, dawne słowiańskie słowo na środek zimy: Rumunia i Węgry (Crăciun, karácsony).",
        ],
      },
      king: {
        lead: "Karol Wielki stał się słowem.",
        points: [
          "Karl, czyli sam Karol Wielki: Słowianie (król, король, kralj), a od nich Węgry, Litwa, Łotwa i Turcja (király, karalius, karalis, kral).",
          "Staro-germańskie kuningaz, „człowiek szlachetnego rodu”: Anglia, Niemcy i Skandynawia (king, König, kung), wcześnie zapożyczone przez Finlandię i Estonię (kuningas).",
          "Łacińskie rex: Francja, Włochy, Hiszpania, Portugalia i Rumunia (roi, re, rey, rei, rege).",
        ],
      },
      bread: {
        lead: "Słowianie dostali chleb od Gotów.",
        points: [
          "Gockie hlaifs, to samo słowo co angielskie „loaf” (bochenek): Słowianie (chleb, хлеб, chléb), a także Finlandia i Estonia (leipä, leib).",
          "Germańskie brauþ: Anglia, Niemcy, Holandia i Skandynawia (bread, Brot, brood, bröd).",
          "Łacińskie panis: Francja, Włochy, Hiszpania, Portugalia i Rumunia (pain, pane, pan, pão, pâine).",
          "Kruh, „kawałek”: Chorwacja i Słowenia.",
        ],
      },
      church: {
        lead: "Idź za słowem, a zobaczysz, kto przyniósł wiarę.",
        points: [
          "Łacińskie castellum, warownia: Polska, Czechy i Słowacja (kościół, kostel, kostol).",
          "Greckie kyriakon, „dom Pański”, za pośrednictwem Niemców: Niemcy, Anglia i Skandynawia (Kirche, church, kyrka), a także Słowianie wschodni i południowi (церковь, crkva).",
          "Greckie ekklesia, „zgromadzenie”: Francja, Hiszpania, Włochy, Grecja, Albania i Walia (église, iglesia, chiesa, εκκλησία, kishë, eglwys).",
          "Słowiańska božnica, „boże miejsce”: Litwa i Łotwa (bažnyčia, baznīca).",
          "Łacińska basilica: Rumunia (biserică).",
        ],
      },
      orange: {
        lead: "Nazwana od miejsca, z którego zdawała się pochodzić.",
        points: [
          "Portugalia, której kupcy przywieźli słodką pomarańczę: Grecja, Turcja, Bałkany, Rumunia i Gruzja (πορτοκάλι, portakal, portocală, ფორთოხალი).",
          "„Jabłko z Chin”: Holandia, Skandynawia, Rosja, kraje bałtyckie i Finlandia (sinaasappel, apelsin, апельсин, appelsiini).",
          "Włoskie pomo d'arancia, „pomarańczowe jabłko”: Polska, Czechy, Słowacja i Słowenia (pomarańcza, pomeranč, pomaranča).",
          "Perskie nārang, przez arabski: Hiszpania, Portugalia, Włochy, Francja i Anglia (naranja, laranja, arancia, orange).",
        ],
      },
      tomato: {
        lead: "Złote jabłko czy rajskie jabłko?",
        points: [
          "Włoskie pomodoro, „złote jabłko”: Polska, Rosja, Ukraina i Gruzja (pomidor, помидор, помідор, პომიდორი).",
          "Austriackie Paradeiser, „rajskie jabłko”: Węgry, Serbia, Czechy, Słowacja, Słowenia i Chorwacja (paradicsom, парадајз, rajče, paradajka, paradižnik, rajčica).",
          "Azteckie tomatl: niemal cała reszta (tomato, Tomate, tomate, domates).",
          "Po prostu „czerwony”: Rumunia (roșie).",
        ],
      },
      potato: {
        lead: "Europa nigdy nie ustaliła, czym właściwie jest ta bulwa.",
        points: [
          "Jabłko ziemi: Francja i Holandia (pomme de terre, aardappel).",
          "Trufla, po włosku tartufolo: Niemcy, Rosja, Bułgaria, Rumunia i Łotwa (Kartoffel, картофель, картоф, cartof, kartupelis).",
          "Gruszka ziemna, z gwarowego niemieckiego Grundbirne: Chorwacja, Serbia, Słowenia i Luksemburg (krumpir, кромпир, krompir, Gromper).",
          "Coś z ziemi: Polska i Słowacja (ziemniak, zemiak).",
          "Brandenburgia, skąd przybył: Czechy (brambor).",
          "Karaibska batata: Hiszpania, Włochy, Anglia, Szwecja i Norwegia (patata, potato, potatis, potet).",
        ],
      },
      turkey: {
        lead: "Każdy zwala na kogoś innego.",
        points: [
          "Turcja: Anglia (turkey).",
          "Indie: Turcja, Francja, Polska, Rosja i Ukraina (hindi, dinde, indyk, индейка, індик).",
          "Peru: Portugalia (peru).",
          "Kalikat, port w Indiach: Holandia, Skandynawia i Finlandia (kalkoen, kalkun, kalkkuna).",
          "Egipt: Macedonia Północna (мисирка).",
        ],
      },
      night: {
        lead: "Jedno z najstarszych słów Europy.",
        points: [
          "Praindoeuropejskie nókʷts: prawie wszyscy (night, Nacht, nuit, notte, noche, noc, ночь, νύχτα).",
          "Wyłamują się tylko outsiderzy: fińskie yö, estońskie öö, węgierskie éjszaka, baskijskie gau, tureckie gece.",
        ],
      },
      mother: {
        lead: "Pierwsze słowo, prawie wszędzie takie samo.",
        points: [
          "Praindoeuropejskie méh₂tēr: mother, Mutter, madre, matka, мать, mère, máthair.",
          "Poza tą rodziną: fińskie äiti, estońskie ema, węgierskie anya, baskijskie ama, tureckie anne.",
          "A po gruzińsku mama znaczy „ojciec”. Matka to deda!",
        ],
      },
    },

    groups: {
      thor: "dzień Thora", jupiter: "dzień Jowisza", fourth: "czwarty dzień", fifth: "piąty dzień",
      sabbath: "szabat", saturn: "dzień Saturna", washing: "dzień prania", sixth: "szósty dzień",
      natalis: "narodziny (łac. natalis)", rod: "narodziny (słow. rod-)", bozic: "Božić, „mały bóg”",
      yule: "Yule", calendae: "rzymskie kalendy", weihnachten: "od Weihnachten",
      christ: "Chrystus…", kracun: "kračun",
    },

    // What each false friend means, keyed by the Polish word: [Polish, Slovak, Czech].
    friends: {
      czerstwy: ["nieświeży, wysuszony (o chlebie)", "świeży", "świeży"],
      kompot: ["napój z gotowanych owoców", "owoce zaprawione w syropie, jedzone łyżką", "owoce zaprawione w syropie"],
      sklep: ["miejsce, gdzie robi się zakupy", "piwnica", "piwnica"],
      "obchód": ["patrol, runda kontrolna", "sklep", "sklep"],
      "zachód": ["strona świata albo zachód słońca", "toaleta", "toaleta"],
      zapach: ["woń, aromat", "smród", "smród"],
      laska: ["kij do podpierania się; potocznie: atrakcyjna dziewczyna", "miłość", "miłość"],
      urok: ["wdzięk, czar", "odsetki od kredytu", "odsetki od kredytu"],
      jagody: ["borówki czarne", "truskawki", "truskawki"],
      dywan: ["tkanina na podłogę", "kanapa", "kanapa"],
      "zawód": ["profesja; rozczarowanie", "fabryka; wyścig", "fabryka; wyścig"],
      szykowny: ["elegancki, z klasą", "zręczny, zdolny", "zręczny, zdolny"],
      frajer: ["naiwniak, łatwy do oszukania", "fajny gość; chłopak (sympatia)", "fajny gość"],
      trup: ["zwłoki", "tułów", "tułów"],
      "pozór": ["wygląd zewnętrzny (na pozór: z pozoru)", "uwaga! ostrożnie!", "uwaga! ostrożnie!"],
    },

    help: `
    <h2 id="howto-title">Jak to działa</h2>
    <p class="disclaimer"><b>Tylko dla zabawy.</b> To hobbystyczny projekt, a nie badania
      językoznawcze. Zbudował go Claude, sztuczna inteligencja, krok po kroku prowadzony przez
      człowieka, żeby znaleźć prosty podział języków Europy na grupy, który przyjemnie się
      ogląda i o którym dobrze się rozmawia. Opisane niżej miary i grupy to zgrubne reguły,
      a tłumaczenia i historie słów mogą zawierać błędy.</p>
    <p>Każde słowo jest tłumaczone na 43 języki. Strona mierzy, jak podobnie te słowa
      <em>brzmią</em>, i na tej podstawie koloruje mapę.</p>

    <h3>Jak podobnie brzmią dwa słowa</h3>
    <ol>
      <li><b>Zamiana na alfabet łaciński:</b> cyrylica, greka, pismo gruzińskie i ormiańskie
        (слово → slovo).</li>
      <li><b>Porządki:</b> usuwamy rodzajniki (<i>das Wort</i> → <i>Wort</i>) i znaki
        diakrytyczne.</li>
      <li><b>Zapis według wymowy:</b> polskie <i>sz</i>, czeskie <i>š</i> i niemieckie
        <i>sch</i> stają się <i>sh</i>; <i>w</i> staje się <i>v</i>, <i>ph</i> staje się
        <i>f</i> i tak dalej.</li>
      <li><b>Porównanie na dwa sposoby, liczy się wyższy wynik:</b>
        <ul>
          <li><b>Klasy dźwięków.</b> Dźwięki, które wymieniają się, gdy słowo wędruje między
            językami, tworzą klasę: t/d, k/g, p/b/f, s/z/sh, cz/ch/ts i tak dalej. Zamiana
            jednego słowa w drugie kosztuje mało w obrębie klasy, najmniej w przypadku
            samogłosek (zmieniają się najbardziej), a najwięcej przy dodaniu lub usunięciu
            spółgłoski. Wynik to 1 minus ten koszt podzielony przez koszt całego dłuższego
            słowa. To metoda Dołgopolskiego, służąca do wykrywania pokrewnych słów.</li>
          <li><b>Szkielet spółgłoskowy.</b> Spółgłoski w kolejności przetrwają, nawet gdy język
            zgubi sylabę: <i>czwartek</i> to cz-w-r-t-k, a <i>четвер</i> to č-t-v-r. Liczy się
            to tylko wtedy, gdy dwa słowa mają co najmniej
            <span data-value="skeletonMinShared"></span> wspólne spółgłoski w tej samej
            kolejności, i wtedy najwyżej za <span data-value="skeletonWeight"></span>.</li>
        </ul>
      </li>
    </ol>
    <p>Na przykład: <span class="ex" data-a="Thursday" data-b="Donnerstag"></span>,
      <span class="ex" data-a="czwartek" data-b="четвер"></span>,
      <span class="ex" data-a="mot" data-b="parola"></span>,
      <span class="ex" data-a="dom" data-b="house"></span>.</p>

    <h3>Kolory</h3>
    <ul>
      <li><b>Kliknij kraj</b>, by porównać z nim wszystkie języki:
        <span data-value="bands"></span>, a poniżej szary.</li>
      <li><b>Bez wybranego kraju</b> mapa pokazuje <b>grupy</b> podobnych słów, każdą w innym
        kolorze. Język jest tym bledszy, im mniej przypomina brzmieniem resztę swojej grupy
        (liczy się jego średnie podobieństwo do pozostałych).</li>
    </ul>

    <h3>Jak powstają grupy</h3>
    <p><b>Grupowanie metodą średnich połączeń.</b> Na początku każdy język tworzy osobną
      grupę. Łączymy dwie grupy, których słowa są do siebie najbardziej podobne <em>średnio</em>:
      każde słowo z jednej porównujemy z każdym słowem z drugiej. Powtarzamy to, aż żadne dwie
      grupy nie osiągają średnio <span data-value="clusterThreshold"></span> lub więcej. Język,
      który zostanie sam, pozostaje szary.</p>
    <p>Dlaczego średnia, a nie dowolna bliska para? Łańcuchy bliskich sąsiadów połączyłyby
      całe rodziny, które wcale nie są podobne: słowiański <i>czwartek</i> i germański
      <i>torsdag</i> łączą się przez formy pośrednie.</p>

    <h3>Grupy ułożone ręcznie</h3>
    <p>W przypadku <b>czwartku</b>, <b>soboty</b> i <b>Bożego Narodzenia</b> historia znaczy
      więcej niż brzmienie. Romańskie <i>jeudi</i>, <i>giovedì</i> i <i>jueves</i> (wszystkie
      to „dzień Jowisza”) rozeszły się tak bardzo, że żadna miara brzmienia nie zgrupuje ich,
      nie łącząc przy okazji grup słowiańskiej i germańskiej. Dlatego dla tych trzech słów są
      też grupy ułożone ręcznie według pochodzenia słów, nazwane w panelu bocznym: „dzień
      Thora”, „dzień Jowisza”, „czwarty dzień” i tak dalej. Są wpisane na stałe, a nie
      wyliczane, więc mapa nigdy nie pokazuje ich sama z siebie: zawsze zaczyna od grup
      według brzmienia. Pokazuje je przełącznik <b>Grupy: Wg brzmienia | Ręcznie dobrane</b> u góry
      panelu bocznego. Po przełączeniu zostaje tak dla każdego słowa, dopóki nie przełączysz
      z powrotem; słowa bez ręcznie ułożonych grup pokazują brzmienie.</p>

    <h3>Przykład: Boże Narodzenie</h3>
    <p>Przełącz Boże Narodzenie na grupy ułożone ręcznie, a polskie <i>Boże Narodzenie</i>
      i rosyjskie <i>Рождество</i> dostaną ten sam kolor. <b>Nie umieścił ich tam
      algorytm.</b> Według brzmienia mają wynik zaledwie
      <span class="ex" data-a="Boże Narodzenie" data-b="Rozhdestvo"></span>, daleko poniżej
      <span data-value="clusterThreshold"></span> potrzebnego do zgrupowania.</p>
    <p>Grupy według pochodzenia są <b>wpisane ręcznie</b> w danych strony
      (<code>stories.js</code>): to lista języków, których słowa mają wspólne pochodzenie,
      wzięta z ich znanej historii. W tym widoku algorytm robi tylko dwie rzeczy. Ocenia, jak
      bardzo każde słowo brzmi podobnie do reszty swojej ręcznie ułożonej grupy, co decyduje
      o tym, jak jest blade (Polska jest najbledsza w swojej grupie). I porównuje słowa, gdy
      klikniesz kraj.</p>
    <p><b>Według brzmienia</b>, czyli w widoku, który mapa pokazuje najpierw, grupowanie
      dzieli Boże Narodzenie inaczej, a z punktu widzenia historii błędnie:</p>
    <ul>
      <li>Polskie <i>Boże Narodzenie</i> trafia do chorwackiego <i>Božić</i>. Oba zaczynają
        się od „Boga” (<i>Boże</i>, <i>Bog</i>): to naprawdę wspólne słowo, ale niewłaściwa
        połowa polskiej nazwy.</li>
      <li>Rosyjskie <i>Рождество</i> i ukraińskie <i>Різдво</i>
        (<span class="ex" data-a="Rizdvo" data-b="Rozhdestvo"></span>) trafiają do
        angielskiego <i>Christmas</i> i holenderskiego <i>Kerstmis</i> przez przypadkowe
        podobieństwo spółgłosek.</li>
    </ul>
    <p>W efekcie Polska i Rosja lądują w różnych grupach. Brzmienie nie może wiedzieć, że
      polskie <i>na-<b>rodz</b>-enie</i> i rosyjskie <i><b>рожд</b>-ество</i> to ten sam
      słowiański rdzeń <i>rod-</i>, „rodzić”. Rdzeń ukrywa przedrostek <i>na-</i>, dodatkowe
      słowo <i>Boże</i> i regularna zmiana głosek: tam, gdzie polski ma <i>dz</i>, rosyjski
      ma <i>žd</i> (<i>rodzić</i> / <i>рождать</i>). Ta wiedza pochodzi z językoznawstwa
      historycznego, a nie z mapy.</p>
    <p>Gdzie indziej historia i brzmienie się zgadzają: francuskie <i>Noël</i>, włoskie
      <i>Natale</i> i walijskie <i>Nadolig</i> (łacińskie <i>natalis</i>) albo litewskie
      <i>Kalėdos</i> i bułgarskie <i>Коледа</i>
      (<span class="ex" data-a="Kalėdos" data-b="Koleda"></span>, rzymskie
      <i>calendae</i>, kalendy).</p>
    <p>Porównaj sam:
      <button type="button" class="ghost" data-show="Christmas">Boże Narodzenie, grupy według brzmienia</button>
      <button type="button" class="ghost" data-show="Christmas" data-mode="origin">Boże Narodzenie, grupy dobrane ręcznie</button></p>

    <h3>Ograniczenia</h3>
    <p>Podobne brzmienie to nie to samo co pokrewieństwo. <span class="ex" data-a="kissa" data-b="cat"></span>
      to przypadek, a pokrewne słowa, które bardzo się zmieniły, mogą dostać niski wynik.
      Tłumaczenia i historie przygotowanych słów napisał Claude, więc mogą zawierać błędy.</p>
    `,
  });
})(typeof window !== "undefined" ? window : globalThis);
