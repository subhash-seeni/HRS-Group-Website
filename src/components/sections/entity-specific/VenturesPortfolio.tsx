'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion';
import { projects } from '@/content/projects';

export const VenturesPortfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'residential' | 'villa' | 'commercial' | 'joint-venture'>('All');
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

  // Filter Hrishikesh Ventures projects
  const venturesProjects = projects.filter((p) => p.entitySlug === 'hrishikesh-ventures');

  const filteredProjects = venturesProjects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'villa') {
      return p.slug === 'kishor-park' || p.slug === 'hrishikesh-villa';
    }
    if (filter === 'residential') {
      return p.typology === 'residential' && p.slug !== 'kishor-park' && p.slug !== 'hrishikesh-villa';
    }
    return p.typology === filter;
  });

  const jvProject = venturesProjects.find((p) => p.typology === 'joint-venture');

  const projectImages: Record<string, string> = {
    'h1': '/images/hrishikesh-ventures/residential-tower.webp',
    'h2': '/images/hrishikesh-ventures/h2-residential.webp',
    'h9': '/images/hrishikesh-ventures/residential-tower.webp',
    'kishor-park': '/images/hrishikesh-ventures/residential-tower.webp',
    'hrishikesh-villa': '/images/hrishikesh-ventures/residential-tower.webp',
  };

  const hoveredProj = venturesProjects.find((p) => p.slug === hoveredSlug);
  const hoveredImageSrc = hoveredProj
    ? projectImages[hoveredProj.slug] || '/images/hrishikesh-ventures/residential-tower.webp'
    : '';

  return (
    <Section surface="white" id="portfolio" className="space-y-24 md:space-y-36 relative">
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-12">
            <div>
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Development portfolio" />
              <p className="text-[14px] text-[var(--muted)] font-sans mt-1.5 m-0">
                13 live residential and commercial developments across Ahmedabad corridors.
              </p>
            </div>

            {/* Filter buttons */}
            <div
              role="tablist"
              aria-label="Filter developments by typology"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] font-sans"
            >
              {[
                { label: 'All (13)', value: 'All' },
                { label: 'Residential apartments', value: 'residential' },
                { label: 'Plotted villas', value: 'villa' },
                { label: 'Commercial offices', value: 'commercial' },
                { label: 'Joint ventures', value: 'joint-venture' },
              ].map((opt) => {
                const isActive = filter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(opt.value as any)}
                    className={`inline-flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer transition-colors duration-150 ${
                      isActive ? 'text-[var(--ink)] font-medium' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {isActive ? <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block" /> : null}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Development rows with Hover Image Preview */}
          <div className="border-t border-[var(--rule)] font-sans">
            {filteredProjects.map((p) => {
              const isJV = p.typology === 'joint-venture' || p.slug === 'h9';
              const isHovered = hoveredSlug === p.slug;
              const isDimmed = hoveredSlug !== null && !isHovered;

              return (
                <div
                  key={p.slug}
                  onMouseEnter={() => {
                    if (!isTouchDevice) setHoveredSlug(p.slug);
                  }}
                  onMouseLeave={() => {
                    if (!isTouchDevice) setHoveredSlug(null);
                  }}
                  style={{
                    opacity: isDimmed ? 0.4 : 1,
                    transition: 'opacity 250ms ease',
                  }}
                  className={`py-6 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group hover:bg-[var(--paper)] transition-colors px-2 -mx-2 ${
                    isJV ? 'bg-[var(--paper)]/50' : ''
                  }`}
                >
                  <div className="md:col-span-4 flex items-baseline gap-3">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                    <Link
                      href={`/projects/${p.slug}`}
                      style={{
                        transform:
                          isHovered && !prefersReducedMotion && !isTouchDevice
                            ? 'translateX(8px)'
                            : 'translateX(0)',
                        transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className="font-serif text-[21px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)] inline-block"
                    >
                      {p.name}
                    </Link>

                    {/* H9 carries a small 'Joint venture' label in orange */}
                    {isJV && (
                      <span className="text-[11.5px] font-sans font-medium text-[var(--orange)] border border-[var(--orange)] px-2 py-0.5 rounded-[2px] shrink-0">
                        Joint venture
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-4 space-y-1">
                    <div className="text-[14px] text-[var(--ink)]">
                      {p.location}
                    </div>
                    <div className="text-[13px] text-[var(--muted)]">
                      {p.scale}
                    </div>
                  </div>

                  <div className="md:col-span-2 text-[13.5px] text-[var(--muted)] flex items-center gap-1.5">
                    <span>{p.yearCompletedOrStatus}</span>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4 text-right">
                    <Link
                      href={`/contact?entity=hrishikesh-ventures&project=${p.slug}`}
                      className="link-editorial text-[13.5px]"
                    >
                      Enquire
                    </Link>
                    <span
                      style={{
                        transform:
                          isHovered && !prefersReducedMotion && !isTouchDevice
                            ? 'translateX(4px)'
                            : 'translateX(-4px)',
                        transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className={isHovered ? 'text-[var(--orange)] opacity-100' : 'text-[var(--ink)] opacity-0'}
                    >
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Distinct H9 Joint Venture Callout Strip (When not filtered out) */}
          {filter === 'All' && jvProject ? (
            <div className="mt-12 p-6 md:p-8 border border-[var(--rule)] bg-[var(--paper)] font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-[var(--orange)]">
                    Joint venture partnership
                  </span>
                </div>
                <h3 className="font-serif text-[20px] text-[var(--ink)] font-normal m-0">
                  {jvProject.name} &bull; {jvProject.location}
                </h3>
                <p className="text-[14px] text-[var(--muted)] m-0">
                  {jvProject.description}
                </p>
              </div>

              <Link
                href={`/projects/${jvProject.slug}`}
                className="link-editorial text-[14.5px] flex-shrink-0"
              >
                View partnership particulars
              </Link>
            </div>
          ) : null}
        </Container>
      </section>

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
          {hoveredProj && (
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
    </Section>
  );
};
