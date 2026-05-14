import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dig deep into your problem — not just what you asked for, but why. Requirements, constraints, edge cases. We ask the uncomfortable questions before a single line of code gets written.",
  },
  {
    number: "02",
    title: "Architecture",
    description:
      "Design before we build. System diagrams, tech stack decisions, database schemas. We map the solution so implementation is a straight line, not a maze.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Heads down, full focus. Clean code, version-controlled, documented. We build like someone else will maintain it — because they might.",
  },
  {
    number: "04",
    title: "Test & Refine",
    description:
      "We break it before you do. Unit tests, integration tests, stress tests. Then we hand it to you for feedback and iterate until it's exactly right.",
  },
  {
    number: "05",
    title: "Deploy & Support",
    description:
      "Shipped is better than perfect — but we get it close before shipping. Zero-downtime deployments, monitoring, and we're on call when things get weird.",
  },
];
