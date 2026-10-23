# HRS Group Fresh Website — Master Brief

## 1. The Business
HRS Group is a diversified business group headquartered in Ahmedabad, Gujarat.
Values: Faith, Trust, Foundation, People, Process, Service.
The site is a parent site that routes visitors to each business quickly. The team's feedback on the last version was that it was flat and had little content, so this version must be bold, modern, colourful and a little playful, with one calm section for investors and partners.

### Sectors and Entities (Use Exactly These Names):
- **BUILT ENVIRONMENT**:
  - **Hrishikesh Ventures**: Real estate developer; 13 developments H1, H2, H3, H4, H6, H7, H10, W1, Kishor Park, Hrishikesh Villa, Hrishikesh 1, 2, 3; joint venture H9.
  - **HRS Aluglaze Ltd**: Facade and fenestration, B2B; logo in `/public/brand/hrs-aluglaze-logo.png`, white on black.
  - **Geotrix Pvt. Ltd.**: South India facade company, acquired by Aluglaze, its South India arm; shown separately.
  - **School of Facade Technologies**: Education (students, installers and fabricators, architects and engineers).
- **RETAIL**:
  - **BOGO**: Featured, prominent retail ecosystem brand across formats, category brands, and programmes.
- **FOOD AND CONSUMER**:
  - **Hrishikesh Food Products**: Spices and masalas; job work, white label, own ranges.
  - **Hrishikesh Consumer Products**: 13 brands: Manpras grocery store and packaged brand, Snackshot, Antrah, Basic Essentials, Gush, Daily Pump; upcoming: Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, Raspberry Rhinoceros.
- **HOSPITALITY AND LEASING**:
  - **FirstGen Pvt. Ltd.**: Legal umbrella, not a consumer brand. Divisions:
    - **FirstGen Assets**: Leasing: commercial and office, retail, warehousing and industrial, equipment and machinery.
    - **FirstGen Hotels**: Flight Stays service apartments in Bengaluru; Amuktamalyada Telugu tiffin and meals restaurant on Outer Ring Road, Bengaluru.
    - **FirstGen Enterprises**: The Bluprint by Builders Cafe (cafe, co-working and material experience centre for the building trade); ShubhVista (building materials and fittings retail).
- **SERVICES**:
  - **Indian Brand House**: Brand communications agency: strategy and identity, creative and content, digital and performance marketing.

**Explicit Exclusions**: Do NOT include FirstGen QSR, Quantum Build or any redevelopment arm. Do not hard-code a count of companies in any copy.

---

## 2. BOGO Source & Architecture
The BOGO profile PDF is at `/docs/source/BOGO-Profile.pdf` (31 pages).
- **Ecosystem**: 5 pillars (Brands, Technology, Partnerships, Distribution, Retail).
- **Mindset**: Bonds Over Generations, Often.
- **Retail Formats**:
  - **BOGO Square**: Flagship experience bringing brands, dining, lifestyle, and discovery under one roof.
  - **BOGO Bazaar**: 4,000–6,000 sq. ft. community shopping format for weekly family shopping. Headline: *A destination closer to home.*
  - **BOGO Mini**: Around 2,000 sq. ft. neighbourhood convenience format for daily quick visits. Headline: *Everyday essentials within reach.*
- **Supply & Distribution**: BOGO Go (stockist, logistics coordination, retail replenishment).
- **11 Category Brands**:
  1. Essentials (teal `#149395`)
  2. Daily (warm orange `#EB7C20`)
  3. Farms (organic green `#02A04A`)
  4. Superfoods (navy `#1E345F`)
  5. Health (slate grey `#5C6C7B`)
  6. Beauty (rose crimson `#9E2C37`)
  7. Luxe (amethyst purple `#6F357C` — vision: curated premium and imported collections)
  8. Divine (sacred gold `#8B8937`)
  9. Paws (warm amber `#EB9C03`)
  10. Play (coral orange `#EA5735`)
  11. Classroom (cobalt blue `#294189`)
- **Programmes**:
  - BOGO Life: Corporate employee retail benefits.
  - BOGO Companion: Connected membership across all 11 brands.
  - BOGO Affairs: Dedicated news and community platform (launch planned for 2027–2028).
  - BOGO Partner: Collaborative retail and equity platform.
