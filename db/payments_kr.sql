-- =============================================================================
-- Mustgo · payments_kr 테이블 (토스페이먼츠 원화 결제 기록)
-- 기존 DB 에 "추가"로 실행하는 마이그레이션입니다.
-- Supabase → SQL Editor 에 붙여넣고 실행하세요.
--
-- 해외(USD/EUR) PayPal 결제는 별도 테이블 public.payments 에 기록됩니다.
-- 두 PG 는 식별자·상태값·정산 체계가 완전히 달라서 테이블을 분리합니다.
-- (국내 카드는 외국환거래법상 PayPal 로 받을 수 없어 두 경로가 공존합니다.)
-- =============================================================================

-- 1) 테이블
--   브라우저는 이 테이블에 직접 INSERT 하지 않습니다. Edge Function
--   (toss-prepare-payment / toss-confirm-payment / toss-webhook) 이
--   service_role 로 기록하므로 anon 권한/RPC 가 필요 없습니다.
create table if not exists public.payments_kr (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- 주문번호. 결제창을 열기 전에 서버가 발급하고, 승인 시 이 값으로 금액을 대조합니다.
  order_id      text unique not null,
  -- 토스페이먼츠가 발급하는 결제 식별자 (승인 단계에서 채워짐)
  payment_key   text,

  -- 원화는 소수점이 없으므로 정수로 보관합니다.
  amount        numeric(12, 0) not null,
  currency      text not null default 'KRW',

  -- created            결제창을 열기 위해 주문만 생성된 상태 (미승인 = 청구 없음)
  -- completed          승인 완료 (카드/간편결제/계좌이체는 즉시, 가상계좌는 입금 후)
  -- waiting_for_deposit 가상계좌 발급 완료, 입금 대기
  -- canceled           승인 후 취소/환불됨
  -- failed             승인 실패
  status        text not null default 'created',

  -- 토스가 돌려주는 결제수단 표기 (카드 / 간편결제 / 계좌이체 / 가상계좌 …)
  method        text,

  payer_name    text,
  payer_email   text,
  reference     text,                 -- 고객이 남긴 견적번호/메모
  receipt_url   text,                 -- 토스 매출전표 URL

  -- 가상계좌 입금 웹훅(DEPOSIT_CALLBACK) 검증용 시크릿. 승인 응답의 secret 값.
  vbank_secret  text,

  approved_at   timestamptz,
  raw           jsonb                 -- 토스 승인/조회 원본 응답 (감사용)
);

create index if not exists payments_kr_created_at_idx on public.payments_kr (created_at desc);
create index if not exists payments_kr_status_idx     on public.payments_kr (status);

-- 2) RLS
--   브라우저(anon)는 접근 불가. 결제 PII 는 관리자 계정만 SELECT.
--   service_role(Edge Function)은 RLS 를 우회합니다.
alter table public.payments_kr enable row level security;

grant select on public.payments_kr to authenticated;
grant all    on public.payments_kr to service_role;

drop policy if exists "admin can read payments_kr" on public.payments_kr;
create policy "admin can read payments_kr"
  on public.payments_kr for select to authenticated
  using ((auth.jwt() ->> 'email') = 'wemustgo@mustgokorea.com');
