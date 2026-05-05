# MustGo 랜딩페이지 — 디자인 Variant 의뢰 프롬프트 (A안 카피 통합)

> 디자이너에게 시안 작업을 요청할 때, 또는 AI 디자인 툴(예: V0, Lovable, Galileo, Figma AI)에 입력할 때 사용할 수 있는 프롬프트입니다. **A안(차분·신뢰형) 카피가 모두 통합**되어 있어 그대로 사용 가능합니다.

---

## 1. 마스터 프롬프트 (전체 의뢰용 — 디자이너·에이전시용)

```
[프로젝트] MustGo 랜딩페이지 디자인

[브랜드 정의]
MustGo는 기업 출장의 '양방향'을 책임지는 여행사다.
- Outbound: 국내 기업의 해외 출장 항공·호텔·의전 (Corporate Travel)
- Inbound: 해외 기업 VIP의 한국 방문 의전 투어 (Inbound Tour)
브랜드 키워드: Trust(신뢰) / Premium(프리미엄) / Bridge(연결)
카피 톤: 차분·신뢰형 (Trust-First) — 단정한 어조, 적정 길이.
         과장·도발·자극적 표현 금지.

[페이지 구조 + 카피]

────────────────────────────────────────
■ Section 0. Header / GNB (sticky)
────────────────────────────────────────
- 로고 (좌측)
- 메뉴: 회사 소개 / 기업 출장 / 인바운드 투어 / 문의하기
       (영문: About / Corporate Travel / Inbound Tour / Contact)
- 언어 토글: KOR / ENG
- 우측 CTA 버튼: "빠른 견적" (Get a Quote)

────────────────────────────────────────
■ Section 1. Hero (100vh, 풀스크린)
────────────────────────────────────────
배경: 시네마틱 비디오 또는 4컷 슬라이드
     (활주로 → 비즈니스 클래스 → 서울 야경 → VIP 의전 차량)

[H] 메인 헤드라인:
    "비즈니스의 모든 출장,
     MustGo가 함께합니다."
[H] 영문 보조:
    "Your Trusted Partner in Business Travel."
[S] 서브카피 (2줄):
    "국내 기업의 해외 출장부터, 해외 VIP의 한국 의전까지 —
     양방향 비즈니스 트래블의 모든 디테일을 책임지는
     기업 전문 여행사."
[CTA Primary]:   "출장 항공 견적 받기"
[CTA Secondary]: "Inbound Tour 문의"
스크롤 인디케이터: "Scroll" 또는 "아래로 더 보기"

────────────────────────────────────────
■ Section 2. About MustGo
────────────────────────────────────────
[H] 섹션 헤드라인:
    "기업 출장의 양방향 전문가, MustGo입니다."
[B] 인사말 (4줄):
    "MustGo는 국내 기업의 해외 출장과,
     해외 기업 VIP의 한국 방문을 동시에 책임지는
     기업 전문 여행사입니다.
     항공·호텔·의전·투어까지, 비즈니스 여정의 모든 단계에서
     가장 신뢰할 수 있는 파트너가 되겠습니다."

[H] 3-Pillar 헤드라인:
    "MustGo를 선택하는 세 가지 이유"

  Pillar 1. 양방향 전문성
    "Outbound와 Inbound를 동시에 운영하는 보기 드문 역량.
     양 방향의 글로벌 네트워크가 서로의 자산이 됩니다."

  Pillar 2. VIP 디테일
    "임원 출장과 해외 의전 투어로 다져진 디테일.
     '디테일이 신뢰를 만든다' — MustGo의 운영 철학입니다."

  Pillar 3. 24/7 컨시어지
    "시차에 관계없이 즉시 응답하는 전담 운영팀.
     출장 중 어떤 상황에도, 한 통의 연락이면 충분합니다."

[H] 숫자 카운터 헤드라인:
    "숫자로 보는 MustGo"
    (스크롤 시 0부터 카운트업 애니메이션)
    - "00년+ 기업 출장 운영 경력"
    - "000+ 누적 거래 기업"
    - "00개국 글로벌 파트너 네트워크"
    - "00,000건 연간 발권·의전 진행"
    ※ 숫자는 실제 데이터로 교체 예정

────────────────────────────────────────
■ Section 3. Corporate Travel (비즈니스 블루 톤)
────────────────────────────────────────
[H] 섹션 헤드라인:
    "기업 해외출장,
     항공권부터 정산까지 한 번에."
[S] 리드 카피:
    "단순 발권을 넘어, 임직원의 출장 경험과
     회사의 비용 효율을 동시에 향상시킵니다."

[Card 1] 항공 예약·발권
  제목: "최적의 항공권, 가장 빠르게"
  본문: "전 세계 GDS를 활용해 최저가와 선호 좌석을 동시에 확보합니다.
        기업 전용 특가 운임과 비즈니스/퍼스트 클래스 컨설팅까지."

[Card 2] 호텔·차량·비자
  제목: "도착 후의 모든 것까지"
  본문: "글로벌 호텔 체인 기업요금, 의전 차량, 비자 대행, 단체 보험.
        출장지에서 필요한 모든 것을 한 번에 준비해 드립니다."

[Card 3] 출장 비용 관리·리포트
  제목: "보이지 않던 비용이, 보이기 시작합니다"
  본문: "부서별·노선별·임직원별 출장 비용을 자동으로 분석합니다.
        출장 규정 수립부터 절감안 도출까지 전문가가 동행합니다."

[Card 4] 24/7 비상 지원
  제목: "365일, 어디서든 한 번의 연락으로"
  본문: "긴급 발권 변경, 자연재해, 위기 상황까지.
        전담 컨설턴트와 비상 콜센터가 24시간 함께합니다."

[H] 프로세스 다이어그램 헤드라인:
    "출장 한 건이 처리되는 5단계"
  Step 1. 요청  — 이메일 또는 전용 시스템으로 출장 요청 접수
  Step 2. 제안  — 1시간 이내 최적 견적 회신 (항공·호텔)
  Step 3. 확정  — 승인 후 발권 및 예약 즉시 처리
  Step 4. 동행  — 출장 중 24/7 변경·비상 대응
  Step 5. 정산  — 귀국 후 자동 비용 리포트 발송

[하단 CTA]
  문구: "우리 회사에 맞는 출장 솔루션이 궁금하신가요?"
  버튼: "무료 견적 요청하기 →"

────────────────────────────────────────
■ Section 4. Inbound Tour (한국적 프리미엄 톤 — 골드 포인트)
────────────────────────────────────────
[H] 섹션 헤드라인 (국문):
    "한국을 찾는 글로벌 VIP를 위한
     프리미엄 의전 투어."
[H] 영문 헤드라인 (병기):
    "Premium Inbound Experience for Your Global VIPs in Korea."
[S] 리드 카피:
    "해외 본사·파트너사·바이어가 한국을 방문할 때,
     공항 영접부터 비즈니스 미팅, 산업 시찰, 문화 체험까지 —
     모든 디테일을 MustGo가 책임집니다."
    (영문)
    "From airport arrival to executive meetings, industry tours,
     and cultural experiences — every detail handled, end to end."

[H] 타깃 헤드라인:
    "이런 분들을 위한 서비스입니다"

  [Target 1] 해외 본사·지사 의전 담당자
    제목: "본사 경영진의 한국 방문을 책임지는 분"
    영문: "For HQ travel coordinators arranging executive visits to Korea."
    본문: "CEO·임원·이사회 멤버의 일정을, 단 한 번의 미스도 없이."

  [Target 2] 글로벌 컨퍼런스·전시회 주최자
    제목: "해외 연사·VIP 게스트의 한국 체류를 운영하는 분"
    영문: "For event organizers hosting international speakers and guests."
    본문: "참가자 만족도가 행사의 성공을 결정합니다."

  [Target 3] 해외 파트너사·바이어 안내
    제목: "B2B 미팅·공장 시찰을 동행하시는 분"
    영문: "For partners coordinating buyer or vendor visits in Korea."
    본문: "비즈니스의 첫인상이, 거래의 결과를 바꿉니다."

[H] 서비스 헤드라인:
    "4가지 영역에서 모든 것을 준비합니다"

  [Service 1] VIP Concierge
    본문: "공항 영접·환송, 프리미엄 차량, 전문 통역, 일정 매니지먼트."
    영문: "Airport meet & greet, premium transfer, professional interpreters."

  [Service 2] Business Program
    본문: "B2B 미팅 어레인지, 산업 시찰, 정부 방문, MOU 운영."
    영문: "B2B meetings, industry tours, government coordination."

  [Service 3] Cultural Tour
    본문: "서울 핵심 투어, 미쉐린 다이닝, K-컬처 체험, 지방 익스텐션."
    영문: "Seoul highlights, Michelin dining, K-culture experiences."

  [Service 4] MICE Operation
    본문: "컨퍼런스, 인센티브 투어, 전시회 참가단, 갈라 디너 운영."
    영문: "Conferences, incentive trips, exhibitions, gala dinners."

[하단 CTA]
  문구: "해외 VIP의 한국 방문, MustGo와 상담하세요."
  버튼: "Plan Your VIP Experience →"

────────────────────────────────────────
■ Section 5. Contact (좌우 분할)
────────────────────────────────────────
[H] 섹션 헤드라인:
    "가장 빠른 답변, MustGo가 드립니다."
[S] 서브카피:
    "영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다."

좌측 — 문의 폼
  문의 유형 (라디오):
    ○ Corporate Travel — 해외 출장 문의
    ○ Inbound Tour — 해외 VIP 한국 방문 문의
    ○ 기타 — 제휴 또는 기타 문의

  입력 필드:
    회사명 *      (예: 머스트고 주식회사)
    담당자 성명 * (이름을 입력해 주세요)
    직책          (예: 총무팀 대리)
    연락처 *      (010-0000-0000)
    이메일 *      (name@company.com)
    문의 내용     (문의하실 내용을 자유롭게 작성해 주세요.
                  출장지·인원·시기 등을 알려주시면
                  더 정확한 견적이 가능합니다.)
    □ 개인정보 수집·이용에 동의합니다. (필수) [약관 보기]

  제출 버튼: "문의 보내기"
  제출 완료 메시지:
    "문의가 정상적으로 접수되었습니다.
     영업일 기준 1일 이내에 담당 컨설턴트가 회신드립니다."

우측 — 빠른 연결 채널
  · 전화: 02-XXX-XXXX (평일 09:00 - 18:00)
  · 긴급 24/7: XXX-XXXX-XXXX (기존 거래사 전용)
  · 이메일: contact@mustgo.kr
  · 주소: 서울특별시 ○○구 ○○로 ○○ (지도 보기)
  · 약도 임베드 (Google Map 또는 카카오맵)

────────────────────────────────────────
■ Section 6. Footer (네이비 배경)
────────────────────────────────────────
좌측: 로고 + "MustGo — 비즈니스 출장의 양방향 전문가"
            "Your Trusted Partner in Two-Way Business Travel."

중앙: 회사 정보
    (주)머스트고 │ 대표: ○○○
    사업자등록번호: 000-00-00000
    통신판매업 신고: 제20○○-서울○○구-0000호
    관광사업등록번호: 제20○○-000000호
    주소: 서울특별시 ○○구 ○○로 ○○
    Tel. 02-XXX-XXXX │ Email. contact@mustgo.kr
    · 한국여행업협회 영업보증보험 ○○○○만원 가입
    · 기획여행보증보험 ○억원 가입

우측: 빠른 링크
    이용약관 / 개인정보처리방침 / 여행약관

최하단: © 20XX MustGo Co., Ltd. All Rights Reserved.

────────────────────────────────────────
■ 플로팅 CTA (모든 섹션에서 우하단 노출)
────────────────────────────────────────
메인: "빠른 견적 요청"
클릭 후 펼침: "어떤 도움이 필요하세요?"
  - 옵션 1: "출장 항공 견적이 필요해요"
  - 옵션 2: "해외 VIP 한국 의전 문의예요"

[디자인 톤 — 핵심]
두 사업이 한 페이지 안에서 시각적으로 명확히 구분되어야 한다.
- Corporate Travel 영역: 비즈니스 블루 톤 — 항공기·라운지·도시 야경 무드
- Inbound Tour 영역: 한국적 프리미엄 톤 — 한옥·궁궐·다이닝·골드 포인트
- 두 톤 사이의 전환은 자연스러운 그라데이션 또는 섹션 구분선으로 처리

[컬러]
- Primary Navy: #1F3864
- Sub Blue: #2E5496
- Accent (Inbound용): #C19A6B (Gold) 또는 #D9534F (Coral)
- Neutral: #FFFFFF / #F7F8FA / #333333

[타이포]
- 국문: Pretendard 또는 Noto Sans KR
- 영문 헤드라인: Inter, Manrope, 또는 Montserrat
- 본문 16~18px / H2 32~40px / H1 48~64px / 줄간격 본문 1.6, 헤드 1.2

[인터랙션]
- Sticky GNB, 현재 섹션 하이라이트, smooth scroll
- 섹션 진입 시 페이드인·슬라이드업
- About 숫자 카운터 애니메이션
- 우하단 플로팅 CTA('빠른 견적 요청')
- Hero 비디오는 모바일에서 이미지로 대체

[반응형]
- 데스크톱(1440), 태블릿(768), 모바일(375) 3종
- 4-Card 그리드 → 모바일 세로 스택
- GNB → 모바일 햄버거 메뉴

[금지 사항]
- 일반 패키지 여행사 분위기(휴양지 사진, 떠나요~ 류 카피) 금지
- 과도한 그라데이션·네온·반짝이 효과 금지
- 카카오톡 채널, SNS 아이콘 영역 없음

[마이크로 카피]
- 폼 에러:
  · "이 항목은 필수입니다."
  · "올바른 이메일 형식이 아닙니다."
  · "휴대폰 번호 형식을 확인해 주세요."
- 토스트:
  · "문의가 접수되었습니다. 곧 회신드릴게요."
  · "클립보드에 복사되었습니다."
- 로딩: "잠시만요, 준비하고 있어요."
- 404:  "찾으시는 페이지가 없습니다."
- 쿠키 동의:
  · "MustGo는 더 나은 사용자 경험을 위해 쿠키를 사용합니다."
  · 버튼: "동의" / "자세히 보기"

[산출물]
1. PC + Mobile 풀시안 (Figma 파일)
2. 컬러·타이포·컴포넌트 가이드
3. 인터랙션 모션 가이드 (필요 시 Lottie 또는 영상 레퍼런스)

[참고 사이트]
- aliceglobal.co.kr (간결한 UI 톤)
- universecompany.kr (브랜드 메시지 강도)
- 호텔·항공사 프리미엄 라운지 사이트의 비주얼 톤 참조
```

