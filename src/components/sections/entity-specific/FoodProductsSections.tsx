'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion';

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
    <Section surface="stone" id="manufacturing-models" className="space-y-24 md:space-y-36">
      {/* 1. Signature Large Text Switcher for the Three Operating Models */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="space-y-12">
            <div>
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Manufacturing operating models" />
              <p className="text-[14px] text-[var(--muted)] font-sans mt-1.5 m-0">
                Flexible processing partnerships adapted to FMCG brand owners, private labels, and food service.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Left Column: Large Newsreader Text Switcher */}
              <div className="col-span-12 lg:col-span-5 space-y-6 pt-2">
                {data.models.map((m) => {
                  const isSelected = activeModel === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveModel(m.id)}
                      className={`block w-full text-left bg-transparent border-0 p-0 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'opacity-100 text-[var(--ink)]'
                          : 'opacity-35 hover:opacity-75 text-[var(--ink)]'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className={`w-2 h-2 rounded-full inline-block shrink-0 transition-opacity ${
                          isSelected ? 'bg-[var(--orange)] opacity-100' : 'bg-transparent opacity-0'
                        }`} />
                        <span className="font-serif text-[28px] md:text-[36px] font-normal leading-[1.2] block">
                          {m.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Description & Image Crossfade Beside It */}
              <div className="col-span-12 lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentModel.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6 font-sans"
                  >
                    <div className="relative w-full aspect-[16/9] bg-[var(--slot)] overflow-hidden rounded-[2px]">
                      <Image
                        src={
                          currentModel.id === 'job-work'
                            ? '/images/hrishikesh-food-products/whole-spices-stone.webp'
                            : currentModel.id === 'white-label'
                            ? '/images/hrishikesh-consumer-products/manpras-store.webp'
                            : '/images/firstgen/south-indian-breakfast.webp'
                        }
                        alt={currentModel.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 680px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <span className="text-[13px] text-[var(--muted)] font-sans block">
                        Operating protocol
                      </span>
                      <p className="text-[17px] leading-relaxed text-[var(--ink)] m-0">
                        {currentModel.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--rule)] space-y-2">
                      <span className="text-[12.5px] text-[var(--muted)] font-sans block">
                        Process points and contractual guarantees
                      </span>
                      <ul className="m-0 p-0 list-none space-y-2.5 text-[14.5px] text-[var(--ink)]">
                        {currentModel.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block mt-2 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
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
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Product range showcase" />
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
              <span className="text-[13.5px] text-[var(--muted)] font-sans">
                Audited food safety and compliance
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
    </Section>
  );
};
