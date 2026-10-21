import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SkipLink } from './SkipLink';

export interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--white)] text-[var(--ink)] antialiased">
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-[80px] outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
};
