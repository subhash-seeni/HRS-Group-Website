import React from 'react';

export interface CaptionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Caption: React.FC<CaptionProps> = ({
  children,
  className = '',
  as: Component = 'p',
}) => {
  return (
    <Component
      className={`text-[13.5px] leading-normal text-[var(--muted)] font-sans m-0 ${className}`}
    >
      {children}
    </Component>
  );
};
