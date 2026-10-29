'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, MapPin, Layers, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '@/content/types';

interface Props {
  projects: Project[];
}

const TYPOLOGY_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  'joint-venture': 'Joint Venture',
  'facade-engineering': 'Facade Engineering',
};

const PROJECT_IMAGES: Record<string, string> = {
  h1: '/images/hrishikesh-ventures/residential-tower.webp',
  h2: '/images/hrishikesh-ventures/h2-residential.webp',
  h3: '/images/hrishikesh-ventures/residential-tower.webp',
  h4: '/images/hrishikesh-ventures/residential-tower.webp',
  h6: '/images/hrishikesh-ventures/h2-residential.webp',
  h7: '/images/hrishikesh-ventures/residential-tower.webp',
  h10: '/images/hrishikesh-ventures/residential-tower.webp',
  w1: '/images/group/ahmedabad-skyline.webp',
  'kishor-park': '/images/hrishikesh-ventures/h2-residential.webp',
  'hrishikesh-villa': '/images/hrishikesh-ventures/h2-residential.webp',
  'hrishikesh-1': '/images/group/ahmedabad-skyline.webp',
  'hrishikesh-2': '/images/hrs-aluglaze/curtain-wall-detail.webp',
  'hrishikesh-3': '/images/group/ahmedabad-skyline.webp',
  'h9-joint-venture': '/images/hrishikesh-ventures/residential-tower.webp',
  'sanand-industrial-hq': '/images/hrs-aluglaze/sanand-campus.webp',
  'outer-ring-commercial-tower': '/images/geotrix/window-frames-section.webp',
};

export const ProjectsClient: React.FC<Props> = ({ projects }) => {
  const [selectedTypology, setSelectedTypology] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const typologies = Array.from(new Set(projects.map((p) => p.typology)));
  const locations = Array.from(
    new Set(
      projects.map((p) => {
        if (p.location.includes('Ahmedabad')) return 'Ahmedabad';
        if (p.location.includes('Bengaluru')) return 'Bengaluru';
        if (p.location.includes('Sanand')) return 'Sanand';
        return 'Other';
      })
    )
  );

  const filteredProjects = projects.filter((p) => {
    const matchesTypo = selectedTypology === 'all' || p.typology === selectedTypology;
    const matchesLoc =
      selectedLocation === 'all' ||
      (selectedLocation === 'Ahmedabad' && p.location.includes('Ahmedabad')) ||
      (selectedLocation === 'Bengaluru' && p.location.includes('Bengaluru')) ||
      (selectedLocation === 'Sanand' && p.location.includes('Sanand'));
    return matchesTypo && matchesLoc;
  });

  return (
    <div className="space-y-12 font-sans">
      {/* 1. Filter Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--ink)]/15 pb-6">
        {/* Typology Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedTypology('all')}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
              selectedTypology === 'all'
                ? 'bg-[var(--ink)] text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            All typologies ({projects.length})
          </button>

          {typologies.map((t) => {
            const count = projects.filter((p) => p.typology === t).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTypology(t)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  selectedTypology === t
                    ? 'bg-[var(--ink)] text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {TYPOLOGY_LABELS[t] || t} ({count})
              </button>
            );
          })}
        </div>

        {/* Location Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-500 font-medium">Location:</span>
          <div className="flex items-center gap-1.5">
            {['all', ...locations].map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  selectedLocation === loc
                    ? 'bg-[var(--hrs-orange)] text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {loc === 'all' ? 'All regions' : loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Visual Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p) => {
          const imgUrl = PROJECT_IMAGES[p.slug] || '/images/hrishikesh-ventures/residential-tower.webp';
          const isCompleted = p.yearCompletedOrStatus.toLowerCase().includes('completed');

          return (
            <article
              key={p.slug}
              className="group border border-[var(--ink)]/15 bg-[var(--paper)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[var(--ink)] hover:shadow-sm"
            >
              <div>
                {/* Photo Preview Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={imgUrl}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Top Status Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[var(--ink)]/90 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-semibold rounded-full">
                    {isCompleted ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--hrs-orange)] animate-pulse" />
                    )}
                    <span>{p.yearCompletedOrStatus}</span>
                  </div>

                  {/* Typology Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[var(--ink)] px-2.5 py-0.5 text-[11px] font-bold rounded">
                    {TYPOLOGY_LABELS[p.typology] || p.typology}
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[var(--hrs-orange)] block mb-1">
                      {p.entitySlug === 'hrishikesh-ventures'
                        ? 'Hrishikesh Ventures'
                        : p.entitySlug === 'hrs-aluglaze'
                        ? 'HRS Aluglaze Ltd'
                        : 'Geotrix Pvt. Ltd.'}
                    </span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-neutral-600">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{p.location}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-neutral-700 font-medium">
                    <Layers className="h-3.5 w-3.5 text-[var(--hrs-orange)] shrink-0 mt-0.5" />
                    <span>{p.scale}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed pt-2 border-t border-[var(--ink)]/10 m-0">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[var(--ink)]/10 mt-4 text-xs font-semibold">
                <span className="text-neutral-500">Commercial specifications</span>
                <Link
                  href={`/businesses/${p.entitySlug}`}
                  className="inline-flex items-center gap-1.5 text-[var(--ink)] group-hover:text-[var(--hrs-orange)] transition-colors"
                >
                  <span>Operating company</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsClient;
