import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import { Container } from "@/components/ui/Container";

const LINKS = [
  ["Services", "/services"], ["Work", "/work"], ["Company", "/company"],
  ["Insights", "/insights"], ["FAQ", "/faq"], ["Contact", "/contact"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line py-14 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.1em]">
              <Image src="/logo-mark-white.png" alt="" width={26} height={26} className="invert dark:invert-0" aria-hidden="true" /> ELEVENCHASE
            </Link>
            <p className="mt-4 text-sm text-muted">Software + AI Engineering</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 md:col-span-3">
            {LINKS.map(([label, href]) => <Link key={href} href={href} className="text-sm text-muted hover:text-ink">{label}</Link>)}
          </nav>
          <div className="md:col-span-4 md:text-right">
            <a href={`mailto:${SITE.email}`} className="text-sm underline underline-offset-4">{SITE.email}</a>
            <p className="mt-3 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">Remote-first · Worldwide</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ElevenChase. All rights reserved.</p>
          <nav aria-label="Legal" className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/security">Security</Link></nav>
        </div>
      </Container>
    </footer>
  );
}
