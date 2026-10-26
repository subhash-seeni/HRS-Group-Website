'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, MapPin, Award, CheckCircle2, Factory, History } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { groupValues, calmFacts, aboutStory } from '@/content/facts';

interface LeaderBio {
  name: string;
  role: string;
  focus: string;
  bio: string;
  image: string;
}

const LEADERS: LeaderBio[] = [
  {
    name: 'Hrishikesh Sharma',
    role: 'Managing Director',
    focus: 'Group Strategy & Capital Allocation',
    bio: 'Oversees group-wide capital governance, strategic growth corridors, and cross-sector asset development across Gujarat and southern India.',
    image: '/images/leadership/hrishikesh-sharma.jpg',
  },
  {
    name: 'Pravin Patel',
    role: 'Executive Director',
    focus: 'Sanand Manufacturing & Plant Operations',
    bio: 'Leads industrial operations at the Sanand automated CNC manufacturing plant, overseeing ISO quality standards, plant capacity, and CNC machining lines.',
    image: '/images/leadership/pravin-patel.jpg',
  },
  {
    name: 'Rajesh Varma',
    role: 'Director, Built Environment',
    focus: 'Facade Engineering & Unitised Systems',
    bio: 'Directs facade design engineering, unitised curtain wall erection protocols, and structural technical delivery on high-rise envelopes up to 38 storeys.',
    image: '/images/leadership/rajesh-varma.jpg',
  },
  {
    name: 'Meera Nambiar',
    role: 'Head of Retail',
    focus: 'BOGO Ecosystem & Multi-Format Growth',
    bio: 'Leads commercial architecture, omnichannel customer experience, and destination format expansion for BOGO Square, Bazaar, and Mini footprints.',
    image: '/images/leadership/meera-nambiar.jpg',
  },
  {
    name: 'Siddharth Rao',
    role: 'Chief Operating Officer',
    focus: 'FirstGen Hospitality & Commercial Assets',
    bio: 'Responsible for commercial office leasing, industrial logistics properties, Flight Stays corporate apartments, and Amuktamalyada dining operations.',
    image: '/images/leadership/siddharth-rao.jpg',
  },
  {
    name: 'Ananya Sharma',
    role: 'Director, Consumer Brands',
    focus: 'FMCG Portfolio & Supply Chain',
    bio: 'Directs brand positioning, modern trade retail distribution, packaging systems, and product development across 13 dedicated consumer lines.',
    image: '/images/leadership/ananya-sharma.jpg',
  },
  {
    name: 'Mihir Dave',
    role: 'Principal Academic Director',
    focus: 'School of Facade Technologies',
    bio: 'Oversees technical curriculum development, site fabricator vocational benchmarks, and architectural fenestration workshops for engineering institutions.',
    image: '/images/leadership/mihir-dave.jpg',
  },
];

const TIMELINE = [
  {
    year: '2012',
    title: 'Founding of HRS Group in Ahmedabad',
    detail: 'Inception of HRS Aluglaze in Ahmedabad by Rupesh Shah and Hrishikesh Shah, pioneering engineered architectural aluminium fenestration.',
  },
  {
    year: '2015',
    title: 'Real Estate Expansion under Hrishikesh Ventures',
    detail: 'Launched planned residential developments and integrated commercial centers across key growth nodes in western Ahmedabad.',
  },
  {
    year: '2018',
    title: 'Bavla Botanical & Spice Milling Campus',
    detail: 'Commissioned a dedicated low-temperature stone milling facility in Bavla to process single-origin clean spices and seasonal blends.',
  },
  {
    year: '2020',
    title: 'Acquisition of Geotrix in Bengaluru',
    detail: 'Established direct Southern India facade engineering and site installation capabilities across Karnataka, Tamil Nadu, and Telangana.',
  },
  {
    year: '2022',
    title: 'School of Facade Technologies Academy',
    detail: 'Founded dedicated technical institute to bridge structural engineering theory and hands-on site installation mastery.',
  },
  {
    year: '2024',
    title: 'Launch of FirstGen & BOGO Retail Ecosystem',
    detail: 'Unified commercial asset management under FirstGen and unveiled BOGO multi-format retail destinations across Gujarat.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28 pb-32">
        {/* Breadcrumb & Intro Banner */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-neutral-500">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>HRS Group Home</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--hrs-orange)]">Group Heritage & Governance</span>
          </div>

          <div className="border-b border-[var(--ink)]/15 pb-12">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-3">
              Corporate Heritage • Ahmedabad & Bengaluru
            </span>
            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] max-w-4xl leading-[1.02]">
              Built with patience, engineered for generational scale.
            </h1>
            <p className="mt-6 text-base sm:text-xl text-neutral-700 max-w-3xl leading-relaxed">
              Headquartered in Bodakdev, Ahmedabad, HRS Group builds and operates foundational enterprises in the physical economy: high-rise architectural facades, residential communities, modern retail, spice milling, and hospitality stays.
            </p>
          </div>
        </section>

        {/* Asymmetric Heritage Photography & Story */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
                Our origins in Gujarat’s industrial heartland
              </h2>
              {aboutStory.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative aspect-[3/4] overflow-hidden border border-neutral-300 bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/group/ahmedabad-skyline.webp"
                    alt="Ahmedabad corporate base"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-neutral-600 block">
                  Ahmedabad, Gujarat • Corporate HQ
                </span>
              </div>

              <div className="space-y-2 pt-8">
                <div className="relative aspect-[3/4] overflow-hidden border border-neutral-300 bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/group/corporate-lobby.webp"
                    alt="Bodakdev headquarters lobby"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-neutral-600 block">
                  Bodakdev Campus • Operations
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Scale Key Facts */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-24">
          <div className="bg-[var(--ink)] text-white p-8 sm:p-12 lg:p-14 border border-white/10">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-6">
              Verified Operational Scale
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {calmFacts.map((fact) => (
                <div key={fact.label} className="space-y-1.5 border-t border-white/15 pt-4">
                  <span className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl font-extrabold text-white tabular-nums block">
                    {fact.metric}
                  </span>
                  <h3 className="text-xs font-bold text-neutral-300">
                    {fact.label}
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-snug">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historical Chronology (2012-Present) */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-24">
          <div className="mb-10 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Chronology of enterprise
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Milestones from 2012 to present
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="border border-[var(--ink)]/15 bg-white p-6 flex flex-col justify-between space-y-4 hover:border-[var(--ink)] transition-colors"
              >
                <div>
                  <span className="font-['Bricolage_Grotesque'] text-4xl font-extrabold text-[var(--hrs-orange)] tabular-nums block mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed pt-3 border-t border-neutral-100">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Directory & Biographies */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-24">
          <div className="mb-10 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Executive Governance
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Leadership & sector directors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((leader) => (
              <div
                key={leader.name}
                className="group border border-[var(--ink)]/15 bg-white p-5 flex flex-col justify-between hover:border-[var(--ink)] hover:shadow-sm transition-all"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden border border-neutral-200 bg-neutral-100 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-700 mt-0.5">
                    {leader.role}
                  </p>
                  <span className="text-[11px] font-semibold text-[var(--hrs-orange)] block mt-1">
                    {leader.focus}
                  </span>

                  <p className="text-xs text-neutral-600 leading-relaxed mt-3 pt-3 border-t border-neutral-100">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Six Values with Concrete Governance Proof */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-8 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Ethos & Operating Principles
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Six foundational values in practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupValues.map((val, idx) => (
              <div
                key={val.name}
                className="border border-[var(--ink)]/15 bg-white p-6 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[var(--hrs-orange)] tabular-nums">
                    0{idx + 1}
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                    {val.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
