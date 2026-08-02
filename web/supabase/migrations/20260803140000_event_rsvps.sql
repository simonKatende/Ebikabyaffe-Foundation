-- Real RSVP/updates-signup tracking, replacing the toast-only "RSVP
-- recorded!" / "You're signed up!" stand-ins on the home dashboard (the
-- Parliament land-law meeting CTA and the Empango updates CTA) — both are
-- structurally the same thing (a member consenting to be notified about a
-- specific event), so one shared table covers both rather than two
-- near-duplicate ones. Events themselves aren't database rows — they're
-- still hardcoded content in the React components — event_key is just a
-- stable slug identifying which one.

create table if not exists event_rsvps (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  event_key text not null,
  -- Snapshot of the email at RSVP time, not a live join to profiles.email —
  -- this is literally the address the member is consenting to be contacted
  -- at for this specific event, and shouldn't silently change if they later
  -- edit their profile email.
  email text,
  created_at timestamptz not null default now(),
  unique (profile_id, event_key)
);

alter table event_rsvps enable row level security;

create policy "event_rsvps_select_own"
  on event_rsvps for select
  using (profile_id = auth.uid());

create policy "event_rsvps_insert_own"
  on event_rsvps for insert
  with check (profile_id = auth.uid());

-- The Foundation admin can see who's RSVP'd/signed up across all events —
-- no panel UI for this yet, but the data is queryable (Supabase dashboard
-- or a future admin view) without needing a schema change later.
create policy "event_rsvps_select_by_admin"
  on event_rsvps for select
  using (is_panel_admin());
