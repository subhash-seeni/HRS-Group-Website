# HRS Group — Design and Content Rules

This repository is for the official parent website of HRS Group, headquartered in Ahmedabad, Gujarat.
All agents and developers working on this project MUST strictly adhere to the following rules.

---

## 1. Design System & Aesthetics
The site features a **refined editorial look with confident, smooth motion**, like a high-end architecture or hospitality brand. Each section has **one clear idea, executed well**. At most one animated idea is in view at a time.

### Surfaces & Rhythm
- All sections use `<Section surface="white|stone|ink|orange">`.
- **Rhythm**: Deliberate alternation. No two identical surfaces touch.
- Never use more than one `ink` section in a row.
- `orange` surface is used at most once per page as a single deliberate block.
- Edges are straight and hard.

### Colour Palette Tokens
- `--white`: `#FFFFFF` — Primary white surface
- `--paper`: `#F7F6F3` — Subtle background tint
- `--stone`: `#EDEAE3` — Architectural stone surface
- `--stone-deep`: `#DDD8CE` — Deeper stone border
- `--ink`: `#141414` — Primary text and ink surface
- `--ink-deep`: `#0C0C0C` — Deepest ink surface
- `--muted`: `#6B6B66` — Secondary text, captions, metadata
- `--rule`: `#E6E4DF` — 1px hairlines and table rules
- `--slot`: `#ECEAE5` — Image slot background
- `--orange`: `#F58220` — Brand accent dot, focus rings, hover fills, single orange surface
- `--orange-deep`: `#C2410C` — Italic emphasis words on light surfaces (accessible contrast >= 5.3:1)
- `--orange-wash`: `#FFF1E3` — Subtle row hover tint on light surfaces

### Typography
- **Headings**: `Newsreader` (regular weight, generous leading, optical sizing enabled).
  - Page Titles / Heroes: `clamp(3rem, 8.5vw, 9rem)`
  - Section Headings: `clamp(2rem, 4.5vw, 4.5rem)`
  - **Emphasis**: At most ONE italic word or phrase per major heading (`Newsreader` italic), set in `var(--orange-deep)` on light surfaces and `var(--orange)` on ink.
- **Body & Interface**: `Hanken Grotesk`.
  - Body text size: 17px–18px.
  - Line height: 1.6.
  - Max line length for prose: ~62ch.
  - Small interface labels: 13–14px.
- **Numerals**: Tabular lining numerals for years, facts, and metrics.
- **Casing**: **Sentence case everywhere**.
- **Forbidden**: Monospace, uppercase tracked eyebrow labels, gradient text.

### Layout & Composition
- 12-column grid, max width 1280px (`max-w-[1280px]`), left-aligned and asymmetric.
- Text blocks occupy columns 1–6 or 4–10, leaving the remaining columns empty on purpose.
- Vertical gap between sections: 160px–240px on desktop, 80px on mobile.

### Lists, Not Cards
- Businesses, brands, projects, news, and jobs are typographic rows separated by 1px hairlines (`border-b border-[var(--rule)]`).
- On hover: Unhovered rows dim to 40%, hovered row's name shifts 8px right, arrow turns orange and slides right.
- **Forbidden**: Box shadows, rounded cards, icons enclosed in colored circles or squares.

### Motion Tokens & Primitives (`/src/components/motion/`)
- Motion is 500ms–800ms with ease-out curves, never bouncy.
- **Easings**:
  - `cssEaseOut`: `cubic-bezier(0.22, 1, 0.36, 1)`
  - `cssEaseInOut`: `cubic-bezier(0.65, 0, 0.35, 1)`
- **Durations**: Fast 200ms, Base 500ms, Slow 800ms, Cinematic 1200ms.
- **Primitives**:
  - `SmoothScroll`: Lenis smooth scroll provider in root layout. Disabled for reduced motion and native on touch devices.
  - `SplitHeading`: Splits headings into lines, sliding up from an overflow-hidden mask with 80ms stagger.
  - `Reveal`: Fades in and rises 24px once when 15% in view.
  - `ImageReveal`: Clip-path and scale reveal over 1200ms for photography.
  - `FillButton`: Solid button with sliding orange fill on hover.
  - `LineLink`: Editorial link with animated 2px underline drawing left-to-right.
  - `ReadingProgress`: Fixed top 2px orange progress bar tracking article scroll progress.
