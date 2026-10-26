'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Store, Truck, Sparkles, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetUrl } from '@/lib/basePath';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormatItem {
  numeral: string;
  name: string;
  role: string;
  scale: string;
  scaleRatio: number;
  image: string;
  description: string;
  highlights: string[];
}

const FORMATS: FormatItem[] = [
  {
    numeral: '01',
    name: 'BOGO Square',
    role: 'Flagship destination',
    scale: '40,000+ sq. ft.',
    scaleRatio: 1.0,
    image: '/bogo/stores/bogo-square-concept.webp',
    description:
      'Where the BOGO ecosystem comes together. Flagship multi-category brand discovery, dining, lifestyle, and community interactions under one roof.',
    highlights: ['Multi-storey atrium & food hall', 'Flagship brand pavilions', 'Community gathering plaza'],
  },
  {
    numeral: '02',
    name: 'BOGO Bazaar',
    role: 'Community grocery',
    scale: '4,000–6,000 sq. ft.',
    scaleRatio: 0.15,
    image: '/bogo/stores/bogo-bazaar-concept.webp',
    description:
      'A destination closer to home. High-street community format proportioned for weekly family shopping and fresh neighbourhood provision.',
    highlights: ['Farm-fresh organic produce core', 'Personal care & wellness aisles', 'Neighbourhood high street anchor'],
  },
  {
    numeral: '03',
    name: 'BOGO Mini',
    role: 'Everyday convenience',
    scale: '~2,000 sq. ft.',
    scaleRatio: 0.06,
    image: '/bogo/stores/bogo-mini-concept.webp',
    description:
      'Everyday essentials within reach. High-density neighbourhood convenience stores for quick daily visits and immediate household necessities.',
    highlights: ['Rapid walk-in flow', '300-metre residential radius', 'Express replenishment stock'],
  },
];

interface CategoryWorld {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  focus: string;
}

const CATEGORY_WORLDS: CategoryWorld[] = [
  {
    id: 'farms',
    name: 'BOGO Farms',
    tagline: 'Fresh from nature, naturally better',
    image: '/bogo/stores/bogo-farms-concept.webp',
    description:
      'Direct farm partnerships across Gujarat and western India delivering pesticide-free vegetables, seasonal fruits, and harvest-day staples.',
    focus: 'Organic produce • Direct grower sourcing • Daily harvests',
  },
  {
    id: 'daily',
    name: 'BOGO Daily',
    tagline: 'Morning routines & fresh provisions',
    image: '/bogo/stores/bogo-daily-concept.webp',
    description:
      'Temperature-monitored cold-chain dairy, freshly baked breads, breakfast grains, and daily pantry replenishments.',
    focus: 'Cold-chain dairy • Artisanal bakery • Breakfast grains',
  },
  {
    id: 'superfoods',
    name: 'BOGO Superfoods',
    tagline: 'Nutrient-dense botanical vitality',
    image: '/bogo/stores/bogo-superfoods-concept.webp',
    description:
      'Ancient grains, raw cold-milled seeds, immunity botanicals, and cold-pressed botanical oils formulated for active metabolic wellness.',
    focus: 'Cold-pressed oils • Raw seeds • Ancient grains',
  },
  {
    id: 'essentials',
    name: 'BOGO Essentials',
    tagline: 'Household staples & personal hygiene',
    image: '/bogo/stores/bogo-essentials-concept.webp',
    description:
      'Pure non-toxic cleaning solutions, sustainable paper hygiene, and reliable home care essentials built for modern households.',
    focus: 'Non-toxic formulations • Paper hygiene • Home utility',
  },
  {
    id: 'luxe',
    name: 'BOGO Luxe',
    tagline: 'Curated epicurean delicacies',
    image: '/bogo/stores/bogo-luxe-concept.webp',
    description:
      'Single-origin chocolates, aged cheeses, imported olive oils, and artisanal condiments for elevated culinary dining.',
    focus: 'Single-origin cacao • Artisanal cheeses • Imported olive oils',
  },
  {
    id: 'health',
    name: 'BOGO Health',
    tagline: 'Targeted wellness & daily nourishment',
    image: '/bogo/stores/bogo-health-concept.webp',
    description:
      'Clean plant proteins, evidence-backed supplements, functional hydration, and preventative nutritional products.',
    focus: 'Plant protein • Botanical supplements • Electrolytes',
  },
];

