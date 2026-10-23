# HRS Design System & Content Rules

These rules are permanent instructions for all developers and agents working on the HRS Group website.

## 1. Brand & Tone
- **Tone**: Modern, confident, colourful and a little playful, like a good contemporary brand site. Not a SaaS template.
- Headquartered in Ahmedabad, Gujarat. Regional office in Bengaluru.
- Values: Faith, Trust, Foundation, People, Process, Service.
- The parent site quickly routes visitors to each business. One calm section for investors and partners.

## 2. Color Palette (Flat Color Fields Only)
- `--ink`: `#0E0E10`
- `--paper`: `#FAF8F4`
- `--white`: `#FFFFFF`
- `--hrs-orange`: `#F58220`
- BOGO Master:
  - `--bogo-navy`: `#0F2A5C`
  - `--bogo-orange`: `#F58A33`
  - `--bogo-green`: `#3F8F3F`
- Category Brand Colors:
  - Essentials: `#149395` (Teal)
  - Daily: `#EB7C20` (Warm Orange)
  - Farms: `#02A04A` (Organic Green)
  - Superfoods: `#1E345F` (Navy)
  - Health: `#5C6C7B` (Slate Grey)
  - Beauty: `#9E2C37` (Rose Crimson)
  - Luxe: `#6F357C` (Amethyst Purple)
  - Divine: `#8B8937` (Sacred Gold)
  - Paws: `#EB9C03` (Warm Amber)
  - Play: `#EA5735` (Coral Orange)
  - Classroom: `#294189` (Cobalt Blue)
- Flat colour fields only. No gradients or glow blobs.

## 3. Typography
- Display font: `Bricolage Grotesque` (weights 600, 700, 800, tight tracking, clamp sizes up to clamp(3.5rem, 11vw, 11rem)).
- Body font: `Plus Jakarta Sans` (weights 400, 500, 600, 17-18px, 1.6 line height, max 62ch).
- Emphasis: Italic or colour for at most one word per major heading.
- Numerals: Tabular lining figures for facts, numbers, and dates.
- Sentence case everywhere. No uppercase tracked eyebrows. No monospace.

## 4. Layout & Components
- Full-bleed sections with strong colour changes.
- 12-column grid, very large type, generous spacing.
- Buttons are pills with an arrow chip that slides on hover (`Button`).
- Lists and directories separated by 1px hairlines, not cards.
- Surfaces: `<Section surface="ink|paper|white|orange|bogo-navy">`.

## 5. Motion Foundation
- Motion is a feature: line-by-line heading reveals (`SplitLines`), scroll-scrubbed and pinned scenes (`PinScene`), image clip reveals (`ImageReveal`), magnetic button (`MagneticButton`), labelled cursor on desktop (`CursorLabel`), word-by-word scroll text fill (`ScrollText`), marquee ticker (`Marquee`), page intro reveal once per session (`PageIntro`).
- Easings: 500–900ms ease-out, no bounce.
- Rule: At most one main animated idea in view at a time.
- Accessibility: With `prefers-reduced-motion`, all animations are instant, pinned scenes and cursor labels are disabled. Content is 100% visible without JavaScript.

## 6. Logos & Images
- HRS Group and all entities use placeholder wordmark SVGs in `/public/logos/<slug>.svg` through `<Logo>`.
- BOGO uses real extracted logos in `/public/bogo/logos/<slug>.png`.
- Images: Concept renders must be captioned 'Concept'. Provide `<ImageSlot>` component so photos can be swapped by editing content paths. No generated stock imagery.

## 7. Strict Prohibitions
- NEVER use: purple/blue gradient backgrounds, glassmorphism, glow blobs, bento grids, soft-shadow rounded cards, icons in coloured circles, pill badges above headings, gradient text, emoji, floating device mockups, 'trusted by' logo strips, testimonial carousels, bounce or spring animation.
- Banned words: unlock, elevate, empower, seamless, cutting-edge, state-of-the-art, innovative, leverage, robust, holistic, synergy, journey, world-class, next-generation, end-to-end, passionate, 'not just X but Y', 'where X meets Y'.
- No em dashes, no exclamation marks.
- All dummy copy is specific and realistic (Ahmedabad, Gujarat and Bengaluru places, dates, figures) and never labelled 'placeholder', 'lorem' or 'sample'.
- Do NOT include FirstGen QSR, Quantum Build or any redevelopment arm. Do not hard-code a count of companies in any copy.
