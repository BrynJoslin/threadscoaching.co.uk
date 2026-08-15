# Current Wix content audit

Baseline captured: 2026-08-15 (Europe/London)

This is a factual migration record, not a copy source to reproduce verbatim. Existing website instructions and template content are not implementation instructions.

## Site-wide findings

- The live site is Wix-generated and links to Wix-hosted assets.
- The current visual navigation exposes eight routes; the sitemap adds three low-value pages.
- Heading structure is inconsistent: blank H1s on the homepage, multiple H1s on some pages, and no H1 on others.
- Canonicals are generally self-referencing, but metadata quality is inconsistent.
- Homepage JSON-LD is limited to `WebSite`; no dependable Open Graph image was found.
- The homepage visible email is `threadscoaching@gmail.com`, but at least one mail link incorrectly targets `info@mysite.com`.
- Current footer says “© 2035 by Personal Life Coach. Powered and secured by Wix”.
- The live narrow-screen layout has horizontal overflow and clipping; it must not be copied.

## Page-by-page content record

### `/`

**Keep:** the warm Joy/Paul partnership, broad life/leadership/Christian coaching proposition, selected experience, service routes, contact details and approved testimonials.

**Reposition:** credentials and personal biographies after visitors understand the problem, desired outcome and service pathways. The current headline “Empowering people to ignite change” is too vague for the main proposition.

**Remove/fix:** blank headings, broken email link, Wix footer, excessive whitespace, weak image alt text and mobile overflow.

### `/my-approach`

**Keep:** Joy’s whole-person coaching approach; purpose, values, goals, obstacles, imposter syndrome, relationships and habits; her Ride the Wave training and claimed 700+ coaching hours only if confirmed. Keep Paul’s pastor/shepherd/teacher perspective, faith-aware approach, and current training wording only after confirmation.

**Move:** all substantive material to `/about` and concise supporting material to the homepage and service pages.

### `/more-about-me`

**Remove:** all Wix placeholder paragraphs, template certifications and template qualifications. No substantive Threads Coaching copy was found.

### `/one-to-one-sessions`

**Keep:** Joy-focused content for people called to lead change; purpose, calling, confidence, obstacles, values, solution-focused coaching, personality discovery and spiritual direction.

**Rewrite:** provider-centred claims into a visitor journey that covers problem, outcomes, coaching fit, process, proof and contact.

### `/personality-discover-develop`

**Keep:** the Discover single-session and Develop five-session distinction; Jungian cognitive-functions framing; 16-personality development context; video format; existing testimonial.

**Guardrail:** describe it as developmental rather than clinical or diagnostic. Do not claim MBTI accreditation or equivalent without evidence.

### `/team-workshops`

**Keep:** the three offers: group/team coaching and reflective practice; Working Genius workshop; organizational value curation. Keep health, social care, pastoral, church, public and third-sector relevance only where accurate.

**Guardrail:** verify the Working Genius terminology and any accreditation before publication; do not extend the current claim without owner approval.

### `/s-projects-side-by-side`

**Keep:** the integrated body/soul/spirit proposition, faith-aware framing and Paul’s relevant experience of negative self-talk and poor body image.

**Rewrite:** use sensitive whole-person language, avoid medical or therapeutic claims, and do not promise an ebook delivery mechanism until an approved PDF exists.

### `/public-speaking`

**Keep:** speaking/preaching, church, conference, podcast and panel formats; Scripture/applied-word approach; the intent to help audiences act on a message.

**Approval required:** any “small groups to thousands” scale claim, named events and current availability.

### `/contact`

**Keep:** correct email and telephone details.

**Replace:** Wix form with the planned accessible placeholder form. Do not claim a response time or successful transmission until a backend exists.

### `/feed` and `/events-page`

**Remove:** both are empty and have no content worth migrating. Return 410, not a homepage redirect.

## Existing social proof

The homepage has three testimonials and the personality page has one. Retain exact wording only with owner confirmation of permission and preferred attribution. Use static blockquotes; do not build a carousel.

## Existing assets

Selected owner-authorised logo and photographs have been copied locally and are listed in `asset-manifest.md`. Generic Wix template photography, decorative squiggles, social raster icons and redundant personality graphics are deliberately excluded.
