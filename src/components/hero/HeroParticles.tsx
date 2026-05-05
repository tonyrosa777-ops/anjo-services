"use client";

/**
 * HeroParticles — Layer 1 of the 3-layer hero stack.
 *
 * Trade-archetype ember + glimmer system. Per design-system.md §2 + §8:
 *   - red + amber palette (NEVER gold-on-red — anti-pattern #5)
 *   - ~145 particles total, 50% reduction on mobile (<768px)
 *   - ~58 of them are rising embers (vy < 0); rest are static glimmers that twinkle
 *
 * Renders at z-0, behind everything. No pointer events.
 *
 * Mobile: ResizeObserver on parent (Error #44). Particle count reduces 50%.
 * prefers-reduced-motion: renders single static frame and bails.
 *
 * Color pulled from CSS custom properties — no hard-coded hex.
 */

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleOffset: number;
  twinkleSpeed: number;
  hue: "primary" | "accent" | "neutral";
  rising: boolean;
}

interface BrandColors {
  primary: [number, number, number];
  accent: [number, number, number];
  textMuted: [number, number, number];
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
      textMuted: [122, 119, 112],
    };
  }
  const cs = getComputedStyle(document.documentElement);
  return {
    primary: parseHex(cs.getPropertyValue("--primary") || "#c8202c"),
    accent: parseHex(cs.getPropertyValue("--accent") || "#e8b04c"),
    textMuted: parseHex(cs.getPropertyValue("--text-muted") || "#7a7770"),
  };
}

export default function HeroParticles() {
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

    let raf = 0;
    let particles: Particle[] = [];
    let lastNow = 0;

    function build(W: number, H: number) {
      const isMobile = W < 768;
      const totalCount = isMobile ? 73 : 145;
      const emberCount = isMobile ? 29 : 58;

      particles = [];
      for (let i = 0; i < totalCount; i++) {
        const rising = i < emberCount;
        const hueRoll = Math.random();
        let hue: Particle["hue"];
        if (rising) {
          // Rising embers: 70% accent (warm), 25% primary (red), 5% neutral
          hue = hueRoll < 0.7 ? "accent" : hueRoll < 0.95 ? "primary" : "neutral";
        } else {
          // Static glimmers: 60% neutral, 30% accent, 10% primary
          hue = hueRoll < 0.6 ? "neutral" : hueRoll < 0.9 ? "accent" : "primary";
        }
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: rising ? (Math.random() - 0.5) * 0.06 : 0,
          vy: rising ? -(0.12 + Math.random() * 0.18) : 0,
          size: rising ? 0.9 + Math.random() * 1.1 : 0.6 + Math.random() * 0.9,
          baseAlpha: rising ? 0.35 + Math.random() * 0.35 : 0.18 + Math.random() * 0.32,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0008 + Math.random() * 0.0014,
          hue,
          rising,
        });
      }
    }

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
      build(w, h);
    }

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    function colorFor(p: Particle): [number, number, number] {
      if (p.hue === "primary") return colors.primary;
      if (p.hue === "accent") return colors.accent;
      return colors.textMuted;
    }

    if (reduced) {
      // Single static frame
      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        const [r, g, b] = colorFor(p);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.baseAlpha.toFixed(2)})`;
        ctx.fill();
      }
      return () => {
        ro.disconnect();
      };
    }

    function tick(now: number) {
      if (!canvas || !ctx) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = lastNow ? now - lastNow : 16;
      lastNow = now;

      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        if (p.rising) {
          p.x += p.vx * dt * 0.06;
          p.y += p.vy * dt * 0.06;
          // Wrap embers from top back to bottom
          if (p.y < -10) {
            p.y = H + 10;
            p.x = Math.random() * W;
          }
          if (p.x < -10) p.x = W + 10;
          if (p.x > W + 10) p.x = -10;
        }

        const twinkle =
          0.5 +
          0.5 * Math.sin(now * p.twinkleSpeed + p.twinkleOffset);
        const alpha = p.baseAlpha * (0.4 + 0.6 * twinkle);
        const [r, g, b] = colorFor(p);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
        if (p.rising && p.hue !== "neutral") {
          ctx.shadowColor = `rgb(${r},${g},${b})`;
          ctx.shadowBlur = 5;
        }
        ctx.fill();
        ctx.restore();
      }

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
