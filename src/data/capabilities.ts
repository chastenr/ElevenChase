export type Capability = {
  index: string;
  title: string;
  href: string;
  description: string;
  examples: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Software Development",
    href: "/services/software-development",
    description:
      "Production-ready digital products designed around real business workflows.",
    examples: [
      "SaaS",
      "Customer portals",
      "Marketplaces",
      "Internal tools",
      "Dashboards",
      "API platforms",
    ],
  },
  {
    index: "02",
    title: "AI + Automation",
    href: "/services/ai-automation",
    description:
      "AI that works inside real operations rather than sitting in a demo.",
    examples: [
      "AI agents",
      "LLM applications",
      "RAG systems",
      "Voice AI",
      "Document processing",
      "Workflow automation",
    ],
  },
  {
    index: "03",
    title: "Web Engineering",
    href: "/services/web-development",
    description:
      "High-performance websites engineered around brand, usability and conversion.",
    examples: [
      "Strategy",
      "UX/UI",
      "Next.js",
      "CMS",
      "Conversion optimization",
      "Performance",
    ],
  },
  {
    index: "04",
    title: "SEO Engineering",
    href: "/services/seo",
    description: "Technical search infrastructure built directly into your website.",
    examples: [
      "Technical SEO",
      "Structured data",
      "Indexing",
      "Core Web Vitals",
      "Programmatic SEO",
      "AI search foundations",
    ],
  },
];
