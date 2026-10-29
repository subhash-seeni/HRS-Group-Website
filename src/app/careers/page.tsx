import React from 'react';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { jobOpenings, employeeQuotes, valuesInAction, groupBenefits } from '@/content/jobs';
import { CareersClient } from './CareersClient';
import { getAssetUrl } from '@/lib/basePath';

export const metadata: Metadata = {
  title: 'Careers · HRS Group',
  description:
    'Professional opportunities in facade engineering, food processing, property development, retail store management, and brand strategy across Gujarat and southern India.',
  openGraph: {
    title: 'Careers · HRS Group',
    description:
      'Professional opportunities in facade engineering, food processing, property development, retail store management, and brand strategy.',
    url: 'https://hrsgroup.in/careers',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function CareersPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-5xl">
            <Breadcrumbs
              items={[{ label: 'Careers' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-3">
              Craft, Discipline & Culture
            </span>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Build <em>foundational</em> things with us
            </h1>

            <p className="mt-6 text-lg sm:text-2xl text-neutral-700 leading-relaxed max-w-3xl">
              Professional opportunities across automated facade engineering, clean botanical spice milling, planned property development, modern retail stores, and brand communications.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#openings" variant="primary">
                Explore open positions ({jobOpenings.length})
              </Button>
              <Button href="#environments" variant="secondary">
                Operating environments
              </Button>
            </div>
          </div>
        </Section>

        {/* 2. The Four Operating Environments: Surface White */}
        <Section surface="white" id="environments">
          <div className="mb-12 border-b border-[var(--ink)]/15 pb-6 max-w-3xl">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Physical Workplaces
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Four distinct operating environments
            </h2>
            <p className="mt-3 text-base text-neutral-700">
              From automated fabrication bays in Sanand to analytical chemistry labs in Bavla and hospitality hubs in Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-neutral-200 overflow-hidden bg-[var(--paper)] flex flex-col justify-between hover:border-[var(--ink)] transition-colors">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/hrs-aluglaze/sanand-campus.webp')}
                  alt="Sanand Facade Bay"
                  className="h-full w-full object-cover grayscale contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-bold text-[var(--hrs-orange)] block">
                  Sanand Industrial Estate
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)] mt-1">
                  The Engineering Bay
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Multi-axis CNC profile machining, double-miter saw lines, and certified structural silicone bays.
                </p>
              </div>
            </div>

            <div className="border border-neutral-200 overflow-hidden bg-[var(--paper)] flex flex-col justify-between hover:border-[var(--ink)] transition-colors">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/hrishikesh-food-products/whole-spices-stone.webp')}
                  alt="Bavla Botanical Lab"
                  className="h-full w-full object-cover grayscale contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-bold text-[var(--hrs-orange)] block">
                  Bavla Industrial Belt
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)] mt-1">
                  The Botanical Lab
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Low-temperature stone milling, moisture and volatile oil assays, and clean automated pouching.
                </p>
              </div>
            </div>

            <div className="border border-neutral-200 overflow-hidden bg-[var(--paper)] flex flex-col justify-between hover:border-[var(--ink)] transition-colors">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/hrishikesh-consumer-products/manpras-store.webp')}
                  alt="Manpras Retail Store"
                  className="h-full w-full object-cover grayscale contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-bold text-[var(--hrs-orange)] block">
                  Ahmedabad Corridors
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)] mt-1">
                  The Retail Floor
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  One-stop neighbourhood grocery stores, customer experience desks, and stockist logistics.
                </p>
              </div>
            </div>

            <div className="border border-neutral-200 overflow-hidden bg-[var(--paper)] flex flex-col justify-between hover:border-[var(--ink)] transition-colors">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetUrl('/images/firstgen/service-apartment.webp')}
                  alt="Flight Stays Hospitality"
                  className="h-full w-full object-cover grayscale contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-bold text-[var(--hrs-orange)] block">
                  Outer Ring Road, Bengaluru
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)] mt-1">
                  The Hospitality Hub
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Corporate serviced suites under Flight Stays and Amuktamalyada regional dining operations.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Interactive Role Explorer: Surface White */}
        <Section surface="white" id="openings">
          <div className="mb-10 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Career Opportunities
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Current openings across group businesses
            </h2>
          </div>

          <CareersClient jobs={jobOpenings} />
        </Section>

        {/* 4. Practitioner Voices: Surface Ink */}
        <Section surface="ink">
          <div className="mb-12 border-b border-white/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Voices From The Field
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Practitioners on technical standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employeeQuotes.map((item, idx) => (
              <blockquote
                key={idx}
                className="border border-white/15 bg-white/5 p-8 flex flex-col justify-between"
              >
                <p className="font-['Bricolage_Grotesque'] text-lg sm:text-xl text-neutral-200 leading-relaxed mb-6">
                  "{item.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-bold text-white text-base">
                    {item.author}
                  </div>
                  <div className="text-xs text-[var(--hrs-orange)] mt-0.5 font-semibold">
                    {item.role}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {item.location}
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </Section>

        {/* 5. Values & Standards: Surface Paper */}
        <Section surface="paper">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="col-span-12 lg:col-span-6 space-y-6">
              <div className="border-b border-[var(--ink)]/15 pb-4">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-1">
                  Operating Discipline
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                  Foundational values at work
                </h3>
              </div>

              <div className="space-y-4">
                {valuesInAction.map((v) => (
                  <div key={v.value} className="border-b border-[var(--ink)]/10 pb-4">
                    <span className="text-base font-bold text-[var(--ink)] block mb-1">
                      {v.value}
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed m-0">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 space-y-6">
              <div className="border-b border-[var(--ink)]/15 pb-4">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-1">
                  Employment Standards
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                  Employee benefits and support
                </h3>
              </div>

              <ul className="space-y-3 list-none p-0 m-0">
                {groupBenefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 border-b border-[var(--ink)]/10 pb-3 text-xs sm:text-sm text-neutral-700 leading-relaxed"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--hrs-orange)] mt-2 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* 6. General Application Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[var(--ink)] block mb-2">
                Unsolicited Submissions
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                Do not see an exact opening?
              </h2>
              <p className="mt-3 text-base text-[var(--ink)]/85">
                We continuously review credentials from facade draftsmen, structural engineers, chemists, and retail store operators across Gujarat and Bengaluru.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Button href="/contact" variant="primary">
                Submit general CV
              </Button>
              <Button href="/businesses" variant="outline">
                Explore operating companies
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
