import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Breadcrumbs, ImageSlot, InteractiveBackground } from '@/components/ui';
import { SplitHeading } from '@/components/motion';
import { brands } from '@/content/brands';
import { entities } from '@/content/entities';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return brands.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return { title: 'Brand Not Found' };
  }

  const title = `${brand.name} | ${brand.category}`;
  const description = brand.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | HRS Group`,
      description,
      url: `https://hrsgroup.in/brands/${brand.slug}`,
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

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const parentEntity = entities.find((e) => e.slug === brand.parentEntitySlug);

  return (
    <article className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <section className="relative pt-[16vh] pb-20 md:pb-28 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'HRS Group', href: '/' },
              {
                label: parentEntity ? parentEntity.name : 'Businesses',
                href: parentEntity ? `/businesses/${parentEntity.slug}` : '/businesses',
              },
              { label: brand.name },
            ]}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-12 gap-8 items-start mb-16 md:mb-24">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <span className="text-[14px] text-[var(--muted)] font-sans block">
                {brand.category} &bull; {brand.status === 'active' ? 'Active brand' : 'Upcoming portfolio'}
              </span>

              <SplitHeading as="h1" className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0" text={brand.name} />

              <p className="text-[19px] md:text-[21px] leading-[1.65] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                {brand.description}
              </p>

              <div className="pt-4">
                <Link
                  href={`/contact?entity=${brand.parentEntitySlug}&subject=Brand enquiry: ${brand.name}`}
                  className="link-dot text-[16.5px]"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span className="link-editorial">Enquire regarding {brand.name}</span>
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[var(--rule)] pt-6 lg:pt-2 lg:pl-10 space-y-6 font-sans">
              <span className="font-serif text-[20px] text-[var(--ink)] block">
                Brand attributes
              </span>

              <dl className="space-y-4 m-0">
                <div className="border-b border-[var(--rule)] pb-3">
                  <dt className="text-[13px] text-[var(--muted)]">
                    Category
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                    {brand.category}
                  </dd>
                </div>

                <div className="border-b border-[var(--rule)] pb-3">
                  <dt className="text-[13px] text-[var(--muted)]">
                    Status
                  </dt>
                  <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
                    <span>{brand.status === 'active' ? 'Active in market' : 'Reserved trademark'}</span>
                  </dd>
                </div>

                {brand.location ? (
                  <div className="border-b border-[var(--rule)] pb-3">
                    <dt className="text-[13px] text-[var(--muted)]">
                      Location / Distribution
                    </dt>
                    <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                      {brand.location}
                    </dd>
                  </div>
                ) : null}

                {parentEntity ? (
                  <div className="border-b border-[var(--rule)] pb-3">
                    <dt className="text-[13px] text-[var(--muted)]">
                      Parent operating entity
                    </dt>
                    <dd className="text-[15.5px] text-[var(--ink)] mt-0.5 m-0">
                      <Link href={`/businesses/${parentEntity.slug}`} className="link-editorial">
                        {parentEntity.name}
                      </Link>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>

          {brand.offerings && brand.offerings.length > 0 ? (
            <div className="py-12 border-t border-[var(--rule)]">
              <h2 className="font-serif text-[22px] text-[var(--ink)] font-normal mb-6">
                Product lines & offerings
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-sans">
                {brand.offerings.map((item) => (
                  <div key={item} className="p-4 border border-[var(--rule)] space-y-1">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block mr-2" />
                    <span className="text-[15.5px] text-[var(--ink)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <ImageSlot
              aspectRatio="16:9"
              caption={`${brand.name} trade mark presentation and retail packaging representation.`}
            />
          </div>
        </Container>
      </section>
    </article>
  );
}
