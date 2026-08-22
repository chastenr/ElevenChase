import type { Metadata } from "next";
import { SITE } from "../data/site.ts";
import {
  absoluteLocalizedUrl,
  canonicalRoutePath,
  type LocalizedLocale,
  type LocalizedRoutePath,
} from "./routing.ts";

type SeoCopy = { title: string; description: string };

const japaneseDescription =
  "プロダクト開発、業務自動化、Web開発、AIシステムを支援するソフトウェアエンジニアリングスタジオです。";
const chineseDescription =
  "提供產品開發、營運自動化、網站工程與 AI 系統的軟體工程工作室。";

export const localizedSeo: Record<
  LocalizedLocale,
  Record<LocalizedRoutePath, SeoCopy>
> = {
  ja: {
    "/": { title: "ソフトウェア・AI開発", description: japaneseDescription },
    "/about": { title: "ElevenChaseについて", description: "ElevenChaseのチーム、開発姿勢、提供するエンジニアリングサービスをご紹介します。" },
    "/company": { title: "ElevenChaseについて", description: "ElevenChaseのチーム、開発姿勢、提供するエンジニアリングサービスをご紹介します。" },
    "/contact": { title: "プロジェクトのご相談", description: "ソフトウェア、AI、自動化、Web開発についてElevenChaseへご相談ください。" },
    "/faq": { title: "よくあるご質問", description: "費用、開発期間、既存システム、AI、権利、リリース後の支援についてお答えします。" },
    "/insights": { title: "インサイト", description: "ソフトウェア開発の費用、開発会社の選び方、要件整理など、開発前の意思決定に役立つ実践ガイドです。" },
    "/insights/how-much-does-custom-software-development-cost": { title: "カスタムソフトウェア開発の費用相場", description: "開発費を左右する要素と、信頼できる見積もりを得るためのポイントを解説します。" },
    "/insights/how-to-choose-a-software-development-company": { title: "ソフトウェア開発会社の選び方", description: "技術力、コミュニケーション、料金の透明性、本番運用の実績から開発会社を評価する方法です。" },
    "/insights/in-house-vs-dedicated-engineering-team": { title: "内製か外部開発チームか。判断のポイント", description: "内製採用と外部の専任開発チーム、それぞれが適する状況を比較します。" },
    "/privacy": { title: "プライバシーポリシー", description: "ElevenChaseにおける個人情報の収集、利用、保管、削除について説明します。" },
    "/process": { title: "開発プロセス", description: "課題の理解、設計、開発、リリースまで、ElevenChaseの進め方をご紹介します。" },
    "/security": { title: "セキュリティ", description: "elevenchase.comに関する脆弱性の報告方法と対応方針をご案内します。" },
    "/services": { title: "エンジニアリングサービス", description: japaneseDescription },
    "/services/ai-automation": { title: "AI・業務自動化", description: "既存業務に統合できるAIエージェント、文書処理、ワークフロー自動化を開発します。" },
    "/services/dedicated-engineering": { title: "専任エンジニアリング支援", description: "既存チームと直接連携し、継続的な開発を支えるエンジニアまたは少人数チームを提供します。" },
    "/services/seo": { title: "テクニカルSEO", description: "検索エンジンとAI検索が理解しやすいサイト構造、表示速度、構造化データを実装します。" },
    "/services/seo-engineering": { title: "テクニカルSEO", description: "検索エンジンとAI検索が理解しやすいサイト構造、表示速度、構造化データを実装します。" },
    "/services/software-development": { title: "ソフトウェア開発", description: "実際の業務フローに合わせた、本番運用できるソフトウェアとSaaSプロダクトを開発します。" },
    "/services/web-development": { title: "Web開発", description: "ブランド、使いやすさ、コンバージョン、パフォーマンスを両立するWebサイトを構築します。" },
    "/terms": { title: "利用規約", description: "elevenchase.comの利用条件について説明します。" },
  },
  "zh-tw": {
    "/": { title: "軟體與 AI 工程", description: chineseDescription },
    "/about": { title: "關於 ElevenChase", description: "了解 ElevenChase 的團隊、工程理念與服務方式。" },
    "/company": { title: "關於 ElevenChase", description: "了解 ElevenChase 的團隊、工程理念與服務方式。" },
    "/contact": { title: "洽談專案", description: "與 ElevenChase 洽談軟體、AI、自動化或網站工程專案。" },
    "/faq": { title: "常見問答", description: "了解專案費用、時程、既有系統、AI、權利歸屬與上線後支援。" },
    "/insights": { title: "洞察", description: "提供軟體開發成本、開發夥伴選擇與專案範圍規劃等實用指南，協助您在開發前做出更清楚的決策。" },
    "/insights/how-much-does-custom-software-development-cost": { title: "客製化軟體開發費用解析", description: "說明影響軟體開發費用的因素，以及如何取得可信賴的估價。" },
    "/insights/how-to-choose-a-software-development-company": { title: "如何選擇軟體開發公司", description: "從技術能力、溝通方式、價格透明度與正式營運經驗評估開發公司。" },
    "/insights/in-house-vs-dedicated-engineering-team": { title: "內部招募或專屬工程團隊：如何選擇", description: "比較內部招募與外部專屬工程團隊分別適合的情況。" },
    "/privacy": { title: "隱私權政策", description: "說明 ElevenChase 如何收集、使用、保存與刪除個人資料。" },
    "/process": { title: "合作流程", description: "了解 ElevenChase 從釐清問題、設計、開發到正式上線的合作方式。" },
    "/security": { title: "資訊安全", description: "說明如何回報影響 elevenchase.com 的資安漏洞，以及後續處理方式。" },
    "/services": { title: "工程服務", description: chineseDescription },
    "/services/ai-automation": { title: "AI 與營運自動化", description: "打造能整合既有營運的 AI 代理、文件處理與工作流程自動化。" },
    "/services/dedicated-engineering": { title: "專屬工程團隊", description: "由專屬工程師或精實團隊加入既有流程，持續支援產品開發。" },
    "/services/seo": { title: "技術 SEO", description: "建置網站架構、效能與結構化資料，讓搜尋引擎和 AI 搜尋正確理解內容。" },
    "/services/seo-engineering": { title: "技術 SEO", description: "建置網站架構、效能與結構化資料，讓搜尋引擎和 AI 搜尋正確理解內容。" },
    "/services/software-development": { title: "軟體開發", description: "依照真實營運流程，打造可正式上線的軟體與 SaaS 產品。" },
    "/services/web-development": { title: "網站工程", description: "打造兼顧品牌、使用體驗、轉換成效與效能的網站。" },
    "/terms": { title: "服務條款", description: "說明 elevenchase.com 的網站使用條款。" },
  },
};

