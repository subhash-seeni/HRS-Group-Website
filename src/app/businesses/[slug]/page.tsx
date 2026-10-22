import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Container, Breadcrumbs, Logo } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Reveal } from '@/components/motion/Reveal';
import { entities } from '@/content/entities';
import { EntityHeroImage } from '@/components/sections/entity-specific/EntityHeroImage';
import { EntityFactsList } from '@/components/sections/entity-specific/EntityFactsList';
import { EntityOfferingsList } from '@/components/sections/entity-specific/EntityOfferingsList';
import { EntityClosingBlock } from '@/components/sections/entity-specific/EntityClosingBlock';
import { StickySteppedProcess } from '@/components/sections/entity-specific/StickySteppedProcess';
import { AluglazeSections } from '@/components/sections/entity-specific/AluglazeSections';
import { GeotrixSections } from '@/components/sections/entity-specific/GeotrixSections';
import { SoftSections } from '@/components/sections/entity-specific/SoftSections';
import { VenturesPortfolio } from '@/components/sections/entity-specific/VenturesPortfolio';
import { FoodProductsSections } from '@/components/sections/entity-specific/FoodProductsSections';
import { ConsumerProductsSections } from '@/components/sections/entity-specific/ConsumerProductsSections';
import { FirstGenSections } from '@/components/sections/entity-specific/FirstGenSections';
import { BrandHouseSections } from '@/components/sections/entity-specific/BrandHouseSections';
import { Entity } from '@/content/types';

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

  const entityFacts = [
    { label: 'Location', value: entity.location },
    { label: 'What they do', value: entity.whatTheyDo || entity.summary },
    {
      label: 'Who they serve',
      value: entity.whoTheyServe || (Array.isArray(entity.audience) ? entity.audience.join(', ') : entity.audience),
    },
    {
      label: 'Status',
      value: (
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
          <span>{entity.statusLabel || entity.status}</span>
        </span>
      ),
    },
    ...(entity.keyDetails
      ? entity.keyDetails.map((kd) => ({ label: kd.label, value: kd.value }))
      : []),
  ];

  const entityOfferings =
    entity.detailedOfferings && entity.detailedOfferings.length > 0
      ? entity.detailedOfferings.map((o) => ({
          title: o.title,
          description: o.description,
        }))
      : entity.offerings.map((o) => ({
          title: o,
          description: '',
        }));

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
            Breadcrumb, logo, name in SplitHeading, plain sentence,
            two text links, and a full-bleed 16:9 image below with
            the same scroll expansion as homepage opening but shorter distance.
        ======================================================== */}
        <Section surface="white" className="relative pt-[16vh] pb-16 md:pb-24 overflow-hidden">
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
                {/* Logo and sentence fade up */}
                <Reveal delay={100}>
                  <div className="h-9 flex items-center">
                    <Logo entity={entity.slug} height={32} />
                  </div>
                </Reveal>

                {/* Name in SplitHeading */}
                <SplitHeading as="h1" className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0">
                  {entity.name}
                </SplitHeading>

                {/* Short impactful sentence fade up */}
                <Reveal delay={200}>
                  <p className="text-[20px] md:text-[22px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                    {entity.heroHook || entity.descriptor || entity.summary}
                  </p>
                </Reveal>

                {/* Two text links fade up */}
                <Reveal delay={250}>
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
                </Reveal>
              </div>
            </div>

            {/* Full-bleed 16:9 image below with scroll expansion */}
            <EntityHeroImage
              slug={entity.slug}
              name={entity.name}
              caption={
                entity.heroCaption ||
                `${entity.name} operating facility and project installations in ${entity.location}.`
              }
            />
          </Container>
        </Section>

        {/* ========================================================
            SECTION 2: FACTS
            Definition list on stone; rows reveal one after another (80ms stagger).
        ======================================================== */}
        <Section surface="stone" className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal block m-0">
                  Operating facts
                </SplitHeading>
                <span className="text-[13.5px] text-[var(--muted)] font-sans mt-1 block">
                  Core enterprise attributes and territorial scope
                </span>
              </div>

              <div className="col-span-12 md:col-span-9">
                <EntityFactsList facts={entityFacts} />
              </div>
            </div>
          </Container>
        </Section>

        {/* ========================================================
            SECTION 3: OVERVIEW
            Sticky narrow side label with the entity name on the left
            while long text scrolls on the right (desktop only).
        ======================================================== */}
        {entity.overview && entity.overview.length > 0 ? (
          <Section surface="white" className="py-20 md:py-28 border-t border-[var(--rule)]">
            <Container>
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-3 md:sticky md:top-32 self-start space-y-2">
                  <span className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal block m-0">
                    {entity.name}
                  </span>
                  <span className="text-[13.5px] text-[var(--muted)] font-sans block">
                    Overview &amp; governance
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
          </Section>
        ) : null}

        {/* ========================================================
            SECTION 4: WHAT IT OFFERS
            Numbered list with large orange numerals. On hover a row's
            background changes to orange-wash and the title shifts 8px.
        ======================================================== */}
        <Section id="offerings" surface="stone" className="py-20 md:py-28 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  What it offers
                </SplitHeading>
                <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                  Commercial scopes, technical capabilities, and product delivery.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9">
                <EntityOfferingsList offerings={entityOfferings} />
              </div>
            </div>
          </Container>
        </Section>

        {/* ========================================================
            SECTION 5: HOW IT WORKS
            For Indian Brand House, sticky-stepped process where each
            step comes into focus as it passes the centre.
            For others with processSteps, clean sequential layout.
        ======================================================== */}
        {entity.processSteps && entity.processSteps.length > 0 ? (
          entity.slug === 'indian-brand-house' ? (
            <StickySteppedProcess
              steps={entity.processSteps}
              title="Creative process & governance"
              subtitle="Sequential creative engineering workflow and brand protection."
            />
          ) : (
            <Section surface="white" className="py-20 md:py-28 border-t border-[var(--rule)]">
              <Container>
                <div className="grid grid-cols-12 gap-6 items-start">
                  <div className="col-span-12 md:col-span-3">
                    <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                      How it works
                    </SplitHeading>
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
            </Section>
          )
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
            CLOSING BLOCK
            An ink surface with a large Newsreader enquiry link,
            the entity pre-selected in /contact.
        ======================================================== */}
        <EntityClosingBlock
          entitySlug={entity.slug}
          entityName={entity.name}
          contactPrompt={entity.contactPrompt}
        />
      </article>
    </>
  );
}
