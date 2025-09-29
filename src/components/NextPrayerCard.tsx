'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

function parseTimeToDate(time: string) {
  if (!/^[0-2]?\d:[0-5]\d$/.test(time)) return null
  const [h, m] = time.split(':').map(Number)
  const d = new Date(); d.setHours(h, m, 0, 0)
  return d
}

export default function NextPrayerCard() {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null)
  const [nearest, setNearest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState<string>('')

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLoading(false)
    )
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/mosques')
        const data = await res.json()
        const list = data.mosques || []
        if (loc && list.length) {
          const withDist = list.map((m: any) => {
            const dx = (m.latitude || 0) - loc.lat
            const dy = (m.longitude || 0) - loc.lng
            const d2 = Math.sqrt(dx*dx + dy*dy)
            return { ...m, _dist: d2 }
          })
          withDist.sort((a: any, b: any) => a._dist - b._dist)
          setNearest(withDist[0])
        } else {
          setNearest(list[0] || null)
        }
      } catch {}
      setLoading(false)
    }
    fetchData()
  }, [loc])

  const nextIqamah = useMemo(() => {
    if (!nearest) return null
    const todayTimes = [nearest?.fajr, nearest?.dhuhr, nearest?.asr, nearest?.maghrib, nearest?.isha].filter(Boolean)
    const now = new Date()
    for (const t of todayTimes) {
      const d = parseTimeToDate(String(t))
      if (d && d.getTime() > now.getTime()) return d
    }
    return parseTimeToDate(String(todayTimes[todayTimes.length - 1] || ''))
  }, [nearest])

  useEffect(() => {
    if (!nextIqamah) return
    const id = setInterval(() => {
      const now = new Date().getTime()
      const diff = Math.max(0, nextIqamah.getTime() - now)
      const mm = Math.floor(diff / 60000)
      const ss = Math.floor((diff % 60000) / 1000)
      setCountdown(`${mm}m ${ss}s`)
    }, 1000)
    return () => clearInterval(id)
  }, [nextIqamah])

  return (
    <section className="py-8 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Next Prayer Near You</div>
            {loading ? (
              <div className="text-lg font-semibold text-gray-900">Locating…</div>
            ) : nearest ? (
              <div className="text-lg font-semibold text-gray-900">{nearest.name} — in {countdown || '—'}</div>
            ) : (
              <div className="text-lg font-semibold text-gray-900">No masjids found</div>
            )}
          </div>
          <div>
            {nearest ? (
              <Link href={`/mosque/${nearest._id}`} className="btn-primary">View</Link>
            ) : (
              <Link href="/search" className="btn-secondary">Search</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


