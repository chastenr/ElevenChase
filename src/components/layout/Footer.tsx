import Image from "next/image";
import { FOOTER_LINKS, SITE } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-line">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-mark.png"
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px]"
                aria-hidden="true"
              />
              <p className="font-mono text-sm font-medium tracking-[0.08em]">
                {SITE.name.toUpperCase()}
              </p>
            </div>
            <p className="mt-3 text-sm text-muted">{SITE.tagline}</p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:gap-10"
            aria-label="Footer"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            {SITE.location} / {SITE.availability}
          </p>
        </div>
      </Container>
    </footer>
  );
}
