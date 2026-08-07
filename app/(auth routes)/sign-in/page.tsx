import type { Metadata } from 'next'
import SignInForm from '@/components/SignInPage/SignInPage'

export const metadata: Metadata = {
  title: 'Sign in | NoteHub',
  description: 'Log in to your NoteHub account to manage your notes.',
  openGraph: {
    title: 'Sign in | NoteHub',
    description: 'Log in to your NoteHub account to manage your notes.',
    url: 'https://notehub.com/sign-in',
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

export default function SignInPage() {
  return <SignInForm />
}
