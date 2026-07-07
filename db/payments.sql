-- =============================================================================
-- Mustgo · payments 테이블 (PayPal 결제 기록)
-- 기존 DB 에 "추가"로 실행하는 마이그레이션입니다.
-- Supabase → SQL Editor 에 붙여넣고 실행하세요.
-- (db/schema.sql 은 최초 1회 셋업용 — 이 파일은 결제 기능 추가분입니다.)
-- =============================================================================

-- 1) 테이블
--   결제는 브라우저가 직접 INSERT 하지 않습니다. Edge Function 이
--   service_role 로 기록하므로 anon 권한/RPC 가 필요 없습니다.
create table if not exists public.payments (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  paypal_order_id    text unique not null,
  paypal_capture_id  text,
  amount             numeric(12, 2) not null,
  currency           text not null default 'USD',
  status             text not null default 'created',  -- created | completed | failed
  payer_name         text,
  payer_email        text,
  reference          text,                             -- 고객이 남긴 견적번호/메모
  raw                jsonb                             -- PayPal capture 원본 응답 (감사용)
);

create index if not exists payments_created_at_idx on public.payments (created_at desc);
create index if not exists payments_status_idx     on public.payments (status);

-- 2) RLS
--   브라우저(anon)는 접근 불가. 로그인한 관리자만 SELECT.
--   service_role 은 RLS 를 우회하므로 Edge Function 의 기록에는 영향 없음.
alter table public.payments enable row level security;

grant select on public.payments to authenticated;
grant all    on public.payments to service_role;

drop policy if exists "authenticated can read payments" on public.payments;
create policy "authenticated can read payments"
  on public.payments for select to authenticated using (true);
