'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    const form = new FormData(e.currentTarget)

    try {
      // Placeholder submit; replace with an API route if needed
      await new Promise((r) => setTimeout(r, 800))
      setStatus('Thank you. Your message has been sent!')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('Failed to send message. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Questions, feedback, or partnership ideas? Send us a message and we’ll get back to you.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center"><Mail className="w-5 h-5 text-primary-600" /></div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">support@masjid.directory</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center"><Phone className="w-5 h-5 text-primary-600" /></div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">+1 (555) 000-1234</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center"><MapPin className="w-5 h-5 text-primary-600" /></div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">123 Community Way, Demo City, DC</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input name="name" required placeholder="Your name" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="email" required type="email" placeholder="you@example.com" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input name="subject" required placeholder="How can we help?" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" required rows={6} placeholder="Write your message..." className="input-field"></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">We’ll reply within 1–2 business days.</p>
                  <button disabled={submitting} className="btn-primary flex items-center disabled:opacity-60">
                    <Send className="w-4 h-4 mr-2" /> {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {status && (
                  <div className="text-sm mt-2 {status.includes('Thank') ? 'text-green-600' : 'text-red-600'}">{status}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
