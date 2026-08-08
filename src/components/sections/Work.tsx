import { PROJECTS } from "@/data/work";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Work() {
  return (
    <section id="work" className="py-24 md:py-36">
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
              platforms — the kind of software we build for ambitious teams.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
