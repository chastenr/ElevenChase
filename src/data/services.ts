export type Service = {
  index: string;
  title: string;
  description: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Build Something New",
    description: "We turn ideas into production-ready software.",
    items: [
      "Product strategy",
      "UX/UI",
      "MVP development",
      "SaaS",
      "Web applications",
      "Mobile-ready products",
    ],
  },
  {
    index: "02",
    title: "Modernize Existing Software",
    description:
      "We improve software that has become slow, expensive or difficult to maintain.",
    items: [
      "Legacy modernization",
      "Architecture",
      "Next.js migration",
      "Cloud optimization",
      "Performance",
      "API development",
    ],
  },
  {
    index: "03",
    title: "AI Engineering",
    description: "Turn AI experiments into reliable software.",
    items: [
      "AI agents",
      "LLM applications",
      "RAG",
      "Workflow automation",
      "AI integrations",
      "Voice / chat systems",
    ],
  },
  {
    index: "04",
    title: "Dedicated Engineering",
    description:
      "An experienced engineering team that works alongside your company.",
    items: [
      "Product engineers",
      "Frontend",
      "Backend",
      "Full stack",
      "DevOps",
      "AI engineers",
    ],
  },
];
