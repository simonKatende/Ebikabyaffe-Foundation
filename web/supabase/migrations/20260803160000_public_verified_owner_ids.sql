-- Public-safe way to know which profile ids are Omutaka-verified, for the
-- new blue verified badge shown next to a member's name wherever it
-- appears — including the public Business Owners directory, which is
-- reachable by signed-out visitors. Mirrors public_site_stats()'s own rule
-- (20260803120000_public_stats.sql): returns only the ids the caller
-- already knows about (the listings it's already rendering) and echoes
-- back the verified subset — no name/phone/clan or any other profiles data
-- is ever exposed, and no RLS relaxation on profiles itself is needed.

create or replace function public_verified_owner_ids(target_ids uuid[])
returns table (id uuid)
language sql
security definer
set search_path = public
stable
as $$
  select p.id from profiles p
  where p.id = any(target_ids) and p.clan_verified = true;
$$;

grant execute on function public_verified_owner_ids(uuid[]) to anon, authenticated;
