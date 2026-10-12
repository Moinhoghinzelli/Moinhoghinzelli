"use client";

// Animações do site no padrão Kyvo (mesmo sistema do Serra Summit): GSAP +
// ScrollTrigger. Cada animação procura por "ganchos" no HTML:
//   [data-hero] / [data-hero-media] / [data-hero-texto]  entrada do topo da Home
//   h1, h2 dentro de <main>                              título palavra por palavra
//   [data-reveal] e [data-reveal="card"]                 revelação ao rolar
//   [data-parallax]                                      parallax em fotos
//   [data-tilt] e [data-magnetic]                        hover 3D / botões magnéticos
//   .band                                                faixas que aceleram com a rolagem
// Para quem prefere menos movimento, nada disso roda e o site aparece estático.

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useLayoutEffectSeguro = typeof window !== "undefined" ? useLayoutEffect : useEffect;

let cabecalhoJaEntrou = false;

function dividirPalavras(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textos: Text[] = [];
  while (walker.nextNode()) textos.push(walker.currentNode as Text);
  textos.forEach((node) => {
    const frag = document.createDocumentFragment();
    (node.textContent ?? "").split(/(\s+)/).forEach((parte) => {
      if (!parte) return;
      if (/^\s+$/.test(parte)) {
        frag.appendChild(document.createTextNode(parte));
        return;
      }
      const w = document.createElement("span");
      w.className = "w";
      const i = document.createElement("span");
      i.className = "w__i";
      i.textContent = parte;
      w.appendChild(i);
      frag.appendChild(w);
    });
    node.parentNode?.replaceChild(frag, node);
  });
}

