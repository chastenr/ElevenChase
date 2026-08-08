"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/work";
import { AnimatedArrow } from "./AnimatedArrow";
import { EASE_PREMIUM } from "@/lib/motion";

function BrowserThumb() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
        <span className="ml-3 h-1.5 w-24 rounded-full bg-ink/10" />
      </div>
      <div className="flex flex-1 gap-4 p-5">
        <div className="w-1/4 space-y-2 pt-1">
          <div className="h-1.5 w-full rounded-full bg-ink/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-ink/10" />
          <div className="h-1.5 w-4/5 rounded-full bg-ink/10" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="rounded-sm bg-ink/5" />
          <div className="rounded-sm bg-accent/10" />
          <div className="col-span-2 rounded-sm bg-ink/5" />
        </div>
      </div>
    </div>
  );
}

function FragmentsThumb() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-[18%] left-[12%] h-16 w-24 border border-line" />
      <div className="absolute top-[38%] left-[38%] h-20 w-32 border border-ink/15" />
      <div className="absolute top-[22%] right-[14%] h-10 w-10 rounded-full bg-accent/15" />
      <div className="absolute bottom-[28%] left-[20%] h-1.5 w-28 rounded-full bg-ink/10" />
      <div className="absolute bottom-[20%] left-[20%] h-1.5 w-16 rounded-full bg-ink/10" />
      <div className="absolute right-[16%] bottom-[20%] h-14 w-14 border border-line" />
    </div>
  );
}

function GridThumb() {
  return (
    <div className="absolute inset-0">
      <div className="grid h-full grid-cols-6 grid-rows-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="border border-line/70" />
        ))}
      </div>
      <div className="absolute top-[25%] left-[33.3%] h-1/4 w-1/6 bg-accent/15" />
      <div className="absolute top-[50%] left-[66.6%] h-1/4 w-1/6 bg-ink/10" />
    </div>
  );
}

const THUMBNAILS = {
  browser: BrowserThumb,
  fragments: FragmentsThumb,
  grid: GridThumb,
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const Thumbnail = THUMBNAILS[project.thumbnail];

  return (
    <article className="group border-b border-line py-10 first:pt-0 last:border-none md:py-14">
      <div className="grid gap-6 md:grid-cols-12 md:gap-8 lg:gap-12">
        <div className="md:col-span-5 lg:col-span-6">
          <div className="relative aspect-4/3 overflow-hidden border border-line bg-ivory-soft">
            <motion.div
              className="absolute inset-0"
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              whileHover={{ scale: 1.045 }}
            >
              <Thumbnail />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col justify-between md:col-span-7 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between font-mono text-xs tracking-[0.14em] text-muted uppercase transition-opacity duration-300 group-hover:opacity-70">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3 className="mt-4 text-2xl font-medium tracking-tight text-balance md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-md text-muted">{project.description}</p>
            {project.result ? (
              <p className="mt-3 text-sm text-ink-soft">{project.result}</p>
            ) : null}
          </div>

          <div className="mt-8 flex items-end justify-between gap-6">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium">
              View
              <AnimatedArrow />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
