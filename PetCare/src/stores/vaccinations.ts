import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Vaccine, VaccinationRecord, VaccineStatus } from '../types'
import api from '../services/api'

export const useVaccinationStore = defineStore('vaccinations', () => {
  const records = ref<VaccinationRecord[]>([])
  const vaccines = ref<Vaccine[]>([])
  const isLoading = ref(false)

  const todayStr = new Date().toISOString().split('T')[0]

  const upcomingRecords = computed(() => {
    const limit = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    return records.value.filter(r =>
      r.status === 'scheduled' && r.nextDueDate >= todayStr && r.nextDueDate <= limit
    ).sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))
  })

  const overdueRecords = computed(() =>
    records.value.filter(r => r.status === 'overdue')
  )

  const upcomingCount = computed(() => upcomingRecords.value.length)

  async function fetchVaccines() {
    try {
      const res = await api.get<Vaccine[]>('/vaccines')
      if (res.success && res.data) vaccines.value = res.data
    } catch (err) {
      console.error('fetchVaccines:', err)
    }
  }

  async function fetchRecords(status?: VaccineStatus) {
    isLoading.value = true
    try {
      const url = status ? `/vaccinations?status=${status}` : '/vaccinations'
      const res = await api.get<VaccinationRecord[]>(url)
      if (res.success && res.data) records.value = res.data
    } catch (err) {
      console.error('fetchRecords:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUpcoming() {
    isLoading.value = true
    try {
      const res = await api.get<VaccinationRecord[]>('/vaccinations/upcoming')
      if (res.success && res.data) {
        // Merge upcoming vào records
        const upcomingIds = new Set(res.data.map(r => r.id))
        records.value = [
          ...res.data,
          ...records.value.filter(r => !upcomingIds.has(r.id))
        ]
      }
    } catch (err) {
      console.error('fetchUpcoming:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function updateRecord(id: string, data: Partial<VaccinationRecord>): Promise<boolean> {
    try {
      const res = await api.put<VaccinationRecord>(`/vaccinations/${id}`, data)
      if (res.success && res.data) {
        const idx = records.value.findIndex(r => r.id === id)
        if (idx !== -1) records.value[idx] = res.data
        return true
      }
      return false
    } catch {
      return false
    }
  }

  async function updateStatus(id: string, status: VaccineStatus, administeredDate?: string): Promise<boolean> {
    try {
      const res = await api.patch<VaccinationRecord>(`/vaccinations/${id}/status`, { status, administeredDate })
      if (res.success) {
        const idx = records.value.findIndex(r => r.id === id)
        if (idx !== -1) {
          records.value[idx].status = status
          if (administeredDate) records.value[idx].administeredDate = administeredDate
        }
        return true
      }
      return false
    } catch {
      return false
    }
  }

  async function addRecord(data: Omit<VaccinationRecord, 'id'>): Promise<VaccinationRecord | null> {
    try {
      const res = await api.post<VaccinationRecord>('/vaccinations', data)
      if (res.success && res.data) {
        records.value.push(res.data)
        return res.data
      }
      return null
    } catch {
      return null
    }
  }

  return {
    records, vaccines,
    upcomingRecords, overdueRecords, upcomingCount,
    fetchVaccines, fetchRecords, fetchUpcoming,
    updateRecord, updateStatus, addRecord
  }
})
