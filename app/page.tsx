import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Post } from "@/lib/types"
import HeroSection from "@/components/HeroSection"

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, content, written_at")
    .eq("is_public", true)
    .order("written_at", { ascending: false })
    .limit(3)

  const recentPosts = (posts ?? []) as Pick<Post, "id" | "title" | "content" | "written_at">[]

  return (
    <div className="min-h-screen bg-cream">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 탄생 스토리 카드 */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-xl font-bold text-[#3d2c2c] mb-5">✨ 탄생 스토리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-pink-light rounded-2xl shadow-sm p-6 text-center">
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-bold text-[#3d2c2c] mb-1">태어난 날</h3>
            <p className="text-[#7a5a5a] text-sm">2025년 6월 4일</p>
          </div>
          <div className="bg-mint-light rounded-2xl shadow-sm p-6 text-center">
            <div className="text-4xl mb-3">👨‍👩‍👧</div>
            <h3 className="font-bold text-[#3d2c2c] mb-1">첫 만남</h3>
            <p className="text-[#7a5a5a] text-sm">엄마 아빠의 보물</p>
          </div>
          <div className="bg-cream-warm rounded-2xl shadow-sm p-6 text-center border border-pink-light">
            <div className="text-4xl mb-3">💌</div>
            <h3 className="font-bold text-[#3d2c2c] mb-1">채민이에게</h3>
            <p className="text-[#7a5a5a] text-sm">사랑해, 우리 아가</p>
          </div>
        </div>
      </section>

      {/* 최근 편지 섹션 */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#3d2c2c]">💌 최근 편지</h2>
          <Link href="/letters" className="text-sm text-pink-dark hover:underline font-medium">
            모두 보기 →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-pink-light p-12 text-center">
            <p className="text-5xl mb-4">💌</p>
            <p className="text-[#9a7a7a] text-base">아직 편지가 없어요.</p>
            <p className="text-[#bba0a0] text-sm mt-1">
              곧 채민이에게 첫 편지가 도착할 거예요 🌸
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/letters/${post.id}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-pink-light p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                  <p className="text-xs text-[#bba0a0] mb-2">
                    {new Date(post.written_at).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="font-bold text-[#3d2c2c] mb-2 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-[#7a5a5a] text-sm line-clamp-3 leading-relaxed">
                    {post.content.slice(0, 100)}
                    {post.content.length > 100 && "…"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
