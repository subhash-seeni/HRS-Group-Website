import React from 'react';
import type { Metadata } from 'next';
import { Container, InteractiveBackground } from '@/components/ui';
import { heroContent } from '@/content/heroContent';

export const metadata: Metadata = {
  title: 'Terms of Use — HRS Group',
  description: 'Terms and legal conditions governing use of the HRS Group parent corporate website and subsidiary documentation.',
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <section className="relative pt-[18vh] md:pt-[22vh] pb-24 md:pb-36 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5 text-[14.5px] text-[var(--muted)] font-sans">
                <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                <span>{heroContent.terms.markerLabel}</span>
              </div>
              <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0">
                {heroContent.terms.headline}
              </h1>
              <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                {heroContent.terms.curiosityHook}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 border-t border-[var(--rule)] pt-12">
            <div className="col-span-12 lg:col-span-8 space-y-8 text-[16px] leading-[1.75] text-[var(--ink)] font-sans">
              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">1. General notice</h2>
                <p className="text-[var(--muted)] m-0">
                  This website is maintained by HRS Group as the parent portal for its operating entities. Material presented herein regarding real estate handovers, engineering capacities, and brand operations is factual and subject to formal commercial agreements.
                </p>
              </div>

              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">2. Intellectual property</h2>
                <p className="text-[var(--muted)] m-0">
                  All trademarks, trade names, architectural renderings, engineering specifications, and brand wordmarks (including Manpras, Snackshot, Antrah, FirstGen, and School of Facade Technologies) are the proprietary intellectual property of HRS Group and respective corporate entities.
                </p>
              </div>

              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">3. Jurisdiction</h2>
                <p className="text-[var(--muted)] m-0">
                  Any disputes arising out of the use of this portal or technical publications shall be governed exclusively by the laws of India and subject to the jurisdiction of courts in Ahmedabad, Gujarat.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
