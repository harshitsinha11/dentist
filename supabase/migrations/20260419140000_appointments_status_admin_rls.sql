-- Workflow status on booking requests; authenticated admins can list and update.

alter table public.appointments
  add column if not exists status text not null default 'pending';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.appointments'::regclass
      and conname = 'appointments_status_check'
  ) then
    alter table public.appointments
      add constraint appointments_status_check
      check (status in ('pending', 'contacted', 'confirmed', 'cancelled'));
  end if;
end $$;

drop policy if exists "appointments_select_authenticated" on public.appointments;

create policy "appointments_select_authenticated"
  on public.appointments
  for select
  to authenticated
  using (true);

drop policy if exists "appointments_update_authenticated" on public.appointments;

create policy "appointments_update_authenticated"
  on public.appointments
  for update
  to authenticated
  using (true)
  with check (true);

grant select, update on table public.appointments to authenticated;
