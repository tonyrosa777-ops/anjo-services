"use client";

/**
 * AnjoCanvas — Layer 2 of the 3-layer hero stack (Hero Architecture Rule).
 *
 * Concept: COFFERED-CEILING REVEAL
 *   Tony's stated favorite work + the strategic wedge per market-intelligence.md
 *   §9 EXPLOIT #3 (finish carpentry as the trojan horse). Picked over the other
 *   9 concept seeds via the Hero Architecture Rule critic step (see handoff).
 *
 * 5-phase lifecycle (mirrors Placed-Right-Fence ForgeCanvas pattern):
 *   STREAM → grid lines stream in from edges toward intersection nodes
 *   RISE   → panel frames extrude with spring overshoot, panel-by-panel stagger
 *   COOL   → frames heat-cool from amber white-hot to deep brand red
 *   ARC    → red highlight arc (logo-swoosh echo) sweeps across completed panels
 *   IDLE   → intersection nodes breathe; subtle ember drift along beams
 *
 * Color sourced from CSS custom properties on :root via getComputedStyle —
 * never hard-coded hex (CLAUDE.md Code Standards + animation-specialist agent
 * file constraints).
 *
 * Mobile-safe: ResizeObserver on parent (Error #44 — canvas inside positioned
 * container returns 0 from offsetWidth alone). prefers-reduced-motion guard.
 * No Three.js, no GSAP — pure requestAnimationFrame + Canvas 2D.
 */

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "wait" | "stream" | "rise" | "settle";

interface StreamLine {
  sx: number;
  sy: number; // start (canvas edge)
  tx: number;
  ty: number; // target (intersection node)
  t: number; // 0→1 progress
  speed: number;
}

interface Panel {
  // Coffered panel cell — 4 corner intersection nodes form a rectangle
  cx: number;
  cy: number; // panel center
  w: number;
  h: number; // panel size
  startAt: number; // ms — when stream lines start arriving
  riseAt: number; // ms — when frames extrude
  phase: Phase;
  rise: number; // 0→1 extrusion progress (with spring)
  coolingT: number; // 0 = white-hot, 1 = settled deep-red
  streams: StreamLine[];
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface Layout {
  cols: number;
  rows: number;
  panelW: number;
  panelH: number;
  startX: number;
  startY: number;
  isMobile: boolean;
}

// ─── Color helpers — read CSS custom properties at mount ──────────────────────

interface BrandColors {
  primary: [number, number, number]; // brand red
  accent: [number, number, number]; // warm amber
  textPrimary: [number, number, number];
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ];
  }
  return [
    parseInt(h.slice(0, 2), 16) || 200,
    parseInt(h.slice(2, 4), 16) || 32,
    parseInt(h.slice(4, 6), 16) || 44,
  ];
}

function readBrandColors(): BrandColors {
  if (typeof window === "undefined") {
    return {
      primary: [200, 32, 44],
      accent: [232, 176, 76],
      textPrimary: [245, 245, 242],
    };
  }
  const cs = getComputedStyle(document.documentElement);
  return {
    primary: parseHex(cs.getPropertyValue("--primary") || "#c8202c"),
    accent: parseHex(cs.getPropertyValue("--accent") || "#e8b04c"),
    textPrimary: parseHex(cs.getPropertyValue("--text-primary") || "#f5f5f2"),
  };
}

// Heat-cool gradient: white-hot → amber → brand red → deep settled red.
// Drives the panel frame color as it cools after the strike.
function heatRGB(t: number, c: BrandColors): [number, number, number] {
  const ct = Math.max(0, Math.min(1, t));
  const [ar, ag, ab] = c.accent; // amber midpoint
  const [pr, pg, pb] = c.primary; // settled deep red
  if (ct < 0.18) {
    // white-hot → amber
    const f = ct / 0.18;
    return [
      Math.round(255 - (255 - ar) * f),
      Math.round(255 - (255 - ag) * f),
      Math.round(255 - (255 - ab) * f),
    ];
  }
  if (ct < 0.62) {
    // amber → brand red
    const f = (ct - 0.18) / 0.44;
    return [
      Math.round(ar + (pr - ar) * f),
      Math.round(ag + (pg - ag) * f),
      Math.round(ab + (pb - ab) * f),
    ];
  }
  // brand red → deep settled (~70% darken)
  const f = (ct - 0.62) / 0.38;
  return [
    Math.round(pr - pr * 0.3 * f),
    Math.round(pg - pg * 0.5 * f),
    Math.round(pb - pb * 0.5 * f),
  ];
}

