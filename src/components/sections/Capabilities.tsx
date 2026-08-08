import { CAPABILITIES } from "@/data/capabilities";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-36">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{"// 01 Capabilities"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["Products. Platforms.", "AI systems."]}
            className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Whether you&apos;re validating an early idea or scaling
              something that already works, we cover the full stack —
              product builds, platforms engineered to grow, and AI systems
              that hold up in production.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line md:mt-20">
          {CAPABILITIES.map((capability, i) => (
            <Reveal
              key={capability.index}
              direction={i % 2 === 0 ? "up" : "none"}
              delay={0.05}
            >
              <div className="grid gap-4 border-b border-line py-10 md:grid-cols-12 md:items-start md:gap-8 md:py-14">
                <span className="font-mono text-sm text-muted md:col-span-1">
                  {capability.index}
                </span>
                <h3 className="text-3xl leading-[1.05] font-medium tracking-tight text-balance md:col-span-6 md:text-5xl">
                  {capability.title}
                </h3>
                <div className="md:col-span-5">
                  <p className="max-w-md text-lg text-muted">
                    {capability.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    {capability.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
