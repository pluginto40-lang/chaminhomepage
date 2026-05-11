"use client"

import { useEffect, useState } from "react"

const BIRTH_DATE = new Date("2025-06-04T00:00:00+09:00")

export default function DayCounter({ dark = false }: { dark?: boolean }) {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    const now = new Date()
    const diff = Math.floor(
      (now.getTime() - BIRTH_DATE.getTime()) / (1000 * 60 * 60 * 24)
    )
    setDays(diff + 1)
  }, [])

  if (days === null) return null

  return (
    <span className={`inline-block px-5 py-1.5 rounded-full text-lg font-semibold shadow-sm tracking-wide ${
      dark
        ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
        : 'bg-pink text-white'
    }`}>
      D+{days}
    </span>
  )
}
