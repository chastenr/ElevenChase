import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";

const PAGE_TITLE = "Terms of Service";
const PAGE_DESCRIPTION = `Terms governing use of the ${SITE.name} website.`;
const LAST_UPDATED = "August 9, 2026";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{"// Terms of Service"}</SectionLabel>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

          <div className="mt-12 flex flex-col gap-10 text-lg leading-relaxed text-ink-soft">
            <p>
              These terms cover use of the {SITE.domain} website. They
              don&apos;t cover any client engagement, which is governed by a
              separate agreement signed directly with {SITE.name} for that
              project.
            </p>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Use of this website
              </h2>
              <p className="mt-3">
                This website is provided to share information about{" "}
                {SITE.name}&apos;s services and to let visitors get in touch.
                You agree not to misuse the site, including attempting to
                disrupt it, submitting false or malicious information through
                its forms, or attempting to access any part of it without
                authorization.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Intellectual property
              </h2>
              <p className="mt-3">
                The content on this site, including its design, text, and
                branding, belongs to {SITE.name} unless otherwise noted. You
                may not reproduce or repurpose it without permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                No warranties
              </h2>
              <p className="mt-3">
                This website and its content are provided &ldquo;as is&rdquo;
                without warranties of any kind. While we work to keep
                information accurate and the site available, we don&apos;t
                guarantee uninterrupted access or that all content is free of
                errors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Limitation of liability
              </h2>
              <p className="mt-3">
                {SITE.name} is not liable for any damages arising from your
                use of, or inability to use, this website, to the fullest
                extent permitted by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                External links
              </h2>
              <p className="mt-3">
                This site may link to third-party websites. We aren&apos;t
                responsible for the content or practices of sites we don&apos;t
                operate.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Changes to these terms
              </h2>
              <p className="mt-3">
                We may update these terms from time to time. Continued use of
                the site after changes means you accept the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                Contact
              </h2>
              <p className="mt-3">
                Questions about these terms? Reach out through our{" "}
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
