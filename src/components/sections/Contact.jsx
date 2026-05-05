import { useMemo, useState } from 'react'
import { Section, Fade, FormLabel, Input, Textarea, Radio, Checkbox, Button, Card, BrandText } from '../ui'
import { ContactInfoItem } from '../marketing/ContactInfoItem'
import { PhoneIcon, AlertIcon, MailIcon, PinIcon } from '../icons.jsx'
import { supabase } from '../../lib/supabase'

// Single source of truth for the HQ address: keep display copy and the
// map-search query in sync (otherwise pin/marker drifts from what the user reads).
const HQ = {
  display: '(42250) 대구광역시 수성구 알파시티 1로 31길 19, 5F',
  mapQuery: '대구광역시 수성구 알파시티1로31길 19',
  building: 'MG 뉴턴 알파시티',
}

// Use the official Maps Embed API when a key is configured; fall back to the
// keyless ?output=embed URL so dev still works without provisioning a key.
function getMapsEmbedSrc() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const q = encodeURIComponent(HQ.mapQuery)
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}&zoom=16&language=ko&region=KR`
  }
  return `https://www.google.com/maps?q=${q}&z=16&output=embed`
}

// Lightweight client-side validation. We use loose patterns intentionally —
// strict regexes give false negatives on legitimate inputs and are user-hostile.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_DIGITS_MIN = 9 // 02-XXX-XXXX (서울 9자리) 이상 허용

export function Contact() {
  // env 값은 빌드 타임에 고정되므로 한 번만 계산.
  const mapsSrc = useMemo(() => getMapsEmbedSrc(), [])
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

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
      setErrorMsg('개인정보 수집·이용에 동의해주세요.')
      return
    }

    if (!EMAIL_RE.test(payload.email)) {
      setStatus('error')
      setErrorMsg('이메일 형식을 확인해주세요. (예: name@example.com)')
      return
    }

    const phoneDigits = payload.phone.replace(/\D/g, '')
    if (phoneDigits.length < PHONE_DIGITS_MIN) {
      setStatus('error')
      setErrorMsg('연락처를 다시 한 번 확인해주세요.')
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
      setErrorMsg('전송에 실패했습니다. 잠시 후 다시 시도해주세요.')
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
      <Fade className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          빠른 회신, <BrandText />가 드립니다.
        </h2>
        <p className="text-gray-600 text-[15px]">
          영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다.
        </p>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">문의가 정상적으로 접수되었습니다.</h3>
              <p className="text-sm text-gray-600 mb-8">
                영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신드립니다.
              </p>
              <Button type="button" variant="ghost" size="sm" onClick={sendAnother}>
                다른 문의 추가로 보내기
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-4">
                  문의 유형 <span className="text-amber-600">*</span>
                </label>
                <div className="space-y-3">
                  <Radio
                    name="inquiry_type"
                    value="corporate"
                    label="Corporate Travel — 해외 출장 문의"
                    defaultChecked
                  />
                  <Radio
                    name="inquiry_type"
                    value="inbound"
                    label="Inbound Tour — 해외 VIP 한국 방문 문의"
                  />
                  <Radio name="inquiry_type" value="other" label="기타 — 제휴 또는 기타 문의" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <FormLabel htmlFor="company" required>회사명</FormLabel>
                  <Input id="company" name="company" type="text" placeholder="소속 회사명" required />
                </div>
                <div>
                  <FormLabel htmlFor="name" required>담당자 성명</FormLabel>
                  <Input id="name" name="name" type="text" placeholder="성함" required />
                </div>
                <div>
                  <FormLabel htmlFor="position">직책</FormLabel>
                  <Input id="position" name="position" type="text" placeholder="직책 (선택)" />
                </div>
                <div>
                  <FormLabel htmlFor="phone" required>연락처</FormLabel>
                  <Input id="phone" name="phone" type="tel" placeholder="휴대폰 또는 내선번호" required />
                </div>
              </div>

              <div className="mb-6">
                <FormLabel htmlFor="email" required>이메일</FormLabel>
                <Input id="email" name="email" type="email" placeholder="업무용 이메일 주소" required />
              </div>

              <div className="mb-8">
                <FormLabel htmlFor="message">문의 내용</FormLabel>
                <Textarea id="message" name="message" placeholder="출장 인원, 일정, 특이사항 등을 자유롭게 남겨주세요." />
              </div>

              <Checkbox
                id="consent"
                name="consent"
                label="개인정보 수집 및 이용에 동의합니다. (필수)"
                className="mb-6"
              />

              {status === 'error' && errorMsg && (
                <p className="text-sm text-red-600 mb-4" role="alert">
                  {errorMsg}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? '전송 중…' : '문의 보내기'}
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
                eyebrow="Phone"
                label="053-255-5992"
                helper="평일 09:00 - 18:00"
              />

              <ContactInfoItem
                icon={<AlertIcon />}
                eyebrow="24/7 Emergency Line"
                label="계약 기업 전용 핫라인 제공"
                eyebrowAccent
                badgeTone="blueRingSoft"
              />

              <ContactInfoItem icon={<MailIcon />} eyebrow="Email">
                <p className="text-[15px] font-medium text-gray-900 font-eng">
                  jhlee@mustgokorea.com
                </p>
              </ContactInfoItem>

              <ContactInfoItem icon={<PinIcon />} eyebrow="Address" grow>
                <p className="text-[15px] font-medium text-gray-900 mb-1">{HQ.display}</p>
                <p className="text-xs text-gray-500 mb-4">{HQ.building}</p>
                <div className="w-full flex-grow min-h-[200px] rounded overflow-hidden border border-gray-200">
                  <iframe
                    title={`${HQ.building} 위치`}
                    src={mapsSrc}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </ContactInfoItem>
            </div>
          </Card>
        </Fade>
      </div>
    </Section>
  )
}
