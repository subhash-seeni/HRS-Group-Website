import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sun, ShieldCheck, Factory, Award, ArrowRight, Zap, Droplets } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Sustainability & Operational Governance · HRS Group',
  description:
    'Thermal envelope facade engineering, low-temperature clean botanical processing, and certified vocational safety across HRS Group operating companies.',
  openGraph: {
    title: 'Sustainability & Operational Governance · HRS Group',
    description:
      'Thermal envelope facade engineering, low-temperature clean botanical processing, and certified vocational safety across HRS Group operating companies.',
    url: 'https://hrsgroup.in/sustainability',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

const PILLARS = [
  {
    tag: 'Built Environment',
    title: 'High-performance building skins & envelope efficiency',
    lead: 'Our facade engineering reduces commercial building operational power demands by up to 28% through precision thermal-break architecture.',
    image: '/images/hrs-aluglaze/curtain-wall-detail.webp',
    color: '#15852C',
    stats: [
      { label: 'HVAC load reduction', value: 'Up to 28%' },
      { label: 'Solar Heat Gain Coeff.', value: '< 0.25 SHGC' },
      { label: 'Fabrication scrap recycled', value: '98.5%' },
    ],
    details: [
      'Polyamide thermal-break strips isolate interior aluminium sections from extreme western India summer exterior heat.',
      'Acoustic double glazing with argon gas cavities achieves U-values down to 1.6 W/m²K, dampening urban noise while lowering cooling requirements.',
      'Aluminium extrusions at Sanand are sourced from audited primary smelters with closed-loop recycling for production offcuts.',
    ],
  },
  {
    tag: 'Food & Consumer',
    title: 'Clean botanical milling & chemical-free processing',
    lead: 'The Bavla milling facility replaces chemical fumigation with physical optical sorting and low-temperature stone grinding.',
    image: '/images/hrishikesh-food-products/whole-spices-stone.webp',
    color: '#EB7C20',
    stats: [
      { label: 'Chemical fumigants', value: 'Zero synthetic agents' },
      { label: 'Milling temperature', value: '< 42°C cold milled' },
      { label: 'Volatile oil retention', value: '> 99.2%' },
    ],
    details: [
      'Low-speed natural stone pulverizers prevent thermal breakdown of aromatic essential oils and natural botanical nutrients.',
      'High-resolution multi-camera optical sorters and magnetic separation eliminate foreign matter without synthetic chemical treatments.',
      'BRCGS Global Standard for Food Safety certified facility operating under strict microbiological and allergen segregation protocols.',
    ],
  },
  {
    tag: 'Vocational Human Capital',
    title: 'Trade certification & industrial safety standards',
    lead: 'We believe real responsibility begins with human safety on manufacturing floors and high-rise construction cradles.',
    image: '/images/school-of-facade-technologies/workshop-benches.webp',
    color: '#13477A',
    stats: [
      { label: 'Annual technicians certified', value: '80+ professionals' },
      { label: 'Crane installation safety', value: 'Zero-harm protocol' },
      { label: 'Course practical ratio', value: '70% workshop hands-on' },
    ],
    details: [
      'The School of Facade Technologies trains fresh vocational entrants, site installers, and structural fabricators in certified fall-arrest safety.',
      'Mandatory double-lanyard harness rigging and wind anemometer monitoring for all cradle operations on towers exceeding 45 metres.',
      'Permanent health screening, pure air filtration in spice milling bays, and acoustic protection across Sanand CNC machining stations.',
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'BRCGS Global Standard', desc: 'Food safety and botanical traceability certification at Bavla campus.' },
  { name: 'IS 875 (Part 3) Wind Codes', desc: 'Structural wind resistance and cyclic displacement compliance for curtain walls.' },
  { name: 'ISO 9001:2015 Quality Systems', desc: 'Standard operating procedures across Sanand facade manufacturing lines.' },
  { name: 'FSSAI Central License', desc: 'Statutory adherence for food processing and packaged grocery distribution.' },
];

export default function SustainabilityPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen font-sans">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'Sustainability & responsibility' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-700/20 bg-emerald-50 text-xs font-semibold text-emerald-800 mb-4">
              <Leaf className="h-3.5 w-3.5 text-emerald-600" />
              Operational Responsibility & Standards
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Physical stewardship and operational discipline
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              Because we build physical things, our responsibility is concrete: thermal building envelopes that reduce high-rise energy loads, stone milling that rejects chemical fumigants, and vocational training that protects site workers.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-[var(--ink)] tabular-nums">
                  28%
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Commercial cooling load cut</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-[var(--ink)] tabular-nums">
                  0
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Synthetic spice fumigants</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-[var(--ink)] tabular-nums">
                  98.5%
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Aluminium offcuts recycled</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-emerald-600 tabular-nums">
                  BRCGS
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Audited food safety rating</div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Three Concrete Pillars: Surface White */}
        <Section surface="white">
          <div className="space-y-20">
            <div className="border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Operational Framework
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                Three operational commitments
              </h2>
            </div>

            <div className="space-y-16">
              {PILLARS.map((pillar, idx) => (
                <article
                  key={pillar.title}
                  className="border border-[var(--ink)]/15 bg-[var(--paper)] overflow-hidden transition-all duration-300 hover:border-[var(--ink)]"
                >
                  <div className="grid grid-cols-12 items-stretch">
                    {/* Visual Photo Column */}
                    <div className="col-span-12 lg:col-span-5 relative min-h-[300px] bg-neutral-200 overflow-hidden">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                      <div
                        className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm"
                        style={{ backgroundColor: pillar.color }}
                      >
                        {pillar.tag}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="col-span-12 lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-xs font-mono font-bold text-neutral-400">
                          PILLAR 0{idx + 1}
                        </span>

                        <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] leading-snug">
                          {pillar.title}
                        </h3>

                        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium m-0">
                          {pillar.lead}
                        </p>

                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--ink)]/10">
                          {pillar.stats.map((s) => (
                            <div key={s.label}>
                              <div className="font-['Bricolage_Grotesque'] text-lg sm:text-xl font-bold text-[var(--ink)] tabular-nums">
                                {s.value}
                              </div>
                              <div className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <ul className="space-y-2 pt-4 border-t border-[var(--ink)]/10 text-xs sm:text-sm text-neutral-600">
                          {pillar.details.map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--hrs-orange)] shrink-0 mt-1.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Section>

        {/* 3. Standards & Audits Directory: Surface Paper */}
        <Section surface="paper">
          <div className="mb-10 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Verified Governance
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Accredited standards and statutory audits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="border border-[var(--ink)]/15 bg-white p-6 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <Award className="h-6 w-6 text-[var(--hrs-orange)] mb-3" />
                  <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)]">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mt-2 m-0">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. Bottom Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Engineering & Manufacturing
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Inspect our manufacturing campuses
              </h2>
            </div>

            <div className="shrink-0 flex gap-4">
              <Button href="/contact" variant="primary">
                Schedule facility visit
              </Button>
              <Button href="/businesses/hrs-aluglaze" variant="outline">
                Aluglaze Works
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
