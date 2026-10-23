'use client';

import React, { useEffect, useRef } from 'react';
import { bogoContent } from '@/content/bogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BogoTechRoadmap: React.FC = () => {
  const phases = bogoContent.technologyVision.phases;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Pinned horizontal scroll on desktop only (min-width: 1024px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const totalScrollWidth = track.scrollWidth - track.clientWidth;

      const tween = gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${totalScrollWidth + 300}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="bogo-roadmap"
      ref={sectionRef}
      data-surface="ink"
      className="relative w-full bg-[var(--ink)] text-white py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden border-t border-white/10"
      aria-label="BOGO intelligent retail technology roadmap"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 border-b border-white/15 pb-6">
          <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
            Technology vision • Phased roadmap
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Intelligent retail infrastructure
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Six planned capability phases designed to remove friction, enhance product discovery, and streamline everyday checkout.
            </p>
          </div>
        </div>

        {/* Desktop Horizontal Track / Mobile Vertical List */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 will-change-transform"
        >
          {phases.map((item) => (
            <div
              key={item.phase}
              className="group relative flex flex-col justify-between border border-white/15 bg-white/[0.02] p-7 sm:p-8 shrink-0 w-full lg:w-[420px] min-h-[340px] hover:border-[var(--hrs-orange)] transition-colors duration-300"
            >
              {/* Top Row: Huge orange numeral + Planned status tag */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <span className="font-['Bricolage_Grotesque'] text-5xl sm:text-6xl font-extrabold text-[var(--hrs-orange)] leading-none tabular-nums">
                  0{item.phase}
                </span>

                <span className="border border-white/30 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-white/80">
                  {item.status}
                </span>
              </div>

              {/* Middle: Title & Description */}
              <div className="my-6">
                <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom: Subtle architectural phase rule */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Phase {item.phase} roadmap</span>
                <span>BOGO Tech</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BogoTechRoadmap;
