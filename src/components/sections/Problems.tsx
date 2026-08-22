import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const PROBLEMS = [
  ["When manual work is becoming the bottleneck", "Automation + internal systems"],
  ["When the product needs to become real", "Software engineering"],
  ["When leads keep falling through the cracks", "CRM + AI + automation"],
  ["When the website no longer represents the business", "Web + conversion + SEO"],
];

export function Problems() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <SectionLabel>{"// When companies come to us"}</SectionLabel>
        <h2
          data-i18n-key="Usually, something isn't working."
          className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.98] font-medium tracking-[-0.05em]"
        >
          Usually, something<br />isn&apos;t working.
        </h2>
        <div className="mt-14 border-t border-line md:mt-20">
          {PROBLEMS.map(([problem, response], index) => (
            <Reveal key={problem} delay={index * 0.03}>
              <div className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:py-9">
                <span className="font-mono text-xs text-muted md:col-span-1">0{index + 1}</span>
                <h3 className="text-2xl leading-tight tracking-tight md:col-span-7 md:text-3xl">{problem}</h3>
                <p className="font-mono text-xs tracking-[0.08em] text-muted uppercase md:col-span-4 md:text-right">{response}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
