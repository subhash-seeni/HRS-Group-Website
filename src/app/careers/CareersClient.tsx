'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, RotateCcw, MapPin, Briefcase, Clock, Building2 } from 'lucide-react';
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

  const getEntity = (slug: string) => {
    return entities.find((e) => e.slug === slug);
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedEntity !== 'all' ||
    selectedLocation !== 'all' ||
    selectedDepartment !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedEntity('all');
    setSelectedLocation('all');
    setSelectedDepartment('all');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Modern Filter Card */}
      <div className="p-6 sm:p-8 border border-neutral-200 bg-[var(--paper)] shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div>
            <label htmlFor="job-search" className="block text-xs font-bold text-neutral-800 mb-1.5">
              Search roles
            </label>
            <div className="relative">
              <input
                id="job-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Facade, Chemist, Designer"
                className="w-full h-11 pl-9 pr-3 bg-white border border-neutral-300 text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400" />
            </div>
          </div>

          {/* Filter by Entity */}
          <div>
            <label htmlFor="filter-entity" className="block text-xs font-bold text-neutral-800 mb-1.5">
              Operating business
            </label>
            <select
              id="filter-entity"
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors cursor-pointer"
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
            <label htmlFor="filter-location" className="block text-xs font-bold text-neutral-800 mb-1.5">
              Facility location
            </label>
            <select
              id="filter-location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors cursor-pointer"
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
            <label htmlFor="filter-department" className="block text-xs font-bold text-neutral-800 mb-1.5">
              Function
            </label>
            <select
              id="filter-department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors cursor-pointer"
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
        <div className="flex justify-between items-center text-xs text-neutral-600 pt-4 mt-4 border-t border-neutral-200">
          <span className="tabular-nums font-semibold">
            Showing {filteredJobs.length} of {jobs.length} open positions
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-16 text-center text-neutral-600 border border-neutral-200 bg-[var(--paper)]">
            <p className="text-base font-semibold m-0">No open roles match the selected criteria.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 text-xs font-bold text-[var(--ink)] underline hover:text-[var(--hrs-orange)] cursor-pointer"
            >
              Clear filters to view all roles
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const entity = getEntity(job.entitySlug);
            const accentColor = entity?.accentColor || '#F58220';

            return (
              <article
                key={job.id}
                className="group relative flex flex-col justify-between overflow-hidden border border-neutral-200 bg-white p-6 sm:p-8 transition-all duration-300 hover:border-[var(--ink)] hover:shadow-lg"
              >
                {/* Sector Accent Top Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: accentColor }}
                    >
                      {entity?.name || job.entitySlug}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700 border border-neutral-200">
                      {job.department}
                    </span>
                  </div>

                  <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--hrs-orange)]">
                    <Link href={`/careers/${job.slug}`} className="focus:outline-none">
                      {job.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                      <span>{job.location}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-neutral-400" />
                      <span>{job.employmentType}</span>
                    </div>
                    {job.experienceLevel && (
                      <>
                        <span>·</span>
                        <div className="flex items-center gap-1 tabular-nums">
                          <Clock className="h-3.5 w-3.5 text-neutral-400" />
                          <span>{job.experienceLevel}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-400">
                    Posted {job.postedDate || 'Active recruitment'}
                  </span>

                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-bold text-[var(--ink)] transition-all duration-300 group-hover:border-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white"
                  >
                    <span>View role & apply</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CareersClient;
