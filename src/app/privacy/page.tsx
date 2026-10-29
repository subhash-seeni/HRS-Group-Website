import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, FileText, Mail, Building, CheckCircle2 } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy policy · HRS Group',
  description:
    'Data protection and privacy guidelines governing inquiries, commercial specifications, and web portal usage across HRS Group operating entities.',
  openGraph: {
    title: 'Privacy policy · HRS Group',
    description:
      'Data protection and privacy guidelines governing inquiries, commercial specifications, and web portal usage across HRS Group operating entities.',
    url: 'https://hrsgroup.in/privacy',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

const DATA_MATRIX = [
  {
    category: 'Commercial Inquiries & Contact Details',
    data: 'Full name, corporate email address, contact telephone, company designation, and project location.',
    purpose: 'Assessing technical scope, issuing commercial quotations, and scheduling site consultations.',
    retention: 'Maintained for the duration of the commercial relationship plus statutory retention periods.',
    access: 'Authorized project managers and estimators at designated operating entities.',
  },
  {
    category: 'Architectural Drawings & Technical Tenders',
    data: 'CAD specifications, structural calculations, facade elevations, bill of quantities (BOQs).',
    purpose: 'Fabrication feasibility analysis, wind load engineering review, and cost estimation.',
    retention: 'Secured within project engineering archives under non-disclosure governance.',
    access: 'Engineering teams at HRS Aluglaze, Geotrix, or Hrishikesh Ventures.',
  },
  {
    category: 'Employment & Career Applications',
    data: 'Curriculum vitae, academic credentials, professional portfolio, past project history.',
    purpose: 'Evaluation of candidacy for active technical and corporate positions.',
    retention: 'Retained for 12 months for prospective vacancies before secure deletion.',
    access: 'Human resources personnel and interviewing technical directors.',
  },
  {
    category: 'Website Analytics & Session Cookies',
    data: 'Aggregated page view metrics, device viewport dimensions, and navigation preferences.',
    purpose: 'Maintaining smooth scrolling performance and evaluating portal readability.',
    retention: 'Session duration or temporary aggregated logs without personal tracking pixels.',
    access: 'Web infrastructure administrators only.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen font-sans">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'Privacy policy' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--ink)]/15 bg-white text-xs font-semibold text-[var(--ink)] mb-4">
              <Shield className="h-3.5 w-3.5 text-[var(--hrs-orange)]" />
              Corporate Data Protection Standards
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Privacy policy
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              This policy explains how HRS Group and its operating subsidiaries collect, protect, and handle commercial records, architectural submissions, and correspondence submitted through this web portal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div>
                <span className="text-neutral-500 font-medium">Effective date:</span>{' '}
                <span className="font-bold text-[var(--ink)] tabular-nums">October 2026</span>
              </div>
              <span>·</span>
              <div>
                <span className="text-neutral-500 font-medium">Governance office:</span>{' '}
                <span className="font-bold text-[var(--ink)]">Legal Desk, Ahmedabad</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Structured Data Governance Matrix: Surface White */}
        <Section surface="white">
          <div className="space-y-12">
            <div>
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-2">
                Information Processing Matrix
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                How we manage your data
              </h2>
              <p className="mt-3 text-base text-neutral-600 max-w-2xl">
                We do not sell, license, or monetize corporate or personal records. Data submitted is used strictly to fulfill commercial and technical commitments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {DATA_MATRIX.map((item) => (
                <div
                  key={item.category}
                  className="border border-[var(--ink)]/15 bg-[var(--paper)] p-6 sm:p-8 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[var(--ink)]">
                      {item.category}
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      <span className="font-semibold text-neutral-900 block mb-1">Data collected:</span>
                      {item.data}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      <span className="font-semibold text-neutral-900 block mb-1">Operational purpose:</span>
                      {item.purpose}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--ink)]/10 space-y-2 text-xs text-neutral-600">
                    <div>
                      <span className="font-medium text-neutral-800">Retention:</span> {item.retention}
                    </div>
                    <div>
                      <span className="font-medium text-neutral-800">Access:</span> {item.access}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Commitments Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[var(--ink)]/15">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--hrs-orange)]" />
                  <span>No behavioral tracking</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  We do not install marketing cookies, retargeting pixels, or third-party behavioral profiling scripts.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--hrs-orange)]" />
                  <span>Encrypted technical archives</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  Architectural drawings and tender submissions are safeguarded with strict internal access controls.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--hrs-orange)]" />
                  <span>Direct statutory compliance</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  Our data policies comply with the Digital Personal Data Protection Act and applicable Indian commercial regulations.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Governance Officer & Inquiries: Surface Paper */}
        <Section surface="paper">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                Statutory Governance Desk
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                Have questions regarding records governance?
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed m-0">
                To request data verification, update commercial registration details, or submit statutory governance notices, contact our corporate legal secretariat.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5 border border-[var(--ink)]/15 bg-white p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                <Building className="h-4 w-4 text-[var(--hrs-orange)]" />
                <span>HRS Group Corporate Secretariat</span>
              </div>
              <p className="text-xs text-neutral-800 leading-relaxed m-0">
                HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev, Ahmedabad 380054, Gujarat, India.
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-xs">
                <Mail className="h-3.5 w-3.5 text-[var(--hrs-orange)]" />
                <a href="mailto:info@hrsgroup.in" className="font-bold text-[var(--ink)] hover:text-[var(--hrs-orange)] transition-colors">
                  info@hrsgroup.in
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Bottom Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Corporate Governance
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Review website terms of use
              </h2>
            </div>

            <div className="shrink-0 flex gap-4">
              <Button href="/terms" variant="primary">
                View terms of use
              </Button>
              <Button href="/contact" variant="outline">
                Contact desk
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
