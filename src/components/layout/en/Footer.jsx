import { Link } from 'react-router-dom'
import { NOTICE_PATH } from '../PrivacyIncidentBanner'
import { BrandText } from '../../ui'
import { BUSINESS } from '../../../data/business'

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
                <BrandText /> — Your Two-Way Business Travel Specialist
              </p>
              <p className="text-sm text-gray-500 font-eng">
                Your Trusted Partner in Two-Way Business Travel.
              </p>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-sm text-gray-400 mb-1 font-eng">
              {BUSINESS.en.name} | CEO: {BUSINESS.en.ceo} | Business Reg. No. {BUSINESS.en.regNo}
            </p>
            <p className="text-sm text-gray-400 mb-1 font-eng">
              Address: {BUSINESS.en.address}
            </p>
            <p className="text-sm text-gray-400 mb-2 font-eng">
              Tel: {BUSINESS.en.phone} | Email: {BUSINESS.en.email} | Mail-Order Business Reg. No.{' '}
              {BUSINESS.en.mailOrderNo}
            </p>
            <p className="text-sm mb-2 font-eng">
              <Link
                to="/terms#en"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-gray-600 mx-2">·</span>
              <Link
                to="/privacy#en"
                className="text-gray-300 font-semibold hover:text-amber-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600 mx-2">·</span>
              <Link
                to="/policy"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Payment &amp; Refund Policy
              </Link>
              <span className="text-gray-600 mx-2">·</span>
              <Link
                to={NOTICE_PATH.en}
                className="text-gray-300 font-semibold hover:text-amber-500 transition-colors"
              >
                Data Breach Notice
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
