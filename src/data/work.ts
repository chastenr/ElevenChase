export type Project = {
  index: string;
  category: string;
  year: string;
  title: string;
  description: string;
  tech: string[];
  result?: string;
  thumbnail: "grid" | "browser" | "fragments";
};

// Placeholder engagements — swap in real case studies as they become available.
export const PROJECTS: Project[] = [
  {
    index: "01",
    category: "SaaS",
    year: "2025",
    title: "SaaS Platform",
    description:
      "A multi-tenant SaaS product rebuilt around a modern architecture, from onboarding through billing.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    thumbnail: "browser",
  },
  {
    index: "02",
    category: "AI / Automation",
    year: "2025",
    title: "AI Operations Platform",
    description:
      "An internal operations platform where AI agents triage, summarize and route work across teams.",
    tech: ["Next.js", "OpenAI", "Anthropic", "Node.js"],
    thumbnail: "fragments",
  },
  {
    index: "03",
    category: "Enterprise",
    year: "2026",
    title: "Enterprise Web Platform",
    description:
      "A modernization of a legacy internal system into a fast, maintainable web platform.",
    tech: ["Next.js", "TypeScript", "AWS", "PostgreSQL"],
    thumbnail: "grid",
  },
];
