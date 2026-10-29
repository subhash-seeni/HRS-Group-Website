import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowRight, Building2, ShieldCheck } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { contactDetails } from '@/content/contact';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact us · HRS Group',
  description:
    'Contact HRS Group corporate headquarters in Bodakdev, Ahmedabad, southern regional office in Bengaluru, or submit a commercial enquiry.',
  openGraph: {
    title: 'Contact us · HRS Group',
    description:
      'Direct enquiry channel to HRS Group businesses across facade engineering, property developments, food processing, hospitality, and brand services.',
    url: 'https://hrsgroup.in/contact',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ContactPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactDetails.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="relative min-h-screen">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'Contact us' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--hrs-orange)]/30 bg-[var(--hrs-orange)]/10 text-xs font-semibold text-[var(--ink)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--hrs-orange)]" />
              Corporate Communications & Commercial Desks
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Contact HRS Group
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              {contactDetails.curiosityHook}
            </p>

            {/* Direct Channels Quick Bar */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-200 shrink-0 text-[var(--hrs-orange)]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500 font-medium">Main telephone</div>
                  <a href={`tel:${contactDetails.headquarters.phone}`} className="hover:text-[var(--ink)] font-semibold text-neutral-800">
                    {contactDetails.headquarters.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-200 shrink-0 text-[var(--hrs-orange)]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500 font-medium">General desk</div>
                  <a href={`mailto:${contactDetails.headquarters.email}`} className="hover:text-[var(--ink)] font-semibold text-neutral-800">
                    {contactDetails.headquarters.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-200 shrink-0 text-[var(--hrs-orange)]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500 font-medium">Operating hours</div>
                  <span className="font-semibold text-neutral-800">{contactDetails.headquarters.officeHours}</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Physical Facilities & Campuses: Surface White */}
        <Section surface="white">
          <div className="mb-12 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Physical Presence & Infrastructure
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Offices and manufacturing campuses
            </h2>
            <p className="mt-3 text-base text-neutral-600 max-w-2xl">
              Operating centres across Ahmedabad, Bengaluru, Sanand, and Bavla with integrated engineering, milling, and commercial offices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactDetails.facilities.map((fac) => (
              <div
                key={fac.name}
                className="group border border-[var(--ink)]/15 bg-[var(--paper)] overflow-hidden transition-all duration-300 hover:border-[var(--ink)]"
              >
                {fac.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200 border-b border-[var(--ink)]/10">
                    <Image
                      src={fac.image}
                      alt={fac.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 bg-[var(--ink)]/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold rounded-full">
                      {fac.city}
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-1">
                      {fac.label}
                    </span>
                    <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] tracking-tight">
                      {fac.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed m-0 flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-neutral-400 mt-0.5" />
                    <span>{fac.address}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 border-t border-[var(--ink)]/10 text-xs font-medium text-neutral-700">
                    {fac.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-[var(--hrs-orange)]" />
                        <a href={`tel:${fac.phone}`} className="hover:text-[var(--ink)] font-semibold">
                          {fac.phone}
                        </a>
                      </div>
                    )}
                    {fac.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-[var(--hrs-orange)]" />
                        <a href={`mailto:${fac.email}`} className="hover:text-[var(--ink)] hover:underline font-semibold">
                          {fac.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 3. Enquiry Portal & Business Direct Desks: Surface Paper */}
        <Section surface="paper" id="enquiry">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left Column: Direct Desks & Operational Commitments */}
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                  Operating Division Routing
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                  Direct commercial desks
                </h2>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Every enquiry is routed directly to the designated business unit desk for technical review and commercial quotation.
                </p>
              </div>

              <div className="space-y-4 border-t border-[var(--ink)]/15 pt-6">
                {contactDetails.departments.map((dept) => (
                  <div key={dept.entitySlug} className="border-b border-[var(--ink)]/10 pb-4 last:border-0">
                    <span className="text-xs font-semibold text-[var(--ink)] block mb-0.5">
                      {dept.label}
                    </span>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-xs font-medium text-[var(--hrs-orange)] hover:underline"
                    >
                      {dept.email}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border border-[var(--ink)]/15 bg-white p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--hrs-orange)]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Commercial Response SLA</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed m-0">
                  Enquiries submitted through this corporate portal are reviewed directly by the designated operating company desk. Confirmed commercial acknowledgment is provided within one working day.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Submission Form */}
            <div className="col-span-12 lg:col-span-7 border border-[var(--ink)]/15 bg-white p-6 sm:p-10 shadow-sm sticky top-28">
              <div className="mb-6 border-b border-[var(--ink)]/10 pb-4">
                <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-1">
                  Commercial Enquiry Channel
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)] m-0">
                  Submit operational enquiry
                </h2>
                <p className="text-xs text-neutral-600 mt-1 mb-0">
                  Provide project requirements, architectural drawings, or product volume scope.
                </p>
              </div>

              <Suspense
                fallback={
                  <div className="py-12 text-center text-xs text-neutral-500">
                    Loading commercial enquiry form...
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Section>

        {/* 4. Frequently Asked Questions: Surface White */}
        <Section surface="white">
          <div className="mb-10 border-b border-[var(--ink)]/15 pb-6">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
              Commercial Operations
            </span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Frequently asked questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactDetails.faqs.map((faq, idx) => (
              <div key={idx} className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 space-y-3">
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed m-0">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Bottom Careers Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[var(--ink)] block mb-2">
                Employment Enquiries
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
                Looking for technical or corporate careers?
              </h2>
              <p className="mt-3 text-base text-[var(--ink)]/85">
                We review applications for facade engineers, chemical technicians, retail operators, and project supervisors.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Button href="/careers" variant="primary">
                View careers board
              </Button>
              <Button href="/businesses" variant="outline">
                Operating companies
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
