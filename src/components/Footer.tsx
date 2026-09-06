import Link from "next/link";
import Image from "next/image";
import { PARK } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-wood/10 bg-wood-dark text-cream">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo-wordmark-light.png"
            alt={PARK.nome}
            width={822}
            height={200}
            className="h-9 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            {PARK.tagline}.
          </p>
        </div>

        <div>
          <p className="eyebrow text-wheat">Navegação</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li><Link href="/sobre" className="hover:text-cream">Nossa história</Link></li>
            <li><Link href="/atracoes" className="hover:text-cream">Atrações</Link></li>
            <li><Link href="/ingressos" className="hover:text-cream">Ingressos e reservas</Link></li>
            <li><Link href="/contato" className="hover:text-cream">Contato</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-wheat">Visite-nos</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>{PARK.horarioResumo}</li>
            <li>{PARK.endereco}</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-wheat">Fale conosco</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <a
                href={`https://wa.me/${PARK.whatsappNumero}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream"
              >
                WhatsApp: {PARK.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={PARK.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                Instagram {PARK.instagramHandle}
              </a>
            </li>
            <li>
              <a href={PARK.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <p className="container-page text-xs text-cream/60">
          © {new Date().getFullYear()} {PARK.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
