// German. Every i18n-xx.js has the same keys (tests/similarity.test.js checks).
// {name} placeholders are filled in by the page. Story captions lead with the
// origin, then say where it went and how the word looks there.
(function (root) {
  "use strict";
  const I18N = root.EuropeI18n || require("./i18n.js");

  I18N.add("de", {
    ui: {
      title: "Europas Wörterkarte",
      sub: "Gib ein deutsches Wort ein. Sieh es in jeder Sprache Europas, und Länder, deren Wörter ähnlich klingen, leuchten gemeinsam auf.",
      placeholder: "z. B. Wort, Wasser, Schule, Milch",
      translate: "Übersetzen",
      howItWorks: "So funktioniert’s",
      demo: "Zeig’s mir",
      rowWords: "Wörter",
      rowStories: "Geschichten",
      rowFriends: "Falsche Freunde PL / SK",
      similarity: "Ähnlichkeit",
      groups: "Gruppen",
      bySound: "Nach Klang",
      handPicked: "Handverlesen",
      handPickedTitle: "Gruppen nach Herkunft des Wortes, von Hand ausgewählt (nur für Weihnachten, Donnerstag und Samstag)",
      different: "verschieden",
      same: "gleich",
      groupLegend: "eine Farbe pro Gruppe · blasser = passt weniger gut",
      settings: "Übersetzungseinstellungen",
      translateWith: "Übersetzen mit",
      provMyMemory: "MyMemory (kostenlos, ohne Schlüssel)",
      provClaude: "Claude (braucht einen Anthropic-API-Schlüssel)",
      apiKey: "Anthropic-API-Schlüssel",
      apiKeyNote: "Bessere Übersetzungen einzelner Wörter und saubere Umschrift, in einer einzigen Anfrage. Der Schlüssel bleibt in diesem Browser und wird nur an api.anthropic.com gesendet.",
      mmEmail: "E-Mail für MyMemory (optional)",
      mmEmailNote: "Anonym sind etwa 20 Wörter am Tag möglich, mit E-Mail ungefähr zehnmal so viele. Ergebnisse werden zwischengespeichert, ein Wort noch einmal nachzuschlagen kostet also nichts.",
      readIn: "Andere Sprachen",
      readInTip: "Um die Seite in einer anderen Sprache zu lesen, nutze die Übersetzungsfunktion deines Browsers (Rechtsklick → Übersetzen).",
      close: "Schließen",
      mapLabel: "Karte von Europa",
      start: "Gib ein Wort ein, um loszulegen. Klick auf ein Land, um mit seiner Sprache zu vergleichen.",
      comparedWith: "Verglichen mit {lang} „{word}“.",
      showAllGroups: "Alle Gruppen zeigen",
      refSound: "Die Farben zeigen Gruppen ähnlich klingender Wörter, automatisch gefunden. Blasser heißt: passt weniger gut. Klick auf ein Land, um damit zu vergleichen.",
      refSoundHasPicked: "Die Farben zeigen Gruppen ähnlich klingender Wörter, automatisch gefunden. Für dieses Wort gibt es auch handverlesene Gruppen nach Herkunft: oben umschalten.",
      refPicked: "Die Farben zeigen Gruppen nach Herkunft des Wortes, von Hand ausgewählt und nicht vom Algorithmus gefunden. Blasser heißt: klingt dem Rest der Gruppe weniger ähnlich.",
      refNoPicked: "Für dieses Wort gibt es keine handverlesenen Gruppen (nur Weihnachten, Donnerstag und Samstag haben welche), daher zeigen die Farben Gruppen nach Klang.",
      nLanguages: "{n} Sprachen",
      notInGroup: "In keiner Gruppe",
      likeWord: "wie „{word}“",
      inLanguages: "„{word}“ in {n} Sprachen. Fahr über ein Land für Details; klick darauf, um damit zu vergleichen.",
      fromCache: "„{word}“, aus dem Zwischenspeicher.",
      asking: "Frage Claude…",
      translating: "Übersetze…",
      quota: "Das kostenlose Tageskontingent von MyMemory ist aufgebraucht. Trag in den Übersetzungseinstellungen eine E-Mail ein oder wechsle zu Claude.",
      unreachable: "MyMemory ist nicht erreichbar.",
      needKey: "Trag in den Übersetzungseinstellungen deinen Anthropic-API-Schlüssel ein oder wechsle zu MyMemory.",
      declined: "Claude wollte dieses Wort nicht übersetzen.",
      badJson: "Claudes Antwort war kein gültiges JSON.",
      friendsRef: "Falsche Freunde: Sie klingen gleich, bedeuten aber etwas anderes.",
      friendStatus: "Falscher Freund: Polnisch „{pl}“ heißt {plm}; Slowakisch „{sk}“ heißt {skm}.",
      friendInstead: "Für „{m}“ sagt man auf {lang} {w}.",
      compareWith: "Mit {lang} vergleichen",
      tipHint: "Klicken zum Vergleichen",
      bands: ["blass", "orange", "dunkelorange", "rot"],
      demoStart: "So funktioniert’s.",
      demoWord: "Wähl ein Wort oder tipp dein eigenes ein.",
      demoGroups: "Jede Farbe ist eine Gruppe ähnlich klingender Wörter.",
      demoCountry: "Klick auf ein Land, um alle Sprachen damit zu vergleichen.",
      demoScale: "Rot ist dasselbe Wort, Grau hat nichts damit zu tun.",
      demoPicked: "Bei ein paar Wörtern kannst du auf Gruppen umschalten, die von Hand nach Herkunft gewählt sind.",
      demoHelp: "Neugierig, wie das funktioniert? Drück ?.",
    },

    regions: { Catalonia: "Katalonien", "Basque Country": "Baskenland", Galicia: "Galicien", Wales: "Wales" },

    stories: {
      Thursday: {
        lead: "Wem gehört der Donnerstag? Europa ist sich uneins.",
        points: [
          "Dem Donnergott Thor: England, Deutschland, die Niederlande, Skandinavien und Finnland (Thursday, Donnerstag, donderdag, torsdag, torstai).",
          "Jupiter, dem König der römischen Götter: Frankreich, Italien, Spanien, Rumänien und Wales (jeudi, giovedì, jueves, joi, dydd Iau).",
          "Gar keinem Gott, er ist einfach „der vierte Tag“: die Slawen, Ungarn, das Baltikum und Estland (czwartek, четверг, csütörtök, ketvirtadienis, neljapäev).",
          "„Der fünfte Tag“, ab Sonntag gezählt: Portugal, Griechenland, die Türkei, Island und Georgien (quinta-feira, Πέμπτη, perşembe, fimmtudagur).",
        ],
      },
      Saturday: {
        lead: "Ruhetag, Planet oder Waschtag?",
        points: [
          "Der hebräische Sabbat, der Ruhetag: fast ganz Europa (sobota, суббота, sábado, sabato, samedi, Samstag, szombat).",
          "Der römische Gott Saturn: England, die Niederlande, Irland und Wales (Saturday, zaterdag, Dé Sathairn, dydd Sadwrn).",
          "Der „Waschtag“ der Wikinger: Skandinavien, Island und Finnland (lördag, lørdag, laugardagur, lauantai).",
          "Schlicht „der sechste Tag“: Litauen und Lettland (šeštadienis, sestdiena).",
        ],
      },
      Christmas: {
        lead: "Ein Fest, acht Geschichten.",
        points: [
          "„Geburt“, vom lateinischen natalis: Frankreich, Italien, Spanien, Portugal, Wales und Irland (Noël, Natale, Navidad, Natal, Nadolig, Nollaig).",
          "Wieder „Geburt“, diesmal von der slawischen Wurzel rod-: Polen, Russland und die Ukraine (Boże Narodzenie, Рождество, Різдво).",
          "Božić, „der kleine Gott“: Kroatien, Serbien, Bosnien, Slowenien und Nordmazedonien.",
          "Jul, das heidnische Mittwinterfest: Skandinavien, Island, Finnland und Estland (jul, jól, joulu, jõulud).",
          "Die römischen calendae, der erste Tag des Monats: Litauen, Bulgarien und Belarus (Kalėdos, Коледа, Каляды).",
          "Das deutsche Weihnachten, „die geweihten Nächte“: von Tschechien und der Slowakei übernommen (Vánoce, Vianoce).",
          "Christus beim Namen genannt: England, die Niederlande, Albanien und Griechenland (Christmas, Kerstmis, Krishtlindje, Χριστούγεννα).",
          "Kračun, ein altes slawisches Wort für Mittwinter: Rumänien und Ungarn (Crăciun, karácsony).",
        ],
      },
      king: {
        lead: "Karl der Große wurde zum Wort.",
        points: [
          "Karl, also Karl der Große selbst: die Slawen (król, король, kralj) und von ihnen Ungarn, Litauen, Lettland und die Türkei (király, karalius, karalis, kral).",
          "Altgermanisch kuningaz, „Mann aus edlem Geschlecht“: England, Deutschland und Skandinavien (king, König, kung), schon früh von Finnland und Estland entlehnt (kuningas).",
          "Lateinisch rex: Frankreich, Italien, Spanien, Portugal und Rumänien (roi, re, rey, rei, rege).",
        ],
      },
      bread: {
        lead: "Die Slawen haben ihr Brot von den Goten.",
        points: [
          "Gotisch hlaifs, dasselbe Wort wie „Laib“: die Slawen (chleb, хлеб, chléb), dazu Finnland und Estland (leipä, leib).",
          "Germanisch brauþ: England, Deutschland, die Niederlande und Skandinavien (bread, Brot, brood, bröd).",
          "Lateinisch panis: Frankreich, Italien, Spanien, Portugal und Rumänien (pain, pane, pan, pão, pâine).",
          "Kruh, „ein Stück“: Kroatien und Slowenien.",
        ],
      },
      church: {
        lead: "Folge dem Wort, und du siehst, wer den Glauben brachte.",
        points: [
          "Lateinisch castellum, eine Festung: Polen, Tschechien und die Slowakei (kościół, kostel, kostol).",
          "Griechisch kyriakon, „das Haus des Herrn“, über die Germanen: Deutschland, England und Skandinavien (Kirche, church, kyrka) sowie die Ost- und Südslawen (церковь, crkva).",
          "Griechisch ekklesia, „die Versammlung“: Frankreich, Spanien, Italien, Griechenland, Albanien und Wales (église, iglesia, chiesa, εκκλησία, kishë, eglwys).",
          "Slawisch božnica, „Gottes Ort“: Litauen und Lettland (bažnyčia, baznīca).",
          "Lateinisch basilica: Rumänien (biserică).",
        ],
      },
      orange: {
        lead: "Benannt nach dem Ort, von dem sie zu kommen schien.",
        points: [
          "Portugal, dessen Händler die süße Orange brachten: Griechenland, die Türkei, der Balkan, Rumänien und Georgien (πορτοκάλι, portakal, portocală, ფორთოხალი).",
          "„Der Apfel aus China“: die Niederlande, Skandinavien, Russland, das Baltikum und Finnland (sinaasappel, apelsin, апельсин, appelsiini).",
          "Italienisch pomo d'arancia, „Orangenapfel“: Polen, Tschechien, die Slowakei und Slowenien (pomarańcza, pomeranč, pomaranča).",
          "Persisch nārang, über das Arabische: Spanien, Portugal, Italien, Frankreich und England (naranja, laranja, arancia, orange).",
        ],
      },
      tomato: {
        lead: "Goldapfel oder Paradiesapfel?",
        points: [
          "Italienisch pomodoro, „Goldapfel“: Polen, Russland, die Ukraine und Georgien (pomidor, помидор, помідор, პომიდორი).",
          "Österreichisch Paradeiser, „Paradiesapfel“: Ungarn, Serbien, Tschechien, die Slowakei, Slowenien und Kroatien (paradicsom, парадајз, rajče, paradajka, paradižnik, rajčica).",
          "Das aztekische tomatl: fast der ganze Rest (tomato, Tomate, tomate, domates).",
          "Einfach „die Rote“: Rumänien (roșie).",
        ],
      },
      potato: {
        lead: "Europa wurde sich nie einig, was das eigentlich ist.",
        points: [
          "Ein Erdapfel: Frankreich und die Niederlande (pomme de terre, aardappel).",
          "Ein Trüffel, italienisch tartufolo: Deutschland, Russland, Bulgarien, Rumänien und Lettland (Kartoffel, картофель, картоф, cartof, kartupelis).",
          "Eine Grundbirne, wie es im deutschen Dialekt heißt: Kroatien, Serbien, Slowenien und Luxemburg (krumpir, кромпир, krompir, Gromper).",
          "Ein Ding aus der Erde: Polen und die Slowakei (ziemniak, zemiak).",
          "Brandenburg, woher sie kam: Tschechien (brambor).",
          "Die karibische batata: Spanien, Italien, England, Schweden und Norwegen (patata, potato, potatis, potet).",
        ],
      },
      turkey: {
        lead: "Jeder schiebt es auf jemand anderen.",
        points: [
          "Die Türkei: England (turkey).",
          "Indien: die Türkei, Frankreich, Polen, Russland und die Ukraine (hindi, dinde, indyk, индейка, індик).",
          "Peru: Portugal (peru).",
          "Kalikut, ein Hafen in Indien: die Niederlande, Skandinavien und Finnland (kalkoen, kalkun, kalkkuna).",
          "Ägypten: Nordmazedonien (мисирка).",
        ],
      },
      night: {
        lead: "Eines der ältesten Wörter Europas.",
        points: [
          "Indoeuropäisch nókʷts: fast alle (night, Nacht, nuit, notte, noche, noc, ночь, νύχτα).",
          "Nur die Außenseiter tanzen aus der Reihe: Finnisch yö, Estnisch öö, Ungarisch éjszaka, Baskisch gau, Türkisch gece.",
        ],
      },
      mother: {
        lead: "Das erste Wort, fast überall gleich.",
        points: [
          "Indoeuropäisch méh₂tēr: mother, Mutter, madre, matka, мать, mère, máthair.",
          "Außerhalb dieser Familie: Finnisch äiti, Estnisch ema, Ungarisch anya, Baskisch ama, Türkisch anne.",
          "Und auf Georgisch heißt mama „Vater“. Mutter heißt deda!",
        ],
      },
    },

    groups: {
      thor: "Thors Tag", jupiter: "Jupiters Tag", fourth: "der vierte Tag", fifth: "der fünfte Tag",
      sabbath: "Sabbat", saturn: "Saturns Tag", washing: "Waschtag", sixth: "der sechste Tag",
      natalis: "Geburt (lat. natalis)", rod: "Geburt (slaw. rod-)", bozic: "Božić, „kleiner Gott“",
      yule: "Jul", calendae: "römische calendae", weihnachten: "von Weihnachten",
      christ: "Christus …", kracun: "kračun",
    },

    // What each false friend means, keyed by the Polish word: [Polish, Slovak, Czech].
    friends: {
      czerstwy: ["altbacken", "frisch", "frisch"],
      kompot: ["ein Getränk aus gekochtem Obst", "in Sirup eingemachtes Obst, das man löffelt", "in Sirup eingemachtes Obst"],
      sklep: ["Laden", "Keller", "Keller"],
      "obchód": ["ein Rundgang, eine Streife", "Laden", "Laden"],
      "zachód": ["Westen, Sonnenuntergang", "Toilette", "Toilette"],
      zapach: ["Duft, Geruch", "Gestank", "Gestank"],
      laska: ["Spazierstock; umgangssprachlich: ein hübsches Mädchen", "Liebe", "Liebe"],
      urok: ["Charme", "Kreditzinsen", "Kreditzinsen"],
      jagody: ["Heidelbeeren", "Erdbeeren", "Erdbeeren"],
      dywan: ["Teppich", "Sofa", "Sofa"],
      "zawód": ["Beruf; Enttäuschung", "Fabrik; Wettrennen", "Fabrik; Wettrennen"],
      szykowny: ["schick, elegant", "geschickt, praktisch veranlagt", "geschickt, praktisch veranlagt"],
      frajer: ["ein Trottel, ein Dummkopf", "ein cooler Typ; Freund", "ein cooler Typ"],
      trup: ["Leiche", "Rumpf", "Rumpf"],
      "pozór": ["Anschein (na pozór: scheinbar)", "Achtung! Vorsicht!", "Achtung! Vorsicht!"],
    },

    help: `
    <h2 id="howto-title">So funktioniert’s</h2>
    <p class="disclaimer"><b>Nur zum Spaß.</b> Das ist ein Hobbyprojekt, keine
      Sprachforschung. Gebaut hat es Claude, eine KI, Schritt für Schritt angeleitet von
      einem Menschen, um eine einfache Gruppierung der Sprachen Europas zu finden, die schön
      anzusehen ist und Gesprächsstoff liefert. Die Maße und Gruppen unten sind grobe
      Faustregeln, und die Übersetzungen und Wortgeschichten können Fehler enthalten.</p>
    <p>Jedes Wort wird in 43 Sprachen übersetzt. Dann misst die Seite, wie ähnlich die
      Wörter <em>klingen</em>, und färbt danach die Karte.</p>

    <h3>Wie ähnlich zwei Wörter klingen</h3>
    <ol>
      <li><b>Umschreiben:</b> Kyrillisch, Griechisch, Georgisch und Armenisch werden in
        lateinische Buchstaben übertragen (слово → slovo).</li>
      <li><b>Aufräumen:</b> Artikel (<i>das Wort</i> → <i>Wort</i>) und Akzente fallen
        weg.</li>
      <li><b>Nach Gehör schreiben:</b> Polnisch <i>sz</i>, Tschechisch <i>š</i> und Deutsch
        <i>sch</i> werden alle zu <i>sh</i>; <i>w</i> wird zu <i>v</i>, <i>ph</i> zu
        <i>f</i> und so weiter.</li>
      <li><b>Auf zwei Arten vergleichen und den höheren Wert nehmen:</b>
        <ul>
          <li><b>Lautklassen.</b> Laute, die sich auf dem Weg eines Wortes von Sprache zu
            Sprache gegenseitig ersetzen, bilden eine Klasse: t/d, k/g, p/b/f, s/z/sh,
            cz/ch/ts und so weiter. Ein Wort in das andere zu verwandeln kostet innerhalb
            einer Klasse wenig, am wenigsten bei Vokalen (sie wandern am meisten), und am
            meisten, wenn ein Konsonant hinzukommt oder wegfällt. Der Wert ist 1 minus diese
            Kosten, geteilt durch die Kosten des ganzen längeren Wortes. Das folgt der
            Methode von Dolgopolsky, verwandte Wörter aufzuspüren.</li>
          <li><b>Konsonantengerüst.</b> Die Konsonanten in ihrer Reihenfolge überleben, wenn
            eine Sprache eine Silbe verschluckt: <i>czwartek</i> ist cz-w-r-t-k und
            <i>четвер</i> ist č-t-v-r. Das zählt nur, wenn zwei Wörter mindestens
            <span data-value="skeletonMinShared"></span> Konsonanten in derselben Reihenfolge
            teilen, und dann höchstens mit <span data-value="skeletonWeight"></span>.</li>
        </ul>
      </li>
    </ol>
    <p>Zum Beispiel: <span class="ex" data-a="Thursday" data-b="Donnerstag"></span>,
      <span class="ex" data-a="czwartek" data-b="четвер"></span>,
      <span class="ex" data-a="mot" data-b="parola"></span>,
      <span class="ex" data-a="dom" data-b="house"></span>.</p>

    <h3>Farben</h3>
    <ul>
      <li><b>Klick auf ein Land</b>, um jede Sprache mit dieser zu vergleichen:
        <span data-value="bands"></span> und darunter grau.</li>
      <li><b>Kein Land ausgewählt:</b> Die Karte zeigt <b>Gruppen</b> ähnlicher Wörter, jede
        in einer eigenen Farbe. Eine Sprache ist umso blasser, je weniger sie wie der Rest
        ihrer Gruppe klingt (ihre durchschnittliche Ähnlichkeit zu den anderen).</li>
    </ul>

    <h3>Wie die Gruppen gefunden werden</h3>
    <p><b>Clustering mit mittlerer Verknüpfung (Average Linkage).</b> Jede Sprache beginnt
      als eigene Gruppe. Die zwei Gruppen, deren Wörter sich <em>im Durchschnitt</em> am
      ähnlichsten sind, werden zusammengelegt: Jedes Wort der einen wird mit jedem Wort der
      anderen verglichen. Das wiederholt sich, bis keine zwei Gruppen mehr im Schnitt
      <span data-value="clusterThreshold"></span> oder mehr erreichen. Eine Sprache, die
      allein übrig bleibt, bleibt grau.</p>
    <p>Warum der Durchschnitt und nicht einfach irgendein nahes Paar? Ketten von nahen
      Nachbarn würden ganze Familien verbinden, die sich nicht ähneln: Das slawische
      <i>czwartek</i> und das germanische <i>torsdag</i> hängen über Zwischenformen
      zusammen.</p>

    <h3>Handverlesene Gruppen</h3>
    <p>Bei <b>Donnerstag</b>, <b>Samstag</b> und <b>Weihnachten</b> zählt die Geschichte
      mehr als der Klang. Die lateinischen <i>jeudi</i>, <i>giovedì</i> und <i>jueves</i>
      (alle „Jupiters Tag“) haben sich zu weit auseinanderentwickelt, als dass ein Klangmaß
      sie zusammenfassen könnte, ohne dabei auch die slawische und die germanische Gruppe zu
      verschmelzen. Deshalb gibt es für diese drei Wörter zusätzlich Gruppen, die von Hand
      nach der Herkunft der Wörter ausgewählt wurden und in der Seitenleiste benannt sind:
      „Thors Tag“, „Jupiters Tag“, „der vierte Tag“ und so weiter. Sie sind fest
      eingetragen, nicht berechnet, daher zeigt die Karte sie nie von selbst: Sie beginnt
      immer mit Gruppen nach Klang. Der Schalter <b>Gruppen: Nach Klang | Handverlesen</b>
      oben in der Seitenleiste blendet sie ein. Einmal umgeschaltet, bleibt er für jedes Wort
      so, bis du zurückschaltest; Wörter ohne handverlesene Gruppen zeigen den Klang.</p>

    <h3>Ein Beispiel im Detail: Weihnachten</h3>
    <p>Schalte Weihnachten auf die handverlesenen Gruppen um, und das polnische <i>Boże
      Narodzenie</i> und das russische <i>Рождество</i> teilen sich eine Farbe. <b>Der
      Algorithmus hat sie nicht dorthin gesetzt.</b> Nach Klang erreichen sie nur
      <span class="ex" data-a="Boże Narodzenie" data-b="Rozhdestvo"></span>, weit unter
      den <span data-value="clusterThreshold"></span>, die das Clustering braucht.</p>
    <p>Die handverlesenen Gruppen sind <b>von Hand eingetragen</b>, in den Daten der Seite
      (<code>stories.js</code>): eine Liste, welche Sprachen Wörter gleicher Herkunft haben,
      entnommen ihrer bekannten Geschichte. In dieser Ansicht tut der Algorithmus nur zwei
      Dinge. Er misst, wie ähnlich jedes Wort dem Rest seiner handgemachten Gruppe klingt,
      und bestimmt damit, wie blass es ist (Polen ist in seiner Gruppe am blassesten). Und er
      vergleicht Wörter, wenn du auf ein Land klickst.</p>
    <p><b>Nach Klang</b>, also so, wie die Karte es zuerst zeigt, gruppiert das Clustering
      Weihnachten anders, und historisch gesehen falsch:</p>
    <ul>
      <li>Das polnische <i>Boże Narodzenie</i> landet beim kroatischen <i>Božić</i>. Beide
        beginnen mit „Gott“ (<i>Boże</i>, <i>Bog</i>), ein wirklich gemeinsames Wort, aber
        die falsche Hälfte des polnischen Namens.</li>
      <li>Das russische <i>Рождество</i> und das ukrainische <i>Різдво</i>
        (<span class="ex" data-a="Rizdvo" data-b="Rozhdestvo"></span>) landen beim
        englischen <i>Christmas</i> und dem niederländischen <i>Kerstmis</i>, durch eine
        zufällige Ähnlichkeit der Konsonanten.</li>
    </ul>
    <p>So landen Polen und Russland in verschiedenen Gruppen. Der Klang kann nicht wissen,
      dass das polnische <i>na-<b>rodz</b>-enie</i> („Geburt“) und das russische
      <i><b>рожд</b>-ество</i> dieselbe slawische Wurzel haben, <i>rod-</i>, „gebären“. Die
      Wurzel verstecken die Vorsilbe <i>na-</i>, das zusätzliche Wort <i>Boże</i>
      („Gottes“) und ein regelmäßiger Lautwandel: Wo das Polnische <i>dz</i> hat, hat das
      Russische <i>žd</i> (<i>rodzić</i> / <i>рождать</i>). Dieses Wissen stammt aus der
      historischen Sprachwissenschaft, nicht von der Karte.</p>
    <p>Anderswo stimmen Geschichte und Klang überein: das französische <i>Noël</i>, das
      italienische <i>Natale</i> und das walisische <i>Nadolig</i> (lateinisch
      <i>natalis</i>) oder das litauische <i>Kalėdos</i> und das bulgarische <i>Коледа</i>
      (<span class="ex" data-a="Kalėdos" data-b="Koleda"></span>, die römischen
      <i>calendae</i>).</p>
    <p>Vergleich die beiden selbst:
      <button type="button" class="ghost" data-show="Christmas">Weihnachten, nach Klang gruppiert</button>
      <button type="button" class="ghost" data-show="Christmas" data-mode="origin">Weihnachten, handverlesene Gruppen</button></p>

    <h3>Grenzen</h3>
    <p>Ähnlich zu klingen heißt nicht, verwandt zu sein. <span class="ex" data-a="kissa" data-b="cat"></span>
      ist Zufall, während verwandte Wörter, die sich stark verändert haben, niedrig abschneiden
      können. Die Übersetzungen und Herkunftsangaben der vorbereiteten Wörter hat Claude
      geschrieben, sie können also Fehler enthalten.</p>
    `,
  });
})(typeof window !== "undefined" ? window : globalThis);
