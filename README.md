# threadscoaching.co.uk

The static Astro website for Threads Coaching.

## Requirements

- Node 24.18.0 (see `.node-version`)
- npm

## Local development

```sh
npm ci
npm run dev
```

The safe default is preview mode, which emits `noindex` metadata. To inspect
production-only metadata locally, run:

```sh
SITE_ENV=production npm run build
```

Cloudflare Pages must use `SITE_ENV=preview` for preview deployments and
`SITE_ENV=production` only for the production deployment.

## Mock homepage as content authority

The supplied `threads-coaching.html` mock was confirmed on 15 August 2026 as
the source of truth for the site's visual direction, voice, credentials and
three anonymous-attribution coaching testimonials. Those exact testimonials
are published in the no-index review build. Privacy details and the eventual
working enquiry form still require final production approval.

## Checks

```sh
npm run check
npm run build
npm run check:build
npm run check:redirects
```
