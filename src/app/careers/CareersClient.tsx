'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { JobOpening } from '@/content/types';
import { entities } from '@/content/entities';

interface Props {
  jobs: JobOpening[];
}

export const CareersClient: React.FC<Props> = ({ jobs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

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
      <div className="p-6 border border-[var(--rule)] bg-[var(--paper)] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="md:col-span-1">
            <label htmlFor="job-search" className="block text-[12px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
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
            <label htmlFor="filter-entity" className="block text-[12px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Business
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
            <label htmlFor="filter-location" className="block text-[12px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
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
            <label htmlFor="filter-department" className="block text-[12px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
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
        <div className="flex justify-between items-center text-[13px] text-[var(--muted)] pt-2 border-t border-[var(--rule)]">
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
              className="text-[var(--ink)] underline hover:text-[var(--orange)] transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Typographic Job Rows */}
      <div className="border-t border-[var(--rule)]">
        {filteredJobs.length === 0 ? (
          <div className="py-16 text-center text-[var(--muted)] border-b border-[var(--rule)]">
            <p className="text-[16px] m-0">No open roles match the selected criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedEntity('all');
                setSelectedLocation('all');
                setSelectedDepartment('all');
              }}
              className="mt-3 text-[14px] text-[var(--ink)] underline hover:text-[var(--orange)]"
            >
              Clear filters to view all roles
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <article
              key={job.id}
              className="py-8 md:py-10 border-b border-[var(--rule)] px-0 md:px-4 -mx-0 md:-mx-4 hover:bg-[var(--paper)] transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="col-span-12 md:col-span-4 space-y-2">
                  <span className="text-[13px] text-[var(--muted)] block">
                    {getEntityName(job.entitySlug)} · {job.department}
                  </span>
                  <h3 className="text-[20px] md:text-[22px] font-normal leading-[1.3] text-[var(--ink)] m-0">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="hover:text-[var(--orange)] transition-colors"
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

                <div className="col-span-12 md:col-span-5 space-y-3">
                  <p className="text-[15px] leading-[1.65] text-[var(--ink)] m-0">
                    {job.description}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-3 text-left md:text-right pt-2 md:pt-0">
                  <Link
                    href={`/careers/${job.slug}`}
                    className="text-[14px] font-medium text-[var(--ink)] hover:text-[var(--orange)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>View role & apply</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
