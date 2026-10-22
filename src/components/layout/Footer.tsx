'use client';

import React from 'react';
import Link from 'next/link';
import { siteSettings } from '@/content/siteSettings';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--ink-deep)] text-[#F5F2EC] font-sans border-t border-[rgba(255,255,255,0.14)]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 pt-20 pb-16">
        {/* Top: Very large closing line in Newsreader ('Start a conversation') linking to /contact */}
        <div className="pb-16 md:pb-24">
          <Link
            href="/contact"
            className="group inline-flex flex-col items-start gap-4 text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
            aria-label="Start a conversation with HRS Group"
          >
            <span className="text-[14px] text-[rgba(245,242,236,0.65)] font-sans flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
              <span>Direct enquiries and partnerships</span>
            </span>

            <div className="relative inline-flex items-center gap-4 sm:gap-8 flex-wrap">
              <span className="font-serif text-[clamp(2.75rem,7.5vw,7rem)] text-[#F5F2EC] font-normal tracking-tight leading-[0.98]">
                Start a conversation
              </span>
              <span
                className="font-serif text-[clamp(2.75rem,7.5vw,7rem)] text-[#F5F2EC] font-normal transition-transform duration-300 group-hover:translate-x-3 select-none leading-[0.98]"
                aria-hidden="true"
              >
                &rarr;
              </span>
              {/* Orange underline drawing smoothly on hover */}
              <span
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--orange)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </Link>
        </div>

        {/* Below: Hairline-separated link columns */}
        <div className="grid grid-cols-12 gap-8 border-t border-[rgba(255,255,255,0.14)] pt-12 pb-16">
          {/* Column 1: Businesses by Sector */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[rgba(245,242,236,0.78)] m-0">
              Businesses
            </h3>
            <ul className="space-y-2.5 m-0 p-0 list-none text-[15px]">
              <li>
                <Link
                  href="/businesses?sector=built-environment"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Built environment
                </Link>
              </li>
              <li>
                <Link
                  href="/businesses?sector=food-and-consumer"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Food and consumer
                </Link>
              </li>
              <li>
                <Link
                  href="/businesses?sector=hospitality-leasing-retail"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Hospitality and leasing
                </Link>
              </li>
              <li>
                <Link
                  href="/businesses?sector=services"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[rgba(245,242,236,0.78)] m-0">
              Company
            </h3>
            <ul className="space-y-2.5 m-0 p-0 list-none text-[15px]">
              <li>
                <Link
                  href="/about"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  About the group
                </Link>
              </li>
              <li>
                <Link
                  href="/about#leadership"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="/about#milestones"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Milestones
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  News and announcements
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ahmedabad Head Office */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[rgba(245,242,236,0.78)] m-0">
              Ahmedabad head office
            </h3>
            <address className="not-italic text-[14.5px] leading-relaxed text-[rgba(245,242,236,0.78)] font-sans space-y-1">
              <div>HRS House, Near Pakwan Cross Roads</div>
              <div>SG Highway, Bodakdev</div>
              <div>Ahmedabad 380054, Gujarat, India</div>
              <div className="pt-2">
                <a
                  href={`tel:${siteSettings.headquarters.phone}`}
                  className="text-[#F5F2EC] hover:text-[var(--orange)] transition-colors"
                >
                  {siteSettings.headquarters.phone}
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Contact & Channels */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[rgba(245,242,236,0.78)] m-0">
              Contact & details
            </h3>
            <div className="text-[14.5px] leading-relaxed text-[rgba(245,242,236,0.78)] space-y-2">
              <div>
                <a
                  href={`mailto:${siteSettings.headquarters.email}`}
                  className="text-[#F5F2EC] hover:text-[var(--orange)] transition-colors"
                >
                  {siteSettings.headquarters.email}
                </a>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] transition-colors"
                >
                  Send an enquiry
                </Link>
                <span className="text-[13px] text-[rgba(245,242,236,0.65)]">
                  Registered Parent Enterprise &bull; Gujarat & Karnataka
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Legal Line, Core Values & Back to Top */}
        <div className="border-t border-[rgba(255,255,255,0.14)] pt-8 flex flex-col md:flex-row items-baseline justify-between gap-6 text-[13px] text-[rgba(245,242,236,0.78)] font-sans">
          <div className="space-y-1">
            <div>&copy; 2026 HRS Group. All rights reserved.</div>
            <div>Values: Faith &bull; Trust &bull; Foundation &bull; People &bull; Process &bull; Service</div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/styleguide"
              className="text-[rgba(245,242,236,0.78)] hover:text-[#F5F2EC] transition-colors"
            >
              Design styleguide
            </Link>
            <Link
              href="/privacy"
              className="text-[rgba(245,242,236,0.78)] hover:text-[#F5F2EC] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[rgba(245,242,236,0.78)] hover:text-[#F5F2EC] transition-colors"
            >
              Terms
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="bg-transparent border-0 p-0 text-[13px] text-[rgba(245,242,236,0.85)] hover:text-[#F5F2EC] cursor-pointer inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <span aria-hidden="true">&uarr;</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
