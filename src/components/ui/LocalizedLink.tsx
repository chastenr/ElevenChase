"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizePathname } from "@/i18n/routing";

export function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { locale } = useLanguage();
  const localizedHref = typeof href === "string" && href.startsWith("/")
    ? localizePathname(href, locale)
    : href;

  return <NextLink href={localizedHref} {...props} />;
}

