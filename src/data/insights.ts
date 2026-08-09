export type ArticleCategory =
  | "Software Engineering"
  | "AI & Automation"
  | "Web Development"
  | "Technical SEO"
  | "Product Development";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Software Engineering",
  "AI & Automation",
  "Web Development",
  "Technical SEO",
  "Product Development",
];

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language?: string }
  | { type: "links"; label: string; items: { text: string; href: string }[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  /** ISO date string, e.g. "2026-01-15". Used for sorting and JSON-LD. */
  date: string;
  readingTime: string;
  author?: string;
  body: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: "how-much-does-custom-software-development-cost",
    title: "How Much Does Custom Software Development Cost?",
    excerpt:
      "A breakdown of what actually drives software development pricing, why fixed rate cards are misleading, and how to get an estimate you can trust.",
    category: "Product Development",
    date: "2026-08-05",
    readingTime: "6 min read",
    body: [
      {
        type: "paragraph",
        text: "\"How much does custom software cost?\" doesn't have a single honest answer, because a marketing landing page and a multi-tenant SaaS platform aren't the same problem. What follows is a breakdown of the factors that actually move the number, so you can sanity-check any quote you receive, including ours.",
      },
      { type: "heading", text: "The factors that actually drive cost" },
      {
        type: "list",
        items: [
          "Scope: how many distinct features, user roles, and workflows the system needs to support.",
          "Complexity: whether the problem is a standard CRUD app or involves real-time data, complex permissions, billing, or AI features.",
          "Integrations: every third-party system (payments, CRM, existing internal tools) you need to connect to adds real work.",
          "Team size and seniority: a single senior engineer and a five-person team produce very different costs and timelines for the same scope.",
          "Timeline: compressing a realistic timeline usually means paying for more parallel capacity, not just \"working faster.\"",
          "New build vs. existing codebase: auditing and extending an existing system carries different risk and cost than starting clean.",
        ],
      },
      { type: "heading", text: "Rough industry ranges (and why they're rough)" },
      {
        type: "paragraph",
        text: "As a general pattern across the industry: a focused marketing website typically runs from the low thousands to around $20,000. A working MVP for a new product is commonly anywhere from $15,000 to $100,000+, depending on how much real functionality it needs on day one. A production platform with multiple user roles, billing, and integrations regularly runs into six figures. These are broad, industry-wide patterns, not a quote for any specific project, and any vendor who gives you a firm number before understanding your actual requirements is guessing.",
      },
      { type: "heading", text: "Why we don't publish a rate card" },
      {
        type: "paragraph",
        text: "ElevenChase doesn't publish fixed pricing, for the same reason a contractor doesn't quote a house before seeing the lot: the range above is too wide to be useful for your specific project. What we do instead is scope the actual work first, during the Understand and Design phase, and give you a clear, itemized estimate before any build work begins, so there are no surprises later.",
      },
      { type: "heading", text: "How to get an estimate you can actually trust" },
      {
        type: "list",
        items: [
          "Be specific about what the software needs to do on day one versus what can come later.",
          "Ask what's included in the estimate: design, QA, deployment, and post-launch support are often quoted separately.",
          "Ask how change requests mid-project are handled, since scope creep is the most common cause of budget overruns.",
          "Be skeptical of a firm number given before any real scoping conversation has happened.",
        ],
      },
      {
        type: "paragraph",
        text: "If you want a concrete number for your own project, the fastest path is telling us what you're building.",
      },
      {
        type: "links",
        label: "Related",
        items: [
          { text: "Software Development at ElevenChase", href: "/services/software-development" },
          { text: "Dedicated Engineering at ElevenChase", href: "/services/dedicated-engineering" },
          { text: "Start a project", href: "/#contact" },
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-software-development-company",
    title: "How to Choose a Software Development Company",
    excerpt:
      "An objective framework for evaluating software development vendors, covering technical capability, communication, pricing transparency, and production experience.",
    category: "Product Development",
    date: "2026-08-07",
    readingTime: "7 min read",
    body: [
      {
        type: "paragraph",
        text: "Most guides to choosing a software development company are thin marketing dressed up as advice. Here's a more useful approach: a set of concrete criteria to evaluate any vendor against, including us, so you can make the comparison yourself rather than taking anyone's word for it.",
      },
      { type: "heading", text: "Technical capability" },
      {
        type: "paragraph",
        text: "Ask to see real, shipped production work, not just a slide describing capabilities. A vendor should be able to speak specifically about the technical decisions behind a past project (why this database, why this architecture) rather than a generic list of skills.",
      },
      { type: "heading", text: "Communication and engineering model" },
      {
        type: "paragraph",
        text: "Find out whether you'll work directly with the engineers building your product, or through an account manager relaying updates from a team you never talk to. Neither model is automatically wrong, but you should know which one you're buying. At ElevenChase, you work directly with the people writing the code, which is a deliberate choice, not the only valid one.",
      },
      { type: "heading", text: "Project fit" },
      {
        type: "paragraph",
        text: "A vendor that's excellent at fast MVPs isn't automatically the right fit for modernizing a legacy enterprise system, and vice versa. Ask directly whether they've done work similar in shape to yours, not just in the same industry.",
      },
      { type: "heading", text: "Pricing transparency" },
      {
        type: "paragraph",
        text: "You don't need a published rate card, but you should get a clear, itemized estimate before work begins, and a clear answer for how scope changes are priced mid-project. Vague pricing conversations are a preview of how the whole engagement will go.",
      },
      { type: "heading", text: "AI and automation capability" },
      {
        type: "paragraph",
        text: "If AI or automation is even a possibility for your roadmap, ask specifically what a vendor has actually built with it, not whether they \"do AI.\" Ask how they handle failure cases, since a production AI feature needs to fail gracefully, not just demo well.",
      },
      { type: "heading", text: "Production experience and post-launch support" },
      {
        type: "paragraph",
        text: "Shipping is not the finish line. Ask what happens after launch: is there a support period, and what does ongoing maintenance actually look like? A team that disappears after deployment leaves you carrying all the operational risk.",
      },
      { type: "heading", text: "Scalability of the relationship" },
      {
        type: "paragraph",
        text: "If this goes well, can the engagement grow, whether that means a bigger project, an ongoing partnership, or dedicated capacity, without starting the vendor search over? This matters more than it seems the first time you hire.",
      },
      {
        type: "list",
        items: [
          "Technical capability: real shipped work, specific decisions, not a skills list",
          "Communication model: direct engineer access vs. account-managed",
          "Project fit: similar shape of problem, not just similar industry",
          "Pricing transparency: itemized estimate before work starts",
          "AI capability: what's actually been built, how failure is handled",
          "Production experience: what happens after launch",
          "Scalability: can the relationship grow without restarting the search",
        ],
      },
      {
        type: "paragraph",
        text: "Whatever you decide, running a real vendor through this list, rather than their homepage copy, is the difference between hiring based on a sales conversation and hiring based on evidence.",
      },
      {
        type: "links",
        label: "Related",
        items: [
          { text: "How much does custom software development cost?", href: "/insights/how-much-does-custom-software-development-cost" },
          { text: "In-house hiring vs. a dedicated engineering team", href: "/insights/in-house-vs-dedicated-engineering-team" },
          { text: "ElevenChase's process", href: "/#process" },
        ],
      },
    ],
  },
  {
    slug: "in-house-vs-dedicated-engineering-team",
    title: "In-House Hiring vs. a Dedicated Engineering Team: How to Decide",
    excerpt:
      "A practical breakdown of when hiring in-house makes sense versus when embedded, external engineering capacity is the better call.",
    category: "Product Development",
    date: "2026-08-09",
    readingTime: "6 min read",
    body: [
      {
        type: "paragraph",
        text: "Hiring in-house and using a dedicated external engineering team aren't competing philosophies, they solve different problems. Here's how to actually tell which one fits your situation.",
      },
      { type: "heading", text: "When in-house hiring makes more sense" },
      {
        type: "list",
        items: [
          "The engineering work is core, long-term, and central to your competitive advantage.",
          "You have (or are building) the management structure to hire, onboard, and retain a team.",
          "Your roadmap is stable enough to justify permanent headcount rather than variable capacity.",
          "You need engineers embedded in company culture and long-term institutional knowledge from day one.",
        ],
      },
      { type: "heading", text: "When dedicated external capacity makes more sense" },
      {
        type: "list",
        items: [
          "Your roadmap is bigger than your current team's capacity, and hiring fast enough isn't realistic.",
          "You need a specific capability (AI integration, a platform migration) for a defined period, not permanently.",
          "You want to validate whether a role or project is worth a permanent hire before committing to one.",
          "You'd rather have one team covering software, AI, web, and technical SEO than coordinate multiple specialist vendors.",
        ],
      },
      { type: "heading", text: "The real cost comparison" },
      {
        type: "paragraph",
        text: "A full-time hire costs more than salary alone: recruiting time, onboarding, benefits, management overhead, and the risk of a bad fit all add up. Dedicated external capacity trades some of that overhead for a per-engagement cost, but only makes sense if the engineering model is genuinely embedded, meaning working inside your tools and workflow, not operating as a disconnected outside vendor you have to manage closely.",
      },
      { type: "heading", text: "A hybrid approach is common" },
      {
        type: "paragraph",
        text: "Many companies use both: a lean in-house team for core product ownership, plus embedded external capacity for specific initiatives, overflow, or specialized work like AI features or a technical SEO overhaul. The two aren't mutually exclusive, and treating the decision as all-or-nothing usually leads to either over-hiring or under-resourcing.",
      },
      {
        type: "paragraph",
        text: "If you're weighing this for a specific roadmap, our Dedicated Engineering page covers what an embedded engagement actually looks like in practice.",
      },
      {
        type: "links",
        label: "Related",
        items: [
          { text: "Dedicated Engineering at ElevenChase", href: "/services/dedicated-engineering" },
          { text: "How to choose a software development company", href: "/insights/how-to-choose-a-software-development-company" },
          { text: "Start a project", href: "/#contact" },
        ],
      },
    ],
  },
];
