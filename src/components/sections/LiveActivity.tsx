import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ActivityFeed } from "@/components/ui/ActivityFeed";

export function LiveActivity() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <SectionLabel>{"// Engineering in practice"}</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["Engineering", "in practice."]}
              className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-lg text-muted">
                A representative sample of the kind of engineering work we do
                day to day, across software, AI, automation, web and search.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.15}>
              <ActivityFeed />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
