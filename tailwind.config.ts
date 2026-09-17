import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta em teste (v2): laranja como cor-base (a mesma da fachada
        // real do moinho), com azul e verde de natureza como acento. Os
        // nomes dos tokens (cream, wood, wheat, forest) ficaram os mesmos
        // por baixo do capô só pra não precisar trocar classe por classe em
        // todo componente — troque os valores abaixo à vontade.
        cream: {
          DEFAULT: "#fdf4ec",
          dark: "#f8e3cd",
        },
        wood: {
          light: "#f4935a",
          DEFAULT: "#e2661a",
          dark: "#8a3a0d",
        },
        wheat: {
          light: "#bcdff5",
          DEFAULT: "#3f8fc4",
          dark: "#215e85",
        },
        forest: {
          light: "#8fc47c",
          DEFAULT: "#4f9142",
          dark: "#33632a",
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
