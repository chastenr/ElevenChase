import { SITE, SERVICES_NAV } from "@/data/site";
import { FAQS } from "@/data/faq";
import { PROCESS_STEPS } from "@/data/process";
import { PRINCIPLES } from "@/data/principles";
import { ARTICLES } from "@/data/insights";

export const dynamic = "force-static";

/**
 * Expanded machine-readable reference for AI/LLM systems. Generated from
 * the same data sources as the rest of the site (FAQ, process, principles,
 * services, articles) so it stays factually synchronized automatically —
 * there is no separate hand-maintained copy of these facts to go stale.
 */
export function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    `${SITE.name} is a ${SITE.location.toLowerCase()} software and AI engineering studio that helps companies design, build, launch, automate and improve software products and digital systems. It works with clients ${SITE.availability.toLowerCase()}.`,
  );
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of SERVICES_NAV.slice(0, 5)) {
    lines.push(`### ${service.label}`);
    lines.push(`URL: ${SITE.url}${service.href}`);
    lines.push(service.description);
    lines.push("");
  }

  lines.push("## Process");
  lines.push("");
  for (const step of PROCESS_STEPS) {
    lines.push(`- ${step.title}: ${step.description}`);
  }
  lines.push("");

  lines.push("## Why ElevenChase");
  lines.push("");
  for (const principle of PRINCIPLES) {
    lines.push(`- ${principle.title}: ${principle.detail}`);
  }
  lines.push("");

  lines.push("## Frequently asked questions");
  lines.push("");
  for (const faq of FAQS) {
    lines.push(`Q: ${faq.question}`);
    lines.push(`A: ${faq.answer}`);
    lines.push("");
  }

  if (ARTICLES.length > 0) {
    lines.push("## Insights articles");
    lines.push("");
    for (const article of ARTICLES) {
      lines.push(`### ${article.title}`);
      lines.push(`URL: ${SITE.url}/insights/${article.slug}`);
      lines.push(`Category: ${article.category}`);
      lines.push(article.excerpt);
      lines.push("");
    }
  }

  lines.push("## Company pages");
  lines.push("");
  lines.push(`- Homepage: ${SITE.url}/`);
  lines.push(`- Company / about: ${SITE.url}/company`);
  lines.push(`- Selected engineering work: ${SITE.url}/work`);
  lines.push(`- Insights: ${SITE.url}/insights`);
  lines.push(`- Privacy Policy: ${SITE.url}/privacy`);
  lines.push(`- Terms of Service: ${SITE.url}/terms`);
  lines.push(`- Security / responsible disclosure: ${SITE.url}/security`);
  lines.push(`- Contact / start a project: ${SITE.url}/#contact`);
  lines.push(`- Free website audit request: ${SITE.url}/#audit`);
  lines.push("");

  lines.push("## Founder");
  lines.push("");
  lines.push(`- ${SITE.ceoName}, ${SITE.ceoTitle} of ${SITE.name}.`);
  lines.push(`- Contact: ${SITE.email}`);
  lines.push("");

  lines.push("## Honest limitations");
  lines.push("");
  lines.push(
    "- Pricing is not published as fixed rates because scope, complexity and timeline vary too much between projects; estimates are provided after a scoping conversation.",
  );
  lines.push(
    "- Case studies on the homepage Work section describe representative engagement types (project type, problem, solution, technology). Specific client names, industries and measurable outcomes are added only once available and verified.",
  );
  lines.push(
    "- No fixed office location beyond remote-first/worldwide; no public awards, certifications or third-party ratings are claimed.",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
