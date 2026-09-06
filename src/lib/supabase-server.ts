import { createClient } from "@supabase/supabase-js";

// Cliente Supabase para uso exclusivo no servidor (API routes / route handlers).
// Usa a service role key, que tem permissão total e ignora RLS — por isso
// NUNCA deve ser importado em um componente client ("use client") nem
// exposto com o prefixo NEXT_PUBLIC_.
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local (veja .env.local.example)."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
