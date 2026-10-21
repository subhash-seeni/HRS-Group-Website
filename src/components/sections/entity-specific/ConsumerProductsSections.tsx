import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Logo } from '@/components/ui';
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

  return (
    <div id="brands-portfolio" className="space-y-24 md:space-y-36">
      {/* 1. Dedicated Manpras Section */}
      {manprasData ? (
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div>
                  <span className="text-[13px] uppercase tracking-wider text-[var(--muted)] font-sans">
                    Flagship Consumer Retail
                  </span>
                  <h2 className="font-serif text-[28px] md:text-[32px] text-[var(--ink)] font-normal m-0 mt-1">
                    Manpras: Neighbourhood Stores & Packaged Range
                  </h2>
                </div>
                <Link href="/brands/manpras" className="link-editorial text-[15px] font-sans">
                  Manpras brand profile &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                {/* Pillar 1: Neighbourhood Store */}
                <div className="space-y-4 pr-0 md:pr-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                    <h3 className="font-serif text-[21px] text-[var(--ink)] font-normal m-0">
                      The Neighbourhood Grocery Store
                    </h3>
                  </div>
                  <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0">
                    {manprasData.storeDescription}
                  </p>
                  <ul className="m-0 p-0 list-none space-y-2 pt-2 text-[14.5px] text-[var(--ink)]">
                    {manprasData.storeFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-[var(--muted)] inline-block mt-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pillar 2: Packaged Range */}
                <div className="space-y-4 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                    <h3 className="font-serif text-[21px] text-[var(--ink)] font-normal m-0">
                      The Packaged Consumer Range
                    </h3>
                  </div>
                  <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0">
                    {manprasData.packagedDescription}
                  </p>
                  <ul className="m-0 p-0 list-none space-y-2 pt-2 text-[14.5px] text-[var(--ink)]">
                    {manprasData.packagedCategories.map((cat) => (
                      <li key={cat} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-[var(--muted)] inline-block mt-2 flex-shrink-0" />
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* 2. All 13 Brands: Active Group */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start mb-12">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Active brands
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Retail goods currently distributed across Gujarat and western India.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {activeBrands.map((b) => (
                <div
                  key={b.slug}
                  className="py-6 border-b border-[var(--rule)] grid grid-cols-12 gap-4 items-baseline group"
                >
                  <div className="col-span-12 sm:col-span-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                    <Link
                      href={`/brands/${b.slug}`}
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
                    <Link
                      href={`/brands/${b.slug}`}
                      className="text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. All 13 Brands: Upcoming / Reserved Group */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Upcoming portfolios
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Seven registered trade marks currently undergoing recipe formulation.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {upcomingBrands.map((b) => (
                <div
                  key={b.slug}
                  className="py-5 border-b border-[var(--rule)] grid grid-cols-12 gap-4 items-baseline group"
                >
                  <div className="col-span-12 sm:col-span-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-transparent inline-block flex-shrink-0" />
                    <Link
                      href={`/brands/${b.slug}`}
                      className="font-serif text-[19px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)]"
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
      </section>
    </div>
  );
};
