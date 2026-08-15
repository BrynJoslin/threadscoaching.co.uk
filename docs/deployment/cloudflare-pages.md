# Cloudflare Pages deployment runbook

This runbook covers Tasks 22 and 24. It is an operator checklist, not an automated deployment script.

## Fixed deployment values

| Setting | Required value |
|---|---|
| GitHub repository | `threadscoaching.co.uk` (private) |
| Cloudflare Pages project | `threads-coaching` |
| Framework preset | Astro |
| Root directory | repository root |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Production variable | `SITE_ENV=production` |
| Preview variable | `SITE_ENV=preview` |
| Canonical origin | `https://www.threadscoaching.co.uk` |

Do not attach a production custom domain to a preview deployment. Do not install an Astro Cloudflare adapter: this is a static Astro deployment.

## Task 22 — preview deployment

### Configure

- [ ] In GitHub, create or confirm the private repository named `threadscoaching.co.uk`.
- [ ] Connect that repository to a new Cloudflare Pages project named `threads-coaching`.
- [ ] Set the framework preset to Astro, root directory to the repository root, build command to `npm run build`, output directory to `dist`, and production branch to `main`.
- [ ] Set the Pages preview environment variable `SITE_ENV=preview`.
- [ ] Confirm the production environment variable is separately set to `SITE_ENV=production`; never use the production value for preview builds.
- [ ] Deploy a non-`main` branch and record its project and hash preview URLs below.
- [ ] Protect preview deployments with Cloudflare Access where practical.
- [ ] Do not attach `www.threadscoaching.co.uk` or `threadscoaching.co.uk` at this stage.

Project preview URL: `______________________________`

Hash preview URL: `______________________________`

Deployment/commit: `______________________________`

### Verify preview indexing protections

Set `PREVIEW_URL` to one preview hostname, without a trailing slash, then run:

```sh
PREVIEW_URL='https://replace-with-preview-host'
curl -sSI "$PREVIEW_URL/"
curl -sS "$PREVIEW_URL/" | rg -i 'robots|canonical|og:url'
curl -sS "$PREVIEW_URL/robots.txt"
curl -sS "$PREVIEW_URL/sitemap.xml"
```

- [ ] The HTML has `noindex,nofollow,noarchive` and no production canonical or `og:url`.
- [ ] `/robots.txt` disallows all crawling.
- [ ] `/sitemap.xml` is a valid empty `urlset`.
- [ ] The response has `X-Robots-Tag: noindex, nofollow, noarchive`.
- [ ] Repeat the checks for both the project preview hostname and the hash preview hostname.
- [ ] Complete the preview browser, accessibility and performance checks recorded in `docs/migration/prelaunch-report.md`.

## Task 24 — production cutover

### 24–48 hours before cutover

- [ ] Export and archive the current DNS zone records, including mail and domain-verification records.
- [ ] Lower only relevant DNS TTLs to approximately 300 seconds.
- [ ] Confirm no registrar transfer will occur during the hosting cutover.
- [ ] Keep Wix access, subscription, DNS details, form/email automation details, ebook delivery details, Search Console verification and final crawl archive available.
- [ ] Confirm `docs/migration/prelaunch-report.md` is complete and approved.
- [ ] Identify the last known-good Cloudflare Pages deployment for rollback: `______________________________`.

### Deploy and route

- [ ] Merge the final approved commit to `main`.
- [ ] Confirm the Pages production environment has `SITE_ENV=production` and preview has `SITE_ENV=preview`.
- [ ] Wait for the `main` deployment to succeed and inspect it on its Pages production hostname before DNS changes.
- [ ] Attach `www.threadscoaching.co.uk` as the primary custom domain.
- [ ] Attach `threadscoaching.co.uk` (apex) for redirect handling.
- [ ] Enable Universal SSL and set SSL/TLS encryption mode to **Full (strict)**.
- [ ] Enable **Always Use HTTPS**.
- [ ] Create one zone-level 301 redirect covering an apex request or any HTTP request. Its target must be `https://www.threadscoaching.co.uk` with the original path and query preserved.
- [ ] Verify `http://threadscoaching.co.uk/path?source=test` reaches `https://www.threadscoaching.co.uk/path?source=test` in one redirect, not two.
- [ ] Do not enable Rocket Loader or Cloudflare Auto Minify.
- [ ] Do not enable HSTS preload until all subdomains and mail-related dependencies have been audited.

