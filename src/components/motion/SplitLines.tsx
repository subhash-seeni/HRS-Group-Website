'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitLinesProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  highlightWord?: string;
  highlightClass?: string;
}

export const SplitLines: React.FC<SplitLinesProps> = ({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  highlightWord,
  highlightClass = 'text-[var(--hrs-orange)] italic',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = el.querySelectorAll<HTMLElement>('.split-line-inner');
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          delay: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, children]);

  // Split words by space
  const words = children.split(' ');

  // For accessible line/word reveal, wrap in overflow-hidden
  return (
    <Component
      ref={containerRef as any}
      className={`${className} inline-block`}
      aria-label={children}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]">
        {words.map((word, idx) => {
          const isHighlight =
            highlightWord &&
            word.toLowerCase().replace(/[^a-z0-9]/g, '') ===
              highlightWord.toLowerCase().replace(/[^a-z0-9]/g, '');

          return (
            <span
              key={idx}
              className="inline-block overflow-hidden py-[0.05em] align-top"
            >
              <span
                className={`split-line-inner inline-block transition-transform duration-700 ${
                  isHighlight ? highlightClass : ''
                } ${!isHydrated ? 'translate-y-0 opacity-100' : ''}`}
                style={!isHydrated ? { transform: 'none', opacity: 1 } : undefined}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </Component>
  );
};

export default SplitLines;
