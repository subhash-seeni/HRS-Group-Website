'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { bogoContent, BogoCategoryBrand } from '@/content/bogo';

// Determine tone and contrast based on brand color for strict WCAG AA/AAA compliance
function getBrandTone(color: string): { isDarkBg: boolean; textColor: string; mutedColor: string; pillBg: string; pillText: string } {
  // Olive #8B8937, Amber #EB9C03, Warm Orange #EB7C20, Green #02A04A, Teal #149395
  const lower = color.toLowerCase();
  const lightBgColors = ['#8b8937', '#eb9c03', '#eb7c20', '#02a04a', '#149395'];
  if (lightBgColors.includes(lower)) {
    return {
      isDarkBg: false,
      textColor: '#0E0E10',
      mutedColor: '#28282B',
      pillBg: '#0E0E10',
      pillText: '#FFFFFF',
    };
  }
  return {
    isDarkBg: true,
    textColor: '#FFFFFF',
    mutedColor: '#E5E7EB',
    pillBg: '#FFFFFF',
    pillText: '#0E0E10',
  };
}

export const BogoExplorer: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  const brands = bogoContent.categoryBrands;
  const currentBrand = brands[selectedIndex] || brands[0];
  const tone = getBrandTone(currentBrand.color);

  // Expose test helper on window for deterministic capture
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__setBogoBrand = (idx: number) => {
        if (idx >= 0 && idx < brands.length) {
          setSelectedIndex(idx);
          setHasInteracted(true);
        }
      };
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__setBogoBrand;
      }
    };
  }, [brands.length]);

  // Observer to pause auto-advancing when not in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 4 seconds until user interacts, leaves view, or prefers reduced motion
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasInteracted || !inView || prefersReducedMotion) {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      return;
    }

    autoTimerRef.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % brands.length);
    }, 4000);

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [hasInteracted, inView, brands.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setHasInteracted(true);
        setSelectedIndex((prev) => (prev + 1) % brands.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setHasInteracted(true);
        setSelectedIndex((prev) => (prev - 1 + brands.length) % brands.length);
      }
    },
    [brands.length]
  );

  const selectBrand = (idx: number) => {
    setHasInteracted(true);
    setSelectedIndex(idx);
  };

  return (
    <section
      id="bogo-explorer"
      ref={sectionRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-surface="bogo-explorer"
      className="relative w-full scroll-mt-24 pt-28 pb-20 sm:pt-32 sm:pb-28 px-6 sm:px-8 lg:px-12 transition-colors duration-600 ease-out focus:outline-none"
      style={{
        backgroundColor: currentBrand.color,
        color: tone.textColor,
      }}
      aria-label="BOGO Square category brands explorer"
    >
      {/* Screen reader live announcement */}
      <div className="sr-only" aria-live="polite">
        Selected category {currentBrand.name}. {currentBrand.tagline}
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 border-b border-current/20 pb-6">
          <span className="text-xs font-semibold block mb-2 opacity-80">
            Category ecosystem • BOGO Square
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Eleven specialised worlds
            </h2>
            <p className="text-sm sm:text-base font-medium opacity-85 max-w-md">
              Explore distinct brands created for everyday lifestyles, household routines, and family discovery.
            </p>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Brand Strip */}
        <div className="lg:hidden mb-8">
          <div className="flex overflow-x-auto gap-3 pb-3 snap-x scrollbar-thin">
            {brands.map((b, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => selectBrand(idx)}
                  className={`snap-start shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'bg-white text-[var(--ink)] border-white scale-105'
                      : 'border-current/30 text-current hover:border-current bg-current/10'
                  }`}
                  aria-pressed={isSelected}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.logoPath}
                    alt=""
                    className="h-4 w-4 object-contain brightness-0 invert"
                  />
                  <span>{b.name.replace('BOGO ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Two Halves: Ring on Left, Detail on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
          {/* Left Half: 11-Brand Orbit Ring around BOGO Square */}
          <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center h-[520px]">
            {/* Center BOGO Square Mark */}
            <div className="relative z-10 flex flex-col items-center justify-center rounded-full bg-white text-[var(--ink)] p-6 w-36 h-36 border-4 border-current/20 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bogo/logos/bogo-square.png"
                alt="BOGO Square"
                className="h-12 w-auto object-contain mb-1"
              />
              <span className="text-[10px] font-bold tracking-tight text-neutral-600">
                Flagship Hub
              </span>
            </div>

            {/* Orbit Circle Hairline */}
            <div className="absolute inset-8 rounded-full border border-current/25 pointer-events-none" />

            {/* 11 Brand Nodes in Circular Orbit */}
            {brands.map((brand, idx) => {
              const total = brands.length;
              // 11 points around a circle of radius ~205px
              const angle = (idx / total) * (2 * Math.PI) - Math.PI / 2;
              const radius = 205;
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={brand.slug}
                  type="button"
                  onClick={() => selectBrand(idx)}
                  onFocus={() => selectBrand(idx)}
                  className={`absolute z-20 flex flex-col items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white ${
                    isSelected
                      ? 'w-18 h-18 bg-white text-[var(--ink)] scale-115 border-2 border-white ring-4 ring-white/30'
                      : 'w-13 h-13 bg-black/25 text-white hover:scale-105 border border-white/40'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px - ${isSelected ? 36 : 26}px)`,
                    top: `calc(50% + ${y}px - ${isSelected ? 36 : 26}px)`,
                  }}
                  aria-label={`${brand.name}: ${brand.tagline}`}
                  aria-pressed={isSelected}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logoPath}
                    alt=""
                    width={24}
                    height={24}
                    className={`h-6 w-6 object-contain transition-transform ${
                      isSelected ? 'brightness-100 scale-110' : 'brightness-0 invert'
                    }`}
                  />
                  <span
                    className={`text-[9px] font-bold tracking-tight mt-0.5 leading-none max-w-[50px] truncate ${
                      isSelected ? 'text-[var(--ink)]' : 'text-white/80'
                    }`}
                  >
                    {brand.name.replace('BOGO ', '')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Half: Detail Panel for the Selected Brand */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Concept Render with Image Frame */}
            <div className="relative overflow-hidden rounded-xl border border-current/25 bg-black/20 aspect-[16/9] mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentBrand.imagePath}
                src={currentBrand.imagePath}
                alt={`${currentBrand.name} Concept Store`}
                className="h-full w-full object-cover transition-opacity duration-300"
                loading="lazy"
                width={1600}
                height={900}
                decoding="async"
              />
              <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
                Concept
              </span>
            </div>

            {/* Brand Header: Logo + Tagline */}
            <div className="flex items-center gap-4 border-b border-current/20 pb-4 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentBrand.logoPath}
                alt={currentBrand.name}
                width={160}
                height={48}
                className={`h-10 sm:h-12 w-auto object-contain ${
                  tone.isDarkBg ? 'brightness-0 invert' : 'brightness-0'
                }`}
              />
              <div>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight">
                  {currentBrand.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium opacity-85">
                  {currentBrand.tagline}
                </p>
              </div>
            </div>

            {/* Product Lines List (Numbered 1-6) */}
            <div className="mb-4">
              <span className="text-xs font-semibold block mb-2 opacity-80">
                Core product lines
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
                {currentBrand.productLines.map((line, idx) => (
                  <div key={line} className="flex items-center gap-2 border-b border-current/15 pb-1.5">
                    <span className="font-bold opacity-60">0{idx + 1}</span>
                    <span className="font-medium truncate">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision Line */}
            <div className="mt-2 pt-3 border-t border-current/20 text-xs sm:text-sm font-medium opacity-90 leading-relaxed">
              <span className="font-bold mr-1.5">Vision:</span>
              <span>{currentBrand.vision}</span>
            </div>
          </div>
        </div>

        {/* No-JS Accessible Fallback Grid */}
        <noscript>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-current/20">
            {brands.map((b) => (
              <div key={b.slug} className="p-4 border border-current/30 rounded">
                <h4 className="font-bold">{b.name}</h4>
                <p className="text-xs mt-1">{b.tagline}</p>
                <p className="text-xs mt-2 italic">{b.vision}</p>
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
};

export default BogoExplorer;
