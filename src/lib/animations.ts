"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function revealText(
  elements: HTMLElement[],
  trigger: Element,
  options?: { stagger?: number; delay?: number }
) {
  if (prefersReducedMotion()) {
    elements.forEach((el) => gsap.set(el, { y: 0, opacity: 1 }));
    return;
  }
  ScrollTrigger.create({
    trigger,
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(
        elements,
        { y: "105%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: options?.stagger ?? 0.06,
          delay: options?.delay ?? 0,
        }
      );
    },
    once: true,
  });
}

export function fadeSlideIn(
  elements: Element[] | NodeListOf<Element>,
  trigger: Element,
  options?: { stagger?: number; y?: number; delay?: number }
) {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(
    elements,
    { opacity: 0, y: options?.y ?? 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: options?.stagger ?? 0.1,
      delay: options?.delay ?? 0,
      scrollTrigger: {
        trigger,
        start: "top 80%",
        once: true,
      },
    }
  );
}

export function counterUp(
  element: HTMLElement,
  end: number,
  duration = 2,
  suffix = ""
) {
  if (prefersReducedMotion()) {
    element.textContent = end + suffix;
    return;
  }
  const obj = { val: 0 };
  gsap.to(obj, {
    val: end,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.val).toLocaleString() + suffix;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
  });
}

export function drawSvgLine(
  path: SVGPathElement | SVGLineElement,
  trigger: Element
) {
  if (prefersReducedMotion()) {
    gsap.set(path, { strokeDashoffset: 0 });
    return;
  }
  const length = (path as SVGPathElement).getTotalLength?.() ?? 0;
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
    },
  });
}

export function magneticHover(
  element: HTMLElement,
  strength = 0.4
) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    gsap.to(element, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  };
  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);
  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}
