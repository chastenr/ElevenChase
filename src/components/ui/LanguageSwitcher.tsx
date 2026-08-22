"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { useLanguage, type Locale } from "@/i18n/LanguageProvider";
import { localizePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "elevenchase-locale";

export function LanguageSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale } = useLanguage();
  const pathname = usePathname();

  function rememberLanguage(
    event: MouseEvent<HTMLAnchorElement>,
    nextLocale: Locale,
  ) {
    localStorage.setItem(STORAGE_KEY, nextLocale);

    // Use native document navigation so the root document language, metadata
    // and translated content all initialize from the same locale. Next.js
    // client navigation intentionally preserves the root layout.
    event.currentTarget.href = `${localizePathname(pathname, nextLocale)}${window.location.search}${window.location.hash}`;
  }

  const optionClassName = (optionLocale: Locale) => cn(
    "inline-flex min-h-8 items-center px-2 font-mono text-[10px] tracking-[0.08em] transition-colors",
    locale === optionLocale
      ? "bg-ink text-ivory"
      : "text-muted hover:text-ink",
  );

  return (
    <div
      className={cn("flex min-h-11 items-center gap-1 border border-line px-1", className)}
      role="group"
      aria-label={
        locale === "ja"
          ? "言語を選択"
          : locale === "zh-tw"
            ? "選擇語言"
            : "Choose language"
      }
      data-no-translate
    >
      {!compact && <Languages size={15} className="ml-1 text-muted" aria-hidden="true" />}
      <a
        href={localizePathname(pathname, "en")}
        onClick={(event) => rememberLanguage(event, "en")}
        className={optionClassName("en")}
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </a>
      <a
        href={localizePathname(pathname, "ja")}
        onClick={(event) => rememberLanguage(event, "ja")}
        className={optionClassName("ja")}
        hrefLang="ja"
        lang="ja"
        aria-current={locale === "ja" ? "page" : undefined}
      >
        日本語
      </a>
      <a
        href={localizePathname(pathname, "zh-tw")}
        onClick={(event) => rememberLanguage(event, "zh-tw")}
        className={optionClassName("zh-tw")}
        hrefLang="zh-Hant-TW"
        lang="zh-Hant-TW"
        aria-current={locale === "zh-tw" ? "page" : undefined}
      >
        {compact ? "繁中" : "繁體中文"}
      </a>
    </div>
  );
}