---

## 2. AI 디자인 툴용 프롬프트 (V0 / Lovable / Bolt 등 — 영문)

```
Design a single-page landing site for "MustGo", a Korean B2B travel agency
specializing in two-way corporate travel:
  (1) Outbound: Korean enterprises traveling overseas (Corporate Travel)
  (2) Inbound: Foreign VIPs visiting Korea (Inbound Tour)

Brand keywords: Trust, Premium, Bridge.
Copy tone: calm, confident, trust-first (NO hype, NO clickbait).
Visual tone: editorial, cinematic, premium B2B (think: hotel chain × airline
lounge, NOT generic travel agency).

══════════════════════════════════════════════
SECTION-BY-SECTION COPY (use exactly as written)
══════════════════════════════════════════════

▸ HEADER (sticky)
  Menu: 회사 소개 / 기업 출장 / 인바운드 투어 / 문의하기
       (EN: About / Corporate Travel / Inbound Tour / Contact)
  Language toggle: KOR / ENG
  Right CTA button: "빠른 견적" (Get a Quote)

▸ HERO (100vh, full-bleed cinematic background)
  Background sequence: airport runway → business class cabin →
                       Seoul night skyline → black sedan VIP transfer
  Headline (KR):
    "비즈니스의 모든 출장,
     MustGo가 함께합니다."
  Headline (EN, supporting):
    "Your Trusted Partner in Business Travel."
  Subcopy:
    "국내 기업의 해외 출장부터, 해외 VIP의 한국 의전까지 —
     양방향 비즈니스 트래블의 모든 디테일을 책임지는 기업 전문 여행사."
  Primary CTA:   "출장 항공 견적 받기"
  Secondary CTA: "Inbound Tour 문의"

▸ ABOUT
  Headline:    "기업 출장의 양방향 전문가, MustGo입니다."
  Body (4 lines):
    "MustGo는 국내 기업의 해외 출장과,
     해외 기업 VIP의 한국 방문을 동시에 책임지는 기업 전문 여행사입니다.
     항공·호텔·의전·투어까지, 비즈니스 여정의 모든 단계에서
     가장 신뢰할 수 있는 파트너가 되겠습니다."

  3-Pillar Header: "MustGo를 선택하는 세 가지 이유"
    P1. 양방향 전문성 — Outbound와 Inbound를 동시에 운영하는 보기 드문 역량.
                       양 방향의 글로벌 네트워크가 서로의 자산이 됩니다.
    P2. VIP 디테일    — 임원 출장과 해외 의전 투어로 다져진 디테일.
                       '디테일이 신뢰를 만든다' — MustGo의 운영 철학입니다.
    P3. 24/7 컨시어지 — 시차에 관계없이 즉시 응답하는 전담 운영팀.
                       출장 중 어떤 상황에도, 한 통의 연락이면 충분합니다.

  Counter Header: "숫자로 보는 MustGo"
    Counters (animate from 0 on scroll):
      "00년+"   기업 출장 운영 경력
      "000+"    누적 거래 기업
      "00개국"   글로벌 파트너 네트워크
      "00,000건" 연간 발권·의전 진행

▸ CORPORATE TRAVEL (business-blue tone)
  Headline:
    "기업 해외출장,
     항공권부터 정산까지 한 번에."
  Lead:
    "단순 발권을 넘어, 임직원의 출장 경험과
     회사의 비용 효율을 동시에 향상시킵니다."

  Card 1: "최적의 항공권, 가장 빠르게"
          전 세계 GDS, 기업 특가, 비즈니스/퍼스트 컨설팅
  Card 2: "도착 후의 모든 것까지"
          호텔 기업요금, 의전 차량, 비자, 단체 보험
  Card 3: "보이지 않던 비용이, 보이기 시작합니다"
          부서·노선·개인별 비용 자동 분석, 절감안 도출
  Card 4: "365일, 어디서든 한 번의 연락으로"
          긴급 변경, 위기 대응, 24/7 비상 콜센터

  Process Header: "출장 한 건이 처리되는 5단계"
    1.요청 → 2.제안(1시간내) → 3.확정 → 4.동행 → 5.정산

  Bottom CTA:
    "우리 회사에 맞는 출장 솔루션이 궁금하신가요?"
    Button: "무료 견적 요청하기 →"

▸ INBOUND TOUR (warm Korean premium, gold accents on dark navy)
  Headline (KR):
    "한국을 찾는 글로벌 VIP를 위한
     프리미엄 의전 투어."
  Headline (EN):
    "Premium Inbound Experience for Your Global VIPs in Korea."
  Lead (KR):
    "해외 본사·파트너사·바이어가 한국을 방문할 때,
     공항 영접부터 비즈니스 미팅, 산업 시찰, 문화 체험까지 —
     모든 디테일을 MustGo가 책임집니다."
  Lead (EN):
    "From airport arrival to executive meetings, industry tours,
     and cultural experiences — every detail handled, end to end."

  Target Header: "이런 분들을 위한 서비스입니다"
    T1. 본사 경영진의 한국 방문을 책임지는 분
        / For HQ travel coordinators arranging executive visits.
        "CEO·임원·이사회 멤버의 일정을, 단 한 번의 미스도 없이."
    T2. 해외 연사·VIP 게스트의 한국 체류를 운영하는 분
        / For event organizers hosting international speakers and guests.
        "참가자 만족도가 행사의 성공을 결정합니다."
    T3. B2B 미팅·공장 시찰을 동행하시는 분
        / For partners coordinating buyer or vendor visits.
        "비즈니스의 첫인상이, 거래의 결과를 바꿉니다."

  Service Header: "4가지 영역에서 모든 것을 준비합니다"
    S1. VIP Concierge      — 공항 영접, 프리미엄 차량, 통역, 일정 매니지먼트
    S2. Business Program   — B2B 미팅, 산업 시찰, 정부 방문, MOU 운영
    S3. Cultural Tour      — 서울 투어, 미쉐린 다이닝, K-컬처 체험
    S4. MICE Operation     — 컨퍼런스, 인센티브, 전시회, 갈라 디너

  Bottom CTA:
    "해외 VIP의 한국 방문, MustGo와 상담하세요."
    Button: "Plan Your VIP Experience →"

▸ CONTACT (split layout)
  Headline: "가장 빠른 답변, MustGo가 드립니다."
  Subcopy:  "영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다."

  LEFT — Inquiry form with type radio:
    ○ Corporate Travel — 해외 출장 문의
    ○ Inbound Tour — 해외 VIP 한국 방문 문의
    ○ 기타 — 제휴 또는 기타 문의

    Fields: 회사명* / 담당자 성명* / 직책 / 연락처* / 이메일* / 문의 내용
    Consent checkbox + submit button: "문의 보내기"

  RIGHT — Quick channels:
    · Phone, 24/7 emergency line, email
    · Address + embedded map
    (NO KakaoTalk channel, NO SNS icons — explicitly excluded)

▸ FOOTER (dark navy)
  Left: Logo + tagline
        "MustGo — 비즈니스 출장의 양방향 전문가"
        "Your Trusted Partner in Two-Way Business Travel."
  Center: Company info, business registration, travel insurance disclosures
  Right: 이용약관 / 개인정보처리방침 / 여행약관
  Bottom: © 20XX MustGo Co., Ltd. All Rights Reserved.

▸ FLOATING CTA (sticky bottom-right)
  Main: "빠른 견적 요청"
  Expanded: "어떤 도움이 필요하세요?"
    - "출장 항공 견적이 필요해요"
    - "해외 VIP 한국 의전 문의예요"

══════════════════════════════════════════════
VISUAL & INTERACTION RULES
══════════════════════════════════════════════
- Two clearly distinct color zones flowing into each other:
  Corporate Travel = #1F3864 / #2E5496 navy
  Inbound Tour     = #1F3864 base + #C19A6B gold accents
- Generous whitespace, large editorial typography
- Photography over illustration (high-res, slightly desaturated, cinematic)
- Smooth scroll, sticky nav with active-section highlight
- Fade-in-up on reveal, counter animation on About
- Floating "빠른 견적 요청" CTA bottom-right

Typography:
  Korean:   Pretendard or Noto Sans KR
  English:  Inter / Manrope / Montserrat, bold, tight tracking

Responsive: desktop 1440 / tablet 768 / mobile 375
On mobile: hero video → static image, 4-card grid → vertical stack,
nav → hamburger.

Avoid: rainbow gradients, neon glows, leisure-travel clichés (palm trees,
beach umbrellas), social media icons (Instagram/blog/KakaoTalk channel
buttons are explicitly NOT included).

Deliverable: a single-file React component using Tailwind, with placeholder
images from Unsplash (search: business travel, airport lounge, Seoul,
hanok, business meeting).
```

