'use client';

import React from 'react';
import Link from 'next/link';
import { newsArticles } from '@/content/news';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[parseInt(month, 10) - 1] || month;
  return `${day} ${monthName} ${year}`;
}

// Flat thumbnail color generator for news items
const NEWS_THUMBNAIL_COLORS: Record<string, string> = {
  'Built Environment': '#15852C',
  'Retail': '#0F2A5C',
  'Hospitality & Leasing': '#273043',
  'Food & Consumer': '#EB7C20',
  'Services': '#EA5735',
};

export const NewsSection: React.FC = () => {
  // Top four news rows from content
  const displayArticles = newsArticles.slice(0, 4);

  return (
    <section
      id="news"
      data-surface="white"
      className="relative w-full bg-white text-[var(--ink)] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-neutral-200"
      aria-label="Latest news and announcements"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Group announcements & updates
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              News
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors self-start md:self-auto"
          >
            <span>All news</span>
            <span className="text-sm">→</span>
          </Link>
        </div>

        {/* Four News Rows separated by 1px hairlines */}
        <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {displayArticles.map((article) => {
            const thumbColor = NEWS_THUMBNAIL_COLORS[article.sector] || '#0E0E10';

            return (
              <Link
                key={article.slug}
                href={`/news#${article.slug}`}
                className="group relative block py-6 sm:py-8 transition-colors hover:bg-neutral-50/70"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                  {/* Left: Date & Business */}
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0 lg:w-72">
                    <span className="font-mono text-xs text-neutral-500 tabular-nums shrink-0">
                      {formatDate(article.date)}
                    </span>
                    <span className="text-xs font-medium text-neutral-800 bg-neutral-100 px-2.5 py-1">
                      {article.business}
                    </span>
                  </div>

                  {/* Center: Headline (shifts 8px on desktop hover) */}
                  <div className="flex-1 lg:px-6">
                    <h3 className="font-['Bricolage_Grotesque'] text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-transform duration-300 lg:group-hover:translate-x-2">
                      {article.title}
                    </h3>
                  </div>

                  {/* Right: Arrow + Desktop Sliding 3:2 Flat Thumbnail */}
                  <div className="flex items-center justify-end gap-6 shrink-0">
                    {/* Desktop Sliding 3:2 Flat-Colour Thumbnail */}
                    <div className="hidden lg:block relative w-28 h-[74px] overflow-hidden opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out border border-neutral-300">
                      <div
                        style={{ backgroundColor: thumbColor }}
                        className="w-full h-full flex flex-col justify-between p-2 text-white"
                      >
                        <span className="text-[10px] font-medium opacity-85">
                          {article.sector}
                        </span>
                        <span className="text-[10px] font-bold tracking-tight leading-tight line-clamp-2">
                          {article.business}
                        </span>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="h-9 w-9 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-white group-hover:border-[var(--ink)] transition-all shrink-0">
                      <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
