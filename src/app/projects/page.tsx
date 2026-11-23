import type { Metadata } from "next";
import { ArrowUpRight, FileText, Gauge, Github } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Chip from "@/components/Chip";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects built by ${site.name} — a distributed key-value cache with Raft leader election, a full-stack wellness platform, and published machine learning research.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Section className="pt-32">
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="Systems I built end to end — from the consensus layer underneath to the dashboard on top. Each one below includes the problem it set out to solve and the engineering that went into it."
      />

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <RevealItem key={project.slug} className="[perspective:1200px]">
            <ProjectCard project={project} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Long-form write-ups */}
      <div className="pt-24">
        <Reveal>
          <SectionHeading eyebrow="In depth" title="Case notes" />
        </Reveal>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <article className="card-glow group p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-xs text-slate-500">{project.year}</p>
                  </div>

                  {(project.links?.github || project.links?.demo || project.links?.paper) && (
                    <div className="flex flex-wrap items-center gap-4">
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-accent"
                        >
                          Live <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-accent"
                        >
                          <Github size={14} /> Code
                        </a>
                      )}
                      {project.links?.paper && (
                        <a
                          href={project.links.paper}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-accent"
                        >
                          <FileText size={14} /> Paper
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-7 grid gap-7 lg:grid-cols-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                      The problem
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
                      {project.problem}
                    </p>

                    <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                      What it does
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                      Engineering
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {project.contributions.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-relaxed text-slate-300"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Only present where the project actually benchmarks itself */}
                    {project.results && (
                      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                          Measured
                        </p>
                        <ul className="mt-3 space-y-2">
                          {project.results.map((r) => (
                            <li
                              key={r}
                              className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300"
                            >
                              <Gauge
                                size={13}
                                strokeWidth={1.8}
                                className="mt-0.5 shrink-0 text-accent-soft"
                              />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-[11px] leading-relaxed text-slate-600">
                          From the project&apos;s own benchmark suite on a single 4-vCPU VM running
                          every component. Methodology and caveats are in the repository.
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/5 pt-6">
                      {project.stack.map((tech) => (
                        <Chip key={tech}>{tech}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
