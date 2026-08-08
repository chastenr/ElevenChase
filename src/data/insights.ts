export type ArticleCategory =
  | "Software Engineering"
  | "AI & Automation"
  | "Web Development"
  | "Technical SEO"
  | "Product Development";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Software Engineering",
  "AI & Automation",
  "Web Development",
  "Technical SEO",
  "Product Development",
];

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language?: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  /** ISO date string, e.g. "2026-01-15". Used for sorting and JSON-LD. */
  date: string;
  readingTime: string;
  author?: string;
  body: ArticleBlock[];
};

// No articles published yet. Add real, reviewed content here as it's
// written. Do not auto-generate placeholder posts. The listing page and
// /insights/[slug] detail route both work correctly with an empty array.
export const ARTICLES: Article[] = [];
