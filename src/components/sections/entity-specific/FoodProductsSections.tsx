'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';

interface FoodProductsSectionsProps {
  data: {
    models: { id: string; name: string; summary: string; points: string[] }[];
    spiceShowcase: { name: string; category: string; description: string }[];
    complianceItems: string[];
  };
}

export const FoodProductsSections: React.FC<FoodProductsSectionsProps> = ({ data }) => {
  const [activeModel, setActiveModel] = useState(data.models[0].id);

  const currentModel = data.models.find((m) => m.id === activeModel) || data.models[0];

  return (
    <div id="manufacturing-models" className="space-y-24 md:space-y-36">
      {/* 1. Three-Model Switcher (Job work, White labelling, Own ranges) */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Manufacturing operating models
              </h2>
              <p className="text-[14px] text-[var(--muted)] font-sans mt-1.5 m-0">
                Flexible processing partnerships adapted to FMCG brand owners, private labels, and food service.
              </p>
            </div>

            {/* Plain text switcher tabs */}
            <div
              role="tablist"
              aria-label="Operating models"
              className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-4 text-[15.5px] font-sans"
            >
              {data.models.map((m) => {
                const isActive = activeModel === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveModel(m.id)}
                    className={`inline-flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer transition-colors duration-150 ${
                      isActive ? 'text-[var(--ink)] font-medium' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {isActive ? (
                      <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block" />
                    ) : (
                      <span className="w-1.5 h-1.5 bg-transparent inline-block" />
                    )}
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Model Content */}
            <div className="grid grid-cols-12 gap-8 items-start font-sans">
              <div className="col-span-12 md:col-span-4 space-y-3">
                <span className="text-[12px] uppercase tracking-wider text-[var(--muted)]">
                  Operating Protocol
                </span>
                <h3 className="font-serif text-[22px] text-[var(--ink)] font-normal m-0">
                  {currentModel.name}
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0">
                  {currentModel.summary}
                </p>
              </div>

              <div className="col-span-12 md:col-span-8 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-10 space-y-4">
                <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block">
                  Process points & contractual guarantees
                </span>
                <ul className="m-0 p-0 list-none space-y-3 text-[15px] text-[var(--ink)]">
                  {currentModel.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block mt-2 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Product Range Showcase of Spices and Masalas */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start mb-12">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Product range showcase
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Single-origin ground staples and regional blended spice formulations.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {data.spiceShowcase.map((item) => (
                <div
                  key={item.name}
                  className="py-6 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
                >
                  <div className="sm:col-span-4">
                    <h3 className="font-serif text-[19px] text-[var(--ink)] font-normal m-0">
                      {item.name}
                    </h3>
                    <span className="text-[12.5px] text-[var(--muted)] block mt-0.5">
                      {item.category}
                    </span>
                  </div>
                  <div className="sm:col-span-8 text-[15px] leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Quality & Compliance Row */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-baseline font-sans">
            <div className="col-span-12 sm:col-span-3">
              <span className="text-[13px] uppercase tracking-wider text-[var(--muted)]">
                Audited Food Safety & Compliance
              </span>
            </div>
            <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-x-8 gap-y-3 text-[14.5px] text-[var(--ink)]">
              {data.complianceItems.map((comp) => (
                <div key={comp} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. 'Work With Us' Brief CTA */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="p-8 md:p-12 border border-[var(--rule)] bg-[var(--paper)] font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--orange)]" />
                <h3 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  Submit a contract manufacturing brief
                </h3>
              </div>
              <p className="text-[15.5px] text-[var(--muted)] m-0 max-w-[54ch]">
                Discuss annual batch quantities, private label dieline packaging, or toll milling scopes directly with our Bavla operations team.
              </p>
            </div>

            <Link
              href="/contact?entity=hrishikesh-food-products&subject=Contract manufacturing brief"
              className="link-editorial text-[16px] flex-shrink-0"
            >
              Work with us
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};
