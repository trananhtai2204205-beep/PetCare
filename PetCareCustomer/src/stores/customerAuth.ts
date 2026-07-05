import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Customer } from '../types'

const MOCK_CUSTOMER: Customer = {
  id: 'cus-001',
  name: 'Nguyễn Thị Lan',
  email: 'lan.nguyen@gmail.com',
  phone: '0912 345 678',
  address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
  avatar: '',
  createdAt: '2024-01-15'
}

export const useCustomerAuthStore = defineStore('customerAuth', () => {
  const customer = ref<Customer | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)

  const initials = computed(() => {
    if (!customer.value) return 'KH'
    return customer.value.name.split(' ').slice(-2).map(w => w[0]).join('')
  })

  function login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      isLoading.value = true
      setTimeout(() => {
        if (email && password.length >= 6) {
          customer.value = { ...MOCK_CUSTOMER, email }
          isAuthenticated.value = true
          localStorage.setItem('petcare_customer_auth', 'true')
          localStorage.setItem('petcare_customer_email', email)
          isLoading.value = false
          resolve(true)
        } else {
          isLoading.value = false
          resolve(false)
        }
      }, 1000)
    })
  }

  function register(data: { name: string; email: string; phone: string; password: string }): Promise<boolean> {
    return new Promise((resolve) => {
      isLoading.value = true
      setTimeout(() => {
        customer.value = {
          id: 'cus-' + Date.now(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: '',
          avatar: '',
          createdAt: new Date().toISOString().split('T')[0]
        }
        isAuthenticated.value = true
        localStorage.setItem('petcare_customer_auth', 'true')
        isLoading.value = false
        resolve(true)
      }, 1200)
    })
  }

  function logout() {
    customer.value = null
    isAuthenticated.value = false
    localStorage.removeItem('petcare_customer_auth')
    localStorage.removeItem('petcare_customer_email')
  }

  function checkAuth() {
    const saved = localStorage.getItem('petcare_customer_auth')
    if (saved === 'true') {
      const email = localStorage.getItem('petcare_customer_email') || MOCK_CUSTOMER.email
      customer.value = { ...MOCK_CUSTOMER, email }
      isAuthenticated.value = true
    }
  }

  function sendResetEmail(_email: string): Promise<boolean> {
    return new Promise((resolve) => { setTimeout(() => resolve(true), 800) })
  }

  function verifyOTP(_otp: string): Promise<boolean> {
    return new Promise((resolve) => { setTimeout(() => resolve(true), 600) })
  }

  function resetPassword(_password: string): Promise<boolean> {
    return new Promise((resolve) => { setTimeout(() => resolve(true), 600) })
  }

  function updateProfile(data: Partial<Customer>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (customer.value) {
          customer.value = { ...customer.value, ...data }
        }
        resolve(true)
      }, 700)
    })
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
