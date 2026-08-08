import type { Metadata } from "next";
import { SITE } from "@/data/site";
import {
  serviceJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/structured-data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ServiceHero } from "@/components/service/ServiceHero";
import { FeatureGrid } from "@/components/service/FeatureGrid";
import { ServiceCta } from "@/components/service/ServiceCta";
import { RelatedServices } from "@/components/service/RelatedServices";

const PAGE_TITLE = "AI + Automation Services";
const PAGE_DESCRIPTION =
  "AI agents and workflow automation built into real business operations: support, sales, document processing and internal systems.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/services/ai-automation" },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/ai-automation`,
  },
};

const AI_ITEMS = [
  { title: "AI agents" },
  { title: "Workflow automation" },
  { title: "Voice AI" },
  { title: "Customer support" },
  { title: "Lead qualification" },
  { title: "Internal operations" },
  { title: "Document processing" },
  { title: "CRM automation" },
  { title: "LLM integrations" },
  { title: "RAG" },
  { title: "AI dashboards" },
];

const EXAMPLES = [
  "A support inbox where an AI agent drafts and triages responses, escalating only what needs a human.",
  "A lead form that automatically qualifies prospects and routes them to the right person.",
  "A document pipeline that extracts and structures data from PDFs and forms.",
  "An internal dashboard that surfaces AI-generated summaries of operational data.",
];

export default function AiAutomationPage() {
  const jsonLd = serviceJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/ai-automation`,
  });
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Services", href: "/#capabilities" },
    { label: "AI + Automation", href: "/services/ai-automation" },
  ]);

  return (
    <>
      <script type="application/ld+json" {...jsonLdScriptProps(jsonLd)} />
      <script type="application/ld+json" {...jsonLdScriptProps(breadcrumb)} />

      <ServiceHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services" },
          { label: "AI + Automation" },
        ]}
        eyebrow="// AI + Automation"
        lines={["AI that works", "inside your", "business."]}
        description="AI systems integrated into actual business operations, not demos. We build agents and automation that plug into the tools you already use."
      />

      <FeatureGrid
        eyebrow="// Where AI creates leverage"
        title="Practical AI, not hype."
        items={AI_ITEMS}
        columns={3}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel>{"// In practice"}</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] font-medium tracking-tight text-balance">
              What this looks like day to day.
            </h2>
          </div>

          <div className="mt-10 border-t border-line md:mt-14">
            {EXAMPLES.map((example, i) => (
              <Reveal key={example} delay={i * 0.05}>
                <div className="flex gap-6 border-b border-line py-6 md:py-7">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-2xl text-lg text-muted">{example}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        lines={["Have a workflow", "worth automating?"]}
        description="Tell us what's manual today. We'll tell you what's realistic to automate."
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
            label: "SEO Engineering",
            href: "/services/seo",
            description: "Technical search infrastructure built in.",
          },
        ]}
      />
    </>
  );
}
