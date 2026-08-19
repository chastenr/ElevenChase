import Link from "next/link";
import { PROJECTS } from "@/data/work";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

export function SelectedWork() {
  return (
    <section className="border-y border-line py-24 md:py-36">
      <Container>
        <SectionLabel>{"// Selected work"}</SectionLabel>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.98] font-medium tracking-[-0.05em]">Things we&apos;ve<br />helped build.</h2>
          <p className="max-w-md text-muted">Public work is presented without client names where confidentiality applies. No invented results or vanity metrics.</p>
        </div>
        <div className="mt-16 border-t border-line">
          {PROJECTS.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group grid gap-5 border-b border-line py-9 transition-colors hover:bg-ink/[0.035] md:grid-cols-12 md:items-center md:py-12">
              <span className="font-mono text-xs text-muted md:col-span-1">{project.index}</span>
              <div className="md:col-span-7"><p className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase">{project.category} / {project.projectType}</p><h3 className="mt-3 text-3xl tracking-tight md:text-5xl">{project.title}</h3></div>
              <div className="md:col-span-4"><p className="text-muted">{project.problem}</p><span className="mt-5 inline-flex items-center gap-2 text-sm">View project <AnimatedArrow /></span></div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
