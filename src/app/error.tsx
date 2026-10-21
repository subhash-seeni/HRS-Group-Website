'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[HRS Application Error]:', error);
  }, [error]);

  return (
    <div className="py-28 md:py-40 min-h-[60vh] flex items-center bg-[var(--white)] font-sans">
      <Container>
        <div className="max-w-[62ch] space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--orange)] inline-block" />
            <span className="text-[13px] text-[var(--muted)] font-sans">
              System notice
            </span>
          </div>
          <h1 className="text-display-2 text-[var(--ink)] font-serif font-normal m-0">
            An unexpected error occurred
          </h1>
          <p className="text-[17.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
            The page could not be displayed due to an internal rendering interruption. Our technical team has been notified.
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center bg-[var(--ink)] text-[var(--white)] px-6 py-3 font-sans text-[15px] font-medium rounded-[2px] hover:bg-[#2D2D2D] transition-colors"
            >
              Retry page
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-[var(--rule)] text-[var(--ink)] px-6 py-3 font-sans text-[15px] font-medium rounded-[2px] hover:bg-[var(--paper)] transition-colors"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
