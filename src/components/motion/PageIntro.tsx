'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const PageIntro: React.FC = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Check if user already saw the intro this session or prefers reduced motion
    const hasSeen = sessionStorage.getItem('hrs_page_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      return;
    }

    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Line 1 reveal
      tl.fromTo(
        line1Ref.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 }
      );

      // Line 2 reveal
      tl.fromTo(
        line2Ref.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' },
        '-=0.2'
      );

      // Wait until ~0.9s, then lift the ink screen upward
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.65,
          ease: 'power3.inOut',
          onComplete: () => {
            sessionStorage.setItem('hrs_page_intro_seen', 'true');
            setShouldRender(false);
          },
        },
        '+=0.35'
      );
    }, overlayRef);

    return () => ctx.revert();
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <aside
      ref={overlayRef}
      id="hrs-page-intro"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)] text-white overflow-hidden"
    >
      <div className="flex flex-col items-center gap-3 text-center px-6">
        <div className="overflow-hidden py-1">
          <div ref={line1Ref} className="flex items-center gap-3.5">
            <span className="h-3.5 w-3.5 rounded-full bg-[var(--hrs-orange)]" />
            <span className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              HRS Group
            </span>
          </div>
        </div>

        <div className="overflow-hidden py-1">
          <p
            ref={line2Ref}
            className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-medium tracking-normal text-neutral-400"
          >
            Ahmedabad, Gujarat
          </p>
        </div>
      </div>
    </aside>
  );
};

export default PageIntro;
