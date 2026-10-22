'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { groupValues } from '@/content/values';

export const ValuesSticky: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleScroll = () => {
      if (mediaQuery.matches) return;
      const centerY = window.innerHeight / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(centerY - itemCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section surface="stone" className="py-24 md:py-36 border-t border-[var(--rule)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticks on the left while values scroll */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32 self-start space-y-4">
            <SplitHeading
              as="h2"
              className="text-heading-1 text-[var(--ink)] font-normal m-0"
              text="Values"
            />
            <p className="text-[15px] leading-relaxed text-[var(--muted)] font-sans mt-2 max-w-[32ch]">
              Operating principles informing governance across all group boards.
            </p>
          </div>

          {/* Right Column: Six numbered values separated by hairlines */}
          <div className="col-span-1 lg:col-span-8 border-t border-[var(--rule)]">
            {groupValues.map((val, idx) => {
              const isActive = isMounted && !prefersReducedMotion ? activeIndex === idx : true;
              const opacity = isActive ? 1 : 0.3;

              return (
                <div
                  key={val.number}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  style={{
                    opacity,
                    transition:
                      'opacity 300ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="py-10 md:py-12 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline"
                >
                  <div className="sm:col-span-5 flex items-baseline gap-4">
                    {/* Large orange numeral scales slightly when active */}
                    <span
                      style={{
                        transform: isActive && isMounted && !prefersReducedMotion ? 'scale(1.12)' : 'scale(1)',
                        transformOrigin: 'left center',
                        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className="font-serif text-[28px] md:text-[34px] text-[var(--orange)] tabular-nums lining-nums leading-none inline-block font-normal"
                    >
                      {val.number}
                    </span>
                    <span className="font-serif text-[22px] md:text-[26px] text-[var(--ink)] font-normal">
                      {val.name}
                    </span>
                  </div>

                  <div className="sm:col-span-7">
                    <p className="text-[16.5px] leading-relaxed text-[var(--ink)] font-sans m-0">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
