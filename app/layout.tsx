import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import TanStackProvider from '../components/TanStackProvider/TanStackProvider'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

type RootLayoutProps = {
  children: ReactNode
  modal: ReactNode
}

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub helps you create, organize, and manage your personal notes efficiently.',
  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub helps you create, organize, and manage your personal notes efficiently.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub application preview',
      },
    ],
  },
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  )
}
