# HRS Group Parent Website — Master Brief

## 1. Business Context
HRS Group brings together eight entities across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.
- **Headquarters**: Bodakdev, SG Highway, Ahmedabad, Gujarat.
- **Southern Regional Hub**: Kadubeesanahalli, Outer Ring Road, Bengaluru, Karnataka.
- **Manufacturing Facilities**: Sanand (Aluminium & Facades), Bavla (Spices & Milling).
- **Core Values**: Faith, Trust, Foundation, People, Process, Service.

The site is an official **parent website**: it presents one calm group identity and routes visitors to each business within two clicks.

### Sectors and Entities (Use Exactly These Names)
- **Built Environment**
  - **Hrishikesh Ventures**: Real estate developer. 13 live developments: H1, H2, H3, H4, H6, H7, H10, W1, Kishor Park, Hrishikesh Villa, and commercial projects Hrishikesh 1, Hrishikesh 2, Hrishikesh 3; plus one joint venture, H9. (Redevelopment arm is on hold).
  - **HRS Aluglaze Ltd**: Facade and fenestration company. Aluminium and glazing systems, windows and doors. B2B specialist supplier for construction projects.
  - **Geotrix Pvt. Ltd.**: South India facade company, acquired by HRS Aluglaze; operates as Aluglaze's South India arm.
  - **School of Facade Technologies (SoFT)**: Education venture teaching facade and fenestration. Three audiences: students and fresh entrants (diploma, certificate), site installers and fabricators (skilling, certification), architects and engineers (professional upskilling).
- **Food and Consumer**
  - **Hrishikesh Food Products**: Spices and masalas manufacturer. Three models: job work, white labelling, own product ranges.
  - **Hrishikesh Consumer Products**: 13 brands.
    - Active / In Development: Manpras (neighbourhood grocery store and packaged brand), Snackshot (snacks and namkeen), Antrah (mouth freshener), Basic Essentials (tissue), Gush (packaged drinking water), Daily Pump (beverage and energy drink).
    - Upcoming Brands (reserved names): Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, Raspberry Rhinoceros.
- **Hospitality, Leasing and Retail**
  - **FirstGen Pvt. Ltd.**: Umbrella entity for the divisions below. Not a consumer brand; its divisions trade under their own names.
  - **FirstGen Assets**: Leasing of commercial and office space, retail space, warehousing and industrial property, equipment and machinery.
  - **FirstGen Hotels**: Flight Stays (service apartments, Bengaluru) and Amuktamalyada (Telugu vegetarian dining on Outer Ring Road, Bengaluru).
  - **FirstGen Enterprises**: The Bluprint by Builders Cafe (cafe, co-working space, and material experience centre) and ShubhVista (building materials and fittings retail).
- **Services**
  - **Indian Brand House**: Brand communications agency serving group companies and outside clients. Brand strategy and identity, creative and content production, digital and performance marketing.

**Explicit Exclusions**: Do NOT include FirstGen QSR, Quantum Build or any redevelopment arm.

---

## 2. Tech Stack
- Next.js (latest App Router with Turbopack)
- TypeScript strict
- Tailwind CSS (vanilla utility tokens, no ad-hoc arbitrary blobs)
- `motion` (modern lightweight Motion library) and `lenis` (smooth scrolling on non-touch devices)
- `next/font/google`: `Newsreader` (optical sizing enabled) and `Hanken Grotesk`
- `react-hook-form` + `zod`
- All copy strictly stored in `/src/content/*.ts`

---

## 3. Design System & Surfaces

### Surface Rhythm
Pages use deliberate surface alternation via `<Section surface="white|stone|ink|orange">`.
- **Rhythm**: No two identical surfaces touch. At most one `ink` section in a row.
- **Orange Surface**: Used at most once per page as a single deliberate block (e.g. Careers/Contact block on homepage, Spontaneous Profile on careers, Regional Facilities on contact).
- **Edges**: Hard, straight, hairline-separated. No wave borders, no angled cuts, no blurred edges.

### Token Palette
- `--white`: `#FFFFFF`
- `--paper`: `#F7F6F3`
- `--stone`: `#EDEAE3`
- `--stone-deep`: `#DDD8CE`
- `--ink`: `#141414`
- `--ink-deep`: `#0C0C0C`
- `--muted`: `#6B6B66`
- `--rule`: `#E6E4DF`
- `--slot`: `#ECEAE5`
- `--orange`: `#F58220` (accent dots, 2px hover underlines, focus rings, single orange surface)
- `--orange-deep`: `#C2410C` (italic emphasis words on light surfaces, accessible contrast >= 5.3:1)
- `--orange-wash`: `#FFF1E3` (subtle row hover tint on light surfaces)

