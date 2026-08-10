# Domain trust checklist

Manual, one-time-per-item steps that live outside this repo (DNS, third-party
consoles, external profiles). Nothing here is automated by the codebase —
check items off as they're completed and update the linked config when a
step produces a real value (e.g. a social profile URL).

## Search engines

- [ ] Verify `elevenchase.com` in [Google Search Console](https://search.google.com/search-console) (domain property, so both `www` and non-`www` are covered).
- [ ] Submit `https://www.elevenchase.com/sitemap.xml` in Search Console.
- [ ] Verify the site in [Bing Webmaster Tools](https://www.bing.com/webmasters) (can import directly from Search Console) and submit the sitemap there too.
- [ ] After a few weeks, spot-check the [Rich Results Test](https://search.google.com/test/rich-results) against `/`, a `/work/[slug]` page and an `/insights/[slug]` post to confirm the `Organization`, `Person`, `WebSite`, `Service`, `BlogPosting` and `BreadcrumbList` JSON-LD in `src/lib/structured-data.ts` all validate with no errors.

## Email authentication (DNS)

- [ ] Confirm SPF and DKIM are green in the Resend dashboard for `elevenchase.com` (referenced in `src/lib/mail.ts` — required for `start@elevenchase.com` to send without landing in spam).
- [ ] Add a DMARC record (`_dmarc.elevenchase.com` TXT) if one doesn't exist yet. Start with `p=none` to monitor, then tighten to `p=quarantine`/`p=reject` once mail flow is confirmed clean.

## Identity signals (schema.org `sameAs`)

`src/data/site.ts` has `SITE.sameAs` (company) and `SITE.founderSameAs`
(founder) arrays, currently empty by design — `structured-data.ts` only
emits `sameAs` on the `Organization`/`Person` JSON-LD once these are
populated. As each of the following goes live, add its URL to the relevant
array:

- [ ] LinkedIn Company Page for ElevenChase → `SITE.sameAs`.
- [ ] LinkedIn personal profile for Chasten Ramirez → `SITE.founderSameAs`.
- [ ] GitHub org or profile, if used publicly → the matching array.
- [ ] Any other platform where ElevenChase or the founder has a real, active presence (X/Twitter, Crunchbase, etc.) — real and active only, not created solely to fill this list.

## Business/founder identity

- [ ] Google Business Profile is optional for a remote-first studio with no
      public address — skip unless a real service location is added.
- [ ] Keep the founder's name/title consistent everywhere it appears
      publicly (LinkedIn headline, GitHub bio, etc.) so it matches
      `SITE.ceoName` / `SITE.ceoTitle` ("Chasten Ramirez" / "Founder & CEO").

## Ongoing maintenance

- [ ] `public/.well-known/security.txt` has an `Expires` field — renew it
      before it lapses (currently set about a year out). RFC 9116
      recommends it not be dated more than a year in the future.
- [ ] Re-run the Rich Results Test after any change to
      `src/lib/structured-data.ts` or `src/data/site.ts` that touches
      Organization/Person/WebSite fields.
- [ ] Keep `CONTACT_EMAIL_TO`/`CONTACT_EMAIL_FROM` in the deployment
      environment in sync with any future change to `SITE.contactEmail`.
