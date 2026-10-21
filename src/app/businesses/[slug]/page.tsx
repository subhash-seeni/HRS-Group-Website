import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Container, Breadcrumbs, ImageSlot, Logo, Row, InteractiveBackground } from '@/components/ui';
import { entities } from '@/content/entities';
import { AluglazeSections } from '@/components/sections/entity-specific/AluglazeSections';
import { GeotrixSections } from '@/components/sections/entity-specific/GeotrixSections';
import { SoftSections } from '@/components/sections/entity-specific/SoftSections';
import { VenturesPortfolio } from '@/components/sections/entity-specific/VenturesPortfolio';
import { FoodProductsSections } from '@/components/sections/entity-specific/FoodProductsSections';
import { ConsumerProductsSections } from '@/components/sections/entity-specific/ConsumerProductsSections';
import { FirstGenSections } from '@/components/sections/entity-specific/FirstGenSections';
import { BrandHouseSections } from '@/components/sections/entity-specific/BrandHouseSections';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return entities.map((entity) => ({
    slug: entity.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = entities.find((e) => e.slug === slug);

  if (!entity) {
    return {
      title: 'Business Not Found — HRS Group',
    };
  }

  const title = `${entity.name} — HRS Group, Ahmedabad`;
  const description = entity.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hrsgroup.in/businesses/${entity.slug}`,
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

export default async function EntityPage({ params }: Props) {
  const { slug } = await params;
  const entity = entities.find((e) => e.slug === slug);

  if (!entity) {
    notFound();
  }

  // Lookup related entities
  const relatedList = entity.relatedEntities
    .map((relSlug) => entities.find((e) => e.slug === relSlug))
    .filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: entity.name,
    description: entity.summary,
    url: `https://hrsgroup.in/businesses/${entity.slug}`,
    parentOrganization: {
      '@type': 'Organization',
      name: 'HRS Group',
      url: 'https://hrsgroup.in',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: entity.location.split(',')[0].trim(),
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
  };

  const isHotels = slug === 'firstgen-hotels';
  const hotelLocalBusinesses = isHotels
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: 'Amuktamalyada',
          description: 'Authentic South Indian Telugu vegetarian dining and breakfast tiffin on Outer Ring Road, Bengaluru.',
          servesCuisine: ['South Indian', 'Telugu', 'Vegetarian'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kadubeesanahalli, Outer Ring Road',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            postalCode: '560103',
            addressCountry: 'IN',
          },
          parentOrganization: {
            '@type': 'Organization',
            name: 'FirstGen Hotels',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'LodgingBusiness',
          name: 'Flight Stays',
          description: 'Corporate serviced apartments for enterprise project teams in Bengaluru tech corridor.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kadubeesanahalli, Outer Ring Road',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            postalCode: '560103',
            addressCountry: 'IN',
          },
          parentOrganization: {
            '@type': 'Organization',
            name: 'FirstGen Hotels',
          },
        },
      ]
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'HRS Group',
        item: 'https://hrsgroup.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Our businesses',
        item: 'https://hrsgroup.in/businesses',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: entity.name,
        item: `https://hrsgroup.in/businesses/${entity.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {hotelLocalBusinesses && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelLocalBusinesses) }}
        />
      )}

      <article className="bg-[var(--white)] text-[var(--ink)] font-sans">
        {/* ========================================================
            SECTION 1: OPENING
            Breadcrumb, logo, name in large Newsreader, one plain sentence,
            two text links, and one large ImageSlot with caption.
        ======================================================== */}
        <section className="relative pt-[16vh] pb-20 md:pb-28 overflow-hidden">
          <InteractiveBackground variant="inner" />
          <Container className="relative z-10">
            {/* Breadcrumb */}
            <Breadcrumbs
              items={[
                { label: 'HRS Group', href: '/' },
                { label: 'Our businesses', href: '/businesses' },
                { label: entity.name },
              ]}
              className="mb-10 md:mb-14"
            />

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-9 space-y-6">
                {/* Placeholder Logo at modest size */}
                <div className="h-9 flex items-center">
                  <Logo entity={entity.slug} height={32} />
                </div>

                {/* Name in large Newsreader */}
                <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0">
                  {entity.name}
                </h1>

                {/* Short impactful sentence creating curiosity to read */}
                <p className="text-[20px] md:text-[22px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                  {entity.heroHook || entity.descriptor || entity.summary}
                </p>

                {/* Two text links */}
                <div className="flex flex-wrap items-center gap-8 pt-4 text-[17px] font-sans">
                  <Link
                    href={`/contact?entity=${entity.slug}`}
                    className="link-dot"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                    <span className="link-editorial">Send an enquiry</span>
                  </Link>

                  {entity.primaryAction ? (
                    <Link
                      href={entity.primaryAction.href}
                      className="link-editorial"
                    >
                      {entity.primaryAction.label}
                    </Link>
                  ) : (
                    <a href="#offerings" className="link-editorial">
                      What we offer
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Below, one large ImageSlot with caption */}
            <div className="mt-16 md:mt-24">
              <ImageSlot
                aspectRatio="16:9"
                caption={
                  entity.heroCaption ||
                  `${entity.name} operating facility and project installations in ${entity.location}.`
                }
              />
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 2: FACTS
            Definition list with 3-4 rows (location, what they do,
            who they serve, status) separated by hairlines.
        ======================================================== */}
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] block">
                  Operating facts
                </span>
                <span className="text-[13.5px] text-[var(--muted)] font-sans mt-1 block">
                  Core enterprise attributes and territorial scope
                </span>
              </div>

              <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
                <dl className="m-0 font-sans">
                  {/* Location */}
                  <div className="py-5 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
                    <dt className="sm:col-span-4 text-[15px] text-[var(--muted)] font-normal m-0">
                      Location
                    </dt>
                    <dd className="sm:col-span-8 text-[16px] text-[var(--ink)] m-0">
                      {entity.location}
                    </dd>
                  </div>

                  {/* What they do */}
                  <div className="py-5 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
                    <dt className="sm:col-span-4 text-[15px] text-[var(--muted)] font-normal m-0">
                      What they do
                    </dt>
                    <dd className="sm:col-span-8 text-[16px] text-[var(--ink)] m-0">
                      {entity.whatTheyDo || entity.summary}
                    </dd>
                  </div>

                  {/* Who they serve */}
                  <div className="py-5 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
                    <dt className="sm:col-span-4 text-[15px] text-[var(--muted)] font-normal m-0">
                      Who they serve
                    </dt>
                    <dd className="sm:col-span-8 text-[16px] text-[var(--ink)] m-0">
                      {entity.whoTheyServe || entity.audience.join(', ')}
                    </dd>
                  </div>

                  {/* Status */}
                  <div className="py-5 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
                    <dt className="sm:col-span-4 text-[15px] text-[var(--muted)] font-normal m-0">
                      Status
                    </dt>
                    <dd className="sm:col-span-8 text-[16px] text-[var(--ink)] m-0 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                      <span>{entity.statusLabel || entity.status}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 3: OVERVIEW
            Two or three paragraphs in columns 4-9.
            Optionally one pull quote set in Newsreader.
        ======================================================== */}
        {entity.overview && entity.overview.length > 0 ? (
          <section className="py-20 md:py-28 border-t border-[var(--rule)]">
            <Container>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] block">
                    Overview
                  </span>
                  <span className="text-[13.5px] text-[var(--muted)] font-sans mt-1 block">
                    Operating context and technical governance
                  </span>
                </div>

                <div className="col-span-12 md:col-span-7 md:col-start-4 space-y-6">
                  {entity.overview.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[18px] md:text-[19px] leading-[1.65] text-[var(--ink)] font-sans m-0"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Pull quote set in Newsreader */}
                  {entity.pullQuote ? (
                    <figure className="my-10 pl-6 border-l-2 border-[var(--orange)] m-0">
                      <blockquote className="font-serif text-[23px] md:text-[26px] leading-[1.35] text-[var(--ink)] not-italic m-0">
                        &ldquo;{entity.pullQuote.quote}&rdquo;
                      </blockquote>
                      {entity.pullQuote.attribution ? (
                        <figcaption className="text-[14px] text-[var(--muted)] font-sans mt-3 not-italic">
                          {entity.pullQuote.attribution}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {/* ========================================================
            SECTION 4: WHAT IT OFFERS
            Numbered list (1, 2, 3...) of offerings, each a title
            and two lines, hairline separated. No icons.
        ======================================================== */}
        <section id="offerings" className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  What it offers
                </h2>
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                  Commercial scopes, technical capabilities, and product delivery.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
                {entity.detailedOfferings && entity.detailedOfferings.length > 0
                  ? entity.detailedOfferings.map((item, idx) => (
                      <div
                        key={item.title}
                        className="py-6 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                      >
                        <div className="sm:col-span-4 flex items-baseline gap-3">
                          <span className="font-serif text-[15px] text-[var(--muted)] tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif text-[19px] md:text-[20px] text-[var(--ink)] font-normal">
                            {item.title}
                          </span>
                        </div>
                        <div className="sm:col-span-8">
                          <p className="text-[15.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  : entity.offerings.map((offering, idx) => (
                      <div
                        key={offering}
                        className="py-6 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                      >
                        <div className="sm:col-span-3">
                          <span className="font-serif text-[15px] text-[var(--muted)] tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="sm:col-span-9">
                          <p className="text-[16px] text-[var(--ink)] font-sans m-0">
                            {offering}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 5: HOW IT WORKS
            Only where it fits (food, brand services, education),
            as a plain numbered sequence.
        ======================================================== */}
        {entity.processSteps && entity.processSteps.length > 0 ? (
          <section className="py-20 md:py-28 border-t border-[var(--rule)]">
            <Container>
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-3">
                  <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                    How it works
                  </h2>
                  <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                    Standardised sequential workflow and operational quality control.
                  </p>
                </div>

                <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
                  {entity.processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="py-6 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                    >
                      <div className="sm:col-span-4 flex items-baseline gap-3">
                        <span className="font-serif text-[15px] text-[var(--muted)] tabular-nums">
                          Step {step.step}
                        </span>
                        <span className="font-serif text-[19px] md:text-[20px] text-[var(--ink)] font-normal">
                          {step.title}
                        </span>
                      </div>
                      <div className="sm:col-span-8">
                        <p className="text-[15.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {/* ========================================================
            ENTITY-SPECIFIC EXTENDED SECTIONS (PHASE 3B)
        ======================================================== */}
        {entity.slug === 'hrs-aluglaze' && entity.aluglazeData ? (
          <AluglazeSections data={entity.aluglazeData} />
        ) : null}

        {entity.slug === 'geotrix' && entity.geotrixData ? (
          <GeotrixSections data={entity.geotrixData} />
        ) : null}

        {entity.slug === 'school-of-facade-technologies' && entity.softData ? (
          <SoftSections data={entity.softData} />
        ) : null}

        {entity.slug === 'hrishikesh-ventures' ? (
          <VenturesPortfolio />
        ) : null}

        {entity.slug === 'hrishikesh-food-products' && entity.foodData ? (
          <FoodProductsSections data={entity.foodData} />
        ) : null}

        {entity.slug === 'hrishikesh-consumer-products' ? (
          <ConsumerProductsSections manprasData={entity.manprasData} />
        ) : null}

        {entity.slug === 'firstgen' ||
        entity.slug === 'firstgen-assets' ||
        entity.slug === 'firstgen-hotels' ||
        entity.slug === 'firstgen-enterprises' ? (
          <FirstGenSections
            entitySlug={entity.slug}
            firstgenData={entity.firstgenData}
            assetsData={entity.assetsData}
            hotelsData={entity.hotelsData}
            enterprisesData={entity.enterprisesData}
          />
        ) : null}

        {entity.slug === 'indian-brand-house' && entity.brandHouseData ? (
          <BrandHouseSections data={entity.brandHouseData} />
        ) : null}

        {/* ========================================================
            SECTION 6: RELATED BUSINESSES
            Rows linking to connected entities (e.g. Aluglaze links Geotrix & SoFT)
        ======================================================== */}
        {relatedList.length > 0 ? (
          <section className="py-20 md:py-28 border-t border-[var(--rule)]">
            <Container>
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-3">
                  <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                    Related businesses
                  </h2>
                  <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                    Connected group companies collaborating on common projects or supply chains.
                  </p>
                </div>

                <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
                  {relatedList.map((rel) => {
                    if (!rel) return null;
                    return (
                      <Row
                        key={rel.slug}
                        name={rel.name}
                        description={rel.summary}
                        meta={rel.location}
                        logoEntity={rel.slug}
                        href={`/businesses/${rel.slug}`}
                      />
                    );
                  })}
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {/* ========================================================
            SECTION 7: CONTACT BLOCK
            One sentence and a link to the form with entity preselected.
            No coloured band.
        ======================================================== */}
        <section className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-baseline">
              <div className="col-span-12 md:col-span-3">
                <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  Enquiries
                </h2>
              </div>

              <div className="col-span-12 md:col-span-7 space-y-5">
                <p className="text-[17.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
                  {entity.contactPrompt ||
                    `Contact our team directly for commercial inquiries, technical specifications, or partnership discussions regarding ${entity.name}.`}
                </p>

                <div>
                  <Link
                    href={`/contact?entity=${entity.slug}`}
                    className="link-dot text-[16.5px]"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                    <span className="link-editorial">Send an enquiry to {entity.name}</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
