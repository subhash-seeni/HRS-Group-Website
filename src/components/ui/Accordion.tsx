'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`border-t border-[var(--rule)] ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="border-b border-[var(--rule)]">
            <h3>
              <button
                type="button"
                id={`accordion-trigger-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between py-5 md:py-6 text-left bg-transparent border-0 cursor-pointer text-[var(--ink)] transition-colors duration-150 hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
              >
                <span className="font-serif text-[19px] md:text-[21px] font-normal tracking-tight pr-4">
                  {item.title}
                </span>
                <span className="text-[var(--ink)] flex-shrink-0 transition-transform duration-150">
                  {isOpen ? (
                    <Minus className="w-4 h-4 stroke-[1.5]" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[1.5]" />
                  )}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div
                id={`accordion-panel-${item.id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${item.id}`}
                className="pb-6 pt-1 text-[16px] leading-relaxed text-[var(--muted)] font-sans max-w-[62ch]"
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
