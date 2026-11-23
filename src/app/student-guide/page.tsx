import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Student Guide",
  description:
    "Practical guides for engineering students — DSA roadmaps, backend learning paths, resume advice and off-campus job hunting.",
};

export default function StudentGuidePage() {
  return (
    <Section className="pt-32">
      <PageHeader
        eyebrow="Student guide"
        title="Guides for students"
        description={
          <>
            <p>
              If you&apos;re an engineering student trying to break into software, this is the
              advice I wish someone had given me — written from what actually worked, not from what
              sounds good.
            </p>
            <p className="mt-4">
              No mentor, no senior to ask? Start here. If something still isn&apos;t answered, reach
              out directly.
            </p>
          </>
        }
      />

      <RevealGroup className="space-y-4" stagger={0.06}>
        {guides.map((guide) => (
          <RevealItem key={guide.slug}>
            <Link href={`/student-guide/${guide.slug}`} className="block">
              <article className="gradient-border group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-7">
                {/* Sweep of light on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--x,50%)_50%,rgba(59,130,246,0.1),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative flex flex-wrap items-center justify-between gap-4">
                  <div className="max-w-3xl">
                    <h2 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-accent-soft sm:text-xl">
                      {guide.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{guide.summary}</p>
                    <p className="mt-3 font-mono text-[11px] text-slate-500">{guide.readingTime}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </div>
              </article>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
