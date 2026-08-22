import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Geist_Mono, Noto_Sans_JP, Noto_Sans_TC } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/data/site";
import {
  jsonLdScriptProps,
  organizationJsonLd,
  founderJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { htmlLanguages, isLocale } from "@/i18n/routing";
import { englishAlternates } from "@/i18n/seo";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans-primary",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const japaneseSans = Noto_Sans_JP({
  variable: "--font-sans-japanese",
  weight: "variable",
  display: "swap",
  preload: false,
  fallback: ["Hiragino Sans", "Yu Gothic", "Meiryo", "sans-serif"],
});

const traditionalChineseSans = Noto_Sans_TC({
  variable: "--font-sans-traditional-chinese",
  weight: "variable",
  display: "swap",
  preload: false,
  fallback: ["PingFang TC", "Microsoft JhengHei", "Heiti TC", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "software engineering studio",
    "AI engineering",
    "AI automation",
    "web development",
    "technical SEO",
    "Next.js development",
    "SaaS development",
    "product development",
  ],
  authors: [{ name: SITE.name }],
  alternates: englishAlternates("/"),
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    google: "notranslate",
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
const LANGUAGE_INIT_SCRIPT = `(function(){try{var p=window.location.pathname;var l=p==='/ja'||p.indexOf('/ja/')===0?'ja':p==='/zh-tw'||p.indexOf('/zh-tw/')===0?'zh-tw':'en';var h=l==='ja'?'ja-JP':l==='zh-tw'?'zh-Hant-TW':'en';document.documentElement.lang=h;document.documentElement.setAttribute('data-locale',l);}catch(e){}})();`;

const GOOGLE_ANALYTICS_ID = "G-DRKHQW2GN8";
const GOOGLE_TAG_MANAGER_ID = "GTM-PRPX2278";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const localeHeader = (await headers()).get("x-elevenchase-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";

  return (
    <html
      lang={htmlLanguages[locale]}
      data-locale={locale}
      suppressHydrationWarning
      className={`${sans.variable} ${geistMono.variable} ${japaneseSans.variable} ${traditionalChineseSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-ink">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            className="hidden invisible"
            title="Google Tag Manager"
          />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANGUAGE_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          {...jsonLdScriptProps(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          {...jsonLdScriptProps(founderJsonLd())}
        />
        <script
          type="application/ld+json"
          {...jsonLdScriptProps(websiteJsonLd())}
        />
        <LanguageProvider initialLocale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
