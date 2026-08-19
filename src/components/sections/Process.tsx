import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ProcessSteps } from "@/components/ui/ProcessSteps";

export function Process() {
  return (
    <section id="process" className="py-24 md:py-36">
      <Container>
        <div className="md:grid md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionLabel>{"// How we work"}</SectionLabel>
              <AnimatedText
                as="h2"
                lines={["Think.", "Design.", "Build.", "Ship."]}
                className="mt-6 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.05em] text-balance"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-sm text-lg text-muted">
                  A focused way of working, from first conversation to
                  shipped software, with visible progress at every stage.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-10 md:col-span-7 md:mt-0">
            <ProcessSteps />
          </div>
        </div>
      </Container>
    </section>
  );
}
