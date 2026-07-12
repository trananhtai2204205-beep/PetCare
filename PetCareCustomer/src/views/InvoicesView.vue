<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div>
        <h2 class="page-title"><span class="title-icon" style="background:rgba(245,158,11,0.1)">💰</span> Hóa đơn</h2>
        <p class="page-subtitle">Lịch sử thanh toán và hóa đơn dịch vụ</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="invoice-summary">
      <div class="sum-card green">
        <div class="sum-icon">✅</div>
        <div>
          <p class="sum-val">{{ formatCurrency(invoicesStore.totalPaid) }}</p>
          <p class="sum-label">Đã thanh toán</p>
        </div>
      </div>
      <div class="sum-card orange">
        <div class="sum-icon">⏳</div>
        <div>
          <p class="sum-val">{{ formatCurrency(invoicesStore.pendingAmount) }}</p>
          <p class="sum-label">Còn phải trả</p>
        </div>
      </div>
      <div class="sum-card blue">
        <div class="sum-icon">📄</div>
        <div>
          <p class="sum-val">{{ invoices.length }}</p>
          <p class="sum-label">Tổng hóa đơn</p>
        </div>
      </div>
    </div>

    <!-- Status Filter -->
    <div class="tabs mb-4">
      <button v-for="tab in tabs" :key="tab.value" :class="['tab-item', { active: statusFilter === tab.value }]" @click="statusFilter = tab.value">
        {{ tab.label }}
      </button>
    </div>

    <!-- Invoice List -->
    <div v-if="filteredInvoices.length === 0" class="empty-state">
      <div class="empty-icon">💰</div>
      <p>Không có hóa đơn nào</p>
    </div>

    <div v-else class="invoices-list">
      <div v-for="inv in filteredInvoices" :key="inv.id" class="invoice-card">
        <div class="invoice-header">
          <div class="invoice-id-col">
            <p class="invoice-id">#{{ inv.id.toUpperCase() }}</p>
            <p class="invoice-date text-muted text-sm">{{ formatDate(inv.date) }}</p>
          </div>
          <div class="invoice-pet">
            <span>🐾 {{ inv.petName }}</span>
          </div>
          <div class="invoice-amount-col">
            <p class="invoice-total">{{ formatCurrency(inv.totalAmount) }}</p>
            <span class="badge" :class="invoicesStore.statusMap[inv.status].class">
              {{ invoicesStore.statusMap[inv.status].icon }} {{ invoicesStore.statusMap[inv.status].label }}
            </span>
          </div>
          <button class="expand-btn" :class="{ open: expandedId === inv.id }" @click="toggleInvoice(inv.id)">▾</button>
        </div>

        <transition name="slide-down">
          <div v-if="expandedId === inv.id" class="invoice-body">
            <!-- Items table -->
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Mô tả dịch vụ</th>
                    <th style="text-align:center">SL</th>
                    <th style="text-align:right">Đơn giá</th>
                    <th style="text-align:right">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in inv.items" :key="item.description">
                    <td>{{ item.description }}</td>
                    <td style="text-align:center">{{ item.quantity }}</td>
                    <td style="text-align:right">{{ formatCurrency(item.unitPrice) }}</td>
                    <td style="text-align:right"><strong>{{ formatCurrency(item.total) }}</strong></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="3" style="text-align:right;font-weight:700">Tổng cộng</td>
                    <td style="text-align:right"><strong class="total-amount">{{ formatCurrency(inv.totalAmount) }}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Payment info & actions -->
            <div class="invoice-footer-info">
              <div class="invoice-meta-row">
                <span class="text-muted text-sm">📅 Ngày đến hạn: <strong>{{ formatDate(inv.dueDate) }}</strong></span>
                <span v-if="inv.paymentMethod" class="text-muted text-sm">
                  {{ invoicesStore.paymentMethodMap[inv.paymentMethod]?.icon }}
                  {{ invoicesStore.paymentMethodMap[inv.paymentMethod]?.label }}
                </span>
                <span v-if="inv.notes" class="text-muted text-sm">📝 {{ inv.notes }}</span>
              </div>

              <!-- Pay online buttons -->
              <div v-if="inv.status !== 'paid'" class="pay-actions">
                <p class="pay-title">Thanh toán online:</p>
                <button class="btn btn-vnpay" @click="handlePay(inv.id, 'vnpay')" :disabled="invoicesStore.isProcessing" :id="`pay-vnpay-${inv.id}`">
                  <span>🏦</span> Thanh toán VNPay
                </button>
                <button class="btn btn-momo" @click="handlePay(inv.id, 'momo')" :disabled="invoicesStore.isProcessing" :id="`pay-momo-${inv.id}`">
                  <span>📱</span> Thanh toán MoMo
                </button>
              </div>
              <div v-else class="paid-confirm">
                ✅ Đã thanh toán {{ inv.paidAmount === inv.totalAmount ? 'đầy đủ' : '' }} bằng {{ invoicesStore.paymentMethodMap[inv.paymentMethod || 'cash']?.label }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Payment Success Toast -->
    <transition name="slide-up-toast">
      <div v-if="showPaySuccess" class="pay-toast">
        ✅ Thanh toán thành công!
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInvoicesStore } from '../stores/invoices'

