'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { scenes } from '@/lib/drawing/scenes';
import { matchScenes, HERO_DRAWING_THEMES, MatchedSegmentPair } from '@/lib/drawing/matcher';
import { getTransitionConfig } from '@/lib/drawing/transitions';
import { Segment } from '@/lib/drawing/types';
import { HERO_ANNOTATIONS } from '@/content/hero';

export interface DrawingStageProps {
  activeIndex: number;
  className?: string;
}

export interface DrawingStageHandle {
  goTo: (index: number) => void;
  setMorphMoment: (fromIdx: number, toIdx: number, progress: number) => void;
}

// Convert hex color to RGB
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

export const DrawingStage = forwardRef<DrawingStageHandle, DrawingStageProps>(
  ({ activeIndex, className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Active state and indices
    const currentSceneIdx = useRef(0);
    const targetSceneIdx = useRef(0);
    const isMounted = useRef(false);
    const isReducedMotion = useRef(false);
    const isOffscreen = useRef(false);
    const isTabHidden = useRef(false);
    const isMenuOpen = useRef(false);

    // Annotations display state (fades in 400ms after drawing settles)
    const [displayedSceneIdx, setDisplayedSceneIdx] = useState(0);
    const [showAnnotations, setShowAnnotations] = useState(false);
    const settleTimer = useRef<NodeJS.Timeout | null>(null);

    // Performance degradation fallback (if FPS drops below 45 for 2s)
    const [useCrossfadeFallback, setUseCrossfadeFallback] = useState(false);
    const lowFpsDuration = useRef(0);
    const lastFrameTime = useRef<number>(performance.now());

    // Morph animation proxy
    const morphProxy = useRef({ progress: 1.0 });
    const drawInProxy = useRef({ progress: 0.0 });
    const isDrawingIn = useRef(true);

    // Color tweens
    const colorProxy = useRef({
      strokeR: 250,
      strokeG: 248,
      strokeB: 244,
      accentR: 245,
      accentG: 130,
      accentB: 32,
    });

    // Parallax & drift
    const mouseTarget = useRef({ x: 0, y: 0 });
    const mouseCurrent = useRef({ x: 0, y: 0 });

    // Pre-allocated buffers for active segments (pool size up to 640 to accommodate erase-then-draw)
    const MAX_POOL = 640;
    const bufCurX1 = useRef(new Float32Array(MAX_POOL));
    const bufCurY1 = useRef(new Float32Array(MAX_POOL));
    const bufCurX2 = useRef(new Float32Array(MAX_POOL));
    const bufCurY2 = useRef(new Float32Array(MAX_POOL));

    const bufStartX1 = useRef(new Float32Array(MAX_POOL));
    const bufStartY1 = useRef(new Float32Array(MAX_POOL));
    const bufStartX2 = useRef(new Float32Array(MAX_POOL));
    const bufStartY2 = useRef(new Float32Array(MAX_POOL));

    const bufTargetX1 = useRef(new Float32Array(MAX_POOL));
    const bufTargetY1 = useRef(new Float32Array(MAX_POOL));
    const bufTargetX2 = useRef(new Float32Array(MAX_POOL));
    const bufTargetY2 = useRef(new Float32Array(MAX_POOL));

    const bufStagger = useRef(new Float32Array(MAX_POOL));
    const bufDistGround = useRef(new Float32Array(MAX_POOL));
    const bufAccent = useRef(new Uint8Array(MAX_POOL));
    const bufIsGround = useRef(new Uint8Array(MAX_POOL));
    // 0 = morph, 1 = erase (retract), 2 = draw (expand)
    const bufMode = useRef(new Uint8Array(MAX_POOL));
    const activePoolCount = useRef(0);

    // Active morph tween reference for cleanup
    const activeMorphTween = useRef<gsap.core.Tween | null>(null);
    const activeColorTween = useRef<gsap.core.Tween | null>(null);
    const activeDrawInTween = useRef<gsap.core.Tween | null>(null);

    // Schedule annotations appearance after settling (200ms delay)
    const scheduleAnnotations = (sceneIdx: number) => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      setShowAnnotations(false);
      setDisplayedSceneIdx(sceneIdx);

      if (isReducedMotion.current) {
        setShowAnnotations(true);
        return;
      }

      settleTimer.current = setTimeout(() => {
        setShowAnnotations(true);
      }, 200);
    };

    // Initialize initial scene (Scene 0: facades)
    const initScene = (sceneIdx: number) => {
      const isMobile = window.innerWidth < 1024;
      const maxCap = isMobile ? 220 : undefined;
      const initialSegs = scenes[sceneIdx].draw();
      const matched = matchScenes(initialSegs, initialSegs, maxCap);

      activePoolCount.current = matched.length;

      for (let i = 0; i < matched.length; i++) {
        const p = matched[i];
        bufCurX1.current[i] = p.x1A;
        bufCurY1.current[i] = p.y1A;
        bufCurX2.current[i] = p.x2A;
        bufCurY2.current[i] = p.y2A;

        bufStartX1.current[i] = p.x1A;
        bufStartY1.current[i] = p.y1A;
        bufStartX2.current[i] = p.x2A;
        bufStartY2.current[i] = p.y2A;

        bufTargetX1.current[i] = p.x1B;
        bufTargetY1.current[i] = p.y1B;
        bufTargetX2.current[i] = p.x2B;
        bufTargetY2.current[i] = p.y2B;

        bufStagger.current[i] = p.stagger;
        bufDistGround.current[i] = p.distFromGround;
        bufAccent.current[i] = p.accentA ? 1 : 0;
        bufIsGround.current[i] = p.isGround ? 1 : 0;
        bufMode.current[i] = 0; // standard
      }

      const theme = HERO_DRAWING_THEMES[sceneIdx];
      const strokeRgb = hexToRgb(theme.strokeColor);
      const accentRgb = hexToRgb(theme.accentColor);

      colorProxy.current.strokeR = strokeRgb[0];
      colorProxy.current.strokeG = strokeRgb[1];
      colorProxy.current.strokeB = strokeRgb[2];
      colorProxy.current.accentR = accentRgb[0];
      colorProxy.current.accentG = accentRgb[1];
      colorProxy.current.accentB = accentRgb[2];
    };

    // Transition to target scene index
    const goTo = (targetIdx: number) => {
      if (targetIdx === currentSceneIdx.current && morphProxy.current.progress >= 1.0) {
        return;
      }

      // Hide annotations immediately when transition begins
      if (settleTimer.current) clearTimeout(settleTimer.current);
      setShowAnnotations(false);

      const fromIdx = currentSceneIdx.current;
      targetSceneIdx.current = targetIdx;

      // In reduced motion or fallback crossfade mode
      if (isReducedMotion.current || useCrossfadeFallback) {
        currentSceneIdx.current = targetIdx;
        initScene(targetIdx);
        scheduleAnnotations(targetIdx);
        return;
      }

      const isMobile = window.innerWidth < 1024;
      const maxCap = isMobile ? 220 : undefined;
      const config = getTransitionConfig(fromIdx, targetIdx);

      const fromSegs = scenes[fromIdx].draw();
      const targetSegs = scenes[targetIdx].draw();
      const matched = matchScenes(fromSegs, targetSegs, maxCap, config);

      activePoolCount.current = matched.length;

      for (let i = 0; i < matched.length; i++) {
        const p = matched[i];
        bufStartX1.current[i] = p.x1A;
        bufStartY1.current[i] = p.y1A;
        bufStartX2.current[i] = p.x2A;
        bufStartY2.current[i] = p.y2A;

        bufTargetX1.current[i] = p.x1B;
        bufTargetY1.current[i] = p.y1B;
        bufTargetX2.current[i] = p.x2B;
        bufTargetY2.current[i] = p.y2B;

        bufStagger.current[i] = p.stagger;
        bufAccent.current[i] = p.accentB ? 1 : 0;
        bufIsGround.current[i] = p.isGround ? 1 : 0;

        if (p.mode === 'erase') {
          bufMode.current[i] = 1;
        } else if (p.mode === 'draw') {
          bufMode.current[i] = 2;
        } else {
          bufMode.current[i] = 0;
        }
      }

      // Target colors
      const theme = HERO_DRAWING_THEMES[targetIdx];
      const strokeRgb = hexToRgb(theme.strokeColor);
      const accentRgb = hexToRgb(theme.accentColor);

      // Kill running tweens
      if (activeMorphTween.current) activeMorphTween.current.kill();
      if (activeColorTween.current) activeColorTween.current.kill();

      morphProxy.current.progress = 0.0;

      // Snappy morph duration: 0.95s with power3.inOut
      activeMorphTween.current = gsap.to(morphProxy.current, {
        progress: 1.0,
        duration: 0.95,
        ease: 'power3.inOut',
        onComplete: () => {
          currentSceneIdx.current = targetIdx;
          scheduleAnnotations(targetIdx);
        },
      });

      // Animate colors simultaneously (0.8s)
      activeColorTween.current = gsap.to(colorProxy.current, {
        strokeR: strokeRgb[0],
        strokeG: strokeRgb[1],
        strokeB: strokeRgb[2],
        accentR: accentRgb[0],
        accentG: accentRgb[1],
        accentB: accentRgb[2],
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    // Expose setMorphMoment for deterministic testing/snapshots of any transition progress
    const setMorphMoment = (fromIdx: number, toIdx: number, progress: number) => {
      if (activeMorphTween.current) activeMorphTween.current.kill();
      if (activeColorTween.current) activeColorTween.current.kill();
      if (activeDrawInTween.current) activeDrawInTween.current.kill();

      isDrawingIn.current = false;
      drawInProxy.current.progress = 1.0;

      const isMobile = window.innerWidth < 1024;
      const maxCap = isMobile ? 220 : undefined;
      const config = getTransitionConfig(fromIdx, toIdx);
      const fromSegs = scenes[fromIdx].draw();
      const toSegs = scenes[toIdx].draw();
      const matched = matchScenes(fromSegs, toSegs, maxCap, config);

      activePoolCount.current = matched.length;

      for (let i = 0; i < matched.length; i++) {
        const p = matched[i];
        bufStartX1.current[i] = p.x1A;
        bufStartY1.current[i] = p.y1A;
        bufStartX2.current[i] = p.x2A;
        bufStartY2.current[i] = p.y2A;

        bufTargetX1.current[i] = p.x1B;
        bufTargetY1.current[i] = p.y1B;
        bufTargetX2.current[i] = p.x2B;
        bufTargetY2.current[i] = p.y2B;

        bufStagger.current[i] = p.stagger;
        bufAccent.current[i] = progress > 0.5 ? (p.accentB ? 1 : 0) : (p.accentA ? 1 : 0);
        bufIsGround.current[i] = p.isGround ? 1 : 0;

        if (p.mode === 'erase') {
          bufMode.current[i] = 1;
        } else if (p.mode === 'draw') {
          bufMode.current[i] = 2;
        } else {
          bufMode.current[i] = 0;
        }
      }

      const themeFrom = HERO_DRAWING_THEMES[fromIdx];
      const themeTo = HERO_DRAWING_THEMES[toIdx];
      const strokeFrom = hexToRgb(themeFrom.strokeColor);
      const strokeTo = hexToRgb(themeTo.strokeColor);
      const accentFrom = hexToRgb(themeFrom.accentColor);
      const accentTo = hexToRgb(themeTo.accentColor);

      colorProxy.current.strokeR = strokeFrom[0] + (strokeTo[0] - strokeFrom[0]) * progress;
      colorProxy.current.strokeG = strokeFrom[1] + (strokeTo[1] - strokeFrom[1]) * progress;
      colorProxy.current.strokeB = strokeFrom[2] + (strokeTo[2] - strokeFrom[2]) * progress;
      colorProxy.current.accentR = accentFrom[0] + (accentTo[0] - accentFrom[0]) * progress;
      colorProxy.current.accentG = accentFrom[1] + (accentTo[1] - accentFrom[1]) * progress;
      colorProxy.current.accentB = accentFrom[2] + (accentTo[2] - accentFrom[2]) * progress;

      morphProxy.current.progress = progress;
      currentSceneIdx.current = progress >= 1 ? toIdx : fromIdx;
      setDisplayedSceneIdx(currentSceneIdx.current);
      setShowAnnotations(progress >= 1.0);
    };

    useImperativeHandle(ref, () => ({
      goTo,
      setMorphMoment,
    }));

    useEffect(() => {
      if (typeof window !== 'undefined') {
        (window as any).__setHeroSlideMorph = (from: number, to: number, prog: number) => {
          setMorphMoment(from, to, prog);
        };
      }
      return () => {
        if (typeof window !== 'undefined') {
          delete (window as any).__setHeroSlideMorph;
        }
      };
    }, []);

    // Trigger goTo when activeIndex changes with 80ms delay
    useEffect(() => {
      if (!isMounted.current) return;
      const timeout = setTimeout(() => {
        goTo(activeIndex);
      }, 80);
      return () => clearTimeout(timeout);
    }, [activeIndex]);

    // Setup lifecycle, observers, ticker loop, and mouse parallax
    useEffect(() => {
      isMounted.current = true;
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      initScene(0);

      // Draw-in animation: grows lines from ground line over 1.2s
      if (!isReducedMotion.current) {
        drawInProxy.current.progress = 0.0;
        // Start draw-in after page intro finishes (~900ms)
        const drawInTimer = setTimeout(() => {
          activeDrawInTween.current = gsap.to(drawInProxy.current, {
            progress: 1.0,
            duration: 1.2,
            ease: 'power2.out',
            onComplete: () => {
              isDrawingIn.current = false;
              scheduleAnnotations(0);
            },
          });
        }, 900);

        return () => clearTimeout(drawInTimer);
      } else {
        drawInProxy.current.progress = 1.0;
        isDrawingIn.current = false;
        scheduleAnnotations(0);
      }
    }, []);

    // Canvas render loop via gsap.ticker (single high-performance loop, zero allocations)
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      let time = 0;

      const renderLoop = (tickerTime: number, deltaTime: number) => {
        // Pause checks: offscreen, tab hidden, or menu open
        if (isOffscreen.current || isTabHidden.current || isMenuOpen.current) {
          return;
        }

        time += deltaTime * 0.001;

        // Monitor frame rate for auto-degradation fallback (45fps threshold)
        const now = performance.now();
        const deltaMs = now - lastFrameTime.current;
        lastFrameTime.current = now;
        if (deltaMs > 22.2) {
          lowFpsDuration.current += deltaMs;
          if (lowFpsDuration.current > 2000 && !useCrossfadeFallback) {
            setUseCrossfadeFallback(true);
          }
        } else {
          lowFpsDuration.current = Math.max(0, lowFpsDuration.current - deltaMs * 0.5);
        }

        // Smooth desktop parallax easing (up to 8px)
        mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
        mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;

        // Idle drift under 2 units
        const driftX = isReducedMotion.current ? 0 : Math.sin(time * 0.8) * 1.2;
        const driftY = isReducedMotion.current ? 0 : Math.cos(time * 0.6) * 0.8;

        const w = canvas.width;
        const h = canvas.height;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const scale = (w / dpr) / 800;

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.scale(dpr * scale, dpr * scale);

        // Apply slight parallax & drift translation
        ctx.translate(mouseCurrent.current.x + driftX, mouseCurrent.current.y + driftY);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.4;

        const count = activePoolCount.current;
        const progress = morphProxy.current.progress;
        const drawInProgress = drawInProxy.current.progress;
        const drawingIn = isDrawingIn.current;

        const strokeColor = `rgb(${Math.round(colorProxy.current.strokeR)}, ${Math.round(colorProxy.current.strokeG)}, ${Math.round(colorProxy.current.strokeB)})`;
        const accentColor = `rgb(${Math.round(colorProxy.current.accentR)}, ${Math.round(colorProxy.current.accentG)}, ${Math.round(colorProxy.current.accentB)})`;

        for (let i = 0; i < count; i++) {
          const isGround = bufIsGround.current[i] === 1;

          // Ground line stays stationary
          if (isGround) {
            ctx.beginPath();
            ctx.strokeStyle = strokeColor;
            ctx.moveTo(bufTargetX1.current[i], bufTargetY1.current[i]);
            ctx.lineTo(bufTargetX2.current[i], bufTargetY2.current[i]);
            ctx.stroke();
            continue;
          }

          const mode = bufMode.current[i];

          // -----------------------------------------------------------
          // ERASE SEGMENT (Retracts toward origin during erase phase)
          // -----------------------------------------------------------
          if (mode === 1) {
            const stagger = bufStagger.current[i];
            const eraseT = Math.max(0, Math.min(1, (progress - stagger) / 0.50));
            // Fast quadratic ease-out
            const easedT = eraseT * (2 - eraseT);
            const factor = 1 - easedT;
            if (factor <= 0.005) continue;

            const curX1 = bufStartX1.current[i];
            const curY1 = bufStartY1.current[i];
            const curX2 = curX1 + (bufStartX2.current[i] - curX1) * factor;
            const curY2 = curY1 + (bufStartY2.current[i] - curY1) * factor;

            ctx.beginPath();
            ctx.strokeStyle = bufAccent.current[i] === 1 ? accentColor : strokeColor;
            ctx.moveTo(curX1, curY1);
            ctx.lineTo(curX2, curY2);
            ctx.stroke();
            continue;
          }

          // -----------------------------------------------------------
          // DRAW SEGMENT (Expands from origin during draw phase, 300ms overlap)
          // -----------------------------------------------------------
          if (mode === 2) {
            const stagger = bufStagger.current[i];
            const drawT = Math.max(0, Math.min(1, (progress - 0.35 - stagger) / 0.48));
            const easedT = drawT * (2 - drawT);
            if (easedT <= 0.005) continue;

            const curX1 = bufTargetX1.current[i];
            const curY1 = bufTargetY1.current[i];
            const curX2 = curX1 + (bufTargetX2.current[i] - curX1) * easedT;
            const curY2 = curY1 + (bufTargetY2.current[i] - curY1) * easedT;

            ctx.beginPath();
            ctx.strokeStyle = bufAccent.current[i] === 1 ? accentColor : strokeColor;
            ctx.moveTo(curX1, curY1);
            ctx.lineTo(curX2, curY2);
            ctx.stroke();
            continue;
          }

          // -----------------------------------------------------------
          // MORPH SEGMENT (Standard nearest-neighbour interpolation)
          // -----------------------------------------------------------
          let easedT: number;
          if (progress >= 1.0) {
            easedT = 1.0;
          } else if (progress <= 0.0) {
            easedT = 0.0;
          } else {
            const stagger = bufStagger.current[i];
            const localT = Math.max(0, Math.min(1, (progress - stagger) / 0.75));
            // Power3 in/out fast approximation
            easedT = localT < 0.5 ? 4 * localT * localT * localT : 1 - Math.pow(-2 * localT + 2, 3) / 2;
          }

          const curX1 = bufStartX1.current[i] + (bufTargetX1.current[i] - bufStartX1.current[i]) * easedT;
          const curY1 = bufStartY1.current[i] + (bufTargetY1.current[i] - bufStartY1.current[i]) * easedT;
          const curX2 = bufStartX2.current[i] + (bufTargetX2.current[i] - bufStartX2.current[i]) * easedT;
          const curY2 = bufStartY2.current[i] + (bufTargetY2.current[i] - bufStartY2.current[i]) * easedT;

          bufCurX1.current[i] = curX1;
          bufCurY1.current[i] = curY1;
          bufCurX2.current[i] = curX2;
          bufCurY2.current[i] = curY2;

          // If in initial draw-in phase: grow lines from ground upwards
          let drawFrac = 1.0;
          if (drawingIn) {
            const distGround = bufDistGround.current[i];
            const delayNorm = Math.min(0.4, (distGround / 550) * 0.4);
            drawFrac = Math.max(0, Math.min(1, (drawInProgress - delayNorm) / 0.6));
            if (drawFrac <= 0.001) continue;
          }

          const x2Final = curX1 + (curX2 - curX1) * drawFrac;
          const y2Final = curY1 + (curY2 - curY1) * drawFrac;

          ctx.beginPath();
          ctx.strokeStyle = bufAccent.current[i] === 1 ? accentColor : strokeColor;
          ctx.moveTo(curX1, curY1);
          ctx.lineTo(x2Final, y2Final);
          ctx.stroke();
        }

        ctx.restore();
      };

      gsap.ticker.add(renderLoop);

      return () => {
        gsap.ticker.remove(renderLoop);
      };
    }, [useCrossfadeFallback]);

    // Pointer parallax listener on window/hero
    useEffect(() => {
      const handlePointerMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        // Parallax up to 8px
        mouseTarget.current.x = normX * 8;
        mouseTarget.current.y = normY * 8;
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      return () => window.removeEventListener('mousemove', handlePointerMove);
    }, []);

    // Observers: IntersectionObserver, visibilitychange, and mobile menu
    useEffect(() => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            isOffscreen.current = !entry.isIntersecting;
          },
          { threshold: 0.1 }
        );
        observer.observe(heroEl);
        return () => observer.disconnect();
      }
    }, []);

    useEffect(() => {
      const handleVisibilityChange = () => {
        isTabHidden.current = document.visibilityState === 'hidden';
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    useEffect(() => {
      const checkMenu = () => {
        isMenuOpen.current = document.documentElement.classList.contains('menu-open');
      };
      const observer = new MutationObserver(checkMenu);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }, []);

    // Resize and DPR handling
    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      handleResize();

      return () => resizeObserver.disconnect();
    }, []);

    // Cleanup in StrictMode
    useEffect(() => {
      return () => {
        if (settleTimer.current) clearTimeout(settleTimer.current);
        if (activeMorphTween.current) activeMorphTween.current.kill();
        if (activeColorTween.current) activeColorTween.current.kill();
        if (activeDrawInTween.current) activeDrawInTween.current.kill();
      };
    }, []);

    const activeTheme = HERO_DRAWING_THEMES[displayedSceneIdx];
    const annotations = HERO_ANNOTATIONS[displayedSceneIdx] || [];

    return (
      <div
        ref={containerRef}
        className={`relative aspect-square select-none overflow-visible flex items-center justify-center ${className}`}
        style={{
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none block h-full w-full"
        />

        {/* Small contextual annotations (fade in 400ms after drawing settles, hidden on mobile) */}
        {/* Small contextual annotations (fade in 400ms after drawing settles, hidden on mobile) */}
        <svg
          viewBox="0 0 800 800"
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full select-none hidden lg:block transition-opacity duration-400 ease-out ${
            showAnnotations && !isReducedMotion.current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {annotations.map((ann, i) => (
            <g key={i}>
              {/* Thin leader line (0.55 opacity) with 16px shelf */}
              <polyline
                points={`${ann.targetX},${ann.targetY} ${ann.elbowX},${ann.elbowY} ${
                  ann.elbowX + (ann.align === 'start' ? 14 : -14)
                },${ann.elbowY}`}
                fill="none"
                stroke={activeTheme.strokeColor}
                strokeWidth="1.2"
                strokeOpacity="0.55"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Anchor dot on drawing detail */}
              <circle
                cx={ann.targetX}
                cy={ann.targetY}
                r="3"
                fill={activeTheme.accentColor}
              />
              {/* Annotation label text (small, sentence case, subtle contrast) */}
              <text
                x={ann.elbowX + (ann.align === 'start' ? 20 : -20)}
                y={ann.elbowY}
                dy="0.32em"
                textAnchor={ann.align}
                style={{ textAnchor: ann.align }}
                fill={activeTheme.strokeColor}
                fillOpacity="0.95"
                fontSize="15"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontWeight="500"
                letterSpacing="-0.01em"
                className="select-none"
              >
                {ann.text}
              </text>
            </g>
          ))}
        </svg>

        {/* No-JavaScript fallback: static inline SVG of Scene 1 (facades) */}
        <noscript>
          <svg
            viewBox="0 0 800 800"
            className="h-full w-full"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {scenes[0].draw().map((seg, idx) => (
              <line
                key={idx}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke={seg.accent ? '#F58220' : '#FFFFFF'}
                strokeWidth="2.4"
              />
            ))}
          </svg>
        </noscript>
      </div>
    );
  }
);

DrawingStage.displayName = 'DrawingStage';

export default DrawingStage;
