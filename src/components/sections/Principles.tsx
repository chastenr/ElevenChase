import { PRINCIPLES } from "@/data/principles";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Principles() {
  return (
    <section id="principles" className="py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{"// Principles"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["Software should", "create leverage."]}
            className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 md:mt-10 lg:grid-cols-5">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.index} delay={i * 0.05}>
              <div className="h-full border-r border-b border-line p-6">
                <span className="font-mono text-xs text-muted">
                  {principle.index}
                </span>
                <p className="mt-6 text-xl font-medium tracking-tight text-balance md:text-2xl">
                  {principle.title}
                </p>
                <p className="mt-3 text-sm text-pretty text-muted">
                  {principle.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
