# HRS Group Coding Guidelines & Workspace Rules

This file guides agents and developers working on the official parent website for HRS Group.
For comprehensive specifications, also see `.agents/rules/hrs-design-and-content.md` and `docs/BRIEF.md`.

## Core Directives
1. **Design System**: Refined editorial look with confident, smooth motion. Architecture practice or annual report aesthetic. At most one animated idea is in view at a time.
2. **Surfaces**:
   - `<Section surface="white|stone|ink|orange">`: Alternating sequence where no two identical surfaces touch.
   - At most one `ink` section in a row.
   - `orange` surface is used at most once per page as a single deliberate block.
3. **Tokens**:
   - `--white: #FFFFFF`
   - `--paper: #F7F6F3`
   - `--stone: #EDEAE3`
   - `--stone-deep: #DDD8CE`
   - `--ink: #141414`
   - `--ink-deep: #0C0C0C`
   - `--muted: #6B6B66`
   - `--rule: #E6E4DF`
   - `--slot: #ECEAE5`
   - `--orange: #F58220` (accents, focus rings, single deliberate orange block)
   - `--orange-deep: #C2410C` (italic emphasis words on light surfaces, accessible contrast >= 5.3:1)
   - `--orange-wash: #FFF1E3` (row hover tint on light surfaces)
4. **Typography**:
   - Headings: `Newsreader` (regular weight, large, generous leading, optical sizing enabled).
   - Emphasis: At most ONE italic word or phrase per major heading (`Newsreader` italic), set in `var(--orange-deep)` on light surfaces and `var(--orange)` on ink.
   - Body & Interface: `Hanken Grotesk` (17-18px, 1.6 line height, max 62ch).
   - Sentence case everywhere. No uppercase tracked eyebrows. No monospace.
5. **Motion Tokens & Primitives** (`/src/components/motion/`):
   - Easings: `cssEaseOut: cubic-bezier(0.22, 1, 0.36, 1)`, `cssEaseInOut: cubic-bezier(0.65, 0, 0.35, 1)`.
   - Durations: Fast 200ms, Base 500ms, Slow 800ms, Cinematic 1200ms.
   - Primitives: `SmoothScroll`, `Reveal`, `SplitHeading`, `ImageReveal`, `FillButton`, `LineLink`, `ReadingProgress`.
   - With `prefers-reduced-motion`: instant reveals, no parallax, no cursor previews, no scroll scrubbing.
   - With JS disabled: 100% of content immediately visible via `isHydrated` checks.
6. **Layout**:
   - 12-column grid, max-w-[1280px], asymmetric left-aligned.
   - Lists separated by 1px hairlines (`border-b border-[var(--rule)]`), NOT cards.
   - No box shadows, rounded cards, bento grids, glassmorphism, or gradient text.
7. **Content**:
   - All copy strictly stored in `/src/content/*.ts`. Never hardcode strings in components.
   - Realistic, specific Ahmedabad & Bengaluru details. Never use 'lorem ipsum', 'placeholder', 'TBD', or 'sample'.
   - Tone: Factual, declarative sentences. No buzzwords (unlock, elevate, seamless, cutting-edge, innovative, synergy, tapestry, etc.). No em dashes. No exclamation points.
8. **Entities**:
   - Built Environment: Hrishikesh Ventures, HRS Aluglaze Ltd, Geotrix Pvt. Ltd., School of Facade Technologies (SoFT).
   - Food and Consumer: Hrishikesh Food Products, Hrishikesh Consumer Products (13 brands: Manpras, Snackshot, Antrah, Basic Essentials, Gush, Daily Pump, Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, Raspberry Rhinoceros).
   - Hospitality, Leasing & Retail: FirstGen Pvt. Ltd. (FirstGen Assets, FirstGen Hotels [Flight Stays, Amuktamalyada], FirstGen Enterprises [The Bluprint by Builders Cafe, ShubhVista]).
   - Services: Indian Brand House.
   - DO NOT include FirstGen QSR, Quantum Build or redevelopment arms.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
