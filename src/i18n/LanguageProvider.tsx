"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import japanese from "@/i18n/ja.json";

export type Locale = "en" | "ja";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (source: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "elevenchase-locale";
const translations: Record<string, string> = {
  ...(japanese as Record<string, string>),
  "From friction to production software.": "業務上の課題から、本番環境で使えるソフトウェアへ。",
  "Usually, something isn't working.": "多くの場合、何かがうまく機能していません。",
  "Software. AI. Infrastructure.": "ソフトウェア、AI、そしてインフラ。",
  "Think. Design. Build. Ship.": "考える。設計する。開発する。届ける。",
  "Small team. Serious engineering.": "少数精鋭の、本格的なエンジニアリング。",
  "Start with an audit.": "まずはサイト診断から。",
  "Have something worth building?": "実現したいアイデアはありますか？",
  "Tell us about your project.": "プロジェクトについてお聞かせください。",
  "Who builds your software.": "あなたのソフトウェアをつくる人。",
  "Let's build something.": "一緒につくりましょう。",
  "Clarity before code.": "コードを書く前に、目的を明確に。",
  "Built around the problem at hand.": "目の前の課題に合わせて設計します。",
  "Engineering notes.": "エンジニアリング・ノート。",
  "Before we start.": "始める前に。",
  "AI that works inside your business.": "ビジネスの現場で機能するAI。",
  "Have a workflow worth automating?": "自動化したい業務はありますか？",
  "Technical SEO built into the foundation.": "基盤から設計するテクニカルSEO。",
  "Websites that do more than exist.": "存在するだけではないウェブサイト。",
  "Ready for a website that works harder?": "成果につながるウェブサイトへ。",
  "Software built for the business you're running.": "ビジネスの現場を支えるソフトウェア。",
  "Have a product to build?": "つくりたいプロダクトはありますか？",
  "An embedded team, not an outside vendor.": "外部業者ではなく、チームの一員として。",
  "Need engineering capacity?": "開発体制を強化しませんか？",
  "What would you like to improve?": "改善したい項目を選択してください",
  "What are you building, and what problem is it solving?": "何をつくり、どのような課題を解決したいですか？",
  "Send me occasional ElevenChase insights, updates, and useful business tips. Unsubscribe anytime. See our": "ElevenChaseからの最新情報やビジネスに役立つ情報を受け取る（いつでも配信停止できます）。詳細は",
  "Switch to light mode": "ライトモードに切り替える",
  "Switch to dark mode": "ダークモードに切り替える",
  "Primary": "メインナビゲーション",
  "Mobile": "モバイルナビゲーション",
  "Footer": "フッターナビゲーション",
  "Legal": "法的情報",
  "Open menu": "メニューを開く",
  "Close menu": "メニューを閉じる",
  "Input": "入力",
  "Output": "成果",
  "Explore": "詳しく見る",
  "Founder & CEO": "創業者兼CEO",
  "Build": "開発",
  "Ship": "リリース",
  "Development": "開発",
  "Architecture": "アーキテクチャ",
  "Production": "本番環境",
  "Dismiss": "閉じる",
  "Technology": "使用技術",
  "What to expect": "ご利用の流れ",
  "Breadcrumb": "パンくずリスト",
  "Something went wrong. Please try again.": "問題が発生しました。もう一度お試しください。",
  "Too many submissions. Please try again in a little while.": "送信回数が上限に達しました。しばらくしてからもう一度お試しください。",
  "Please check your details and try again.": "入力内容をご確認のうえ、もう一度お試しください。",
  "Please fill in your name, email and website URL.": "お名前、メールアドレス、ウェブサイトURLを入力してください。",
  "Please fill in your name, email and a short description.": "お名前、メールアドレス、簡単なご相談内容を入力してください。",
  "Please enter a valid email address.": "有効なメールアドレスを入力してください。",
  "Please enter a valid website URL.": "有効なウェブサイトURLを入力してください。",
  "Name is too long.": "お名前が長すぎます。",
  "Email is too long.": "メールアドレスが長すぎます。",
  "Company name is too long.": "会社名が長すぎます。",
  "Website URL is too long.": "ウェブサイトURLが長すぎます。",
  "Message is too long.": "メッセージが長すぎます。",
  "Name contains invalid characters.": "お名前に使用できない文字が含まれています。",
  "Company contains invalid characters.": "会社名に使用できない文字が含まれています。",
  "Message contains invalid characters.": "メッセージに使用できない文字が含まれています。",
  "Thanks. We'll take a look and follow up with what we find.": "ありがとうございます。内容を確認し、診断結果をご連絡します。",
  "Request received. Thanks for reaching out to ElevenChase. We've sent a confirmation to your email and will review your project shortly.": "お問い合わせを受け付けました。確認メールをお送りしました。内容を確認のうえ、近日中にご連絡します。",
  "Thanks, your message was received. Email delivery isn't connected on this deployment yet, so please also reach out directly in the meantime.": "メッセージを受け付けました。現在この環境ではメール送信が設定されていないため、お手数ですが直接メールでもご連絡ください。",
  "Thanks, your request was received. Email delivery isn't connected on this deployment yet, so please also reach out directly in the meantime.": "ご依頼を受け付けました。現在この環境ではメール送信が設定されていないため、お手数ですが直接メールでもご連絡ください。",
};

function translate(source: string) {
  const exact = translations[source];
  if (exact) return exact;

  const testimonial = source.match(/^Show testimonial (\d+)$/);
  if (testimonial) return `お客様の声 ${testimonial[1]} を表示`;

  if (source.startsWith("Something went wrong while sending your request.")) {
    const email = source.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0];
    return `送信中に問題が発生しました。もう一度お試しいただくか、${email ?? "ElevenChase"}までご連絡ください。`;
  }

  return source;
}

