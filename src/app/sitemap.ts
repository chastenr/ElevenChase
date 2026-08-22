import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { ARTICLES } from "@/data/insights";
import { absoluteLocalizedUrl, type Locale } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep modification dates stable until content actually changes. Returning
  // the current time on every request sends search engines a false freshness
  // signal and can waste crawl budget.
  const lastModified = new Date("2026-08-22T00:00:00.000Z");

  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/company", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/process", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
    {
      path: "/services/software-development",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services/ai-automation",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services/web-development",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services/seo",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services/dedicated-engineering",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/insights", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/security", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const articleRoutes = ARTICLES.map((article) => ({
    path: `/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const allRoutes = [
    ...routes.map((route) => ({ ...route, lastModified })),
    ...articleRoutes,
  ];
  const locales: Locale[] = ["en", "ja", "zh-tw"];

  return allRoutes.flatMap((route) => {
    const languages = {
      en: absoluteLocalizedUrl(SITE.url, route.path, "en"),
      "ja-JP": absoluteLocalizedUrl(SITE.url, route.path, "ja"),
      "zh-Hant-TW": absoluteLocalizedUrl(SITE.url, route.path, "zh-tw"),
      "x-default": absoluteLocalizedUrl(SITE.url, route.path, "en"),
    };

    return locales.map((locale) => ({
      url: absoluteLocalizedUrl(SITE.url, route.path, locale),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: locale === "en" ? route.priority : Math.max(route.priority - 0.05, 0.1),
      alternates: { languages },
    }));
  });
}