---

## 3. 섹션별 부분 프롬프트 (필요한 부분만 의뢰할 때)

### 3-1. Hero 섹션만 의뢰
```
MustGo 랜딩페이지의 Hero 섹션(첫 화면, 100vh)을 디자인해 주세요.

배경: 풀스크린 시네마틱 비디오 또는 4컷 슬라이드
  (활주로 → 비즈니스 클래스 → 서울 야경 → VIP 의전 차량)

[메인 카피]
  헤드라인 (국문, 2줄):
    "비즈니스의 모든 출장,
     MustGo가 함께합니다."
  영문 보조:
    "Your Trusted Partner in Business Travel."

[서브 카피]
  "국내 기업의 해외 출장부터, 해외 VIP의 한국 의전까지 —
   양방향 비즈니스 트래블의 모든 디테일을 책임지는 기업 전문 여행사."

[CTA — 2개]
  Primary:   "출장 항공 견적 받기"
  Secondary: "Inbound Tour 문의"

배경 위에 글자가 잘 읽히도록 좌하단 그라데이션 오버레이.
화면 하단 중앙에 ↓ 스크롤 인디케이터 ('Scroll' 텍스트).
좌측 정렬 카피 + 우측은 비주얼이 그대로 보이는 구도.

브랜드 컬러: #1F3864 / 영문 폰트 Inter Bold / 국문 Pretendard.
모바일 대응: 비디오 → 정지 이미지로 대체.
```

