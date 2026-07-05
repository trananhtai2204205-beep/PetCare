import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Booking, BookingStatus, BookingType } from '../types'

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-001',
    customerId: 'cus-001',
    petId: 'pet-001',
    petName: 'Mochi',
    petSpecies: 'dog',
    doctorId: 'doc-001',
    doctorName: 'BS. Nguyễn Minh Khoa',
    date: '2026-07-10',
    time: '09:00',
    type: 'checkup',
    status: 'confirmed',
    symptoms: 'Chó bị ngứa da, hay gãi',
    createdAt: '2026-07-01'
  },
  {
    id: 'bk-002',
    customerId: 'cus-001',
    petId: 'pet-002',
    petName: 'Luna',
    petSpecies: 'cat',
    doctorId: 'doc-002',
    doctorName: 'BS. Trần Thị Mai',
    date: '2026-07-15',
    time: '14:30',
    type: 'vaccination',
    status: 'pending',
    symptoms: 'Tiêm vaccine định kỳ',
    createdAt: '2026-07-02'
  },
  {
    id: 'bk-003',
    customerId: 'cus-001',
    petId: 'pet-001',
    petName: 'Mochi',
    petSpecies: 'dog',
    doctorId: 'doc-001',
    doctorName: 'BS. Nguyễn Minh Khoa',
    date: '2026-06-20',
    time: '10:00',
    type: 'checkup',
    status: 'completed',
    symptoms: 'Kiểm tra sức khỏe định kỳ',
    createdAt: '2026-06-15'
  },
  {
    id: 'bk-004',
    customerId: 'cus-001',
    petId: 'pet-003',
    petName: 'Biscuit',
    petSpecies: 'rabbit',
    doctorId: 'doc-001',
    doctorName: 'BS. Nguyễn Minh Khoa',
    date: '2026-06-10',
    time: '08:30',
    type: 'checkup',
    status: 'cancelled',
    symptoms: 'Không ăn uống bình thường',
    createdAt: '2026-06-08'
  }
]

export const AVAILABLE_DOCTORS = [
  { id: 'doc-001', name: 'BS. Nguyễn Minh Khoa', specialty: 'Thú y tổng quát' },
  { id: 'doc-002', name: 'BS. Trần Thị Mai', specialty: 'Ngoại khoa' },
  { id: 'doc-003', name: 'BS. Lê Văn Hùng', specialty: 'Nội khoa' },
]

export const BOOKING_TYPES: { value: BookingType; label: string; icon: string }[] = [
  { value: 'checkup', label: 'Khám tổng quát', icon: '🩺' },
  { value: 'vaccination', label: 'Tiêm phòng', icon: '💉' },
  { value: 'surgery', label: 'Phẫu thuật', icon: '🔪' },
  { value: 'grooming', label: 'Tắm & cắt tỉa', icon: '✂️' },
  { value: 'emergency', label: 'Cấp cứu', icon: '🚑' },
  { value: 'follow_up', label: 'Tái khám', icon: '🔄' },
]

export const useBookingsStore = defineStore('customerBookings', () => {
  const bookings = ref<Booking[]>([...MOCK_BOOKINGS])
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

  function createBooking(data: Omit<Booking, 'id' | 'customerId' | 'status' | 'createdAt'>): Promise<Booking> {
    return new Promise((resolve) => {
      isLoading.value = true
      setTimeout(() => {
        const newBooking: Booking = {
          id: 'bk-' + Date.now(),
          customerId: 'cus-001',
          status: 'pending',
          createdAt: new Date().toISOString().split('T')[0],
          ...data
        }
        bookings.value.unshift(newBooking)
        isLoading.value = false
        resolve(newBooking)
      }, 900)
    })
  }

  function cancelBooking(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = bookings.value.findIndex(b => b.id === id)
        if (idx !== -1) bookings.value[idx].status = 'cancelled'
        resolve(true)
      }, 600)
    })
  }

  function rescheduleBooking(id: string, date: string, time: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = bookings.value.findIndex(b => b.id === id)
        if (idx !== -1) {
          bookings.value[idx].date = date
          bookings.value[idx].time = time
          bookings.value[idx].status = 'pending'
        }
        resolve(true)
      }, 700)
    })
  }

  return {
    bookings,
    isLoading,
    upcomingBookings,
    completedBookings,
    statusMap,
    createBooking,
    cancelBooking,
    rescheduleBooking
  }
})
