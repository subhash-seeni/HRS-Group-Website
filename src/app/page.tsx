import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header, Footer } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { GroupIntro } from '@/components/sections/GroupIntro';
import { BusinessesSection } from '@/components/sections/BusinessesSection';
import { AluglazeSpotlight } from '@/components/sections/AluglazeSpotlight';
import { BogoSpotlight } from '@/components/sections/bogo';
import { CalmAbout } from '@/components/sections/CalmAbout';
import { NewsSection } from '@/components/sections/NewsSection';
import { CareersContact } from '@/components/sections/CareersContact';

// Dynamic imports for below-the-fold vertical spotlights
const BrandWall = dynamic(() => import('@/components/sections/BrandWall'));
const FirstGenSpotlight = dynamic(() => import('@/components/sections/FirstGenSpotlight'));
const BrandHouseSpotlight = dynamic(() => import('@/components/sections/BrandHouseSpotlight'));

export const metadata: Metadata = {
  title: 'HRS Group • Built Environment, Retail, Food & Hospitality',
  description:
    'Headquartered in Ahmedabad, Gujarat, HRS Group builds foundational businesses across Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services.',
  openGraph: {
    title: 'HRS Group • Built Environment, Retail, Food & Hospitality',
    description:
      'Headquartered in Ahmedabad, Gujarat, HRS Group builds foundational businesses across Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services.',
    url: 'https://hrsgroup.in',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HRS Group • Built Environment, Retail, Food & Hospitality',
    description:
      'Headquartered in Ahmedabad, Gujarat, HRS Group builds foundational businesses across Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HRS Group',
  legalName: 'HRS Group',
  url: 'https://hrsgroup.in',
  logo: 'https://hrsgroup.in/logos/hrs-group.svg',
  description:
    'Diversified business group headquartered in Ahmedabad, Gujarat, operating across Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bodakdev, Near SG Highway',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380054',
    addressCountry: 'IN',
  },
  subOrganization: [
    {
      '@type': 'Organization',
      name: 'Hrishikesh Ventures',
      description: 'Real estate development focused on planned residential communities and commercial centres in Ahmedabad.',
    },
    {
      '@type': 'Organization',
      name: 'HRS Aluglaze Ltd',
      description: 'Engineered facade and fenestration solutions with Sanand manufacturing plant.',
    },
    {
      '@type': 'Organization',
      name: 'Geotrix Pvt. Ltd.',
      description: 'Southern India facade engineering and installation firm based in Bengaluru.',
    },
    {
      '@type': 'EducationalOrganization',
      name: 'School of Facade Technologies',
      description: 'Technical facade and fenestration education institute.',
    },
    {
      '@type': 'Organization',
      name: 'BOGO',
      description: 'Modern multi-format retail ecosystem and consumer brands.',
    },
    {
      '@type': 'Organization',
      name: 'Hrishikesh Food Products',
      description: 'Spice processing, milling, and blending facility in Bavla.',
    },
    {
      '@type': 'Organization',
      name: 'Hrishikesh Consumer Products',
      description: 'Fast-moving consumer goods managing a portfolio of 13 dedicated brands.',
    },
    {
      '@type': 'Organization',
      name: 'FirstGen Pvt. Ltd.',
      description: 'Commercial asset leasing, hospitality stays, and building trade retail.',
    },
    {
      '@type': 'Organization',
      name: 'Indian Brand House',
      description: 'Brand strategy, visual identity, content production, and digital growth marketing.',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Structured Schema.org Organization Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="relative">
        {/* 1. Hero: Parametric Computational Mesh with 7 sector topologies (dynamic surface) */}
        <Hero />

        {/* 2. Group Introduction: Word-by-word scroll text (surface: paper) */}
        <GroupIntro />

        {/* 3. The Group's Businesses: Desktop 5 flat-colour expanding panels, mobile accordion (#businesses, surface: white) */}
        <BusinessesSection />

        {/* 4. Built Environment Flagship: HRS Aluglaze Ltd (#aluglaze, surface: ink) */}
        <AluglazeSpotlight />

        {/* 5. Venture in Focus: BOGO Retail Ecosystem (#bogo, surface: bogo-navy) */}
        <BogoSpotlight />

        {/* 6. Brand Wall: Hrishikesh Consumer Products 13 typographic tiles with 3D tilt (surface: ink) */}
        <BrandWall />

        {/* 7. Hospitality & Leasing Flagship: FirstGen Assets, Hotels & Enterprises (#firstgen, surface: slate) */}
        <FirstGenSpotlight />

        {/* 8. Services Studio: Indian Brand House Strategy, Production & Digital (#brandhouse, surface: white) */}
        <BrandHouseSpotlight />

        {/* 9. The Group, Calmly: Three Ahmedabad history paragraphs, 4 plain facts, 6 values (#about, surface: paper) */}
        <CalmAbout />

        {/* 8. News: Four news rows with 8px shift & sliding 3:2 flat thumbnail (surface: white) */}
        <NewsSection />

        {/* 9. Careers & Contact: Largest orange area on page, huge Bricolage links, magnetic buttons (surface: orange) */}
        <CareersContact />
      </main>

      {/* 9. Group Footer (surface: ink) */}
      <Footer />
    </>
  );
}
