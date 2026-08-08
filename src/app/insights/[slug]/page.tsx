import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE } from "@/data/site";
import { ARTICLES } from "@/data/insights";
import { articleJsonLd, breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/structured-data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ServiceCta } from "@/components/service/ServiceCta";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: `${article.title} | ${SITE.name}`,
      description: article.excerpt,
      url: `${SITE.url}/insights/${article.slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const url = `${SITE.url}/insights/${article.slug}`;
  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.excerpt,
    url,
    datePublished: article.date,
    author: article.author,
  });
  const breadcrumb = breadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Insights", href: "/insights" },
    { label: article.title, href: `/insights/${article.slug}` },
  ]);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <script type="application/ld+json" {...jsonLdScriptProps(jsonLd)} />
      <script type="application/ld+json" {...jsonLdScriptProps(breadcrumb)} />

      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.08em] text-muted uppercase"
        >
          <Link href="/" className="transition-colors duration-200 hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/insights" className="transition-colors duration-200 hover:text-ink">
            Insights
          </Link>
        </nav>

        <div className="max-w-2xl">
          <SectionLabel>{article.category}</SectionLabel>
          <AnimatedText
            as="h1"
            trigger="mount"
            lines={[article.title]}
            className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.12}>
            <div className="mt-5 flex items-center gap-3 font-mono text-xs tracking-[0.1em] text-muted uppercase">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 border-t border-line pt-12 md:mt-16 md:pt-16">
            <ArticleBody blocks={article.body} />
          </div>
        </Reveal>
      </Container>

      <div className="mt-24 md:mt-32">
        <ServiceCta
          lines={["Have a project", "like this?"]}
          description="Tell us what you're building and we'll get back to you with next steps."
          ctaLabel="Start a project"
          ctaHref="/#contact"
        />
      </div>
    </section>
  );
}
