'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from '@/lib/store/authStore'
import { checkSession, getMe } from '@/lib/api/clientApi'

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true)

  const setUser = useAuthStore((state) => state.setUser)
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  )

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkSession()
        const user = await getMe()
        setUser(user)
      } catch {
        clearIsAuthenticated()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [setUser, clearIsAuthenticated])

  if (loading) {
    return null
  }

  return <>{children}</>
}
