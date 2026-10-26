'use client';

import React, { useState, useRef } from 'react';

interface HeroSwissPosterStageProps {
  activeIndex: number;
  accentColor: string;
  headerTone?: 'light' | 'dark';
  className?: string;
}

interface PosterSlideData {
  numeral: string;
  category: string;
  sectorTag: string;
  title: string;
  entity: string;
  spec: string;
  location: string;
  coordinates: string;
  statValue: string;
  statLabel: string;
}

const POSTER_DATA: PosterSlideData[] = [
  {
    numeral: '01',
    category: 'Built Environment',
    sectorTag: 'High-precision building envelopes',
    title: 'Facades & Fenestration',
    entity: 'HRS Aluglaze Ltd',
    spec: 'Unitised curtain walling, structural glazing & engineered facades.',
    location: 'Sanand Automated Plant, Gujarat',
    coordinates: '23°01\'N 72°31\'E',
    statValue: '38 Storeys',
    statLabel: 'Unitised tower engineering',
  },
  {
    numeral: '02',
    category: 'Built Environment',
    sectorTag: 'Plotted layouts & planned communities',
    title: 'Residential Developments',
    entity: 'Hrishikesh Ventures',
    spec: 'Master-planned villa schemes & commercial centres in Ahmedabad.',
    location: 'Shela & Bodakdev, Ahmedabad',
    coordinates: '23°00\'N 72°28\'E',
    statValue: '13 Schemes',
    statLabel: 'Delivered & active projects',
  },
  {
    numeral: '03',
    category: 'Food & Consumer',
    sectorTag: 'Clean spice milling & processing',
    title: 'Milling & Refining',
    entity: 'Hrishikesh Food Products',
    spec: 'Whole spice processing, custom blending & white-label manufacturing.',
    location: 'Bavla Processing Campus, Gujarat',
    coordinates: '22°50\'N 72°21\'E',
    statValue: '2,800 RPM',
    statLabel: 'Precision milling line',
  },
  {
    numeral: '04',
    category: 'Food & Consumer',
    sectorTag: 'Household FMCG brand portfolio',
    title: 'Consumer Products',
    entity: 'Hrishikesh Consumer Products',
    spec: 'Everyday staples, snacks, confectionery & wellness goods.',
    location: 'Ahmedabad & South India',
    coordinates: '23°02\'N 72°34\'E',
    statValue: '13 Brands',
    statLabel: 'Dedicated household portfolio',
  },
  {
    numeral: '05',
    category: 'Hospitality & Leasing',
    sectorTag: 'Business stays & regional dining',
    title: 'Boutique Hospitality',
    entity: 'FirstGen Hotels',
    spec: 'Restorative business stays & heritage Andhra dining in Bengaluru.',
    location: 'Bengaluru, Karnataka',
    coordinates: '12°58\'N 77°35\'E',
    statValue: 'Flight Stays',
    statLabel: 'And Amuktamalyada dining',
  },
  {
    numeral: '06',
    category: 'Built Environment',
    sectorTag: 'Technical engineering curricula',
    title: 'Facade Technologies',
    entity: 'School of Facade Technologies',
    spec: 'Technical education for engineering students, fabricators & architects.',
    location: 'Ahmedabad Campus',
    coordinates: '23°03\'N 72°31\'E',
    statValue: 'ASTM E330',
    statLabel: 'Testing laboratory standard',
  },
  {
    numeral: '07',
    category: 'Modern Retail',
    sectorTag: 'Connected multi-format ecosystem',
    title: 'Multi-Format Retail',
    entity: 'BOGO Ecosystem',
    spec: 'Flagship square, community bazaar, convenience & supply network.',
    location: 'Western & Southern India',
    coordinates: '23°02\'N 72°30\'E',
    statValue: '40k / 6k / 2k',
    statLabel: 'Square, Bazaar & Mini sq. ft.',
  },
];

