'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

interface Milestone {
  id: string
  title: string
  description: string | null
  occurred_at: string
  emoji: string
  created_at: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export default function AdminMilestonesPage() {
  const [emoji, setEmoji] = useState('⭐')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [occurredAt, setOccurredAt] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const fetchMilestones = async () => {
    setLoadingList(true)
    const { data } = await supabase
      .from('milestones')
      .select('*')
      .order('occurred_at', { ascending: false })
    setMilestones(data ?? [])
    setLoadingList(false)
  }

  useEffect(() => {
    fetchMilestones()
  }, [fetchMilestones]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    const { error } = await supabase.from('milestones').insert({
      emoji,
      title,
      description: description || null,
      occurred_at: occurredAt,
    })

    if (error) {
      setError('저장에 실패했습니다: ' + error.message)
      setLoading(false)
      return
    }

    setEmoji('⭐')
    setTitle('')
    setDescription('')
    setOccurredAt(new Date().toISOString().split('T')[0])
    setSuccess(true)
    setLoading(false)
    fetchMilestones()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('이 기록을 삭제하시겠습니까?')) return
    setDeletingId(id)
    await supabase.from('milestones').delete().eq('id', id)
    setMilestones((prev) => prev.filter((m) => m.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#3d2c2c]">⭐ 성장 기록</h1>
        <p className="text-sm text-[#3d2c2c]/60 mt-1">채민이의 소중한 순간들을 타임라인에 기록해요</p>
      </div>

      {/* 추가 폼 */}
      <div className="bg-white rounded-2xl border border-[#FFB5C8]/30 p-6 shadow-sm mb-8">
        <h2 className="text-base font-bold text-[#3d2c2c] mb-4">새 기록 추가</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 이모지 + 제목 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
                이모지
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={4}
                className="w-16 px-3 py-2.5 text-center text-xl rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] bg-[#FFF9F5]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="처음 뒤집기, 첫 옹알이..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
              />
            </div>
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              설명 (선택)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="이 순간에 대해 더 자세히 기록해요..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5] resize-none"
            />
          </div>

          {/* 날짜 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              날짜
            </label>
            <input
              type="date"
              value={occurredAt}
              onChange={(e) => setOccurredAt(e.target.value)}
              required
              className="px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-2.5">
              기록이 추가되었습니다! 🌸
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF8FAB] hover:bg-[#FFB5C8] disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
          >
            {loading ? '저장 중...' : '기록 저장 ⭐'}
          </button>
        </form>
      </div>

      {/* 기록 목록 */}
      <div>
        <h2 className="text-base font-bold text-[#3d2c2c] mb-3">성장 기록 목록</h2>
        {loadingList ? (
          <p className="text-sm text-[#3d2c2c]/60">불러오는 중...</p>
        ) : milestones.length === 0 ? (
          <p className="text-sm text-[#3d2c2c]/60">아직 기록이 없어요</p>
        ) : (
          <div className="flex flex-col gap-3">
            {milestones.map((m) => (
              <div
                key={m.id}
                className="bg-white border border-[#FFB5C8]/30 rounded-2xl p-4 flex items-start gap-3"
              >
                <span className="text-2xl flex-shrink-0">{m.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#FF8FAB] mb-0.5">{formatDate(m.occurred_at)}</p>
                  <p className="text-sm font-bold text-[#3d2c2c]">{m.title}</p>
                  {m.description && (
                    <p className="text-xs text-[#3d2c2c]/60 mt-0.5 leading-relaxed">{m.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(m.id)}
                  disabled={deletingId === m.id}
                  className="flex-shrink-0 text-xs text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors px-2 py-1"
                >
                  {deletingId === m.id ? '...' : '삭제'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
