import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/data/site";

export function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <SectionLabel>{"// ElevenChase"}</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["Small team.", "Serious", "engineering."]}
              className="mt-6 text-[clamp(2.75rem,5.5vw,5.25rem)] leading-[0.98] font-medium tracking-[-0.05em] text-balance"
            />
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-xl leading-relaxed text-pretty text-muted md:text-2xl">
                ElevenChase is an independent software engineering studio
                helping companies turn ideas, workflows and complex operational problems
                into software people actually want to use.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg text-pretty text-muted">
                You work directly with the people designing and writing your
                software, from early strategy through production, instead of
                a rotating account team. Clear scope, clear communication,
                and engineers who stay hands-on the entire way.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-4">
                <Image
                  src="/chasten-ramirez.jpg"
                  alt={SITE.ceoName}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border border-line object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
                <div>
                  <p className="text-sm font-medium text-ink">
                    {SITE.ceoName}
                  </p>
                  <p className="text-sm text-muted">
                    {SITE.ceoTitle}, {SITE.name}
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-muted underline underline-offset-4 transition-colors duration-200 hover:text-ink"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <Link
                href="/company"
                className="mt-8 inline-block text-sm text-ink underline underline-offset-4 transition-colors duration-200 hover:text-accent"
              >
                More about ElevenChase →
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
