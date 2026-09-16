import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta em teste: azul clarinho + laranja (a mesma cor da fachada
        // real do moinho) + verde de natureza. Os nomes dos tokens (cream,
        // wood, wheat, forest) ficaram os mesmos por baixo do capô só pra
        // não precisar trocar classe por classe em todo componente — troque
        // os valores abaixo à vontade para ajustar o tom.
        cream: {
          DEFAULT: "#eef6fb",
          dark: "#dceaf5",
        },
        wood: {
          light: "#4f8fc2",
          DEFAULT: "#2f6a93",
          dark: "#173a52",
        },
        wheat: {
          light: "#ffcda1",
          DEFAULT: "#f2792b",
          dark: "#c95a15",
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
