export interface Service {
  id: string;
  num: string;
  title: string;
  titleAccent: string;
  description: string;
  tags: string[];
  footer: string;
  glyph: string;
  dashed?: boolean;
}

export interface ProcessStep {
  id: string;
  num: string;
  label: string;
  labelAccent: string;
  headline: string;
  headlineAccent: string;
  body: string;
  meta: { label: string; value: string }[];
  glyph: string;
}

export interface Project {
  id: string;
  num: string;
  category: string;
  badge: string;
  badgeLive?: boolean;
  title: string;
  titleAccent: string;
  body: string;
  tags: string[];
  featured?: boolean;
  hasVisual?: boolean;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
}
