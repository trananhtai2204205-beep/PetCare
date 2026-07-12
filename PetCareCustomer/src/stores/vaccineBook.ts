import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CustomerVaccinationRecord, CustomerNotification } from '../types'
import api from '../services/api'

// Helper: map backend VaccinationRecord -> CustomerVaccinationRecord
function mapVacc(r: any): CustomerVaccinationRecord {
  return {
    id: r.id,
    petId: r.petId || r.pet_id,
    petName: r.pet?.name || '',
    petSpecies: r.pet?.species || '',
    vaccineName: r.vaccine?.name || '',
    doseNumber: r.doseNumber || r.dose_number || 1,
    totalDoses: r.vaccine?.requiredDoses || r.vaccine?.required_doses || 2,
    administeredDate: r.administeredDate || r.administered_date,
    nextDueDate: r.nextDueDate || r.next_due_date || '',
    status: mapStatus(r.status),
    batchNumber: r.batchNumber || r.batch_number,
    doctorName: r.doctor?.name || '',
    notes: r.notes,
  }
}

function mapStatus(s: string): 'completed' | 'upcoming' | 'overdue' {
  if (s === 'completed') return 'completed'
  if (s === 'overdue') return 'overdue'
  return 'upcoming'
}

const MOCK_NOTIFICATIONS: CustomerNotification[] = [
  {
    id: 'notif-001', type: 'vaccine', read: false,
    title: 'Nhắc nhở lịch vaccine',
    message: 'Kiểm tra sổ vaccine của thú cưng để không bỏ lỡ lịch tiêm.',
    date: new Date().toISOString()
  },
]

export const useVaccineBookStore = defineStore('customerVaccineBook', () => {
  const vaccinations = ref<CustomerVaccinationRecord[]>([])
  const notifications = ref<CustomerNotification[]>([...MOCK_NOTIFICATIONS])
  const isLoading = ref(false)

  const upcomingCount = computed(() =>
    vaccinations.value.filter(v => v.status === 'upcoming' || v.status === 'overdue').length
  )
  const unreadNotifCount = computed(() => notifications.value.filter(n => !n.read).length)
  const overdueVaccines = computed(() => vaccinations.value.filter(v => v.status === 'overdue'))
  const upcomingVaccines = computed(() =>
    vaccinations.value.filter(v => v.status === 'upcoming')
      .sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime())
  )

  async function fetchVaccinations(): Promise<void> {
    isLoading.value = true
    try {
      const res = await api.get<any[]>('/vaccinations')
      if (res.success && res.data) {
        vaccinations.value = res.data.map(mapVacc)
        // Tạo notification cho vaccine quá hạn / sắp đến hạn
        generateNotifications()
      }
    } catch (err) {
      console.error('fetchVaccinations:', err)
    } finally {
      isLoading.value = false
    }
  }

  function generateNotifications() {
    const overdue = vaccinations.value.filter(v => v.status === 'overdue')
    const upcoming = vaccinations.value.filter(v => v.status === 'upcoming')

    const newNotifs: CustomerNotification[] = [
      ...overdue.map(v => ({
        id: `notif-overdue-${v.id}`,
        type: 'vaccine' as const,
        read: false,
        title: '⚠️ Quá hạn tiêm vaccine',
        petName: v.petName,
        message: `${v.petName} đã quá hạn tiêm ${v.vaccineName}! Hãy đặt lịch ngay.`,
        date: new Date().toISOString(),
      })),
      ...upcoming.filter(v => {
        const daysLeft = Math.ceil((new Date(v.nextDueDate).getTime() - Date.now()) / 86400000)
        return daysLeft <= 14
      }).map(v => {
        const daysLeft = Math.ceil((new Date(v.nextDueDate).getTime() - Date.now()) / 86400000)
        return {
          id: `notif-upcoming-${v.id}`,
          type: 'vaccine' as const,
          read: false,
          title: 'Sắp đến lịch tiêm phòng',
          petName: v.petName,
          message: `${v.petName} cần tiêm ${v.vaccineName} trong ${daysLeft} ngày nữa.`,
          date: new Date().toISOString(),
        }
      }),
    ]

    // Chỉ thêm notification chưa có
    const existingIds = new Set(notifications.value.map(n => n.id))
    newNotifs.forEach(n => {
      if (!existingIds.has(n.id)) notifications.value.unshift(n)
    })
  }

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
    fetchVaccinations, getVaccinationsByPet, markNotifRead, markAllRead
  }
})
