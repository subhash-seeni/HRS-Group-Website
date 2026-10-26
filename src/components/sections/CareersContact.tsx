'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MagneticButton } from '@/components/motion/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CareersContact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cols = [leftColRef.current, rightColRef.current].filter(Boolean);
      if (cols.length === 0) return;

      // Smooth column rise on entry
      gsap.from(cols, {
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Subtle kinetic opposing drift on scroll scrub
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.querySelector('.career-action-title'),
          { x: -30 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'center center',
              scrub: 0.4,
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.querySelector('.contact-action-title'),
          { x: 30 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'center center',
              scrub: 0.4,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="careers-contact"
      data-surface="orange"
      className="relative w-full bg-[var(--hrs-orange)] text-[var(--ink)] py-28 sm:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 border-t border-[var(--ink)]/15 overflow-hidden"
      aria-label="Careers and contact opportunities"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-[var(--ink)]/20">
          {/* Half 1: Careers */}
          <div ref={leftColRef} className="flex flex-col justify-between pr-0 lg:pr-12 pt-8 lg:pt-0">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)]/80 block mb-3">
                Working with HRS Group
              </span>
              <p className="text-sm sm:text-base font-semibold text-[var(--ink)] max-w-md leading-relaxed mb-8">
                Engineering careers, manufacturing roles, and modern retail opportunities across western India.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/careers"
                className="group inline-flex flex-col sm:flex-row sm:items-center gap-6"
              >
                <div className="relative">
                  <span className="career-action-title font-['Bricolage_Grotesque'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--ink)] block relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] sm:after:h-[4px] after:bg-[var(--ink)] after:scale-x-0 after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out will-change-transform">
                    See open roles
                  </span>
                </div>

                <MagneticButton strength={0.4}>
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[var(--ink)] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl sm:text-2xl font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      ↗
                    </span>
                  </div>
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Half 2: Contact */}
          <div ref={rightColRef} className="flex flex-col justify-between pl-0 lg:pl-12 pt-16 lg:pt-0">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)]/80 block mb-3">
                Group correspondence & partnerships
              </span>
              <p className="text-sm sm:text-base font-semibold text-[var(--ink)] max-w-md leading-relaxed mb-8">
                Direct commercial partnerships, property leasing, and corporate executive enquiries.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="group inline-flex flex-col sm:flex-row sm:items-center gap-6"
              >
                <div className="relative">
                  <span className="contact-action-title font-['Bricolage_Grotesque'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--ink)] block relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] sm:after:h-[4px] after:bg-[var(--ink)] after:scale-x-0 after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out will-change-transform">
                    Send an enquiry
                  </span>
                </div>

                <MagneticButton strength={0.4}>
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[var(--ink)] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl sm:text-2xl font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      ↗
                    </span>
                  </div>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Grounded Operational Footprint Telemetry */}
        <div className="mt-20 pt-10 border-t border-[var(--ink)]/20 grid grid-cols-2 lg:grid-cols-4 gap-6 text-[var(--ink)]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block opacity-70">Ahmedabad HQ</span>
            <span className="text-sm font-semibold mt-1 block">Bodakdev Corporate Office</span>
            <span className="text-xs opacity-75 mt-0.5 block">Executive administration & finance</span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block opacity-70">Sanand Campus</span>
            <span className="text-sm font-semibold mt-1 block">Automated Facade Plant</span>
            <span className="text-xs opacity-75 mt-0.5 block">18,000 sq m monthly capacity</span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block opacity-70">Bavla Campus</span>
            <span className="text-sm font-semibold mt-1 block">Spice & Milling Complex</span>
            <span className="text-xs opacity-75 mt-0.5 block">BRCGS food safety certified</span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block opacity-70">Bengaluru Hub</span>
            <span className="text-sm font-semibold mt-1 block">Outer Ring Road Corridor</span>
            <span className="text-xs opacity-75 mt-0.5 block">Engineering & corporate stays</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersContact;
