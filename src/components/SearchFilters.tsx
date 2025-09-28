'use client'

import { useState } from 'react'
import { Search, MapPin, Filter, X } from 'lucide-react'

interface SearchFiltersProps {
  filters: {
    city: string
    name: string
    hasJumuah: boolean
  }
  setFilters: (filters: any) => void
}

export default function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const popularCities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte'
  ]

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    setFilters({ city: '', name: '', hasJumuah: false })
  }

  const hasActiveFilters = filters.city || filters.name || filters.hasJumuah

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Search by Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter masjid name..."
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter city..."
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>
          
          {/* Popular Cities */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Popular Cities:</p>
            <div className="flex flex-wrap gap-1">
              {popularCities.slice(0, 6).map((city) => (
                <button
                  key={city}
                  onClick={() => handleFilterChange('city', city)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    filters.city === city
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Filters
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.hasJumuah}
                onChange={(e) => handleFilterChange('hasJumuah', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Has Jumuah Prayer</span>
            </label>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
