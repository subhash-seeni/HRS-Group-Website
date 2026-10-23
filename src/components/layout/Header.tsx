'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { getAssetUrl } from '@/lib/basePath';

interface EntityLink {
  name: string;
  line: string;
  href: string;
}

interface SectorColumn {
  name: string;
  color: string;
  entities: EntityLink[];
}

const SECTOR_COLUMNS: SectorColumn[] = [
  {
    name: 'Built Environment',
    color: '#15852C',
    entities: [
      {
        name: 'Hrishikesh Ventures',
        line: '13 residential & commercial developments in Ahmedabad',
        href: '/businesses#hrishikesh-ventures',
      },
      {
        name: 'HRS Aluglaze Ltd',
        line: 'High-precision facade & fenestration engineering',
        href: '/businesses#hrs-aluglaze',
      },
      {
        name: 'Geotrix Pvt. Ltd.',
        line: 'Southern India facade operations in Bengaluru',
        href: '/businesses#geotrix',
      },
      {
        name: 'School of Facade Technologies',
        line: 'Technical training for students, fabricators & architects',
        href: '/businesses#school-of-facade-technologies',
      },
    ],
  },
  {
    name: 'Retail',
    color: '#F58A33',
    entities: [
      {
        name: 'BOGO',
        line: 'Connected multi-format modern retail ecosystem',
        href: '/bogo',
      },
      {
        name: 'BOGO Square',
        line: 'Flagship retail, dining & experiential hub',
        href: '/bogo#formats',
      },
      {
        name: 'BOGO Bazaar & Mini',
        line: 'Community grocery & quick neighbourhood convenience',
        href: '/bogo#formats',
      },
      {
        name: 'BOGO Go',
        line: 'Coordinated distribution & stockist supply network',
        href: '/bogo#distribution',
      },
    ],
  },
  {
    name: 'Food & Consumer',
    color: '#EB7C20',
    entities: [
      {
        name: 'Hrishikesh Food Products',
        line: 'Clean spice milling & botanical processing in Bavla',
        href: '/businesses#hrishikesh-food-products',
      },
      {
        name: 'Hrishikesh Consumer Products',
        line: 'Portfolio of 13 dedicated household brands',
        href: '/businesses#hrishikesh-consumer-products',
      },
      {
        name: 'Manpras',
        line: 'Everyday neighbourhood grocery & packaged staples',
        href: '/businesses#hrishikesh-consumer-products',
      },
    ],
  },
  {
    name: 'Hospitality & Leasing',
    color: '#13477A',
    entities: [
      {
        name: 'FirstGen Pvt. Ltd.',
        line: 'Parent holding umbrella for commercial operations',
        href: '/businesses#firstgen',
      },
      {
        name: 'FirstGen Assets',
        line: 'Commercial, office, retail & industrial leasing',
        href: '/businesses#firstgen-assets',
      },
      {
        name: 'FirstGen Hotels',
        line: 'Flight Stays & Amuktamalyada dining in Bengaluru',
        href: '/businesses#firstgen-hotels',
      },
      {
        name: 'FirstGen Enterprises',
        line: 'The Bluprint by Builders Cafe & ShubhVista retail',
        href: '/businesses#firstgen-enterprises',
      },
    ],
  },
  {
    name: 'Services',
    color: '#EA5735',
    entities: [
      {
        name: 'Indian Brand House',
        line: 'Strategy, identity, content & digital marketing',
        href: '/businesses#indian-brand-house',
      },
    ],
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Navigation states
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [tone, setTone] = useState<'light' | 'dark'>('light'); // 'light' means light text (dark bg), 'dark' means dark text (light bg)
  const [solidBg, setSolidBg] = useState<string>('transparent');

  // Mega panel & Mobile menu state
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const megaRef = useRef<HTMLDivElement>(null);
  const businessesButtonRef = useRef<HTMLButtonElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMegaOpen(false);
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle scroll detection, tone detection, and hide-on-scroll-down
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const heroThreshold = window.innerHeight - 80;

    const isPastHero = currentY > heroThreshold;
    setIsScrolledPastHero(isPastHero);

    // Hide/show behavior (only when mega panel is closed)
    if (!isMegaOpen && !isMobileOpen) {
      if (currentY > 100 && currentY > lastScrollY.current + 8) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - 6 || currentY <= 80) {
        setIsHidden(false);
      }
    }
    lastScrollY.current = currentY;

    // Detect section beneath header when past hero
    if (isPastHero) {
      // Find element directly below header center
      const el = document.elementFromPoint(window.innerWidth / 2, 85);
      const section = el?.closest('section');
      const surface = section?.getAttribute('data-surface');

      if (surface === 'ink') {
        setSolidBg('var(--ink)');
        setTone('light');
      } else if (surface === 'bogo-navy') {
        setSolidBg('var(--bogo-navy)');
        setTone('light');
      } else if (surface === 'orange') {
        setSolidBg('var(--hrs-orange)');
        setTone('dark');
      } else if (surface === 'white') {
        setSolidBg('var(--white)');
        setTone('dark');
      } else {
        // default paper
        setSolidBg('var(--paper)');
        setTone('dark');
      }
    } else {
      setSolidBg('transparent');
      // Read hero tone from document attribute if available
      const docHeroTone = document.documentElement.getAttribute('data-hero-tone');
      if (docHeroTone === 'dark') {
        setTone('dark');
      } else {
        setTone('light');
      }
    }
  }, [isMegaOpen, isMobileOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Observe changes to data-hero-tone on <html>
    const observer = new MutationObserver(() => {
      if (window.scrollY <= window.innerHeight - 80) {
        const docHeroTone = document.documentElement.getAttribute('data-hero-tone');
        setTone(docHeroTone === 'dark' ? 'dark' : 'light');
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-hero-tone'],
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [handleScroll]);

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMegaOpen) {
          setIsMegaOpen(false);
          businessesButtonRef.current?.focus();
        }
        if (isMobileOpen) {
          setIsMobileOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMegaOpen, isMobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const textColorClass = tone === 'light' ? 'text-white' : 'text-[var(--ink)]';
  const textMutedClass = tone === 'light' ? 'text-neutral-300' : 'text-neutral-600';
  const navHoverBgClass = tone === 'light' ? 'hover:text-[var(--hrs-orange)]' : 'hover:text-[var(--hrs-orange)]';

  const bogoLink = isHome ? '#bogo' : '/bogo';

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 h-20 transition-transform duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundColor: isMegaOpen ? 'var(--ink)' : solidBg,
          transition: 'background-color 200ms ease, transform 300ms ease',
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Left: Logo */}
          <Link
            href="/"
            className={`transition-opacity hover:opacity-90 ${
              isMegaOpen ? 'text-white' : textColorClass
            }`}
            aria-label="HRS Group Home"
            onClick={() => {
              setIsMegaOpen(false);
              setIsMobileOpen(false);
            }}
          >
            <Logo slug="hrs-group" height="h-9" />
          </Link>

          {/* Desktop Center/Right Nav */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden items-center gap-8 md:flex"
          >
            <Link
              href="/about"
              className={`text-sm font-semibold tracking-tight transition-colors ${
                isMegaOpen ? 'text-neutral-300 hover:text-white' : `${textColorClass} ${navHoverBgClass}`
              }`}
            >
              About
            </Link>

            {/* Businesses Trigger with mega panel */}
            <div className="relative">
              <button
                ref={businessesButtonRef}
                type="button"
                onClick={() => setIsMegaOpen(!isMegaOpen)}
                aria-expanded={isMegaOpen}
                aria-haspopup="true"
                aria-controls="businesses-mega-panel"
                className={`flex items-center gap-1.5 text-sm font-semibold tracking-tight transition-colors cursor-pointer ${
                  isMegaOpen
                    ? 'text-[var(--hrs-orange)]'
                    : `${textColorClass} ${navHoverBgClass}`
                }`}
              >
                <span>Businesses</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMegaOpen ? 'rotate-180 text-[var(--hrs-orange)]' : ''
                  }`}
                />
              </button>
            </div>

            {/* BOGO with orange dot */}
            <Link
              href={bogoLink}
              className={`flex items-center gap-2 text-sm font-semibold tracking-tight transition-colors ${
                isMegaOpen ? 'text-neutral-300 hover:text-white' : `${textColorClass} ${navHoverBgClass}`
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--bogo-orange)] shrink-0" />
              <span>BOGO</span>
            </Link>

            <Link
              href="/news"
              className={`text-sm font-semibold tracking-tight transition-colors ${
                isMegaOpen ? 'text-neutral-300 hover:text-white' : `${textColorClass} ${navHoverBgClass}`
              }`}
            >
              News
            </Link>

            <Link
              href="/careers"
              className={`text-sm font-semibold tracking-tight transition-colors ${
                isMegaOpen ? 'text-neutral-300 hover:text-white' : `${textColorClass} ${navHoverBgClass}`
              }`}
            >
              Careers
            </Link>

            {/* Magnetic Contact Button */}
            <div className="ml-2">
              <MagneticButton strength={0.3}>
                <Link
                  href="/contact"
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all duration-200 ${
                    isMegaOpen || tone === 'light'
                      ? 'bg-white text-[var(--ink)] hover:bg-[var(--hrs-orange)] hover:text-white'
                      : 'bg-[var(--ink)] text-white hover:bg-[var(--hrs-orange)]'
                  }`}
                >
                  <span>Contact</span>
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-current/10 transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className={`p-2 transition-colors md:hidden cursor-pointer ${
              isMobileOpen ? 'text-white' : textColorClass
            }`}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* =========================================================================
            BUSINESSES MEGA PANEL (Full-width, 5 columns, 400ms clip reveal)
           ========================================================================= */}
        <div
          id="businesses-mega-panel"
          ref={megaRef}
          role="region"
          aria-label="Businesses Directory"
          className={`absolute top-20 left-0 right-0 w-full overflow-hidden border-b-2 border-white/20 bg-[var(--ink)] text-white transition-[clip-path,opacity] duration-400 ease-out ${
            isMegaOpen
              ? 'opacity-100 pointer-events-auto [clip-path:inset(0%_0%_0%_0%)]'
              : 'opacity-0 pointer-events-none [clip-path:inset(0%_0%_100%_0%)]'
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-semibold text-[var(--hrs-orange)]">
                  Operating directory
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-white">
                  Five core sectors
                </h3>
              </div>
              <Link
                href="/businesses"
                onClick={() => setIsMegaOpen(false)}
                className="group flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                <span>View all businesses</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {SECTOR_COLUMNS.map((sector) => (
                <div
                  key={sector.name}
                  className="flex flex-col border-t-4 pt-4"
                  style={{ borderColor: sector.color }}
                >
                  <span className="text-xs font-semibold text-neutral-300">
                    {sector.name}
                  </span>

                  <ul className="mt-4 space-y-3">
                    {sector.entities.map((entity) => {
                      const isHovered = hoveredEntity === entity.name;
                      const hasHover = hoveredEntity !== null;

                      return (
                        <li key={entity.name}>
                          <Link
                            href={entity.href}
                            onClick={() => setIsMegaOpen(false)}
                            onMouseEnter={() => setHoveredEntity(entity.name)}
                            onMouseLeave={() => setHoveredEntity(null)}
                            onFocus={() => setHoveredEntity(entity.name)}
                            onBlur={() => setHoveredEntity(null)}
                            className={`block transition-all duration-200 ${
                              isHovered
                                ? 'translate-x-1.5 opacity-100'
                                : hasHover
                                ? 'opacity-40'
                                : 'opacity-100'
                            }`}
                          >
                            <span className="flex items-center gap-1 font-['Bricolage_Grotesque'] text-sm font-bold text-white hover:text-[var(--hrs-orange)]">
                              <span>{entity.name}</span>
                              <ArrowUpRight className="h-3 w-3 opacity-60" />
                            </span>
                            <span className="block mt-0.5 text-xs text-neutral-400 leading-tight">
                              {entity.line}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER (Full-screen Ink Menu)
         ========================================================================= */}
      {isMobileOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-30 flex flex-col justify-between bg-[var(--ink)] text-white pt-24 pb-8 px-6 overflow-y-auto"
        >
          <div className="space-y-6">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="block font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-white hover:text-[var(--hrs-orange)]"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileOpen(false)}
              className="block font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-white hover:text-[var(--hrs-orange)]"
            >
              About
            </Link>

            {/* Mobile Businesses Accordion */}
            <div className="border-t border-b border-white/15 py-3">
              <button
                type="button"
                onClick={() => setExpandedSector(expandedSector ? null : 'all')}
                className="flex w-full items-center justify-between font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-white cursor-pointer"
              >
                <span>Businesses</span>
                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-200 ${
                    expandedSector ? 'rotate-180 text-[var(--hrs-orange)]' : ''
                  }`}
                />
              </button>

              {expandedSector && (
                <div className="mt-4 space-y-4 pl-2">
                  {SECTOR_COLUMNS.map((sec) => (
                    <div key={sec.name} className="border-l-2 pl-3" style={{ borderColor: sec.color }}>
                      <span className="text-xs font-semibold text-neutral-300">
                        {sec.name}
                      </span>
                      <div className="mt-2 space-y-2">
                        {sec.entities.map((ent) => (
                          <Link
                            key={ent.name}
                            href={ent.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block"
                          >
                            <span className="text-sm font-bold text-white hover:text-[var(--hrs-orange)]">
                              {ent.name}
                            </span>
                            <span className="block text-xs text-neutral-400">{ent.line}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={bogoLink}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-white hover:text-[var(--hrs-orange)]"
            >
              <span className="h-3 w-3 rounded-full bg-[var(--bogo-orange)] shrink-0" />
              <span>BOGO</span>
            </Link>

            <Link
              href="/news"
              onClick={() => setIsMobileOpen(false)}
              className="block font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-white hover:text-[var(--hrs-orange)]"
            >
              News
            </Link>

            <Link
              href="/careers"
              onClick={() => setIsMobileOpen(false)}
              className="block font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-white hover:text-[var(--hrs-orange)]"
            >
              Careers
            </Link>
          </div>

          {/* Bottom Contact Pill */}
          <div className="pt-8 border-t border-white/15">
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="flex w-full items-center justify-between rounded-full bg-[var(--hrs-orange)] px-6 py-4 text-sm font-bold text-white"
            >
              <span>Contact Operating Desk</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-xs text-neutral-400">
              Ahmedabad HQ: Bodakdev, SG Highway • Southern Hub: Bengaluru
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
