'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MapPin, Clock, Users } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Masjid Directory</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-primary-600 transition-colors">
              Find Masjid
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-primary-600 transition-colors">
              Register Masjid
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary">
              Register Masjid
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-primary-600 transition-colors">
                Find Masjid
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-primary-600 transition-colors">
                Register Masjid
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link href="/login" className="block text-gray-700 hover:text-primary-600 transition-colors mb-2">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary inline-block">
                  Register Masjid
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
