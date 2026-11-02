import { Link } from 'react-router-dom'
import { BrandText } from '../ui'
import { BUSINESS } from '../../data/business'
import { NOTICE_PATH } from './PrivacyIncidentBanner'

export function Footer() {
  return (
    <footer className="bg-ink-900 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-layout mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center bg-white rounded px-3 py-2 shrink-0">
              <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                <BrandText /> — 비즈니스 출장의 양방향 전문가
              </p>
              <p className="text-sm text-gray-500 font-eng">
                Your Trusted Partner in Two-Way Business Travel.
              </p>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-sm text-gray-400 mb-1">
              상호: {BUSINESS.ko.name} | 대표자: {BUSINESS.ko.ceo} | 사업자등록번호: {BUSINESS.ko.regNo}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              사업장 주소: {BUSINESS.ko.address}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              대표전화: {BUSINESS.ko.phone} | 통신판매업 신고번호: {BUSINESS.ko.mailOrderNo}
            </p>
            <p className="text-sm mb-2">
              <Link
                to="/terms"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                이용약관
              </Link>
              <span className="text-gray-600 mx-2">·</span>
              <Link
                to="/privacy"
                className="text-gray-300 font-semibold hover:text-amber-500 transition-colors"
              >
                개인정보처리방침
              </Link>
              <span className="text-gray-600 mx-2">·</span>
              <Link
                to="/policy#ko"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                결제·환불 정책
              </Link>
              <span className="text-gray-600 mx-2">·</span>
              <Link
                to={NOTICE_PATH.ko}
                className="text-gray-300 font-semibold hover:text-amber-500 transition-colors"
              >
                개인정보 유출 안내
              </Link>
            </p>
            <p className="text-xs text-gray-600 font-eng mb-1">
              © 2026 Mustgo Co., Ltd. All Rights Reserved.
            </p>
            <Link
              to="/admin/login"
              className="text-xs text-gray-600 font-eng hover:text-amber-500 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
