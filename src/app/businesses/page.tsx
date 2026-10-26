'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ArrowRight, MapPin, Building2, ExternalLink } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { entities } from '@/content/entities';
import { sectors } from '@/content/sectors';

const ENTITY_IMAGES: Record<string, { image: string; location: string; metric: string }> = {
  'hrishikesh-ventures': {
    image: '/images/hrishikesh-ventures/residential-tower.webp',
    location: 'Bodakdev & SG Highway, Ahmedabad',
    metric: '13 Master-Planned Developments',
  },
  'hrs-aluglaze': {
    image: '/images/hrs-aluglaze/sanand-campus.webp',
    location: 'Sanand Industrial Zone, Gujarat',
    metric: 'Unitised Towers up to 38 Storeys',
  },
  geotrix: {
    image: '/images/geotrix/window-frames-section.webp',
    location: 'Outer Ring Road, Bengaluru',
    metric: 'Southern India Engineering Operations',
  },
  'school-of-facade-technologies': {
    image: '/images/school-of-facade-technologies/workshop-benches.webp',
    location: 'Sanand Plant Campus, Gujarat',
    metric: 'Technical Engineering & Fabricator Skilling',
  },
  bogo: {
    image: '/bogo/page_8_300dpi.png',
    location: 'Flagship Ahmedabad & Western India',
    metric: '3 Store Formats • 11 Category Brands',
  },
  'hrishikesh-food-products': {
    image: '/images/hrishikesh-food-products/whole-spices-stone.webp',
    location: 'Bavla Production Campus, Gujarat',
    metric: 'Cold-Ground Botanical & Spice Milling',
  },
  'hrishikesh-consumer-products': {
    image: '/images/hrishikesh-consumer-products/manpras-store.webp',
    location: 'Ahmedabad Distribution Network',
    metric: '13 Dedicated Household FMCG Brands',
  },
  firstgen: {
    image: '/images/firstgen/service-apartment.webp',
    location: 'Commercial Umbrella, Ahmedabad & Bengaluru',
    metric: 'Commercial Leasing & Hospitality Holding',
  },
  'firstgen-assets': {
    image: '/images/firstgen/service-apartment.webp',
    location: 'Ahmedabad & Bengaluru Commercial Corridors',
    metric: 'Prime Commercial, Retail & Industrial Suites',
  },
  'firstgen-hotels': {
    image: '/images/firstgen/south-indian-breakfast.webp',
    location: 'Kadubeesanahalli & Outer Ring Road, Bengaluru',
    metric: 'Flight Stays Serviced Stays & Amuktamalyada Dining',
  },
  'firstgen-enterprises': {
    image: '/images/firstgen/service-apartment.webp',
    location: 'Ahmedabad Architectural Design Center',
    metric: 'The Bluprint Co-Working & ShubhVista Materials',
  },
  'indian-brand-house': {
    image: '/images/indian-brand-house/studio-desk.webp',
    location: 'Bodakdev Creative Studio, Ahmedabad',
    metric: 'Strategic Brand Identity & Growth Marketing',
  },
};

export default function BusinessesPage() {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const filteredEntities =
    selectedSector === 'all'
      ? entities
      : entities.filter((e) => e.sector === selectedSector);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28 pb-32">
        {/* Page Header */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-neutral-500">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>HRS Group Home</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--hrs-orange)]">Operating Companies Directory</span>
          </div>

          <div className="border-b border-[var(--ink)]/15 pb-10">
            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)]">
              Our businesses
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed">
              Operating enterprises across five foundational sectors: Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services. Headquartered in Ahmedabad and serving western and southern India.
            </p>
          </div>

          {/* Sector Filter Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedSector('all')}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedSector === 'all'
                  ? 'bg-[var(--ink)] text-white shadow-sm'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              All Operating Companies ({entities.length})
            </button>

            {sectors.map((sec) => {
              const count = entities.filter((e) => e.sector === sec.slug).length;
              const isActive = selectedSector === sec.slug;
              return (
                <button
                  key={sec.slug}
                  type="button"
                  onClick={() => setSelectedSector(sec.slug)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-[var(--ink)] text-white shadow-sm'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: sec.color || '#F58220' }}
                  />
                  <span>{sec.name}</span>
                  <span className="opacity-60 tabular-nums">({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Operating Entities Grid */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredEntities.map((entity) => {
              const meta = ENTITY_IMAGES[entity.slug] || {
                image: '/images/hrs-aluglaze/sanand-campus.webp',
                location: 'Ahmedabad, Gujarat',
                metric: 'Core Operating Entity',
              };
              const sectorData = sectors.find((s) => s.slug === entity.sector);

              return (
                <div
                  key={entity.slug}
                  id={entity.slug}
                  className="group relative flex flex-col justify-between border border-[var(--ink)]/15 bg-white p-6 sm:p-8 hover:border-[var(--ink)] transition-all duration-300 shadow-sm"
                >
                  <div>
                    {/* Top Row: Sector Badge & Logo */}
                    <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entity.accentColor }}
                          />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                            {sectorData?.name || entity.sector}
                          </span>
                        </div>
                        <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-colors">
                          {entity.name}
                        </h2>
                      </div>

                      {/* Official Entity Logo Box */}
                      {entity.logoPath && (
                        <div className="h-12 w-28 bg-neutral-50 flex items-center justify-center p-2 border border-neutral-200 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={entity.logoPath}
                            alt={entity.name}
                            className="h-full w-auto object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {/* Real Facility / Development Photography */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-neutral-200 bg-neutral-100 mb-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={meta.image}
                        alt={entity.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-none flex items-center justify-between">
                        <span className="truncate">{meta.metric}</span>
                        <span className="text-[10px] text-white/70 uppercase tracking-wider shrink-0 ml-2">Verified</span>
                      </div>
                    </div>

                    {/* Entity Narrative & Summary */}
                    <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                      {entity.summary}
                    </p>

                    {/* Operational Location & Audience Metadata */}
                    <div className="space-y-2 border-t border-neutral-200 pt-4 text-xs text-neutral-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[var(--hrs-orange)] shrink-0" />
                        <span className="font-medium text-neutral-900">{meta.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                        <span>Audience: {entity.audience}</span>
                      </div>
                    </div>

                    {/* Detail Tags (Developments, Brands, Divisions) */}
                    {entity.details && (
                      <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-1.5">
                        {entity.details.developments?.slice(0, 6).map((item: string) => (
                          <span key={item} className="text-[10px] font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">
                            {item}
                          </span>
                        ))}
                        {entity.details.activeBrands?.slice(0, 5).map((item: string) => (
                          <span key={item} className="text-[10px] font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">
                            {item}
                          </span>
                        ))}
                        {entity.details.assetClasses?.slice(0, 3).map((item: string) => (
                          <span key={item} className="text-[10px] font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1">
                      {entity.status}
                    </span>

                    <Link
                      href={entity.url}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors"
                    >
                      <span>Explore Overview</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Global Group CTA */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mt-20 sm:mt-24">
          <div className="bg-[var(--ink)] text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/10">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Corporate Headquarters & Partnership
              </span>
              <h3 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight">
                Partner with HRS Group operating companies
              </h3>
              <p className="mt-3 text-sm text-neutral-300">
                Direct commercial leasing inquiries, industrial facade engineering consultations, and retail brand distribution partnerships.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--hrs-orange)] text-[var(--ink)] px-7 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <span>Initiate Contact</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[var(--ink)] transition-colors"
              >
                <span>About the Group</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
