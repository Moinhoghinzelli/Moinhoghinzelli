import type { Metadata } from "next";
import { PARK } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import WhatsappButton from "@/components/WhatsappButton";
import MapEmbed from "@/components/MapEmbed";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Moinho Ghinzelli pelo WhatsApp, Instagram ou Facebook, ou veja como chegar até Antônio Prado, RS.",
};

export default function ContatoPage() {
  return (
    <section className="section-padding">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Fale com a gente"
            title="Contato"
            description="Tire dúvidas, combine horários especiais ou peça informações sobre grupos e eventos."
          />

          <div className="mt-8 space-y-5">
            <ContactRow label="WhatsApp" value={PARK.whatsappDisplay} />
            <ContactRow label="Instagram" value={PARK.instagramHandle} href={PARK.instagramUrl} />
            <ContactRow label="Facebook" value="Moinho Ghinzelli" href={PARK.facebookUrl} />
            <ContactRow label="Endereço" value={PARK.endereco} href={PARK.mapsUrl} />
            <ContactRow label="Horário" value={`${PARK.horarioResumo}. ${PARK.horarioObs}`} />
          </div>

          <div className="mt-8">
            <WhatsappButton texto="Enviar mensagem no WhatsApp" />
          </div>
        </div>

        <MapEmbed className="h-80 w-full lg:h-full" />
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="border-b border-wood/10 pb-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-forest">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-base font-medium text-wood-dark hover:text-wood"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-base font-medium text-wood-dark">{value}</p>
      )}
    </div>
  );
}