- **Growth Roadmap**: 4 phases (Build the Foundation, Expand the Network, Enable Growth, Lead the Future of Retail — planned phases).
- **Technology Vision**: 6 phases (Purchase History, Smart Basket, Concierge Service, Smart Trolley, Home Delivery, Intelligent Product Discovery).
- Concept renders: Captioned 'Concept' in the UI.

---

## 3. Tech Stack
- Next.js (latest stable, App Router)
- TypeScript strict
- Tailwind CSS
- GSAP with ScrollTrigger
- Lenis smooth scroll
- lucide-react
- next/font: `Bricolage Grotesque` and `Plus Jakarta Sans`
- Static export for GitHub Pages: `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`, `basePath` read from `NEXT_PUBLIC_BASE_PATH` (default empty, `'/HRS-Group-Website'` in deploy build). All asset URLs respect the base path. No backend.

---

## 4. Design System (Permanent Workspace Rule)
**Tone**: Modern, confident, colourful and a little playful, like a good contemporary brand site. Not a SaaS template.

### Palette & Tokens:
- `--ink`: `#0E0E10`
- `--paper`: `#FAF8F4`
- `--white`: `#FFFFFF`
- `--hrs-orange`: `#F58220`
- BOGO: `--bogo-navy`: `#0F2A5C`, `--bogo-orange`: `#F58A33`, `--bogo-green`: `#3F8F3F`, plus sampled category colours.
- Flat colour fields only.

### Typography:
- Display: `Bricolage Grotesque` (weights 600–800, tight tracking, sizes up to clamp(3.5rem, 11vw, 11rem)).
- Body & Interface: `Plus Jakarta Sans` (weights 400–600, line height 1.6, max 62ch).
- Emphasis: Italic or colour for one word per major heading.
- Tabular numerals for facts, metrics, and years.
- Sentence case everywhere. No uppercase tracked eyebrows. No monospace.

### Layout:
- Full-bleed sections with strong colour changes.
- 12-column grid, very large type, generous but not empty spacing.
- Buttons are pills with an arrow chip that slides on hover.
- Lists and directories separated by 1px hairlines.

### Motion:
- Line-by-line heading reveals (`SplitLines`).
- Scroll-scrubbed and pinned scenes (`PinScene`, GSAP ScrollTrigger).
- Image clip reveals (`ImageReveal`).
- Hover previews.
- Magnetic button effect (`MagneticButton`).
- Labelled cursor on desktop (`CursorLabel`).
- Word-by-word scroll text fill (`ScrollText`).
- Marquee ticker (`Marquee`).
- Page intro: 1-second logo reveal shown once per session (`PageIntro`).
- Timing: 500–900ms ease-out, no bounce.
- One main animated idea in view at a time.
- Respect `prefers-reduced-motion`: instant reveals, no pinned or scrubbed scenes, no cursor label.
- Complete content visible without JavaScript.

### Logos & Media:
- HRS Group and all HRS entities use generated placeholder wordmark SVGs in `/public/logos/<slug>.svg` through a `<Logo>` component.
- BOGO uses its real extracted logos from the profile.
- Images: Until real photos arrive, use extracted BOGO concept renders where they fit, and flat colour or typographic fields elsewhere. Provide `<ImageSlot>` component so photos can be swapped by editing content paths. No generated stock imagery.

### Strict Prohibitions:
- NEVER use: purple/blue gradient backgrounds, glassmorphism, glow blobs, bento grids, soft-shadow rounded cards, icons in coloured circles, pill badges above headings, gradient text, emoji, floating device mockups, 'trusted by' logo strips, testimonial carousels, bounce or spring animation.
- Banned buzzwords: unlock, elevate, empower, seamless, cutting-edge, state-of-the-art, innovative, leverage, robust, holistic, synergy, journey, world-class, next-generation, end-to-end, passionate, 'not just X but Y', 'where X meets Y'.
- No em dashes, no exclamation marks.
- All dummy copy is specific and realistic (Ahmedabad, Gujarat and Bengaluru places, dates, figures) and never labelled 'placeholder', 'lorem' or 'sample'.

### Accessibility:
- WCAG AA compliant.
- Visible focus rings.
- Fully keyboard-operable.
- `prefers-reduced-motion` respected throughout.
- Content visible without JavaScript.
