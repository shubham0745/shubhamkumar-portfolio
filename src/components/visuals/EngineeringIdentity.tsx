"use client";

import { motion } from "framer-motion";
import { Boxes, CornerDownRight, FlaskConical, ScanSearch } from "lucide-react";
import { identityAreas } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Replaces the previous Client → API → Cache → Data flowchart on the About page.
 *
 * That diagram described a generic request path that any backend developer
 * could claim. This instead states the three areas the work actually spans and,
 * more importantly, what each one contributes to the other two — which is the
 * part that is specific to this person rather than to the job title.
 *
 * Animation is limited to a staggered reveal on transform and opacity. The root
 * layout's `MotionConfig reducedMotion="user"` drops the movement for anyone
 * who asks for reduced motion.
 */

const icons = [Boxes, ScanSearch, FlaskConical];

/** Complete literal class strings — Tailwind cannot generate names built at runtime. */
const accents = [
  { text: "text-accent-soft", border: "border-accent/30", node: "bg-accent" },
  { text: "text-violet-300", border: "border-violet-400/30", node: "bg-violet-400" },
  { text: "text-cyan-300", border: "border-cyan-400/30", node: "bg-cyan-400" },
];

export default function EngineeringIdentity({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Soft bloom behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_70%)]"
      />

      <div className="gradient-border relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-soft">
          How the work fits together
        </p>

        <ol className="relative mt-7 space-y-7">
          {/* Spine connecting the three areas */}
          <span
            aria-hidden
            className="absolute left-[19px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-accent/40 via-violet-400/30 to-cyan-400/20 sm:block"
          />

          {identityAreas.map((area, i) => {
            const Icon = icons[i % icons.length];
            const accent = accents[i % accents.length];

            return (
              <motion.li
                key={area.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative sm:pl-14"
              >
                {/* Node on the spine */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[11px] top-3 hidden h-[17px] w-[17px] place-items-center rounded-full border bg-ink-950 sm:grid",
                    accent.border
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", accent.node)} />
                </span>

                <div className="flex items-start gap-3">
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className={cn("mt-0.5 shrink-0 sm:hidden", accent.text)}
                  />
                  <div className="min-w-0">
                    <h3 className={cn("font-display text-[15px] font-semibold", accent.text)}>
                      {area.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">
                      {area.detail}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {area.focus.map((f) => (
                        <span
                          key={f}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-400"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* What this area gives the other two */}
                    <p className="mt-3 flex gap-2 text-[12px] leading-relaxed text-slate-500">
                      <CornerDownRight
                        size={13}
                        strokeWidth={1.8}
                        className="mt-0.5 shrink-0 text-slate-600"
                      />
                      {area.feeds}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
