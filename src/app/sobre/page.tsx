import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HISTORIA_TEXTO, PARK } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Nossa história",
  description:
    "Conheça a história do Moinho Ghinzelli, construído em 1894 por imigrantes italianos em Antônio Prado, RS, e hoje cuidado pela quarta geração da família.",
};

export default function SobrePage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-page">
          <SectionHeading
            eyebrow="Desde 1894"
            title="Uma história de imigração, água e farinha"
            description="A trajetória de quatro gerações da família Ghinzelli, contada no mesmo lugar onde tudo começou."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <div className="mb-2 overflow-hidden rounded-2xl">
                <Image
                  src="/images/moinho-exterior.jpg"
                  alt="Moinho Ghinzelli visto de fora, com a cascata ao fundo"
                  width={1280}
                  height={960}
                  className="h-auto w-full object-cover"
                />
              </div>
              {HISTORIA_TEXTO.map((paragrafo, i) => (
                <p key={i} className="text-base leading-relaxed text-wood-dark/80">
                  {paragrafo}
                </p>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-wood/10 bg-wheat-light/40 p-6">
              <p className="eyebrow">Linha do tempo</p>
              <ul className="mt-4 space-y-4 text-sm text-wood-dark/80">
                <li>
                  <p className="font-semibold text-wood-dark">1894</p>
                  <p>{PARK.fundacao.fundador} constrói o moinho movido a água em São Roque.</p>
                </li>
                <li>
                  <p className="font-semibold text-wood-dark">1899</p>
                  <p>Emancipação de Antônio Prado, cinco anos após o moinho começar a funcionar.</p>
                </li>
                <li>
                  <p className="font-semibold text-wood-dark">Gerações seguintes</p>
                  <p>
                    O moinho passa a {PARK.fundacao.herdeiro}, filho do fundador, que mantém
                    viva a tradição por décadas.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-wood-dark">Hoje</p>
                  <p>
                    A quarta geração da família restaura e reabre o espaço ao público, preservando
                    a casa, o moinho e essa história.
                  </p>
                </li>
              </ul>
            </aside>
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl">
            <Image
              src="/images/vista-aerea.jpg"
              alt="Vista aérea do Moinho Ghinzelli: cascata, riacho, ponte e os espaços da propriedade em meio à natureza"
              width={1290}
              height={715}
              className="h-auto w-full object-cover"
            />
          </div>

          <blockquote className="mt-8 rounded-3xl bg-forest px-8 py-10 text-center text-cream sm:px-16">
            <p className="font-display text-2xl italic sm:text-3xl">
              “{PARK.fundacao.fraseDestaque}”
            </p>
            <p className="mt-4 text-sm uppercase tracking-wide text-cream/70">
              Família Ghinzelli
            </p>
          </blockquote>

          <div className="mt-12 text-center">
            <Link href="/ingressos" className="btn-primary">
              Quero conhecer de perto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
