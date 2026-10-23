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

    // Strict rule: "No scrubbing, no pinning, no hover tricks. Only a 500ms fade on entering."
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-surface="paper"
      className={`relative w-full bg-[var(--paper)] text-[var(--ink)] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-t border-[var(--ink)]/10 transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="About HRS Group and foundational values"
    >
      <div className="mx-auto max-w-7xl">
        {/* Generous two-column architectural layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Ahmedabad specific history & link */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-3">
                Origins & enterprise philosophy
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
                About HRS Group
              </h2>

              <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
                {aboutStory.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-10 mt-8 border-t border-[var(--ink)]/15">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors"
              >
                <span>Read the story</span>
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Four plain facts & Six numbered values */}
          <div className="lg:col-span-7 flex flex-col gap-14">
            {/* Four Plain Facts as Large Numerals */}
            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-6">
                Operating scale at a glance
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-b border-[var(--ink)]/15 py-8">
                {calmFacts.map((fact) => (
                  <div key={fact.label} className="space-y-1">
                    <span className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] tabular-nums block">
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

            {/* Six Values as a Numbered List */}
            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-4">
                Six foundational values
              </span>
              <div className="divide-y divide-[var(--ink)]/10">
                {groupValues.map((val, idx) => (
                  <div
                    key={val.name}
                    className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                  >
                    <div className="flex items-baseline gap-3 sm:w-44 shrink-0">
                      <span className="font-mono text-xs font-bold text-[var(--hrs-orange)] tabular-nums">
                        0{idx + 1}
                      </span>
                      <h4 className="font-['Bricolage_Grotesque'] text-base font-bold text-[var(--ink)]">
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
