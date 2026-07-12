import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Customer } from '../types'
import api from '../services/api'

export const useCustomerAuthStore = defineStore('customerAuth', () => {
  const customer = ref<Customer | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)

  const initials = computed(() => {
    if (!customer.value) return 'KH'
    return customer.value.name.split(' ').slice(-2).map(w => w[0]).join('')
  })

  function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    return api.post<{ accessToken: string; refreshToken: string; user: Customer }>(
      '/auth/customer/login',
      { email, password }
    ).then(res => {
      if (res.success && res.data) {
        customer.value = res.data.user
        isAuthenticated.value = true
        localStorage.setItem('petcare_customer_token', res.data.accessToken)
        localStorage.setItem('petcare_customer_refresh_token', res.data.refreshToken)
        return true
      }
      return false
    }).catch(() => false)
      .finally(() => { isLoading.value = false })
  }

  function register(data: { name: string; email: string; phone: string; password: string }): Promise<boolean> {
    isLoading.value = true
    return api.post<{ accessToken: string; refreshToken: string; user: Customer }>(
      '/auth/customer/register',
      data
    ).then(res => {
      if (res.success && res.data) {
        customer.value = res.data.user
        isAuthenticated.value = true
        localStorage.setItem('petcare_customer_token', res.data.accessToken)
        localStorage.setItem('petcare_customer_refresh_token', res.data.refreshToken)
        return true
      }
      return false
    }).catch(() => false)
      .finally(() => { isLoading.value = false })
  }

  function logout() {
    customer.value = null
    isAuthenticated.value = false
    localStorage.removeItem('petcare_customer_token')
    localStorage.removeItem('petcare_customer_refresh_token')
  }

  async function checkAuth() {
    const token = localStorage.getItem('petcare_customer_token')
    if (!token) return
    try {
      const res = await api.get<Customer>('/customers/me')
      if (res.success && res.data) {
        customer.value = res.data
        isAuthenticated.value = true
      }
    } catch {
      logout()
    }
  }

  function sendResetEmail(email: string): Promise<boolean> {
    return api.post('/auth/customer/forgot-password', { email })
      .then(res => res.success)
      .catch(() => false)
  }

  function verifyOTP(_otp: string): Promise<boolean> {
    return Promise.resolve(true)
  }

  function resetPassword(password: string): Promise<boolean> {
    return api.post('/auth/customer/reset-password', { password })
      .then(res => res.success)
      .catch(() => false)
  }

  function updateProfile(data: Partial<Customer>): Promise<boolean> {
    isLoading.value = true
    return api.put<Customer>('/customers/me', data)
      .then(res => {
        if (res.success && res.data) {
          customer.value = res.data
          return true
        }
        return false
      }).catch(() => false)
      .finally(() => { isLoading.value = false })
  }

  return {
    customer,
    isAuthenticated,
    isLoading,
    initials,
    login,
    register,
    logout,
    checkAuth,
    sendResetEmail,
    verifyOTP,
    resetPassword,
    updateProfile
  }
})
