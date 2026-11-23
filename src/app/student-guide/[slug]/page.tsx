import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { getGuide, guides } from "@/data/guides";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return { title: "Not found" };
  return { title: guide.title, description: guide.summary };
}

/** Renders the markdown-lite blocks from the guide body. */
function Block({ text }: { text: string }) {
  if (text.startsWith("## ")) {
    return (
      <h2 className="mt-12 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {text.slice(3)}
      </h2>
    );
  }
  if (text.startsWith("- ")) {
    return (
      <li className="ml-1 flex gap-3 text-[15px] leading-relaxed text-slate-300">
        <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
        <span>{text.slice(2)}</span>
      </li>
    );
  }
  return <p className="mt-5 text-[15px] leading-relaxed text-slate-300">{text}</p>;
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const index = guides.findIndex((g) => g.slug === guide.slug);
  const next = guides[(index + 1) % guides.length];

  return (
    <Section className="max-w-3xl pt-32">
      <Link
        href="/student-guide"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-accent"
      >
        <ArrowLeft size={15} /> All guides
      </Link>

      <Reveal className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-soft">
          {guide.readingTime}
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-gradient sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-400">{guide.summary}</p>
      </Reveal>

      <div className="mt-10 h-px bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />

      <article className="mt-6">
        {guide.body.map((text, i) =>
          text.startsWith("- ") ? (
            // Group consecutive bullets visually; each renders as its own li
            <ul key={i} className="mt-3 space-y-2">
              <Block text={text} />
            </ul>
          ) : (
            <Block key={i} text={text} />
          )
        )}
      </article>

      <div className="mt-16 border-t border-white/10 pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Read next</p>
        <Link href={`/student-guide/${next.slug}`} className="group mt-3 block">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-accent-soft">
              {next.title}
            </h3>
            <ArrowRight
              size={18}
              className="shrink-0 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-accent"
            />
          </div>
        </Link>
      </div>
    </Section>
  );
}
