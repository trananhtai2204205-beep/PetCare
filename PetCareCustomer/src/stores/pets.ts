import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CustomerPet } from '../types'
import api from '../services/api'

export const usePetsStore = defineStore('customerPets', () => {
  const pets = ref<CustomerPet[]>([])
  const isLoading = ref(false)

  const totalPets = computed(() => pets.value.length)

  function getPetById(id: string) {
    return pets.value.find(p => p.id === id)
  }

  async function fetchPets(): Promise<void> {
    isLoading.value = true
    try {
      const res = await api.get<CustomerPet[]>('/pets')
      if (res.success && res.data) pets.value = res.data
    } catch (err) {
      console.error('fetchPets:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function addPet(data: Omit<CustomerPet, 'id' | 'customerId'>): Promise<CustomerPet | null> {
    isLoading.value = true
    try {
      const res = await api.post<CustomerPet>('/pets', data)
      if (res.success && res.data) {
        pets.value.unshift(res.data)
        return res.data
      }
      return null
    } catch (err) {
      console.error('addPet:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function updatePet(id: string, data: Partial<CustomerPet>): Promise<boolean> {
    isLoading.value = true
    try {
      const res = await api.put<CustomerPet>(`/pets/${id}`, data)
      if (res.success && res.data) {
        const idx = pets.value.findIndex(p => p.id === id)
        if (idx !== -1) pets.value[idx] = res.data
        return true
      }
      return false
    } catch {
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function deletePet(id: string): Promise<boolean> {
    try {
      const res = await api.delete(`/pets/${id}`)
      if (res.success) {
        pets.value = pets.value.filter(p => p.id !== id)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const speciesLabel = (species: string) => {
    const map: Record<string, string> = {
      dog: '🐶 Chó', cat: '🐱 Mèo', bird: '🦜 Chim',
      rabbit: '🐰 Thỏ', other: '🐾 Khác'
    }
    return map[species] || species
  }

  return { pets, isLoading, totalPets, getPetById, fetchPets, addPet, updatePet, deletePet, speciesLabel }
})
