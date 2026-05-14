"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const stats = [
  { target: 14, decimals: 0, suffix: "+", label: "Projects shipped" },
  { target: 6,  decimals: 0, suffix: "",  label: "Disciplines covered" },
  { target: 9.4, decimals: 1, suffix: "K", label: "Hours coded" },
  { target: null, label: "Founder · small team behind", special: true },
];

export function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters = gridRef.current?.querySelectorAll<HTMLElement>("[data-target]");
    if (!counters?.length) return;

    counters.forEach((el) => {
      const target = parseFloat(el.dataset.target ?? "0");
      const decimals = parseInt(el.dataset.decimals ?? "0");
      const suffix = el.dataset.suffix ?? "";

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            obs.disconnect();
            gsap.fromTo(
              { v: 0 },
              { v: 0 },
              {
                v: target,
                duration: 2.2,
                ease: "expo.out",
                onUpdate: function () {
                  el.textContent = this.targets()[0].v.toFixed(decimals) + suffix;
                },
              }
            );
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
    });
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-grid" ref={gridRef}>
        {stats.map((s, i) => (
          <div key={i} className="stat reveal" data-delay={i > 0 ? String(i) : undefined}>
            <div className="stat-num">
              {s.special ? (
                <em>1</em>
              ) : (
                <span data-target={s.target} data-decimals={s.decimals} data-suffix={s.suffix}>
                  0{s.suffix}
                </span>
              )}
            </div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="stats-note">
        <em>// </em>
        undergrad-led · making changes · building production systems while everyone else is sleeping
      </div>
    </section>
  );
}
