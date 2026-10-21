import React from 'react';
import Link from 'next/link';
import { siteSettings } from '@/content/siteSettings';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--white)] text-[var(--ink)] font-sans">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 pt-20 pb-16">
        {/* Short Group Statement in Newsreader */}
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <p className="font-serif text-[24px] sm:text-[28px] md:text-[30px] leading-[1.25] text-[var(--ink)] font-normal tracking-tight m-0">
              HRS Group brings together eight entities across facade engineering, real estate,
              food manufacturing, consumer brands, hospitality, education, brand communications
              and retail.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col justify-end">
            <div className="text-[14px] text-[var(--muted)] font-sans">
              Headquartered in Ahmedabad, Gujarat, with regional operating facilities in Bengaluru, Karnataka.
            </div>
          </div>
        </div>

        {/* Plain Link Columns */}
        <div className="grid grid-cols-12 gap-8 border-t border-[var(--rule)] pt-12 pb-16">
          {/* Column 1: Businesses by Sector */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[var(--muted)]">
              Businesses
            </h3>
            <ul className="space-y-2.5 m-0 p-0 list-none text-[15px]">
              <li>
                <Link href="/businesses?sector=built-environment" className="link-editorial">
                  Built environment
                </Link>
              </li>
              <li>
                <Link href="/businesses?sector=food-and-consumer" className="link-editorial">
                  Food and consumer
                </Link>
              </li>
              <li>
                <Link href="/businesses?sector=hospitality-leasing-retail" className="link-editorial">
                  Hospitality and leasing
                </Link>
              </li>
              <li>
                <Link href="/businesses?sector=services" className="link-editorial">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[var(--muted)]">
              Company
            </h3>
            <ul className="space-y-2.5 m-0 p-0 list-none text-[15px]">
              <li>
                <Link href="/about" className="link-editorial">
                  About the group
                </Link>
              </li>
              <li>
                <Link href="/about#leadership" className="link-editorial">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/about#milestones" className="link-editorial">
                  Milestones
                </Link>
              </li>
              <li>
                <Link href="/news" className="link-editorial">
                  News and announcements
                </Link>
              </li>
              <li>
                <Link href="/careers" className="link-editorial">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ahmedabad Head Office */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[var(--muted)]">
              Ahmedabad head office
            </h3>
            <address className="not-italic text-[14.5px] leading-relaxed text-[var(--muted)] font-sans space-y-1">
              <div>HRS House, Near Pakwan Cross Roads</div>
              <div>SG Highway, Bodakdev</div>
              <div>Ahmedabad 380054, Gujarat, India</div>
              <div className="pt-2 text-[var(--ink)]">
                <a href={`tel:${siteSettings.headquarters.phone}`} className="link-editorial">
                  {siteSettings.headquarters.phone}
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Contact & Channels */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-sans font-medium uppercase tracking-wider text-[var(--muted)]">
              Contact & channels
            </h3>
            <div className="text-[14.5px] leading-relaxed text-[var(--muted)] space-y-2">
              <div>
                <a href={`mailto:${siteSettings.headquarters.email}`} className="link-editorial text-[var(--ink)]">
                  {siteSettings.headquarters.email}
                </a>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial"
                >
                  LinkedIn
                </a>
                <Link href="/contact" className="link-editorial">
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Small Legal Line & Core Values */}
        <div className="border-t border-[var(--rule)] pt-8 flex flex-col md:flex-row items-baseline justify-between gap-4 text-[13px] text-[var(--muted)] font-sans">
          <div className="space-y-1">
            <div>&copy; 2026 HRS Group. All rights reserved.</div>
            <div>Values: Faith &bull; Trust &bull; Foundation &bull; People &bull; Process &bull; Service</div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/styleguide" className="text-[var(--muted)] hover:text-[var(--ink)]">
              Design styleguide
            </Link>
            <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--ink)]">
              Privacy
            </Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--ink)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
