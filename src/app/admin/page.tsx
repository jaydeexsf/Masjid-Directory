'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dev-only: read localStorage flag set by login
    try {
      const role = typeof window !== 'undefined' ? localStorage.getItem('authRole') : null
      setIsAuthenticated(role === 'admin')
    } catch {}
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <main className="py-8">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Login Required</h1>
              <p className="text-gray-600 mb-6">
                Please sign in to access the admin dashboard.
              </p>
              <a href="/login" className="btn-primary">
                Sign In
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
