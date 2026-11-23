import { MapPin } from "lucide-react";
import type { Experience } from "@/data/experience";
import Chip from "./Chip";

export default function ExperienceCard({ item }: { item: Experience }) {
  return (
    <article className="card-glow group p-7 sm:p-9">
      {/* Accent rail that lights up on hover */}
      <span
        aria-hidden
        className="absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
            {item.company}
          </h3>
          <p className="mt-1 text-sm italic text-accent-soft">{item.role}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-mono text-xs tracking-wide text-slate-400">{item.period}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 sm:justify-end">
            <MapPin size={12} strokeWidth={1.8} />
            {item.location}
          </p>
        </div>
      </header>

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
