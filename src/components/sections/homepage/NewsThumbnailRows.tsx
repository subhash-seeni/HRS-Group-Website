'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { news } from '@/content/news';
import { imageRegistry } from '@/content/images';

export const NewsThumbnailRows: React.FC = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const touchCheck =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touchCheck);
  }, []);

  const items = news.slice(0, 3);

  const getEntityThumbnail = (entitySlug?: string) => {
    if (!entitySlug) return '/images/group/ahmedabad-skyline.webp';
    return imageRegistry[entitySlug]?.src || '/images/group/ahmedabad-skyline.webp';
  };

  const getEntityName = (entitySlug?: string) => {
    switch (entitySlug) {
      case 'school-of-facade-technologies':
        return 'School of Facade Technologies';
      case 'geotrix':
        return 'Geotrix Pvt. Ltd.';
      case 'hrishikesh-ventures':
        return 'Hrishikesh Ventures';
      default:
        return 'Hrishikesh Food Products';
    }
  };

  return (
    <Section surface="white" className="py-24 md:py-36 border-t border-[var(--rule)]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12">
          <SplitHeading
            as="h2"
            className="text-heading-1 text-[var(--ink)] font-normal"
            text="News"
          />
          <Link href="/news" className="link-editorial text-[15.5px]">
            All news
          </Link>
        </div>

        <div className="border-t border-[var(--rule)]">
          {items.map((item) => {
            const isHovered = hoveredSlug === item.slug;
            const thumbSrc = getEntityThumbnail(item.entitySlug);

            return (
              <article
                key={item.slug}
                onMouseEnter={() => {
                  if (!isTouchDevice) setHoveredSlug(item.slug);
                }}
                onMouseLeave={() => {
                  if (!isTouchDevice) setHoveredSlug(null);
                }}
                className="py-6 border-b border-[var(--rule)] grid grid-cols-12 gap-4 md:gap-6 items-center group relative overflow-hidden"
              >
                {/* Date (Cols 1-3) - STAYS STILL */}
                <div className="col-span-12 sm:col-span-3 text-[14px] text-[var(--muted)] font-sans">
                  {item.date}
                </div>

                {/* Headline (Cols 4-8) - MOVES 8px RIGHT ON HOVER */}
                <div className="col-span-12 sm:col-span-6 min-w-0">
                  <div
                    style={{
                      transform:
                        isHovered && !prefersReducedMotion && !isTouchDevice
                          ? 'translateX(8px)'
                          : 'translateX(0)',
                      transition:
                        'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <Link
                      href={`/news/${item.slug}`}
                      onFocus={() => {
                        if (!isTouchDevice) setHoveredSlug(item.slug);
                      }}
                      onBlur={() => {
                        if (!isTouchDevice) setHoveredSlug(null);
                      }}
                      className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] block leading-snug"
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>

                {/* Business Name (Cols 9-12) - STAYS STILL + 3:2 Thumbnail Slides in from Right */}
                <div className="col-span-12 sm:col-span-3 sm:text-right text-[13.5px] text-[var(--muted)] font-sans flex items-center sm:justify-end gap-4 relative">
                  <span className="truncate">{getEntityName(item.entitySlug)}</span>

                  {/* 3:2 thumbnail sliding in from right */}
                  <div
                    aria-hidden="true"
                    style={{
                      opacity: isHovered && !prefersReducedMotion && !isTouchDevice ? 1 : 0,
                      transform:
                        isHovered && !prefersReducedMotion && !isTouchDevice
                          ? 'translateX(0)'
                          : 'translateX(24px)',
                      transition:
                        'opacity 250ms ease, transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className="hidden sm:block relative w-[90px] h-[60px] aspect-[3/2] flex-shrink-0 overflow-hidden bg-[var(--slot)] border border-[var(--rule)] rounded-[2px]"
                  >
                    <Image
                      src={thumbSrc}
                      alt=""
                      fill
                      sizes="90px"
                      className="object-cover"
                    />
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden sm:inline flex-shrink-0" />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
