'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Parallax } from '@/components/motion/Parallax';
import { resolveImage } from '@/content/images';
import { getAssetPath } from '@/lib/assets';

export const SelectedWorkParallax: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const img1 = resolveImage(
    '/images/hrishikesh-ventures/h2-residential.webp',
    'H2 Residential Development'
  );
  const img2 = resolveImage(
    '/images/hrs-aluglaze/sanand-campus.webp',
    'Sanand Industrial Engineering Campus'
  );

  return (
    <Section surface="ink" className="py-24 md:py-36 border-t border-[var(--rule)]">
      <Container>
        {/* Section Heading: Warm white, one word orange */}
        <div className="mb-14 md:mb-20">
          <SplitHeading
            as="h2"
            className="text-heading-1 text-[#F5F2EC] font-normal"
            text="Selected <em>work</em>"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Image 1: 3:2 aspect ratio in columns 1-7 with parallax speed 1 */}
          <div className="col-span-1 lg:col-span-7">
            <Parallax offset={35}>
              <div
                onMouseEnter={() => setHoveredProject('h2')}
                onMouseLeave={() => setHoveredProject(null)}
                className="group block"
              >
                <ImageReveal delay={150}>
                  <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#1E1E1E] rounded-[2px]">
                    <Image
                      src={img1?.src || getAssetPath('/images/hrishikesh-ventures/h2-residential.webp')}
                      alt="H2 Residential Development in Shela, Ahmedabad"
                      fill
                      sizes="(max-width: 1024px) 100vw, 720px"
                      className="object-cover transition-transform duration-800 ease-out"
                      style={{
                        transform:
                          hoveredProject === 'h2' ? 'scale(1.03)' : 'scale(1)',
                        transitionDuration: '800ms',
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </div>
                </ImageReveal>

                {/* Caption with appearing arrow on hover */}
                <div className="mt-4 text-[14.5px] font-sans flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <span className="font-serif text-[17.5px] text-[#F5F2EC] mr-2">
                      H2 Residential Development
                    </span>
                    <span className="text-[rgba(245,242,236,0.78)]">
                      &bull; Shela, Ahmedabad (2024)
                    </span>
                  </div>

                  <Link
                    href="/projects/h2"
                    className="text-[13.5px] text-[#F5F2EC] hover:text-[var(--orange)] transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>See project</span>
                    <span
                      style={{
                        opacity: hoveredProject === 'h2' ? 1 : 0,
                        transform:
                          hoveredProject === 'h2'
                            ? 'translateX(0)'
                            : 'translateX(-4px)',
                        transition:
                          'opacity 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className="text-[var(--orange)]"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                    </span>
                  </Link>
                </div>
              </div>
            </Parallax>
          </div>

          {/* Image 2: 4:5 aspect ratio in columns 9-12 with different parallax speed starting lower */}
          <div className="col-span-1 lg:col-span-4 lg:col-start-9 mt-8 lg:mt-28">
            <Parallax offset={65} reverse>
              <div
                onMouseEnter={() => setHoveredProject('sanand')}
                onMouseLeave={() => setHoveredProject(null)}
                className="group block"
              >
                <ImageReveal delay={300}>
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1E1E1E] rounded-[2px]">
                    <Image
                      src={img2?.src || getAssetPath('/images/hrs-aluglaze/sanand-campus.webp')}
                      alt="Sanand Industrial Engineering Campus in Sanand, Gujarat"
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover transition-transform duration-800 ease-out"
                      style={{
                        transform:
                          hoveredProject === 'sanand' ? 'scale(1.03)' : 'scale(1)',
                        transitionDuration: '800ms',
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </div>
                </ImageReveal>

                {/* Caption with appearing arrow on hover */}
                <div className="mt-4 text-[14.5px] font-sans flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <span className="font-serif text-[17.5px] text-[#F5F2EC] mr-2">
                      Sanand Industrial Campus
                    </span>
                    <span className="text-[rgba(245,242,236,0.78)]">
                      &bull; Sanand, Gujarat (2024)
                    </span>
                  </div>

                  <Link
                    href="/projects/sanand-industrial-hq"
                    className="text-[13.5px] text-[#F5F2EC] hover:text-[var(--orange)] transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>See project</span>
                    <span
                      style={{
                        opacity: hoveredProject === 'sanand' ? 1 : 0,
                        transform:
                          hoveredProject === 'sanand'
                            ? 'translateX(0)'
                            : 'translateX(-4px)',
                        transition:
                          'opacity 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className="text-[var(--orange)]"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                    </span>
                  </Link>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </Container>
    </Section>
  );
};
