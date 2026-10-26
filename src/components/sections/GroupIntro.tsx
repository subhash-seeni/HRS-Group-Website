'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollText } from '@/components/motion/ScrollText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const GroupIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    const line = trackLineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.to(line, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-surface="paper"
      className="relative w-full bg-[var(--paper)] py-28 sm:py-36 md:py-44 px-6 sm:px-8 lg:px-12 border-t border-[var(--ink)]/10"
      aria-label="About HRS Group"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Architectural Left Rail */}
          <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4">
            <div>
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                01 • Overview
              </span>
              <span className="text-xs text-neutral-500 font-medium block mt-1">
                Ahmedabad, Gujarat
              </span>
            </div>

            {/* Vertical Scroll Scrub Track (Desktop) */}
            <div className="hidden lg:block relative w-[2px] h-36 bg-[var(--ink)]/10 mt-6 overflow-hidden">
              <div
                ref={trackLineRef}
                className="absolute top-0 left-0 w-full h-full bg-[var(--hrs-orange)] origin-top scale-y-0 will-change-transform"
              />
            </div>
          </div>

          {/* Main Statement */}
          <div className="lg:col-span-9">
            <ScrollText
              as="h2"
              className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ink)] leading-[1.2]"
              start="top 85%"
              end="bottom 55%"
            >
              Headquartered in Ahmedabad, HRS Group builds foundational businesses that shape everyday living across Gujarat, Bengaluru, and South India. Our operations span engineered facades and residential communities to packaged food, connected retail ecosystems, and regional hospitality.
            </ScrollText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupIntro;
