import { useEffect, useMemo, useState } from 'react'
import { Section, Fade, FormLabel, Input, Textarea, Radio, Checkbox, Button, Card, BrandText } from '../ui'
import { ContactInfoItem } from '../marketing/ContactInfoItem'
import { PhoneIcon, AlertIcon, MailIcon, PinIcon } from '../icons.jsx'
import { supabase } from '../../lib/supabase'
import { cn } from '../../design/cn'

// Single source of truth for each office address: keep display copy and the
// map-search query in sync (otherwise pin/marker drifts from what the user reads).
// Korean display + romanized English display share ONE mapQuery (always Korean,
// so Google Maps resolves the correct pin regardless of page language).
const OFFICES = [
  {
    key: 'hq',
    label: '대구사무소',
    labelEn: 'Daegu Office',
    region: '대구',
    regionEn: 'Daegu',
    tradeName: '(주)머스트고',
    tradeNameEn: 'Mustgo Co., Ltd.',
    tradeNameColor: 'text-brand-blue', // 로고의 'g' 색상
    display: '(42250) 대구광역시 수성구 알파시티 1로 31길 19, 5F',
    displayEn: '5F, 19, Alpha City 1-ro 31-gil, Suseong-gu, Daegu 42250, Republic of Korea',
    mapQuery: '대구광역시 수성구 알파시티1로31길 19',
    building: 'MG 뉴턴 알파시티',
    buildingEn: 'MG Newton Alpha City',
  },
  {
    key: 'seoul',
    label: '서울사무소',
    labelEn: 'Seoul Office',
    region: '서울',
    regionEn: 'Seoul',
    tradeName: '(주)위머스트고',
    tradeNameEn: 'WeMustgo Co., Ltd.',
    display: '서울특별시 종로구 창경궁로 256, 4층 에이치-19호',
    displayEn: '#H-19, 4F, 256, Changgyeonggung-ro, Jongno-gu, Seoul, Republic of Korea',
    mapQuery: '서울특별시 종로구 창경궁로 256',
    building: '명륜2가, 선남빌딩',
    buildingEn: 'Myeongnyun 2-ga, Seonnam Bldg.',
    businessNumber: '156-88-03929',
  },
]

// Use the official Maps Embed API when a key is configured; fall back to the
// keyless ?output=embed URL so dev still works without provisioning a key.
function getMapsEmbedSrc(mapQuery, lang = 'ko') {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const q = encodeURIComponent(mapQuery)
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}&zoom=16&language=${lang}&region=KR`
  }
  return `https://www.google.com/maps?q=${q}&z=16&output=embed`
}

// Lightweight client-side validation. We use loose patterns intentionally —
// strict regexes give false negatives on legitimate inputs and are user-hostile.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_DIGITS_MIN = 9 // 02-XXX-XXXX (서울 9자리) 이상 허용

// Hoisted to module scope so re-renders (status / inquiryType changes) don't
// re-allocate fragments + spans for static label markup.
const radioLabels = {
  ko: {
    corporate: (
      <>
        Corporate Travel
        <span className="hidden sm:inline"> — 해외 출장 문의</span>
        <span className="sm:hidden"> (해외 출장 문의)</span>
      </>
    ),
    inbound: (
      <>
        Inbound Tour
        <span className="hidden sm:inline"> — 해외 VIP 한국 방문 문의</span>
        <span className="sm:hidden"> (해외 VIP 한국 방문 문의)</span>
      </>
    ),
    other: (
      <>
        기타
        <span className="hidden sm:inline"> — 제휴 또는 기타 문의</span>
        <span className="sm:hidden"> (제휴 또는 기타 문의)</span>
      </>
    ),
  },
  en: {
    corporate: (
      <>
        Corporate Travel
        <span className="hidden sm:inline"> — Overseas business trips</span>
        <span className="sm:hidden"> (Overseas business trips)</span>
      </>
    ),
    inbound: (
      <>
        Inbound Tour
        <span className="hidden sm:inline"> — VIP visits to Korea</span>
        <span className="sm:hidden"> (VIP visits to Korea)</span>
      </>
    ),
    other: (
      <>
        Other
        <span className="hidden sm:inline"> — Partnership or general inquiry</span>
        <span className="sm:hidden"> (Partnership or general inquiry)</span>
      </>
    ),
  },
}

