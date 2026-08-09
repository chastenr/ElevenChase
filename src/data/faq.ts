export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "What does a typical project cost?",
    answer:
      "It depends entirely on scope, since a landing page and a multi-tenant platform aren't priced the same way. Tell us what you're building and we'll give you a clear, honest estimate before any work begins, so there are no surprises.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on what's being built. A focused MVP or website can ship in a matter of weeks; a larger platform or an ongoing engineering partnership runs longer. We scope realistic timelines during Understand and Design, not before we know what we're actually building.",
  },
  {
    question: "Do you only work with startups, or established companies too?",
    answer:
      "Both. We work with founders validating a first idea and with established teams modernizing systems that already run a business. The engagement looks different in each case, but the process (understand, design, build, ship) stays the same.",
  },
  {
    question: "Can you work with our existing codebase or in-house team?",
    answer:
      "Yes. We regularly step into existing projects, auditing what's there, fixing what's holding it back, and building alongside an in-house team rather than replacing it.",
  },
  {
    question: "Do you guarantee search rankings or AI search placement?",
    answer:
      "No, and it's worth being skeptical of anyone who does. We build the technical foundations that give search engines and AI systems a clean, accurate site to understand: crawlability, structured data, performance and architecture. Rankings depend on factors no single vendor controls.",
  },
  {
    question: "What does “Dedicated Engineering” actually include?",
    answer:
      "An embedded engineer or small team that works inside your existing workflow: your tools, your standups, your roadmap, rather than operating as a separate outside vendor you have to manage.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Shipping isn't the end of the relationship. Most engagements include a period of post-launch support, and many continue as ongoing maintenance or iteration work.",
  },
  {
    question: "Where is ElevenChase based, and do you work internationally?",
    answer:
      "We're a remote-first studio working with clients worldwide. Communication happens async by default, with calls scheduled to fit your time zone.",
  },
  {
    question: "What if I'm not sure what I actually need yet?",
    answer:
      "That's normal. Request a free website audit or start a conversation, and we'll help you figure out what's actually worth building or fixing first, before you commit to anything.",
  },
];
