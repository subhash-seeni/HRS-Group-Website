'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetUrl } from '@/lib/basePath';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SystemSpec {
  label: string;
  value: string;
}

interface EngineeringSystem {
  numeral: string;
  name: string;
  scope: string;
  description: string;
  image: string;
  imageCaption: string;
  cadTag: string;
  specs: SystemSpec[];
  components: string[];
}

const SYSTEMS: EngineeringSystem[] = [
  {
    numeral: '01',
    name: 'Unitised Curtain Walls',
    scope: 'Towers up to 38 storeys',
    description:
      'Factory-assembled and pre-glazed panel systems engineered off-site for high-speed crane erection, stringent air-water tightness, and structural wind resistance.',
    image: '/images/hrs-aluglaze/curtain-wall-detail.webp',
    imageCaption: 'Sanand automated fabrication: Unitised modular panel assembly',
    cadTag: 'DETAIL DWG-01 • UNITISED TRANSOM / MULLION INTERSECTION',
    specs: [
      { label: 'Structural Wind-Load', value: '4.5 kPa' },
      { label: 'Seismic Displacement', value: '±25 mm' },
      { label: 'Air & Water Infiltration', value: 'ASTM E283 / 600 Pa' },
      { label: 'Max Modular Height', value: '4,200 mm' },
    ],
    components: [
      'Alloy 6063-T6 heavy-duty structural aluminium mullion extrusion',
      '28mm double-glazed Low-E unit with 12mm argon acoustic cavity',
      'Co-extruded EPDM triple-weather barrier continuous perimeter gaskets',
      '3-axis cast-in anchor bracket with structural galvanised embed',
    ],
  },
  {
    numeral: '02',
    name: 'Dynamic & Kinetic Facades',
    scope: 'Solar and thermal control',
    description:
      'Engineered architectural envelopes incorporating automated shading louvers, ventilated rainscreens, and responsive building skins that optimise energy consumption.',
    image: '/images/hrs-aluglaze/sanand-campus.webp',
    imageCaption: 'Motorized solar louver envelope & ventilated architectural rainscreen',
    cadTag: 'DETAIL DWG-02 • MOTORIZED AEROFOIL LOUVER MATRIX',
    specs: [
      { label: 'Solar Heat Gain Coeff', value: 'SHGC < 0.22' },
      { label: 'Rotational Articulation', value: '0° to 90° tracking' },
      { label: 'Facade Cavity Depth', value: '180 mm ventilated' },
      { label: 'Automation Protocol', value: 'BMS DALI-2 interface' },
    ],
    components: [
      'Extruded aerofoil solar louvers engineered for high-altitude wind resistance',
      'Concealed mechanical linear actuator drive linkage assembly',
      'Pressure-equalised ventilated exterior rainscreen cavity',
      'Microprocessor automated sun-tracking angle algorithms',
    ],
  },
  {
    numeral: '03',
    name: 'Structural Facade Glazing',
    scope: 'Frameless glass envelopes',
    description:
      'High-strength silicone bonded exterior glazing systems delivering seamless, uninterrupted glass surfaces with engineered seismic and dead-load distribution.',
    image: '/images/hrs-aluglaze/curtain-wall-detail.webp',
    imageCaption: 'High-strength structural silicone bonding with flush sightlines',
    cadTag: 'DETAIL DWG-03 • STRUCTURAL SILICONE GLASS INTERFACE',
    specs: [
      { label: 'Structural Sealant', value: 'Two-part neutral silicone' },
      { label: 'Dead-Load Transfer', value: 'Direct mechanical setting blocks' },
      { label: 'Recessed Joint Width', value: '16 mm architectural sightline' },
      { label: 'Impact Benchmark', value: 'ASTM E1886 Missile D certified' },
    ],
    components: [
      'Factory structural silicone bite with continuous tensile batch testing',
      'Laminated safety architectural glass with 1.52mm structural PVB',
      'Recessed silicone weather joint with open-cell polyurethane backer rod',
      'Concealed stainless steel 316 mechanical secondary retention clips',
    ],
  },
  {
    numeral: '04',
    name: 'Engineered Fenestration',
    scope: 'Acoustic & thermal breaks',
    description:
      'Precision architectural sliding, casement, and tilt-turn aluminium systems with multi-point locking and thermal break profiles designed for luxury living.',
    image: '/images/geotrix/window-frames-section.webp',
    imageCaption: 'Sanand CNC milled thermal-break sliding and tilt-turn window sections',
    cadTag: 'DETAIL DWG-04 • POLYAMIDE THERMAL BREAK PROFILE EXTRUSION',
    specs: [
      { label: 'Acoustic Attenuation', value: '42 dB (Rw+Ctr)' },
      { label: 'Thermal U-Value', value: '1.6 W/m²K certified' },
      { label: 'Track Weight Rating', value: '400 kg per sliding sash' },
      { label: 'Locking Points', value: 'Multi-point perimeter shootbolts' },
    ],
    components: [
      'Polyamide 24mm glass-fibre reinforced structural thermal isolation bar',
      'Concealed heavy-duty stainless steel dual ball-bearing roller carriages',
      'Acoustic labyrinth multi-fin weatherseals and compression gaskets',
      'Interlocking slim stiles with flush-integrated floor drainage track',
    ],
  },
  {
    numeral: '05',
    name: 'Glass Railings & Balustrades',
    scope: 'Continuous base safety barriers',
    description:
      'Point-fixed, structural laminate, and recessed aluminium shoe balustrades tested to rigorous horizontal line-load and impact safety benchmarks.',
    image: '/images/hrs-aluglaze/sanand-campus.webp',
    imageCaption: 'Continuous base-shoe structural laminated architectural safety barriers',
    cadTag: 'DETAIL DWG-05 • RECESSED STRUCTURAL BASE-SHOE PROFILE',
    specs: [
      { label: 'Horizontal Line Load', value: '3.0 kN/m tested capacity' },
      { label: 'Glass Specification', value: '10+10mm toughened laminated' },
      { label: 'Anchor Embedment', value: 'M12 chemical injection anchors' },
      { label: 'Dry-Glaze System', value: 'High-torque calibrated wedge locks' },
    ],
    components: [
      'Monolithic extruded aluminium structural base-shoe channel profile',
      'Structural SentryGlas ionoplast rigid laminated interlayer',
      'Concealed continuous bottom drainage weep slots and weep sleeves',
      'Slim stainless steel 316 U-channel protective top handrail',
    ],
  },
  {
    numeral: '06',
    name: 'Southern India Operations',
    scope: 'Bengaluru hub (Geotrix)',
    description:
      'Regional engineering, fabrication, and installation delivery across Karnataka, Tamil Nadu, and Telangana via our dedicated Bengaluru subsidiary, Geotrix.',
    image: '/images/geotrix/window-frames-section.webp',
    imageCaption: 'Geotrix engineering office & site execution delivery in Bengaluru',
    cadTag: 'REGIONAL ASSET • GEOTRIX SOUTHERN INDIA ENGINEERING HUB',
    specs: [
      { label: 'Regional Coverage', value: 'Karnataka, Tamil Nadu, Telangana' },
      { label: 'Bengaluru Base', value: 'Outer Ring Road corporate hub' },
      { label: 'Site Execution', value: 'Dedicated facade installation crews' },
      { label: 'Sanand Integration', value: 'Direct CNC line fabrication supply' },
    ],
    components: [
      'Geotrix regional shop-drawing and structural calculations engineering cell',
      'Logistics synchronisation directly with Sanand automated plant',
      'Certified high-rise site installation and hoisting specialist teams',
      'On-site dynamic water infiltration and wind pressure field testing',
    ],
  },
];

