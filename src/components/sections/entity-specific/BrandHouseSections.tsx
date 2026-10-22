import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion';

interface BrandHouseSectionsProps {
  data: {
    pillars: { title: string; description: string; capabilities: string[] }[];
    selectedWork: { client: string; title: string; year: string; description: string }[];
  };
}

export const BrandHouseSections: React.FC<BrandHouseSectionsProps> = ({ data }) => {
  return (
    <Section surface="stone" id="service-pillars" className="space-y-24 md:space-y-36">
      {/* 1. Three Service Pillars */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start mb-12">
            <div className="col-span-12 md:col-span-3">
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Service pillars" />
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Enduring commercial communications engineered for corporate longevity.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {data.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="py-8 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
                >
                  <div className="md:col-span-5 space-y-2">
                    <h3 className="font-serif text-[21px] text-[var(--ink)] font-normal m-0">
                      {pillar.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[var(--muted)] m-0">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="md:col-span-7 space-y-2">
                    <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block">
                      Core Agency Capabilities
                    </span>
                    <ul className="m-0 p-0 list-none space-y-1.5 text-[14px] text-[var(--ink)]">
                      {pillar.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block mt-2 flex-shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Selected Work Grid */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start mb-12">
            <div className="col-span-12 md:col-span-3">
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Selected work" />
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Identity systems, retail packaging, and corporate publishing.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {data.selectedWork.map((work) => (
                <div
                  key={work.title}
                  className="py-6 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
                >
                  <div className="sm:col-span-4 space-y-1">
                    <span className="text-[12.5px] text-[var(--muted)] block">
                      {work.client} &bull; {work.year}
                    </span>
                    <h3 className="font-serif text-[19px] text-[var(--ink)] font-normal m-0">
                      {work.title}
                    </h3>
                  </div>

                  <div className="sm:col-span-8 text-[15px] leading-relaxed text-[var(--muted)]">
                    {work.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. 'Start a brief' CTA */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="p-8 md:p-12 border border-[var(--rule)] bg-[var(--paper)] font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--orange)]" />
                <h3 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  Start a creative brief
                </h3>
              </div>
              <p className="text-[15.5px] text-[var(--muted)] m-0 max-w-[54ch]">
                Commission a corporate identity system, consumer packaging dielines, or annual publication design directly with our Bodakdev studio.
              </p>
            </div>

            <Link
              href="/contact?entity=indian-brand-house&subject=Creative commission brief"
              className="link-editorial text-[16px] flex-shrink-0"
            >
              Start a brief &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </Section>
  );
};
