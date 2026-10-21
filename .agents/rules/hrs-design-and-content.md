# HRS Group — Design and Content Rules

This repository is for the official parent website of HRS Group, headquartered in Ahmedabad, Gujarat.
All agents and developers working on this project MUST strictly adhere to the following rules across all phases.

---

## 1. Design System & Aesthetics
The site is **MINIMAL**, with a **LOT of white space**, led strictly by typography.
Think of a venerable architecture practice publication or a refined annual report. It must NOT look like a modern SaaS template, AI generation, or consumer startup.

### Colour Palette Tokens
- `--white`: `#FFFFFF` — Primary page background
- `--paper`: `#F7F6F3` — Rare alternate section band
- `--ink`: `#141414` — Primary text, headings, dark surfaces
- `--muted`: `#6B6B66` — Secondary text, captions, metadata
- `--rule`: `#E6E4DF` — 1px hairlines and table borders
- `--slot`: `#ECEAE5` — Empty image placeholder blocks
- `--orange`: `#F58220` — Tiny micro-accent ONLY

### Orange Micro-Accent Discipline
- Orange is used ONLY as:
  - A small dot or square marker (e.g., before logo text or bullet points)
  - A 2px link underline on hover
  - Focus ring for keyboard accessibility
  - Active navigation indicator
- **NEVER** use orange as body text colour.
- **NEVER** use orange as a large background fill or colored banner.
- **NEVER** use orange in gradients.
- **Primary button interaction**: Solid `--ink` with `--white` text; on hover it transitions to `--orange` with `--ink` text.

### Typography
- Headings: `Newsreader` (regular weight, large, generous line-height / leading). Largest heading reaches up to ~6rem.
- Body and Interface: `Hanken Grotesk`.
- Body text size: 17px - 18px.
- Line height: 1.6.
- Max line length for prose: ~62ch.
- Capitalization: **Sentence case everywhere**.
- Monospace: **Forbidden**.
- Uppercase tracked eyebrow labels: **Forbidden**.

### Layout & Composition
- 12-column grid, max width 1280px (`max-w-[1280px]`), left-aligned and asymmetric.
- Text blocks occupy columns 1–6 or 4–10, leaving the remaining columns empty on purpose.
- Vertical gap between sections: 160px–240px on desktop, 80px on mobile.
- No centred hero sections.
- No full-width colored bands.

### Lists, Not Cards
- Businesses, brands, projects, news, and jobs are typographic rows separated by 1px hairlines (`--rule`).
- Format: Entity/Item name, one line of concise description, small subtle arrow indicator.
- **Forbidden**: Box shadows, rounded cards, icons enclosed in colored circles or squares.

### Imagery
- Aspect ratios: Large, true aspect ratios (3:2 or 4:5).
- Styling: Square corners only (`rounded-none`), no overlays, no color filters, no duotone. Small muted captions.
- `<ImageSlot>`: Renders a flat `--slot` block at true aspect ratio with no text and no icon, accepting a real image path later.

### Logos
- Placeholder wordmarks via `<Logo entity="slug" />` component which loads `/public/logos/<slug>.svg`.
- Each SVG contains the entity name set in Newsreader styling, ink colour, and a small orange square before it.
- HRS Aluglaze uses `/public/brand/hrs-aluglaze-logo.png` placed on an ink-coloured tile because it is white on black.

### Motion & Transitions
- Transitions: Only 150ms–200ms duration for color and underline transitions, and 150ms page fades.
- **Forbidden**: Parallax, scroll-jacking, sticky stacking, count-up counter animations, marquees, typewriter effects, element fade-ins on every scroll trigger.
- Always respect `prefers-reduced-motion`.

### Absolute Prohibitions (NEVER Use)
1. Dark hero with glow or gradient
2. Purple, blue, or vibrant gradient backgrounds
3. Glassmorphism, backdrop blurs, or blurred blobs
4. Bento grids
5. Pill badges / tags above headings
6. Gradient text
7. Floating device mockups or screenshots
8. "Trusted by" logo carousels or marquee strips
9. Three-column feature card grids
10. Count-up stat number bars
11. Testimonial carousels
12. Emoji anywhere in copy or UI
13. `Inter` or `Space Grotesk` fonts

---

## 2. Content & Copywriting Rules

### Content Architecture
- **All copy lives in `/src/content/*.ts`** (`entities.ts`, `brands.ts`, `projects.ts`, `news.ts`, `jobs.ts`, `facts.ts`, `leadership.ts`, `milestones.ts`, `siteSettings.ts`).
- **Components must NEVER hard-code copy.** All text is imported from typed content files.

### Specificity & Realism
- Write specific, realistic copy: real-sounding Ahmedabad and Bengaluru localities (e.g., Outer Ring Road, SG Highway, Prahlad Nagar, Whitefield, Sanand), dates, square footages, quantities, and people.
- **Forbidden words in UI**: "Lorem ipsum", "Placeholder", "TBD", "Sample".

### Tone of Voice
- Plain, factual, short declarative sentences of varied length.
- Headings say what something is (e.g., *"Facade systems for commercial buildings"*), never a slogan or marketing platitude.
- Buttons and links state the direct action: *"Send an enquiry"*, *"See projects"*, *"Read the announcement"*.

### Banned Words & Phrasing
Do not use any of the following buzzwords or patterns:
- unlock
- elevate
- empower
- seamless
- cutting-edge
- state-of-the-art
- innovative
- leverage
- robust
- holistic
- synergy
- journey
- tapestry
- landscape
- delve
- world-class
- next-generation
- end-to-end
- passionate
- "we pride ourselves"
- "at the heart of"
- "not just X but Y"
- "where X meets Y"
- "in today's fast-paced world"
- No em dashes (—) in UI copy. Use commas, semicolons, or separate sentences.
- No exclamation marks (!).
- No rhetorical-question headings.
- Avoid grouping everything in sets of three.

---

## 3. Entities & Sector Accuracy
Use EXACTLY the official names:
- **Built Environment**: Hrishikesh Ventures, HRS Aluglaze Ltd, Geotrix Pvt. Ltd., School of Facade Technologies (SoFT).
- **Food and Consumer**: Hrishikesh Food Products, Hrishikesh Consumer Products (Brands: Manpras, Snackshot, Antrah, Basic Essentials, Gush, Daily Pump; Upcoming: Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, Raspberry Rhinoceros).
- **Hospitality, Leasing and Retail**: FirstGen Pvt. Ltd. (Umbrella entity; operating units: FirstGen Assets, FirstGen Hotels [Flight Stays, Amuktamalyada], FirstGen Enterprises [The Bluprint by Builders Cafe, ShubhVista]).
- **Services**: Indian Brand House.

**Explicit Exclusions**: Do NOT include FirstGen QSR, Quantum Build or any redevelopment arm.
