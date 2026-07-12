import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Booking, BookingStatus, BookingType } from '../types'
import api from '../services/api'

export const AVAILABLE_DOCTORS_STORE_KEY = 'availableDoctors'

export const BOOKING_TYPES: { value: BookingType; label: string; icon: string }[] = [
  { value: 'checkup', label: 'Khám tổng quát', icon: '🩺' },
  { value: 'vaccination', label: 'Tiêm phòng', icon: '💉' },
  { value: 'surgery', label: 'Phẫu thuật', icon: '🔪' },
  { value: 'grooming', label: 'Tắm & cắt tỉa', icon: '✂️' },
  { value: 'emergency', label: 'Cấp cứu', icon: '🚑' },
  { value: 'follow_up', label: 'Tái khám', icon: '🔄' },
]

export const useBookingsStore = defineStore('customerBookings', () => {
  const bookings = ref<Booking[]>([])
  const availableDoctors = ref<{ id: string; name: string; specialty: string }[]>([])
  const isLoading = ref(false)

  const upcomingBookings = computed(() =>
    bookings.value.filter(b => ['pending', 'confirmed'].includes(b.status))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  )

  const completedBookings = computed(() =>
    bookings.value.filter(b => b.status === 'completed')
  )

  const statusMap: Record<BookingStatus, { label: string; class: string }> = {
    pending: { label: 'Chờ xác nhận', class: 'badge-warning' },
    confirmed: { label: 'Đã xác nhận', class: 'badge-primary' },
    cancelled: { label: 'Đã hủy', class: 'badge-gray' },
    completed: { label: 'Hoàn thành', class: 'badge-success' }
  }

  async function fetchBookings(): Promise<void> {
    isLoading.value = true
    try {
      const res = await api.get<Booking[]>('/appointments')
      if (res.success && res.data) bookings.value = res.data
    } catch (err) {
      console.error('fetchBookings:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchDoctors(): Promise<void> {
    try {
      const res = await api.get<{ id: string; name: string; specialty: string }[]>('/doctors')
      if (res.success && res.data) availableDoctors.value = res.data
    } catch (err) {
      console.error('fetchDoctors:', err)
    }
  }

  async function createBooking(
    data: Omit<Booking, 'id' | 'customerId' | 'status' | 'createdAt'>
  ): Promise<Booking | null> {
    isLoading.value = true
    try {
      const res = await api.post<Booking>('/appointments', {
        petId: data.petId,
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        type: data.type,
        notes: data.symptoms,
      })
      if (res.success && res.data) {
        bookings.value.unshift(res.data)
        return res.data
      }
      return null
    } catch (err) {
      console.error('createBooking:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function cancelBooking(id: string): Promise<boolean> {
    try {
      const res = await api.delete(`/appointments/${id}`)
      if (res.success) {
        const idx = bookings.value.findIndex(b => b.id === id)
        if (idx !== -1) bookings.value[idx].status = 'cancelled'
        return true
      }
      return false
    } catch {
      return false
    }
  }

  async function rescheduleBooking(id: string, date: string, time: string): Promise<boolean> {
    try {
      const res = await api.put(`/appointments/${id}`, { date, time, status: 'waiting' })
      if (res.success) {
        const idx = bookings.value.findIndex(b => b.id === id)
        if (idx !== -1) {
          bookings.value[idx].date = date
          bookings.value[idx].time = time
          bookings.value[idx].status = 'pending'
        }
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return {
    bookings,
    availableDoctors,
    isLoading,
    upcomingBookings,
    completedBookings,
    statusMap,
    fetchBookings,
    fetchDoctors,
    createBooking,
    cancelBooking,
    rescheduleBooking
  }
})
