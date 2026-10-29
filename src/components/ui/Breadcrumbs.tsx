import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  backLink?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  backLink,
  className = '',
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-500 ${className}`}
    >
      {backLink && (
        <>
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{backLink.label}</span>
          </Link>
          <span className="text-neutral-300" aria-hidden="true">
            /
          </span>
        </>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.href) {
          return (
            <span
              key={item.label}
              className={isLast ? 'text-[var(--hrs-orange)]' : 'text-neutral-500'}
              aria-current={isLast ? 'page' : undefined}
            >
              {item.label}
            </span>
          );
        }

        return (
          <React.Fragment key={item.label}>
            <Link
              href={item.href}
              className="hover:text-[var(--ink)] transition-colors"
            >
              {item.label}
            </Link>
            <span className="text-neutral-300" aria-hidden="true">
              /
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
