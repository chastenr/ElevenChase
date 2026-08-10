import { SITE } from "@/data/site";

export { jsonLdScriptProps } from "@/lib/json-ld";

// Stable @id anchors so Organization/WebSite/Person are defined once (in the
// root layout, present on every page) and referenced by every other schema
// block via {"@id": ...} rather than duplicated as disconnected objects.
export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const FOUNDER_ID = `${SITE.url}/#founder`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/logo-mark.png`,
    image: `${SITE.url}/logo-mark.png`,
    description: SITE.description,
    areaServed: "Worldwide",
    email: SITE.email,
    knowsAbout: [
      "Software Development",
      "AI Engineering",
      "Workflow Automation",
      "Web Development",
      "Technical SEO",
    ],
    founder: { "@id": FOUNDER_ID },
    ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
  };
}

export function founderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: SITE.ceoName,
    jobTitle: SITE.ceoTitle,
    email: SITE.email,
    worksFor: { "@id": ORGANIZATION_ID },
    ...(SITE.founderSameAs.length > 0 ? { sameAs: SITE.founderSameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function serviceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: name,
    name,
    description,
    url,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "Worldwide",
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    datePublished,
    author: author
      ? { "@type": "Person", name: author }
      : { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE.url}${item.href}`,
    })),
  };
}
