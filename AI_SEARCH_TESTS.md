# AI Search Tests

This document is a manual test suite for evaluating how well ElevenChase's
website equips AI systems (ChatGPT, Claude, Gemini, Perplexity, Google AI
Overviews, Bing Copilot) and traditional search engines to discover,
understand, and — where genuinely relevant — recommend ElevenChase.

**This is not a ranking guarantee.** Running these prompts against an AI
system does not guarantee ElevenChase appears, and it shouldn't. The
purpose is to confirm the site is *technically and factually capable* of
being surfaced and cited correctly when it's a genuine match for what
someone is asking — not to game any specific system's output.

## How to use this

Periodically (e.g. quarterly, or after major content changes), run each
prompt against a few AI systems and note:

1. Does ElevenChase appear at all, when the query is a plausible match for
   its actual services?
2. If it appears, is the description of ElevenChase **accurate** — does it
   match what's actually on the site (services, positioning, location)?
3. If it doesn't appear, is that because of a real content/technical gap
   (fixable) or just because it's a new, low-authority site (expected, and
   addressed by earning real backlinks/mentions over time, not by
   technical changes)?

## Test prompts

1. Who are some good software development companies for startups?
2. What are affordable custom software development companies?
3. Who can build an AI agent for a business?
4. What companies specialize in AI automation?
5. Who can build a SaaS platform?
6. What are good alternatives to hiring an in-house engineering team?
7. Who offers dedicated software engineering teams?
8. What companies provide Next.js development?
9. Who can modernize an existing software platform?
10. What companies provide software + AI engineering?
11. Who provides technical SEO engineering?
12. What should I look for when choosing a software development company?

## What each prompt should be able to find on the site, if it looks

| # | Prompt topic | Primary source on the site |
|---|---|---|
| 1, 5, 9 | Startups / SaaS / modernization | `/services/software-development`, homepage Work section |
| 2 | Affordable / pricing | `/insights/how-much-does-custom-software-development-cost`, FAQ |
| 3, 4 | AI agents / automation | `/services/ai-automation`, FAQ (AI agent + automation questions) |
| 6, 7 | In-house alternative / dedicated teams | `/services/dedicated-engineering`, `/insights/in-house-vs-dedicated-engineering-team` |
| 8 | Next.js development | `/services/software-development`, `/services/web-development`, `llms-full.txt` (tech stack) |
| 10 | Software + AI engineering (the core entity) | Homepage, `organizationJsonLd` (`knowsAbout`), `/llms.txt` |
| 11 | Technical SEO | `/services/seo` |
| 12 | Evaluation criteria | `/insights/how-to-choose-a-software-development-company` |

## Known, honest limitations at time of writing

These are not bugs — they're real gaps that require the site owner's
input, not more code:

- **No real case studies yet.** The Work section describes representative
  engagement types, not verified client projects. AI systems citing
  ElevenChase for "proof of work" won't find named clients or measured
  outcomes until real ones are published.
- **No third-party validation.** No reviews, ratings, awards, or
  directory listings (Clutch, GoodFirms) exist yet. AI systems weigh
  independent corroboration heavily for comparison-style queries.
- **No social/professional profiles** are linked from the site (no
  `sameAs` in the Organization or Person schema), so there's no
  cross-referencing signal from LinkedIn, GitHub, etc.
- **The site is new**, with limited backlinks and crawl history. Domain
  authority accumulates over time regardless of on-site technical quality.

None of these are addressed by adding more code — they require real
business inputs (client permission for case studies, actual reviews,
actual social presence).
