import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MedicalRecord, Prescription } from '../types'

const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'rec-001', appointmentId: 'appt-003', petId: 'pet-003', doctorId: 'doc-001',
    symptoms: ['Bỏ ăn', 'Nôn mửa', 'Uể oải'],
    diagnosis: 'Rối loạn tiêu hóa nhẹ, nghi do thức ăn không phù hợp',
    treatment: 'Nhịn ăn 12 giờ, cho uống nước điện giải. Sau đó ăn thức ăn nhẹ dễ tiêu.',
    prescriptions: [
      { id: 'rx-001', medicineName: 'Smecta', dosage: '1 gói', frequency: '3 lần/ngày', duration: '3 ngày', instructions: 'Pha với 50ml nước, cho uống trước ăn 30 phút' },
      { id: 'rx-002', medicineName: 'Vitamin B complex', dosage: '1 viên', frequency: '1 lần/ngày', duration: '7 ngày', instructions: 'Cho ăn cùng thức ăn' }
    ],
    notes: 'Chủ nhân cần theo dõi tình trạng trong 48 giờ. Tái khám nếu không cải thiện.',
    weight: 3.8, temperature: 38.5,
    nextVisitDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    pet: { id: 'pet-003', name: 'Kitty', species: 'cat', breed: 'Mèo Ba Tư', age: 5, weight: 3.8, gender: 'female', color: 'Trắng', ownerId: 'own-003', owner: { id: 'own-003', name: 'Lê Thị Hoa', phone: '0938 765 432', email: 'hoa@gmail.com', address: 'Q7, TP.HCM' } }
  },
  {
    id: 'rec-002', appointmentId: 'appt-007', petId: 'pet-002', doctorId: 'doc-001',
    symptoms: ['Lông xơ xác', 'Móng dài'],
    diagnosis: 'Chăm sóc định kỳ - không có bệnh lý',
    treatment: 'Tắm, sấy, cắt móng, vệ sinh tai',
    prescriptions: [],
    notes: 'Thú cưng khỏe mạnh. Lịch tắm tiếp theo sau 1 tháng.',
    weight: 28, temperature: 38.8,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    pet: { id: 'pet-002', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', age: 2, weight: 28, gender: 'male', color: 'Vàng', ownerId: 'own-002', owner: { id: 'own-002', name: 'Nguyễn Văn Hùng', phone: '0909 876 543', email: 'hung@gmail.com', address: 'Q3, TP.HCM' } }
  }
]

export const useMedicalRecordStore = defineStore('medicalRecords', () => {
  const records = ref<MedicalRecord[]>(MOCK_RECORDS)
  const isLoading = ref(false)

  function getRecordByAppointment(appointmentId: string) {
    return records.value.find(r => r.appointmentId === appointmentId)
  }

  function getRecordsByPet(petId: string) {
    return records.value.filter(r => r.petId === petId)
  }

  function saveRecord(data: Omit<MedicalRecord, 'id' | 'createdAt'>): MedicalRecord {
    const existing = records.value.findIndex(r => r.appointmentId === data.appointmentId)
    if (existing !== -1) {
      records.value[existing] = { ...records.value[existing], ...data }
      return records.value[existing]
    }
    const newRecord: MedicalRecord = {
      ...data,
      id: `rec-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    records.value.unshift(newRecord)
    return newRecord
  }

  function addPrescription(recordId: string, prescription: Omit<Prescription, 'id'>) {
    const record = records.value.find(r => r.id === recordId)
    if (record) {
      record.prescriptions.push({ ...prescription, id: `rx-${Date.now()}` })
    }
  }

  function removePrescription(recordId: string, prescriptionId: string) {
    const record = records.value.find(r => r.id === recordId)
    if (record) {
      record.prescriptions = record.prescriptions.filter(p => p.id !== prescriptionId)
    }
  }

  function searchRecords(query: string) {
    const q = query.toLowerCase()
    return records.value.filter(r =>
      !query ||
      r.pet?.name.toLowerCase().includes(q) ||
      r.pet?.owner?.name.toLowerCase().includes(q) ||
      r.diagnosis.toLowerCase().includes(q) ||
      r.symptoms.some(s => s.toLowerCase().includes(q))
    )
  }

  return {
    records, isLoading,
    getRecordByAppointment, getRecordsByPet,
    saveRecord, addPrescription, removePrescription, searchRecords
  }
})
