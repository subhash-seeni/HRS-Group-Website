import React from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';

export const metadata = {
  title: 'News • HRS Group',
  description: 'Corporate announcements and operational updates from HRS Group.',
};

export default function NewsPage() {
  return (
    <main className="min-h-screen py-24">
      <Section surface="paper">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            Corporate Communications
          </p>
          <h1 className="mt-3 font-['Bricolage_Grotesque'] text-5xl font-extrabold tracking-tight text-[var(--ink)]">
            News & Announcements
          </h1>
          <p className="mt-6 text-lg text-neutral-700">
            Official announcements, facility openings, and operational milestones from HRS Group entities in Ahmedabad and Bengaluru.
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
