'use client';

import React, { useEffect, useRef, useState } from 'react';
import { consumerBrands, ConsumerBrand } from '@/content/entities';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
          ? 'col-span-1 sm:col-span-2 lg:col-span-2 min-h-[190px] sm:min-h-[220px]'
          : 'col-span-1 min-h-[160px] sm:min-h-[190px]'
      } will-change-transform cursor-pointer select-none`}
    >
      {/* Top Row: Category + Arrow / Coming Soon */}
      <div className="flex items-start justify-between gap-2 border-b border-white/15 pb-3">
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

      {/* Middle: Distinct Typographic Brand Name */}
      <div className="my-auto py-3">
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
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
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
      // 40ms stagger rise as the wall enters view (once)
      gsap.from(tiles, {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wall,
          start: 'top 80%',
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
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
