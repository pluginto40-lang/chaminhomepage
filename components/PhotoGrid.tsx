"use client"

import { useState } from "react"
import { Photo } from "@/lib/types"
import PhotoModal from "./PhotoModal"

interface PhotoGridProps {
  photos: Photo[]
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [selected, setSelected] = useState<Photo | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-pink"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.caption ?? "채민이 사진"}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {selected && (
        <PhotoModal photo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
