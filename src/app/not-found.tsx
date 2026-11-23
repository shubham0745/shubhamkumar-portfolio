import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-accent-soft">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-slate-400">
        That route doesn&apos;t exist. It may have moved, or the link may be wrong.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm text-slate-300 transition-colors hover:border-accent/50 hover:text-white"
        >
          See projects
        </Link>
      </div>
    </Section>
  );
}
