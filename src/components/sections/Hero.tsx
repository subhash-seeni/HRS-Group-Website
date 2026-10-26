'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { HERO_SLIDES, MARQUEE_ENTITIES } from '@/content/hero';
import type { HeroSlide } from '@/content/hero';
import { HeroParametricMesh } from '@/components/hero/HeroParametricMesh';
export type { HeroSlide };
export { HERO_SLIDES };


export const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isReducedMotion = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const marqueeBarRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLAnchorElement>(null);

  // Check reduced motion
  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // GSAP ScrollTrigger for hero scroll exit & tactile depth
  useEffect(() => {
    if (isReducedMotion.current) return;
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      // 1. Smooth parallax lift and subtle fade as user scrolls out of hero
      gsap.to(headline, {
        y: -90,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom 15%',
          scrub: true,
        },
      });

      // 2. Scroll cue fades quickly on initial scroll
      if (scrollCueRef.current) {
        gsap.to(scrollCueRef.current, {
          opacity: 0,
          y: 12,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '120px top',
            scrub: true,
          },
        });
      }

      // 3. Marquee bar subtle depth scrub
      if (marqueeBarRef.current) {
        gsap.to(marqueeBarRef.current, {
          y: -20,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'center top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 4. Parametric mesh subtle parallax drift & dissipation
      if (meshRef.current) {
        gsap.to(meshRef.current, {
          y: -70,
          opacity: 0.12,
          scale: 0.94,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom 15%',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Expose test helper on window for deterministic capture
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__setHeroSlide = (idx: number) => {
        if (idx >= 0 && idx < HERO_SLIDES.length) {
          setIsPaused(true);
          setActiveIndex(idx);
        }
      };
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__setHeroSlide;
      }
    };
  }, []);

  // Update document attribute for Header tone synchronization
  useEffect(() => {
    const current = HERO_SLIDES[activeIndex];
    document.documentElement.setAttribute('data-hero-tone', current.headerTone);
  }, [activeIndex]);

  // Rolling word timer: 1500ms cadence (500ms smooth transition + 1000ms rest)
  useEffect(() => {
    if (isReducedMotion.current) return;

    let timer: NodeJS.Timeout;

    const advanceSlide = () => {
      if (!isPaused && document.visibilityState === 'visible') {
        setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }
    };

    timer = setInterval(advanceSlide, 1500);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="We build facades, homes, masalas, brands, stays, skills and retail"
      className="relative flex h-screen min-h-[640px] max-h-[1200px] w-full flex-col justify-between overflow-hidden px-6 pt-24 pb-4 sm:px-8 sm:pt-28 md:pt-32 lg:px-12"
      style={{
        backgroundColor: currentSlide.bgColor,
        transition: 'background-color 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top spacer to guarantee clearance below 80px header */}
      <div className="h-2 sm:h-4" />

      {/* Main Center Content: Clean typography on left with vast, unhurried negative space to the right */}
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row lg:items-center lg:justify-between gap-8 my-auto">
        {/* Main Display Headline & CTAs */}
        <div ref={headlineRef} className="flex-1 max-w-3xl lg:max-w-2xl select-none will-change-transform">
          <div className="relative">
            {/* Accessible off-screen sentence */}
            <h1 className="sr-only">
              We build facades, homes, masalas, brands, stays, skills and retail. Based in Ahmedabad,
              working across Gujarat, Bengaluru and South India.
            </h1>

            {/* Visual rolling headline */}
            <div
              aria-hidden="true"
              className="flex flex-col font-['Bricolage_Grotesque'] text-[clamp(2.75rem,7.5vw,9.5rem)] lg:text-[clamp(2.75rem,5.2vw,7.25rem)] font-extrabold tracking-tight leading-[0.92]"
            >
              <span
                className="transition-colors duration-500"
                style={{ color: currentSlide.textColor }}
              >
                We build
              </span>

              {/* Rolling Word Masked Container */}
              <div className="relative h-[1.15em] overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateY(-${activeIndex * (100 / HERO_SLIDES.length)}%)`,
                  }}
                >
                  {HERO_SLIDES.map((slide) => (
                    <div
                      key={slide.word}
                      className="flex h-[1.15em] items-center italic"
                      style={{ color: slide.wordColor }}
                    >
                      {slide.word}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Subhead */}
          <p
            className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl font-medium leading-relaxed transition-colors duration-500"
            style={{ color: currentSlide.sentenceColor }}
          >
            Based in Ahmedabad, working across Gujarat, Bengaluru and South India.
          </p>

          {/* CTA Pills — Hovering over CTAs pauses rotation so the user can click comfortably */}
          <div
            className="mt-8 flex flex-wrap items-center gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <Link
              href="#businesses"
              data-cursor="Explore"
              className={`group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 ${
                currentSlide.buttonStyle === 'dark'
                  ? 'bg-[var(--ink)] text-white hover:bg-neutral-800'
                  : 'bg-white text-[var(--ink)] hover:bg-neutral-100'
              }`}
            >
              <span>Explore our businesses</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-current/10 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              href="#bogo"
              data-cursor="Explore"
              className={`group inline-flex items-center gap-3 rounded-full border-2 px-7 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 ${
                currentSlide.buttonStyle === 'dark'
                  ? 'border-[var(--ink)]/40 text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--ink)]/10'
                  : 'border-white/40 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--bogo-orange)] shrink-0" />
              <span>Visit BOGO</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-current/10 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Interactive 3D Parametric Computational Mesh with 7 Sector Topologies */}
        <div
          ref={meshRef}
          className="hidden lg:flex flex-1 items-center justify-center max-w-[480px] xl:max-w-[540px] w-full pointer-events-auto will-change-transform"
        >
          <HeroParametricMesh
            activeIndex={activeIndex}
            accentColor={currentSlide.wordColor}
            headerTone={currentSlide.headerTone}
            className="w-full"
          />
        </div>
      </div>

      {/* Bottom Row: Thin slow marquee + scroll cue */}
      <div
        ref={marqueeBarRef}
        className="mx-auto w-full max-w-7xl border-t border-current/15 pt-3 pb-2 transition-colors duration-700 will-change-transform"
        style={{ color: currentSlide.sentenceColor }}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Entity ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee">
              {[...MARQUEE_ENTITIES, ...MARQUEE_ENTITIES].map((entity, i) => (
                <div
                  key={`${entity}-${i}`}
                  className="inline-flex items-center gap-3 px-3 text-xs sm:text-sm font-medium tracking-normal opacity-85"
                >
                  <span>{entity}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--hrs-orange)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Cue (Sentence case, no uppercase tracking) */}
          <a
            ref={scrollCueRef}
            href="#businesses"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-tight opacity-80 hover:opacity-100 transition-opacity shrink-0"
            aria-label="Scroll to content"
          >
            <span>Scroll</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
