'use client'

import Link from 'next/link'
import { Search, MapPin, Clock, Users, Calendar } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-primary opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your
                <span className="block gradient-text">Local Masjid</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with your community through accurate congregational (iqamah) times, mosque information, and upcoming events. Built for small masjids without websites—adhan is typically 15 minutes before salah; Maghrib salah begins after the adhan at sunset.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Congregational Times</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Location Finder</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Events</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Community</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/search" className="btn-primary text-center">
                <Search className="w-5 h-5 inline mr-2" />
                Find Your Masjid
              </Link>
              <Link href="/register" className="btn-secondary text-center">
                Register Your Masjid
              </Link>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Circle */}
              <div className="w-80 h-80 mx-auto bg-gradient-accent rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Your</h3>
                    <h3 className="text-2xl font-bold gradient-text">Masjid</h3>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center shadow-lg">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-muted/30 rounded-full flex items-center justify-center shadow-lg">
                <Calendar className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
