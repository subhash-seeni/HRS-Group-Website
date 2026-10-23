'use client';

import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';

export const MotionLabClient: React.FC = () => {
  const [replayed, setReplayed] = useState(false);

  const handleReplayPageIntro = () => {
    sessionStorage.removeItem('hrs_page_intro_seen');
    setReplayed(true);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <aside aria-label="Motion Lab Tools" className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--rule)] bg-white/95 px-6 py-2.5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
          Motion Lab Status: Active
        </span>
        <span className="hidden text-xs text-neutral-400 md:inline">
          Lenis SmoothScroll & GSAP ScrollTrigger synchronized
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleReplayPageIntro}
          className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 cursor-pointer"
          title="Clears sessionStorage and reloads to trigger 1-second PageIntro reveal"
        >
          {replayed ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Reloading...</span>
            </>
          ) : (
            <>
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Replay PageIntro (1s)</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default MotionLabClient;
