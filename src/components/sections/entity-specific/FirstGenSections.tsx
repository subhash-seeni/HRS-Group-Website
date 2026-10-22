'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion';

interface FirstGenSectionsProps {
  entitySlug: string;
  firstgenData?: {
    umbrellaNote: string;
    divisions: { name: string; slug: string; role: string; description: string }[];
  };
  assetsData?: {
    categories: { title: string; locations: string; description: string; highlights: string[] }[];
  };
  hotelsData?: {
    flightStays: { title: string; location: string; description: string; features: string[] };
    amuktamalyada: {
      title: string;
      location: string;
      description: string;
      signatureDishes: { name: string; description: string }[];
    };
  };
  enterprisesData?: {
    bluprint: { title: string; location: string; description: string; highlights: string[] };
    shubhvista: { title: string; location: string; description: string; highlights: string[] };
  };
}

const dishImages: Record<string, string> = {
  'Ghee Roast Masala Dosa': '/images/firstgen/south-indian-breakfast.webp',
  'Pesarattu Upma': '/images/firstgen/south-indian-breakfast.webp',
  'Andhra Bhojanam (Banana Leaf Thali)': '/images/firstgen/south-indian-breakfast.webp',
  'Degree Filter Coffee': '/images/firstgen/south-indian-breakfast.webp',
};

