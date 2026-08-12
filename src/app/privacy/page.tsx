import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";

const PAGE_TITLE = "Privacy Policy";
const PAGE_DESCRIPTION = `How ${SITE.name} collects, uses and protects information submitted through this website.`;
const LAST_UPDATED = "August 12, 2026";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{"// Privacy Policy"}</SectionLabel>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

          <div className="mt-12 flex flex-col gap-10 text-lg leading-relaxed text-ink-soft">
            <p>
              {SITE.name} (&ldquo;{SITE.name}&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) operates {SITE.domain}. This page explains what
              information we collect through this website, why, and how it is
              handled. We do not sell your information, and we keep this
              policy limited to what this site actually does.
            </p>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Information we collect
              </h2>
              <p className="mt-3">
                We only collect information you choose to submit through the
                contact and website-audit forms on this site: your name,
                email address, and optionally your company name, website
                URL, project type, message, and whether you choose to receive
                occasional marketing emails. There are no user accounts or
                e-commerce on this site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                How we use it
              </h2>
              <p className="mt-3">
                We use information submitted through our forms to respond to
                your inquiry, for example to follow up about a project or a
                requested website audit. If you explicitly select the optional
                marketing checkbox, we also use your name and email address to
                send occasional ElevenChase insights, updates, and business
                tips. Submitting an inquiry without selecting that checkbox
                does not subscribe you to marketing emails.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Service providers
              </h2>
              <p className="mt-3">
                We use{" "}
                <a
                  href="https://resend.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-4 hover:text-accent"
                >
                  Resend
                </a>{" "}
                to deliver form submissions to our inbox by email and, when
                you opt in, to maintain our marketing contact list and deliver
                future marketing emails. Resend is the only third party
                involved in handling form data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Cookies and tracking
              </h2>
              <p className="mt-3">
                This site does not use analytics, advertising pixels, or
                tracking cookies of any kind. The only browser storage we use
                is a single local preference (light/dark theme) saved in your
                browser&apos;s local storage, which never leaves your device
                and is not used to identify or track you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Data retention
              </h2>
              <p className="mt-3">
                We retain form submissions only as long as needed to respond
                to and follow up on your inquiry. If you opt in to marketing,
                we retain your contact record until you unsubscribe or ask us
                to delete it. You can make a deletion request at any time
                using the contact details below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Your rights
              </h2>
              <p className="mt-3">
                You can ask us what information we hold about you, request a
                correction, request deletion, or unsubscribe from marketing at
                any time. Marketing emails will include an unsubscribe option.
                Contact us using the details below and we&apos;ll respond promptly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Security
              </h2>
              <p className="mt-3">
                Form submissions are transmitted over HTTPS and validated
                server-side before being sent to us by email. We don&apos;t
                store submissions in a database on this site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Changes to this policy
              </h2>
              <p className="mt-3">
                If this policy changes, we&apos;ll update this page and the
                &ldquo;last updated&rdquo; date above.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Contact
              </h2>
              <p className="mt-3">
                Questions about this policy or your information? Reach out
                through our{" "}
                <Link
                  href="/#contact"
                  className="text-ink underline underline-offset-4 hover:text-accent"
                >
                  contact form
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
