import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BogoHero, BogoFormats, BogoClose } from '@/components/sections/bogo';

// Dynamic imports for below-the-fold interactive & GSAP ScrollTrigger scenes
const BogoExplorer = dynamic(() => import('@/components/sections/bogo/BogoExplorer'));
const BogoCards = dynamic(() => import('@/components/sections/bogo/BogoCards'));
const BogoTechRoadmap = dynamic(() => import('@/components/sections/bogo/BogoTechRoadmap'));

export const metadata: Metadata = {
  title: 'BOGO · Retail Ecosystem · HRS Group',
  description:
    'A featured brand of HRS Group. BOGO unites multi-format retail destinations, eleven specialized consumer brands, direct distribution, and intelligent retail technology.',
  openGraph: {
    title: 'BOGO · Retail Ecosystem · HRS Group',
    description:
      'Multi-format retail destinations, eleven category brands, and intelligent retail infrastructure across Gujarat and western India.',
    url: 'https://hrsgroup.in/bogo/',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function BogoPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen">
        {/* Parent Group Breadcrumb Bar */}
        <div className="bg-[var(--bogo-navy)] pt-24 pb-2 px-6 sm:px-8 lg:px-12 border-b border-white/10">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs text-white/60">
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>HRS Group Homepage</span>
            </Link>
            <span className="hidden sm:inline text-white/40">
              Retail Sector • High-Growth Investment
            </span>
          </div>
        </div>

        {/* 1. BOGO Hero: Full viewport */}
        <BogoHero />

        {/* 2. BOGO Square Explorer: 11 category brand ring & live color swapping */}
        <BogoExplorer />

        {/* 3. Formats and Distribution: Physical areas & BOGO Go */}
        <BogoFormats />

        {/* 4. Companion Cards: 150vh pinned and scrubbed loyalty card fan */}
        <BogoCards />

        {/* 5. Technology Roadmap: Desktop horizontal pinned scroll, mobile vertical list */}
        <BogoTechRoadmap />

        {/* 6. Close: Action links & partner enquiries */}
        <BogoClose />
      </main>

      <Footer />
    </>
  );
}
