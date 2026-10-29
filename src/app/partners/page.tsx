import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Handshake, Factory, Store, Truck, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { PartnerForm } from './PartnerForm';

export const metadata: Metadata = {
  title: 'Vendor & Partner Desk · HRS Group',
  description:
    'Procurement standards, supplier onboarding, and commercial partnerships across facade engineering, spice sourcing, retail supply chains, and logistics.',
  openGraph: {
    title: 'Vendor & Partner Desk · HRS Group',
    description:
      'Procurement standards, supplier onboarding, and commercial partnerships across facade engineering, spice sourcing, retail supply chains, and logistics.',
    url: 'https://hrsgroup.in/partners',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

const PARTNER_TRACKS = [
  {
    icon: Factory,
    title: 'Industrial & Facade Engineering',
    color: '#15852C',
    business: 'HRS Aluglaze & Geotrix',
    requirements: [
      'Aluminium architectural extrusions in alloy 6063-T6 with mill test certificates.',
      'Float and processed architectural glass conforming to IS 2553 wind specifications.',
      'Structural silicone sealants, EPDM gaskets, and stainless steel anchor brackets.',
    ],
  },
  {
    icon: Store,
    title: 'BOGO Retail Brands & Stockists',
    color: '#0F2A5C',
    business: 'BOGO Ecosystem',
    requirements: [
      'Fast-moving packaged food, fresh produce, lifestyle goods, and household consumables.',
      'Barcoded packaging conforming to Legal Metrology packaged commodity standards.',
      'Ability to support regional distribution via BOGO Go logistics nodes across Gujarat.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Botanical & Spice Procurement',
    color: '#EB7C20',
    business: 'Hrishikesh Food Products',
    requirements: [
      'Single-origin whole spices (chilli, coriander, cumin, turmeric) from verified APMC mandis.',
      'Moisture, volatile oil, and pesticide residue test analysis per batch.',
      'Direct farm collectives and regional aggregators in Gujarat and Rajasthan.',
    ],
  },
  {
    icon: Truck,
    title: 'Contract Logistics & Civil Support',
    color: '#13477A',
    business: 'FirstGen Assets & Group Fleet',
    requirements: [
      'Specialized glass carrier trailers and crane rigging services for high-rise installations.',
      'Dry warehouse facilities and cold-chain transport networks across western India.',
      'Strict transport safety records and transit cargo insurance coverage.',
    ],
  },
];

const ONBOARDING_STEPS = [
  { step: '01', title: 'Portal Registration', desc: 'Submit company profile, GST registration, and product catalog through our partner portal.' },
  { step: '02', title: 'Quality Verification', desc: 'Technical desk verifies sample batches, mill certificates, or packaged product barcodes.' },
  { step: '03', title: 'Commercial Agreement', desc: 'Execution of transparent vendor terms with standard 30-day payment turnaround.' },
  { step: '04', title: 'Active Supply Integration', desc: 'Regular procurement orders dispatched directly to your designated dispatch facility.' },
];

export default function PartnersPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen font-sans">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'Vendor & partner desk' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--ink)]/15 bg-white text-xs font-semibold text-[var(--ink)] mb-4">
              <Handshake className="h-3.5 w-3.5 text-[var(--hrs-orange)]" />
              Procurement & Supply Chain Desk
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Vendor and partnership desk
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              We build long-standing relationships with aluminium extruders, glass manufacturers, agricultural collectives, and regional brand suppliers who share our commitment to physical quality and reliable delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--hrs-orange)]" />
                <span>30-day confirmed vendor payment cycles</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--hrs-orange)]" />
                <span>Direct procurement desk routing</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Four Sourcing Tracks: Surface White */}
        <Section surface="white">
          <div className="space-y-12">
            <div className="border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Procurement Tracks
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                What we procure across the enterprise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PARTNER_TRACKS.map((track) => {
                const IconComponent = track.icon;
                return (
                  <div
                    key={track.title}
                    className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 sm:p-8 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-white shrink-0"
                          style={{ backgroundColor: track.color }}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-neutral-500 block">
                            {track.business}
                          </span>
                          <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                            {track.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[var(--ink)]/10 space-y-2">
                      <span className="text-xs font-semibold text-neutral-700 block">
                        Core supply specifications:
                      </span>
                      <ul className="space-y-1.5 text-xs text-neutral-600">
                        {track.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--hrs-orange)] shrink-0 mt-1" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* 3. Onboarding Pathway: Surface Paper */}
        <Section surface="paper">
          <div className="space-y-12">
            <div className="border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Onboarding Pathway
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                How we onboard new supply partners
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ONBOARDING_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="border border-[var(--ink)]/15 bg-white p-6 space-y-3 flex flex-col justify-between"
                >
                  <span className="font-mono text-2xl font-extrabold text-[var(--hrs-orange)]">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed m-0">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 4. Onboarding Registration Form: Surface White */}
        <Section surface="white" id="register">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Vendor Application
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                  Register as a supply partner
                </h2>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Submit company credentials and product scope. Submissions are reviewed directly by the designated operating company procurement desk.
                </p>
              </div>

              <div className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 space-y-3">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                  Procurement Compliance Standards
                </span>
                <p className="text-xs text-neutral-700 leading-relaxed m-0">
                  All prospective vendors must possess active GST registration, PAN documentation, and certified quality test reports. Formal vendor empanelment is subject to initial sample batch approval.
                </p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 border border-[var(--ink)]/15 bg-[var(--paper)] p-6 sm:p-10">
              <Suspense
                fallback={
                  <div className="py-12 text-center text-xs text-neutral-500">
                    Loading partner onboarding form...
                  </div>
                }
              >
                <PartnerForm />
              </Suspense>
            </div>
          </div>
        </Section>

        {/* 5. Bottom Return Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Parent Enterprise
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Learn more about our operating businesses
              </h2>
            </div>

            <div className="shrink-0 flex gap-4">
              <Button href="/businesses" variant="primary">
                View businesses directory
              </Button>
              <Button href="/contact" variant="outline">
                Contact corporate HQ
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