export const HeroSwissPosterStage: React.FC<HeroSwissPosterStageProps> = ({
  activeIndex,
  accentColor,
  headerTone = 'light',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const isDarkText = headerTone === 'dark';

  // Subtle 3D perspective tilt on cursor movement (max 3.5 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -y * 5,
      ry: x * 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const current = POSTER_DATA[activeIndex % POSTER_DATA.length];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative aspect-[4/5] sm:aspect-square w-full max-w-[480px] lg:max-w-[520px] select-none ${className}`}
      aria-label="Kinetic Swiss typographic poster stage"
    >
      {/* Component-level scoped keyframe animations for mechanical slide reveals */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes posterContentIn {
              0% { opacity: 0; transform: translateY(12px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes posterNumeralIn {
              0% { opacity: 0; transform: translateY(22px) scale(0.96); }
              100% { opacity: ${isDarkText ? '0.22' : '0.16'}; transform: translateY(0) scale(1); }
            }
            .animate-poster-content {
              animation: posterContentIn 420ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-poster-numeral {
              animation: posterNumeralIn 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `,
        }}
      />

      {/* Outer 1px Hairline Frame & Background Surface */}
      <div
        className={`relative h-full w-full border flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
          isDarkText
            ? 'border-black/20 bg-black/[0.04]'
            : 'border-white/20 bg-white/[0.03]'
        }`}
      >
        {/* Subtle Registration Crosshairs in Corners */}
        <span
          className={`absolute -top-2 -left-2 text-xs font-semibold select-none pointer-events-none transition-colors duration-500 ${
            isDarkText ? 'text-black/40' : 'text-white/50'
          }`}
        >
          +
        </span>
        <span
          className={`absolute -top-2 -right-2 text-xs font-semibold select-none pointer-events-none transition-colors duration-500 ${
            isDarkText ? 'text-black/40' : 'text-white/50'
          }`}
        >
          +
        </span>
        <span
          className={`absolute -bottom-2 -left-2 text-xs font-semibold select-none pointer-events-none transition-colors duration-500 ${
            isDarkText ? 'text-black/40' : 'text-white/50'
          }`}
        >
          +
        </span>
        <span
          className={`absolute -bottom-2 -right-2 text-xs font-semibold select-none pointer-events-none transition-colors duration-500 ${
            isDarkText ? 'text-black/40' : 'text-white/50'
          }`}
        >
          +
        </span>

        {/* 1. Top Swiss Grid Strip: Category & Geographic Datum */}
        <div
          className={`border-b px-6 py-3.5 flex items-center justify-between text-xs tracking-normal transition-colors duration-500 ${
            isDarkText ? 'border-black/15' : 'border-white/15'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="h-2 w-2 rounded-full shrink-0 transition-colors duration-500"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className={`font-semibold transition-colors duration-500 ${
                isDarkText ? 'text-black/85' : 'text-white/85'
              }`}
            >
              {current.category}
            </span>
          </div>
          <span
            className={`font-medium tabular-nums transition-colors duration-500 ${
              isDarkText ? 'text-black/55' : 'text-white/50'
            }`}
          >
            {current.coordinates}
          </span>
        </div>

        {/* 2. Monumental Central Poster Canvas */}
        <div className="relative flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Giant Sculptural Architectural Numeral in Background */}
          <div
            key={`numeral-${activeIndex}`}
            className="animate-poster-numeral absolute right-3 bottom-0 font-['Bricolage_Grotesque'] text-[clamp(7rem,20vw,14rem)] font-extrabold leading-none tracking-tighter select-none pointer-events-none"
            style={{
              color: isDarkText ? '#1A0B00' : accentColor,
            }}
          >
            {current.numeral}
          </div>

          {/* Foreground Typographic Information Hierarchy */}
          <div
            key={`content-${activeIndex}`}
            className="animate-poster-content relative z-10 flex flex-col justify-between h-full"
          >
            {/* Top Eyebrow & Display Title */}
            <div>
              <span
                className={`block text-xs font-medium mb-2 transition-colors duration-500 ${
                  isDarkText ? 'text-black/65' : 'text-white/60'
                }`}
              >
                {current.sectorTag}
              </span>

              <h3
                className={`font-['Bricolage_Grotesque'] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.04] mb-3 transition-colors duration-500 ${
                  isDarkText ? 'text-[var(--ink)]' : 'text-white'
                }`}
              >
                {current.title}
              </h3>

              {/* Operating Entity Pill */}
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold border transition-colors duration-500 ${
                  isDarkText
                    ? 'bg-black/10 text-[var(--ink)] border-black/15'
                    : 'bg-white/10 text-white border-white/15'
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span>{current.entity}</span>
              </div>
            </div>

            {/* Middle Editorial Scope */}
            <div className="pt-6 pb-2">
              <p
                className={`text-xs sm:text-sm leading-relaxed max-w-sm transition-colors duration-500 ${
                  isDarkText ? 'text-black/75' : 'text-white/75'
                }`}
              >
                {current.spec}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Bottom Hairline Spec Matrix */}
        <div
          key={`matrix-${activeIndex}`}
          className={`animate-poster-content border-t grid grid-cols-2 divide-x transition-colors duration-500 ${
            isDarkText
              ? 'border-black/15 divide-black/15 bg-black/[0.03]'
              : 'border-white/15 divide-white/15 bg-white/[0.02]'
          }`}
        >
          {/* Left Column: Core Technical Metric */}
          <div className="px-6 py-4">
            <span
              className={`block font-['Bricolage_Grotesque'] text-lg sm:text-xl font-bold tabular-nums tracking-tight transition-colors duration-500 ${
                isDarkText ? 'text-[var(--ink)]' : 'text-white'
              }`}
            >
              {current.statValue}
            </span>
            <span
              className={`block text-[11px] font-medium mt-0.5 leading-snug transition-colors duration-500 ${
                isDarkText ? 'text-black/55' : 'text-white/50'
              }`}
            >
              {current.statLabel}
            </span>
          </div>

          {/* Right Column: Physical Plant / Operation Location */}
          <div className="px-6 py-4">
            <span
              className={`block text-xs sm:text-sm font-semibold tracking-tight leading-snug line-clamp-1 transition-colors duration-500 ${
                isDarkText ? 'text-[var(--ink)]' : 'text-white'
              }`}
            >
              {current.location}
            </span>
            <span
              className={`block text-[11px] font-medium mt-0.5 leading-snug transition-colors duration-500 ${
                isDarkText ? 'text-black/55' : 'text-white/50'
              }`}
            >
              Primary campus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSwissPosterStage;
