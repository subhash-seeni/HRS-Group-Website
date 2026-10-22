'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion';
import { brands } from '@/content/brands';

interface ConsumerProductsSectionsProps {
  manprasData?: {
    storeDescription: string;
    storeFeatures: string[];
    packagedDescription: string;
    packagedCategories: string[];
  };
}

export const ConsumerProductsSections: React.FC<ConsumerProductsSectionsProps> = ({ manprasData }) => {
  const consumerBrands = brands.filter((b) => b.parentEntitySlug === 'hrishikesh-consumer-products');
  const activeBrands = consumerBrands.filter((b) => b.status === 'active');
  const upcomingBrands = consumerBrands.filter((b) => b.status === 'reserved');

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetCursorPos, setTargetCursorPos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animFrameRef = useRef<number | null>(null);

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

  const brandImageMap: Record<string, string> = {
    'manpras': '/images/hrishikesh-consumer-products/manpras-store.webp',
    'snackshot': '/images/firstgen/south-indian-breakfast.webp',
    'antrah': '/images/hrishikesh-food-products/whole-spices-stone.webp',
    'basic-essentials': '/images/firstgen/south-indian-breakfast.webp',
    'gush': '/images/hrishikesh-food-products/whole-spices-stone.webp',
    'daily-pump': '/images/firstgen/south-indian-breakfast.webp',
  };

  const hoveredBrand = consumerBrands.find((b) => b.slug === hoveredSlug);
  const hoveredImageSrc = hoveredBrand
    ? brandImageMap[hoveredBrand.slug] || '/images/hrishikesh-consumer-products/manpras-store.webp'
    : '';

  return (
    <div id="brands-portfolio" className="space-y-0 relative">
      {/* 1. Dedicated Manpras Section on White Surface with Two Large Images */}
      {manprasData ? (
        <Section surface="white" className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="space-y-14">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div>
                  <span className="text-[13.5px] text-[var(--muted)] font-sans block">
                    Flagship consumer retail
                  </span>
                  <SplitHeading as="h2" className="text-heading-1 text-[var(--ink)] font-normal m-0 mt-1" text="Manpras: Neighbourhood Stores & Packaged Range" />
                </div>
                <Link href="/brands/manpras" className="link-editorial text-[15px] font-sans">
                  Manpras brand profile &rarr;
                </Link>
              </div>

              {/* Two Large Images: Store and Packaged Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <figure className="space-y-3 m-0">
                  <div className="relative w-full aspect-[16/10] bg-[var(--slot)] overflow-hidden rounded-[2px] border border-[var(--rule)]">
                    <Image
                      src="/images/hrishikesh-consumer-products/manpras-store.webp"
                      alt="Manpras Neighbourhood Grocery Store in Ahmedabad"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-[13.5px] text-[var(--muted)] font-sans">
                    The Neighbourhood Grocery Store &bull; Bodakdev retail layout
                  </figcaption>
                </figure>

                <figure className="space-y-3 m-0">
                  <div className="relative w-full aspect-[16/10] bg-[var(--slot)] overflow-hidden rounded-[2px] border border-[var(--rule)]">
                    <Image
                      src="/images/hrishikesh-food-products/whole-spices-stone.webp"
                      alt="Manpras Packaged Spices and Staples Range"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-[13.5px] text-[var(--muted)] font-sans">
                    The Packaged Consumer Range &bull; Direct kitchen consumer pouches
                  </figcaption>
                </figure>
              </div>

              {/* Pillars Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans pt-4 border-t border-[var(--rule)]">
                {/* Pillar 1: Neighbourhood Store */}
                <div className="space-y-4 pr-0 md:pr-6">
                  <h3 className="font-serif text-[22px] text-[var(--ink)] font-normal m-0">
                    The Neighbourhood Grocery Store
                  </h3>
                  <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0">
                    {manprasData.storeDescription}
                  </p>
                  <ul className="m-0 p-0 list-none space-y-2 pt-2 text-[14.5px] text-[var(--ink)]">
                    {manprasData.storeFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block mt-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pillar 2: Packaged Range */}
                <div className="space-y-4 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-10">
                  <h3 className="font-serif text-[22px] text-[var(--ink)] font-normal m-0">
                    The Packaged Consumer Range
                  </h3>
                  <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0">
                    {manprasData.packagedDescription}
                  </p>
                  <ul className="m-0 p-0 list-none space-y-2 pt-2 text-[14.5px] text-[var(--ink)]">
                    {manprasData.packagedCategories.map((cat) => (
                      <li key={cat} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block mt-2 flex-shrink-0" />
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 2. All 13 Brands: Active Group with Hover Previews on Stone Surface */}
      <Section surface="stone" className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start mb-12">
            <div className="col-span-12 md:col-span-3">
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Active brands" />
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Retail goods currently distributed across Gujarat and western India.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {activeBrands.map((b) => {
                const isHovered = hoveredSlug === b.slug;
                const isDimmed = hoveredSlug !== null && !isHovered;

                return (
                  <div
                    key={b.slug}
                    onMouseEnter={() => {
                      if (!isTouchDevice) setHoveredSlug(b.slug);
                    }}
                    onMouseLeave={() => {
                      if (!isTouchDevice) setHoveredSlug(null);
                    }}
                    style={{
                      opacity: isDimmed ? 0.4 : 1,
                      transition: 'opacity 250ms ease',
                    }}
                    className="py-6 border-b border-[var(--rule)] grid grid-cols-12 gap-4 items-baseline group hover:bg-[var(--paper)] transition-colors px-2 -mx-2"
                  >
                    <div className="col-span-12 sm:col-span-4 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                      <Link
                        href={`/brands/${b.slug}`}
                        style={{
                          transform:
                            isHovered && !prefersReducedMotion && !isTouchDevice
                              ? 'translateX(8px)'
                              : 'translateX(0)',
                          transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        className="font-serif text-[20px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)]"
                      >
                        {b.name}
                      </Link>
                    </div>

                    <div className="col-span-12 sm:col-span-5 text-[14.5px] text-[var(--muted)]">
                      {b.description}
                    </div>

                    <div className="col-span-12 sm:col-span-3 text-right flex items-center justify-between sm:justify-end gap-3 text-[13.5px] text-[var(--muted)]">
                      <span>{b.category}</span>
                      <span
                        style={{
                          transform:
                            isHovered && !prefersReducedMotion && !isTouchDevice
                              ? 'translateX(4px)'
                              : 'translateX(-4px)',
                          transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        className={`flex-shrink-0 ${
                          isHovered ? 'text-[var(--orange)] opacity-100' : 'text-[var(--ink)] opacity-0'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Upcoming Brands: Set in Lighter Ink on White Surface */}
      <Section surface="white" className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3">
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Upcoming portfolios" />
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Seven registered trade marks currently undergoing recipe formulation.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {upcomingBrands.map((b) => (
                <div
                  key={b.slug}
                  className="py-5 border-b border-[var(--rule)] grid grid-cols-12 gap-4 items-baseline group opacity-65 hover:opacity-100 transition-opacity"
                >
                  <div className="col-span-12 sm:col-span-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-transparent inline-block flex-shrink-0" />
                    <Link
                      href={`/brands/${b.slug}`}
                      className="font-serif text-[19px] text-[var(--ink)]/80 group-hover:underline underline-offset-4 decoration-[var(--orange)]"
                    >
                      {b.name}
                    </Link>
                  </div>

                  <div className="col-span-12 sm:col-span-5 text-[14px] text-[var(--muted)]">
                    {b.description}
                  </div>

                  <div className="col-span-12 sm:col-span-3 text-right flex items-center justify-between sm:justify-end gap-3 text-[13px] text-[var(--muted)]">
                    <span className="italic">Reserved Trademark</span>
                    <Link
                      href={`/brands/${b.slug}`}
                      className="text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

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
          {hoveredBrand && (
            <div className="relative w-full h-full">
              <Image
                src={hoveredImageSrc}
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

