'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion';
import { SystemsHorizontalStrip } from './SystemsHorizontalStrip';
import { projects } from '@/content/projects';

interface AluglazeSectionsProps {
  data: {
    systems: { name: string; description: string; specifications: string[] }[];
    capabilities: { title: string; description: string }[];
    certifications: string[];
    southIndiaNote: { headline: string; description: string; linkText: string; linkHref: string };
  };
}

export const AluglazeSections: React.FC<AluglazeSectionsProps> = ({ data }) => {
  const [projectFilter, setProjectFilter] = useState<'All' | 'Commercial' | 'Industrial' | 'Institutional'>('All');

  // Filter projects associated with Aluglaze or relevant facade types
  const aluglazeProjects = [
    {
      name: 'Sanand Industrial Engineering Campus',
      type: 'Industrial',
      location: 'Sanand GIDC, Gujarat',
      year: '2024',
      scale: '18,500 sq m unitised facade',
      slug: 'sanand-industrial-hq',
    },
    {
      name: 'Hrishikesh 2 Corporate Headquarters',
      type: 'Commercial',
      location: 'Prahlad Nagar, Ahmedabad',
      year: '2024',
      scale: '14,200 sq m structural glazing',
      slug: 'hrishikesh-2',
    },
    {
      name: 'Hrishikesh 1 Commercial Offices',
      type: 'Commercial',
      location: 'SG Highway, Bodakdev',
      year: '2023',
      scale: '9,800 sq m curtain wall & louvres',
      slug: 'hrishikesh-1',
    },
    {
      name: 'School of Facade Technologies Academic Building',
      type: 'Institutional',
      location: 'Ahmedabad, Gujarat',
      year: '2024',
      scale: '4,500 sq m acoustic fenestration',
      slug: 'soft-academic-building',
      linkHref: '/businesses/school-of-facade-technologies',
    },
  ];

  const filteredProjects = aluglazeProjects.filter(
    (p) => projectFilter === 'All' || p.type === projectFilter
  );

  return (
    <Section surface="white" className="space-y-24 md:space-y-36">
      {/* 1. Systems Horizontal Scroll-Pinned Strip (Facade, Glazing, Windows, Doors) */}
      <SystemsHorizontalStrip
        systems={data.systems}
        title="Architectural product systems"
        subtitle="Engineered aluminium envelope systems manufactured in Sanand."
      />

      {/* 2. Manufacturing Capabilities */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3">
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Sanand plant capabilities" />
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                120,000 sq ft production setup with multi-axis automated lines.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              {data.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="py-6 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-4 font-serif text-[18px] text-[var(--ink)] font-normal">
                    {cap.title}
                  </div>
                  <div className="sm:col-span-8 text-[15px] leading-relaxed text-[var(--muted)] font-sans">
                    {cap.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Project Showcase with Filter by Building Type */}
      <section id="showcase" className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
            <div>
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Project showcase" />
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0">
                Selected facade and fenestration installations across Gujarat.
              </p>
            </div>

            {/* Filter buttons */}
            <div
              role="tablist"
              aria-label="Filter Aluglaze projects"
              className="flex items-center gap-4 text-[14px] font-sans"
            >
              {(['All', 'Commercial', 'Industrial', 'Institutional'] as const).map((type) => {
                const isActive = projectFilter === type;
                return (
                  <button
                    key={type}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setProjectFilter(type)}
                    className={`bg-transparent border-0 p-0 cursor-pointer inline-flex items-center gap-1.5 transition-colors duration-150 ${
                      isActive ? 'text-[var(--ink)] font-medium' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {isActive ? <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block" /> : null}
                    <span>{type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[var(--rule)]">
            {filteredProjects.map((proj) => (
              <div
                key={proj.slug}
                className="py-5 border-b border-[var(--rule)] grid grid-cols-12 gap-4 items-baseline group"
              >
                <div className="col-span-12 sm:col-span-5">
                  <Link
                    href={(proj as any).linkHref || `/projects/${proj.slug}`}
                    className="font-serif text-[19px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)]"
                  >
                    {proj.name}
                  </Link>
                </div>
                <div className="col-span-6 sm:col-span-3 text-[14px] text-[var(--muted)] font-sans">
                  {proj.type} &bull; {proj.location}
                </div>
                <div className="col-span-6 sm:col-span-4 text-right flex items-center justify-end gap-3 font-sans text-[13.5px] text-[var(--muted)]">
                  <span>{proj.scale}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Certifications Row */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-baseline">
            <div className="col-span-12 sm:col-span-3">
              <span className="text-[13.5px] text-[var(--muted)] font-sans">
                Certifications &amp; compliance
              </span>
            </div>
            <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[14.5px] text-[var(--ink)]">
              {data.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Highlighted 'South India' Callout that links to Geotrix */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="p-8 md:p-12 border border-[var(--rule)] bg-[var(--paper)] grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-3 font-sans">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-[var(--orange)] inline-block" />
                <h3 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  {data.southIndiaNote.headline}
                </h3>
              </div>
              <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0 max-w-[58ch]">
                {data.southIndiaNote.description}
              </p>
            </div>

            <div className="col-span-12 md:col-span-4 md:text-right">
              <Link
                href={data.southIndiaNote.linkHref}
                className="link-editorial text-[16px] font-sans inline-flex items-center gap-2"
              >
                <span>{data.southIndiaNote.linkText}</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </Section>
  );
};
