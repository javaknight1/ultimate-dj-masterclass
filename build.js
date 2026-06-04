#!/usr/bin/env node
/*
 * build.js — assembles data/<courseId>.json files into index.html
 * Replaces the {/*__LESSONS__* /} marker with the full LESSONS object.
 * The served artifact is the single self-contained index.html.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const HTML = path.join(ROOT, 'index.html');
const DATA = path.join(ROOT, 'data');

// Course order must match the CATS array in index.html
const ORDER = ['gear','software','mixing','advanced','turntablism','selection',
               'genres','performance','remixing','production','brand','business'];

const MARKER = '{/*__LESSONS__*/}';

function main() {
  const lessons = {};
  let total = 0;
  for (const id of ORDER) {
    const file = path.join(DATA, id + '.json');
    if (!fs.existsSync(file)) { console.error(`MISSING: data/${id}.json`); process.exit(1); }
    let arr;
    try { arr = JSON.parse(fs.readFileSync(file, 'utf8')); }
    catch (e) { console.error(`BAD JSON in data/${id}.json: ${e.message}`); process.exit(1); }
    if (!Array.isArray(arr)) { console.error(`data/${id}.json is not an array`); process.exit(1); }
    lessons[id] = arr;
    total += arr.length;
    console.log(`  ${id.padEnd(12)} ${arr.length} lessons`);
  }

  let html = fs.readFileSync(HTML, 'utf8');
  if (!html.includes(MARKER)) { console.error('marker not found in index.html'); process.exit(1); }
  // Pretty-ish but compact JSON; safe to embed in a <script> (no </script> sequences expected in content)
  const json = JSON.stringify(lessons);
  if (json.includes('</script')) { console.error('content contains </script — would break the page'); process.exit(1); }
  html = html.replace(MARKER, () => json); // function form: avoids $-substitution in replacement
  fs.writeFileSync(HTML, html);
  console.log(`\nInjected ${total} lessons across ${ORDER.length} courses → index.html (${(html.length/1024).toFixed(0)} KB)`);
}

main();
