'use client'

import { useRouter } from 'next/navigation'
import { removeAuthCookie } from '@/lib/auth'
import toast from 'react-hot-toast'

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    removeAuthCookie()
    toast.success('Logged out successfully')
    router.replace('/login')
  }

  return { logout }
}
