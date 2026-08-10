import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, SITE } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
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

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  {column.title}
                </p>
                <nav
                  className="mt-4 flex flex-col gap-3"
                  aria-label={column.title}
                >
                  {column.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              © {year} {SITE.legalName}. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-ink"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-ink"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="transition-colors duration-200 hover:text-ink"
            >
              Security
            </Link>
          </div>
          <p>
            Founded by {SITE.ceoName} · {SITE.location} · {SITE.availability}
          </p>
        </div>
      </Container>
    </footer>
  );
}
