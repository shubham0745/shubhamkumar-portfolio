import Link from "next/link";
import { ArrowRight, Boxes, FlaskConical, ScanSearch } from "lucide-react";
import { RevealGroup, RevealItem } from "./Reveal";
import Chip from "./Chip";
import { capabilities } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * "What I Work On" — three compact signpost cards.
 *
 * Kept short deliberately: each card states the area, four engineering tags and
 * the work behind it, then links to the page that actually explains it. The
 * detail belongs on /projects and /experience, not here.
 *
 * The index number and per-card accent are what keep this from reading as a
 * generic three-card service grid.
 */

const icons = [Boxes, ScanSearch, FlaskConical];

/**
 * Complete literal class strings. Tailwind scans source for class names, so
 * anything assembled at runtime never gets generated.
 */
const accents = [
  {
    text: "text-accent-soft",
    hoverRing: "group-hover:border-accent/40",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    text: "text-violet-300",
    hoverRing: "group-hover:border-violet-400/40",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    text: "text-cyan-300",
    hoverRing: "group-hover:border-cyan-400/40",
    glow: "rgba(34,211,238,0.13)",
  },
];

export default function Capabilities() {
  return (
    <RevealGroup className="grid gap-5 lg:grid-cols-3">
      {capabilities.map((cap, i) => {
        const Icon = icons[i % icons.length];
        const accent = accents[i % accents.length];

        return (
          <RevealItem key={cap.id}>
            <section
              aria-labelledby={`cap-${cap.id}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50 p-7 transition-colors duration-300 hover:border-accent/30"
            >
              {/* Corner bloom, tinted per card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full"
                style={{ background: `radial-gradient(circle, ${accent.glow}, transparent 70%)` }}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-300",
                    accent.hoverRing,
                    accent.text
                  )}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="font-mono text-xs tracking-[0.3em] text-slate-600">
                  {cap.index}
                </span>
              </div>

              <h3
                id={`cap-${cap.id}`}
                className="relative mt-6 font-display text-lg font-semibold leading-snug text-white"
              >
                {cap.title}
              </h3>

              <p className="relative mt-3 text-sm leading-relaxed text-slate-400">{cap.summary}</p>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>

              {cap.work && (
                <div className="relative mt-6 border-t border-white/[0.07] pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    Behind it
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {cap.work.map((w) => (
                      <li
                        key={w}
                        className={cn("text-[13px] font-medium leading-snug", accent.text)}
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href={cap.cta.href}
                className={cn(
                  "relative mt-auto inline-flex w-fit items-center gap-1.5 pt-6 text-sm transition-colors hover:text-white",
                  accent.text
                )}
              >
                {cap.cta.label}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </section>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
