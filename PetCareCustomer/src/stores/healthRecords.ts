import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CustomerMedicalRecord } from '../types'
import api from '../services/api'

// Helper: map dữ liệu từ backend sang CustomerMedicalRecord format
function mapRecord(r: any): CustomerMedicalRecord {
  return {
    id: r.id,
    petId: r.petId || r.pet_id,
    petName: r.pet?.name || '',
    petSpecies: r.pet?.species || '',
    doctorName: r.doctor?.name || '',
    date: (r.createdAt || '').split('T')[0],
    symptoms: r.symptoms || [],
    diagnosis: r.diagnosis || '',
    treatment: r.treatment || '',
    prescriptions: (r.prescriptions || []).map((p: any) => ({
      medicineName: p.medicineName || p.medicine_name,
      dosage: p.dosage,
      frequency: p.frequency,
      duration: p.duration,
      instructions: p.instructions,
    })),
    notes: r.notes || '',
    weight: r.weight,
    temperature: r.temperature,
    nextVisitDate: r.nextVisitDate || r.next_visit_date,
  }
}

export const useHealthRecordsStore = defineStore('customerHealthRecords', () => {
  const records = ref<CustomerMedicalRecord[]>([])
  const isLoading = ref(false)

  async function fetchRecords(): Promise<void> {
    isLoading.value = true
    try {
      const res = await api.get<any[]>('/medical-records')
      if (res.success && res.data) {
        records.value = res.data.map(mapRecord)
      }
    } catch (err) {
      console.error('fetchHealthRecords:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchRecordsByPet(petId: string): Promise<CustomerMedicalRecord[]> {
    try {
      const res = await api.get<any[]>(`/medical-records/pet/${petId}`)
      if (res.success && res.data) return res.data.map(mapRecord)
      return []
    } catch {
      return []
    }
  }

  function getRecordsByPet(petId: string) {
    return records.value.filter(r => r.petId === petId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  function getAllRecords() {
    return [...records.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return { records, isLoading, fetchRecords, fetchRecordsByPet, getRecordsByPet, getAllRecords }
})
