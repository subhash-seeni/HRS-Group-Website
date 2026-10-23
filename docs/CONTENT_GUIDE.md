# HRS Group Website • Content Management Guide

This guide explains how content editors, brand managers, and developers maintain and update the official parent website for HRS Group.

All copy, brand registries, sector entities, news announcements, and BOGO ecosystem specifications are strictly decoupled from presentation components and managed in structured TypeScript files under `/src/content/`.

---

## 1. Editorial Voice & Workspace Rules

Every piece of copy across the HRS Group website must adhere to the official brand directives:

- **Tone**: Plain, specific, and confident. Use statements of fact rather than slogans.
- **Specifics**: Real Gujarat, Ahmedabad, and Bengaluru details (e.g. Bodakdev, SG Highway, Sanand, Bavla, Kadubeesanahalli).
- **Prohibited Buzzwords**: Never use *unlock*, *elevate*, *empower*, *seamless*, *cutting-edge*, *state-of-the-art*, *innovative*, *leverage*, *robust*, *holistic*, *synergy*, *journey*, *world-class*, *next-generation*, *end-to-end*, *passionate*, *tapestry*, *game-changer*, *'not just X but Y'*, or *'where X meets Y'*.
- **Punctuation**: No em dashes (`—`). Use colons (`:`) or middots (`•`). No exclamation marks (`!`).
- **Typography & Case**: Sentence case everywhere. No uppercase tracked eyebrows. Tabular numerals for figures.
- **Render Captions**: Every architectural and 3D store render must be captioned **'Concept'**.
- **Roadmap Statuses**: No planned roadmap initiative may be described as 'Live'. Always use **'Planned'**.

---

## 2. Updating BOGO Content (`/src/content/bogo.ts`)

