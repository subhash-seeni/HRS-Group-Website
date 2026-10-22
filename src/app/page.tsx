import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { OpeningHero } from '@/components/sections/homepage/OpeningHero';
import { AboutReveal } from '@/components/sections/homepage/AboutReveal';
import { BusinessesFilter } from '@/components/sections/BusinessesFilter';
import { SelectedWorkParallax } from '@/components/sections/homepage/SelectedWorkParallax';
import { ValuesSticky } from '@/components/sections/homepage/ValuesSticky';
import { WhereWeWorkCounter } from '@/components/sections/homepage/WhereWeWorkCounter';
import { NewsThumbnailRows } from '@/components/sections/homepage/NewsThumbnailRows';
import { CareersContactBlock } from '@/components/sections/homepage/CareersContactBlock';

export const metadata: Metadata = {
  title: 'HRS Group',
  description:
    'HRS Group is an Ahmedabad-based parent enterprise bringing together eight businesses across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.',
  openGraph: {
    title: 'HRS Group',
    description:
      'Eight operating entities across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.',
    url: 'https://hrsgroup.in',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HRS Group',
    description:
      'Eight operating entities across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HRS Group',
    url: 'https://hrsgroup.in',
    logo: 'https://hrsgroup.in/logos/hrs-group.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380054',
      addressCountry: 'IN',
    },
    subOrganization: [
      { '@type': 'Organization', name: 'Hrishikesh Ventures' },
      { '@type': 'Organization', name: 'HRS Aluglaze Ltd' },
      { '@type': 'Organization', name: 'Geotrix Pvt. Ltd.' },
      { '@type': 'Organization', name: 'School of Facade Technologies' },
      { '@type': 'Organization', name: 'Hrishikesh Food Products' },
      { '@type': 'Organization', name: 'Hrishikesh Consumer Products' },
      { '@type': 'Organization', name: 'FirstGen Pvt. Ltd.' },
      { '@type': 'Organization', name: 'Indian Brand House' },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
        {/* ========================================================
            SECTION 1: OPENING (WHITE)
            Line-by-line statement rise (SplitHeading), text links
            fade-in, wide image reveal with ImageReveal, and
            scroll-scrubbed expansion to full width / 80vh with
            caption fade-out.
        ======================================================== */}
        <OpeningHero />

        {/* ========================================================
            SECTION 2: ABOUT (STONE)
            Word-by-word scroll-scrubbed opacity reveal (25% to 100%)
            and LineLink for 'Read the story'.
        ======================================================== */}
        <AboutReveal />

        {/* ========================================================
            SECTION 3: BUSINESSES (WHITE)
            Filter bar, row hover dimming other rows to 40%, 8px name
            shift, sliding orange arrow, and 4:5 smoothed cursor
            preview (280px wide). 400ms layout animation on filter.
        ======================================================== */}
        <Section surface="white" id="businesses" className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="space-y-12">
              <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal">
                Our businesses
              </SplitHeading>

              <BusinessesFilter />
            </div>
          </Container>
        </Section>

        {/* ========================================================
            SECTION 4: SELECTED WORK (INK)
            Warm white heading with orange emphasis word, two images
            with ImageReveal and asymmetric parallax speeds, 1.03
            hover scale over 800ms, and appearing caption arrow.
        ======================================================== */}
        <SelectedWorkParallax />

        {/* ========================================================
            SECTION 5: VALUES (STONE)
            Sticky left column with heading, six numbered values on
            right with hairlines. Center-viewport value is 100%
            opacity with scaling orange numeral, others at 30%.
        ======================================================== */}
        <ValuesSticky />

        {/* ========================================================
            SECTION 6: WHERE WE WORK (WHITE)
            1.2s ease-out tabular numeral count-up for all 4 facts
            once in view, and place names fade up in sequence.
        ======================================================== */}
        <WhereWeWorkCounter />

        {/* ========================================================
            SECTION 7: NEWS (WHITE)
            Headline shifts 8px right on hover, stationary date and
            entity name, and 3:2 thumbnail slides in from the right.
        ======================================================== */}
        <NewsThumbnailRows />

        {/* ========================================================
            SECTION 8: CAREERS AND CONTACT (ORANGE BLOCK)
            The single deliberate orange surface on the homepage.
            Two columns with large Newsreader text links, arrows
            rotating 45 degrees on hover, and ink underline drawing
            left to right.
        ======================================================== */}
        <CareersContactBlock />
      </div>
    </>
  );
}
