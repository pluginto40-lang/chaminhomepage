'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <button
      onClick={logout}
      className="w-full mt-auto px-4 py-2.5 text-sm font-medium text-[#FF8FAB] border border-[#FFB5C8] rounded-xl hover:bg-[#FFB5C8]/10 transition-colors text-left"
    >
      🚪 로그아웃
    </button>
  )
}
