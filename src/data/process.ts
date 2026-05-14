import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    num: "01",
    label: "STEP 01 · ",
    labelAccent: "DISCOVER",
    headline: "We listen first.",
    headlineAccent: "Hard.",
    body: "A 90-minute call where you talk and we map. We don't sell yet, we don't quote yet. We figure out what problem you're actually trying to solve — which is rarely the one in your email.",
    meta: [
      { label: "Duration", value: "1 week" },
      { label: "Output", value: "Problem doc + scope" },
      { label: "Cost", value: "Free" },
    ],
    glyph: `<circle cx="100" cy="100" r="88" stroke-dasharray="2 6" opacity="0.35"/><circle cx="100" cy="100" r="60" stroke-dasharray="2 6" opacity="0.55"/><circle cx="100" cy="100" r="28"/><circle cx="100" cy="100" r="4" fill="currentColor"/>`,
  },
  {
    id: "design",
    num: "02",
    label: "STEP 02 · ",
    labelAccent: "DESIGN",
    headline: "Architect, then",
    headlineAccent: "show.",
    body: "Wireframes, system diagrams, data models, hardware BOMs — whatever the project demands. You see the shape of the thing before we write production code.",
    meta: [
      { label: "Duration", value: "1–2 weeks" },
      { label: "Output", value: "Spec + prototype" },
      { label: "Reviews", value: "Weekly" },
    ],
    glyph: `<rect x="30" y="30" width="60" height="40" rx="3"/><rect x="110" y="30" width="60" height="40" rx="3"/><rect x="30" y="130" width="60" height="40" rx="3"/><rect x="110" y="130" width="60" height="40" rx="3"/><path d="M90 50 L110 50 M90 150 L110 150 M60 70 L60 130 M140 70 L140 130" stroke-dasharray="3 3"/>`,
  },
  {
    id: "build",
    num: "03",
    label: "STEP 03 · ",
    labelAccent: "BUILD",
    headline: "Heads down.",
    headlineAccent: "Daily demos.",
    body: "The unsexy part. We code, you watch progress in a shared board. Every Friday: a working build you can click, ship, or break. No “trust us, it’s almost done.”",
    meta: [
      { label: "Duration", value: "3–12 weeks" },
      { label: "Cadence", value: "Daily commits" },
      { label: "Demos", value: "Every Friday" },
    ],
    glyph: `<rect x="20" y="40" width="160" height="120" rx="3"/><path d="M20 60 L180 60"/><circle cx="32" cy="50" r="2" fill="currentColor"/><circle cx="40" cy="50" r="2" fill="currentColor"/><circle cx="48" cy="50" r="2" fill="currentColor"/><path d="M32 78 L70 78 M32 92 L100 92 M32 106 L60 106 M44 120 L90 120 M44 134 L110 134 M32 148 L80 148" stroke-linecap="round"/>`,
  },
  {
    id: "ship",
    num: "04",
    label: "STEP 04 · ",
    labelAccent: "SHIP & STAY",
    headline: "Deploy. Train.",
    headlineAccent: "Stick around.",
    body: "We install on-site if needed, train your team, and stay reachable for 90 days post-launch. After that, optional retainers — but you’ll never get ghosted.",
    meta: [
      { label: "Launch", value: "+90 day support" },
      { label: "Handover", value: "Docs + training" },
      { label: "Retainer", value: "Optional" },
    ],
    glyph: `<path d="M40 160 L100 40 L160 160 Z"/><circle cx="100" cy="110" r="26" stroke-dasharray="3 4"/><path d="M100 110 L122 132" stroke-width="2"/><circle cx="122" cy="132" r="3" fill="currentColor"/>`,
  },
];
