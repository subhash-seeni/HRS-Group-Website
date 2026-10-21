import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Breadcrumbs, ImageSlot, InteractiveBackground } from '@/components/ui';
import { projects } from '@/content/projects';
import { entities } from '@/content/entities';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found — HRS Group' };
  }

  const title = `${project.name} — ${project.location} — HRS Group`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hrsgroup.in/projects/${project.slug}`,
      siteName: 'HRS Group',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const entity = entities.find((e) => e.slug === project.entitySlug);

  return (
    <article className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <section className="relative pt-[16vh] pb-20 md:pb-28 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'HRS Group', href: '/' },
              { label: entity ? entity.name : 'Businesses', href: entity ? `/businesses/${entity.slug}` : '/businesses' },
              { label: project.name },
            ]}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-12 gap-8 items-start mb-16 md:mb-24">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <span className="text-[14px] text-[var(--muted)] font-sans uppercase tracking-wider block">
                {project.typology.replace('-', ' ')} development &bull; {project.location}
              </span>

              <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0">
                {project.name}
              </h1>

              <p className="text-[19px] md:text-[21px] leading-[1.65] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                {project.description}
              </p>

              <div className="pt-4">
                <Link
                  href={`/contact?entity=${project.entitySlug}&project=${project.slug}`}
                  className="link-dot text-[16.5px]"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span className="link-editorial">Enquire about {project.name}</span>
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[var(--rule)] pt-6 lg:pt-2 lg:pl-10 space-y-6 font-sans">
              <span className="font-serif text-[20px] text-[var(--ink)] block">
                Project particulars
              </span>

              <dl className="space-y-4 m-0">
                <div className="border-b border-[var(--rule)] pb-3">
                  <dt className="text-[13px] text-[var(--muted)] uppercase tracking-wider">
                    Location
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                    {project.location}
                  </dd>
                </div>

                <div className="border-b border-[var(--rule)] pb-3">
                  <dt className="text-[13px] text-[var(--muted)] uppercase tracking-wider">
                    Scale & Scope
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                    {project.scale}
                  </dd>
                </div>

                <div className="border-b border-[var(--rule)] pb-3">
                  <dt className="text-[13px] text-[var(--muted)] uppercase tracking-wider">
                    Status / Year Completed
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                    <span>{project.yearCompletedOrStatus}</span>
                  </dd>
                </div>

                {entity ? (
                  <div className="border-b border-[var(--rule)] pb-3">
                    <dt className="text-[13px] text-[var(--muted)] uppercase tracking-wider">
                      Operating Entity
                    </dt>
                    <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                      <Link href={`/businesses/${entity.slug}`} className="link-editorial">
                        {entity.name}
                      </Link>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>

          <div className="mt-12">
            <ImageSlot
              aspectRatio="16:9"
              caption={`${project.name} architectural view and construction execution in ${project.location}.`}
            />
          </div>
        </Container>
      </section>
    </article>
  );
}