const METRICS = [
  { label: 'Fabrication campus', value: 'Sanand, Gujarat', detail: 'Bavla–Sanand automated CNC lines' },
  { label: 'Engineering capacity', value: 'Up to 38 storeys', detail: 'Unitised high-rise curtain walls' },
  { label: 'Founded in Ahmedabad', value: '2012', detail: 'By Rupesh Shah & Hrishikesh Shah' },
  { label: 'Southern India hub', value: 'Bengaluru', detail: 'Geotrix engineering & site execution' },
];

export const AluglazeSpotlight: React.FC = () => {
  const [activeSystemIndex, setActiveSystemIndex] = useState(0);
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const activeSystem = SYSTEMS[activeSystemIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // 2. Explorer reveal
      if (explorerRef.current) {
        gsap.from(explorerRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: explorerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // 3. Operational scale metrics reveal with numeric roll-up
      if (metricsRef.current) {
        const metrics = metricsRef.current.querySelectorAll('.aluglaze-metric-item');
        gsap.from(metrics, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 88%',
            once: true,
          },
        });

        // Numeric counters rollup on scroll
        const counters = metricsRef.current.querySelectorAll<HTMLElement>('[data-target-value]');
        counters.forEach((el) => {
          const target = parseFloat(el.getAttribute('data-target-value') || '0');
          const startVal = parseFloat(el.getAttribute('data-start-value') || '0');
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const counterObj = { count: startVal };

          gsap.to(counterObj, {
            count: target,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(counterObj.count)}${suffix}`;
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="aluglaze"
      data-surface="ink"
      className="relative w-full bg-[var(--ink)] text-white py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden"
      aria-label="HRS Aluglaze: Precision facade and fenestration engineering"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header: Eyebrow, Display Headline, and Plain Statement */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-2 w-2 rounded-full bg-[var(--hrs-orange)] shrink-0" />
              <span className="text-xs font-semibold text-white/70">
                Built Environment • Industrial Flagship
              </span>
            </div>

            <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02] text-white">
              Engineering building envelopes for iconic <span className="text-[var(--hrs-orange)] italic">high-rise</span> scale.
            </h2>

            <p className="mt-6 text-base sm:text-lg font-normal text-white/80 max-w-2xl leading-relaxed">
              Founded in Ahmedabad in 2012, HRS Aluglaze operates automated fabrication facilities in Sanand, engineering unitised curtain walls, structural glazing, and architectural envelopes across western and southern India.
            </p>
          </div>

          {/* Outbound Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 self-start lg:self-end">
            <a
              href="https://hrsaluglaze.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-white text-[var(--ink)] hover:bg-[var(--hrs-orange)] hover:text-white px-6 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300"
            >
              <span>Visit hrsaluglaze.com</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-current/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <Link
              href="/businesses/hrs-aluglaze"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition-colors underline underline-offset-4"
            >
              <span>Group directory</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-70" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE ARCHITECTURAL FACADE EXPLORER
            Blueprint CAD Anatomy & Real Plant Assembly Visualizer
           ========================================================================= */}
        <div ref={explorerRef} className="my-12 p-6 sm:p-8 lg:p-10 border border-white/20 bg-white/[0.02]">
          {/* Top Switcher Bar */}
          <div className="flex flex-col gap-4 border-b border-white/15 pb-6">
            {/* Top Meta Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--hrs-orange)] bg-[var(--hrs-orange)]/10 px-2.5 py-0.5">
                  Architectural Anatomy
                </span>
                <span className="text-xs text-white/60">
                  {activeSystem.cadTag}
                </span>
              </div>

              <span className="text-xs font-semibold text-white/50 tracking-wider uppercase">
                System 0{activeSystemIndex + 1} of 06 • Sanand Fabrication
              </span>
            </div>

            {/* Dedicated 6-System Segmented Switcher (All 6 systems 100% visible) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2" role="tablist" aria-label="Select facade system">
              {SYSTEMS.map((item, idx) => {
                const isActive = activeSystemIndex === idx;
                return (
                  <button
                    key={item.numeral}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => {
                      setActiveSystemIndex(idx);
                      setActiveComponentIndex(0);
                    }}
                    className={`text-xs font-semibold p-2.5 rounded transition-all cursor-pointer text-left border flex flex-col justify-between ${
                      isActive
                        ? 'bg-white text-[var(--ink)] border-white shadow-md'
                        : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className={`text-[10px] font-mono tabular-nums mb-1 block ${isActive ? 'text-[var(--hrs-orange)] font-bold' : 'text-white/40'}`}>
                      {item.numeral}
                    </span>
                    <span className="leading-snug line-clamp-2">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Split View: Left CAD Blueprint Specs, Right Plant Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Left: Component Breakdown & Telemetry (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-['Bricolage_Grotesque'] text-4xl font-extrabold text-[var(--hrs-orange)] tabular-nums">
                    {activeSystem.numeral}
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold text-white">
                    {activeSystem.name}
                  </h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed max-w-xl">
                  {activeSystem.description}
                </p>
              </div>

              {/* Interactive Component Callouts */}
              <div className="space-y-2 border-t border-white/15 pt-5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-2">
                  Engineering Component Stack (Select to inspect)
                </span>
                <div className="space-y-1.5">
                  {activeSystem.components.map((comp, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => setActiveComponentIndex(cIdx)}
                      className={`w-full text-left p-2.5 text-xs rounded transition-colors flex items-start gap-3 cursor-pointer ${
                        activeComponentIndex === cIdx
                          ? 'bg-white/15 text-white font-semibold border-l-2 border-[var(--hrs-orange)]'
                          : 'bg-white/[0.03] text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-white/40 tabular-nums">0{cIdx + 1}</span>
                      <span>{comp}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Engineering Performance Benchmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/15 pt-5">
                {activeSystem.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="bg-white/[0.03] p-3 border border-white/10">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">
                      {spec.label}
                    </span>
                    <span className="font-['Bricolage_Grotesque'] text-sm sm:text-base font-bold text-white mt-0.5 block tabular-nums">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real Plant Assembly Photograph with Coordinate Hairlines (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-white/20 bg-black/40 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activeSystem.image}
                  src={getAssetUrl(activeSystem.image)}
                  alt={activeSystem.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Blueprint Hairline Crosshairs */}
                <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                <div className="absolute top-3 left-3 text-[10px] font-mono text-white/70 bg-black/60 px-2 py-0.5">
                  LAT 22.98° N • LONG 72.37° E
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white bg-black/75 p-2 border-t border-white/20">
                  {activeSystem.imageCaption}
                </div>
              </div>

              {/* Sanand Campus Direct Status Bar */}
              <div className="mt-4 p-3 bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sanand Plant Active</span>
                </div>
                <span className="font-mono text-[11px] text-white/50">EN 13830 / ASTM COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing & Scale Factstrip */}
        <div ref={metricsRef} className="pt-12 sm:pt-16">
          <span className="text-xs font-semibold text-white/40 block mb-6">
            Fabrication & operational scale
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-white/15 pt-8">
            {METRICS.map((metric) => {
              const isCapacity = metric.label === 'Engineering capacity';
              const isFounded = metric.label === 'Founded in Ahmedabad';

              return (
                <div key={metric.label} className="aluglaze-metric-item space-y-1.5">
                  <span
                    className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold tracking-tight text-white tabular-nums block"
                    {...(isCapacity
                      ? {
                          'data-target-value': '38',
                          'data-start-value': '0',
                          'data-prefix': 'Up to ',
                          'data-suffix': ' storeys',
                        }
                      : isFounded
                      ? {
                          'data-target-value': '2012',
                          'data-start-value': '1995',
                        }
                      : {})}
                  >
                    {metric.value}
                  </span>
                  <h4 className="text-xs font-semibold text-white/80">
                    {metric.label}
                  </h4>
                  <p className="text-[11px] text-white/50 leading-snug">
                    {metric.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AluglazeSpotlight;
