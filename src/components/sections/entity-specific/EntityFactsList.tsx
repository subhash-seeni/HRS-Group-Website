'use client';

import React, { useRef, useState, useEffect } from 'react';

interface FactItem {
  label: string;
  value: React.ReactNode;
}

interface EntityFactsListProps {
  facts: FactItem[];
}

export const EntityFactsList: React.FC<EntityFactsListProps> = ({ facts }) => {
  const containerRef = useRef<HTMLDListElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <dl ref={containerRef} className="m-0 font-sans border-t border-[var(--rule)]">
      {facts.map((fact, idx) => {
        const isVisible = !isMounted || hasEnteredView || prefersReducedMotion;
        return (
          <div
            key={fact.label}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${
                idx * 80
              }ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 80}ms`,
            }}
            className="py-5 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
          >
            <dt className="sm:col-span-4 text-[15px] text-[var(--muted)] font-normal m-0">
              {fact.label}
            </dt>
            <dd className="sm:col-span-8 text-[16px] text-[var(--ink)] m-0">
              {fact.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
