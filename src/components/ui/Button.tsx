import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'orange' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  arrow?: 'right' | 'up-right' | 'none';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--ink)] text-[var(--white)] hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-[var(--hrs-orange)]',
  secondary:
    'bg-[var(--white)] text-[var(--ink)] border border-[var(--rule)] hover:bg-neutral-50',
  orange:
    'bg-[var(--hrs-orange)] text-[var(--ink)] hover:brightness-105 font-bold',
  outline:
    'bg-transparent text-current border border-current hover:bg-current/10',
  ghost:
    'bg-transparent text-current hover:bg-current/5',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      href,
      external = false,
      arrow = 'right',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = `group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none cursor-pointer select-none ${variantStyles[variant]} ${className}`;

    const ArrowIcon = arrow === 'up-right' ? ArrowUpRight : ArrowRight;

    const content = (
      <>
        <span>{children}</span>
        {arrow !== 'none' && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-current/15 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon className="h-3.5 w-3.5 text-current" strokeWidth={2.5} />
          </span>
        )}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
