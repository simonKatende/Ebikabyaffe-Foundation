-- Closes two schema gaps found while wiring the Bataka Panel + profile
-- clan-change flow to real data (see session handoff for context).

-- The panel's review lifecycle has 5 states (registered/pending/
-- info_requested/verified/declined) but profiles.verification_status only
-- has 3 (none/pending/verified) — the member-facing VerificationCard.tsx UI
-- isn't being redesigned this pass, so profiles.verification_status keeps
-- its existing 3-value contract. The extra panel states live here instead:
-- no lineages row -> panel shows "registered"; this status column drives
-- the rest. Verify flips both this column and profiles.verification_status
-- together; decline/request-info only change this column (the member still
-- sees "pending" on their own profile — a deliberate simplification).
alter table lineages
  add column status text not null default 'pending'
    check (status in ('pending', 'info_requested', 'verified', 'declined')),
  add column decided_at timestamptz,
  add column decision_note text;

-- Missing entirely until now. Needed so a member changing clans
-- (ProfileContent.tsx's updateUser({ clanSlug, lineage: null, ... })) can
-- actually delete their old lineage declaration — RLS default-denies
-- without an explicit delete policy.
create policy "lineages_delete_own"
  on lineages for delete
  using (profile_id = auth.uid());
