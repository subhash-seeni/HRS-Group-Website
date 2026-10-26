'use client';

import React, { useEffect, useRef, useState } from 'react';
import { consumerBrands, ConsumerBrand } from '@/content/entities';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Packaging contours and authentic category badges for all 13 consumer brands
const BRAND_VISUALS: Record<string, { badge: string; svg: React.ReactNode }> = {
  manpras: {
    badge: 'Gujarat Farm Staples',
    svg: (
      <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-16">
        <path d="M10 12 L38 12 L42 56 L6 56 Z" />
        <path d="M14 6 L34 6 L38 12 L10 12 Z" />
        <line x1="14" y1="9" x2="34" y2="9" />
        <circle cx="24" cy="34" r="8" strokeDasharray="2 2" />
      </svg>
    ),
  },
  snackshot: {
    badge: 'Namkeen & Savory',
    svg: (
      <svg viewBox="0 0 44 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-16">
        <rect x="8" y="14" width="28" height="44" rx="3" />
        <ellipse cx="22" cy="14" rx="14" ry="4" />
        <ellipse cx="22" cy="10" rx="14" ry="4" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="36" y1="10" x2="36" y2="14" />
        <path d="M14 30 L22 24 L30 30" />
      </svg>
    ),
  },
  antrah: {
    badge: 'Digestive Botanicals',
    svg: (
      <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-16">
        <polygon points="24,14 40,24 40,48 24,58 8,48 8,24" />
        <rect x="16" y="6" width="16" height="8" rx="1" />
        <circle cx="24" cy="36" r="6" />
      </svg>
    ),
  },
  'basic-essentials': {
    badge: '100% Virgin Fibre',
    svg: (
      <svg viewBox="0 0 52 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-13 h-16">
        <rect x="8" y="16" width="36" height="36" rx="4" />
        <ellipse cx="26" cy="16" rx="18" ry="6" />
        <ellipse cx="26" cy="16" rx="7" ry="2.5" />
        <line x1="8" y1="34" x2="44" y2="34" strokeDasharray="3 2" />
      </svg>
    ),
  },
  gush: {
    badge: 'Natural Mineral Spring',
    svg: (
      <svg viewBox="0 0 40 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-16">
        <path d="M16 6 L24 6 L24 12 L28 18 L28 42 C28 46 26 48 28 52 L28 58 L12 58 L12 52 C14 48 12 46 12 42 L12 18 L16 12 Z" />
        <line x1="16" y1="9" x2="24" y2="9" />
        <path d="M14 30 Q20 28 26 30" />
        <path d="M14 36 Q20 34 26 36" />
      </svg>
    ),
  },
  'daily-pump': {
    badge: 'Active Hydration',
    svg: (
      <svg viewBox="0 0 40 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-16">
        <rect x="10" y="10" width="20" height="46" rx="3" />
        <ellipse cx="20" cy="10" rx="10" ry="3" />
        <ellipse cx="20" cy="56" rx="10" ry="3" />
        <path d="M17 24 L25 32 L15 36 L23 44" strokeWidth="2" />
      </svg>
    ),
  },
  biscbite: {
    badge: 'Oven-Baked Bakery',
    svg: (
      <svg viewBox="0 0 52 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-13 h-16">
        <rect x="8" y="20" width="36" height="24" rx="2" />
        <path d="M8 20 L2 26 L8 32 L2 38 L8 44" />
        <path d="M44 20 L50 26 L44 32 L50 38 L44 44" />
        <circle cx="20" cy="32" r="3" />
        <circle cx="32" cy="32" r="3" />
      </svg>
    ),
  },
  'mood-beans': {
    badge: 'Specialty Roast',
    svg: (
      <svg viewBox="0 0 44 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-16">
        <path d="M10 14 L34 14 L38 56 L6 56 Z" />
        <line x1="8" y1="14" x2="36" y2="14" strokeWidth="2" />
        <circle cx="22" cy="30" r="4" />
        <path d="M18 42 C18 38 26 38 26 46" />
      </svg>
    ),
  },
  'the-frozen-palette': {
    badge: 'Artisanal Gelato',
    svg: (
      <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-16">
        <path d="M10 24 L38 24 L34 54 L14 54 Z" />
        <rect x="8" y="18" width="32" height="6" rx="2" />
        <path d="M16 18 C16 12 32 12 32 18" />
      </svg>
    ),
  },
  'the-nut-tribe': {
    badge: 'Vacuum Dry Fruits',
    svg: (
      <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-16">
        <rect x="10" y="16" width="28" height="40" rx="3" />
        <rect x="14" y="8" width="20" height="8" rx="1" />
        <circle cx="24" cy="36" r="7" strokeDasharray="3 2" />
      </svg>
    ),
  },
  'purple-cow': {
    badge: 'Flavoured Dairy',
    svg: (
      <svg viewBox="0 0 40 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-16">
        <path d="M15 6 L25 6 L25 12 L28 18 L28 54 C28 56 26 58 24 58 L16 58 C14 58 12 56 12 54 L12 18 L15 12 Z" />
        <line x1="14" y1="9" x2="26" y2="9" />
        <circle cx="20" cy="38" r="5" />
      </svg>
    ),
  },
  defumes: {
    badge: 'Botanical Aroma',
    svg: (
      <svg viewBox="0 0 44 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-16">
        <rect x="12" y="28" width="20" height="28" rx="2" />
        <rect x="16" y="22" width="12" height="6" />
        <line x1="22" y1="22" x2="14" y2="6" />
        <line x1="22" y1="22" x2="22" y2="4" />
        <line x1="22" y1="22" x2="30" y2="6" />
      </svg>
    ),
  },
  'raspberry-rhinoceros': {
    badge: 'Artisanal Sweets',
    svg: (
      <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-16">
        <circle cx="24" cy="32" r="10" />
        <path d="M14 32 L4 22 L8 32 L4 42 Z" />
        <path d="M34 32 L44 22 L40 32 L44 42 Z" />
      </svg>
    ),
  },
};

