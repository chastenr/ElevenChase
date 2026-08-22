import type { Metadata } from "next";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink";
import { SITE } from "@/data/site";
import { englishAlternates } from "@/i18n/seo";
import { ARTICLES } from "@/data/insights";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const sortedArticles = [...ARTICLES].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const PAGE_TITLE = "Insights";
const PAGE_DESCRIPTION =
  "Practical guides for planning software projects, evaluating engineering partners and making clearer decisions before development begins.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: englishAlternates("/insights"),
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/insights`,
  },
};

export default function InsightsPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-end lg:gap-20">
          <div>
            <SectionLabel>{"// Insights"}</SectionLabel>
            <AnimatedText
              as="h1"
              trigger="mount"
              lines={["Answers before", "you build."]}
              className="mt-5 text-[clamp(2.5rem,6vw,5.75rem)] leading-[0.98] font-medium tracking-tight text-balance"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              Straightforward guides for founders and teams making software
              decisions: what it costs, who to hire, how to scope the work and
              what to expect from delivery.
            </p>
          </Reveal>
        </div>

        {sortedArticles.length === 0 ? (
          <Reveal delay={0.25}>
            <div className="mt-16 border-t border-line pt-16 md:mt-20 md:pt-20">
              <p className="max-w-md text-lg text-muted">
                We&apos;re writing our first pieces now. Check back soon, or
                {" "}
                <Link
                  href="/#contact"
                  className="text-ink underline underline-offset-4 hover:text-accent"
                >
                  get in touch
                </Link>{" "}
                if there&apos;s something specific you&apos;d like us to
                cover.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-16 md:mt-24">
            <Reveal>
              <div className="flex items-end justify-between border-b border-line pb-5">
                <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                  Start here
                </h2>
                <p className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase md:text-xs">
                  {sortedArticles.length} practical guides
                </p>
              </div>
            </Reveal>
            {sortedArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group grid gap-5 border-b border-line py-8 transition-colors duration-200 hover:bg-ink/[0.02] md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-start md:gap-8 md:px-2 md:py-10"
              >
                <span className="font-mono text-xs tracking-[0.1em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium md:mt-7">
                  Read guide
                  <AnimatedArrow className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-16 grid gap-8 border border-line bg-ivory-soft p-7 md:mt-24 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-10">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                {"// Your project"}
              </p>
              <h2 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl">
                Have a project-specific question?
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                Tell us what you&apos;re considering. We&apos;ll give you a clear
                next step, without a sales pitch.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex min-h-11 items-center gap-2 border-b border-ink pb-1 text-sm font-medium"
            >
              Ask ElevenChase
              <AnimatedArrow className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
