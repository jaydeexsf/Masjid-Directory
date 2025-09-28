'use client'

import { useState } from 'react'
import { MapPin, Clock, Phone, Mail, Globe, Users, Calendar, Navigation } from 'lucide-react'
import { Mosque } from '@/types'
import Link from 'next/link'

interface MosqueDetailsProps {
  mosque: Mosque
  salahTimes: any
  events: any[]
}

export default function MosqueDetails({ mosque, salahTimes, events }: MosqueDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'prayer-times', label: 'Prayer Times' },
    { id: 'events', label: 'Events' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {mosque.name}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{mosque.address}, {mosque.city}, {mosque.state} {mosque.postalCode}</span>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {mosque.contactInfo.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{mosque.contactInfo.phone}</span>
                </div>
              )}
              {mosque.contactInfo.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${mosque.contactInfo.email}`} className="hover:text-primary-600">
                    {mosque.contactInfo.email}
                  </a>
                </div>
              )}
              {mosque.contactInfo.website && (
                <div className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-2" />
                  <a 
                    href={mosque.contactInfo.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary-600"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            {/* Imam Info */}
            <div className="flex items-center mb-6">
              <Users className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-600">
                <strong>Imam:</strong> {mosque.imam.name}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://maps.google.com/?q=${mosque.latitude},${mosque.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </a>
              <button className="btn-secondary flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                View Events
              </button>
            </div>
          </div>

          {/* Prayer Times Card */}
          <div className="bg-gradient-accent rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Today's Prayer Times
            </h3>
            {salahTimes ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Fajr</span>
                  <span className="font-semibold">{salahTimes.fajr}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dhuhr</span>
                  <span className="font-semibold">{salahTimes.dhuhr}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asr</span>
                  <span className="font-semibold">{salahTimes.asr}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maghrib</span>
                  <span className="font-semibold">{salahTimes.maghrib}</span>
                </div>
                <div className="flex justify-between">
                  <span>Isha</span>
                  <span className="font-semibold">{salahTimes.isha}</span>
                </div>
                {salahTimes.jumuah && (
                  <div className="flex justify-between pt-2 border-t border-white/20">
                    <span>Jumuah</span>
                    <span className="font-semibold">{salahTimes.jumuah}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-white/80">Prayer times not available</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-xl">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Masjid</h3>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to {mosque.name}, located in the heart of {mosque.city}. 
                  Our community is dedicated to serving the local Muslim population 
                  with regular prayers, educational programs, and community events.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Daily prayers (5 times)</li>
                    <li>• Jumuah prayer</li>
                    <li>• Islamic education classes</li>
                    <li>• Community events</li>
                    <li>• Marriage ceremonies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Prayer halls for men and women</li>
                    <li>• Wudu facilities</li>
                    <li>• Parking available</li>
                    <li>• Wheelchair accessible</li>
                    <li>• Library and study area</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Prayer Times Tab */}
          {activeTab === 'prayer-times' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prayer Times Schedule</h3>
                {salahTimes ? (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600 mb-1">Fajr</div>
                        <div className="text-lg font-semibold">{salahTimes.fajr}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600 mb-1">Dhuhr</div>
                        <div className="text-lg font-semibold">{salahTimes.dhuhr}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600 mb-1">Asr</div>
                        <div className="text-lg font-semibold">{salahTimes.asr}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600 mb-1">Maghrib</div>
                        <div className="text-lg font-semibold">{salahTimes.maghrib}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600 mb-1">Isha</div>
                        <div className="text-lg font-semibold">{salahTimes.isha}</div>
                      </div>
                      {salahTimes.jumuah && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary-600 mb-1">Jumuah</div>
                          <div className="text-lg font-semibold">{salahTimes.jumuah}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Prayer times not available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-600">{event.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No upcoming events scheduled</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
