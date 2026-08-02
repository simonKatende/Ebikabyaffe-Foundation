-- Backend phase 2: wires the Bataka Panel, business-listing review, and
-- announcements to real data. Closes three gaps found while doing that:

-- 1. `Announcement.postedByAdmin` (added s26, after this table already
--    existed) has nowhere to live yet.
alter table announcements
  add column if not exists posted_by_admin boolean not null default false;

-- 2. Real pre-existing RLS bug: this policy scoped a lineage's visibility by
--    its own DECLARED father_clan_slug, not the member's actual joined clan
--    (profiles.clan_slug). Those normally match, but the one case where they
--    legitimately differ — a member who joined clan A but declared a father
--    from clan B — is exactly the fraud/error case the panel's own
--    "automatic checks" section exists to catch. Under the old policy, clan
--    A's officer (who should review it) couldn't see it, while clan B's
--    officer (uninvolved) could.
drop policy if exists "lineages_select_by_clan_officer" on lineages;

create policy "lineages_select_by_clan_officer"
  on lineages for select
  using (
    is_clan_officer((select p.clan_slug from profiles p where p.id = lineages.profile_id))
  );

-- 3. Business Owners directory has no table yet (built as a frontend mock in
--    s24, after the s19 backend scaffold). Mirrors lib/businesses/types.ts's
--    BusinessListing 1:1. Keyed by owner_id (the real account id) instead of
--    the mock's phone string — lib/businesses/store.ts's own comment already
--    anticipated this exact change.
--
-- Business-listing DECISIONS (verify/decline/request-info) are Foundation-
-- admin-only (2026-08, s26) — clan officers keep full view access but no
-- decision controls, the opposite scoping from member lineage verification
-- (where the clan officer IS the decider). is_clan_officer() alone can't
-- express "view yes, decide no", so a separate admin-only helper is needed.
create or replace function is_panel_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from panel_officers po
    where po.user_id = auth.uid() and po.is_admin
  );
$$;

create table if not exists business_listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references profiles (id) on delete cascade,
  -- Denormalized (not joined at read time) because the public directory and
  -- the review queue both need to display it, and neither an anonymous
  -- visitor nor another clan's officer has RLS access to read an arbitrary
  -- profiles row — matches how the mock already stored ownerName directly.
  owner_name text not null,
  clan_slug text not null,
  business_name text not null,
  category text not null,
  description text not null,
  contact_phone text not null,
  contact_email text,
  location text,
  photo_data_url text,
  status text not null default 'pending'
    check (status in ('pending', 'info_requested', 'verified', 'declined')),
  submitted_at timestamptz not null default now(),
  decided_at timestamptz,
  decision_note text
);

alter table business_listings enable row level security;

-- Public directory read: anyone can see VERIFIED listings (no login needed
-- to browse /businesses) — matches lib/businesses/store.ts's fetchVisibleListings().
create policy "business_listings_select_public_verified"
  on business_listings for select
  using (status = 'verified');

-- Owner can always see/edit their own listing regardless of status (so they
-- can check a pending/declined submission, or resubmit after a decline).
create policy "business_listings_select_own"
  on business_listings for select
  using (owner_id = auth.uid());

create policy "business_listings_upsert_own_insert"
  on business_listings for insert
  with check (owner_id = auth.uid());

create policy "business_listings_upsert_own_update"
  on business_listings for update
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "business_listings_delete_own"
  on business_listings for delete
  using (owner_id = auth.uid());

-- Clan officers: view-only, scoped to their own clan.
create policy "business_listings_select_by_clan_officer"
  on business_listings for select
  using (is_clan_officer(clan_slug));

-- Only the Foundation admin can change a listing's review status.
create policy "business_listings_update_by_admin"
  on business_listings for update
  using (is_panel_admin())
  with check (is_panel_admin());

-- 4. Clan officers had SELECT-only RLS on profiles/lineages (migration 2) —
--    correct for reading the review queue, but there was no way for them to
--    actually record a decision. Rather than a broad column-unrestricted
--    UPDATE policy (which would let an officer edit a member's name/email/
--    clan, not just the review fields), these three SECURITY DEFINER
--    functions are the only write path: each checks is_clan_officer()
--    itself, touches only the review-relevant columns, and atomically logs
--    the audit entry in the same transaction (no separate client-side
--    audit insert that could race or get skipped).
--
-- Per the existing lineages.status comment (migration 3): profiles.
-- verification_status keeps its 3-value contract (none/pending/verified),
-- so only VERIFY mirrors into it (+ clan_verified); decline/request-info
-- change lineages.status only — the member's own profile still reads
-- "pending" for those two, a deliberate simplification already documented.
create or replace function panel_verify_member(target_profile_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_clan text;
begin
  select clan_slug into target_clan from profiles where id = target_profile_id;
  if target_clan is null or not is_clan_officer(target_clan) then
    raise exception 'not authorized';
  end if;

  update lineages
    set status = 'verified', decided_at = now(), decision_note = null
    where profile_id = target_profile_id;

  update profiles
    set verification_status = 'verified', clan_verified = true
    where id = target_profile_id;

  insert into verification_audit (clan_slug, actor_id, actor_label, action)
  values (
    target_clan,
    auth.uid(),
    case when is_panel_admin() then 'Foundation admin' else 'Omutaka' end,
    'Verified "' || coalesce((select name from profiles where id = target_profile_id), '') || '"'
  );
end;
$$;

create or replace function panel_decline_member(target_profile_id uuid, reason text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_clan text;
begin
  select clan_slug into target_clan from profiles where id = target_profile_id;
  if target_clan is null or not is_clan_officer(target_clan) then
    raise exception 'not authorized';
  end if;

  update lineages
    set status = 'declined', decided_at = now(), decision_note = reason
    where profile_id = target_profile_id;

  insert into verification_audit (clan_slug, actor_id, actor_label, action)
  values (
    target_clan,
    auth.uid(),
    case when is_panel_admin() then 'Foundation admin' else 'Omutaka' end,
    'Declined "' || coalesce((select name from profiles where id = target_profile_id), '') || '"'
  );
end;
$$;

create or replace function panel_request_info(target_profile_id uuid, note text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_clan text;
begin
  select clan_slug into target_clan from profiles where id = target_profile_id;
  if target_clan is null or not is_clan_officer(target_clan) then
    raise exception 'not authorized';
  end if;

  update lineages
    set status = 'info_requested', decided_at = now(), decision_note = note
    where profile_id = target_profile_id;

  insert into verification_audit (clan_slug, actor_id, actor_label, action)
  values (
    target_clan,
    auth.uid(),
    case when is_panel_admin() then 'Foundation admin' else 'Omutaka' end,
    'Requested more information from "' || coalesce((select name from profiles where id = target_profile_id), '') || '"'
  );
end;
$$;

-- 5. Realtime — lib/batakaPanel/store.ts subscribes to these so an officer's
--    review queue updates live (same-tab AND across devices/other officers),
--    replacing what lib/crossTabSync.ts's localStorage broadcast only ever
--    achieved within one browser.
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table lineages;
alter publication supabase_realtime add table verification_audit;
alter publication supabase_realtime add table announcements;
alter publication supabase_realtime add table business_listings;
