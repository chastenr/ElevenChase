import assert from "node:assert/strict";
import test from "node:test";
import {
  basePathname,
  htmlLanguages,
  localeFromPathname,
  localizePathname,
  localizedRoutePaths,
} from "../src/i18n/routing.ts";
import { localizedMetadata, localizedSeo } from "../src/i18n/seo.ts";

test("locale routes are detected from the URL", () => {
  assert.equal(localeFromPathname("/"), "en");
  assert.equal(localeFromPathname("/services"), "en");
  assert.equal(localeFromPathname("/ja"), "ja");
  assert.equal(localeFromPathname("/ja/services/seo"), "ja");
  assert.equal(localeFromPathname("/zh-tw"), "zh-tw");
  assert.equal(localeFromPathname("/zh-tw/contact"), "zh-tw");
});

test("language switching preserves the current content path", () => {
  assert.equal(basePathname("/ja/services/seo"), "/services/seo");
  assert.equal(localizePathname("/ja/services/seo", "zh-tw"), "/zh-tw/services/seo");
  assert.equal(localizePathname("/zh-tw/contact", "en"), "/contact");
  assert.equal(localizePathname("/company", "ja"), "/ja/company");
  assert.equal(localizePathname("/#contact", "ja"), "/ja#contact");
});

test("every localized route has typed Japanese and Traditional Chinese SEO copy", () => {
  for (const pathname of localizedRoutePaths) {
    assert.ok(localizedSeo.ja[pathname].title);
    assert.ok(localizedSeo.ja[pathname].description);
    assert.ok(localizedSeo["zh-tw"][pathname].title);
    assert.ok(localizedSeo["zh-tw"][pathname].description);
  }
});

test("localized metadata includes canonical and all hreflang equivalents", () => {
  const metadata = localizedMetadata("ja", "/services/software-development");
  assert.equal(
    metadata.alternates?.canonical,
    "https://www.elevenchase.com/ja/services/software-development",
  );
  assert.deepEqual(metadata.alternates?.languages, {
    en: "https://www.elevenchase.com/services/software-development",
    "ja-JP": "https://www.elevenchase.com/ja/services/software-development",
    "zh-Hant-TW": "https://www.elevenchase.com/zh-tw/services/software-development",
    "x-default": "https://www.elevenchase.com/services/software-development",
  });
  assert.equal(htmlLanguages.ja, "ja-JP");
  assert.equal(htmlLanguages["zh-tw"], "zh-Hant-TW");
});
