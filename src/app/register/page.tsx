'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MosqueRegistrationForm from '@/components/MosqueRegistrationForm'

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/mosques', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/register/success')
      } else {
        throw new Error(data.error || 'Failed to register mosque')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Failed to register mosque. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Register Your Masjid
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our community directory and help Muslims find your mosque. 
              Register your masjid to share prayer times, events, and community information.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <MosqueRegistrationForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
