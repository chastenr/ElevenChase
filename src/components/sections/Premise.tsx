import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";

export function Premise() {
  return (
    <section className="border-t border-line py-24 md:py-40 lg:py-48">
      <Container>
        <SectionLabel>{"// The premise"}</SectionLabel>
        <div className="mt-10 max-w-6xl">
          <WordReveal as="h2" text="Good software is not about adding more technology." className="text-[clamp(2.4rem,5.8vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.045em]" />
          <WordReveal text="It is about removing friction from the way a business operates." className="mt-8 text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.06] tracking-[-0.04em] text-muted" />
        </div>
        <Reveal delay={0.2}><p className="mt-14 max-w-xl text-lg leading-relaxed text-muted md:ml-auto md:text-xl">ElevenChase works from the business problem outward — designing the system, automation or digital product that creates the clearest operational advantage.</p></Reveal>
      </Container>
    </section>
  );
}
