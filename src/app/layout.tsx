import type { Metadata } from 'next';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';
import { Shell } from '@/components/layout';
import { CookieNotice } from '@/components/CookieNotice';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  variable: '--font-newsreader',
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hrsgroup.in'),
  title: {
    default: 'HRS Group — Diversified Business Group, Ahmedabad',
    template: '%s — HRS Group',
  },
  description:
    'Parent corporate portal of HRS Group, Ahmedabad. Eight operating entities across facade engineering, property developments, food processing, consumer goods, hospitality, and trade education.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HRS Group — Diversified Business Group, Ahmedabad',
    description:
      'Coordinating eight operating businesses across Gujarat and Karnataka anchored in engineering, manufacturing, property, and trade education.',
    url: 'https://hrsgroup.in',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HRS Group — Diversified Business Group, Ahmedabad',
    description:
      'Coordinating eight operating businesses across Gujarat and Karnataka anchored in engineering, manufacturing, property, and trade education.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hankenGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--white)] text-[var(--ink)] font-sans antialiased selection:bg-[var(--orange)] selection:text-[var(--ink)]">
        <Shell>{children}</Shell>
        <CookieNotice />
      </body>
    </html>
  );
}
