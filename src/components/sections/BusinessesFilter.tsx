'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { WideLogoSlot } from '@/components/ui/WideLogoSlot';
import { entities } from '@/content/entities';
import { imageRegistry } from '@/content/images';
import { Entity } from '@/content/types';

export type FilterCategory =
  | 'All'
  | 'Construction and facades'
  | 'Homes and property'
  | 'Food and groceries'
  | 'Hospitality and retail'
  | 'Brand services';

interface BusinessRowItem {
  id: string;
  name: string;
  slug: string;
  subtier?: string;
  description: string;
  meta: string;
  sector: string;
  categories: FilterCategory[];
  imageSrc: string;
}

export const BusinessesFilter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetCursorPos, setTargetCursorPos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  const filterOptions: FilterCategory[] = [
    'All',
    'Construction and facades',
    'Homes and property',
    'Food and groceries',
    'Hospitality and retail',
    'Brand services',
  ];

  // Helper lookups from content data
  const getEntity = (slug: string): Entity | undefined =>
    entities.find((e) => e.slug === slug);

  const hrishikeshVentures = getEntity('hrishikesh-ventures')!;
  const hrsAluglaze = getEntity('hrs-aluglaze')!;
  const geotrix = getEntity('geotrix')!;
  const soft = getEntity('school-of-facade-technologies')!;
  const foodProducts = getEntity('hrishikesh-food-products')!;
  const consumerProducts = getEntity('hrishikesh-consumer-products')!;
  const firstgenAssets = getEntity('firstgen-assets')!;
  const firstgenHotels = getEntity('firstgen-hotels')!;
  const firstgenEnterprises = getEntity('firstgen-enterprises')!;
  const indianBrandHouse = getEntity('indian-brand-house')!;

  const allItems: BusinessRowItem[] = [
    {
      id: 'hrishikesh-ventures',
      name: hrishikeshVentures.name,
      slug: hrishikeshVentures.slug,
      description: hrishikeshVentures.summary,
      meta: 'Ahmedabad • 13 live developments',
      sector: 'Built Environment',
      categories: ['All', 'Homes and property'],
      imageSrc: imageRegistry['hrishikesh-ventures']?.src || '/images/hrishikesh-ventures/residential-tower.webp',
    },
    {
      id: 'hrs-aluglaze',
      name: hrsAluglaze.name,
      slug: hrsAluglaze.slug,
      description: hrsAluglaze.summary,
      meta: 'Sanand • 450,000 sq m capacity',
      sector: 'Built Environment',
      categories: ['All', 'Construction and facades'],
      imageSrc: imageRegistry['hrs-aluglaze']?.src || '/images/hrs-aluglaze/curtain-wall-detail.webp',
    },
    {
      id: 'geotrix',
      name: geotrix.name,
      slug: geotrix.slug,
      subtier: 'HRS Aluglaze South India division',
      description: `${geotrix.summary} Operates as Aluglaze South India arm.`,
      meta: 'Bengaluru • South India operations',
      sector: 'Built Environment',
      categories: ['All', 'Construction and facades'],
      imageSrc: imageRegistry['geotrix']?.src || '/images/geotrix/window-frames-section.webp',
    },
    {
      id: 'school-of-facade-technologies',
      name: soft.name,
      slug: soft.slug,
      description: soft.summary,
      meta: 'Ahmedabad • Education & skilling',
      sector: 'Built Environment',
      categories: ['All', 'Construction and facades'],
      imageSrc: imageRegistry['school-of-facade-technologies']?.src || '/images/school-of-facade-technologies/workshop-benches.webp',
    },
    {
      id: 'hrishikesh-food-products',
      name: foodProducts.name,
      slug: foodProducts.slug,
      description: foodProducts.summary,
      meta: 'Bavla • Job work & white labelling',
      sector: 'Food and Consumer',
      categories: ['All', 'Food and groceries'],
      imageSrc: imageRegistry['hrishikesh-food-products']?.src || '/images/hrishikesh-food-products/whole-spices-stone.webp',
    },
    {
      id: 'hrishikesh-consumer-products',
      name: consumerProducts.name,
      slug: consumerProducts.slug,
      description: consumerProducts.summary,
      meta: 'Gujarat • 13 product brands',
      sector: 'Food and Consumer',
      categories: ['All', 'Food and groceries'],
      imageSrc: imageRegistry['hrishikesh-consumer-products']?.src || '/images/hrishikesh-consumer-products/manpras-store.webp',
    },
    {
      id: 'firstgen-assets',
      name: firstgenAssets.name,
      slug: firstgenAssets.slug,
      subtier: 'FirstGen commercial division',
      description: firstgenAssets.summary,
      meta: 'Ahmedabad • 380,000 sq ft managed',
      sector: 'Hospitality, Leasing and Retail',
      categories: ['All', 'Hospitality and retail', 'Homes and property'],
      imageSrc: imageRegistry['firstgen-assets']?.src || '/images/firstgen/service-apartment.webp',
    },
    {
      id: 'firstgen-hotels',
      name: firstgenHotels.name,
      slug: firstgenHotels.slug,
      subtier: 'FirstGen hospitality division',
      description: `${firstgenHotels.summary} Operating Flight Stays and Amuktamalyada.`,
      meta: 'Bengaluru • Flight Stays & Amuktamalyada',
      sector: 'Hospitality, Leasing and Retail',
      categories: ['All', 'Hospitality and retail'],
      imageSrc: imageRegistry['firstgen-hotels']?.src || '/images/firstgen/south-indian-breakfast.webp',
    },
    {
      id: 'firstgen-enterprises',
      name: firstgenEnterprises.name,
      slug: firstgenEnterprises.slug,
      subtier: 'FirstGen retail division',
      description: `${firstgenEnterprises.summary} Operating The Bluprint and ShubhVista.`,
      meta: 'Ahmedabad • The Bluprint & ShubhVista',
      sector: 'Hospitality, Leasing and Retail',
      categories: ['All', 'Hospitality and retail'],
      imageSrc: imageRegistry['firstgen-enterprises']?.src || '/images/group/corporate-lobby.webp',
    },
    {
      id: 'indian-brand-house',
      name: indianBrandHouse.name,
      slug: indianBrandHouse.slug,
      description: indianBrandHouse.summary,
      meta: 'Bodakdev • Strategy & creative studio',
      sector: 'Services',
      categories: ['All', 'Brand services'],
      imageSrc: imageRegistry['indian-brand-house']?.src || '/images/indian-brand-house/studio-desk.webp',
    },
  ];

  // Device and motion detection
  useEffect(() => {
    setIsMounted(true);
    const touchCheck =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touchCheck);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
  }, []);

  // Smooth cursor follow with lerp
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const smoothStep = () => {
      setCursorPos((prev) => {
        const dx = targetCursorPos.x - prev.x;
        const dy = targetCursorPos.y - prev.y;
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });
      animFrameRef.current = requestAnimationFrame(smoothStep);
    };

    animFrameRef.current = requestAnimationFrame(smoothStep);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetCursorPos, isTouchDevice, prefersReducedMotion]);

  // Filter items
  const filteredItems = allItems.filter((item) =>
    item.categories.includes(activeFilter)
  );

  // Group by sector while preserving 12-column layout
  const sectors = Array.from(new Set(filteredItems.map((i) => i.sector)));

  const hoveredItem = allItems.find((i) => i.slug === hoveredSlug);

  return (
    <div className="space-y-12 relative">
      {/* Plain Text Filter Bar */}
      <div
        role="tablist"
        aria-label="Filter businesses by category"
        className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-4 text-[15.5px] font-sans relative"
      >
        {filterOptions.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`relative py-1 bg-transparent border-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px] ${
                isActive
                  ? 'text-[var(--ink)] font-medium'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              <span>{filter}</span>
              {isActive && (
                <motion.div
                  layoutId="businesses-filter-underline"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[var(--orange)]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Sector Groups with 400ms Layout Reordering Animation */}
      <motion.div layout className="space-y-20 md:space-y-24">
        {sectors.map((sectorName) => {
          const sectorItems = filteredItems.filter((i) => i.sector === sectorName);
          const isHospitality = sectorName === 'Hospitality, Leasing and Retail';

          return (
            <motion.div
              key={sectorName}
              layout
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-6 items-start"
            >
              {/* Sector Header (Cols 1-3) */}
              <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
                <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] block">
                  {sectorName}
                </span>
                <span className="text-[13px] text-[var(--muted)] font-sans mt-1 block">
                  {sectorName === 'Built Environment'
                    ? 'Facade engineering, developments, and technical education'
                    : sectorName === 'Food and Consumer'
                    ? 'Contract manufacturing and packaged consumer goods'
                    : sectorName === 'Hospitality, Leasing and Retail'
                    ? 'Commercial assets, executive residences, and trade retail'
                    : 'Brand communications and identity systems'}
                </span>
              </div>

              {/* Rows (Cols 4-12) */}
              <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
                {isHospitality && (
                  <div className="py-3.5 border-b border-[var(--rule)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                      <span className="font-serif text-[19px] md:text-[20px] text-[var(--ink)] font-normal">
                        FirstGen Pvt. Ltd.
                      </span>
                      <span className="text-[12.5px] text-[var(--muted)] font-sans">
                        • Umbrella entity
                      </span>
                    </div>
                    <span className="text-[13px] text-[var(--muted)] font-sans">
                      Operating divisions below
                    </span>
                  </div>
                )}

                <AnimatePresence mode="popLayout">
                  {sectorItems.map((item) => {
                    const isHovered = hoveredSlug === item.slug;
                    const isDimmed = hoveredSlug !== null && !isHovered;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isDimmed ? 0.4 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => {
                          if (!isTouchDevice) setHoveredSlug(item.slug);
                        }}
                        onMouseLeave={() => {
                          if (!isTouchDevice) setHoveredSlug(null);
                        }}
                        className="block w-full border-b border-[var(--rule)] transition-colors duration-150 hover:bg-[var(--paper)]"
                      >
                        <Link
                          href={`/businesses/${item.slug}`}
                          onFocus={() => {
                            if (!isTouchDevice) setHoveredSlug(item.slug);
                          }}
                          onBlur={() => {
                            if (!isTouchDevice) setHoveredSlug(null);
                          }}
                          className="block w-full text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                        >
                          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-6 items-start py-5 md:py-6 text-left group">
                            {/* Column 1: Wide Logo Slot (Cols 1-2 on desktop) */}
                            <div className="md:col-span-2 flex items-center md:items-start pt-0.5 flex-shrink-0">
                              <WideLogoSlot title={item.name} />
                            </div>

                            {/* Column 2: Name (shifts 8px right on hover) */}
                            <div className="md:col-span-3 min-w-0">
                              <h3
                                style={{
                                  transform:
                                    isHovered && !prefersReducedMotion && !isTouchDevice
                                      ? 'translateX(8px)'
                                      : 'translateX(0)',
                                  transition:
                                    'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                                className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] tracking-tight leading-snug m-0"
                              >
                                {item.name}
                              </h3>
                              {item.subtier ? (
                                <span className="text-[12.5px] text-[var(--muted)] font-sans block mt-1 leading-normal">
                                  {item.subtier}
                                </span>
                              ) : null}
                            </div>

                            {/* Column 3: Description */}
                            <div className="md:col-span-4 space-y-1.5 min-w-0">
                              <p className="text-[15px] md:text-[15.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
                                {item.description}
                              </p>
                            </div>

                            {/* Column 4: Metadata & Animated Arrow */}
                            <div className="md:col-span-3 flex items-start md:items-center justify-between md:justify-end gap-3 text-right pt-0.5">
                              <span className="text-[13.5px] text-[var(--muted)] font-sans leading-normal">
                                {item.meta}
                              </span>

                              {/* Arrow slides in and turns orange */}
                              <span
                                style={{
                                  transform:
                                    isHovered && !prefersReducedMotion && !isTouchDevice
                                      ? 'translateX(4px)'
                                      : 'translateX(-4px)',
                                  transition:
                                    'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms ease',
                                }}
                                className={`flex-shrink-0 ${
                                  isHovered
                                    ? 'text-[var(--orange)] opacity-100'
                                    : 'text-[var(--ink)] opacity-60'
                                }`}
                              >
                                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floating 4:5 Cursor-Following Image Preview */}
      {isMounted && !isTouchDevice && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: `${cursorPos.x + 28}px`,
            top: `${cursorPos.y - 140}px`,
            width: '280px',
            pointerEvents: 'none',
            zIndex: 60,
            opacity: hoveredSlug ? 1 : 0,
            transform: hoveredSlug ? 'scale(1)' : 'scale(0.96)',
            transition: 'opacity 250ms ease-out, transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="aspect-[4/5] overflow-hidden bg-[var(--stone)] border border-[var(--ink)]"
        >
          {hoveredItem && (
            <div className="relative w-full h-full">
              <Image
                src={hoveredItem.imageSrc}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
