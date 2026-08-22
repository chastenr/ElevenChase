import { SITE } from "@/data/site";
import { englishMetadata } from "@/i18n/seo";
import {
  serviceJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/structured-data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ServiceHero } from "@/components/service/ServiceHero";
import { FeatureGrid } from "@/components/service/FeatureGrid";
import { ProcessList } from "@/components/service/ProcessList";
import { RelatedServices } from "@/components/service/RelatedServices";

const PAGE_TITLE = "Technical SEO Services";
const PAGE_DESCRIPTION =
  "Technical SEO engineered into your website: crawlability, structured data and Core Web Vitals, implemented directly by the team that builds your site.";

export const metadata = englishMetadata({
  pathname: "/services/seo",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const IMPROVE_ITEMS = [
  { title: "Crawlability" },
  { title: "Indexation" },
  { title: "Site architecture" },
  { title: "Structured data" },
  { title: "Core Web Vitals" },
  { title: "Internal linking" },
  { title: "Redirects" },
  { title: "Canonicals" },
  { title: "Metadata" },
  { title: "Sitemap" },
  { title: "Performance" },
  { title: "Mobile UX" },
];

const PROCESS_STEPS = [
  { index: "01", title: "Audit", description: "A full technical review of crawlability, indexation and site health." },
  { index: "02", title: "Research", description: "Keyword and intent research grounded in what the business actually offers." },
  { index: "03", title: "Architecture", description: "Site structure and internal linking designed around topics and intent." },
  { index: "04", title: "Implementation", description: "Fixes and improvements shipped directly into the codebase." },
  { index: "05", title: "Measurement", description: "Search Console and analytics connected to track real impact." },
  { index: "06", title: "Improve", description: "Ongoing iteration as the site and search landscape evolve." },
];

export default function SeoPage() {
  const jsonLd = serviceJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/services/seo`,
  });
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Services", href: "/#capabilities" },
    { label: "SEO Engineering", href: "/services/seo" },
  ]);

  return (
    <>
      <script type="application/ld+json" {...jsonLdScriptProps(jsonLd)} />
      <script type="application/ld+json" {...jsonLdScriptProps(breadcrumb)} />

      <ServiceHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services" },
          { label: "SEO Engineering" },
        ]}
        eyebrow="// SEO Engineering"
        lines={["Technical SEO built", "into the foundation."]}
        description="Many SEO problems are actually engineering problems: slow pages, broken canonicals, unclear architecture. We fix them at the source, because we're the ones who built it."
        ctaLabel="Request an SEO audit"
        ctaHref="/#audit"
      />

      <FeatureGrid
        eyebrow="// What we improve"
        title="The technical layer search engines read."
        items={IMPROVE_ITEMS}
        columns={4}
      />

      <ProcessList
        eyebrow="// Our process"
        title="SEO engineering process."
        steps={PROCESS_STEPS}
      />

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <SectionLabel>{"// SEO + Development"}</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] font-medium tracking-tight text-balance">
                No PDF audit to hand off.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="text-lg text-muted">
                  Most SEO engagements end with a report: a list of
                  recommendations for someone else&apos;s development team to
                  implement, reprioritize or ignore.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg text-muted">
                  Because we&apos;re the engineers who build your website, we
                  implement fixes directly into the codebase (metadata,
                  schema, redirects, architecture) without the handoff gap
                  where recommendations usually stall.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <SectionLabel>{"// AI Search / GEO"}</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] font-medium tracking-tight text-balance">
                Built to be understood.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="text-lg text-muted">
                  Search discovery increasingly includes AI-powered
                  experiences alongside traditional results. These systems
                  tend to favor the same fundamentals that make a site work
                  well for people and traditional search: clean semantic
                  HTML, accurate structured data, clear entity information
                  and authoritative, well-organized content.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg text-pretty text-muted">
                  We build those foundations as standard practice. We
                  don&apos;t promise placement in any specific AI search
                  experience, since no one can guarantee that, but we make
                  sure your site gives these systems clean, accurate
                  information to work with.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink py-16 text-ivory md:py-24">
        <Container className="flex flex-col items-start gap-8">
          <AnimatedText
            as="h2"
            lines={["Want to know what's", "holding your website", "back?"]}
            className="max-w-2xl text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg text-ivory/60">
              We&apos;ll look at crawlability, performance and structure and
              tell you what&apos;s actually worth fixing.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <MagneticLink
              href="/#audit"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink"
            >
              Request an SEO audit
              <AnimatedArrow className="ml-2" />
            </MagneticLink>
          </Reveal>
        </Container>
      </section>

      <RelatedServices
        items={[
          {
            label: "Web Development",
            href: "/services/web-development",
            description: "High-performance websites engineered to convert.",
          },
          {
            label: "Software Development",
            href: "/services/software-development",
            description: "Production-ready products and platforms.",
          },
          {
            label: "Dedicated Engineering",
            href: "/services/dedicated-engineering",
            description: "An embedded team that works alongside yours.",
          },
        ]}
      />
    </>
  );
}
