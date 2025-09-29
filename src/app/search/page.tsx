'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchResults from '@/components/SearchResults'
import SearchFilters from '@/components/SearchFilters'
import { Mosque } from '@/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [mosques, setMosques] = useState<Mosque[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    name: searchParams.get('q') || '',
  })

  useEffect(() => {
    fetchMosques()
  }, [filters])

  const fetchMosques = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (filters.name) queryParams.append('name', filters.name)
      if (filters.city) queryParams.append('city', filters.city)

      const response = await fetch(`/api/mosques?${queryParams}`)
      const data = await response.json()
      setMosques(data.mosques || [])
    } catch (error) {
      console.error('Error fetching mosques:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Your Local Masjid
            </h1>
            <p className="text-xl text-gray-600">
              Discover mosques in your area with accurate prayer times and community information.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <SearchFilters filters={filters} setFilters={setFilters} />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <SearchResults mosques={mosques} loading={loading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
