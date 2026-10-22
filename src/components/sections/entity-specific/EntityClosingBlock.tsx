'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';

interface EntityClosingBlockProps {
  entitySlug: string;
  entityName: string;
  contactPrompt?: string;
}

export const EntityClosingBlock: React.FC<EntityClosingBlockProps> = ({
  entitySlug,
  entityName,
  contactPrompt,
}) => {
  return (
    <Section surface="ink" className="py-24 md:py-36 border-t border-[rgba(255,255,255,0.14)]">
      <Container>
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <span className="text-[13.5px] font-sans text-[rgba(245,242,236,0.78)] block">
              Commercial & technical consultations
            </span>
            <SplitHeading
              as="h2"
              className="text-heading-1 text-[#F5F2EC] font-normal m-0"
              text={`Enquiries for <em>${entityName}</em>`}
            />
          </div>

          <div className="col-span-12 lg:col-span-8 space-y-8 lg:border-l border-[rgba(255,255,255,0.14)] lg:pl-12">
            <p className="text-[18px] md:text-[20px] leading-[1.65] text-[rgba(245,242,236,0.85)] font-sans m-0 max-w-[56ch]">
              {contactPrompt ||
                `Our technical leads review project inquiries, commercial specifications, and joint venture proposals directly within two business days.`}
            </p>

            <div className="pt-4">
              <Link
                href={`/contact?entity=${entitySlug}`}
                className="group inline-flex items-center gap-4 text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
              >
                <div className="relative inline-flex items-center gap-3">
                  <span className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-[#F5F2EC] font-normal leading-tight group-hover:text-[var(--orange)] transition-colors">
                    Send an enquiry to {entityName}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-[#F5F2EC] inline-block transition-transform duration-300 group-hover:rotate-45 group-hover:text-[var(--orange)]"
                  >
                    &rarr;
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[var(--orange)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
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
