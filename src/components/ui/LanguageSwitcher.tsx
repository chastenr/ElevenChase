"use client";

import { Languages } from "lucide-react";
import { useLanguage, type Locale } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, setLocale } = useLanguage();

  function changeLanguage(nextLocale: Locale) {
    if (nextLocale !== locale) setLocale(nextLocale);
  }

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
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={cn(
          "min-h-8 px-2 font-mono text-[10px] tracking-[0.08em] transition-colors",
          locale === "en" ? "bg-ink text-ivory" : "text-muted hover:text-ink",
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => changeLanguage("ja")}
        className={cn(
          "min-h-8 px-2 font-mono text-[10px] tracking-[0.08em] transition-colors",
          locale === "ja" ? "bg-ink text-ivory" : "text-muted hover:text-ink",
        )}
        aria-pressed={locale === "ja"}
      >
        日本語
      </button>
      <button
        type="button"
        onClick={() => changeLanguage("zh-tw")}
        className={cn(
          "min-h-8 px-2 font-mono text-[10px] tracking-[0.08em] transition-colors",
          locale === "zh-tw" ? "bg-ink text-ivory" : "text-muted hover:text-ink",
        )}
        aria-pressed={locale === "zh-tw"}
      >
        {compact ? "繁中" : "繁體中文"}
      </button>
    </div>
  );
}
