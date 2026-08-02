-- AppUser.avatarDataUrl (added s24) postdates the original profiles table —
-- no existing column covers the profile-picture data: URL. Stored as text
-- for now (matches the app's existing no-upload-backend photo handling
-- everywhere else); moving to Supabase Storage is separate follow-up work.
alter table profiles
  add column if not exists avatar_data_url text;
