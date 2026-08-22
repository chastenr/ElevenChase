import { LocalizedLink as Link } from "@/components/ui/LocalizedLink";
import { SITE } from "@/data/site";
import { englishMetadata } from "@/i18n/seo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";

const PAGE_TITLE = "Security";
const PAGE_DESCRIPTION = `How to report a security vulnerability affecting ${SITE.domain}, and what to expect from ${SITE.name} after you do.`;
const LAST_UPDATED = "August 11, 2026";

export const metadata = englishMetadata({
  pathname: "/security",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function SecurityPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{"// Security"}</SectionLabel>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance">
            Security
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

          <div className="mt-12 flex flex-col gap-10 text-lg leading-relaxed text-ink-soft">
            <p>
              We take the security of {SITE.domain} and the people who submit
              information through it seriously. If you believe you&apos;ve
              found a security vulnerability, we want to hear about it.
            </p>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Reporting a vulnerability
              </h2>
              <p className="mt-3">
                Email{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink underline underline-offset-4 hover:text-accent"
                >
                  {SITE.email}
                </a>{" "}
                with a description of the issue, the steps to reproduce it,
                and its potential impact. This address is monitored directly
                by the founder. A machine-readable version of this contact is
                also published at{" "}
                <a
                  href="/.well-known/security.txt"
                  className="text-ink underline underline-offset-4 hover:text-accent"
                >
                  /.well-known/security.txt
                </a>{" "}
                per RFC 9116.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Scope
              </h2>
              <p className="mt-3">
                In scope: {SITE.domain} and its subdomains, including the
                contact and website-audit forms. This is a marketing website,
                not a product with user accounts or payment processing, so
                the realistic attack surface is limited to things like
                form-handling issues, header/transport misconfiguration, and
                dependency vulnerabilities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Out of scope
              </h2>
              <p className="mt-3">
                Denial-of-service testing, automated scanning that generates
                significant traffic, social engineering or phishing against
                ElevenChase or its clients, and physical security are all out
                of scope. Please don&apos;t test in ways that could degrade
                the site for other visitors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                What to expect
              </h2>
              <p className="mt-3">
                We&apos;ll acknowledge a good-faith report as soon as
                possible, investigate, and follow up with what we found and
                any fix timeline. We won&apos;t pursue legal action against
                anyone who reports a vulnerability in good faith, avoids
                privacy violations and data destruction, and gives us a
                reasonable opportunity to fix the issue before disclosing it
                publicly. There is currently no paid bug bounty program.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Related pages
              </h2>
              <p className="mt-3">
                <span data-i18n-key="Security: Related intro">See our </span>
                <Link
                  href="/privacy"
                  className="text-ink underline underline-offset-4 hover:text-accent"
                >
                  Privacy Policy
                </Link>
                <span data-i18n-key="Security: Related details">
                  {" "}for how information submitted through this site is handled.
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
