# HRS Group Parent Website — Master Brief

## 1. Business Context
HRS Group brings together eight entities across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.
Headquarters: Ahmedabad, Gujarat.
Core Values: Faith, Trust, Foundation, People, Process, Service.

The site is a PARENT site: it presents one calm group identity and routes visitors to each business within two clicks.

### Sectors and Entities (Use Exactly These Names)
- **BUILT ENVIRONMENT**
  - **Hrishikesh Ventures**: Real estate developer. 13 live developments: H1, H2, H3, H4, H6, H7, H10, W1, Kishor Park, Hrishikesh Villa, and commercial projects Hrishikesh 1, Hrishikesh 2, Hrishikesh 3; plus one joint venture, H9. (Redevelopment arm is on hold).
  - **HRS Aluglaze Ltd**: Facade and fenestration company. Aluminium and glazing systems, windows and doors. B2B specialist supplier for construction projects. Its logo is `/public/brand/hrs-aluglaze-logo.png` (white wordmark and orange arrow on black).
  - **Geotrix Pvt. Ltd.**: South India facade company, acquired by HRS Aluglaze; operates as Aluglaze's South India arm. Has its own page.
  - **School of Facade Technologies (SoFT)**: Education venture teaching facade and fenestration. Three audiences: students and fresh entrants (diploma, certificate), site installers and fabricators (skilling, certification), architects and engineers (professional upskilling). Draws on Aluglaze's expertise.
- **FOOD AND CONSUMER**
  - **Hrishikesh Food Products**: Spices and masalas manufacturer. Three models: job work, white labelling, own product ranges.
  - **Hrishikesh Consumer Products**: 13 brands.
    - Active / In Development: Manpras (neighbourhood grocery store AND packaged brand), Snackshot (snacks and namkeen), Antrah (mouth freshener), Basic Essentials (tissue), Gush (packaged drinking water), Daily Pump (beverage and energy drink).
    - Upcoming Brands (reserved names): Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, Raspberry Rhinoceros.
- **HOSPITALITY, LEASING AND RETAIL**
  - **FirstGen Pvt. Ltd.**: Umbrella entity for the divisions below. Not a consumer brand; its divisions trade under their own names.
  - **FirstGen Assets**: Leasing of commercial and office space, retail space, warehousing and industrial property, equipment and machinery.
  - **FirstGen Hotels**: Flight Stays (service apartments, Bengaluru) and Amuktamalyada (Telugu tiffin and meals restaurant on Outer Ring Road, Bengaluru; gare, upma, rava idli, pesarattu, dosa; affordable vegetarian meals).
  - **FirstGen Enterprises**: The Bluprint by Builders Cafe (cafe for the building trade, also co-working space and material experience centre) and ShubhVista (building materials and fittings retail).
- **SERVICES**
  - **Indian Brand House**: Brand communications agency serving group companies and outside clients. Brand strategy and identity, creative and content production, digital and performance marketing.

**Explicit Exclusions**: Do NOT include FirstGen QSR, Quantum Build or any redevelopment arm.

---

## 2. Audiences
- Builders, architects and contractors
- Homebuyers and tenants
- Shoppers and diners
- Brands and buyers (white label, job work, marketing)
- Investors, partners and job seekers

---

## 3. Tech Stack
- Next.js (latest stable, App Router)
- TypeScript strict
- Tailwind CSS
- lucide-react (thin line icons, used sparingly and never inside coloured shapes)
- next/font (`Newsreader` and `Hanken Grotesk`)
- react-hook-form + zod
- No animation library: CSS transitions only
- No database yet: forms post to a Next.js route handler that validates and logs
- Static-first, deployable on Vercel
- Subdirectory routing, no subdomains

---

## 4. Design Direction
The site is MINIMAL, with a LOT of white space, led by typography. Think architecture practice or a well-made annual report. It must not look like an AI-generated or SaaS template.

### Colour Tokens
- `--white`: `#FFFFFF` (page background)
- `--paper`: `#F7F6F3` (rare alternate band)
- `--ink`: `#141414` (primary text and solid accents)
- `--muted`: `#6B6B66` (subtle captions, secondary text)
- `--rule`: `#E6E4DF` (1px hairlines)
- `--slot`: `#ECEAE5` (empty image blocks)
- `--orange`: `#F58220` (micro-accent only)

