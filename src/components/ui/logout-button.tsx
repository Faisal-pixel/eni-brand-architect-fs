'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/useLogout'

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function LogoutButton({ 
  variant = 'outline', 
  size = 'default',
  className 
}: LogoutButtonProps) {
  const { logout } = useLogout()

  return (
    <Button
      onClick={logout}
      variant={variant}
      size={size}
      className={className}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  )
}
