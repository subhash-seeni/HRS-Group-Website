import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';

export const metadata = {
  title: 'Page not found • HRS Group',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-[85vh] w-full flex-col justify-center items-center bg-[var(--paper)] px-6 pt-32 pb-20 text-center">
        <div className="mx-auto max-w-xl">
          <span className="font-['Bricolage_Grotesque'] text-7xl sm:text-8xl font-extrabold text-[var(--hrs-orange)] tabular-nums block mb-4">
            404
          </span>
          <h1 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
            Page not found
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mb-8 leading-relaxed">
            The link you followed may be broken or the page may have been moved. Return to the homepage to explore our businesses.
          </p>

          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] text-white px-8 py-4 text-sm font-semibold tracking-tight hover:bg-neutral-800 transition-colors"
          >
            <span>Return to homepage</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
