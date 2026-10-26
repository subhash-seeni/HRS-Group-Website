'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetUrl } from '@/lib/basePath';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageRevealProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectRatio?: string; // e.g. 'aspect-[16/9]'
  priority?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  caption,
  className = '',
  aspectRatio = 'aspect-[16/9]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        container,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.0,
          ease: 'power3.out',
        }
      ).fromTo(
        img,
        { scale: 1.1 },
        {
          scale: 1.0,
          duration: 1.2,
          ease: 'power2.out',
        },
        0
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-[var(--ink)]/5 ${aspectRatio}`}
        style={!isHydrated ? { clipPath: 'none' } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={getAssetUrl(src)}
          alt={alt}
          width={1600}
          height={900}
          decoding="async"
          className="h-full w-full object-cover will-change-transform"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs font-medium text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageReveal;
