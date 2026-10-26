'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTextProps {
  children: string;
  className?: string;
  start?: string;
  end?: string;
  as?: 'p' | 'h2' | 'h3' | 'div';
}

export const ScrollText: React.FC<ScrollTextProps> = ({
  children,
  className = '',
  start = 'top 80%',
  end = 'bottom 40%',
  as: Component = 'p',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const words = el.querySelectorAll<HTMLElement>('.scroll-word');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.2, y: 4 },
        {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.4,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [end, start]);

  const words = children.split(' ');

  return (
    <Component
      ref={containerRef as any}
      className={className}
      aria-label={children}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]">
        {words.map((word, i) => (
          <span
            key={i}
            className={`scroll-word inline-block transition-opacity ${
              !isHydrated ? 'opacity-100' : 'opacity-25'
            }`}
            style={!isHydrated ? { opacity: 1 } : undefined}
          >
            {word}
          </span>
        ))}
      </span>
    </Component>
  );
};

export default ScrollText;
