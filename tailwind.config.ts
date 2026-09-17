import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta v3: só laranja (cor real da fachada do moinho) e azul —
        // pedido do cliente pra tirar o verde por completo. O token "forest"
        // (antes o verde de natureza) agora aponta pro mesmo azul do
        // "wheat", só pra não precisar trocar classe por classe em todo
        // componente. Os nomes dos tokens ficaram os mesmos por baixo do
        // capô — troque os valores abaixo à vontade.
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
          light: "#bcdff5",
          DEFAULT: "#3f8fc4",
          dark: "#215e85",
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
