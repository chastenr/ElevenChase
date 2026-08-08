import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { ServiceHero } from "@/components/service/ServiceHero";
import { FeatureGrid } from "@/components/service/FeatureGrid";
import { ProcessList } from "@/components/service/ProcessList";
import { ServiceCta } from "@/components/service/ServiceCta";
import { RelatedServices } from "@/components/service/RelatedServices";

const PAGE_TITLE = "Software Development Services";
const PAGE_DESCRIPTION =
  "Production-ready SaaS, platforms, internal tools and MVPs, designed, architected and engineered by ElevenChase for real business workflows.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/services/software-development" },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/software-development`,
  },
};

const BUILD_ITEMS = [
  { title: "SaaS", description: "Multi-tenant products built to scale with your customer base." },
  { title: "Platforms", description: "Business-critical systems designed for reliability and growth." },
  { title: "Internal applications", description: "Tools that replace spreadsheets and manual processes." },
  { title: "Dashboards", description: "Clear visibility into the data that runs your business." },
  { title: "Portals", description: "Customer and partner-facing access to your systems." },
  { title: "Marketplaces", description: "Multi-sided platforms connecting buyers and sellers." },
  { title: "APIs", description: "Clean interfaces that let your systems talk to each other." },
  { title: "MVP development", description: "The smallest real version of your product, built to learn fast." },
  { title: "Legacy modernization", description: "Rebuilding aging systems without losing what works." },
];

const LIFECYCLE_STEPS = [
  { index: "01", title: "Strategy", description: "Clarify the business problem, users and constraints before writing any code." },
  { index: "02", title: "Architecture", description: "Decide how the system is structured so it can grow without rewrites." },
  { index: "03", title: "UX", description: "Design the experience around how the product will actually be used." },
  { index: "04", title: "Development", description: "Build in focused cycles with visible, working progress." },
  { index: "05", title: "Deployment", description: "Ship to production with proper environments and monitoring in place." },
  { index: "06", title: "Iteration", description: "Improve based on real usage, not assumptions." },
];

export default function SoftwareDevelopmentPage() {
  const jsonLd = serviceJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/software-development`,
  });
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Services", href: "/#capabilities" },
    { label: "Software Development", href: "/services/software-development" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <ServiceHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services" },
          { label: "Software Development" },
        ]}
        eyebrow="// Software Development"
        lines={["Software built for", "the business you're", "running."]}
        description="Production-ready digital products built around real business workflows, from a first working prototype to the platform your business runs on."
      />

      <FeatureGrid
        eyebrow="// What we build"
        title="Products, not prototypes."
        description="Every engagement is scoped around a real workflow, not a generic feature list."
        items={BUILD_ITEMS}
        columns={3}
      />

      <ProcessList
        eyebrow="// Product lifecycle"
        title="Strategy to iteration."
        steps={LIFECYCLE_STEPS}
      />

      <ServiceCta
        lines={["Have a product", "to build?"]}
        description="Tell us what you're building. We'll reply with a clear next step."
        ctaLabel="Start a project"
        ctaHref="/#contact"
      />

      <RelatedServices
        items={[
          {
            label: "AI + Automation",
            href: "/services/ai-automation",
            description: "AI systems integrated into real operations.",
          },
          {
            label: "Web Development",
            href: "/services/web-development",
            description: "High-performance websites engineered to convert.",
          },
        ]}
      />
    </>
  );
}
