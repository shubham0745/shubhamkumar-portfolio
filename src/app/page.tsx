import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import Section, { SectionHeading } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Capabilities from "@/components/Capabilities";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import { featuredProjects } from "@/data/projects";
import { experience } from "@/data/experience";
import { coreStack, site } from "@/data/site";

export default function HomePage() {
  // Lead with current work, then the two most recent completed roles.
  const preview = experience.slice(0, 3);

  return (
    <>
      <Hero />

      {/* What I work on */}
      <Section className="pt-10">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="What I Work On"
            action={
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-accent"
              >
                More about me <ArrowUpRight size={15} />
              </Link>
            }
          />
        </Reveal>

        <Capabilities />
      </Section>

      {/* Featured projects */}
      <Section className="pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Featured Projects"
            action={
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-accent"
              >
                All projects <ArrowUpRight size={15} />
              </Link>
            }
          />
        </Reveal>

        <RevealGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <RevealItem key={project.slug} className="[perspective:1200px]">
              <ProjectCard project={project} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Experience preview */}
      <Section className="pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked"
            action={
              <Link
                href="/experience"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-accent"
              >
                Full timeline <ArrowUpRight size={15} />
              </Link>
            }
          />
        </Reveal>

        <RevealGroup className="space-y-4">
          {preview.map((item) => (
            <RevealItem key={`${item.company}-${item.role}`}>
              <div className="card-glow group flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.company}
                    </h3>
                    {item.kind === "freelance" && (
                      <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
                        Freelance
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm italic text-accent-soft">{item.role}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-slate-500">
                    <span>{item.period}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={11} strokeWidth={1.8} />
                      {item.location}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 sm:max-w-[18rem] sm:justify-end">
                  {item.stack.slice(0, 4).map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Toolbox — condensed; the full list is on /about */}
      <Section className="pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Toolbox"
            title="What I build with"
            action={
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-accent"
              >
                Full skill list <ArrowUpRight size={15} />
              </Link>
            }
          />
        </Reveal>

        <Reveal>
          <div className="card-glow group divide-y divide-white/5 p-6 sm:p-7">
            {coreStack.map((row) => (
              <div
                key={row.group}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:gap-6"
              >
                <p className="w-full shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft sm:w-52 sm:pt-1">
                  {row.group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {row.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Closing CTA */}
      <Section className="pt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50 p-10 text-center sm:p-16">
            <div
              aria-hidden
              className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Have a technical challenge? Let&apos;s build something.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              I&apos;m open to software engineering roles, freelance backend work, AI training and
              evaluation projects, research collaborations and technical fellowships.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact">
                Get in touch <ArrowRight size={16} />
              </Button>
              <Button href={site.socials.github} variant="ghost" external>
                GitHub <ArrowUpRight size={16} />
              </Button>
              <Button href={site.socials.linkedin} variant="ghost" external>
                LinkedIn <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
