export type Capability = {
  index: string;
  title: string;
  description: string;
  examples: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Digital Products",
    description:
      "MVPs and production-ready digital products built from idea through launch.",
    examples: ["SaaS", "Customer portals", "Marketplaces", "Internal tools"],
  },
  {
    index: "02",
    title: "Platforms",
    description:
      "Scalable software architecture designed for businesses that need reliability and room to grow.",
    examples: [
      "Enterprise applications",
      "API platforms",
      "Dashboards",
      "Business systems",
    ],
  },
  {
    index: "03",
    title: "AI + Automation",
    description:
      "Practical artificial intelligence integrated into real business workflows.",
    examples: [
      "AI assistants",
      "AI agents",
      "Automation",
      "LLM integrations",
      "Intelligent workflows",
    ],
  },
];
