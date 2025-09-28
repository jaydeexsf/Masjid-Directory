'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Clock, Save, Plus } from 'lucide-react'

const prayerTimesSchema = z.object({
  fajr: z.string().min(1, 'Fajr time is required'),
  dhuhr: z.string().min(1, 'Dhuhr time is required'),
  asr: z.string().min(1, 'Asr time is required'),
  maghrib: z.string().min(1, 'Maghrib time is required'),
  isha: z.string().min(1, 'Isha time is required'),
  jumuah: z.string().optional(),
})

type PrayerTimesData = z.infer<typeof prayerTimesSchema>

export default function PrayerTimesManager() {
  const [prayerTimes, setPrayerTimes] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<PrayerTimesData>({
    resolver: zodResolver(prayerTimesSchema)
  })

  useEffect(() => {
    fetchPrayerTimes()
  }, [selectedDate])

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/salah-times?masjidId=temp-masjid-id&date=${selectedDate}`)
      const data = await response.json()
      
      if (data.success && data.salahTimes) {
        setPrayerTimes(data.salahTimes)
        setValue('fajr', data.salahTimes.fajr)
        setValue('dhuhr', data.salahTimes.dhuhr)
        setValue('asr', data.salahTimes.asr)
        setValue('maghrib', data.salahTimes.maghrib)
        setValue('isha', data.salahTimes.isha)
        setValue('jumuah', data.salahTimes.jumuah || '')
      } else {
        // Set default times if none exist
        setValue('fajr', '05:30')
        setValue('dhuhr', '12:15')
        setValue('asr', '15:45')
        setValue('maghrib', '18:20')
        setValue('isha', '19:45')
        setValue('jumuah', '12:30')
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: PrayerTimesData) => {
    try {
      setSaving(true)
      const response = await fetch('/api/salah-times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          masjidId: 'temp-masjid-id', // This would be the actual mosque ID
          date: selectedDate,
          ...data
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setPrayerTimes(result.salahTimes)
        alert('Prayer times saved successfully!')
      } else {
        throw new Error(result.error || 'Failed to save prayer times')
      }
    } catch (error) {
      console.error('Error saving prayer times:', error)
      alert('Failed to save prayer times. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Prayer Times Management</h2>
        <p className="text-gray-600">Update prayer times for your mosque. Changes will be reflected immediately for users.</p>
      </div>

      {/* Date Selector */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-field max-w-xs"
        />
        <p className="text-sm text-gray-500 mt-1">
          Prayer times are set for specific dates. You can manage different dates as needed.
        </p>
      </div>

      {/* Prayer Times Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fajr */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fajr *
            </label>
            <input
              {...register('fajr')}
              type="time"
              className="input-field"
            />
            {errors.fajr && (
              <p className="text-red-600 text-sm mt-1">{errors.fajr.message}</p>
            )}
          </div>

          {/* Dhuhr */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dhuhr *
            </label>
            <input
              {...register('dhuhr')}
              type="time"
              className="input-field"
            />
            {errors.dhuhr && (
              <p className="text-red-600 text-sm mt-1">{errors.dhuhr.message}</p>
            )}
          </div>

          {/* Asr */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asr *
            </label>
            <input
              {...register('asr')}
              type="time"
              className="input-field"
            />
            {errors.asr && (
              <p className="text-red-600 text-sm mt-1">{errors.asr.message}</p>
            )}
          </div>

          {/* Maghrib */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maghrib *
            </label>
            <input
              {...register('maghrib')}
              type="time"
              className="input-field"
            />
            {errors.maghrib && (
              <p className="text-red-600 text-sm mt-1">{errors.maghrib.message}</p>
            )}
          </div>

          {/* Isha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Isha *
            </label>
            <input
              {...register('isha')}
              type="time"
              className="input-field"
            />
            {errors.isha && (
              <p className="text-red-600 text-sm mt-1">{errors.isha.message}</p>
            )}
          </div>

          {/* Jumuah */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumuah (Optional)
            </label>
            <input
              {...register('jumuah')}
              type="time"
              className="input-field"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty if no Jumuah prayer
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Prayer Times'}
          </button>
        </div>
      </form>

      {/* Current Times Display */}
      {prayerTimes && (
        <div className="bg-primary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Prayer Times</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Fajr</div>
              <div className="font-semibold text-primary-600">{prayerTimes.fajr}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Dhuhr</div>
              <div className="font-semibold text-primary-600">{prayerTimes.dhuhr}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Asr</div>
              <div className="font-semibold text-primary-600">{prayerTimes.asr}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Maghrib</div>
              <div className="font-semibold text-primary-600">{prayerTimes.maghrib}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Isha</div>
              <div className="font-semibold text-primary-600">{prayerTimes.isha}</div>
            </div>
            {prayerTimes.jumuah && (
              <div className="text-center">
                <div className="text-sm text-gray-600">Jumuah</div>
                <div className="font-semibold text-primary-600">{prayerTimes.jumuah}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