The entire BOGO retail section (#bogo) is driven by `/src/content/bogo.ts`.

### A. Updating the 11 Category Brands
The `categoryBrands` array powers the interactive 11-Brand Orbit Explorer:

```typescript
{
  slug: 'bogo-essentials',
  name: 'BOGO Essentials',
  tagline: 'Household care & cleaning',
  color: '#149395', // Category brand color token
  productLines: [
    'Surface Cleaners & Floor Disinfectants',
    'Liquid Laundry Detergents',
    'Biodegradable Kitchen Soaps',
    'Recycled Paper Products & Tissues',
    'Air Purifying Fragrance Blends',
    'Sanitisation & Hygiene Supplies',
  ],
  vision: 'To make essential home hygiene accessible, dependable, and safe for every household routine.',
  logoPath: '/bogo/logos/bogo-essentials.png',
  imagePath: '/bogo/stores/bogo-essentials-concept.webp',
  caption: 'Concept',
}
```

- **Color Tokens**: When updating `color`, ensure it coordinates with the brand token in `/src/app/globals.css`. If luminance is high (e.g. amber, olive, light orange), `BogoExplorer.tsx` automatically switches text to dark ink (`#0E0E10`) to maintain WCAG AA contrast (minimum 4.5:1).
- **Product Lines**: Provide exactly 6 numbered items per category.
- **Concept Store Image**: Must point to an optimized `.webp` file inside `/public/bogo/stores/`.

### B. Updating Store Formats & Distribution
The `formats` array governs the physical store specifications:

```typescript
{
  slug: 'bogo-square',
  name: 'BOGO Square',
  headline: 'The Flagship Destination',
  promise: 'Where the BOGO ecosystem comes to life.',
  size: 'Regional Destination (10,000+ sq. ft.)',
  idealFor: [
    'Destination weekend family shopping',
    'Multi-category brand discovery',
    'Dining, cafes, and community interactions',
  ],
  imagePath: '/bogo/stores/bogo-square-concept.webp',
  logoPath: '/bogo/logos/bogo-square.png',
}
```

The distribution network (`distribution` object) defines the **BOGO Go** logistics movement grid.

### C. Updating Companion & Loyalty Programs
The `programs` array defines the four integrated initiatives:
1. **BOGO Life**: Corporate benefits and bulk procurement partnerships.
2. **BOGO Companion**: Consumer ecosystem loyalty tier.
3. **BOGO Partner**: Retail shelf space for equity collaborative partnerships.
4. **BOGO Affairs**: Industry communications and supplier origin stories.

### D. Updating the Technology Vision Roadmap
The `technologyVision.phases` array drives the desktop horizontal pinned sequence and mobile vertical roadmap:

```typescript
{
  phase: 1,
  title: 'Purchase History',
  desc: 'A connected shopping history in the BOGO app that helps customers review past purchases...',
  status: 'Planned', // Strictly 'Planned' until officially deployed in stores
}
```

---

## 3. Swapping Placeholder Logos for Real Ones

All entity logos are stored under `/public/logos/` (group entities) and `/public/bogo/logos/` (BOGO brands).

### Step 1: Prepare the Real Logo Asset
- **Format**: SVG (`.svg`) is strongly preferred for vector sharpness. High-resolution transparent PNG (`.png`) is also supported.
- **Dimensions**: Viewbox ratio should ideally be horizontal or balanced (e.g. `240x60` or `120x120`).
- **Colors**: Both solid black and solid white versions should be generated, or a single monochrome SVG with `currentColor` support.

### Step 2: Save the File
Place the asset in the appropriate public directory:
- Group businesses: `/public/logos/<entity-slug>.svg`
- BOGO marks: `/public/bogo/logos/<brand-slug>.png`

### Step 3: Reference in Content
Update the `logo` or `logoPath` property in `/src/content/entities.ts` or `/src/content/bogo.ts`:

```typescript
// /src/content/entities.ts
{
  slug: 'hrs-aluglaze',
  name: 'HRS Aluglaze Ltd',
  logoPath: '/logos/hrs-aluglaze.svg',
  // ...
}
```

The unified `<Logo />` component (`/src/components/ui/Logo.tsx`) automatically resolves paths with base path handling (`getAssetUrl`), falling back to a clean typographic monogram if the image is missing.

---

## 4. Adding Real Photos & Concept Renders

Visuals on the site use `<ImageReveal />` with progressive clip-path reveal animations and layout-shift prevention.

### Step 1: Compress & Optimize Media
- **Format**: WebP (`.webp`) format with 80–85% quality.
- **Maximum Width**: 1600px wide (avoids unnecessary cellular bandwidth consumption).
- **Aspect Ratios**:
  - Flagship hero store renders: `16:10` or `16:9` (e.g. `1600x1000` or `1600x900`).
  - Secondary format renders (Bazaar, Mini): `21:9` wide letterbox (e.g. `1600x685`).
  - News article thumbnails: `3:2` (e.g. `600x400`).

### Step 2: Save to Public Directory
- Store renders: `/public/bogo/stores/<slug>-concept.webp`
- General photography: `/public/images/<image-name>.webp`

### Step 3: Use the Component
```tsx
<ImageReveal
  src="/bogo/stores/bogo-square-concept.webp"
  alt="BOGO Square Flagship Store Concept"
  caption="Concept"
  aspectRatio="aspect-[16/10]"
/>
```

---

## 5. Updating Group Facts, History & Values (`/src/content/facts.ts`)

The calm About section (#about) and group statistics are managed in `/src/content/facts.ts`:

- **Key Numerical Facts (`keyFacts`)**: Four verified metrics with labels and contextual detail (e.g., `1998` founding year, `5` operational sectors, Sanand & Bavla facilities).
- **Historical Narrative (`historyParagraphs`)**: Three Ahmedabad paragraphs detailing the transition from regional civil contracting to integrated industrial engineering and FMCG.
- **Corporate Values (`values`)**: The 6 foundational values:
  1. **Faith**: Holding conviction in long-term goals and respecting enduring community traditions.
  2. **Trust**: Maintaining transparent contracts, engineering integrity, and dependable trade relationships.
  3. **Foundation**: Investing in physical capital, owned land parcels, and precision manufacturing facilities.
  4. **People**: Providing steady technical training, fair workplace safety, and professional dignity.
  5. **Process**: Standardising precision tolerances, audited food hygiene, and disciplined operating frameworks.
  6. **Service**: Delivering consistent after-sales commitment, long-term tenant care, and attentive community retail.

---

## 6. Updating Sector Panels (`/src/components/sections/BusinessesSection.tsx`)

The five expanding full-height sector panels on the homepage (#businesses) are configured in `SECTOR_CONFIG`:

```typescript
{
  slug: 'built-environment',
  numeral: '01',
  bgColor: '#1B5E38', // Deep Emerald
  textColor: '#FFFFFF',
  entities: [
    {
      slug: 'hrishikesh-ventures',
      name: 'Hrishikesh Ventures',
      tagline: 'Residential communities, plotted layouts, and commercial hubs in Ahmedabad.',
      url: '/businesses#hrishikesh-ventures',
      logo: '/logos/hrishikesh-ventures.svg',
    },
    {
      slug: 'hrs-aluglaze',
      name: 'HRS Aluglaze Ltd',
      tagline: 'Engineered facade and fenestration solutions with Sanand manufacturing plant.',
      url: '/businesses#hrs-aluglaze',
      logo: '/logos/hrs-aluglaze.svg',
      subEntity: {
        slug: 'geotrix',
        label: 'Geotrix',
        name: 'Southern India Engineering & Facade Execution',
        tagline: 'Bengaluru-based regional execution partner for high-rise commercial fenestration.',
        url: '/businesses#geotrix',
        logo: '/logos/geotrix.svg',
      },
    },
  ],
}
```

*Hierarchy Rule*: Geotrix is nested strictly under HRS Aluglaze; FirstGen assets/hotels/enterprises are nested strictly under the FirstGen banner.

---

## 7. Pre-Publish Validation Checklist

Before committing or publishing any content changes, run the automated validation suite:

```bash
# 1. Audit copy for prohibited buzzwords, em dashes, and exclamation marks
python scripts/audit_content_rules.py

# 2. Verify WCAG AA contrast across all flat colour fields
python scripts/verify_contrast.py

# 3. Test TypeScript compilation and static export generation
npm run build
```

When all three checks pass, your content is verified compliant with the HRS Group brand standards.
