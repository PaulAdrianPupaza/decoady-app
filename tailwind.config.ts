import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        // Tinta: textos y fondos oscuros
        ink: {
          DEFAULT: "#1a1814",
          900: "#12110e",
          800: "#1a1814",
          700: "#2b2823",
          600: "#4a463f",
          500: "#6b665d",
          400: "#8f897e",
          300: "#b9b3a8",
        },
        // Arena: fondos claros cálidos (piedra de Ibiza)
        sand: {
          50: "#fcfbf8",
          100: "#f7f4ee",
          200: "#efe9df",
          300: "#e2d9ca",
          400: "#cfc2ad",
        },
        // Arcilla: color de marca / acentos
        clay: {
          50: "#fbf3ee",
          100: "#f5e2d6",
          300: "#dea07f",
          500: "#b5572f",
          600: "#9c4726",
          700: "#7f3a1f",
        },
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
