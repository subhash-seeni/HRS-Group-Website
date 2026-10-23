import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SplitLines,
  Reveal,
  ImageReveal,
  PinScene,
  MagneticButton,
  ScrollText,
  Marquee,
} from '@/components/motion';
import { Section, Button, Logo, ImageSlot } from '@/components/ui';
import { entities } from '@/content/entities';
import { bogoContent } from '@/content/bogo';
import { MotionLabClient } from './MotionLabClient';

export const metadata: Metadata = {
  title: 'Motion Lab (Internal) • HRS Group',
  description: 'Isolated test bench for all motion primitives, tokens, and UI components.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MotionLabPage() {
  return (
    <main className="min-h-screen">
      {/* Client toolbar for replay & diagnostics */}
      <MotionLabClient />

      {/* Hero header */}
      <Section surface="ink" className="pt-24 pb-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--hrs-orange)]" />
            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
              Isolated Motion Test Bench • Noindex
            </span>
          </div>

          <h1 className="mt-6 font-['Bricolage_Grotesque'] text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            <SplitLines highlightWord="Motion" highlightClass="text-[var(--hrs-orange)] italic">
              HRS Design & Motion Lab
            </SplitLines>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-neutral-300">
            This bench isolates each animation primitive, UI component, and surface token defined in the design system brief.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/" variant="orange">
              Return to Site
            </Button>
            <Button href="#pinned-scene" variant="outline">
              Jump to PinScene
            </Button>
          </div>
        </div>
      </Section>

      {/* 1. SplitLines & Typography Section */}
      <Section surface="paper" className="py-20 hairline-b">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
              Primitive 01
            </span>
            <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-[var(--ink)]">
              SplitLines Reveal
            </h2>
            <p className="mt-4 text-sm text-neutral-600">
              Line mask reveal with 80ms stagger, 800ms ease-out, zero bounce. Accessible screen reader markup with full aria-label.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="border border-[var(--rule)] bg-white p-8">
              <span className="text-xs font-semibold text-neutral-400 uppercase">Display Heading clamp size</span>
              <SplitLines
                as="h3"
                className="mt-3 font-['Bricolage_Grotesque'] text-4xl font-extrabold tracking-tight text-[var(--ink)] md:text-5xl"
                highlightWord="Endless"
                highlightClass="text-[var(--hrs-orange)] italic"
              >
                One Vision. One Ecosystem. Endless Possibilities.
              </SplitLines>
            </div>

            <div className="border border-[var(--rule)] bg-white p-8">
              <span className="text-xs font-semibold text-neutral-400 uppercase">Sentence case editorial lead</span>
              <SplitLines
                as="p"
                className="mt-3 font-['Bricolage_Grotesque'] text-2xl font-bold text-neutral-800"
                highlightWord="Generations"
                highlightClass="text-[var(--hrs-orange)] italic"
              >
                Bonds Over Generations, Often.
              </SplitLines>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Standard Reveal & Staggered Cards */}
      <Section surface="white" className="py-20 hairline-b">
        <div className="mb-12 max-w-xl">
          <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
            Primitive 02
          </span>
          <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-[var(--ink)]">
            Reveal Component
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Fades in and rises 24px when 15% visible in viewport. Safe SSR hydration and reduced-motion fallback.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal delay={0} className="border border-[var(--rule)] bg-[var(--paper)] p-6">
            <span className="text-xs font-bold text-[var(--hrs-orange)]">01 • Sanand Campus</span>
            <h4 className="mt-2 font-['Bricolage_Grotesque'] text-xl font-bold">Precision Facade Engineering</h4>
            <p className="mt-2 text-sm text-neutral-600">
              Unitised curtain walls and thermal fenestration engineered by HRS Aluglaze.
            </p>
          </Reveal>

          <Reveal delay={120} className="border border-[var(--rule)] bg-[var(--paper)] p-6">
            <span className="text-xs font-bold text-[var(--hrs-orange)]">02 • Bavla Facility</span>
            <h4 className="mt-2 font-['Bricolage_Grotesque'] text-xl font-bold">Milling & Spice Processing</h4>
            <p className="mt-2 text-sm text-neutral-600">
              Clean botanical sourcing, automated cleaning, and certified packaging at Hrishikesh Food Products.
            </p>
          </Reveal>

          <Reveal delay={240} className="border border-[var(--rule)] bg-[var(--paper)] p-6">
            <span className="text-xs font-bold text-[var(--hrs-orange)]">03 • Bengaluru Regional Hub</span>
            <h4 className="mt-2 font-['Bricolage_Grotesque'] text-xl font-bold">Southern Operations Desk</h4>
            <p className="mt-2 text-sm text-neutral-600">
              Flight Stays serviced apartments and Geotrix facade contracts along the Outer Ring Road corridor.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 3. ImageReveal with Concept Store Render */}
      <Section surface="paper" className="py-20 hairline-b">
        <div className="mb-12 max-w-xl">
          <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
            Primitive 03
          </span>
          <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-[var(--ink)]">
            ImageReveal (Clip-Path Reveal)
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Smooth clip-path reveal from bottom to top with subtle zoom normalization. Render captioned as Concept.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <ImageReveal
              src="/bogo/stores/bogo-square-concept.webp"
              alt="BOGO Square Flagship Store Concept"
              caption="Concept • BOGO Square Flagship"
              aspectRatio="aspect-[16/9]"
            />
            <p className="mt-3 text-xs text-neutral-500">
              BOGO Square flagship concept render extracted from BOGO Profile PDF page 10.
            </p>
          </div>

          <div>
            <ImageReveal
              src="/bogo/stores/bogo-essentials-concept.webp"
              alt="BOGO Essentials Store Concept"
              caption="Concept • BOGO Essentials"
              aspectRatio="aspect-[16/9]"
            />
            <p className="mt-3 text-xs text-neutral-500">
              BOGO Essentials concept render extracted from BOGO Profile PDF page 13.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. PinScene Demonstration */}
      <div id="pinned-scene">
        <Section surface="bogo-navy" className="py-16">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-wider text-[var(--bogo-orange)] uppercase">
              Primitive 04
            </span>
            <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-white">
              PinScene (GSAP ScrollTrigger Pinned Scene)
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-300">
              Pinned section that sticks smoothly to the viewport during scroll and cleans up 100% cleanly in React StrictMode without ghost spacers.
            </p>
          </div>

          <PinScene start="top top" end="+=120%" className="min-h-[500px]">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <Logo slug="bogo" height="h-10" />
                <span className="rounded-full bg-[var(--bogo-orange)] px-3 py-1 text-xs font-bold text-neutral-900">
                  PINNED VIEWPORT
                </span>
              </div>
              <h3 className="mt-8 font-['Bricolage_Grotesque'] text-4xl font-extrabold text-white">
                BOGO Master Ecosystem
              </h3>
              <p className="mt-4 max-w-2xl text-lg text-neutral-200">
                Bringing together retail formats (Square, Bazaar, Mini), 11 category brands, and coordinated distribution under BOGO Go. Scroll through to see this pinned block stay locked in view.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
                  BOGO Square
                </span>
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
                  BOGO Bazaar
                </span>
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
                  BOGO Mini
                </span>
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
                  BOGO Go
                </span>
              </div>
            </div>
          </PinScene>
        </Section>
      </div>

      {/* 5. MagneticButton & CursorLabel Interactions */}
      <Section surface="paper" className="py-20 hairline-b">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
              Primitives 05 & 06
            </span>
            <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-[var(--ink)]">
              MagneticButton & CursorLabel
            </h2>
            <p className="mt-4 text-sm text-neutral-600">
              Hover over the buttons to feel subtle physics magnetic pull. Hover over the interactive cards below on desktop to see the custom floating cursor label.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton strength={0.4}>
                <Button variant="primary">Magnetic Primary</Button>
              </MagneticButton>

              <MagneticButton strength={0.4}>
                <Button variant="orange">Magnetic Orange</Button>
              </MagneticButton>

              <MagneticButton strength={0.4}>
                <Button variant="secondary">Magnetic Secondary</Button>
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
              Hover to trigger cursor labels (Desktop)
            </span>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                data-cursor="Explore"
                className="cursor-pointer border border-[var(--rule)] bg-white p-8 transition-colors hover:border-[var(--hrs-orange)]"
              >
                <span className="text-xs font-bold text-neutral-400">data-cursor=&quot;Explore&quot;</span>
                <h4 className="mt-3 font-['Bricolage_Grotesque'] text-2xl font-bold">Hrishikesh Ventures</h4>
                <p className="mt-2 text-xs text-neutral-600">
                  13 planned residential and commercial developments across Ahmedabad.
                </p>
              </div>

              <div
                data-cursor="Concept"
                className="cursor-pointer border border-[var(--rule)] bg-white p-8 transition-colors hover:border-[var(--hrs-orange)]"
              >
                <span className="text-xs font-bold text-neutral-400">data-cursor=&quot;Concept&quot;</span>
                <h4 className="mt-3 font-['Bricolage_Grotesque'] text-2xl font-bold">BOGO Square</h4>
                <p className="mt-2 text-xs text-neutral-600">
                  Interactive retail flagship destination concept render.
                </p>
              </div>

              <div
                data-cursor="Admissions"
                className="cursor-pointer border border-[var(--rule)] bg-white p-8 transition-colors hover:border-[var(--hrs-orange)]"
              >
                <span className="text-xs font-bold text-neutral-400">data-cursor=&quot;Admissions&quot;</span>
                <h4 className="mt-3 font-['Bricolage_Grotesque'] text-2xl font-bold">SoFT Institute</h4>
                <p className="mt-2 text-xs text-neutral-600">
                  School of Facade Technologies technical admissions.
                </p>
              </div>

              <div
                data-cursor="Partner"
                className="cursor-pointer border border-[var(--rule)] bg-white p-8 transition-colors hover:border-[var(--hrs-orange)]"
              >
                <span className="text-xs font-bold text-neutral-400">data-cursor=&quot;Partner&quot;</span>
                <h4 className="mt-3 font-['Bricolage_Grotesque'] text-2xl font-bold">BOGO Partner</h4>
                <p className="mt-2 text-xs text-neutral-600">
                  Shared equity collaboration and retail shelf access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. ScrollText (Word-by-word opacity fill) */}
      <Section surface="white" className="py-24 hairline-b">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
            Primitive 07
          </span>
          <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-[var(--ink)]">
            ScrollText Word-by-Word Fill
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Editorial typography scrubbing: words gradually fill to 100% opacity as you scroll through this block.
          </p>

          <div className="mt-12 rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-8 md:p-12">
            <ScrollText
              as="p"
              className="font-['Bricolage_Grotesque'] text-2xl font-bold leading-relaxed text-[var(--ink)] md:text-3xl"
            >
              HRS Group is a diversified business group headquartered in Ahmedabad. We operate across architecture, engineering, technical education, retail ecosystems, certified food processing, and hospitality. We build enduring physical assets and long-term relationships across generations.
            </ScrollText>
          </div>
        </div>
      </Section>

      {/* 7. Marquee Ticker */}
      <Section surface="paper" className="py-16 hairline-b">
        <div className="mb-6">
          <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
            Primitive 08
          </span>
          <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-[var(--ink)]">
            Marquee Infinite Ticker
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Smooth continuous horizontal motion, pauses on hover, respects reduced motion.
          </p>
        </div>

        <div className="hairline-t hairline-b bg-white py-4">
          <Marquee speed={30}>
            {bogoContent.categoryBrands.map((brand) => (
              <div key={brand.slug} className="flex items-center gap-3 px-6">
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: brand.color }}
                />
                <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-xs font-semibold text-neutral-400 whitespace-nowrap">
                  • {brand.tagline}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </Section>

      {/* 8. Surfaces Demonstration */}
      <Section surface="orange" className="py-20">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-wider text-neutral-900 uppercase">
            Surface Token 04
          </span>
          <h2 className="mt-2 font-['Bricolage_Grotesque'] text-4xl font-extrabold text-[var(--ink)] md:text-5xl">
            Single Deliberate Orange Surface Block
          </h2>
          <p className="mt-4 text-lg font-medium text-neutral-900">
            Used at most once per page as a focused call-out block for key partner dialogues, recruitment, or regional facility inquiries.
          </p>
          <div className="mt-8 flex gap-4">
            <Button href="/contact" variant="primary">
              Contact Operating Desk
            </Button>
          </div>
        </div>
      </Section>

      {/* 9. Logos & Extracted Brand Assets Display */}
      <Section surface="paper" className="py-20">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
            Asset Inventory
          </span>
          <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-bold tracking-tight text-[var(--ink)]">
            Extracted Logos & Wordmarks
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Real BOGO logos extracted from PDF profile alongside generated entity placeholder wordmark SVGs.
          </p>
        </div>

        {/* BOGO Category Logos */}
        <div className="mb-12">
          <h3 className="mb-4 text-xs font-bold tracking-wider text-neutral-500 uppercase">
            BOGO 11 Category Brand Logos (Extracted Transparent PNGs)
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {bogoContent.categoryBrands.map((b) => (
              <div
                key={b.slug}
                className="flex flex-col items-center justify-center rounded-lg border border-[var(--rule)] bg-white p-4 text-center transition-shadow hover:shadow-sm"
              >
                <div className="flex h-16 w-full items-center justify-center">
                  <Logo slug={b.slug} height="h-12" />
                </div>
                <span className="mt-2 text-xs font-bold text-neutral-700">{b.name}</span>
                <span
                  className="mt-1 h-1.5 w-8 rounded-full"
                  style={{ backgroundColor: b.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* HRS Group Entity Wordmarks */}
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-wider text-neutral-500 uppercase">
            HRS Entity Wordmark SVGs
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {entities.map((ent) => (
              <div
                key={ent.slug}
                className="flex flex-col justify-between rounded-lg border border-[var(--rule)] bg-white p-5"
              >
                <Logo slug={ent.slug} height="h-10" />
                <div className="mt-4 hairline-t pt-2 flex items-center justify-between text-xs text-neutral-500">
                  <span className="truncate">{ent.name}</span>
                  <span className="font-semibold text-[var(--hrs-orange)]">{ent.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
