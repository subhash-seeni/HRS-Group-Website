import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Building2, ArrowRight, Mail, Share2 } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { newsArticles } from '@/content/news';
import { entities } from '@/content/entities';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SECTOR_COLORS: Record<string, string> = {
  'Built Environment': '#15852C',
  Retail: '#0F2A5C',
  'Food & Consumer': '#EB7C20',
  'Hospitality & Leasing': '#13477A',
};

export async function generateStaticParams() {
  return newsArticles.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = newsArticles.find((n) => n.slug === slug);
  if (!item) return { title: 'Announcement Not Found · HRS Group' };

  return {
    title: `${item.title} · HRS Group`,
    description: item.summary,
    openGraph: {
      title: `${item.title} · HRS Group`,
      description: item.summary,
      url: `https://hrsgroup.in/news/${item.slug}`,
      siteName: 'HRS Group',
      type: 'article',
      publishedTime: item.date,
      images: item.image ? [{ url: item.image }] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = newsArticles.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles
    .filter((n) => n.slug !== article.slug)
    .slice(0, 3);

  const matchedEntity = entities.find(
    (e) => e.name.toLowerCase() === article.business.toLowerCase() || e.slug.includes(article.slug.split('-')[0])
  );

  const sectorColor = SECTOR_COLORS[article.sector] || 'var(--hrs-orange)';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    image: article.image ? `https://hrsgroup.in${article.image}` : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'HRS Group',
      url: 'https://hrsgroup.in',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="relative min-h-screen">
        {/* 1. Article Header: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'News & announcements', href: '/news' },
                { label: article.title },
              ]}
              backLink={{ label: 'News index', href: '/news' }}
              className="mb-8"
            />

            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <span
                className="font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: sectorColor }}
              >
                {article.sector}
              </span>
              <span className="font-semibold text-neutral-800">{article.business}</span>
              <span className="text-neutral-400">·</span>
              <div className="flex items-center gap-1.5 text-neutral-600 tabular-nums">
                <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                <span>{article.date}</span>
              </div>
              <span className="text-neutral-400">·</span>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                <span>{article.location}</span>
              </div>
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.08]">
              {article.title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed font-sans max-w-3xl">
              {article.summary}
            </p>
          </div>
        </Section>

        {/* 2. Photographic Banner & Editorial Body: Surface White */}
        <Section surface="white">
          <div className="space-y-12">
            {/* Visual Header Image Banner */}
            {article.image && (
              <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden border border-[var(--ink)]/15 bg-neutral-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-[var(--ink)]/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold rounded-full">
                  {article.location} · {article.business}
                </div>
              </div>
            )}

            {/* Content & Sidebar Grid */}
            <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="col-span-12 lg:col-span-8">
                <div className="max-w-[62ch] space-y-6 text-base sm:text-lg text-neutral-800 leading-relaxed font-sans">
                  {article.content.map((paragraph, idx) => (
                    <p key={idx} className={idx === 0 ? 'text-lg sm:text-xl font-medium text-[var(--ink)] leading-relaxed m-0' : 'm-0'}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Editorial Callout */}
                <div
                  className="mt-12 p-6 sm:p-8 bg-[var(--paper)] border-l-4"
                  style={{ borderLeftColor: sectorColor }}
                >
                  <span className="text-xs font-semibold text-neutral-500 block mb-1 uppercase tracking-wider">
                    Official Notice Detail
                  </span>
                  <p className="font-['Bricolage_Grotesque'] text-lg sm:text-xl font-bold text-[var(--ink)] m-0 leading-snug">
                    All specifications and schedules stated here reflect operational commitments verified by {article.business} management.
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-12 lg:col-span-4 sticky top-28 space-y-6">
                <div className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 space-y-4">
                  <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                    Operating Division
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] m-0">
                    {article.business}
                  </h3>
                  <div className="space-y-1.5 text-xs text-neutral-600">
                    <div><span className="font-medium text-neutral-800">Sector:</span> {article.sector}</div>
                    <div><span className="font-medium text-neutral-800">Location:</span> {article.location}</div>
                    <div><span className="font-medium text-neutral-800">Release date:</span> {article.date}</div>
                  </div>

                  {matchedEntity && (
                    <div className="pt-3 border-t border-[var(--ink)]/10">
                      <Link
                        href={matchedEntity.url}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors"
                      >
                        <span>View {matchedEntity.shortName || matchedEntity.name} overview</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="border border-[var(--ink)]/15 p-6 space-y-3 bg-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                    <Mail className="h-4 w-4 text-[var(--hrs-orange)]" />
                    <span>Media Enquiries</span>
                  </div>
                  <p className="text-xs text-neutral-600 m-0 leading-relaxed">
                    For press materials, high-resolution photography, or executive interviews regarding this notice:
                  </p>
                  <div className="pt-1">
                    <a
                      href="mailto:info@hrsgroup.in"
                      className="text-xs font-bold text-[var(--hrs-orange)] hover:underline"
                    >
                      info@hrsgroup.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Related Announcements: Surface Paper */}
        {relatedArticles.length > 0 && (
          <Section surface="paper">
            <div className="mb-8 border-b border-[var(--ink)]/15 pb-6">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Recent Disclosures
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                Other announcements from HRS Group
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.slug}
                  className="group border border-[var(--ink)]/15 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[var(--ink)]"
                >
                  <div>
                    {rel.image && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1"
                          style={{ backgroundColor: SECTOR_COLORS[rel.sector] || 'var(--hrs-orange)' }}
                        />
                      </div>
                    )}

                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[var(--hrs-orange)]">
                          {rel.business}
                        </span>
                        <span className="text-neutral-500 tabular-nums">{rel.date}</span>
                      </div>

                      <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] m-0 leading-snug group-hover:text-[var(--hrs-orange)] transition-colors">
                        <Link href={`/news/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed m-0">
                        {rel.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[var(--ink)]/10 flex items-center justify-between text-xs font-semibold mt-3">
                    <span className="text-neutral-500">{rel.location}</span>
                    <Link
                      href={`/news/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-colors"
                    >
                      <span>Read notice</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        )}

        {/* 4. Bottom Return Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                News Archive
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Return to corporate announcements
              </h2>
            </div>

            <div className="shrink-0">
              <Button href="/news" variant="primary">
                View all announcements
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
