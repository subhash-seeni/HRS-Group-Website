'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, TrendingUp, Layers, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '@/lib/basePath';
import { Button } from '@/components/ui';

const DIRECTORY_ROWS = [
  {
    service: 'Enterprise Web Application Engineering',
    focus: 'Next.js App Router • Headless Commerce • Edge APIs',
    engagement: 'Production Sprint',
  },
  {
    service: 'Performance Marketing & Attribution',
    focus: 'Paid Acquisition • Conversion Rate Optimisation • CRO',
    engagement: 'Monthly Retainer',
  },
  {
    service: 'Brand Architecture & Design Systems',
    focus: 'Corporate Naming • Visual Guidelines • Typography',
    engagement: 'Project Basis',
  },
  {
    service: 'Retail Packaging & Print Mechanicals',
    focus: 'FMCG Carton Dielines • Regulatory Compliance • Foil Finishes',
    engagement: 'Project Basis',
  },
];

export const BrandHouseSpotlight: React.FC = () => {
  return (
    <section
      id="brandhouse"
      data-surface="white"
      className="relative w-full bg-white text-[var(--ink)] py-16 sm:py-24 lg:py-32 overflow-hidden border-t border-neutral-200"
      aria-label="Indian Brand House Digital-First Enterprise Agency"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xs font-semibold text-[#EA5735] tracking-wider uppercase">
              Sector 05 • Digital Agency & Brand Infrastructure
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs text-neutral-500 font-medium">Indian Brand House</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--ink)] max-w-3xl leading-[1.08]">
              Digital-first engineering, brand architecture, and <span className="text-[#EA5735] font-normal italic">growth systems</span> for commercial enterprises.
            </h2>
            <p className="text-sm sm:text-base font-normal text-neutral-600 max-w-md leading-relaxed">
              Operating as an independent B2B agency, Indian Brand House engineers modern digital platforms, customer acquisition funnels, and physical brand packaging for corporate clients across India.
            </p>
          </div>
        </div>

        {/* Asymmetric 7/5 Split: Left Digital Terminal, Right Visual Studio & Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* =========================================================================
              LEFT (7 COLS): THE DIGITAL PLATFORM TERMINAL (DIGITAL FIRST)
              Visual, telemetry-driven digital engineering showcase
          ========================================================================= */}
          <div className="lg:col-span-7 border border-neutral-200 bg-neutral-50/70 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm">
            {/* Terminal Chrome Bar */}
            <div className="bg-neutral-100/90 px-4 sm:px-6 py-3.5 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="text-[11px] font-mono text-neutral-500 bg-white/80 px-3 py-1 rounded-md border border-neutral-200/80 flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>enterprise.client-platform.dev</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Live Production
              </span>
            </div>

            {/* Terminal Visual Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#EA5735] uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Digital Engineering Core</span>
                </div>
                <span className="text-xs text-neutral-400 font-medium">B2B Platform Delivery</span>
              </div>

              <div>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-2">
                  High-Performance Web Platforms & Headless Architecture
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg">
                  Sub-second App Router architectures replacing bloated legacy systems with bespoke customer portals, headless commerce checkouts, and edge-deployed cloud platforms.
                </p>
              </div>

              {/* Real-time Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-neutral-200">
                <div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium">Server TTFB</div>
                  <div className="font-['Bricolage_Grotesque'] text-xl sm:text-2xl font-extrabold text-[var(--ink)] tabular-nums mt-0.5">
                    &lt; 0.4s
                  </div>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium">Lighthouse Score</div>
                  <div className="font-['Bricolage_Grotesque'] text-xl sm:text-2xl font-extrabold text-emerald-600 tabular-nums mt-0.5">
                    99 / 100
                  </div>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium">Architecture</div>
                  <div className="font-['Bricolage_Grotesque'] text-sm sm:text-base font-bold text-[var(--ink)] mt-1">
                    Edge Native
                  </div>
                </div>
              </div>

              {/* Visual Digital Architecture Schematic Nodes */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Client Product Architecture
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200/70">
                    <span className="font-bold text-[var(--ink)] block">01 / Frontend</span>
                    <span className="text-[11px] text-neutral-500">Next.js App Router • React</span>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200/70">
                    <span className="font-bold text-[var(--ink)] block">02 / Commerce</span>
                    <span className="text-[11px] text-neutral-500">Headless API & Checkout</span>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200/70">
                    <span className="font-bold text-[var(--ink)] block">03 / Infrastructure</span>
                    <span className="text-[11px] text-neutral-500">Cloudflare Edge Deployment</span>
                  </div>
                </div>
              </div>

              {/* Technology Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Headless Commerce', 'Cloudflare Edge', 'REST / GraphQL'].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-neutral-600 bg-white border border-neutral-200 px-2.5 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="px-6 sm:px-8 py-3.5 bg-neutral-100/60 border-t border-neutral-200 text-xs text-neutral-500 font-medium flex items-center justify-between">
              <span>Enterprise Digital Delivery</span>
              <span>Western & Southern India</span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT (5 COLS): VISUAL STUDIO PHOTOGRAPHY & GROWTH SYSTEMS
          ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8">
            
            {/* Visual Card 1: Authentic Bodakdev Studio Photography */}
            <div className="border border-neutral-200 bg-neutral-50/60 rounded-2xl overflow-hidden hover:border-neutral-300 transition-colors flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border-b border-neutral-200">
                <Image
                  src={getAssetUrl('/images/indian-brand-house/studio-desk.webp')}
                  alt="Indian Brand House studio desk in Bodakdev, Ahmedabad with packaging drafts and blueprints"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#EA5735] block">
                    Bodakdev Studio, Ahmedabad
                  </span>
                  <span className="text-xs font-bold">
                    Physical packaging proofs, mechanical dielines & print testing
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-[#EA5735]" />
                  <h4 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)]">
                    Brand Architecture & Retail Packaging
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Conceiving complete corporate visual identities, naming systems, FMCG carton dielines, and production specifications for commercial brands scaling nationally.
                </p>
              </div>
            </div>

            {/* Visual Card 2: Performance Marketing & Growth Distribution */}
            <div className="border border-neutral-200 bg-neutral-50/60 p-5 sm:p-6 rounded-2xl flex flex-col justify-between hover:border-neutral-300 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#EA5735]" />
                    <h4 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)]">
                      Performance Marketing & Growth
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Active Client Loops
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Multi-touch attribution, paid search and social campaigns, and conversion rate optimisation engineered to generate commercial revenue and verified trade inquiries.
                </p>

                {/* Growth Chips */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-400 block font-medium">Acquisition</span>
                    <span className="font-bold text-[var(--ink)]">Google & Meta Ads</span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-400 block font-medium">Analytics</span>
                    <span className="font-bold text-[var(--ink)]">Multi-Touch Attribution</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                <span>Enterprise Growth Retainers</span>
                <span>Regional Footfalls</span>
              </div>
            </div>

          </div>
        </div>

        {/* B2B Services Hairline Directory (Clean & Compact) */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-['Bricolage_Grotesque'] text-lg sm:text-xl font-bold text-[var(--ink)]">
              Enterprise Client Services Directory
            </h3>
            <span className="text-xs text-neutral-500">
              Engagement models available on production sprint or monthly retainer basis
            </span>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {DIRECTORY_ROWS.map((row, idx) => (
              <div
                key={idx}
                className="py-3.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-neutral-50 px-2 transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-mono font-bold text-[#EA5735] tabular-nums shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--ink)]">
                      {row.service}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {row.focus}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full self-start md:self-auto shrink-0 mt-1 md:mt-0">
                  {row.engagement}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="text-xs sm:text-sm text-neutral-500">
            <span className="text-[var(--ink)] font-semibold">Indian Brand House</span> provides digital, creative, and performance services to commercial clients across India from Bodakdev, Ahmedabad.
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
              href="/contact"
              variant="primary"
              className="w-full sm:w-auto justify-center"
            >
              Discuss an enterprise project
            </Button>
            <Button
              href="/businesses#indian-brand-house"
              variant="secondary"
              className="w-full sm:w-auto justify-center"
            >
              View in directory
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandHouseSpotlight;
