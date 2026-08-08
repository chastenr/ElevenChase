import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type Crumb = { label: string; href?: string };

type ServiceHeroProps = {
  breadcrumb: Crumb[];
  eyebrow: string;
  lines: string[];
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function ServiceHero({
  breadcrumb,
  eyebrow,
  lines,
  description,
  ctaLabel = "Start a project",
  ctaHref = "/#contact",
}: ServiceHeroProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.08em] text-muted uppercase"
        >
          {breadcrumb.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink">{item.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </nav>

        <div className="max-w-3xl">
          <SectionLabel>{eyebrow}</SectionLabel>
          <AnimatedText
            as="h1"
            trigger="mount"
            lines={lines}
            className="mt-5 text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.03] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
              {description}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8">
              <MagneticLink
                href={ctaHref}
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-accent"
              >
                {ctaLabel}
                <AnimatedArrow className="ml-2" />
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
