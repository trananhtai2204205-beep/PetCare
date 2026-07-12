import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Invoice, PaymentStatus } from '../types'

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    customerId: 'cus-001',
    petName: 'Mochi',
    date: '2026-06-20',
    dueDate: '2026-06-27',
    items: [
      { description: 'Khám tổng quát', quantity: 1, unitPrice: 150000, total: 150000 },
      { description: 'Xét nghiệm máu', quantity: 1, unitPrice: 250000, total: 250000 },
      { description: 'Apoquel 16mg (14 viên)', quantity: 1, unitPrice: 420000, total: 420000 },
    ],
    totalAmount: 820000,
    paidAmount: 820000,
    status: 'paid',
    paymentMethod: 'cash',
    notes: 'Thanh toán tại quầy'
  },
  {
    id: 'inv-002',
    customerId: 'cus-001',
    petName: 'Luna',
    date: '2026-05-15',
    dueDate: '2026-05-22',
    items: [
      { description: 'Khám tổng quát', quantity: 1, unitPrice: 150000, total: 150000 },
      { description: 'Metronidazole 250mg (10 viên)', quantity: 1, unitPrice: 80000, total: 80000 },
    ],
    totalAmount: 230000,
    paidAmount: 230000,
    status: 'paid',
    paymentMethod: 'momo'
  },
  {
    id: 'inv-003',
    customerId: 'cus-001',
    petName: 'Mochi',
    date: '2026-07-01',
    dueDate: '2026-07-08',
    items: [
      { description: 'Đặt cọc lịch khám 10/07', quantity: 1, unitPrice: 100000, total: 100000 },
    ],
    totalAmount: 100000,
    paidAmount: 0,
    status: 'pending',
  },
  {
    id: 'inv-004',
    customerId: 'cus-001',
    petName: 'Luna',
    date: '2026-06-01',
    dueDate: '2026-06-05',
    items: [
      { description: 'Vaccine Felocell CVR Dose 2', quantity: 1, unitPrice: 280000, total: 280000 },
    ],
    totalAmount: 280000,
    paidAmount: 0,
    status: 'overdue',
  }
]

export const useInvoicesStore = defineStore('customerInvoices', () => {
  const invoices = ref<Invoice[]>([...MOCK_INVOICES])
  const isProcessing = ref(false)

  const totalPaid = computed(() =>
    invoices.value.filter(i => i.status === 'paid').reduce((s, i) => s + i.totalAmount, 0)
  )
  const pendingAmount = computed(() =>
    invoices.value.filter(i => i.status !== 'paid').reduce((s, i) => s + (i.totalAmount - i.paidAmount), 0)
  )

  const statusMap: Record<PaymentStatus, { label: string; class: string; icon: string }> = {
    paid: { label: 'Đã thanh toán', class: 'badge-success', icon: '✅' },
    pending: { label: 'Chưa thanh toán', class: 'badge-warning', icon: '⏳' },
    overdue: { label: 'Quá hạn', class: 'badge-danger', icon: '🚨' }
  }

  const paymentMethodMap: Record<string, { label: string; icon: string }> = {
    cash: { label: 'Tiền mặt', icon: '💵' },
    vnpay: { label: 'VNPay', icon: '🏦' },
    momo: { label: 'MoMo', icon: '📱' },
    bank_transfer: { label: 'Chuyển khoản', icon: '🏧' }
  }

  function payOnline(id: string, method: 'vnpay' | 'momo'): Promise<boolean> {
    return new Promise((resolve) => {
      isProcessing.value = true
      setTimeout(() => {
        const idx = invoices.value.findIndex(i => i.id === id)
        if (idx !== -1) {
          invoices.value[idx].status = 'paid'
          invoices.value[idx].paidAmount = invoices.value[idx].totalAmount
          invoices.value[idx].paymentMethod = method
        }
        isProcessing.value = false
        resolve(true)
      }, 1500)
    })
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return { invoices, isProcessing, totalPaid, pendingAmount, statusMap, paymentMethodMap, payOnline, formatCurrency }
})
