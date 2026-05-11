import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Photo } from "@/lib/types"
import PhotoGrid from "@/components/PhotoGrid"

export const revalidate = 60

function groupByMonth(photos: Photo[]): Record<string, Photo[]> {
  return photos.reduce<Record<string, Photo[]>>((acc, photo) => {
    const key = photo.album_month ?? "기타"
    if (!acc[key]) acc[key] = []
    acc[key].push(photo)
    return acc
  }, {})
}

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("photos")
    .select("*")
    .order("taken_at", { ascending: false })

  const photos = (data ?? []) as Photo[]
  const grouped = groupByMonth(photos)
  const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <main className="min-h-screen bg-cream">
      {/* 네비게이션 */}
      <nav className="bg-cream-warm/80 backdrop-blur-sm border-b border-pink-light sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-pink-dark">
            🌸 채민이의 세상
          </Link>
          <div className="flex gap-5 text-sm font-medium text-[#7a5a5a]">
            <Link href="/gallery" className="text-pink-dark font-semibold">
              사진첩
            </Link>
            <Link href="/timeline" className="hover:text-pink-dark transition-colors">
              타임라인
            </Link>
            <Link href="/letters" className="hover:text-pink-dark transition-colors">
              편지함
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">📷</span>
          <h1 className="text-3xl font-bold text-[#3d2c2c] mb-2">채민이 사진첩</h1>
          <p className="text-[#9a7a7a]">소중한 순간들을 모아두었어요</p>
        </div>

        {photos.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-pink-light p-16 text-center">
            <p className="text-6xl mb-5">📷</p>
            <p className="text-[#9a7a7a] text-lg font-medium">아직 사진이 없어요</p>
            <p className="text-[#bba0a0] text-sm mt-2">
              채민이의 첫 사진을 기다리고 있어요 🌸
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {months.map((month) => (
              <section key={month}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-mint text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                    {month}
                  </span>
                  <span className="text-[#bba0a0] text-sm">
                    {grouped[month].length}장
                  </span>
                </div>
                <PhotoGrid photos={grouped[month]} />
              </section>
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
