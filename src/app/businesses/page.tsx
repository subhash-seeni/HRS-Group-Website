import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container, InteractiveBackground } from '@/components/ui';
import { BusinessesDirectory } from './BusinessesDirectory';
import { heroContent } from '@/content/heroContent';

export const metadata: Metadata = {
  title: 'Our Businesses — HRS Group, Ahmedabad',
  description:
    'Overview of eight autonomous operating entities across architectural facades, residential real estate, contract food processing, hospitality, technical education, and brand communications.',
  openGraph: {
    title: 'Our Businesses — HRS Group, Ahmedabad',
    description:
      'Eight operating entities across architectural facades, residential real estate, food processing, hospitality, technical education, and brand communications.',
    url: 'https://hrsgroup.in/businesses',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Businesses — HRS Group, Ahmedabad',
    description:
      'Eight operating entities across architectural facades, residential real estate, food processing, hospitality, technical education, and brand communications.',
  },
};

export default function BusinessesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Operating Companies of HRS Group',
    description:
      'Directory of operating subsidiaries and divisions managed by HRS Group across Gujarat and Karnataka.',
    url: 'https://hrsgroup.in/businesses',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Hrishikesh Ventures',
        url: 'https://hrsgroup.in/businesses/hrishikesh-ventures',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'HRS Aluglaze Ltd',
        url: 'https://hrsgroup.in/businesses/hrs-aluglaze',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Geotrix Pvt. Ltd.',
        url: 'https://hrsgroup.in/businesses/geotrix',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'School of Facade Technologies (SoFT)',
        url: 'https://hrsgroup.in/businesses/school-of-facade-technologies',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Hrishikesh Food Products',
        url: 'https://hrsgroup.in/businesses/hrishikesh-food-products',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Hrishikesh Consumer Products',
        url: 'https://hrsgroup.in/businesses/hrishikesh-consumer-products',
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'FirstGen Pvt. Ltd.',
        url: 'https://hrsgroup.in/businesses/firstgen',
      },
      {
        '@type': 'ListItem',
        position: 8,
        name: 'Indian Brand House',
        url: 'https://hrsgroup.in/businesses/indian-brand-house',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
        {/* Generous space above: 18vh - 22vh */}
        <section className="relative pt-[18vh] md:pt-[22vh] pb-24 md:pb-36 overflow-hidden">
          <InteractiveBackground variant="inner" />
          <Container className="relative z-10">
            {/* Header: heading 'Our businesses' and one impactful sentence */}
            <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <div className="flex items-center gap-2.5 text-[14.5px] text-[var(--muted)] font-sans">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>{heroContent.businesses.markerLabel}</span>
                </div>
                <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight">
                  {heroContent.businesses.headline}
                </h1>
                <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                  {heroContent.businesses.curiosityHook}
                </p>
              </div>
            </div>

            {/* Filter and List Directory with URL Query updates */}
            <Suspense fallback={<div className="h-40" />}>
              <BusinessesDirectory />
            </Suspense>
          </Container>
        </section>
      </div>
    </>
  );
}
