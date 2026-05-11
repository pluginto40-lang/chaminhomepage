import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: postsCount },
    { count: photosCount },
    { count: milestonesCount },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('photos').select('*', { count: 'exact', head: true }),
    supabase.from('milestones').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      label: '편지',
      count: postsCount ?? 0,
      emoji: '✉️',
      bg: 'bg-[#FFD6E0]',
      border: 'border-[#FFB5C8]',
    },
    {
      label: '사진',
      count: photosCount ?? 0,
      emoji: '📷',
      bg: 'bg-[#D6F5F0]',
      border: 'border-[#B5E8E0]',
    },
    {
      label: '타임라인',
      count: milestonesCount ?? 0,
      emoji: '⭐',
      bg: 'bg-[#FFF0E8]',
      border: 'border-[#FFB5C8]/50',
    },
  ]

  const quickLinks = [
    { href: '/admin/write', label: '✏️ 편지 쓰기', desc: '채민이에게 새 편지 작성' },
    { href: '/admin/photos', label: '📷 사진 업로드', desc: '채민이 사진 추가' },
    { href: '/admin/milestones', label: '⭐ 성장 기록 추가', desc: '소중한 순간을 기록' },
  ]

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#3d2c2c]">
          안녕하세요! 채민이의 세상을 관리해요 🌸
        </h1>
        <p className="text-sm text-[#3d2c2c]/60 mt-1">
          오늘도 채민이의 소중한 순간들을 기록해 주세요
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-6 text-center`}
          >
            <div className="text-4xl mb-2">{stat.emoji}</div>
            <div className="text-3xl font-bold text-[#3d2c2c]">{stat.count}</div>
            <div className="text-sm text-[#3d2c2c]/70 mt-0.5 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 빠른 링크 */}
      <div>
        <h2 className="text-base font-bold text-[#3d2c2c] mb-3">빠른 메뉴</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white border border-[#FFB5C8]/30 rounded-2xl p-5 hover:border-[#FFB5C8] hover:shadow-md transition-all group"
            >
              <p className="text-base font-bold text-[#3d2c2c] group-hover:text-[#FF8FAB] transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-[#3d2c2c]/60 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
