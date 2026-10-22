import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  noPadding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  noPadding = false,
}) => {
  return (
    <Component
      className={`max-w-[1280px] mx-auto w-full ${
        noPadding ? '' : 'px-4 sm:px-8 md:px-12'
      } ${className}`}
    >
      {children}
    </Component>
  );
};
