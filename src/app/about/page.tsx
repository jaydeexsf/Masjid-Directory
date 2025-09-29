'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Users, MapPin, Clock, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Masjid Directory</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We help Muslims discover local masjids, accurate prayer times, and community events—so staying connected to your community is effortless.
            </p>
          </section>

          {/* Mission */}
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-600">
                Build a trustworthy, modern directory for masjids worldwide, empowering communities with verified information, easy discovery, and a beautiful user experience.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Accuracy and reliability of information</li>
                <li>Accessibility and simplicity for all users</li>
                <li>Community-first features and privacy</li>
              </ul>
            </div>
          </section>

          {/* What we offer */}
          <section className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Masjid Discovery</h3>
              <p className="text-gray-600 text-sm">Find masjids by name, city, and location—quickly and reliably.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Prayer Times</h3>
              <p className="text-gray-600 text-sm">Accurate daily salah times and Jumuah—kept up to date by admins.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Community Events</h3>
              <p className="text-gray-600 text-sm">Stay informed with halaqas, youth nights, and more near you.</p>
            </div>
          </section>

          {/* Call to action */}
          <section className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-100 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">List your masjid</h3>
            <p className="text-gray-600 mb-6">Are you an admin? Register your masjid to share prayer times and events with your community.</p>
            <a href="/register" className="btn-primary">Register Masjid</a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
