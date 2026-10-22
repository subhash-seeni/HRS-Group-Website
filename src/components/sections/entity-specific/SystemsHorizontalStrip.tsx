'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '@/components/ui';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { getAssetPath } from '@/lib/assets';

interface SystemItem {
  name: string;
  description: string;
  specifications: string[];
  imageSrc?: string;
}

interface SystemsHorizontalStripProps {
  systems: SystemItem[];
  title?: string;
  subtitle?: string;
}

const systemImages: Record<string, string> = {
  'Unitised Curtain Wall Systems': '/images/hrs-aluglaze/curtain-wall-detail.webp',
  'Structural Architectural Glazing': '/images/hrs-aluglaze/sanand-campus.webp',
  'Acoustic Fenestration & Windows': '/images/geotrix/window-frames-section.webp',
  'Architectural Sliding & Swing Doors': '/images/school-of-facade-technologies/workshop-benches.webp',
};

export const SystemsHorizontalStrip: React.FC<SystemsHorizontalStripProps> = ({
  systems,
  title = 'Architectural product systems',
  subtitle = 'Engineered envelope assemblies manufactured in Sanand.',
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // 4 items: transform x from 0% to -(100% * (items - 1) / items) or percentage offset
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%']);

  return (
    <div className="border-t border-[var(--rule)]">
      {/* Mobile view: Plain vertical list */}
      <div className="block lg:hidden py-16 md:py-24">
        <Container>
          <div className="space-y-4 mb-10">
            <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0" text={title} />
            <p className="text-[14.5px] text-[var(--muted)] font-sans m-0">{subtitle}</p>
          </div>

          <div className="space-y-12 border-t border-[var(--rule)] pt-8">
            {systems.map((sys, idx) => {
              const imgSrc = getAssetPath(sys.imageSrc || systemImages[sys.name] || '/images/hrs-aluglaze/curtain-wall-detail.webp');
              return (
                <div key={sys.name} className="space-y-4 border-b border-[var(--rule)] pb-10">
                  <div className="relative w-full aspect-[16/9] bg-[var(--slot)] overflow-hidden rounded-[2px]">
                    <Image src={imgSrc} alt={sys.name} fill sizes="100vw" className="object-cover" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-serif text-[18px] text-[var(--orange)] tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-[22px] text-[var(--ink)] font-normal m-0">{sys.name}</h3>
                    <p className="text-[15px] leading-relaxed text-[var(--muted)] font-sans m-0">{sys.description}</p>
                    <ul className="pt-2 space-y-1.5 list-none p-0 m-0 text-[13.5px] text-[var(--ink)] font-sans">
                      {sys.specifications.map((spec) => (
                        <li key={spec} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Desktop view: Horizontal scroll-pinned strip */}
      <div
        ref={targetRef}
        className="hidden lg:block relative h-[280vh] bg-[var(--paper)]"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <Container className="mb-6">
            <div className="flex items-baseline justify-between gap-6 border-b border-[var(--rule)] pb-4">
              <div>
                <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0" text={title} />
                <p className="text-[14px] text-[var(--muted)] font-sans mt-1 m-0">{subtitle}</p>
              </div>
              <span className="text-[12.5px] text-[var(--muted)] font-sans tabular-nums">
                Horizontal pinned systems &bull; Scroll to navigate
              </span>
            </div>
          </Container>

          <div className="w-full pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
            <motion.div
              style={isMounted && !prefersReducedMotion ? { x } : undefined}
              className="flex gap-10 items-stretch"
            >
              {systems.map((sys, idx) => {
                const imgSrc = getAssetPath(sys.imageSrc || systemImages[sys.name] || '/images/hrs-aluglaze/curtain-wall-detail.webp');
                return (
                  <div
                    key={sys.name}
                    className="w-[620px] shrink-0 border border-[var(--rule)] bg-[var(--white)] p-8 flex flex-col justify-between rounded-[2px]"
                  >
                    <div className="relative w-full aspect-[16/10] bg-[var(--slot)] overflow-hidden rounded-[2px] mb-6">
                      <Image
                        src={imgSrc}
                        alt={sys.name}
                        fill
                        sizes="620px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-[24px] text-[var(--orange)] tabular-nums font-normal">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-serif text-[24px] text-[var(--ink)] font-normal m-0">
                          {sys.name}
                        </h3>
                      </div>

                      <p className="text-[15.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
                        {sys.description}
                      </p>

                      <div className="pt-2 border-t border-[var(--rule)]">
                        <ul className="m-0 p-0 list-none space-y-1.5 text-[13.5px] text-[var(--ink)] font-sans">
                          {sys.specifications.map((spec) => (
                            <li key={spec} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
