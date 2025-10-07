'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle } from 'lucide-react'

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for registering your masjid with our directory.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h2 className="font-semibold text-gray-900 mb-3">What happens next?</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">1.</span>
                  <span>Our team will review your masjid registration within 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">2.</span>
                  <span>You'll receive an email confirmation once approved</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">3.</span>
                  <span>You can then log in to manage prayer times and events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">4.</span>
                  <span>Your masjid will appear in our directory for the community</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="btn-primary"
              >
                Back to Home
              </Link>
              <Link 
                href="/login" 
                className="btn-secondary"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
