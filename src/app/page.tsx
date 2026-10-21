import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, ImageSlot, InteractiveBackground } from '@/components/ui';
import { BusinessesFilter } from '@/components/sections/BusinessesFilter';
import { siteSettings } from '@/content/siteSettings';
import { groupValues } from '@/content/values';
import { news } from '@/content/news';
import { heroContent } from '@/content/heroContent';

export const metadata: Metadata = {
  title: 'HRS Group — Parent Website, Ahmedabad',
  description:
    'HRS Group is an Ahmedabad-based parent enterprise bringing together eight businesses across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.',
  openGraph: {
    title: 'HRS Group — Parent Website, Ahmedabad',
    description:
      'Eight operating entities across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.',
    url: 'https://hrsgroup.in',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HRS Group — Parent Website, Ahmedabad',
    description:
      'Eight operating entities across facade engineering, real estate, food manufacturing, consumer brands, hospitality, education, brand communications and retail.',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HRS Group',
    url: 'https://hrsgroup.in',
    logo: 'https://hrsgroup.in/logos/hrs-group.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380054',
      addressCountry: 'IN',
    },
    subOrganization: [
      { '@type': 'Organization', name: 'Hrishikesh Ventures' },
      { '@type': 'Organization', name: 'HRS Aluglaze Ltd' },
      { '@type': 'Organization', name: 'Geotrix Pvt. Ltd.' },
      { '@type': 'Organization', name: 'School of Facade Technologies' },
      { '@type': 'Organization', name: 'Hrishikesh Food Products' },
      { '@type': 'Organization', name: 'Hrishikesh Consumer Products' },
      { '@type': 'Organization', name: 'FirstGen Pvt. Ltd.' },
      { '@type': 'Organization', name: 'Indian Brand House' },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
        {/* ========================================================
            SECTION 1: OPENING
            Generous 20vh whitespace, large Newsreader statement,
            two text links, and one wide 16:9 ImageSlot.
        ======================================================== */}
        {/* ========================================================
            SECTION 1: OPENING HERO BANNER
            Generous whitespace, large Newsreader statement,
            two text links, and interactive background pattern.
        ======================================================== */}
        <section className="relative pt-[16vh] md:pt-[20vh] pb-20 md:pb-28 overflow-hidden border-b border-[var(--rule)]">
          <InteractiveBackground variant="home" />
          <Container className="relative z-10">
            <div className="grid grid-cols-12 gap-6 items-center">
              {/* Statement in Columns 1-7 (leaving columns 8-12 completely open for all 8 entity nodes) */}
              <div className="col-span-12 lg:col-span-7 xl:col-span-6 space-y-6">
                <div className="flex items-center gap-2.5 text-[14.5px] text-[var(--muted)] font-sans">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>{heroContent.home.markerLabel}</span>
                </div>

                <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight">
                  {heroContent.home.headline}
                </h1>

                <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[50ch] m-0">
                  {heroContent.home.curiosityHook}
                </p>

                {/* Plain text links */}
                <div className="flex flex-wrap items-center gap-8 pt-4 text-[17.5px] font-sans">
                  <a href="#businesses" className="link-editorial">
                    See our businesses
                  </a>
                  <Link href="/contact" className="link-dot">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                    <span className="link-editorial">Contact us</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Generous gap, then wide 16:9 ImageSlot */}
        <section className="py-20 md:py-28">
          <Container>
            <ImageSlot
              aspectRatio="16:9"
              caption="Ahmedabad headquarters on SG Highway and regional manufacturing facilities in Sanand, Bavla, and Bengaluru."
            />
          </Container>
        </section>

        {/* ========================================================
            SECTION 2: ABOUT
            Short paragraph (approx 60 words) in columns 4-9.
            Text link 'Read the story'. No heading.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-7 md:col-start-4 lg:col-span-6 lg:col-start-4 space-y-6">
                <p className="text-[18px] md:text-[19px] leading-[1.65] text-[var(--ink)] font-sans m-0">
                  Founded in Ahmedabad, HRS Group develops and operates long-cycle businesses anchored in
                  Gujarat and Karnataka. The group coordinates independent operational companies in architectural
                  facades, residential developments, spice milling, consumer retail, and regional hospitality.
                  Every business maintains autonomous technical leadership alongside central standards for capital
                  prudence, process control, and customer service.
                </p>
                <div>
                  <Link href="/about" className="link-editorial text-[17px]">
                    Read the story
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 3: BUSINESSES
            Heading 'Our businesses', plain text filter,
            grouped by sector (columns 1-3 sector name, columns 4-12 rows).
            Geotrix indented under Aluglaze, FirstGen umbrella label.
        ======================================================== */}
        <section id="businesses" className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="space-y-12">
              <h2 className="text-heading-1 text-[var(--ink)] font-normal">
                Our businesses
              </h2>

              <BusinessesFilter />
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 4: SELECTED WORK
            Two images, asymmetric: 3:2 in columns 1-7, 4:5 in columns 9-12
            starting lower. Captions with name, place, year and link.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="mb-12">
              <h2 className="text-heading-1 text-[var(--ink)] font-normal">
                Selected work
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Image 1: 3:2 aspect ratio in columns 1-7 */}
              <div className="col-span-12 lg:col-span-7">
                <ImageSlot aspectRatio="3:2" />
                <div className="mt-3 text-[14.5px] font-sans flex items-baseline justify-between gap-4">
                  <div className="text-[var(--ink)]">
                    <span className="font-serif text-[17px] mr-2">H2 Residential Development</span>
                    <span className="text-[var(--muted)]">&bull; Shela, Ahmedabad (2024)</span>
                  </div>
                  <Link href="/projects/h2" className="link-editorial text-[13.5px] flex-shrink-0">
                    See project
                  </Link>
                </div>
              </div>

              {/* Image 2: 4:5 aspect ratio in columns 9-12 starting lower */}
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-8 lg:mt-28">
                <ImageSlot aspectRatio="4:5" />
                <div className="mt-3 text-[14.5px] font-sans flex items-baseline justify-between gap-4">
                  <div className="text-[var(--ink)]">
                    <span className="font-serif text-[17px] mr-2">Sanand Industrial Engineering Campus</span>
                    <span className="text-[var(--muted)]">&bull; Sanand, Gujarat (2024)</span>
                  </div>
                  <Link
                    href="/projects/sanand-industrial-hq"
                    className="link-editorial text-[13.5px] flex-shrink-0"
                  >
                    See project
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 5: VALUES
            Six values as a numbered text list in columns 4-10,
            one sentence each, separated by hairlines. No icons.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-3 mb-6 lg:mb-0">
                <h2 className="text-heading-1 text-[var(--ink)] font-normal">
                  Values
                </h2>
                <p className="text-[14.5px] text-[var(--muted)] font-sans mt-2">
                  Operating principles informing governance across all group boards.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-7 lg:col-start-4 border-t border-[var(--rule)]">
                {groupValues.map((val) => (
                  <div
                    key={val.number}
                    className="py-6 border-b border-[var(--rule)] grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-4 flex items-baseline gap-3">
                      <span className="font-serif text-[15px] text-[var(--muted)] tabular-nums">
                        {val.number}
                      </span>
                      <span className="font-serif text-[20px] text-[var(--ink)] font-normal">
                        {val.name}
                      </span>
                    </div>
                    <div className="sm:col-span-8">
                      <p className="text-[16px] leading-relaxed text-[var(--muted)] font-sans m-0">
                        {val.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 6: WHERE WE WORK
            Plain definition list (Head office, Gujarat, Bengaluru,
            South India) + 4 static facts with figures.
            Not a stats banner, no count-up.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Definition List in Columns 1-6 */}
              <div className="col-span-12 lg:col-span-6 space-y-8">
                <div>
                  <h2 className="text-heading-1 text-[var(--ink)] font-normal">
                    Where we work
                  </h2>
                  <p className="text-[15px] text-[var(--muted)] font-sans mt-2">
                    Primary offices, processing facilities, and regional installation territories.
                  </p>
                </div>

                <dl className="space-y-6 border-t border-[var(--rule)] pt-6 font-sans">
                  <div className="border-b border-[var(--rule)] pb-4">
                    <dt className="text-[16px] font-medium text-[var(--ink)]">
                      Head office in Ahmedabad
                    </dt>
                    <dd className="text-[14.5px] text-[var(--muted)] mt-1 m-0">
                      HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev.
                    </dd>
                  </div>

                  <div className="border-b border-[var(--rule)] pb-4">
                    <dt className="text-[16px] font-medium text-[var(--ink)]">
                      Operations across Gujarat
                    </dt>
                    <dd className="text-[14.5px] text-[var(--muted)] mt-1 m-0">
                      Sanand Industrial Estate (facade manufacturing), Bavla (spice milling), and 13 live real estate developments across Ahmedabad.
                    </dd>
                  </div>

                  <div className="border-b border-[var(--rule)] pb-4">
                    <dt className="text-[16px] font-medium text-[var(--ink)]">
                      Bengaluru
                    </dt>
                    <dd className="text-[14.5px] text-[var(--muted)] mt-1 m-0">
                      Outer Ring Road and Kadubeesanahalli: Flight Stays corporate residences and Amuktamalyada vegetarian dining.
                    </dd>
                  </div>

                  <div className="border-b border-[var(--rule)] pb-4">
                    <dt className="text-[16px] font-medium text-[var(--ink)]">
                      South India through Geotrix
                    </dt>
                    <dd className="text-[14.5px] text-[var(--muted)] mt-1 m-0">
                      Peenya Industrial Area, Bengaluru: commercial facade site erection across Karnataka, Tamil Nadu, and Telangana.
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Four Static Facts in Columns 8-12 */}
              <div className="col-span-12 lg:col-span-5 lg:col-start-8 space-y-6 pt-4 lg:pt-0">
                <span className="text-[13px] font-sans uppercase tracking-wider text-[var(--muted)] block border-b border-[var(--rule)] pb-2">
                  Operating scale
                </span>

                <div className="space-y-6">
                  <div className="border-b border-[var(--rule)] pb-4">
                    <div className="font-serif text-[32px] text-[var(--ink)] font-normal">
                      18 years
                    </div>
                    <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                      Continuous business operations since initial founding in 2008.
                    </div>
                  </div>

                  <div className="border-b border-[var(--rule)] pb-4">
                    <div className="font-serif text-[32px] text-[var(--ink)] font-normal">
                      13 developments
                    </div>
                    <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                      Completed and active residential and commercial projects in Ahmedabad.
                    </div>
                  </div>

                  <div className="border-b border-[var(--rule)] pb-4">
                    <div className="font-serif text-[32px] text-[var(--ink)] font-normal">
                      450,000 sq m
                    </div>
                    <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                      Annual architectural aluminium and facade glass processing capacity.
                    </div>
                  </div>

                  <div className="border-b border-[var(--rule)] pb-4">
                    <div className="font-serif text-[32px] text-[var(--ink)] font-normal">
                      13 brands
                    </div>
                    <div className="text-[14px] text-[var(--muted)] font-sans mt-0.5">
                      Packaged foods, beverages, and household consumer product trade marks.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 7: NEWS
            Heading 'News', three rows (date, headline, business name),
            and link 'All news'.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12">
              <h2 className="text-heading-1 text-[var(--ink)] font-normal">
                News
              </h2>
              <Link href="/news" className="link-editorial text-[15.5px]">
                All news
              </Link>
            </div>

            <div className="border-t border-[var(--rule)]">
              {news.slice(0, 3).map((item) => (
                <article
                  key={item.slug}
                  className="py-6 border-b border-[var(--rule)] grid grid-cols-12 gap-4 md:gap-6 items-baseline group"
                >
                  <div className="col-span-12 sm:col-span-3 text-[14px] text-[var(--muted)] font-sans">
                    {item.date}
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <Link
                      href={`/news/${item.slug}`}
                      className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--orange)]"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="col-span-12 sm:col-span-3 sm:text-right text-[13.5px] text-[var(--muted)] font-sans flex items-center sm:justify-end gap-3">
                    <span>
                      {item.entitySlug === 'school-of-facade-technologies'
                        ? 'School of Facade Technologies'
                        : item.entitySlug === 'geotrix'
                        ? 'Geotrix Pvt. Ltd.'
                        : item.entitySlug === 'hrishikesh-ventures'
                        ? 'Hrishikesh Ventures'
                        : 'Hrishikesh Food Products'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden sm:inline" />
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================
            SECTION 8: CAREERS AND CONTACT
            Two plain text columns separated by a vertical hairline.
            No coloured band.
        ======================================================== */}
        <section className="py-24 md:py-36 border-t border-[var(--rule)]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {/* Column 1: Careers */}
              <div className="space-y-6 pr-0 md:pr-8">
                <h2 className="text-heading-1 text-[var(--ink)] font-normal">
                  Careers
                </h2>
                <p className="text-[17px] leading-relaxed text-[var(--muted)] font-sans max-w-[54ch] m-0">
                  We hire facade design engineers, site installation supervisors, manufacturing technicians,
                  and hospitality specialists across Ahmedabad and Bengaluru. Open positions offer direct technical
                  responsibility within established operating companies.
                </p>
                <div>
                  <Link href="/careers" className="link-editorial text-[16px]">
                    See open roles
                  </Link>
                </div>
              </div>

              {/* Column 2: Contact (Separated by hairline on desktop) */}
              <div className="space-y-6 pt-10 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--rule)] md:pl-12 lg:pl-16">
                <h2 className="text-heading-1 text-[var(--ink)] font-normal">
                  Contact
                </h2>
                <p className="text-[17px] leading-relaxed text-[var(--muted)] font-sans max-w-[54ch] m-0">
                  Our corporate offices on SG Highway handle institutional partnerships, land developments,
                  and trade procurement. General and commercial enquiries are reviewed by the relevant business
                  division within two business days.
                </p>
                <div>
                  <Link href="/contact" className="link-editorial text-[16px]">
                    Send an enquiry
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