### 3-2. Inbound Tour 섹션만 의뢰
```
한국적 프리미엄 무드의 섹션을 디자인해 주세요.
타깃: 해외 기업 VIP 의전 투어 — 미국·중국·일본·중동 본사 임원진 대상.

배경 톤: 짙은 네이비(#1F3864) 베이스 + 골드(#C19A6B) 포인트.
비주얼 모티브: 한옥·궁궐 야경, 미쉐린 다이닝, 검정색 의전 세단,
              반도체 클러스터 같은 한국 산업 아이콘.

[섹션 카피 — 그대로 사용]

  헤드라인 (국·영문 병기):
    "한국을 찾는 글로벌 VIP를 위한 프리미엄 의전 투어."
    "Premium Inbound Experience for Your Global VIPs in Korea."

  리드:
    "해외 본사·파트너사·바이어가 한국을 방문할 때,
     공항 영접부터 비즈니스 미팅, 산업 시찰, 문화 체험까지 —
     모든 디테일을 MustGo가 책임집니다."

  3개 타깃 카드:
    T1. "본사 경영진의 한국 방문을 책임지는 분"
        "CEO·임원·이사회 멤버의 일정을, 단 한 번의 미스도 없이."
    T2. "해외 연사·VIP 게스트의 한국 체류를 운영하는 분"
        "참가자 만족도가 행사의 성공을 결정합니다."
    T3. "B2B 미팅·공장 시찰을 동행하시는 분"
        "비즈니스의 첫인상이, 거래의 결과를 바꿉니다."

  4개 서비스 카드:
    S1. VIP Concierge   — 공항 영접, 프리미엄 차량, 통역
    S2. Business Program — B2B 미팅, 산업 시찰, 정부 방문
    S3. Cultural Tour    — 서울 투어, 미쉐린 다이닝, K-컬처
    S4. MICE Operation   — 컨퍼런스, 인센티브, 전시회, 갈라

  하단 CTA:
    문구: "해외 VIP의 한국 방문, MustGo와 상담하세요."
    버튼: "Plan Your VIP Experience →"

이전 섹션(Corporate Travel — 비즈니스 블루)과 시각적으로 명확히 구분되되
같은 사이트 안의 섹션임이 느껴지도록. 섹션 상단에 자연스러운 톤 전환.
```

