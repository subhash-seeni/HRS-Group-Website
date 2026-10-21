import React from 'react';

export interface SectionHeadingProps {
  title: string;
  intro?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  titleClassName?: string;
  introClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  intro,
  as: Component = 'h2',
  className = '',
  titleClassName = '',
  introClassName = '',
}) => {
  // Fluid heading styles mapped by heading tag
  const headingStyles: Record<'h1' | 'h2' | 'h3' | 'h4', string> = {
    h1: 'text-display-2 text-[var(--ink)]',
    h2: 'text-heading-1 text-[var(--ink)]',
    h3: 'text-heading-2 text-[var(--ink)]',
    h4: 'text-heading-3 text-[var(--ink)]',
  };

  return (
    <header className={`space-y-3 ${className}`}>
      <Component className={`${headingStyles[Component]} ${titleClassName}`}>
        {title}
      </Component>
      {intro ? (
        <p className={`text-[17.5px] leading-relaxed text-[var(--muted)] font-sans max-w-[62ch] ${introClassName}`}>
          {intro}
        </p>
      ) : null}
    </header>
  );
};
