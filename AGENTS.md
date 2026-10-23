# HRS Group Coding Guidelines & Workspace Rules

This file guides agents and developers working on the official parent website for HRS Group.
For comprehensive specifications, also see `.agents/rules/hrs-design-and-content.md` and `docs/BRIEF.md`.

## Core Directives
1. **Design System**: Modern, confident, colourful and a little playful, like a good contemporary brand site. Not a SaaS template. Flat colour fields only.
2. **Surfaces**:
   - `<Section surface="ink|paper|white|orange|bogo-navy">`: Full-bleed sections with strong colour changes.
3. **Tokens**:
   - `--ink: #0E0E10`
   - `--paper: #FAF8F4`
   - `--white: #FFFFFF`
   - `--hrs-orange: #F58220`
   - BOGO: `--bogo-navy: #0F2A5C`, `--bogo-orange: #F58A33`, `--bogo-green: #3F8F3F`, plus sampled category colours.
4. **Typography**:
   - Display: `Bricolage Grotesque` (weights 600–800, tight tracking, clamp sizes up to clamp(3.5rem, 11vw, 11rem)).
   - Body & Interface: `Plus Jakarta Sans` (weights 400–600, 17–18px, 1.6 line height, max 62ch).
   - Emphasis: At most ONE italic word or colour emphasis per major heading.
   - Sentence case everywhere. No uppercase tracked eyebrows. No monospace. Tabular numerals for figures.
5. **Motion Tokens & Primitives** (`/src/components/motion/`):
   - 500–900ms ease-out, no bounce.
   - At most ONE main animated idea in view at a time.
   - Primitives: `SmoothScroll` (Lenis), `SplitLines`, `Reveal`, `ImageReveal` (clip-path), `PinScene` (GSAP pinned with StrictMode cleanup), `MagneticButton`, `CursorLabel`, `ScrollText`, `Marquee`, `PageIntro`.
   - With `prefers-reduced-motion`: instant reveals, no parallax, no cursor previews, no scroll scrubbing.
   - With JS disabled: 100% of content immediately visible.
6. **Layout**:
   - 12-column grid, max-w-[1280px], full-bleed sections.
   - Buttons are pills with an arrow chip that slides on hover.
   - Lists separated by 1px hairlines, NOT cards.
   - NEVER use: purple/blue gradient backgrounds, glassmorphism, glow blobs, bento grids, soft-shadow rounded cards, icons in coloured circles, pill badges above headings, gradient text, emoji, floating device mockups, 'trusted by' logo strips, testimonial carousels, bounce or spring animation.
7. **Content**:
   - All copy strictly stored in `/src/content/*.ts`. Never hardcode strings in components.
   - Realistic, specific Ahmedabad, Gujarat and Bengaluru details. Never use 'lorem ipsum', 'placeholder', 'TBD', or 'sample'.
   - Tone: Plain, specific, no slogans for headings where a statement will do.
   - Banned words: unlock, elevate, empower, seamless, cutting-edge, state-of-the-art, innovative, leverage, robust, holistic, synergy, journey, world-class, next-generation, end-to-end, passionate, 'not just X but Y', 'where X meets Y'. No em dashes, no exclamation marks.
8. **Entities**:
   - Built Environment: Hrishikesh Ventures, HRS Aluglaze Ltd, Geotrix Pvt. Ltd., School of Facade Technologies.
   - Retail: BOGO.
   - Food and Consumer: Hrishikesh Food Products, Hrishikesh Consumer Products (13 brands: Manpras, Snackshot, Antrah, Basic Essentials, Gush, Daily Pump; upcoming: Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, Raspberry Rhinoceros).
   - Hospitality and Leasing: FirstGen Pvt. Ltd. (FirstGen Assets, FirstGen Hotels [Flight Stays, Amuktamalyada], FirstGen Enterprises [The Bluprint by Builders Cafe, ShubhVista]).
   - Services: Indian Brand House.
   - DO NOT include FirstGen QSR, Quantum Build or any redevelopment arm. Do not hard-code a count of companies in any copy.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
