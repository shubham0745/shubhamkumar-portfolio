import { cn } from "@/lib/utils";

export default function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] tracking-wide text-slate-300 transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
