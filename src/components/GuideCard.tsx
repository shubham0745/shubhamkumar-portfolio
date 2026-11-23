"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Guide } from "@/data/guides";

/**
 * Row on the Student Guide index. Client-side purely so the spotlight can
 * follow the cursor: it writes --x/--y, which the overlay gradient reads.
 * Touch devices never fire a mouse pointer event, so they just get the
 * static card with the gradient parked at its 50%/50% default.
 */
export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/student-guide/${guide.slug}`} className="block">
      <article
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }}
        className="gradient-border group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-7"
      >
        {/* Spotlight that follows the cursor */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--x,50%)_var(--y,50%),rgba(59,130,246,0.1),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
  );
}
