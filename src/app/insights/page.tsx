import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { ARTICLE_CATEGORIES, ARTICLES } from "@/data/insights";
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
  "Engineering-focused writing on software, AI, web development and technical SEO from the ElevenChase team.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/insights" },
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
        <div className="max-w-2xl">
          <SectionLabel>{"// Insights"}</SectionLabel>
          <AnimatedText
            as="h1"
            trigger="mount"
            lines={["Engineering", "notes."]}
            className="mt-5 text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.03] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
              Practical writing on software engineering, AI, web development
              and technical SEO, published as we write it rather than on a
              schedule for its own sake.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <ul className="mt-10 flex flex-wrap gap-3 md:mt-14">
            {ARTICLE_CATEGORIES.map((category) => (
              <li
                key={category}
                className="border border-line px-4 py-2 font-mono text-xs tracking-[0.08em] text-muted uppercase"
              >
                {category}
              </li>
            ))}
          </ul>
        </Reveal>

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
          <div className="mt-16 border-t border-line md:mt-20">
            {sortedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group block border-b border-line py-8 transition-colors duration-200 hover:bg-ink/[0.02] md:py-10"
              >
                <div className="flex items-center gap-3 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2 className="mt-3 flex items-center gap-2 text-2xl font-medium tracking-tight">
                  {article.title}
                  <AnimatedArrow className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </h2>
                <p className="mt-2 max-w-xl text-muted">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
