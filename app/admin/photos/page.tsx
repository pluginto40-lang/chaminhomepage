'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Photo {
  id: string
  url: string
  caption: string | null
  taken_at: string | null
  album_month: string | null
  created_at: string
}

export default function AdminPhotosPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [takenAt, setTakenAt] = useState('')
  const [albumMonth, setAlbumMonth] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loadingPhotos, setLoadingPhotos] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const fetchPhotos = async () => {
    setLoadingPhotos(true)
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    setPhotos(data ?? [])
    setLoadingPhotos(false)
  }

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setError(null)
    setSuccess(false)
    setUploading(true)

    // 1. Storage 업로드
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, file, { upsert: false })

    if (uploadError) {
      setError('파일 업로드 실패: ' + uploadError.message)
      setUploading(false)
      return
    }

    // 2. 공개 URL 가져오기
    const { data: urlData } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName)

    const publicUrl = urlData.publicUrl

    // 3. photos 테이블에 INSERT
    const { error: insertError } = await supabase.from('photos').insert({
      url: publicUrl,
      caption: caption || null,
      taken_at: takenAt || null,
      album_month: albumMonth || null,
    })

    if (insertError) {
      setError('데이터 저장 실패: ' + insertError.message)
      setUploading(false)
      return
    }

    // 초기화
    setFile(null)
    setPreview(null)
    setCaption('')
    setTakenAt('')
    setAlbumMonth('')
    if (fileInputRef.current) fileInputRef.current.value = ''
    setSuccess(true)
    setUploading(false)
    fetchPhotos()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#3d2c2c]">📷 사진 업로드</h1>
        <p className="text-sm text-[#3d2c2c]/60 mt-1">채민이의 소중한 순간을 담아요</p>
      </div>

      {/* 업로드 폼 */}
      <div className="bg-white rounded-2xl border border-[#FFB5C8]/30 p-6 shadow-sm mb-8">
        <form onSubmit={handleUpload} className="flex flex-col gap-5">
          {/* 파일 선택 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-2">
              사진 선택
            </label>
            <div
              className="border-2 border-dashed border-[#FFB5C8]/60 rounded-xl p-6 text-center cursor-pointer hover:border-[#FF8FAB] hover:bg-[#FFD6E0]/10 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden">
                  <Image src={preview} alt="미리보기" fill className="object-cover" />
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-sm text-[#3d2c2c]/60">클릭하여 사진 선택</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              사진 설명 (선택)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="사진에 대한 이야기를 적어주세요"
              className="w-full px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
            />
          </div>

          {/* 촬영일 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              촬영일 (선택)
            </label>
            <input
              type="date"
              value={takenAt}
              onChange={(e) => setTakenAt(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
            />
          </div>

          {/* 앨범 월 */}
          <div>
            <label className="block text-sm font-medium text-[#3d2c2c] mb-1.5">
              앨범 월 (선택)
            </label>
            <input
              type="month"
              value={albumMonth}
              onChange={(e) => setAlbumMonth(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-[#FFB5C8]/50 focus:outline-none focus:border-[#FF8FAB] focus:ring-2 focus:ring-[#FFB5C8]/30 text-sm text-[#3d2c2c] bg-[#FFF9F5]"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-2.5">
              사진이 성공적으로 업로드되었습니다! 🌸
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full py-3 bg-[#FF8FAB] hover:bg-[#FFB5C8] disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-sm"
          >
            {uploading ? '업로드 중...' : '사진 업로드 📷'}
          </button>
        </form>
      </div>

      {/* 기존 사진 목록 */}
      <div>
        <h2 className="text-base font-bold text-[#3d2c2c] mb-3">등록된 사진</h2>
        {loadingPhotos ? (
          <p className="text-sm text-[#3d2c2c]/60">불러오는 중...</p>
        ) : photos.length === 0 ? (
          <p className="text-sm text-[#3d2c2c]/60">아직 사진이 없어요</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden bg-[#FFF0E8]">
                <Image
                  src={photo.url}
                  alt={photo.caption ?? '채민이 사진'}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
