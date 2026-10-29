'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Building2, Factory, Sparkles, CheckCircle2 } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs, Logo } from '@/components/ui';
import { entities } from '@/content/entities';
import { sectors } from '@/content/sectors';
import { getAssetUrl } from '@/lib/basePath';

interface EntityVisualCard {
  slug: string;
  name: string;
  sector: string;
  sectorName: string;
  tagline: string;
  image: string;
  location: string;
  metric: string;
  metricLabel: string;
  badges: string[];
  href: string;
  accentColor: string;
}

const BUSINESS_VISUAL_CARDS: EntityVisualCard[] = [
  // Built Environment
  {
    slug: 'hrishikesh-ventures',
    name: 'Hrishikesh Ventures',
    sector: 'built-environment',
    sectorName: 'Built Environment',
    tagline: 'Residential communities, plotted villa enclaves, and boutique commercial centres in western Ahmedabad.',
    image: '/images/hrishikesh-ventures/residential-tower.webp',
    location: 'SG Highway, Ambli & Science City, Ahmedabad',
    metric: '13',
    metricLabel: 'Master-planned developments',
    badges: ['H1 to H10', 'W1 Tower', 'Hrishikesh 1, 2, 3', 'H9 Joint Venture'],
    href: '/businesses/hrishikesh-ventures',
    accentColor: '#15852C',
  },
  {
    slug: 'hrs-aluglaze',
    name: 'HRS Aluglaze Ltd',
    sector: 'built-environment',
    sectorName: 'Built Environment',
    tagline: 'High-precision facade engineering, unitised curtain walls, and architectural fenestration manufactured at Sanand.',
    image: '/images/hrs-aluglaze/sanand-campus.webp',
    location: 'Sanand Industrial Estate, Gujarat',
    metric: '450K m²',
    metricLabel: 'Annual processing capacity',
    badges: ['Unitised Curtain Walls', 'Structural Glazing', '38-Storey Envelopes', 'CWCT Tested'],
    href: '/businesses/hrs-aluglaze',
    accentColor: '#15852C',
  },
  {
    slug: 'geotrix',
    name: 'Geotrix Pvt. Ltd.',
    sector: 'built-environment',
    sectorName: 'Built Environment',
    tagline: 'Southern India facade engineering and installation firm serving IT corridors across Bengaluru, Hyderabad, and Chennai.',
    image: '/images/geotrix/window-frames-section.webp',
    location: 'Outer Ring Road, Bengaluru',
    metric: 'South India',
    metricLabel: 'Regional operating arm',
    badges: ['Aluglaze Southern Hub', 'Crane Logistics', 'Tech Park Envelopes'],
    href: '/businesses/geotrix',
    accentColor: '#15852C',
  },
  {
    slug: 'school-of-facade-technologies',
    name: 'School of Facade Technologies',
    sector: 'built-environment',
    sectorName: 'Built Environment',
    tagline: 'Specialist facade and fenestration academy offering vocational skilling, installer certifications, and professional upskilling.',
    image: '/images/school-of-facade-technologies/workshop-benches.webp',
    location: 'Sanand Plant Campus, Gujarat',
    metric: '3 Tracks',
    metricLabel: 'Target audience curricula',
    badges: ['Students & Entrants', 'Installers & Fabricators', 'Architects & Engineers'],
    href: '/businesses/school-of-facade-technologies',
    accentColor: '#15852C',
  },

  // Retail
  {
    slug: 'bogo',
    name: 'BOGO Retail Ecosystem',
    sector: 'retail',
    sectorName: 'Retail',
    tagline: 'Multi-format connected modern retail destinations, eleven dedicated category brands, and integrated stockist distribution.',
    image: '/bogo/stores/bogo-square-concept.webp',
    location: 'Flagship Ahmedabad & Western India',
    metric: '11 Brands',
    metricLabel: 'Across 3 physical formats',
    badges: ['BOGO Square (Flagship)', 'BOGO Bazaar', 'BOGO Mini', 'BOGO Go Wholesale'],
    href: '/bogo',
    accentColor: '#F58A33',
  },

  // Food and Consumer
  {
    slug: 'hrishikesh-food-products',
    name: 'Hrishikesh Food Products',
    sector: 'food-and-consumer',
    sectorName: 'Food & Consumer',
    tagline: 'Low-temperature stone spice milling, contract cleaning, and custom seasoning mixes with dedicated laboratory assays.',
    image: '/images/hrishikesh-food-products/whole-spices-stone.webp',
    location: 'Bavla Production Campus, Gujarat',
    metric: '3 Models',
    metricLabel: 'Manufacturing pathways',
    badges: ['Job Work', 'White Labelling', 'Own Product Ranges', 'Analytical Lab'],
    href: '/businesses/hrishikesh-food-products',
    accentColor: '#EB7C20',
  },
  {
    slug: 'hrishikesh-consumer-products',
    name: 'Hrishikesh Consumer Products',
    sector: 'food-and-consumer',
    sectorName: 'Food & Consumer',
    tagline: 'FMCG company managing 13 household brands alongside Manpras neighbourhood one-stop grocery store retail.',
    image: '/images/hrishikesh-consumer-products/manpras-store.webp',
    location: 'Ahmedabad Distribution Network',
    metric: '13 Brands',
    metricLabel: 'Household packaged portfolio',
    badges: ['Manpras Stores & Range', 'Snackshot', 'Antrah', 'Basic Essentials', 'Gush & Daily Pump'],
    href: '/businesses/hrishikesh-consumer-products',
    accentColor: '#EB7C20',
  },

  // Hospitality and Leasing
  {
    slug: 'firstgen-assets',
    name: 'FirstGen Assets',
    sector: 'hospitality-and-leasing',
    sectorName: 'Hospitality & Leasing',
    tagline: 'Commercial office floorplates, retail high-street frontages, industrial logistics warehouses, and contractor equipment leasing.',
    image: '/images/firstgen/service-apartment.webp',
    location: 'Ahmedabad & Bengaluru Commercial Corridors',
    metric: 'Grade A',
    metricLabel: 'Office & logistics suites',
    badges: ['Commercial Offices', 'High-Street Retail', 'Industrial Warehousing', 'Machinery Leasing'],
    href: '/businesses/firstgen-assets',
    accentColor: '#13477A',
  },
  {
    slug: 'firstgen-hotels',
    name: 'FirstGen Hotels',
    sector: 'hospitality-and-leasing',
    sectorName: 'Hospitality & Leasing',
    tagline: 'Corporate serviced residences under Flight Stays and authentic Telugu vegetarian tiffin and meals at Amuktamalyada.',
    image: '/images/firstgen/south-indian-breakfast.webp',
    location: 'Outer Ring Road & Kadubeesanahalli, Bengaluru',
    metric: '2 Ventures',
    metricLabel: 'Hospitality operations',
    badges: ['Flight Stays Serviced Stays', 'Amuktamalyada Dining', 'Gare & Pesarattu', 'Bengaluru Hub'],
    href: '/businesses/firstgen-hotels',
    accentColor: '#13477A',
  },
  {
    slug: 'firstgen-enterprises',
    name: 'FirstGen Enterprises',
    sector: 'hospitality-and-leasing',
    sectorName: 'Hospitality & Leasing',
    tagline: 'Trade co-working and material display hub at The Bluprint by Builders Cafe, paired with ShubhVista building fittings retail.',
    image: '/images/firstgen/service-apartment.webp',
    location: 'Ahmedabad Architectural Design Center',
    metric: 'Trade Venues',
    metricLabel: 'Building industry ecosystems',
    badges: ['The Bluprint Co-Working', 'Material Display Hub', 'ShubhVista Retail'],
    href: '/businesses/firstgen-enterprises',
    accentColor: '#13477A',
  },

  // Services
  {
    slug: 'indian-brand-house',
    name: 'Indian Brand House',
    sector: 'services',
    sectorName: 'Services',
    tagline: 'Independent brand communications agency delivering brand identity systems, packaging craft, and digital growth marketing.',
    image: '/images/indian-brand-house/studio-desk.webp',
    location: 'Bodakdev Creative Studio, Ahmedabad',
    metric: '3 Pillars',
    metricLabel: 'Agency service disciplines',
    badges: ['Brand Strategy & Identity', 'Creative & Content', 'Performance Marketing'],
    href: '/businesses/indian-brand-house',
    accentColor: '#EA5735',
  },
];

