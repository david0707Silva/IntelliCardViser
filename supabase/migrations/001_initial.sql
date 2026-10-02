create extension if not exists "uuid-ossp";

create table cards (
  card_id uuid primary key default uuid_generate_v4(),
  bank text not null,
  name text not null,
  variant text not null check (variant in ('cashback', 'rewards', 'milestone', 'hybrid')),
  point_value numeric,
  annual_fee integer not null default 0,
  benefits jsonb not null default '{}',
  last_verified date not null default current_date
);

create table offers (
  offer_id uuid primary key default uuid_generate_v4(),
  card_id uuid not null references cards(card_id) on delete cascade,
  merchant text not null,
  discount numeric not null,
  cap integer,
  type text not null check (type in ('static', 'dynamic')),
  expiry date,
  source_url text
);

create table user_cards (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id uuid not null references cards(card_id) on delete cascade,
  added_at timestamptz not null default now(),
  unique(user_id, card_id)
);

create table categories (
  category_id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  merchants text[] not null default '{}'
);

alter table user_cards enable row level security;
alter table cards enable row level security;
alter table offers enable row level security;
alter table categories enable row level security;

create policy "Users see own cards" on user_cards for select using (auth.uid() = user_id);
create policy "Users add own cards" on user_cards for insert with check (auth.uid() = user_id);
create policy "Users delete own cards" on user_cards for delete using (auth.uid() = user_id);
create policy "Cards public read" on cards for select using (true);
create policy "Offers public read" on offers for select using (true);
create policy "Categories public read" on categories for select using (true);