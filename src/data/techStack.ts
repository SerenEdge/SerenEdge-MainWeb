import type { TechItem } from "@/types";

export const techStack: TechItem[] = [
  { name: "Next.js",    icon: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>` },
  { name: "React",      icon: `<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>` },
  { name: "TypeScript", icon: `<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/><text x="12" y="16" text-anchor="middle" font-family="monospace" font-size="8" fill="var(--bg)" font-weight="700">TS</text>` },
  { name: "Python",     icon: `<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>` },
  { name: "Postgres",   icon: `<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>` },
  { name: "ESP32",      icon: `<rect x="2" y="8" width="20" height="10" rx="1"/><path d="M6 14h2M10 14h2M14 14h2"/>` },
  { name: "Docker",     icon: `<path d="M3 9l9-6 9 6-9 6z"/><path d="M3 9v6l9 6"/><path d="M21 9v6l-9 6"/>` },
  { name: "PyTorch",    icon: `<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>` },
  { name: "MQTT",       icon: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>` },
  { name: "Tailwind",   icon: `<path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>` },
  { name: "GSAP",       icon: `<path d="M4 4l16 16M20 4L4 20"/><circle cx="12" cy="12" r="2"/>` },
  { name: "Lenis",      icon: `<path d="M3 12c4 0 4-6 8-6s4 6 8 6"/><path d="M3 12c4 0 4 6 8 6s4-6 8-6"/>` },
];

export const testimonials = [
  {
    initials: "RP",
    quote: "They built our entire IoT pipeline in six weeks. I've worked with agencies that took six months to ship a landing page. SerenEdge is something else.",
    name: "Dr. R. Perera",
    role: "Founder · Healthtech Pilot",
  },
  {
    initials: "AM",
    quote: "What I loved: they pushed back on half my ideas — for the right reasons — and we ended up with a tighter system because of it.",
    name: "A. Mendis",
    role: "Ops Lead · Retail Group",
  },
  {
    initials: "JF",
    quote: "This team outshipped my last contractor by every measurable metric. Don't know how they do it. I'm just glad they do.",
    name: "J. Fernando",
    role: "CTO · Agritech Startup",
  },
];
