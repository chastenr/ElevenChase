import { Container } from "@/components/ui/Container";

const TRUST_SIGNALS = [
  "Founder-led studio",
  "Production-ready engineering",
  "Direct engineer access",
  "Built for real business operations",
  "Worldwide collaboration",
];

export function TrustStrip() {
  return (
    <section className="border-b border-line py-10" aria-label="What to expect">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs tracking-[0.1em] text-muted uppercase md:justify-between">
          {TRUST_SIGNALS.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
