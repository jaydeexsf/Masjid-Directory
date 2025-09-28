'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Globe, User, Save, Upload } from 'lucide-react'

const mosqueSettingsSchema = z.object({
  name: z.string().min(2, 'Mosque name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  contactInfo: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
  }),
  imam: z.object({
    name: z.string().min(2, 'Imam name is required'),
    photo: z.string().optional(),
  }),
})

type MosqueSettingsData = z.infer<typeof mosqueSettingsSchema>

export default function MosqueSettings() {
  const [mosque, setMosque] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<MosqueSettingsData>({
    resolver: zodResolver(mosqueSettingsSchema)
  })

  useEffect(() => {
    fetchMosqueData()
  }, [])

  const fetchMosqueData = async () => {
    try {
      setLoading(true)
      // This would fetch the actual mosque data
      const mockData = {
        name: 'Masjid Al-Noor',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
        contactInfo: {
          phone: '+1 (555) 123-4567',
          email: 'info@masjidalnoor.com',
          website: 'https://masjidalnoor.com'
        },
        imam: {
          name: 'Imam Abdullah',
          photo: ''
        }
      }
      
      setMosque(mockData)
      setValue('name', mockData.name)
      setValue('address', mockData.address)
      setValue('city', mockData.city)
      setValue('state', mockData.state)
      setValue('country', mockData.country)
      setValue('postalCode', mockData.postalCode)
      setValue('contactInfo.phone', mockData.contactInfo.phone)
      setValue('contactInfo.email', mockData.contactInfo.email)
      setValue('contactInfo.website', mockData.contactInfo.website)
      setValue('imam.name', mockData.imam.name)
    } catch (error) {
      console.error('Error fetching mosque data:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: MosqueSettingsData) => {
    try {
      setSaving(true)
      const response = await fetch('/api/mosques/temp-masjid-id', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (result.success) {
        setMosque(result.mosque)
        alert('Mosque settings updated successfully!')
      } else {
        throw new Error(result.error || 'Failed to update mosque settings')
      }
    } catch (error) {
      console.error('Error updating mosque settings:', error)
      alert('Failed to update mosque settings. Please try again.')
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
            {[...Array(8)].map((_, i) => (
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mosque Settings</h2>
        <p className="text-gray-600">Update your mosque's information and contact details.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mosque Name *
              </label>
              <input
                {...register('name')}
                className="input-field"
                placeholder="Enter mosque name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code *
              </label>
              <input
                {...register('postalCode')}
                className="input-field"
                placeholder="Postal code"
              />
              {errors.postalCode && (
                <p className="text-red-600 text-sm mt-1">{errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              {...register('address')}
              className="input-field"
              placeholder="Enter full address"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                {...register('city')}
                className="input-field"
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                {...register('state')}
                className="input-field"
                placeholder="State"
              />
              {errors.state && (
                <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                {...register('country')}
                className="input-field"
                placeholder="Country"
              />
              {errors.country && (
                <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                {...register('contactInfo.phone')}
                className="input-field"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register('contactInfo.email')}
                type="email"
                className="input-field"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                {...register('contactInfo.website')}
                className="input-field"
                placeholder="Website URL"
              />
            </div>
          </div>
        </div>

        {/* Imam Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Imam Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imam Name *
              </label>
              <input
                {...register('imam.name')}
                className="input-field"
                placeholder="Imam's full name"
              />
              {errors.imam?.name && (
                <p className="text-red-600 text-sm mt-1">{errors.imam.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imam Photo
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <button
                  type="button"
                  className="btn-secondary flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </button>
              </div>
            </div>
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
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
