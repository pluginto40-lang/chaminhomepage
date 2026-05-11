import { headers } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

const adminNavLinks = [
  { href: '/admin/dashboard', label: '📊 대시보드' },
  { href: '/admin/write', label: '✏️ 글쓰기' },
  { href: '/admin/photos', label: '📷 사진' },
  { href: '/admin/milestones', label: '⭐ 타임라인' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  // 로그인 페이지는 사이드바 없이 그대로 렌더링
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      <Link
        href="/"
        aria-label="메인 페이지로 돌아가기"
        title="메인 페이지로 돌아가기"
        className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#FFB5C8]/50 bg-white/90 text-xl shadow-sm transition-colors hover:border-[#FF8FAB] hover:bg-[#FFF0E8]"
      >
        🏠
      </Link>
      {/* 모바일 상단 네비게이션 */}
      <div className="md:hidden bg-white border-b border-[#FFB5C8]/30 px-4 py-3">
        <p className="text-sm font-bold text-[#FF8FAB] mb-2">🌸 관리자 패널</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {adminNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-[#3d2c2c] bg-[#FFF0E8] rounded-full hover:bg-[#FFB5C8]/30 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* 데스크탑 사이드바 */}
        <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-[#FFB5C8]/30 p-5 sticky top-0 self-start h-screen">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#FF8FAB]">🌸 관리자 패널</h2>
            <p className="text-xs text-[#3d2c2c]/50 mt-0.5">채민이의 세상</p>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-[#3d2c2c] rounded-xl hover:bg-[#FFB5C8]/20 hover:text-[#FF8FAB] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <LogoutButton />
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-4 md:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
