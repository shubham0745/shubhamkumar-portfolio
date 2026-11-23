import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_10px_40px_-12px_rgba(59,130,246,0.9)] hover:bg-accent-deep hover:shadow-[0_14px_50px_-10px_rgba(59,130,246,1)]",
  ghost:
    "border border-white/15 bg-white/[0.03] text-slate-200 hover:border-accent/50 hover:bg-accent/10 hover:text-white",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external,
  download,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    styles[variant],
    className
  );

  if (external || download || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={download || href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
