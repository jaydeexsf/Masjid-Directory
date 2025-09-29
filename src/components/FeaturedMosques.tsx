'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mosque } from '@/types'

export default function FeaturedMosques() {
  const [mosques, setMosques] = useState<Mosque[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/mosques')
        const data = await res.json()
        setMosques((data.mosques || []).slice(0, 6))
      } catch (e) {
        setMosques([])
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Featured Masjids</h2>
            <p className="text-gray-600">Recently added and popular listings</p>
          </div>
          <Link href="/search" className="btn-secondary">Browse All</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : mosques.length === 0 ? (
          <div className="text-center text-gray-600">No mosques found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mosques.map((m) => (
              <div key={m._id} className="rounded-xl border border-gray-200 p-5 bg-white hover:shadow-md transition">
                <div className="text-lg font-semibold text-gray-900 mb-1">{m.name}</div>
                <div className="text-sm text-gray-600 mb-2">{m.address}, {m.city}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Jumuah: {(m as any).jumuah || 'See page'}</div>
                  <Link href={`/mosque/${m._id}`} className="btn-primary text-sm">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


