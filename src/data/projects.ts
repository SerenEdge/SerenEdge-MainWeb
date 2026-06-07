import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "sotercare",
    num: "01",
    category: "Healthcare IoT",
    badge: "● MVP",
    badgeLive: true,
    title: "SoterCare —",
    titleAccent: "a connected healthcare platform for at-risk patients.",
    body: "End-to-end remote patient monitoring system. Wearable sensor firmware streams vitals over MQTT/TLS to a real-time dashboard, with automated alerts to family and on-call staff. Built ground-up by the SerenEdge team — sotercare.com.",
    tags: ["ESP32 firmware", "MQTT / TLS", "Next.js", "PostgreSQL", "Twilio", "Care-pathway ML"],
    featured: true,
    hasVisual: true,
  },
  // more projects coming
];
