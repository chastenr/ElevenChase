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

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  readingTime: string;
};

// No articles published yet — add real, reviewed content here as it's
// written. Do not auto-generate placeholder posts.
export const ARTICLES: Article[] = [];
