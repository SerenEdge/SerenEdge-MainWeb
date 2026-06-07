"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  drift: number;
  glow: boolean;
  phase: number;
  twinkleRate: number;
}

function spawn(w: number, h: number, randomY: boolean): Star {
  return {
    x:           Math.random() * w,
    y:           randomY ? Math.random() * h : -(2 + Math.random() * 20),
    r:           0.4 + Math.random() * 1.2,
    speed:       0.22 + Math.random() * 0.6,
    opacity:     0.35 + Math.random() * 0.5,
    drift:       (Math.random() - 0.5) * 0.1,
    glow:        Math.random() < 0.28,
    phase:       Math.random() * Math.PI * 2,
    twinkleRate: 0.005 + Math.random() * 0.013,
  };
}

export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    /* Capture as non-nullable so nested fns satisfy TS */
    const canvas: HTMLCanvasElement       = el;
    const context: CanvasRenderingContext2D = ctx;

    const dpr   = window.devicePixelRatio || 1;
    const COUNT = 52;
    let w = 0, h = 0, rafId = 0, tick = 0;
    let stars: Star[] = [];

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: COUNT }, () => spawn(w, h, true));
    }

    function frame() {
      context.clearRect(0, 0, w, h);
      tick++;

      for (const s of stars) {
        const alpha = s.opacity + Math.sin(tick * s.twinkleRate + s.phase) * 0.11;

        context.save();
        context.globalAlpha = Math.max(0.06, alpha);

        if (s.glow) {
          context.shadowColor = "rgba(180, 210, 255, 0.9)";
          context.shadowBlur  = s.r * 5;
        }

        context.fillStyle = "#ddeeff";
        context.beginPath();
        context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        context.fill();
        context.restore();

        s.y += s.speed;
        s.x += s.drift;

        if (s.y > h + 4)  Object.assign(s, spawn(w, h, false));
        if (s.x < -4)     s.x = w + 2;
        if (s.x > w + 4)  s.x = -2;
      }

      rafId = requestAnimationFrame(frame);
    }

    resize();
    rafId = requestAnimationFrame(frame);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        2,
      }}
    />
  );
}
