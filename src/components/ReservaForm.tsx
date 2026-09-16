"use client";

import { useState, type FormEvent } from "react";
import type { ReservaInput } from "@/types/reserva";
import { PARK } from "@/lib/constants";

type Status = "idle" | "success" | "error";

const initialState: ReservaInput = {
  nome: "",
  telefone: "",
  email: "",
  dataVisita: "",
  horario: "",
  tipoVisita: "guiada",
  adultos: 2,
  criancas5a12: 0,
  criancasAte4: 0,
  observacoes: "",
  empresa: "",
};

// A reserva pelo site é só para visitas durante a semana — aos sábados e
// domingos o parque recebe visitantes sem reserva prévia.
function isFimDeSemana(dataISO: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataISO)) return false;
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  const diaDaSemana = new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay();
  return diaDaSemana === 0 || diaDaSemana === 6;
}

function formatDataBR(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Não há backend/banco de dados: a reserva é montada como mensagem e enviada
// direto pelo WhatsApp, que é como o Moinho de fato confirma as visitas.
function montarMensagemWhatsapp(form: ReservaInput): string {
  const linhas = [
    "Olá! Gostaria de reservar uma visita ao Moinho Ghinzelli durante a semana.",
    "",
    `Nome: ${form.nome}`,
    `Data desejada: ${formatDataBR(form.dataVisita)}`,
    `Horário desejado: ${form.horario}`,
    "Tipo de visita: Entrada + visitação guiada",
    `Adultos: ${form.adultos}`,
    `Crianças (4 a 8 anos): ${form.criancas5a12}`,
    `Crianças até 3 anos: ${form.criancasAte4}`,
    `Telefone: ${form.telefone}`,
  ];

  if (form.email) linhas.push(`E-mail: ${form.email}`);
  if (form.observacoes) linhas.push(`Observações: ${form.observacoes}`);

  return linhas.join("\n");
}

export default function ReservaForm() {
  const [form, setForm] = useState<ReservaInput>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function update<K extends keyof ReservaInput>(key: K, value: ReservaInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const dataEhFimDeSemana = isFimDeSemana(form.dataVisita);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    // honeypot - se um bot preencheu o campo escondido, finge que deu certo
    if (form.empresa) {
      setStatus("success");
      return;
    }

    if (!form.nome || form.nome.trim().length < 2) {
      setStatus("error");
      setErrorMsg("Informe seu nome completo.");
      return;
    }
    if (!form.telefone || form.telefone.trim().length < 8) {
      setStatus("error");
      setErrorMsg("Informe um telefone/WhatsApp válido.");
      return;
    }
    if (!form.dataVisita) {
      setStatus("error");
      setErrorMsg("Informe uma data de visita.");
      return;
    }
    if (!form.horario) {
      setStatus("error");
      setErrorMsg("Informe o horário desejado.");
      return;
    }
    if (isFimDeSemana(form.dataVisita)) {
      setStatus("error");
      setErrorMsg(
        "Aos sábados e domingos não é necessário reservar — é só chegar. Escolha um dia de semana para reservar."
      );
      return;
    }

    const mensagem = montarMensagemWhatsapp(form);
    window.open(
      `https://wa.me/${PARK.whatsappNumero}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setStatus("success");
    setForm(initialState);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-forest/30 bg-forest/10 p-8 text-center">
        <h3 className="text-xl font-semibold text-forest-dark">Quase lá! 🌾</h3>
        <p className="mt-2 text-sm text-wood-dark/80">
          Abrimos o WhatsApp numa nova aba com sua reserva já preenchida — é só conferir e
          enviar a mensagem para confirmar com a nossa equipe.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-6"
        >
          Fazer outra reserva
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* honeypot - invisível para pessoas, visível para bots */}
      <input
        type="text"
        name="empresa"
        value={form.empresa}
        onChange={(e) => update("empresa", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome completo" htmlFor="nome">
          <input
            id="nome"
            required
            minLength={2}
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
            className="input"
            placeholder="Seu nome"
          />
        </Field>

        <Field label="WhatsApp / telefone" htmlFor="telefone">
          <input
            id="telefone"
            required
            minLength={8}
            value={form.telefone}
            onChange={(e) => update("telefone", e.target.value)}
            className="input"
            placeholder="(54) 99999-9999"
          />
        </Field>

        <Field label="Data desejada (dia de semana)" htmlFor="dataVisita">
          <input
            id="dataVisita"
            type="date"
            required
            value={form.dataVisita}
            onChange={(e) => update("dataVisita", e.target.value)}
            className="input"
            aria-invalid={dataEhFimDeSemana}
          />
          {dataEhFimDeSemana && (
            <p className="mt-1.5 text-xs text-wood-dark/70">
              Aos sábados e domingos não é necessário reservar — é só chegar, das 13h30 às 18h30.
              Escolha um dia de semana para reservar.
            </p>
          )}
        </Field>

        <Field label="Horário desejado" htmlFor="horario">
          <input
            id="horario"
            type="time"
            required
            value={form.horario}
            onChange={(e) => update("horario", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="E-mail (opcional)" htmlFor="email">
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="input"
            placeholder="voce@email.com"
          />
        </Field>
      </div>

      <p className="text-sm text-wood-dark/70">
        A reserva é sempre entrada + visitação guiada à casa e ao moinho.
      </p>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Adultos" htmlFor="adultos">
          <input
            id="adultos"
            type="number"
            min={0}
            value={form.adultos}
            onChange={(e) => update("adultos", Number(e.target.value))}
            className="input"
          />
        </Field>
        <Field label="Crianças (4 a 8 anos)" htmlFor="criancas5a12">
          <input
            id="criancas5a12"
            type="number"
            min={0}
            value={form.criancas5a12}
            onChange={(e) => update("criancas5a12", Number(e.target.value))}
            className="input"
          />
        </Field>
        <Field label="Crianças até 3 anos" htmlFor="criancasAte4">
          <input
            id="criancasAte4"
            type="number"
            min={0}
            value={form.criancasAte4}
            onChange={(e) => update("criancasAte4", Number(e.target.value))}
            className="input"
          />
        </Field>
      </div>

      <Field label="Observações (opcional)" htmlFor="observacoes">
        <textarea
          id="observacoes"
          rows={3}
          value={form.observacoes}
          onChange={(e) => update("observacoes", e.target.value)}
          className="input resize-none"
          placeholder="Alguma necessidade especial, grupo grande, evento..."
        />
      </Field>

      {status === "error" && errorMsg && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={dataEhFimDeSemana}
        className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reservar pelo WhatsApp
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-wood-dark">
        {label}
      </label>
      {children}
    </div>
  );
}
