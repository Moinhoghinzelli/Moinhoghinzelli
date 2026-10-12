"use client";

// Abertura do site (uma vez por sessão): a logo aparece e dois painéis,
// laranja e azul, varrem a tela antes de revelar a página. Pode ser pulada
// com um clique. Quem prefere menos movimento nunca vê essa abertura.

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Abertura() {
  const raizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = raizRef.current;
    if (!el || html.dataset.intro !== "1") return;

    let encerrada = false;
    function encerrar() {
      if (encerrada) return;
      encerrada = true;
      html.removeAttribute("data-intro");
      try {
        sessionStorage.setItem("moinho-intro", "1");
      } catch {}
      window.dispatchEvent(new Event("moinho-hero"));
    }

    const q = (s: string) => el.querySelector(s);
    const laranja = q(".intro__panel--laranja");
    const azul = q(".intro__panel--azul");
    gsap.set([laranja, azul], { y: 0, yPercent: 100 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: encerrar });
    tl.from(q(".intro__icone"), { y: 40, opacity: 0, scale: 0.9, duration: 0.9 }, 0.15)
      .from(q(".intro__nome"), { y: 30, opacity: 0, duration: 0.8 }, 0.5)
      .from(q(".intro__tag"), { y: 14, opacity: 0, letterSpacing: "0.6em", duration: 0.7 }, 0.9)
      .addLabel("saida", 2.1)
      .to(q(".intro__stage"), { scale: 0.92, opacity: 0, duration: 0.45, ease: "power2.in" }, "saida")
      .to(laranja, { yPercent: 0, duration: 0.6, ease: "power4.inOut" }, "saida+=.1")
      .to(azul, { yPercent: 0, duration: 0.6, ease: "power4.inOut" }, "saida+=.22")
      .set(el, { backgroundColor: "transparent" })
      .add(() => {
        // painéis cobrem a tela: começa a entrada do topo da página por baixo
        window.dispatchEvent(new Event("moinho-hero"));
      })
      .to(azul, { yPercent: -100, duration: 0.75, ease: "power4.inOut" })
      .to(laranja, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "<.12");

    function pular() {
      if (tl.time() < (tl.labels.saida ?? 0)) tl.seek("saida");
    }
    el.addEventListener("click", pular);
    // nunca prender o visitante na abertura
    const seguranca = window.setTimeout(() => {
      tl.progress(1);
      encerrar();
    }, 8000);

    return () => {
      window.clearTimeout(seguranca);
      el.removeEventListener("click", pular);
      tl.kill();
    };
  }, []);

  return (
    <div ref={raizRef} className="intro" aria-hidden="true">
      <div className="intro__panel intro__panel--laranja" />
      <div className="intro__panel intro__panel--azul" />
      <div className="intro__stage">
        <Image
          className="intro__icone h-auto w-40 sm:w-52"
          src="/images/logo-icon.png"
          alt=""
          width={662}
          height={411}
          priority
        />
        <Image
          className="intro__nome h-auto w-56 sm:w-72"
          src="/images/logo-wordmark.png"
          alt=""
          width={956}
          height={236}
          priority
        />
        <span className="intro__tag text-sm font-semibold uppercase tracking-[0.35em] text-wheat-dark">
          Desde 1894
        </span>
      </div>
      <span className="intro__skip">Pular</span>
    </div>
  );
}
