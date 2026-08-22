export const locales = ["en", "ja", "zh-tw"] as const;

export type Locale = (typeof locales)[number];

export const localizedLocales = ["ja", "zh-tw"] as const;

export const localizedRoutePaths = [
  "/",
  "/about",
  "/company",
  "/contact",
  "/faq",
  "/insights",
  "/insights/how-much-does-custom-software-development-cost",
  "/insights/how-to-choose-a-software-development-company",
  "/insights/in-house-vs-dedicated-engineering-team",
  "/privacy",
  "/process",
  "/security",
  "/services",
  "/services/ai-automation",
  "/services/dedicated-engineering",
  "/services/seo",
  "/services/seo-engineering",
  "/services/software-development",
  "/services/web-development",
  "/terms",
] as const;

export type LocalizedLocale = (typeof localizedLocales)[number];
export type LocalizedRoutePath = (typeof localizedRoutePaths)[number];

export const htmlLanguages: Record<Locale, string> = {
  en: "en",
  ja: "ja-JP",
  "zh-tw": "zh-Hant-TW",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ja" || value === "zh-tw";
}

export function isLocalizedLocale(value: string): value is LocalizedLocale {
  return value === "ja" || value === "zh-tw";
}

export function isLocalizedRoutePath(value: string): value is LocalizedRoutePath {
  return (localizedRoutePaths as readonly string[]).includes(value);
}

export function canonicalRoutePath(pathname: LocalizedRoutePath): LocalizedRoutePath {
  if (pathname === "/about") return "/company";
  if (pathname === "/services/seo-engineering") return "/services/seo";
  return pathname;
}

export function localeFromPathname(pathname: string): Locale {
  if (pathname === "/ja" || pathname.startsWith("/ja/")) return "ja";
  if (pathname === "/zh-tw" || pathname.startsWith("/zh-tw/")) return "zh-tw";
  return "en";
}

export function basePathname(pathname: string) {
  const withoutLocale = pathname.replace(/^\/(?:ja|zh-tw)(?=\/|$)/, "");
  return withoutLocale || "/";
}

export function localizePathname(pathname: string, locale: Locale) {
  const suffixIndex = pathname.search(/[?#]/);
  const suffix = suffixIndex === -1 ? "" : pathname.slice(suffixIndex);
  const pathOnly = suffixIndex === -1 ? pathname : pathname.slice(0, suffixIndex);
  const base = basePathname(pathOnly);
  if (locale === "en") return `${base}${suffix}`;
  const localized = base === "/" ? `/${locale}` : `/${locale}${base}`;
  return `${localized}${suffix}`;
}

export function absoluteLocalizedUrl(origin: string, pathname: string, locale: Locale) {
  return `${origin}${localizePathname(pathname, locale)}`;
}
