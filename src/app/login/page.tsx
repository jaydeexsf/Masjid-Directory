'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to sign in')
      }

      // Use auth context to login
      login(data.user, data.token)

      // Redirect based on role
      if (data.user.role === 'super_admin' || data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/admin')
      }

    } catch (err: any) {
      setError(err?.message || 'Failed to sign in')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-600 mb-6">Welcome back. Sign in to manage your masjid.</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" required placeholder="your@email.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input name="password" type="password" required placeholder="••••••••" className="input-field" />
              </div>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm text-gray-600">
                  <input type="checkbox" name="remember" className="mr-2 w-4 h-4" /> Remember me
                </label>
                <Link href="#" className="text-sm text-primary-600">Forgot password?</Link>
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-6 text-center">
              Don t have an account? <Link href="/register" className="text-primary-600">Register your masjid</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
