import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "web",
    num: "01 / Service",
    title: "Web",
    titleAccent: "Development",
    description:
      "Marketing sites, dashboards, customer portals, SaaS products. Next.js, React, TypeScript — built for speed and maintainability.",
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    footer: "[ scope · design · ship ]",
    glyph: `<rect x="10" y="20" width="80" height="60" rx="4"/><path d="M10 32 L90 32"/><circle cx="18" cy="26" r="1.5" fill="currentColor"/><circle cx="24" cy="26" r="1.5" fill="currentColor"/><circle cx="30" cy="26" r="1.5" fill="currentColor"/>`,
  },
  {
    id: "iot",
    num: "02 / Service",
    title: "IoT",
    titleAccent: "Projects",
    description:
      "Sensor networks, device firmware, telemetry pipelines. From ESP32 prototype on a breadboard to fleet deployment.",
    tags: ["ESP32", "MQTT", "LoRaWAN", "PCB design"],
    footer: "[ sense · transmit · act ]",
    glyph: `<circle cx="50" cy="50" r="6"/><circle cx="50" cy="50" r="18"/><circle cx="50" cy="50" r="32"/><circle cx="50" cy="50" r="44"/>`,
  },
  {
    id: "automation",
    num: "03 / Service",
    title: "Automation",
    titleAccent: "Projects",
    description:
      "Replace manual workflows with code. Document processing, scheduling, factory PLC integration, internal RPA — anything humans shouldn't be repeating.",
    tags: ["Python", "n8n", "PLC", "APIs"],
    footer: "[ observe · automate · audit ]",
    glyph: `<circle cx="50" cy="50" r="22"/><path d="M50 28 L50 22 M50 78 L50 72 M28 50 L22 50 M78 50 L72 50 M34 34 L30 30 M70 70 L66 66 M70 34 L66 38 M34 66 L30 70"/>`,
  },
  {
    id: "systems",
    num: "04 / Service",
    title: "System",
    titleAccent: "Development",
    description:
      "Bespoke internal systems — inventory, scheduling, ERPs, point-of-sale, custom CRMs. Built to fit your operation, not the other way around.",
    tags: ["Node.js", ".NET", "Postgres", "Docker"],
    footer: "[ map · model · build ]",
    glyph: `<rect x="14" y="14" width="32" height="32"/><rect x="54" y="14" width="32" height="32"/><rect x="14" y="54" width="32" height="32"/><rect x="54" y="54" width="32" height="32"/><path d="M46 30 L54 30 M30 46 L30 54 M70 46 L70 54 M46 70 L54 70"/>`,
  },
  {
    id: "installations",
    num: "05 / Service",
    title: "System",
    titleAccent: "Installations",
    description:
      "On-site deployment, hardware setup, network configuration, training the team that'll use it. We don't just hand over a repo and disappear.",
    tags: ["On-site", "Networking", "Training", "Maintenance"],
    footer: "[ deploy · train · support ]",
    glyph: `<path d="M20 80 L50 20 L80 80 Z"/><path d="M35 60 L65 60"/><circle cx="50" cy="70" r="3" fill="currentColor"/>`,
  },
  {
    id: "ml",
    num: "06 / Service",
    title: "Machine Learning",
    titleAccent: "Models",
    description:
      "Computer vision, classification, forecasting, RAG over your data. From prototype Jupyter notebook to deployed inference service.",
    tags: ["PyTorch", "scikit-learn", "CV", "RAG / LLM"],
    footer: "[ collect · train · deploy ]",
    glyph: `<circle cx="20" cy="30" r="4"/><circle cx="20" cy="50" r="4"/><circle cx="20" cy="70" r="4"/><circle cx="50" cy="40" r="4"/><circle cx="50" cy="60" r="4"/><circle cx="80" cy="50" r="4"/><path d="M24 30 L46 40 M24 50 L46 40 M24 50 L46 60 M24 70 L46 60 M54 40 L76 50 M54 60 L76 50"/>`,
  },
  {
    id: "open",
    num: "07 / Open slot",
    title: "Something",
    titleAccent: "weird?",
    description:
      "If it ships software, signals, or sensors and nobody else wants to take it on — that's exactly the kind of brief we love.",
    tags: [],
    footer: "[ tell us about it ]",
    glyph: "",
    dashed: true,
  },
];
