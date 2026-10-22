'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motionTokens } from '@/lib/motion';

export interface RevealProps {
  children: React.ReactNode;
  delay?: number; // in seconds or milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // px, default 24
  duration?: number; // seconds, default 0.5 (500ms)
  className?: string;
  as?: React.ElementType;
  triggerOnce?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = motionTokens.distances.rise,
  duration = motionTokens.durations.base,
  className = '',
  as: Component = 'div',
  triggerOnce = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const el = ref.current;
    if (!el) return;

    if (mediaQuery.matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce]);

  // Delay normalization: if passed > 10, treat as ms, else as seconds
  const delaySec = delay > 10 ? delay / 1000 : delay;

  // Determine transform offset
  const getInitialTransform = () => {
    if (prefersReducedMotion || direction === 'none') return 'none';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  const style: React.CSSProperties = !isHydrated || prefersReducedMotion
    ? {}
    : {
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate3d(0, 0, 0)' : getInitialTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: motionTokens.easings.cssEaseOut,
        transitionDelay: `${delaySec}s`,
        willChange: isInView ? 'auto' : 'opacity, transform',
      };

  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
}
