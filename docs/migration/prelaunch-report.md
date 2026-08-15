# Pre-launch migration report

Complete this report before production cutover (Task 23). Every unchecked critical item blocks launch.

Prepared by: `__________________`
Date/time: `__________________`
Approved by owner: `__________________`

## Baseline and external evidence

- [ ] Repeat the live Wix crawl immediately before launch and archive the URL list, status codes, titles, descriptions, canonicals, headings, internal links, structured data, images and selected screenshots.
- [ ] Compare the final Wix crawl with `docs/migration/current-url-inventory.md`; no old URL is unmapped.
- [ ] Export current Google Search Console performance, indexing, external-link and known crawl-error data; record the existing submitted sitemap.
- [ ] Export the complete DNS zone and retain mail, verification, form and ebook-delivery records.
- [ ] Preserve Wix account access, site ID/published configuration, subscription, final sitemap/crawl, selected original images/logo and Search Console verification.
- [ ] Lower only cutover-relevant DNS TTLs to approximately 300 seconds, 24–48 hours before cutover.
- [ ] Confirm no domain-registrar transfer is scheduled during this cutover.

Archive locations / references: `________________________________________________`

## Repository and local production-mode checks

Run from the repository root:

```sh
npm ci
npm run check
SITE_ENV=production npm run build
SITE_ENV=production npm run check:build
npm run check:redirects
npm run preview:cf
```

- [ ] All commands complete successfully.
- [ ] The production-mode local output has title, description, exactly one H1, canonical and social metadata on each indexable page.
- [ ] The output contains no Wix runtime dependency, `wixstatic.com`, `info@mysite.com`, or HTTP asset URL.
- [ ] Internal links resolve; sitemap URLs correspond only to built indexable 200 pages.
- [ ] Privacy, 404 and gone pages are excluded from the sitemap.
- [ ] Redirect and 410 route sets are disjoint; no duplicate rule, loop, self-redirect or chain exists.

## URL and response matrix

For the local production-mode preview and deployed Cloudflare preview, verify each result with redirects disabled and enabled.

| Category | Required result | Local production-mode | Cloudflare preview | Notes/evidence |
|---|---|---|---|---|
| Canonical public pages | 200 | [ ] | [ ] | |
| `/more-about-me` | one 301 to `/about` | [ ] | [ ] | |
| `/my-approach` | one 301 to `/about` | [ ] | [ ] | |
| `/s-projects-side-by-side` | one 301 to `/body-soul-spirit-reset` | [ ] | [ ] | |
| Redirect slash variants | no redirect chain | [ ] | [ ] | |
| `/feed` and `/events-page` | 410, never homepage redirect | [ ] | [ ] | |
| Old Wix sitemap children | 410 | [ ] | [ ] | |
| Unknown URL | 404 | [ ] | [ ] | |
| `/robots.txt` | correct environment response | [ ] | [ ] | |
| `/sitemap.xml` | valid environment response | [ ] | [ ] | |

## Preview noindex gate

Preview URL tested: `______________________________`

- [ ] Preview HTML has `noindex,nofollow,noarchive`.
- [ ] Preview response has `X-Robots-Tag: noindex, nofollow, noarchive`.
- [ ] Preview HTML emits neither a production canonical nor `og:url`.
- [ ] Preview `/robots.txt` disallows crawling.
- [ ] Preview `/sitemap.xml` is a valid empty `urlset`.
- [ ] The checks pass on both project and hash preview hostnames.
- [ ] Cloudflare Access protects previews where practical.

## Content, metadata and schema

- [ ] Every planned public page exists: home, one-to-one sessions, personality, team workshops, Body Soul Spirit Reset, public speaking, about, contact and privacy.
- [ ] Every page has the approved content, correct primary CTA and working internal/footer navigation.
- [ ] All canonical URLs use `https://www.threadscoaching.co.uk`, lowercase extensionless paths and no trailing slash.
- [ ] Production metadata, Open Graph data and JSON-LD use the production origin.
- [ ] Schema is valid in Rich Results Test and Schema.org Validator; no unverified LocalBusiness or FAQ schema is emitted.
- [ ] Images have meaningful alternative text where informative, correct dimensions and no layout shift.
- [ ] Contact exposes working email and telephone links; the phase-one form makes no network request and clearly states that it has not sent anything.

## Manual quality gate

- [ ] Test Chrome, Firefox and Safari desktop; Safari on iOS and Chrome on Android where available.
- [ ] Test widths 320, 375, 768, 1024 and 1440 pixels; test 200% and 400% zoom.
- [ ] Test keyboard-only navigation, focus order, native menu/disclosures, reduced motion, contrast and a screen-reader smoke test.
- [ ] Test valid and invalid contact-placeholder data, error-summary focus, email and telephone links.
- [ ] Test all navigation, footer links, images, 404 and all four 410 paths.
- [ ] Confirm the browser console has no errors or CSP violations.
- [ ] Run Lighthouse mobile and desktop; record any exception to the performance budgets with owner approval.

Lighthouse / accessibility evidence: `________________________________________`

## Launch decision

- [ ] No unmapped old URL remains.
- [ ] No broken internal link, production-indexing leak, critical accessibility issue or critical performance issue remains.
- [ ] DNS and Search Console evidence is archived.
- [ ] Rollback materials and the last known-good Cloudflare deployment are recorded.
- [ ] Owner approves production cutover.

Decision: [ ] Approved to cut over  [ ] Blocked

Blockers and owner: `________________________________________________________`
