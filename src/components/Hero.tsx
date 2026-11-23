"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import Button from "./Button";
import TypingText from "./TypingText";
import HeroField from "./visuals/HeroField";
import { site } from "@/data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Canvas node field sits behind the copy */}
      <HeroField className="opacity-90" />

      {/* Keeps text readable over the field */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_50%,rgba(4,5,15,0.94)_0%,rgba(4,5,15,0.66)_55%,transparent_85%)]"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.07 }}
        className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] text-slate-300 sm:text-xs"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {site.availability}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display tracking-tight"
        >
          <span className="block text-base font-medium text-accent-soft sm:text-lg">
            {site.name}
          </span>
          <span className="mt-3 block text-3xl font-extrabold leading-[1.12] text-gradient sm:text-5xl lg:text-6xl">
            {site.headline}
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-6 min-h-[2.25rem] font-display text-base text-slate-200 sm:text-xl"
        >
          <TypingText phrases={site.roles} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-400"
        >
          {site.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/projects" variant="primary">
            Explore My Projects <ArrowRight size={16} />
          </Button>
          <Button href="/experience" variant="ghost">
            View My Experience
          </Button>
          <Button href="/contact" variant="ghost">
            Let&apos;s Collaborate
          </Button>
          {/* Hidden until public/resume.pdf is replaced — see site.resumeReady */}
          {site.resumeReady && (
            <Button href={site.resumeUrl} variant="ghost" download>
              Download Resume <Download size={16} />
            </Button>
          )}
        </motion.div>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-1.5 text-xs text-slate-500"
        >
          <MapPin size={13} strokeWidth={1.8} />
          {site.location}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
