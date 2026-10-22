'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Milestone } from '@/content/types';

interface MilestonesTimelineProps {
  milestones: Milestone[];
}

export const MilestonesTimeline: React.FC<MilestonesTimelineProps> = ({ milestones }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleScroll = () => {
      if (mediaQuery.matches) return;
      const centerY = window.innerHeight * 0.45;
      let closest = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(centerY - itemCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closest = idx;
        }
      });

      setActiveIndex(closest);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 50%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative font-sans border-t border-[var(--rule)]">
      {/* Thin vertical timeline line that draws as you scroll */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-[110px] top-0 bottom-0 w-[1px] bg-[var(--rule)] pointer-events-none"
      >
        <motion.div
          style={
            isMounted && !prefersReducedMotion
              ? { height: lineHeight }
              : { height: '100%' }
          }
          className="w-full bg-[var(--ink)] origin-top"
        />
      </div>

      <div className="space-y-0">
        {milestones.map((m, idx) => {
          const isActive = isMounted && !prefersReducedMotion ? activeIndex === idx : false;

          return (
            <div
              key={m.year + m.location}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="py-7 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline relative group transition-colors duration-200"
            >
              {/* Year Column */}
              <div className="md:col-span-3 flex items-baseline justify-between md:justify-start gap-4">
                <span
                  className={`font-serif text-[24px] md:text-[28px] tabular-nums lining-nums transition-colors duration-200 ${
                    isActive ? 'text-[var(--ink)] font-normal' : 'text-[var(--ink)]/80'
                  }`}
                >
                  {m.year}
                </span>

                {/* Orange dot marking current year in view */}
                <div className="hidden md:flex items-center justify-center w-5 h-5 -mr-2.5 z-10">
                  <span
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(0)',
                      opacity: isActive ? 1 : 0,
                      transition:
                        'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease',
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-[var(--orange)] shadow-[0_0_0_4px_var(--stone)]"
                  />
                </div>
              </div>

              {/* Event Description and Location */}
              <div className="md:col-span-9 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 md:pl-6">
                <p
                  className={`text-[16.5px] leading-relaxed font-sans m-0 transition-colors duration-200 ${
                    isActive ? 'text-[var(--ink)] font-medium' : 'text-[var(--ink)]'
                  }`}
                >
                  {m.event}
                </p>
                <span className="text-[13px] text-[var(--muted)] font-sans flex-shrink-0 sm:text-right">
                  {m.location}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
