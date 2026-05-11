interface Milestone {
  id: string
  title: string
  description: string | null
  occurred_at: string
  emoji: string
  created_at: string
}

interface MilestoneItemProps {
  milestone: Milestone
  isLast?: boolean
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export default function MilestoneItem({ milestone, isLast = false }: MilestoneItemProps) {
  return (
    <div className="flex gap-4">
      {/* 타임라인 선과 이모지 */}
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-14 h-14 bg-[#FFD6E0] rounded-full flex items-center justify-center text-2xl shadow-sm border-2 border-[#FFB5C8]">
          {milestone.emoji}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-[#FFB5C8] to-[#B5E8E0] mt-2 min-h-8" />
        )}
      </div>

      {/* 내용 */}
      <div className="pb-8 flex-1 min-w-0">
        <p className="text-xs text-[#FF8FAB] font-medium mb-1">
          {formatDate(milestone.occurred_at)}
        </p>
        <h3 className="text-base font-bold text-[#3d2c2c] mb-1">
          {milestone.title}
        </h3>
        {milestone.description && (
          <p className="text-sm text-[#3d2c2c]/70 leading-relaxed">
            {milestone.description}
          </p>
        )}
      </div>
    </div>
  )
}
