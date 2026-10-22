import React from 'react';
import type { Metadata } from 'next';
import { Container, InteractiveBackground } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion';
import { news } from '@/content/news';
import { heroContent } from '@/content/heroContent';
import { NewsClient } from './NewsClient';
import { NewsletterSignup } from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'News & Announcements',
  description:
    'Official operational notices, facility handovers, and curriculum announcements across HRS Group companies.',
  openGraph: {
    title: 'News & Announcements | HRS Group',
    description:
      'Official operational notices, facility handovers, and curriculum announcements across HRS Group companies.',
    url: 'https://hrsgroup.in/news',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Announcements | HRS Group',
    description:
      'Official operational notices, facility handovers, and curriculum announcements across HRS Group companies.',
  },
};

export default function NewsPage() {
  return (
    <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <Section surface="white" className="relative pt-[16vh] md:pt-[20vh] pb-24 md:pb-36 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5 text-[14.5px] text-[var(--muted)] font-sans">
                <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                <span>{heroContent.news.markerLabel}</span>
              </div>
              <SplitHeading
                as="h1"
                className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0"
                text={heroContent.news.headline}
              />
              <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                {heroContent.news.curiosityHook}
              </p>
            </div>
          </div>

          {/* Interactive News Hub */}
          <NewsClient items={news} />

          {/* Newsletter Signup Strip */}
          <NewsletterSignup />
        </Container>
      </Section>
    </div>
  );
}
