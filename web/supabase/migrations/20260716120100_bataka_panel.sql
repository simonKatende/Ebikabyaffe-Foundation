-- Bataka Panel: real invitation-based officers, audit log, announcements.
--
-- Mirrors web/lib/batakaPanel/types.ts 1:1 (PanelMember → profiles+lineages
-- from the previous migration; AuditEntry → verification_audit;
-- Announcement → announcements; PanelSession → panel_officers). Per that
-- file's own doc comment, lib/batakaPanel/store.ts is the only file that
-- should need reimplementing against these tables — panel UI components
-- should not need to change.
--
-- panel_officers replaces the current mock's "sign in as any clan's
-- officer" demo picker (web/components/batakaPanel/PanelSignIn.tsx) with
-- real invitation-only access, matching that screen's own copy.

create table if not exists panel_officers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- null when is_admin is true (Foundation admin sees every clan).
  clan_slug text,
  is_admin boolean not null default false,
  invited_at timestamptz not null default now(),
  unique (user_id),
  constraint panel_officers_role_shape check (
    (is_admin and clan_slug is null) or
    (not is_admin and clan_slug is not null)
  )
);

alter table panel_officers enable row level security;

create policy "panel_officers_select_own"
  on panel_officers for select
  using (user_id = auth.uid());

-- Shared helper so "is this user an officer/admin for clan X" doesn't need
-- to be re-derived in every policy below. security definer + stable so it
-- can safely read panel_officers regardless of the calling row's own RLS.
-- search_path is pinned — a security definer function without it is open to
-- search-path hijacking (also flagged by Supabase's own database linter).
create or replace function is_clan_officer(target_clan_slug text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from panel_officers po
    where po.user_id = auth.uid()
      and (po.is_admin or po.clan_slug = target_clan_slug)
  );
$$;

-- Clan officers/admin can read (never write) member profiles and lineage
-- declarations in their own clan — the review-queue view.
create policy "profiles_select_by_clan_officer"
  on profiles for select
  using (is_clan_officer(clan_slug));

create policy "lineages_select_by_clan_officer"
  on lineages for select
  using (is_clan_officer(father_clan_slug));

-- Mirrors AuditEntry — append-only (no update/delete policy, so those stay
-- default-denied). actor_id is `on delete set null` so the audit trail
-- survives an officer's account deletion (a plain FK would block the delete).
create table if not exists verification_audit (
  id uuid primary key default gen_random_uuid(),
  clan_slug text not null,
  actor_id uuid references auth.users (id) on delete set null,
  actor_label text not null,
  action text not null,
  created_at timestamptz not null default now()
);

alter table verification_audit enable row level security;

create policy "verification_audit_select_by_clan_officer"
  on verification_audit for select
  using (is_clan_officer(clan_slug));

create policy "verification_audit_insert_by_clan_officer"
  on verification_audit for insert
  with check (is_clan_officer(clan_slug) and actor_id = auth.uid());

-- Mirrors Announcement — readable by that clan's members, writable only by
-- that clan's officers/admin.
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  clan_slug text not null,
  author_id uuid references auth.users (id) on delete set null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table announcements enable row level security;

create policy "announcements_select_by_clan_member"
  on announcements for select
  using (
    is_clan_officer(clan_slug)
    or exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.clan_slug = announcements.clan_slug
    )
  );

create policy "announcements_write_by_clan_officer"
  on announcements for insert
  with check (is_clan_officer(clan_slug) and author_id = auth.uid());

create policy "announcements_update_by_clan_officer"
  on announcements for update
  using (is_clan_officer(clan_slug))
  with check (is_clan_officer(clan_slug));
