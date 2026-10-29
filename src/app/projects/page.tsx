import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Section, Button, Breadcrumbs } from '@/components/ui';
import { projects } from '@/content/projects';
import { ProjectsClient } from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Developments & Facade Portfolio · HRS Group',
  description:
    'Commercial towers, high-density residential apartment communities, and precision engineered facade installations across Ahmedabad, Sanand, and Bengaluru.',
  openGraph: {
    title: 'Developments & Facade Portfolio · HRS Group',
    description:
      'Commercial towers, high-density residential apartment communities, and precision engineered facade installations across Ahmedabad, Sanand, and Bengaluru.',
    url: 'https://hrsgroup.in/projects',
    siteName: 'HRS Group',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ProjectsPage() {
  const completedCount = projects.filter((p) =>
    p.yearCompletedOrStatus.toLowerCase().includes('completed')
  ).length;
  const activeCount = projects.length - completedCount;

  return (
    <>
      <Header />

      <main className="relative min-h-screen">
        {/* 1. Hero: Surface Paper */}
        <Section surface="paper" className="pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: 'Projects & developments' }]}
              backLink={{ label: 'Home', href: '/' }}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--ink)]/15 bg-white text-xs font-semibold text-[var(--ink)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--hrs-orange)]" />
              Built Environment Portfolio
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
              Developments and engineering portfolio
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl">
              From high-density residential towers and boutique villa layouts across Ahmedabad to large-scale unitised facade installations in Bengaluru and Sanand.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[var(--ink)]/15 pt-6 text-xs text-neutral-600">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-[var(--ink)] tabular-nums">
                  {projects.length}
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Total developments</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-[var(--ink)] tabular-nums">
                  {completedCount}
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Handed over & live</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-[var(--ink)] tabular-nums">
                  {activeCount}
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Under construction</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Bricolage_Grotesque'] text-[var(--hrs-orange)] tabular-nums">
                  42,500+
                </div>
                <div className="text-neutral-500 font-medium mt-0.5">Sq m facade glazed</div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Portfolio Showcase: Surface White */}
        <Section surface="white">
          <ProjectsClient projects={projects} />
        </Section>

        {/* 3. Technical Standards & Tender Briefing: Surface Ink */}
        <Section surface="ink">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-[var(--hrs-orange)] block">
                Engineering Discipline
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Architectural consultation and commercial tenders
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed m-0 max-w-2xl">
                Every project profile shown represents verified civil structures engineered to Indian and international standards. For CAD drawings, facade wind models, or residential floor plans, contact the designated project desk.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
              <Button href="/contact" variant="orange">
                Submit project enquiry
              </Button>
              <Button href="/businesses/hrs-aluglaze" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Aluglaze systems
              </Button>
            </div>
          </div>
        </Section>

        {/* 4. Bottom Return Prompt: Surface Orange */}
        <Section surface="orange">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block mb-1">
                Parent Enterprise
              </span>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                Explore all five operating sectors
              </h2>
            </div>

            <div className="shrink-0 flex gap-4">
              <Button href="/businesses" variant="primary">
                View businesses directory
              </Button>
              <Button href="/contact" variant="outline">
                Contact corporate HQ
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
