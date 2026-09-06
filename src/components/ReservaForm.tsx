"use client";

import { useState, type FormEvent } from "react";
import type { ReservaInput, TipoVisita } from "@/types/reserva";

type Status = "idle" | "loading" | "success" | "error";

const initialState: ReservaInput = {
  nome: "",
  telefone: "",
  email: "",
  dataVisita: "",
  tipoVisita: "guiada",
  adultos: 2,
  criancas5a12: 0,
  criancasAte4: 0,
  observacoes: "",
  empresa: "",
};

export default function ReservaForm() {
  const [form, setForm] = useState<ReservaInput>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function update<K extends keyof ReservaInput>(key: K, value: ReservaInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Não foi possível enviar sua reserva. Tente novamente.");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
      setErrorMsg("Falha de conexão. Verifique sua internet e tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-forest/30 bg-forest/10 p-8 text-center">
        <h3 className="text-xl font-semibold text-forest-dark">Reserva enviada! 🌾</h3>
        <p className="mt-2 text-sm text-wood-dark/80">
          Recebemos seu pedido de reserva. Em breve entraremos em contato pelo WhatsApp ou
          e-mail informado para confirmar sua visita.
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

        <Field label="Data desejada" htmlFor="dataVisita">
          <input
            id="dataVisita"
            type="date"
            required
            value={form.dataVisita}
            onChange={(e) => update("dataVisita", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-wood-dark">Tipo de visita</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { value: "guiada", label: "Casa + moinho (visita guiada)" },
              { value: "parque", label: "Somente entrada no parque" },
            ] as { value: TipoVisita; label: string }[]
          ).map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                form.tipoVisita === opt.value
                  ? "border-wood bg-wheat-light/50"
                  : "border-wood/15 hover:border-wood/40"
              }`}
            >
              <input
                type="radio"
                name="tipoVisita"
                value={opt.value}
                checked={form.tipoVisita === opt.value}
                onChange={() => update("tipoVisita", opt.value)}
                className="h-4 w-4 accent-wood"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

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

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
        {status === "loading" ? "Enviando..." : "Enviar pedido de reserva"}
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
