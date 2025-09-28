'use client'

import { useState } from 'react'
import { Clock, Calendar, Settings, MapPin, Users, Plus } from 'lucide-react'
import PrayerTimesManager from './PrayerTimesManager'
import EventsManager from './EventsManager'
import MosqueSettings from './MosqueSettings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('prayer-times')

  const tabs = [
    { id: 'prayer-times', label: 'Prayer Times', icon: Clock },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'settings', label: 'Mosque Settings', icon: Settings },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your mosque's information, prayer times, and events</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Masjid Al-Noor</div>
              <div className="text-sm font-medium text-gray-900">New York, NY</div>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-xl">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Prayer Times Tab */}
          {activeTab === 'prayer-times' && <PrayerTimesManager />}
          
          {/* Events Tab */}
          {activeTab === 'events' && <EventsManager />}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && <MosqueSettings />}
        </div>
      </div>
    </div>
  )
}
