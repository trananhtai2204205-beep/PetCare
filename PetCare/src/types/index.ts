// ===== AUTH =====
export interface Doctor {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  avatar: string
  licenseNumber: string
}

// ===== PET & OWNER =====
export interface Owner {
  id: string
  name: string
  phone: string
  email: string
  address: string
}

export interface Pet {
  id: string
  name: string
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other'
  breed: string
  age: number
  weight: number
  gender: 'male' | 'female'
  color: string
  ownerId: string
  owner?: Owner
  avatar?: string
}

// ===== APPOINTMENT =====
export type AppointmentStatus = 'waiting' | 'in_progress' | 'completed' | 'cancelled'
export type AppointmentType = 'checkup' | 'vaccination' | 'surgery' | 'grooming' | 'emergency' | 'follow_up'

export interface Appointment {
  id: string
  petId: string
  pet?: Pet
  doctorId: string
  date: string
  time: string
  type: AppointmentType
  status: AppointmentStatus
  notes?: string
  createdAt: string
}

// ===== MEDICAL RECORD =====
export interface Prescription {
  id: string
  medicineName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export interface MedicalRecord {
  id: string
  appointmentId: string
  appointment?: Appointment
  petId: string
  pet?: Pet
  doctorId: string
  symptoms: string[]
  diagnosis: string
  treatment: string
  prescriptions: Prescription[]
  notes: string
  weight?: number
  temperature?: number
  nextVisitDate?: string
  createdAt: string
}

// ===== VACCINATION =====
export type VaccineStatus = 'scheduled' | 'completed' | 'overdue' | 'cancelled'

export interface Vaccine {
  id: string
  name: string
  description: string
  manufacturer: string
  dosage: string
  intervalDays: number
  requiredDoses: number
}

export interface VaccinationRecord {
  id: string
  petId: string
  pet?: Pet
  vaccineId: string
  vaccine?: Vaccine
  doseNumber: number
  administeredDate?: string
  nextDueDate: string
  status: VaccineStatus
  batchNumber?: string
  notes?: string
  doctorId?: string
}

// ===== DASHBOARD =====
export interface DashboardStats {
  todayCases: number
  completedCases: number
  waitingCases: number
  inProgressCases: number
  completionRate: number
  upcomingVaccinations: number
}
