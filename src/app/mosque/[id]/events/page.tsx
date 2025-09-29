'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar } from 'lucide-react'

interface EventItem {
  _id: string
  masjidId: string
  title: string
  description: string
  date: string | Date
  time: string
  isRecurring?: boolean
}

export default function MosqueEventsPage() {
  const params = useParams()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/events?masjidId=${params.id}&upcoming=true&limit=50`)
        const data = await res.json()
        setEvents(data.events || [])
      } catch (e) {
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id])

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
              <p className="text-gray-600">Listings for this masjid</p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              <div className="h-16 bg-white/60 rounded-xl animate-pulse" />
              <div className="h-16 bg-white/60 rounded-xl animate-pulse" />
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-600">
              No upcoming events found.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((e) => (
                <div key={e._id} className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{e.title}</h3>
                      <p className="text-gray-600 mt-1">{e.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{new Date(e.date).toLocaleDateString()}</p>
                      <p className="text-gray-600">{e.time}</p>
                      {e.isRecurring && <p className="text-xs text-gray-500 mt-1">Recurring</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
