import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#04050f",
          900: "#070a1a",
          850: "#0a0e22",
          800: "#0d1229",
          700: "#141a38",
        },
        accent: {
          DEFAULT: "#3b82f6",
          soft: "#60a5fa",
          deep: "#2563eb",
        },
        violetGlow: "#7c3aed",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99,102,241,0.18), 0 18px 60px -20px rgba(59,130,246,0.45)",
        "glow-lg": "0 0 0 1px rgba(99,102,241,0.28), 0 30px 90px -25px rgba(59,130,246,0.7)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-slow": "pulse-slow 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
