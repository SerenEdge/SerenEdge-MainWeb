"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { processSteps } from "@/data/process";

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;

    const rows = container.querySelectorAll<HTMLElement>(".ps-row");
    const timelines: gsap.core.Timeline[] = [];

    rows.forEach((row) => {
      const line = row.querySelector<HTMLElement>(".ps-line");
      const num  = row.querySelector<HTMLElement>(".ps-num");
      const body = row.querySelector<HTMLElement>(".ps-body");
      const meta = row.querySelector<HTMLElement>(".ps-meta");
      if (!line || !num || !body || !meta) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          once: true,
          onEnter: () => row.classList.add("in"),
        },
      });

      tl.fromTo(line,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1, ease: "expo.out" }
        )
        .fromTo(num,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "expo.out" },
          "-=0.55"
        )
        .fromTo(body,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, ease: "expo.out" },
          "-=0.6"
        )
        .fromTo(meta,
          { x: 28, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
          "-=0.7"
        );

      timelines.push(tl);
    });

    /* Active step — highlight whichever row occupies the center band */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle("active", e.isIntersecting));
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    rows.forEach((r) => io.observe(r));

    ScrollTrigger.refresh();
    return () => {
      timelines.forEach((t) => t.kill());
      io.disconnect();
    };
  }, []);

  return (
    <section className="process-section" id="process">
      <div className="section-head">
        <div>
          <div className="section-label">02 / How we work</div>
          <h2 className="section-title">
            From &ldquo;what if&rdquo; to <em>in production</em>, in four steps.
          </h2>
        </div>
        <p className="section-aside">
          Every engagement runs the same way. Predictable cadence, transparent progress,
          no agency-deck fluff.
        </p>
      </div>

      <div className="process-steps" ref={stepsRef}>
        {processSteps.map((step) => (
          <div key={step.id} className="ps-row">
            <div className="ps-line" />
            <div className="ps-num">{step.num}</div>
            <div className="ps-body">
              <div className="ps-tag">
                <span>{step.label}</span>
                <em>{step.labelAccent}</em>
              </div>
              <h3>
                {step.headline} <em>{step.headlineAccent}</em>
              </h3>
              <p>{step.body}</p>
            </div>
            <dl className="ps-meta">
              {step.meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
