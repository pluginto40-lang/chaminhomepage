'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/gallery', label: '갤러리' },
  { href: '/timeline', label: '타임라인' },
  { href: '/letters', label: '편지' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#FFB5C8]/30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link
            href="/"
            className="text-xl font-bold text-[#FF8FAB] hover:text-[#FFB5C8] transition-colors"
          >
            🌸 채민이의 세상
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#3d2c2c] hover:text-[#FF8FAB] font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FFB5C8] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="text-sm text-[#bba0a0] hover:text-[#FF8FAB] font-medium transition-colors border border-[#FFB5C8]/40 rounded-full px-3 py-1 hover:border-[#FFB5C8]"
            >
              관리자
            </Link>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="sm:hidden p-2 rounded-lg text-[#FF8FAB] hover:bg-[#FFB5C8]/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 열기"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isOpen && (
        <div className="sm:hidden bg-white/95 border-t border-[#FFB5C8]/20 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-[#3d2c2c] hover:text-[#FF8FAB] font-medium border-b border-[#FFB5C8]/10 last:border-0 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="block py-3 text-[#bba0a0] hover:text-[#FF8FAB] font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            관리자
          </Link>
        </div>
      )}
    </nav>
  )
}