### Orange Usage Rules
Orange is a tiny accent only: a small dot or square marker, 2px link underline on hover, focus ring, active nav indicator. Never as body text colour, never as a large fill, never in gradients.
Primary button: solid ink with white text; on hover it turns orange with ink text.

### Typography
- Headings: `Newsreader` (regular weight, large, generous leading). Fluid heading scale; the largest heading up to about 6rem.
- Body and interface: `Hanken Grotesk`. Body size 17-18px, line height 1.6, max line length about 62ch.
- Sentence case everywhere.
- No monospace, no uppercase tracked eyebrow labels.

### Layout & Grid
- 12-column grid, max width 1280px, left-aligned and asymmetric.
- Text blocks occupy cols 1-6 or 4-10 and the remaining space stays empty on purpose.
- Vertical gaps between sections: 160-240px desktop, 80px mobile.
- No centred hero. No full-width coloured bands.

### Lists, Not Cards
- Businesses, brands, news and jobs are typographic rows separated by 1px rules (name, one line of description, small arrow).
- No box shadows, no rounded cards, no icons in circles or squares.

### Imagery
- Large, true aspect ratios (3:2 or 4:5), square corners, no overlays, filters or duotone, small muted captions.
- `<ImageSlot>` renders a flat `--slot` block at the right aspect ratio with no text and no icon, and accepts a real image path later.

### Logos
- Placeholder wordmarks via `<Logo entity="slug" />` component loading `/public/logos/<slug>.svg`.
- Simple wordmark SVG per entity (name set in Newsreader styling, ink colour, small orange square before it) and one for HRS Group.
- HRS Aluglaze uses `/public/brand/hrs-aluglaze-logo.png` placed on an ink-coloured tile because it is white on black.

### Motion & Performance
- Only 150-200ms colour and underline transitions and a 150ms page fade.
- No parallax, scroll-jacking, sticky stacking, count-up numbers, marquees, typewriter text, or fade-ins on every element.
- Respect `prefers-reduced-motion`.

### Accessibility
- WCAG AA compliant.
- Visible focus states.
- Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`, `<section>`).
- Keyboard-navigable menus.
- Proper alt text on images.

### Forbidden Patterns (NEVER Use)
- Dark hero with glow or gradient
- Purple or blue gradients
- Glassmorphism, blurred blobs, bento grids
- Pill badges above headings
- Gradient text
- Floating device mockups
- 'Trusted by' logo strips
- Three-column feature-card rows
- Count-up stat bars
- Testimonial carousels
- Emoji
- Inter or Space Grotesk fonts

---

## 5. Content Rules
- All copy lives in `/src/content/*.ts` (entities, brands, projects, news, jobs, facts, leadership, milestones, site settings). Components never hard-code copy.
- Write specific, realistic dummy copy: real-sounding Ahmedabad and Bengaluru localities, dates, quantities, names. Never write 'lorem ipsum', 'placeholder', 'TBD' or 'sample' in the UI.
- Voice: plain, factual, short declarative sentences of varied length. Headings say what something is ('Facade systems for commercial buildings'), not a slogan. Buttons and links say what happens: 'Send an enquiry', 'See projects', 'Read the story'.
- Banned words and patterns: unlock, elevate, empower, seamless, cutting-edge, state-of-the-art, innovative, leverage, robust, holistic, synergy, journey, tapestry, landscape, delve, world-class, next-generation, end-to-end, passionate, 'we pride ourselves', 'at the heart of', 'not just X but Y', 'where X meets Y', 'in today's fast-paced world'. No em dashes. No exclamation marks. No rhetorical-question headings. Avoid grouping everything in threes.

---

## 6. Phase Progression
- **Phase 0 (Current)**: Foundation only. Project scaffolding, typed content model, design system tokens, font setup, logo generation, brief and rules. No page UI.
- **Phase 1+**: Shell and navigation, entity routing, sector pages, detail views, contact/enquiry route handlers.
