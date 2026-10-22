'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { resolveImage } from '@/content/images';

interface EntityHeroImageProps {
  slug: string;
  name: string;
  caption?: string;
}

export const EntityHeroImage: React.FC<EntityHeroImageProps> = ({
  slug,
  name,
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 25%'],
  });

  // Shorter scroll distance expansion
  const clipInsetX = useTransform(scrollYProgress, [0, 0.45], [4, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.05]);
  const captionOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  const clipPathStyle = useTransform(
    clipInsetX,
    (val) => `inset(0% ${val}% 0% ${val}%)`
  );

  const fallbackCaption = `${name} operating facility and project installations.`;
  const displayCaption = caption || fallbackCaption;
  const resolved = resolveImage(undefined, displayCaption, slug);
  const imageSrc = resolved?.src || '/images/group/ahmedabad-skyline.webp';
  const imageAlt = resolved?.alt || displayCaption;

  return (
    <div ref={containerRef} className="mt-10 md:mt-16 relative w-full">
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
          <div className="relative w-full aspect-[16/9] md:h-[60vh] max-h-[640px] bg-[var(--slot)] overflow-hidden rounded-[2px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <motion.figcaption
            style={!prefersReducedMotion && isMounted ? { opacity: captionOpacity } : undefined}
            className="max-w-[1280px] mx-auto mt-3 text-[13.5px] text-[var(--muted)] font-sans flex items-baseline justify-between gap-4"
          >
            <span className="max-w-[70ch] leading-relaxed">{displayCaption}</span>
            <span className="text-[12px] tabular-nums text-[var(--muted)]/60 flex-shrink-0 hidden sm:inline">
              Fig. 01 &bull; {name}
            </span>
          </motion.figcaption>
        </motion.figure>
      </motion.div>
    </div>
  );
};
