'use client';

import React, { useState, useEffect } from 'react';

interface OfferingItem {
  title: string;
  description: string;
}

interface EntityOfferingsListProps {
  offerings: OfferingItem[];
}

export const EntityOfferingsList: React.FC<EntityOfferingsListProps> = ({ offerings }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <div className="border-t border-[var(--rule)]">
      {offerings.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <div
            key={item.title}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              backgroundColor: isHovered ? 'var(--orange-wash, #FFF1E3)' : 'transparent',
              transition: 'background-color 200ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="py-6 px-4 -mx-4 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline rounded-[2px]"
          >
            <div className="sm:col-span-4 flex items-baseline gap-3">
              <span className="font-serif text-[24px] md:text-[28px] text-[var(--orange)] tabular-nums lining-nums leading-none font-normal shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  transform:
                    isHovered && !prefersReducedMotion
                      ? 'translateX(8px)'
                      : 'translateX(0)',
                  transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                className="font-serif text-[19px] md:text-[20px] text-[var(--ink)] font-normal inline-block"
              >
                {item.title}
              </span>
            </div>
            <div className="sm:col-span-8">
              <p className="text-[15.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
