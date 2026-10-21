'use client';

import React, { useState } from 'react';
import { Row } from '@/components/ui/Row';
import { entities } from '@/content/entities';
import { Entity } from '@/content/types';

export type FilterCategory =
  | 'All'
  | 'Construction and facades'
  | 'Homes and property'
  | 'Food and groceries'
  | 'Hospitality and retail'
  | 'Brand services';

export const BusinessesFilter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

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

  // Determine which sector groups to show based on filter
  const showBuiltEnv =
    activeFilter === 'All' ||
    activeFilter === 'Construction and facades' ||
    activeFilter === 'Homes and property';

  const showFoodConsumer =
    activeFilter === 'All' || activeFilter === 'Food and groceries';

  const showHospitalityRetail =
    activeFilter === 'All' ||
    activeFilter === 'Hospitality and retail' ||
    activeFilter === 'Homes and property';

  const showServices =
    activeFilter === 'All' || activeFilter === 'Brand services';

  return (
    <div className="space-y-12">
      {/* Plain Text Filter Bar */}
      <div
        role="tablist"
        aria-label="Filter businesses by category"
        className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-4 text-[15.5px] font-sans"
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
              className={`group inline-flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px] ${
                isActive
                  ? 'text-[var(--ink)] font-medium'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {isActive ? (
                <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
              ) : (
                <span className="w-1.5 h-1.5 bg-transparent inline-block flex-shrink-0" />
              )}
              <span>{filter}</span>
            </button>
          );
        })}
      </div>

      {/* Sector Groups */}
      <div className="space-y-20 md:space-y-24">
        {/* Sector: Built Environment */}
        {showBuiltEnv ? (
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] block">
                Built Environment
              </span>
              <span className="text-[13px] text-[var(--muted)] font-sans mt-1 block">
                Facade engineering, developments, and technical education
              </span>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              {/* Hrishikesh Ventures (Homes and property / All) */}
              {activeFilter === 'All' || activeFilter === 'Homes and property' ? (
                <Row
                  name={hrishikeshVentures.name}
                  description={hrishikeshVentures.summary}
                  meta="Ahmedabad &bull; 13 live developments"
                  logoEntity="hrishikesh-ventures"
                  href={`/businesses/${hrishikeshVentures.slug}`}
                />
              ) : null}

              {/* HRS Aluglaze (Construction and facades / All) */}
              {activeFilter === 'All' || activeFilter === 'Construction and facades' ? (
                <>
                  <Row
                    name={hrsAluglaze.name}
                    description={hrsAluglaze.summary}
                    meta="Sanand &bull; 450,000 sq m capacity"
                    logoEntity="hrs-aluglaze"
                    href={`/businesses/${hrsAluglaze.slug}`}
                  />

                  {/* Geotrix aligned to exact 12-column grid with subtier */}
                  <Row
                    name={geotrix.name}
                    subtier="HRS Aluglaze South India division"
                    description={`${geotrix.summary} Operates as Aluglaze South India arm.`}
                    meta="Bengaluru &bull; South India operations"
                    logoEntity="geotrix"
                    href={`/businesses/${geotrix.slug}`}
                  />

                  {/* School of Facade Technologies */}
                  <Row
                    name={soft.name}
                    description={soft.summary}
                    meta="Ahmedabad &bull; Education & skilling"
                    logoEntity="school-of-facade-technologies"
                    href={`/businesses/${soft.slug}`}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Sector: Food and Consumer */}
        {showFoodConsumer ? (
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] block">
                Food and Consumer
              </span>
              <span className="text-[13px] text-[var(--muted)] font-sans mt-1 block">
                Contract manufacturing and packaged consumer goods
              </span>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              <Row
                name={foodProducts.name}
                description={foodProducts.summary}
                meta="Bavla &bull; Job work & white labelling"
                logoEntity="hrishikesh-food-products"
                href={`/businesses/${foodProducts.slug}`}
              />
              <Row
                name={consumerProducts.name}
                description={consumerProducts.summary}
                meta="Gujarat &bull; 13 product brands"
                logoEntity="hrishikesh-consumer-products"
                href={`/businesses/${consumerProducts.slug}`}
              />
            </div>
          </div>
        ) : null}

        {/* Sector: Hospitality, Leasing and Retail (FirstGen Umbrella) */}
        {showHospitalityRetail ? (
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] block">
                Hospitality, Leasing and Retail
              </span>
              <span className="text-[13px] text-[var(--muted)] font-sans mt-1 block">
                Commercial assets, executive residences, and trade retail
              </span>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              {/* FirstGen Umbrella Header */}
              <div className="py-3.5 border-b border-[var(--rule)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                  <span className="font-serif text-[19px] md:text-[20px] text-[var(--ink)] font-normal">
                    FirstGen Pvt. Ltd.
                  </span>
                  <span className="text-[12.5px] text-[var(--muted)] font-sans">
                    &bull; Umbrella entity
                  </span>
                </div>
                <span className="text-[13px] text-[var(--muted)] font-sans">
                  Operating divisions below
                </span>
              </div>

              {/* FirstGen Divisions - Aligned to exact 12-column grid */}
              {activeFilter === 'All' ||
              activeFilter === 'Hospitality and retail' ||
              activeFilter === 'Homes and property' ? (
                <Row
                  name={firstgenAssets.name}
                  subtier="FirstGen commercial division"
                  description={firstgenAssets.summary}
                  meta="Ahmedabad &bull; 380,000 sq ft managed"
                  logoEntity="firstgen-assets"
                  href={`/businesses/${firstgenAssets.slug}`}
                />
              ) : null}

              {activeFilter === 'All' || activeFilter === 'Hospitality and retail' ? (
                <>
                  <Row
                    name={firstgenHotels.name}
                    subtier="FirstGen hospitality division"
                    description={`${firstgenHotels.summary} Operating Flight Stays and Amuktamalyada.`}
                    meta="Bengaluru &bull; Flight Stays & Amuktamalyada"
                    logoEntity="firstgen-hotels"
                    href={`/businesses/${firstgenHotels.slug}`}
                  />
                  <Row
                    name={firstgenEnterprises.name}
                    subtier="FirstGen retail division"
                    description={`${firstgenEnterprises.summary} Operating The Bluprint and ShubhVista.`}
                    meta="Ahmedabad &bull; The Bluprint & ShubhVista"
                    logoEntity="firstgen-enterprises"
                    href={`/businesses/${firstgenEnterprises.slug}`}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Sector: Services */}
        {showServices ? (
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] block">
                Services
              </span>
              <span className="text-[13px] text-[var(--muted)] font-sans mt-1 block">
                Brand communications and identity systems
              </span>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              <Row
                name={indianBrandHouse.name}
                description={indianBrandHouse.summary}
                meta="Bodakdev &bull; Strategy & creative studio"
                logoEntity="indian-brand-house"
                href={`/businesses/${indianBrandHouse.slug}`}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
