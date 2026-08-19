import { z } from "zod";

/**
 * Fixed value sets enforced by DB CHECK constraints (see the client
 * workspace schema migration) — safe to treat as closed enums.
 */
export const CLIENT_STATUSES = [
  "lead",
  "onboarding",
  "active",
  "maintenance",
  "paused",
  "completed",
  "inactive",
] as const;
export const clientStatusSchema = z.enum(CLIENT_STATUSES);

export const PROJECT_STATUSES = [
  "planning",
  "in_progress",
  "waiting_on_client",
  "review",
  "completed",
  "archived",
] as const;
export const projectStatusSchema = z.enum(PROJECT_STATUSES);

export const TASK_STATUSES = ["open", "in_progress", "waiting", "review", "done"] as const;
export const taskStatusSchema = z.enum(TASK_STATUSES);

export const TASK_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export const taskPrioritySchema = z.enum(TASK_PRIORITIES);

export const FILE_CATEGORIES = [
  "contracts",
  "proposals",
  "design",
  "development",
  "client_uploads",
  "deliverables",
  "other",
] as const;
export const fileCategorySchema = z.enum(FILE_CATEGORIES);

/**
 * Suggested value sets for extensible, free-text columns. The DB stores
 * these as plain `text` (no CHECK constraint) so new values never require
 * a migration — the UI should offer this list plus a custom option, and
 * validation should just require a non-empty string.
 */
export const SUGGESTED_SERVICE_TYPES = [
  { key: "website_development", label: "Website Development" },
  { key: "web_application", label: "Web Application" },
  { key: "mobile_application", label: "Mobile Application" },
  { key: "ai_development", label: "AI Development" },
  { key: "automation", label: "Automation" },
  { key: "maintenance", label: "Maintenance" },
  { key: "seo", label: "SEO" },
  { key: "custom_software", label: "Custom Software" },
] as const;

export const SUGGESTED_TEAM_RESPONSIBILITIES = [
  { key: "account_owner", label: "Account Owner" },
  { key: "project_manager", label: "Project Manager" },
  { key: "lead_developer", label: "Lead Developer" },
  { key: "developer", label: "Developer" },
  { key: "designer", label: "Designer" },
  { key: "qa", label: "QA" },
  { key: "sales", label: "Sales" },
  { key: "customer_success", label: "Customer Success" },
] as const;

export const SUGGESTED_RESOURCE_LINK_TYPES = [
  { key: "production_website", label: "Production Website" },
  { key: "staging_website", label: "Staging Website" },
  { key: "github", label: "GitHub" },
  { key: "vercel", label: "Vercel" },
  { key: "supabase", label: "Supabase" },
  { key: "google_drive", label: "Google Drive" },
  { key: "figma", label: "Figma" },
  { key: "analytics", label: "Analytics" },
  { key: "search_console", label: "Search Console" },
  { key: "other", label: "Other" },
] as const;

/** Free-text columns validated as "non-empty, reasonable length" rather than a closed enum. */
export const freeTextKeySchema = z.string().trim().min(1).max(64);
