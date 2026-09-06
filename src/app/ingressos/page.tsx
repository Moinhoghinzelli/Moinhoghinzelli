import type { Metadata } from "next";
import { PARK } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import ReservaForm from "@/components/ReservaForm";
import WhatsappButton from "@/components/WhatsappButton";

export const metadata: Metadata = {
  title: "Ingressos e reservas",
  description:
    "Confira os valores dos ingressos do Moinho Ghinzelli e reserve sua visita online.",
};

export default function IngressosPage() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeading
          eyebrow="Planeje sua visita"
          title="Ingressos e reservas"
          description="Reserve online e nossa equipe confirma sua visita pelo WhatsApp ou e-mail. Sem pagamento antecipado: o pagamento é feito no local."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <PrecoCard
            titulo={PARK.precos.parque.label}
            preco={PARK.precos.parque.valor}
            itens={[PARK.precos.parque.obs, ...PARK.precos.parque.inclui]}
          />
          <PrecoCard
            titulo={PARK.precos.guiada.label}
            preco={PARK.precos.guiada.valor}
            destaque
            itens={[PARK.precos.guiada.obs, PARK.precos.guiada.obsCrianca, PARK.precos.guiada.obsBebe]}
          />
        </div>

        <div className="mt-6 space-y-4 rounded-2xl border border-wood/10 bg-wheat-light/30 p-6 text-sm text-wood-dark/80">
          <p>
            <span className="font-semibold text-wood-dark">Horário: </span>
            {PARK.horarioResumo}. {PARK.horarioObs}
          </p>
          <p>
            <span className="font-semibold text-wood-dark">Fora do horário regular: </span>
            {PARK.reserva.foraDoHorario}
          </p>
          <p>
            <span className="font-semibold text-wood-dark">Mau tempo: </span>
            {PARK.climaObs}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-forest/20 bg-forest/5 p-6">
          <h3 className="text-base font-semibold text-forest-dark">Grupos, escolas e parcerias</h3>
          <p className="mt-2 text-sm leading-relaxed text-wood-dark/75">{PARK.reserva.grupos}</p>
          <div className="mt-4">
            <WhatsappButton
              texto="Consultar condições para grupos"
              mensagem="Olá! Gostaria de consultar condições especiais para grupo, escola ou parceria no Moinho Ghinzelli."
            />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-wood/10 bg-cream p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-semibold text-wood-dark">Reservar visita</h3>
            <p className="mt-2 text-sm text-wood-dark/70">
              Preencha os dados abaixo. Vagas limitadas nos dias de pico — reservar com
              antecedência garante seu horário.
            </p>
            <div className="mt-6">
              <ReservaForm />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-3xl bg-forest/10 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-forest-dark">Prefere combinar direto?</h3>
            <p className="text-sm text-wood-dark/75">
              Fale com a gente pelo WhatsApp para reservar grupos maiores, eventos ou tirar
              qualquer dúvida antes da visita.
            </p>
            <WhatsappButton
              texto={`Chamar no WhatsApp: ${PARK.whatsappDisplay}`}
              mensagem="Olá! Gostaria de reservar uma visita ao Moinho Ghinzelli."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PrecoCard({
  titulo,
  preco,
  itens,
  destaque = false,
}: {
  titulo: string;
  preco: string;
  itens: string[];
  destaque?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-7 ${
        destaque ? "border-wood bg-wood text-cream" : "border-wood/15 bg-cream"
      }`}
    >
      <p className={`text-sm font-semibold uppercase tracking-wide ${destaque ? "text-wheat-light" : "text-forest"}`}>
        {titulo}
      </p>
      <p className={`mt-2 text-4xl font-semibold font-display ${destaque ? "text-cream" : "text-wood-dark"}`}>
        {preco}
      </p>
      <ul className={`mt-4 space-y-1.5 text-sm ${destaque ? "text-cream/85" : "text-wood-dark/70"}`}>
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
