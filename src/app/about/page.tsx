import React from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';

export const metadata = {
  title: 'About • HRS Group',
  description: 'Group history, values and leadership of HRS Group in Ahmedabad, Gujarat.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen py-24">
      <Section surface="paper">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            HRS Group Overview
          </p>
          <h1 className="mt-3 font-['Bricolage_Grotesque'] text-5xl font-extrabold tracking-tight text-[var(--ink)]">
            About HRS Group
          </h1>
          <p className="mt-6 text-lg text-neutral-700">
            Headquartered in Ahmedabad with regional operations in Bengaluru, HRS Group brings together businesses across the built environment, retail, food processing, hospitality, and brand communications.
          </p>
          <div className="mt-10">
            <Button href="/" variant="primary">
              Return to Homepage
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