export function localizedAlternates(pathname: LocalizedRoutePath) {
  const canonicalPath = canonicalRoutePath(pathname);
  return {
    "en": absoluteLocalizedUrl(SITE.url, canonicalPath, "en"),
    "ja-JP": absoluteLocalizedUrl(SITE.url, canonicalPath, "ja"),
    "zh-Hant-TW": absoluteLocalizedUrl(SITE.url, canonicalPath, "zh-tw"),
    "x-default": absoluteLocalizedUrl(SITE.url, canonicalPath, "en"),
  };
}

export function englishAlternates(pathname: LocalizedRoutePath) {
  const canonicalPath = canonicalRoutePath(pathname);
  return {
    canonical: canonicalPath,
    languages: localizedAlternates(pathname),
  };
}

export function englishMetadata({
  pathname,
  title,
  description,
  type = "website",
  publishedTime,
  robots = { index: true, follow: true },
}: {
  pathname: LocalizedRoutePath;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  robots?: Metadata["robots"];
}): Metadata {
  const canonicalPath = canonicalRoutePath(pathname);
  const url = absoluteLocalizedUrl(SITE.url, canonicalPath, "en");
  const socialTitle = `${title} | ${SITE.name}`;

  return {
    title,
    description,
    alternates: englishAlternates(pathname),
    robots,
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      title: socialTitle,
      description,
      locale: "en_US",
      alternateLocale: ["ja_JP", "zh_TW"],
      images: [
        {
          url: `${SITE.url}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — Software, AI and web engineering`,
        },
      ],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [`${SITE.url}/twitter-image.jpg`],
    },
  };
}

export function localizedMetadata(
  locale: LocalizedLocale,
  pathname: LocalizedRoutePath,
): Metadata {
  const copy = localizedSeo[locale][pathname];
  const url = absoluteLocalizedUrl(SITE.url, canonicalRoutePath(pathname), locale);
  const language = locale === "ja" ? "ja_JP" : "zh_TW";
  const socialTitle = `${copy.title} | ${SITE.name}`;
  const isArticle = pathname.startsWith("/insights/");

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: localizedAlternates(pathname),
    },
    openGraph: {
      type: isArticle ? "article" : "website",
      url,
      siteName: SITE.name,
      title: socialTitle,
      description: copy.description,
      locale: language,
      alternateLocale: locale === "ja" ? ["en_US", "zh_TW"] : ["en_US", "ja_JP"],
      images: [
        {
          url: `${SITE.url}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — Software, AI and web engineering`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: copy.description,
      images: [`${SITE.url}/twitter-image.jpg`],
    },
    robots: { index: true, follow: true },
  };
}
