'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { NewsArticle } from '@/content/news';

interface Props {
  articles: NewsArticle[];
}

const SECTOR_COLORS: Record<string, string> = {
  'Built Environment': '#15852C',
  Retail: '#0F2A5C',
  'Food & Consumer': '#EB7C20',
  'Hospitality & Leasing': '#13477A',
};

export const NewsClient: React.FC<Props> = ({ articles }) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const sectors = Array.from(new Set(articles.map((a) => a.sector)));

  const filteredArticles =
    selectedSector === 'all'
      ? articles
      : articles.filter((a) => a.sector === selectedSector);

  const featured = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <div className="space-y-16 font-sans">
      {/* 1. Sector Filter Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[var(--ink)]/15">
        <button
          type="button"
          onClick={() => setSelectedSector('all')}
          className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
            selectedSector === 'all'
              ? 'bg-[var(--ink)] text-white'
              : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          All announcements ({articles.length})
        </button>

        {sectors.map((sec) => {
          const count = articles.filter((a) => a.sector === sec).length;
          return (
            <button
              key={sec}
              type="button"
              onClick={() => setSelectedSector(sec)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                selectedSector === sec
                  ? 'bg-[var(--ink)] text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {sec} ({count})
            </button>
          );
        })}
      </div>

      {/* 2. Featured Lead Article: Bold Photographic Showcase */}
      {featured && (
        <article className="group border border-[var(--ink)]/15 bg-[var(--paper)] overflow-hidden transition-all duration-300 hover:border-[var(--ink)]">
          <div className="grid grid-cols-12 items-stretch">
            {/* Image Column */}
            <div className="col-span-12 lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] overflow-hidden bg-neutral-200">
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              )}
              <div className="absolute top-4 left-4 bg-[var(--ink)]/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold rounded-full">
                Featured notice
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: SECTOR_COLORS[featured.sector] || 'var(--hrs-orange)' }}
              />
            </div>

            {/* Content Column */}
            <div className="col-span-12 lg:col-span-5 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className="font-bold px-2.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: SECTOR_COLORS[featured.sector] || 'var(--hrs-orange)' }}
                  >
                    {featured.sector}
                  </span>
                  <span className="text-neutral-400">·</span>
                  <span className="font-semibold text-neutral-700">{featured.business}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-500 tabular-nums">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    <span>{featured.date}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                    <span>{featured.location}</span>
                  </div>
                </div>

                <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.15]">
                  <Link
                    href={`/news/${featured.slug}`}
                    className="hover:text-[var(--hrs-orange)] transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed m-0">
                  {featured.summary}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/news/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-white px-6 py-3 text-xs font-bold tracking-tight hover:bg-neutral-800 transition-colors"
                >
                  <span>Read full announcement</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 3. Grid of Announcements with High-Res Photos */}
      {remainingArticles.length > 0 && (
        <div className="space-y-6">
          <div className="border-b border-[var(--ink)]/15 pb-4">
            <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)]">
              Operational updates and releases
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingArticles.map((article) => (
              <article
                key={article.slug}
                className="group border border-[var(--ink)]/15 bg-[var(--paper)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[var(--ink)]"
              >
                <div>
                  {/* Photo Header */}
                  {article.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ backgroundColor: SECTOR_COLORS[article.sector] || 'var(--hrs-orange)' }}
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[var(--hrs-orange)]">
                        {article.business}
                      </span>
                      <span className="text-neutral-500 tabular-nums">{article.date}</span>
                    </div>

                    <h4 className="font-['Bricolage_Grotesque'] text-xl font-bold tracking-tight text-[var(--ink)] leading-snug group-hover:text-[var(--hrs-orange)] transition-colors">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>

                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed m-0">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[var(--ink)]/10 flex items-center justify-between text-xs font-semibold mt-4">
                  <span className="text-neutral-500">{article.location}</span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-colors"
                  >
                    <span>Read notice</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsClient;
