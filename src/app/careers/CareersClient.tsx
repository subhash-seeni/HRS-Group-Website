'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { JobOpening } from '@/content/types';
import { entities } from '@/content/entities';
import { motionTokens } from '@/lib/motion';

interface Props {
  jobs: JobOpening[];
}

export const CareersClient: React.FC<Props> = ({ jobs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);

  const entityOptions = useMemo(() => {
    const slugs = Array.from(new Set(jobs.map((j) => j.entitySlug)));
    return slugs.map((slug) => {
      const ent = entities.find((e) => e.slug === slug);
      return { slug, name: ent?.name || slug };
    });
  }, [jobs]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.location)));
  }, [jobs]);

  const departmentOptions = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.department)));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEntity = selectedEntity === 'all' || job.entitySlug === selectedEntity;
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;

      return matchesSearch && matchesEntity && matchesLocation && matchesDepartment;
    });
  }, [jobs, searchQuery, selectedEntity, selectedLocation, selectedDepartment]);

  const getEntityName = (slug: string) => {
    return entities.find((e) => e.slug === slug)?.name || slug;
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Search and Filters Bar */}
      <div className="p-6 md:p-8 border border-[var(--rule)] bg-[var(--paper)] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search Box */}
          <div className="md:col-span-1">
            <label htmlFor="job-search" className="block text-[13px] text-[var(--muted)] mb-1.5">
              Search roles
            </label>
            <input
              id="job-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Engineer, Chemist, Designer"
              className="w-full h-11 px-3 bg-[var(--white)] border border-[var(--rule)] text-[14px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px]"
            />
          </div>

          {/* Filter by Entity */}
          <div>
            <label htmlFor="filter-entity" className="block text-[13px] text-[var(--muted)] mb-1.5">
              Operating business
            </label>
            <select
              id="filter-entity"
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="w-full h-11 px-3 bg-[var(--white)] border border-[var(--rule)] text-[14px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px] cursor-pointer"
            >
              <option value="all">All businesses</option>
              {entityOptions.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Location */}
          <div>
            <label htmlFor="filter-location" className="block text-[13px] text-[var(--muted)] mb-1.5">
              Location
            </label>
            <select
              id="filter-location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full h-11 px-3 bg-[var(--white)] border border-[var(--rule)] text-[14px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px] cursor-pointer"
            >
              <option value="all">All locations</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Department */}
          <div>
            <label htmlFor="filter-department" className="block text-[13px] text-[var(--muted)] mb-1.5">
              Function
            </label>
            <select
              id="filter-department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full h-11 px-3 bg-[var(--white)] border border-[var(--rule)] text-[14px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px] cursor-pointer"
            >
              <option value="all">All functions</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results summary and reset button */}
        <div className="flex justify-between items-center text-[13px] text-[var(--muted)] pt-3 border-t border-[var(--rule)]">
          <span>Showing {filteredJobs.length} of {jobs.length} open positions</span>
          {(searchQuery || selectedEntity !== 'all' || selectedLocation !== 'all' || selectedDepartment !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedEntity('all');
                setSelectedLocation('all');
                setSelectedDepartment('all');
              }}
              className="text-[var(--ink)] underline hover:text-[var(--orange)] transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Typographic Job Rows with animated layout reordering */}
      <motion.div layout className="border-t border-[var(--rule)]">
        <AnimatePresence mode="popLayout">
          {filteredJobs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-[var(--muted)] border-b border-[var(--rule)]"
            >
              <p className="text-[16px] m-0">No open roles match the selected criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedEntity('all');
                  setSelectedLocation('all');
                  setSelectedDepartment('all');
                }}
                className="mt-3 text-[14px] text-[var(--ink)] underline hover:text-[var(--orange)] cursor-pointer"
              >
                Clear filters to view all roles
              </button>
            </motion.div>
          ) : (
            filteredJobs.map((job) => {
              const isHovered = hoveredJobId === job.id;
              const isOtherHovered = hoveredJobId !== null && !isHovered;

              return (
                <motion.article
                  layout
                  key={job.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: isOtherHovered ? 0.45 : 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setHoveredJobId(job.id)}
                  onMouseLeave={() => setHoveredJobId(null)}
                  className={`group relative py-8 md:py-10 border-b border-[var(--rule)] px-0 md:px-4 -mx-0 md:-mx-4 transition-colors duration-200 ${
                    isHovered ? 'bg-[var(--paper)]' : 'bg-transparent'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    {/* Left col: Title, Business name preview & metadata */}
                    <div className="col-span-1 md:col-span-5 space-y-2">
                      <div className="flex items-center gap-2">
                        {/* Hover preview of business name */}
                        <span
                          className={`text-[13px] transition-colors duration-200 ${
                            isHovered
                              ? 'text-[var(--orange-deep)] font-medium'
                              : 'text-[var(--muted)]'
                          }`}
                        >
                          {getEntityName(job.entitySlug)}
                        </span>
                        <span className="text-[var(--rule)]">·</span>
                        <span className="text-[13px] text-[var(--muted)]">{job.department}</span>
                      </div>

                      <h3
                        className="text-[20px] md:text-[23px] font-normal leading-[1.3] text-[var(--ink)] m-0 transition-transform duration-200"
                        style={{
                          transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                          transitionTimingFunction: motionTokens.easings.cssEaseOut,
                        }}
                      >
                        <Link
                          href={`/careers/${job.slug}`}
                          className="hover:text-[var(--orange-deep)] transition-colors inline-block"
                        >
                          {job.title}
                        </Link>
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[var(--muted)] pt-1">
                        <span>{job.location}</span>
                        <span className="text-[var(--rule)]">/</span>
                        <span>{job.employmentType}</span>
                        {job.experienceLevel && (
                          <>
                            <span className="text-[var(--rule)]">/</span>
                            <span>{job.experienceLevel}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Center col: Role description */}
                    <div className="col-span-1 md:col-span-4 space-y-3">
                      <p className="text-[15px] leading-[1.65] text-[var(--ink)] m-0">
                        {job.description}
                      </p>
                    </div>

                    {/* Right col: View role link with sliding orange arrow */}
                    <div className="col-span-1 md:col-span-3 text-left md:text-right pt-2 md:pt-0">
                      <Link
                        href={`/careers/${job.slug}`}
                        className="text-[14px] font-medium text-[var(--ink)] group-hover:text-[var(--orange-deep)] transition-colors inline-flex items-center gap-2"
                      >
                        <span>View role</span>
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
