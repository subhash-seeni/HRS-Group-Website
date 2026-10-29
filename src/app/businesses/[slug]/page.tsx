import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, Building2, CheckCircle2, Factory, ExternalLink, ShieldCheck, GraduationCap, Utensils, Hotel, Store, Palette, Layers } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs, Logo } from '@/components/ui';
import { entities } from '@/content/entities';
import { projects } from '@/content/projects';
import { consumerBrands } from '@/content/entities';
import { getAssetUrl } from '@/lib/basePath';

type Props = {
  params: Promise<{ slug: string }>;
};

const ENTITY_MEDIA: Record<string, { heroImage: string; secondaryImage?: string; metrics: { value: string; label: string }[] }> = {
  'hrishikesh-ventures': {
    heroImage: '/images/hrishikesh-ventures/residential-tower.webp',
    secondaryImage: '/images/hrishikesh-ventures/h2-residential.webp',
    metrics: [
      { value: '13', label: 'Developments' },
      { value: '1', label: 'Joint venture' },
      { value: '16 Yrs', label: 'Operational history' },
      { value: 'Ahmedabad', label: 'Core corridor' },
    ],
  },
  'hrs-aluglaze': {
    heroImage: '/images/hrs-aluglaze/sanand-campus.webp',
    secondaryImage: '/images/hrs-aluglaze/curtain-wall-detail.webp',
    metrics: [
      { value: '120,000', label: 'Sq ft Sanand plant' },
      { value: '450,000', label: 'Sq m annual capacity' },
      { value: '38', label: 'Storey envelope capability' },
      { value: 'CWCT', label: 'Certified water tightness' },
    ],
  },
  geotrix: {
    heroImage: '/images/geotrix/window-frames-section.webp',
    secondaryImage: '/images/hrs-aluglaze/curtain-wall-detail.webp',
    metrics: [
      { value: 'South India', label: 'Operational territory' },
      { value: 'Bengaluru', label: 'Regional hub' },
      { value: 'Aluglaze', label: 'Integrated engineering' },
      { value: 'Tech Parks', label: 'Primary project focus' },
    ],
  },
  'school-of-facade-technologies': {
    heroImage: '/images/school-of-facade-technologies/workshop-benches.webp',
    metrics: [
      { value: '3', label: 'Target audience tracks' },
      { value: 'Sanand', label: 'Hands-on workshop campus' },
      { value: 'Aluglaze', label: 'Industry-backed mastery' },
      { value: 'Practical', label: 'Rigorous trade certification' },
    ],
  },
  'hrishikesh-food-products': {
    heroImage: '/images/hrishikesh-food-products/whole-spices-stone.webp',
    metrics: [
      { value: 'Bavla', label: 'Processing campus' },
      { value: '3', label: 'Manufacturing pathways' },
      { value: 'Cold Stone', label: 'Low-temperature milling' },
      { value: 'Assay Lab', label: 'Volatile oil testing' },
    ],
  },
  'hrishikesh-consumer-products': {
    heroImage: '/images/hrishikesh-consumer-products/manpras-store.webp',
    metrics: [
      { value: '13', label: 'Consumer packaged brands' },
      { value: 'Manpras', label: 'One-stop neighbourhood store' },
      { value: 'FMCG', label: 'Multi-category distribution' },
      { value: 'Gujarat', label: 'Modern trade presence' },
    ],
  },
  firstgen: {
    heroImage: '/images/firstgen/service-apartment.webp',
    secondaryImage: '/images/firstgen/south-indian-breakfast.webp',
    metrics: [
      { value: '4', label: 'Operating divisions' },
      { value: 'Assets', label: 'Commercial leasing' },
      { value: 'Hotels', label: 'Flight Stays & Amuktamalyada' },
      { value: 'Enterprises', label: 'The Bluprint & ShubhVista' },
    ],
  },
  'firstgen-assets': {
    heroImage: '/images/firstgen/service-apartment.webp',
    metrics: [
      { value: 'Commercial', label: 'Grade A office suites' },
      { value: 'Logistics', label: 'Industrial warehousing' },
      { value: 'Retail', label: 'High-street show windows' },
      { value: 'Machinery', label: 'Construction equipment' },
    ],
  },
  'firstgen-hotels': {
    heroImage: '/images/firstgen/south-indian-breakfast.webp',
    secondaryImage: '/images/firstgen/service-apartment.webp',
    metrics: [
      { value: 'Flight Stays', label: 'Corporate residences' },
      { value: 'Amuktamalyada', label: 'Telugu tiffin & meals' },
      { value: 'Bengaluru', label: 'Outer Ring Road hub' },
      { value: '04:30 AM', label: 'Fresh morning batter grinding' },
    ],
  },
  'firstgen-enterprises': {
    heroImage: '/images/firstgen/service-apartment.webp',
    metrics: [
      { value: 'The Bluprint', label: 'Trade cafe & co-working' },
      { value: 'ShubhVista', label: 'Building fittings retail' },
      { value: 'Materials', label: 'Architectural display hub' },
      { value: 'Ahmedabad', label: 'Design center location' },
    ],
  },
  'indian-brand-house': {
    heroImage: '/images/indian-brand-house/studio-desk.webp',
    metrics: [
      { value: '3', label: 'Core studio disciplines' },
      { value: 'Independent', label: 'Serving group & external' },
      { value: 'Bodakdev', label: 'Creative studio campus' },
      { value: 'Strategy', label: 'Identity & performance growth' },
    ],
  },
};

