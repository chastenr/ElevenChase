import Link from "next/link";
import type { Project } from "@/data/work";
import { AnimatedArrow } from "./AnimatedArrow";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block border-b border-line py-8 transition-colors duration-300 first:pt-0 last:border-none hover:bg-ink/5 md:py-10"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs tracking-[0.12em] text-muted uppercase">
        <span>{project.category}</span>
        <span className="text-muted/60">&middot;</span>
        <span>{project.projectType}</span>
        <span className="text-muted/60">&middot;</span>
        <span>{project.year}</span>
      </div>

      <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="md:max-w-2xl">
          <h3 className="text-2xl font-medium tracking-tight text-balance md:text-3xl">
            {project.title}
          </h3>

          <p className="mt-3 max-w-xl text-lg text-muted">{project.problem}</p>

          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <ul className="mt-4 flex flex-col gap-1 text-sm text-ink-soft">
              {project.keyFeatures.slice(0, 5).map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-muted/60" aria-hidden="true">
                    &middot;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-transform duration-300 group-hover:translate-x-0.5">
          View case study
          <AnimatedArrow />
        </span>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
        {project.stack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </Link>
  );
}
