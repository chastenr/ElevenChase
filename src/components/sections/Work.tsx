import { PROJECTS } from "@/data/work";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Work() {
  return (
    <section id="work" className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{"// 04 Work"}</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["Proof in", "production."]}
            className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Representative engagements across SaaS, AI and enterprise
              platforms: the kind of software we build for ambitious teams.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 border-t border-line md:mt-14">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.index} direction={i % 2 === 0 ? "up" : "left"} delay={0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
