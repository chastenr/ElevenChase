import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
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
    { path: "/insights", priority: 0.6, changeFrequency: "weekly" as const },
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
