import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "sotercare",
    num: "01",
    category: "Healthcare IoT",
    badge: "● Active · In Development",
    badgeLive: true,
    title: "SoterCare —",
    titleAccent: "a connected healthcare platform for at-risk patients.",
    body: "End-to-end system: wearable sensor firmware, MQTT pipeline, family-facing dashboard, on-call alerting. Built ground-up by the SerenEdge team for continuous patient monitoring.",
    tags: ["ESP32 firmware", "MQTT / TLS", "Next.js", "PostgreSQL", "Twilio", "Care-pathway ML"],
    featured: true,
    hasVisual: true,
  },
  // more projects coming
];
