create table if not exists public.contact_enquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_enquiries_email_idx      on public.contact_enquiries (email);
create index if not exists contact_enquiries_created_at_idx on public.contact_enquiries (created_at desc);

alter table public.contact_enquiries enable row level security;

-- All reads/writes go through service role (server actions)
