"use client"

import { useEffect } from "react"
import { Photo } from "@/lib/types"

interface PhotoModalProps {
  photo: Photo
  onClose: () => void
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.caption ?? "채민이 사진"}
          className="w-full object-cover max-h-[70vh]"
        />
        <div className="p-5">
          {photo.caption && (
            <p className="text-[#3d2c2c] font-medium mb-1">{photo.caption}</p>
          )}
          {photo.taken_at && (
            <p className="text-[#bba0a0] text-sm">
              {new Date(photo.taken_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <button
            onClick={onClose}
            className="mt-4 px-5 py-2 rounded-full bg-pink-light text-[#3d2c2c] text-sm font-medium hover:bg-pink transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
