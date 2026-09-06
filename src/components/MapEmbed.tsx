import { PARK } from "@/lib/constants";

export default function MapEmbed({ className = "" }: { className?: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    PARK.mapsEmbedQuery
  )}&output=embed`;

  return (
    <div className={`overflow-hidden rounded-3xl border border-wood/10 shadow-sm ${className}`}>
      <iframe
        title={`Mapa - ${PARK.nome}`}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 320 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
