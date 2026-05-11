import Image from 'next/image'

interface Photo {
  id: string
  url: string
  caption: string | null
  taken_at: string | null
  album_month: string | null
  created_at: string
}

interface PhotoCardProps {
  photo: Photo
}

function formatDate(dateStr: string | null): string | null {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={photo.url}
          alt={photo.caption ?? '채민이 사진'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {(photo.caption || photo.taken_at) && (
        <div className="p-3 bg-white">
          {photo.caption && (
            <p className="text-sm text-[#3d2c2c] font-medium leading-snug">
              {photo.caption}
            </p>
          )}
          {photo.taken_at && (
            <p className="text-xs text-[#FF8FAB] mt-1">
              📅 {formatDate(photo.taken_at)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
