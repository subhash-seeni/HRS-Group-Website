'use client';

import React, { useState } from 'react';
import {
  Container,
  SectionHeading,
  Button,
  Row,
  Breadcrumbs,
  Tabs,
  Accordion,
  Input,
  Select,
  Textarea,
  Caption,
  ImageSlot,
  Logo,
} from '@/components/ui';
import { SplitHeading } from '@/components/motion';

export default function StyleguidePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [inputValue, setInputValue] = useState('Pakwan Cross Roads, SG Highway');
  const [hasInputError, setHasInputError] = useState(true);

  const colourTokens = [
    { token: '--white', hex: '#FFFFFF', name: 'White', usage: 'Primary page background surface' },
    { token: '--paper', hex: '#F7F6F3', name: 'Paper', usage: 'Rare alternate section band' },
    { token: '--ink', hex: '#141414', name: 'Ink', usage: 'Primary text, headings, dark tiles' },
    { token: '--muted', hex: '#6B6B66', name: 'Muted', usage: 'Secondary copy, captions, metadata' },
    { token: '--rule', hex: '#E6E4DF', name: 'Rule', usage: '1px hairlines and list dividers' },
    { token: '--slot', hex: '#ECEAE5', name: 'Slot', usage: 'Flat image placeholder blocks' },
    { token: '--orange', hex: '#F58220', name: 'Orange', usage: 'Micro-accent only: marker, hover, focus' },
  ];

  const spacingScale = [
    { token: '--space-1', px: '8px', label: '8px base unit' },
    { token: '--space-2', px: '16px', label: 'Compact gap' },
    { token: '--space-3', px: '24px', label: 'Standard padding' },
    { token: '--space-4', px: '32px', label: 'Card & section spacing' },
    { token: '--space-5', px: '40px', label: 'Medium layout offset' },
    { token: '--space-6', px: '48px', label: 'Container desktop padding' },
    { token: '--space-8', px: '64px', label: 'Major module gap' },
    { token: '--space-10', px: '80px', label: 'Header height / Mobile section gap' },
    { token: '--space-15', px: '120px', label: 'Large division offset' },
    { token: '--space-20', px: '160px', label: 'Desktop section gap min' },
    { token: '--space-30', px: '240px', label: 'Desktop section gap max' },
  ];

  const breadcrumbItems = [
    { label: 'Overview', href: '/' },
    { label: 'Built environment', href: '/sectors/built-environment' },
    { label: 'HRS Aluglaze Ltd' },
  ];

  const tabItems = [
    { id: 'overview', label: 'Overview', count: 8 },
    { id: 'manufacturing', label: 'Manufacturing lines', count: 3 },
    { id: 'certifications', label: 'Certifications', count: 5 },
    { id: 'contacts', label: 'Regional contacts' },
  ];

  const accordionItems = [
    {
      id: 'acc-1',
      title: 'What architectural systems does HRS Aluglaze deliver?',
      content:
        'HRS Aluglaze engineers, extrudes, and installs unitised curtain wall systems, semi-unitised structural glazing, acoustic double-glazed windows, and exterior aluminium louvres for commercial and institutional projects.',
    },
    {
      id: 'acc-2',
      title: 'How does Geotrix operate within the group?',
      content:
        'Geotrix is a Bengaluru-based facade engineering specialist acquired by HRS Aluglaze. It functions as Aluglaze South India delivery arm, managing site erection and regional client relations in Karnataka, Tamil Nadu, and Telangana.',
    },
    {
      id: 'acc-3',
      title: 'What educational programmes are offered by SoFT?',
      content:
        'The School of Facade Technologies conducts three distinct pathways: one-year diplomas for fresh engineering graduates, vocational certification courses for site installers and fabricators, and professional masterclasses for practicing architects.',
    },
  ];

  const selectOptions = [
    { value: 'commercial', label: 'Commercial office building' },
    { value: 'residential', label: 'Residential development' },
    { value: 'institutional', label: 'Institutional campus' },
    { value: 'industrial', label: 'Manufacturing & logistics facility' },
  ];

  return (
    <div className="py-16 md:py-24 bg-[var(--white)] text-[var(--ink)]">
      <Container>
        {/* Styleguide Header */}
        <header className="hairline-b pb-8 mb-16 md:mb-20">
          <div className="grid grid-cols-12 gap-6 items-baseline">
            <div className="col-span-12 md:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-[var(--orange)] inline-block" />
                <span className="text-[13px] text-[var(--muted)] font-sans">
                  Internal design system &bull; Phase 1 specification
                </span>
              </div>
              <SplitHeading as="h1" className="text-display-1 text-[var(--ink)]" text="Design system & global layout" />
            </div>
            <div className="col-span-12 md:col-span-5">
              <p className="text-[17px] leading-relaxed text-[var(--muted)] font-sans">
                Living documentation of colour tokens, fluid typography, 8px spacing,
                UI primitives, form controls, and layout components for the HRS Group parent site.
              </p>
            </div>
          </div>
        </header>

        {/* Section 1: Colour Palette Tokens */}
        <section className="mb-24">
          <SectionHeading
            as="h2"
            title="Colour palette tokens"
            intro="Strict minimal palette. Orange is disciplined exclusively to micro-accents: markers, hover underlines, and focus rings."
            className="mb-8"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {colourTokens.map((c) => (
              <div key={c.token} className="space-y-2">
                <div
                  className="w-full h-24 border border-[var(--rule)]"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-[14.5px] font-medium text-[var(--ink)] font-sans">
                  {c.name}
                </div>
                <div className="text-[12px] text-[var(--muted)] font-sans">
                  <code>{c.token}</code>
                </div>
                <div className="text-[12px] text-[var(--muted)] font-sans">{c.hex}</div>
                <div className="text-[11.5px] text-[var(--muted)] font-sans leading-tight pt-1">
                  {c.usage}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Fluid Typography Scale */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="Typography scale"
            intro="Newsreader for editorial headings; Hanken Grotesk for body and interface. Sentence case everywhere."
            className="mb-12"
          />
          <div className="space-y-10">
            <div className="hairline-b pb-8">
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-2">
                Display 1 &bull; Newsreader &bull; clamp(2.75rem, 6vw, 5.5rem)
              </span>
              <div className="text-display-1">
                Built environment and consumer enterprise
              </div>
            </div>

            <div className="hairline-b pb-8">
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-2">
                Display 2 &bull; Newsreader &bull; clamp(2.25rem, 4.5vw, 4rem)
              </span>
              <div className="text-display-2">
                Engineering facade systems for commercial architecture
              </div>
            </div>

            <div className="hairline-b pb-8">
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-2">
                Heading 1 &bull; Newsreader &bull; clamp(1.85rem, 3.2vw, 2.75rem)
              </span>
              <div className="text-heading-1">
                Automated cryogenic spice milling and packaging
              </div>
            </div>

            <div className="hairline-b pb-8">
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-2">
                Heading 2 &bull; Newsreader &bull; clamp(1.4rem, 2.2vw, 2rem)
              </span>
              <div className="text-heading-2">
                Eight operating entities under one group foundation
              </div>
            </div>

            <div className="hairline-b pb-8">
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-2">
                Heading 3 &bull; Newsreader &bull; clamp(1.15rem, 1.5vw, 1.45rem)
              </span>
              <div className="text-heading-3">
                Regional commercial leasing and logistics storage
              </div>
            </div>

            <div className="hairline-b pb-8">
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-2">
                Body Prose &bull; Hanken Grotesk &bull; 17.5px / 1.6 line height / max 62ch
              </span>
              <p className="text-[17.5px] leading-[1.6] text-[var(--ink)] font-sans max-w-[62ch]">
                HRS Group brings together eight entities spanning facade engineering, real estate,
                food manufacturing, consumer brands, hospitality, education, brand communications
                and retail. Headquarters are situated on SG Highway in Ahmedabad, with southern
                facilities located on the Outer Ring Road in Bengaluru.
              </p>
            </div>

            <div>
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-2">
                Caption & Metadata &bull; Hanken Grotesk &bull; 13.5px
              </span>
              <Caption>
                Sanand GIDC manufacturing facility: automated precision cutting and CNC routing lines.
              </Caption>
            </div>
          </div>
        </section>

        {/* Section 3: 8px Base Spacing Scale */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="8px spacing scale"
            intro="Built on an 8px rhythmic foundation. Vertical section spacing: 160px–240px desktop, 80px mobile."
            className="mb-8"
          />
          <div className="space-y-4">
            {spacingScale.map((s) => (
              <div
                key={s.token}
                className="flex items-center gap-4 text-[13.5px] font-sans"
              >
                <div className="w-28 text-[var(--muted)]">
                  <code>{s.token}</code>
                </div>
                <div className="w-16 tabular-nums text-[var(--ink)] font-medium">
                  {s.px}
                </div>
                <div
                  className="h-5 bg-[var(--ink)]"
                  style={{ width: s.px, minWidth: '4px' }}
                />
                <div className="text-[12px] text-[var(--muted)]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Buttons & Interactive Elements */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="Buttons & actions"
            intro="Primary button is solid ink with white text; on hover it turns orange with ink text. Secondary is a text-link with a hairline underline turning orange on hover."
            className="mb-8"
          />
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[12px] text-[var(--muted)] font-sans block">
                Primary Button States
              </span>
              <div className="flex flex-wrap items-center gap-6">
                <Button variant="primary">Send an enquiry</Button>
                <Button variant="primary" disabled>
                  Action disabled
                </Button>
                <Button variant="primary" size="small">
                  Small action
                </Button>
                <Button variant="primary" size="large">
                  Large action
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[12px] text-[var(--muted)] font-sans block">
                Secondary Text-Link & Outline Buttons
              </span>
              <div className="flex flex-wrap items-center gap-8">
                <Button variant="secondary">See live developments</Button>
                <Button variant="secondary" size="small">
                  Read announcement
                </Button>
                <Button variant="outline">Download specifications</Button>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[12px] text-[var(--muted)] font-sans block">
                Editorial Links (Hover to observe 2px orange underline)
              </span>
              <div className="flex flex-wrap items-center gap-8">
                <a href="#link" className="link-editorial">
                  Learn about Hrishikesh Ventures
                </a>
                <a href="#link" className="link-editorial">
                  Explore Sanand production capacity
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Typographic List Rows (Lists, Not Cards) */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="Typographic list rows"
            intro="Typographic rows separated by 1px hairlines. Strictly no cards, no rounded containers, no box shadows."
            className="mb-8"
          />
          <div className="border-t border-[var(--rule)]">
            <Row
              index={1}
              name="HRS Aluglaze Ltd"
              description="High-performance aluminium facade systems and structural glazing engineered in Sanand."
              meta="Sanand &bull; 450,000 sq m"
              href="#aluglaze"
            />
            <Row
              index={2}
              name="Hrishikesh Ventures"
              description="Thirteen residential and commercial developments across key Ahmedabad growth corridors."
              meta="Ahmedabad &bull; 13 Projects"
              href="#ventures"
            />
            <Row
              index={3}
              name="Geotrix Pvt. Ltd."
              description="South India facade operations executing commercial tech parks in Bengaluru and Hyderabad."
              meta="Bengaluru &bull; Peenya"
              href="#geotrix"
            />
            <Row
              index={4}
              name="Hrishikesh Food Products"
              description="Automated cryogenic spice processing and contract packaging facility at Bavla."
              meta="Bavla &bull; FSSAI & HACCP"
              href="#food"
            />
            <Row
              logoEntity="geotrix"
              name="Geotrix Pvt. Ltd."
              subtier="HRS Aluglaze South India division"
              description="South India facade operations executing commercial tech parks in Bengaluru and Hyderabad."
              meta="Bengaluru &bull; Peenya"
              href="#geotrix"
            />
          </div>
        </section>

        {/* Section 6: Breadcrumbs, Tabs & Accordions */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="Navigation primitives"
            intro="Breadcrumbs with hairline slashes, plain text tabs with orange active dot, and hairline-separated accordions."
            className="mb-8"
          />
          <div className="space-y-12">
            <div>
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-3">
                Breadcrumbs Trail
              </span>
              <Breadcrumbs items={breadcrumbItems} />
            </div>

            <div>
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-3">
                Plain Text Tabs (Observe active orange dot marker)
              </span>
              <Tabs
                tabs={tabItems}
                activeId={activeTab}
                onChange={setActiveTab}
                ariaLabel="Entity information tabs"
              />
              <div className="py-4 text-[15px] text-[var(--muted)] font-sans">
                Active tab: <strong className="text-[var(--ink)]">{activeTab}</strong>
              </div>
            </div>

            <div>
              <span className="text-[12px] text-[var(--muted)] font-sans block mb-3">
                Hairline Accordion
              </span>
              <Accordion items={accordionItems} defaultOpen={['acc-1']} />
            </div>
          </div>
        </section>

        {/* Section 7: Form Controls with Clear Error States */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="Form controls"
            intro="1px hairline borders, square corners (max 2px radius), 2px orange focus rings, and explicit error feedback."
            className="mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
            {/* Input normal */}
            <Input
              label="Full name"
              placeholder="e.g. Subhash Sharma"
              helperText="Enter your official contact name"
              required
            />

            {/* Input with error */}
            <Input
              label="Email address"
              type="email"
              value="invalid-email-format"
              onChange={(e) => setInputValue(e.target.value)}
              error="Please enter a valid business email address"
              required
            />

            {/* Select normal */}
            <Select
              label="Project typology"
              options={selectOptions}
              placeholder="Select project category"
              helperText="Choose the primary classification for your enquiry"
            />

            {/* Select with error */}
            <Select
              label="Operating entity"
              options={[
                { value: 'hrs-aluglaze', label: 'HRS Aluglaze Ltd' },
                { value: 'hrishikesh-ventures', label: 'Hrishikesh Ventures' },
                { value: 'firstgen', label: 'FirstGen Pvt. Ltd.' },
              ]}
              placeholder="Choose entity"
              error="Please select an entity before proceeding"
              required
            />

            {/* Textarea */}
            <div className="md:col-span-2">
              <Textarea
                label="Enquiry specification"
                rows={4}
                placeholder="Describe project requirements, approximate square footage, or location..."
                helperText="Factual project specifications help route your enquiry efficiently"
              />
            </div>
          </div>
        </section>

        {/* Section 8: ImageSlot & True Aspect Ratios */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="ImageSlot primitives"
            intro="Flat --slot background blocks in true 3:2 and 4:5 aspect ratios. Strictly square corners, zero placeholder icons or text."
            className="mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ImageSlot
              aspectRatio="3:2"
              caption="True 3:2 aspect ratio block intended for architectural elevation photography."
            />
            <ImageSlot
              aspectRatio="4:5"
              caption="True 4:5 vertical portrait block for facade section details and executive profiles."
            />
          </div>
        </section>

        {/* Section 9: Logos & Wordmark System */}
        <section className="mb-24 hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="Logo component & wordmarks"
            intro="Placeholder wordmarks in Newsreader with orange micro-squares. HRS Aluglaze renders the official white-on-black mark on an ink tile."
            className="mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-[var(--rule)]">
              <span className="text-[11.5px] text-[var(--muted)] font-sans block mb-2">
                Parent Logo: hrs-group
              </span>
              <Logo entity="hrs-group" height={32} />
            </div>

            <div className="p-4 border border-[var(--rule)]">
              <span className="text-[11.5px] text-[var(--muted)] font-sans block mb-2">
                Official Tile: hrs-aluglaze
              </span>
              <Logo entity="hrs-aluglaze" height={32} />
            </div>

            <div className="p-4 border border-[var(--rule)]">
              <span className="text-[11.5px] text-[var(--muted)] font-sans block mb-2">
                Wordmark: hrishikesh-ventures
              </span>
              <Logo entity="hrishikesh-ventures" height={32} />
            </div>

            <div className="p-4 border border-[var(--rule)]">
              <span className="text-[11.5px] text-[var(--muted)] font-sans block mb-2">
                Wordmark: school-of-facade-technologies
              </span>
              <Logo entity="school-of-facade-technologies" height={32} />
            </div>

            <div className="p-4 border border-[var(--rule)]">
              <span className="text-[11.5px] text-[var(--muted)] font-sans block mb-2">
                Wordmark: firstgen
              </span>
              <Logo entity="firstgen" height={32} />
            </div>

            <div className="p-4 border border-[var(--rule)]">
              <span className="text-[11.5px] text-[var(--muted)] font-sans block mb-2">
                Wordmark: indian-brand-house
              </span>
              <Logo entity="indian-brand-house" height={32} />
            </div>
          </div>
        </section>

        {/* Section 10: Quality & Banned Patterns Compliance */}
        <section className="hairline-t pt-16">
          <SectionHeading
            as="h2"
            title="Design compliance & quality bar"
            intro="Verified adherence to architectural minimal aesthetic and strict workspace guidelines."
            className="mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14.5px] font-sans">
            <div className="border border-[var(--rule)] p-6 space-y-3">
              <div className="font-serif text-[18px] text-[var(--ink)]">
                Orange micro-accent discipline
              </div>
              <ul className="space-y-1.5 text-[var(--muted)] m-0 pl-4 list-disc">
                <li>Orange is used strictly as a dot marker, hover underline, and focus ring.</li>
                <li>Orange is never used as body text colour on white.</li>
                <li>Orange is never used in background fills or gradients.</li>
                <li>Primary button transitions to orange on hover with ink text.</li>
              </ul>
            </div>

            <div className="border border-[var(--rule)] p-6 space-y-3">
              <div className="font-serif text-[18px] text-[var(--ink)]">
                Banned pattern avoidance
              </div>
              <ul className="space-y-1.5 text-[var(--muted)] m-0 pl-4 list-disc">
                <li>Zero dark heroes, gradient glows, or blurred blobs.</li>
                <li>Zero rounded card boxes or box shadows.</li>
                <li>Zero uppercase tracked eyebrows or monospace fonts.</li>
                <li>Zero buzzwords (unlock, elevate, seamless, cutting-edge, innovative).</li>
              </ul>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
