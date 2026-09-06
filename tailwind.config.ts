import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#faf3e6",
          dark: "#f0e4cc",
        },
        wood: {
          light: "#8b5e34",
          DEFAULT: "#6b4226",
          dark: "#432a18",
        },
        wheat: {
          light: "#f0d9a8",
          DEFAULT: "#d9a441",
          dark: "#b9822b",
        },
        forest: {
          light: "#5c7752",
          DEFAULT: "#3f5b3a",
          dark: "#2c4027",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.035) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
