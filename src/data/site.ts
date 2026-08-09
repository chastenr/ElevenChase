export const SITE = {
  name: "ElevenChase",
  legalName: "ElevenChase",
  domain: "elevenchase.com",
  url: "https://www.elevenchase.com",
  title: "ElevenChase | Software, AI & Web Engineering",
  tagline: "Software + AI Engineering",
  description:
    "ElevenChase designs and builds software, AI systems, automation and high-performance websites for ambitious companies worldwide.",
  location: "Remote-first",
  availability: "Worldwide",
  ceoName: "Chasten Ramirez",
  ceoTitle: "CEO",
} as const;

export const SERVICES_NAV = [
  {
    index: "01",
    label: "Software Development",
    href: "/services/software-development",
    description: "SaaS, platforms and internal tools built for production.",
  },
  {
    index: "02",
    label: "AI + Automation",
    href: "/services/ai-automation",
    description: "AI agents and workflow automation for real operations.",
  },
  {
    index: "03",
    label: "Web Development",
    href: "/services/web-development",
    description: "High-performance websites engineered to convert.",
  },
  {
    index: "04",
    label: "SEO Engineering",
    href: "/services/seo",
    description: "Technical search infrastructure built into the site.",
  },
  {
    index: "05",
    label: "Dedicated Engineering",
    href: "/services/dedicated-engineering",
    description: "An embedded engineering team that works alongside yours.",
  },
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/#contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: SERVICES_NAV.map((s) => ({
      label: s.label,
      href: s.href,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/#work" },
      { label: "Process", href: "/#process" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Insights", href: "/insights" }],
  },
] as const;
