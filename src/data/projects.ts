import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "serenedge-web",
    title: "SerenEdge Website",
    description: "The very site you're looking at. Built with Next.js, GSAP, and a lot of late nights.",
    image: "/images/projects/serenedge-web.jpg",
    tags: ["Web"],
    tech: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    link: "https://serenedge.com",
    github: "https://github.com/SerenEdge/SerenEdge-MainWeb",
  },
  {
    id: "iot-dashboard",
    title: "IoT Sensor Dashboard",
    description: "Real-time monitoring dashboard for industrial IoT sensors with alerting and analytics.",
    image: "/images/projects/iot-dashboard.jpg",
    tags: ["IoT", "Web"],
    tech: ["React", "Node.js", "MQTT", "PostgreSQL"],
  },
  {
    id: "ml-classifier",
    title: "Image Classification API",
    description: "Custom-trained CNN model deployed as a REST API for product defect detection.",
    image: "/images/projects/ml-classifier.jpg",
    tags: ["ML"],
    tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
  },
  {
    id: "automation-suite",
    title: "Business Process Automation",
    description: "End-to-end automation suite reducing manual data entry by 90% for a logistics firm.",
    image: "/images/projects/automation-suite.jpg",
    tags: ["Automation"],
    tech: ["Python", "Selenium", "PostgreSQL", "Redis"],
  },
];

export const projectTags = ["All", "Web", "IoT", "ML", "Automation"];
