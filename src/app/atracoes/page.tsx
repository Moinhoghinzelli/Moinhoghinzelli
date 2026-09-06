import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ATRACOES, PARK, PRODUTOS_TEXTO } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Atrações",
  description:
    "Visita guiada ao moinho histórico, trilhas, cascata, passeio de carreto, Bodega do Moinho e galpão de eventos: conheça todas as atrações do Moinho Ghinzelli.",
};

export default function AtracoesPage() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeading
          eyebrow="Um dia no parque"
          title={`Atrações do ${PARK.nome}`}
          description="Cada canto do parque guarda uma parte da história da família Ghinzelli e da colônia italiana em Antônio Prado."
        />

        <div className="mt-12 space-y-6">
          {ATRACOES.map((atracao, i) => {
            const temImagem = "imagem" in atracao && !!atracao.imagem;
            return (
              <div
                key={atracao.titulo}
                className="overflow-hidden rounded-2xl border border-wood/10 bg-wheat-light/30 sm:grid sm:grid-cols-[auto_1fr] sm:items-stretch"
              >
                {temImagem ? (
                  <div className="relative h-48 w-full sm:h-full sm:w-56">
                    <Image
                      src={(atracao as { imagem: string }).imagem}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 224px, 100vw"
                    />
                  </div>
                ) : (
                  <span className="hidden font-display text-3xl text-wheat-dark sm:flex sm:w-20 sm:items-start sm:justify-center sm:pt-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <div className="p-7">
                  <span className="font-display text-2xl text-wheat-dark sm:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-wood-dark">{atracao.titulo}</h3>
                  <p className="mt-2 text-base leading-relaxed text-wood-dark/75">
                    {atracao.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl border border-wood/10 bg-wheat-light/30 p-8 sm:p-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div className="relative h-64 w-full overflow-hidden rounded-2xl lg:h-80">
            <Image
              src="/images/farinha-produto.jpg"
              alt="Farinha de milho do Moinho Ghinzelli, embalada para venda na Bodega"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 400px, 100vw"
            />
          </div>
          <div>
            <p className="eyebrow">Leve um pouco do Moinho para casa</p>
            <h3 className="mt-2 text-2xl font-semibold text-wood-dark">Bodega do Moinho</h3>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-wood-dark/80">
              {PRODUTOS_TEXTO.map((paragrafo, i) => (
                <p key={i}>{paragrafo}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-wood px-8 py-10 text-center text-cream sm:px-16">
          <h3 className="text-2xl font-semibold">Pronto para conhecer pessoalmente?</h3>
          <p className="mt-3 text-cream/80">
            {PARK.horarioResumo}. {PARK.horarioObs}
          </p>
          <div className="mt-6">
            <Link href="/ingressos" className="btn-primary bg-wheat text-wood-dark hover:bg-wheat-dark">
              Ver ingressos e reservar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
