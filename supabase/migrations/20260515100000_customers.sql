-- Guest-first customers (purchases are NOT tied to auth.users)
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  has_account boolean not null default false,
  purchase_status text
);

create index if not exists customers_email_idx on public.customers (email);
create index if not exists customers_auth_user_id_idx on public.customers (auth_user_id);
create index if not exists customers_stripe_customer_id_idx
  on public.customers (stripe_customer_id);

alter table public.customers enable row level security;

-- Linked accounts can read their own customer row only
create policy "customers_select_linked"
  on public.customers
  for select
  to authenticated
  using (auth_user_id = auth.uid());

-- Inserts/updates use service role (checkout API, webhooks, account linking)
