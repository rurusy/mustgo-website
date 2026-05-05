# Mustgo

차분·신뢰형(Trust-First) 톤의 기업용 여행사 머스트고 랜딩페이지. Outbound(한국 기업의 해외 출장·인센티브)와 Inbound(국내 방문 VIP 의전) 두 축의 서비스를 한 페이지로 소개합니다. 디자인 시스템을 별도 라이브러리로 빼지 않고, 사이트 자체가 자기 자신의 스타일가이드 역할을 합니다.

## 빠른 시작

```bash
npm install
npm run dev      # http://localhost:5173 (host:true → LAN 접속 가능)
npm run build    # 운영 빌드 → dist/
npm run preview  # dist/ 미리보기
```

테스트·린터·포매터는 별도로 설정돼 있지 않습니다.

## 환경 변수

Google Maps Embed API 키가 필요합니다. 키가 없어도 dev는 동작 — Contact 섹션이 키 불필요한 `?output=embed` 임베드로 자동 폴백합니다.

```bash
cp .env.example .env.local
# .env.local 에 발급받은 키를 채워넣기
# VITE_GOOGLE_MAPS_API_KEY=AIza...
```

운영 키는 반드시 (a) HTTP 리퍼러로 도메인 제한, (b) "Maps Embed API"만 허용하도록 제한해주세요. `VITE_` 접두사 변수는 클라이언트 번들에 그대로 박힙니다.

## 라우트

- `/` — `HomePage` · 마케팅 사이트 본체 (Hero / About / Corporate / Inbound / Contact 섹션)
- `/styleguide` — `StyleguidePage` · 모든 UI 프리미티브와 마케팅 카드의 라이브 카탈로그

## 폴더 구조

```
src/
  components/
    ui/          # 헤드리스 프리미티브 (Button, Card, Section, Fade …)
    marketing/   # ui/로 조립된 마케팅 카드 (FeatureCard, ServiceCard …)
    sections/    # 페이지 섹션 (Hero, About, Corporate, Inbound, Contact)
    layout/      # 페이지 크롬 (Header, Footer, FloatingCTA)
  design/        # 토큰(tokens.js)·classnames helper(cn.js)
  hooks/         # useFadeIn, useCounter
  pages/         # HomePage, StyleguidePage
```

새 컴포넌트를 추가하면 `StyleguidePage.jsx`에도 등록해 디자이너가 단독으로 검수할 수 있게 해주세요. 새 프리미티브는 `components/ui/index.js`에서 재수출합니다.

## 디자인 토큰

브랜드 색상·폰트·여백은 두 곳에 동기화해 둡니다 — `tailwind.config.js`(클래스 기반)와 `src/design/tokens.js`(JS 컨텍스트·hero 이미지·스타일가이드 스와치). **하나를 바꾸면 다른 하나도 같이 바꿔야 합니다.**

브랜드 워드마크 "Mustgo"는 항상 `<BrandText />`로 렌더해주세요 (M은 `text-brand-green`, g는 `text-brand-blue`).

## 카피 가이드

본문은 한국어, 마케팅 태그라인·라벨에는 영어가 섞입니다. 영어 전용 텍스트에는 `font-eng`(Inter) 유틸리티를 적용. 본문 톤·섹션 구조는 `MustGo_디자인_프롬프트_v2.md`를 따릅니다 — 사용자에게 노출되는 카피를 손보기 전에 한 번 확인해 주세요.

## 스택

React 18 · React Router 6 · Vite 5 · Tailwind CSS 3
