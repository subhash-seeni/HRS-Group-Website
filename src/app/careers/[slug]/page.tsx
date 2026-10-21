import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Breadcrumbs, InteractiveBackground } from '@/components/ui';
import { jobOpenings } from '@/content/jobs';
import { entities } from '@/content/entities';
import { JobApplyForm } from './JobApplyForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobOpenings.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobOpenings.find((j) => j.slug === slug);
  if (!job) return { title: 'Position Not Found — HRS Group' };

  return {
    title: `${job.title} — Careers at HRS Group`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobOpenings.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const entity = entities.find((e) => e.slug === job.entitySlug);

  // Structured Data: JobPosting
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
    <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative pt-[16vh] md:pt-[20vh] pb-24 md:pb-36 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-10">
            <Breadcrumbs
              items={[
                { label: 'Careers', href: '/careers' },
                { label: job.title },
              ]}
            />
          </div>

          {/* Job Header */}
          <div className="grid grid-cols-12 gap-8 mb-16 border-b border-[var(--rule)] pb-12">
            <div className="col-span-12 lg:col-span-9 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[14px] text-[var(--muted)]">
                {entity && (
                  <>
                    <Link
                      href={`/businesses/${entity.slug}`}
                      className="text-[var(--ink)] hover:text-[var(--orange)] transition-colors underline underline-offset-4"
                    >
                      {entity.name}
                    </Link>
                    <span className="text-[var(--rule)]">/</span>
                  </>
                )}
                <span>{job.department}</span>
                <span className="text-[var(--rule)]">/</span>
                <span>{job.location}</span>
              </div>

              <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-[14px] text-[var(--muted)]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider block text-[var(--muted)]">
                    Employment
                  </span>
                  <span className="text-[var(--ink)] font-medium">{job.employmentType}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider block text-[var(--muted)]">
                    Experience
                  </span>
                  <span className="text-[var(--ink)] font-medium">{job.experienceLevel || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider block text-[var(--muted)]">
                    Base Facility
                  </span>
                  <span className="text-[var(--ink)] font-medium">{job.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column: Left specifications, Right application form */}
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-12 lg:col-span-7 space-y-10">
              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">
                  Role overview
                </h2>
                <p className="text-[16px] leading-[1.7] text-[var(--muted)] m-0">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">
                  Key responsibilities
                </h2>
                <ul className="space-y-2.5 list-disc pl-5 text-[15px] leading-[1.65] text-[var(--ink)]">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[20px] font-medium text-[var(--ink)] mb-3">
                  Candidate qualifications
                </h2>
                <ul className="space-y-2.5 list-disc pl-5 text-[15px] leading-[1.65] text-[var(--ink)]">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {entity && (
                <div className="p-6 border border-[var(--rule)] bg-[var(--paper)] space-y-2">
                  <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block">
                    Operating company
                  </span>
                  <h3 className="text-[18px] font-medium text-[var(--ink)] m-0">
                    {entity.name}
                  </h3>
                  <p className="text-[14px] text-[var(--muted)] leading-[1.6] m-0">
                    {entity.summary}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/businesses/${entity.slug}`}
                      className="text-[13px] text-[var(--ink)] hover:text-[var(--orange)] transition-colors underline underline-offset-4"
                    >
                      View company profile and capabilities →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Application Form */}
            <div className="col-span-12 lg:col-span-5 border border-[var(--rule)] bg-[var(--paper)] p-6 md:p-8">
              <div className="mb-6">
                <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-1">
                  Direct submission
                </span>
                <h2 className="text-[22px] font-normal text-[var(--ink)] m-0">
                  Apply for this position
                </h2>
                <p className="text-[13px] text-[var(--muted)] mt-1 mb-0">
                  Resumes are received directly by the division recruitment desk.
                </p>
              </div>

              <JobApplyForm jobTitle={job.title} jobId={job.id} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
