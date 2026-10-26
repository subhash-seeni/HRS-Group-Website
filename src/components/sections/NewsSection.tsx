'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { newsArticles } from '@/content/news';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[parseInt(month, 10) - 1] || month;
  return `${day} ${monthName} ${year}`;
}

// Visual photography thumbnails for news articles
const NEWS_THUMBNAILS: Record<string, string> = {
  'hrs-aluglaze-expands-sanand-production-line': '/images/hrs-aluglaze/sanand-campus.webp',
  'hrishikesh-ventures-tops-out-h10-commercial-centre': '/images/hrishikesh-ventures/residential-tower.webp',
  'bogo-square-flagship-announced-ahmedabad': '/bogo/stores/bogo-square-concept.webp',
  'school-of-facade-technologies-graduates-sixth-cohort': '/images/hrs-aluglaze/curtain-wall-detail.webp',
  'firstgen-hotels-opens-flight-stays-annex-bengaluru': '/images/firstgen/service-apartment.webp',
  'hrishikesh-food-products-attains-brcgs-certification': '/images/hrishikesh-food-products/whole-spices-stone.webp',
};

// Flat thumbnail fallback color generator for news items
const NEWS_THUMBNAIL_COLORS: Record<string, string> = {
  'Built Environment': '#15852C',
  'Retail': '#0F2A5C',
  'Hospitality & Leasing': '#273043',
  'Food & Consumer': '#EB7C20',
  'Services': '#EA5735',
};

export const NewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (rowsRef.current) {
        const rows = rowsRef.current.querySelectorAll('.news-row-item');
        gsap.from(rows, {
          opacity: 0,
          y: 16,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rowsRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Top four news rows from content
  const displayArticles = newsArticles.slice(0, 4);

  return (
    <section
      ref={sectionRef}
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
        <div ref={rowsRef} className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {displayArticles.map((article) => {
            const thumbColor = NEWS_THUMBNAIL_COLORS[article.sector] || '#0E0E10';

            return (
              <Link
                key={article.slug}
                href={`/news#${article.slug}`}
                className="news-row-item group relative block py-6 sm:py-8 transition-colors hover:bg-neutral-50/70"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                  {/* Left: Date & Business */}
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0 lg:w-72">
                    <span className="text-xs font-medium text-neutral-600 tabular-nums shrink-0">
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

                  {/* Right: Arrow + Desktop Sliding 3:2 Photography Thumbnail */}
                  <div className="flex items-center justify-end gap-6 shrink-0">
                    {/* Desktop Sliding 3:2 Photography Thumbnail */}
                    <div className="hidden lg:block relative w-32 h-[76px] overflow-hidden opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out border border-neutral-300 bg-neutral-900 shrink-0">
                      {NEWS_THUMBNAILS[article.slug] ? (
                        <>
                          <Image
                            src={NEWS_THUMBNAILS[article.slug]}
                            alt={article.business}
                            fill
                            sizes="128px"
                            className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                          <div className="absolute inset-0 p-2 flex flex-col justify-between text-white pointer-events-none">
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--hrs-orange)]">
                              {article.sector}
                            </span>
                            <span className="text-[10px] font-bold tracking-tight leading-tight line-clamp-1">
                              {article.business}
                            </span>
                          </div>
                        </>
                      ) : (
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
                      )}
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
