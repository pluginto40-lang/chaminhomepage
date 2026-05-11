import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Post } from "@/lib/types"

export const revalidate = 60

export default async function LettersPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("posts")
    .select("id, title, content, written_at")
    .eq("is_public", true)
    .order("written_at", { ascending: false })

  const posts = (data ?? []) as Pick<Post, "id" | "title" | "content" | "written_at">[]

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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">💌</span>
          <h1 className="text-3xl font-bold text-[#3d2c2c] mb-2">채민이에게 보내는 편지</h1>
          <p className="text-[#9a7a7a]">사랑을 담아 쓴 편지들이에요</p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-pink-light p-16 text-center">
            <p className="text-6xl mb-5">💌</p>
            <p className="text-[#9a7a7a] text-lg font-medium">아직 편지가 없어요</p>
            <p className="text-[#bba0a0] text-sm mt-2">
              채민이에게 따뜻한 첫 편지를 기다리고 있어요 🌸
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link key={post.id} href={`/letters/${post.id}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-pink-light p-6 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full flex flex-col">
                  <p className="text-xs text-[#bba0a0] mb-3">
                    {new Date(post.written_at).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-bold text-[#3d2c2c] text-base mb-3 line-clamp-2 flex-shrink-0">
                    {post.title}
                  </h2>
                  <p className="text-[#7a5a5a] text-sm leading-relaxed line-clamp-4 flex-1">
                    {post.content.slice(0, 100)}
                    {post.content.length > 100 && "…"}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-xs text-pink-dark font-medium">
                      읽기 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="text-center py-8 text-[#bba0a0] text-sm border-t border-pink-light mt-8">
        <p>🌸 이채민의 세상 · 2025년부터 영원히</p>
      </footer>
    </main>
  )
}
