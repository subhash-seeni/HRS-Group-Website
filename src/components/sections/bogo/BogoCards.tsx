'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LoyaltyCardData {
  id: string;
  name: string;
  color: string;
  textColor: string;
  sub: string;
}

const CARDS: LoyaltyCardData[] = [
  { id: '1', name: 'BOGO Essentials', color: '#149395', textColor: '#FFFFFF', sub: 'Daily household care' },
  { id: '2', name: 'BOGO Daily', color: '#EB7C20', textColor: '#FFFFFF', sub: 'Pantry & staples' },
  { id: '3', name: 'BOGO Farms', color: '#02A04A', textColor: '#FFFFFF', sub: 'Organic & fresh produce' },
  { id: '4', name: 'BOGO Luxe', color: '#6F357C', textColor: '#FFFFFF', sub: 'Curated gourmet & gifting' },
  { id: '5', name: 'BOGO Companion', color: '#0F2A5C', textColor: '#FFFFFF', sub: 'Unified ecosystem tier' },
];

const PROGRAMMES = [
  { name: 'BOGO Life', line: 'Corporate benefits' },
  { name: 'BOGO Companion', line: 'Membership' },
  { name: 'BOGO Partner', line: 'Retail space for equity partnerships' },
  { name: 'BOGO Affairs', line: 'Ecosystem news' },
];

export const BogoCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReduced(reduced);

    const container = containerRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!container || !cardsWrap) return;

    // Relative fan offsets for the 5 cards on desktop fine-pointer
    const fanOffsets = [
      { rotate: -20, x: -70, y: 15 },
      { rotate: -10, x: -35, y: 5 },
      { rotate: 0, x: 0, y: 0 },
      { rotate: 10, x: 35, y: 5 },
      { rotate: 20, x: 70, y: 15 },
    ];

    const mm = gsap.matchMedia();

    // Only pin and scrub on desktop screens >= 1024px with fine pointer (mouse), not touch
    mm.add('(min-width: 1024px) and (hover: hover) and (pointer: fine)', () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const cardElements = cardsWrap.querySelectorAll<HTMLElement>('.loyalty-card-desktop');
      if (!cardElements.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cardElements.forEach((card, idx) => {
        const offset = fanOffsets[idx] || { rotate: 0, x: 0, y: 0 };
        tl.to(
          card,
          {
            rotate: offset.rotate,
            x: offset.x,
            y: offset.y,
            ease: 'power2.out',
          },
          0
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="bogo-cards"
      ref={containerRef}
      data-surface="bogo-navy"
      className="relative flex min-h-screen w-full flex-col justify-center bg-[var(--bogo-navy)] py-20 px-6 sm:px-8 lg:px-12 text-white overflow-hidden border-t border-white/10"
      aria-label="One membership, eleven worlds of value"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Headline */}
        <div className="mb-14 border-b border-white/15 pb-6">
          <span className="text-xs font-semibold text-[var(--bogo-orange)] block mb-2">
            Integrated ecosystem loyalty
          </span>
          <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            One membership. Eleven worlds of value.
          </h2>
        </div>

        {/* Content: Cards on Left, Programmes on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left: Five Loyalty Cards */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            {/* Desktop Fan Scrub (min-width: 1024px and fine pointer) */}
            <div
              ref={cardsWrapRef}
              className="hidden lg:flex relative w-[360px] h-[225px] justify-center items-center py-12"
            >
              {CARDS.map((card, idx) => {
                const staticOffsets = [
                  'rotate-[-16deg] translate-x-[-60px]',
                  'rotate-[-8deg] translate-x-[-30px]',
                  'rotate-0',
                  'rotate-[8deg] translate-x-[30px]',
                  'rotate-[16deg] translate-x-[60px]',
                ];

                return (
                  <div
                    key={`desktop-${card.id}`}
                    className={`loyalty-card-desktop absolute inset-0 rounded-2xl p-6 flex flex-col justify-between border-2 border-white/20 will-change-transform shadow-xl ${
                      isReduced ? staticOffsets[idx] : ''
                    }`}
                    style={{
                      backgroundColor: card.color,
                      color: card.textColor,
                      zIndex: idx + 1,
                      transformOrigin: '50% 120%',
                    }}
                  >
                    {/* Top Row: Brand & Loyalty Card label */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-['Bricolage_Grotesque'] text-lg font-bold block leading-tight">
                          {card.name}
                        </span>
                        <span className="text-[10px] font-semibold opacity-75">
                          {card.sub}
                        </span>
                      </div>
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-bold tracking-tight uppercase">
                        Loyalty card
                      </span>
                    </div>

                    {/* Bottom Row: Chip & Identifier */}
                    <div className="flex items-end justify-between pt-4 border-t border-white/20 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-7 rounded bg-amber-300/80 border border-amber-500/50 block" />
                        <span className="font-mono text-[11px] opacity-80">•••• 8492</span>
                      </div>
                      <span className="font-['Bricolage_Grotesque'] text-xs font-bold tracking-tight">
                        BOGO
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Touch / <1024px Simple Vertical Layout (clean stacked cards) */}
            <div className="flex lg:hidden flex-col gap-4 w-full max-w-md mx-auto">
              {CARDS.map((card) => (
                <div
                  key={`mobile-${card.id}`}
                  className="rounded-xl p-5 flex flex-col justify-between border border-white/25 shadow-md transition-transform duration-200"
                  style={{
                    backgroundColor: card.color,
                    color: card.textColor,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-['Bricolage_Grotesque'] text-lg font-bold block leading-tight">
                        {card.name}
                      </span>
                      <span className="text-xs opacity-80 font-medium">
                        {card.sub}
                      </span>
                    </div>
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-bold tracking-tight uppercase shrink-0">
                      Loyalty card
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-6 rounded bg-amber-300/80 border border-amber-500/50 block" />
                      <span className="font-mono text-[10px] opacity-80">•••• 8492</span>
                    </div>
                    <span className="font-['Bricolage_Grotesque'] text-xs font-bold tracking-tight">
                      BOGO
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Four Plain Lines for Programmes (separated by 1px hairlines) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-semibold text-white/60 block mb-4">
              Integrated initiatives
            </span>

            <div className="border-t border-white/20">
              {PROGRAMMES.map((prog) => (
                <div
                  key={prog.name}
                  className="flex items-baseline justify-between py-4 border-b border-white/15"
                >
                  <span className="font-['Bricolage_Grotesque'] text-lg sm:text-xl font-bold text-white">
                    {prog.name}
                  </span>
                  <span className="text-xs sm:text-sm text-white/70 font-medium text-right pl-4">
                    {prog.line}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-white/50 leading-relaxed">
              Planned ecosystem programmes uniting corporate partnerships, community memberships, and collaborative merchant growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BogoCards;
