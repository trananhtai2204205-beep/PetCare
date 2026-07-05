// ===== CUSTOMER AUTH =====
export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  avatar?: string
  createdAt: string
}

// ===== CUSTOMER PET =====
export interface CustomerPet {
  id: string
  customerId: string
  name: string
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other'
  breed: string
  age: number
  weight: number
  gender: 'male' | 'female'
  color: string
  avatar?: string
  microchipId?: string
  notes?: string
}

// ===== BOOKING =====
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type BookingType = 'checkup' | 'vaccination' | 'surgery' | 'grooming' | 'emergency' | 'follow_up'

export interface Doctor {
  id: string
  name: string
  specialty: string
  avatar?: string
  schedule?: string[]
}

export interface Booking {
  id: string
  customerId: string
  petId: string
  petName?: string
  petSpecies?: string
  doctorId?: string
  doctorName?: string
  date: string
  time: string
  type: BookingType
  status: BookingStatus
  symptoms?: string
  notes?: string
  createdAt: string
}

// ===== HEALTH RECORDS =====
export interface CustomerPrescription {
  medicineName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export interface LabResult {
  name: string
  value: string
  unit: string
  status: 'normal' | 'high' | 'low'
}

export interface CustomerMedicalRecord {
  id: string
  petId: string
  petName: string
  petSpecies: string
  doctorName: string
  date: string
  symptoms: string[]
  diagnosis: string
  treatment: string
  prescriptions: CustomerPrescription[]
  labResults?: LabResult[]
  notes: string
  weight?: number
  temperature?: number
  nextVisitDate?: string
}

// ===== VACCINATION =====
export type VaccineStatus = 'completed' | 'upcoming' | 'overdue'

export interface CustomerVaccinationRecord {
  id: string
  petId: string
  petName: string
  petSpecies: string
  vaccineName: string
  doseNumber: number
  totalDoses: number
  administeredDate?: string
  nextDueDate: string
  status: VaccineStatus
  batchNumber?: string
  doctorName?: string
  notes?: string
}

// ===== INVOICE =====
export type PaymentStatus = 'paid' | 'pending' | 'overdue'
export type PaymentMethod = 'cash' | 'vnpay' | 'momo' | 'bank_transfer'

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Invoice {
  id: string
  customerId: string
  petName: string
  date: string
  dueDate: string
  items: InvoiceItem[]
  totalAmount: number
  paidAmount: number
  status: PaymentStatus
  paymentMethod?: PaymentMethod
  notes?: string
}

// ===== NOTIFICATION =====
export type NotifType = 'vaccine' | 'appointment' | 'invoice' | 'health'

export interface CustomerNotification {
  id: string
  type: NotifType
  title: string
  message: string
  date: string
  read: boolean
  petName?: string
}