const CONTACT_COPY = {
  ko: {
    heading: (
      <>
        빠른 회신,<br className="sm:hidden" /> <BrandText />가 드립니다.
      </>
    ),
    sub: '영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다.',
    inquiryType: '문의 유형',
    company: '회사명',
    companyPh: '소속 회사명',
    name: '담당자 성명',
    namePh: '성함',
    position: '직책',
    positionPh: '직책 (선택)',
    phone: '연락처',
    phonePh: '휴대폰 또는 내선번호',
    email: '이메일',
    emailPh: '업무용 이메일 주소',
    message: '문의 내용',
    messagePh: '출장 인원, 일정, 특이사항 등을 자유롭게 남겨주세요.',
    consent: (
      <>
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="underline hover:text-brand-blue"
        >
          개인정보 수집 및 이용
        </a>
        에 동의합니다. (필수)
      </>
    ),
    submit: '문의 보내기',
    submitting: '전송 중…',
    errConsent: '개인정보 수집·이용에 동의해주세요.',
    errEmail: '이메일 형식을 확인해주세요. (예: name@example.com)',
    errPhone: '연락처를 다시 한 번 확인해주세요.',
    errSubmit: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
    successTitle: '문의가 정상적으로 접수되었습니다.',
    successBody: '영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신드립니다.',
    sendAnother: '다른 문의 추가로 보내기',
    phoneEyebrow: 'Phone',
    phoneHelper: '평일 09:00 - 18:00',
    emergencyEyebrow: '24/7 Emergency Line',
    emergencyLabel: '계약 기업 전용 핫라인 제공',
    emailEyebrow: 'Email',
    addressEyebrow: 'Address',
    bizNo: '사업자등록번호',
    mapSuffix: '위치',
  },
  en: {
    heading: (
      <>
        A Fast Reply<br className="sm:hidden" /> from <BrandText />.
      </>
    ),
    sub: 'A dedicated consultant will personally reply within one business day.',
    inquiryType: 'Inquiry type',
    company: 'Company',
    companyPh: 'Your company name',
    name: 'Contact name',
    namePh: 'Full name',
    position: 'Title',
    positionPh: 'Title (optional)',
    phone: 'Phone',
    phonePh: 'Mobile or extension',
    email: 'Email',
    emailPh: 'Work email address',
    message: 'Message',
    messagePh: 'Feel free to share the number of travelers, schedule, and any special notes.',
    consent: (
      <>
        I agree to the{' '}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="underline hover:text-brand-blue"
        >
          collection and use of my personal information
        </a>
        . (Required)
      </>
    ),
    submit: 'Send Inquiry',
    submitting: 'Sending…',
    errConsent: 'Please agree to the collection and use of your personal information.',
    errEmail: 'Please check your email format. (e.g. name@example.com)',
    errPhone: 'Please double-check your phone number.',
    errSubmit: 'Something went wrong. Please try again in a moment.',
    successTitle: 'Your inquiry has been received.',
    successBody: 'A dedicated consultant will personally reply within one business day.',
    sendAnother: 'Send another inquiry',
    phoneEyebrow: 'Phone',
    phoneHelper: 'Weekdays 09:00 – 18:00 (KST)',
    emergencyEyebrow: '24/7 Emergency Line',
    emergencyLabel: 'Dedicated hotline for contracted clients',
    emailEyebrow: 'Email',
    addressEyebrow: 'Address',
    bizNo: 'Business Reg. No.',
    mapSuffix: 'location',
  },
}

