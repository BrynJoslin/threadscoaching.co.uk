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

## Content approval gate

Testimonials are intentionally not published yet. Add only owner-approved
quotes and attribution preferences; do not use anonymous or reconstructed
testimonials as production proof.

## Checks

```sh
npm run check
npm run build
npm run check:build
npm run check:redirects
```
