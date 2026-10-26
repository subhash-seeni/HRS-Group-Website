'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Refresh ScrollTrigger once web fonts load to prevent layout shift calculation bugs
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Refresh triggers on resize, orientation change, back/forward cache restore
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleRefresh);
    window.addEventListener('orientationchange', handleRefresh);
    window.addEventListener('pageshow', handleRefresh);
    window.addEventListener('popstate', handleRefresh);

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', handleRefresh);
        window.removeEventListener('orientationchange', handleRefresh);
        window.removeEventListener('pageshow', handleRefresh);
        window.removeEventListener('popstate', handleRefresh);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation handling without jump, jitter or pin collision
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: 0,
            immediate: false,
            duration: 1.2,
          });
          if (typeof window !== 'undefined' && window.history) {
            window.history.pushState(null, '', href);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('orientationchange', handleRefresh);
      window.removeEventListener('pageshow', handleRefresh);
      window.removeEventListener('popstate', handleRefresh);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
