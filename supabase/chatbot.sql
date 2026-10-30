-- Pure Talent — chatbot tables (reference + repair)
-- The chatbot tables already exist in your Supabase project. This file documents them and contains an
-- idempotent "repair" block you can paste into Supabase → SQL Editor at any time (safe to run twice).

-- ---------------------------------------------------------------- reference (already created)
-- chatbot_entries   — one row per answer. label / answer / link_label are {"en":"","ar":"","ru":""};
--                     keywords is {"en":[],"ar":[],"ru":[]}; action is null | 'latest_news' | 'open_business'.
--                     Public can SELECT rows where is_active = true. Only admins (private.is_admin()) can write.
-- chatbot_unanswered — questions the bot could not answer (question 1–300 chars, lang, handled, created_at).
--                     Visitors can only INSERT. Only admins can read / update / delete.

-- ---------------------------------------------------------------- repair
-- 1) Admins must be able to mark questions as handled (UPDATE needs a table grant as well as a policy).
grant update on public.chatbot_unanswered to authenticated;

-- 2) Remove duplicate admin policies that an earlier attempt left behind (the "… questions" versions stay).
drop policy if exists "admins delete unanswered" on public.chatbot_unanswered;
drop policy if exists "admins read unanswered" on public.chatbot_unanswered;

-- 3) Check the result: expect anon = INSERT only; authenticated = SELECT/INSERT/UPDATE/DELETE.
-- select grantee, privilege_type from information_schema.role_table_grants
--  where table_schema = 'public' and table_name = 'chatbot_unanswered' order by 1, 2;
-- select policyname, cmd, roles from pg_policies where tablename in ('chatbot_entries', 'chatbot_unanswered') order by 1;
