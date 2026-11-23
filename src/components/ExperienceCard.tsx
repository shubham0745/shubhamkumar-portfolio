import { Info, MapPin } from "lucide-react";
import type { Experience, ExperienceKind } from "@/data/experience";
import Chip from "./Chip";

/** Makes the nature of each engagement explicit, rather than implying employment. */
const kindLabel: Record<ExperienceKind, string | null> = {
  freelance: "Freelance",
  internship: "Internship",
  training: "Internship",
};

export default function ExperienceCard({ item }: { item: Experience }) {
  const label = kindLabel[item.kind];

  return (
    <article className="card-glow group p-7 sm:p-9">
      {/* Accent rail that lights up on hover */}
      <span
        aria-hidden
        className="absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
              {item.company}
            </h3>
            {label && (
              <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
                {label}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm italic text-accent-soft">{item.role}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-mono text-xs tracking-wide text-slate-400">{item.period}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 sm:justify-end">
            <MapPin size={12} strokeWidth={1.8} />
            {item.location}
          </p>
        </div>
      </header>

      {item.note && (
        <p className="mt-5 flex items-start gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 text-xs leading-relaxed text-slate-400">
          <Info size={13} strokeWidth={1.8} className="mt-0.5 shrink-0 text-slate-500" />
          {item.note}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {item.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-300">
            <span
              aria-hidden
              className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
    </article>
  );
}
