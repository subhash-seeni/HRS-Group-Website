'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface StickySteppedProcessProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

export const StickySteppedProcess: React.FC<StickySteppedProcessProps> = ({
  steps,
  title = 'How it works',
  subtitle = 'Sequential creative engineering workflow and governance.',
}) => {
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
      const centerY = window.innerHeight / 2;
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

  return (
    <Section surface="white" className="py-20 md:py-32 border-t border-[var(--rule)]">
      <Container>
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Sticky Left Heading */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 self-start space-y-3">
            <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0" text={title} />
            <p className="text-[14.5px] text-[var(--muted)] font-sans m-0 max-w-[32ch]">
              {subtitle}
            </p>
          </div>

          {/* Sticky-stepped right column steps */}
          <div className="col-span-12 lg:col-span-8 border-t border-[var(--rule)]">
            {steps.map((step, idx) => {
              const isActive = isMounted && !prefersReducedMotion ? activeIndex === idx : true;
              const opacity = isActive ? 1 : 0.3;

              return (
                <div
                  key={step.step}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  style={{
                    opacity,
                    transition: 'opacity 300ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="py-12 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline font-sans"
                >
                  <div className="sm:col-span-4 flex items-baseline gap-3">
                    <span
                      style={{
                        transform: isActive && isMounted && !prefersReducedMotion ? 'scale(1.1)' : 'scale(1)',
                        transformOrigin: 'left center',
                        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className="font-serif text-[28px] md:text-[34px] text-[var(--orange)] tabular-nums lining-nums leading-none font-normal"
                    >
                      {String(step.step).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-[21px] md:text-[23px] text-[var(--ink)] font-normal">
                      {step.title}
                    </span>
                  </div>

                  <div className="sm:col-span-8">
                    <p className="text-[16px] leading-relaxed text-[var(--ink)] m-0">
                      {step.description}
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
