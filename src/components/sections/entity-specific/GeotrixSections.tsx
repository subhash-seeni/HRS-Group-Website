import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';

interface GeotrixSectionsProps {
  data: {
    aluglazeArmNote: string;
    regionalNodes: { city: string; area: string; focus: string; activeProjects: string }[];
    linkedSystems: { name: string; description: string }[];
  };
}

export const GeotrixSections: React.FC<GeotrixSectionsProps> = ({ data }) => {
  return (
    <div className="space-y-24 md:space-y-36">
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

      {/* 2. South India Reach Map (Typographic regional operating nodes) */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start mb-12">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                South India reach
              </h2>
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

      {/* 3. Linked Product Systems with Aluglaze */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <Container>
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-serif text-[22px] md:text-[24px] text-[var(--ink)] font-normal m-0">
                Installed systems
              </h2>
              <p className="text-[13.5px] text-[var(--muted)] font-sans mt-1.5 m-0 max-w-[26ch]">
                Assemblies engineered at Sanand and site-erected by Geotrix crews.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9 border-t border-[var(--rule)]">
              {data.linkedSystems.map((item) => (
                <div
                  key={item.name}
                  className="py-6 border-b border-[var(--rule)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 font-sans"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-[19px] text-[var(--ink)] font-normal m-0">
                      {item.name}
                    </h3>
                    <p className="text-[14.5px] text-[var(--muted)] m-0 max-w-[54ch]">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href="/businesses/hrs-aluglaze#showcase"
                    className="link-editorial text-[14px] flex-shrink-0"
                  >
                    System specifications
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
