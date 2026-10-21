import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Breadcrumbs, InteractiveBackground } from '@/components/ui';
import { news } from '@/content/news';
import { entities } from '@/content/entities';
import { NewsletterSignup } from '@/components/NewsletterSignup';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return { title: 'Announcement Not Found — HRS Group' };

  return {
    title: `${item.title} — HRS Group`,
    description: item.summary,
    openGraph: {
      title: `${item.title} — HRS Group`,
      description: item.summary,
      url: `https://hrsgroup.in/news/${item.slug}`,
      siteName: 'HRS Group',
      type: 'article',
      publishedTime: item.date,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  const entity = entities.find((e) => e.slug === item.entitySlug);

  // Related stories lookup
  const relatedStories = item.relatedSlugs
    ? news.filter((n) => item.relatedSlugs?.includes(n.slug))
    : news.filter((n) => n.category === item.category && n.slug !== item.slug).slice(0, 3);

  // Article JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.summary,
    datePublished: item.date,
    dateModified: item.date,
    author: {
      '@type': 'Organization',
      name: entity?.name || 'HRS Group',
      url: 'https://hrsgroup.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HRS Group',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hrsgroup.in/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hrsgroup.in/news/${item.slug}`,
    },
  };

  const articleUrl = `https://hrsgroup.in/news/${item.slug}`;

  return (
    <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative pt-[16vh] md:pt-[20vh] pb-24 md:pb-36 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-10">
            <Breadcrumbs
              items={[
                { label: 'News & announcements', href: '/news' },
                { label: item.title },
              ]}
            />
          </div>

          {/* Hero Header */}
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 lg:col-span-10 space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--muted)]">
                <span className="uppercase tracking-wider font-medium text-[var(--ink)]">
                  {item.category}
                </span>
                <span className="text-[var(--rule)]">/</span>
                <time dateTime={item.date}>{item.date}</time>
                <span className="text-[var(--rule)]">/</span>
                <span>{item.readTime}</span>
                {entity && (
                  <>
                    <span className="text-[var(--rule)]">/</span>
                    <Link
                      href={`/businesses/${entity.slug}`}
                      className="text-[var(--ink)] hover:text-[var(--orange)] transition-colors underline underline-offset-4"
                    >
                      {entity.name}
                    </Link>
                  </>
                )}
              </div>

              <h1 className="text-display-1 text-[var(--ink)] font-normal leading-[1.2] tracking-tight m-0">
                {item.title}
              </h1>

              <p className="text-[19px] md:text-[22px] leading-[1.55] text-[var(--muted)] font-serif max-w-[62ch] m-0">
                {item.summary}
              </p>
            </div>
          </div>

          {/* Main Article Body & Sidebar */}
          <div className="grid grid-cols-12 gap-10 md:gap-16 border-t border-[var(--rule)] pt-12 items-start">
            {/* Reading-width Body (cols 1-8) */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <div className="prose prose-neutral max-w-[64ch] space-y-6 text-[17px] leading-[1.75] text-[var(--ink)] font-sans">
                {item.content && item.content.length > 0 ? (
                  item.content.map((p, idx) => <p key={idx} className="m-0">{p}</p>)
                ) : (
                  <p className="m-0">{item.summary}</p>
                )}
              </div>

              {/* Pull Quote */}
              {item.pullQuote && (
                <div className="my-10 p-8 border-l-2 border-[var(--orange)] bg-[var(--paper)] space-y-3">
                  <p className="font-serif text-[20px] md:text-[24px] font-normal leading-[1.4] text-[var(--ink)] italic m-0">
                    &ldquo;{item.pullQuote.text}&rdquo;
                  </p>
                  <span className="text-[13px] text-[var(--muted)] block font-sans">
                    — {item.pullQuote.author}
                  </span>
                </div>
              )}

              {/* Share links */}
              <div className="pt-8 border-t border-[var(--rule)]">
                <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-3">
                  Share this release
                </span>
                <div className="flex flex-wrap items-center gap-4 text-[14px]">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink)] hover:text-[var(--orange)] transition-colors underline underline-offset-4"
                  >
                    LinkedIn
                  </a>
                  <span className="text-[var(--rule)]">/</span>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink)] hover:text-[var(--orange)] transition-colors underline underline-offset-4"
                  >
                    X (Twitter)
                  </a>
                  <span className="text-[var(--rule)]">/</span>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(articleUrl)}`}
                    className="text-[var(--ink)] hover:text-[var(--orange)] transition-colors underline underline-offset-4"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar Details (cols 9-12) */}
            <div className="col-span-12 lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-10 pt-8 lg:pt-0 space-y-8">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] block">
                  Publishing Entity
                </span>
                <span className="text-[15px] text-[var(--ink)] font-medium block">
                  {entity ? entity.name : 'HRS Group Corporate'}
                </span>
                {entity && (
                  <span className="text-[13px] text-[var(--muted)] block">
                    {entity.location}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] block">
                  Category
                </span>
                <span className="text-[15px] text-[var(--ink)] block">
                  {item.category}
                </span>
              </div>

              <div className="pt-4 border-t border-[var(--rule)]">
                <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] block mb-2">
                  Media & Press Inquiries
                </span>
                <p className="text-[13px] text-[var(--muted)] leading-[1.5] m-0 mb-3">
                  For official statements, interviews or high-resolution architectural documentation:
                </p>
                <Link
                  href="/contact?entity=general"
                  className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--orange)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Contact communications desk</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[var(--rule)]">
              <div className="mb-8">
                <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-1">
                  Related announcements
                </span>
                <h2 className="text-[24px] md:text-[28px] font-serif font-normal text-[var(--ink)] m-0">
                  Further group statements
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedStories.map((rel) => (
                  <article
                    key={rel.slug}
                    className="p-6 border border-[var(--rule)] bg-[var(--white)] hover:bg-[var(--paper)] transition-colors flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
                        {rel.category}
                      </span>
                      <h3 className="text-[18px] font-normal leading-[1.35] text-[var(--ink)] m-0">
                        <Link
                          href={`/news/${rel.slug}`}
                          className="hover:text-[var(--orange)] transition-colors"
                        >
                          {rel.title}
                        </Link>
                      </h3>
                    </div>
                    <time dateTime={rel.date} className="text-[13px] text-[var(--muted)]">
                      {rel.date}
                    </time>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup Strip */}
          <NewsletterSignup />
        </Container>
      </article>
    </div>
  );
}
