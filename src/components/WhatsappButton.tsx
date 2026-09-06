import { PARK } from "@/lib/constants";

type Props = {
  texto?: string;
  className?: string;
  mensagem?: string;
};

export default function WhatsappButton({
  texto = "Falar no WhatsApp",
  className = "btn-primary",
  mensagem = `Olá! Gostaria de saber mais sobre o ${PARK.nome}.`,
}: Props) {
  const href = `https://wa.me/${PARK.whatsappNumero}?text=${encodeURIComponent(
    mensagem
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {texto}
    </a>
  );
}
