import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Container,
  FormLabel,
  Input,
  Textarea,
  Radio,
  Checkbox,
  IconBadge,
  SectionHeading,
  Stat,
  BrandText,
} from '../components/ui'
import { FeatureCard } from '../components/marketing/FeatureCard'
import { ServiceCard } from '../components/marketing/ServiceCard'
import { AudienceCard } from '../components/marketing/AudienceCard'
import { ImageCard } from '../components/marketing/ImageCard'
import { ProcessSteps } from '../components/marketing/ProcessSteps'
import { ContactInfoItem } from '../components/marketing/ContactInfoItem'
import { GlobeIcon, StarIcon, ClockIcon, PhoneIcon, MailIcon, PinIcon } from '../components/icons.jsx'
import { colors } from '../design/tokens'

function Swatch({ name, value, label }) {
  return (
    <div className="flex flex-col">
      <div
        className="h-20 rounded-lg border border-gray-200"
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className="mt-3 text-sm font-bold text-gray-900">{name}</div>
      <div className="text-xs font-eng text-gray-500">{value}</div>
      {label && <div className="text-xs text-gray-400 mt-1">{label}</div>}
    </div>
  )
}

function Block({ title, description, children }) {
  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-8 max-w-2xl">{description}</p>}
      <div>{children}</div>
    </section>
  )
}

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-30">
        <Container className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.gif" alt="Mustgo" className="h-7 w-auto" />
            <span className="text-sm font-bold tracking-wide2 text-gray-500 uppercase font-eng">
              Design System
            </span>
          </div>
          <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
            ← 홈으로
          </Link>
        </Container>
      </header>

      <Container className="py-16">
        <header className="mb-20 max-w-3xl">
          <p className="text-xs font-eng font-bold uppercase tracking-wide2 text-amber-600 mb-4">
            <BrandText /> Design System v0.1
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            <BrandText />의 시각 언어
          </h1>
          <p className="text-lg text-gray-600 leading-[1.8]">
            마케팅 페이지를 구성하는 토큰·프리미티브·합성 컴포넌트를 한 페이지에서 확인할 수
            있습니다. 색상은 amber 600을 1차 액션, 브랜드 블루/그린을 강조 색으로 사용합니다.
          </p>
        </header>

        <Block
          title="Color"
          description="브랜드 컬러는 amber(주 액션), brand-blue/green(강조), ink(다크 섹션 배경) 세 그룹으로 구성됩니다."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <Swatch name="amber-500" value={colors.amber[500]} />
            <Swatch name="amber-600" value={colors.amber[600]} label="Primary CTA" />
            <Swatch name="amber-700" value={colors.amber[700]} />
            <Swatch name="brand-blue" value={colors.brand.blue.DEFAULT} label="Accent" />
            <Swatch name="brand-blue.dark" value={colors.brand.blue.dark} />
            <Swatch name="brand-green" value={colors.brand.green.DEFAULT} label="Accent" />
            <Swatch name="ink-900" value={colors.ink[900]} />
            <Swatch name="ink-800" value={colors.ink[800]} />
            <Swatch name="surface-soft" value={colors.surface.soft} />
          </div>
        </Block>

        <Block title="Typography" description="국문은 Noto Sans KR, 영문/숫자는 Inter를 사용합니다.">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase font-eng tracking-wide2 text-gray-400 mb-2">
                Display 1 · 2.25rem / 700
              </p>
              <p className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                비즈니스 출장의 모든 길, <BrandText />가 함께합니다
              </p>
            </div>
            <div>
              <p className="text-xs uppercase font-eng tracking-wide2 text-gray-400 mb-2">
                Heading · 1.5rem / 700
              </p>
              <p className="text-2xl font-bold text-gray-900">기업 출장의 양방향 전문가</p>
            </div>
            <div>
              <p className="text-xs uppercase font-eng tracking-wide2 text-gray-400 mb-2">
                Eng Subheading · Inter 500
              </p>
              <p className="font-eng font-medium text-lg lg:text-xl text-amber-600">
                Premium Inbound Experience for Your Global VIPs in Korea.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase font-eng tracking-wide2 text-gray-400 mb-2">
                Body · 0.9375rem / 1.7
              </p>
              <p className="text-[15px] leading-relaxed text-gray-600 max-w-2xl">
                항공·호텔·의전·투어까지, 비즈니스 여정의 모든 단계에서 가장 신뢰할 수 있는
                파트너가 되겠습니다.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase font-eng tracking-wide2 text-gray-400 mb-2">
                Caption · 0.75rem / 500 / wide2
              </p>
              <p className="text-sm font-eng font-bold text-gray-400 uppercase tracking-wide2">
                숫자로 보는 <BrandText />
              </p>
            </div>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button>출장 항공 견적 받기</Button>
            <Button variant="blue">Inbound Tour 문의</Button>
            <div className="bg-ink-900 p-3 rounded">
              <Button variant="outlineLight">Outline Light</Button>
            </div>
            <Button variant="ghost">Ghost</Button>
            <Button size="pill" variant="blue">
              빠른 견적 요청
            </Button>
            <Button size="sm">Small</Button>
            <Button font="eng">Plan Your VIP Experience →</Button>
          </div>
        </Block>

        <Block title="Form Controls">
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            <div>
              <FormLabel required>회사명</FormLabel>
              <Input placeholder="소속 회사명" />
            </div>
            <div>
              <FormLabel>직책</FormLabel>
              <Input placeholder="직책 (선택)" />
            </div>
            <div className="md:col-span-2">
              <FormLabel>문의 내용</FormLabel>
              <Textarea placeholder="자유롭게 남겨주세요." />
            </div>
            <div className="md:col-span-2 space-y-3">
              <Radio name="demo" label="Corporate Travel" defaultChecked />
              <Radio name="demo" label="Inbound Tour" />
              <Radio name="demo" label="기타 문의" />
            </div>
            <Checkbox id="sg-consent" label="개인정보 수집 및 이용에 동의합니다." />
          </div>
        </Block>

        <Block title="Icon Badges">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <IconBadge tone="blueSoft" className="mb-2">
                <GlobeIcon />
              </IconBadge>
              <p className="text-xs text-gray-500">blueSoft</p>
            </div>
            <div>
              <IconBadge tone="amberSoft" className="mb-2">
                <ClockIcon />
              </IconBadge>
              <p className="text-xs text-gray-500">amberSoft</p>
            </div>
            <div>
              <IconBadge tone="blueRingSoft" size="sm" className="mb-2">
                <PhoneIcon />
              </IconBadge>
              <p className="text-xs text-gray-500">blueRingSoft / sm</p>
            </div>
            <div>
              <IconBadge tone="neutral" size="sm" className="mb-2">
                <MailIcon />
              </IconBadge>
              <p className="text-xs text-gray-500">neutral / sm</p>
            </div>
          </div>
        </Block>

        <Block title="Stats" description="IntersectionObserver 기반의 카운터 애니메이션이 포함됩니다.">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat target={15} suffix="년+" label="현장 경험" color="green" />
            <Stat target={1800} suffix="+" label="기업 출장 건수" color="green" />
            <Stat target={3500} suffix="+" label="해외 VIP 고객수" color="amber" />
            <Stat staticValue="24h" label="긴급 대응 체계" color="amber" />
          </div>
        </Block>

        <Block title="Section Heading">
          <SectionHeading
            title="빠른 회신, MustGo가 드립니다."
            subtitle="Premium Inbound Experience"
            description="영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다."
          />
        </Block>

        <Block title="Cards">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Light Card</h4>
              <p className="text-sm text-gray-600">
                기본 카드입니다. 흰색 배경 + 회색 테두리 + soft shadow.
              </p>
            </Card>
            <div className="bg-ink-800 p-6 rounded-lg">
              <Card variant="dark">
                <h4 className="text-lg font-bold text-white mb-2">Dark Card</h4>
                <p className="text-sm text-gray-400">
                  다크 섹션 위에서 사용하는 반투명 카드입니다.
                </p>
              </Card>
            </div>
            <div className="bg-ink-900 p-6 rounded-lg">
              <AudienceCard
                title="Audience Card"
                subtitle="A composition pattern with a top accent border."
                quote="Top-accent variants come in blue, amber, or green."
                accent="blue"
              />
            </div>
          </div>
        </Block>

        <Block title="Marketing Components">
          <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard icon={<GlobeIcon />} title="P1. 양방향 전문성" description="Outbound와 Inbound를 동시에 운영." />
              <FeatureCard icon={<StarIcon />} title="P2. VIP 디테일" description="임원 출장과 해외 의전 투어로 다져진 디테일." />
              <FeatureCard icon={<ClockIcon />} title="P3. 24/7 컨시어지" badgeTone="amberSoft" description="시차에 관계없이 즉시 응답." />
            </div>

            <div className="bg-ink-800 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <ServiceCard title='"최적의 항공권"' description="GDS, 기업 특가, 비즈니스/퍼스트 컨설팅" />
                <ServiceCard title='"24/7 비상 대응"' description="긴급 변경, 위기 대응, 비상 콜센터" />
              </div>
            </div>

            <div className="bg-ink-900 rounded-lg p-8">
              <ProcessSteps steps={['요청', '제안', '확정', '동행', '정산']} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ImageCard
                image="https://images.unsplash.com/photo-1549174122-8353e1a66a36?auto=format&fit=crop&q=80"
                alt="VIP Concierge"
                eyebrow="S1. VIP Concierge"
                description="공항 영접, 프리미엄 차량, 통역, 일정 매니지먼트"
              />
              <ImageCard
                image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
                alt="MICE"
                eyebrow="S4. MICE Operation"
                description="컨퍼런스, 인센티브, 전시회, 갈라 디너"
              />
            </div>

            <Card className="max-w-md">
              <h4 className="text-lg font-bold text-gray-900 mb-8 border-b pb-4">Contact Info</h4>
              <div className="space-y-8">
                <ContactInfoItem
                  icon={<PhoneIcon />}
                  eyebrow="Phone"
                  label="02-000-0000"
                  helper="평일 09:00 - 18:00"
                />
                <ContactInfoItem icon={<PinIcon />} eyebrow="Address">
                  <p className="text-[15px] font-medium text-gray-900">
                    서울특별시 강남구 테헤란로 000, 00층
                  </p>
                </ContactInfoItem>
              </div>
            </Card>
          </div>
        </Block>

        <Block title="Animations">
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <Card>
              <p className="font-bold text-gray-900 mb-2">ds-fade / useFadeIn</p>
              <p>
                IntersectionObserver가 30px 아래에서 위로 0.8s 안에 fade-in. 모든 섹션
                도입부와 카드에 사용됩니다.
              </p>
            </Card>
            <Card>
              <p className="font-bold text-gray-900 mb-2">useCounter</p>
              <p>
                requestAnimationFrame + ease-out (1 - 2^(-10t/d)). Stat 컴포넌트가 자동 호출.
              </p>
            </Card>
            <Card>
              <p className="font-bold text-gray-900 mb-2">hero-crossfade</p>
              <p>4장의 풀블리드 이미지를 8초씩 32초 루프로 크로스페이드.</p>
            </Card>
            <Card>
              <p className="font-bold text-gray-900 mb-2">ds-cta-menu</p>
              <p>플로팅 CTA hover 시 메뉴를 위로 슬라이드 + opacity 전환.</p>
            </Card>
          </div>
        </Block>
      </Container>
    </div>
  )
}
