# HRS Group Portal — Content Management Guide

This guide instructs site administrators, editors, and developers on how to maintain, update, and expand content across the official parent website for HRS Group.

All copy, project registries, brand catalogs, news announcements, and career postings are decoupled from React presentation logic and strictly managed in TypeScript structured data files inside `/src/content/`.

---

## 1. Content Architecture Overview

```
src/content/
├── siteSettings.ts       # Group brand name, headquarters address, regional office, navigation links
├── entities.ts           # Complete specifications, systems, and overviews for all 8 entities + 3 divisions
├── projects.ts           # Portfolio registry for all 16 developments and industrial facade deliveries
├── brands.ts             # Registry of all 13 consumer brands (6 active, 7 upcoming) + group ventures
├── jobs.ts               # Open careers, employee quotes, values in action, employee benefits
├── news.ts               # Official press statements, infrastructure handovers, and curriculum notices
├── values.ts             # Six core values: Faith, Trust, Foundation, People, Process, Service
├── milestones.ts         # Historical corporate timeline (2008–2026)
├── leadership.ts         # Board of directors and executive leadership profiles
└── types.ts              # TypeScript interface definitions governing all data structures
```

---

## 2. Updating Existing Content Files

### A. Updating Headquarters & Contact Information (`siteSettings.ts`)
Edit `siteSettings.ts` to update postal addresses, corporate phone numbers, or administrative contacts:
```typescript
export const siteSettings: SiteSettings = {
  groupName: 'HRS Group',
  headquarters: {
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev',
    phone: '+91 79 4000 8900',
    email: 'info@hrsgroup.in',
  },
  // ...
};
```

### B. Updating Entity Details & Capabilities (`entities.ts`)
Each entity record contains:
- `slug`: URL identifier (e.g. `hrs-aluglaze`, `geotrix`, `school-of-facade-technologies`)
- `name`: Official registered trade name
- `sector`: One of `'Built Environment'`, `'Food and Consumer'`, `'Hospitality, Leasing & Retail'`, `'Services'`
- `summary`: One declarative sentence defining the company
- `offerings`: High-level capability bullet points
- `detailedOfferings`: Structured offerings with titles and technical descriptions
- `aluglazeData`, `foodData`, `softData`, `firstgenData`, etc.: Entity-specific fields rendered conditionally in templates.

**Writing Guidelines:**
- Use strictly factual, declarative sentences.
- Never use buzzwords: *seamless*, *cutting-edge*, *innovative*, *synergy*, *unlock*, *elevate*, *tapestry*.
- Do not use em dashes (`—`) or exclamation marks (`!`).
- Specific location details: Bodakdev, Shela, Sanand, Bavla, Kadubeesanahalli (Outer Ring Road, Bengaluru).

---

## 3. How to Swap `ImageSlot` Visuals for Real Photos

Every visual container on the portal uses the typography-led `<ImageSlot />` component with fixed aspect ratios (`16:9`, `4:3`, `1:1`, `21:9`) and caption labels.

### Step 1: Place Real Media in Public Directory
Copy optimized `.webp` or `.jpg` image files into `/public/images/`:
```
public/images/
├── aluglaze-sanand-bay.webp
├── bavla-cryogenic-line.webp
└── h2-shela-facade.webp
```

### Step 2: Reference in Content or Template
In `src/content/entities.ts` or component template, set the `src` property of the `ImageSlot`:
```tsx
<ImageSlot
  src="/images/aluglaze-sanand-bay.webp"
  alt="Automated CNC double-head cutting line at Sanand works"
  aspectRatio="16/9"
  caption="CNC precision machining bay, Sanand Industrial Estate, Ahmedabad"
/>
```
If no `src` is provided, `ImageSlot` automatically renders an architectural placeholder slot displaying aspect ratio, coordinate marks, and the factual muted caption.

---

## 4. How to Add a New Item

