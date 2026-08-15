import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gonePaths, redirects } from '../src/data/redirects.ts';
import { pages } from '../src/data/pages.ts';

const failures = [];
const fail = (message) => failures.push(message);
const redirectsFile = await readFile(resolve('public/_redirects'), 'utf8');
const routes = JSON.parse(await readFile(resolve('public/_routes.json'), 'utf8'));

const rules = redirectsFile
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const [from, to, status] = line.split(/\s+/);
    return { from, to, status };
  });

const bySource = new Map();
for (const rule of rules) {
  if (!rule.from || !rule.to || !rule.status) fail(`Malformed redirect rule: ${JSON.stringify(rule)}`);
  if (bySource.has(rule.from)) fail(`Duplicate redirect source: ${rule.from}`);
  bySource.set(rule.from, rule);
  if (rule.status !== '301') fail(`${rule.from} must be a 301 redirect`);
  if (rule.from === rule.to) fail(`Self-redirect: ${rule.from}`);
}

const realPages = new Set(pages.map((page) => page.path));
for (const rule of rules) {
  if (!realPages.has(rule.to)) fail(`Redirect destination is not a site page: ${rule.from} -> ${rule.to}`);
  const visited = new Set([rule.from]);
  let next = rule.to;
  while (bySource.has(next)) {
    if (visited.has(next)) {
      fail(`Redirect loop detected from ${rule.from}`);
      break;
    }
    visited.add(next);
    next = bySource.get(next).to;
  }
  if (next !== rule.to) fail(`Redirect chain detected: ${rule.from} -> ${rule.to} -> ${next}`);
}

for (const redirect of redirects) {
  for (const from of [redirect.from, `${redirect.from}/`]) {
    const rule = bySource.get(from);
    if (!rule || rule.to !== redirect.to || rule.status !== String(redirect.status)) {
      fail(`Migration redirect missing or incorrect: ${from} -> ${redirect.to} ${redirect.status}`);
    }
  }
}

const expectedSlashPaths = pages.filter((page) => page.path !== '/').map((page) => page.path);
for (const path of expectedSlashPaths) {
  const rule = bySource.get(`${path}/`);
  if (!rule || rule.to !== path || rule.status !== '301') fail(`Missing trailing-slash redirect: ${path}/ -> ${path}`);
}

const functionGonePaths = new Set([
  '/feed',
  '/feed/',
  '/events-page',
  '/events-page/',
  '/pages-sitemap.xml',
  '/member-profile_p_first-chunk-sitemap.xml',
]);
for (const path of functionGonePaths) {
  if (bySource.has(path)) fail(`Gone URL must not have a redirect rule: ${path}`);
  if (!routes.include?.includes(path)) fail(`Gone URL is not routed to the 410 Function: ${path}`);
}
for (const path of routes.include ?? []) {
  if (!functionGonePaths.has(path)) fail(`Function route is not an approved gone URL: ${path}`);
}

for (const path of gonePaths) {
  if (!functionGonePaths.has(path)) fail(`Migration registry contains an unhandled gone URL: ${path}`);
}

if (failures.length) {
  console.error(`Redirect validation failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log('Redirect validation passed.');
