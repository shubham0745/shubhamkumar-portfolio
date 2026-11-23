import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Edge runtime is required here, not just preferred.
 *
 * On the default Node runtime, @vercel/og's bundled Node entry throws
 * "TypeError: Invalid URL" from fileURLToPath while resolving its own bundled
 * font during module init, which fails `next build` (vercel/satori#661).
 *
 * The cost is that Next marks this route Dynamic rather than prerendering it,
 * so the PNG is rendered per request. That is fine for a social preview: it is
 * scraped rarely and cached by the platforms that fetch it.
 */
export const runtime = "edge";

export const alt = `${site.name} — Backend Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["Python", "Django", "MySQL", "Redis", "AWS"];

/**
 * Social preview card, rendered at build time.
 *
 * Kept to flexbox + inline styles on purpose: this is rendered by satori, which
 * supports only a subset of CSS (no grid, no Tailwind classes, no external CSS).
 * Every element holding children needs an explicit `display: flex`.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#04050f",
          padding: "0 80px",
          position: "relative",
        }}
      >
        {/* Blue bloom, top-left */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 720,
            height: 720,
            display: "flex",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.45), rgba(37,99,235,0) 70%)",
          }}
        />
        {/* Violet bloom, bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -160,
            width: 680,
            height: 680,
            display: "flex",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.42), rgba(124,58,237,0) 70%)",
          }}
        />
        {/* Hairline along the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            display: "flex",
            background:
              "linear-gradient(to right, rgba(4,5,15,0), #3b82f6, #7c3aed, rgba(4,5,15,0))",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.3em",
              color: "#60a5fa",
            }}
          >
            PORTFOLIO
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              color: "#ffffff",
              marginTop: 18,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>

          <div style={{ display: "flex", fontSize: 42, color: "#93c5fd", marginTop: 14 }}>
            {site.roles[0]}
          </div>

          <div style={{ display: "flex", fontSize: 28, color: "#94a3b8", marginTop: 26 }}>
            {site.tagline}
          </div>

          <div style={{ display: "flex", flexDirection: "row", marginTop: 46 }}>
            {chips.map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#cbd5e1",
                  border: "1px solid rgba(148,163,184,0.28)",
                  borderRadius: 10,
                  padding: "8px 18px",
                  marginRight: 12,
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
