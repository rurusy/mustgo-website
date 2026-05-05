-- =============================================================================
-- Mustgo · Supabase 스키마
-- 새 Supabase 프로젝트에 이 파일 전체를 SQL Editor 에 붙여넣고 실행하세요.
-- =============================================================================

-- 1) 테이블
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  inquiry_type text not null,
  company text not null,
  name text not null,
  position text,
  phone text not null,
  email text not null,
  message text,
  consent boolean not null default false,
  handled boolean not null default false
);

-- 2) RLS 활성화 + 권한
alter table public.inquiries enable row level security;

grant insert on public.inquiries to anon;
grant select, update on public.inquiries to authenticated;

-- 3) 정책
--   anon: INSERT 만 가능 (실제 INSERT 는 아래 RPC 함수로 우회하지만
--         보안상 정책도 함께 명시)
--   authenticated: 관리자가 SELECT, UPDATE 가능
drop policy if exists "anon can insert" on public.inquiries;
drop policy if exists "authenticated can read" on public.inquiries;
drop policy if exists "authenticated can update" on public.inquiries;

create policy "anon can insert"
  on public.inquiries for insert to anon with check (true);

create policy "authenticated can read"
  on public.inquiries for select to authenticated using (true);

create policy "authenticated can update"
  on public.inquiries for update to authenticated using (true) with check (true);

-- 4) 문의 등록 RPC
--   anon 클라이언트가 RLS 정책 매칭 이슈 없이 안전하게 INSERT 할 수 있도록
--   SECURITY DEFINER 함수로 노출. 함수는 소유자(postgres) 권한으로 실행되어
--   RLS 를 우회하지만, 노출되는 작업은 INSERT 한 가지뿐이고 입력은
--   jsonb payload 로 통일되어 있어 입력 검증/스키마 변경에 강합니다.
create or replace function public.submit_inquiry(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  insert into public.inquiries (
    inquiry_type, company, name, position, phone, email, message, consent
  ) values (
    payload->>'inquiry_type',
    payload->>'company',
    payload->>'name',
    nullif(payload->>'position', ''),
    payload->>'phone',
    payload->>'email',
    nullif(payload->>'message', ''),
    coalesce((payload->>'consent')::boolean, false)
  )
  returning id into new_id;
  return new_id;
end;
$$;

revoke all on function public.submit_inquiry(jsonb) from public;
grant execute on function public.submit_inquiry(jsonb) to anon, authenticated;
