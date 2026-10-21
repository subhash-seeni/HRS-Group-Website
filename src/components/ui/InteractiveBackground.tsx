'use client';

import React, { useEffect, useRef } from 'react';

export interface InteractiveBackgroundProps {
  variant?: 'home' | 'inner';
  className?: string;
}

interface NodePoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isCross?: boolean;
}

interface HoldingEntity {
  index: string;
  name: string;
  sector: string;
}

// The eight operating companies of HRS Group, organized into an architectural octagonal constellation
// Symmetrically arranged around the central holding core in cols 8-12
const HOLDING_ENTITIES: HoldingEntity[] = [
  // Built Environment (01 to 04: Top-Left to Right)
  { index: '01', name: 'Ventures', sector: 'Built Environment' },
  { index: '02', name: 'Aluglaze', sector: 'Facade Engineering' },
  { index: '03', name: 'Geotrix', sector: 'Installation & Erection' },
  { index: '04', name: 'SoFT', sector: 'Trade Education' },
  // Food & Consumer (05 to 06: Bottom-Right to Bottom)
  { index: '05', name: 'Food Products', sector: 'Milling & Processing' },
  { index: '06', name: 'Consumer', sector: 'Packaged Goods' },
  // Hospitality & Retail (07: Bottom-Left)
  { index: '07', name: 'FirstGen', sector: 'Hospitality & Assets' },
  // Services (08: Left)
  { index: '08', name: 'Brand House', sector: 'Communications' },
];

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  variant = 'home',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let gridPoints: NodePoint[] = [];
    let time = 0;

    // Mouse coordinates (smoothly interpolated)
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    const GRID_SPACING = variant === 'home' ? 54 : 46;
    const LENS_RADIUS = variant === 'home' ? 220 : 170;
    const MAX_DISPLACEMENT = variant === 'home' ? 6 : 4;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 200);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Generate grid points
      gridPoints = [];
      const cols = Math.ceil(width / GRID_SPACING) + 2;
      const rows = Math.ceil(height / GRID_SPACING) + 2;
      const offsetX = (width - (cols - 1) * GRID_SPACING) / 2;
      const offsetY = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * GRID_SPACING;
          const by = offsetY + r * GRID_SPACING;
          const isCross = (c + r * 2) % 4 === 0;

          gridPoints.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            isCross,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (
        clientX >= -60 &&
        clientX <= width + 60 &&
        clientY >= -60 &&
        clientY <= height + 60
      ) {
        if (!mouse.active) {
          mouse.x = clientX;
          mouse.y = clientY;
        }
        mouse.targetX = clientX;
        mouse.targetY = clientY;
        mouse.active = true;
      } else {
        mouse.active = false;
        mouse.targetX = -9999;
        mouse.targetY = -9999;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    const render = () => {
      time += 0.02;

      // Smooth interpolation for mouse
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      ctx.clearRect(0, 0, width, height);

      // Vertical fade factor for subtle dissolution at the very bottom
      const getFade = (y: number) => {
        if (y < height * 0.86) return 1;
        return Math.max(0, 1 - (y - height * 0.86) / (height * 0.14));
      };

      // -------------------------------------------------------------
      // 1. ATMOSPHERIC RADIANT LENS (White to Warm Amber Gradient Aura)
      // -------------------------------------------------------------
      if (mouse.active && mouse.x > -500 && mouse.y > -500) {
        const fade = getFade(mouse.y);
        const lensGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          LENS_RADIUS
        );

        // Warm luminous amber core softly radiating out to transparent
        lensGrad.addColorStop(0, `rgba(245, 130, 32, ${0.15 * fade})`);
        lensGrad.addColorStop(0.35, `rgba(245, 130, 32, ${0.06 * fade})`);
        lensGrad.addColorStop(0.70, `rgba(247, 246, 243, ${0.02 * fade})`);
        lensGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, LENS_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // -----------------------------------------------------------
        // 2. ORTHOGONAL FACADE DATUM LINES (Subtle CAD Drafting Axes)
        // -----------------------------------------------------------
        const datumAlpha = 0.18 * fade;

        // Horizontal datum line passing through cursor with soft linear fade
        const hGrad = ctx.createLinearGradient(0, mouse.y, width, mouse.y);
        hGrad.addColorStop(0, 'rgba(20, 20, 20, 0)');
        hGrad.addColorStop(Math.max(0, (mouse.x - LENS_RADIUS * 1.5) / width), 'rgba(20, 20, 20, 0)');
        hGrad.addColorStop(Math.min(1, Math.max(0, mouse.x / width)), `rgba(20, 20, 20, ${datumAlpha})`);
        hGrad.addColorStop(Math.min(1, (mouse.x + LENS_RADIUS * 1.5) / width), 'rgba(20, 20, 20, 0)');
        hGrad.addColorStop(1, 'rgba(20, 20, 20, 0)');

        ctx.strokeStyle = hGrad;
        ctx.lineWidth = 0.75;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        // Vertical datum line passing through cursor
        const vGrad = ctx.createLinearGradient(mouse.x, 0, mouse.x, height);
        vGrad.addColorStop(0, 'rgba(20, 20, 20, 0)');
        vGrad.addColorStop(Math.max(0, (mouse.y - LENS_RADIUS * 1.5) / height), 'rgba(20, 20, 20, 0)');
        vGrad.addColorStop(Math.min(1, Math.max(0, mouse.y / height)), `rgba(20, 20, 20, ${datumAlpha})`);
        vGrad.addColorStop(Math.min(1, (mouse.y + LENS_RADIUS * 1.5) / height), 'rgba(20, 20, 20, 0)');
        vGrad.addColorStop(1, 'rgba(20, 20, 20, 0)');

        ctx.strokeStyle = vGrad;
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Elegant center micro-reticle
        ctx.strokeStyle = `rgba(245, 130, 32, ${0.45 * fade})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(245, 130, 32, ${0.85 * fade})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 4, mouse.y);
        ctx.lineTo(mouse.x + 4, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 4);
        ctx.lineTo(mouse.x, mouse.y + 4);
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 3. HOMEPAGE: SYMMETRICAL OCTAGONAL EQUILIBRIUM
      // -------------------------------------------------------------
      if (variant === 'home') {
        const isDesktop = width >= 1024;
        const isTablet = width >= 768 && !isDesktop;
        const isMobile = width < 768;

        // Dynamic center placement:
        // Positioned in open right sector on desktop (cols 8-12), clear of hero text in cols 1-6
        let cx: number;
        let cy = height * 0.48;
        let R: number;

        if (isDesktop) {
          R = Math.min(138, Math.max(105, height * 0.28, width * 0.095));
          cx = Math.max(width * 0.72, Math.min(width - R - 135, width * 0.77));
        } else if (isTablet) {
          R = Math.min(110, Math.max(85, height * 0.24));
          cx = Math.min(width - R - 90, width * 0.78);
        } else {
          // Mobile: centered background watermark
          R = Math.min(85, width * 0.24);
          cx = width * 0.5;
          cy = height * 0.52;
        }

        const globalFade = getFade(cy);
        if (globalFade > 0.02) {
          // Distance from mouse to center core
          const dMouseCenterX = mouse.x - cx;
          const dMouseCenterY = mouse.y - cy;
          const distMouseCenter = Math.sqrt(dMouseCenterX * dMouseCenterX + dMouseCenterY * dMouseCenterY);
          const centerProx = mouse.active ? Math.max(0, 1 - distMouseCenter / (LENS_RADIUS * 0.9)) : 0;

          // 3A. CONCENTRIC ARCHITECTURAL DRAFTING RINGS
          // Outermost calibration ring
          ctx.strokeStyle = `rgba(215, 212, 205, ${0.35 * globalFade})`;
          ctx.lineWidth = 0.5;
          ctx.setLineDash([1, 5]);
          ctx.beginPath();
          ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
          ctx.stroke();

          // Primary octagon orbit ring
          ctx.strokeStyle = `rgba(215, 212, 205, ${(0.55 + centerProx * 0.25) * globalFade})`;
          ctx.lineWidth = 0.75;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(cx, cy, R, 0, Math.PI * 2);
          ctx.stroke();

          // Mid harmonic ring
          ctx.strokeStyle = `rgba(215, 212, 205, ${0.35 * globalFade})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(cx, cy, R * 0.62, 0, Math.PI * 2);
          ctx.stroke();

          // Inner core ring
          ctx.strokeStyle = `rgba(215, 212, 205, ${(0.45 + centerProx * 0.3) * globalFade})`;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.arc(cx, cy, R * 0.32, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // 3B. COMPUTE 8 NODES ON REGULAR 45-DEGREE OCTAGON
          // Node 0 starts at -135deg (-3pi/4), progressing clockwise by pi/4 (45deg)
          const angleStep = Math.PI / 4;
          const startAngle = -Math.PI * 0.75; // -135deg (Top-Left)

          const nodes = HOLDING_ENTITIES.map((entity, i) => {
            const angle = startAngle + i * angleStep;
            // Gentle rhythmic micro-breath (amplitude 1.2px)
            const breath = Math.sin(time * 0.8 + i * 0.785) * 1.2;
            const nx = cx + Math.cos(angle) * (R + breath);
            const ny = cy + Math.sin(angle) * (R + breath);

            const dx = nx - mouse.x;
            const dy = ny - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const prox = mouse.active ? Math.max(0, 1 - dist / LENS_RADIUS) : 0;

            return {
              ...entity,
              angle,
              x: nx,
              y: ny,
              prox,
              fade: getFade(ny),
            };
          });

          // 3C. OCTAGONAL PERIMETER (Regular 8-sided holding polygon)
          ctx.strokeStyle = `rgba(215, 212, 205, ${(0.7 + centerProx * 0.2) * globalFade})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          nodes.forEach((n, idx) => {
            if (idx === 0) ctx.moveTo(n.x, n.y);
            else ctx.lineTo(n.x, n.y);
          });
          ctx.closePath();
          ctx.stroke();

          // 3D. INNER DUAL HARMONIC SQUARES (Interlocking geometric octagram chords)
          ctx.strokeStyle = `rgba(215, 212, 205, ${0.22 * globalFade})`;
          ctx.lineWidth = 0.5;
          // Square 1: 0, 2, 4, 6
          ctx.beginPath();
          ctx.moveTo(nodes[0].x, nodes[0].y);
          ctx.lineTo(nodes[2].x, nodes[2].y);
          ctx.lineTo(nodes[4].x, nodes[4].y);
          ctx.lineTo(nodes[6].x, nodes[6].y);
          ctx.closePath();
          ctx.stroke();

          // Square 2: 1, 3, 5, 7
          ctx.beginPath();
          ctx.moveTo(nodes[1].x, nodes[1].y);
          ctx.lineTo(nodes[3].x, nodes[3].y);
          ctx.lineTo(nodes[5].x, nodes[5].y);
          ctx.lineTo(nodes[7].x, nodes[7].y);
          ctx.closePath();
          ctx.stroke();

          // 3E. RADIAL SPOKES FROM CENTER HUB TO 8 NODES
          const hubRadius = 22;
          nodes.forEach((n) => {
            const spokeHighlight = Math.max(n.prox, centerProx);
            const spokeStartX = cx + Math.cos(n.angle) * hubRadius;
            const spokeStartY = cy + Math.sin(n.angle) * hubRadius;

            if (spokeHighlight > 0.15) {
              ctx.strokeStyle = `rgba(245, 130, 32, ${(0.2 + spokeHighlight * 0.65) * globalFade})`;
              ctx.lineWidth = 1;
            } else {
              ctx.strokeStyle = `rgba(215, 212, 205, ${0.45 * globalFade})`;
              ctx.lineWidth = 0.6;
            }

            ctx.beginPath();
            ctx.moveTo(spokeStartX, spokeStartY);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();

            // Extended cardinal drafting ticks on outer perimeter
            const isCardinal = Math.abs(Math.cos(n.angle)) < 0.01 || Math.abs(Math.sin(n.angle)) < 0.01;
            if (isCardinal) {
              const tickOuterX = cx + Math.cos(n.angle) * (R * 1.25 + 8);
              const tickOuterY = cy + Math.sin(n.angle) * (R * 1.25 + 8);
              ctx.strokeStyle = `rgba(215, 212, 205, ${0.35 * globalFade})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(cx + Math.cos(n.angle) * R * 1.25, cy + Math.sin(n.angle) * R * 1.25);
              ctx.lineTo(tickOuterX, tickOuterY);
              ctx.stroke();
            }
          });

          // 3F. CENTRAL HOLDING CORE (Parent Hub: HRS GROUP)
          // Translucent fill to occlude background grid lines under core badge
          ctx.fillStyle = `rgba(247, 246, 243, ${0.94 * globalFade})`;
          ctx.beginPath();
          ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
          ctx.fill();

          // Hub perimeter ring
          ctx.strokeStyle =
            centerProx > 0.15
              ? `rgba(245, 130, 32, ${(0.6 + centerProx * 0.4) * globalFade})`
              : `rgba(20, 20, 20, ${0.28 * globalFade})`;
          ctx.lineWidth = centerProx > 0.15 ? 1.2 : 0.75;
          ctx.beginPath();
          ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Precision center datum crosshair
          const crossLen = 3.5;
          ctx.strokeStyle = `rgba(245, 130, 32, ${(0.7 + centerProx * 0.3) * globalFade})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx - crossLen, cy);
          ctx.lineTo(cx + crossLen, cy);
          ctx.moveTo(cx, cy - crossLen);
          ctx.lineTo(cx, cy + crossLen);
          ctx.stroke();

          // Center micro-accent pip
          ctx.fillStyle = `rgba(245, 130, 32, ${globalFade})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 2, 0, Math.PI * 2);
          ctx.fill();

          // Central core notation: "HRS GROUP" & "HOLDING"
          ctx.font = '600 7.5px var(--font-hanken-grotesk), sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle =
            centerProx > 0.15
              ? `rgba(245, 130, 32, ${(0.88 + centerProx * 0.12) * globalFade})`
              : `rgba(20, 20, 20, ${0.75 * globalFade})`;
          ctx.fillText('HRS GROUP', cx, cy - 8);

          ctx.font = '500 6.5px var(--font-hanken-grotesk), sans-serif';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(107, 107, 102, ${0.7 * globalFade})`;
          ctx.fillText('HOLDING', cx, cy + 9);

          // 3G. RENDER 8 OPERATING NODES & LABELS
          nodes.forEach((node, i) => {
            const nodeFade = node.fade * globalFade;
            if (nodeFade <= 0.05) return;

            const isHovered = node.prox > 0.15;

            // Interactive dynamic tension ray when mouse hovers near this node
            if (node.prox > 0.18) {
              ctx.strokeStyle = `rgba(245, 130, 32, ${(node.prox - 0.18) * 0.9 * nodeFade})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }

            // Outer orbit ring around node
            const orbitR = 6 + node.prox * 3 + Math.sin(time * 2 + i) * 0.8;
            ctx.strokeStyle = isHovered
              ? `rgba(245, 130, 32, ${(0.55 + node.prox * 0.45) * nodeFade})`
              : `rgba(20, 20, 20, ${0.32 * nodeFade})`;
            ctx.lineWidth = isHovered ? 1.25 : 0.75;
            ctx.beginPath();
            ctx.arc(node.x, node.y, orbitR, 0, Math.PI * 2);
            ctx.stroke();

            // Small CAD precision tick marks (crosshair) on node orbit
            const tickDist = orbitR + 2.5;
            ctx.strokeStyle = isHovered
              ? `rgba(245, 130, 32, ${0.75 * nodeFade})`
              : `rgba(20, 20, 20, ${0.25 * nodeFade})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x - tickDist, node.y);
            ctx.lineTo(node.x - orbitR, node.y);
            ctx.moveTo(node.x + orbitR, node.y);
            ctx.lineTo(node.x + tickDist, node.y);
            ctx.moveTo(node.x, node.y - tickDist);
            ctx.lineTo(node.x, node.y - orbitR);
            ctx.moveTo(node.x, node.y + orbitR);
            ctx.lineTo(node.x, node.y + tickDist);
            ctx.stroke();

            // Center brand orange pip
            ctx.fillStyle = `rgba(245, 130, 32, ${nodeFade})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2.2 + node.prox * 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Typography (Desktop & Tablet only - keep mobile clean as subtle watermark)
            if (!isMobile) {
              let labelX = node.x;
              let labelY = node.y;
              let align: 'left' | 'right' | 'center' = 'left';
              let subtitleY = node.y;

              // Outward radial alignment based on position relative to center
              if (i === 1) {
                // Node 02 (Top): Center-aligned above
                align = 'center';
                labelX = node.x;
                labelY = node.y - 13;
                subtitleY = node.y - 24;
              } else if (i === 5) {
                // Node 06 (Bottom): Center-aligned below
                align = 'center';
                labelX = node.x;
                labelY = node.y + 17;
                subtitleY = node.y + 28;
              } else if (node.x > cx) {
                // Nodes on right (03 Geotrix, 04 SoFT, 05 Food Products): Left-aligned to the right
                align = 'left';
                labelX = node.x + 12;
                labelY = i === 4 ? node.y + 8 : (i === 2 ? node.y - 4 : node.y + 4);
                subtitleY = labelY + 12;
              } else {
                // Nodes on left (01 Ventures, 07 FirstGen, 08 Brand House): Right-aligned to the left
                align = 'right';
                labelX = node.x - 12;
                labelY = i === 6 ? node.y + 8 : (i === 0 ? node.y - 4 : node.y + 4);
                subtitleY = labelY + 12;
              }

              ctx.textBaseline = 'middle';
              ctx.font = '600 11px var(--font-hanken-grotesk), sans-serif';
              const idxW = ctx.measureText(`${node.index} `).width;
              ctx.font = '500 11.5px var(--font-hanken-grotesk), sans-serif';
              const nameW = ctx.measureText(node.name).width;
              const totalW = idxW + nameW;

              if (align === 'right') {
                ctx.textAlign = 'left';
                ctx.font = '600 11px var(--font-hanken-grotesk), sans-serif';
                ctx.fillStyle = `rgba(245, 130, 32, ${(0.88 + node.prox * 0.12) * nodeFade})`;
                ctx.fillText(node.index, labelX - totalW, labelY);

                ctx.font = '500 11.5px var(--font-hanken-grotesk), sans-serif';
                ctx.fillStyle = `rgba(20, 20, 20, ${(0.78 + node.prox * 0.22) * nodeFade})`;
                ctx.fillText(node.name, labelX - totalW + idxW, labelY);

                if (node.prox > 0.15) {
                  ctx.textAlign = 'right';
                  ctx.font = '400 9.5px var(--font-hanken-grotesk), sans-serif';
                  ctx.fillStyle = `rgba(107, 107, 102, ${(node.prox - 0.15) * 1.25 * nodeFade})`;
                  ctx.fillText(node.sector, labelX, subtitleY);
                }
              } else if (align === 'center') {
                const startX = labelX - totalW / 2;
                ctx.textAlign = 'left';
                ctx.font = '600 11px var(--font-hanken-grotesk), sans-serif';
                ctx.fillStyle = `rgba(245, 130, 32, ${(0.88 + node.prox * 0.12) * nodeFade})`;
                ctx.fillText(node.index, startX, labelY);

                ctx.font = '500 11.5px var(--font-hanken-grotesk), sans-serif';
                ctx.fillStyle = `rgba(20, 20, 20, ${(0.78 + node.prox * 0.22) * nodeFade})`;
                ctx.fillText(node.name, startX + idxW, labelY);

                if (node.prox > 0.15) {
                  ctx.textAlign = 'center';
                  ctx.font = '400 9.5px var(--font-hanken-grotesk), sans-serif';
                  ctx.fillStyle = `rgba(107, 107, 102, ${(node.prox - 0.15) * 1.25 * nodeFade})`;
                  ctx.fillText(node.sector, labelX, subtitleY);
                }
              } else {
                ctx.textAlign = 'left';
                ctx.font = '600 11px var(--font-hanken-grotesk), sans-serif';
                ctx.fillStyle = `rgba(245, 130, 32, ${(0.88 + node.prox * 0.12) * nodeFade})`;
                ctx.fillText(node.index, labelX, labelY);

                ctx.font = '500 11.5px var(--font-hanken-grotesk), sans-serif';
                ctx.fillStyle = `rgba(20, 20, 20, ${(0.78 + node.prox * 0.22) * nodeFade})`;
                ctx.fillText(node.name, labelX + idxW, labelY);

                if (node.prox > 0.15) {
                  ctx.textAlign = 'left';
                  ctx.font = '400 9.5px var(--font-hanken-grotesk), sans-serif';
                  ctx.fillStyle = `rgba(107, 107, 102, ${(node.prox - 0.15) * 1.25 * nodeFade})`;
                  ctx.fillText(node.sector, labelX, subtitleY);
                }
              }
            } else {
              // Mobile: draw just the index above the node
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = '600 9px var(--font-hanken-grotesk), sans-serif';
              ctx.fillStyle = `rgba(245, 130, 32, ${0.75 * nodeFade})`;
              ctx.fillText(node.index, node.x, node.y - 11);
            }
          });
        }
      }

      // -------------------------------------------------------------
      // 4. ARCHITECTURAL DOT MATRIX & TECTONIC DEFLECTION
      // -------------------------------------------------------------
      for (let i = 0; i < gridPoints.length; i++) {
        const pt = gridPoints[i];
        const fade = getFade(pt.baseY);
        if (fade <= 0.05) continue;

        let prox = 0;

        if (mouse.active) {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LENS_RADIUS && dist > 0.01) {
            prox = 1 - dist / LENS_RADIUS;
            // Smooth, subtle elastic deflection (tectonic membrane feel)
            const force = prox * MAX_DISPLACEMENT;
            const targetX = pt.baseX + (dx / dist) * force;
            const targetY = pt.baseY + (dy / dist) * force;

            pt.vx += (targetX - pt.x) * 0.22;
            pt.vy += (targetY - pt.y) * 0.22;
          } else {
            pt.vx += (pt.baseX - pt.x) * 0.14;
            pt.vy += (pt.baseY - pt.y) * 0.14;
          }

          pt.vx *= 0.72;
          pt.vy *= 0.72;
          pt.x += pt.vx;
          pt.y += pt.vy;
        } else {
          pt.x += (pt.baseX - pt.x) * 0.14;
          pt.y += (pt.baseY - pt.y) * 0.14;
        }

        // Draw point (crosshair '+' or refined dot)
        if (pt.isCross) {
          const crossSize = 3.2 + prox * 1.8;
          const alpha = (0.20 + prox * 0.50) * fade;
          ctx.strokeStyle =
            prox > 0.35
              ? `rgba(245, 130, 32, ${alpha})`
              : `rgba(20, 20, 20, ${alpha})`;
          ctx.lineWidth = prox > 0.2 ? 1 : 0.7;
          ctx.beginPath();
          ctx.moveTo(pt.x - crossSize, pt.y);
          ctx.lineTo(pt.x + crossSize, pt.y);
          ctx.moveTo(pt.x, pt.y - crossSize);
          ctx.lineTo(pt.x, pt.y + crossSize);
          ctx.stroke();
        } else {
          const radius = 1.3 + prox * 1.5;
          const alpha = (0.18 + prox * 0.55) * fade;

          if (prox > 0.35) {
            ctx.fillStyle = `rgba(245, 130, 32, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(20, 20, 20, ${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    handleResize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Soft bottom hairline dissolve */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};
