'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { NewsItem } from '@/content/types';
import { entities } from '@/content/entities';

interface Props {
  items: NewsItem[];
}

const categories = [
  'All',
  'Group',
  'Built Environment',
  'Food and Consumer',
  'Hospitality and Retail',
  'Events and Awards',
];

export const NewsClient: React.FC<Props> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Find featured story (or default to first)
  const featuredStory = useMemo(() => {
    return items.find((i) => i.featured) || items[0];
  }, [items]);

  // Filter remaining stories
  const gridStories = useMemo(() => {
    return items.filter((item) => {
      if (item.slug === featuredStory.slug && activeCategory === 'All') return false;
      if (activeCategory === 'All') return true;
      return item.category === activeCategory;
    });
  }, [items, activeCategory, featuredStory]);

  const getEntityName = (slug: string) => {
    return entities.find((e) => e.slug === slug)?.name || slug;
  };

  return (
    <div className="space-y-16 font-sans">
      {/* Featured Story (shown prominently when on 'All' or when its category matches) */}
      {(activeCategory === 'All' || featuredStory.category === activeCategory) && (
        <article className="border border-[var(--rule)] bg-[var(--paper)] p-8 md:p-14 hover:border-[var(--muted)] transition-colors">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--muted)]">
                <span className="bg-[var(--ink)] text-[var(--white)] px-2 py-0.5 text-[11px] uppercase tracking-wider">
                  Featured
                </span>
                <span>{featuredStory.category}</span>
                <span className="text-[var(--rule)]">/</span>
                <time dateTime={featuredStory.date}>{featuredStory.date}</time>
                <span className="text-[var(--rule)]">/</span>
                <span>{featuredStory.readTime}</span>
              </div>

              <h2 className="text-[26px] md:text-[34px] font-serif font-normal leading-[1.25] text-[var(--ink)] m-0">
                <Link
                  href={`/news/${featuredStory.slug}`}
                  className="hover:text-[var(--orange)] transition-colors"
                >
                  {featuredStory.title}
                </Link>
              </h2>

              <p className="text-[17px] leading-[1.65] text-[var(--muted)] max-w-[62ch] m-0">
                {featuredStory.summary}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={`/news/${featuredStory.slug}`}
                  className="text-[14px] font-medium text-[var(--ink)] hover:text-[var(--orange)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Read full statement</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <span className="text-[13px] text-[var(--muted)]">
                  Published by {getEntityName(featuredStory.entitySlug)}
                </span>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Category Filter Tabs */}
      <div className="border-b border-[var(--rule)] pb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-6">
          <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] mr-2 hidden sm:inline">
            Filter:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-[14px] md:text-[15px] transition-colors relative py-1 px-1 cursor-pointer ${
                  isActive
                    ? 'text-[var(--ink)] font-medium'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {cat}
                {isActive && (
                  <span
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[var(--orange)]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gridStories.map((item) => (
          <article
            key={item.slug}
            className="p-6 border border-[var(--rule)] bg-[var(--white)] hover:bg-[var(--paper)] transition-colors flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[12px] text-[var(--muted)]">
                <span className="uppercase tracking-wider">{item.category}</span>
                <span>{item.readTime}</span>
              </div>

              <h3 className="text-[19px] md:text-[21px] font-normal leading-[1.35] text-[var(--ink)] m-0">
                <Link
                  href={`/news/${item.slug}`}
                  className="hover:text-[var(--orange)] transition-colors"
                >
                  {item.title}
                </Link>
              </h3>

              <p className="text-[14px] leading-[1.6] text-[var(--muted)] m-0 line-clamp-3">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--rule)] flex items-center justify-between text-[13px]">
              <time dateTime={item.date} className="text-[var(--muted)]">
                {item.date}
              </time>
              <Link
                href={`/news/${item.slug}`}
                className="font-medium text-[var(--ink)] hover:text-[var(--orange)] transition-colors inline-flex items-center gap-1"
              >
                <span>Read</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
