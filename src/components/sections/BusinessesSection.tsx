'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sectors } from '@/content/sectors';
import { entities } from '@/content/entities';
import { getAssetUrl } from '@/lib/basePath';

// Harmonious, distinct flat colors for the 5 sectors
// Built Environment: Deep Emerald #1B5E38
// Retail: BOGO Navy #0F2A5C (strictly specified)
// Food and Consumer: Warm Terracotta #B45309
// Hospitality and Leasing: Deep Slate Indigo #273043
// Services: Bold Garnet #991B1B
interface SectorSubEntity {
  slug: string;
  name: string;
  label: string;
  tagline: string;
  url: string;
  logo: string;
}

interface SectorEntity {
  slug: string;
  name: string;
  tagline: string;
  url: string;
  logo: string;
  isBogo?: boolean;
  subEntity?: SectorSubEntity;
}

interface SectorPanelData {
  slug: string;
  numeral: string;
  bgColor: string;
  textColor: string;
  isRetail?: boolean;
  groupLabel?: string;
  groupTagline?: string;
  spotlight?: {
    href: string;
    label: string;
    tagline: string;
  };
  entities: SectorEntity[];
}

const SECTOR_CONFIG: SectorPanelData[] = [
  {
    slug: 'built-environment',
    numeral: '01',
    bgColor: '#1B5E38',
    textColor: '#FFFFFF',
    spotlight: {
      href: '#aluglaze',
      label: 'Explore HRS Aluglaze',
      tagline: 'Sanand automated facade fabrication plant',
    },
    entities: [
      {
        slug: 'hrishikesh-ventures',
        name: 'Hrishikesh Ventures',
        tagline: 'Residential communities, plotted layouts, and commercial hubs in Ahmedabad.',
        url: '/businesses/hrishikesh-ventures',
        logo: '/logos/hrishikesh-ventures.svg',
      },
      {
        slug: 'hrs-aluglaze',
        name: 'HRS Aluglaze Ltd',
        tagline: 'Engineered facade and fenestration solutions with Sanand manufacturing plant.',
        url: '/businesses/hrs-aluglaze',
        logo: '/logos/hrs-aluglaze.svg',
        subEntity: {
          slug: 'geotrix',
          name: 'Geotrix Pvt. Ltd.',
          label: 'Acquired subsidiary',
          tagline: 'Southern India facade engineering and installation firm serving Bengaluru, Hyderabad, and Chennai.',
          url: '/businesses/geotrix',
          logo: '/logos/geotrix.svg',
        },
      },
      {
        slug: 'school-of-facade-technologies',
        name: 'School of Facade Technologies',
        tagline: 'Technical facade institute training engineering students, site fabricators, and architects.',
        url: '/businesses/school-of-facade-technologies',
        logo: '/logos/school-of-facade-technologies.svg',
      },
    ],
  },
  {
    slug: 'retail',
    numeral: '02',
    bgColor: '#0F2A5C', // BOGO navy strictly specified
    textColor: '#FFFFFF',
    isRetail: true,
    spotlight: {
      href: '#bogo',
      label: 'Explore BOGO',
      tagline: '11 category brands • 3 store formats',
    },
    entities: [
      {
        slug: 'bogo',
        name: 'BOGO',
        tagline: 'Building India’s next retail ecosystem across three store formats and eleven category brands.',
        url: '#bogo',
        logo: '/brand/bogo/bogo_main_horizontal.png',
        isBogo: true,
      },
    ],
  },
  {
    slug: 'food-and-consumer',
    numeral: '03',
    bgColor: '#B45309',
    textColor: '#FFFFFF',
    spotlight: {
      href: '#brand-wall',
      label: 'View 13 Brands',
      tagline: 'Bavla spice milling • Household FMCG',
    },
    entities: [
      {
        slug: 'hrishikesh-food-products',
        name: 'Hrishikesh Food Products',
        tagline: 'Clean spice processing, milling, and custom seasoning mixes with Bavla production campus.',
        url: '/businesses/hrishikesh-food-products',
        logo: '/logos/hrishikesh-food-products.svg',
      },
      {
        slug: 'hrishikesh-consumer-products',
        name: 'Hrishikesh Consumer Products',
        tagline: 'Fast-moving consumer goods managing a portfolio of 13 dedicated household brands.',
        url: '/businesses/hrishikesh-consumer-products',
        logo: '/logos/hrishikesh-consumer-products.svg',
      },
    ],
  },
  {
    slug: 'hospitality-and-leasing',
    numeral: '04',
    bgColor: '#273043',
    textColor: '#FFFFFF',
    groupLabel: 'FirstGen Pvt. Ltd.',
    groupTagline: 'Corporate parent overseeing commercial leasing, business stays, and trade retail.',
    spotlight: {
      href: '#firstgen',
      label: 'Explore FirstGen',
      tagline: 'Commercial leasing • Flight Stays • Amuktamalyada',
    },
    entities: [
      {
        slug: 'firstgen-assets',
        name: 'FirstGen Assets',
        tagline: 'Commercial property leasing, industrial logistics storage, and heavy civil construction machinery.',
        url: '/businesses/firstgen-assets',
        logo: '/logos/firstgen-assets.svg',
      },
      {
        slug: 'firstgen-hotels',
        name: 'FirstGen Hotels',
        tagline: 'Flight Stays serviced apartments and Amuktamalyada regional vegetarian dining in Bengaluru.',
        url: '/businesses/firstgen-hotels',
        logo: '/logos/firstgen-hotels.svg',
      },
      {
        slug: 'firstgen-enterprises',
        name: 'FirstGen Enterprises',
        tagline: 'The Bluprint by Builders Cafe and ShubhVista architectural materials showroom.',
        url: '/businesses/firstgen-enterprises',
        logo: '/logos/firstgen-enterprises.svg',
      },
    ],
  },
  {
    slug: 'services',
    numeral: '05',
    bgColor: '#991B1B',
    textColor: '#FFFFFF',
    spotlight: {
      href: '#brandhouse',
      label: 'Explore Studio',
      tagline: 'Brand strategy • Packaging craft • Digital growth',
    },
    entities: [
      {
        slug: 'indian-brand-house',
        name: 'Indian Brand House',
        tagline: 'Brand strategy, design systems, content production, and digital growth marketing.',
        url: '/businesses/indian-brand-house',
        logo: '/logos/indian-brand-house.svg',
      },
    ],
  },
];

