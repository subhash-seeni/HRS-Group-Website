import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Factory, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { aboutContent, milestones, leadership, values } from '@/content/about';
import { calmFacts } from '@/content/facts';
import { getAssetUrl } from '@/lib/basePath';

export const metadata: Metadata = {
  title: 'About the Group · HRS Group',
  description:
    'Sixteen years of patient building across Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services in Ahmedabad and Bengaluru.',
  openGraph: {
    title: 'About the Group · HRS Group',
    description:
      'Sixteen years of patient building across Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services.',
    url: 'https://hrsgroup.in/about',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About HRS Group',
    description:
      'History, leadership, operating values, and manufacturing milestones of HRS Group.',
    url: 'https://hrsgroup.in/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'HRS Group',
      foundingDate: '2012',
      foundingLocation: 'Ahmedabad, Gujarat, India',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="relative min-h-screen">
        {/* 1. Split Hero with Photo Collage: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs
              items={[{ label: 'About the group' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left Column: Heading & Hook */}
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                  Corporate Heritage & Governance
                </span>

                <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
                  Built in Ahmedabad, <em>engineered</em> for durability
                </h1>

                <p className="mt-6 text-lg sm:text-2xl text-neutral-700 leading-relaxed font-sans max-w-2xl">
                  {aboutContent.subhead}
                </p>

                <div className="mt-8 flex flex-wrap gap-4 pt-2">
                  <Button href="#history" variant="primary">
                    Our 16-year history
                  </Button>
                  <Button href="#leadership" variant="secondary">
                    Executive leadership
                  </Button>
                  <Button href="#values" variant="secondary">
                    Six operating values
                  </Button>
                </div>
              </div>

              {/* Right Column: 3-Photo Visual Collage */}
              <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="aspect-[3/4] w-full overflow-hidden border border-neutral-300 shadow-md bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAssetUrl('/images/group/ahmedabad-skyline.webp')}
                    alt="Ahmedabad Commercial Skyline"
                    className="h-full w-full object-cover grayscale contrast-110"
                    loading="eager"
                  />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="aspect-[4/3] w-full overflow-hidden border border-neutral-300 shadow-md bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl('/images/hrs-aluglaze/sanand-campus.webp')}
                      alt="Sanand Facade Plant"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="aspect-[4/3] w-full overflow-hidden border border-neutral-300 shadow-md bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl('/images/group/corporate-lobby.webp')}
                      alt="HRS House Corporate Lobby"
                      className="h-full w-full object-cover grayscale contrast-110"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Operational Figures Strip */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[var(--ink)]/15 pt-8">
              {calmFacts.map((fact) => (
                <div key={fact.label} className="p-4 bg-white/70 border border-neutral-200/80">
                  <div className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tabular-nums">
                    {fact.metric}
                  </div>
                  <span className="text-xs font-bold text-neutral-800 block mt-1">
                    {fact.label}
                  </span>
                  <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 2. Group Narrative & 16-Year Heritage: Surface White */}
        <Section surface="white" id="history">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="col-span-12 lg:col-span-5 sticky top-28 space-y-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                Origin & Discipline
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                Sixteen years of patient building
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                Founded on engineering rigour in Ahmedabad, expanding through Bengaluru, and maintaining disciplined capital reinvestment.
              </p>

              <div className="border border-neutral-200 bg-[var(--paper)] p-6 space-y-3">
                <span className="text-xs font-bold text-[var(--hrs-orange)] block">
                  Parent Enterprise Governance
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed m-0">
                  HRS Group operates as a central holding enterprise providing capital allocation, statutory compliance, and operational standards. Each operating entity maintains autonomous technical leadership and direct accountability to partners.
                </p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 space-y-8 text-base sm:text-lg text-neutral-800 leading-relaxed font-sans">
              {aboutContent.story.map((paragraph, index) => (
                <p key={index} className="m-0">
                  {paragraph}
                </p>
              ))}

              {/* Physical Facilities Visual Trio */}
              <div className="pt-8 border-t border-[var(--ink)]/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="border border-neutral-200 p-4 bg-[var(--paper)]">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl('/images/hrs-aluglaze/sanand-campus.webp')}
                      alt="Sanand Automated Plant"
                      className="h-full w-full object-cover grayscale contrast-110"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-bold text-[var(--ink)] block">Sanand Works</span>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    120,000 sq ft CNC facade machining and silicone structural glazing bays.
                  </p>
                </div>

                <div className="border border-neutral-200 p-4 bg-[var(--paper)]">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl('/images/hrishikesh-food-products/whole-spices-stone.webp')}
                      alt="Bavla Botanical Campus"
                      className="h-full w-full object-cover grayscale contrast-110"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-bold text-[var(--ink)] block">Bavla Campus</span>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    Low-temperature stone spice milling lines and analytical assay laboratories.
                  </p>
                </div>

                <div className="border border-neutral-200 p-4 bg-[var(--paper)]">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl('/images/geotrix/window-frames-section.webp')}
                      alt="Bengaluru Southern Hub"
                      className="h-full w-full object-cover grayscale contrast-110"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-bold text-[var(--ink)] block">Bengaluru Hub</span>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    Geotrix site operations and Flight Stays serviced accommodation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Six Foundational Operating Values (Visual 6-Pack): Surface Paper */}
        <Section surface="paper" id="values">
          <div className="mb-12 border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Foundational Ethos
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Six values governed in daily practice
            </h2>
            <p className="mt-3 text-base text-neutral-700">
              Not slogans on a wall, but operational checkpoints enforced across fabrication bays, job sites, and client contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val) => (
              <div
                key={val.name}
                className="border border-neutral-200 bg-white p-8 flex flex-col justify-between hover:border-[var(--ink)] transition-colors shadow-2xs"
              >
                <div>
                  <span className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl font-extrabold text-[var(--hrs-orange)] tabular-nums block mb-4">
                    {val.number}
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                    {val.name}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. Milestones Timeline: Surface Ink */}
        <Section surface="ink" id="milestones">
          <div className="mb-12 border-b border-white/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Chronology
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Milestones from 2012 to present
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="border border-white/15 bg-white/5 p-6 flex flex-col justify-between hover:border-white transition-colors"
              >
                <div>
                  <span className="font-['Bricolage_Grotesque'] text-4xl font-extrabold text-[var(--hrs-orange)] tabular-nums block mb-2">
                    {m.year}
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Executive Leadership Gallery (7 Directors): Surface Paper */}
        <Section surface="paper" id="leadership">
          <div className="mb-12 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Corporate Governance
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Executive leadership & sector directors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader) => (
              <article
                key={leader.name}
                className="border border-neutral-200 bg-white overflow-hidden flex flex-col justify-between hover:border-[var(--ink)] hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAssetUrl(leader.image)}
                      alt={leader.name}
                      className="h-full w-full object-cover grayscale contrast-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-bold text-[var(--hrs-orange)] block">
                      {leader.focus}
                    </span>
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)] mt-1">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-800 mt-0.5">
                      {leader.role}
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-3 pt-3 border-t border-neutral-100">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 6. Bottom Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[var(--ink)] block mb-2">
                Operational Reach
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                Explore our operating businesses
              </h2>
              <p className="mt-3 text-base text-[var(--ink)]/85">
                Review specific engineering capabilities, residential developments, or contact our commercial desks in Ahmedabad and Bengaluru.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Button href="/businesses" variant="primary">
                View all businesses
              </Button>
              <Button href="/contact" variant="outline">
                Contact corporate desk
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
