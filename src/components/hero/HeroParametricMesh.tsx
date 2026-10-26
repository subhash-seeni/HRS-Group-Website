'use client';

import React, { useRef, useEffect } from 'react';

interface HeroParametricMeshProps {
  activeIndex: number;
  accentColor: string;
  headerTone?: 'light' | 'dark';
  className?: string;
}

interface PulseWave {
  cx: number;
  cy: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
}

export const HeroParametricMesh: React.FC<HeroParametricMeshProps> = ({
  activeIndex,
  accentColor,
  headerTone = 'light',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, isHovering: false });
  const isVisibleRef = useRef(true);
  const pulsesRef = useRef<PulseWave[]>([]);

  // Smooth slide topology interpolation state
  const slideStateRef = useRef({
    current: activeIndex,
    target: activeIndex,
    progress: 1.0,
  });

  // Trigger smooth transition when activeIndex changes
  useEffect(() => {
    slideStateRef.current.current = slideStateRef.current.target;
    slideStateRef.current.target = activeIndex;
    slideStateRef.current.progress = 0.0;
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // High-DPI handling
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0.5;
      mouseRef.current.targetY = 0.5;
      mouseRef.current.isHovering = false;
    };

    // Click-to-pulse energy ring
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) / rect.width;
      const clickY = (e.clientY - rect.top) / rect.height;

      pulsesRef.current.push({
        cx: clickX,
        cy: clickY,
        radius: 0,
        maxRadius: Math.max(rect.width, rect.height) * 0.9,
        strength: 35,
        speed: 6.5,
      });

      // Keep max 4 concurrent pulses
      if (pulsesRef.current.length > 4) {
        pulsesRef.current.shift();
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Lattice configuration
    const cols = 24;
    const rows = 20;

    // Mathematical elevation functions for each sector topology
    const computeTopologyElevation = (
      c: number,
      r: number,
      topologyIdx: number,
      t: number
    ): number => {
      const u = (c / cols - 0.5) * 2; // -1 to 1
      const v = (r / rows - 0.5) * 2; // -1 to 1
      const distFromCenter = Math.hypot(u, v);
      const angle = Math.atan2(v, u);

      switch (topologyIdx % 7) {
        case 0: {
          // Facades: Cylindrical curtain wall envelope with dynamic wind-flutter
          const cylinder = (1 - Math.min(u * u, 1)) * 48;
          const windFlutter =
            Math.sin(v * 3.5 + t * 2.2) * Math.cos(u * 2 + t * 1.2) * 16;
          return cylinder + windFlutter;
        }
        case 1: {
          // Homes: Terraced landscape elevation contours
          const raw =
            Math.sin(u * 2.5 + t * 0.4) * 18 +
            Math.cos(v * 2.5 + t * 0.3) * 18;
          // Quantize into crisp contour terrace steps
          const stepped = Math.floor(raw / 10) * 12;
          return stepped + Math.sin(u * 4 + v * 4) * 4;
        }
        case 2: {
          // Masalas: Centrifugal logarithmic spiral & dispersion vortex
          const spiral =
            Math.sin(angle * 3 - distFromCenter * 8 + t * 3.2) *
            Math.exp(-distFromCenter * 1.4) *
            54;
          const vortexCenter = Math.exp(-distFromCenter * 4) * 25;
          return spiral - vortexCenter;
        }
        case 3: {
          // Brands: Modular 3D volumetric packaging cubes
          const blockX = Math.floor(c / 4);
          const blockY = Math.floor(r / 4);
          const isElevated =
            Math.sin(blockX * 2.1 + blockY * 1.7 + t * 0.9) > 0.1;
          const baseHeight = isElevated ? 32 : 4;
          return baseHeight + Math.sin(c * 1.2 + t) * 5;
        }
        case 4: {
          // Stays: Serene concentric radial canopy ripple
          const ripple =
            (Math.cos(distFromCenter * 11 - t * 2.6) /
              (1 + distFromCenter * 2.2)) *
            42;
          return ripple;
        }
        case 5: {
          // Skills: Structural stress tensor & point-load deflection
          const saddle = (u * u - v * v) * 24;
          const pointLoad =
            -Math.exp(-(u * u + v * v) * 4.5) * (42 + Math.sin(t * 3) * 12);
          const stressRibs = Math.sin((u + v) * 5 - t * 1.8) * 9;
          return saddle + pointLoad + stressRibs;
        }
        case 6: {
          // Retail: Polycentric ecosystem distribution network
          // 3 hub centers
          const dSquare = Math.hypot(u - -0.3, v - -0.2);
          const dBazaar = Math.hypot(u - 0.4, v - 0.3);
          const dMini = Math.hypot(u - -0.1, v - 0.5);

          const hubPeak =
            Math.exp(-dSquare * 3.5) * 40 +
            Math.exp(-dBazaar * 4.2) * 32 +
            Math.exp(-dMini * 4.5) * 26;
          const flowField = Math.sin(dSquare * 8 - t * 2.8) * 10;
          return hubPeak + flowField;
        }
        default:
          return Math.sin(c * 0.3 + t) * Math.cos(r * 0.3 + t) * 25;
      }
    };

    // Render loop
    const render = (now: number) => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Mouse damping
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      if (!isReducedMotion) {
        time += 0.016;
        // Advance topology transition progress
        if (slideStateRef.current.progress < 1.0) {
          slideStateRef.current.progress = Math.min(
            1.0,
            slideStateRef.current.progress + 0.045
          );
        }
      }

      // Update pulse waves
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const p = pulsesRef.current[i];
        p.radius += p.speed;
        p.strength *= 0.985;
        if (p.radius >= p.maxRadius || p.strength < 0.5) {
          pulsesRef.current.splice(i, 1);
        }
      }

      // Dynamic 3D camera orientation with interactive cursor tilt
      const cameraTiltX = (mouseRef.current.x - 0.5) * 0.22;
      const cameraTiltY = (mouseRef.current.y - 0.5) * 0.18;

      const originX = width * 0.5 + (mouseRef.current.x - 0.5) * 25;
      const originY = height * 0.56 + (mouseRef.current.y - 0.5) * 20;

      const cellW = width / (cols * 1.55);
      const cellH = height / (rows * 2.45);

      const isoAngle = Math.PI / 6 + cameraTiltX;

      // Project grid points
      const points: {
        x: number;
        y: number;
        elevation: number;
        pulseBoost: number;
      }[][] = [];

      let peakElevation = -999;
      let centerElevation = 0;

      const progress = slideStateRef.current.progress;
      // Smooth cubic easing for topology morphing
      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const nx = (c - cols / 2) * cellW;
          const ny = (r - rows / 2) * cellH;

          // Isometric 3D projection
          const isoX = originX + (nx - ny) * Math.cos(isoAngle);
          const isoY = originY + (nx + ny) * Math.sin(isoAngle) - cameraTiltY * ny;

          // Compute interpolated topology elevation
          const eCurrent = computeTopologyElevation(
            c,
            r,
            slideStateRef.current.current,
            time
          );
          const eTarget = computeTopologyElevation(
            c,
            r,
            slideStateRef.current.target,
            time
          );
          let baseElevation = eCurrent * (1 - easedProgress) + eTarget * easedProgress;

          // Interactive aerodynamic cursor wake
          const normC = c / cols;
          const normR = r / rows;
          const distToCursor = Math.hypot(
            normC - mouseRef.current.x,
            normR - mouseRef.current.y
          );
          const aerodynamicWake =
            Math.sin(distToCursor * 12 - time * 3.5) *
            Math.exp(-distToCursor * 3.8) *
            26;

          // Check active click-pulse waves
          let pulseElevation = 0;
          let pulseColorIntensity = 0;
          const ptDistToCanvasCenter = Math.hypot(isoX - originX, isoY - originY);

          for (const pulse of pulsesRef.current) {
            const pulseOriginX = width * pulse.cx;
            const pulseOriginY = height * pulse.cy;
            const distFromPulse = Math.hypot(isoX - pulseOriginX, isoY - pulseOriginY);
            const distDiff = Math.abs(distFromPulse - pulse.radius);

            if (distDiff < 40) {
              const waveShape = Math.cos((distDiff / 40) * Math.PI * 0.5);
              pulseElevation += waveShape * pulse.strength;
              pulseColorIntensity = Math.max(pulseColorIntensity, waveShape);
            }
          }

          const totalElevation = baseElevation + aerodynamicWake + pulseElevation;

          if (totalElevation > peakElevation) {
            peakElevation = totalElevation;
          }

          if (c === Math.floor(cols / 2) && r === Math.floor(rows / 2)) {
            centerElevation = totalElevation;
          }

          points[r][c] = {
            x: isoX,
            y: isoY - totalElevation,
            elevation: totalElevation,
            pulseBoost: pulseColorIntensity,
          };
        }
      }

      // Draw rows (horizontal lattice ribs)
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        const isPrimaryRib = r % 3 === 0;

        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        // Base color according to slide background tone (light vs dark)
        const isDarkText = headerTone === 'dark';
        const baseRgb = isDarkText ? '14, 14, 16' : '255, 255, 255';

        // Distance fog: Front rows brighter than rear
        const depthFog = 0.15 + (r / rows) * 0.55;
        if (isPrimaryRib) {
          ctx.strokeStyle = `rgba(${baseRgb}, ${Math.min(depthFog + 0.25, 0.95).toFixed(2)})`;
          ctx.lineWidth = 1.4;
        } else {
          ctx.strokeStyle = `rgba(${baseRgb}, ${depthFog.toFixed(2)})`;
          ctx.lineWidth = 0.7;
        }
        ctx.stroke();
      }

      // Draw columns (vertical lattice ribs)
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        const isPrimaryRib = c % 4 === 0;

        for (let r = 0; r < rows; r++) {
          const pt = points[r][c];
          if (r === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        const isDarkText = headerTone === 'dark';
        const baseRgb = isDarkText ? '14, 14, 16' : '255, 255, 255';
        const depthFog = 0.15 + (c / cols) * 0.5;
        if (isPrimaryRib) {
          ctx.strokeStyle = `rgba(${baseRgb}, ${Math.min(depthFog + 0.2, 0.9).toFixed(2)})`;
          ctx.lineWidth = 1.3;
        } else {
          ctx.strokeStyle = `rgba(${baseRgb}, ${depthFog.toFixed(2)})`;
          ctx.lineWidth = 0.7;
        }
        ctx.stroke();
      }

      // Render glowing constellation nodes at peak intersections & pulse rings
      const isDarkText = headerTone === 'dark';
      for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
          const pt = points[r][c];

          // Highlight peaks or click pulses
          if (pt.elevation > peakElevation * 0.72 || pt.pulseBoost > 0.3) {
            const glowRadius = pt.pulseBoost > 0.3 ? 3.5 : 2.0;
            ctx.fillStyle = pt.pulseBoost > 0.3 ? (isDarkText ? '#0E0E10' : '#FFFFFF') : accentColor;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [accentColor, headerTone]);

  return (
    <div
      className={`relative aspect-square w-full max-w-[560px] select-none ${className}`}
      aria-label="Interactive parametric computational topology"
    >
      {/* Real-time HTML5 Canvas */}
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default HeroParametricMesh;
