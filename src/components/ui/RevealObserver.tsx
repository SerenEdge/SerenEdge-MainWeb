"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "-10% 0px -10% 0px" }
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => io.observe(el));
    };

    observe();
    // Re-scan after a short delay to catch late-mounted elements
    const id = setTimeout(observe, 400);

    return () => { io.disconnect(); clearTimeout(id); };
  }, []);

  return null;
}