function translateTextNode(node: Text) {
  const source = node.data;
  const trimmed = source.trim();
  if (!trimmed) return;

  const translated = translate(trimmed);
  if (translated === trimmed) return;

  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  node.data = `${leading}${translated}${trailing}`;
}

function translateElement(root: ParentNode) {
  const blocks = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("p, figcaption, dt, dd")]
    : [...root.querySelectorAll<HTMLElement>("p, figcaption, dt, dd")];

  for (const block of blocks) {
    if (!block.matches("p, figcaption, dt, dd") || block.children.length > 0) continue;
    const source = block.textContent?.replace(/\s+/g, " ").trim();
    if (!source) continue;
    const translated = translate(source);
    if (translated !== source) block.textContent = translated;
  }

  const headings = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6")]
    : [...root.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6")];

  for (const heading of headings) {
    if (!heading.matches("h1, h2, h3, h4, h5, h6")) continue;
    const source = heading.getAttribute("aria-label")
      ?? heading.textContent?.replace(/\s+/g, " ").trim();
    if (!source) continue;
    const translated = translate(source);
    if (translated !== source) {
      heading.textContent = translated;
      if (heading.hasAttribute("aria-label")) heading.setAttribute("aria-label", translated);
    }
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();

  while (current) {
    const parent = current.parentElement;
    if (parent && !parent.closest("script, style, noscript, [data-no-translate]")) {
      translateTextNode(current as Text);
    }
    current = walker.nextNode();
  }

  const elements = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("[aria-label], [title], [placeholder]")]
    : [...root.querySelectorAll<HTMLElement>("[aria-label], [title], [placeholder]")];

  for (const element of elements) {
    for (const attribute of ["aria-label", "title", "placeholder"] as const) {
      const source = element.getAttribute(attribute);
      if (source) element.setAttribute(attribute, translate(source));
    }
  }

  document.title = translate(document.title);
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = translate(description.content);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((nextLocale: Locale) => {
    localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dataset.locale = nextLocale;
    window.location.reload();
  }, []);

  useEffect(() => {
    const savedLocale = localStorage.getItem(STORAGE_KEY) === "ja" ? "ja" : "en";
    const stateFrame = window.requestAnimationFrame(() => setLocaleState(savedLocale));
    document.documentElement.lang = savedLocale;
    document.documentElement.dataset.locale = savedLocale;

    if (savedLocale !== "ja") {
      document.documentElement.dataset.i18nReady = "true";
      return () => window.cancelAnimationFrame(stateFrame);
    }

    translateElement(document.body);

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateTextNode(mutation.target as Text);
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node as Text);
          if (node instanceof Element) translateElement(node);
        }
      }
      observer.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    document.documentElement.dataset.i18nReady = "true";

    return () => {
      window.cancelAnimationFrame(stateFrame);
      observer.disconnect();
    };
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: locale === "ja" ? translate : (source) => source }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
