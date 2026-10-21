# HRS Group Coding Guidelines & Workspace Rules

This file guides agents and developers working on the official parent website for HRS Group.
For comprehensive rules, also see `.agents/rules/hrs-design-and-content.md` and `docs/BRIEF.md`.

## Core Directives
1. **Design System**: Minimal, generous whitespace, typography-led. Architecture practice or annual report aesthetic.
2. **Tokens**:
   - `--white: #FFFFFF`
   - `--paper: #F7F6F3`
   - `--ink: #141414`
   - `--muted: #6B6B66`
   - `--rule: #E6E4DF`
   - `--slot: #ECEAE5`
   - `--orange: #F58220` (micro-accent only: dot/square marker, 2px hover underline, focus ring; never large fills, never body text)
3. **Typography**:
   - Headings: `Newsreader` (regular weight, large, generous leading)
   - Body & Interface: `Hanken Grotesk` (17-18px, 1.6 line height, max 62ch)
   - Sentence case everywhere. No uppercase tracked eyebrows. No monospace.
4. **Layout**:
   - 12-column grid, max-w-[1280px], asymmetric left-aligned.
   - Text blocks occupy cols 1-6 or 4-10.
   - Sections spaced 160-240px desktop, 80px mobile.
   - Lists separated by 1px hairlines, NOT cards. No box shadows or rounded cards.
5. **Content**:
   - All copy strictly stored in `/src/content/*.ts`. Never hardcode strings in components.
   - Realistic, specific Ahmedabad & Bengaluru details. Never use 'lorem ipsum', 'placeholder', 'TBD', or 'sample'.
   - Tone: Factual, declarative sentences. No buzzwords (unlock, elevate, seamless, cutting-edge, innovative, synergy, tapestry, etc.). No em dashes. No exclamation points.
6. **Entities**:
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
