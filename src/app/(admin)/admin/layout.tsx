'use client'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const [isClient, setIsClient] = useState(false) // to avoid hydration mismatch
//   const router = useRouter()

//   useEffect(() => {
//     setIsClient(true)
//     const isAuth = localStorage.getItem('isAuthenticated')
//     if (isAuth !== 'true') {
//       router.replace('/login')
//     }
//   }, [router])

//   if (!isClient) return null // avoid hydration mismatch

  return <>{children}</>
}
