import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { ServiceHero } from "@/components/service/ServiceHero";
import { FeatureGrid } from "@/components/service/FeatureGrid";
import { ServiceCta } from "@/components/service/ServiceCta";
import { RelatedServices } from "@/components/service/RelatedServices";

const PAGE_TITLE = "Web Development Services";
const PAGE_DESCRIPTION =
  "High-performance websites engineered around strategy, UX, technical SEO and conversion, built as business infrastructure rather than a digital brochure.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/services/web-development" },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/web-development`,
  },
};

const WEB_ITEMS = [
  { title: "Strategy", description: "Business goals, audience and competitive positioning." },
  { title: "UX/UI", description: "Interfaces designed around clarity and conversion." },
  { title: "Development", description: "Fast, maintainable production code." },
  { title: "CMS", description: "Content your team can manage without a developer." },
  { title: "SEO", description: "Technical foundations built in from day one." },
  { title: "Analytics", description: "Measurement that ties traffic to outcomes." },
  { title: "Conversion", description: "Pages designed to turn visits into inquiries." },
  { title: "Performance", description: "Fast load times on every device." },
  { title: "Maintenance", description: "Ongoing support after launch." },
];

export default function WebDevelopmentPage() {
  const jsonLd = serviceJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/web-development`,
  });
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Services", href: "/#capabilities" },
    { label: "Web Development", href: "/services/web-development" },
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
          { label: "Web Development" },
        ]}
        eyebrow="// Web Development"
        lines={["Websites that do", "more than exist."]}
        description="A website should function as business infrastructure that generates leads, ranks in search and represents your brand, not a digital brochure."
      />

      <FeatureGrid
        eyebrow="// What's included"
        title="Design, build and grow together."
        description="These aren't separate vendors handed off to each other. One team owns strategy, design, development and the technical systems behind performance and search."
        items={WEB_ITEMS}
        columns={3}
      />

      <ServiceCta
        lines={["Ready for a website", "that works harder?"]}
        description="Tell us about your current site, or the one you haven't built yet."
        ctaLabel="Start a project"
        ctaHref="/#contact"
      />

      <RelatedServices
        items={[
          {
            label: "SEO Engineering",
            href: "/services/seo",
            description: "Technical search infrastructure built into the site.",
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
