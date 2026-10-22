import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout';
import { SplitHeading } from '@/components/motion';
import { SystemsHorizontalStrip } from './SystemsHorizontalStrip';

interface GeotrixSectionsProps {
  data: {
    aluglazeArmNote: string;
    regionalNodes: { city: string; area: string; focus: string; activeProjects: string }[];
    linkedSystems: { name: string; description: string }[];
  };
}

export const GeotrixSections: React.FC<GeotrixSectionsProps> = ({ data }) => {
  const geotrixSystems = [
    {
      name: 'Unitised Curtain Wall Systems',
      description: 'Pre-assembled facade modules fabricated at Sanand, erected on high-rise commercial structures across Bengaluru and Hyderabad.',
      specifications: ['Modular unitised construction', 'Integrated thermal breaks', 'Seismic movement joints'],
      imageSrc: '/images/hrs-aluglaze/curtain-wall-detail.webp',
    },
    {
      name: 'Structural Architectural Glazing',
      description: 'Point-fixed spider glazing and semi-unitised curtain walls installed across tech parks on Outer Ring Road and Whitefield.',
      specifications: ['High-performance solar low-E glass', 'Flush silicone structural seals', 'Engineered wind-load resistance'],
      imageSrc: '/images/hrs-aluglaze/sanand-campus.webp',
    },
    {
      name: 'Acoustic Fenestration & Windows',
      description: 'Acoustic-rated aluminium windows engineered to block urban noise corridors in luxury residential towers.',
      specifications: ['Multi-point European hardware', 'Sound transmission class up to STC 42', 'Powder-coated anodised finishes'],
      imageSrc: '/images/geotrix/window-frames-section.webp',
    },
    {
      name: 'Architectural Sliding & Swing Doors',
      description: 'Heavy-duty commercial sliding systems and entrance swing assemblies with automated security access integration.',
      specifications: ['Concealed threshold track profiles', 'Reinforced corner junctions', 'Panic-bar emergency exits'],
      imageSrc: '/images/school-of-facade-technologies/workshop-benches.webp',
    },
  ];

  return (
    <Section surface="white" className="space-y-24 md:space-y-36">
      {/* 1. Aluglaze South India Arm Callout */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="p-8 md:p-12 border border-[var(--rule)] bg-[var(--paper)] grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-3 font-sans">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-[var(--orange)] inline-block" />
                <h3 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                  HRS Aluglaze South India Division
                </h3>
              </div>
              <p className="text-[15.5px] leading-relaxed text-[var(--muted)] m-0 max-w-[62ch]">
                {data.aluglazeArmNote}
              </p>
            </div>

            <div className="col-span-12 md:col-span-4 md:text-right">
              <Link
                href="/businesses/hrs-aluglaze"
                className="link-editorial text-[16px] font-sans inline-flex items-center gap-2"
              >
                <span>View Sanand manufacturing specs</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Horizontal Scroll-Pinned Strip for the Four Product Systems */}
      <SystemsHorizontalStrip
        systems={geotrixSystems}
        title="South India installation systems"
        subtitle="Assemblies engineered at Sanand and site-erected by Geotrix crews."
      />

      {/* 3. South India Reach Map (Typographic regional operating nodes) */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start mb-12">
            <div className="col-span-12 md:col-span-3">
              <SplitHeading as="h2" className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0" text="South India reach" />
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Regional execution offices, equipment yards, and active installation corridors.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)] font-sans">
              {data.regionalNodes.map((node) => (
                <div
                  key={node.city}
                  className="py-8 border-b border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline"
                >
                  <div className="md:col-span-4">
                    <span className="font-serif text-[22px] text-[var(--ink)] block">
                      {node.city}
                    </span>
                    <span className="text-[13px] text-[var(--muted)] block mt-0.5">
                      {node.area}
                    </span>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[15px] leading-relaxed text-[var(--muted)] m-0">
                      {node.focus}
                    </p>
                  </div>

                  <div className="md:col-span-3 md:text-right text-[13.5px] text-[var(--ink)] font-medium">
                    {node.activeProjects}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </Section>
  );
};
