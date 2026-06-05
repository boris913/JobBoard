import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0D0D0D",
          soft: "#1A1A1A",
          muted: "#2E2E2E",
        },
        paper: {
          DEFAULT: "#F5F0E8",
          warm: "#EDE8DC",
          cool: "#F8F6F2",
        },
        accent: {
          DEFAULT: "#D4521A",
          light: "#E8733D",
          dark: "#A83D10",
        },
        stone: {
          50: "#FAFAF9",
          100: "#F5F5F0",
          200: "#E8E4DC",
          300: "#D4CDBE",
          400: "#B8AD9A",
          500: "#968A76",
          600: "#756A58",
          700: "#574E3F",
          800: "#3A342A",
          900: "#1E1A14",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
