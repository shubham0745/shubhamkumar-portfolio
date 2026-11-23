"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes Framer drop transform animations for anyone who
 * has "reduce motion" switched on, while still fading content in — so the site
 * stays calm for them without leaving anything stuck invisible.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
