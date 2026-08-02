-- Real photo storage — replaces the base64 data: URLs stashed directly in
-- profiles.avatar_data_url / business_listings.photo_data_url (accepted
-- debt from phases 1-2) with actual Supabase Storage objects.
--
-- One shared public bucket for both avatar and business photos — both are
-- effectively public-facing images once set (avatar shows in Nav to any
-- visitor, business photos are in the public /businesses directory), so a
-- public bucket with owner-scoped write access is simpler than per-object
-- signed URLs. Path convention: "avatars/{userId}/photo" and
-- "businesses/{ownerId}/photo" — deliberately no file extension in the key
-- (contentType is set explicitly on upload instead), so a re-upload in a
-- different format always overwrites the SAME object via upsert rather than
-- leaving an orphaned file behind under a different extension.

insert into storage.buckets (id, name, public)
values ('member-media', 'member-media', true)
on conflict (id) do nothing;

-- Public bucket already serves objects via the public URL without going
-- through RLS, but this covers the storage API's other read paths
-- (list/download) too, for anyone who ever uses them.
create policy "member_media_public_read"
  on storage.objects for select
  using (bucket_id = 'member-media');

-- Owner-only write, keyed on the second path segment (the user id) —
-- works for both the avatars/{id}/... and businesses/{id}/... prefixes.
create policy "member_media_owner_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'member-media'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

create policy "member_media_owner_update"
  on storage.objects for update
  using (
    bucket_id = 'member-media'
    and (storage.foldername(name))[2] = auth.uid()::text
  )
  with check (
    bucket_id = 'member-media'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

create policy "member_media_owner_delete"
  on storage.objects for delete
  using (
    bucket_id = 'member-media'
    and (storage.foldername(name))[2] = auth.uid()::text
  );
