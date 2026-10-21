'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  className = '',
  ariaLabel = 'Navigation tabs',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let targetIndex = -1;
    if (e.key === 'ArrowRight') {
      targetIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== -1) {
      e.preventDefault();
      onChange(tabs[targetIndex].id);
      const tabElements = document.querySelectorAll<HTMLButtonElement>(`[role="tab"]`);
      tabElements[targetIndex]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex flex-wrap items-center gap-6 sm:gap-8 border-b border-[var(--rule)] pb-4 ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`group inline-flex items-center gap-2 text-[15.5px] font-sans transition-colors duration-150 bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-[2px] ${
              isActive ? 'text-[var(--ink)] font-medium' : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            {/* Orange dot for active tab only */}
            {isActive ? (
              <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0" />
            ) : (
              <span className="w-1.5 h-1.5 bg-transparent inline-block flex-shrink-0" />
            )}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' ? (
              <span className="text-[12px] text-[var(--muted)] tabular-nums">
                ({tab.count})
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};
