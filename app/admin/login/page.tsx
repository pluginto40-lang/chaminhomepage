'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌸</div>
          <h1 className="text-2xl font-bold text-[#3d2c2c]">채민이 홈페이지 관리자</h1>
          <p className="text-sm text-[#3d2c2c]/60 mt-1">관리자 계정으로 로그인하세요</p>
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-2xl shadow-md border border-[#FFB5C8]/30 p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF8FAB] hover:bg-[#FFB5C8] disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
            >
              {loading ? '로그인 중...' : '로그인 🌸'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#3d2c2c]/40 mt-6">
          채민아, 사랑해 ❤️
        </p>
      </div>
    </div>
  )
}
