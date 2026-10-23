'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PinSceneProps {
  children: React.ReactNode;
  className?: string;
  pinSpacing?: boolean;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  onUpdate?: (progress: number) => void;
}

export const PinScene: React.FC<PinSceneProps> = ({
  children,
  className = '',
  pinSpacing = true,
  scrub = 1,
  start = 'top top',
  end = '+=100%',
  onUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    if (!container || !pinTarget) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Use gsap.context for flawless React StrictMode cleanup
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: pinTarget,
        start,
        end,
        scrub,
        pinSpacing,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (onUpdate) {
            onUpdate(self.progress);
          }
        },
      });
    }, container);

    return () => {
      ctx.revert(); // Removes pinned spacers, restores DOM
    };
  }, [end, onUpdate, pinSpacing, scrub, start]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={pinTargetRef} className="w-full">
        {children}
      </div>
    </div>
  );
};

export default PinScene;
