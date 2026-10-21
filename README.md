# HRS Group — Official Parent Corporate Website

The official parent portal for **HRS Group**, an industrial, property, and consumer enterprise headquartered in Ahmedabad, Gujarat. The website presents a single group identity and routes institutional partners, clients, and prospective employees to eight operating businesses within two clicks.

---

## 1. Operating Entities & Sectors

- **Built Environment**:
  - **HRS Aluglaze Ltd**: Large-scale facade engineering and architectural glazing (Sanand Works).
  - **Geotrix Pvt. Ltd.**: Southern India execution and installation division (Bengaluru).
  - **School of Facade Technologies (SoFT)**: Vocational trade academy and professional upskilling.
  - **Hrishikesh Ventures**: Real estate developer with 13 developments across western Ahmedabad.
- **Food and Consumer**:
  - **Hrishikesh Food Products**: Whole spice processing, cryogenic milling, and private label packing (Bavla).
  - **Hrishikesh Consumer Products**: 13 consumer brands including Manpras neighbourhood stores.
- **Hospitality, Leasing & Retail**:
  - **FirstGen Pvt. Ltd.**: Holding umbrella overseeing FirstGen Assets, FirstGen Hotels (Flight Stays & Amuktamalyada), and FirstGen Enterprises (The Bluprint & ShubhVista).
- **Services**:
  - **Indian Brand House**: Strategic branding, editorial packaging, and performance marketing.

---

## 2. Technology Stack & Design System

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript.
- **Styling**: Tailwind CSS v4 with custom CSS design tokens.
- **Typography**:
  - Headings: `Newsreader` (Editorial serif, generous leading).
  - Interface & Body: `Hanken Grotesk` (Clean geometric grotesque).
- **Core Design Tokens**:
  - Canvas: `--white: #FFFFFF`
  - Paper: `--paper: #F7F6F3`
  - Ink: `--ink: #141414`
  - Muted: `--muted: #6B6B66`
  - Rule: `--rule: #E6E4DF`
  - Accent: `--orange: #F58220` (strict micro-accent: 2px focus ring, status dot, hover underline).
- **Design Philosophy**: Minimal, spacious, typography-led. Hairline rules (1px) instead of drop-shadow cards; zero decorative gradients; zero icons inside circles; zero motion beyond calm hover color shifts.

---

## 3. Local Development

### Prerequisites
- Node.js 20.x or 24.x
- npm 10.x+

### Setup & Run
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Production Build & Deployment

### Build
To compile the static production bundle and pre-render all 70+ routes:
```bash
npm run build
```

### Run Production Server
```bash
npm run start
```

### Deployment Targets
- **Vercel**: Connect the repository and configure root directory. Builds automatically.
- **Docker / Linux Container**: Run `npm run build` and start with standard Node.js server (`next start`).
- **Environment Variables**:
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Optional): Google Analytics 4 measurement ID for consent-aware tracking.

---

## 5. Content Management & QA

- For editing copy, adding projects, consumer brands, job roles, or news statements, refer to [`docs/CONTENT_GUIDE.md`](./docs/CONTENT_GUIDE.md).
- To verify link integrity and responsive viewports, run the Puppeteer verification suite:
  ```bash
  node verify_phase5_qa.js
  ```
