"use client";

import { motion } from "framer-motion";
import { Database, Layers, Server, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Replaces the previous react-three-fiber "DevScene".
 *
 * The old version was an abstract stack of glowing slabs; this says the same
 * thing literally, using the request path through a backend. Animation is
 * limited to transform/opacity on three small packets, so it stays on the
 * compositor instead of burning CPU every frame like the WebGL scene did.
 *
 * Framer's global `MotionConfig reducedMotion="user"` in the root layout drops
 * the packet movement for anyone who asks for reduced motion.
 */

const tiers = [
  { label: "Client", detail: "Next.js · React", Icon: Layers, tint: "text-sky-300" },
  { label: "API", detail: "Django REST Framework", Icon: Server, tint: "text-accent-soft" },
  { label: "Cache & queue", detail: "Redis · Celery", Icon: Zap, tint: "text-violet-300" },
  { label: "Data", detail: "MySQL · Elasticsearch", Icon: Database, tint: "text-cyan-300" },
];

const packets = [0, 1.3, 2.6];

export default function StackDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
      {/* Soft bloom behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_70%)]"
      />

      <div className="relative w-full max-w-sm">
        {/* Rail the packets travel down */}
        <div
          aria-hidden
          className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent"
        />

        {packets.map((delay) => (
          <motion.span
            key={delay}
            aria-hidden
            className="absolute left-[24px] h-1.5 w-1.5 rounded-full bg-accent-soft shadow-[0_0_8px_2px_rgba(96,165,250,0.5)]"
            initial={{ top: "8%", opacity: 0 }}
            // Keyframe arrays and `times` must all be the same length.
            animate={{ top: ["8%", "20%", "80%", "92%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3.4,
              delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.15, 0.85, 1],
            }}
          />
        ))}

        <ul className="relative space-y-3">
          {tiers.map(({ label, detail, Icon, tint }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative ml-14 rounded-xl border border-white/10 bg-ink-800/70 p-4 transition-colors duration-300 hover:border-accent/40"
            >
              {/* Connector from the rail into the card */}
              <span
                aria-hidden
                className="absolute -left-8 top-1/2 h-px w-8 bg-gradient-to-r from-accent/40 to-transparent"
              />
              <span
                aria-hidden
                className="absolute -left-[38px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-accent/50 bg-ink-950"
              />

              <div className="flex items-center gap-3">
                <Icon size={18} strokeWidth={1.8} className={tint} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="truncate font-mono text-[11px] text-slate-400">{detail}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
