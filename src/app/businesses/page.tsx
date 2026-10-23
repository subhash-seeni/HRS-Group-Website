import React from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';

export const metadata = {
  title: 'Businesses • HRS Group',
  description: 'Operating entities across Built Environment, Food, Hospitality and Services.',
};

export default function BusinessesPage() {
  return (
    <main className="min-h-screen py-24">
      <Section surface="paper">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            Operating Companies
          </p>
          <h1 className="mt-3 font-['Bricolage_Grotesque'] text-5xl font-extrabold tracking-tight text-[var(--ink)]">
            Our Businesses
          </h1>
          <p className="mt-6 text-lg text-neutral-700">
            A comprehensive directory of HRS Group entities across real estate, facade engineering, food processing, hospitality, property leasing, and brand services.
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
