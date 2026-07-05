import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CustomerVaccinationRecord, CustomerNotification } from '../types'

const today = new Date()
const addDays = (d: Date, n: number) => {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r.toISOString().split('T')[0]
}
const subDays = (d: Date, n: number) => addDays(d, -n)

const MOCK_VACCINATIONS: CustomerVaccinationRecord[] = [
  {
    id: 'vac-001', petId: 'pet-001', petName: 'Mochi', petSpecies: 'dog',
    vaccineName: 'Vanguard Plus 5', doseNumber: 3, totalDoses: 3,
    administeredDate: subDays(today, 90), nextDueDate: addDays(today, 275),
    status: 'completed', batchNumber: 'VG-2025-001', doctorName: 'BS. Nguyễn Minh Khoa'
  },
  {
    id: 'vac-002', petId: 'pet-001', petName: 'Mochi', petSpecies: 'dog',
    vaccineName: 'Nobivac Rabies', doseNumber: 2, totalDoses: 2,
    administeredDate: subDays(today, 180), nextDueDate: addDays(today, 185),
    status: 'completed', batchNumber: 'NR-2025-088', doctorName: 'BS. Nguyễn Minh Khoa'
  },
  {
    id: 'vac-003', petId: 'pet-001', petName: 'Mochi', petSpecies: 'dog',
    vaccineName: 'Tẩy giun Milbemax', doseNumber: 1, totalDoses: 1,
    nextDueDate: addDays(today, 12),
    status: 'upcoming', doctorName: ''
  },
  {
    id: 'vac-004', petId: 'pet-002', petName: 'Luna', petSpecies: 'cat',
    vaccineName: 'Felocell CVR', doseNumber: 2, totalDoses: 3,
    administeredDate: subDays(today, 60), nextDueDate: addDays(today, 30),
    status: 'upcoming', batchNumber: 'FC-2025-012', doctorName: 'BS. Trần Thị Mai'
  },
  {
    id: 'vac-005', petId: 'pet-002', petName: 'Luna', petSpecies: 'cat',
    vaccineName: 'Nobivac Rabies', doseNumber: 1, totalDoses: 2,
    nextDueDate: subDays(today, 5),
    status: 'overdue', doctorName: ''
  },
  {
    id: 'vac-006', petId: 'pet-003', petName: 'Biscuit', petSpecies: 'rabbit',
    vaccineName: 'Tẩy giun Fenbendazole', doseNumber: 1, totalDoses: 1,
    administeredDate: subDays(today, 45), nextDueDate: addDays(today, 45),
    status: 'upcoming', doctorName: 'BS. Lê Văn Hùng'
  }
]

const MOCK_NOTIFICATIONS: CustomerNotification[] = [
  {
    id: 'notif-001', type: 'vaccine', read: false,
    title: 'Sắp đến lịch tiêm phòng', petName: 'Mochi',
    message: 'Mochi cần tẩy giun Milbemax trong 12 ngày nữa (15/07/2026)',
    date: new Date().toISOString()
  },
  {
    id: 'notif-002', type: 'vaccine', read: false,
    title: '⚠️ Quá hạn tiêm vaccine', petName: 'Luna',
    message: 'Luna đã quá hạn tiêm Nobivac Rabies! Hãy đặt lịch ngay.',
    date: new Date().toISOString()
  },
  {
    id: 'notif-003', type: 'appointment', read: true,
    title: 'Lịch khám đã được xác nhận',
    message: 'Lịch khám ngày 10/07/2026 lúc 09:00 đã được xác nhận.',
    date: new Date(Date.now() - 86400000).toISOString()
  }
]

export const useVaccineBookStore = defineStore('customerVaccineBook', () => {
  const vaccinations = ref<CustomerVaccinationRecord[]>([...MOCK_VACCINATIONS])
  const notifications = ref<CustomerNotification[]>([...MOCK_NOTIFICATIONS])

  const upcomingCount = computed(() =>
    vaccinations.value.filter(v => v.status === 'upcoming' || v.status === 'overdue').length
  )
  const unreadNotifCount = computed(() => notifications.value.filter(n => !n.read).length)
  const overdueVaccines = computed(() => vaccinations.value.filter(v => v.status === 'overdue'))
  const upcomingVaccines = computed(() =>
    vaccinations.value.filter(v => v.status === 'upcoming')
      .sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime())
  )

  function getVaccinationsByPet(petId: string) {
    return vaccinations.value.filter(v => v.petId === petId)
      .sort((a, b) => new Date(b.nextDueDate).getTime() - new Date(a.nextDueDate).getTime())
  }

  function markNotifRead(id: string) {
    const n = notifications.value.find(n => n.id === id)
    if (n) n.read = true
  }

  function markAllRead() {
    notifications.value.forEach(n => n.read = true)
  }

  const statusMap = {
    completed: { label: 'Đã tiêm', class: 'badge-success', icon: '✅' },
    upcoming: { label: 'Sắp đến hạn', class: 'badge-warning', icon: '⏰' },
    overdue: { label: 'Quá hạn', class: 'badge-danger', icon: '🚨' }
  }

  return {
    vaccinations, notifications, upcomingCount, unreadNotifCount,
    overdueVaccines, upcomingVaccines, statusMap,
    getVaccinationsByPet, markNotifRead, markAllRead
  }
})
