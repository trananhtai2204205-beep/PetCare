import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Doctor } from '../types'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const doctor = ref<Doctor | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)

  function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    return api.post<{ accessToken: string; refreshToken: string; user: Doctor }>(
      '/auth/doctor/login',
      { email, password }
    ).then(res => {
      if (res.success && res.data) {
        doctor.value = res.data.user
        isAuthenticated.value = true
        localStorage.setItem('petcare_token', res.data.accessToken)
        localStorage.setItem('petcare_refresh_token', res.data.refreshToken)
        return true
      }
      return false
    }).catch(() => false)
      .finally(() => { isLoading.value = false })
  }

  function logout() {
    doctor.value = null
    isAuthenticated.value = false
    localStorage.removeItem('petcare_token')
    localStorage.removeItem('petcare_refresh_token')
  }

  async function checkAuth() {
    const token = localStorage.getItem('petcare_token')
    if (!token) return
    try {
      const res = await api.get<Doctor>('/doctors/me')
      if (res.success && res.data) {
        doctor.value = res.data
        isAuthenticated.value = true
      }
    } catch {
      logout()
    }
  }

  function sendResetEmail(email: string): Promise<boolean> {
    return api.post('/auth/doctor/forgot-password', { email })
      .then(res => res.success)
      .catch(() => false)
  }

  function verifyOTP(_otp: string): Promise<boolean> {
    // TODO: implement khi backend hỗ trợ OTP thật
    return Promise.resolve(true)
  }

  function resetPassword(password: string): Promise<boolean> {
    return api.post('/auth/doctor/reset-password', { password })
      .then(res => res.success)
      .catch(() => false)
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
