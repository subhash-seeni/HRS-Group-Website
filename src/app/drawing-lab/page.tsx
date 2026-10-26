import React from 'react';
import type { Metadata } from 'next';
import { Section, Button } from '@/components/ui';
import { DrawingLabClient } from './DrawingLabClient';

export const metadata: Metadata = {
  title: 'Drawing Lab (Internal) • HRS Group',
  description: 'Isolated test bench and line pool drawing system for hero rolling illustrations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DrawingLabPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)]">
      {/* Header Banner */}
      <Section surface="ink" className="pt-24 pb-14">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--hrs-orange)]" />
            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
              Line Drawing Illustration Engine • Noindex
            </span>
          </div>

          <h1 className="mt-5 font-['Bricolage_Grotesque'] text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Drawing System & <span className="text-[var(--hrs-orange)] italic">Morph Lab</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-neutral-300 sm:text-lg">
            Isolated line pool test bench for the seven hero rolling concepts: facades, homes, masalas, brands, stays, skills, and retail. Every scene is constructed from straight line segments on an 800×800 canvas sharing a baseline at y = 640.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/" variant="orange">
              Return to Site
            </Button>
            <Button href="/motion-lab" variant="outline">
              Motion Lab
            </Button>
          </div>
        </div>
      </Section>

      {/* Main Bench Body */}
      <Section surface="paper" className="py-12">
        <DrawingLabClient />
      </Section>
    </main>
  );
}
