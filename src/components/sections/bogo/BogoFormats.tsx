'use client';

import React, { useEffect, useRef } from 'react';
import { bogoContent } from '@/content/bogo';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BogoFormats: React.FC = () => {
  const formats = bogoContent.formats;
  const square = formats.find((f) => f.slug === 'bogo-square') || formats[0];
  const bazaar = formats.find((f) => f.slug === 'bogo-bazaar') || formats[1];
  const mini = formats.find((f) => f.slug === 'bogo-mini') || formats[2];
  const distribution = bogoContent.distribution;

  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const connectLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !shapesRef.current) return;

    const shapeElements = shapesRef.current.querySelectorAll('.format-shape');
    const connectLine = connectLineRef.current;

    const ctx = gsap.context(() => {
      // Shapes grow into place as they enter view
      gsap.from(shapeElements, {
        scale: 0.94,
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      if (connectLine) {
        gsap.from(connectLine, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: connectLine,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bogo-formats"
      ref={sectionRef}
      data-surface="paper"
      className="relative w-full bg-[var(--paper)] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 text-[var(--ink)] border-t border-[var(--ink)]/10"
      aria-label="BOGO retail formats and distribution"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 border-b border-[var(--ink)]/15 pb-6">
          <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
            Store formats & physical presence
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Scaled to communities
            </h2>
            <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-md">
              Three customer-facing retail formats proportioned to neighbourhood density, everyday convenience, and regional destination shopping.
            </p>
          </div>
        </div>

        {/* Formats Grid drawn to True Relative Area */}
        <div
          ref={shapesRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* Format 1: BOGO Square (Flagship, Largest Area: 10,000+ sq ft) */}
          <div className="format-shape lg:col-span-7 flex flex-col justify-between border-2 border-[var(--ink)] bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={square.logoPath}
                  alt={square.name}
                  className="h-9 w-auto object-contain"
                />
                <span className="font-mono text-xs font-bold tracking-tight bg-[var(--bogo-navy)] text-white px-3 py-1">
                  10,000+ sq. ft.
                </span>
              </div>

              <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {square.headline}
              </h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                {square.promise}
              </p>

              {/* Concept Render */}
              <div className="mb-6">
                <ImageReveal
                  src={square.imagePath}
                  alt="BOGO Square Concept Render"
                  caption="Concept"
                  aspectRatio="aspect-[16/10]"
                />
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <span className="text-xs font-semibold text-neutral-500 block mb-2">
                  Ideal locations
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {square.idealFor.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-[var(--hrs-orange)] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Formats 2 & 3: Bazaar & Mini stacked in right 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
            {/* Format 2: BOGO Bazaar (Medium Area: 4,000 - 6,000 sq ft) */}
            <div className="format-shape flex flex-col justify-between border border-[var(--ink)]/40 bg-white p-5 sm:p-6 flex-1">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bazaar.logoPath}
                    alt={bazaar.name}
                    className="h-7 w-auto object-contain"
                  />
                  <span className="font-mono text-xs font-bold tracking-tight bg-neutral-200 text-neutral-900 px-2.5 py-0.5">
                    4,000–6,000 sq. ft.
                  </span>
                </div>

                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold tracking-tight mb-1">
                  {bazaar.headline}
                </h3>
                <p className="text-xs text-neutral-600 mb-3">
                  Closer to more people. {bazaar.promise}
                </p>

                <div className="mb-3">
                  <ImageReveal
                    src={bazaar.imagePath}
                    alt="BOGO Bazaar Concept Render"
                    caption="Concept"
                    aspectRatio="aspect-[21/9]"
                  />
                </div>

                <div className="text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                  <span className="font-semibold block mb-0.5">Ideal locations:</span>
                  <span>High-street residential neighbourhoods and urban residential corridors.</span>
                </div>
              </div>
            </div>

            {/* Format 3: BOGO Mini (Compact Area: ~2,000 sq ft) */}
            <div className="format-shape flex flex-col justify-between border border-[var(--ink)]/25 bg-white p-5 flex-1">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mini.logoPath}
                    alt={mini.name}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="font-mono text-xs font-bold tracking-tight bg-neutral-100 text-neutral-800 px-2.5 py-0.5">
                    Around 2,000 sq. ft.
                  </span>
                </div>

                <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold tracking-tight mb-1">
                  {mini.headline}
                </h3>
                <p className="text-xs text-neutral-600 mb-3">
                  Quick, neighbourhood visits. {mini.promise}
                </p>

                <div className="mb-3">
                  <ImageReveal
                    src={mini.imagePath}
                    alt="BOGO Mini Concept Render"
                    caption="Concept"
                    aspectRatio="aspect-[21/9]"
                  />
                </div>

                <div className="text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                  <span className="font-semibold block mb-0.5">Ideal locations:</span>
                  <span>Transit hubs, apartment communities, and corporate office districts.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thin Connecting Line to BOGO Go */}
        <div className="relative pt-12 pb-4">
          <div
            ref={connectLineRef}
            className="w-px h-12 bg-[var(--ink)]/30 mx-auto"
            aria-hidden="true"
          />
        </div>

        {/* BOGO Go Distribution Strip */}
        <div className="border border-[var(--ink)]/20 bg-white p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={distribution.logoPath}
                alt={distribution.name}
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
              />
              <div>
                <span className="text-xs font-semibold text-[var(--bogo-orange)] block">
                  Distribution & supply chain
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {distribution.headline}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                  {distribution.summary}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 bg-[var(--paper)]">
              <span className="h-2 w-2 bg-[var(--bogo-green)]" />
              <span>Reliable movement grid</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BogoFormats;
