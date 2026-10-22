'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motionTokens } from '@/lib/motion';

export interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in seconds
  triggerOnce?: boolean;
}

export function ImageReveal({
  children,
  className = '',
  delay = 0,
  triggerOnce = true,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true); // Default to true so images are immediately visible
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const el = containerRef.current;
    if (!el) return;

    if (mediaQuery.matches) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    // Check synchronously if already in or near the viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 250 && rect.bottom > -150) {
      setIsInView(true);
      setHasAnimated(true);
      if (triggerOnce) return;
    } else {
      // If far below the fold, enable scroll-triggered reveal
      setIsInView(false);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold: 0.01,
        rootMargin: '200px 0px 200px 0px', // Trigger 200px before entering viewport so images are never blank
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce]);

  const delaySec = delay > 10 ? delay / 1000 : delay;

  // Outer container: smooth clip-path and gentle fade, never completely blank
  const outerStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        clipPath: isInView ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 12% 0%)',
        opacity: isInView ? 1 : 0.6,
        transitionProperty: 'clip-path, opacity',
        transitionDuration: `${motionTokens.durations.slow}s`,
        transitionTimingFunction: motionTokens.easings.cssEaseOut,
        transitionDelay: `${delaySec}s`,
      };

  // Inner element: subtle scale from 1.04 to 1
  const innerStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        transform: isInView ? 'scale(1)' : 'scale(1.04)',
        transformOrigin: 'center center',
        transitionProperty: 'transform',
        transitionDuration: `${motionTokens.durations.slow}s`,
        transitionTimingFunction: motionTokens.easings.cssEaseOut,
        transitionDelay: `${delaySec}s`,
      };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={outerStyle}>
      <div className="w-full h-full" style={innerStyle}>
        {children}
      </div>
    </div>
  );
}
