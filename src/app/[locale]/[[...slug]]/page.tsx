import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import CompanyPage from "@/app/company/page";
import ContactPage from "@/app/contact/page";
import FaqPage from "@/app/faq/page";
import InsightsPage from "@/app/insights/page";
import ArticlePage from "@/app/insights/[slug]/page";
import PrivacyPage from "@/app/privacy/page";
import ProcessPage from "@/app/process/page";
import SecurityPage from "@/app/security/page";
import ServicesPage from "@/app/services/page";
import AiAutomationPage from "@/app/services/ai-automation/page";
import DedicatedEngineeringPage from "@/app/services/dedicated-engineering/page";
import SeoPage from "@/app/services/seo/page";
import SeoEngineeringPage from "@/app/services/seo-engineering/page";
import SoftwareDevelopmentPage from "@/app/services/software-development/page";
import WebDevelopmentPage from "@/app/services/web-development/page";
import TermsPage from "@/app/terms/page";
import { SITE } from "@/data/site";
import { jsonLdScriptProps } from "@/lib/json-ld";
import {
  absoluteLocalizedUrl,
  canonicalRoutePath,
  htmlLanguages,
  isLocalizedLocale,
  isLocalizedRoutePath,
  localizedLocales,
  localizedRoutePaths,
  type LocalizedRoutePath,
} from "@/i18n/routing";
import { localizedMetadata, localizedSeo } from "@/i18n/seo";

type LocalizedPageParams = Promise<{
  locale: string;
  slug?: string[];
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) =>
    localizedRoutePaths.map((pathname) => {
      const slug = pathname === "/" ? undefined : pathname.slice(1).split("/");
      return slug ? { locale, slug } : { locale };
    }),
  );
}

function resolveRoute(localeValue: string, slug?: string[]) {
  const pathname = slug?.length ? `/${slug.join("/")}` : "/";
  if (!isLocalizedLocale(localeValue) || !isLocalizedRoutePath(pathname)) {
    notFound();
  }
  return { locale: localeValue, pathname };
}

export async function generateMetadata({
  params,
}: {
  params: LocalizedPageParams;
}): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const { locale, pathname } = resolveRoute(localeValue, slug);
  return localizedMetadata(locale, pathname);
}

function LocalizedRoute({ pathname }: { pathname: LocalizedRoutePath }) {
  switch (pathname) {
    case "/":
      return <HomePage />;
    case "/about":
      return <AboutPage />;
    case "/company":
      return <CompanyPage />;
    case "/contact":
      return <ContactPage />;
    case "/faq":
      return <FaqPage />;
    case "/insights":
      return <InsightsPage />;
    case "/insights/how-much-does-custom-software-development-cost":
      return <ArticlePage params={Promise.resolve({ slug: "how-much-does-custom-software-development-cost" })} searchParams={Promise.resolve({})} />;
    case "/insights/how-to-choose-a-software-development-company":
      return <ArticlePage params={Promise.resolve({ slug: "how-to-choose-a-software-development-company" })} searchParams={Promise.resolve({})} />;
    case "/insights/in-house-vs-dedicated-engineering-team":
      return <ArticlePage params={Promise.resolve({ slug: "in-house-vs-dedicated-engineering-team" })} searchParams={Promise.resolve({})} />;
    case "/privacy":
      return <PrivacyPage />;
    case "/process":
      return <ProcessPage />;
    case "/security":
      return <SecurityPage />;
    case "/services":
      return <ServicesPage />;
    case "/services/ai-automation":
      return <AiAutomationPage />;
    case "/services/dedicated-engineering":
      return <DedicatedEngineeringPage />;
    case "/services/seo":
      return <SeoPage />;
    case "/services/seo-engineering":
      return <SeoEngineeringPage />;
    case "/services/software-development":
      return <SoftwareDevelopmentPage />;
    case "/services/web-development":
      return <WebDevelopmentPage />;
    case "/terms":
      return <TermsPage />;
  }
}

export default async function LocalizedPage({ params }: { params: LocalizedPageParams }) {
  const { locale: localeValue, slug } = await params;
  const { locale, pathname } = resolveRoute(localeValue, slug);
  const copy = localizedSeo[locale][pathname];
  const url = absoluteLocalizedUrl(SITE.url, canonicalRoutePath(pathname), locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.title,
    description: copy.description,
    url,
    inLanguage: htmlLanguages[locale],
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" {...jsonLdScriptProps(jsonLd)} />
      <LocalizedRoute pathname={pathname} />
    </>
  );
}
