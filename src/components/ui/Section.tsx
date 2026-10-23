import React from 'react';

export type SurfaceType = 'ink' | 'paper' | 'white' | 'orange' | 'bogo-navy';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  surface?: SurfaceType;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  noContainer?: boolean;
}

const surfaceClasses: Record<SurfaceType, string> = {
  ink: 'surface-ink bg-[var(--ink)] text-[var(--white)]',
  paper: 'surface-paper bg-[var(--paper)] text-[var(--ink)]',
  white: 'surface-white bg-[var(--white)] text-[var(--ink)]',
  orange: 'surface-orange bg-[var(--hrs-orange)] text-[var(--ink)]',
  'bogo-navy': 'surface-bogo-navy bg-[var(--bogo-navy)] text-[var(--white)]',
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      surface = 'paper',
      children,
      className = '',
      innerClassName = '',
      noContainer = false,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={`relative w-full overflow-hidden transition-colors duration-300 ${surfaceClasses[surface]} ${className}`}
        {...props}
      >
        {noContainer ? (
          children
        ) : (
          <div
            className={`mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 md:py-24 ${innerClassName}`}
          >
            {children}
          </div>
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
