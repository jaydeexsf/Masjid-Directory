'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, User, Phone, Mail, Globe, Camera, Upload } from 'lucide-react'

const mosqueSchema = z.object({
  name: z.string().min(2, 'Masjid name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  contactInfo: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
  }),
  imam: z.object({
    name: z.string().min(2, 'Imam name is required'),
    photo: z.string().optional(),
  }),
  adminName: z.string().min(2, 'Admin name is required'),
  adminEmail: z.string().email('Valid email is required'),
  adminPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
})

type MosqueFormData = z.infer<typeof mosqueSchema>

interface MosqueRegistrationFormProps {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function MosqueRegistrationForm({ onSubmit, isSubmitting }: MosqueRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<MosqueFormData>({
    resolver: zodResolver(mosqueSchema)
  })

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setLocation({ lat, lng })
          setValue('latitude', lat)
          setValue('longitude', lng)
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your location. Please enter coordinates manually.')
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const onFormSubmit = (data: MosqueFormData) => {
    onSubmit(data)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-12 h-1 ml-2 ${
                step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Masjid Name *
            </label>
            <input
              {...register('name')}
              className="input-field"
              placeholder="Enter masjid name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      )}

      {/* Step 2: Location & Contact */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Contact</h2>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Location Coordinates</h3>
            <div className="flex items-center space-x-4 mb-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="btn-secondary flex items-center"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Use Current Location
              </button>
              <span className="text-sm text-gray-600">or enter manually</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  {...register('latitude', { valueAsNumber: true })}
                  type="number"
                  step="any"
                  className="input-field"
                  placeholder="e.g., 40.7128"
                />
                {errors.latitude && (
                  <p className="text-red-600 text-sm mt-1">{errors.latitude.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  {...register('longitude', { valueAsNumber: true })}
                  type="number"
                  step="any"
                  className="input-field"
                  placeholder="e.g., -74.0060"
                />
                {errors.longitude && (
                  <p className="text-red-600 text-sm mt-1">{errors.longitude.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
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

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Imam Information</h3>
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
          </div>
        </div>
      )}

      {/* Step 3: Admin Account */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Account</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> You will use these credentials to manage your masjid's 
              prayer times, events, and information after registration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Name *
              </label>
              <input
                {...register('adminName')}
                className="input-field"
                placeholder="Your full name"
              />
              {errors.adminName && (
                <p className="text-red-600 text-sm mt-1">{errors.adminName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email *
              </label>
              <input
                {...register('adminEmail')}
                type="email"
                className="input-field"
                placeholder="Your email address"
              />
              {errors.adminEmail && (
                <p className="text-red-600 text-sm mt-1">{errors.adminEmail.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              {...register('adminPassword')}
              type="password"
              className="input-field"
              placeholder="Create a secure password"
            />
            {errors.adminPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.adminPassword.message}</p>
            )}
            <div className="mt-2 text-sm text-gray-600">
              <p>Password requirements:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Registration Process</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your masjid will be reviewed before approval</li>
              <li>• You'll receive an email confirmation</li>
              <li>• Once approved, you can manage prayer times and events</li>
              <li>• Your masjid will appear in search results</li>
            </ul>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="btn-primary"
          >
            Next Step
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              'Register Masjid'
            )}
          </button>
        )}
      </div>
    </form>
  )
}
