'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const CursorLabel: React.FC = () => {
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const el = cursorRef.current;
    if (!el) return;

    // Fast mouse follow
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });

      // Find any ancestor with data-cursor
      let target = e.target as HTMLElement | null;
      let foundLabel: string | null = null;
      while (target && target !== document.body) {
        if (target.dataset && target.dataset.cursor) {
          foundLabel = target.dataset.cursor;
          break;
        }
        target = target.parentElement;
      }

      if (foundLabel) {
        setLabel(foundLabel);
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
      style={{
        opacity: visible && label ? 1 : 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="rounded-full bg-[var(--hrs-orange)] px-3 py-1 text-xs font-semibold tracking-tight text-[var(--ink)]">
        {label}
      </div>
    </div>
  );
};

export default CursorLabel;
