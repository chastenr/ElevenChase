import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type Step = { index: string; title: string; description: string };

export function ProcessList({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: Step[];
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] font-medium tracking-tight text-balance">
            {title}
          </h2>
        </div>

        <div className="mt-10 border-t border-line md:mt-14">
          {steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.03}>
              <div className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-8 md:py-7">
                <span className="font-mono text-sm text-accent md:col-span-1">
                  {step.index}
                </span>
                <h3 className="text-xl font-medium tracking-tight md:col-span-3">
                  {step.title}
                </h3>
                <p className="text-muted md:col-span-8">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
