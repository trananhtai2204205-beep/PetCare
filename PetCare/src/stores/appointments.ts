import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Appointment, AppointmentStatus } from '../types'
import api from '../services/api'

export const useAppointmentStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>([])
  const isLoading = ref(false)

  const today = computed(() => new Date().toISOString().split('T')[0])

  const todayAppointments = computed(() =>
    appointments.value.filter(a => a.date === today.value)
  )

  const completedToday = computed(() =>
    todayAppointments.value.filter(a => a.status === 'completed').length
  )

  const upcomingToday = computed(() =>
    todayAppointments.value
      .filter(a => a.status === 'waiting' || a.status === 'in_progress')
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 5)
  )

  async function fetchAppointments(params?: {
    status?: AppointmentStatus
    date?: string
    q?: string
  }) {
    isLoading.value = true
    try {
      const query = new URLSearchParams()
      if (params?.status) query.set('status', params.status)
      if (params?.date) query.set('date', params.date)
      if (params?.q) query.set('q', params.q)
      const url = `/appointments${query.toString() ? '?' + query.toString() : ''}`
      const res = await api.get<Appointment[]>(url)
      if (res.success && res.data) {
        appointments.value = res.data
      }
    } catch (err) {
      console.error('fetchAppointments:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTodayAppointments() {
    isLoading.value = true
    try {
      const res = await api.get<Appointment[]>('/appointments/today')
      if (res.success && res.data) {
        // Merge vào appointments chung, tránh duplicate
        const todayIds = new Set(res.data.map(a => a.id))
        appointments.value = [
          ...res.data,
          ...appointments.value.filter(a => !todayIds.has(a.id))
        ]
      }
    } catch (err) {
      console.error('fetchTodayAppointments:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function addAppointment(data: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment | null> {
    isLoading.value = true
    try {
      const res = await api.post<Appointment>('/appointments', data)
      if (res.success && res.data) {
        appointments.value.unshift(res.data)
        return res.data
      }
      return null
    } catch (err) {
      console.error('addAppointment:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function updateAppointment(id: string, data: Partial<Appointment>): Promise<boolean> {
    try {
      const res = await api.put<Appointment>(`/appointments/${id}`, data)
      if (res.success && res.data) {
        const idx = appointments.value.findIndex(a => a.id === id)
        if (idx !== -1) appointments.value[idx] = res.data
        return true
      }
      return false
    } catch (err) {
      console.error('updateAppointment:', err)
      return false
    }
  }

  async function deleteAppointment(id: string): Promise<boolean> {
    try {
      const res = await api.delete(`/appointments/${id}`)
      if (res.success) {
        appointments.value = appointments.value.filter(a => a.id !== id)
        return true
      }
      return false
    } catch (err) {
      console.error('deleteAppointment:', err)
      return false
    }
  }

  async function updateStatus(id: string, status: AppointmentStatus): Promise<boolean> {
    try {
      const res = await api.patch<Appointment>(`/appointments/${id}/status`, { status })
      if (res.success) {
        const idx = appointments.value.findIndex(a => a.id === id)
        if (idx !== -1) appointments.value[idx].status = status
        return true
      }
      return false
    } catch (err) {
      console.error('updateStatus:', err)
      return false
    }
  }

  function searchAppointments(query: string, status?: AppointmentStatus, date?: string) {
    return appointments.value.filter(a => {
      const q = query.toLowerCase()
      const matchQuery = !query ||
        a.pet?.name.toLowerCase().includes(q) ||
        (a.pet as any)?.owner?.name?.toLowerCase().includes(q) ||
        a.pet?.breed.toLowerCase().includes(q)
      const matchStatus = !status || a.status === status
      const matchDate = !date || a.date === date
      return matchQuery && matchStatus && matchDate
    })
  }

  return {
    appointments, isLoading,
    todayAppointments, completedToday, upcomingToday,
    fetchAppointments, fetchTodayAppointments,
    addAppointment, updateAppointment, deleteAppointment,
    updateStatus, searchAppointments
  }
})
