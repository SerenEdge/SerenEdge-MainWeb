"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const brand  = el.querySelector(".hero-brand");
    const slogan = el.querySelector(".hero-slogan");
    const desc   = el.querySelector(".hero-desc");
    const hint   = el.querySelector(".hero-scroll-hint");

    gsap.set([brand, slogan, desc], { opacity: 0, y: 20 });
    gsap.set(hint, { opacity: 0 });

    gsap.to(brand,  { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: "expo.out" });
    gsap.to(slogan, { opacity: 1, y: 0, duration: 1.0, delay: 0.65, ease: "expo.out" });
    gsap.to(desc,   { opacity: 1, y: 0, duration: 0.8, delay: 0.85, ease: "expo.out" });
    gsap.to(hint,   { opacity: 1,       duration: 0.6, delay: 1.2,  ease: "power2.out" });
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <Image
        src="/Hero Background avif.avif"
        alt=""
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <span className="hero-brand">SerenEdge</span>
        <h1 className="hero-slogan">for each node.</h1>
        <p className="hero-desc">
          A deeply technical IT studio.<br />
          Web&nbsp;·&nbsp;IoT&nbsp;·&nbsp;Automation&nbsp;·&nbsp;ML.
        </p>
      </div>

      <div className="hero-scroll-hint">
        <span className="hero-scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
