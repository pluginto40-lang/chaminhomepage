import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: {
          DEFAULT: "#FFB5C8",
          light: "#FFD6E0",
          dark: "#FF8FAB",
        },
        mint: {
          DEFAULT: "#B5E8E0",
          light: "#D6F5F0",
          dark: "#7DD4C8",
        },
        cream: {
          DEFAULT: "#FFF9F5",
          warm: "#FFF0E8",
        },
      },
      fontFamily: {
        korean: ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
