'use client'

import { useState } from 'react'
import { Search, MapPin, Filter } from 'lucide-react'
import Link from 'next/link'

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const popularCities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Your Local Masjid
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search for mosques by name, location, or city to find accurate prayer times and community information.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Masjid Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter masjid name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* City Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="input-field pl-10 appearance-none"
                  >
                    <option value="">Select City</option>
                    {popularCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <Link 
                href={`/search?q=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedCity)}`}
                className="btn-primary flex items-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Masjids
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Popular Cities
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {popularCities.slice(0, 8).map((city) => (
              <Link
                key={city}
                href={`/search?city=${encodeURIComponent(city)}`}
                className="px-4 py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-600 rounded-full transition-colors duration-200"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Registered Masjids</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Cities Covered</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">10k+</h3>
            <p className="text-gray-600">Monthly Searches</p>
          </div>
        </div>
      </div>
    </section>
  )
}