### 3-3. Contact 섹션만 의뢰
```
MustGo 랜딩페이지의 Contact 섹션을 좌우 분할 레이아웃으로 디자인해 주세요.

[헤드라인]
  "가장 빠른 답변, MustGo가 드립니다."
  서브: "영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다."

[좌측 — 문의 폼]
  문의 유형 라디오 버튼 (3개):
    ○ Corporate Travel — 해외 출장 문의
    ○ Inbound Tour — 해외 VIP 한국 방문 문의
    ○ 기타 — 제휴 또는 기타 문의

  입력 필드 (라벨 + 플레이스홀더):
    회사명 *      / 예: 머스트고 주식회사
    담당자 성명 * / 이름을 입력해 주세요
    직책          / 예: 총무팀 대리
    연락처 *      / 010-0000-0000
    이메일 *      / name@company.com
    문의 내용     / 문의하실 내용을 자유롭게 작성해 주세요.
                   출장지·인원·시기 등을 알려주시면
                   더 정확한 견적이 가능합니다.

  □ 개인정보 수집·이용에 동의합니다. (필수) [약관 보기]

  제출 버튼: "문의 보내기"

  제출 완료 토스트:
    "문의가 정상적으로 접수되었습니다.
     영업일 기준 1일 이내에 담당 컨설턴트가 회신드립니다."

[우측 — 빠른 연결 채널]
  · 전화: 02-XXX-XXXX (평일 09:00 - 18:00)
  · 긴급 24/7: XXX-XXXX-XXXX (기존 거래사 전용)
  · 이메일: contact@mustgo.kr
  · 주소: 서울특별시 ○○구 ○○로 ○○
  · 약도 임베드 (Google Map 또는 카카오맵)

⚠️ 카카오톡 채널 / SNS 아이콘은 명시적으로 제외. 추가하지 마세요.
```

