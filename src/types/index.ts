export interface Service {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  capabilities: string[];
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  tech: string[];
  link?: string;
  github?: string;
}

export interface TechItem {
  name: string;
  icon: string;
  category: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
