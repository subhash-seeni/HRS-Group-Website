import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { GroupIntro } from '@/components/sections/GroupIntro';
import {
  BogoHero,
  BogoExplorer,
  BogoFormats,
  BogoCards,
  BogoTechRoadmap,
  BogoClose,
} from '@/components/sections/bogo';
import { sectors } from '@/content/sectors';

export const metadata: Metadata = {
  title: 'HRS Group • Built Environment, Retail, Food & Hospitality',
  description:
    'Parent website for HRS Group: Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services headquartered in Ahmedabad, Gujarat.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative">
        {/* 1. Full-bleed 100vh Hero with 7 rolling word states */}
        <Hero />

        {/* 2. Group Introduction: Word-by-word scroll text on paper surface */}
        <GroupIntro />

        {/* 3. BOGO Section: Anchored at #bogo */}
        <div id="bogo" className="relative">
          {/* A. BOGO Opening: Full viewport on BOGO navy */}
          <BogoHero />

          {/* B. BOGO Square Explorer: 11 category brand ring & live color swapping */}
          <BogoExplorer />

          {/* C. Formats and Distribution: True relative areas & BOGO Go */}
          <BogoFormats />

          {/* D. Companion Cards: 150vh pinned and scrubbed HTML/CSS loyalty card fan */}
          <BogoCards />

          {/* E. Technology Roadmap: Desktop horizontal pinned scroll, mobile vertical list */}
          <BogoTechRoadmap />

          {/* F. Close: BOGO navy with visit & partner actions */}
          <BogoClose />
        </div>

        {/* =========================================================================
            #businesses ANCHOR SECTION (surface="paper")
            Anchor target for hero CTA and header's businesses link
           ========================================================================= */}
        <section
          id="businesses"
          data-surface="paper"
          className="relative w-full bg-[var(--paper)] text-[var(--ink)] py-28 px-6 lg:px-8 border-t border-[var(--ink)]/10"
          aria-label="Operating Businesses Directory"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--ink)]/15 pb-8 mb-12">
              <div>
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Operating directory
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  Five operating sectors
                </h2>
              </div>
              <p className="max-w-md text-sm text-neutral-600">
                Operating across western and southern India, connecting physical infrastructure, retail ecosystems, certified processing, and digital growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sec) => (
                <div
                  key={sec.slug}
                  className="flex flex-col justify-between border border-[var(--ink)]/15 bg-white p-8 rounded-2xl"
                >
                  <div>
                    <span
                      className="inline-block h-2 w-8 rounded-full mb-4"
                      style={{ backgroundColor: sec.color }}
                    />
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)]">
                      {sec.name}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-neutral-500">
                      {sec.title}
                    </p>
                    <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                      {sec.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-200">
                    <Link
                      href={`/businesses#${sec.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--hrs-orange)] hover:underline"
                    >
                      <span>Explore sector entities</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
