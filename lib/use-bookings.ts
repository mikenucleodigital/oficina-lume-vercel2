'use client'

import { useEffect, useState } from 'react'
import { BOOKINGS_EVENT, BOOKINGS_STORAGE_KEY, type Booking } from '@/lib/bookings'

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    function syncBookings() {
      try {
        const stored: unknown = JSON.parse(window.localStorage.getItem(BOOKINGS_STORAGE_KEY) || '[]')
        setBookings(Array.isArray(stored) ? stored as Booking[] : [])
      } catch {
        setBookings([])
      }
    }

    window.addEventListener(BOOKINGS_EVENT, syncBookings)
    window.addEventListener('storage', syncBookings)
    syncBookings()
    return () => {
      window.removeEventListener(BOOKINGS_EVENT, syncBookings)
      window.removeEventListener('storage', syncBookings)
    }
  }, [])

  return bookings
}
