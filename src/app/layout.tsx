import type { Metadata } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SmoothScroll, CursorLabel, PageIntro } from '@/components/motion';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HRS Group • Ahmedabad, Gujarat',
  description:
    'Parent website for HRS Group: Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${plusJakartaSans.variable}`}
    >
      <body className="font-sans antialiased text-[var(--ink)] bg-[var(--paper)]">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[var(--ink)] focus:px-6 focus:py-3 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>

        {/* 1-second Page Intro session logo reveal */}
        <PageIntro />

        {/* Desktop Cursor Label */}
        <CursorLabel />

        {/* Lenis Smooth Scroll Provider */}
        <SmoothScroll>
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
