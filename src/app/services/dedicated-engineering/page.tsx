import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { englishAlternates } from "@/i18n/seo";
import {
  serviceJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/structured-data";
import { ServiceHero } from "@/components/service/ServiceHero";
import { FeatureGrid } from "@/components/service/FeatureGrid";
import { ProcessList } from "@/components/service/ProcessList";
import { ServiceCta } from "@/components/service/ServiceCta";
import { RelatedServices } from "@/components/service/RelatedServices";

const PAGE_TITLE = "Dedicated Engineering";
const PAGE_DESCRIPTION =
  "An embedded engineer or small team that works inside your existing workflow, tools and roadmap, instead of operating as a separate outside vendor you have to manage.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: englishAlternates("/services/dedicated-engineering"),
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/dedicated-engineering`,
  },
};

const INCLUDES_ITEMS = [
  {
    title: "Direct access",
    description:
      "Work directly with the engineer building your product, not an account manager relaying updates.",
  },
  {
    title: "Inside your workflow",
    description:
      "We work in your tools, your standups and your roadmap rather than a separate process you have to manage.",
  },
  {
    title: "Consistent team",
    description:
      "The same people from the first conversation through ongoing iteration, not a rotating bench.",
  },
  {
    title: "Full-range capability",
    description:
      "One embedded partner that can flex across software, AI, web and technical SEO as your roadmap changes.",
  },
  {
    title: "Async-first",
    description:
      "Remote-first collaboration that fits your time zone, with calls scheduled around your team rather than ours.",
  },
  {
    title: "Flexible capacity",
    description:
      "Scoped up or down with what you actually need built, rather than a fixed headcount.",
  },
];

const FIT_STEPS = [
  {
    index: "01",
    title: "Roadmap bigger than capacity",
    description:
      "Your in-house team has more to build than time to build it, and hiring isn't fast enough.",
  },
  {
    index: "02",
    title: "One partner, not several vendors",
    description:
      "You'd rather have one embedded team that covers software, AI, web and SEO than coordinate separate agencies.",
  },
  {
    index: "03",
    title: "Production ownership matters",
    description:
      "You want engineers who stay accountable for what they ship, not a team that hands off and disappears.",
  },
];

export default function DedicatedEngineeringPage() {
  const jsonLd = serviceJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/dedicated-engineering`,
  });
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Services", href: "/#capabilities" },
    { label: "Dedicated Engineering", href: "/services/dedicated-engineering" },
  ]);

  return (
    <>
      <script type="application/ld+json" {...jsonLdScriptProps(jsonLd)} />
      <script type="application/ld+json" {...jsonLdScriptProps(breadcrumb)} />

      <ServiceHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services" },
          { label: "Dedicated Engineering" },
        ]}
        eyebrow="// Dedicated Engineering"
        lines={["An embedded team,", "not an outside", "vendor."]}
        description="An embedded engineer or small team that works inside your existing workflow, tools and roadmap, instead of operating as a separate outside vendor you have to manage."
      />

      <FeatureGrid
        eyebrow="// What this includes"
        title="Engineering capacity, not a ticket queue."
        description="This is the same team and process behind every ElevenChase engagement, structured as ongoing capacity rather than a fixed-scope project."
        items={INCLUDES_ITEMS}
        columns={3}
      />

      <ProcessList
        eyebrow="// Is this a fit?"
        title="What this works well for."
        steps={FIT_STEPS}
      />

      <ServiceCta
        lines={["Need engineering", "capacity?"]}
        description="Tell us what your roadmap looks like. We'll tell you honestly whether embedded capacity is the right fit."
        ctaLabel="Start a project"
        ctaHref="/#contact"
      />

      <RelatedServices
        items={[
          {
            label: "Software Development",
            href: "/services/software-development",
            description: "Production-ready products and platforms.",
          },
          {
            label: "AI + Automation",
            href: "/services/ai-automation",
            description: "AI systems integrated into real operations.",
          },
        ]}
      />
    </>
  );
}
