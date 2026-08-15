# Post-launch monitoring log

Use this log for Task 25. Keep Wix active until the 14-day stability gate has passed and the owner explicitly approves cancellation.

Launch date/time: `__________________`
Production deployment: `__________________`
Last known-good deployment: `__________________`

## Immediately after cutover

- [ ] Submit `https://www.threadscoaching.co.uk/sitemap.xml` in Google Search Console.
- [ ] Inspect the homepage and priority service pages in Search Console: `/one-to-one-sessions`, `/personality-discover-develop`, `/team-workshops`, `/body-soul-spirit-reset`, `/public-speaking`, `/about` and `/contact`.
- [ ] Do not use Search Console’s change-of-address tool: the domain is unchanged.
- [ ] Verify canonical `www`, DNS, Universal SSL, Full (strict), one-hop apex/HTTP redirects, robots, sitemap, canonical tags, schema, 301s, 410s, 404 and priority pages.
- [ ] Check the phase-one contact form does not send, and that email/telephone alternatives work.
- [ ] Record any broken link, unexpected status, indexing concern or user-reported issue below.

## Reusable response checks

```sh
SITE_ORIGIN='https://www.threadscoaching.co.uk'
curl -sSI "$SITE_ORIGIN/"
curl -sS "$SITE_ORIGIN/robots.txt"
curl -sS "$SITE_ORIGIN/sitemap.xml"
curl -sSIL --max-redirs 1 "$SITE_ORIGIN/my-approach"
curl -sSIL --max-redirs 1 "$SITE_ORIGIN/s-projects-side-by-side"
curl -sSIL --max-redirs 1 "$SITE_ORIGIN/more-about-me"
curl -sSI "$SITE_ORIGIN/feed"
curl -sSI "$SITE_ORIGIN/events-page"
```

Expected: canonical pages 200; each moved page one 301 to its relevant replacement; removed pages 410; production robots permits crawling and names the canonical sitemap; sitemap is 200 XML.

## Monitoring checkpoints

| Checkpoint | Date | Search Console: sitemap/inspection/indexing | Cloudflare: deployment/requests/errors | Redirect, 404 and 410 observations | Performance/enquiry feedback | Action owner and due date | Complete |
|---|---|---|---|---|---|---|---|
| Day 1 | | | | | | | [ ] |
| Day 7 | | | | | | | [ ] |
| Day 14 | | | | | | | [ ] |
| Day 30 | | | | | | | [ ] |

At each checkpoint:

- [ ] Re-run the response checks above and inspect priority pages in Search Console.
- [ ] Review redirected old URLs, unexpected 404s and 410s; investigate each unexpected 404 individually.
- [ ] Compare indexed URLs with `docs/migration/current-url-inventory.md` and the intended canonical public pages.
- [ ] Review Cloudflare request/deployment information and any owner-reported enquiry issues.
- [ ] Keep all legitimate 301 redirects permanently.
- [ ] Preserve rollback materials throughout the stabilization period.

## Day 14 stability gate

- [ ] At least 14 stable days have elapsed.
- [ ] No important old URL, backlink or priority page has been lost.
- [ ] Redirects, 410s, indexing, SSL/DNS and performance are stable.
- [ ] The final Wix archive and all rollback materials are preserved.
- [ ] Owner has explicitly approved Wix cancellation.

Wix cancellation decision: [ ] Keep active  [ ] Cancel approved

Owner approval/date: `________________________________________________________`

## Day 30 review

- [ ] Compare indexed URLs with the intended inventory and resolve discrepancies.
- [ ] Review old URLs receiving traffic or backlinks and retain relevant redirects.
- [ ] Decide whether Cloudflare Web Analytics is genuinely useful. Do not add it unless evidence supports the need; if enabled later, use production only and update the privacy notice after reviewing the actual UK configuration.
- [ ] Record any permanent operational follow-up below.

## Incident and rollback log

| Date/time | Symptom and impact | Response | Deployment/DNS action | Verification | Owner |
|---|---|---|---|---|---|
| | | | | | |

For a defective deployment, restore the last known-good Cloudflare Pages deployment without changing DNS, confirm `SITE_ENV=production`, then rerun robots, canonical, redirect, 410 and priority-page checks. Return to Wix only for a critical whole-migration failure; restore the recorded Wix DNS configuration while preserving mail and verification records, and ensure previews remain noindexed.
