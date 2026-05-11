import Image from 'next/image'
import DayCounter from './DayCounter'

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] bg-[#FFF0E8] overflow-hidden">

      <div className="flex flex-col sm:flex-row min-h-[100svh]">

        {/* 왼쪽: 텍스트 (45%) */}
        <div className="sm:w-[45%] flex flex-col justify-center px-10 sm:px-16 lg:px-20 pt-24 pb-12 sm:py-20 order-2 sm:order-1">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a8a8] mb-5 font-medium">
            Lee Chaemin · 2025
          </p>
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-[#3d2c2c] mb-5 tracking-tighter leading-none">
            이채민
          </h1>
          <p className="text-[#7a5a5a] text-base sm:text-lg mb-6 font-light leading-loose">
            2025년 6월 4일,<br />우리 곁에 왔어요 🌸
          </p>
          <div className="mb-8">
            <DayCounter />
          </div>

          {/* 소개 박스 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#FFD6E0]/60 shadow-sm">
            <h2 className="text-lg font-bold text-[#3d2c2c] mb-3">
              안녕, 나는 이채민이야 🌸
            </h2>
            <p className="text-[#6b4f4f] leading-relaxed text-lg">
              2025년 6월 4일, 따뜻한 초여름에 세상에 첫 발을 내딛었어요.
              작고 소중한 손발로 엄마 아빠의 심장을 단번에 사로잡아 버렸답니다. 💕
            </p>
            <p className="text-[#6b4f4f] leading-relaxed text-lg mt-2">
              매일매일 조금씩 자라면서 새로운 것들을 배워가고 있어요. 🌿
            </p>
          </div>
        </div>

        {/* 오른쪽: 사진 (55%) - 더 왼쪽으로 */}
        <div className="sm:w-[55%] order-1 sm:order-2 flex items-center justify-center sm:justify-center sm:pl-8 pt-24 sm:pt-16 pb-8 sm:pb-16">
          <div className="w-[85vw] sm:w-[90%] max-w-[580px] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
            <Image
              src="/hero/chaemin-collage.png"
              alt="이채민 사진 모음"
              width={900}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

      </div>

      {/* SCROLL DOWN */}
      <div className="absolute bottom-8 right-10 hidden sm:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a8a8]">
        <span>Scroll Down</span>
        <span>↓</span>
      </div>

    </section>
  )
}
