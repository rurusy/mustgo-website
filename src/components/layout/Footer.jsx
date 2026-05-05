import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-ink-900 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-layout mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-12 mb-8 gap-8">
          <div className="max-w-sm">
            <div className="inline-flex items-center bg-white rounded px-3 py-2 mb-4">
              <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Mustgo — 비즈니스 출장의 양방향 전문가</p>
            <p className="text-sm text-gray-500 font-eng">
              Your Trusted Partner in Two-Way Business Travel.
            </p>
          </div>

          <div className="text-sm text-gray-400 space-y-2 lg:text-center">
            <p>(주)머스트고 | 대표이사: 이종화 | 사업자등록번호: 000-00-00000</p>
            <p>관광사업등록번호: 제202X-000000호 | 통신판매업신고: 제202X-서울강남-0000호</p>
            <p>영업보증보험: 0억원 가입 | 기획여행보증보험: 0억원 가입</p>
          </div>

          <div className="flex space-x-6 text-sm text-gray-300 font-medium">
            <a href="#" className="hover:text-amber-500 transition-colors">이용약관</a>
            <a href="#" className="hover:text-amber-500 transition-colors font-bold">개인정보처리방침</a>
            <a href="#" className="hover:text-amber-500 transition-colors">여행약관</a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-600 font-eng">
          <span>© 2026 Mustgo Co., Ltd. All Rights Reserved.</span>
          <span className="text-gray-700">·</span>
          <Link
            to="/admin/login"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
