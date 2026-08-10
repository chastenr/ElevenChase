import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { PROJECTS } from "@/data/work";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/structured-data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ServiceCta } from "@/components/service/ServiceCta";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Case study not found" };
  }

  return {
    title: project.title,
    description: project.problem,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${SITE.name}`,
      description: project.problem,
      url: `${SITE.url}/work/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: project.title, href: `/work/${project.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" {...jsonLdScriptProps(breadcrumb)} />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.08em] text-muted uppercase"
          >
            <Link href="/" className="transition-colors duration-200 hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/#work" className="transition-colors duration-200 hover:text-ink">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{project.title}</span>
          </nav>

          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-muted uppercase">
            <span>{project.category}</span>
            <span className="text-muted/60">&middot;</span>
            <span>{project.projectType}</span>
            <span className="text-muted/60">&middot;</span>
            <span>{project.year}</span>
          </div>

          <AnimatedText
            as="h1"
            trigger="mount"
            lines={[project.title]}
            className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.03] font-medium tracking-tight text-balance"
          />

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              {project.problem}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="border border-line px-3 py-1 font-mono text-xs text-muted uppercase"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {project.screenshot && (
        <section className="pb-16 md:pb-20">
          <Container>
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-line">
                <Image
                  src={project.screenshot}
                  alt={`${project.title} interface`}
                  width={1600}
                  height={1000}
                  className="w-full object-cover"
                />
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <SectionLabel>{"// What we built"}</SectionLabel>
              <h2 className="mt-5 text-2xl font-medium tracking-tight md:text-3xl">
                {project.solution}
              </h2>

              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <ul className="mt-8 flex flex-col gap-3">
                  {project.keyFeatures.map((feature, i) => (
                    <li
                      key={feature}
                      className="flex gap-4 border-t border-line py-4 text-lg text-muted first:border-t-0 first:pt-0"
                    >
                      <span className="font-mono text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {project.challenge && (
                <div className="mt-10">
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Challenge
                  </p>
                  <p className="mt-3 text-lg text-muted">{project.challenge}</p>
                </div>
              )}

              {project.architecture && (
                <div className="mt-10">
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Architecture
                  </p>
                  <p className="mt-3 text-lg text-muted">{project.architecture}</p>
                </div>
              )}
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <div className="border-t border-line pt-6">
                <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  Services
                </p>
                <ul className="mt-3 flex flex-col gap-1 text-ink-soft">
                  {project.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>

              {project.industry && (
                <div className="mt-8 border-t border-line pt-6">
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Industry
                  </p>
                  <p className="mt-3 text-ink-soft">{project.industry}</p>
                </div>
              )}

              {project.metrics && project.metrics.length > 0 && (
                <div className="mt-8 border-t border-line pt-6">
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Results
                  </p>
                  <dl className="mt-3 flex flex-col gap-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="text-sm text-muted">{metric.label}</dt>
                        <dd className="text-xl font-medium tracking-tight text-ink">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {project.url && (
                <div className="mt-8 border-t border-line pt-6">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline underline-offset-4 hover:text-accent"
                  >
                    View live project ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {project.testimonial && (
            <Reveal>
              <div className="mt-16 border-t border-line pt-12 md:mt-20">
                <blockquote className="max-w-2xl text-2xl leading-snug font-medium tracking-tight text-balance md:text-3xl">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <p className="mt-6 text-muted">
                  {project.testimonial.author}, {project.testimonial.role}
                </p>
              </div>
            </Reveal>
          )}
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