- **Reduced Motion & No-JS**:
  - When `prefers-reduced-motion` is active: instant reveals, no parallax, no cursor previews, no scrubbed animations.
  - When JavaScript is disabled: all content is immediately 100% visible and readable via SSR `isHydrated` checks.

### Absolute Prohibitions (NEVER Use)
1. Dark hero with glow or gradient blobs
2. Purple, blue, or vibrant gradient backgrounds
3. Glassmorphism or backdrop blurs
4. Bento grids
5. Pill badges / tags above headings
6. Gradient text
7. Floating device mockups or screenshots
8. "Trusted by" logo carousels or marquee strips
9. Three-column feature card grids
10. Testimonial carousels
11. Emoji anywhere in copy or UI
12. Bouncy or spring-heavy animations

---

## 2. Content & Copywriting Rules

### Content Architecture
- **All copy lives in `/src/content/*.ts`** (`entities.ts`, `brands.ts`, `projects.ts`, `news.ts`, `jobs.ts`, `facts.ts`, `leadership.ts`, `milestones.ts`, `siteSettings.ts`).
- **Components must NEVER hard-code copy.** All text is imported from typed content files.

### Specificity & Realism
- Write specific, realistic copy: real Ahmedabad and Bengaluru localities (Outer Ring Road, SG Highway, Bodakdev, Sanand, Bavla), dates, square footages, quantities, and people.
- **Forbidden words in UI**: "Lorem ipsum", "Placeholder", "TBD", "Sample".

### Tone of Voice
- Plain, factual, short declarative sentences of varied length.
- Headings say what something is (e.g., *"Facade systems for commercial buildings"*), never a slogan or marketing platitude.
- Buttons and links state the direct action: *"Submit enquiry"*, *"View projects"*, *"Read release"*.

### Banned Words & Phrasing
- unlock, elevate, empower, seamless, cutting-edge, state-of-the-art, innovative, leverage, robust, holistic, synergy, journey, tapestry, landscape, delve, world-class, next-generation, end-to-end, passionate.
- No em dashes (—) in UI copy.
- No exclamation marks (!).
- No rhetorical-question headings.

---

## 3. Entities & Sector Accuracy
Use EXACTLY the official names:
- **Built Environment**: Hrishikesh Ventures, HRS Aluglaze Ltd, Geotrix Pvt. Ltd., School of Facade Technologies (SoFT).
- **Food and Consumer**: Hrishikesh Food Products, Hrishikesh Consumer Products (Brands: Manpras, Snackshot, Antrah, Basic Essentials, Gush, Daily Pump; Upcoming: Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, Raspberry Rhinoceros).
- **Hospitality, Leasing and Retail**: FirstGen Pvt. Ltd. (Umbrella entity; operating units: FirstGen Assets, FirstGen Hotels [Flight Stays, Amuktamalyada], FirstGen Enterprises [The Bluprint by Builders Cafe, ShubhVista]).
- **Services**: Indian Brand House.

**Explicit Exclusions**: Do NOT include FirstGen QSR, Quantum Build or any redevelopment arm.

---

## 4. How to Add New Pages in This Style

1. **Store copy in `/src/content/*.ts`**: Define typed items, facts, and descriptions.
2. **Alternate surfaces**: Structure sections so no two identical surfaces touch (`white` → `stone` → `white` → `ink` → `stone`). Use `orange` at most once per page.
3. **Opening**: Use `SplitHeading` for the title, fade up intro text and logo, and use `ImageReveal` for photography.
4. **Lists**: Render directory or related items as hairline-separated rows (`border-b border-[var(--rule)]`) with 8px title shift and orange arrow on hover.
5. **One Signature Behavior**: Each inner page features exactly one signature behavior (e.g. switcher, pinned strip, timeline, or sticky steps). Keep other sections calm.
6. **Accessibility**: Guarantee keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-[var(--orange)]`) and ensure SSR visibility (`isHydrated` fallbacks).
