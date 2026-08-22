"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import japanese from "@/i18n/ja.json";
import traditionalChinese from "@/i18n/zh-Hant.json";
import { traditionalChineseOverrides } from "@/i18n/zh-Hant-overrides";
import {
  htmlLanguages,
  isLocale,
  localeFromPathname,
  localizePathname,
  type Locale,
} from "@/i18n/routing";

export type { Locale } from "@/i18n/routing";

type LanguageContextValue = {
  locale: Locale;
  t: (source: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "elevenchase-locale";
const japaneseTranslations: Record<string, string> = {
  ...(japanese as Record<string, string>),
  "ElevenChase // Software + AI Engineering": "ElevenChase // Software + AI Engineering",
  "We build the software ambitious companies run on.": "成長を目指す企業を支える、\nソフトウェアをつくる。",
  "Design, engineering and AI systems for companies building serious products, automating operations and scaling what already works.": "プロダクト開発、業務の自動化、そして事業の成長を支える設計・ソフトウェア開発・AIシステムを提供します。",
  "Start a project": "プロジェクトを相談する",
  "Navigation: Services": "サービス",
  "Navigation: Process": "開発プロセス",
  "Navigation: Company": "私たちについて",
  "Navigation: Insights": "インサイト",
  "Scroll to explore ↓": "スクロールして見る ↓",
  "Software": "ソフトウェア",
  "Automation": "自動化",
  "Web": "Web",
  "Platforms": "プラットフォーム",
  "Remote-first": "リモート対応",
  "Worldwide": "世界各地",
  "// The premise": "// 私たちの考え方",
  "Good software is not about adding more technology.": "良いソフトウェアとは、技術を増やすことではありません。",
  "It is about removing friction from the way a business operates.": "業務のムダや滞りをなくし、事業をよりスムーズに動かすことです。",
  "ElevenChase works from the business problem outward — designing the system, automation or digital product that creates the clearest operational advantage.": "ElevenChaseは、まず事業課題を理解し、成果につながるシステム・自動化・デジタルプロダクトを設計します。",
  "// How ElevenChase thinks": "// ElevenChaseのアプローチ",
  "Scroll sequence / 03": "プロセス / 03",
  "Fig. 01 — Turning operational problems into production software.": "図01 — 業務課題を、本番環境で使えるソフトウェアへ。",
  "From friction to production software.": "業務の課題を、本番で使えるソフトウェアへ。",
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
  "// Satisfied clients": "// 導入企業",
  "Trusted with work that matters.": "重要なプロジェクトをお任せいただいています。",
  "// Client reach": "// クライアント拠点",
  "Trusted across time zones.": "時差を越えて、信頼される開発を。",
  "We collaborate remotely with clients in North America, Southeast Asia and Australia.": "北米、東南アジア、オーストラリアのお客様と、リモートで連携しています。",
  "Client locations": "クライアント拠点",
  "Client network": "クライアントネットワーク",
  "Remote / worldwide": "リモート / 世界各地",
  "ElevenChase client locations": "ElevenChaseのクライアント拠点",
  "Animated world map showing client locations in Atlanta, Florida, the Philippines and Australia.": "アトランタ、フロリダ、フィリピン、オーストラリアのクライアント拠点を示す世界地図です。",
  "Atlanta": "アトランタ",
  "Florida": "フロリダ",
  "Philippines": "フィリピン",
  "Australia": "オーストラリア",
  "// When companies come to us": "// ご相談いただくタイミング",
  "Usually, something isn't working.": "多くの場合、何かがうまく回っていません。",
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
  "Small team. Serious engineering.": "小さなチーム。\n妥協のないエンジニアリング。",
  "ElevenChase is an independent software engineering studio helping companies turn ideas, workflows and complex operational problems into software people actually want to use.": "ElevenChaseは、アイデアや複雑な業務課題を、現場で本当に使われるソフトウェアへ変える独立系エンジニアリングスタジオです。",
  "You work directly with the people designing and writing your software, from early strategy through production, instead of a rotating account team. Clear scope, clear communication, and engineers who stay hands-on the entire way.": "営業担当を介さず、戦略から本番運用まで担当エンジニアと直接進めます。明確な範囲、率直なコミュニケーション、一貫した責任体制を大切にしています。",
  "More about ElevenChase →": "ElevenChaseについて詳しく見る →",
  "// Not ready for a project?": "// まずは現状を知りたい方へ",
  "Start with an audit.": "まずはサイト診断から。",
  "We'll review your site's technical foundation, performance, search structure and conversion path and tell you what is actually worth fixing.": "技術基盤、表示速度、検索構造、コンバージョン導線を確認し、優先して改善すべき点をお伝えします。",
  "Request an audit": "サイト診断を受ける",
  "Ready when you are": "いつでもご相談ください",
  "Have something worth building?": "実現したいアイデアがありますか？",
  "Tell us what you're building. We'll reply with a clear next step: what it would take to build, and how we'd approach it.": "構想や課題をお聞かせください。必要な進め方と次のステップを明確にご案内します。",
  "Book a discovery call": "相談ミーティングを予約する",
  "01 / Input": "01 / INPUT",
  "02 / Engineering": "02 / ENGINEERING",
  "03 / Output": "03 / OUTPUT",
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
  "Website": "ウェブサイト",
  "What do you need?": "ご相談内容",
  "Budget": "ご予算",
  "Timeline": "ご希望時期",
  "Project details": "プロジェクトについて教えてください",
  "Select one": "選択してください",
  "Not sure yet": "まだ決まっていない",
  "Software Product": "ソフトウェア開発",
  "Existing Software": "既存システムの改善",
  "Dedicated Engineering": "専任エンジニアリング支援",
  "Technical Partnership": "技術パートナーシップ",
  "Start the conversation": "送信する",
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
  "// Company": "// 私たちについて",
  "Who builds your software.": "つくる人の顔が見える開発を。",
  "ElevenChase is an independent software, AI and web engineering studio. No account managers, no rotating juniors — you work directly with the people designing and writing your software, from strategy through production.": "ElevenChaseは、ソフトウェア、AI、Web開発を手がける独立系エンジニアリングスタジオです。営業担当や頻繁な担当交代を挟まず、戦略から本番運用まで、設計・開発を担うエンジニアと直接進めていただけます。",
  "// Mission & Vision": "// ミッション・ビジョン",
  "What guides ElevenChase.": "ElevenChaseが目指すもの。",
  "Mission": "ミッション",
  "Turn complex business problems into software that creates clear, lasting value.": "複雑な事業課題を、明確で持続的な価値を生むソフトウェアへ。",
  "We combine product thinking, software engineering and practical AI to build reliable systems that remove operational friction and help companies grow.": "プロダクト思考、ソフトウェア開発、実用的なAIを組み合わせ、業務の摩擦を減らし、企業の成長を支える信頼性の高いシステムを構築します。",
  "Vision": "ビジョン",
  "A future where excellent engineering is direct, practical and available across borders.": "優れたエンジニアリングが、国境を越えて、直接かつ実践的に届く未来を。",
  "We want ambitious teams everywhere to work directly with capable engineers and build digital infrastructure that remains useful long after launch.": "世界中の意欲あるチームが、確かな技術を持つエンジニアと直接協働し、リリース後も長く価値を生むデジタル基盤を構築できる未来を目指します。",
  "// Founder": "// 創業者",
  "Chasten Ramirez founded ElevenChase to build software the way it should be built: by engineers who stay hands-on the entire way, instead of handed off between a sales team, a project manager and whoever is actually available to write code.": "Chasten Ramirezは、担当者間の引き継ぎに頼らず、エンジニアが最初から最後まで責任を持つ開発を実現するためにElevenChaseを設立しました。",
  "// What we do": "// 事業内容",
  "Four stages, every project.": "すべてのプロジェクトを、4つのステップで。",
  "// Why ElevenChase": "// ElevenChaseが選ばれる理由",
  "Direct Access": "担当エンジニアと直接連携",
  "Work directly with the engineers building your product.": "プロダクトをつくるエンジニアと、直接コミュニケーションできます。",
  "Built for Production": "本番運用を前提に設計",
  "Architecture intended to survive beyond the prototype.": "試作品で終わらず、長期運用と成長に耐えられる構成を設計します。",
  "Business First": "事業課題を最優先",
  "Technology choices follow the actual business problem.": "技術ありきではなく、解決すべき事業課題から最適な手段を選びます。",
  "One Team": "ひとつのチームで一貫対応",
  "Strategy, design, engineering and optimization under one roof.": "戦略、設計、開発、改善まで、ひとつのチームが責任を持って進めます。",
  "// Details": "// 基本情報",
  "Location": "拠点",
  "Availability": "対応地域",
  "Report a vulnerability": "脆弱性を報告する",
  "Let's build something.": "次のプロジェクトを、一緒に。",
  "Tell us what you're working on and we'll get back to you with next steps.": "取り組みたい課題や構想をお聞かせください。具体的な次のステップをご案内します。",
  "Talk to ElevenChase": "ElevenChaseに相談する",
  "// Process": "// 開発プロセス",
  "Clarity before code.": "実装の前に、目的を明確に。",
  "Every engagement starts with the business problem, defines the smallest useful system, then moves through visible, testable progress.": "まず事業課題を整理し、必要最小限の仕組みを定義します。その後、確認できる成果を積み重ねながら開発を進めます。",
  "// Insights": "// インサイト",
  "Engineering notes.": "開発とAIの知見。",
  "Practical writing on software engineering, AI, web development and technical SEO, published as we write it rather than on a schedule for its own sake.": "ソフトウェア開発、AI、Web開発、テクニカルSEOについて、実務で役立つ知見を発信します。",
  "Answers before you build.": "開発を始める前に、答えを。",
  "Straightforward guides for founders and teams making software decisions: what it costs, who to hire, how to scope the work and what to expect from delivery.": "ソフトウェア開発を検討する経営者やチームのために、費用、開発会社の選び方、範囲の決め方、進め方をわかりやすく解説します。",
  "Start here": "まずはこちら",
  "3 practical guides": "実践ガイド 3本",
  "Read guide": "記事を読む",
  "// Your project": "// ご相談",
  "Have a project-specific question?": "自社のプロジェクトについて相談したいですか？",
  "Tell us what you're considering. We'll give you a clear next step, without a sales pitch.": "検討中の内容をお聞かせください。押し売りではなく、具体的な次のステップをご案内します。",
  "Ask ElevenChase": "ElevenChaseに相談する",
  "Product Development": "プロダクト開発",
  "How Much Does Custom Software Development Cost?": "カスタムソフトウェア開発の費用相場",
  "A breakdown of what actually drives software development pricing, why fixed rate cards are misleading, and how to get an estimate you can trust.": "開発費を左右する要素と、信頼できる見積もりを得るためのポイントを解説します。",
  "How to Choose a Software Development Company": "ソフトウェア開発会社の選び方",
  "An objective framework for evaluating software development vendors, covering technical capability, communication, pricing transparency, and production experience.": "技術力、コミュニケーション、料金の透明性、本番運用の実績から、開発会社を評価する方法を解説します。",
  "In-House Hiring vs. a Dedicated Engineering Team: How to Decide": "内製か外部開発チームか。判断のポイント",
  "A practical breakdown of when hiring in-house makes sense versus when embedded, external engineering capacity is the better call.": "内製採用が適する場合と、外部の専任開発チームが適する場合を実践的に比較します。",
  "6 min read": "読了6分",
  "7 min read": "読了7分",
  "// FAQ": "// よくあるご質問",
  "Before we start.": "ご相談の前に。",
  "Common questions before starting a project. Don't see yours? Just ask.": "プロジェクト開始前によくいただくご質問です。掲載のない内容も、お気軽にお問い合わせください。",
  "What does a typical project cost?": "プロジェクトの費用はどのくらいですか？",
  "It depends entirely on scope, since a landing page and a multi-tenant platform aren't priced the same way. Tell us what you're building and we'll give you a clear, honest estimate before any work begins, so there are no surprises.": "費用は、開発する内容や規模によって異なります。ご相談内容を伺ったうえで、着手前に前提条件と内訳を含む明確な概算をご案内します。",
  "How long does a project take?": "開発期間はどのくらいですか？",
  "It depends on what's being built. A focused MVP or website can ship in a matter of weeks; a larger platform or an ongoing engineering partnership runs longer. We scope realistic timelines during Understand and Design, not before we know what we're actually building.": "内容によって異なりますが、範囲を絞ったMVPやWebサイトは数週間、大規模なプラットフォームは数か月が目安です。課題と要件を整理したうえで、無理のない現実的なスケジュールをご提示します。",
  "Do you only work with startups, or established companies too?": "スタートアップ以外の企業にも対応していますか？",
  "Both. We work with founders validating a first idea and with established teams modernizing systems that already run a business. The engagement looks different in each case, but the process (understand, design, build, ship) stays the same.": "はい。新規事業の検証に取り組むスタートアップから、既存システムの刷新を進める企業まで幅広く支援しています。組織や事業の状況に合わせて、最適な進め方をご提案します。",
  "Can you work with our existing codebase or in-house team?": "既存のコードや社内チームと連携できますか？",
  "Yes. We regularly step into existing projects, auditing what's there, fixing what's holding it back, and building alongside an in-house team rather than replacing it.": "はい。既存のコードと構成を確認し、課題を整理したうえで、社内チームと役割を分担しながら開発を進めます。チームを置き換えるのではなく、必要な部分を補完します。",
  "Do you guarantee search rankings or AI search placement?": "検索順位やAI検索での掲載を保証できますか？",
  "No, and it's worth being skeptical of anyone who does. We build the technical foundations that give search engines and AI systems a clean, accurate site to understand: crawlability, structured data, performance and architecture. Rankings depend on factors no single vendor controls.": "検索順位やAI検索での掲載は保証していません。クロールしやすい構造、構造化データ、表示速度、情報設計など、検索エンジンやAIが内容を正しく理解できる技術基盤を整えます。",
  "What does “Dedicated Engineering” actually include?": "「専任エンジニアリング支援」には何が含まれますか？",
  "An embedded engineer or small team that works inside your existing workflow: your tools, your standups, your roadmap, rather than operating as a separate outside vendor you have to manage.": "担当エンジニアまたは少人数のチームが、既存のツール、定例、ロードマップに参加し、社内チームの一員として継続的に開発を支援します。",
  "Do you offer support after launch?": "リリース後のサポートはありますか？",
  "Yes. Shipping isn't the end of the relationship. Most engagements include a period of post-launch support, and many continue as ongoing maintenance or iteration work.": "はい。多くのプロジェクトにはリリース後のサポート期間が含まれます。ご要望に応じて、保守運用や機能改善も継続して対応します。",
  "Where is ElevenChase based, and do you work internationally?": "拠点はどこですか？海外企業にも対応していますか？",
  "We're a remote-first studio working with clients worldwide. Communication happens async by default, with calls scheduled to fit your time zone.": "ElevenChaseはリモートを基本とし、世界各地のお客様を支援しています。時差に配慮し、非同期のやり取りと必要な打ち合わせを組み合わせて進めます。",
  "What if I'm not sure what I actually need yet?": "必要なものがまだ明確でなくても相談できますか？",
  "That's normal. Request a free website audit or start a conversation, and we'll help you figure out what's actually worth building or fixing first, before you commit to anything.": "もちろんです。現在の課題や目標を伺い、まず取り組むべきことを一緒に整理します。Webサイトについては、無料サイト診断から始めることもできます。",
  "Can ElevenChase build AI agents for my business?": "自社業務向けのAIエージェントを開発できますか？",
  "Yes. We build AI agents and automation for real operations: support inboxes that draft and triage responses, lead qualification, document processing, and internal tools that summarize and route work, integrated into the systems you already use rather than shipped as standalone demos.": "はい。問い合わせ対応、見込み顧客の選別、文書処理、要約や業務振り分けなど、実際の業務で使えるAIエージェントを開発します。既存のシステムやツールとの連携も可能です。",
  "Can you automate our existing business workflows?": "現在の業務フローを自動化できますか？",
  "Often, yes. We look at what's manual today, whether that's routing support tickets, qualifying leads, or processing documents, and build automation that plugs into your existing tools rather than requiring you to switch systems.": "多くの場合、可能です。現在手作業になっている工程を確認し、既存ツールを活かしながら、効果の高い部分から段階的に自動化します。",
  "What technologies does ElevenChase use?": "どのような技術を使用していますか？",
  "Primarily Next.js, React and TypeScript for software and web development, PostgreSQL and Supabase for data, AWS and Vercel for infrastructure, and OpenAI and Anthropic for AI features. The exact stack depends on what a project actually needs.": "主にNext.js、React、TypeScript、PostgreSQL、Supabase、AWS、Vercel、OpenAI、Anthropicなどを使用します。技術ありきではなく、プロジェクトの要件に適した構成を選定します。",
  "What does ElevenChase build?": "ElevenChaseは何を開発していますか？",
  "Custom software, SaaS platforms, AI systems and automation, and high-performance web applications. Software and AI engineering is the core of what we do; web development and technical SEO support that, rather than the other way around.": "業務システム、SaaSプラットフォーム、AIシステム、業務自動化、高性能なWebアプリケーションを設計・開発しています。Web開発やテクニカルSEOにも一貫して対応します。",
  "Can you take over an existing product?": "既存プロダクトの開発を引き継げますか？",
  "Yes. We start with an honest audit of the current codebase and architecture, then take over ownership of ongoing development, whether that's fixing what's holding it back, modernizing it, or continuing feature work.": "はい。まず現在のコードとシステム構成を調査し、改善すべき点と引き継ぎ方法を明確にします。その後、改修、刷新、機能追加などの継続開発を担当します。",
  "Can you integrate AI into an existing platform?": "既存プラットフォームへAIを導入できますか？",
  "Yes. This is a common engagement: adding AI features (agents, automation, document processing) into a product that already exists, rather than building something new from scratch.": "はい。既存プロダクトへAIエージェント、自動化、文書処理などの機能を追加できます。新規開発だけでなく、現在の仕組みを活かした段階的な導入にも対応します。",
  "Who owns the software after the project?": "開発したソフトウェアの権利は誰に帰属しますか？",
  "This depends on the specific agreement for your engagement, which we'll make clear before work begins. In general, clients own what's built for them. Exact terms are set out in the project contract, not assumed from this page.": "具体的な条件は契約内容によりますが、原則として、お客様向けに開発した成果物はお客様に帰属します。権利関係は着手前に契約書で明確にします。",
  "How does a project start?": "プロジェクト開始までの流れを教えてください。",
  "Tell us what you're building through the contact form or by booking a discovery call. We'll ask enough questions to understand the problem, then follow up with an honest scope and next steps, rather than a generic sales pitch.": "お問い合わせフォームまたは初回相談から、構想や課題をお聞かせください。内容を整理したうえで、開発範囲、進め方、次のステップを具体的にご案内します。",
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
  "Footer: Services": "サービス",
  "Footer: Company": "会社概要",
  "Footer: Insights": "インサイト",
  "Footer: FAQ": "よくあるご質問",
  "Footer: Contact": "お問い合わせ",
  "Legal: Privacy": "プライバシー",
  "Legal: Terms": "利用規約",
  "Legal: Security": "セキュリティ",
  "Privacy: Resend intro": "フォーム送信には",
  "Privacy: Resend details": "を利用しています。お問い合わせ内容をメールで受信し、配信に同意された場合はマーケティング用の連絡先管理とメール配信にも使用します。フォーム情報を取り扱う第三者サービスはResendのみです。",
  "Privacy: Contact prompt": "本ポリシーまたは個人情報に関するご質問は、",
  "Security: Related intro": "このサイトから送信された情報の取り扱いについては、",
  "Security: Related details": "をご確認ください。",
  "Terms: Contact prompt": "本規約に関するご質問は、",
  "Open menu": "メニューを開く",
  "Close menu": "メニューを閉じる",
  "Input": "入力",
  "Output": "成果",
  "Explore": "詳しく見る",
  "Founder & CEO": "創業者兼CEO",
  "Founder & CEO, ElevenChase": "ElevenChase 創業者兼CEO",
  "Founder & CEO , ElevenChase": "ElevenChase 創業者兼CEO",
  "Leave this field empty": "この項目は入力しないでください",
  "Under $5k": "5,000米ドル未満",
  "$5k–$10k": "5,000〜10,000米ドル",
  "$10k–$25k": "10,000〜25,000米ドル",
  "$25k–$50k": "25,000〜50,000米ドル",
  "$50k+": "50,000米ドル以上",
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

const translatedContent: Record<Exclude<Locale, "en">, Record<string, string>> = {
  ja: japaneseTranslations,
  "zh-tw": {
    ...(traditionalChinese as Record<string, string>),
    ...traditionalChineseOverrides,
  },
};

function translate(source: string, locale: Exclude<Locale, "en">) {
  const exact = translatedContent[locale][source];
  if (exact) return polishTranslation(exact, locale);

  const testimonial = source.match(/^Show testimonial (\d+)$/);
  if (testimonial) {
    return locale === "ja"
      ? `お客様の声 ${testimonial[1]} を表示`
      : `顯示第 ${testimonial[1]} 則客戶評價`;
  }

  if (source.startsWith("Something went wrong while sending your request.")) {
    const email = source.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0];
    return locale === "ja"
      ? `送信中に問題が発生しました。もう一度お試しいただくか、${email ?? "ElevenChase"}までご連絡ください。`
      : `送出時發生問題。請再試一次，或聯絡 ${email ?? "ElevenChase"}。`;
  }

  return source;
}

function polishTranslation(value: string, locale: Exclude<Locale, "en">) {
  if (locale === "ja") {
    return value
      .replace(/イレブンチェイス|elevenChase/g, "ElevenChase")
      .replace(/Web サイト/g, "Webサイト")
      .replace(/AI エージェント/g, "AIエージェント");
  }

  return value
    .replace(/十一大通|十一蔡斯|十一追逐|十一追|Eleven Chase/gi, "ElevenChase")
    .replace(/人工智慧/g, "AI")
    .replace(/項目/g, "專案")
    .replace(/數據/g, "資料")
    .replace(/信息/g, "資訊")
    .replace(/支持/g, "支援")
    .replace(/招聘/g, "招募")
    .replace(/用戶/g, "使用者")
    .replace(/代碼/g, "程式碼")
    .replace(/文檔/g, "文件");
}

function translateTextNode(node: Text, locale: Exclude<Locale, "en">) {
  const source = node.data;
  const trimmed = source.trim();
  if (!trimmed) return;

  const translated = translate(trimmed, locale);
  if (translated === trimmed) return;

  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  node.data = `${leading}${translated}${trailing}`;
}

function translateElement(root: ParentNode, locale: Exclude<Locale, "en">) {
  const keyedElements = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("[data-i18n-key]")]
    : [...root.querySelectorAll<HTMLElement>("[data-i18n-key]")];

  for (const element of keyedElements) {
    const key = element.getAttribute("data-i18n-key");
    if (key) element.textContent = translate(key, locale);
  }

  const blocks = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("p, figcaption, dt, dd")]
    : [...root.querySelectorAll<HTMLElement>("p, figcaption, dt, dd")];

  for (const block of blocks) {
    if (!block.matches("p, figcaption, dt, dd") || block.children.length > 0) continue;
    const source = block.textContent?.replace(/\s+/g, " ").trim();
    if (!source) continue;
    const translated = translate(source, locale);
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
    const translated = translate(source, locale);
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
      translateTextNode(current as Text, locale);
    }
    current = walker.nextNode();
  }

  const elements = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("[aria-label], [title], [placeholder]")]
    : [...root.querySelectorAll<HTMLElement>("[aria-label], [title], [placeholder]")];

  for (const element of elements) {
    for (const attribute of ["aria-label", "title", "placeholder"] as const) {
      const source = element.getAttribute(attribute);
      if (source) element.setAttribute(attribute, translate(source, locale));
    }
  }

  const anchors = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLAnchorElement>("a[href]")]
    : [...root.querySelectorAll<HTMLAnchorElement>("a[href]")];

  for (const anchor of anchors) {
    if (!(anchor instanceof HTMLAnchorElement)) continue;
    const href = anchor.getAttribute("href");
    if (href?.startsWith("/")) {
      anchor.setAttribute("href", localizePathname(href, locale));
    }
  }

  document.title = translate(document.title, locale);
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = translate(description.content, locale);
}

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const pathLocale = localeFromPathname(window.location.pathname);
    const storedLocale = localStorage.getItem(STORAGE_KEY);
    const savedLocale: Locale = isLocale(pathLocale)
      ? pathLocale
      : isLocale(storedLocale)
        ? storedLocale
        : initialLocale;
    const stateFrame = window.requestAnimationFrame(() => setLocaleState(savedLocale));
    document.documentElement.lang = htmlLanguages[savedLocale];
    document.documentElement.dataset.locale = savedLocale;

    if (savedLocale === "en") {
      document.documentElement.dataset.i18nReady = "true";
      return () => window.cancelAnimationFrame(stateFrame);
    }

    translateElement(document.body, savedLocale);

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateTextNode(mutation.target as Text, savedLocale);
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node as Text, savedLocale);
          if (node instanceof Element) translateElement(node, savedLocale);
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
  }, [initialLocale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      t: locale === "en" ? (source) => source : (source) => translate(source, locale),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
