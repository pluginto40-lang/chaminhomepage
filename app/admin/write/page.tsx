'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminWritePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [writtenAt, setWrittenAt] = useState(new Date().toISOString().split('T')[0])
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.from('posts').insert({
      title,
      content,
      written_at: writtenAt,
      is_public: isPublic,
    })

    if (error) {
      setError('저장에 실패했습니다: ' + error.message)
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#3d2c2c]">✏️ 편지 쓰기</h1>
        <p className="text-sm text-[#3d2c2c]/60 mt-1">채민이에게 소중한 이야기를 남겨요</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#FFB5C8]/30 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="편지 제목을 입력하세요"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
            />
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="채민이에게 전하고 싶은 이야기를 적어주세요..."
              required
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5] resize-none leading-relaxed"
            />
          </div>

          {/* 날짜 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              작성 날짜
            </label>
            <input
              type="date"
              value={writtenAt}
              onChange={(e) => setWrittenAt(e.target.value)}
              required
              className="px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
            />
          </div>

          {/* 공개 여부 */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 rounded accent-[#FF8FAB]"
            />
            <label htmlFor="isPublic" className="text-sm font-medium text-[#3d2c2c]">
              공개 편지로 설정
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 text-sm font-medium text-[#3d2c2c]/60 border border-[#3d2c2c]/20 rounded-xl hover:bg-[#3d2c2c]/5 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-[#FF8FAB] hover:bg-[#FFB5C8] disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
            >
              {loading ? '저장 중...' : '편지 저장 🌸'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
