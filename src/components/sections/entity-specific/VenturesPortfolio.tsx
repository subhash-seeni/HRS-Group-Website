'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { projects } from '@/content/projects';

export const VenturesPortfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'residential' | 'villa' | 'commercial' | 'joint-venture'>('All');

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

  return (
    <div id="portfolio" className="space-y-24 md:space-y-36">
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-12">
            <div>
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Development portfolio
              </h2>
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

          {/* Development rows */}
          <div className="border-t border-[var(--rule)] font-sans">
            {filteredProjects.map((p) => {
              const isJV = p.typology === 'joint-venture';

              return (
                <div
                  key={p.slug}
                  className={`py-6 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group ${
                    isJV ? 'bg-[var(--paper)] px-4 md:px-6' : ''
                  }`}
                >
                  <div className="md:col-span-3 flex items-baseline gap-3">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-serif text-[21px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)]"
                    >
                      {p.name}
                    </Link>
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

                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6 text-right">
                    <Link
                      href={`/contact?entity=hrishikesh-ventures&project=${p.slug}`}
                      className="link-editorial text-[13.5px]"
                    >
                      Enquire
                    </Link>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                    </Link>
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
                  <span className="text-[12px] uppercase tracking-wider text-[var(--muted)]">
                    Joint Venture Partnership
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
    </div>
  );
};
