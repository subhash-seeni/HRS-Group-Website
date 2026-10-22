'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';

export const CareersContactBlock: React.FC = () => {
  return (
    <Section surface="orange" className="py-24 md:py-36 border-t border-[var(--rule)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Column 1: Careers */}
          <div className="space-y-8 pr-0 md:pr-8">
            <div className="space-y-4">
              <SplitHeading
                as="h2"
                className="text-heading-1 text-[var(--ink)] font-normal m-0"
                text="Careers"
              />
              <p className="text-[17px] leading-relaxed text-[var(--ink)]/85 font-sans max-w-[54ch] m-0">
                We hire facade design engineers, site installation supervisors, manufacturing technicians,
                and hospitality specialists across Ahmedabad and Bengaluru. Open positions offer direct technical
                responsibility within established operating companies.
              </p>
            </div>

            {/* Large Newsreader text link with rotating arrow and ink underline */}
            <div className="pt-2">
              <Link
                href="/careers"
                className="group inline-flex flex-col items-start gap-1 text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
              >
                <div className="relative inline-flex items-center gap-4">
                  <span className="font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] text-[var(--ink)] font-normal leading-tight">
                    See open roles
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] text-[var(--ink)] inline-block transition-transform duration-300 group-hover:rotate-45"
                  >
                    &rarr;
                  </span>

                  {/* Ink underline that draws from left to right */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Column 2: Contact (Separated by hairline on desktop) */}
          <div className="space-y-8 pt-10 md:pt-0 border-t md:border-t-0 md:border-l border-[rgba(0,0,0,0.2)] md:pl-12 lg:pl-16">
            <div className="space-y-4">
              <SplitHeading
                as="h2"
                className="text-heading-1 text-[var(--ink)] font-normal m-0"
                text="Contact"
              />
              <p className="text-[17px] leading-relaxed text-[var(--ink)]/85 font-sans max-w-[54ch] m-0">
                Our corporate offices on SG Highway handle institutional partnerships, land developments,
                and trade procurement. General and commercial enquiries are reviewed by the relevant business
                division within two business days.
              </p>
            </div>

            {/* Large Newsreader text link with rotating arrow and ink underline */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex flex-col items-start gap-1 text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
              >
                <div className="relative inline-flex items-center gap-4">
                  <span className="font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] text-[var(--ink)] font-normal leading-tight">
                    Send an enquiry
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] text-[var(--ink)] inline-block transition-transform duration-300 group-hover:rotate-45"
                  >
                    &rarr;
                  </span>

                  {/* Ink underline that draws from left to right */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
