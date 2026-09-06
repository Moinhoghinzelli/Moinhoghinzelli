import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { ReservaInput } from "@/types/reserva";

function isValidDateString(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function asNonNegativeInt(value: unknown, fallback = 0): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.floor(n);
}

export async function POST(request: Request) {
  let body: Partial<ReservaInput>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  // Honeypot: bots costumam preencher todos os campos, inclusive os escondidos.
  if (body.empresa) {
    return NextResponse.json({ ok: true });
  }

  const nome = (body.nome ?? "").toString().trim();
  const telefone = (body.telefone ?? "").toString().trim();
  const email = body.email ? body.email.toString().trim() : undefined;
  const dataVisita = body.dataVisita;
  const tipoVisita = body.tipoVisita;
  const observacoes = body.observacoes ? body.observacoes.toString().trim() : undefined;

  if (!nome || nome.length < 2) {
    return NextResponse.json({ error: "Informe seu nome completo." }, { status: 400 });
  }
  if (!telefone || telefone.length < 8) {
    return NextResponse.json({ error: "Informe um telefone/WhatsApp válido." }, { status: 400 });
  }
  if (!isValidDateString(dataVisita)) {
    return NextResponse.json({ error: "Informe uma data de visita válida." }, { status: 400 });
  }
  if (tipoVisita !== "parque" && tipoVisita !== "guiada") {
    return NextResponse.json({ error: "Tipo de visita inválido." }, { status: 400 });
  }

  const adultos = asNonNegativeInt(body.adultos, 1);
  const criancas5a12 = asNonNegativeInt(body.criancas5a12);
  const criancasAte4 = asNonNegativeInt(body.criancasAte4);

  if (adultos + criancas5a12 + criancasAte4 <= 0) {
    return NextResponse.json(
      { error: "Informe ao menos 1 visitante." },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from("reservas").insert({
      nome,
      telefone,
      email: email || null,
      data_visita: dataVisita,
      tipo_visita: tipoVisita,
      adultos,
      criancas_5_12: criancas5a12,
      criancas_ate_4: criancasAte4,
      observacoes: observacoes || null,
    });

    if (error) {
      console.error("Erro ao gravar reserva no Supabase:", error);
      return NextResponse.json(
        { error: "Não foi possível registrar sua reserva agora. Tente novamente em instantes." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro inesperado ao processar reserva:", err);
    return NextResponse.json(
      {
        error:
          "O sistema de reservas ainda não está configurado. Fale com a gente pelo WhatsApp para reservar.",
      },
      { status: 503 }
    );
  }
}