export const FirstGenSections: React.FC<FirstGenSectionsProps> = ({
  entitySlug,
  firstgenData,
  assetsData,
  hotelsData,
  enterprisesData,
}) => {
  const [hoveredDiv, setHoveredDiv] = useState<string | null>(null);
  const [hoveredDish, setHoveredDish] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // 1. Umbrella Page: FirstGen Pvt. Ltd. (Division links as large rows)
  if (entitySlug === 'firstgen' && firstgenData) {
    return (
      <Section surface="white" id="operating-divisions" className="space-y-24 md:space-y-36">
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start mb-12">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Operating divisions" />
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                  Three specialised business units managed under FirstGen corporate governance.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
                {firstgenData.divisions.map((div) => {
                  const isHovered = hoveredDiv === div.slug;
                  return (
                    <div
                      key={div.slug}
                      onMouseEnter={() => setHoveredDiv(div.slug)}
                      onMouseLeave={() => setHoveredDiv(null)}
                      className="py-10 md:py-12 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-[var(--paper)] transition-colors px-2 -mx-2"
                    >
                      <div className="md:col-span-5 space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-[var(--orange)] shrink-0" />
                          <Link
                            href={`/businesses/${div.slug}`}
                            style={{
                              transform:
                                isHovered && !prefersReducedMotion
                                  ? 'translateX(8px)'
                                  : 'translateX(0)',
                              transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                            className="font-serif text-[24px] md:text-[28px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)]"
                          >
                            {div.name}
                          </Link>
                        </div>
                        <span className="text-[13.5px] text-[var(--muted)] block pl-5">
                          {div.role}
                        </span>
                      </div>

                      <div className="md:col-span-5 text-[15.5px] leading-relaxed text-[var(--muted)]">
                        {div.description}
                      </div>

                      <div className="md:col-span-2 text-right">
                        <Link
                          href={`/businesses/${div.slug}`}
                          className="link-editorial text-[15px] inline-flex items-center gap-1.5"
                        >
                          <span>Explore</span>
                          <span
                            style={{
                              transform:
                                isHovered && !prefersReducedMotion
                                  ? 'translateX(4px)'
                                  : 'translateX(0)',
                              transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                            className={isHovered ? 'text-[var(--orange)]' : 'text-[var(--ink)]'}
                          >
                            &rarr;
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      </Section>
    );
  }

  // 2. FirstGen Assets: Commercial Leasing Categories
  if (entitySlug === 'firstgen-assets' && assetsData) {
    return (
      <Section surface="white" id="leasing-categories" className="space-y-24 md:space-y-36">
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start mb-12">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Leasing categories" />
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                  Office, high-street retail, warehousing, and equipment portfolios.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
                {assetsData.categories.map((cat) => (
                  <div
                    key={cat.title}
                    className="py-8 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
                  >
                    <div className="md:col-span-4 space-y-1">
                      <h3 className="font-serif text-[20px] text-[var(--ink)] font-normal m-0">
                        {cat.title}
                      </h3>
                      <span className="text-[12.5px] text-[var(--muted)] block">
                        {cat.locations}
                      </span>
                    </div>

                    <div className="md:col-span-8 space-y-3 text-[14.5px]">
                      <p className="text-[var(--ink)] leading-relaxed m-0">
                        {cat.description}
                      </p>
                      <ul className="m-0 p-0 list-none space-y-1 text-[var(--muted)] text-[13.5px]">
                        {cat.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leasing Enquiry CTA */}
            <div className="p-8 md:p-12 border border-[var(--rule)] bg-[var(--paper)] font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="font-serif text-[22px] text-[var(--ink)] font-normal m-0">
                  Enquire regarding commercial leasing
                </h3>
                <p className="text-[15px] text-[var(--muted)] m-0">
                  Request floorplans, warehouse technical specifications, or crane hire schedules.
                </p>
              </div>
              <Link
                href="/contact?entity=firstgen-assets&subject=Commercial leasing enquiry"
                className="link-editorial text-[16px] flex-shrink-0"
              >
                Send leasing enquiry
              </Link>
            </div>
          </Container>
        </section>
      </Section>
    );
  }

  // 3. FirstGen Hotels: Flight Stays & Amuktamalyada
  if (entitySlug === 'firstgen-hotels' && hotelsData) {
    return (
      <Section surface="white" id="hospitality-brands" className="space-y-24 md:space-y-36">
        {/* Flight Stays Section */}
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-8 items-start font-sans">
              <div className="col-span-12 md:col-span-4 space-y-3">
                <span className="text-[13px] text-[var(--muted)] font-sans block">
                  Corporate residences
                </span>
                <SplitHeading as="h2" className="font-serif text-[24px] md:text-[26px] text-[var(--ink)] font-normal m-0" text={hotelsData.flightStays.title} />
                <span className="text-[13.5px] text-[var(--muted)] block">
                  {hotelsData.flightStays.location}
                </span>
              </div>

              <div className="col-span-12 md:col-span-8 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-10 space-y-4">
                <p className="text-[16px] leading-relaxed text-[var(--ink)] m-0">
                  {hotelsData.flightStays.description}
                </p>
                <ul className="m-0 p-0 list-none space-y-2 text-[14.5px] text-[var(--muted)]">
                  {hotelsData.flightStays.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link
                    href="/contact?entity=firstgen-hotels&subject=Flight Stays corporate reservation"
                    className="link-editorial text-[15px]"
                  >
                    Corporate stay reservations &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Amuktamalyada Section with Line-by-Line Dish Reveal and Small Image Preview on Hover */}
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="space-y-12 font-sans">
              <div className="grid grid-cols-12 gap-8 items-start">
                <div className="col-span-12 md:col-span-4 space-y-3">
                  <span className="text-[13px] text-[var(--muted)] font-sans block">
                    Regional Telugu dining room
                  </span>
                  <SplitHeading as="h2" className="font-serif text-[24px] md:text-[26px] text-[var(--ink)] font-normal m-0" text={hotelsData.amuktamalyada.title} />
                  <span className="text-[13.5px] text-[var(--muted)] block">
                    {hotelsData.amuktamalyada.location}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-8 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-10 space-y-4">
                  <p className="text-[16px] leading-relaxed text-[var(--ink)] m-0">
                    {hotelsData.amuktamalyada.description}
                  </p>
                  <p className="text-[14px] text-[var(--muted)] m-0">
                    Service hours: 07:00 to 11:30 (Morning Tiffins) &bull; 12:30 to 15:30 (Andhra Banana Leaf Thali) &bull; 17:00 to 22:30 (Evening Tiffins & Filter Coffee).
                  </p>
                </div>
              </div>

              {/* Signature Dishes Line-by-Line Reveal with Small Image Preview on Hover */}
              <div className="border-t border-[var(--rule)] pt-8">
                <h3 className="font-serif text-[20px] text-[var(--ink)] font-normal mb-6">
                  Signature dishes & tiffins
                </h3>
                <div className="border-t border-[var(--rule)]">
                  {hotelsData.amuktamalyada.signatureDishes.map((dish) => {
                    const isHovered = hoveredDish === dish.name;
                    const imgSrc = dishImages[dish.name] || '/images/firstgen/south-indian-breakfast.webp';

                    return (
                      <div
                        key={dish.name}
                        onMouseEnter={() => setHoveredDish(dish.name)}
                        onMouseLeave={() => setHoveredDish(null)}
                        className="py-5 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center relative group hover:bg-[var(--paper)] transition-colors px-2 -mx-2"
                      >
                        <div className="sm:col-span-4 font-serif text-[20px] text-[var(--ink)]">
                          {dish.name}
                        </div>
                        <div className="sm:col-span-6 text-[15px] text-[var(--muted)]">
                          {dish.description}
                        </div>
                        <div className="sm:col-span-2 text-right relative flex justify-end">
                          <div
                            aria-hidden="true"
                            style={{
                              opacity: isHovered && !prefersReducedMotion ? 1 : 0,
                              transform:
                                isHovered && !prefersReducedMotion
                                  ? 'translateX(0)'
                                  : 'translateX(16px)',
                              transition:
                                'opacity 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                            className="hidden sm:block relative w-[75px] h-[50px] aspect-[3/2] overflow-hidden bg-[var(--slot)] border border-[var(--rule)] rounded-[2px]"
                          >
                            <Image
                              src={imgSrc}
                              alt={dish.name}
                              fill
                              sizes="75px"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Section>
    );
  }

  // 4. FirstGen Enterprises: The Bluprint & ShubhVista
  if (entitySlug === 'firstgen-enterprises' && enterprisesData) {
    return (
      <Section surface="white" id="trade-venues" className="space-y-24 md:space-y-36">
        {/* The Bluprint */}
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-8 items-start font-sans">
              <div className="col-span-12 md:col-span-4 space-y-3">
                <span className="text-[13px] text-[var(--muted)] font-sans block">
                  Trade networking venue
                </span>
                <SplitHeading as="h2" className="font-serif text-[24px] md:text-[26px] text-[var(--ink)] font-normal m-0" text={enterprisesData.bluprint.title} />
                <span className="text-[13.5px] text-[var(--muted)] block">
                  {enterprisesData.bluprint.location}
                </span>
              </div>

              <div className="col-span-12 md:col-span-8 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-10 space-y-4">
                <p className="text-[16px] leading-relaxed text-[var(--ink)] m-0">
                  {enterprisesData.bluprint.description}
                </p>
                <ul className="m-0 p-0 list-none space-y-2 text-[14.5px] text-[var(--muted)]">
                  {enterprisesData.bluprint.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* ShubhVista */}
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-8 items-start font-sans">
              <div className="col-span-12 md:col-span-4 space-y-3">
                <span className="text-[13px] text-[var(--muted)] font-sans block">
                  Architectural retail showroom
                </span>
                <SplitHeading as="h2" className="font-serif text-[24px] md:text-[26px] text-[var(--ink)] font-normal m-0" text={enterprisesData.shubhvista.title} />
                <span className="text-[13.5px] text-[var(--muted)] block">
                  {enterprisesData.shubhvista.location}
                </span>
              </div>

              <div className="col-span-12 md:col-span-8 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-10 space-y-4">
                <p className="text-[16px] leading-relaxed text-[var(--ink)] m-0">
                  {enterprisesData.shubhvista.description}
                </p>
                <ul className="m-0 p-0 list-none space-y-2 text-[14.5px] text-[var(--muted)]">
                  {enterprisesData.shubhvista.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </Section>
    );
  }

  return null;
};
