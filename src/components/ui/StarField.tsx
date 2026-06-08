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
  age: number;
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
  const angle = (15 + Math.random() * 32) * (Math.PI / 180); // 15–47° below horizontal
  const speed = isComet ? 2.2 + Math.random() * 1.8 : 4.5 + Math.random() * 3.5;

  return {
    x:       Math.random() * w * 0.40,
    y:       Math.random() * skyH * 0.45,
    vx:      Math.cos(angle) * speed,
    vy:      Math.sin(angle) * speed,
    tailLen: isComet ? 130 + Math.random() * 100 : 58 + Math.random() * 70,
    glow:    isComet ? 8 : 3,
    alpha:   isComet ? 0.90 : 0.76,
    decay:   isComet
               ? 0.0022 + Math.random() * 0.0018
               : 0.007  + Math.random() * 0.006,
    age:     0,
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
    let nextWish  = 300;  // first wish star ~5 s in
    let nextComet = 660;  // first comet ~11 s in

    function resize() {
      w    = canvas.offsetWidth;
      h    = canvas.offsetHeight;
      if (!w || !h) return;
      skyH = h * 0.60; // bottom 2/5 is ground — streaks stay in top 3/5
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

      // soft fade-in over first 12 frames
      const fadeIn = Math.min(1, s.age / 12);
      // soft fade-out before reaching ground (last 18% of sky height)
      const fadeGround = skyH > 0
        ? Math.max(0, 1 - Math.max(0, s.y - skyH * 0.82) / (skyH * 0.18))
        : 1;
      const alpha = s.alpha * fadeIn * fadeGround;

      const grad = context.createLinearGradient(s.x, s.y, tx, ty);
      grad.addColorStop(0,    `rgba(255,255,255,${alpha.toFixed(3)})`);
      grad.addColorStop(0.18, `rgba(210,228,255,${(alpha * 0.52).toFixed(3)})`);
      grad.addColorStop(0.6,  `rgba(190,215,255,${(alpha * 0.16).toFixed(3)})`);
      grad.addColorStop(1,    `rgba(180,210,255,0)`);

      context.save();
      context.lineWidth   = s.isComet ? 1.6 : 1.1;
      context.strokeStyle = grad;
      context.shadowColor = "rgba(200,225,255,0.6)";
      context.shadowBlur  = s.glow;

      context.beginPath();
      context.moveTo(s.x, s.y);
      context.lineTo(tx, ty);
      context.stroke();

      // bright head
      context.shadowBlur  = s.isComet ? 16 : 6;
      context.shadowColor = "rgba(225,240,255,1)";
      context.fillStyle   = `rgba(255,255,255,${alpha.toFixed(3)})`;
      context.beginPath();
      context.arc(s.x, s.y, s.isComet ? 1.7 : 0.9, 0, Math.PI * 2);
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

      // wish stars — every 6–10 s at 60 fps, max 1 active
      if (tick >= nextWish) {
        if (streaks.filter(s => !s.isComet).length < 1)
          streaks.push(spawnStreak(w, skyH, false));
        nextWish = tick + 360 + Math.floor(Math.random() * 240);
      }

      // comets — every 12–20 s, max 1 active
      if (tick >= nextComet) {
        if (streaks.filter(s => s.isComet).length < 1)
          streaks.push(spawnStreak(w, skyH, true));
        nextComet = tick + 720 + Math.floor(Math.random() * 480);
      }

      // draw & update streaks
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.age++;
        drawStreak(s);
        s.x     += s.vx;
        s.y     += s.vy;
        s.alpha -= s.decay;
        if (s.alpha <= 0 || s.y > skyH || s.x > w + s.tailLen)
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
