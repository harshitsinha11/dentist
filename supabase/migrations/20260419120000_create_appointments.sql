-- Run in Supabase SQL Editor or via `supabase db push` if you use the CLI.
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text not null,
  message text,
  created_at timestamptz not null default now()
);

comment on table public.appointments is 'Booking requests from the public website form.';

alter table public.appointments enable row level security;

drop policy if exists "appointments_insert_anon" on public.appointments;

-- Allow inserts from the browser using the anon API key (tighten this if you add a server route).
create policy "appointments_insert_anon"
  on public.appointments
  for insert
  to anon
  with check (true);

grant insert on table public.appointments to anon;