export default function Animacoes() {
  const pathname = usePathname();
  const barraRef = useRef<HTMLSpanElement>(null);

  // barra de progresso de leitura + cabeçalho que ganha sombra ao rolar
  useEffect(() => {
    const cabecalho = document.querySelector("header");
    function aoRolar() {
      cabecalho?.classList.toggle("is-scrolled", window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barraRef.current) {
        barraRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    }
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener("scroll", aoRolar);
  }, [pathname]);

  useLayoutEffectSeguro(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir) return;

    gsap.registerPlugin(ScrollTrigger);
    const raiz = document.documentElement;
    const ponteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const limpezas: Array<() => void> = [];
    const titulos: Array<{ el: HTMLElement; html: string }> = [];
    raiz.classList.add("has-gsap");

    const ctx = gsap.context(() => {
      // ---------- Títulos: palavra por palavra ----------
      const palavrasDoHero: Element[] = [];
      document.querySelectorAll<HTMLElement>("main h1, main h2").forEach((el) => {
        if (el.dataset.dividido) return;
        titulos.push({ el, html: el.innerHTML });
        dividirPalavras(el);
        el.dataset.dividido = "1";
        const palavras = el.querySelectorAll(".w__i");
        if (el.hasAttribute("data-hero")) {
          palavrasDoHero.push(...Array.from(palavras));
          return;
        }
        gsap.from(palavras, {
          yPercent: 115,
          rotate: 4,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // ---------- Entrada do topo da Home ----------
      const heroTexto = gsap.utils.toArray<HTMLElement>("[data-hero]:not(h1)");
      const heroMidia = document.querySelector<HTMLElement>("[data-hero-media]");
      if (heroTexto.length || heroMidia || palavrasDoHero.length) {
        const entrada = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
        if (heroMidia) {
          entrada
            .from(heroMidia, { y: 70, opacity: 0, scale: 0.94, duration: 1.2, ease: "expo.out" }, 0)
            .from(
              heroMidia.querySelectorAll("img, video"),
              { scale: 1.2, duration: 2.2, ease: "power2.out" },
              0,
            );
        }
        if (heroTexto.length) entrada.from(heroTexto, { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.15);
        if (palavrasDoHero.length) {
          entrada.from(
            palavrasDoHero,
            { yPercent: 115, rotate: 4, duration: 0.9, ease: "power4.out", stagger: 0.045 },
            0.2,
          );
        }
        if (raiz.dataset.intro === "1") {
          window.addEventListener("moinho-hero", () => entrada.play(), { once: true });
          // segurança: nunca deixar o topo escondido
          window.setTimeout(() => entrada.play(), 9000);
        } else {
          entrada.play();
        }
      }

      if (!cabecalhoJaEntrou) {
        cabecalhoJaEntrou = true;
        const cabecalho = document.querySelector("header");
        if (cabecalho) {
          const mostrar = () => gsap.from(cabecalho, { y: -30, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" });
          if (raiz.dataset.intro === "1") window.addEventListener("moinho-hero", mostrar, { once: true });
          else mostrar();
        }
      }

      // parallax do topo: foto desce devagar e o texto sobe e esmaece
      const secaoHero = document.querySelector<HTMLElement>("[data-hero-secao]");
      if (secaoHero) {
        const scrub = { trigger: secaoHero, start: "top top", end: "bottom top", scrub: true };
        if (heroMidia) gsap.to(heroMidia, { yPercent: 8, ease: "none", scrollTrigger: scrub });
        const texto = document.querySelector("[data-hero-texto]");
        if (texto) gsap.to(texto, { y: -50, opacity: 0.25, ease: "none", scrollTrigger: scrub });
      }

      // ---------- Revelações em lote ----------
      function lote(seletor: string, vars: { y?: number; scale?: number; stagger?: number; duration?: number; ease?: string }) {
        const els = gsap.utils.toArray<HTMLElement>(seletor);
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: vars.y ?? 40, scale: vars.scale ?? 1 });
        ScrollTrigger.batch(els, {
          start: "top 90%",
          once: true,
          onEnter: (alvos) =>
            gsap.to(alvos, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: vars.duration ?? 0.9,
              ease: vars.ease ?? "power3.out",
              stagger: vars.stagger ?? 0.08,
              overwrite: true,
            }),
        });
      }
      lote("main [data-reveal]:not([data-reveal='card'])", { y: 36 });
      lote("main [data-reveal='card']", { y: 60, scale: 0.96, stagger: 0.09, duration: 1, ease: "expo.out" });

      // ---------- Parallax nas fotos ----------
      gsap.utils.toArray<HTMLElement>("main [data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.14 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement ?? img, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // ---------- Faixas que correm e aceleram com a rolagem ----------
      gsap.utils.toArray<HTMLElement>(".band").forEach((faixa, i) => {
        const trilho = faixa.querySelector(".band__track");
        if (!trilho) return;
        const dir = i % 2 ? 1 : -1;
        const volta = gsap.fromTo(
          trilho,
          { xPercent: dir < 0 ? 0 : -50 },
          { xPercent: dir < 0 ? -50 : 0, duration: 30, ease: "none", repeat: -1 },
        );
        ScrollTrigger.create({
          trigger: faixa,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 250, 6);
            const sentido = self.direction === 1 ? 1 : -1;
            gsap.to(volta, { timeScale: (1 + v) * sentido, duration: 0.2, overwrite: true });
            gsap.to(volta, { timeScale: sentido, duration: 1.2, delay: 0.25, ease: "power2.out" });
          },
        });
      });

      // ---------- Hover: cards inclinam e botões atraem o cursor ----------
      if (ponteiroFino) {
        gsap.utils.toArray<HTMLElement>("main [data-tilt]").forEach((card) => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
          gsap.set(card, { transformPerspective: 900 });
          const mover = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 7);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
          };
          const sair = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", mover);
          card.addEventListener("pointerleave", sair);
          limpezas.push(() => {
            card.removeEventListener("pointermove", mover);
            card.removeEventListener("pointerleave", sair);
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-magnetic], header .btn-primary").forEach((btn) => {
          const qx = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
          const qy = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
          const mover = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect();
            qx((e.clientX - r.left - r.width / 2) * 0.3);
            qy((e.clientY - r.top - r.height / 2) * 0.4);
          };
          const sair = () => {
            qx(0);
            qy(0);
          };
          btn.addEventListener("pointermove", mover);
          btn.addEventListener("pointerleave", sair);
          limpezas.push(() => {
            btn.removeEventListener("pointermove", mover);
            btn.removeEventListener("pointerleave", sair);
          });
        });
      }
    });

    // imagens e fontes mudam a altura da página: recalcula os gatilhos
    const recalcular = () => ScrollTrigger.refresh();
    window.addEventListener("load", recalcular);
    const t = window.setTimeout(recalcular, 1200);
    document.fonts?.ready.then(recalcular);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", recalcular);
      limpezas.forEach((l) => l());
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      titulos.forEach(({ el, html }) => {
        el.innerHTML = html;
        delete el.dataset.dividido;
      });
      raiz.classList.remove("has-gsap");
    };
  }, [pathname]);

  return (
    <div className="progress" aria-hidden="true">
      <span ref={barraRef} />
    </div>
  );
}
