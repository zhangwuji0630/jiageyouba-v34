create table if not exists public.user_snapshots (
  user_id uuid primary key references auth.users (id) on delete cascade,
  snapshot jsonb not null default '{}'::jsonb,
  schema_version integer not null default 1,
  app_version text not null default '3.6.2',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_user_snapshots_updated_at on public.user_snapshots;

create trigger set_user_snapshots_updated_at
before update on public.user_snapshots
for each row
execute function public.set_updated_at();

alter table public.user_snapshots enable row level security;

drop policy if exists "user_snapshots_select_own" on public.user_snapshots;
create policy "user_snapshots_select_own"
on public.user_snapshots
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "user_snapshots_insert_own" on public.user_snapshots;
create policy "user_snapshots_insert_own"
on public.user_snapshots
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "user_snapshots_update_own" on public.user_snapshots;
create policy "user_snapshots_update_own"
on public.user_snapshots
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

grant select, insert, update on public.user_snapshots to authenticated;

