'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';

interface StatCounterProps {
  targetNumber: number;
  suffix: string;
  isTriggered: boolean;
  prefersReducedMotion: boolean;
  formatWithComma?: boolean;
}

const StatCounter: React.FC<StatCounterProps> = ({
  targetNumber,
  suffix,
  isTriggered,
  prefersReducedMotion,
  formatWithComma = false,
}) => {
  // SSR default is targetNumber so content is fully visible without JS
  const [currentVal, setCurrentVal] = useState(targetNumber);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted && !isTriggered) {
      setCurrentVal(0);
      setHasStarted(true);
    }
  }, [hasStarted, isTriggered]);

  useEffect(() => {
    if (!isTriggered) return;

    if (prefersReducedMotion) {
      setCurrentVal(targetNumber);
      return;
    }

    const duration = 1200; // 1.2s ease-out
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease-out cubic: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(targetNumber * easeOut);
      setCurrentVal(val);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCurrentVal(targetNumber);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isTriggered, targetNumber, prefersReducedMotion]);

  const displayString = formatWithComma
    ? currentVal.toLocaleString('en-IN')
    : currentVal.toString();

  return (
    <span className="font-serif text-[32px] md:text-[36px] text-[var(--ink)] font-normal tabular-nums lining-nums leading-tight">
      {displayString}
      {suffix}
    </span>
  );
};

export const WhereWeWorkCounter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const places = [
    {
      title: 'Head office in Ahmedabad',
      desc: 'HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev.',
    },
    {
      title: 'Operations across Gujarat',
      desc: 'Sanand Industrial Estate (facade manufacturing), Bavla (spice milling), and 13 live real estate developments across Ahmedabad.',
    },
    {
      title: 'Bengaluru',
      desc: 'Outer Ring Road and Kadubeesanahalli: Flight Stays corporate residences and Amuktamalyada vegetarian dining.',
    },
    {
      title: 'South India through Geotrix',
      desc: 'Peenya Industrial Area, Bengaluru: commercial facade site erection across Karnataka, Tamil Nadu, and Telangana.',
    },
  ];

  return (
    <Section surface="white" className="py-24 md:py-36 border-t border-[var(--rule)]">
      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Definition List in Columns 1-6 */}
          <div className="col-span-1 lg:col-span-6 space-y-8">
            <div>
              <SplitHeading
                as="h2"
                className="text-heading-1 text-[var(--ink)] font-normal"
                text="Where we work"
              />
              <p className="text-[15px] text-[var(--muted)] font-sans mt-2">
                Primary offices, processing facilities, and regional installation territories.
              </p>
            </div>

            {/* Place names fade up in sequence */}
            <dl className="space-y-6 border-t border-[var(--rule)] pt-6 font-sans">
              {places.map((place, idx) => {
                const isVisible = !isMounted || hasEnteredView || prefersReducedMotion;
                return (
                  <div
                    key={place.title}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                      transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${
                        idx * 100
                      }ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 100}ms`,
                    }}
                    className="border-b border-[var(--rule)] pb-4"
                  >
                    <dt className="text-[16px] font-medium text-[var(--ink)]">
                      {place.title}
                    </dt>
                    <dd className="text-[14.5px] text-[var(--muted)] mt-1 m-0">
                      {place.desc}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Four Static Facts in Columns 8-12 that Count Up Once */}
          <div className="col-span-1 lg:col-span-5 lg:col-start-8 space-y-6 pt-4 lg:pt-0">
            <span className="text-[13.5px] font-sans text-[var(--muted)] block border-b border-[var(--rule)] pb-2">
              Operating scale
            </span>

            <div className="space-y-6">
              {/* Fact 1: 18 years */}
              <div className="border-b border-[var(--rule)] pb-4">
                <div className="h-[44px] flex items-center">
                  <StatCounter
                    targetNumber={18}
                    suffix=" years"
                    isTriggered={hasEnteredView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
                <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                  Continuous business operations since initial founding in 2008.
                </div>
              </div>

              {/* Fact 2: 13 developments */}
              <div className="border-b border-[var(--rule)] pb-4">
                <div className="h-[44px] flex items-center">
                  <StatCounter
                    targetNumber={13}
                    suffix=" developments"
                    isTriggered={hasEnteredView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
                <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                  Completed and active residential and commercial projects in Ahmedabad.
                </div>
              </div>

              {/* Fact 3: 450,000 sq m */}
              <div className="border-b border-[var(--rule)] pb-4">
                <div className="h-[44px] flex items-center">
                  <StatCounter
                    targetNumber={450000}
                    suffix=" sq m"
                    formatWithComma
                    isTriggered={hasEnteredView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
                <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                  Annual architectural aluminium and facade glass processing capacity.
                </div>
              </div>

              {/* Fact 4: 13 brands */}
              <div className="border-b border-[var(--rule)] pb-4">
                <div className="h-[44px] flex items-center">
                  <StatCounter
                    targetNumber={13}
                    suffix=" brands"
                    isTriggered={hasEnteredView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
                <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                  Packaged foods, beverages, and household consumer product trade marks.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
