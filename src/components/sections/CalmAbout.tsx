'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { calmFacts, aboutStory, groupValues } from '@/content/facts';

export const CalmAbout: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-surface="paper"
      className={`relative w-full bg-[var(--paper)] text-[var(--ink)] py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 border-t border-[var(--ink)]/10 transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="About HRS Group, heritage, operating footprint and values"
    >
      <div className="mx-auto max-w-7xl">
        {/* Generous two-column architectural layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Ahmedabad specific history, photography */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-3">
                Origins & enterprise philosophy
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                About HRS Group
              </h2>

              <div className="space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed">
                {aboutStory.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Asymmetric Ahmedabad Heritage & Campus Photography */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--ink)]/10">
              <div className="space-y-2">
                <div className="relative aspect-[4/3] overflow-hidden border border-neutral-300 bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/group/ahmedabad-skyline.webp"
                    alt="Ahmedabad corporate heritage and skyline"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <span className="text-[11px] font-semibold text-neutral-600 block">
                  Ahmedabad, Gujarat • Corporate Base
                </span>
              </div>

              <div className="space-y-2">
                <div className="relative aspect-[4/3] overflow-hidden border border-neutral-300 bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/group/corporate-lobby.webp"
                    alt="HRS Group corporate lobby Bodakdev"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <span className="text-[11px] font-semibold text-neutral-600 block">
                  Bodakdev Campus • Operations Centre
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--ink)]/15">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors"
              >
                <span>Read the complete corporate story</span>
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Four plain facts, Dual-Hub Map, & Six numbered values */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Four Plain Facts as Large Numerals */}
            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-4">
                Operating scale at a glance
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-b border-[var(--ink)]/15 py-6">
                {calmFacts.map((fact) => (
                  <div key={fact.label} className="space-y-1">
                    <span className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] tabular-nums block">
                      {fact.metric}
                    </span>
                    <h3 className="text-xs font-bold text-neutral-900 tracking-tight">
                      {fact.label}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      {fact.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual-Hub Regional Geography Schematic */}
            <div className="p-6 border border-neutral-300 bg-white/60">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--hrs-orange)]">
                  Regional Operating Footprint
                </span>
                <span className="text-xs text-neutral-500">
                  Gujarat & Karnataka Hubs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Gujarat Hub */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    <h4 className="font-['Bricolage_Grotesque'] text-base font-bold text-[var(--ink)]">
                      Gujarat Operating Core
                    </h4>
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-700 pl-4 border-l border-neutral-200">
                    <li><strong className="text-neutral-900">Ahmedabad (Bodakdev):</strong> Corporate HQ & Real Estate</li>
                    <li><strong className="text-neutral-900">Sanand Industrial Zone:</strong> Automated Facade CNC Plant</li>
                    <li><strong className="text-neutral-900">Bavla Production Campus:</strong> Spice & Botanical Processing</li>
                  </ul>
                </div>

                {/* Karnataka Hub */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--hrs-orange)]" />
                    <h4 className="font-['Bricolage_Grotesque'] text-base font-bold text-[var(--ink)]">
                      Southern India Regional Hub
                    </h4>
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-700 pl-4 border-l border-neutral-200">
                    <li><strong className="text-neutral-900">Bengaluru (Geotrix):</strong> Southern Facade Engineering</li>
                    <li><strong className="text-neutral-900">Kadubeesanahalli:</strong> Flight Stays Serviced Apartments</li>
                    <li><strong className="text-neutral-900">Outer Ring Road:</strong> Amuktamalyada Dining & Asset Leasing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Six Values as a Numbered List */}
            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-3">
                Six foundational values
              </span>
              <div className="divide-y divide-[var(--ink)]/10 border-t border-[var(--ink)]/10">
                {groupValues.map((val, idx) => (
                  <div
                    key={val.name}
                    className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                  >
                    <div className="flex items-baseline gap-3 sm:w-44 shrink-0">
                      <span className="text-xs font-semibold text-[var(--hrs-orange)] tabular-nums">
                        0{idx + 1}
                      </span>
                      <h4 className="font-['Bricolage_Grotesque'] text-sm sm:text-base font-bold text-[var(--ink)]">
                        {val.name}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalmAbout;
