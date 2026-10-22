'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Entity } from '@/content/types';
import { imageRegistry } from '@/content/images';
import { WideLogoSlot } from '@/components/ui/WideLogoSlot';

interface EntityRelatedRowsProps {
  relatedList: Entity[];
}

export const EntityRelatedRows: React.FC<EntityRelatedRowsProps> = ({ relatedList }) => {
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

  const hoveredEntity = relatedList.find((e) => e.slug === hoveredSlug);
  const hoveredImageSrc = hoveredEntity
    ? imageRegistry[hoveredEntity.slug]?.src || '/images/group/ahmedabad-skyline.webp'
    : '';

  return (
    <div className="border-t border-[var(--rule)] relative">
      {relatedList.map((rel) => {
        const isHovered = hoveredSlug === rel.slug;
        const isDimmed = hoveredSlug !== null && !isHovered;

        return (
          <div
            key={rel.slug}
            onMouseEnter={() => {
              if (!isTouchDevice) setHoveredSlug(rel.slug);
            }}
            onMouseLeave={() => {
              if (!isTouchDevice) setHoveredSlug(null);
            }}
            style={{
              opacity: isDimmed ? 0.4 : 1,
              transition: 'opacity 300ms ease',
            }}
            className="block w-full border-b border-[var(--rule)] transition-colors duration-150 hover:bg-[var(--paper)]"
          >
            <Link
              href={`/businesses/${rel.slug}`}
              onFocus={() => {
                if (!isTouchDevice) setHoveredSlug(rel.slug);
              }}
              onBlur={() => {
                if (!isTouchDevice) setHoveredSlug(null);
              }}
              className="block w-full text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-6 items-start py-5 md:py-6 text-left group">
                <div className="md:col-span-2 flex items-center md:items-start pt-0.5 flex-shrink-0">
                  <WideLogoSlot title={rel.name} />
                </div>

                <div className="md:col-span-4 min-w-0">
                  <h3
                    style={{
                      transform:
                        isHovered && !prefersReducedMotion && !isTouchDevice
                          ? 'translateX(8px)'
                          : 'translateX(0)',
                      transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] tracking-tight leading-snug m-0"
                  >
                    {rel.name}
                  </h3>
                  <span className="text-[12.5px] text-[var(--muted)] font-sans block mt-1">
                    {rel.location}
                  </span>
                </div>

                <div className="md:col-span-4 space-y-1.5 min-w-0">
                  <p className="text-[15px] leading-relaxed text-[var(--muted)] font-sans m-0">
                    {rel.summary}
                  </p>
                </div>

                <div className="md:col-span-2 flex items-start md:items-center justify-end gap-3 text-right pt-0.5">
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
          </div>
        );
      })}

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
          {hoveredEntity && (
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
