import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { ARTICLES } from "@/data/insights";
import { PROJECTS } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/company", priority: 0.7, changeFrequency: "monthly" as const },
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
    { path: "/work", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/insights", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/security", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticEntries = routes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Every published article is automatically included — no manual sitemap
  // edits needed when adding a new post to src/data/insights.ts.
  const articleEntries = ARTICLES.map((article) => ({
    url: `${SITE.url}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const caseStudyEntries = PROJECTS.map((project) => ({
    url: `${SITE.url}/work/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries, ...caseStudyEntries];
}
