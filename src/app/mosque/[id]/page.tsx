'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MosqueDetails from '@/components/MosqueDetails'
import { Mosque } from '@/types'

export default function MosquePage() {
  const params = useParams()
  const [mosque, setMosque] = useState<Mosque | null>(null)
  const [loading, setLoading] = useState(true)
  const [salahTimes, setSalahTimes] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchMosqueDetails()
  }, [params.id])

  const fetchMosqueDetails = async () => {
    try {
      const response = await fetch(`/api/mosques/${params.id}`)
      const data = await response.json()
      
      if (data.success) {
        setMosque(data.mosque)
        setSalahTimes(data.salahTimes)
        setEvents(data.upcomingEvents || [])
      }
    } catch (error) {
      console.error('Error fetching mosque details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!mosque) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mosque Not Found</h1>
            <p className="text-gray-600 mb-8">The mosque you're looking for doesn't exist or has been removed.</p>
            <a href="/search" className="btn-primary">Browse All Mosques</a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MosqueDetails 
            mosque={mosque} 
            salahTimes={salahTimes} 
            events={events}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
