import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Vaccine, VaccinationRecord, VaccineStatus } from '../types'

const MOCK_VACCINES: Vaccine[] = [
  { id: 'vac-001', name: 'DHPPI', description: 'Phòng bệnh Carré, Parvo, Parainfluenza, Adenovirus', manufacturer: 'Nobivac', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 },
  { id: 'vac-002', name: 'Dại (Rabies)', description: 'Phòng bệnh dại - bắt buộc theo quy định', manufacturer: 'Rabisin', dosage: '1ml tiêm bắp', intervalDays: 365, requiredDoses: 2 },
  { id: 'vac-003', name: 'Lepto', description: 'Phòng bệnh leptospirosis (xoắn khuẩn)', manufacturer: 'Nobivac', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 },
  { id: 'vac-004', name: 'FVRCP', description: 'Phòng bệnh hô hấp, viêm mũi, Panleukopenia ở mèo', manufacturer: 'Purevax', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 },
  { id: 'vac-005', name: 'FeLV', description: 'Phòng bệnh bạch cầu mèo (FeLV)', manufacturer: 'Purevax', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 },
  { id: 'vac-006', name: 'Bordetella', description: 'Phòng bệnh viêm phế quản truyền nhiễm ở chó', manufacturer: 'Bronchi-Shield', dosage: 'Nhỏ mũi', intervalDays: 365, requiredDoses: 1 },
]

const today = new Date()
const tomorrow = new Date(today.getTime() + 86400000)
const nextWeek = new Date(today.getTime() + 7 * 86400000)
const nextMonth = new Date(today.getTime() + 25 * 86400000)
const lastMonth = new Date(today.getTime() - 20 * 86400000)
const overdue = new Date(today.getTime() - 5 * 86400000)

const MOCK_VACC_RECORDS: VaccinationRecord[] = [
  {
    id: 'vr-001', petId: 'pet-002', vaccineId: 'vac-001', doseNumber: 2,
    administeredDate: lastMonth.toISOString().split('T')[0],
    nextDueDate: nextWeek.toISOString().split('T')[0],
    status: 'scheduled', batchNumber: 'LOT2024-001', doctorId: 'doc-001',
    notes: 'Nhắc nhở chủ 3 ngày trước',
    pet: { id: 'pet-002', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', age: 2, weight: 28, gender: 'male', color: 'Vàng', ownerId: 'own-002', owner: { id: 'own-002', name: 'Nguyễn Văn Hùng', phone: '0909 876 543', email: 'hung@gmail.com', address: 'Q3, TP.HCM' } },
    vaccine: MOCK_VACCINES[0]
  },
  {
    id: 'vr-002', petId: 'pet-001', vaccineId: 'vac-004', doseNumber: 1,
    administeredDate: lastMonth.toISOString().split('T')[0],
    nextDueDate: nextMonth.toISOString().split('T')[0],
    status: 'scheduled', batchNumber: 'LOT2024-002', doctorId: 'doc-001',
    notes: '',
    pet: { id: 'pet-001', name: 'Mochi', species: 'cat', breed: 'Mèo Anh lông ngắn', age: 3, weight: 4.2, gender: 'male', color: 'Xám', ownerId: 'own-001', owner: { id: 'own-001', name: 'Trần Thị Mai', phone: '0912 345 678', email: 'mai@gmail.com', address: 'Q1, TP.HCM' } },
    vaccine: MOCK_VACCINES[3]
  },
  {
    id: 'vr-003', petId: 'pet-003', vaccineId: 'vac-002', doseNumber: 2,
    administeredDate: overdue.toISOString().split('T')[0],
    nextDueDate: overdue.toISOString().split('T')[0],
    status: 'overdue', doctorId: 'doc-001',
    notes: 'Cần liên hệ chủ ngay',
    pet: { id: 'pet-003', name: 'Kitty', species: 'cat', breed: 'Mèo Ba Tư', age: 5, weight: 3.8, gender: 'female', color: 'Trắng', ownerId: 'own-003', owner: { id: 'own-003', name: 'Lê Thị Hoa', phone: '0938 765 432', email: 'hoa@gmail.com', address: 'Q7, TP.HCM' } },
    vaccine: MOCK_VACCINES[1]
  },
  {
    id: 'vr-004', petId: 'pet-004', vaccineId: 'vac-001', doseNumber: 1,
    administeredDate: tomorrow.toISOString().split('T')[0],
    nextDueDate: tomorrow.toISOString().split('T')[0],
    status: 'scheduled', doctorId: 'doc-001',
    notes: 'Mũi đầu tiên',
    pet: { id: 'pet-004', name: 'Rex', species: 'dog', breed: 'Husky', age: 1, weight: 15, gender: 'male', color: 'Đen trắng', ownerId: 'own-004', owner: { id: 'own-004', name: 'Phạm Minh Tuấn', phone: '0977 123 456', email: 'tuan@gmail.com', address: 'Bình Thạnh, TP.HCM' } },
    vaccine: MOCK_VACCINES[0]
  },
  {
    id: 'vr-005', petId: 'pet-002', vaccineId: 'vac-002', doseNumber: 1,
    administeredDate: new Date(Date.now() - 365 * 86400000).toISOString().split('T')[0],
    nextDueDate: new Date(Date.now() - 365 * 86400000).toISOString().split('T')[0],
    status: 'completed', batchNumber: 'LOT2023-005', doctorId: 'doc-001',
    notes: '',
    pet: { id: 'pet-002', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', age: 2, weight: 28, gender: 'male', color: 'Vàng', ownerId: 'own-002', owner: { id: 'own-002', name: 'Nguyễn Văn Hùng', phone: '0909 876 543', email: 'hung@gmail.com', address: 'Q3, TP.HCM' } },
    vaccine: MOCK_VACCINES[1]
  },
]

export const useVaccinationStore = defineStore('vaccinations', () => {
  const records = ref<VaccinationRecord[]>(MOCK_VACC_RECORDS)
  const vaccines = ref<Vaccine[]>(MOCK_VACCINES)

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

  function updateRecord(id: string, data: Partial<VaccinationRecord>) {
    const idx = records.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      records.value[idx] = { ...records.value[idx], ...data }
    }
  }

  function updateStatus(id: string, status: VaccineStatus, administeredDate?: string) {
    updateRecord(id, { status, administeredDate })
  }

  function addRecord(data: Omit<VaccinationRecord, 'id'>) {
    records.value.push({ ...data, id: `vr-${Date.now()}` })
  }

  return {
    records, vaccines,
    upcomingRecords, overdueRecords, upcomingCount,
    updateRecord, updateStatus, addRecord
  }
})
