/**
 * Fixed, non-interactive backdrop: deep navy base with blue/violet glow bleeding
 * in from the corners, a faint grid, and a vignette to keep the edges dark.
 *
 * Deliberately one painted element with stacked gradient layers.
 *
 * The earlier version used four ~40rem divs with `blur-3xl`, two of them running
 * an infinite opacity animation. That is one of the most expensive things you
 * can ask a browser to do: a large-radius filter forces the compositor to
 * re-blur a huge surface, and animating opacity on top of it meant doing so
 * every frame, on every page, forever. A radial gradient is already soft, so
 * the blur bought nothing visually and cost most of the scroll smoothness.
 */
const glow = [
  "radial-gradient(60rem 42rem at 6% -8%, rgba(37,99,235,0.30), transparent 62%)",
  "radial-gradient(46rem 34rem at 98% -4%, rgba(148,163,184,0.13), transparent 60%)",
  "radial-gradient(42rem 42rem at -6% 44%, rgba(124,58,237,0.22), transparent 62%)",
  "radial-gradient(46rem 36rem at 102% 102%, rgba(34,211,238,0.14), transparent 60%)",
].join(",");

const gridMask = "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)";

export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink-950">
      <div className="absolute inset-0" style={{ backgroundImage: glow }} />

      {/* Faint grid, fading out down the page */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,3,10,0.85)_100%)]" />
    </div>
  );
}
