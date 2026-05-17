create table if not exists public.onboarding (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid references public.customers (id) on delete set null,
  email         text not null,
  created_at    timestamptz not null default now(),
  completed_at  timestamptz,

  -- Personal
  name          text,
  age_range     text,  -- '18-24' | '25-34' | '35-44' | '45-54' | '55+'
  employment    text,  -- 'employed_full' | 'employed_part' | 'self_employed' | 'student' | 'not_working' | 'retired'

  -- Financial & availability
  capital_range text,  -- 'under_1k' | '1k_3k' | '3k_5k' | '5k_10k' | 'over_10k'
  weekly_hours  text,  -- '2_5' | '5_10' | '10_20' | '20_plus'
  experience    text,  -- 'none' | 'some' | 'experienced'

  -- Goals
  goal          text,  -- 'side_income' | 'replace_income' | 'grow_savings' | 'hobby'
  target_monthly text, -- '500_1k' | '1k_2k' | '2k_5k' | '5k_plus' | 'unsure'
  notes         text
);

create index if not exists onboarding_email_idx       on public.onboarding (email);
create index if not exists onboarding_customer_id_idx on public.onboarding (customer_id);

alter table public.onboarding enable row level security;

-- All reads/writes go through service role (server actions)
