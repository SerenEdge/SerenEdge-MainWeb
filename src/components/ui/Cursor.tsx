"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactive = "a, button, .svc-card, .proj, .logo, .founder-name, input, textarea";
    const grow  = (e: MouseEvent) => { if ((e.target as Element).closest(interactive)) el.classList.add("lg"); };
    const shrink = (e: MouseEvent) => { if ((e.target as Element).closest(interactive)) el.classList.remove("lg"); };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", grow);
    document.addEventListener("mouseout",  shrink);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", grow);
      document.removeEventListener("mouseout",  shrink);
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
