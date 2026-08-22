import { LocalizedLink as Link } from "@/components/ui/LocalizedLink";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";

type RelatedService = { label: string; href: string; description: string };

export function RelatedServices({ items }: { items: RelatedService[] }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionLabel>{"// Related services"}</SectionLabel>
        <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 md:mt-10">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 bg-ivory p-6 transition-colors duration-300 hover:bg-ivory-soft"
            >
              <div>
                <p className="text-lg font-medium tracking-tight">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </div>
              <AnimatedArrow className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
