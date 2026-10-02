// Polish-Slovak false friends: words that sound (nearly) the same but mean
// something different. Czech is included where its word matches the Slovak one
// in both sound and meaning.
//
// For each language: the word, and `instead`: what that language actually says
// for the *other* language's meaning. What each word means is in each
// i18n-xx.js, under friends, keyed by the Polish word.
(function (root) {
  "use strict";

  const FALSE_FRIENDS = [
    {
      pl: { word: "czerstwy", instead: "świeży" },
      sk: { word: "čerstvý", instead: "starý" },
      cs: { word: "čerstvý" },
    },
    {
      pl: { word: "kompot", instead: "owoce w syropie" },
      sk: { word: "kompót", instead: "ovocný nápoj" },
      cs: { word: "kompot" },
    },
    {
      pl: { word: "sklep", instead: "piwnica" },
      sk: { word: "sklep", instead: "obchod" },
      cs: { word: "sklep" },
    },
    {
      pl: { word: "obchód", instead: "sklep" },
      sk: { word: "obchod", instead: "obchôdzka" },
      cs: { word: "obchod" },
    },
    {
      pl: { word: "zachód", instead: "toaleta" },
      sk: { word: "záchod", instead: "západ" },
      cs: { word: "záchod" },
    },
    {
      pl: { word: "zapach", instead: "smród" },
      sk: { word: "zápach", instead: "vôňa" },
      cs: { word: "zápach" },
    },
    {
      pl: { word: "laska", instead: "miłość" },
      sk: { word: "láska", instead: "palica" },
      cs: { word: "láska" },
    },
    {
      pl: { word: "urok", instead: "odsetki" },
      sk: { word: "úrok", instead: "pôvab" },
      cs: { word: "úrok" },
    },
    {
      pl: { word: "jagody", instead: "truskawki" },
      sk: { word: "jahody", instead: "čučoriedky" },
      cs: { word: "jahody" },
    },
    {
      pl: { word: "dywan", instead: "kanapa" },
      sk: { word: "diván", instead: "koberec" },
      cs: { word: "divan" },
    },
    {
      pl: { word: "zawód", instead: "zakład, wyścig" },
      sk: { word: "závod", instead: "povolanie, sklamanie" },
      cs: { word: "závod" },
    },
    {
      pl: { word: "szykowny", instead: "zręczny" },
      sk: { word: "šikovný", instead: "elegantný" },
      cs: { word: "šikovný" },
    },
    {
      pl: { word: "frajer", instead: "chłopak, gość" },
      sk: { word: "frajer", instead: "hlupák" },
      cs: { word: "frajer" },
    },
    {
      pl: { word: "trup", instead: "tułów" },
      sk: { word: "trup", instead: "mŕtvola" },
      cs: { word: "trup" },
    },
    {
      pl: { word: "pozór", instead: "uwaga!" },
      sk: { word: "pozor", instead: "zdanie" },
      cs: { word: "pozor" },
    },
  ];

  const api = { FALSE_FRIENDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.EuropeFalseFriends = api;
})(typeof window !== "undefined" ? window : globalThis);
