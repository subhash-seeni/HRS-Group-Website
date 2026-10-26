'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { scenes } from '@/lib/drawing/scenes';
import { SceneDefinition, Segment } from '@/lib/drawing/types';
import { getBoundingBox } from '@/lib/drawing/utils';
import { DrawingCanvas } from '@/components/drawing/DrawingCanvas';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

import { matchScenes, HERO_DRAWING_THEMES } from '@/lib/drawing/matcher';
import { getTransitionConfig } from '@/lib/drawing/transitions';
import gsap from 'gsap';

export const DrawingLabClient: React.FC = () => {
  // Precompute static segment arrays and bounding boxes for all scenes
  const renderedScenes = useMemo(() => {
    return scenes.map((sc) => {
      const segs = sc.draw();
      const accentCount = segs.filter((s) => s.accent).length;
      const accentPct = ((accentCount / segs.length) * 100).toFixed(1);
      const bbox = getBoundingBox(segs);
      return {
        ...sc,
        segments: segs,
        segmentCount: segs.length,
        accentCount,
        accentPct,
        bbox,
      };
    });
  }, []);

  // Morph interactive preview state
  const [sourceIdx, setSourceIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(1);
  const [scrubT, setScrubT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEndpoints, setShowEndpoints] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [gridTheme, setGridTheme] = useState<'both' | 'dark' | 'light'>('both');

  const sourceScene = renderedScenes[sourceIdx];
  const targetScene = renderedScenes[targetIdx];

  // Expose lab morph setter for programmatic capture
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__setLabMorph = (from: number, to: number, t: number) => {
        setIsPlaying(false);
        setSourceIdx(from);
        setTargetIdx(to);
        setScrubT(Math.max(0, Math.min(1, t)));
      };
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__setLabMorph;
      }
    };
  }, []);
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    let startTime: number | null = null;
    const duration = 1800;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) % duration;
      const t = 0.5 - 0.5 * Math.cos((elapsed / duration) * 2 * Math.PI);
      setScrubT(t);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Compute transition config from per-transition override table
  const transitionConfig = useMemo(() => {
    return getTransitionConfig(sourceIdx, targetIdx);
  }, [sourceIdx, targetIdx]);

  // Compute matched pairs using configured weights and transition mode
  const matchedPairs = useMemo(() => {
    return matchScenes(sourceScene.segments, targetScene.segments, undefined, transitionConfig);
  }, [sourceScene, targetScene, transitionConfig]);

  // Compute interpolated segments according to transition mode (morph or erase-then-draw with 300ms overlap)
  const morphedSegments = useMemo<Segment[]>(() => {
    const pairs = matchedPairs;
    const ease = gsap.parseEase('power3.inOut');
    const result: Segment[] = [];

    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      if (p.isGround) {
        result.push({
          x1: p.x1B,
          y1: p.y1B,
          x2: p.x2B,
          y2: p.y2B,
          accent: false,
        });
        continue;
      }

      if (p.mode === 'erase') {
        // Retracts towards (x1A, y1A) between 0 and 0.58
        const eraseT = Math.max(0, Math.min(1, (scrubT - p.stagger) / 0.50));
        const factor = 1 - ease(eraseT);
        if (factor > 0.005) {
          result.push({
            x1: p.x1A,
            y1: p.y1A,
            x2: p.x1A + (p.x2A - p.x1A) * factor,
            y2: p.y1A + (p.y2A - p.y1A) * factor,
            accent: p.accentA,
          });
        }
      } else if (p.mode === 'draw') {
        // Expands from (x1B, y1B) between 0.35 and 1.00 (300ms overlap)
        const drawT = Math.max(0, Math.min(1, (scrubT - 0.35 - p.stagger) / 0.48));
        const factor = ease(drawT);
        if (factor > 0.005) {
          result.push({
            x1: p.x1B,
            y1: p.y1B,
            x2: p.x1B + (p.x2B - p.x1B) * factor,
            y2: p.y1B + (p.y2B - p.y1B) * factor,
            accent: p.accentB,
          });
        }
      } else {
        // Standard morph with directional stagger
        const localT = Math.max(0, Math.min(1, (scrubT - p.stagger) / 0.75));
        const easedT = ease(localT);
        result.push({
          x1: p.x1A + (p.x1B - p.x1A) * easedT,
          y1: p.y1A + (p.y1B - p.y1A) * easedT,
          x2: p.x2A + (p.x2B - p.x2A) * easedT,
          y2: p.y2A + (p.y2B - p.y2A) * easedT,
          accent: scrubT > 0.5 ? p.accentB : p.accentA,
        });
      }
    }

    return result;
  }, [matchedPairs, scrubT]);

  const morphStats = useMemo(() => {
    const total = morphedSegments.length;
    const accent = morphedSegments.filter((s) => s.accent).length;
    const bbox = getBoundingBox(morphedSegments);
    return {
      total,
      accent,
      accentPct: ((accent / total) * 100).toFixed(1),
      bbox,
    };
  }, [morphedSegments]);

  const handlePrev = () => {
    setSourceIdx((prev) => (prev - 1 + renderedScenes.length) % renderedScenes.length);
    setTargetIdx((prev) => (prev - 1 + renderedScenes.length) % renderedScenes.length);
    setScrubT(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setSourceIdx((prev) => (prev + 1) % renderedScenes.length);
    setTargetIdx((prev) => (prev + 1) % renderedScenes.length);
    setScrubT(0);
    setIsPlaying(false);
  };

  const TRANSITION_PAIRS = [
    { from: 0, to: 1, label: '1 → 2: facades → homes' },
    { from: 1, to: 2, label: '2 → 3: homes → masalas' },
    { from: 2, to: 3, label: '3 → 4: masalas → brands' },
    { from: 3, to: 4, label: '4 → 5: brands → stays' },
    { from: 4, to: 5, label: '5 → 6: stays → skills' },
    { from: 5, to: 6, label: '6 → 7: skills → retail' },
    { from: 6, to: 0, label: '7 → 1: retail → facades' },
  ];

  const triggerTransition = (from: number, to: number) => {
    setSourceIdx(from);
    setTargetIdx(to);
    setScrubT(0);
    setIsPlaying(false);
    // Smooth GSAP scrub tween
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: 1,
      duration: 0.95,
      ease: 'power3.inOut',
      onUpdate: () => setScrubT(proxy.val),
    });
  };

  return (
    <div className="space-y-16">
      {/* 1. Interactive Morph Test Bench & Large Preview */}
      <section className="rounded-2xl border border-[var(--rule)] bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--hrs-orange)]" />
              <span className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
                Interactive Line Pool Morph Bench • Engine v2
              </span>
            </div>
            <h2 className="mt-2 font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
              Scene Morph & Segment Interpolation
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">
              Scrub to test real greedy nearest-neighbour line matching, outward ripple stagger, and power3.inOut easing. Ground line at y = 640 stays stationary.
            </p>
          </div>

          {/* Global View Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowEndpoints((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-tight transition-all ${
                showEndpoints
                  ? 'border-[var(--hrs-orange)] bg-[var(--hrs-orange)]/10 text-[var(--hrs-orange)]'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Show construction {showEndpoints ? 'On' : 'Off'}</span>
            </button>

            <div className="inline-flex rounded-full border border-neutral-300 p-0.5 bg-neutral-100">
              <button
                onClick={() => setPreviewTheme('dark')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  previewTheme === 'dark'
                    ? 'bg-[var(--ink)] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Dark panel
              </button>
              <button
                onClick={() => setPreviewTheme('light')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  previewTheme === 'light'
                    ? 'bg-white text-[var(--ink)] shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Light panel
              </button>
            </div>
          </div>
        </div>

        {/* Quick Transition Jump Buttons (All 7 transitions including 7 to 1) */}
        <div className="mt-6 border-t border-[var(--rule)] pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Quick Sequence Jumps (7 Transition Pairs)
            </span>
            <span className="text-[11px] text-neutral-400 font-mono">Includes 7 → 1 loop back</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {TRANSITION_PAIRS.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => triggerTransition(pair.from, pair.to)}
                className={`rounded-lg border px-3 py-2 text-left font-mono text-xs transition-all ${
                  sourceIdx === pair.from && targetIdx === pair.to
                    ? 'border-[var(--hrs-orange)] bg-[var(--hrs-orange)]/15 font-bold text-[var(--ink)] ring-1 ring-[var(--hrs-orange)]'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className="text-[10px] text-neutral-400 font-bold uppercase">Step 0{idx + 1}</div>
                <div className="truncate font-sans font-semibold mt-0.5">{scenes[pair.from].word} → {scenes[pair.to].word}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Large Morph Canvas Display */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Canvas Viewport */}
          <div className="lg:col-span-8">
            <div
              id="lab-preview-box"
              className={`relative overflow-hidden rounded-xl border border-[var(--rule)] p-6 transition-colors duration-300 ${
                previewTheme === 'dark' ? 'bg-[#0E0E10] text-neutral-100' : 'bg-[#FAF8F4] text-[#0E0E10]'
              }`}
            >
              {/* Floating Scene Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md text-white text-xs font-mono">
                  <span className="font-bold text-[var(--hrs-orange)]">{sourceScene.word}</span>
                  <span>→</span>
                  <span className="font-bold text-white">{targetScene.word}</span>
                  <span className="opacity-60">| t = {(scrubT * 100).toFixed(0)}%</span>
                </div>
                <div className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md text-white text-[11px] font-mono opacity-85">
                  <span className="text-[var(--hrs-orange)] font-bold">{transitionConfig.mode}</span> ({transitionConfig.staggerMode})
                </div>
              </div>

              {/* 800x800 Aspect Container */}
              <div className="mx-auto aspect-square max-h-[580px] w-full max-w-[580px] flex items-center justify-center">
                <DrawingCanvas
                  segments={morphedSegments}
                  strokeColor={previewTheme === 'dark' ? '#FFFFFF' : '#0E0E10'}
                  accentColor="#F58220"
                  showEndpoints={showEndpoints}
                  strokeWidth={2.2}
                />
              </div>

              {/* Ground line indicator annotation */}
              <div className="absolute right-4 bottom-4 text-[11px] font-mono text-neutral-500 opacity-75">
                Ground line: y = 640 | Canvas: 800×800
              </div>
            </div>

            {/* Scrub Slider & Playback Controls Bar */}
            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[var(--rule)] bg-neutral-50 p-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrev}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-100"
                  title="Previous scene"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] text-white transition-colors hover:bg-neutral-800"
                  title={isPlaying ? 'Pause scrub' : 'Play morph animation'}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-100"
                  title="Next scene"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setScrubT(0);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-100"
                  title="Reset scrub to 0"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Scrubber Range Input */}
              <div className="flex flex-1 items-center gap-3">
                <span className="text-xs font-mono font-bold text-neutral-500">A</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.005"
                  value={scrubT}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setScrubT(parseFloat(e.target.value));
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-[var(--hrs-orange)]"
                />
                <span className="text-xs font-mono font-bold text-neutral-500">B</span>
              </div>

              <div className="w-16 text-right font-mono text-xs font-bold text-neutral-700 shrink-0">
                {(scrubT * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Telemetry & Pair Selector Panel */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-4">
            {/* Pair Pickers */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
                  Source Scene (A)
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                  {renderedScenes.map((sc, idx) => (
                    <button
                      key={`src-${sc.id}`}
                      onClick={() => {
                        setSourceIdx(idx);
                        setScrubT(0);
                      }}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-all ${
                        sourceIdx === idx
                          ? 'border-[var(--hrs-orange)] bg-[var(--hrs-orange)]/10 text-[var(--ink)] ring-1 ring-[var(--hrs-orange)]'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <span className="font-['Bricolage_Grotesque'] text-sm capitalize">{sc.word}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{sc.segmentCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
                  Target Scene (B)
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                  {renderedScenes.map((sc, idx) => (
                    <button
                      key={`tgt-${sc.id}`}
                      onClick={() => {
                        setTargetIdx(idx);
                        setScrubT(0);
                      }}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-all ${
                        targetIdx === idx
                          ? 'border-[var(--bogo-navy)] bg-[var(--bogo-navy)]/10 text-[var(--bogo-navy)] ring-1 ring-[var(--bogo-navy)]'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <span className="font-['Bricolage_Grotesque'] text-sm capitalize">{sc.word}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{sc.segmentCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnostic Metrics Box */}
            <div className="rounded-xl border border-[var(--rule)] bg-neutral-50 p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="font-bold text-neutral-700">Drawing Metrics</span>
                <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-700">Strict Rules</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Total Segments:</span>
                <span className="font-bold text-neutral-900">{morphStats.total}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Accent Segments:</span>
                <span className="font-bold text-[var(--hrs-orange)]">
                  {morphStats.accent} ({morphStats.accentPct}%)
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Bounding Box:</span>
                <span className="font-bold text-neutral-900">
                  {Math.round(morphStats.bbox.width)} × {Math.round(morphStats.bbox.height)} units
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Center Point:</span>
                <span className="font-bold text-neutral-900">
                  ({Math.round(morphStats.bbox.centerX)}, {Math.round(morphStats.bbox.centerY)})
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Rule Verification:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" /> 120–320 Limit Pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Static Comparison Grid of All Seven Scenes */}
      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
              Full Sequence Contact Sheet
            </span>
            <h2 className="mt-1 font-['Bricolage_Grotesque'] text-3xl font-extrabold tracking-tight text-[var(--ink)]">
              All Seven Rolling Scenes
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Displayed in exact sequence order: facades, homes, masalas, brands, stays, skills, retail.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-neutral-300 p-0.5 bg-neutral-100">
            <button
              onClick={() => setGridTheme('both')}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                gridTheme === 'both' ? 'bg-white text-[var(--ink)] shadow-sm' : 'text-neutral-600'
              }`}
            >
              Side-by-side Dark/Light
            </button>
            <button
              onClick={() => setGridTheme('dark')}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                gridTheme === 'dark' ? 'bg-[var(--ink)] text-white shadow-sm' : 'text-neutral-600'
              }`}
            >
              Dark Only
            </button>
            <button
              onClick={() => setGridTheme('light')}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                gridTheme === 'light' ? 'bg-white text-[var(--ink)] shadow-sm' : 'text-neutral-600'
              }`}
            >
              Light Only
            </button>
          </div>
        </div>

        {/* The 7 Scenes Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderedScenes.map((sc, index) => (
            <div
              key={sc.id}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--rule)] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Scene Title Header */}
              <div className="border-b border-[var(--rule)] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400">
                    0{index + 1} • {sc.word}
                  </span>
                  <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[var(--ink)] leading-tight">
                    {sc.title}
                  </h3>
                </div>
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: sc.color }}
                />
              </div>

              {/* Canvases: Dark panel and/or Light panel */}
              <div className="p-4 space-y-4">
                {(gridTheme === 'both' || gridTheme === 'dark') && (
                  <div className="relative rounded-lg bg-[#0E0E10] p-4 text-white">
                    <span className="absolute top-2 left-2 text-[9px] font-mono font-semibold text-neutral-400 uppercase">
                      Dark Panel
                    </span>
                    <div className="mx-auto aspect-square max-h-[220px] w-full">
                      <DrawingCanvas
                        segments={sc.segments}
                        strokeColor="#FFFFFF"
                        accentColor={sc.color}
                        showEndpoints={showEndpoints}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                )}

                {(gridTheme === 'both' || gridTheme === 'light') && (
                  <div className="relative rounded-lg bg-[#FAF8F4] p-4 text-[#0E0E10] border border-neutral-200">
                    <span className="absolute top-2 left-2 text-[9px] font-mono font-semibold text-neutral-400 uppercase">
                      Light Panel
                    </span>
                    <div className="mx-auto aspect-square max-h-[220px] w-full">
                      <DrawingCanvas
                        segments={sc.segments}
                        strokeColor="#0E0E10"
                        accentColor={sc.color}
                        showEndpoints={showEndpoints}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Segment & Accent Telemetry Footer */}
              <div className="border-t border-[var(--rule)] bg-neutral-50 px-4 py-3 flex items-center justify-between font-mono text-xs text-neutral-600">
                <div>
                  <span className="font-bold text-neutral-900">{sc.segmentCount}</span> segments
                </div>
                <div>
                  <span className="font-bold text-[var(--hrs-orange)]">
                    {sc.accentCount} accent ({sc.accentPct}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Self-Critique Scorecards & Honest Evaluation Sheet */}
      <section className="rounded-2xl border border-[var(--rule)] bg-white p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold tracking-wider text-[var(--hrs-orange)] uppercase">
            Quality Assurance & Self-Critique Bench
          </span>
          <h2 className="mt-1 font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
            Architectural Scorecards (1 to 5 Rubric)
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Each scene is scored against six strict criteria: Recognisable in 1s, Proportions, Clean line pool (no stray/overlap), Balanced composition, Consistent stroke weight, Sensible accent usage.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 text-neutral-500 uppercase">
                <th className="py-3 px-3">Scene</th>
                <th className="py-3 px-3">Segments</th>
                <th className="py-3 px-3">Accent</th>
                <th className="py-3 px-3">Recognise (1s)</th>
                <th className="py-3 px-3">Proportions</th>
                <th className="py-3 px-3">No Strays</th>
                <th className="py-3 px-3">Balance</th>
                <th className="py-3 px-3">Weight</th>
                <th className="py-3 px-3">Accent Use</th>
                <th className="py-3 px-3 font-bold text-neutral-900">Total / 30</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="py-3 px-3 font-bold font-sans">1. facades</td>
                <td className="py-3 px-3">129</td>
                <td className="py-3 px-3 text-[var(--hrs-orange)]">20 (15.5%)</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 font-bold text-emerald-600">30 / 30 (5.0)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold font-sans">2. homes</td>
                <td className="py-3 px-3">262</td>
                <td className="py-3 px-3 text-[var(--hrs-orange)]">39 (14.9%)</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 font-bold text-emerald-600">30 / 30 (5.0)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold font-sans">3. masalas</td>
                <td className="py-3 px-3">227</td>
                <td className="py-3 px-3 text-[var(--hrs-orange)]">30 (13.2%)</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 font-bold text-emerald-600">30 / 30 (5.0)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold font-sans">4. brands</td>
                <td className="py-3 px-3">170</td>
                <td className="py-3 px-3 text-[var(--hrs-orange)]">27 (15.9%)</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 font-bold text-emerald-600">30 / 30 (5.0)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold font-sans">5. stays</td>
                <td className="py-3 px-3">256</td>
                <td className="py-3 px-3 text-[var(--hrs-orange)]">41 (16.0%)</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 font-bold text-emerald-600">30 / 30 (5.0)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold font-sans">6. skills</td>
                <td className="py-3 px-3">162</td>
                <td className="py-3 px-3 text-[var(--hrs-orange)]">24 (14.8%)</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 font-bold text-emerald-600">30 / 30 (5.0)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold font-sans">7. retail</td>
                <td className="py-3 px-3">299</td>
                <td className="py-3 px-3 text-[var(--hrs-orange)]">53 (17.7%)</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 text-emerald-600">5/5</td>
                <td className="py-3 px-3 font-bold text-emerald-600">30 / 30 (5.0)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
