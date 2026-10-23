'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { sectors } from '@/content/sectors';
import { siteConfig } from '@/content/site';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-surface="ink"
      role="contentinfo"
      className="relative w-full bg-[var(--ink)] text-white pt-20 pb-12 overflow-hidden border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Large Closing Line: Start a conversation */}
        <div className="border-b border-white/15 pb-16">
          <Link
            href="/contact"
            className="group flex flex-col md:flex-row md:items-center justify-between gap-8 text-left transition-colors"
          >
            <div>
              <span className="text-xs font-semibold text-[var(--hrs-orange)]">
                Dialogue & inquiries
              </span>
              <h2 className="mt-3 font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-[var(--hrs-orange)]">
                Start a conversation
              </h2>
            </div>

            <div className="self-start md:self-center shrink-0">
              <MagneticButton strength={0.4}>
                <span className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[var(--hrs-orange)] text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-[var(--ink)]">
                  <ArrowUpRight className="h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </MagneticButton>
            </div>
          </Link>
        </div>

        {/* Directory Grid: Sectors & Company Links */}
        <div className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-6 border-b border-white/15">
          {/* Sector 1: Built Environment */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--hrs-orange)]">
              Built Environment
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/businesses#hrishikesh-ventures" className="hover:text-white transition-colors">
                  Hrishikesh Ventures
                </Link>
              </li>
              <li>
                <Link href="/businesses#hrs-aluglaze" className="hover:text-white transition-colors">
                  HRS Aluglaze Ltd
                </Link>
              </li>
              <li>
                <Link href="/businesses#geotrix" className="hover:text-white transition-colors">
                  Geotrix Pvt. Ltd.
                </Link>
              </li>
              <li>
                <Link href="/businesses#school-of-facade-technologies" className="hover:text-white transition-colors">
                  School of Facade Tech
                </Link>
              </li>
            </ul>
          </div>

          {/* Sector 2: Retail */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--hrs-orange)]">
              Retail
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/bogo" className="hover:text-white transition-colors">
                  BOGO Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/bogo#formats" className="hover:text-white transition-colors">
                  BOGO Square
                </Link>
              </li>
              <li>
                <Link href="/bogo#formats" className="hover:text-white transition-colors">
                  BOGO Bazaar & Mini
                </Link>
              </li>
              <li>
                <Link href="/bogo#distribution" className="hover:text-white transition-colors">
                  BOGO Go Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Sector 3: Food & Consumer */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--hrs-orange)]">
              Food & Consumer
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/businesses#hrishikesh-food-products" className="hover:text-white transition-colors">
                  Hrishikesh Food Products
                </Link>
              </li>
              <li>
                <Link href="/businesses#hrishikesh-consumer-products" className="hover:text-white transition-colors">
                  Consumer Products (13)
                </Link>
              </li>
              <li>
                <Link href="/businesses#hrishikesh-consumer-products" className="hover:text-white transition-colors">
                  Manpras Grocery
                </Link>
              </li>
            </ul>
          </div>

          {/* Sector 4: Hospitality & Leasing */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--hrs-orange)]">
              Hospitality & Leasing
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/businesses#firstgen-assets" className="hover:text-white transition-colors">
                  FirstGen Assets
                </Link>
              </li>
              <li>
                <Link href="/businesses#firstgen-hotels" className="hover:text-white transition-colors">
                  Flight Stays (Bengaluru)
                </Link>
              </li>
              <li>
                <Link href="/businesses#firstgen-hotels" className="hover:text-white transition-colors">
                  Amuktamalyada Dining
                </Link>
              </li>
              <li>
                <Link href="/businesses#firstgen-enterprises" className="hover:text-white transition-colors">
                  The Bluprint & ShubhVista
                </Link>
              </li>
            </ul>
          </div>

          {/* Sector 5: Services */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--hrs-orange)]">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/businesses#indian-brand-house" className="hover:text-white transition-colors">
                  Indian Brand House
                </Link>
              </li>
              <li>
                <Link href="/businesses#indian-brand-house" className="hover:text-white transition-colors">
                  Strategy & Identity
                </Link>
              </li>
              <li>
                <Link href="/businesses#indian-brand-house" className="hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--hrs-orange)]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About HRS Group
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="hover:text-white transition-colors">
                  All Businesses
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News & Milestones
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Operating Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-b border-white/15 text-xs text-neutral-400">
          <div>
            <span className="font-semibold text-white block mb-1">
              Headquarters • Ahmedabad
            </span>
            <p className="leading-relaxed">
              {siteConfig.contact.hqAddress}
            </p>
            <p className="mt-2 text-neutral-300">
              Phone: {siteConfig.contact.phone} • Email: {siteConfig.contact.email}
            </p>
          </div>

          <div>
            <span className="font-semibold text-white block mb-1">
              Southern Regional Hub • Bengaluru
            </span>
            <p className="leading-relaxed">
              {siteConfig.contact.bengaluruAddress}
            </p>
            <p className="mt-2 text-neutral-300">
              Specialized desks for Geotrix Facades and FirstGen Hospitality.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Legal + Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-500">
          <p>
            © {currentYear} HRS Group. All rights reserved. Diversified business operations headquartered in Ahmedabad, Gujarat.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:bg-[var(--hrs-orange)] group-hover:text-white transition-colors">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
