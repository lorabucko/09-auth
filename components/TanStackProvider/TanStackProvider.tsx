'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface TanStackProviderProps {
  children: ReactNode
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
  // Один QueryClient на всё приложение
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Можно отключить лишние refetch'и, чтобы вести себя как в задании
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
