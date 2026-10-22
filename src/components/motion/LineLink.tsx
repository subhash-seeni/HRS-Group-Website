'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motionTokens } from '@/lib/motion';

export interface LineLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  ariaLabel?: string;
}

export function LineLink({
  children,
  href,
  className = '',
  target,
  rel,
  onClick,
  ariaLabel,
}: LineLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: 'var(--orange)',
    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: isHovered ? 'left center' : 'right center',
    transitionProperty: 'transform',
    transitionDuration: '320ms',
    transitionTimingFunction: motionTokens.easings.cssEaseOut,
    pointerEvents: 'none',
  };

  const commonProps = {
    className: `relative inline-flex items-center text-inherit no-underline group cursor-pointer ${className}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick,
    'aria-label': ariaLabel,
  };

  const innerContent = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" style={lineStyle} />
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a href={href} target={target || '_blank'} rel={rel || 'noopener noreferrer'} {...commonProps}>
          {innerContent}
        </a>
      );
    }
    return (
      <Link href={href} {...commonProps}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {innerContent}
    </button>
  );
}
