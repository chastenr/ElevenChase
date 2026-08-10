import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { PROJECTS } from "@/data/work";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/structured-data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ServiceCta } from "@/components/service/ServiceCta";

const PAGE_TITLE = "Selected Engineering Work";
const PAGE_DESCRIPTION = `Representative software, AI and web engineering work from ${SITE.name}.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/work`,
  },
};

export default function WorkIndexPage() {
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
  ]);

  return (
    <>
      <script type="application/ld+json" {...jsonLdScriptProps(breadcrumb)} />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <SectionLabel>{"// Selected work"}</SectionLabel>
            <AnimatedText
              as="h1"
              trigger="mount"
              lines={["What we've been", "building."]}
              className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
                A representative look at the kind of software, AI and web
                engineering we do. Publicly named case studies with client
                details are added once a client has approved sharing them —
                get in touch if you&apos;d like specifics for a similar
                engagement.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="border-t border-line">
            {PROJECTS.map((project, i) => (
              <Reveal
                key={project.index}
                direction={i % 2 === 0 ? "up" : "left"}
                delay={0.04}
              >
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        lines={["Building something", "similar?"]}
        description="Tell us what you're working on and we'll get back to you with next steps."
        ctaLabel="Talk to ElevenChase"
        ctaHref="/#contact"
      />
    </>
  );
}