export const BogoSpotlight: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formatsRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryWorld>(CATEGORY_WORLDS[0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // 2. Format columns reveal with scale proportion bars
      if (formatsRef.current) {
        const columns = formatsRef.current.querySelectorAll('.bogo-format-column');
        gsap.from(columns, {
          opacity: 0,
          y: 20,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formatsRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        const gaugeBars = formatsRef.current.querySelectorAll('.bogo-scale-fill');
        gsap.fromTo(
          gaugeBars,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formatsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 3. Lower vision grid reveal
      if (visionRef.current) {
        gsap.from(visionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bogo"
      data-surface="bogo-navy"
      className="relative w-full bg-[var(--bogo-navy)] text-white py-24 sm:py-32 lg:py-36 px-6 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden"
      aria-label="BOGO: Retail ecosystem and multi-format destinations"
    >
      <div className="mx-auto max-w-7xl">
        {/* Editorial Eyebrow & Headline Header */}
        <div ref={headerRef} className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-[var(--bogo-orange)] shrink-0" />
            <span className="text-xs font-semibold text-white/70">
              Featured venture • Retail ecosystem
            </span>
          </div>

          <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02] text-white">
            Building India’s <span className="text-[var(--bogo-orange)] italic">next retail</span> ecosystem.
          </h2>

          <p className="mt-8 text-base sm:text-lg md:text-xl font-normal text-white/80 max-w-2xl leading-relaxed">
            Backed by focused capital deployment across western India, BOGO is establishing modern multi-format retail destinations proportioned to high-street density and everyday neighbourhood routines.
          </p>

          {/* Scale telemetry pills */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white text-xs font-semibold border border-white/15">
              <Store className="h-3.5 w-3.5 text-[var(--bogo-orange)]" />
              3 Operating Formats
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white text-xs font-semibold border border-white/15">
              <Sparkles className="h-3.5 w-3.5 text-[var(--bogo-green)]" />
              11 Specialized Worlds
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white text-xs font-semibold border border-white/15">
              <Truck className="h-3.5 w-3.5 text-white/80" />
              Integrated Cold-Chain
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white text-xs font-semibold border border-white/15">
              <MapPin className="h-3.5 w-3.5 text-[var(--bogo-orange)]" />
              Ahmedabad & Western India
            </span>
          </div>
        </div>

        {/* 3 Formats in Spacious Multi-Format Architecture with Concept Renders */}
        <div ref={formatsRef} className="mt-16 sm:mt-20 border-t border-b border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
            {FORMATS.map((format) => (
              <div
                key={format.name}
                className="bogo-format-column py-10 sm:py-12 lg:py-14 first:pt-8 last:pb-8 lg:first:pl-0 lg:last:pr-0 lg:px-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <span className="text-xs font-bold text-white/40 tabular-nums">
                      {format.numeral}
                    </span>
                    <span className="text-xs font-semibold text-[var(--bogo-orange)] tabular-nums bg-white/5 px-2 py-0.5 border border-white/10">
                      {format.scale}
                    </span>
                  </div>

                  {/* GSAP Animated Scale Proportion Gauge */}
                  <div className="mb-6 w-full h-[3px] bg-white/10 overflow-hidden">
                    <div
                      className="bogo-scale-fill h-full bg-[var(--bogo-orange)] origin-left will-change-transform"
                      style={{ width: `${Math.max(6, Math.round(format.scaleRatio * 100))}%` }}
                    />
                  </div>

                  {/* Visual Concept Store Render */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/15 bg-black/40 mb-6">
                    <Image
                      src={getAssetUrl(format.image)}
                      alt={`${format.name} architecture concept store`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bogo-navy)]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white/90">
                      <span>{format.role}</span>
                      <span className="text-[var(--bogo-orange)]">{format.scale}</span>
                    </div>
                  </div>

                  <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5">
                    {format.name}
                  </h3>

                  <p className="text-xs font-medium text-white/60 mb-4">
                    {format.role}
                  </p>

                  <p className="text-sm text-white/80 leading-relaxed mb-6">
                    {format.description}
                  </p>

                  {/* Key format highlights */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {format.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2 text-xs text-white/70">
                        <CheckCircle2 className="h-3 w-3 text-[var(--bogo-green)] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Half: Interactive Category Worlds & Platform Infrastructure */}
        <div ref={visionRef} className="mt-16 sm:mt-20 pt-16 sm:pt-20 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive 11 Specialized Worlds Explorer */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[var(--bogo-orange)] block mb-3">
                  Category universe
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                  11 specialized category worlds.
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mb-6">
                  Alongside multi-format store footprints, BOGO develops proprietary lifestyle and pantry brands spanning fresh harvest produce, organic grains, clean home hygiene, and daily nutrition.
                </p>

                {/* Category World Selector Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {CATEGORY_WORLDS.map((cat) => {
                    const isActive = activeCategory.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs px-3.5 py-1.5 font-medium transition-all duration-200 border ${
                          isActive
                            ? 'bg-white text-[var(--bogo-navy)] border-white font-semibold shadow-sm'
                            : 'bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                {/* Active Category Visual & Detail Frame */}
                <div className="relative border border-white/15 overflow-hidden bg-white/5">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={getAssetUrl(activeCategory.image)}
                      alt={activeCategory.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bogo-navy)] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-[var(--bogo-navy)]/90 border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-[var(--bogo-orange)]">
                      {activeCategory.name}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 bg-[var(--bogo-navy)]/95 border-t border-white/10">
                    <div className="text-xs font-bold text-white/50 mb-1">
                      {activeCategory.tagline}
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed mb-3">
                      {activeCategory.description}
                    </p>
                    <div className="text-xs text-[var(--bogo-green)] font-medium">
                      {activeCategory.focus}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Platform Infrastructure & Direct Portal Link */}
            <div className="lg:col-span-5 flex flex-col justify-between lg:pl-8 lg:border-l lg:border-white/10 h-full">
              <div>
                <span className="text-xs font-semibold text-[var(--bogo-green)] block mb-3">
                  Logistics & platform infrastructure
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                  Direct distribution and tech-enabled stores.
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  BOGO Go operates as the logistics backbone of the retail ecosystem, moving goods efficiently from verified producers to neighbourhood shelves with temperature telemetry and stock accuracy.
                </p>

                {/* Infrastructure points */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[var(--bogo-orange)] tabular-nums shrink-0 mt-0.5">01</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Smart Basket & Checkout Flow</h4>
                      <p className="text-xs text-white/70 mt-0.5 leading-normal">
                        Self-scanning cart stations and concierge pickup that remove counter friction.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[var(--bogo-orange)] tabular-nums shrink-0 mt-0.5">02</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">BOGO Go Cold-Chain Backbone</h4>
                      <p className="text-xs text-white/70 mt-0.5 leading-normal">
                        Scheduled zero-emission neighbourhood delivery and daily fresh replenishment routes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[var(--bogo-orange)] tabular-nums shrink-0 mt-0.5">03</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Quality Provenance Traceability</h4>
                      <p className="text-xs text-white/70 mt-0.5 leading-normal">
                        Batch-level origin tracking across all fresh produce and private label pantry essentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <Link
                  href="/bogo"
                  className="group inline-flex items-center gap-3 rounded-full bg-white text-[var(--bogo-navy)] hover:bg-neutral-100 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300"
                >
                  <span>Explore the dedicated BOGO portal</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-current/10 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/50">
          <span>Bonds Over Generations, Often • BOGO Retail Ecosystem</span>
          <span>Ahmedabad • Gujarat • Western India</span>
        </div>
      </div>
    </section>
  );
};

export default BogoSpotlight;
