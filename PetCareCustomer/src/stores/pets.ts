import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CustomerPet } from '../types'

const MOCK_PETS: CustomerPet[] = [
  {
    id: 'pet-001',
    customerId: 'cus-001',
    name: 'Mochi',
    species: 'dog',
    breed: 'Shiba Inu',
    age: 3,
    weight: 8.5,
    gender: 'male',
    color: 'Cam vàng',
    microchipId: 'MC-2024-001',
    notes: 'Hay bị dị ứng thức ăn'
  },
  {
    id: 'pet-002',
    customerId: 'cus-001',
    name: 'Luna',
    species: 'cat',
    breed: 'British Shorthair',
    age: 2,
    weight: 4.2,
    gender: 'female',
    color: 'Xám xanh',
    notes: ''
  },
  {
    id: 'pet-003',
    customerId: 'cus-001',
    name: 'Biscuit',
    species: 'rabbit',
    breed: 'Holland Lop',
    age: 1,
    weight: 2.1,
    gender: 'male',
    color: 'Trắng nâu',
  }
]

export const usePetsStore = defineStore('customerPets', () => {
  const pets = ref<CustomerPet[]>([...MOCK_PETS])
  const isLoading = ref(false)

  const totalPets = computed(() => pets.value.length)

  function getPetById(id: string) {
    return pets.value.find(p => p.id === id)
  }

  function addPet(data: Omit<CustomerPet, 'id' | 'customerId'>): Promise<CustomerPet> {
    return new Promise((resolve) => {
      isLoading.value = true
      setTimeout(() => {
        const newPet: CustomerPet = {
          id: 'pet-' + Date.now(),
          customerId: 'cus-001',
          ...data
        }
        pets.value.unshift(newPet)
        isLoading.value = false
        resolve(newPet)
      }, 700)
    })
  }

  function updatePet(id: string, data: Partial<CustomerPet>): Promise<boolean> {
    return new Promise((resolve) => {
      isLoading.value = true
      setTimeout(() => {
        const idx = pets.value.findIndex(p => p.id === id)
        if (idx !== -1) {
          pets.value[idx] = { ...pets.value[idx], ...data }
        }
        isLoading.value = false
        resolve(true)
      }, 600)
    })
  }

  function deletePet(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        pets.value = pets.value.filter(p => p.id !== id)
        resolve(true)
      }, 500)
    })
  }

  const speciesLabel = (species: string) => {
    const map: Record<string, string> = {
      dog: '🐶 Chó', cat: '🐱 Mèo', bird: '🦜 Chim',
      rabbit: '🐰 Thỏ', other: '🐾 Khác'
    }
    return map[species] || species
  }

  return { pets, isLoading, totalPets, getPetById, addPet, updatePet, deletePet, speciesLabel }
})
