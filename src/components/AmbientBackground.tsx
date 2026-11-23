/**
 * Fixed, non-interactive backdrop: deep navy base with blue/violet glow bleeding
 * in from the corners, a faint grid, and a vignette to keep the edges dark.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Top-left blue bloom */}
      <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28),transparent_65%)] blur-3xl animate-pulse-slow" />
      {/* Top-right cool haze */}
      <div className="absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.16),transparent_65%)] blur-3xl" />
      {/* Mid-left violet */}
      <div className="absolute -left-24 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_65%)] blur-3xl animate-pulse-slow" />
      {/* Bottom-right cyan */}
      <div className="absolute -bottom-40 -right-20 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_65%)] blur-3xl" />

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,3,10,0.85)_100%)]" />
    </div>
  );
}
