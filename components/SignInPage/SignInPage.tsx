'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { login } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'
import css from './SignInForm.module.css'

export default function SignInForm() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const [error, setError] = useState('')

  const handleSubmit = async (formData: FormData) => {
    setError('')

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const user = await login({ email, password })
      setUser(user)
      router.push('/notes/filter/all')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Sign in</h1>

        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <Link href="/sign-up" className={css.link}>
              Don&apos;t have an account? Sign up
            </Link>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  )
}
