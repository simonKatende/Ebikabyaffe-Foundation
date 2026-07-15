-- Profiles + Omutaka-verification lineage declarations.
--
-- Mirrors web/context/AuthContext.tsx's AppUser/Lineage types 1:1 so that
-- swapping the mock AuthContext state for real Supabase reads/writes is a
-- like-for-like replacement, not a redesign. Payment/contribution fields are
-- deliberately NOT included here — no gateway is wired up yet (see the
-- session handoff for why); sacco_member is kept because it's a fee-paid
-- flag the app already tracks today, not a ledger.

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  phone text not null unique,
  email text,
  -- References web/lib/clans.ts's clan slugs by convention, not a foreign
  -- key — clan reference data intentionally stays static TS, not a DB table.
  clan_slug text,
  -- SELF-DECLARED vs Kingdom-verified badge shown on /profile.
  clan_verified boolean not null default false,
  -- Mirrors VerificationStatus in AuthContext.tsx.
  verification_status text not null default 'none'
    check (verification_status in ('none', 'pending', 'verified')),
  sacco_member boolean not null default false,
  member_since timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Keep updated_at honest — without this trigger the column would freeze at
-- its insert-time default forever.
create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

create policy "profiles_select_own"
  on profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Sensitive third-party genealogical data submitted with "Get verified by
-- Omutaka" (web/components/profile/VerificationCard.tsx). The app's existing
-- privacy copy promises this is only ever visible to the member and their
-- own clan's Omutaka — one row per member (unique profile_id), matching
-- AppUser.lineage being a single object, not a list.
create table if not exists lineages (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles (id) on delete cascade,
  father_name text not null,
  father_clan_slug text not null,
  mother_name text not null,
  mother_clan_slug text not null,
  grandfather_name text,
  grandmother_name text,
  ssiga text,
  village text,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  -- Exogamy rule (mirrors the frontend validation in VerificationCard.tsx):
  -- mother's clan must differ from father's.
  constraint lineages_exogamy check (mother_clan_slug <> father_clan_slug)
);

alter table lineages enable row level security;

create policy "lineages_select_own"
  on lineages for select
  using (profile_id = auth.uid());

create policy "lineages_insert_own"
  on lineages for insert
  with check (profile_id = auth.uid());

create policy "lineages_update_own"
  on lineages for update
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

-- Clan-officer read access to profiles/lineages is added in the next
-- migration, once panel_officers exists to check against.
