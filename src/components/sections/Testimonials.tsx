import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

/**
 * Renders nothing until TESTIMONIALS has real, approved entries — never
 * shows placeholder/fabricated quotes. See src/data/testimonials.ts.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{"// What clients say"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["In their own", "words."]}
            className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance"
          />
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:mt-14 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col justify-between gap-6 bg-ivory p-8">
                <blockquote className="text-lg leading-relaxed text-ink-soft">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {testimonial.photo && (
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
