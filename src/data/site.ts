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
  ceoTitle: "Founder & CEO",
  email: "start@elevenchase.com",
  contactEmail: "start@elevenchase.com",
  // Company and founder social profiles for schema.org `sameAs`. Left empty
  // until real, live profiles exist — populate as they're created rather
  // than inventing placeholder URLs. Both the Organization and Person
  // JSON-LD blocks in structured-data.ts read these and omit `sameAs`
  // entirely while empty.
  sameAs: [] as string[],
  founderSameAs: [] as string[],
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
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Company", href: "/company" },
  { label: "Insights", href: "/insights" },
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
      { label: "About", href: "/company" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Insights", href: "/insights" }],
  },
] as const;
