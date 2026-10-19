export const BOOKINGS_STORAGE_KEY = 'oficina-lume-bookings'
export const BOOKINGS_EVENT = 'oficina-lume-bookings-change'

export type BookingStatus = 'Recebida' | 'Confirmada' | 'Concluída'

export type Booking = {
  id: string
  name: string
  email: string
  phone: string
  bikeType: string
  service: string
  date: string
  notes: string
  status: BookingStatus
  createdAt: string
}

export const bookingStatuses: BookingStatus[] = ['Recebida', 'Confirmada', 'Concluída']

export function saveBookings(bookings: Booking[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings))
  window.dispatchEvent(new Event(BOOKINGS_EVENT))
}
