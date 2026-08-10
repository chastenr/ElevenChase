import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE, SERVICES_NAV } from "@/data/site";
import { PRINCIPLES } from "@/data/principles";
import { PROCESS_STEPS } from "@/data/process";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/structured-data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ServiceCta } from "@/components/service/ServiceCta";

const PAGE_TITLE = "Company";
const PAGE_DESCRIPTION = `${SITE.name} is an independent software, AI and web engineering studio founded by ${SITE.ceoName}. Learn who builds your software and how we work.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/company" },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/company`,
  },
};

export default function CompanyPage() {
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Company", href: "/company" },
  ]);

  return (
    <>
      <script type="application/ld+json" {...jsonLdScriptProps(breadcrumb)} />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SectionLabel>{"// Company"}</SectionLabel>
          <AnimatedText
            as="h1"
            trigger="mount"
            lines={["Who builds your", "software."]}
            className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.03] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              {SITE.name} is an independent software, AI and web engineering
              studio. No account managers, no rotating juniors &mdash; you
              work directly with the people designing and writing your
              software, from strategy through production.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <SectionLabel>{"// Founder"}</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-medium tracking-tight text-balance">
                {SITE.ceoName}
              </h2>
              <p className="mt-2 text-muted">
                {SITE.ceoTitle}, {SITE.name}
              </p>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <div className="flex items-start gap-4">
                  <Image
                    src="/chasten-ramirez.jpg"
                    alt={SITE.ceoName}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full border border-line object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  />
                  <div>
                    <p className="text-lg leading-relaxed text-pretty text-muted">
                      {SITE.ceoName} founded {SITE.name} to build software the
                      way it should be built: by engineers who stay hands-on
                      the entire way, instead of handed off between a sales
                      team, a project manager and whoever is actually
                      available to write code.
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-4 inline-block text-sm text-muted underline underline-offset-4 transition-colors duration-200 hover:text-ink"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <SectionLabel>{"// What we do"}</SectionLabel>
          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_NAV.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col gap-2 bg-ivory p-6 transition-colors duration-200 hover:bg-ink hover:text-ivory"
              >
                <span className="font-mono text-xs text-muted uppercase group-hover:text-ivory/60">
                  {service.index}
                </span>
                <span className="text-lg font-medium tracking-tight">
                  {service.label}
                </span>
                <span className="text-sm text-muted group-hover:text-ivory/70">
                  {service.description}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <SectionLabel>{"// How we work"}</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-medium tracking-tight text-balance">
                Four stages, every project.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ul className="flex flex-col gap-6">
                {PROCESS_STEPS.map((step) => (
                  <li key={step.index} className="flex gap-4 border-t border-line pt-6 first:border-t-0 first:pt-0">
                    <span className="font-mono text-sm text-accent">
                      {step.index}
                    </span>
                    <div>
                      <p className="font-medium text-ink">{step.title}</p>
                      <p className="mt-1 text-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <SectionLabel>{"// Why ElevenChase"}</SectionLabel>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <div key={principle.index} className="border-t border-line pt-6">
                <span className="font-mono text-sm text-accent">
                  {principle.index}
                </span>
                <p className="mt-2 text-lg font-medium tracking-tight text-ink">
                  {principle.title}
                </p>
                <p className="mt-1 text-muted">{principle.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <SectionLabel>{"// Details"}</SectionLabel>
          <dl className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                Location
              </dt>
              <dd className="mt-2 text-lg text-ink-soft">{SITE.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                Availability
              </dt>
              <dd className="mt-2 text-lg text-ink-soft">{SITE.availability}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                Security
              </dt>
              <dd className="mt-2 text-lg text-ink-soft">
                <Link
                  href="/security"
                  className="underline underline-offset-4 hover:text-accent"
                >
                  Report a vulnerability
                </Link>
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <ServiceCta
        lines={["Let's build", "something."]}
        description="Tell us what you're working on and we'll get back to you with next steps."
        ctaLabel="Talk to ElevenChase"
        ctaHref="/#contact"
      />
    </>
  );
}
