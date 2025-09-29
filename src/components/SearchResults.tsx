'use client'

import { useState } from 'react'
import { MapPin, Clock, Phone, Mail, Globe, Users, Calendar } from 'lucide-react'
import { Mosque } from '@/types'
import Link from 'next/link'

interface SearchResultsProps {
  mosques: Mosque[]
  loading: boolean
}

function computeAdhanFrom12h(time: string): string | null {
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return null
  let [_, hh, mm, ap] = m
  let hours = parseInt(hh, 10)
  const minutes = parseInt(mm, 10)
  if (ap.toUpperCase() === 'PM' && hours !== 12) hours += 12
  if (ap.toUpperCase() === 'AM' && hours === 12) hours = 0
  const d = new Date(); d.setHours(hours, minutes - 15, 0, 0)
  const outH = ((d.getHours() + 11) % 12) + 1
  const outM = d.getMinutes().toString().padStart(2, '0')
  const outAP = d.getHours() >= 12 ? 'PM' : 'AM'
  return `${outH}:${outM} ${outAP}`
}

export default function SearchResults({ mosques, loading }: SearchResultsProps) {
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null)

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (mosques.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Masjids Found</h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your search criteria or browse all available masjids.
        </p>
        <Link href="/search" className="btn-primary">
          Browse All Masjids
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {mosques.length} Masjid{mosques.length !== 1 ? 's' : ''} Found
        </h2>
      </div>

      <div className="grid gap-6">
        {mosques.map((mosque) => (
          <div key={mosque._id} className="card hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Mosque Info */}
              <div className="md:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {mosque.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{mosque.address}, {mosque.city}, {mosque.state}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {mosque.contactInfo.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">{mosque.contactInfo.phone}</span>
                    </div>
                  )}
                  {mosque.contactInfo.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">{mosque.contactInfo.email}</span>
                    </div>
                  )}
                  {mosque.contactInfo.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a 
                        href={mosque.contactInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                {/* Imam Info */}
                <div className="flex items-center mb-4">
                  <Users className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    Imam: {mosque.imam.name}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/mosque/${mosque._id}`}
                    className="btn-primary text-center"
                  >
                    View Details
                  </Link>
                  <Link 
                    href={`/mosque/${mosque._id}`}
                    className="btn-secondary text-center"
                  >
                    <Clock className="w-4 h-4 mr-2 inline" />
                    Prayer Times
                  </Link>
                </div>
              </div>

              {/* Prayer Times Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Today\'s Prayer Times
                </h4>
                <div className="space-y-2 text-sm">
                  {(() => {
                    const fajr = '5:30 AM'; const dhuhr = '12:15 PM'; const asr = '3:45 PM'; const maghrib = '6:20 PM'; const isha = '7:45 PM'; const jumuah = '1:30 PM'
                    return (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fajr</span>
                          <span className="font-medium">{fajr} <span className="text-gray-500">(Adhan {computeAdhanFrom12h(fajr)})</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dhuhr</span>
                          <span className="font-medium">{dhuhr} <span className="text-gray-500">(Adhan {computeAdhanFrom12h(dhuhr)})</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Asr</span>
                          <span className="font-medium">{asr} <span className="text-gray-500">(Adhan {computeAdhanFrom12h(asr)})</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Maghrib</span>
                          <span className="font-medium">{maghrib} <span className="text-gray-500">(Salah after adhan at sunset)</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Isha</span>
                          <span className="font-medium">{isha} <span className="text-gray-500">(Adhan {computeAdhanFrom12h(isha)})</span></span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="text-gray-600">Jumuah</span>
                          <span className="font-medium">{jumuah} <span className="text-gray-500">(Adhan {computeAdhanFrom12h(jumuah)})</span></span>
                        </div>
                      </>
                    )
                  })()}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link 
                    href={`/mosque/${mosque._id}/events`}
                    className="flex items-center text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
