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
  "ElevenChase // Software + AI Engineering": "ElevenChase // Software + AI Engineering",
  "We build the software ambitious companies run on.": "事業を動かす\nソフトウェア。",
  "Design, engineering and AI systems for companies building serious products, automating operations and scaling what already works.": "本気でプロダクトを育てる企業へ。設計・開発・AIで、事業の成長を支えます。",
  "Start a project": "プロジェクトのご相談",
  "Scroll to explore ↓": "スクロールして見る ↓",
  "Software": "ソフトウェア",
  "Automation": "自動化",
  "Web": "Web",
  "Platforms": "プラットフォーム",
  "Remote-first": "リモート対応",
  "Worldwide": "世界各地",
  "// The premise": "// 私たちの考え方",
  "Good software is not about adding more technology.": "優れたソフトウェアは、技術を増やすことが目的ではありません。",
  "It is about removing friction from the way a business operates.": "事業の流れから、無駄や摩擦をなくすためのものです。",
  "ElevenChase works from the business problem outward — designing the system, automation or digital product that creates the clearest operational advantage.": "ElevenChaseは、まず事業課題を理解し、成果につながるシステム・自動化・デジタルプロダクトを設計します。",
  "// How ElevenChase thinks": "// ElevenChaseのアプローチ",
  "Scroll sequence / 03": "プロセス / 03",
  "Fig. 01 — Turning operational problems into production software.": "図01 — 業務課題を、本番環境で使えるソフトウェアへ。",
  "From friction to production software.": "業務上の課題から、本番環境で使えるソフトウェアへ。",
  "The problem enters the system.": "まず、課題を正しく捉える。",
  "We start with the operation as it exists today — the people, constraints and systems that shape the real problem.": "現場の業務、人、制約、既存システムを理解し、本質的な課題を明らかにします。",
  "Business problem": "事業課題",
  "Users": "ユーザー",
  "Current systems": "既存システム",
  "Operational constraints": "業務上の制約",
  "Engineering": "設計・開発",
  "The work becomes an architecture.": "課題を、実装可能な設計へ。",
  "Strategy, product decisions and engineering move together until the right system is clear enough to build.": "戦略、プロダクト設計、エンジニアリングを一体で進め、構築すべき仕組みを明確にします。",
  "Strategy": "戦略",
  "Design": "設計",
  "The system leaves ready for production.": "本番環境で使える状態まで届ける。",
  "The result is working software tied to a measurable operational improvement, with infrastructure that can keep scaling.": "測定可能な業務改善につながるソフトウェアと、成長に対応できる基盤を提供します。",
  "Working software": "実際に使えるソフトウェア",
  "Measurable improvement": "測定できる改善",
  "Scalable infrastructure": "拡張可能な基盤",
  "// Satisfied clients": "// お客様からの信頼",
  "Trusted with work that matters.": "重要なプロジェクトをお任せいただいています。",
  "// When companies come to us": "// ご相談いただくタイミング",
  "Usually, something isn't working.": "多くの場合、何かがうまく機能していません。",
  "When manual work is becoming the bottleneck": "手作業が、事業成長のボトルネックになっている",
  "Automation + internal systems": "自動化・社内システム",
  "When the product needs to become real": "アイデアを、実際に使えるプロダクトにしたい",
  "Software engineering": "ソフトウェア開発",
  "When leads keep falling through the cracks": "見込み顧客への対応に抜け漏れがある",
  "CRM + AI + automation": "CRM・AI・自動化",
  "When the website no longer represents the business": "Webサイトが、今の事業価値を伝えられていない",
  "Web + conversion + SEO": "Web・コンバージョン・SEO",
  "// What we build": "// 提供するもの",
  "Software. AI. Infrastructure.": "ソフトウェア、AI、そしてインフラ。",
  "We build the systems companies use to launch products, remove operational drag and create durable digital infrastructure.": "プロダクトの立ち上げ、業務効率化、長く使えるデジタル基盤の構築を支援します。",
  "Software Development": "ソフトウェア開発",
  "Production-ready digital products designed around real business workflows.": "実際の業務フローに合わせた、本番運用できるデジタルプロダクト。",
  "Customer portals": "顧客ポータル",
  "Internal tools": "社内ツール",
  "Dashboards": "ダッシュボード",
  "API platforms": "APIプラットフォーム",
  "AI + Automation": "AI・自動化",
  "AI that works inside real operations rather than sitting in a demo.": "デモで終わらず、実際の業務で成果を生むAI。",
  "AI agents": "AIエージェント",
  "LLM applications": "LLMアプリケーション",
  "RAG systems": "RAGシステム",
  "Voice AI": "音声AI",
  "Document processing": "文書処理",
  "Workflow automation": "業務自動化",
  "Web Engineering": "Web開発",
  "High-performance websites engineered around brand, usability and conversion.": "ブランド、使いやすさ、成果を両立する高性能なWebサイト。",
  "Conversion optimization": "コンバージョン改善",
  "Performance": "パフォーマンス",
  "SEO Engineering": "SEOエンジニアリング",
  "Technical search infrastructure built directly into your website.": "検索に強い技術基盤を、Webサイトへ直接実装します。",
  "Technical SEO": "テクニカルSEO",
  "Structured data": "構造化データ",
  "Indexing": "インデックス最適化",
  "Programmatic SEO": "プログラマティックSEO",
  "AI search foundations": "AI検索への対応基盤",
  "Explore Software": "ソフトウェア開発を見る",
  "Explore AI + Automation": "AI・自動化を見る",
  "Explore Web": "Web開発を見る",
  "Explore SEO": "SEO支援を見る",
  "Worldwide collaboration": "世界各地のチームに対応",
  "Direct": "直接連携",
  "Engineer access": "担当エンジニアと直接対話",
  "Built beyond prototypes": "試作品で終わらない品質",
  "Full-stack": "一貫対応",
  "Strategy through deployment": "戦略からリリースまで",
  "// How we work": "// 進め方",
  "Think. Design. Build. Ship.": "考える。設計する。開発する。届ける。",
  "A focused way of working, from first conversation to shipped software, with visible progress at every stage.": "最初のご相談からリリースまで、各段階の進捗を共有しながら着実に進めます。",
  "Understand": "理解する",
  "Understand the problem, goals, users and constraints.": "課題、目標、ユーザー、制約を理解します。",
  "Define the experience, architecture and technical direction.": "体験、システム構成、技術方針を設計します。",
  "Work in focused development cycles with visible progress.": "短い開発サイクルで、動く成果を継続的に共有します。",
  "Deploy production-ready software, measure performance and keep improving.": "本番リリース後も効果を測定し、改善を続けます。",
  "// ElevenChase": "// ElevenChaseについて",
  "Small team. Serious engineering.": "少数精鋭の、本格的なエンジニアリング。",
  "ElevenChase is an independent software engineering studio helping companies turn ideas, workflows and complex operational problems into software people actually want to use.": "ElevenChaseは、アイデアや複雑な業務課題を、現場で本当に使われるソフトウェアへ変える独立系エンジニアリングスタジオです。",
  "You work directly with the people designing and writing your software, from early strategy through production, instead of a rotating account team. Clear scope, clear communication, and engineers who stay hands-on the entire way.": "営業担当を介さず、戦略から本番運用まで担当エンジニアと直接進めます。明確な範囲、率直なコミュニケーション、一貫した責任体制を大切にしています。",
  "More about ElevenChase →": "ElevenChaseについて詳しく見る →",
  "// Not ready for a project?": "// まずは現状を知りたい方へ",
  "Start with an audit.": "まずはサイト診断から。",
  "We'll review your site's technical foundation, performance, search structure and conversion path and tell you what is actually worth fixing.": "技術基盤、表示速度、検索構造、コンバージョン導線を確認し、優先して改善すべき点をお伝えします。",
  "Request an audit": "無料診断を依頼する",
  "Ready when you are": "いつでもご相談ください",
  "Have something worth building?": "実現したいアイデアはありますか？",
  "Tell us what you're building. We'll reply with a clear next step: what it would take to build, and how we'd approach it.": "構想や課題をお聞かせください。必要な進め方と次のステップを明確にご案内します。",
  "Book a discovery call": "初回相談を予約する",
  "No sales deck. No unnecessary calls. Just a clear next step.": "押し売りや不要な打ち合わせはありません。必要な次の一歩だけをお伝えします。",
  "Questions first? Read the FAQ →": "よくあるご質問を見る →",
  "// Contact": "// お問い合わせ",
  "Tell us about your project.": "プロジェクトについてお聞かせください。",
  "A few details are enough to get started. We'll reply with next steps.": "簡単な内容だけで構いません。確認後、次のステップをご連絡します。",
  "Name": "お名前",
  "Email": "メールアドレス",
  "(optional)": "（任意）",
  "Company": "会社概要",
  "Company name": "会社名",
  "Website": "Webサイト",
  "What do you need?": "ご相談内容",
  "Budget": "ご予算",
  "Timeline": "ご希望時期",
  "Project details": "プロジェクトの詳細",
  "Select one": "選択してください",
  "Not sure yet": "まだ決まっていない",
  "Software Product": "ソフトウェア開発",
  "Existing Software": "既存システムの改善",
  "Dedicated Engineering": "専任エンジニアリング支援",
  "Technical Partnership": "技術パートナーシップ",
  "Start the conversation": "相談内容を送信する",
  "Sending…": "送信中…",
  "Home": "ホーム",
  "// Services": "// サービス",
  "Built around the problem at hand.": "課題に合わせた、最適な開発を。",
  "ElevenChase designs and ships the software, AI systems and digital infrastructure ambitious companies rely on.": "ElevenChaseは、成長を目指す企業に必要なソフトウェア、AI、デジタル基盤を設計・開発します。",
  "Have a difficult problem to solve?": "解決したい難しい課題はありますか？",
  "Tell us where the friction is. We'll help define the right system to remove it.": "どこに課題があるかをお聞かせください。解決に必要な仕組みから一緒に整理します。",
  "Production-ready digital products built around real business workflows, from a first working prototype to the platform your business runs on.": "最初の実用的なプロトタイプから、事業を支えるプラットフォームまで。実際の業務フローに合わせて、本番運用できるプロダクトを構築します。",
  "Products, not prototypes.": "試作品ではなく、本番で使えるプロダクトを。",
  "Every engagement is scoped around a real workflow, not a generic feature list.": "一般的な機能一覧ではなく、実際の業務フローを基準に開発範囲を設計します。",
  "Strategy to iteration.": "戦略から継続改善まで。",
  "Tell us what you're building. We'll reply with a clear next step.": "構想をお聞かせください。具体的な次のステップをご案内します。",
  "AI systems integrated into actual business operations, not demos. We build agents and automation that plug into the tools you already use.": "デモで終わらないAIを、実際の業務へ。既存ツールと連携するAIエージェントや自動化を構築します。",
  "// Where AI creates leverage": "// AIが効果を生む領域",
  "Practical AI, not hype.": "誇張ではなく、現場で使えるAIを。",
  "Tell us what's manual today. We'll tell you what's realistic to automate.": "現在手作業になっている業務をお聞かせください。現実的に自動化できる範囲をご提案します。",
  "A website should function as business infrastructure that generates leads, ranks in search and represents your brand, not a digital brochure.": "Webサイトは、ただの会社案内ではありません。見込み顧客を生み、検索で見つかり、ブランド価値を伝える事業基盤として設計します。",
  "Design, build and grow together.": "設計・開発・成長支援を、ひとつのチームで。",
  "These aren't separate vendors handed off to each other. One team owns strategy, design, development and the technical systems behind performance and search.": "戦略、デザイン、開発、パフォーマンス、検索基盤まで。分業による引き継ぎをなくし、ひとつのチームが一貫して担当します。",
  "Tell us about your current site, or the one you haven't built yet.": "現在のWebサイト、またはこれから構築したいサイトについてお聞かせください。",
  "Many SEO problems are actually engineering problems: slow pages, broken canonicals, unclear architecture. We fix them at the source, because we're the ones who built it.": "SEO課題の多くは、表示速度、canonical、サイト構造などの技術課題です。レポートで終わらせず、原因をコードから修正します。",
  "The technical layer search engines read.": "検索エンジンが理解できる技術基盤。",
  "SEO engineering process.": "調査から実装・改善まで。",
  "Want to know what's holding your website back?": "Webサイトの課題を明確にしませんか？",
  "An embedded engineer or small team that works inside your existing workflow, tools and roadmap, instead of operating as a separate outside vendor you have to manage.": "外部業者として切り離されるのではなく、既存のツール、進め方、ロードマップに入り込み、チームの一員として働くエンジニアまたは少人数チームです。",
  "Engineering capacity, not a ticket queue.": "作業依頼をこなすだけでなく、開発チームの一員に。",
  "This is the same team and process behind every ElevenChase engagement, structured as ongoing capacity rather than a fixed-scope project.": "通常のElevenChaseプロジェクトと同じチーム・品質を、固定範囲ではなく継続的な開発体制として提供します。",
  "What this works well for.": "こんな課題に適しています。",
  "Tell us what your roadmap looks like. We'll tell you honestly whether embedded capacity is the right fit.": "ロードマップをお聞かせください。専任の開発支援が適しているか、率直にお答えします。",
  "Work email": "メールアドレス",
  "Website URL": "WebサイトURL",
  "Conversion": "コンバージョン改善",
  "Exploring": "検討中",
  "Fill in your name, email and website URL to continue.": "お名前、メールアドレス、WebサイトURLを入力してください。",
  "Fill in your name, email and project details to continue.": "お名前、メールアドレス、プロジェクトの詳細を入力してください。",
  "Software + AI Engineering": "ソフトウェア・AIエンジニアリング",
  "Remote-first · Worldwide": "リモート対応・世界各地",
  "© 2026 ElevenChase. All rights reserved.": "© 2026 ElevenChase. All rights reserved.",
  "Who builds your software.": "あなたのソフトウェアをつくる人。",
  "Let's build something.": "一緒につくりましょう。",
  "Clarity before code.": "コードを書く前に、目的を明確に。",
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
  if (exact) return polishJapanese(exact);

  const testimonial = source.match(/^Show testimonial (\d+)$/);
  if (testimonial) return `お客様の声 ${testimonial[1]} を表示`;

  if (source.startsWith("Something went wrong while sending your request.")) {
    const email = source.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0];
    return `送信中に問題が発生しました。もう一度お試しいただくか、${email ?? "ElevenChase"}までご連絡ください。`;
  }

  return source;
}

function polishJapanese(value: string) {
  return value
    .replace(/イレブンチェイス|elevenChase/g, "ElevenChase")
    .replace(/Web サイト/g, "Webサイト")
    .replace(/AI エージェント/g, "AIエージェント");
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
  const keyedElements = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("[data-i18n-key]")]
    : [...root.querySelectorAll<HTMLElement>("[data-i18n-key]")];

  for (const element of keyedElements) {
    const key = element.getAttribute("data-i18n-key");
    if (key) element.textContent = translate(key);
  }

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

  const headingSelector = "[data-i18n-heading], [data-i18n-hero], h1, h2, h3, h4, h5, h6";
  const headings = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>(headingSelector)]
    : [...root.querySelectorAll<HTMLElement>(headingSelector)];

  for (const heading of headings) {
    if (!heading.matches(headingSelector)) continue;
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
