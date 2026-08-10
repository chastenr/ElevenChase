export type Project = {
  slug: string;
  index: string;
  category: string;
  projectType: string;
  year: string;
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  services: string[];
  industry?: string;
  /** 3–5 concrete things ElevenChase built. Only populate with verified specifics. */
  keyFeatures?: string[];
  /** A specific technical/product challenge and how it was addressed. */
  challenge?: string;
  /** A short note on the technical architecture, when there's something specific worth explaining. */
  architecture?: string;
  /** Path under /public, e.g. "/work/project-slug.png". No fabricated screenshots. */
  screenshot?: string;
  /** Live project URL, only if the client has approved it being shown. */
  url?: string;
  impact?: string;
  metrics?: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
};

// Placeholder engagements: swap in real case studies as they become available.
// Optional fields (industry, keyFeatures, challenge, architecture, screenshot,
// url, impact, metrics, testimonial) are left empty until verified data
// exists — do not populate with invented specifics, even generic-sounding
// ones. The /work/[slug] detail page renders correctly with only the
// fields below present.
export const PROJECTS: Project[] = [
  {
    slug: "multi-tenant-saas-platform",
    index: "01",
    category: "Software",
    projectType: "SaaS Platform",
    year: "2025",
    title: "Multi-tenant SaaS Platform",
    problem:
      "A single-tenant product needed to support multiple organizations with isolated data, billing and permissions without a rebuild.",
    solution:
      "Rebuilt around a multi-tenant architecture with modern auth, subscription billing and a redesigned onboarding flow.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    services: ["Software Development"],
  },
  {
    slug: "ai-operations-platform",
    index: "02",
    category: "AI Operations",
    projectType: "Internal Platform",
    year: "2025",
    title: "AI Operations Platform",
    problem:
      "Support and operations teams were manually triaging and routing incoming work across disconnected tools.",
    solution:
      "Built an internal platform where AI agents triage, summarize and route work across teams, combining lead management, communication and workflow automation.",
    stack: ["Next.js", "OpenAI", "Anthropic", "Node.js"],
    services: ["AI + Automation", "Software Development"],
  },
  {
    slug: "enterprise-web-platform",
    index: "03",
    category: "Enterprise",
    projectType: "Web Platform",
    year: "2026",
    title: "Enterprise Web Platform",
    problem:
      "A legacy internal system had become slow, hard to maintain and costly to extend.",
    solution:
      "Modernized the system into a fast, maintainable web platform with a component architecture built for ongoing iteration.",
    stack: ["Next.js", "TypeScript", "AWS", "PostgreSQL"],
    services: ["Software Development", "Web Development"],
  },
];
