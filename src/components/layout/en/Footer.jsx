import { Link } from 'react-router-dom'
import { BrandText } from '../../ui'

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
            <p className="text-sm text-gray-400 mb-2 font-eng">
              Mustgo Co., Ltd. | CEO: Jonghwa Lee | Business Reg. No. 618-81-35992
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
