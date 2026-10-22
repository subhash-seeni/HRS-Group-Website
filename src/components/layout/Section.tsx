import React from 'react';

export type SectionSurface = 'white' | 'stone' | 'ink' | 'orange';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  surface?: SectionSurface;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  surface = 'white',
  as: Component = 'section',
  children,
  className = '',
  id,
  ...props
}) => {
  const surfaceClass = `surface-${surface}`;

  return (
    <Component
      id={id}
      data-surface={surface}
      className={`relative w-full ${surfaceClass} transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
