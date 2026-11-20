// Crawls the static export (out/) and verifies every internal href/src resolves to a file.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = new URL('../out/', import.meta.url).pathname;
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(OUT);

const broken = new Map();
let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)].map((m) => m[1]);
  const srcsets = [...html.matchAll(/srcSet="([^"]+)"/gi)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(' ')[0]));
  for (const ref of [...refs, ...srcsets]) {
    if (!ref.startsWith('/') || ref.startsWith('//')) continue;
    checked++;
    const clean = decodeURIComponent(ref);
    const target = clean.endsWith('/') ? join(OUT, clean, 'index.html') : join(OUT, clean);
    if (!existsSync(target) && !existsSync(target + '.html')) {
      const key = clean;
      if (!broken.has(key)) broken.set(key, new Set());
      broken.get(key).add(page.replace(OUT, '/'));
    }
  }
}
console.log(`Pages: ${pages.length} · internal references checked: ${checked}`);
if (broken.size) {
  console.log(`BROKEN (${broken.size}):`);
  for (const [k, v] of broken) console.log(`  ${k}  ← ${[...v].slice(0, 3).join(', ')}`);
  process.exit(1);
} else console.log('No broken internal links.');
