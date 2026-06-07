"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const words = sectionRef.current?.querySelectorAll<HTMLElement>(".hero h1 .word span");
    if (!words?.length) return;

    gsap.to(Array.from(words), {
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.06,
      delay: 0.15,
    });

    gsap.from(
      [
        sectionRef.current?.querySelector(".hero-eyebrow"),
        sectionRef.current?.querySelector(".hero-sub"),
        ...(Array.from(sectionRef.current?.querySelectorAll(".hero-meta .col") ?? []) as Element[]),
      ].filter(Boolean),
      {
        opacity: 0,
        y: 18,
        duration: 0.9,
        stagger: 0.08,
        delay: 0.7,
        ease: "expo.out",
      }
    );
  }, []);

  return (
    <section className="hero v-a" ref={sectionRef}>
      {/* Variant A — Statement */}
      <div className="hero-eyebrow">
        <span className="live-dot" />
        <span>Currently open · 3 projects in flight · accepting Q2 work</span>
      </div>

      <h1>
        {["Engineering", "solutions", "at", "the"].map((w) => (
          <span key={w} className="word">
            <span>{w} </span>
          </span>
        ))}
        <span className="word">
          <span>
            <em>edge</em>{" "}
          </span>
        </span>
        {["of", "what's", "possible."].map((w) => (
          <span key={w} className="word">
            <span>{w} </span>
          </span>
        ))}
      </h1>

      <div className="hero-sub">
        <p>
          SerenEdge is a small, deeply technical IT studio. We take on the problems
          other shops won't — web platforms, IoT, automation, custom systems, ML —
          and ship them end-to-end.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            <span className="dot" />
            Give us a problem
          </a>
          <a href="#work" className="btn">
            See work →
          </a>
        </div>
      </div>

      <div className="hero-meta">
        <div className="col">
          <strong>Based</strong>
          <span>Sri Lanka · GMT+5:30</span>
        </div>
        <div className="col">
          <strong>Stack-agnostic</strong>
          <span>Web · IoT · Embedded · ML · Cloud</span>
        </div>
        <div className="col">
          <strong>Reach us</strong>
          <span>dahamdissanayake05@gmail.com</span>
        </div>
        <div className="col">
          <strong>v2026.05</strong>
          <span>↓ scroll to begin</span>
        </div>
      </div>
    </section>
  );
}
