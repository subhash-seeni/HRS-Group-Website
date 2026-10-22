import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, InteractiveBackground } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion';
import { jobOpenings, employeeQuotes, valuesInAction, groupBenefits } from '@/content/jobs';
import { heroContent } from '@/content/heroContent';
import { CareersClient } from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Engineering, manufacturing, culinary, and creative career opportunities across HRS Group companies in Gujarat and Karnataka.',
  openGraph: {
    title: 'Careers | HRS Group',
    description:
      'Join our teams in facade engineering, food processing, real estate development, hospitality, and brand communications.',
    url: 'https://hrsgroup.in/careers',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | HRS Group',
    description:
      'Join our teams in facade engineering, food processing, real estate development, hospitality, and brand communications.',
  },
};

export default function CareersPage() {
  return (
    <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
      {/* 1. Opening Section */}
      <Section surface="white" className="relative pt-[16vh] md:pt-[20vh] pb-16 md:pb-24 border-b border-[var(--rule)] overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="col-span-1 lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5 text-[14.5px] text-[var(--muted)] font-sans">
                <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                <span>{heroContent.careers.markerLabel}</span>
              </div>
              <SplitHeading
                as="h1"
                className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0"
                text={heroContent.careers.headline}
              />
              <p className="text-[20px] md:text-[23px] leading-[1.5] text-[var(--muted)] font-sans max-w-[58ch] m-0">
                {heroContent.careers.curiosityHook}
              </p>
            </div>
          </div>

          {/* Employee Quotes: Plain text with name and role */}
          <div className="pt-8 border-t border-[var(--rule)]">
            <span className="text-[13px] text-[var(--muted)] block mb-6">
              Perspectives from our teams
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {employeeQuotes.map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <p className="text-[15px] leading-[1.65] text-[var(--ink)] italic m-0 font-serif">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div>
                    <span className="text-[14px] font-medium text-[var(--ink)] block">
                      {item.author}
                    </span>
                    <span className="text-[13px] text-[var(--muted)] block">
                      {item.role} · {item.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Working Here: Six Values in Action & Group Benefits */}
      <Section surface="stone" className="py-20 md:py-28 border-b border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            {/* Left: Values in Action */}
            <div className="col-span-1 lg:col-span-7 space-y-8">
              <div>
                <span className="text-[13px] text-[var(--muted)] block mb-2">
                  Operating ethos
                </span>
                <SplitHeading
                  as="h2"
                  className="text-heading-1 font-serif font-normal text-[var(--ink)] m-0"
                  text="Our values through daily work"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {valuesInAction.map((val) => (
                  <div key={val.value} className="space-y-1.5">
                    <h3 className="text-[16px] font-medium text-[var(--ink)] m-0">
                      {val.value}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-[var(--muted)] m-0">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Benefits as a Plain List */}
            <div className="col-span-1 lg:col-span-5 space-y-6 lg:border-l border-[var(--rule)] lg:pl-10">
              <div>
                <span className="text-[13px] text-[var(--muted)] block mb-2">
                  Group provisions
                </span>
                <SplitHeading
                  as="h2"
                  className="text-heading-1 font-serif font-normal text-[var(--ink)] m-0"
                  text="Employment benefits"
                />
              </div>

              <ul className="space-y-3.5 list-none p-0 m-0 text-[14px] leading-[1.6] text-[var(--ink)]">
                {groupBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[var(--orange)] rounded-full mt-2 shrink-0" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Open Roles with Filters & Search */}
      <Section surface="white" className="py-20 md:py-32">
        <Container>
          <div className="mb-12">
            <span className="text-[13px] text-[var(--muted)] block mb-2">
              Opportunities
            </span>
            <SplitHeading
              as="h2"
              className="text-heading-1 font-serif font-normal text-[var(--ink)] m-0"
              text="Current open positions"
            />
          </div>

          <CareersClient jobs={jobOpenings} />

          {/* 4. Spontaneous Application Block (Single deliberate orange block on page) */}
          <div className="mt-20 p-8 md:p-12 bg-[var(--orange)] text-[var(--ink)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="col-span-1 md:col-span-8 space-y-3">
                <h3 className="text-[22px] md:text-[26px] font-serif font-normal text-[var(--ink)] m-0">
                  Don&apos;t see your discipline listed?
                </h3>
                <p className="text-[15px] leading-[1.65] text-[var(--ink)]/80 max-w-[56ch] m-0">
                  We frequently recruit experienced facade estimators, CNC operators, spice procurement managers, and food chemists as our facility capacities expand. Send a spontaneous profile directly to our recruitment secretariat.
                </p>
              </div>
              <div className="col-span-1 md:col-span-4 text-left md:text-right">
                <Link
                  href="/contact?entity=general"
                  className="inline-flex items-center justify-center h-12 px-6 bg-[var(--ink)] text-[var(--white)] text-[14px] font-medium hover:bg-[var(--ink-deep)] transition-colors rounded-[2px]"
                >
                  Send spontaneous profile
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
