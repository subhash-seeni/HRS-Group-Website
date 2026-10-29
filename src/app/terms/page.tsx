import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldAlert, Award, Scale, Check, Mail } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms of use · HRS Group',
  description:
    'Terms and legal conditions governing use of the HRS Group parent corporate website and subsidiary documentation.',
  openGraph: {
    title: 'Terms of use · HRS Group',
    description:
      'Terms and legal conditions governing use of the HRS Group parent corporate website and subsidiary documentation.',
    url: 'https://hrsgroup.in/terms',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

const TERMS_SECTIONS = [
  {
    icon: Award,
    title: '1. Intellectual Property & Registered Wordmarks',
    summary:
      'All brand identities, architectural drawings, technical facade profiles, and photographic media featured across this portal are the intellectual property of HRS Group and respective operating entities.',
    details: [
      'Visual brand identities including HRS Group, HRS Aluglaze, Hrishikesh Ventures, BOGO, and FirstGen are proprietary registered marks.',
      'Shop drawings, facade wind calculation models, and property floor plans may not be reproduced, retransmitted, or scraped without prior written consent.',
      'Permitted use is restricted to preliminary commercial evaluation and direct procurement inquiries.',
    ],
  },
  {
    icon: ShieldAlert,
    title: '2. Engineering & Technical Specifications Disclaimer',
    summary:
      'Preliminary technical metrics, facade U-values, structural tolerances, and property layouts presented on this website are indicative and subject to site-specific verification.',
    details: [
      'Final structural engineering compliance requires certified shop drawings and wind tunnel analysis verified by licensed structural consultants.',
      'Property specifications and floor dimensions for Hrishikesh Ventures developments reflect architectural design stages and are governed by executed builder-buyer agreements.',
      'Food processing and milling capacities stated for the Bavla campus reflect nominal operational parameters subject to raw crop moisture and grain density.',
    ],
  },
  {
    icon: FileText,
    title: '3. Commercial Inquiries & Quotation Governance',
    summary:
      'Submissions via the commercial enquiry channel do not constitute a binding contract until formal tender execution.',
    details: [
      'Quotations issued through division desks remain valid for 30 calendar days from the date of issue unless specified otherwise.',
      'Pricing estimates for aluminum extrusions and structural glass remain subject to raw metal index fluctuations and certified supplier revisions.',
      'HRS Group reserves the right to decline inquiries that conflict with ongoing exclusive regional supplier arrangements.',
    ],
  },
  {
    icon: Scale,
    title: '4. Applicable Law & Judicial Jurisdiction',
    summary:
      'All matters arising from or relating to the use of this website shall be governed by the laws of India.',
    details: [
      'The courts of competent jurisdiction in Ahmedabad, Gujarat, India shall have exclusive authority over any dispute arising from site usage.',
      'If any provision of these terms is deemed unlawful or unenforceable, the remaining terms shall continue in full force and effect.',
      'These conditions were updated in October 2026 and supersede previous online legal disclosures.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen font-sans">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'Terms of use' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--ink)]/15 bg-white text-xs font-semibold text-[var(--ink)] mb-4">
              <FileText className="h-3.5 w-3.5 text-[var(--hrs-orange)]" />
              Corporate Terms of Use
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Terms of use
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              Terms and statutory conditions governing access to the HRS Group parent corporate portal, subsidiary technical documentation, and commercial specifications.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div>
                <span className="text-neutral-500 font-medium">Effective date:</span>{' '}
                <span className="font-bold text-[var(--ink)] tabular-nums">October 2026</span>
              </div>
              <span>·</span>
              <div>
                <span className="text-neutral-500 font-medium">Jurisdiction:</span>{' '}
                <span className="font-bold text-[var(--ink)]">Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Structured Terms Sections: Surface White */}
        <Section surface="white">
          <div className="space-y-12">
            <div>
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Operational Framework
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                General conditions of portal use
              </h2>
              <p className="mt-3 text-base text-neutral-600 max-w-2xl">
                Please review these conditions before reviewing architectural drawings, requesting technical proposals, or entering into commercial engagements.
              </p>
            </div>

            <div className="space-y-8">
              {TERMS_SECTIONS.map((sec) => {
                const IconComponent = sec.icon;
                return (
                  <div
                    key={sec.title}
                    className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 sm:p-8 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-neutral-200 text-[var(--hrs-orange)] shrink-0">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
                        {sec.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed max-w-3xl">
                      {sec.summary}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-[var(--ink)]/10 text-xs sm:text-sm text-neutral-700">
                      {sec.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[var(--hrs-orange)] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* 3. Bottom Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Commercial Enquiries
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Need formal contracts or tenders?
              </h2>
            </div>

            <div className="shrink-0 flex gap-4">
              <Button href="/contact" variant="primary">
                Contact operating desk
              </Button>
              <Button href="/privacy" variant="outline">
                Privacy policy
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
