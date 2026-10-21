import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, ImageSlot, InteractiveBackground } from '@/components/ui';
import { aboutContent } from '@/content/about';
import { groupValues } from '@/content/values';
import { milestones } from '@/content/milestones';
import { leadership } from '@/content/leadership';

export const metadata: Metadata = {
  title: 'About — HRS Group, Ahmedabad',
  description:
    'Founded in Ahmedabad in 2008, HRS Group coordinates eight operating businesses across facade engineering, property development, food manufacturing, hospitality, education, and brand communications.',
  openGraph: {
    title: 'About — HRS Group, Ahmedabad',
    description:
      'Grounded in Ahmedabad: sixteen years of industrial manufacturing, real estate development, consumer brands, and technical trade education.',
    url: 'https://hrsgroup.in/about',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — HRS Group, Ahmedabad',
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
        <section className="relative pt-[16vh] md:pt-[20vh] pb-20 md:pb-28 overflow-hidden border-b border-[var(--rule)]">
          <InteractiveBackground variant="inner" />
          <Container className="relative z-10">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3 text-[14.5px] text-[var(--muted)] font-sans">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>Headquartered in Bodakdev, Ahmedabad &bull; Operating across Gujarat and South India</span>
                </div>
                <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight">
                  {aboutContent.statement}
                </h1>
                {aboutContent.curiosityHook && (
                  <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                    {aboutContent.curiosityHook}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Generous gap, wide ImageSlot */}
        <section className="py-20 md:py-28">
          <Container>
            <ImageSlot
              aspectRatio="16:9"
              caption="HRS Group corporate offices on SG Highway, Ahmedabad, coordinating group administrative governance and project allocations."
            />
          </Container>
        </section>

        {/* ========================================================
            SECTION 2: THE STORY
            The story in plain paragraphs with Ahmedabad roots in cols 4-9.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-heading-1 text-[var(--ink)] font-normal m-0">
                  The story
                </h2>
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
        </section>

        {/* ========================================================
            SECTION 3: VALUES (IN DEPTH)
            The six values in a little more depth than the homepage.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 lg:col-span-3">
                <h2 className="text-heading-1 text-[var(--ink)] font-normal m-0">
                  Values
                </h2>
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
        </section>

        {/* ========================================================
            SECTION 4: MILESTONES
            Milestone list: year in the left column, one line of text on right.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-heading-1 text-[var(--ink)] font-normal m-0">
                  Milestones
                </h2>
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-2 m-0 max-w-[26ch]">
                  Key corporate and industrial developments since founding.
                </p>
              </div>

              <div className="col-span-12 md:col-span-8 md:col-start-4 border-t border-[var(--rule)]">
                {milestones.map((m) => (
                  <div
                    key={m.year + m.location}
                    className="py-5 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-3 font-serif text-[24px] md:text-[26px] text-[var(--ink)] tabular-nums">
                      {m.year}
                    </div>
                    <div className="sm:col-span-9 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <p className="text-[16px] text-[var(--ink)] font-sans m-0">
                        {m.event}
                      </p>
                      <span className="text-[13px] text-[var(--muted)] font-sans flex-shrink-0">
                        {m.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 5: LEADERSHIP
            List of 6-8 people (name, role, two-line bio, portrait ImageSlot at 4:5).
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="mb-14 md:mb-20">
              <h2 className="text-heading-1 text-[var(--ink)] font-normal m-0">
                Leadership
              </h2>
              <p className="text-[15px] text-[var(--muted)] font-sans mt-2 m-0">
                Executive directors and operating unit leadership across Gujarat and Karnataka.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {leadership.map((leader) => (
                <div key={leader.name} className="space-y-4">
                  {/* Portrait ImageSlot at 4:5 */}
                  <ImageSlot aspectRatio="4:5" />

                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] font-normal m-0">
                      {leader.name}
                    </h3>
                    <p className="text-[13.5px] font-medium text-[var(--ink)] font-sans m-0">
                      {leader.title}
                    </p>
                    <p className="text-[13px] text-[var(--muted)] font-sans m-0">
                      {leader.focusArea}
                    </p>
                    <p className="text-[14.5px] leading-relaxed text-[var(--muted)] font-sans pt-2 m-0 border-t border-[var(--rule)]">
                      {leader.biography}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 6: GROUP STRUCTURE
            Simple indented text outline (HRS Group > sectors > entities),
            not a graphic.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-heading-1 text-[var(--ink)] font-normal m-0">
                  Group structure
                </h2>
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-2 m-0 max-w-[26ch]">
                  Parent enterprise governance and operational reporting lines.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] pt-6 font-sans">
                {/* Level 0: HRS Group Root */}
                <div className="pb-6 border-b border-[var(--rule)]">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[var(--orange)]" />
                    <span className="font-serif text-[24px] md:text-[26px] text-[var(--ink)] font-normal">
                      {aboutContent.structure.groupName}
                    </span>
                    <span className="text-[13.5px] text-[var(--muted)]">
                      &bull; Parent Enterprise ({aboutContent.structure.registeredOffice})
                    </span>
                  </div>
                </div>

                {/* Level 1: Sectors */}
                <div className="divide-y divide-[var(--rule)]">
                  {aboutContent.structure.sectors.map((sector) => (
                    <div key={sector.name} className="py-8 pl-4 sm:pl-8 space-y-4">
                      {/* Sector Name */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[var(--rule)] text-[18px] select-none">&rarr;</span>
                          <span className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] font-normal">
                            {sector.name}
                          </span>
                        </div>
                        <span className="text-[13px] text-[var(--muted)] pl-6 sm:pl-0">
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
                                ? 'pl-4 sm:pl-6 border-l border-[var(--rule)]'
                                : ''
                            }`}
                          >
                            <Link
                              href={`/businesses/${entity.slug}`}
                              className="font-medium text-[var(--ink)] hover:underline underline-offset-4 decoration-[var(--orange)] flex items-center gap-2"
                            >
                              <span className="w-1 h-1 bg-[var(--muted)] inline-block flex-shrink-0" />
                              <span>{entity.name}</span>
                            </Link>
                            <span className="text-[13.5px] text-[var(--muted)]">
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
        </section>
      </div>
    </>
  );
}
