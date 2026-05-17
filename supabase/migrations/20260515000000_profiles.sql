-- Profiles table (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  stripe_customer_id text unique,
  subscription_status text
);

create index if not exists profiles_stripe_customer_id_idx
  on public.profiles (stripe_customer_id);

alter table public.profiles enable row level security;

-- Users can read their own profile only
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Inserts/updates for stripe fields happen via service role (webhook, API).
-- Profile row on signup is created by trigger below.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