### Typography Rules
- **Page Titles & Hero Headings**: `Newsreader` regular, clamp(3rem, 8.5vw, 9rem), line-height 0.98–1.1, tracking -0.025em.
- **Section Headings**: `Newsreader`, clamp(2rem, 4.5vw, 4.5rem).
- **Emphasis**: At most ONE italic word or phrase per major heading (`Newsreader` italic), set in `var(--orange-deep)` on light surfaces and `var(--orange)` on ink.
- **Body Text**: `Hanken Grotesk`, 17–18px, line-height 1.6, max line length 62ch.
- **Numerals**: Tabular lining numerals for years, facts, and financial figures.
- **Casing**: Sentence case everywhere. Uppercase tracked eyebrows and monospace are strictly banned.

### Lists, Not Cards
- Directory listings, related businesses, news announcements, and career roles are rendered as **typographic rows separated by 1px hairlines**, never as cards.
- Box shadows, glassmorphism, rounded corners, and icon pills are forbidden.

---

## 4. Motion Foundation & Primitives

### Motion Tokens
- **Easings**:
  - `cssEaseOut`: `cubic-bezier(0.22, 1, 0.36, 1)`
  - `cssEaseInOut`: `cubic-bezier(0.65, 0, 0.35, 1)`
- **Durations**:
  - Fast: `200ms` (row hover, title shift, arrow slide)
  - Base: `500ms` (fades, standard reveals)
  - Slow: `800ms` (line-by-line SplitHeading, smooth zoom)
  - Cinematic: `1200ms` (numeral count-up, ImageReveal)
- **Distances**:
  - Rise: `24px`
  - Large rise: `60px`

### Core Primitives (`/src/components/motion/`)
- `SmoothScroll`: Lenis smooth scroll provider in root layout. Disabled for reduced motion and native on touch devices.
- `SplitHeading`: Splits headings into lines, sliding up from an overflow-hidden mask with 80ms stagger. SSR-safe and preserves screen-reader `aria-label`.
- `Reveal`: Fades in and rises 24px once when 15% in view.
- `ImageReveal`: Clip-path and scale reveal over 1200ms for photography.
- `LineLink`: Editorial link with animated 2px underline drawing left-to-right.
- `FillButton`: Solid button with sliding orange fill from bottom on hover.
- `ReadingProgress`: Fixed top 2px orange progress bar tracking article scroll progress.

### Accessibility & Reduced Motion
- When `prefers-reduced-motion` is detected:
  - All reveals become instant.
  - No parallax or scroll-scrubbed expansions.
  - Cursor-following previews are disabled.
  - Smooth scrolling is disabled (native instant scrolling).

---

## 5. Editorial Photography
- Photography follows a real 35mm architectural and industrial aesthetic.
- Natural golden-hour or diffuse daylight, authentic materials (sandstone, unitised aluminium curtain walls, slate stone spices, travertine).
- No saturated neon hues, no stock photo business handshakes, no artificial glow.

---

## 6. How to Add New Pages in This Style

When adding a new inner route (e.g. `/facilities/[slug]` or `/sustainability`):

1. **Copy First**: Add all text, metadata, and data arrays to `/src/content/*.ts`. Never hardcode strings in components.
2. **Surface Planning**: Plan the section sequence so no two identical surfaces touch:
   - Example: Opening (`white`) → Key Data (`stone`) → Narrative / Case Study (`white`) → Selected Images (`ink`) → Related Links (`stone`) → Enquiry Closing (`ink`).
3. **Opening Section**:
   - Use `SplitHeading` for the page title.
   - Fade up the introductory sentence and metadata.
   - If imagery is present, use `ImageReveal` with a 16:9 or 16:10 aspect ratio and a caption with `Fig.` notation.
4. **Content Lists**:
   - Render lists as 1px hairline rows (`border-b border-[var(--rule)]`).
   - On hover: unhovered rows dim to 40%, hovered title shifts 8px (`transform 200ms cubic-bezier(0.22, 1, 0.36, 1)`), and the arrow turns orange and slides right.
5. **One Signature Behavior**:
   - Choose exactly ONE signature interaction for the page (e.g. an interactive switcher, horizontal pinned strip, or drawn timeline). Keep the rest of the page quiet.
6. **Accessibility & SSR**:
   - Ensure interactive links support `:focus-visible` rings.
   - Ensure all content renders visible when JavaScript is disabled (using `isHydrated` checks in motion components).
   - Use sentence case for every heading, label, and button.
