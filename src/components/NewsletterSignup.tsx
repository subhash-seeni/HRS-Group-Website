'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { trackNewsletterSignup } from '@/lib/analytics';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      trackNewsletterSignup('news_footer');
      setEmail('');
    }, 500);
  };

  return (
    <div className="border border-[var(--rule)] bg-[var(--paper)] p-8 md:p-12 font-sans my-16">
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-6 space-y-2">
          <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block">
            Institutional bulletin
          </span>
          <h3 className="text-[22px] md:text-[26px] font-serif font-normal text-[var(--ink)] m-0">
            Subscribe to group updates
          </h3>
          <p className="text-[14px] leading-[1.6] text-[var(--muted)] max-w-[48ch] m-0">
            Quarterly engineering reports, facility announcements, and property handover notices delivered directly to your inbox.
          </p>
        </div>

        <div className="col-span-12 md:col-span-6">
          {status === 'success' ? (
            <div
              role="status"
              className="p-4 bg-[var(--white)] border border-[var(--rule)] text-[14px] text-[var(--ink)] flex items-center gap-2.5"
            >
              <span className="w-2 h-2 bg-[var(--orange)]" aria-hidden="true" />
              <span>Thank you. Your email has been added to our quarterly bulletin distribution.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="flex-1 h-12 px-4 bg-[var(--white)] border border-[var(--rule)] text-[15px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px]"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={status === 'submitting'}
                className="h-12 px-6 shrink-0"
              >
                {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
