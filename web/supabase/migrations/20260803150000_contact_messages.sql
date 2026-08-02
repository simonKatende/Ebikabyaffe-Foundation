-- Real message-thread backing for "send this to the Foundation" (home
-- dashboard's ContactFoundationCard + profile's LineageArchiveCard), on top
-- of the existing email-only flow (app/api/contact/route.ts) — prompted by
-- the user asking whether a member could get notified in-app once the
-- Foundation replies to their email. An email reply lands in a personal
-- Gmail inbox (FOUNDATION_CONTACT_EMAIL) the app has no visibility into at
-- all, so this instead gives every submission a durable row the Foundation
-- admin can reply to FROM the Foundation Admin console, and the member
-- reads that reply as a real in-app notification. The email side is
-- unchanged — this supplements it, it doesn't replace it.
--
-- Foundation-wide inbox, admin-only (no clan concept here, unlike member
-- verification/business listings) — a clan officer has no legitimate need
-- to read another member's private question to the Foundation.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now(),
  reply_body text,
  reply_by_label text,
  replied_at timestamptz,
  -- Flips back to false whenever a NEW reply lands (see
  -- panel_reply_to_message below), so re-replying re-notifies the member;
  -- flips to true only via mark_reply_seen(), once the member has actually
  -- viewed the reply.
  reply_seen_by_member boolean not null default false,
  constraint contact_messages_reply_shape check (
    (reply_body is null) = (replied_at is null)
  )
);

alter table contact_messages enable row level security;

create policy "contact_messages_select_own"
  on contact_messages for select
  using (profile_id = auth.uid());

-- A raw insert can only ever create a fresh, unreplied message — the
-- reply_* columns are writable only through panel_reply_to_message() below,
-- never directly, so a member can't fake their own "Foundation reply" by
-- crafting an insert with those columns already populated.
create policy "contact_messages_insert_own"
  on contact_messages for insert
  with check (
    profile_id = auth.uid()
    and reply_body is null
    and replied_at is null
    and reply_seen_by_member = false
  );

-- is_panel_admin() already exists (20260802130000_panel_phase2.sql).
create policy "contact_messages_select_by_admin"
  on contact_messages for select
  using (is_panel_admin());

-- Member marks a reply as seen — the ONLY column a member can ever touch on
-- their own row. Deliberately a SECURITY DEFINER function rather than a
-- plain UPDATE policy, which would also let a member rewrite their own
-- subject/message after the fact or blank out reply_body.
create or replace function mark_reply_seen(target_message_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update contact_messages
    set reply_seen_by_member = true
    where id = target_message_id and profile_id = auth.uid();
end;
$$;

-- Admin's reply — the only write path for reply_body/reply_by_label/
-- replied_at, mirroring panel_verify_member's column-restricted RPC pattern
-- (a plain UPDATE policy can't express "only these columns, and only for
-- the admin role").
create or replace function panel_reply_to_message(target_message_id uuid, reply text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_panel_admin() then
    raise exception 'not authorized';
  end if;

  update contact_messages
    set reply_body = reply,
        reply_by_label = 'Foundation admin',
        replied_at = now(),
        reply_seen_by_member = false
    where id = target_message_id;
end;
$$;
