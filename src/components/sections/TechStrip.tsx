import { TECH_STACK } from "@/data/tech";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function TechStrip() {
  return (
    <section className="border-y border-line py-16 md:py-20" aria-label="Technology">
      <Container>
        <Reveal>
          <p className="max-w-2xl text-2xl leading-snug font-medium tracking-tight text-balance md:text-3xl">
            &ldquo;Technology should serve the product — not the other way
            around.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm tracking-[0.06em] text-muted uppercase">
            {TECH_STACK.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
