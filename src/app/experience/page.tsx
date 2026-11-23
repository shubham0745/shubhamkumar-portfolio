import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ExperienceCard from "@/components/ExperienceCard";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { experience } from "@/data/experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Experience of ${site.name} — backend development at Careers360 and Tata Steel Foundation, independent AI training and evaluation, and freelance technical problem-solving.`,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <Section className="pt-32">
      <PageHeader
        eyebrow="Career"
        title="Experience"
        description="Backend engineering in production, independent AI training and evaluation, and freelance technical problem-solving. Each entry below states whether it was an internship or a freelance engagement."
      />

      <div className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute left-[7px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent md:block"
        />

        <div className="space-y-8 md:pl-12">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${item.role}`} delay={i * 0.06}>
              <div className="relative">
                {/* Timeline node */}
                <span
                  aria-hidden
                  className="absolute -left-12 top-10 hidden h-4 w-4 items-center justify-center rounded-full border border-accent/50 bg-ink-950 md:flex"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <ExperienceCard item={item} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <Button href="/projects">See the projects</Button>
          <Button href="/contact" variant="ghost">
            Get in touch
          </Button>
          {/* Hidden until public/resume.pdf is replaced — see site.resumeReady */}
          {site.resumeReady && (
            <Button href={site.resumeUrl} variant="ghost" download>
              Download Resume
            </Button>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
