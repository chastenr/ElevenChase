import { SITE } from "@/data/site";

export { jsonLdScriptProps } from "@/lib/json-ld";

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
    serviceType: name,
    name,
    description,
    url,
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
    },
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
    headline: title,
    description,
    url,
    datePublished,
    author: {
      "@type": "Person",
      name: author ?? SITE.ceoName,
    },
    publisher: {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
    },
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
