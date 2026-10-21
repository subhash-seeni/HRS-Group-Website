'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Row } from '@/components/ui/Row';
import { entities } from '@/content/entities';
import { Entity, Sector } from '@/content/types';

interface SectorFilterOption {
  label: string;
  queryValue: string;
  sectorMatch?: Sector;
}

const sectorOptions: SectorFilterOption[] = [
  { label: 'All', queryValue: 'all' },
  { label: 'Built Environment', queryValue: 'built-environment', sectorMatch: 'Built Environment' },
  { label: 'Food and Consumer', queryValue: 'food-and-consumer', sectorMatch: 'Food and Consumer' },
  {
    label: 'Hospitality, Leasing and Retail',
    queryValue: 'hospitality-leasing-retail',
    sectorMatch: 'Hospitality, Leasing and Retail',
  },
  { label: 'Services', queryValue: 'services', sectorMatch: 'Services' },
];

export const BusinessesDirectory: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentParam = searchParams.get('sector') || 'all';
  const activeOption =
    sectorOptions.find((opt) => opt.queryValue === currentParam) || sectorOptions[0];

  const handleFilterChange = (queryValue: string) => {
    startTransition(() => {
      if (queryValue === 'all') {
        router.push('/businesses', { scroll: false });
      } else {
        router.push(`/businesses?sector=${queryValue}`, { scroll: false });
      }
    });
  };

  const getEntity = (slug: string): Entity | undefined =>
    entities.find((e) => e.slug === slug);

  const hrishikeshVentures = getEntity('hrishikesh-ventures')!;
  const hrsAluglaze = getEntity('hrs-aluglaze')!;
  const geotrix = getEntity('geotrix')!;
  const soft = getEntity('school-of-facade-technologies')!;
  const foodProducts = getEntity('hrishikesh-food-products')!;
  const consumerProducts = getEntity('hrishikesh-consumer-products')!;
  const firstgen = getEntity('firstgen')!;
  const firstgenAssets = getEntity('firstgen-assets')!;
  const firstgenHotels = getEntity('firstgen-hotels')!;
  const firstgenEnterprises = getEntity('firstgen-enterprises')!;
  const indianBrandHouse = getEntity('indian-brand-house')!;

  // Determine visibility based on active filter
  const showBuiltEnv =
    activeOption.queryValue === 'all' || activeOption.queryValue === 'built-environment';
  const showFoodConsumer =
    activeOption.queryValue === 'all' || activeOption.queryValue === 'food-and-consumer';
  const showHospitalityRetail =
    activeOption.queryValue === 'all' ||
    activeOption.queryValue === 'hospitality-leasing-retail';
  const showServices =
    activeOption.queryValue === 'all' || activeOption.queryValue === 'services';

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Sector Filter Bar */}
      <div
        role="tablist"
        aria-label="Filter businesses by sector"
        className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-4 text-[15.5px] font-sans"
      >
        {sectorOptions.map((opt) => {
          const isActive = activeOption.queryValue === opt.queryValue;
          return (
            <button
              key={opt.queryValue}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleFilterChange(opt.queryValue)}
              className={`inline-flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px] ${
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
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sector Groups */}
      <div className="space-y-20 md:space-y-28">
        {/* Sector 1: Built Environment */}
        {showBuiltEnv ? (
          <section className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Built Environment
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Facade engineering, property developments, and technical education.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              {/* Hrishikesh Ventures */}
              <Row
                name={hrishikeshVentures.name}
                description={hrishikeshVentures.descriptor || hrishikeshVentures.summary}
                audience={`Audience: ${hrishikeshVentures.audience.join(', ')}`}
                meta="Ahmedabad &bull; 13 live developments"
                logoEntity="hrishikesh-ventures"
                href={`/businesses/${hrishikeshVentures.slug}`}
              />

              {/* HRS Aluglaze */}
              <Row
                name={hrsAluglaze.name}
                description={hrsAluglaze.descriptor || hrsAluglaze.summary}
                audience={`Audience: ${hrsAluglaze.audience.join(', ')}`}
                meta="Sanand &bull; 450,000 sq m capacity"
                logoEntity="hrs-aluglaze"
                href={`/businesses/${hrsAluglaze.slug}`}
              />

              {/* Geotrix aligned to unified 12-column grid */}
              <Row
                name={geotrix.name}
                subtier="HRS Aluglaze South India division"
                description={geotrix.descriptor || geotrix.summary}
                audience={`Audience: ${geotrix.audience.join(', ')}`}
                meta="Bengaluru &bull; South India execution"
                logoEntity="geotrix"
                href={`/businesses/${geotrix.slug}`}
              />

              {/* School of Facade Technologies */}
              <Row
                name={soft.name}
                description={soft.descriptor || soft.summary}
                audience={`Audience: ${soft.audience.join(', ')}`}
                meta="Ahmedabad &bull; Vocational education"
                logoEntity="school-of-facade-technologies"
                href={`/businesses/${soft.slug}`}
              />
            </div>
          </section>
        ) : null}

        {/* Sector 2: Food and Consumer */}
        {showFoodConsumer ? (
          <section className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Food and Consumer
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Contract spice milling, food packaging, and retail brand stewardship.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              <Row
                name={foodProducts.name}
                description={foodProducts.descriptor || foodProducts.summary}
                audience={`Audience: ${foodProducts.audience.join(', ')}`}
                meta="Bavla &bull; Cryogenic milling"
                logoEntity="hrishikesh-food-products"
                href={`/businesses/${foodProducts.slug}`}
              />
              <Row
                name={consumerProducts.name}
                description={consumerProducts.descriptor || consumerProducts.summary}
                audience={`Audience: ${consumerProducts.audience.join(', ')}`}
                meta="Gujarat &bull; 13 product brands"
                logoEntity="hrishikesh-consumer-products"
                href={`/businesses/${consumerProducts.slug}`}
              />
            </div>
          </section>
        ) : null}

        {/* Sector 3: Hospitality, Leasing and Retail */}
        {showHospitalityRetail ? (
          <section className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Hospitality, Leasing & Retail
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Commercial asset management, serviced apartments, and trade venues.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              {/* FirstGen Plain Umbrella Header */}
              <div className="py-3.5 border-b border-[var(--rule)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                  <a
                    href={`/businesses/${firstgen.slug}`}
                    className="font-serif text-[19px] md:text-[20px] text-[var(--ink)] font-normal hover:underline underline-offset-4 decoration-[var(--orange)]"
                  >
                    FirstGen Pvt. Ltd.
                  </a>
                  <span className="text-[12.5px] text-[var(--muted)] font-sans">
                    &bull; Umbrella entity
                  </span>
                </div>
                <span className="text-[13px] text-[var(--muted)] font-sans">
                  Operating divisions below
                </span>
              </div>

              {/* FirstGen Divisions - Aligned to exact 12-column grid */}
              <Row
                name={firstgenAssets.name}
                subtier="FirstGen commercial division"
                description={firstgenAssets.descriptor || firstgenAssets.summary}
                audience={`Audience: ${firstgenAssets.audience.join(', ')}`}
                meta="Ahmedabad &bull; 380,000 sq ft managed"
                logoEntity="firstgen-assets"
                href={`/businesses/${firstgenAssets.slug}`}
              />
              <Row
                name={firstgenHotels.name}
                subtier="FirstGen hospitality division"
                description={firstgenHotels.descriptor || firstgenHotels.summary}
                audience={`Audience: ${firstgenHotels.audience.join(', ')}`}
                meta="Bengaluru &bull; Flight Stays & Amuktamalyada"
                logoEntity="firstgen-hotels"
                href={`/businesses/${firstgenHotels.slug}`}
              />
              <Row
                name={firstgenEnterprises.name}
                subtier="FirstGen retail division"
                description={firstgenEnterprises.descriptor || firstgenEnterprises.summary}
                audience={`Audience: ${firstgenEnterprises.audience.join(', ')}`}
                meta="Ahmedabad &bull; The Bluprint & ShubhVista"
                logoEntity="firstgen-enterprises"
                href={`/businesses/${firstgenEnterprises.slug}`}
              />
            </div>
          </section>
        ) : null}

        {/* Sector 4: Services */}
        {showServices ? (
          <section className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3 pt-5 md:pt-6">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Services
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Independent brand communications and packaging engineering studio.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              <Row
                name={indianBrandHouse.name}
                description={indianBrandHouse.descriptor || indianBrandHouse.summary}
                audience={`Audience: ${indianBrandHouse.audience.join(', ')}`}
                meta="Bodakdev &bull; Independent studio"
                logoEntity="indian-brand-house"
                href={`/businesses/${indianBrandHouse.slug}`}
              />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};
