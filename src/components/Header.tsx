"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PARK } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "História" },
  { href: "/atracoes", label: "Atrações" },
  { href: "/ingressos", label: "Ingressos" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wood/10 bg-cream/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
            <Image
              src="/images/logo-icon.png"
              alt=""
              fill
              className="object-contain"
              sizes="48px"
              priority
            />
          </span>
          <Image
            src="/images/logo-wordmark.png"
            alt={PARK.nome}
            width={822}
            height={200}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-wood-dark/80 transition hover:text-wood"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsappHeaderCta />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-wood/20 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-wood/10 bg-cream md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-wood-dark hover:bg-wood/5"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${PARK.whatsappNumero}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2"
            >
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function WhatsappHeaderCta() {
  return (
    <Link href="/ingressos" className="btn-primary">
      Reservar visita
    </Link>
  );
}
