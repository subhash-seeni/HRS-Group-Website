'use client';

import React, { useState, useEffect } from 'react';

export const CookieNotice: React.FC = () => {
  const [acknowledged, setAcknowledged] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('hrs_cookie_consent');
      if (!consent) {
        setAcknowledged(false);
      }
    } catch {
      // Storage access blocked or restricted
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('hrs_cookie_consent', 'acknowledged');
    } catch {
      // Storage unavailable
    }
    setAcknowledged(true);
  };

  if (acknowledged) return null;

  return (
    <aside
      aria-label="Cookie and privacy notice"
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40 max-w-[340px] p-4 bg-[var(--white)] border border-[var(--rule)] shadow-sm font-sans"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--orange)] rounded-full" aria-hidden="true" />
          <span className="text-[12px] uppercase tracking-wider text-[var(--muted)]">
            Privacy notice
          </span>
        </div>
        <p className="text-[13px] leading-[1.5] text-[var(--muted)] m-0">
          We use functional cookies to retain enquiry selections and understand portal traffic. No commercial advertising trackers are deployed.
        </p>
        <div className="pt-1 flex items-center justify-between">
          <button
            type="button"
            onClick={handleAccept}
            className="text-[12px] font-medium text-[var(--white)] bg-[var(--ink)] px-3 py-1.5 rounded-[2px] hover:bg-[#2D2D2D] transition-colors"
          >
            Acknowledge
          </button>
          <a
            href="/privacy"
            className="text-[12px] text-[var(--muted)] hover:text-[var(--ink)] underline transition-colors"
          >
            Read policy
          </a>
        </div>
      </div>
    </aside>
  );
};
