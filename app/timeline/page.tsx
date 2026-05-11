import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Milestone } from "@/lib/types"

export const revalidate = 60

export default async function TimelinePage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("milestones")
    .select("*")
    .order("occurred_at", { ascending: false })

  const milestones = (data ?? []) as Milestone[]

  return (
    <main className="min-h-screen bg-cream">
      {/* 네비게이션 */}
      <nav className="bg-cream-warm/80 backdrop-blur-sm border-b border-pink-light sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-pink-dark">
            🌸 채민이의 세상
          </Link>
          <div className="flex gap-5 text-sm font-medium text-[#7a5a5a]">
            <Link href="/gallery" className="hover:text-pink-dark transition-colors">
              사진첩
            </Link>
            <Link href="/timeline" className="text-pink-dark font-semibold">
              타임라인
            </Link>
            <Link href="/letters" className="hover:text-pink-dark transition-colors">
              편지함
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🌱</span>
          <h1 className="text-3xl font-bold text-[#3d2c2c] mb-2">채민이 타임라인</h1>
          <p className="text-[#9a7a7a]">하루하루 자라나는 채민이의 이야기</p>
        </div>

        {milestones.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-pink-light p-16 text-center">
            <p className="text-6xl mb-5">🌱</p>
            <p className="text-[#9a7a7a] text-lg font-medium">아직 기록이 없어요</p>
            <p className="text-[#bba0a0] text-sm mt-2">
              채민이의 첫 번째 이정표를 기다리고 있어요 🌸
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* 세로 선 */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-light via-mint-light to-pink-light" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative flex gap-6">
                  {/* 타임라인 점 */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md border-2 border-white ${
                        index % 2 === 0 ? "bg-pink-light" : "bg-mint-light"
                      }`}
                    >
                      {milestone.emoji}
                    </div>
                  </div>

                  {/* 내용 카드 */}
                  <div className="flex-1 bg-white rounded-2xl shadow-sm border border-pink-light p-5 mb-2">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-[#3d2c2c] text-base leading-snug">
                        {milestone.title}
                      </h3>
                      <span className="text-xs text-[#bba0a0] whitespace-nowrap flex-shrink-0 mt-0.5">
                        {new Date(milestone.occurred_at).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {milestone.description && (
                      <p className="text-[#7a5a5a] text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="text-center py-8 text-[#bba0a0] text-sm border-t border-pink-light mt-8">
        <p>🌸 이채민의 세상 · 2025년부터 영원히</p>
      </footer>
    </main>
  )
}
