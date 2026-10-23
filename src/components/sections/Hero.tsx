'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export interface HeroSlide {
  word: string;
  bgColor: string;
  wordColor: string;
  textColor: string;
  sentenceColor: string;
  headerTone: 'light' | 'dark';
  buttonStyle: 'white' | 'dark';
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    word: 'facades',
    bgColor: '#0E0E10', // ink
    wordColor: '#F58220', // orange
    textColor: '#FFFFFF',
    sentenceColor: '#D1D5DB', // neutral-300
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'homes',
    bgColor: '#A84325', // warm terracotta
    wordColor: '#FFF1EC', // warm cream
    textColor: '#FFFFFF',
    sentenceColor: '#FCE4DC',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'masalas',
    bgColor: '#D99400', // rich turmeric yellow
    wordColor: '#1A0B00', // deep burnt umber
    textColor: '#0E0E10', // dark text for AA contrast (8.2:1)
    sentenceColor: '#281300',
    headerTone: 'dark',
    buttonStyle: 'dark',
  },
  {
    word: 'brands',
    bgColor: '#154D28', // deep green
    wordColor: '#D2F8DD', // pale fresh mint
    textColor: '#FFFFFF',
    sentenceColor: '#E2FBEA',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'stays',
    bgColor: '#0D565C', // teal
    wordColor: '#D8FAFC', // ice aqua
    textColor: '#FFFFFF',
    sentenceColor: '#E6FBFC',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'skills',
    bgColor: '#274B76', // soft cadet blue
    wordColor: '#DCEBFC', // pale sky
    textColor: '#FFFFFF',
    sentenceColor: '#EDF5FD',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'retail',
    bgColor: '#0F2A5C', // BOGO navy
    wordColor: '#F58A33', // BOGO orange
    textColor: '#FFFFFF',
    sentenceColor: '#D8E4F8',
    headerTone: 'light',
    buttonStyle: 'white',
  },
];

const MARQUEE_ENTITIES = [
  'HRS Aluglaze',
  'Hrishikesh Ventures',
  'BOGO',
  'Manpras',
  'Geotrix',
  'School of Facade Technologies',
  'Hrishikesh Food Products',
  'Hrishikesh Consumer Products',
  'FirstGen Assets',
  'Flight Stays',
  'Amuktamalyada',
  'The Bluprint',
  'ShubhVista',
  'Indian Brand House',
];

export const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isReducedMotion = useRef(false);

  // Check reduced motion
  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Expose test helper on window for deterministic capture
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__setHeroSlide = (idx: number) => {
        if (idx >= 0 && idx < HERO_SLIDES.length) {
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

  // Rolling word timer (2.6s interval, 700ms transition)
  useEffect(() => {
    if (isReducedMotion.current) return;

    let timer: NodeJS.Timeout;

    const advanceSlide = () => {
      if (!isPaused && document.visibilityState === 'visible') {
        setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }
    };

    timer = setInterval(advanceSlide, 2600);

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
      id="hero"
      aria-label="We build facades, homes, masalas, brands, stays, skills and retail"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative flex h-screen min-h-[640px] max-h-[1200px] w-full flex-col justify-between overflow-hidden px-6 pt-24 pb-4 sm:px-8 sm:pt-28 md:pt-32 lg:px-12"
      style={{
        backgroundColor: currentSlide.bgColor,
        transition: 'background-color 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Top spacer to guarantee clearance below 80px header */}
      <div className="h-2 sm:h-4" />

      {/* Main Center Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center my-auto">
        {/* Big Display Headline */}
        <div className="relative select-none">
          {/* Accessible off-screen sentence */}
          <h1 className="sr-only">
            We build facades, homes, masalas, brands, stays, skills and retail. Based in Ahmedabad,
            working across Gujarat, Bengaluru and South India.
          </h1>

          {/* Visual rolling headline */}
          <div
            aria-hidden="true"
            className="flex flex-col font-['Bricolage_Grotesque'] text-[clamp(2.75rem,8.5vw,10.5rem)] font-extrabold tracking-tight leading-[0.92]"
          >
            <span
              className="transition-colors duration-700"
              style={{ color: currentSlide.textColor }}
            >
              We build
            </span>

            {/* Rolling Word Masked Container */}
            <div className="relative h-[1.15em] overflow-hidden">
              <div
                className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
          className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl font-medium leading-relaxed transition-colors duration-700"
          style={{ color: currentSlide.sentenceColor }}
        >
          Based in Ahmedabad, working across Gujarat, Bengaluru and South India.
        </p>

        {/* CTA Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
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

      {/* Bottom Row: Thin slow marquee + scroll cue */}
      <div className="mx-auto w-full max-w-7xl border-t border-current/15 pt-3 pb-2 transition-colors duration-700" style={{ color: currentSlide.sentenceColor }}>
        <div className="flex items-center justify-between gap-6">
          {/* Entity ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee">
              {[...MARQUEE_ENTITIES, ...MARQUEE_ENTITIES].map((entity, i) => (
                <div key={`${entity}-${i}`} className="inline-flex items-center gap-3 px-3 text-xs sm:text-sm font-medium tracking-normal opacity-85">
                  <span>{entity}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--hrs-orange)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Cue (Sentence case, no uppercase tracking) */}
          <a
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
