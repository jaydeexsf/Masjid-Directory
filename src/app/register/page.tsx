'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MosqueRegistrationForm from '@/components/MosqueRegistrationForm'

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: any) => {
    console.log('Starting mosque registration process...')
    console.log('Form data received:', {
      mosqueName: formData.name,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      adminEmail: formData.adminEmail,
      adminName: formData.adminName,
      hasLocation: !!(formData.latitude && formData.longitude)
    })
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      console.log('Sending registration request to API...')
      const response = await fetch('/api/mosques', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Registration API response status:', response.status)
      const data = await response.json()
      console.log('Registration API response data:', data)

      if (data.success) {
        console.log('Registration successful! Redirecting to success page...')
        console.log('Created mosque ID:', data.mosque?._id)
        console.log('Created user ID:', data.user?._id)
        router.push('/register/success')
      } else {
        console.error('Registration failed:', data.error)
        throw new Error(data.error || 'Failed to register mosque')
      }
    } catch (error) {
      console.error('Registration error details:', {
        error: error,
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
      const errorMessage = error instanceof Error ? error.message : 'Failed to register mosque. Please try again.'
      setError(errorMessage)
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      console.log('Registration process completed')
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-red-800 font-semibold">Registration Failed</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

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