export async function generateStaticParams() {
  return entities
    .filter((e) => e.slug !== 'bogo')
    .map((entity) => ({
      slug: entity.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = entities.find((e) => e.slug === slug);

  if (!entity) {
    return {
      title: 'Business Not Found · HRS Group',
    };
  }

  return {
    title: `${entity.name} · HRS Group`,
    description: entity.summary,
    openGraph: {
      title: `${entity.name} · HRS Group`,
      description: entity.summary,
      url: `https://hrsgroup.in/businesses/${entity.slug}`,
      siteName: 'HRS Group',
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default async function EntityPage({ params }: Props) {
  const { slug } = await params;
  const entity = entities.find((e) => e.slug === slug);

  if (!entity) {
    notFound();
  }

  const media = ENTITY_MEDIA[entity.slug] || {
    heroImage: '/images/hrs-aluglaze/sanand-campus.webp',
    metrics: [
      { value: 'Active', label: 'Operational Status' },
      { value: 'Gujarat', label: 'Regional Territory' },
    ],
  };

  const entityProjects = projects.filter((p) => p.entitySlug === entity.slug);

  const relatedList = (entity.relatedEntities || [])
    .map((relSlug) => entities.find((e) => e.slug === relSlug))
    .filter(Boolean);

  return (
    <>
      <Header />

      <main className="relative min-h-screen">
        {/* 1. Full-Bleed Visual Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs
              items={[
                { label: 'Our businesses', href: '/businesses' },
                { label: entity.name },
              ]}
              backLink={{ label: 'Businesses directory', href: '/businesses' }}
              className="mb-8"
            />

            <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left Column: Entity Identity & Description */}
              <div className="col-span-12 lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-white p-2 shadow-sm border border-neutral-200">
                    <Logo slug={entity.slug} name={entity.name} height="h-8" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-semibold block"
                      style={{ color: entity.accentColor }}
                    >
                      {entity.sectorName || entity.sector}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      {entity.location} · {entity.status}
                    </span>
                  </div>
                </div>

                <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
                  {entity.name}
                </h1>

                <p className="text-base sm:text-xl text-neutral-700 leading-relaxed max-w-xl">
                  {entity.descriptor || entity.summary}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Button href={`/contact?entity=${entity.slug}`} variant="primary">
                    Initiate commercial enquiry
                  </Button>
                  <Button href="#overview" variant="secondary">
                    View capabilities
                  </Button>
                </div>
              </div>

              {/* Right Column: Hero Visual Asset */}
              <div className="col-span-12 lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-200 shadow-xl bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAssetUrl(media.heroImage)}
                    alt={entity.name}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  {/* Subtle Accent Bottom Line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: entity.accentColor }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Graphic Metric Slabs */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[var(--ink)]/15 pt-8">
              {media.metrics.map((m) => (
                <div key={m.label} className="p-4 bg-white/70 border border-neutral-200/80">
                  <div className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tabular-nums">
                    {m.value}
                  </div>
                  <span className="text-xs font-semibold text-neutral-600 block mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 3. Specialized Entity Visual Showcases: Surface White */}
        <Section surface="white" id="overview">
          {/* A. School of Facade Technologies: 3 Audience Tracks */}
          {entity.slug === 'school-of-facade-technologies' && (
            <div className="space-y-12">
              <div className="border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Vocational & Professional Education
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  Three distinct audience tracks
                </h2>
                <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                  Drawing directly on the practical engineering expertise of HRS Aluglaze to bridge theoretical calculation and site-level installation mastery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-neutral-200 p-8 flex flex-col justify-between hover:border-[var(--ink)] transition-colors bg-[var(--paper)]">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-white">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-[var(--hrs-orange)] block">Track 01</span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      Students & fresh entrants
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Diploma and certificate foundation courses covering facade engineering theory, 2D/3D CAD detailing, structural wind-load physics, and material science.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-neutral-200/80 mt-6 text-xs text-neutral-500 font-medium">
                    Prepares diploma holders for junior design & drafting roles.
                  </div>
                </div>

                <div className="border border-neutral-200 p-8 flex flex-col justify-between hover:border-[var(--ink)] transition-colors bg-[var(--paper)]">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-white">
                      <Factory className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-[var(--hrs-orange)] block">Track 02</span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      Site installers & fabricators
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Hands-on vocational trade skilling on actual workshop rigs: bracket anchoring, structural silicone metering, double-miter joint cutting, and crane erection.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-neutral-200/80 mt-6 text-xs text-neutral-500 font-medium">
                    Certified safety benchmarks and water hose testing verification.
                  </div>
                </div>

                <div className="border border-neutral-200 p-8 flex flex-col justify-between hover:border-[var(--ink)] transition-colors bg-[var(--paper)]">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-white">
                      <Layers className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-[var(--hrs-orange)] block">Track 03</span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      Architects & engineers
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Professional upskilling on unitised envelope engineering, thermal break calculations, seismic drift accommodations, and acoustic isolation specs.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-neutral-200/80 mt-6 text-xs text-neutral-500 font-medium">
                    Masterclasses with seasoned structural envelope consultants.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. Hrishikesh Food Products: 3 Manufacturing Pathways */}
          {entity.slug === 'hrishikesh-food-products' && (
            <div className="space-y-12">
              <div className="border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Bavla Production Facilities
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  Three distinct operational pathways
                </h2>
                <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                  Operating clean spice milling and packaging across contract manufacturing, private label supply, and proprietary consumer retail.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-neutral-200 p-8 bg-[var(--paper)] flex flex-col justify-between hover:border-[var(--ink)] transition-colors">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[var(--hrs-orange)] block">Model 01</span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      Job work processing
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Custom milling, fine pulverisation, and stone-grinding executed strictly according to institutional clients' proprietary spice formulations.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200 text-xs text-neutral-500 font-medium">
                    Batch assay logs & volatile oil retention guarantees.
                  </div>
                </div>

                <div className="border border-neutral-200 p-8 bg-[var(--paper)] flex flex-col justify-between hover:border-[var(--ink)] transition-colors">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[var(--hrs-orange)] block">Model 02</span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      White labelling & private label
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Turnkey finished spice and seasoning production packed under supermarket and private label trade marks, from sourcing to nitrogen-flushed pouching.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200 text-xs text-neutral-500 font-medium">
                    Full FSSAI statutory compliance and tamper-evident packaging.
                  </div>
                </div>

                <div className="border border-neutral-200 p-8 bg-[var(--paper)] flex flex-col justify-between hover:border-[var(--ink)] transition-colors">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[var(--hrs-orange)] block">Model 03</span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      Proprietary product ranges
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      In-house retail packaged ranges marketed directly to modern trade and regional distributors, including single-origin spices and authentic regional blends.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200 text-xs text-neutral-500 font-medium">
                    Distributed across Gujarat and western regional channels.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* C. Hrishikesh Consumer Products: Manpras Grocery & 13 Brands Wall */}
          {entity.slug === 'hrishikesh-consumer-products' && (
            <div className="space-y-16">
              {/* Manpras Feature Card */}
              <div className="border border-neutral-200 bg-[var(--paper)] overflow-hidden grid grid-cols-12 items-center">
                <div className="col-span-12 lg:col-span-6 p-8 sm:p-12 space-y-4">
                  <div className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-[var(--hrs-orange)]" />
                    <span className="text-xs font-bold text-[var(--hrs-orange)] uppercase tracking-wider">
                      Flagship Retail & Brand
                    </span>
                  </div>
                  <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
                    Manpras: One-stop neighbourhood grocery
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    Designed in the mould of Ahmedabad's celebrated Magson and Falguni Gruh Udhyog. Manpras provides a comprehensive neighbourhood grocery offering, combining fresh fruit, daily vegetables, and milk with pantry staples, so families avoid multiple shop visits.
                  </p>
                  <div className="pt-2 text-xs font-semibold text-neutral-600 flex items-center gap-3">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      Physical Store Format
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                      Packaged Grocery Brand
                    </span>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 aspect-[16/10] overflow-hidden bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAssetUrl('/images/hrishikesh-consumer-products/manpras-store.webp')}
                    alt="Manpras Neighbourhood Grocery"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* 13 FMCG Brands Grid */}
              <div>
                <div className="border-b border-[var(--ink)]/15 pb-6 mb-8 max-w-2xl">
                  <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-1">
                    Packaged Goods Portfolio
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-3xl font-extrabold text-[var(--ink)]">
                    Thirteen dedicated household brands
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2">
                    Comprising active product lines in retail distribution alongside reserved trade marks defined for future category releases.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {consumerBrands.map((b) => (
                    <div
                      key={b.slug}
                      className="border border-neutral-200 p-5 bg-white flex flex-col justify-between hover:border-[var(--ink)] transition-colors shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: b.status === 'active' ? '#DCFCE7' : '#F3F4F6',
                              color: b.status === 'active' ? '#166534' : '#4B5563',
                            }}
                          >
                            {b.status === 'active' ? 'Active distribution' : 'Reserved mark'}
                          </span>
                        </div>
                        <h4 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                          {b.name}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                          {b.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* D. FirstGen Hotels: Flight Stays & Amuktamalyada Dining */}
          {entity.slug === 'firstgen-hotels' && (
            <div className="space-y-16">
              <div className="border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Hospitality Operations
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  Serviced residences & authentic regional dining
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Flight Stays Card */}
                <div className="border border-neutral-200 bg-[var(--paper)] overflow-hidden flex flex-col justify-between">
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl('/images/firstgen/service-apartment.webp')}
                      alt="Flight Stays Bengaluru"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--hrs-orange)]">
                      <Hotel className="h-4 w-4" />
                      <span>Corporate Long-Stay Living</span>
                    </div>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      Flight Stays Service Apartments
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Premium serviced residences currently being established in Bengaluru's eastern tech corridor, catering to corporate executives, IT consultants, and relocation stays.
                    </p>
                    <div className="pt-2 text-xs text-neutral-500 font-medium">
                      Equipped with high-speed connectivity, kitchenette suites, and 24/7 concierge.
                    </div>
                  </div>
                </div>

                {/* Amuktamalyada Card */}
                <div className="border border-neutral-200 bg-[var(--paper)] overflow-hidden flex flex-col justify-between">
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl('/images/firstgen/south-indian-breakfast.webp')}
                      alt="Amuktamalyada Telugu Tiffin"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--hrs-orange)]">
                      <Utensils className="h-4 w-4" />
                      <span>Outer Ring Road, Bengaluru</span>
                    </div>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                      Amuktamalyada Telugu Tiffin & Meals
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Acclaimed vegetarian culinary establishment renowned for authentic South Indian breakfast delicacies, including freshly fried crispy gare, steamed upma, soft rava idli, golden pesarattu, and ghee roast dosas.
                    </p>
                    <div className="pt-2 text-xs text-neutral-500 font-medium">
                      Daily batter ground fresh at 04:30 AM alongside wholesome, affordable midday meals.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* E. FirstGen Holding & General FirstGen Ventures */}
          {['firstgen', 'firstgen-enterprises', 'firstgen-assets'].includes(entity.slug) && (
            <div className="space-y-12">
              <div className="border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Operating Division Scope
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  Assets, hospitality and trade enterprises
                </h2>
                <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                  FirstGen coordinates commercial real estate leasing, business accommodation, and trade experience centres across Gujarat and Karnataka.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-neutral-200 p-6 bg-[var(--paper)] space-y-3">
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                    FirstGen Assets
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    Commercial office suites along SG Highway, retail high-street frontages, industrial logistics warehouses, and contractor heavy civil equipment.
                  </p>
                </div>
                <div className="border border-neutral-200 p-6 bg-[var(--paper)] space-y-3">
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                    The Bluprint by Builders Cafe
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    A dedicated meeting cafe for the building trade doubling as a co-working environment and material display centre for contractors, architects, and engineers.
                  </p>
                </div>
                <div className="border border-neutral-200 p-6 bg-[var(--paper)] space-y-3">
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                    ShubhVista
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    Retail showroom selling building materials, architectural aluminium fittings, and interior finishes to homeowners and trade builders.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* F. Hrishikesh Ventures: Residential & Commercial Developments Gallery */}
          {entity.slug === 'hrishikesh-ventures' && entityProjects.length > 0 && (
            <div className="space-y-12">
              <div className="border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Master-Planned Portfolio
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  13 live developments and 1 joint venture
                </h2>
                <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                  Focused on planned residential communities and commercial centres across western Ahmedabad transport corridors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entityProjects.map((p) => (
                  <div
                    key={p.slug}
                    className="border border-neutral-200 bg-[var(--paper)] p-6 flex flex-col justify-between hover:border-[var(--ink)] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                        <span className="font-bold text-[var(--hrs-orange)]">{p.typology}</span>
                        <span className="tabular-nums font-semibold text-neutral-800">{p.yearCompletedOrStatus}</span>
                      </div>
                      <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                        {p.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 mb-3">
                        {p.location} · {p.scale}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* G. HRS Aluglaze & Geotrix: Exploded Facade Systems Cards */}
          {['hrs-aluglaze', 'geotrix'].includes(entity.slug) && (
            <div className="space-y-12">
              <div className="border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Precision Building Skins
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  Engineered facade and fenestration systems
                </h2>
                <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                  Delivering high-precision aluminium assemblies, unitised curtain walls, and thermal window systems with Sanand manufacturing lines and Bengaluru regional site erection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border border-neutral-200 bg-[var(--paper)] p-8 space-y-3">
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    Unitised Curtain Walls
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Prefabricated floor-to-floor glazed cassettes assembled in factory conditions with silicone bonding, delivering rapid crane erection for high-rises up to 38 storeys.
                  </p>
                </div>
                <div className="border border-neutral-200 bg-[var(--paper)] p-8 space-y-3">
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    Structural Glazing & Atriums
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Flush glass building envelopes, spider-fitting tension systems, and point-fixed canopies engineered for commercial headquarters and grand entrance atriums.
                  </p>
                </div>
                <div className="border border-neutral-200 bg-[var(--paper)] p-8 space-y-3">
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    Thermally Broken Windows & Doors
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    High-performance aluminium sliding assemblies, casements, and heavy-duty sliding fold doors engineered against monsoon wind pressures.
                  </p>
                </div>
                <div className="border border-neutral-200 bg-[var(--paper)] p-8 space-y-3">
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    Architectural Louvres & Solar Fins
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Extruded aluminium aerodynamic louvre banks, acoustic baffles, and ventilated rain-screen cladding panels for institutional campuses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* H. Indian Brand House: Agency Service Pillars */}
          {entity.slug === 'indian-brand-house' && (
            <div className="space-y-12">
              <div className="border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Independent Communications Agency
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                  Three core agency disciplines
                </h2>
                <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                  Serving both HRS Group operating entities and external clients across corporate branding, packaging craft, and digital distribution.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-neutral-200 p-8 bg-[var(--paper)] space-y-3">
                  <span className="text-xs font-bold text-[var(--hrs-orange)] block">Pillar 01</span>
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    Brand strategy & identity
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Visual identity systems, typography guidelines, brand architecture, and packaging die-line engineering for industrial and FMCG enterprises.
                  </p>
                </div>
                <div className="border border-neutral-200 p-8 bg-[var(--paper)] space-y-3">
                  <span className="text-xs font-bold text-[var(--hrs-orange)] block">Pillar 02</span>
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    Creative & content production
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Commercial architectural photography, technical editorial publications, copy systems, and digital multimedia assets.
                  </p>
                </div>
                <div className="border border-neutral-200 p-8 bg-[var(--paper)] space-y-3">
                  <span className="text-xs font-bold text-[var(--hrs-orange)] block">Pillar 03</span>
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    Digital & performance marketing
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Web platform engineering, search optimization, programmatic lead generation, and analytics dashboards for B2B engineering and real estate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* 4. Sister Entities: Surface Paper */}
        {relatedList.length > 0 && (
          <Section surface="paper">
            <div className="mb-8 border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Group Ecosystem
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Related operating businesses
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedList.map((rel) => (
                <div
                  key={rel!.slug}
                  className="border border-neutral-200 bg-white p-6 space-y-3 flex flex-col justify-between hover:border-[var(--ink)] transition-colors"
                >
                  <div>
                    <span className="text-xs text-[var(--hrs-orange)] font-semibold block">
                      {rel!.sectorName || rel!.sector}
                    </span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] mt-1">
                      <Link href={rel!.url} className="hover:text-[var(--hrs-orange)]">
                        {rel!.name}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2">
                      {rel!.descriptor || rel!.summary}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100">
                    <Link
                      href={rel!.url}
                      className="text-xs font-bold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Explore {rel!.shortName || rel!.name}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 5. Sticky Direct Action Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[var(--ink)] block mb-2">
                Operational Channel
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                Discuss specifications with {entity.name}
              </h2>
              <p className="mt-3 text-base text-[var(--ink)]/85">
                Submit architectural blueprints, leasing requests, spice milling orders, or agency proposals directly to the division desk.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Button href={`/contact?entity=${entity.slug}`} variant="primary">
                Submit enquiry for {entity.shortName || entity.name}
              </Button>
              <Button href="/businesses" variant="outline">
                All operating businesses
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
