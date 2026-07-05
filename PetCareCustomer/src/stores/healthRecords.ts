import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CustomerMedicalRecord } from '../types'

const MOCK_RECORDS: CustomerMedicalRecord[] = [
  {
    id: 'mr-001',
    petId: 'pet-001',
    petName: 'Mochi',
    petSpecies: 'dog',
    doctorName: 'BS. Nguyễn Minh Khoa',
    date: '2026-06-20',
    symptoms: ['Ngứa da', 'Gãi nhiều', 'Lông xơ xác'],
    diagnosis: 'Viêm da dị ứng do thức ăn',
    treatment: 'Dùng thuốc kháng histamine + thay đổi chế độ ăn',
    prescriptions: [
      { medicineName: 'Apoquel 16mg', dosage: '1 viên/ngày', frequency: 'Uống buổi sáng', duration: '14 ngày', instructions: 'Uống sau ăn' },
      { medicineName: 'Shampoo Malaseb', dosage: 'Tắm 2 lần/tuần', frequency: '2 lần/tuần', duration: '4 tuần', instructions: 'Để 10 phút trước khi xả' }
    ],
    labResults: [
      { name: 'IgE (Dị ứng)', value: '85', unit: 'IU/mL', status: 'high' },
      { name: 'WBC', value: '7.2', unit: 'K/μL', status: 'normal' }
    ],
    notes: 'Theo dõi sau 2 tuần, tái khám nếu không cải thiện',
    weight: 8.5,
    temperature: 38.6,
    nextVisitDate: '2026-07-10'
  },
  {
    id: 'mr-002',
    petId: 'pet-002',
    petName: 'Luna',
    petSpecies: 'cat',
    doctorName: 'BS. Trần Thị Mai',
    date: '2026-05-15',
    symptoms: ['Nôn mửa', 'Bỏ ăn 2 ngày'],
    diagnosis: 'Rối loạn tiêu hóa nhẹ',
    treatment: 'Nhịn ăn 12 giờ, chế độ ăn nhạt',
    prescriptions: [
      { medicineName: 'Metronidazole 250mg', dosage: '1/2 viên', frequency: '2 lần/ngày', duration: '5 ngày', instructions: 'Trộn vào thức ăn' }
    ],
    notes: 'Theo dõi tại nhà',
    weight: 4.1,
    temperature: 39.0,
  },
  {
    id: 'mr-003',
    petId: 'pet-001',
    petName: 'Mochi',
    petSpecies: 'dog',
    doctorName: 'BS. Nguyễn Minh Khoa',
    date: '2026-03-10',
    symptoms: ['Kiểm tra định kỳ'],
    diagnosis: 'Sức khỏe tổng quát tốt',
    treatment: 'Không cần điều trị',
    prescriptions: [],
    notes: 'Tiếp tục bổ sung Omega-3',
    weight: 8.2,
    temperature: 38.5,
    nextVisitDate: '2026-06-10'
  }
]

export const useHealthRecordsStore = defineStore('customerHealthRecords', () => {
  const records = ref<CustomerMedicalRecord[]>([...MOCK_RECORDS])

  function getRecordsByPet(petId: string) {
    return records.value.filter(r => r.id === 'all' || r.petId === petId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  function getAllRecords() {
    return [...records.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return { records, getRecordsByPet, getAllRecords }
})