// Single interactive typographic brand tile with 3D cursor tilt (max 6 degrees)
const BrandTile: React.FC<{ brand: ConsumerBrand }> = ({ brand }) => {
  const tileRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(600px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tileRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = (x / rect.width - 0.5) * 2; // -1 to 1
    const dy = (y / rect.height - 0.5) * 2; // -1 to 1

    const rotX = -dy * 6; // max 6 deg
    const rotY = dx * 6;  // max 6 deg

    setTransformStyle(`perspective(600px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  const isUpcoming = brand.status === 'upcoming';
  const isManpras = brand.isLarge;
  const visual = BRAND_VISUALS[brand.slug] || {
    badge: brand.category,
    svg: null,
  };

  return (
    <div
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease',
        backgroundColor: isUpcoming ? 'rgba(255, 255, 255, 0.03)' : brand.color,
        borderColor: isUpcoming ? `${brand.color}66` : 'transparent',
      }}
      className={`brand-wall-tile group relative flex flex-col justify-between p-5 sm:p-7 border ${
        isUpcoming ? 'border-white/20' : 'border-transparent text-white'
      } ${
        isManpras
          ? 'col-span-1 sm:col-span-2 lg:col-span-2'
          : 'col-span-1'
      } h-full min-h-[200px] sm:min-h-[220px] will-change-transform cursor-pointer select-none overflow-hidden`}
    >
      {/* Background Packaging Silhouette Watermark */}
      {visual.svg && (
        <div className="absolute right-4 bottom-5 pointer-events-none opacity-20 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500 text-white flex items-end justify-end">
          {visual.svg}
        </div>
      )}

      {/* Top Row: Category + Arrow / Coming Soon */}
      <div className="flex items-start justify-between gap-2 border-b border-white/15 pb-3 relative z-10">
        <span
          className={`text-xs font-semibold ${
            isUpcoming ? 'text-white/60' : 'text-white/80'
          }`}
        >
          {brand.category}
        </span>

        <div className="flex items-center gap-2">
          {isUpcoming && (
            <span className="text-[11px] text-white/60 border border-white/20 px-2 py-0.5 font-medium">
              Coming soon
            </span>
          )}
          <span className="text-sm font-bold text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            →
          </span>
        </div>
      </div>

      {/* Middle: Distinct Typographic Brand Name + Provenance Badge */}
      <div className="my-auto py-3 relative z-10">
        <div className="mb-2">
          <span className="text-[10px] font-semibold tracking-wide text-white/75 bg-white/10 px-2 py-0.5 rounded-none inline-block">
            {visual.badge}
          </span>
        </div>

        <h3
          className={`font-['Bricolage_Grotesque'] ${brand.fontStyle} text-white leading-tight`}
        >
          {brand.name}
        </h3>

        {/* Manpras special requirement: both neighbourhood grocery store and packaged range */}
        {isManpras && (
          <p className="text-xs sm:text-sm text-white/80 mt-2 max-w-md leading-relaxed">
            Operating both neighbourhood grocery stores and a packaged range of daily kitchen provisions.
          </p>
        )}
      </div>

      {/* Bottom Row: Subtle Accent Hairline */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 relative z-10">
        <span>Hrishikesh Consumer Products</span>
        <span className="capitalize">{brand.status}</span>
      </div>
    </div>
  );
};

export const BrandWall: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wall = wallRef.current;
    if (!section || !wall) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tiles = wall.querySelectorAll('.brand-wall-tile');

    const ctx = gsap.context(() => {
      // Clean stagger rise as the wall enters view; clearProps leaves pure CSS grid alignment
      gsap.from(tiles, {
        y: 35,
        opacity: 0,
        duration: 0.65,
        stagger: 0.03,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: wall,
          start: 'top 85%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="brand-wall"
      ref={sectionRef}
      data-surface="ink"
      className="relative w-full bg-[var(--ink)] text-white py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10"
      aria-label="Thirteen brands from Hrishikesh Consumer Products"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 border-b border-white/15 pb-6">
          <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
            FMCG portfolio • Household provisions
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Thirteen brands from Hrishikesh Consumer Products
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              A dedicated portfolio of household consumer brands, spanning staple groceries, snacks, hydration, and upcoming confectionery.
            </p>
          </div>
        </div>

        {/* 13 Typographic Tiles Grid */}
        <div
          ref={wallRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch"
        >
          {consumerBrands.map((brand) => (
            <BrandTile key={brand.slug} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandWall;
