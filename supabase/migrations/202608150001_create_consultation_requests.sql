create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  contact text not null check (char_length(contact) between 5 and 180),
  intent text not null default 'Agendar una conversación',
  message text check (message is null or char_length(message) <= 3000),
  source text not null default 'timco-case-study',
  status text not null default 'new' check (
    status in ('new', 'contacted', 'evaluation', 'closed')
  ),
  ip_hash text,
  user_agent text check (user_agent is null or char_length(user_agent) <= 500)
);

comment on table public.consultation_requests is
  'Solicitudes enviadas desde los formularios públicos del portafolio.';

create index if not exists consultation_requests_created_at_idx
  on public.consultation_requests (created_at desc);

create index if not exists consultation_requests_status_idx
  on public.consultation_requests (status, created_at desc);

create index if not exists consultation_requests_ip_hash_idx
  on public.consultation_requests (ip_hash, created_at desc)
  where ip_hash is not null;

alter table public.consultation_requests enable row level security;

revoke all on table public.consultation_requests from anon, authenticated;
