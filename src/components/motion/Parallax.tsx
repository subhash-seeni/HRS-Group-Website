'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface ParallaxProps {
  children: React.ReactNode;
  offset?: number; // max movement in px, default 40
  className?: string;
  reverse?: boolean; // invert movement direction
}

export function Parallax({
  children,
  offset = 40,
  className = '',
  reverse = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check mobile or touch (keep off on mobile)
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isMobile) {
      setIsDisabled(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let isVisible = false;
    let ticking = false;

    const updatePosition = () => {
      if (!el || !isVisible) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from 0 (just entering viewport at bottom) to 1 (leaving at top)
      const totalDistance = windowHeight + rect.height;
      const currentProgress = (windowHeight - rect.top) / totalDistance;
      const clampedProgress = Math.max(0, Math.min(1, currentProgress));

      // Map progress 0 -> 1 to offset range: from +offset to -offset
      const factor = reverse ? -1 : 1;
      const y = (1 - clampedProgress * 2) * offset * factor;
      setTranslateY(y);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking && isVisible) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updatePosition();
          window.addEventListener('scroll', onScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      },
      { rootMargin: '50px 0px 50px 0px' }
    );

    observer.observe(el);

    const onResize = () => {
      if (window.innerWidth < 768) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [offset, reverse]);

  const style: React.CSSProperties = isDisabled
    ? {}
    : {
        transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
        willChange: 'transform',
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
