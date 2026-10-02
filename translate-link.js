// Links that open this page through Google Translate's website proxy, so the
// "How it works" panel can be read in another language. Google's proxy serves
// https://example.com/path as https://example-com.translate.goog/path (a "-" in
// the host becomes "--", each "." becomes "-") with the languages in _x_tr_*
// parameters. It can only fetch public https pages, so a copy opened from disk
// or a home network gets no link (the browser's own Translate still works there).
(function (root) {
  "use strict";

  // Offered in the panel's picker; Google accepts many more codes.
  const READ_IN = [
    ["pl", "Polski"], ["de", "Deutsch"], ["fr", "Français"], ["es", "Español"],
    ["it", "Italiano"], ["uk", "Українська"], ["cs", "Čeština"], ["sk", "Slovenčina"],
    ["pt", "Português"], ["nl", "Nederlands"],
  ];

  function isPrivateHost(host) {
    return host === "localhost" || /^(127|10)\./.test(host) || /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host) || host.endsWith(".local") || !host.includes(".");
  }

  // href: the page's address; lang: target code; hash: what to open on arrival.
  function translateLink(href, lang, hash = "#how") {
    let url;
    try { url = new URL(href); } catch { return null; }
    if (url.protocol !== "https:" || isPrivateHost(url.hostname)) return null;
    if (url.hostname.endsWith(".translate.goog")) return null; // already translated
    const host = url.hostname.replace(/-/g, "--").replace(/\./g, "-") + ".translate.goog";
    const out = new URL(`https://${host}${url.pathname}`);
    url.searchParams.forEach((v, k) => out.searchParams.set(k, v));
    out.searchParams.set("_x_tr_sl", "en");
    out.searchParams.set("_x_tr_tl", lang);
    out.searchParams.set("_x_tr_hl", lang);
    out.hash = hash;
    return out.href;
  }

  const api = { READ_IN, translateLink };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TranslateLink = api;
})(typeof window !== "undefined" ? window : globalThis);
