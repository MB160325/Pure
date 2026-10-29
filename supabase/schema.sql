-- =====================================================================
-- Pure Talent Recruitment & Manpower Supply - Supabase backend
-- News CMS, job applications, business enquiries, admin access control
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE / ON CONFLICT where possible.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Private schema (not exposed through the public API)
-- ---------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------
-- 1. Admins: only users listed here can manage content
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;
grant select on public.admins to authenticated;

drop policy if exists "admins can read their own row" on public.admins;
create policy "admins can read their own row"
  on public.admins for select to authenticated
  using (user_id = (select auth.uid()));

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins a where a.user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public, anon, authenticated;
grant execute on function private.is_admin() to authenticated;

-- ---------------------------------------------------------------------
-- 2. News posts (multilingual: en / ar / ru stored as jsonb objects)
-- ---------------------------------------------------------------------
create table if not exists public.news_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        jsonb not null default '{}'::jsonb,
  excerpt      jsonb not null default '{}'::jsonb,
  body         jsonb not null default '{}'::jsonb,
  category     text not null default 'company',
  cover_url    text,
  is_featured  boolean not null default false,
  status       text not null default 'draft',
  published_at timestamptz,
  created_by   uuid references auth.users (id) on delete set null default auth.uid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint news_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 120),
  constraint news_category_valid check (category in ('company', 'announcement', 'industry', 'careers', 'events')),
  constraint news_status_valid check (status in ('draft', 'published')),
  constraint news_cover_https check (cover_url is null or cover_url ~ '^https://'),
  constraint news_json_objects check (
    jsonb_typeof(title) = 'object' and jsonb_typeof(excerpt) = 'object' and jsonb_typeof(body) = 'object'
  ),
  constraint news_has_title check (
    coalesce(nullif(btrim(title ->> 'en'), ''), nullif(btrim(title ->> 'ar'), ''), nullif(btrim(title ->> 'ru'), '')) is not null
  ),
  constraint news_size_limit check (octet_length(body::text) <= 200000 and octet_length(excerpt::text) <= 5000 and octet_length(title::text) <= 2000)
);

create index if not exists news_posts_published_idx
  on public.news_posts (published_at desc) where status = 'published';
create index if not exists news_posts_featured_idx
  on public.news_posts (is_featured) where status = 'published';

create or replace function private.news_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists news_before_write on public.news_posts;
create trigger news_before_write
  before insert or update on public.news_posts
  for each row execute function private.news_before_write();

alter table public.news_posts enable row level security;
revoke all on public.news_posts from anon, authenticated;
grant select on public.news_posts to anon;
grant select, insert, update, delete on public.news_posts to authenticated;

drop policy if exists "public can read published news" on public.news_posts;
create policy "public can read published news"
  on public.news_posts for select to anon, authenticated
  using (status = 'published' and published_at <= now());

drop policy if exists "admins manage news" on public.news_posts;
create policy "admins manage news"
  on public.news_posts for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- ---------------------------------------------------------------------
-- 3. Job applications (public insert only, admin read/manage)
-- ---------------------------------------------------------------------
create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text not null,
  nationality text not null,
  phone       text not null,
  email       text not null,
  position    text not null,
  message     text,
  cv_path     text,
  lang        text,
  status      text not null default 'new',
  admin_notes text,

  constraint app_full_name_len check (char_length(full_name) between 2 and 120),
  constraint app_nationality_len check (char_length(nationality) between 2 and 80),
  constraint app_phone_len check (char_length(phone) between 5 and 30),
  constraint app_email_format check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint app_position_len check (char_length(position) between 2 and 120),
  constraint app_message_len check (message is null or char_length(message) <= 3000),
  constraint app_cv_path_owned check (cv_path is null or (cv_path like id::text || '/%' and char_length(cv_path) <= 300)),
  constraint app_lang_valid check (lang is null or lang in ('en', 'ar', 'ru')),
  constraint app_status_valid check (status in ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  constraint app_notes_len check (admin_notes is null or char_length(admin_notes) <= 5000)
);

create index if not exists applications_created_idx on public.applications (created_at desc);
create index if not exists applications_status_idx on public.applications (status);

alter table public.applications enable row level security;
revoke all on public.applications from anon, authenticated;
grant insert on public.applications to anon;
grant select, insert, update, delete on public.applications to authenticated;

drop policy if exists "anyone can submit an application" on public.applications;
create policy "anyone can submit an application"
  on public.applications for insert to anon, authenticated
  with check (status = 'new' and admin_notes is null);

drop policy if exists "admins read applications" on public.applications;
create policy "admins read applications"
  on public.applications for select to authenticated
  using ((select private.is_admin()));

drop policy if exists "admins update applications" on public.applications;
create policy "admins update applications"
  on public.applications for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists "admins delete applications" on public.applications;
create policy "admins delete applications"
  on public.applications for delete to authenticated
  using ((select private.is_admin()));

-- ---------------------------------------------------------------------
-- 4. Business enquiries (public insert only, admin read/manage)
-- ---------------------------------------------------------------------
create table if not exists public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  company_name text not null,
  email        text not null,
  message      text not null,
  lang         text,
  status       text not null default 'new',
  admin_notes  text,

  constraint enq_company_len check (char_length(company_name) between 2 and 160),
  constraint enq_email_format check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint enq_message_len check (char_length(message) between 5 and 4000),
  constraint enq_lang_valid check (lang is null or lang in ('en', 'ar', 'ru')),
  constraint enq_status_valid check (status in ('new', 'replied', 'closed')),
  constraint enq_notes_len check (admin_notes is null or char_length(admin_notes) <= 5000)
);

create index if not exists enquiries_created_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
grant insert on public.enquiries to anon;
grant select, insert, update, delete on public.enquiries to authenticated;

drop policy if exists "anyone can submit an enquiry" on public.enquiries;
create policy "anyone can submit an enquiry"
  on public.enquiries for insert to anon, authenticated
  with check (status = 'new' and admin_notes is null);

drop policy if exists "admins read enquiries" on public.enquiries;
create policy "admins read enquiries"
  on public.enquiries for select to authenticated
  using ((select private.is_admin()));

drop policy if exists "admins update enquiries" on public.enquiries;
create policy "admins update enquiries"
  on public.enquiries for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists "admins delete enquiries" on public.enquiries;
create policy "admins delete enquiries"
  on public.enquiries for delete to authenticated
  using ((select private.is_admin()));

-- ---------------------------------------------------------------------
-- 5. Storage buckets
--    news-media : public images for news covers and article bodies
--    cvs        : private CV uploads (candidates upload, only admins read)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('news-media', 'news-media', true, 5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('cvs', 'cvs', false, 5242880,
    array['application/pdf', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins manage news media" on storage.objects;
create policy "admins manage news media"
  on storage.objects for all to authenticated
  using (bucket_id = 'news-media' and (select private.is_admin()))
  with check (bucket_id = 'news-media' and (select private.is_admin()));

drop policy if exists "anyone can upload a cv" on storage.objects;
create policy "anyone can upload a cv"
  on storage.objects for insert to anon, authenticated
  with check (
    bucket_id = 'cvs'
    and array_length(storage.foldername(name), 1) = 1
    and (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  );

drop policy if exists "admins read cvs" on storage.objects;
create policy "admins read cvs"
  on storage.objects for select to authenticated
  using (bucket_id = 'cvs' and (select private.is_admin()));

drop policy if exists "admins delete cvs" on storage.objects;
create policy "admins delete cvs"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cvs' and (select private.is_admin()));
