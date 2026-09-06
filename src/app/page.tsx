import Link from "next/link";
import Image from "next/image";
import { ATRACOES, PARK } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import WhatsappButton from "@/components/WhatsappButton";
import MapEmbed from "@/components/MapEmbed";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Antônio Prado · RS</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-wood-dark sm:text-5xl">
              {PARK.nome}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-wood-dark/80">
              Um moinho de {PARK.fundacao.ano} que ainda funciona, uma casa cheia de memórias
              e trilhas até a cascata em meio ao verde. {PARK.tagline}.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/ingressos" className="btn-primary">
                Reservar visita
              </Link>
              <Link href="/sobre" className="btn-secondary">
                Conhecer a história
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/moinho-exterior.jpg"
              alt="Moinho Ghinzelli visto de fora, com a cascata ao fundo"
              width={1280}
              height={960}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* INFO RÁPIDA */}
      <section className="border-y border-wood/10 bg-wheat-light/40">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-3">
          <InfoItem label="Horário" value={PARK.horarioResumo} />
          <InfoItem label="Localização" value={PARK.endereco} />
          <InfoItem label="Contato" value={`WhatsApp ${PARK.whatsappDisplay}`} />
        </div>
      </section>

      {/* SOBRE (TEASER) */}
      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Nossa história"
            title={`Desde ${PARK.fundacao.ano}, a força da água move a história da família Ghinzelli`}
            description={`Fundado por ${PARK.fundacao.fundador}, imigrante italiano, o moinho passou por gerações da família Ghinzelli e segue funcionando até hoje.`}
          />
          <div className="flex flex-col justify-between gap-6">
            <p className="text-base leading-relaxed text-wood-dark/75">
              Mais de 130 anos depois de erguido, o moinho segue moendo milho como antigamente.
              A visita guiada é uma oportunidade rara de caminhar por uma casa que preserva objetos
              originais e sentir, de perto, a história da imigração italiana na Serra Gaúcha.
            </p>
            <Link href="/sobre" className="text-sm font-semibold text-forest hover:text-forest-dark">
              Ler a história completa →
            </Link>
          </div>
        </div>
      </section>

      {/* ATRAÇÕES */}
      <section className="section-padding bg-forest/5">
        <div className="container-page">
          <SectionHeading
            eyebrow="O que você vai encontrar"
            title="Atrações do parque"
            description="Um passeio completo para todas as idades, em meio à natureza da colônia italiana."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ATRACOES.map((atracao) => (
              <div
                key={atracao.titulo}
                className="overflow-hidden rounded-2xl border border-wood/10 bg-cream shadow-sm transition hover:shadow-md"
              >
                {"imagem" in atracao && atracao.imagem && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={atracao.imagem}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-wood-dark">{atracao.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-wood-dark/70">
                    {atracao.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/atracoes" className="btn-secondary">
              Ver todas as atrações
            </Link>
          </div>
        </div>
      </section>

      {/* INGRESSOS TEASER */}
      <section className="section-padding">
        <div className="container-page grid items-center gap-10 rounded-3xl bg-wood px-8 py-12 text-cream sm:px-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-wheat-light">Planeje sua visita</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Ingressos e reservas</h2>
            <p className="mt-4 max-w-md text-cream/80">
              Entrada no parque por {PARK.precos.parque.valor} ou experiência completa com
              visita guiada à casa e ao moinho por mais {PARK.precos.guiada.valor}. Reserve
              online e confirmamos com você por WhatsApp.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link href="/ingressos" className="btn-primary bg-wheat text-wood-dark hover:bg-wheat-dark">
              Fazer reserva
            </Link>
            <WhatsappButton className="btn-secondary border-cream text-cream hover:bg-cream hover:text-wood-dark" />
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="section-padding pt-0">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Como chegar"
              title="Zona rural de Antônio Prado"
              description={`${PARK.endereco}. ${PARK.enderecoObs}`}
            />
            <a
              href={PARK.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-semibold text-forest hover:text-forest-dark"
            >
              Ver no Google Maps →
            </a>
          </div>
          <MapEmbed className="h-72 w-full lg:h-80" />
        </div>
      </section>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-forest">{label}</p>
      <p className="mt-1 text-base font-medium text-wood-dark">{value}</p>
    </div>
  );
}
