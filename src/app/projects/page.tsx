import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Chip from "@/components/Chip";
import { featuredProjects, projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects built by ${site.name} — machine learning forecasting, full-stack platforms and backend tooling.`,
};

export default function ProjectsPage() {
  return (
    <Section className="pt-32">
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="Things I built end to end — from the data pipeline underneath to the dashboard on top."
      />

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <RevealItem key={project.slug} className="[perspective:1200px]">
            <ProjectCard project={project} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Longer write-ups for the projects worth explaining */}
      <div className="pt-24">
        <Reveal>
          <SectionHeading eyebrow="In depth" title="Case notes" />
        </Reveal>

        <div className="space-y-6">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <article className="card-glow group grid gap-6 p-7 sm:p-9 lg:grid-cols-[1fr_2fr]">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-slate-500">{project.year}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-300">{project.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
