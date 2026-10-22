'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll } from 'motion/react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { LineLink } from '@/components/motion/LineLink';
import { entities } from '@/content/entities';
import { Sector } from '@/content/types';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [businessesOpen, setBusinessesOpen] = useState(false);
  const [hoveredEntitySlug, setHoveredEntitySlug] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState<Record<string, boolean>>({});

  const pathname = usePathname();
  const businessesButtonRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll();

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

  // Scroll listener: transparent over first 80px, hide on scroll down, return on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledPastThreshold = currentScrollY > 80;
      setIsScrolled(scrolledPastThreshold);

      if (currentScrollY <= 80 || businessesOpen || mobileMenuOpen) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 120) {
        // Scrolling down past 120px -> hide
        setIsHidden(true);
      } else if (currentScrollY < lastScrollYRef.current) {
        // Scrolling up -> return
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [businessesOpen, mobileMenuOpen]);

  const [isInkOpening, setIsInkOpening] = useState(false);

  // Close menus when route changes
  useEffect(() => {
    setBusinessesOpen(false);
    setMobileMenuOpen(false);
    setHoveredEntitySlug(null);

    const checkOpening = () => {
      const firstSection = document.querySelector('main > *:first-child, section[data-surface]');
      if (firstSection) {
        const surface = firstSection.getAttribute('data-surface');
        setIsInkOpening(surface === 'ink');
      } else {
        setIsInkOpening(false);
      }
    };
    checkOpening();
    const timer = setTimeout(checkOpening, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isLightText = isInkOpening && !isScrolled && !businessesOpen;

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

  // Focus trap for businesses panel
  useEffect(() => {
    if (!businessesOpen || !megaPanelRef.current) return;

    const focusableElements = megaPanelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    megaPanelRef.current.addEventListener('keydown', handleTabKey);
    return () => {
      megaPanelRef.current?.removeEventListener('keydown', handleTabKey);
    };
  }, [businessesOpen]);

  const toggleSectorMobile = (sector: string) => {
    setMobileSectorsOpen((prev) => ({
      ...prev,
      [sector]: !prev[sector],
    }));
  };

  // Nav link active checks
  const isAboutActive = pathname === '/about';
  const isBusinessesActive =
    pathname.startsWith('/businesses') || pathname.startsWith('/entities');
  const isNewsActive = pathname.startsWith('/news');
  const isCareersActive = pathname.startsWith('/careers');
  const isContactActive = pathname.startsWith('/contact');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[80px] transition-all duration-300 ${
          isScrolled || businessesOpen
            ? 'bg-[var(--white)] border-b border-[var(--rule)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition:
            'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease, border-color 200ms ease',
        }}
      >
        <div className="max-w-[1280px] mx-auto h-full px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Left: HRS Group Logo (Reduces to 90% once scrolled) */}
          <Link
            href="/"
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
            aria-label="HRS Group homepage"
          >
            <div
              style={{
                transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
                transformOrigin: 'left center',
                transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <Logo entity="hrs-group" variant={isLightText ? 'light' : 'auto'} height={30} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center gap-8 lg:gap-10 font-sans text-[15px] ${
              isLightText ? 'text-[#F5F2EC]' : 'text-[var(--ink)]'
            }`}
            aria-label="Main navigation"
          >
            {/* About */}
            <LineLink href="/about" className="py-1">
              <span className="flex items-center gap-2">
                {isAboutActive && (
                  <motion.span
                    layoutId="header-active-dot"
                    className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>About</span>
              </span>
            </LineLink>

            {/* Businesses Mega-Panel Toggle Button */}
            <div className="relative">
              <button
                ref={businessesButtonRef}
                type="button"
                id="businesses-nav-button"
                aria-expanded={businessesOpen}
                aria-controls="businesses-panel"
                onClick={() => setBusinessesOpen(!businessesOpen)}
                className={`inline-flex items-center gap-1.5 py-1 ${
                  isLightText ? 'text-[#F5F2EC]' : 'text-[var(--ink)]'
                } bg-transparent border-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px] ${
                  businessesOpen || isBusinessesActive ? 'font-medium' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  {isBusinessesActive && (
                    <motion.span
                      layoutId="header-active-dot"
                      className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>Businesses</span>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 stroke-[1.5] transition-transform duration-200 ${
                    businessesOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* News */}
            <LineLink href="/news" className="py-1">
              <span className="flex items-center gap-2">
                {isNewsActive && (
                  <motion.span
                    layoutId="header-active-dot"
                    className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>News</span>
              </span>
            </LineLink>

            {/* Careers */}
            <LineLink href="/careers" className="py-1">
              <span className="flex items-center gap-2">
                {isCareersActive && (
                  <motion.span
                    layoutId="header-active-dot"
                    className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>Careers</span>
              </span>
            </LineLink>

            {/* Contact */}
            <LineLink href="/contact" className="py-1">
              <span className="flex items-center gap-2">
                {isContactActive && (
                  <motion.span
                    layoutId="header-active-dot"
                    className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>Contact</span>
              </span>
            </LineLink>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`md:hidden inline-flex items-center justify-center p-2 ${
              isLightText ? 'text-[#F5F2EC]' : 'text-[var(--ink)]'
            } bg-transparent border-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>

        {/* 2px Orange Scroll-Progress Line along bottom edge */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--orange)] origin-left pointer-events-none"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      {/* Desktop Businesses Mega-Panel: 450ms clip-path reveal from top */}
      <div
        ref={megaPanelRef}
        id="businesses-panel"
        role="region"
        aria-labelledby="businesses-nav-button"
        aria-hidden={!businessesOpen}
        className={`hidden md:block fixed top-[80px] left-0 right-0 bg-[var(--white)] border-b border-[var(--rule)] z-30 transition-all ${
          businessesOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          clipPath: businessesOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          transition: 'clip-path 450ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 py-10">
          <div className="grid grid-cols-4 gap-8 lg:gap-12">
            {sectors.map((sector, sectorIdx) => (
              <div
                key={sector}
                className="space-y-6"
                style={{
                  opacity: businessesOpen ? 1 : 0,
                  transform: businessesOpen ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) ${sectorIdx * 60}ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) ${sectorIdx * 60}ms`,
                }}
              >
                {/* Sector Title */}
                <div className="border-b border-[var(--rule)] pb-2">
                  <span className="font-serif text-[18px] text-[var(--ink)]">
                    {sector}
                  </span>
                </div>

                {/* Entity List */}
                <ul className="space-y-4 m-0 p-0 list-none">
                  {entitiesBySector[sector].map((entity) => {
                    const isHovered = hoveredEntitySlug === entity.slug;
                    const isDimmed =
                      hoveredEntitySlug !== null && hoveredEntitySlug !== entity.slug;

                    return (
                      <li
                        key={entity.slug}
                        onMouseEnter={() => setHoveredEntitySlug(entity.slug)}
                        onMouseLeave={() => setHoveredEntitySlug(null)}
                        style={{
                          opacity: isDimmed ? 0.45 : 1,
                          transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                          transition:
                            'opacity 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <Link
                          href={`/businesses/${entity.slug}`}
                          onFocus={() => setHoveredEntitySlug(entity.slug)}
                          onBlur={() => setHoveredEntitySlug(null)}
                          className="block text-left text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
                        >
                          <div className="flex items-center justify-between text-[15px] font-medium text-[var(--ink)]">
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0 transition-opacity duration-150 ${
                                  isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                              <span className="border-b border-transparent hover:border-[var(--orange)] transition-colors duration-150">
                                {entity.name}
                              </span>
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                          </div>

                          {/* Description revealed beneath */}
                          <div
                            className="overflow-hidden transition-all duration-300 ease-out"
                            style={{
                              maxHeight: isHovered ? '60px' : '0px',
                              opacity: isHovered ? 1 : 0,
                              marginTop: isHovered ? '4px' : '0px',
                            }}
                          >
                            <p className="text-[13px] text-[var(--muted)] font-sans leading-relaxed m-0 line-clamp-2">
                              {entity.summary}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-4 border-t border-[var(--rule)] flex items-center justify-between text-[13px] text-[var(--muted)] font-sans">
            <span>Eight entities across four operating sectors</span>
            <button
              type="button"
              onClick={() => {
                setBusinessesOpen(false);
                businessesButtonRef.current?.focus();
              }}
              className="text-[var(--ink)] border-b border-[var(--rule)] hover:border-[var(--orange)] bg-transparent p-0 cursor-pointer text-[13px]"
            >
              Close panel (Esc)
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Menu: Ink-deep surface sliding down */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`md:hidden fixed inset-0 top-0 bg-[var(--ink-deep)] text-[#F5F2EC] z-50 overflow-y-auto px-6 py-8 flex flex-col justify-between transition-transform duration-400 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="space-y-8">
          {/* Top Bar inside Mobile Menu */}
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.14)]">
            <Logo variant="light" height={28} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[#F5F2EC] bg-transparent border-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px]"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Primary Large Newsreader Links revealed line by line */}
          <nav className="space-y-4">
            <div className="overflow-hidden">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-[clamp(2rem,6.5vw,3rem)] text-[#F5F2EC] block leading-tight hover:text-[var(--orange)] transition-colors"
              >
                Overview
              </Link>
            </div>

            <div className="overflow-hidden">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-[clamp(2rem,6.5vw,3rem)] text-[#F5F2EC] block leading-tight hover:text-[var(--orange)] transition-colors"
              >
                About
              </Link>
            </div>

            {/* Businesses Accordions with smooth height animation */}
            <div className="py-2 border-t border-b border-[rgba(255,255,255,0.14)]">
              <div className="font-serif text-[clamp(2rem,6.5vw,3rem)] text-[#F5F2EC] py-1 leading-tight">
                Businesses
              </div>
              <div className="space-y-2 mt-2 pl-2">
                {sectors.map((sector) => {
                  const isOpen = Boolean(mobileSectorsOpen[sector]);

                  return (
                    <div
                      key={sector}
                      className="border-b border-[rgba(255,255,255,0.14)] pb-3"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSectorMobile(sector)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between text-left py-2 bg-transparent border-0 cursor-pointer text-[16px] font-sans font-medium text-[#F5F2EC]"
                      >
                        <span>{sector}</span>
                        <span className="text-[18px] text-[rgba(245,242,236,0.78)]">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      {/* Smooth height animation via CSS grid */}
                      <div
                        className="grid transition-all duration-300 ease-out"
                        style={{
                          gridTemplateRows: isOpen ? '1fr' : '0fr',
                        }}
                      >
                        <div className="overflow-hidden">
                          <ul className="pl-3 space-y-3 pt-2 pb-1 list-none m-0">
                            {entitiesBySector[sector].map((entity) => (
                              <li key={entity.slug}>
                                <Link
                                  href={`/businesses/${entity.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-1"
                                >
                                  <div className="text-[15px] font-medium text-[#F5F2EC] hover:text-[var(--orange)] transition-colors">
                                    {entity.name}
                                  </div>
                                  <div className="text-[12.5px] text-[rgba(245,242,236,0.78)] font-sans">
                                    {entity.summary}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden">
              <Link
                href="/news"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-[clamp(2rem,6.5vw,3rem)] text-[#F5F2EC] block leading-tight hover:text-[var(--orange)] transition-colors"
              >
                News
              </Link>
            </div>

            <div className="overflow-hidden">
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-[clamp(2rem,6.5vw,3rem)] text-[#F5F2EC] block leading-tight hover:text-[var(--orange)] transition-colors"
              >
                Careers
              </Link>
            </div>

            <div className="overflow-hidden">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-[clamp(2rem,6.5vw,3rem)] text-[#F5F2EC] flex items-center gap-3 leading-tight hover:text-[var(--orange)] transition-colors"
              >
                <span className="w-2.5 h-2.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                <span>Contact</span>
              </Link>
            </div>
          </nav>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.14)] text-[13px] text-[rgba(245,242,236,0.78)] font-sans">
          <div>HRS Group &bull; Ahmedabad, Gujarat</div>
          <div className="mt-1">+91 79 2685 4100</div>
        </div>
      </div>
    </>
  );
};
