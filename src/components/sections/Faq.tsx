import { FAQS } from "@/data/faq";
import { jsonLdScriptProps } from "@/lib/structured-data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { FaqItem } from "@/components/ui/FaqItem";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="py-24 md:py-36">
      <script type="application/ld+json" {...jsonLdScriptProps(faqJsonLd)} />
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <SectionLabel>{"// FAQ"}</SectionLabel>
            <AnimatedText
              as="h1"
              lines={["Before we", "start."]}
              className="mt-6 text-[clamp(2.75rem,5vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.05em] text-balance"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-lg text-muted">
                Common questions before starting a project. Don&apos;t see
                yours? Just ask.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="border-t border-line">
              {FAQS.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
