import { OFFER_FEATURES } from "@/data/offer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function WebsiteOffer() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{"// Website + SEO"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["Websites engineered", "to perform."]}
            className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted">
              We don&apos;t stop at making websites look good. We design,
              develop and optimize the systems behind performance,
              conversion and discoverability.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {OFFER_FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.04}>
              <div className="h-full border-r border-b border-line p-7">
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-medium tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
