import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Breadcrumbs, InteractiveBackground } from '@/components/ui';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { SplitHeading } from '@/components/motion';
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
      <ReadingProgress />

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
                <span className="font-medium text-[var(--ink)]">
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

              <SplitHeading
                as="h1"
                className="text-display-1 text-[var(--ink)] font-normal leading-[1.1] tracking-tight m-0"
                text={item.title}
              />

              <p className="text-[19px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-serif max-w-[62ch] m-0">
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

              {/* Large Pull Quote style */}
              {item.pullQuote && (
                <div className="my-12 py-8 px-6 md:px-10 border-l-2 border-[var(--orange)] bg-[var(--paper)] space-y-4">
                  <p className="font-serif text-[24px] md:text-[32px] font-normal leading-[1.3] text-[var(--ink)] italic m-0">
                    &ldquo;{item.pullQuote.text}&rdquo;
                  </p>
                  <span className="text-[14px] text-[var(--muted)] block font-sans">
                    — {item.pullQuote.author}
                  </span>
                </div>
              )}

              {/* Share links */}
              <div className="pt-8 border-t border-[var(--rule)]">
                <span className="text-[13px] text-[var(--muted)] block mb-3">
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
                <span className="text-[12px] text-[var(--muted)] block">
                  Publishing entity
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
                <span className="text-[12px] text-[var(--muted)] block">
                  Category
                </span>
                <span className="text-[15px] text-[var(--ink)] block">
                  {item.category}
                </span>
              </div>

              <div className="pt-4 border-t border-[var(--rule)]">
                <span className="text-[12px] text-[var(--muted)] block mb-2">
                  Media & press inquiries
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

          {/* Related Stories: Hairline-separated rows (NOT cards) */}
          {relatedStories.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[var(--rule)]">
              <div className="mb-8">
                <span className="text-[13px] text-[var(--muted)] block mb-1">
                  Related announcements
                </span>
                <SplitHeading
                  as="h2"
                  className="text-heading-2 font-serif font-normal text-[var(--ink)] m-0"
                  text="Further group statements"
                />
              </div>

              <div className="border-t border-[var(--rule)]">
                {relatedStories.map((rel) => (
                  <article
                    key={rel.slug}
                    className="group py-6 border-b border-[var(--rule)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--paper)] px-3 -mx-3 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[12px] text-[var(--muted)] block">
                        {rel.category} · {rel.date}
                      </span>
                      <h3 className="text-[18px] md:text-[19px] font-normal leading-[1.35] text-[var(--ink)] m-0 transition-transform duration-200 group-hover:translate-x-1.5">
                        <Link
                          href={`/news/${rel.slug}`}
                          className="hover:text-[var(--orange-deep)] transition-colors"
                        >
                          {rel.title}
                        </Link>
                      </h3>
                    </div>
                    <Link
                      href={`/news/${rel.slug}`}
                      className="text-[13px] font-medium text-[var(--ink)] group-hover:text-[var(--orange-deep)] transition-colors inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Read release</span>
                      <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                    </Link>
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
