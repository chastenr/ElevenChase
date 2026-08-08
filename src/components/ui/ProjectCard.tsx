import type { Project } from "@/data/work";
import { AnimatedArrow } from "./AnimatedArrow";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative border-b border-line py-6 transition-colors duration-300 first:pt-0 last:border-none hover:bg-ink/5 md:py-7">
      <div className="flex items-baseline gap-3 font-mono text-xs tracking-[0.12em] text-muted uppercase">
        <span>{project.category}</span>
        <span className="text-muted/60">·</span>
        <span>{project.year}</span>
      </div>

      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="md:max-w-2xl">
          <h3 className="text-2xl font-medium tracking-tight text-balance md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-muted">{project.description}</p>
          {project.result ? (
            <p className="mt-2 text-sm text-ink-soft">{project.result}</p>
          ) : null}
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-transform duration-300 group-hover:translate-x-0.5">
          View
          <AnimatedArrow />
        </span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </article>
  );
}