export default function BusinessesPage() {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const filteredCards =
    selectedSector === 'all'
      ? BUSINESS_VISUAL_CARDS
      : BUSINESS_VISUAL_CARDS.filter((c) => c.sector === selectedSector);

  return (
    <>
      <Header />

      <main className="relative min-h-screen">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-5xl">
            <Breadcrumbs
              items={[{ label: 'Our businesses' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-3">
              Operating Companies Portfolio
            </span>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Autonomous businesses, <em>unified</em> governance
            </h1>

            <p className="mt-6 text-lg sm:text-2xl text-neutral-700 leading-relaxed max-w-3xl">
              Eight operating entities spanning facade engineering, real estate, food manufacturing, consumer brands, hospitality, technical education, brand communications, and modern retail.
            </p>

            {/* Interactive Sector Switcher Pills */}
            <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedSector('all')}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  selectedSector === 'all'
                    ? 'bg-[var(--ink)] text-white shadow-sm'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                All businesses ({BUSINESS_VISUAL_CARDS.length})
              </button>

              {sectors.map((sec) => {
                const count = BUSINESS_VISUAL_CARDS.filter((c) => c.sector === sec.slug).length;
                return (
                  <button
                    key={sec.slug}
                    type="button"
                    onClick={() => setSelectedSector(sec.slug)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      selectedSector === sec.slug
                        ? 'bg-[var(--ink)] text-white shadow-sm'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: sec.color }}
                    />
                    <span>{sec.name}</span>
                    <span className="opacity-70 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        {/* 2. Visual Cards Grid: Surface White */}
        <Section surface="white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCards.map((card) => (
              <article
                key={card.slug}
                className="group relative flex flex-col justify-between overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:border-[var(--ink)] hover:shadow-lg"
              >
                {/* Visual Image Header */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl(card.image)}
                      alt={card.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Sector Color Accent Top Bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: card.accentColor }}
                    />

                    {/* Logo Floating Badge */}
                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-sm bg-white p-1.5 shadow-md border border-neutral-200">
                      <Logo slug={card.slug} name={card.name} height="h-7" />
                    </div>

                    {/* Metric Chip */}
                    <div className="absolute top-3 right-3 rounded-full bg-[var(--ink)]/90 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-white tabular-nums border border-white/20">
                      {card.metric}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                      <span
                        className="font-semibold text-[11px]"
                        style={{ color: card.accentColor }}
                      >
                        {card.sectorName}
                      </span>
                      <span className="text-[11px]">{card.metricLabel}</span>
                    </div>

                    <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--hrs-orange)]">
                      <Link href={card.href} className="focus:outline-none">
                        {card.name}
                      </Link>
                    </h2>

                    <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                      {card.tagline}
                    </p>

                    {/* Badges / Pill Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {card.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-medium text-neutral-700 border border-neutral-200"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Strip */}
                <div className="border-t border-neutral-100 p-6 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate max-w-[180px]">{card.location.split(',')[0]}</span>
                  </div>

                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 3. Physical Facilities & Production Campus Visual Showcase: Surface Ink */}
        <Section surface="ink">
          <div className="mb-12 border-b border-white/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Physical Infrastructure
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Manufacturing campuses and operating hubs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="overflow-hidden border border-white/15 bg-white/5 flex flex-col justify-between">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/hrs-aluglaze/sanand-campus.webp')}
                  alt="Sanand Facade Plant"
                  className="h-full w-full object-cover grayscale contrast-125"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold text-[var(--hrs-orange)] block">
                  Sanand Industrial Estate
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white mt-1">
                  120,000 sq ft CNC plant
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                  Automated double-miter cutting saws, CNC milling bays, and silicone structural glazing.
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-white/15 bg-white/5 flex flex-col justify-between">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/hrishikesh-food-products/whole-spices-stone.webp')}
                  alt="Bavla Botanical Campus"
                  className="h-full w-full object-cover grayscale contrast-125"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold text-[var(--hrs-orange)] block">
                  Bavla Industrial Belt
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white mt-1">
                  Botanical spice campus
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                  Low-temperature stone milling, automated pouch packaging lines, and analytical quality assay labs.
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-white/15 bg-white/5 flex flex-col justify-between">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/geotrix/window-frames-section.webp')}
                  alt="Bengaluru Engineering Hub"
                  className="h-full w-full object-cover grayscale contrast-125"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold text-[var(--hrs-orange)] block">
                  Outer Ring Road, Bengaluru
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white mt-1">
                  Southern engineering hub
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                  Geotrix site operations delivering facade erection, crane coordination, and Flight Stays hospitality.
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-white/15 bg-white/5 flex flex-col justify-between">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/group/corporate-lobby.webp')}
                  alt="Ahmedabad Corporate Headquarters"
                  className="h-full w-full object-cover grayscale contrast-125"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold text-[var(--hrs-orange)] block">
                  Bodakdev, SG Highway
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white mt-1">
                  HRS House headquarters
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                  Group capital governance, Indian Brand House studio, and central corporate registry.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Bottom Commercial Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[var(--ink)] block mb-2">
                Commercial Enquiries
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                Initiate an engineering, leasing or trade contract
              </h2>
              <p className="mt-3 text-base text-[var(--ink)]/85">
                Submit project drawings, tender inquiries, or store distribution proposals directly to our operating desk.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Button href="/contact" variant="primary">
                Contact commercial desk
              </Button>
              <Button href="/about" variant="outline">
                About the group
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
