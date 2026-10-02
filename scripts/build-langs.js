// Writes pl/index.html, de/index.html and it/index.html: copies of index.html
// in another interface language. Each copy differs only in <html lang>, its
// <title>, and a <base href="../"> so it loads the same scripts and data from
// the site root; app.js fills in the rest from i18n-xx.js. Run after editing
// index.html (tests/similarity.test.js fails while a copy is out of date):
//
//   node scripts/build-langs.js
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const I18N = require("../i18n.js");

function pageFor(lang, html) {
  require(`../i18n-${lang}.js`);
  const title = I18N.t(lang, "title");
  const swap = (from, to) => {
    if (!html.includes(from)) throw new Error(`index.html no longer contains ${from}`);
    html = html.replace(from, to);
  };
  swap('<html lang="en">', `<html lang="${lang}">`);
  swap('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="../">\n' +
    "<!-- Generated from index.html by scripts/build-langs.js. Do not edit. -->");
  swap(/<title>[^<]*<\/title>/.exec(html)[0], `<title>${title}</title>`);
  return html;
}

function build() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const pages = {};
  for (const lang of I18N.UI_LANGS.filter((l) => l !== "en")) pages[`${lang}/index.html`] = pageFor(lang, html);
  return pages;
}

if (require.main === module) {
  for (const [file, html] of Object.entries(build())) {
    fs.mkdirSync(path.join(ROOT, path.dirname(file)), { recursive: true });
    fs.writeFileSync(path.join(ROOT, file), html);
    console.log("wrote", file);
  }
}

module.exports = { build, pageFor };
