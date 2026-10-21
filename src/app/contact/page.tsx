import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container, InteractiveBackground } from '@/components/ui';
import { ContactForm } from './ContactForm';
import { heroContent } from '@/content/heroContent';

export const metadata: Metadata = {
  title: 'Contact us — HRS Group, Ahmedabad',
  description:
    'Contact HRS Group headquarters in Bodakdev, Ahmedabad, or submit an operational enquiry directly to one of our operating entities.',
  openGraph: {
    title: 'Contact us — HRS Group, Ahmedabad',
    description:
      'Direct enquiry channel to HRS Group businesses across facade engineering, property developments, food processing, hospitality, and brand services.',
    url: 'https://hrsgroup.in/contact',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact us — HRS Group, Ahmedabad',
    description:
      'Direct enquiry channel to HRS Group businesses across facade engineering, property developments, food processing, hospitality, and brand services.',
  },
};

export default function ContactPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is HRS Group headquartered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HRS Group is headquartered at HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev, Ahmedabad 380054, Gujarat, India.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Geotrix coordinate with HRS Aluglaze?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Geotrix is the southern regional operating arm of HRS Aluglaze, providing on-site installation, crane logistics, and regional project management in Bengaluru and Chennai using facade units manufactured at Sanand.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services does Hrishikesh Food Products provide at Bavla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bavla facility provides cryogenic spice milling, contract cleaning, automated pouch packaging, and private label manufacturing for single-origin whole and powdered spices.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are commercial enquiries handled?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enquiries submitted via the corporate portal are routed directly to the designated business unit desk, with confirmed response within one working day.',
        },
      },
    ],
  };

  return (
    <div className="bg-[var(--white)] text-[var(--ink)] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="relative pt-[16vh] md:pt-[20vh] pb-24 md:pb-36 overflow-hidden">
        <InteractiveBackground variant="inner" />
        <Container className="relative z-10">
          {/* Two-Column Grid */}
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left Column: Office Details & Greyscale Map */}
            <div className="col-span-12 lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-[14.5px] text-[var(--muted)] font-sans">
                  <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
                  <span>{heroContent.contact.markerLabel}</span>
                </div>
                <h1 className="text-display-1 text-[var(--ink)] font-normal tracking-tight m-0">
                  {heroContent.contact.headline}
                </h1>
                <p className="text-[18px] md:text-[20px] leading-[1.55] text-[var(--muted)] font-sans m-0">
                  {heroContent.contact.curiosityHook}
                </p>
              </div>

              {/* Head Office Information */}
              <div className="border-t border-[var(--rule)] pt-8 space-y-6">
                <div>
                  <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-1.5">
                    Head office (Ahmedabad)
                  </span>
                  <p className="text-[16px] leading-[1.6] text-[var(--ink)] m-0 font-medium">
                    HRS House, Near Pakwan Cross Roads
                    <br />
                    SG Highway, Bodakdev
                    <br />
                    Ahmedabad 380054, Gujarat, India
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-1">
                      Telephone
                    </span>
                    <a
                      href="tel:+917940008900"
                      className="text-[15px] text-[var(--ink)] hover:text-[var(--orange)] transition-colors"
                    >
                      +91 79 4000 8900
                    </a>
                  </div>

                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-1">
                      Commercial Email
                    </span>
                    <a
                      href="mailto:info@hrsgroup.in"
                      className="text-[15px] text-[var(--ink)] hover:text-[var(--orange)] transition-colors"
                    >
                      info@hrsgroup.in
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-1">
                    Office hours
                  </span>
                  <p className="text-[15px] text-[var(--ink)] m-0">
                    Monday to Saturday, 09:30 to 18:30 IST
                    <br />
                    <span className="text-[13px] text-[var(--muted)]">Closed on Sundays and national holidays</span>
                  </p>
                </div>
              </div>

              {/* Greyscale Map Image Slot */}
              <div className="border border-[var(--rule)] bg-[var(--paper)] p-4 space-y-3">
                <div className="relative w-full aspect-[16/9] bg-[#E8E6E1] flex flex-col items-center justify-center p-6 text-center border border-[var(--rule)]">
                  <div className="w-3 h-3 bg-[var(--ink)] rounded-full mb-2" />
                  <span className="font-serif text-[18px] text-[var(--ink)]">HRS House · Bodakdev</span>
                  <span className="text-[12px] text-[var(--muted)] mt-1">23.0374° N, 72.5126° E · SG Highway</span>
                </div>
                <div className="flex justify-between items-center text-[12px] text-[var(--muted)]">
                  <span>Ahmedabad Head Office Map</span>
                  <span>1 km from Pakwan Junction</span>
                </div>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="col-span-12 lg:col-span-7">
              <div className="bg-[var(--white)] lg:pl-6">
                <div className="mb-6">
                  <h2 className="text-[22px] font-normal text-[var(--ink)] m-0">
                    Commercial enquiry form
                  </h2>
                  <p className="text-[14px] text-[var(--muted)] mt-1 mb-0">
                    Please provide project specifications or inquiry scope.
                  </p>
                </div>

                <Suspense
                  fallback={
                    <div className="p-8 border border-[var(--rule)] text-[var(--muted)] text-[14px]">
                      Loading commercial form...
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>

                {/* Short list of regional offices below the form */}
                <div className="mt-16 pt-8 border-t border-[var(--rule)]">
                  <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] block mb-4">
                    Regional offices & manufacturing facilities
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="text-[14px] font-medium text-[var(--ink)] block">
                        Bengaluru (Southern Regional Office)
                      </span>
                      <p className="text-[13px] text-[var(--muted)] leading-[1.5] mt-1 m-0">
                        Geotrix Facade Hub, Kadubeesanahalli, Outer Ring Road, Bengaluru 560103, Karnataka
                      </p>
                    </div>

                    <div>
                      <span className="text-[14px] font-medium text-[var(--ink)] block">
                        Sanand (Facade Fabrication Works)
                      </span>
                      <p className="text-[13px] text-[var(--muted)] leading-[1.5] mt-1 m-0">
                        HRS Aluglaze Engineering Bay, GIDC Phase II, Sanand Industrial Area, Gujarat 382110
                      </p>
                    </div>

                    <div>
                      <span className="text-[14px] font-medium text-[var(--ink)] block">
                        Bavla (Spice Processing Plant)
                      </span>
                      <p className="text-[13px] text-[var(--muted)] leading-[1.5] mt-1 m-0">
                        Hrishikesh Food Works, National Highway 8A, Bavla Industrial Belt, Gujarat 382220
                      </p>
                    </div>

                    <div>
                      <span className="text-[14px] font-medium text-[var(--ink)] block">
                        Ahmedabad Central Office
                      </span>
                      <p className="text-[13px] text-[var(--muted)] leading-[1.5] mt-1 m-0">
                        Bodakdev SG Highway Corporate Wing, Ahmedabad 380054
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