### Production HTTP verification

Set the origin once and run the checks after DNS resolves:

```sh
SITE_ORIGIN='https://www.threadscoaching.co.uk'
curl -sSI "$SITE_ORIGIN/"
curl -sS "$SITE_ORIGIN/robots.txt"
curl -sS "$SITE_ORIGIN/sitemap.xml"
curl -sS "$SITE_ORIGIN/" | rg -i 'canonical|robots|application/ld\+json|og:url'
curl -sSIL --max-redirs 1 'http://threadscoaching.co.uk/one-to-one-sessions?source=test'
curl -sSIL --max-redirs 1 'https://threadscoaching.co.uk/one-to-one-sessions?source=test'
curl -sSIL --max-redirs 1 "$SITE_ORIGIN/my-approach"
curl -sSIL --max-redirs 1 "$SITE_ORIGIN/s-projects-side-by-side"
curl -sSIL --max-redirs 1 "$SITE_ORIGIN/more-about-me"
curl -sSI "$SITE_ORIGIN/feed"
curl -sSI "$SITE_ORIGIN/events-page"
curl -sSI "$SITE_ORIGIN/pages-sitemap.xml"
curl -sSI "$SITE_ORIGIN/member-profile_p_first-chunk-sitemap.xml"
curl -sSI "$SITE_ORIGIN/this-page-does-not-exist"
```

- [ ] Canonical public pages return 200; `/404`/an unknown URL returns 404.
- [ ] Production robots permits crawling and references `https://www.threadscoaching.co.uk/sitemap.xml`.
- [ ] Production sitemap is 200 XML and lists only canonical, indexable 200 pages.
- [ ] Production HTML has self-referencing `www` canonical links, appropriate social metadata and production JSON-LD URLs.
- [ ] `/more-about-me` and `/my-approach` make a single 301 hop to `/about`; `/s-projects-side-by-side` makes a single 301 hop to `/body-soul-spirit-reset`.
- [ ] The redirect equivalents with a trailing slash behave without chains.
- [ ] `/feed`, `/events-page`, `/pages-sitemap.xml`, and `/member-profile_p_first-chunk-sitemap.xml` (and their slash variants where applicable) return 410 with `X-Robots-Tag: noindex, nofollow`.
- [ ] Apex and HTTP requests make one permanent hop to canonical HTTPS `www`, retaining path and query string.
- [ ] The certificate is valid for both custom domains and no mixed-content or CSP errors occur.
- [ ] Check the homepage, every service page, contact, privacy, 404, form non-sending message, email and telephone links in a browser.
- [ ] Run and attach a short production crawl and Lighthouse results.
- [ ] Keep Wix active through the initial 14-day stabilization period.

## Rollback

### Preferred: restore a Cloudflare Pages deployment

Use this when domain and routing are correct but the newest build is defective.

- [ ] In Cloudflare Pages, roll back to the recorded last known-good deployment.
- [ ] Do not change DNS.
- [ ] Confirm the restored production build uses `SITE_ENV=production`.
- [ ] Repeat production robots, canonical, redirect, 410 and priority-page checks.
- [ ] Record the incident and the restored deployment in `docs/migration/post-launch-log.md`.

### Critical: return to Wix

Use this only if the Cloudflare migration is critically defective.

- [ ] Keep Wix active and restore the recorded Wix DNS/custom-domain configuration.
- [ ] Preserve all verification and mail records.
- [ ] Remove or disable the Cloudflare host redirect if it prevents Wix access.
- [ ] Wait for the low DNS TTL to propagate.
- [ ] Verify the Wix canonical homepage and priority service pages are publicly indexable; leave previews noindexed.
- [ ] Diagnose offline and complete the prelaunch checklist before attempting another cutover.

Do not cancel Wix or transfer the registrar during the initial 14-day rollback window.
