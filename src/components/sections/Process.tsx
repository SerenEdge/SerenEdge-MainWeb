"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/data/process";

export function Process() {
  const flowRef  = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  /* Spine fill + row reveal via IntersectionObserver */
  useEffect(() => {
    const flow  = flowRef.current;
    const spine = spineRef.current;
    if (!flow || !spine) return;

    const updateSpine = () => {
      const r    = flow.getBoundingClientRect();
      const vh   = window.innerHeight;
      const pct  = Math.max(0, Math.min(1, Math.max(0, vh * 0.5 - r.top) / r.height));
      spine.style.setProperty("--spine", (pct * 100).toFixed(1) + "%");
    };
    updateSpine();
    window.addEventListener("scroll", updateSpine, { passive: true });
    window.addEventListener("resize", updateSpine);

    const rows = flow.querySelectorAll<HTMLElement>(".pf-row");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle("in", e.isIntersecting);
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
    );
    rows.forEach((r) => io.observe(r));

    return () => {
      window.removeEventListener("scroll", updateSpine);
      window.removeEventListener("resize", updateSpine);
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

      <div className="process-flow" ref={flowRef}>
        <div className="pf-spine" ref={spineRef} aria-hidden="true" />

        {processSteps.map((step, idx) => {
          const reversed = idx % 2 !== 0;
          return (
            <article key={step.id} className={`pf-row${reversed ? " pf-rev" : ""}`}>
              {reversed ? (
                <>
                  <div className="pf-side pf-content-cell">
                    <StepContent step={step} />
                  </div>
                  <div className="pf-dot" aria-hidden="true" />
                  <div className="pf-side pf-vis-cell">
                    <StepVis step={step} />
                  </div>
                </>
              ) : (
                <>
                  <div className="pf-side pf-vis-cell">
                    <StepVis step={step} />
                  </div>
                  <div className="pf-dot" aria-hidden="true" />
                  <div className="pf-side pf-content-cell">
                    <StepContent step={step} />
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function StepContent({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <>
      <div className="pf-label">
        {step.label}
        <em>{step.labelAccent}</em>
      </div>
      <h3>
        {step.headline} <em>{step.headlineAccent}</em>
      </h3>
      <p>{step.body}</p>
      <dl className="pf-meta">
        {step.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function StepVis({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <div className="pf-vis">
      <span className="pf-num">{step.num}</span>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{ color: "var(--accent)" }}
        dangerouslySetInnerHTML={{ __html: step.glyph }}
      />
    </div>
  );
}
