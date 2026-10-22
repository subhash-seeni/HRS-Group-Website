'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { heroContent } from '@/content/heroContent';
import { resolveImage } from '@/content/images';
import { getAssetPath } from '@/lib/assets';

export const OpeningHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Scroll tracking for hero image breakout
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end start'],
  });

  // Clip-path inset shrinks from horizontal insets to 0% (full viewport width)
  const clipInsetX = useTransform(scrollYProgress, [0, 0.7], [6, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.06]);
  const captionOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  // Derived clip-path string
  const clipPathStyle = useTransform(
    clipInsetX,
    (val) => `inset(0% ${val}% 0% ${val}%)`
  );

  const captionText =
    'Ahmedabad headquarters on SG Highway and regional manufacturing facilities in Sanand, Bavla, and Bengaluru.';
  const resolved = resolveImage(undefined, captionText);
  const imageSrc = resolved?.src || getAssetPath('/images/group/ahmedabad-skyline.webp');
  const imageAlt = resolved?.alt || captionText;

  return (
    <Section
      surface="white"
      className="relative pt-[13vh] md:pt-[16vh] pb-10 md:pb-14 overflow-hidden border-b border-[var(--rule)]"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Statement in Columns 1-7 */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5 text-[14px] text-[var(--muted)] font-sans">
              <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
              <span>{heroContent.home.markerLabel}</span>
            </div>

            {/* Statement rises line by line */}
            <SplitHeading
              as="h1"
              className="text-display-1 text-[var(--ink)] font-normal tracking-tight"
            >
              {heroContent.home.headline}
            </SplitHeading>

            <p className="text-[19px] md:text-[22px] leading-[1.5] text-[var(--muted)] font-sans max-w-[50ch] m-0">
              {heroContent.home.curiosityHook}
            </p>

            {/* Plain text links */}
            <div
              className={`flex flex-wrap items-center gap-8 pt-2 text-[17px] font-sans transition-all duration-700 ease-out delay-300 ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
              }`}
            >
              <a href="#businesses" className="link-editorial">
                See our businesses
              </a>
              <Link href="/contact" className="link-dot">
                <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                <span className="link-editorial">Contact us</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Hero Panoramic Image with smooth scroll-scrubbed expansion */}
      <div ref={containerRef} className="mt-8 md:mt-12 relative w-full">
        <motion.div
          style={
            !prefersReducedMotion && isMounted
              ? {
                  clipPath: clipPathStyle,
                }
              : undefined
          }
          className="w-full relative transition-[clip-path] duration-75"
        >
          <motion.figure
            style={
              !prefersReducedMotion && isMounted
                ? {
                    scale: imageScale,
                    transformOrigin: 'top center',
                  }
                : undefined
            }
            className="m-0 p-0 block w-full"
          >
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] md:h-[56vh] max-h-[600px] bg-[var(--slot)] overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Caption */}
            <motion.figcaption
              style={!prefersReducedMotion && isMounted ? { opacity: captionOpacity } : undefined}
              className="max-w-[1280px] mx-auto px-6 sm:px-8 mt-3 text-[13.5px] text-[var(--muted)] font-sans flex items-baseline justify-between gap-4"
            >
              <span className="max-w-[70ch] leading-relaxed">{captionText}</span>
              <span className="text-[12px] tabular-nums text-[var(--muted)]/60 flex-shrink-0 hidden sm:inline">
                Fig. 01 &bull; Pan-Gujarat Infrastructure
              </span>
            </motion.figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </Section>
  );
};
