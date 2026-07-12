import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MedicalRecord, Prescription } from '../types'
import api from '../services/api'

export const useMedicalRecordStore = defineStore('medicalRecords', () => {
  const records = ref<MedicalRecord[]>([])
  const isLoading = ref(false)

  async function fetchRecords(q?: string) {
    isLoading.value = true
    try {
      const url = q ? `/medical-records?q=${encodeURIComponent(q)}` : '/medical-records'
      const res = await api.get<MedicalRecord[]>(url)
      if (res.success && res.data) {
        records.value = res.data
      }
    } catch (err) {
      console.error('fetchRecords:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function getRecordByAppointment(appointmentId: string): Promise<MedicalRecord | null> {
    try {
      const res = await api.get<MedicalRecord>(`/medical-records/appointment/${appointmentId}`)
      return res.data || null
    } catch {
      return null
    }
  }

  async function getRecordsByPet(petId: string): Promise<MedicalRecord[]> {
    try {
      const res = await api.get<MedicalRecord[]>(`/medical-records/pet/${petId}`)
      return res.data || []
    } catch {
      return []
    }
  }

  async function saveRecord(data: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord | null> {
    isLoading.value = true
    try {
      const res = await api.post<MedicalRecord>('/medical-records', data)
      if (res.success && res.data) {
        const existing = records.value.findIndex(r => r.appointmentId === data.appointmentId)
        if (existing !== -1) {
          records.value[existing] = res.data
        } else {
          records.value.unshift(res.data)
        }
        return res.data
      }
      return null
    } catch (err) {
      console.error('saveRecord:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function addPrescription(recordId: string, prescription: Omit<Prescription, 'id'>): Promise<boolean> {
    try {
      const res = await api.post<Prescription>(`/medical-records/${recordId}/prescriptions`, prescription)
      if (res.success && res.data) {
        const record = records.value.find(r => r.id === recordId)
        if (record) {
          record.prescriptions.push(res.data)
        }
        return true
      }
      return false
    } catch {
      return false
    }
  }

  async function removePrescription(recordId: string, prescriptionId: string): Promise<boolean> {
    try {
      const res = await api.delete(`/medical-records/${recordId}/prescriptions/${prescriptionId}`)
      if (res.success) {
        const record = records.value.find(r => r.id === recordId)
        if (record) {
          record.prescriptions = record.prescriptions.filter(p => p.id !== prescriptionId)
        }
        return true
      }
      return false
    } catch {
      return false
    }
  }

  function searchRecords(query: string) {
    const q = query.toLowerCase()
    return records.value.filter(r =>
      !query ||
      r.pet?.name.toLowerCase().includes(q) ||
      (r.pet as any)?.owner?.name?.toLowerCase().includes(q) ||
      r.diagnosis?.toLowerCase().includes(q) ||
      (r.symptoms || []).some(s => s.toLowerCase().includes(q))
    )
  }

  return {
    records, isLoading,
    fetchRecords,
    getRecordByAppointment, getRecordsByPet,
    saveRecord, addPrescription, removePrescription, searchRecords
  }
})
