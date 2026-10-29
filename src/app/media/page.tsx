import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download, FileText, Camera, Mail, Phone, ExternalLink, ArrowRight, Check } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { leadership } from '@/content/about';

export const metadata: Metadata = {
  title: 'Media Center & Press Kit · HRS Group',
  description:
    'Official press releases, downloadable brand assets, executive leadership biographies, and corporate factsheet for media editors and trade journalists.',
  openGraph: {
    title: 'Media Center & Press Kit · HRS Group',
    description:
      'Official press releases, downloadable brand assets, executive leadership biographies, and corporate factsheet for media editors.',
    url: 'https://hrsgroup.in/media',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

const BRAND_ASSETS = [
  {
    name: 'HRS Group Primary Wordmark',
    format: 'Vector SVG & PNG',
    type: 'Corporate Identity',
    downloadUrl: '/logos/hrs-group.svg',
    preview: '/logos/hrs-group.svg',
  },
  {
    name: 'HRS Aluglaze Ltd Identity',
    format: 'Vector SVG & PNG',
    type: 'Built Environment',
    downloadUrl: '/logos/hrs-aluglaze.svg',
    preview: '/logos/hrs-aluglaze.svg',
  },
  {
    name: 'BOGO Retail Ecosystem Wordmark',
    format: 'Vector SVG & PNG',
    type: 'Retail',
    downloadUrl: '/bogo/logos/bogo.png',
    preview: '/bogo/logos/bogo.png',
  },
  {
    name: 'Hrishikesh Food Products Identity',
    format: 'Vector SVG & PNG',
    type: 'Food & Consumer',
    downloadUrl: '/logos/hrishikesh-food-products.svg',
    preview: '/logos/hrishikesh-food-products.svg',
  },
  {
    name: 'FirstGen Parent Holding Identity',
    format: 'Vector SVG & PNG',
    type: 'Hospitality & Leasing',
    downloadUrl: '/logos/firstgen.svg',
    preview: '/logos/firstgen.svg',
  },
  {
    name: 'Indian Brand House Identity',
    format: 'Vector SVG & PNG',
    type: 'Services',
    downloadUrl: '/logos/indian-brand-house.svg',
    preview: '/logos/indian-brand-house.svg',
  },
];

const PRESS_GALLERY = [
  {
    title: 'Sanand Facade Fabrication Plant',
    caption: 'Automated 5-axis CNC machining bay and assembly line in Sanand GIDC.',
    image: '/images/hrs-aluglaze/sanand-campus.webp',
  },
  {
    title: 'Bavla Botanical & Spice Milling Campus',
    caption: 'Clean processing facility and botanical stone milling lines on NH 8A.',
    image: '/images/hrishikesh-food-products/whole-spices-stone.webp',
  },
  {
    title: 'Corporate Headquarters · Ahmedabad',
    caption: 'HRS House on SG Highway, Bodakdev commercial corridor.',
    image: '/images/group/corporate-lobby.webp',
  },
  {
    title: 'Flight Stays Kadubeesanahalli',
    caption: 'Serviced apartments for engineering teams along Outer Ring Road, Bengaluru.',
    image: '/images/firstgen/service-apartment.webp',
  },
];

export default function MediaPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen font-sans">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'Media & press kit' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--ink)]/15 bg-white text-xs font-semibold text-[var(--ink)] mb-4">
              <Camera className="h-3.5 w-3.5 text-[var(--hrs-orange)]" />
              Corporate Communications & Press Resources
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Media center and press kit
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              Official disclosures, approved high-resolution brand assets, verified executive biographies, and media desk contacts for accredited journalists and publishers.
            </p>

            {/* Direct Media Desk Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--hrs-orange)]" />
                <a href="mailto:info@hrsgroup.in" className="font-semibold text-neutral-800 hover:underline">
                  info@hrsgroup.in
                </a>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--hrs-orange)]" />
                <span className="font-semibold text-neutral-800">+91 79 4000 1200</span>
              </div>
              <span>·</span>
              <div>
                <span className="text-neutral-500">Corporate desk:</span>{' '}
                <span className="font-semibold text-neutral-800">Bodakdev, Ahmedabad</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Group Factsheet: Surface White */}
        <Section surface="white">
          <div className="space-y-12">
            <div className="border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Enterprise Fast Facts
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                HRS Group at a glance
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 space-y-2">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block">Founding</span>
                <div className="font-['Bricolage_Grotesque'] text-3xl font-extrabold text-[var(--ink)] tabular-nums">
                  2010
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  Established in Ahmedabad, Gujarat as a focused real estate and engineering enterprise.
                </p>
              </div>

              <div className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 space-y-2">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block">Physical Campuses</span>
                <div className="font-['Bricolage_Grotesque'] text-3xl font-extrabold text-[var(--ink)] tabular-nums">
                  4 Hubs
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  Ahmedabad HQ, Sanand CNC works, Bavla botanical campus, and Bengaluru regional hub.
                </p>
              </div>

              <div className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 space-y-2">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block">Core Sectors</span>
                <div className="font-['Bricolage_Grotesque'] text-3xl font-extrabold text-[var(--ink)] tabular-nums">
                  5 Sectors
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Services.
                </p>
              </div>

              <div className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 space-y-2">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block">Production Output</span>
                <div className="font-['Bricolage_Grotesque'] text-3xl font-extrabold text-[var(--hrs-orange)] tabular-nums">
                  18,000 sq m
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  Monthly engineered unitised facade panel fabrication capacity at Sanand plant.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Approved Brand Assets & Vector Logos: Surface Paper */}
        <Section surface="paper">
          <div className="space-y-12">
            <div className="border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Media Kit Downloads
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Approved brand identity assets
              </h2>
              <p className="mt-3 text-base text-neutral-600 max-w-2xl">
                Vector marks and wordmarks authorized for editorial publication, conference programmes, and partner literature.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BRAND_ASSETS.map((asset) => (
                <div
                  key={asset.name}
                  className="border border-[var(--ink)]/15 bg-white p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-[var(--hrs-orange)] block">
                      {asset.type}
                    </span>
                    <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] leading-snug">
                      {asset.name}
                    </h3>
                    <p className="text-xs text-neutral-500 m-0">
                      Format: {asset.format}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <a
                      href={asset.downloadUrl}
                      download
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download asset</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 4. High-Resolution Editorial Photography: Surface White */}
        <Section surface="white">
          <div className="space-y-12">
            <div className="border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Editorial Imagery
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Facilities and operations gallery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRESS_GALLERY.map((item) => (
                <div
                  key={item.title}
                  className="border border-[var(--ink)]/15 bg-[var(--paper)] overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full bg-neutral-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed m-0">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 5. Spokespersons Directory: Surface Paper */}
        <Section surface="paper">
          <div className="space-y-8">
            <div className="border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Executive Leadership
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Authorized corporate spokespersons
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.slice(0, 3).map((leader) => (
                <div
                  key={leader.name}
                  className="border border-[var(--ink)]/15 bg-white p-6 space-y-3"
                >
                  <div className="flex items-center gap-4">
                    {leader.image && (
                      <div className="relative h-14 w-14 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] m-0">
                        {leader.name}
                      </h3>
                      <p className="text-xs text-[var(--hrs-orange)] font-semibold mt-0.5 m-0">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed pt-2 border-t border-neutral-100 m-0">
                    {leader.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 6. Bottom Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Announcements Archive
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Read official corporate notices
              </h2>
            </div>

            <div className="shrink-0 flex gap-4">
              <Button href="/news" variant="primary">
                View all announcements
              </Button>
              <Button href="/contact" variant="outline">
                Contact media desk
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
