import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, ImageSlot, InteractiveBackground } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { aboutContent } from '@/content/about';
import { groupValues } from '@/content/values';
import { milestones } from '@/content/milestones';
import { leadership } from '@/content/leadership';
import { MilestonesTimeline } from '@/components/sections/about/MilestonesTimeline';
import { LeadershipGrid } from '@/components/sections/about/LeadershipGrid';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Founded in Ahmedabad in 2008, HRS Group coordinates eight operating businesses across facade engineering, property development, food manufacturing, hospitality, education, and brand communications.',
  openGraph: {
    title: 'About | HRS Group',
    description:
      'Grounded in Ahmedabad: sixteen years of industrial manufacturing, real estate development, consumer brands, and technical trade education.',
    url: 'https://hrsgroup.in/about',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | HRS Group',
    description:
      'Grounded in Ahmedabad: sixteen years of industrial manufacturing, real estate development, consumer brands, and technical trade education.',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About HRS Group',
    description: aboutContent.statement,
    url: 'https://hrsgroup.in/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'HRS Group',
      foundingDate: '2008',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380054',
        addressCountry: 'IN',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'HRS Group',
        item: 'https://hrsgroup.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://hrsgroup.in/about',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
        {/* ========================================================
            SECTION 1: STATEMENT
            Short statement in large Newsreader type with generous space above.
        ======================================================== */}
        <Section surface="white" className="relative pt-[16vh] md:pt-[20vh] pb-20 md:pb-28 overflow-hidden">
          <InteractiveBackground variant="inner" />
          <Container className="relative z-10">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3 text-[14.5px] text-[var(--muted)] font-sans">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>Headquartered in Bodakdev, Ahmedabad &bull; Operating across Gujarat and South India</span>
                </div>
                <SplitHeading as="h1" className="text-display-1 text-[var(--ink)] font-normal tracking-tight">
                  {aboutContent.statement}
                </SplitHeading>
                {aboutContent.curiosityHook && (
                  <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                    {aboutContent.curiosityHook}
                  </p>
                )}
              </div>
            </div>

            {/* Generous gap, wide ImageSlot */}
            <div className="mt-16 md:mt-24">
              <ImageSlot
                aspectRatio="16:9"
                priority
                caption="HRS Group corporate offices on SG Highway, Ahmedabad, coordinating group administrative governance and project allocations."
              />
            </div>
          </Container>
        </Section>

        {/* ========================================================
            SECTION 2: THE STORY
            The story in plain paragraphs with Ahmedabad roots in cols 4-9.
        ======================================================== */}
        <Section surface="stone" className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0">
                  The story
                </SplitHeading>
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-2 m-0 max-w-[26ch]">
                  Sixteen years of industrial and property enterprise in western India.
                </p>
              </div>

              <div className="col-span-12 md:col-span-7 md:col-start-4 space-y-6">
                {aboutContent.story.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-[18px] md:text-[19px] leading-[1.65] text-[var(--ink)] font-sans m-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ========================================================
            SECTION 3: VALUES (IN DEPTH)
            The six values in a little more depth than the homepage.
        ======================================================== */}
        <Section surface="white" className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0">
                  Values
                </SplitHeading>
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-2 m-0 max-w-[26ch]">
                  Operating principles informing governance across all group boards.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-8 lg:col-start-4 border-t border-[var(--rule)]">
                {groupValues.map((val) => (
                  <div
                    key={val.number}
                    className="py-8 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-4 flex items-baseline gap-3">
                      <span className="font-serif text-[15px] text-[var(--muted)] tabular-nums">
                        {val.number}
                      </span>
                      <span className="font-serif text-[21px] text-[var(--ink)] font-normal">
                        {val.name}
                      </span>
                    </div>
                    <div className="sm:col-span-8 space-y-2.5">
                      <p className="text-[16.5px] font-medium text-[var(--ink)] font-sans m-0">
                        {val.description}
                      </p>
                      {val.extendedDescription ? (
                        <p className="text-[15.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
                          {val.extendedDescription}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ========================================================
            SECTION 4: MILESTONES
            Milestone list with thin vertical timeline line that draws
            as you scroll, orange dot marking current year in view.
        ======================================================== */}
        <Section surface="stone" className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0">
                  Milestones
                </SplitHeading>
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-2 m-0 max-w-[26ch]">
                  Key corporate and industrial developments since founding.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9">
                <MilestonesTimeline milestones={milestones} />
              </div>
            </div>
          </Container>
        </Section>

        {/* ========================================================
            SECTION 5: LEADERSHIP
            Leadership portraits with ImageReveal and a quiet hover zoom.
        ======================================================== */}
        <Section surface="white" className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="mb-14 md:mb-20">
              <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0">
                Leadership
              </SplitHeading>
              <p className="text-[15px] text-[var(--muted)] font-sans mt-2 m-0">
                Executive directors and operating unit leadership across Gujarat and Karnataka.
              </p>
            </div>

            <LeadershipGrid leaders={leadership} />
          </Container>
        </Section>

        {/* ========================================================
            SECTION 6: GROUP STRUCTURE
            Simple indented text outline (HRS Group > sectors > entities),
            not a graphic.
        ======================================================== */}
        <Section surface="ink" className="py-24 md:py-36 border-t border-[rgba(255,255,255,0.14)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="text-heading-1 text-[#F5F2EC] font-normal m-0">
                  Group structure
                </SplitHeading>
                <p className="text-[13.5px] text-[rgba(245,242,236,0.75)] font-sans mt-2 m-0 max-w-[26ch]">
                  Parent enterprise governance and operational reporting lines.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9 border-t border-[rgba(255,255,255,0.14)] pt-6 font-sans">
                {/* Level 0: HRS Group Root */}
                <div className="pb-6 border-b border-[rgba(255,255,255,0.14)]">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[var(--orange)]" />
                    <span className="font-serif text-[24px] md:text-[26px] text-[#F5F2EC] font-normal">
                      {aboutContent.structure.groupName}
                    </span>
                    <span className="text-[13.5px] text-[rgba(245,242,236,0.75)]">
                      &bull; Parent Enterprise ({aboutContent.structure.registeredOffice})
                    </span>
                  </div>
                </div>

                {/* Level 1: Sectors */}
                <div className="divide-y divide-[rgba(255,255,255,0.14)]">
                  {aboutContent.structure.sectors.map((sector) => (
                    <div key={sector.name} className="py-8 pl-4 sm:pl-8 space-y-4">
                      {/* Sector Name */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[var(--orange)] text-[18px] select-none">&rarr;</span>
                          <span className="font-serif text-[20px] md:text-[22px] text-[#F5F2EC] font-normal">
                            {sector.name}
                          </span>
                        </div>
                        <span className="text-[13px] text-[rgba(245,242,236,0.75)] pl-6 sm:pl-0">
                          {sector.description}
                        </span>
                      </div>

                      {/* Level 2: Entities under Sector */}
                      <div className="pl-6 sm:pl-10 space-y-3 pt-2">
                        {sector.entities.map((entity) => (
                          <div
                            key={entity.slug}
                            className={`py-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[15px] ${
                              entity.indent
                                ? 'pl-4 sm:pl-6 border-l border-[rgba(255,255,255,0.14)]'
                                : ''
                            }`}
                          >
                            <Link
                              href={`/businesses/${entity.slug}`}
                              className="font-medium text-[#F5F2EC] hover:text-[var(--orange)] hover:underline underline-offset-4 decoration-[var(--orange)] flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                              <span>{entity.name}</span>
                            </Link>
                            <span className="text-[13.5px] text-[rgba(245,242,236,0.75)]">
                              {entity.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
