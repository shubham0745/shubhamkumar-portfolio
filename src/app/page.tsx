import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import Section, { SectionHeading } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import { featuredProjects } from "@/data/projects";
import { experience } from "@/data/experience";
import { site, skills } from "@/data/site";

const stats = [
  { value: "3", label: "Engineering roles" },
  { value: "100+", label: "Users on shipped product" },
  { value: "3", label: "Cloud & AI certifications" },
  { value: "1", label: "Research publication" },
];

export default function HomePage() {
  const current = experience[0];

  return (
    <>
      <Hero />

      {/* Stats strip */}
      <Section className="pt-8">
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="card-glow group h-full p-5 text-center">
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-slate-400">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Currently */}
      <Section className="pt-24">
        <Reveal>
          <div className="gradient-border group relative overflow-hidden rounded-2xl p-8 sm:p-10">
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_70%)]"
            />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-soft">
                Currently
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
                {current.role} at {current.company}, building backend services in Python and Java,
                after shipping production Django APIs at Careers360.
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-1.5 text-sm text-accent-soft transition-colors hover:text-white"
                >
                  See the full timeline <ArrowRight size={15} />
                </Link>
                <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={13} strokeWidth={1.8} />
                  {current.location} · {current.period}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Featured projects */}
      <Section className="pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Recent Projects"
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

        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <RevealItem key={project.slug} className="[perspective:1200px]">
              <ProjectCard project={project} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Toolbox */}
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
                More about me <ArrowUpRight size={15} />
              </Link>
            }
          />
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((row) => (
            <RevealItem key={row.group}>
              <div className="card-glow group h-full p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                  {row.group}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {row.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
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
              Let&apos;s build something together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              I&apos;m open to backend and systems engineering roles, and happy to talk about
              anything involving APIs, databases and making slow things fast.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact">Get in touch</Button>
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
