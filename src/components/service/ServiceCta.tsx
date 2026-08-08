import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type ServiceCtaProps = {
  lines: string[];
  description?: string;
  ctaLabel: string;
  ctaHref: string;
};

export function ServiceCta({
  lines,
  description,
  ctaLabel,
  ctaHref,
}: ServiceCtaProps) {
  return (
    <section className="border-t border-line bg-ink py-16 text-ivory md:py-24">
      <Container className="flex flex-col items-start gap-8">
        <AnimatedText
          as="h2"
          lines={lines}
          className="max-w-2xl text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] font-medium tracking-tight text-balance"
        />
        {description && (
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg text-ivory/60">{description}</p>
          </Reveal>
        )}
        <Reveal delay={0.18}>
          <MagneticLink
            href={ctaHref}
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink"
          >
            {ctaLabel}
            <AnimatedArrow className="ml-2" />
          </MagneticLink>
        </Reveal>
      </Container>
    </section>
  );
}
