import { SITE, SERVICES_NAV } from "@/data/site";
import { ARTICLES } from "@/data/insights";

export const dynamic = "force-static";

/**
 * A concise, machine-readable orientation to the site for AI/LLM systems,
 * following the emerging llms.txt convention (llmstxt.org). Generated from
 * the same data sources as the rest of the site so it can't drift out of
 * sync — there is no separate hand-maintained copy of these facts.
 */
export function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of SERVICES_NAV.slice(0, 5)) {
    lines.push(`- [${service.label}](${SITE.url}${service.href}): ${service.description}`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push("");
  lines.push(`- [Homepage](${SITE.url}/): Overview of ${SITE.name}'s services, process and work.`);
  lines.push(`- [Company](${SITE.url}/company): Who ${SITE.name} is, founder background, and how the studio works.`);
  lines.push(`- [Insights](${SITE.url}/insights): Engineering-focused articles on software, AI, web development and technical SEO.`);
  lines.push(`- [Contact](${SITE.url}/#contact): Start a project or request a free website audit.`);
  lines.push(`- [Privacy Policy](${SITE.url}/privacy)`);
  lines.push(`- [Terms of Service](${SITE.url}/terms)`);
  lines.push(`- [Security](${SITE.url}/security): Responsible disclosure policy and vulnerability contact.`);
  lines.push("");

  if (ARTICLES.length > 0) {
    lines.push("## Insights articles");
    lines.push("");
    for (const article of ARTICLES) {
      lines.push(`- [${article.title}](${SITE.url}/insights/${article.slug}): ${article.excerpt}`);
    }
    lines.push("");
  }

  lines.push("## Notes");
  lines.push("");
  lines.push(`- ${SITE.name} is ${SITE.location.toLowerCase()} and works with clients ${SITE.availability.toLowerCase()}.`);
  lines.push("- Pricing depends on project scope and is not published as fixed rates; estimates are provided after understanding requirements.");
  lines.push("- The Work section on the homepage describes representative engagement types. Specific client names and metrics are published only once verified.");
  lines.push(`- Full machine-readable detail: ${SITE.url}/llms-full.txt`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
