import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Appointment, AppointmentStatus, AppointmentType } from '../types'

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-001', petId: 'pet-001', doctorId: 'doc-001',
    date: new Date().toISOString().split('T')[0],
    time: '08:30', type: 'checkup', status: 'waiting',
    notes: 'Thú cưng bỏ ăn 2 ngày', createdAt: new Date().toISOString(),
    pet: { id: 'pet-001', name: 'Mochi', species: 'cat', breed: 'Mèo Anh lông ngắn', age: 3, weight: 4.2, gender: 'male', color: 'Xám', ownerId: 'own-001', owner: { id: 'own-001', name: 'Trần Thị Mai', phone: '0912 345 678', email: 'mai@gmail.com', address: 'Q1, TP.HCM' } }
  },
  {
    id: 'appt-002', petId: 'pet-002', doctorId: 'doc-001',
    date: new Date().toISOString().split('T')[0],
    time: '09:00', type: 'vaccination', status: 'in_progress',
    notes: 'Tiêm vaccine năm thứ 2', createdAt: new Date().toISOString(),
    pet: { id: 'pet-002', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', age: 2, weight: 28, gender: 'male', color: 'Vàng', ownerId: 'own-002', owner: { id: 'own-002', name: 'Nguyễn Văn Hùng', phone: '0909 876 543', email: 'hung@gmail.com', address: 'Q3, TP.HCM' } }
  },
  {
    id: 'appt-003', petId: 'pet-003', doctorId: 'doc-001',
    date: new Date().toISOString().split('T')[0],
    time: '10:30', type: 'checkup', status: 'completed',
    notes: '', createdAt: new Date().toISOString(),
    pet: { id: 'pet-003', name: 'Kitty', species: 'cat', breed: 'Mèo Ba Tư', age: 5, weight: 3.8, gender: 'female', color: 'Trắng', ownerId: 'own-003', owner: { id: 'own-003', name: 'Lê Thị Hoa', phone: '0938 765 432', email: 'hoa@gmail.com', address: 'Q7, TP.HCM' } }
  },
  {
    id: 'appt-004', petId: 'pet-004', doctorId: 'doc-001',
    date: new Date().toISOString().split('T')[0],
    time: '14:00', type: 'surgery', status: 'waiting',
    notes: 'Triệt sản', createdAt: new Date().toISOString(),
    pet: { id: 'pet-004', name: 'Rex', species: 'dog', breed: 'Husky', age: 1, weight: 15, gender: 'male', color: 'Đen trắng', ownerId: 'own-004', owner: { id: 'own-004', name: 'Phạm Minh Tuấn', phone: '0977 123 456', email: 'tuan@gmail.com', address: 'Bình Thạnh, TP.HCM' } }
  },
  {
    id: 'appt-005', petId: 'pet-005', doctorId: 'doc-001',
    date: new Date().toISOString().split('T')[0],
    time: '15:30', type: 'follow_up', status: 'waiting',
    notes: 'Tái khám sau mổ', createdAt: new Date().toISOString(),
    pet: { id: 'pet-005', name: 'Luna', species: 'rabbit', breed: 'Thỏ Hà Lan', age: 1, weight: 1.5, gender: 'female', color: 'Trắng đen', ownerId: 'own-005', owner: { id: 'own-005', name: 'Vũ Thu Hằng', phone: '0946 654 321', email: 'hang@gmail.com', address: 'Gò Vấp, TP.HCM' } }
  },
  {
    id: 'appt-006', petId: 'pet-001', doctorId: 'doc-001',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '09:00', type: 'checkup', status: 'waiting',
    notes: 'Tái khám', createdAt: new Date().toISOString(),
    pet: { id: 'pet-001', name: 'Mochi', species: 'cat', breed: 'Mèo Anh lông ngắn', age: 3, weight: 4.2, gender: 'male', color: 'Xám', ownerId: 'own-001', owner: { id: 'own-001', name: 'Trần Thị Mai', phone: '0912 345 678', email: 'mai@gmail.com', address: 'Q1, TP.HCM' } }
  },
  {
    id: 'appt-007', petId: 'pet-002', doctorId: 'doc-001',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: '11:00', type: 'grooming', status: 'completed',
    notes: 'Cắt móng, tắm', createdAt: new Date().toISOString(),
    pet: { id: 'pet-002', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', age: 2, weight: 28, gender: 'male', color: 'Vàng', ownerId: 'own-002', owner: { id: 'own-002', name: 'Nguyễn Văn Hùng', phone: '0909 876 543', email: 'hung@gmail.com', address: 'Q3, TP.HCM' } }
  },
]

export const useAppointmentStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>(MOCK_APPOINTMENTS)
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

  function addAppointment(data: Omit<Appointment, 'id' | 'createdAt'>) {
    const newAppt: Appointment = {
      ...data,
      id: `appt-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    appointments.value.unshift(newAppt)
    return newAppt
  }

  function updateAppointment(id: string, data: Partial<Appointment>) {
    const idx = appointments.value.findIndex(a => a.id === id)
    if (idx !== -1) {
      appointments.value[idx] = { ...appointments.value[idx], ...data }
    }
  }

  function deleteAppointment(id: string) {
    appointments.value = appointments.value.filter(a => a.id !== id)
  }

  function updateStatus(id: string, status: AppointmentStatus) {
    updateAppointment(id, { status })
  }

  function searchAppointments(query: string, status?: AppointmentStatus, date?: string) {
    return appointments.value.filter(a => {
      const q = query.toLowerCase()
      const matchQuery = !query ||
        a.pet?.name.toLowerCase().includes(q) ||
        a.pet?.owner?.name.toLowerCase().includes(q) ||
        a.pet?.breed.toLowerCase().includes(q)
      const matchStatus = !status || a.status === status
      const matchDate = !date || a.date === date
      return matchQuery && matchStatus && matchDate
    })
  }

  return {
    appointments, isLoading,
    todayAppointments, completedToday, upcomingToday,
    addAppointment, updateAppointment, deleteAppointment,
    updateStatus, searchAppointments
  }
})
