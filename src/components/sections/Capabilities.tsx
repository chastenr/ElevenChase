import Link from "next/link";
import { CAPABILITIES } from "@/data/capabilities";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-36">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{"// What we build"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["Software.", "AI. Infrastructure."]}
            className="mt-6 text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.98] font-medium tracking-[-0.05em] text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              We build the systems companies use to launch products, remove
              operational drag and create durable digital infrastructure.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 border-t border-line md:mt-14">
          {CAPABILITIES.map((capability, i) => (
            <Reveal
              key={capability.index}
              direction={i % 2 === 0 ? "up" : "none"}
              delay={0.05}
            >
              <Link
                href={capability.href}
                className="group grid gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-ink/5 md:grid-cols-12 md:items-start md:gap-8 md:py-10"
              >
                <span className="font-mono text-sm text-muted md:col-span-1">
                  {capability.index}
                </span>
                <h3 className="flex items-center gap-3 text-3xl leading-[1.05] font-medium tracking-tight text-balance md:col-span-6 md:text-5xl">
                  {capability.title}
                  <AnimatedArrow className="transition-transform duration-300 group-hover:translate-x-1" />
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
                  <span className="mt-6 inline-flex items-center gap-2 text-sm">
                    <span
                      data-i18n-key={`Explore ${capability.title.replace(" Development", "").replace(" Engineering", "")}`}
                    >
                      Explore {capability.title.replace(" Development", "").replace(" Engineering", "")}
                    </span>
                    <AnimatedArrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
