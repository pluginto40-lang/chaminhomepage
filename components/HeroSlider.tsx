'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import DayCounter from './DayCounter'

const heroImages = [
  '/hero/KakaoTalk_20260510_161556794_01.jpg',
  '/hero/KakaoTalk_20260510_161556794_04.jpg',
  '/hero/KakaoTalk_20260510_161556794_05.jpg',
  '/hero/KakaoTalk_20260510_161556794_06.jpg',
  '/hero/KakaoTalk_20260510_161556794_09.jpg',
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length)
        setFading(false)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <Image
          src={heroImages[current]}
          alt="채민이"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

      {/* 텍스트 콘텐츠 */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 sm:pb-20 text-white text-center">
        <p className="text-sm sm:text-base tracking-[0.3em] uppercase mb-3 text-white/80 font-light">
          Lee Chaemin
        </p>
        <h1 className="text-6xl sm:text-8xl font-bold mb-3 tracking-tight drop-shadow-md">
          이채민
        </h1>
        <p className="text-base sm:text-lg text-white/90 mb-5 font-light tracking-wide">
          2025년 6월 4일에 세상에 왔어요
        </p>
        <DayCounter dark />
      </div>

      {/* 이미지 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* 스크롤 다운 화살표 */}
      <div className="absolute bottom-8 right-8 text-white/60 animate-bounce hidden sm:block">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
