import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="py-24 md:py-36 min-h-[60vh] flex items-center">
      <Container>
        <div className="max-w-[62ch] space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--orange)] inline-block" />
            <span className="text-[13px] text-[var(--muted)] font-sans">
              Error 404
            </span>
          </div>
          <h1 className="text-display-2 text-[var(--ink)]">
            Page not found
          </h1>
          <p className="text-[17.5px] leading-relaxed text-[var(--muted)] font-sans">
            The requested page does not exist or has been moved to another location within the group site.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[var(--ink)] text-[var(--white)] border border-[var(--ink)] hover:bg-[var(--orange)] hover:text-[var(--ink)] hover:border-[var(--orange)] px-6 py-3 font-sans text-[16px] rounded-[2px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
            >
              Return to overview
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
