'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isAuthenticated, removeAuthCookie } from "@/lib/auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false) // to avoid hydration mismatch
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    
    // Check authentication status
    const checkAuth = () => {
      const authStatus = isAuthenticated()
      setIsAuth(authStatus)
      
      if (!authStatus) {
        // Clean up any remaining auth cookies and redirect
        removeAuthCookie()
        router.replace('/login')
      }
    }

    // Initial check
    checkAuth()

    // Set up interval to check auth status every 30 seconds
    // This will handle automatic logout when cookie expires
    const interval = setInterval(checkAuth, 30000)

    return () => clearInterval(interval)
  }, [router])

  if (!isClient) return null // avoid hydration mismatch

  // Show loading or redirect if not authenticated
  if (!isAuth) {
    return null
  }

  return <>{children}</>
}
