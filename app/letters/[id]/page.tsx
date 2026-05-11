import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Post } from "@/lib/types"

export const revalidate = 60

interface Props {
  params: { id: string }
}

export default async function LetterDetailPage({ params }: Props) {
  const { id } = params
  const supabase = await createClient()

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("is_public", true)
    .single()

  if (!data) {
    notFound()
  }

  const post = data as Post

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
            <Link href="/timeline" className="hover:text-pink-dark transition-colors">
              타임라인
            </Link>
            <Link href="/letters" className="text-pink-dark font-semibold">
              편지함
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 뒤로가기 */}
        <Link
          href="/letters"
          className="inline-flex items-center gap-1 text-sm text-[#9a7a7a] hover:text-pink-dark transition-colors mb-8"
        >
          ← 편지함으로 돌아가기
        </Link>

        {/* 편지 카드 */}
        <article className="bg-white rounded-3xl shadow-md border border-pink-light overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-br from-pink-light to-mint-light px-8 py-8 text-center">
            <p className="text-4xl mb-4">💌</p>
            <h1 className="text-2xl font-bold text-[#3d2c2c] leading-snug">
              {post.title}
            </h1>
            <p className="text-[#9a7a7a] text-sm mt-3">
              {new Date(post.written_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* 본문 */}
          <div className="px-8 py-8">
            <div className="text-[#5a3f3f] leading-loose text-base whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* 하단 장식 */}
          <div className="px-8 pb-8 text-center">
            <p className="text-pink text-2xl">🌸 💕 🌸</p>
          </div>
        </article>

        {/* 하단 뒤로가기 */}
        <div className="text-center mt-8">
          <Link
            href="/letters"
            className="inline-block bg-pink-light hover:bg-pink text-[#3d2c2c] px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
          >
            다른 편지 보기
          </Link>
        </div>
      </div>

      <footer className="text-center py-8 text-[#bba0a0] text-sm border-t border-pink-light mt-8">
        <p>🌸 이채민의 세상 · 2025년부터 영원히</p>
      </footer>
    </main>
  )
}
