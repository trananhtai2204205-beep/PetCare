import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Doctor } from '../types'

const MOCK_DOCTOR: Doctor = {
  id: 'doc-001',
  name: 'BS. Nguyễn Minh Khoa',
  email: 'dr.khoa@petcare.vn',
  phone: '0901 234 567',
  specialty: 'Thú y tổng quát',
  avatar: '',
  licenseNumber: 'BS-TV-2024-001'
}

export const useAuthStore = defineStore('auth', () => {
  const doctor = ref<Doctor | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)

  function login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      isLoading.value = true
      setTimeout(() => {
        if (email && password.length >= 6) {
          doctor.value = { ...MOCK_DOCTOR, email }
          isAuthenticated.value = true
          localStorage.setItem('petcare_auth', 'true')
          isLoading.value = false
          resolve(true)
        } else {
          isLoading.value = false
          resolve(false)
        }
      }, 1000)
    })
  }

  function logout() {
    doctor.value = null
    isAuthenticated.value = false
    localStorage.removeItem('petcare_auth')
  }

  function checkAuth() {
    const saved = localStorage.getItem('petcare_auth')
    if (saved === 'true') {
      doctor.value = MOCK_DOCTOR
      isAuthenticated.value = true
    }
  }

  function sendResetEmail(_email: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 800)
    })
  }

  function verifyOTP(_otp: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 600)
    })
  }

  function resetPassword(_password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 600)
    })
  }

  return {
    doctor,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
    sendResetEmail,
    verifyOTP,
    resetPassword
  }
})
