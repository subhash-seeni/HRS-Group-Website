import React from 'react';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { newsArticles } from '@/content/news';
import { NewsClient } from './NewsClient';

export const metadata: Metadata = {
  title: 'News & Announcements · HRS Group',
  description:
    'Official operational notices, facility handovers, and curriculum announcements across HRS Group companies in Gujarat and Karnataka.',
  openGraph: {
    title: 'News & Announcements · HRS Group',
    description:
      'Official operational notices, facility handovers, and curriculum announcements across HRS Group companies.',
    url: 'https://hrsgroup.in/news',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function NewsPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'News & announcements' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              News and announcements
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              Official operational notices, facility handovers, and curriculum announcements across HRS Group companies in Gujarat and southern India.
            </p>
          </div>
        </Section>

        {/* 2. Interactive News Hub: Surface White */}
        <Section surface="white">
          <NewsClient articles={newsArticles} />
        </Section>

        {/* 3. Media & Information Briefing: Surface Ink */}
        <Section surface="ink">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
              Information Delivery
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Official disclosures and documentation
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed m-0">
              For verified corporate press releases, archival photography, or technical specification packets, accredited press and trade editors may contact our media desk directly.
            </p>
            <div className="pt-4">
              <Button href="/contact" variant="orange">
                Media desk enquiry
              </Button>
            </div>
          </div>
        </Section>

        {/* 4. Bottom Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Parent Enterprise
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Explore our operating businesses
              </h2>
            </div>

            <div className="shrink-0">
              <Button href="/businesses" variant="primary">
                View businesses directory
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