---

## 4. 시안 검수 체크리스트

디자이너에게 시안을 받았을 때 다음 항목들을 검토하세요.

```
[브랜드 정합성]
□ Outbound와 Inbound가 시각적으로 구분되는가
□ 두 섹션이 한 사이트 안의 흐름으로 자연스럽게 이어지는가
□ '기업 전문 여행사'의 톤이 유지되는가 (B2C 패키지여행 분위기 아님)
□ 카피의 톤이 차분·신뢰형(A안)으로 일관되게 유지되는가

[카피 적용]
□ Hero 헤드라인이 "비즈니스의 모든 출장, MustGo가 함께합니다." 그대로인가
□ 각 섹션의 헤드라인·서브카피·CTA 문구가 A안 카피 그대로 들어갔는가
□ Inbound Tour 섹션에 영문 헤드라인·리드·타깃 설명이 병기되었는가
□ 카운터 숫자 자리에 "00년+", "000+" 같은 placeholder가 있는가

[정보 위계]
□ 첫 화면에서 3초 안에 회사가 무엇을 하는지 인식되는가
□ 4개 메인메뉴 위치와 역할이 직관적인가
□ 두 사업의 진입 동선이 동등하게 노출되는가

[기능·인터랙션]
□ Sticky GNB가 작동하고 현재 섹션이 하이라이트되는가
□ Counter / Reveal / Smooth Scroll 등 핵심 모션이 구현되어 있는가
□ 폼이 Corporate / Inbound 분기 처리되는가
□ 모바일에서 4-Card가 세로 스택으로 정상 변환되는가
□ 우하단 플로팅 CTA('빠른 견적 요청')가 모든 섹션에서 노출되는가

[제외 항목 확인]
□ 카카오톡 채널 영역이 없는가
□ SNS 아이콘 영역이 없는가
□ 거래 기업 로고 / 인증 배지 영역이 없는가 (별도 삭제됨)
□ Inbound Tour 진행 사례(Case Study) 영역이 없는가 (별도 삭제됨)
```
