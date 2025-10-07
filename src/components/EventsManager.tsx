'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Plus, Edit, Trash2, Clock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const eventSchema = z.object({
  title: z.string().min(2, 'Event title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  isRecurring: z.boolean().optional(),
  recurringPattern: z.enum(['weekly', 'monthly', 'yearly']).optional(),
})

type EventData = z.infer<typeof eventSchema>

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  isRecurring: boolean
  recurringPattern?: string
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<EventData>({
    resolver: zodResolver(eventSchema)
  })

  useEffect(() => {
    fetchEvents()
  }, [user?.masjidId])

  const fetchEvents = async () => {
    if (!user?.masjidId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`/api/events?masjidId=${user.masjidId}&upcoming=true`)
      const data = await response.json()
      
      if (data.success) {
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: EventData) => {
    try {
      setSaving(true)
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          masjidId: user?.masjidId,
          ...data
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        await fetchEvents()
        reset()
        setEditingEvent(null)
        alert('Event saved successfully!')
      } else {
        throw new Error(result.error || 'Failed to save event')
      }
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Failed to save event. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setValue('title', event.title)
    setValue('description', event.description)
    setValue('date', event.date.split('T')[0])
    setValue('time', event.time)
    setValue('isRecurring', event.isRecurring)
    setValue('recurringPattern', event.recurringPattern as any)
  }

  const handleCancel = () => {
    setEditingEvent(null)
    reset()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Events Management</h2>
        <p className="text-gray-600">Create and manage community events for your mosque.</p>
      </div>

      {/* Event Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                {...register('title')}
                className="input-field"
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                {...register('date')}
                type="date"
                className="input-field"
              />
              {errors.date && (
                <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                {...register('time')}
                type="time"
                className="input-field"
              />
              {errors.time && (
                <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recurring Event
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('isRecurring')}
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Is Recurring</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="input-field"
              placeholder="Describe the event..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            {editingEvent && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : (editingEvent ? 'Update Event' : 'Create Event')}
            </button>
          </div>
        </form>
      </div>

      {/* Events List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event._id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 ml-4 mr-1" />
                      <span>{event.time}</span>
                      {event.isRecurring && (
                        <span className="ml-4 text-primary-600 font-medium">
                          Recurring ({event.recurringPattern})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this event?')) {
                          // Handle delete
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No events scheduled</p>
            <p className="text-sm text-gray-500">Create your first event above</p>
          </div>
        )}
      </div>
    </div>
  )
}
