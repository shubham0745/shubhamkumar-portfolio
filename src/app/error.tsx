"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * Catches render/runtime errors in any route segment below the root layout and
 * shows them in the site's own shell instead of an unstyled crash screen.
 * (Errors thrown inside the root layout itself would need global-error.tsx.)
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces the real error in the browser console / server logs, since the
    // message itself is deliberately not shown to visitors.
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-accent-soft">ERROR</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-5 max-w-md text-slate-400">
        This page hit an unexpected error. Retrying usually clears it. If it keeps happening, the
        contact page still works.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-12px_rgba(59,130,246,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_14px_50px_-10px_rgba(59,130,246,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Try again <RotateCcw size={16} />
        </button>
        <Button href="/" variant="ghost">
          Back home
        </Button>
      </div>

      {error.digest && (
        <p className="mt-8 font-mono text-xs text-slate-600">Reference: {error.digest}</p>
      )}
    </Section>
  );
}
