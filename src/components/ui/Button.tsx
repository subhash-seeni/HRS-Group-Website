import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'default' | 'small' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      href,
      external = false,
      children,
      className = '',
      disabled,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    // Base styles: square corners (0px/2px max), transition 150ms, font-sans
    const baseStyles =
      'inline-flex items-center justify-center font-sans text-left transition-colors duration-150 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer';

    // Variant styles strictly adhering to brief:
    // primary: solid ink, white text; on hover turns orange with ink text
    // secondary: text-link secondary with a hairline underline that turns orange on hover
    // outline: subtle 1px rule border, turns ink on hover
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-[var(--ink)] text-[var(--white)] border border-[var(--ink)] hover:bg-[var(--orange)] hover:text-[var(--ink)] hover:border-[var(--orange)] active:bg-[var(--orange)] active:text-[var(--ink)]',
      secondary:
        'bg-transparent text-[var(--ink)] border-0 border-b border-[var(--rule)] hover:border-[var(--orange)] hover:border-b-2 active:border-[var(--orange)] p-0 rounded-none',
      outline:
        'bg-transparent text-[var(--ink)] border border-[var(--rule)] hover:border-[var(--ink)] active:bg-[var(--paper)]',
    };

    // Sizing styles
    const sizeStyles: Record<ButtonVariant, Record<ButtonSize, string>> = {
      primary: {
        small: 'text-[14px] px-4 py-2',
        default: 'text-[16px] px-6 py-3',
        large: 'text-[17.5px] px-8 py-3.5',
      },
      secondary: {
        small: 'text-[14px] pb-0.5',
        default: 'text-[16px] pb-1',
        large: 'text-[17.5px] pb-1',
      },
      outline: {
        small: 'text-[14px] px-4 py-2',
        default: 'text-[16px] px-6 py-3',
        large: 'text-[17.5px] px-8 py-3.5',
      },
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[variant][size]} ${className}`;

    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
            {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
