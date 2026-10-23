import React from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';

export const metadata = {
  title: 'Careers • HRS Group',
  description: 'Career opportunities across engineering, manufacturing, retail and management.',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen py-24">
      <Section surface="paper">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            Work With Us
          </p>
          <h1 className="mt-3 font-['Bricolage_Grotesque'] text-5xl font-extrabold tracking-tight text-[var(--ink)]">
            Careers at HRS Group
          </h1>
          <p className="mt-6 text-lg text-neutral-700">
            Professional opportunities in facade engineering, food processing, property development, retail store management, and brand strategy.
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
