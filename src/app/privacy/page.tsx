import React from 'react';
import type { Metadata } from 'next';
import { Container, InteractiveBackground } from '@/components/ui';
import { SplitHeading } from '@/components/motion';
import { heroContent } from '@/content/heroContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Data protection and privacy guidelines governing inquiries, transactions, and site usage across HRS Group companies.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <section className="relative pt-[18vh] md:pt-[22vh] pb-24 md:pb-36 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5 text-[14.5px] text-[var(--muted)] font-sans">
                <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                <span>{heroContent.privacy.markerLabel}</span>
              </div>
              <SplitHeading
                as="h1"
                className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0"
                text={heroContent.privacy.headline}
              />
              <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                {heroContent.privacy.curiosityHook}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 border-t border-[var(--rule)] pt-12">
            <div className="col-span-12 lg:col-span-8 space-y-8 text-[16px] leading-[1.75] text-[var(--ink)] font-sans">
              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">1. Information collected</h2>
                <p className="text-[var(--muted)] m-0">
                  When you submit an enquiry through our contact forms, request facade specifications, or contact a commercial leasing desk, we collect your name, business email address, phone number, organization name, and message details. We do not sell or monetize personal information.
                </p>
              </div>

              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">2. Use of operational data</h2>
                <p className="text-[var(--muted)] m-0">
                  Information received is routed strictly to the designated business division (e.g. HRS Aluglaze, Hrishikesh Ventures, or FirstGen Assets) to formulate technical quotes, lease terms, or contract schedules.
                </p>
              </div>

              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">3. Data security & retention</h2>
                <p className="text-[var(--muted)] m-0">
                  Communications are transmitted over encrypted TLS channels and archived within enterprise records kept at HRS House, Bodakdev, Ahmedabad. Data is retained in accordance with applicable statutory periods under Indian law.
                </p>
              </div>

              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">4. Contact regarding privacy</h2>
                <p className="text-[var(--muted)] m-0">
                  For privacy enquiries or data rectification requests, write to the Corporate Secretarial office at HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev, Ahmedabad 380054, Gujarat.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
