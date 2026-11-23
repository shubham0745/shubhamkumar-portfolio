import type { Metadata } from "next";
import { Award, BookOpen, GraduationCap, Star } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import { DevCanvas } from "@/components/three/LazyScene";
import { about, certifications, education, publication, site, skills } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — backend developer, MCA from BIT Mesra, working in Python, Django, MySQL and AWS.`,
};

export default function AboutPage() {
  return (
    <Section className="pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <PageHeader eyebrow="About" title="About Me" />
          <div className="space-y-5">
            {about.intro.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[15px] leading-relaxed text-slate-300">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.resumeUrl} download>
                Download Resume
              </Button>
              <Button href="/contact" variant="ghost">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </div>

        {/* 3D element */}
        <Reveal direction="left" className="order-first lg:order-last">
          <div className="relative h-[22rem] w-full sm:h-[26rem] lg:h-[32rem]">
            <DevCanvas />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,5,15,0.6)_100%)]"
            />
          </div>
        </Reveal>
      </div>

      {/* Highlights */}
      <div className="pt-24">
        <Reveal>
          <SectionHeading eyebrow="Track record" title="What I&rsquo;ve done" />
        </Reveal>
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {about.highlights.map((item) => (
            <RevealItem key={item}>
              <div className="card-glow group flex h-full items-start gap-3 p-5">
                <Star size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={2} />
                <p className="text-sm leading-relaxed text-slate-300">{item}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Skills */}
      <div className="pt-24">
        <Reveal>
          <div className="gradient-border group rounded-2xl p-8 sm:p-10">
            <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              My Technical Skills
            </h2>
            <div className="mt-8 space-y-5">
              {skills.map((row) => (
                <div
                  key={row.group}
                  className="flex flex-col gap-3 border-b border-white/5 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:gap-6"
                >
                  <p className="w-40 shrink-0 text-sm font-medium text-accent-soft">{row.group}</p>
                  <div className="flex flex-wrap gap-2">
                    {row.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Education + credentials */}
      <div className="grid gap-6 pt-24 lg:grid-cols-2">
        <Reveal>
          <div className="card-glow group h-full p-7">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
              <GraduationCap size={20} className="text-accent" strokeWidth={1.8} />
              Education
            </h3>
            <ul className="mt-6 space-y-6">
              {education.map((e) => (
                <li key={e.school} className="border-l border-white/10 pl-5">
                  <p className="font-medium text-white">{e.school}</p>
                  <p className="mt-1 text-sm text-slate-400">{e.degree}</p>
                  <p className="mt-1 font-mono text-xs text-slate-500">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col gap-6">
            <div className="card-glow group p-7">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                <Award size={20} className="text-accent" strokeWidth={1.8} />
                Certifications
              </h3>
              <ul className="mt-5 space-y-3">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-slate-300">
                    <span
                      aria-hidden
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glow group flex-1 p-7">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                <BookOpen size={20} className="text-accent" strokeWidth={1.8} />
                Publication
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-slate-300">{publication.title}</p>
              <p className="mt-2 font-mono text-xs text-slate-500">{publication.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