// Spring overshoot easing — frames "snap" into place
function springOut(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * 10 * Math.PI * 0.68);
}

// ─── Layout — coffered grid sized to viewport ─────────────────────────────────

function getLayout(W: number, H: number): Layout {
  const isMobile = W < 640;
  // Coffered ceiling looks best with rectangular panels wider than tall.
  // Mobile: 2x2 large panels for legibility. Desktop: 3x2 for breathing room.
  let cols: number;
  let rows: number;
  if (isMobile) {
    cols = 2;
    rows = 2;
  } else if (W < 1024) {
    cols = 3;
    rows = 2;
  } else {
    cols = 3;
    rows = 2;
  }
  // Reserve 12% padding around the grid
  const padX = W * 0.12;
  const padY = H * 0.18;
  const gridW = W - padX * 2;
  const gridH = H - padY * 2;
  const panelW = gridW / cols;
  const panelH = gridH / rows;
  return {
    cols,
    rows,
    panelW,
    panelH,
    startX: padX,
    startY: padY,
    isMobile,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnjoCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const colors = readBrandColors();

    // ── Timing constants (ms) ───────────────────────────────────────────────
    const STREAM_LEAD = 480; // stream-in duration before strike
    const RISE_MS = 420; // panel frame extrusion
    const COOL_MS = 1800; // heat → settled
    const STAGGER = 180; // ms between panel starts
    const ARC_MS = 900; // logo-swoosh arc sweep

    // ── Scene state ─────────────────────────────────────────────────────────
    let raf = 0;
    let t0: number | null = null;
    let panels: Panel[] = [];
    let arcAt = -1; // ms when the swoosh arc starts
    let embers: Ember[] = [];
    let layout: Layout = getLayout(800, 540);

    // ── Build grid ──────────────────────────────────────────────────────────
    function build(L: Layout) {
      layout = L;
      panels = [];
      embers = [];
      arcAt = -1;
      t0 = null;

      // Diagonal stagger — top-left first, bottom-right last.
      // Reads as the ceiling "growing" outward, leading the eye up.
      let order = 0;
      for (let r = 0; r < L.rows; r++) {
        for (let c = 0; c < L.cols; c++) {
          const cx = L.startX + L.panelW * (c + 0.5);
          const cy = L.startY + L.panelH * (r + 0.5);
          const startAt = 200 + order * STAGGER;
          const riseAt = startAt + STREAM_LEAD;
          order++;

          if (reduced) {
            panels.push({
              cx,
              cy,
              w: L.panelW,
              h: L.panelH,
              startAt,
              riseAt,
              phase: "settle",
              rise: 1,
              coolingT: 1,
              streams: [],
            });
          } else {
            panels.push({
              cx,
              cy,
              w: L.panelW,
              h: L.panelH,
              startAt,
              riseAt,
              phase: "wait",
              rise: 0,
              coolingT: 0,
              streams: [],
            });
          }
        }
      }
      if (reduced) arcAt = 0;
    }

    function spawnStreams(p: Panel, W: number, H: number) {
      // 4 corner-bound stream lines per panel — drawing the panel frame in.
      const corners: Array<[number, number]> = [
        [p.cx - p.w / 2, p.cy - p.h / 2],
        [p.cx + p.w / 2, p.cy - p.h / 2],
        [p.cx + p.w / 2, p.cy + p.h / 2],
        [p.cx - p.w / 2, p.cy + p.h / 2],
      ];
      for (const [tx, ty] of corners) {
        // Source from nearest canvas edge — feels like the line is drawn from offscreen
        const distLeft = tx;
        const distRight = W - tx;
        const distTop = ty;
        const distBottom = H - ty;
        const minD = Math.min(distLeft, distRight, distTop, distBottom);
        let sx = tx;
        let sy = ty;
        if (minD === distLeft) sx = -10;
        else if (minD === distRight) sx = W + 10;
        else if (minD === distTop) sy = -10;
        else sy = H + 10;
        p.streams.push({
          sx,
          sy,
          tx,
          ty,
          t: 0,
          speed: 0.012 + Math.random() * 0.006,
        });
      }
    }

    function spawnEmber(p: Panel) {
      // Single ember drifts up from a panel intersection node — niche idle motion.
      embers.push({
        x: p.cx + (Math.random() - 0.5) * p.w * 0.4,
        y: p.cy + p.h / 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.25 - Math.random() * 0.2,
        life: 0,
        maxLife: 1400 + Math.random() * 600,
      });
    }

    // ── Resize via parent (Error #44) ───────────────────────────────────────
    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: canvas.offsetWidth, height: canvas.offsetHeight };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(getLayout(w, h));
    }

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    // ── Draw helpers ────────────────────────────────────────────────────────
    function drawStreamLine(s: StreamLine, alpha: number) {
      if (!ctx) return;
      // Particle traveling along the line — renders as a small bright dot with halo.
      const x = s.sx + (s.tx - s.sx) * s.t;
      const y = s.sy + (s.ty - s.sy) * s.t;
      const [ar, ag, ab] = colors.accent;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ar},${ag},${ab},${alpha.toFixed(2)})`;
      ctx.shadowColor = `rgb(${ar},${ag},${ab})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }

    function drawPanelFrame(p: Panel) {
      if (!ctx || p.rise < 0.02) return;
      const eased = p.rise; // already eased
      const halfW = (p.w * 0.92 * eased) / 2;
      const halfH = (p.h * 0.92 * eased) / 2;
      const inset = 6; // inner panel reveal lip
      const [r, g, b] = heatRGB(p.coolingT, colors);
      const glow = Math.max(0, 1 - p.coolingT);
      const blur = layout.isMobile ? glow * 14 + 2 : glow * 22 + 3;

      ctx.save();
      ctx.shadowColor = `rgb(${r},${g},${b})`;
      ctx.shadowBlur = blur;
      ctx.lineCap = "square";
      ctx.lineJoin = "miter";

      // Outer frame — heavy beam
      ctx.strokeStyle = `rgba(${r},${g},${b},${(0.55 + glow * 0.35).toFixed(2)})`;
      ctx.lineWidth = layout.isMobile ? 2.2 : 2.8;
      ctx.beginPath();
      ctx.rect(p.cx - halfW, p.cy - halfH, halfW * 2, halfH * 2);
      ctx.stroke();

      // Inner reveal — coffered "step" effect, only after partial rise
      if (eased > 0.55 && halfW - inset > 4 && halfH - inset > 4) {
        const innerAlpha =
          (eased - 0.55) / 0.45 * (0.32 + glow * 0.28);
        ctx.strokeStyle = `rgba(${r},${g},${b},${innerAlpha.toFixed(2)})`;
        ctx.lineWidth = layout.isMobile ? 1.1 : 1.4;
        ctx.shadowBlur = blur * 0.5;
        ctx.beginPath();
        ctx.rect(
          p.cx - halfW + inset,
          p.cy - halfH + inset,
          (halfW - inset) * 2,
          (halfH - inset) * 2
        );
        ctx.stroke();
      }

      // Corner intersection nodes — small bright pulses
      if (eased > 0.85) {
        const nodeAlpha = (eased - 0.85) / 0.15;
        const pulse =
          0.7 + Math.sin(performance.now() * 0.0028 + p.cx * 0.01) * 0.3;
        const [ar, ag, ab] = colors.accent;
        ctx.shadowBlur = 9;
        ctx.shadowColor = `rgb(${ar},${ag},${ab})`;
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${(nodeAlpha * pulse * 0.85).toFixed(2)})`;
        const nodeR = layout.isMobile ? 1.6 : 2;
        for (const [nx, ny] of [
          [p.cx - halfW, p.cy - halfH],
          [p.cx + halfW, p.cy - halfH],
          [p.cx + halfW, p.cy + halfH],
          [p.cx - halfW, p.cy + halfH],
        ]) {
          ctx.beginPath();
          ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }

    function drawArc(W: number, H: number, t: number) {
      if (!ctx) return;
      // Logo-swoosh echo — full-width arc sweeping under the grid.
      // Only the leading edge of the arc draws each frame (progressive reveal).
      const [pr, pg, pb] = colors.primary;
      const yMid = layout.startY + layout.panelH * layout.rows + 18;
      const yPeak = layout.startY + layout.panelH * layout.rows * 0.55;
      const xL = layout.startX - 12;
      const xR = layout.startX + layout.panelW * layout.cols + 12;
      const reveal = Math.min(1, t);

      ctx.save();
      ctx.beginPath();
      // Quadratic bezier — flat-arc echoing the Anjo logo swoosh
      ctx.moveTo(xL, yMid);
      const xEnd = xL + (xR - xL) * reveal;
      const xControl = xL + ((xR - xL) * reveal) / 2;
      const yControl = yPeak + (1 - reveal) * 8;
      ctx.quadraticCurveTo(xControl, yControl, xEnd, yMid);
      ctx.strokeStyle = `rgba(${pr},${pg},${pb},${(0.6 * (1 - Math.pow(t - 0.7, 2) * 1.5)).toFixed(3)})`;
      ctx.lineWidth = layout.isMobile ? 2.5 : 3.5;
      ctx.lineCap = "round";
      ctx.shadowColor = `rgb(${pr},${pg},${pb})`;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();
    }

    function drawEmbers(dt: number) {
      if (!ctx) return;
      const [ar, ag, ab] = colors.accent;
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life += dt;
        e.x += e.vx * dt * 0.06;
        e.y += e.vy * dt * 0.06;
        if (e.life >= e.maxLife) {
          embers.splice(i, 1);
          continue;
        }
        const lt = e.life / e.maxLife;
        const alpha = lt < 0.2 ? lt / 0.2 : 1 - (lt - 0.2) / 0.8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${(alpha * 0.7).toFixed(2)})`;
        ctx.shadowColor = `rgb(${ar},${ag},${ab})`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    // ── Reduced-motion: render single static frame and bail ─────────────────
    if (reduced) {
      // Build one frame and never animate — frames already settled by build().
      const draw = () => {
        const W = canvas.width / (window.devicePixelRatio || 1);
        const H = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, W, H);
        for (const p of panels) drawPanelFrame(p);
        drawArc(W, H, 1);
      };
      draw();
      return () => {
        ro.disconnect();
      };
    }

    // ── Main tick ───────────────────────────────────────────────────────────
    let lastNow = 0;
    function tick(now: number) {
      if (!canvas || !ctx) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (t0 === null) t0 = now;
      const elapsed = now - t0;
      const dt = lastNow ? now - lastNow : 16;
      lastNow = now;

      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, W, H);

      // Update phase per panel
      let lastRiseEnd = 0;
      for (const p of panels) {
        if (p.phase === "wait" && elapsed >= p.startAt) {
          p.phase = "stream";
          spawnStreams(p, W, H);
        }
        if (p.phase === "stream") {
          for (const s of p.streams) {
            s.t = Math.min(1, s.t + s.speed);
          }
          if (elapsed >= p.riseAt) {
            p.phase = "rise";
            p.streams = [];
          }
        }
        if (p.phase === "rise") {
          const rt = Math.min(1, (elapsed - p.riseAt) / RISE_MS);
          p.rise = springOut(rt);
          if (rt >= 1) {
            p.rise = 1;
            p.phase = "settle";
          }
        }
        if (p.phase === "rise" || p.phase === "settle") {
          p.coolingT = Math.min(
            1,
            Math.max(0, (elapsed - p.riseAt - 60) / COOL_MS)
          );
        }
        const myEnd = p.riseAt + RISE_MS;
        if (myEnd > lastRiseEnd) lastRiseEnd = myEnd;
      }

      // Schedule the swoosh arc once last panel finishes rising
      if (arcAt < 0 && elapsed > lastRiseEnd + 220) {
        arcAt = elapsed;
      }

      // Draw stream particles
      for (const p of panels) {
        if (p.phase !== "stream") continue;
        for (const s of p.streams) {
          const alpha = s.t < 0.12 ? s.t / 0.12 : s.t > 0.88 ? (1 - s.t) / 0.12 : 1;
          drawStreamLine(s, alpha);
        }
      }

      // Draw panels
      for (const p of panels) drawPanelFrame(p);

      // Draw the swoosh arc
      if (arcAt >= 0) {
        const at = Math.min(1.4, (elapsed - arcAt) / ARC_MS);
        if (at < 1.4) drawArc(W, H, Math.min(1, at));
      }

      // Idle: emit embers from random settled panel intersections, breathing pulse
      const allSettled = panels.every((p) => p.phase === "settle");
      if (allSettled) {
        // Breathing on coolingT — keep settled value gently oscillating
        for (const p of panels) {
          const breathe =
            Math.sin(elapsed * 0.0009 + p.cx * 0.01) * 0.025;
          p.coolingT = 0.92 + breathe;
        }
        // Spawn ember occasionally (rate-limited by ember count)
        if (embers.length < (layout.isMobile ? 4 : 8) && Math.random() < 0.025) {
          const p = panels[Math.floor(Math.random() * panels.length)];
          spawnEmber(p);
        }
      }

      drawEmbers(dt);

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
