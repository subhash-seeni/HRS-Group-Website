import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ArrowUpRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section } from '@/components/ui';

export const metadata = {
  title: 'Page not found · HRS Group',
  description: 'The requested page could not be found.',
};

const RESCUE_LINKS = [
  { name: 'Operating Businesses', href: '/businesses', desc: 'Browse our complete enterprise directory' },
  { name: 'BOGO Retail Ecosystem', href: '/bogo', desc: 'Multi-format stores and consumer brands' },
  { name: 'Facade Engineering', href: '/businesses/hrs-aluglaze', desc: 'Sanand manufacturing plant and systems' },
  { name: 'Careers Board', href: '/careers', desc: 'Active openings across technical and corporate roles' },
  { name: 'News & Announcements', href: '/news', desc: 'Recent disclosures and operational updates' },
  { name: 'Contact Corporate HQ', href: '/contact', desc: 'Direct routing to operating division desks' },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen">
        <Section surface="paper" className="pt-32 pb-24 text-center">
          <div className="mx-auto max-w-3xl">
            <span className="font-['Bricolage_Grotesque'] text-8xl sm:text-9xl font-extrabold text-[var(--hrs-orange)] tabular-nums block leading-none mb-4">
              404
            </span>

            <h1 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
              Page not found
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 mb-8 max-w-xl mx-auto leading-relaxed">
              The page you are looking for may have been moved, updated, or does not exist. Use the shortcuts below to navigate back to our operating divisions.
            </p>

            <div className="inline-flex gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] text-white px-8 py-4 text-xs font-bold tracking-tight hover:bg-neutral-800 transition-colors"
              >
                <span>Return to homepage</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </Section>

        {/* Rescue Directory: Surface White */}
        <Section surface="white">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--hrs-orange)] mb-3">
              <Compass className="h-4 w-4" />
              <span>Recommended destinations</span>
            </div>
            <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-8">
              Explore key areas of the enterprise
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESCUE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border border-[var(--ink)]/15 bg-[var(--paper)] p-6 transition-all duration-200 hover:border-[var(--ink)] hover:bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-colors">
                        {item.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-[var(--hrs-orange)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
