<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div>
        <h2 class="page-title"><span class="title-icon" style="background:rgba(99,102,241,0.1)">👤</span> Hồ sơ cá nhân</h2>
        <p class="page-subtitle">Cập nhật thông tin tài khoản của bạn</p>
      </div>
      <button class="btn btn-customer" @click="handleSave" :disabled="auth.isLoading" id="save-profile-btn">
        <span v-if="auth.isLoading" class="spinner-sm"></span>
        {{ auth.isLoading ? 'Đang lưu...' : '💾 Lưu thay đổi' }}
      </button>
    </div>

    <div class="profile-layout">
      <!-- Avatar Card -->
      <div class="profile-avatar-card card card-body">
        <div class="avatar-section">
          <div class="big-avatar" :style="avatarStyle">{{ auth.initials }}</div>
          <button class="change-avatar-btn">📷 Đổi ảnh đại diện</button>
        </div>
        <div class="profile-stats">
          <div class="profile-stat">
            <span class="profile-stat-val">{{ petsStore.totalPets }}</span>
            <span class="profile-stat-label">Thú cưng</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat-val">{{ bookStore.completedBookings.length }}</span>
            <span class="profile-stat-label">Lần khám</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat-val">{{ memberSince }}</span>
            <span class="profile-stat-label">Ngày tham gia</span>
          </div>
        </div>
        <div class="loyalty-badge">
          <span class="loyalty-icon">⭐</span>
          <div>
            <p class="loyalty-title">Khách hàng Vàng</p>
            <p class="loyalty-sub">Cảm ơn bạn đã tin tưởng PetCare!</p>
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="profile-form-card card">
        <div class="card-header">
          <h3 style="font-size:16px;font-weight:700">Thông tin cá nhân</h3>
        </div>
        <div class="card-body">
          <!-- Success Alert -->
          <transition name="fade-in">
            <div v-if="saveSuccess" class="alert-success">✅ Thông tin đã được cập nhật thành công!</div>
          </transition>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Họ và tên *</label>
              <div class="input-group">
                <span class="input-icon">👤</span>
                <input v-model="form.name" class="form-control" placeholder="Nguyễn Thị Lan" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <div class="input-group">
                <span class="input-icon">✉️</span>
                <input v-model="form.email" type="email" class="form-control" placeholder="email@gmail.com" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Số điện thoại</label>
              <div class="input-group">
                <span class="input-icon">📱</span>
                <input v-model="form.phone" type="tel" class="form-control" placeholder="0912 345 678" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Địa chỉ</label>
            <div class="input-group">
              <span class="input-icon">📍</span>
              <input v-model="form.address" class="form-control" placeholder="123 Đường ABC, Quận 1, TP.HCM" />
            </div>
          </div>

          <div class="divider"></div>
          <h4 style="font-size:15px;font-weight:700;margin-bottom:16px">🔒 Đổi mật khẩu</h4>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Mật khẩu hiện tại</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input v-model="passForm.current" :type="showPass ? 'text' : 'password'" class="form-control" placeholder="Nhập mật khẩu cũ" />
                <span class="input-icon-right" @click="showPass = !showPass">{{ showPass ? '🙈' : '👁️' }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Mật khẩu mới</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input v-model="passForm.new" :type="showPass ? 'text' : 'password'" class="form-control" placeholder="Tối thiểu 6 ký tự" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Preferences -->
    <div class="card mt-4">
      <div class="card-header">
        <h3 style="font-size:16px;font-weight:700">🔔 Tùy chọn thông báo</h3>
      </div>
      <div class="card-body">
        <div class="notif-pref-list">
          <div v-for="pref in notifPrefs" :key="pref.key" class="notif-pref-item">
            <div class="notif-pref-info">
              <span class="notif-pref-icon">{{ pref.icon }}</span>
              <div>
                <p class="notif-pref-title">{{ pref.title }}</p>
                <p class="notif-pref-sub text-muted text-sm">{{ pref.sub }}</p>
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="pref.enabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCustomerAuthStore } from '../stores/customerAuth'
import { usePetsStore } from '../stores/pets'
import { useBookingsStore } from '../stores/bookings'

const auth = useCustomerAuthStore()
const petsStore = usePetsStore()
const bookStore = useBookingsStore()

const form = ref({
  name: auth.customer?.name || '',
  email: auth.customer?.email || '',
  phone: auth.customer?.phone || '',
  address: auth.customer?.address || ''
})

const passForm = ref({ current: '', new: '' })
const showPass = ref(false)
const saveSuccess = ref(false)

const memberSince = computed(() => {
  const d = auth.customer?.createdAt
  return d ? new Date(d).toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' }) : ''
})

const avatarStyle = computed(() => ({
  background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
  color: 'white',
  fontSize: '36px',
  fontWeight: '800',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '96px',
  height: '96px',
  margin: '0 auto'
}))

const notifPrefs = ref([
  { key: 'vaccine', icon: '💉', title: 'Nhắc nhở tiêm phòng', sub: 'Thông báo trước 7 ngày khi đến lịch tiêm', enabled: true },
  { key: 'appointment', icon: '📅', title: 'Xác nhận lịch hẹn', sub: 'Thông báo khi lịch hẹn được xác nhận hoặc thay đổi', enabled: true },
  { key: 'invoice', icon: '💰', title: 'Nhắc nhở thanh toán', sub: 'Thông báo khi có hóa đơn mới hoặc sắp đến hạn', enabled: true },
  { key: 'health', icon: '🏥', title: 'Kết quả xét nghiệm', sub: 'Thông báo khi bác sĩ cập nhật kết quả xét nghiệm', enabled: false },
])

async function handleSave() {
  const ok = await auth.updateProfile(form.value)
  if (ok) {
    saveSuccess.value = true
    setTimeout(() => saveSuccess.value = false, 3000)
  }
}
</script>

<style scoped>
.btn-customer { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: white; border: none; box-shadow: 0 4px 14px rgba(255,107,107,0.3); }
.btn-customer:hover { transform: translateY(-1px); }
.btn-customer:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
.spinner-sm { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; margin-right: 4px; }
@keyframes spin { to { transform: rotate(360deg); } }
.mt-4 { margin-top: 20px; }

.profile-layout { display: grid; grid-template-columns: 280px 1fr; gap: 20px; }
.profile-avatar-card { display: flex; flex-direction: column; gap: 20px; }
.avatar-section { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.change-avatar-btn { font-size: 13px; color: #FF6B6B; background: rgba(255,107,107,0.08); border: 1px solid rgba(255,107,107,0.2); border-radius: 8px; padding: 6px 14px; cursor: pointer; transition: all 0.2s; }
.change-avatar-btn:hover { background: rgba(255,107,107,0.15); }

.profile-stats { display: flex; justify-content: space-around; padding: 16px; background: var(--bg-hover); border-radius: 10px; }
.profile-stat { text-align: center; }
.profile-stat-val { display: block; font-size: 22px; font-weight: 800; color: var(--text-primary); }
.profile-stat-label { display: block; font-size: 11px; color: var(--text-muted); margin-top: 2px; }

.loyalty-badge { display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #FFF7ED, #FFFBEB); border: 1px solid #FDE68A; border-radius: 12px; padding: 14px 16px; }
.loyalty-icon { font-size: 28px; }
.loyalty-title { font-size: 14px; font-weight: 700; color: #92400E; }
.loyalty-sub { font-size: 12px; color: #B45309; margin-top: 2px; }

.alert-success { background: #D1FAE5; border: 1px solid #BBF7D0; color: #065F46; border-radius: 10px; padding: 12px 16px; font-size: 14px; font-weight: 600; margin-bottom: 16px; }
.fade-in-enter-active, .fade-in-leave-active { transition: opacity 0.3s; }
.fade-in-enter-from, .fade-in-leave-to { opacity: 0; }

.notif-pref-list { display: flex; flex-direction: column; gap: 4px; }
.notif-pref-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border); }
.notif-pref-item:last-child { border-bottom: none; }
.notif-pref-info { display: flex; align-items: center; gap: 14px; }
.notif-pref-icon { font-size: 22px; width: 36px; text-align: center; }
.notif-pref-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.notif-pref-sub { margin-top: 2px; }

.toggle-switch { position: relative; display: inline-block; width: 46px; height: 24px; flex-shrink: 0; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; cursor: pointer; inset: 0; background: #CBD5E1; border-radius: 9999px; transition: 0.3s; }
.toggle-slider::before { content: ''; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.3s; }
.toggle-switch input:checked + .toggle-slider { background: #FF6B6B; }
.toggle-switch input:checked + .toggle-slider::before { transform: translateX(22px); }
</style>
