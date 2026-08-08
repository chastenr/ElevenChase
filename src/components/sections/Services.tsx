import { SERVICES } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{"// 02 Services"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["From first idea", "to production."]}
            className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Four ways we can help — find where your project is today.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 border-t border-line md:mt-14">
          {SERVICES.map((service, i) => (
            <Reveal key={service.index} direction={i % 2 === 0 ? "up" : "left"} delay={0.04}>
              <div className="group relative border-b border-line py-8 transition-colors duration-300 hover:bg-ink/5 md:py-10">
                <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:items-start md:gap-8">
                  <span className="font-mono text-sm text-muted transition-opacity duration-300 group-hover:opacity-40 md:col-span-1">
                    {service.index}
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight text-balance md:col-span-4 md:text-3xl">
                    {service.title}
                  </h3>
                  <div className="md:col-span-6">
                    <p className="text-muted">{service.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs tracking-[0.08em] text-muted uppercase">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden md:col-span-1 md:flex md:justify-end">
                    <AnimatedArrow className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
