import { VALUE_STAGES } from "@/data/value";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Value() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{"// From idea to growth"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["From idea", "to growth."]}
            className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance"
          />
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:mt-14">
          {VALUE_STAGES.map((stage, i) => (
            <Reveal key={stage.index} delay={i * 0.06}>
              <div className="group h-full bg-ivory p-8 transition-colors duration-300 hover:bg-ivory-soft">
                <span className="font-mono text-xs text-muted">
                  {stage.index}
                </span>
                <h3 className="mt-6 text-2xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {stage.title}
                </h3>
                <p className="mt-3 text-muted">{stage.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
