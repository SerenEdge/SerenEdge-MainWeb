import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "web-development",
    icon: "Globe",
    title: "Web Development",
    tagline: "Pixel-perfect interfaces that perform.",
    capabilities: [
      "Full-stack Next.js & React applications",
      "Custom CMS & e-commerce platforms",
      "REST & GraphQL APIs",
      "Progressive Web Apps (PWA)",
    ],
    color: "#2563eb",
  },
  {
    id: "iot-projects",
    icon: "Cpu",
    title: "IoT Projects",
    tagline: "Physical world meets digital intelligence.",
    capabilities: [
      "Arduino & Raspberry Pi systems",
      "Sensor networks & data collection",
      "Real-time monitoring dashboards",
      "Edge computing & firmware dev",
    ],
    color: "#7c3aed",
  },
  {
    id: "automation",
    icon: "Zap",
    title: "Automation",
    tagline: "Kill repetition. Keep what matters.",
    capabilities: [
      "Business process automation",
      "Web scraping & data pipelines",
      "Workflow & CI/CD automation",
      "RPA (Robotic Process Automation)",
    ],
    color: "#059669",
  },
  {
    id: "system-development",
    icon: "Layers",
    title: "System Development",
    tagline: "Architecture that scales without breaking.",
    capabilities: [
      "Enterprise software systems",
      "Database design & optimization",
      "Microservices & cloud-native apps",
      "Legacy system modernization",
    ],
    color: "#d97706",
  },
  {
    id: "installations",
    icon: "Wrench",
    title: "Installations",
    tagline: "Hardware + software, end to end.",
    capabilities: [
      "Network setup & configuration",
      "Server rack installation",
      "CCTV & security systems",
      "IT infrastructure deployment",
    ],
    color: "#dc2626",
  },
  {
    id: "machine-learning",
    icon: "Brain",
    title: "Machine Learning",
    tagline: "Data into decisions. Models into products.",
    capabilities: [
      "Predictive analytics models",
      "Computer vision systems",
      "NLP & text classification",
      "Model deployment & MLOps",
    ],
    color: "#0891b2",
  },
];
