import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { indexablePages, pages } from '../src/data/pages.ts';

// This script runs in Node rather than Astro, so it cannot import site.ts (which
// deliberately reads import.meta.env). Keep this assertion aligned with the
// canonical origin configured there.
const productionOrigin = 'https://www.threadscoaching.co.uk';

const dist = resolve('dist');
const isProduction = (process.env.SITE_ENV ?? 'preview') === 'production';
if (!['preview', 'production'].includes(process.env.SITE_ENV ?? 'preview')) {
  throw new Error(`SITE_ENV must be preview or production. Received: ${process.env.SITE_ENV}`);
}
const failures = [];

const fail = (message) => failures.push(message);
const escapeHtml = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const fileForPath = (path) =>
  resolve(dist, path === '/' ? 'index.html' : `${path.slice(1)}.html`);

async function readBuiltPage(path) {
  const filename = fileForPath(path);
  try {
    await access(filename);
    return await readFile(filename, 'utf8');
  } catch {
    fail(`Expected built page is missing: ${path} (${filename})`);
    return '';
  }
}

function countH1(html) {
  return (html.match(/<h1(?:\s|>)/gi) ?? []).length;
}

function localPathFromHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  if (/^(?:https?:)?\/\//i.test(href)) {
    try {
      const url = new URL(href, productionOrigin);
      return url.origin === productionOrigin ? url.pathname : null;
    } catch {
      return null;
    }
  }
  if (!href.startsWith('/')) return null;
  if (href.startsWith('/_astro/')) return null;
  return href.split(/[?#]/, 1)[0];
}

const htmlByPath = new Map();
for (const page of pages) htmlByPath.set(page.path, await readBuiltPage(page.path));
const notFound = await readBuiltPage('/404');

for (const page of indexablePages) {
  const html = htmlByPath.get(page.path) ?? '';
  if (!html) continue;
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(`${page.path} has no title`);
  if (!html.includes(`<title>${escapeHtml(page.title)}</title>`)) fail(`${page.path} title does not match the page registry`);
  if (!/<meta\s+name=["']description["'][^>]*content=["'][^"']+|<meta\s+content=["'][^"']+["'][^>]*name=["']description["']/i.test(html)) {
    fail(`${page.path} has no meta description`);
  }
  if (!html.includes(`name="description" content="${escapeHtml(page.description)}"`)) fail(`${page.path} description does not match the page registry`);
  if (countH1(html) !== 1) fail(`${page.path} must have exactly one H1`);

  if (isProduction) {
    const canonical = `${productionOrigin}${page.path === '/' ? '/' : page.path}`;
    if (!html.includes(`rel="canonical" href="${canonical}"`)) fail(`${page.path} has no production canonical`);
    for (const property of ['og:title', 'og:description', 'og:image', 'og:url']) {
      if (!new RegExp(`(?:property|name)=["']${property}["']`, 'i').test(html)) fail(`${page.path} is missing ${property}`);
    }
    if (/name=["']robots["'][^>]*noindex|noindex[^>]*name=["']robots["']/i.test(html)) fail(`${page.path} is incorrectly noindexed in production`);
  } else {
    if (/rel=["']canonical["']/i.test(html)) fail(`${page.path} exposes a canonical in preview`);
    if (!(/name=["']robots["'][^>]*noindex|noindex[^>]*name=["']robots["']/i.test(html))) fail(`${page.path} is not noindexed in preview`);
    if (/(?:property|name)=["']og:url["']/i.test(html)) fail(`${page.path} exposes og:url in preview`);
    if (html.includes(productionOrigin)) fail(`${page.path} exposes the production origin in preview`);
  }
}

for (const path of ['/privacy', '/404']) {
  const html = path === '/404' ? notFound : htmlByPath.get(path) ?? '';
  if (html && !(/name=["']robots["'][^>]*noindex|noindex[^>]*name=["']robots["']/i.test(html))) {
    fail(`${path} must be noindexed`);
  }
}

for (const [path, html] of htmlByPath) {
  if (!html) continue;
  for (const match of html.matchAll(/\shref=["']([^"']+)["']/gi)) {
    const destination = localPathFromHref(match[1]);
    if (!destination || destination === '/') continue;
    const normalised = destination.replace(/\/$/, '') || '/';
    // Built CSS, JavaScript and image assets are valid local links but are not
    // generated HTML routes.
    if (normalised.startsWith('/_astro/')) continue;
    if (/\.[a-z0-9]+$/i.test(normalised)) {
      try {
        await access(resolve(dist, normalised.slice(1)));
      } catch {
        fail(`${path} links to a missing built asset: ${match[1]}`);
      }
      continue;
    }
    if (!htmlByPath.has(normalised) && normalised !== '/404') fail(`${path} links to a missing internal page: ${match[1]}`);
  }
}

const allHtml = [...htmlByPath.values(), notFound].join('\n');
for (const forbidden of ['wixstatic.com', 'info@mysite.com', 'http://']) {
  if (allHtml.includes(forbidden)) fail(`Built HTML contains forbidden value: ${forbidden}`);
}

// Social metadata must reference an actual deployed asset in production.
if (isProduction) {
  try {
    await access(resolve(dist, 'og/default.jpg'));
  } catch {
    fail('Missing production social image: /og/default.jpg');
  }
}

let robots = '';
let sitemap = '';
try { robots = await readFile(resolve(dist, 'robots.txt'), 'utf8'); } catch { fail('Missing built robots.txt'); }
try { sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8'); } catch { fail('Missing built sitemap.xml'); }

if (isProduction) {
  if (!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`) || !robots.includes('Allow: /')) fail('Production robots.txt is incorrect');
  for (const page of indexablePages) {
    const expectedUrl = new URL(page.path, productionOrigin).toString();
    if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) fail(`Sitemap is missing ${page.path}`);
  }
  for (const excluded of ['/privacy', '/404', '/feed', '/events-page']) {
    if (sitemap.includes(`${productionOrigin}${excluded}`)) fail(`Sitemap includes excluded path: ${excluded}`);
  }
} else {
  if (robots.trim() !== 'User-agent: *\nDisallow: /') fail('Preview robots.txt must disallow all crawling');
  if (/<url>/i.test(sitemap)) fail('Preview sitemap must be empty');
  if (sitemap.includes(productionOrigin)) fail('Preview sitemap exposes the production origin');
}

if (failures.length) {
  console.error(`Build validation failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Build validation passed (${isProduction ? 'production' : 'preview'} mode).`);
