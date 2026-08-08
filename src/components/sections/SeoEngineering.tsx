import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { SeoChecklist } from "@/components/ui/SeoChecklist";

export function SeoEngineering() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <SectionLabel>{"// SEO Engineering"}</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["Build for people.", "Structure for search."]}
              className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg text-muted">
                Search visibility starts with the website itself. ElevenChase
                combines engineering, performance and content architecture to
                create websites that search engines — and users — can
                understand.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal direction="scale" delay={0.15}>
              <SeoChecklist />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
