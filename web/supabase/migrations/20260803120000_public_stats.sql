-- Real public member counters (site-wide + per-clan), replacing the
-- marketing-placeholder baselines lib/stats.ts previously hardcoded.
--
-- These are aggregate-only functions: no visitor (signed in or not) can
-- read another member's profiles row, and nothing here changes that — each
-- function returns only counts, never row data, so no RLS relaxation on
-- profiles itself is needed. Unlike is_clan_officer()/panel_verify_member()
-- etc. (only ever called internally by RLS or by an already-authenticated
-- client), these must be callable by a signed-out visitor too — Supabase
-- doesn't grant EXECUTE on new functions to `anon` by default, so that's
-- explicit below.

create or replace function public_site_stats()
returns table (registered bigint, verified bigint)
language sql
security definer
set search_path = public
stable
as $$
  select
    (select count(*) from profiles) as registered,
    (select count(*) from profiles where verification_status = 'verified') as verified;
$$;

grant execute on function public_site_stats() to anon, authenticated;

-- One row per clan that has at least one member, fetched in a single round
-- trip — ClanGrid.tsx renders all 56 clans at once, so this beats 56
-- individual per-clan calls. A clan with zero members simply has no row;
-- the client-side default is 0.
create or replace function public_clan_member_counts()
returns table (clan_slug text, member_count bigint)
language sql
security definer
set search_path = public
stable
as $$
  select profiles.clan_slug, count(*) as member_count
  from profiles
  where profiles.clan_slug is not null
  group by profiles.clan_slug;
$$;

grant execute on function public_clan_member_counts() to anon, authenticated;
