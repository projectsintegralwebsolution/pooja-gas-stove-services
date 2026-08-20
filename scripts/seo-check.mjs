import fs from 'node:fs/promises';
import path from 'node:path';
import { seoRoutes } from './seo-map.mjs';

const errors = [];

for (const route of seoRoutes) {
  const file = route === '/'
    ? 'dist/index.html'
    : path.join('dist', route.slice(1), 'index.html');

  const html = await fs.readFile(file, 'utf8');

  const checks = [
    ['title', /<title>[^<]{8,}<\/title>/i],
    ['description', /<meta\s+name="description"\s+content="[^"]{50,}"/i],
    ['canonical', /<link\s+rel="canonical"\s+href="https:\/\/poojagasstoveservice\.com\//i],
    ['OG title', /<meta\s+property="og:title"\s+content="[^"]+"/i],
    ['OG description', /<meta\s+property="og:description"\s+content="[^"]+"/i],
    ['OG image', /<meta\s+property="og:image"\s+content="[^"]+"/i],
    ['Twitter card', /<meta\s+name="twitter:card"\s+content="summary_large_image"/i],
    ['schema', /<script\s+type="application\/ld\+json">/i],
    ['H1', /<h1(?:\s|>)/i],
  ];

  for (const [name, regex] of checks) {
    if (!regex.test(html)) errors.push(`${route}: missing ${name}`);
  }

  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  if (h1Count !== 1) errors.push(`${route}: expected 1 H1, found ${h1Count}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`SEO check passed for ${seoRoutes.length} prerendered pages.`);
