'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '@/content/types';
import { entities } from '@/content/entities';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { imageRegistry } from '@/content/images';
import { motionTokens } from '@/lib/motion';

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
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Find featured story (or default to first)
  const featuredStory = useMemo(() => {
    return items.find((i) => i.featured) || items[0];
  }, [items]);

  // Filter remaining stories
  const listStories = useMemo(() => {
    return items.filter((item) => {
      if (item.slug === featuredStory.slug && activeCategory === 'All') return false;
      if (activeCategory === 'All') return true;
      return item.category === activeCategory;
    });
  }, [items, activeCategory, featuredStory]);

  const getEntityName = (slug: string) => {
    return entities.find((e) => e.slug === slug)?.name || slug;
  };

  const getStoryImage = (item: NewsItem) => {
    const reg = imageRegistry[item.entitySlug];
    if (reg) return reg;
    if (item.slug.includes('h2')) return imageRegistry['h2-residential'];
    return imageRegistry['group-skyline'] || {
      src: '/images/group/ahmedabad-skyline.webp',
      alt: item.title,
    };
  };

  const featuredImg = getStoryImage(featuredStory);

  return (
    <div className="space-y-16 md:space-y-20 font-sans">
      {/* Featured Story: Large image with ImageReveal and calm typography */}
      {(activeCategory === 'All' || featuredStory.category === activeCategory) && (
        <article className="border-b border-[var(--rule)] pb-16 md:pb-20">
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Large Featured Image */}
            <div className="col-span-12 lg:col-span-7">
              <Link href={`/news/${featuredStory.slug}`} className="block group overflow-hidden">
                <ImageReveal className="w-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={featuredImg.src}
                      alt={featuredImg.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                  </div>
                </ImageReveal>
              </Link>
            </div>

            {/* Featured Story Details */}
            <div className="col-span-12 lg:col-span-5 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--muted)]">
                <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                <span className="text-[var(--ink)] font-medium">Featured statement</span>
                <span className="text-[var(--rule)]">/</span>
                <span>{featuredStory.category}</span>
                <span className="text-[var(--rule)]">/</span>
                <time dateTime={featuredStory.date}>{featuredStory.date}</time>
              </div>

              <h2 className="text-[28px] md:text-[36px] font-serif font-normal leading-[1.2] text-[var(--ink)] m-0">
                <Link
                  href={`/news/${featuredStory.slug}`}
                  className="hover:text-[var(--orange-deep)] transition-colors"
                >
                  {featuredStory.title}
                </Link>
              </h2>

              <p className="text-[16px] md:text-[17px] leading-[1.65] text-[var(--muted)] m-0">
                {featuredStory.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)]">
                <Link
                  href={`/news/${featuredStory.slug}`}
                  className="text-[14px] font-medium text-[var(--ink)] hover:text-[var(--orange)] transition-colors inline-flex items-center gap-2 group"
                >
                  <span>Read full announcement</span>
                  <span className="group-hover:translate-x-1.5 group-hover:text-[var(--orange)] transition-all duration-200" aria-hidden="true">
                    →
                  </span>
                </Link>
                <span className="text-[13px] text-[var(--muted)]">
                  {getEntityName(featuredStory.entitySlug)}
                </span>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Category Filter Tabs with Sliding Orange Underline */}
      <div className="border-b border-[var(--rule)] pb-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <span className="text-[13px] text-[var(--muted)] mr-2 hidden sm:inline">
            Filter releases:
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
                  <motion.span
                    layoutId="news-category-underline"
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[var(--orange)]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* List Rows with Hover Thumbnails (Separated by 1px hairlines, NOT cards) */}
      <motion.div layout className="border-t border-[var(--rule)]">
        <AnimatePresence mode="popLayout">
          {listStories.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-[var(--muted)] border-b border-[var(--rule)]"
            >
              <p className="text-[16px] m-0">No announcements match this category.</p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="mt-3 text-[14px] text-[var(--ink)] underline hover:text-[var(--orange)] cursor-pointer"
              >
                Show all releases
              </button>
            </motion.div>
          ) : (
            listStories.map((item) => {
              const isHovered = hoveredSlug === item.slug;
              const isOtherHovered = hoveredSlug !== null && !isHovered;
              const storyImg = getStoryImage(item);

              return (
                <motion.article
                  layout
                  key={item.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isOtherHovered ? 0.45 : 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className={`group relative py-8 md:py-10 border-b border-[var(--rule)] px-0 md:px-4 -mx-0 md:-mx-4 transition-colors duration-200 ${
                    isHovered ? 'bg-[var(--paper)]' : 'bg-transparent'
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
                    {/* Left: Thumbnail preview on desktop */}
                    <div className="col-span-12 sm:col-span-3 md:col-span-2">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--stone)] border border-[var(--rule)]">
                        <Image
                          src={storyImg.src}
                          alt={storyImg.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 200px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Center: Metadata & Title */}
                    <div className="col-span-12 sm:col-span-9 md:col-span-6 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[var(--muted)]">
                        <span>{item.category}</span>
                        <span className="text-[var(--rule)]">/</span>
                        <time dateTime={item.date}>{item.date}</time>
                        <span className="text-[var(--rule)]">/</span>
                        <span>{getEntityName(item.entitySlug)}</span>
                      </div>

                      <h3
                        className="text-[20px] md:text-[23px] font-normal leading-[1.3] text-[var(--ink)] m-0 transition-transform duration-200"
                        style={{
                          transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                          transitionTimingFunction: motionTokens.easings.cssEaseOut,
                        }}
                      >
                        <Link
                          href={`/news/${item.slug}`}
                          className="hover:text-[var(--orange-deep)] transition-colors inline-block"
                        >
                          {item.title}
                        </Link>
                      </h3>

                      <p className="text-[14px] md:text-[15px] leading-[1.6] text-[var(--muted)] m-0 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>

                    {/* Right: Read link with sliding arrow */}
                    <div className="col-span-12 md:col-span-4 flex md:flex-col justify-between md:items-end md:text-right pt-2 md:pt-0">
                      <span className="text-[13px] text-[var(--muted)] hidden md:block">
                        {item.readTime}
                      </span>
                      <Link
                        href={`/news/${item.slug}`}
                        className="text-[14px] font-medium text-[var(--ink)] group-hover:text-[var(--orange-deep)] transition-colors inline-flex items-center gap-2"
                      >
                        <span>Read release</span>
                        <span
                          className={`transition-all duration-200 inline-block ${
                            isHovered
                              ? 'text-[var(--orange)] translate-x-2'
                              : 'text-[var(--muted)] translate-x-0'
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
