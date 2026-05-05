import { Section, Fade, FormLabel, Input, Textarea, Radio, Checkbox, Button, Card, BrandText } from '../ui'
import { ContactInfoItem } from '../marketing/ContactInfoItem'
import { PhoneIcon, AlertIcon, MailIcon, PinIcon } from '../icons.jsx'

const HQ_ADDRESS = '대구광역시 수성구 알파시티1로31길 19'

// Use the official Maps Embed API when a key is configured; fall back to the
// keyless ?output=embed URL so dev still works without provisioning a key.
function getMapsEmbedSrc() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const q = encodeURIComponent(HQ_ADDRESS)
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}&zoom=16&language=ko&region=KR`
  }
  return `https://www.google.com/maps?q=${q}&z=16&output=embed`
}

export function Contact() {
  const mapsSrc = getMapsEmbedSrc()
  return (
    <Section id="contact" tone="soft">
      <Fade className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          가장 빠른 답변, <BrandText />가 드립니다.
        </h2>
        <p className="text-gray-600 text-[15px]">
          영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다.
        </p>
      </Fade>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        <Fade>
          <form className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
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
                  <FormLabel required>회사명</FormLabel>
                  <Input type="text" placeholder="소속 회사명" />
                </div>
                <div>
                  <FormLabel required>담당자 성명</FormLabel>
                  <Input type="text" placeholder="성함" />
                </div>
                <div>
                  <FormLabel>직책</FormLabel>
                  <Input type="text" placeholder="직책 (선택)" />
                </div>
                <div>
                  <FormLabel required>연락처</FormLabel>
                  <Input type="tel" placeholder="휴대폰 또는 내선번호" />
                </div>
              </div>

              <div className="mb-6">
                <FormLabel required>이메일</FormLabel>
                <Input type="email" placeholder="업무용 이메일 주소" />
              </div>

              <div className="mb-8">
                <FormLabel>문의 내용</FormLabel>
                <Textarea placeholder="출장 인원, 일정, 특이사항 등을 자유롭게 남겨주세요." />
              </div>

              <Checkbox
                id="consent"
                label="개인정보 수집 및 이용에 동의합니다. (필수)"
                className="mb-8"
              />

              <Button type="button" className="w-full">
                문의 보내기
              </Button>
          </form>
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
                <p className="text-[15px] font-medium text-gray-900 mb-1">
                  (42250) 대구광역시 수성구 알파시티 1로 31길 19, 5F
                </p>
                <p className="text-xs text-gray-500 mb-4">MG 뉴턴 알파시티</p>
                <div className="w-full flex-grow min-h-[200px] rounded overflow-hidden border border-gray-200">
                  <iframe
                    title="MG 뉴턴 알파시티 위치"
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
