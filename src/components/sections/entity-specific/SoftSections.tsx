'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion';

interface SoftSectionsProps {
  data: {
    poweredByNote: string;
    tracks: {
      id: string;
      title: string;
      subtitle: string;
      courses: { name: string; duration: string; format: string; outcome: string }[];
    }[];
  };
}

export const SoftSections: React.FC<SoftSectionsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(data.tracks[0].id);

  const currentTrack = data.tracks.find((t) => t.id === activeTab) || data.tracks[0];

  return (
    <Section surface="stone" id="courses" className="space-y-24 md:space-y-36">
      {/* 1. Powered by HRS Aluglaze Strip */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="p-8 md:p-12 border border-[var(--rule)] bg-[var(--paper)] grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-3 font-sans">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-[var(--orange)] inline-block" />
                <h3 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  Powered by HRS Aluglaze Infrastructure
                </h3>
              </div>
              <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0 max-w-[62ch]">
                {data.poweredByNote}
              </p>
            </div>

            <div className="col-span-12 md:col-span-4 md:text-right">
              <Link
                href="/businesses/hrs-aluglaze"
                className="link-editorial text-[16px] font-sans inline-flex items-center gap-2"
              >
                <span>View Sanand facility</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Three Audience Tracks as Tabs with Sliding Orange Underline and Crossfading Panels */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="space-y-10">
            <div>
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="Audience curricula & courses" />
              <p className="text-[14px] text-[var(--muted)] font-sans mt-1.5 m-0">
                Structured technical certifications and vocational progression for distinct industry roles.
              </p>
            </div>

            {/* Plain text tabs with sliding orange underline */}
            <div
              role="tablist"
              aria-label="Filter curricula by audience"
              className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-4 text-[15.5px] font-sans relative"
            >
              {data.tracks.map((track) => {
                const isActive = activeTab === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(track.id)}
                    className={`relative py-1 bg-transparent border-0 cursor-pointer transition-colors duration-150 ${
                      isActive ? 'text-[var(--ink)] font-medium' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>{track.title}</span>
                    {isActive ? (
                      <motion.div
                        layoutId="soft-tab-underline"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[var(--orange)]"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Active Track Description & Course Cards with Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8 font-sans"
              >
                <p className="text-[16.5px] text-[var(--muted)] max-w-[60ch] m-0">
                  {currentTrack.subtitle}
                </p>

                <div className="border-t border-[var(--rule)]">
                  {currentTrack.courses.map((course) => (
                    <div
                      key={course.name}
                      className="py-8 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
                    >
                      <div className="md:col-span-5 space-y-1">
                        <h3 className="font-serif text-[20px] text-[var(--ink)] font-normal m-0">
                          {course.name}
                        </h3>
                        <span className="text-[13px] text-[var(--muted)] block">
                          Duration: {course.duration}
                        </span>
                      </div>

                      <div className="md:col-span-4 space-y-1 text-[14.5px]">
                        <span className="text-[12.5px] text-[var(--muted)] font-sans block">
                          Format
                        </span>
                        <p className="text-[var(--ink)] m-0 leading-relaxed">
                          {course.format}
                        </p>
                      </div>

                      <div className="md:col-span-3 space-y-1 text-[14.5px]">
                        <span className="text-[12.5px] text-[var(--muted)] font-sans block">
                          Credential outcome
                        </span>
                        <p className="text-[var(--muted)] m-0 leading-relaxed">
                          {course.outcome}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Apply / Enquire CTA */}
                <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[14px] text-[var(--muted)]">
                    Next batch enrollment currently open for Ahmedabad cohort.
                  </span>
                  <Link
                    href={`/contact?entity=school-of-facade-technologies&subject=Admission enquiry for ${encodeURIComponent(
                      currentTrack.title
                    )}`}
                    className="link-dot text-[16px]"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                    <span className="link-editorial">Apply or enquire for {currentTrack.title}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </Section>
  );
};
