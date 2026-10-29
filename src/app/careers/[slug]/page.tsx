import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Clock, Building2, CheckCircle2 } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs, Logo } from '@/components/ui';
import { jobOpenings } from '@/content/jobs';
import { entities } from '@/content/entities';
import { JobApplyForm } from './JobApplyForm';
import { getAssetUrl } from '@/lib/basePath';

interface Props {
  params: Promise<{ slug: string }>;
}

const ENTITY_IMAGES: Record<string, string> = {
  'hrs-aluglaze': '/images/hrs-aluglaze/sanand-campus.webp',
  'hrishikesh-ventures': '/images/hrishikesh-ventures/residential-tower.webp',
  'school-of-facade-technologies': '/images/school-of-facade-technologies/workshop-benches.webp',
  'hrishikesh-food-products': '/images/hrishikesh-food-products/whole-spices-stone.webp',
  'hrishikesh-consumer-products': '/images/hrishikesh-consumer-products/manpras-store.webp',
  'firstgen-assets': '/images/firstgen/service-apartment.webp',
  'firstgen-hotels': '/images/firstgen/south-indian-breakfast.webp',
  'indian-brand-house': '/images/indian-brand-house/studio-desk.webp',
};

export async function generateStaticParams() {
  return jobOpenings.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobOpenings.find((j) => j.slug === slug);

  if (!job) {
    return { title: 'Position Not Found · HRS Group' };
  }

  return {
    title: `${job.title} · Careers at HRS Group`,
    description: job.description,
    openGraph: {
      title: `${job.title} · Careers at HRS Group`,
      description: job.description,
      url: `https://hrsgroup.in/careers/${job.slug}`,
      siteName: 'HRS Group',
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobOpenings.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const entity = entities.find((e) => e.slug === job.entitySlug);
  const entityImage = entity ? ENTITY_IMAGES[entity.slug] : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.description} Responsibilities: ${job.responsibilities.join(
      '; '
    )}. Requirements: ${job.requirements.join('; ')}`,
    datePosted: '2026-10-01',
    validThrough: '2026-12-31',
    employmentType: job.employmentType === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: entity?.name || 'HRS Group',
      sameAs: 'https://hrsgroup.in',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.includes('Bengaluru') ? 'Bengaluru' : 'Ahmedabad',
        addressRegion: job.location.includes('Bengaluru') ? 'Karnataka' : 'Gujarat',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="relative min-h-screen">
        {/* 1. Job Header: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'Careers', href: '/careers' },
                { label: job.title },
              ]}
              backLink={{ label: 'Careers board', href: '/careers' }}
              className="mb-8"
            />

            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-4">
              {entity && (
                <>
                  <Link
                    href={entity.url}
                    className="font-bold text-[var(--hrs-orange)] hover:underline"
                  >
                    {entity.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="font-semibold text-neutral-700">{job.department}</span>
              <span>/</span>
              <span>{job.location}</span>
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              {job.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div className="p-3 bg-white border border-neutral-200 min-w-[120px]">
                <span className="font-bold text-neutral-900 block mb-0.5">Employment</span>
                <span>{job.employmentType}</span>
              </div>
              <div className="p-3 bg-white border border-neutral-200 min-w-[120px]">
                <span className="font-bold text-neutral-900 block mb-0.5">Experience</span>
                <span className="tabular-nums">{job.experienceLevel || 'Not specified'}</span>
              </div>
              <div className="p-3 bg-white border border-neutral-200 min-w-[160px]">
                <span className="font-bold text-neutral-900 block mb-0.5">Location</span>
                <span>{job.location}</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Job Specifications & Application Form: Surface White */}
        <Section surface="white">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left Column: Job Description, Responsibilities, Requirements */}
            <div className="col-span-12 lg:col-span-7 space-y-10">
              <div>
                <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] mb-3">
                  Role overview
                </h2>
                <p className="text-base leading-relaxed text-neutral-800 m-0">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] mb-3">
                  Key responsibilities
                </h2>
                <ul className="space-y-3 list-disc pl-5 text-sm leading-relaxed text-neutral-800">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] mb-3">
                  Candidate qualifications
                </h2>
                <ul className="space-y-3 list-disc pl-5 text-sm leading-relaxed text-neutral-800">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {entity && (
                <div className="border border-neutral-200 bg-[var(--paper)] p-6 overflow-hidden flex flex-col sm:flex-row gap-6 items-center">
                  {entityImage && (
                    <div className="w-full sm:w-36 aspect-[4/3] shrink-0 overflow-hidden bg-neutral-200 border border-neutral-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getAssetUrl(entityImage)}
                        alt={entity.name}
                        className="h-full w-full object-cover grayscale contrast-110"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[var(--hrs-orange)] block">
                      Hiring Operating Business
                    </span>
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)] m-0">
                      {entity.name}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed m-0">
                      {entity.summary}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={entity.url}
                        className="text-xs font-bold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors underline underline-offset-4"
                      >
                        View business profile & operational scope →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Application Form */}
            <div className="col-span-12 lg:col-span-5 border border-neutral-200 bg-[var(--paper)] p-6 sm:p-8 sticky top-28 shadow-sm">
              <div className="mb-6 border-b border-neutral-200 pb-4">
                <span className="text-xs font-bold text-[var(--hrs-orange)] block mb-1">
                  Direct Submission
                </span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] m-0">
                  Apply for this role
                </h3>
                <p className="text-xs text-neutral-600 mt-1 mb-0">
                  Submissions are reviewed directly by the division recruitment desk.
                </p>
              </div>

              <JobApplyForm jobTitle={job.title} jobId={job.id} />
            </div>
          </div>
        </Section>

        {/* 3. Return to Careers: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Careers at HRS Group
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Explore other openings across our businesses
              </h2>
            </div>

            <div className="shrink-0">
              <Button href="/careers" variant="primary">
                Return to careers board
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
