"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Types each phrase out, holds it, deletes it, moves to the next.
 * Falls back to the first phrase (no animation) when the user prefers reduced motion.
 */
export default function TypingText({
  phrases,
  className,
  typeSpeed = 70,
  deleteSpeed = 35,
  holdTime = 1800,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setText(phrases[0] ?? "");
  }, [phrases]);

  useEffect(() => {
    if (reduced.current || phrases.length === 0) return;

    const current = phrases[index % phrases.length];

    // Finished typing — pause, then start deleting
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(t);
    }

    // Finished deleting — advance to the next phrase
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        ),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>{text}</span>
      <span
        aria-hidden
        className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent animate-blink"
      />
    </span>
  );
}
