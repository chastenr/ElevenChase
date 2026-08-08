import { PROCESS_STEPS } from "@/data/process";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24">
      <Container>
        <div className="md:grid md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionLabel>{"// 03 Process"}</SectionLabel>
              <AnimatedText
                as="h2"
                lines={["Think. Design.", "Build. Ship."]}
                className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-sm text-lg text-muted">
                  A focused way of working — from first conversation to
                  shipped software, with visible progress at every stage.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-10 md:col-span-7 md:mt-0">
            {PROCESS_STEPS.map((step) => (
              <Reveal key={step.index} delay={0.05}>
                <div className="border-t border-line py-8 md:py-10">
                  <span className="font-mono text-sm text-accent">
                    {step.index}
                  </span>
                  <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
