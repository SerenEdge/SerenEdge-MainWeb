"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { services } from "@/data/services";

export function Services() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLElement | null>(null);
  const pctRef     = useRef<HTMLSpanElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /* ── Mobile: native snap-scroll with dot indicator ─────────────────── */
    if (window.innerWidth <= 768) {
      const handleScroll = () => {
        const cards = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0, minDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        setActiveSlide(closest);
      };
      track.addEventListener("scroll", handleScroll, { passive: true });
      return () => track.removeEventListener("scroll", handleScroll);
    }

    /* ── Desktop: GSAP horizontal scroll pin ───────────────────────────── */
    const wrap = wrapRef.current;
    if (!wrap) return;

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

  function scrollToSlide(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards[i]) return;
    track.scrollTo({ left: cards[i].offsetLeft - 20, behavior: "smooth" });
  }

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

      {/* Desktop progress bar */}
      <div className="services-progress">
        <span>Drag · scroll · or press →</span>
        <div className="bar">
          <i className="bar-fill" ref={(el) => { barRef.current = el; }} />
        </div>
        <span>
          <span ref={pctRef}>00</span>%
        </span>
      </div>

      {/* Mobile dot indicator */}
      <div className="svc-dots" aria-hidden="true">
        {services.map((_, i) => (
          <button
            key={i}
            className={`svc-dot${i === activeSlide ? " active" : ""}`}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to service ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
