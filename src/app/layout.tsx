import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PARK } from "@/lib/constants";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${PARK.nome} | Turismo rural em Antônio Prado, RS`,
    template: `%s | ${PARK.nome}`,
  },
  description:
    "Conheça o Moinho Ghinzelli: um moinho de 1894 em funcionamento, visita guiada à casa histórica, trilhas, cascata, bodega e passeio de carreto em Antônio Prado, RS. Reserve sua visita.",
  keywords: [
    "Moinho Ghinzelli",
    "Antônio Prado",
    "turismo rural",
    "moinho colonial",
    "turismo Serra Gaúcha",
    "imigração italiana",
    "Bodega do Moinho",
  ],
  openGraph: {
    title: `${PARK.nome} | Turismo rural em Antônio Prado, RS`,
    description: PARK.tagline,
    locale: "pt_BR",
    type: "website",
    images: ["/images/moinho-exterior.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
