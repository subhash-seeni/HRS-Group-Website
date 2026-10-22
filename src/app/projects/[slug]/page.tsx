import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container, Breadcrumbs, InteractiveBackground } from '@/components/ui';
import { SplitHeading } from '@/components/motion';
import { ImageReveal } from '@/components/motion/ImageReveal';
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
    return { title: 'Project Not Found' };
  }

  const title = `${project.name} | ${project.location}`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | HRS Group`,
      description,
      url: `https://hrsgroup.in/projects/${project.slug}`,
      siteName: 'HRS Group',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | HRS Group`,
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
              <div className="flex items-center gap-3">
                <span className="text-[14px] text-[var(--muted)] font-sans">
                  {project.typology.replace('-', ' ')} development &bull; {project.location}
                </span>
                {(project.slug === 'h9' || project.typology === 'joint-venture') && (
                  <span className="text-[11.5px] font-sans font-medium text-[var(--orange)] border border-[var(--orange)] px-2 py-0.5 rounded-[2px] shrink-0">
                    Joint venture
                  </span>
                )}
              </div>

              <SplitHeading as="h1" className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0" text={project.name} />

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
                  <dt className="text-[13px] text-[var(--muted)] font-sans">
                    Location
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                    {project.location}
                  </dd>
                </div>

                <div className="border-b border-[var(--rule)] pb-3">
                  <dt className="text-[13px] text-[var(--muted)] font-sans">
                    Scale & scope
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                    {project.scale}
                  </dd>
                </div>

                <div className="border-b border-[var(--rule)] pb-3">
                  <dt className="text-[13px] text-[var(--muted)] font-sans">
                    Status / year completed
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                    <span>{project.yearCompletedOrStatus}</span>
                  </dd>
                </div>

                {entity ? (
                  <div className="border-b border-[var(--rule)] pb-3">
                    <dt className="text-[13px] text-[var(--muted)] font-sans">
                      Operating entity
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

          {/* Large Image Gallery that Reveals as You Scroll */}
          <div className="mt-16 md:mt-24 space-y-16 md:space-y-24 border-t border-[var(--rule)] pt-16">
            <div className="space-y-2">
              <span className="text-[13px] text-[var(--muted)] font-sans">
                Architectural documentation & gallery
              </span>
              <h2 className="font-serif text-[26px] md:text-[30px] text-[var(--ink)] font-normal m-0">
                Visual survey & project execution
              </h2>
            </div>

            {/* Gallery Item 1: Full-width elevation */}
            <ImageReveal delay={150}>
              <figure className="m-0 space-y-3">
                <div className="relative w-full aspect-[16/9] md:h-[65vh] bg-[var(--slot)] overflow-hidden rounded-[2px] border border-[var(--rule)]">
                  <Image
                    src={
                      project.slug === 'h2'
                        ? '/images/hrishikesh-ventures/h2-residential.webp'
                        : '/images/hrishikesh-ventures/residential-tower.webp'
                    }
                    alt={`${project.name} primary elevation`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-[13.5px] text-[var(--muted)] font-sans flex items-baseline justify-between">
                  <span>Fig. 01 &bull; {project.name} primary street facade in {project.location}.</span>
                  <span className="text-[12px] tabular-nums">Exterior perspective</span>
                </figcaption>
              </figure>
            </ImageReveal>

            {/* Gallery Items 2 & 3: Two-column architectural articulation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <ImageReveal delay={250}>
                <figure className="m-0 space-y-3">
                  <div className="relative w-full aspect-[4/3] bg-[var(--slot)] overflow-hidden rounded-[2px] border border-[var(--rule)]">
                    <Image
                      src="/images/hrs-aluglaze/curtain-wall-detail.webp"
                      alt={`${project.name} facade detail`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-[13.5px] text-[var(--muted)] font-sans">
                    Fig. 02 &bull; Precision engineered curtain wall detail and fenestration joints.
                  </figcaption>
                </figure>
              </ImageReveal>

              <ImageReveal delay={350}>
                <figure className="m-0 space-y-3">
                  <div className="relative w-full aspect-[4/3] bg-[var(--slot)] overflow-hidden rounded-[2px] border border-[var(--rule)]">
                    <Image
                      src="/images/group/corporate-lobby.webp"
                      alt={`${project.name} entrance lobby`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-[13.5px] text-[var(--muted)] font-sans">
                    Fig. 03 &bull; Ground level entrance lobby and circulation core.
                  </figcaption>
                </figure>
              </ImageReveal>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
