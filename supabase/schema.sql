-- Schema para o Moinho Colonial Ghinzelli
-- Como rodar: Supabase Dashboard -> SQL Editor -> cole este arquivo -> Run.

create extension if not exists pgcrypto;

create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  nome text not null,
  telefone text not null,
  email text,

  data_visita date not null,
  tipo_visita text not null check (tipo_visita in ('parque', 'guiada')),

  adultos integer not null default 1 check (adultos >= 0),
  criancas_5_12 integer not null default 0 check (criancas_5_12 >= 0),
  criancas_ate_4 integer not null default 0 check (criancas_ate_4 >= 0),

  observacoes text,

  -- pendente: aguardando confirmação do parque | confirmada | cancelada
  status text not null default 'pendente' check (status in ('pendente', 'confirmada', 'cancelada'))
);

comment on table public.reservas is 'Pedidos de reserva de visita feitos pelo site institucional. Sem pagamento online: a confirmação é feita manualmente (WhatsApp/e-mail) pela equipe do parque.';

-- Segurança: habilita Row Level Security e NÃO cria nenhuma policy pública.
-- A rota /api/reservas do site usa a "service role key" (chave secreta, só no servidor),
-- que sempre ignora RLS — por isso o site consegue gravar reservas mesmo sem policies.
-- Isso impede que qualquer pessoa leia ou grave direto no banco usando a chave pública (anon).
alter table public.reservas enable row level security;

-- Índice para consultar rapidamente as reservas de uma data específica
create index if not exists reservas_data_visita_idx on public.reservas (data_visita);