export const BusinessesSection: React.FC = () => {
  // Desktop active panel (0 to 4), default 0 (Built Environment)
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);

  // Mobile open accordion index, default 0
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(0);

  return (
    <section
      id="businesses"
      data-surface="white"
      className="relative w-full bg-white text-[var(--ink)] pt-24 sm:pt-32 pb-0 overflow-hidden border-t border-neutral-200"
      aria-label="Our businesses across five sectors"
    >
      {/* Intro Header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
          Group sectors & operating companies
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-8">
          <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)]">
            Our businesses
          </h2>
          <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-md">
            Operating companies across five sectors, headquartered in Ahmedabad and serving western and southern India.
          </p>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP EXPANDING FLAT-COLOUR PANELS (min-width: 1024px)
          Five full-height panels side by side.
          Collapsed: ~10% width showing vertical rotated title and large numeral.
          Hovered / Focused: Expands to ~60% over 600ms, showing entities as large rows.
         ========================================================================= */}
      <div
        className="hidden lg:flex w-full h-[720px] border-t border-b border-neutral-300"
        role="tablist"
        aria-label="Sector panels"
      >
        {SECTOR_CONFIG.map((sectorConfig, idx) => {
          const isExpanded = activeDesktopIndex === idx;
          const sectorData = sectors.find((s) => s.slug === sectorConfig.slug) || sectors[idx];

          return (
            <div
              key={sectorConfig.slug}
              role="tab"
              aria-selected={isExpanded}
              tabIndex={0}
              onMouseEnter={() => setActiveDesktopIndex(idx)}
              onFocus={() => setActiveDesktopIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  setActiveDesktopIndex((prev) => (prev + 1) % SECTOR_CONFIG.length);
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  setActiveDesktopIndex((prev) => (prev - 1 + SECTOR_CONFIG.length) % SECTOR_CONFIG.length);
                }
              }}
              style={{
                backgroundColor: sectorConfig.bgColor,
                color: sectorConfig.textColor,
                flex: isExpanded ? '6 1 0%' : '1 1 0%',
                transition: 'flex 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative overflow-hidden cursor-pointer select-none flex flex-col justify-between p-8 border-r border-white/15 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {/* Top Row: Numeral */}
              <div className="flex items-center justify-between">
                <span className="font-['Bricolage_Grotesque'] text-3xl font-extrabold text-white/70 tabular-nums">
                  {sectorConfig.numeral}
                </span>

                {isExpanded && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Sector {sectorConfig.numeral} of 05
                  </span>
                )}
              </div>

              {/* COLLAPSED STATE (Vertical rotated title) */}
              {!isExpanded && (
                <div className="flex-1 flex items-center justify-center py-12">
                  <span
                    className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-white/90 whitespace-nowrap"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    {sectorData.name}
                  </span>
                </div>
              )}

              {/* EXPANDED STATE (Rich content & large entity rows) */}
              {isExpanded && (
                <div className="flex-1 flex flex-col justify-between py-6 overflow-hidden">
                  {/* Sector Title & Summary */}
                  <div className="mb-8 border-b border-white/20 pb-6">
                    <h3 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                      {sectorData.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
                      {sectorData.description}
                    </p>
                  </div>

                  {/* If Hospitality & Leasing: Parent FirstGen label */}
                  {sectorConfig.groupLabel && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                        Umbrella: {sectorConfig.groupLabel}
                      </span>
                      <p className="text-xs text-white/70">
                        {sectorConfig.groupTagline}
                      </p>
                    </div>
                  )}

                  {/* Entity Rows */}
                  <div className="space-y-4">
                    {sectorConfig.entities.map((item) => (
                      <div key={item.slug} className="space-y-3">
                        <Link
                          href={item.url}
                          className="group block border-t border-white/20 pt-4 hover:border-white transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              {/* Entity Logo in crisp white badge */}
                              <div className="h-10 w-28 bg-white flex items-center justify-center p-2 shrink-0 border border-white/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={getAssetUrl(item.logo)}
                                  alt={item.name}
                                  className="h-full w-auto object-contain"
                                />
                              </div>

                              <div>
                                <h4 className="font-['Bricolage_Grotesque'] text-xl font-bold tracking-tight group-hover:text-[var(--hrs-orange)] transition-colors">
                                  {item.name}
                                </h4>
                                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg">
                                  {item.tagline}
                                </p>
                              </div>
                            </div>

                            {/* Arrow Pill */}
                            <div className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--ink)] group-hover:border-white transition-all shrink-0">
                              <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                                →
                              </span>
                            </div>
                          </div>
                        </Link>

                        {/* Geotrix under HRS Aluglaze requirement */}
                        {item.subEntity && (
                          <div className="ml-12 pl-4 border-l-2 border-white/30 pt-2">
                            <Link
                              href={item.subEntity.url}
                              className="group block hover:opacity-100 transition-opacity"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[11px] font-semibold text-[var(--hrs-orange)]">
                                      {item.subEntity.label}
                                    </span>
                                    <span className="text-xs font-semibold text-white">
                                      {item.subEntity.name}
                                    </span>
                                  </div>
                                  <p className="text-xs text-white/70 max-w-md">
                                    {item.subEntity.tagline}
                                  </p>
                                </div>
                                <span className="text-xs font-bold text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all">
                                  →
                                </span>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Sector Spotlight Callout */}
                  {sectorConfig.spotlight && (
                    <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
                      <span className="text-xs text-white/70">
                        {sectorConfig.spotlight.tagline}
                      </span>
                      <Link
                        href={sectorConfig.spotlight.href}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide bg-[var(--hrs-orange)] text-[var(--ink)] px-4 py-2 hover:bg-white transition-colors"
                      >
                        <span>{sectorConfig.spotlight.label}</span>
                        <span>↓</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Row */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                {isExpanded ? (
                  <>
                    <span className="truncate mr-2">{sectorData.title}</span>
                    <span className="shrink-0 font-medium">Active</span>
                  </>
                ) : (
                  <span className="w-full text-center text-[11px] font-medium opacity-75">
                    View
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          MOBILE STACKED ACCORDION (max-width: 1023px)
          Stacked layout with smooth height animation and keyboard accessibility.
         ========================================================================= */}
      <div className="lg:hidden flex flex-col border-t border-neutral-300">
        {SECTOR_CONFIG.map((sectorConfig, idx) => {
          const isOpen = activeMobileIndex === idx;
          const sectorData = sectors.find((s) => s.slug === sectorConfig.slug) || sectors[idx];

          return (
            <div
              key={sectorConfig.slug}
              style={{ backgroundColor: sectorConfig.bgColor, color: sectorConfig.textColor }}
              className="border-b border-white/20"
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => setActiveMobileIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <span className="font-['Bricolage_Grotesque'] text-2xl font-bold text-white/70 tabular-nums">
                    {sectorConfig.numeral}
                  </span>
                  <div>
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold tracking-tight text-white">
                      {sectorData.name}
                    </h3>
                    <span className="text-xs text-white/70 block mt-0.5">
                      {sectorData.title}
                    </span>
                  </div>
                </div>

                <span className="text-xl font-bold text-white/80 transition-transform duration-300">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-6 pb-8 pt-2 border-t border-white/10 space-y-6">
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {sectorData.description}
                  </p>

                  {sectorConfig.groupLabel && (
                    <div className="border-l-2 border-[var(--hrs-orange)] pl-3 py-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--hrs-orange)] block">
                        {sectorConfig.groupLabel}
                      </span>
                      <p className="text-xs text-white/70">
                        {sectorConfig.groupTagline}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    {sectorConfig.entities.map((item) => (
                      <div key={item.slug} className="border-t border-white/15 pt-4">
                        <Link href={item.url} className="block group">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-['Bricolage_Grotesque'] text-lg font-bold text-white group-hover:text-[var(--hrs-orange)] transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-xs text-white/80 mt-1">
                                {item.tagline}
                              </p>
                            </div>
                            <span className="text-sm font-bold text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all">
                              →
                            </span>
                          </div>
                        </Link>

                        {item.subEntity && (
                          <div className="mt-3 ml-4 pl-3 border-l-2 border-white/30">
                            <Link href={item.subEntity.url} className="block">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--hrs-orange)] block">
                                {item.subEntity.label}: {item.subEntity.name}
                              </span>
                              <p className="text-xs text-white/70 mt-0.5">
                                {item.subEntity.tagline}
                              </p>
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {sectorConfig.spotlight && (
                    <div className="pt-4">
                      <Link
                        href={sectorConfig.spotlight.href}
                        className="block text-center text-xs font-bold uppercase tracking-wide bg-[var(--hrs-orange)] text-[var(--ink)] py-2.5 px-4"
                      >
                        {sectorConfig.spotlight.label} ↓
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BusinessesSection;
