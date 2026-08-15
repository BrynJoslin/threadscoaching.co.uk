# Current Wix URL inventory

Baseline captured: 2026-08-15 (Europe/London)

Canonical live origin: `https://www.threadscoaching.co.uk`.

The current `https://threadscoaching.co.uk/` apex redirects to the `www` host. The current sitemap is a Wix sitemap index whose pages child sitemap lists the eleven content URLs below. The member-profile child sitemap is empty.

## Content URLs

| Current URL | Status | Current title | Meta description | Canonical | Current headings / purpose | Planned outcome |
|---|---:|---|---|---|---|---|
| `/` | 200 | `Threads Coaching \| leadership development` | Present; long first-person life, leadership and Christian coaching description | `https://www.threadscoaching.co.uk` | Blank H1 elements; H2 “Hello there!” and “approach”. Home, coach biographies, services, testimonials and contact. | Keep `/`; rewrite. |
| `/more-about-me` | 200 | `More About Me \| Threads Coaching` | None | Self-canonical | H1 “ABOUT ME”; H2 “Passionate About Inspiring Others”, “Certifications”, “Qualifications”. Untouched Wix template filler. | 301 to `/about`; preserve no body copy. |
| `/feed` | 200 | `Feed \| Threads Coaching` | None | Self-canonical | H1 “BLOG FEED”; empty “Check back soon” state. | 410 Gone. |
| `/contact` | 200 | `Contact \| Threads Coaching` | None | Self-canonical | No meaningful H1. “Let’s chat”, telephone, email and Wix form. | Keep `/contact`; replace with accessible placeholder form and correct links. |
| `/s-projects-side-by-side` | 200 | `Body Soul Spirit Reset \| Threads Coaching` | None | Self-canonical | Two H1s: “Body Soul spirit-reset” and “Free ebook”. Whole-person coaching and resource offer. | 301 to `/body-soul-spirit-reset`; preserve substantive proposition. |
| `/events-page` | 200 | `Events Page \| Threads Coaching` | None | Self-canonical | No meaningful content beyond global furniture. | 410 Gone. |
| `/public-speaking` | 200 | `Public Speaking \| Threads Coaching` | Present | Self-canonical | No H1; H2 “Speaking & Preaching”; H3 “Communicating for Change”. Joy’s speaking/preaching offer. | Keep `/public-speaking`; rewrite. |
| `/team-workshops` | 200 | `Team workshops \| Threads Coaching` | None | Self-canonical | No H1; H2 “Team workshops”, “Workshop options”. Three team offers. | Keep `/team-workshops`; rewrite. |
| `/my-approach` | 200 | `Our Approach \| Threads Coaching` | Present | Self-canonical | Two H1s: “Joy’s approach” and “Paul’s approach”. Coach approach and authority. | 301 to `/about`; preserve substantive content. |
| `/one-to-one-sessions` | 200 | `One - to - One Sessions \| Threads Coaching` | Present | Self-canonical | H1 “one-to-one sessions with Joy”. Individual coaching. | Keep `/one-to-one-sessions`; rewrite. |
| `/personality-discover-develop` | 200 | `Personality - Discover & Develop \| Threads Coaching` | Present | Self-canonical | No H1; H2 “You are marvellously made”, “discover”, “develop”. Personality service. | Keep `/personality-discover-develop`; rewrite. |

## Operational sitemap URLs

| Current URL | Status | Current role | Planned outcome |
|---|---:|---|---|
| `/sitemap.xml` | 200 | Wix sitemap index | Keep the URL; replace with the production-aware canonical sitemap. |
| `/pages-sitemap.xml` | 200 | Wix pages child sitemap | 410 Gone. |
| `/member-profile_p_first-chunk-sitemap.xml` | 200 | Empty Wix member sitemap | 410 Gone. |

## Current internal navigation

The visible header/footer link to `/`, `/my-approach`, `/s-projects-side-by-side`, `/one-to-one-sessions`, `/personality-discover-develop`, `/team-workshops`, `/public-speaking`, and `/contact`. The sitemap-only `/more-about-me`, `/feed`, and `/events-page` are not meaningful navigation destinations.

## Migration rule

Every content URL above has exactly one intended outcome: keep, direct 301 to a relevant equivalent, or 410. Do not redirect `/feed` or `/events-page` to the homepage. Add explicit slash-variant handling when redirects are implemented.
