import React from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';

export const metadata = {
  title: 'Contact • HRS Group',
  description: 'Headquarters in Ahmedabad, regional hub in Bengaluru, and manufacturing contacts.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-24">
      <Section surface="paper">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            Get In Touch
          </p>
          <h1 className="mt-3 font-['Bricolage_Grotesque'] text-5xl font-extrabold tracking-tight text-[var(--ink)]">
            Contact HRS Group
          </h1>
          <p className="mt-6 text-lg text-neutral-700">
            Reach out to our corporate headquarters in Bodakdev, Ahmedabad, or our southern regional offices in Kadubeesanahalli, Bengaluru.
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
