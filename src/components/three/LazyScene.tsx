"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

/** Soft placeholder shown while the WebGL bundle streams in. */
function ScenePlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.25),transparent_70%)] blur-xl" />
    </div>
  );
}

// three.js is heavy — keep it out of the server bundle and off the critical path.
const Hero = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

const Dev = dynamic(() => import("./DevScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

export function HeroCanvas({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Hero />
    </div>
  );
}

export function DevCanvas({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Dev />
    </div>
  );
}
