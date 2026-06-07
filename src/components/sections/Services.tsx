"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { services } from "@/data/services";

export function Services() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef   = useRef<HTMLElement | null>(null);
  const pctRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const getDistance = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + 40);

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => "+=" + getDistance(),
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const bar = barRef.current;
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
          const pct = pctRef.current;
          if (pct) pct.textContent = String(Math.round(self.progress * 100)).padStart(2, "0");
        },
      },
    });

    ScrollTrigger.refresh();
    return () => { tween.kill(); };
  }, []);

  return (
    <section className="services-section" id="services">
      <div className="section-head">
        <div>
          <div className="section-label">Services</div>
          <h2 className="section-title">
            Six disciplines.<br />One <em>continuous</em> team.
          </h2>
        </div>
        <p className="section-aside">
          We don't hand you off between agencies. The same people who scope your project
          also write the firmware, train the model and push to production.
        </p>
      </div>

      <div className="services-track-wrap" ref={wrapRef}>
        <div className="services-pin">
          <div className="services-track" ref={trackRef}>
            {services.map((svc) => (
              <article
                key={svc.id}
                className="svc-card"
                style={svc.dashed ? { borderStyle: "dashed" } : undefined}
              >
                <div>
                  <div className="svc-num">{svc.num}</div>
                  <h3>
                    {svc.title} <em>{svc.titleAccent}</em>
                  </h3>
                  <p className="svc-desc">{svc.description}</p>
                </div>
                <div>
                  {svc.tags.length > 0 && (
                    <div className="svc-tags">
                      {svc.tags.map((t) => (
                        <span key={t} className="svc-tag">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="svc-foot">
                    {svc.footer} <span className="svc-arr">→</span>
                  </div>
                </div>
                {svc.glyph && (
                  <svg
                    className="svc-glyph"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    dangerouslySetInnerHTML={{ __html: svc.glyph }}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="services-progress">
        <span>Drag · scroll · or press →</span>
        <div className="bar">
          <i className="bar-fill" ref={(el) => { barRef.current = el; }} />
        </div>
        <span>
          <span ref={pctRef}>00</span>%
        </span>
      </div>
    </section>
  );
}
