export type ActivityItem = {
  label: string;
  category: string;
};

// Representative categories of engineering work, not tied to specific
// clients or dated events.
export const ACTIVITY_ITEMS: ActivityItem[] = [
  { label: "Implemented structured data", category: "SEO" },
  { label: "Optimized Core Web Vitals", category: "Performance" },
  { label: "Built multi-tenant authentication", category: "Software" },
  { label: "Integrated payment processing", category: "Software" },
  { label: "Created admin dashboard", category: "Software" },
  { label: "Connected CRM workflows", category: "Automation" },
  { label: "Implemented AI lead qualification", category: "AI" },
  { label: "Built booking automation", category: "Automation" },
  { label: "Migrated application to Next.js", category: "Web" },
  { label: "Optimized database queries", category: "Performance" },
  { label: "Integrated email automation", category: "Automation" },
  { label: "Created API integration", category: "Software" },
  { label: "Fixed indexing issues", category: "SEO" },
  { label: "Created conversion tracking", category: "SEO" },
  { label: "Configured automated deployment", category: "Software" },
  { label: "Built responsive application interface", category: "Web" },
];
