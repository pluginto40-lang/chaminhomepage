import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
  written_at: string
  is_public: boolean
  created_at: string
}

interface LetterCardProps {
  post: Post
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export default function LetterCard({ post }: LetterCardProps) {
  return (
    <Link href={`/letters/${post.id}`} className="block group">
      <div className="bg-[#FFF9F5] border border-[#FFB5C8]/30 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#FFB5C8]/60 transition-all duration-200 group-hover:translate-y-[-2px]">
        <p className="text-xs text-[#FF8FAB] font-medium mb-2">
          ✉️ {formatDate(post.written_at)}
        </p>
        <h3 className="text-lg font-bold text-[#3d2c2c] mb-3 group-hover:text-[#FF8FAB] transition-colors">
          {post.title}
        </h3>
        <p
          className="text-sm text-[#3d2c2c]/70 leading-relaxed"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.content}
        </p>
        <div className="mt-4 flex justify-end">
          <span className="text-xs text-[#FFB5C8] group-hover:text-[#FF8FAB] transition-colors">
            더 읽기 →
          </span>
        </div>
      </div>
    </Link>
  )
}
