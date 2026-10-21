'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { entities } from '@/content/entities';
import { Sector } from '@/content/types';

export const Header: React.FC = () => {
  const [businessesOpen, setBusinessesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const businessesButtonRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);

  // Group entities by sector dynamically from /src/content/entities.ts
  const sectors: Sector[] = [
    'Built Environment',
    'Food and Consumer',
    'Hospitality, Leasing and Retail',
    'Services',
  ];

  const entitiesBySector: Record<Sector, typeof entities> = {
    'Built Environment': entities.filter((e) => e.sector === 'Built Environment'),
    'Food and Consumer': entities.filter((e) => e.sector === 'Food and Consumer'),
    'Hospitality, Leasing and Retail': entities.filter(
      (e) => e.sector === 'Hospitality, Leasing and Retail'
    ),
    Services: entities.filter((e) => e.sector === 'Services'),
  };

  // Close menus when route changes
  useEffect(() => {
    setBusinessesOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close businesses panel or mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (businessesOpen) {
          setBusinessesOpen(false);
          businessesButtonRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [businessesOpen, mobileMenuOpen]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle click outside businesses panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        businessesOpen &&
        megaPanelRef.current &&
        !megaPanelRef.current.contains(e.target as Node) &&
        businessesButtonRef.current &&
        !businessesButtonRef.current.contains(e.target as Node)
      ) {
        setBusinessesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [businessesOpen]);

  const toggleSectorMobile = (sector: string) => {
    setMobileSectorsOpen((prev) => ({
      ...prev,
      [sector]: !prev[sector],
    }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[80px] bg-[var(--white)] border-b border-[var(--rule)] transition-colors duration-150">
      <div className="max-w-[1280px] mx-auto h-full px-6 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Left: HRS Group Logo */}
        <Link
          href="/"
          className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
          aria-label="HRS Group homepage"
        >
          <Logo entity="hrs-group" height={30} />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10 font-sans text-[15px]"
          aria-label="Main navigation"
        >
          <Link
            href="/about"
            className="text-[var(--ink)] hover:text-[var(--ink)] link-editorial py-1"
          >
            About
          </Link>

          {/* Businesses Mega-Panel Toggle Button */}
          <button
            ref={businessesButtonRef}
            type="button"
            id="businesses-nav-button"
            aria-expanded={businessesOpen}
            aria-controls="businesses-panel"
            onClick={() => setBusinessesOpen(!businessesOpen)}
            className={`inline-flex items-center gap-1.5 py-1 text-[var(--ink)] bg-transparent border-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px] ${
              businessesOpen ? 'border-b-2 border-[var(--orange)] font-medium' : 'link-editorial'
            }`}
          >
            <span>Businesses</span>
            <ChevronDown
              className={`w-3.5 h-3.5 stroke-[1.5] transition-transform duration-150 ${
                businessesOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          <Link
            href="/news"
            className="text-[var(--ink)] hover:text-[var(--ink)] link-editorial py-1"
          >
            News
          </Link>

          <Link
            href="/careers"
            className="text-[var(--ink)] hover:text-[var(--ink)] link-editorial py-1"
          >
            Careers
          </Link>

          {/* Contact with orange micro-dot marker */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--ink)] py-1 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
          >
            <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
            <span className="link-editorial">Contact</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden inline-flex items-center justify-center p-2 text-[var(--ink)] bg-transparent border-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 stroke-[1.5]" />
          ) : (
            <Menu className="w-6 h-6 stroke-[1.5]" />
          )}
        </button>
      </div>

      {/* Desktop Businesses Mega-Panel */}
      {businessesOpen ? (
        <div
          ref={megaPanelRef}
          id="businesses-panel"
          role="region"
          aria-labelledby="businesses-nav-button"
          className="hidden md:block absolute top-[80px] left-0 right-0 bg-[var(--white)] border-b border-[var(--rule)] shadow-none z-30 transition-all duration-150"
        >
          <div className="max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 py-10">
            <div className="grid grid-cols-4 gap-8 lg:gap-12">
              {sectors.map((sector) => (
                <div key={sector} className="space-y-6">
                  {/* Sector Title */}
                  <div className="border-b border-[var(--rule)] pb-2">
                    <span className="font-serif text-[18px] text-[var(--ink)]">
                      {sector}
                    </span>
                  </div>

                  {/* Entity List */}
                  <ul className="space-y-5 m-0 p-0 list-none">
                    {entitiesBySector[sector].map((entity) => (
                      <li key={entity.slug} className="group">
                        <Link
                          href={`/entities/${entity.slug}`}
                          className="block text-left text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
                        >
                          <div className="flex items-center justify-between text-[15px] font-medium text-[var(--ink)] group-hover:text-[var(--ink)]">
                            <span className="border-b border-transparent group-hover:border-[var(--orange)] transition-colors duration-150">
                              {entity.name}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                          </div>
                          <p className="text-[13px] text-[var(--muted)] line-clamp-1 mt-0.5 font-sans leading-normal">
                            {entity.summary}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-4 border-t border-[var(--rule)] flex items-center justify-between text-[13px] text-[var(--muted)] font-sans">
              <span>Eight entities across four operating sectors</span>
              <button
                type="button"
                onClick={() => setBusinessesOpen(false)}
                className="text-[var(--ink)] border-b border-[var(--rule)] hover:border-[var(--orange)] bg-transparent p-0 cursor-pointer text-[13px]"
              >
                Close panel (Esc)
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="md:hidden fixed inset-0 top-[80px] bg-[var(--white)] z-50 overflow-y-auto px-6 py-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Primary Large Newsreader Links */}
            <nav className="space-y-3">
              <div>
                <Link
                  href="/"
                  className="font-serif text-[28px] text-[var(--ink)] block py-0.5"
                >
                  Overview
                </Link>
              </div>
              <div>
                <Link
                  href="/about"
                  className="font-serif text-[28px] text-[var(--ink)] block py-0.5"
                >
                  About
                </Link>
              </div>

              {/* Businesses Expandable Accordions on Mobile */}
              <div className="py-2 border-t border-b border-[var(--rule)]">
                <div className="font-serif text-[28px] text-[var(--ink)] py-1">
                  Businesses
                </div>
                <div className="space-y-2 mt-1 pl-1">
                  {sectors.map((sector) => {
                    const isOpen = Boolean(mobileSectorsOpen[sector]);

                    return (
                      <div key={sector} className="border-b border-[var(--rule)] pb-3">
                        <button
                          type="button"
                          onClick={() => toggleSectorMobile(sector)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between text-left py-2 bg-transparent border-0 cursor-pointer text-[16px] font-sans font-medium text-[var(--ink)]"
                        >
                          <span>{sector}</span>
                          <span className="text-[18px] text-[var(--muted)]">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                        {isOpen ? (
                          <ul className="pl-2 space-y-3 mt-2 list-none">
                            {entitiesBySector[sector].map((entity) => (
                              <li key={entity.slug}>
                                <Link
                                  href={`/entities/${entity.slug}`}
                                  className="block py-1"
                                >
                                  <div className="text-[15px] font-medium text-[var(--ink)]">
                                    {entity.name}
                                  </div>
                                  <div className="text-[12.5px] text-[var(--muted)]">
                                    {entity.summary}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Link
                  href="/news"
                  className="font-serif text-[28px] text-[var(--ink)] block py-0.5"
                >
                  News
                </Link>
              </div>
              <div>
                <Link
                  href="/careers"
                  className="font-serif text-[28px] text-[var(--ink)] block py-0.5"
                >
                  Careers
                </Link>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="font-serif text-[28px] text-[var(--ink)] flex items-center gap-3 py-0.5"
                >
                  <span className="w-2.5 h-2.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>Contact</span>
                </Link>
              </div>
            </nav>
          </div>

          <div className="pt-6 border-t border-[var(--rule)] text-[13px] text-[var(--muted)] font-sans">
            <div>HRS Group &bull; Ahmedabad, Gujarat</div>
            <div className="mt-1">+91 79 2685 4100</div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
