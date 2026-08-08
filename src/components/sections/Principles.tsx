import { PRINCIPLES } from "@/data/principles";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Principles() {
  return (
    <section id="principles" className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{"// Why ElevenChase"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["Engineering without", "the agency layers."]}
            className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.index} delay={i * 0.05}>
              <div className="h-full border-r border-b border-line p-7">
                <span className="font-mono text-xs text-muted">
                  {principle.index}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-balance md:text-2xl">
                  {principle.title}
                </h3>
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
