import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type FeatureGridProps = {
  eyebrow: string;
  title: string;
  description?: string;
  items: { title: string; description?: string }[];
  columns?: 3 | 4;
};

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
}: FeatureGridProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] font-medium tracking-tight text-balance">
            {title}
          </h2>
          {description && (
            <Reveal delay={0.08}>
              <p className="mt-6 text-lg text-muted">{description}</p>
            </Reveal>
          )}
        </div>

        <div
          className={`mt-10 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 md:mt-14 ${
            columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.03}>
              <div className="h-full border-r border-b border-line p-7">
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-2 text-sm text-pretty text-muted">
                    {item.description}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
