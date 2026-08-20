import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
import { seoMap, seoRoutes } from './seo-map.mjs';
import { site } from '../src/data/site.js';

const dist = path.resolve('dist');
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

function canonicalFor(route) {
  return route === '/' ? `${site.domain}/` : `${site.domain}${route}`;
}

function buildSchema(route, seo) {
  const url = canonicalFor(route);
  const base = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url,
    inLanguage: site.language,
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: site.domain,
    },
  };

  return seo.schema
    ? { '@context': 'https://schema.org', '@graph': [base, seo.schema] }
    : base;
}

function buildHead(route, seo) {
  const url = canonicalFor(route);
  const image = site.ogImage.startsWith('http') ? site.ogImage : `${site.domain}${site.ogImage}`;
  const robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  const schema = JSON.stringify(buildSchema(route, seo)).replace(/</g, '\\u003c');

  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}">`,
    seo.keywords ? `<meta name="keywords" content="${esc(seo.keywords)}">` : '',
    `<meta name="author" content="${esc(site.name)}">`,
    `<meta name="robots" content="${robots}">`,
    `<meta name="googlebot" content="${robots}">`,
    `<meta name="referrer" content="strict-origin-when-cross-origin">`,
    `<meta name="geo.region" content="IN-MH">`,
    `<meta name="geo.placename" content="Nalasopara, Maharashtra">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<link rel="alternate" hreflang="en-IN" href="${esc(url)}">`,
    `<link rel="alternate" hreflang="x-default" href="${esc(url)}">`,
    `<meta property="og:locale" content="en_IN">`,
    `<meta property="og:type" content="${seo.article ? 'article' : 'website'}">`,
    `<meta property="og:site_name" content="${esc(site.name)}">`,
    `<meta property="og:title" content="${esc(seo.title)}">`,
    `<meta property="og:description" content="${esc(seo.description)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(image)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(`${site.name} - gas stove and kitchen appliance service`)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(seo.title)}">`,
    `<meta name="twitter:description" content="${esc(seo.description)}">`,
    `<meta name="twitter:image" content="${esc(image)}">`,
    `<script type="application/ld+json">${schema}</script>`,
  ].filter(Boolean).join('\n');
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');

  for (const route of seoRoutes) {
    const seo = seoMap[route];
    const { html } = render(route);
    const head = buildHead(route, seo);

    const output = template
      .replace('</head>', `${head}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const directory = route === '/' ? dist : path.join(dist, route.slice(1));
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, 'index.html'), output, 'utf8');
  }
} finally {
  await server.close();
}

console.log(`Prerendered ${seoRoutes.length} SEO routes.`);
