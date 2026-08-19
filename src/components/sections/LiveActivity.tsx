import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function LiveActivity() {
  return (
    <section className="overflow-hidden py-24 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-7">
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

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.15}>
              <p className="max-w-sm text-lg leading-relaxed text-muted">Production work is rarely one dramatic moment. It is a steady stream of decisions, integrations, fixes and improvements.</p>
            </Reveal>
          </div>
        </div>
      </Container>
      <div className="mt-12 border-y border-line py-5 font-mono text-xs tracking-[0.12em] text-muted uppercase">
        <div className="flex w-max animate-[marquee-scroll_42s_linear_infinite] gap-8 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {["Multi-tenant authentication", "AI lead qualification", "Payment processing", "CRM automation", "Database optimization", "Structured data", "Voice AI", "Booking automation", "API integration", "Core Web Vitals", "Multi-tenant authentication", "AI lead qualification", "Payment processing", "CRM automation", "Database optimization", "Structured data", "Voice AI", "Booking automation", "API integration", "Core Web Vitals"].map((item, index) => <span key={`${item}-${index}`} className="whitespace-nowrap">{item} <span className="ml-8 text-muted/40">→</span></span>)}
        </div>
      </div>
    </section>
  );
}