export function Contact({ lang = 'ko' }) {
  const t = CONTACT_COPY[lang]
  const labels = radioLabels[lang]

  // env 값은 빌드 타임에 고정되므로 lang 별로만 재계산.
  const officesWithMaps = useMemo(
    () =>
      OFFICES.map((o) => ({
        ...o,
        mapsSrc: getMapsEmbedSrc(o.mapQuery, lang),
        dLabel: lang === 'en' ? o.labelEn : o.label,
        dRegion: lang === 'en' ? o.regionEn : o.region,
        dTradeName: o.tradeName ? (lang === 'en' ? o.tradeNameEn : o.tradeName) : null,
        dDisplay: lang === 'en' ? o.displayEn : o.display,
        dBuilding: lang === 'en' ? o.buildingEn : o.building,
      })),
    [lang],
  )
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [inquiryType, setInquiryType] = useState('corporate')

  // Hero CTA 등 외부에서 dispatch 한 prefill 이벤트를 수신해서 문의 유형 자동 선택.
  // 이전 제출이 success 상태였다면 폼을 다시 보여주도록 idle 로 리셋.
  useEffect(() => {
    const handler = (e) => {
      const type = e.detail?.type
      if (type !== 'corporate' && type !== 'inbound' && type !== 'other') return
      setInquiryType(type)
      setStatus('idle')
      setErrorMsg('')
    }
    window.addEventListener('mustgo:prefill-inquiry', handler)
    return () => window.removeEventListener('mustgo:prefill-inquiry', handler)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      inquiry_type: fd.get('inquiry_type') || 'other',
      company: (fd.get('company') || '').toString().trim(),
      name: (fd.get('name') || '').toString().trim(),
      position: (fd.get('position') || '').toString().trim() || null,
      phone: (fd.get('phone') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      message: (fd.get('message') || '').toString().trim() || null,
      consent: fd.get('consent') === 'on',
    }

    if (!payload.consent) {
      setStatus('error')
      setErrorMsg(t.errConsent)
      return
    }

    if (!EMAIL_RE.test(payload.email)) {
      setStatus('error')
      setErrorMsg(t.errEmail)
      return
    }

    const phoneDigits = payload.phone.replace(/\D/g, '')
    if (phoneDigits.length < PHONE_DIGITS_MIN) {
      setStatus('error')
      setErrorMsg(t.errPhone)
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    // submit_inquiry 는 SECURITY DEFINER 함수로, anon 키로 호출 가능하지만
    // SELECT/UPDATE 는 인증된 관리자만 가능하도록 RLS 로 차단되어 있습니다.
    const { error } = await supabase.rpc('submit_inquiry', { payload })

    if (error) {
      console.error('[contact] submit_inquiry failed:', error)
      setStatus('error')
      setErrorMsg(t.errSubmit)
      return
    }

    form.reset()
    setStatus('success')
  }

  const sendAnother = () => {
    setStatus('idle')
    setErrorMsg('')
  }

  return (
    <Section id="contact" tone="soft">
      <Fade className="max-w-3xl mx-auto mb-16 text-left sm:text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          {t.heading}
        </h2>
        <p className="text-gray-600 text-[15px]">{t.sub}</p>
      </Fade>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        <Fade>
          {status === 'success' ? (
            <div className="bg-white p-10 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-green/10 text-brand-green mb-6">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
              <p className="text-sm text-gray-600 mb-8">{t.successBody}</p>
              <Button type="button" variant="ghost" size="sm" onClick={sendAnother}>
                {t.sendAnother}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="mb-8">
                <FormLabel size="md" required className="mb-4">{t.inquiryType}</FormLabel>
                <div className="space-y-3">
                  <Radio
                    name="inquiry_type"
                    value="corporate"
                    label={labels.corporate}
                    checked={inquiryType === 'corporate'}
                    onChange={() => setInquiryType('corporate')}
                  />
                  <Radio
                    name="inquiry_type"
                    value="inbound"
                    label={labels.inbound}
                    checked={inquiryType === 'inbound'}
                    onChange={() => setInquiryType('inbound')}
                  />
                  <Radio
                    name="inquiry_type"
                    value="other"
                    label={labels.other}
                    checked={inquiryType === 'other'}
                    onChange={() => setInquiryType('other')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <FormLabel htmlFor="company" required>{t.company}</FormLabel>
                  <Input id="company" name="company" type="text" placeholder={t.companyPh} required />
                </div>
                <div>
                  <FormLabel htmlFor="name" required>{t.name}</FormLabel>
                  <Input id="name" name="name" type="text" placeholder={t.namePh} required />
                </div>
                <div>
                  <FormLabel htmlFor="position">{t.position}</FormLabel>
                  <Input id="position" name="position" type="text" placeholder={t.positionPh} />
                </div>
                <div>
                  <FormLabel htmlFor="phone" required>{t.phone}</FormLabel>
                  <Input id="phone" name="phone" type="tel" placeholder={t.phonePh} required />
                </div>
              </div>

              <div className="mb-6">
                <FormLabel htmlFor="email" required>{t.email}</FormLabel>
                <Input id="email" name="email" type="email" placeholder={t.emailPh} required />
              </div>

              <div className="mb-8">
                <FormLabel htmlFor="message">{t.message}</FormLabel>
                <Textarea id="message" name="message" placeholder={t.messagePh} />
              </div>

              <Checkbox
                id="consent"
                name="consent"
                label={t.consent}
                className="mb-6"
              />

              {status === 'error' && errorMsg && (
                <p className="text-sm text-red-600 mb-4" role="alert">
                  {errorMsg}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? t.submitting : t.submit}
              </Button>
            </form>
          )}
        </Fade>

        <Fade>
          <Card className="h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-8 border-b pb-4">Contact Info</h3>

            <div className="flex flex-col gap-8 flex-grow">
              <ContactInfoItem
                icon={<PhoneIcon />}
                eyebrow={t.phoneEyebrow}
                label="1551-5992"
                helper={t.phoneHelper}
              />

              <ContactInfoItem
                icon={<AlertIcon />}
                eyebrow={t.emergencyEyebrow}
                label={t.emergencyLabel}
                eyebrowAccent
                badgeTone="blueRingSoft"
              />

              <ContactInfoItem icon={<MailIcon />} eyebrow={t.emailEyebrow}>
                <p className="text-[15px] font-medium text-gray-900 font-eng">
                  wemustgo@mustgokorea.com
                </p>
              </ContactInfoItem>

              <ContactInfoItem icon={<PinIcon />} eyebrow={t.addressEyebrow} grow>
                <div className="flex flex-col gap-6 flex-grow">
                  {officesWithMaps.map((office) => (
                    <div key={office.key} className="flex flex-col">
                      <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <span>{office.dLabel}</span>
                        <span className="text-[11px] font-normal text-gray-400 font-eng tracking-wider uppercase">
                          {office.dRegion}
                        </span>
                      </p>
                      {office.dTradeName && (
                        <p className={cn('text-[15px] font-medium mb-1', office.tradeNameColor || 'text-brand-green')}>
                          {office.dTradeName}
                        </p>
                      )}
                      <p className="text-[15px] font-medium text-gray-900 mb-1">{office.dDisplay}</p>
                      <p className="text-xs text-gray-500">{office.dBuilding}</p>
                      {office.businessNumber && (
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="text-gray-400 mr-1">{t.bizNo}</span>
                          <span className="font-eng">{office.businessNumber}</span>
                        </p>
                      )}
                      <div className="mb-3" />
                      <div className="w-full min-h-[180px] rounded overflow-hidden border border-gray-200">
                        <iframe
                          title={`${office.dBuilding} ${t.mapSuffix}`}
                          src={office.mapsSrc}
                          className="w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ContactInfoItem>
            </div>
          </Card>
        </Fade>
      </div>
    </Section>
  )
}
