"use client";
import { useEffect, useRef } from "react";

interface TwinkleStar {
  x: number; y: number; r: number;
  base: number; phase: number; rate: number;
}

interface Streak {
  x: number; y: number;
  vx: number; vy: number;
  tailLen: number;
  glow: number;
  alpha: number;
  decay: number;
  isComet: boolean;
}

function makeStars(count: number, w: number, skyH: number): TwinkleStar[] {
  return Array.from({ length: count }, () => ({
    x:     Math.random() * w,
    y:     Math.random() * skyH,
    r:     0.3 + Math.random() * 1.1,
    base:  0.18 + Math.random() * 0.58,
    phase: Math.random() * Math.PI * 2,
    rate:  0.004 + Math.random() * 0.018,
  }));
}

function spawnStreak(w: number, skyH: number, isComet: boolean): Streak {
  // Always left→right. Start from left 35% of sky, upper 50% of sky height.
  const angle = (22 + Math.random() * 24) * (Math.PI / 180); // 22–46° below horizontal
  const speed = isComet ? 4 + Math.random() * 3 : 9 + Math.random() * 7;

  return {
    x:       Math.random() * w * 0.35,
    y:       Math.random() * skyH * 0.50,
    vx:      Math.cos(angle) * speed,   // always positive → rightward
    vy:      Math.sin(angle) * speed,   // always positive → downward
    tailLen: isComet ? 160 + Math.random() * 90 : 44 + Math.random() * 52,
    glow:    isComet ? 7 : 2.5,
    alpha:   isComet ? 0.95 : 0.82,
    decay:   isComet
               ? 0.004 + Math.random() * 0.004
               : 0.013 + Math.random() * 0.01,
    isComet,
  };
}

export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const canvas: HTMLCanvasElement         = el;
    const context: CanvasRenderingContext2D  = ctx;
    const dpr = window.devicePixelRatio || 1;

    let w = 0, h = 0, skyH = 0, tick = 0, rafId = 0;
    let twinkleStars: TwinkleStar[] = [];
    const streaks: Streak[] = [];
    let nextWish  = 180;  // first wish star ~3 s in
    let nextComet = 360;  // first comet ~6 s in

    function resize() {
      w    = canvas.offsetWidth;
      h    = canvas.offsetHeight;
      if (!w || !h) return;
      skyH = h * 0.60; // ground is bottom 2/5 (40%), sky is top 60%
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      twinkleStars = makeStars(88, w, skyH);
    }

    function drawStreak(s: Streak) {
      const mag = Math.hypot(s.vx, s.vy);
      const nx  = s.vx / mag;
      const ny  = s.vy / mag;
      const tx  = s.x - nx * s.tailLen;
      const ty  = s.y - ny * s.tailLen;

      const grad = context.createLinearGradient(s.x, s.y, tx, ty);
      grad.addColorStop(0,   `rgba(255,255,255,${s.alpha})`);
      grad.addColorStop(0.2, `rgba(200,220,255,${(s.alpha * 0.55).toFixed(3)})`);
      grad.addColorStop(1,   `rgba(180,210,255,0)`);

      context.save();
      context.lineWidth   = s.isComet ? 1.8 : 1.2;
      context.strokeStyle = grad;
      context.shadowColor = "rgba(200,225,255,0.75)";
      context.shadowBlur  = s.glow;

      context.beginPath();
      context.moveTo(s.x, s.y);
      context.lineTo(tx, ty);
      context.stroke();

      // bright head
      context.shadowBlur   = s.isComet ? 14 : 5;
      context.shadowColor  = "rgba(220,235,255,1)";
      context.fillStyle    = `rgba(255,255,255,${s.alpha})`;
      context.beginPath();
      context.arc(s.x, s.y, s.isComet ? 1.9 : 1.1, 0, Math.PI * 2);
      context.fill();

      context.restore();
    }

    function frame() {
      context.clearRect(0, 0, w, h);
      tick++;

      // twinkling background stars
      for (const s of twinkleStars) {
        const a = s.base + Math.sin(tick * s.rate + s.phase) * 0.17;
        context.save();
        context.globalAlpha = Math.max(0.04, a);
        context.fillStyle   = "#deeeff";
        context.beginPath();
        context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      // spawn wish stars  (every 4–6 s at 60 fps, max 1 active)
      if (tick >= nextWish) {
        if (streaks.filter(s => !s.isComet).length < 1)
          streaks.push(spawnStreak(w, skyH, false));
        nextWish = tick + 240 + Math.floor(Math.random() * 120);
      }

      // spawn comets  (every 8–14 s, max 1 active)
      if (tick >= nextComet) {
        if (streaks.filter(s => s.isComet).length < 1)
          streaks.push(spawnStreak(w, skyH, true));
        nextComet = tick + 480 + Math.floor(Math.random() * 360);
      }

      // draw & update streaks
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        drawStreak(s);
        s.x     += s.vx;
        s.y     += s.vy;
        s.alpha -= s.decay;
        if (s.alpha <= 0 || s.y > skyH + s.tailLen || s.x < -s.tailLen || s.x > w + s.tailLen)
          streaks.splice(i, 1);
      }

      rafId = requestAnimationFrame(frame);
    }

    resize();
    rafId = requestAnimationFrame(frame);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 2,
      }}
    />
  );
}