### A. Adding a New Real Estate or Engineering Project
Open `src/content/projects.ts` and add an object to the `projects` array:
```typescript
{
  slug: 'hrishikesh-11',
  name: 'Hrishikesh 11 Residential Enclave',
  entitySlug: 'hrishikesh-ventures',
  sector: 'Built Environment',
  typology: 'residential',
  location: 'South Bopal, Ahmedabad',
  yearCompletedOrStatus: 'Under construction (Target Q4 2027)',
  scale: '96 three-bedroom residential units across 14 storeys',
  description: 'Reinforced concrete frame with aerated autoclaved block masonry, cross-ventilated dual-aspect floor plans, and low-e fenestration.',
}
```
*Note:* The Next.js dynamic route at `/projects/[slug]` will automatically generate a static page for this project during build.

### B. Adding a New Consumer Brand
Open `src/content/brands.ts` and add to the `brands` array:
```typescript
{
  slug: 'new-brand-slug',
  name: 'Brand Name',
  category: 'Cold-Pressed Seed Oils',
  parentEntitySlug: 'hrishikesh-consumer-products',
  status: 'active', // or 'in-development'
  description: 'Single-press mustard and groundnut oils bottled without chemical refining at Bavla plant.',
  offerings: ['Cold-pressed mustard oil 1L', 'Filter groundnut oil 5L'],
}
```

### C. Adding a New Job Opening
Open `src/content/jobs.ts` and add an item to `jobOpenings`:
```typescript
{
  id: 'job-alu-03',
  slug: 'facade-site-quality-inspector',
  title: 'Facade Site Quality Inspector',
  entitySlug: 'hrs-aluglaze',
  department: 'Quality Assurance',
  location: 'Ahmedabad, Gujarat',
  employmentType: 'Full-time',
  experienceLevel: '4+ years',
  postedDate: '21 October 2026',
  description: 'Conducts daily torque checks, sealant adhesion peel tests, and water hose tests on site.',
  responsibilities: [
    'Inspect torque calibration on anchor bracket bolts',
    'Perform field hose testing in accordance with AAMA 501.2',
  ],
  requirements: [
    'Diploma in Civil or Mechanical Engineering',
    '3+ years on-site quality inspection for architectural glazing',
  ],
}
```
*Note:* This immediately exposes the role in `/careers`, includes it in `/careers/[slug]`, and generates `JobPosting` JSON-LD.

### D. Adding a New Press Release / News Story
Open `src/content/news.ts` and add an item to `news`:
```typescript
{
  slug: 'sanand-acoustic-testing-bay-commissioned',
  title: 'HRS Aluglaze commissions calibrated sound-transmission test chamber at Sanand',
  date: '21 October 2026',
  entitySlug: 'hrs-aluglaze',
  category: 'Built Environment',
  readTime: '3 min read',
  summary: 'The laboratory allows acoustic attenuation measurements up to 48 dB for double-glazed facade prototypes.',
  content: [
    'HRS Aluglaze Ltd has installed a sound transmission suite at its Sanand engineering headquarters.',
    'The bay measures sound transmission loss across double-glazed curtain wall assemblies according to ASTM E90 standards.',
  ],
  pullQuote: {
    text: 'Pre-construction acoustic calibration guarantees interior noise criteria in airport and highway commercial developments.',
    author: 'Acoustic Engineer, HRS Aluglaze',
  },
  relatedSlugs: ['soft-curriculum-framework'],
}
```
*Note:* The story will automatically publish to `/news`, create its article page at `/news/[slug]`, generate `Article` schema, and update `/news/rss.xml`.

---

## 5. Contact Enquiries & CRM Integration

When a visitor submits the form at `/contact`, it posts to `/api/contact/route.ts`.
To connect a commercial CRM (e.g. Salesforce, HubSpot) or send direct notification emails via SendGrid/AWS SES:
1. Open `src/app/api/contact/route.ts`.
2. Update the `dispatchToCrmOrEmail(payload)` function to invoke your API client.
3. Supply required credentials via standard environment variables:
   ```bash
   CRM_API_KEY=your_key_here
   ALERT_EMAIL_RECIPIENT=commercial@hrsgroup.in
   ```
