# Asset manifest

Captured: 2026-08-15 (Europe/London)

The owners authorised downloading the logo and photographs exposed on the live Wix frontend. These are original Wix media endpoints, retained as source masters for the new site. Delivery optimisation (AVIF/WebP derivatives, metadata stripping and responsive sizing) belongs to the Astro implementation phase.

| Local path | Source URL | Format and dimensions | Intended use | Alt-text intent |
|---|---|---|---|---|
| `src/assets/brand/threads-coaching-logo.png` | `https://static.wixstatic.com/media/d64c29_33acf94129b04c6a803320fc6f53b56c~mv2.png` | PNG, 1060 × 1081, RGBA | Header/footer logo and source for favicon work | Brand mark; use `alt="Threads Coaching"` when it is the home link, otherwise decorative where adjacent branded text already identifies it. |
| `src/assets/people/joy-and-paul.jpg` | `https://static.wixstatic.com/media/d64c29_fb0deb0cc74f41cdb037b4b1aec27f6b~mv2.jpg` | JPEG, 3088 × 2320 | Homepage hero | “Joy and Paul Blundell of Threads Coaching” where the image contributes context. |
| `src/assets/people/joy-portrait.jpeg` | `https://static.wixstatic.com/media/d64c29_3adc2eb9210b4b3f81e8fd8baec36967~mv2.jpeg` | JPEG, 927 × 927 | Joy biography on homepage/about | “Joy Blundell, life and leadership coach” where not repeated by adjacent text. |
| `src/assets/people/paul-portrait.jpg` | `https://static.wixstatic.com/media/d64c29_97370043b18e416899ead932e9a993f9~mv2.jpg` | JPEG, 3456 × 5184 | Paul biography on homepage/about | “Paul Blundell of Threads Coaching” where not repeated by adjacent text. |
| `src/assets/people/joy-speaking.jpg` | `https://static.wixstatic.com/media/d64c29_ad0a6d9a1ad343698f013aeffc5e6711~mv2.jpg` | JPEG, 973 × 1032 | Speaking/preaching page | “Joy Blundell speaking” if it illustrates the service. |
| `src/assets/people/joy-professional-wide.jpg` | `https://static.wixstatic.com/media/d64c29_f02f8e9e24ac4895be8fecd18152c8e2~mv2.jpg` | JPEG, 6319 × 4213 | About-page feature image if composition is useful | “Joy Blundell” only when the surrounding copy does not already identify her. |
| `src/assets/people/joy-one-to-one.jpg` | `https://static.wixstatic.com/media/d64c29_111282777ce741c0be928e9c458136b3~mv2.jpg` | JPEG, 2880 × 1488 | One-to-one coaching service page | “Joy Blundell in a coaching conversation” only if visible image context supports that statement; otherwise use a more literal owner-approved description. |
| `src/assets/people/joy-contact.jpg` | `https://static.wixstatic.com/media/d64c29_829694d76aa144ba8feadd7b46f45e00~mv2.jpg` | JPEG, 6319 × 4213 | Optional contact-page image | Use only if meaningful; otherwise omit or make decorative. |
| `src/assets/services/body-soul-spirit-cover.png` | `https://static.wixstatic.com/media/d64c29_c62582528a194a86b165d8213a777555~mv2.png` | PNG, 840 × 998, RGBA | Body Soul Spirit Reset page/resource cover | Describe visible resource cover only if it conveys the downloadable resource; otherwise decorative. |
| `src/assets/services/body-soul-spirit-texture.jpg` | `https://static.wixstatic.com/media/d64c29_639a7a9a9ae146879c3802749ffc1e86~mv2.jpg` | JPEG, 370 × 998 | Optional Body Soul Spirit Reset supporting texture | Decorative: `alt=""`. |

## Excluded assets

- Generic Wix template photography (`ea71bb_*`, `84770f_*`).
- Decorative squiggles and social raster icons.
- Repeated Wix-generated image renditions.
- Personality graphics unless a later design review determines that one has clear informational value.

## Verification record

- All ten files were retrieved directly from `static.wixstatic.com/media/<asset-id>` without Wix resize transforms.
- `file` and macOS image inspection confirmed the stated format and pixel dimensions.
- No image was modified, re-encoded, cropped, or stripped during this task; these are retained masters.