const invoicesStore = useInvoicesStore()
const invoices = invoicesStore.invoices
const expandedId = ref<string | null>(null)
const statusFilter = ref('all')
const showPaySuccess = ref(false)

const tabs = [
  { value: 'all', label: '📋 Tất cả' },
  { value: 'paid', label: '✅ Đã thanh toán' },
  { value: 'pending', label: '⏳ Chưa thanh toán' },
  { value: 'overdue', label: '🚨 Quá hạn' },
]

const filteredInvoices = computed(() => {
  const sorted = [...invoices].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return statusFilter.value === 'all' ? sorted : sorted.filter(i => i.status === statusFilter.value)
})

function toggleInvoice(id: string) { expandedId.value = expandedId.value === id ? null : id }
function formatDate(d: string) { return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
function formatCurrency(n: number) { return invoicesStore.formatCurrency(n) }

async function handlePay(id: string, method: 'vnpay' | 'momo') {
  if (!confirm(`Xác nhận thanh toán bằng ${method === 'vnpay' ? 'VNPay' : 'MoMo'}?`)) return
  await invoicesStore.payOnline(id, method)
  showPaySuccess.value = true
  setTimeout(() => showPaySuccess.value = false, 3000)
}
</script>

<style scoped>
.mb-4 { margin-bottom: 16px; }

.invoice-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.sum-card { background: white; border-radius: var(--radius-lg); border: 1px solid var(--border); padding: 20px; display: flex; align-items: center; gap: 14px; box-shadow: var(--shadow-sm); }
.sum-icon { font-size: 28px; }
.sum-val { font-size: 20px; font-weight: 800; color: var(--text-primary); }
.sum-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.sum-card.green { border-left: 4px solid #10B981; }
.sum-card.orange { border-left: 4px solid #F59E0B; }
.sum-card.blue { border-left: 4px solid #0EA5E9; }

.invoices-list { display: flex; flex-direction: column; gap: 12px; }
.invoice-card { background: white; border-radius: var(--radius-lg); border: 1px solid var(--border); overflow: hidden; box-shadow: var(--shadow-sm); }
.invoice-header { display: flex; align-items: center; gap: 16px; padding: 18px 24px; cursor: pointer; }
.invoice-id-col { min-width: 120px; }
.invoice-id { font-size: 14px; font-weight: 700; color: var(--text-primary); font-family: monospace; }
.invoice-pet { flex: 1; font-size: 14px; font-weight: 500; color: var(--text-secondary); }
.invoice-amount-col { text-align: right; }
.invoice-total { font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
.expand-btn { width: 32px; height: 32px; border-radius: 8px; background: var(--bg-hover); border: 1px solid var(--border); cursor: pointer; font-size: 16px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.expand-btn.open { transform: rotate(180deg); }

.invoice-body { border-top: 1px solid var(--border); }
.total-row td { background: #F8FAFC; padding: 12px 16px !important; }
.total-amount { font-size: 16px; color: var(--text-primary); }

.invoice-footer-info { padding: 16px 24px; }
.invoice-meta-row { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 14px; }
.pay-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.pay-title { font-size: 13px; font-weight: 600; color: var(--text-secondary); }
.btn-vnpay { background: linear-gradient(135deg, #0052B4, #0070D8); color: white; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; border: none; cursor: pointer; transition: all 0.2s; }
.btn-vnpay:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,82,180,0.3); }
.btn-momo { background: linear-gradient(135deg, #AE2070, #D0266E); color: white; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; border: none; cursor: pointer; transition: all 0.2s; }
.btn-momo:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(174,32,112,0.3); }
.btn-vnpay:disabled, .btn-momo:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.paid-confirm { font-size: 14px; font-weight: 600; color: #059669; background: #D1FAE5; border: 1px solid #BBF7D0; border-radius: 10px; padding: 10px 16px; }

.pay-toast {
  position: fixed; bottom: 32px; right: 32px;
  background: #065F46; color: white; padding: 14px 24px; border-radius: 12px;
  font-size: 15px; font-weight: 600; box-shadow: 0 8px 24px rgba(0,0,0,0.2); z-index: 9999;
}
.slide-up-toast-enter-active, .slide-up-toast-leave-active { transition: all 0.3s ease; }
.slide-up-toast-enter-from, .slide-up-toast-leave-to { opacity: 0; transform: translateY(20px); }

.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; overflow: hidden; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; max-height: 0; }
.slide-down-enter-to, .slide-down-leave-from { opacity: 1; max-height: 2000px; }
</style>
