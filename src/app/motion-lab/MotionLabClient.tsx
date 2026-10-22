'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Parallax } from '@/components/motion/Parallax';
import { LineLink } from '@/components/motion/LineLink';
import { FillButton } from '@/components/motion/FillButton';
import { ImageSlot } from '@/components/ui/ImageSlot';

export function MotionLabClient() {
  const [revealKey, setRevealKey] = useState(0);
  const [revealDirection, setRevealDirection] = useState<'up' | 'down' | 'left' | 'right' | 'none'>('up');
  const [headingKey, setHeadingKey] = useState(0);
  const [imageKey, setImageKey] = useState(0);
  const [pageTransitionKey, setPageTransitionKey] = useState(0);

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 lg:py-24 space-y-24">
      {/* Header & Architecture Specs */}
      <div className="border-b border-[var(--rule)] pb-12">
        <div className="text-[12px] font-mono tracking-widest text-[var(--muted)] uppercase mb-3">
          LAB-01 / MOTION FOUNDATION BENCH (NOINDEX)
        </div>
        <SplitHeading as="h1" className="font-serif text-4xl lg:text-5xl text-[var(--ink)] mb-6 font-normal" text="Motion Primitives Laboratory" />
        <p className="text-[17px] text-[var(--muted)] max-w-[68ch] leading-relaxed mb-8">
          Isolated testing environment for all 8 motion primitives. Motion curves are strictly 500–900ms ease-out
          (cubic-bezier(0.22, 1, 0.36, 1)), transform, opacity, and clip-path only. Zero layout shift.
        </p>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <a href="#smoothscroll" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            1. SmoothScroll
          </a>
          <a href="#reveal" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            2. Reveal
          </a>
          <a href="#split-heading" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            3. SplitHeading
          </a>
          <a href="#image-reveal" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            4. ImageReveal
          </a>
          <a href="#parallax" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            5. Parallax
          </a>
          <a href="#line-link" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            6. LineLink
          </a>
          <a href="#fill-button" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            7. FillButton
          </a>
          <a href="#page-transition" className="px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--ink)] transition-colors">
            8. PageTransition
          </a>
        </div>
      </div>

      {/* 1. SmoothScroll */}
      <section id="smoothscroll" className="scroll-mt-24 border-b border-[var(--rule)] pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">01 / LENIS PROVIDER</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">SmoothScroll</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              Root provider with exponential ease-out decay. Automatically disabled on prefers-reduced-motion and left
              native on touch devices. Anchor links and &apos;back to top&apos; integrate smoothly.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#bottom"
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
            >
              Test Scroll to Bottom ↓
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[var(--paper)] border border-[var(--rule)]">
          <div>
            <span className="block text-xs font-mono text-[var(--muted)] uppercase">Desktop Behavior</span>
            <span className="text-sm font-medium text-[var(--ink)] mt-1 block">Lenis Smooth Wheel (1.1s decay)</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-[var(--muted)] uppercase">Mobile / Touch Behavior</span>
            <span className="text-sm font-medium text-[var(--ink)] mt-1 block">100% Native 120Hz/60Hz Scroll</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-[var(--muted)] uppercase">Accessibility</span>
            <span className="text-sm font-medium text-[var(--ink)] mt-1 block">prefers-reduced-motion bypassed</span>
          </div>
        </div>
      </section>

      {/* 2. Reveal */}
      <section id="reveal" className="scroll-mt-24 border-b border-[var(--rule)] pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">02 / INTERSECTION REVEAL</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">Reveal</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              Fades in and rises 24px once when 15% in view. IntersectionObserver-based trigger with zero layout shift.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              aria-label="Reveal direction"
              value={revealDirection}
              onChange={(e) => setRevealDirection(e.target.value as any)}
              className="px-3 py-2 text-xs font-mono uppercase bg-white border border-[var(--rule)]"
            >
              <option value="up">Direction: Up (24px)</option>
              <option value="down">Direction: Down (-24px)</option>
              <option value="left">Direction: Left</option>
              <option value="right">Direction: Right</option>
              <option value="none">Direction: None (Fade Only)</option>
            </select>
            <button
              type="button"
              onClick={() => setRevealKey((k) => k + 1)}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[var(--ink)] text-white hover:bg-[var(--orange)] hover:text-[var(--ink)] transition-colors"
            >
              Replay Reveal ↺
            </button>
          </div>
        </div>

        <div key={revealKey} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal direction={revealDirection} delay={0}>
            <div className="p-8 border border-[var(--rule)] bg-white h-full">
              <span className="text-xs font-mono text-[var(--muted)]">Card A (Delay 0s)</span>
              <h3 className="font-serif text-xl mt-2 mb-2">Architectural Facades</h3>
              <p className="text-sm text-[var(--muted)]">
                Precision unitized curtain wall engineering across Ahmedabad and Bengaluru corporate centers.
              </p>
            </div>
          </Reveal>
          <Reveal direction={revealDirection} delay={0.15}>
            <div className="p-8 border border-[var(--rule)] bg-white h-full">
              <span className="text-xs font-mono text-[var(--muted)]">Card B (Delay 0.15s)</span>
              <h3 className="font-serif text-xl mt-2 mb-2">Consumer Goods</h3>
              <p className="text-sm text-[var(--muted)]">
                Thirteen specialized FMCG labels manufactured across certified dry and cold logistics units.
              </p>
            </div>
          </Reveal>
          <Reveal direction={revealDirection} delay={0.3}>
            <div className="p-8 border border-[var(--rule)] bg-white h-full">
              <span className="text-xs font-mono text-[var(--muted)]">Card C (Delay 0.3s)</span>
              <h3 className="font-serif text-xl mt-2 mb-2">Commercial Hospitality</h3>
              <p className="text-sm text-[var(--muted)]">
                Transit and destination boutique hotels operating in Gujarat with direct airport adjacency.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. SplitHeading */}
      <section id="split-heading" className="scroll-mt-24 border-b border-[var(--rule)] pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">03 / ACCESSIBLE SPLIT HEADINGS</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">SplitHeading</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              Splits a heading into lines, sliding up from beneath an overflow-hidden mask staggered by 80ms. Accessible
              via aria-label with the full text, with server-rendered HTML preserving flow to avoid layout shift.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHeadingKey((k) => k + 1)}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[var(--ink)] text-white hover:bg-[var(--orange)] hover:text-[var(--ink)] transition-colors self-start"
          >
            Replay Heading ↺
          </button>
        </div>

        <div key={headingKey} className="p-10 border border-[var(--rule)] bg-[var(--paper)]">
          <SplitHeading
            as="h2"
            lines={[
              'Coordinating eight operating businesses',
              'across Western and Southern India.',
              'Engineered for long-term endurance.',
            ]}
            className="font-serif text-3xl lg:text-4xl text-[var(--ink)] leading-snug font-normal"
          />
          <div className="mt-6 pt-6 border-t border-[var(--rule)] text-xs font-mono text-[var(--muted)]">
            Accessibility check: Heading element role=&quot;heading&quot; with full text aria-label intact.
          </div>
        </div>
      </section>

      {/* 4. ImageReveal */}
      <section id="image-reveal" className="scroll-mt-24 border-b border-[var(--rule)] pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">04 / CINEMATIC IMAGE REVEAL</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">ImageReveal</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              Clip-path inset reveal from the bottom (inset(100% 0 0 0) to inset(0% 0 0 0)) with the image scaling from
              1.12 to 1 over 1.2s ease-out.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setImageKey((k) => k + 1)}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[var(--ink)] text-white hover:bg-[var(--orange)] hover:text-[var(--ink)] transition-colors self-start"
          >
            Replay Image Reveal ↺
          </button>
        </div>

        <div key={imageKey} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ImageReveal delay={0}>
              <ImageSlot
                aspectRatio="16:9"
                caption="42,000 SQ.M UNITIZED GLAZING, SG HIGHWAY, AHMEDABAD"
                className="w-full"
              />
            </ImageReveal>
            <span className="block text-xs font-mono text-[var(--muted)] mt-3">Primary View: 0s delay</span>
          </div>
          <div>
            <ImageReveal delay={0.2}>
              <ImageSlot
                aspectRatio="16:9"
                caption="5-AXIS CNC MACHINING BAY, SANAND FACILITY, GUJARAT"
                className="w-full"
              />
            </ImageReveal>
            <span className="block text-xs font-mono text-[var(--muted)] mt-3">Secondary Bay: 0.2s delay</span>
          </div>
        </div>
      </section>

      {/* 5. Parallax */}
      <section id="parallax" className="scroll-mt-24 border-b border-[var(--rule)] pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">05 / SCROLL-DRIVEN PARALLAX</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">Parallax</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              Moves element +/-40px against scroll using transform translate3d only. Strictly disabled on mobile (under
              768px or coarse pointer) and reduced motion.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--muted)] border border-[var(--rule)] px-3 py-2 self-start">
            Scroll page to observe relative shift
          </span>
        </div>

        <div className="relative p-12 border border-[var(--rule)] bg-[var(--paper)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Reference (Static) */}
            <div className="p-8 border border-[var(--rule)] bg-white">
              <span className="text-xs font-mono text-[var(--muted)] uppercase block mb-1">Static Reference</span>
              <h3 className="font-serif text-xl text-[var(--ink)] mb-2">Unshifted Element</h3>
              <p className="text-sm text-[var(--muted)]">
                This element remains strictly in standard document flow for direct comparison against the adjacent parallax element.
              </p>
            </div>

            {/* Parallax Shift Element */}
            <Parallax offset={40}>
              <div className="p-8 border-2 border-[var(--orange)] bg-white shadow-sm">
                <span className="text-xs font-mono text-[var(--orange)] uppercase block mb-1">Active Parallax Element</span>
                <h3 className="font-serif text-xl text-[var(--ink)] mb-2">Shift: +/-40px Against Scroll</h3>
                <p className="text-sm text-[var(--muted)]">
                  Scroll up and down to observe this card drifting smoothly against document scroll speed using pure GPU translate3d.
                </p>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* 6. LineLink */}
      <section id="line-link" className="scroll-mt-24 border-b border-[var(--rule)] pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">06 / DIRECTIONAL UNDERLINE</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">LineLink</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              Draws an orange underline from left to right on hover, and retracts to the right on mouse leave. Pure
              transform: scaleX with alternating transform-origin. Zero layout shift.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--muted)] border border-[var(--rule)] px-3 py-2 self-start">
            Hover to test draw &amp; retract
          </span>
        </div>

        <div className="p-10 border border-[var(--rule)] bg-white space-y-8">
          <div className="flex flex-wrap items-baseline gap-12">
            <LineLink href="/businesses" className="text-2xl font-serif text-[var(--ink)]">
              Explore Operating Businesses →
            </LineLink>

            <LineLink href="/about" className="text-lg text-[var(--ink)] font-sans">
              Executive Leadership &amp; History
            </LineLink>

            <LineLink href="/contact" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
              Bodakdev Headquarters, SG Highway
            </LineLink>
          </div>

          <div className="pt-6 border-t border-[var(--rule)] flex items-center gap-6 text-sm text-[var(--muted)]">
            <span className="font-mono text-xs text-[var(--orange)]">SPECS:</span>
            <span>Height: 2px</span>
            <span>Color: #F58220</span>
            <span>Duration: 320ms</span>
            <span>Curve: cubic-bezier(0.22, 1, 0.36, 1)</span>
          </div>
        </div>
      </section>

      {/* 7. FillButton */}
      <section id="fill-button" className="scroll-mt-24 border-b border-[var(--rule)] pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">07 / INK TO ORANGE FILL BUTTON</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">FillButton</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              Ink button fills from the bottom with orange on hover, while label color switches cleanly to ink. 300ms
              duration with ease-out timing.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--muted)] border border-[var(--rule)] px-3 py-2 self-start">
            Hover buttons to test fill
          </span>
        </div>

        <div className="p-10 border border-[var(--rule)] bg-white space-y-6">
          <div className="flex flex-wrap items-center gap-6">
            <FillButton href="/contact">
              Initiate Commercial Enquiry
            </FillButton>

            <FillButton href="/careers">
              View Open Positions (11)
            </FillButton>

            <FillButton disabled>
              Disabled State
            </FillButton>
          </div>

          <div className="pt-6 border-t border-[var(--rule)] flex items-center gap-6 text-sm text-[var(--muted)]">
            <span className="font-mono text-xs text-[var(--orange)]">SPECS:</span>
            <span>Fill: translate3d(0, 100%, 0) → (0, 0, 0)</span>
            <span>Label Color: #FFFFFF → #141414</span>
            <span>Duration: 300ms</span>
          </div>
        </div>
      </section>

      {/* 8. PageTransition */}
      <section id="page-transition" className="scroll-mt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--orange)] uppercase">08 / ROUTE PAGE TRANSITION</span>
            <h2 className="font-serif text-3xl text-[var(--ink)] mt-1">PageTransition</h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">
              400ms fade with a 16px rise on entering pages, wired via /src/app/template.tsx. No exit animation that
              delays navigation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPageTransitionKey((k) => k + 1)}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[var(--ink)] text-white hover:bg-[var(--orange)] hover:text-[var(--ink)] transition-colors self-start"
          >
            Simulate Page Enter ↺
          </button>
        </div>

        <div className="p-10 border border-[var(--rule)] bg-[var(--paper)]">
          <div key={pageTransitionKey} className="page-enter p-8 bg-white border border-[var(--rule)]">
            <span className="text-xs font-mono text-[var(--muted)] uppercase block mb-1">Simulated Incoming Page</span>
            <h3 className="font-serif text-2xl text-[var(--ink)] mb-2">About HRS Group: Heritage &amp; Governance</h3>
            <p className="text-sm text-[var(--muted)] max-w-[65ch]">
              Founded in Ahmedabad, Gujarat, coordinating multi-disciplinary operations with uncompromising architectural rigor.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--rule)] text-xs font-mono text-[var(--muted)] flex items-center justify-between">
            <span>Duration: 400ms | Distance: 16px rise | Easing: cubic-bezier(0.22, 1, 0.36, 1)</span>
            <span className="text-[var(--orange)]">Active on all route navigations via src/app/template.tsx</span>
          </div>
        </div>
      </section>

      {/* Anchor Target for Scroll to Bottom Test */}
      <div id="bottom" className="p-8 border-t border-[var(--rule)] flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--muted)]">LAB-01 FOOTER ANCHOR</span>
        <a
          href="#top"
          className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
        >
          Back to Top ↑
        </a>
      </div>
    </div>
  );
}
