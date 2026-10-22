'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motionTokens } from '@/lib/motion';

export interface FillButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function FillButton({
  children,
  href,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  target,
  rel,
  ariaLabel,
}: FillButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const fillStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'var(--orange)',
    transform: isHovered && !disabled ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: motionTokens.easings.cssEaseOut,
    pointerEvents: 'none',
    zIndex: 1,
  };

  const labelStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    color: isHovered && !disabled ? 'var(--ink)' : 'var(--white)',
    transitionProperty: 'color',
    transitionDuration: '300ms',
    transitionTimingFunction: motionTokens.easings.cssEaseOut,
  };

  const baseClasses = `relative inline-flex items-center justify-center px-6 py-3.5 bg-[var(--ink)] text-[var(--white)] font-medium text-[15px] tracking-wide overflow-hidden transition-shadow select-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  const inner = (
    <>
      <span aria-hidden="true" style={fillStyle} />
      <span style={labelStyle}>{children}</span>
    </>
  );

  if (href && !disabled) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={baseClasses}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={baseClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
