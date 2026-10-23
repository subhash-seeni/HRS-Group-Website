import React from 'react';
import Link from 'next/link';
import { Section, Button, Logo } from '@/components/ui';

export const metadata = {
  title: 'BOGO • Connected Retail Ecosystem',
  description: 'Multi-format retail, eleven specialised brands, and intelligent technology.',
};

export default function BogoPage() {
  return (
    <main className="min-h-screen py-24">
      <Section surface="bogo-navy">
        <div className="max-w-3xl">
          <div className="mb-6">
            <Logo slug="bogo" height="h-12" />
          </div>
          <p className="text-xs font-semibold tracking-wider text-[var(--bogo-orange)] uppercase">
            Retail Ecosystem
          </p>
          <h1 className="mt-3 font-['Bricolage_Grotesque'] text-5xl font-extrabold tracking-tight text-white">
            BOGO Retail
          </h1>
          <p className="mt-6 text-lg text-neutral-300">
            A connected retail ecosystem uniting specialised formats (BOGO Square, BOGO Bazaar, BOGO Mini), eleven consumer category brands, and direct distribution under BOGO Go.
          </p>
          <div className="mt-10">
            <Button href="/" variant="orange">
              Return to Homepage
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
