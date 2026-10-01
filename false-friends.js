// Polish-Slovak false friends: words that sound (nearly) the same but mean
// something different. Czech is included where its word matches the Slovak one
// in both sound and meaning.
//
// For each language: the word, what it means, and `instead` — what that
// language actually says for the *other* language's meaning.
(function (root) {
  "use strict";

  const FALSE_FRIENDS = [
    {
      pl: { word: "czerstwy", means: "stale", instead: "świeży" },
      sk: { word: "čerstvý", means: "fresh", instead: "starý" },
      cs: { word: "čerstvý", means: "fresh" },
    },
    {
      pl: { word: "kompot", means: "a drink made from boiled fruit", instead: "owoce w syropie" },
      sk: { word: "kompót", means: "fruit preserved in syrup, eaten with a spoon", instead: "ovocný nápoj" },
      cs: { word: "kompot", means: "fruit preserved in syrup" },
    },
    {
      pl: { word: "sklep", means: "shop", instead: "piwnica" },
      sk: { word: "sklep", means: "cellar", instead: "obchod" },
      cs: { word: "sklep", means: "cellar" },
    },
    {
      pl: { word: "obchód", means: "a round, a patrol", instead: "sklep" },
      sk: { word: "obchod", means: "shop", instead: "obchôdzka" },
      cs: { word: "obchod", means: "shop" },
    },
    {
      pl: { word: "zachód", means: "west, sunset", instead: "toaleta" },
      sk: { word: "záchod", means: "toilet", instead: "západ" },
      cs: { word: "záchod", means: "toilet" },
    },
    {
      pl: { word: "zapach", means: "smell, scent", instead: "smród" },
      sk: { word: "zápach", means: "stench", instead: "vôňa" },
      cs: { word: "zápach", means: "stench" },
    },
    {
      pl: { word: "laska", means: "walking stick; slang: an attractive girl", instead: "miłość" },
      sk: { word: "láska", means: "love", instead: "palica" },
      cs: { word: "láska", means: "love" },
    },
    {
      pl: { word: "urok", means: "charm", instead: "odsetki" },
      sk: { word: "úrok", means: "interest on a loan", instead: "pôvab" },
      cs: { word: "úrok", means: "interest on a loan" },
    },
    {
      pl: { word: "jagody", means: "blueberries", instead: "truskawki" },
      sk: { word: "jahody", means: "strawberries", instead: "čučoriedky" },
      cs: { word: "jahody", means: "strawberries" },
    },
    {
      pl: { word: "dywan", means: "carpet", instead: "kanapa" },
      sk: { word: "diván", means: "couch", instead: "koberec" },
      cs: { word: "divan", means: "couch" },
    },
    {
      pl: { word: "zawód", means: "profession; disappointment", instead: "zakład, wyścig" },
      sk: { word: "závod", means: "factory; race", instead: "povolanie, sklamanie" },
      cs: { word: "závod", means: "factory; race" },
    },
    {
      pl: { word: "szykowny", means: "chic, elegant", instead: "zręczny" },
      sk: { word: "šikovný", means: "skilful, handy", instead: "elegantný" },
      cs: { word: "šikovný", means: "skilful, handy" },
    },
    {
      pl: { word: "frajer", means: "a sucker, a mug", instead: "chłopak, gość" },
      sk: { word: "frajer", means: "a cool guy; boyfriend", instead: "hlupák" },
      cs: { word: "frajer", means: "a cool guy" },
    },
    {
      pl: { word: "trup", means: "corpse", instead: "tułów" },
      sk: { word: "trup", means: "torso", instead: "mŕtvola" },
      cs: { word: "trup", means: "torso" },
    },
    {
      pl: { word: "pozór", means: "appearance (na pozór: seemingly)", instead: "uwaga!" },
      sk: { word: "pozor", means: "attention! watch out!", instead: "zdanie" },
      cs: { word: "pozor", means: "attention! watch out!" },
    },
  ];

  const api = { FALSE_FRIENDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.EuropeFalseFriends = api;
})(typeof window !== "undefined" ? window : globalThis);
